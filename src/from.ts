import type { ReadableStream } from "node:stream/web";
import {
  isArrayBuffer,
  isSharedArrayBuffer,
  isUint8Array,
} from "node:util/types";
import {
  isArrayOfNumber,
  isArrayOfString,
  isReadable,
  isReadableStream,
  isStream,
} from "./is.js";
import { type Stream, Readable } from "node:stream";

export function string2buffer(str: string, strict: false): Buffer;
export function string2buffer(str: string[], strict: boolean): Buffer[];
export function string2buffer(str: unknown, strict = false) {
  if (Array.isArray(str)) {
    if (strict) {
      if (isArrayOfString(str)) return str.map((s) => Buffer.from(s));
      else throw new TypeError("Provided array is not array of string");
    }
    return str.map((s) => Buffer.from(s));
  } else if (typeof str === "string") return Buffer.from(str);
  throw new TypeError("Invalid parameter type.");
}

export function number2buffer<T extends number[] | readonly number[]>(
  nbr: T,
  strict = false
) {
  if (Array.isArray(nbr)) {
    if (strict) {
      if (isArrayOfNumber(nbr)) return Buffer.from(nbr);
      else throw new TypeError("Provided array is not array of number");
    }
    return Buffer.from(nbr);
  }
  throw new TypeError("Invalid parameter type.");
}

export function any2buffer<T extends any[] | readonly any[]>(any: T) {
  return Buffer.from(any);
}

export function uint8array2buffer(uint8: Uint8Array) {
  if (!isUint8Array(uint8)) throw new TypeError("Invalid Uint8Array");
  return Buffer.from(uint8);
}

export function array2buffer(array: ArrayBuffer | SharedArrayBuffer) {
  if (!isArrayBuffer(array) && !isSharedArrayBuffer(array))
    throw new TypeError("Invalid ArrayBuffer");
  return Buffer.from(array);
}

export function stream2buffer(stream: Stream) {
  if (!isStream(stream)) throw new TypeError("Invalid Stream");
  return new Promise<Buffer>((resolve, reject) => {
    const buffer: Buffer[] = [];
    stream.on("data", (chunk) => buffer.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(buffer)));
    stream.on("error", (err) => reject(`Can\'t convert stream - ${err}`));
  });
}

/** Node Readable stream */
export async function readable2buffer(readable: Readable) {
  if (!isReadable(readable)) throw new TypeError("Invalid Readable");
  const buffer: Buffer[] = [];
  for await (const chunk of readable) {
    buffer.push(chunk);
  }
  return Buffer.concat(buffer);
}

/** Node Writable stream */
// export async function writable2buffer(writable: Writable) {
//   if (!isWritable(writable)) throw new TypeError("Invalid writable");

//   const buffer: Buffer[] = [];
//   writable._write = (chunk, _, callback) => {
//     buffer.push(chunk);
//     callback(null);
//   };

//   return new Promise<Buffer>((resolve, reject) => {
//     writable.on("finish", () => {
//       resolve(Buffer.concat(buffer));
//     });
//     writable.on("error", (error) => {
//       reject(error);
//     });
//   });
// }

/** Web Readable stream */
export async function readablestream2buffer(readableStream: ReadableStream) {
  if (!isReadableStream(readableStream))
    throw new TypeError("Invalid ReadableStream");
  const readable = Readable.fromWeb(readableStream);
  return readable2buffer(readable);
}

/** Web Writable stream */
// export async function writablestream2buffer(writableStream: WritableStream) {
//   if (!isWritableStream(writableStream))
//     throw new TypeError("Invalid writable");
//   const writable = Writable.fromWeb(writableStream);
//   return writable2buffer(writable);
// }

export async function url2buffer(url: string | URL) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return array2buffer(arrayBuffer);
}
