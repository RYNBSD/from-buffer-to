import { Readable, Writable } from "node:stream";
import { ReadableStream } from "node:stream/web";

export function buffer2string(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return buffer.toString();
}

export function buffer2number(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return [...buffer];
}

export function buffer2uint8(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return new Uint8Array(buffer);
}

export function buffer2array(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return buffer.buffer;
}

/** Node Readable stream */
export function buffer2readable(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return Readable.from(buffer);
}

/** Node Writable stream */
export function buffer2writable(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  const writable = new Writable();
  writable._write = (_chunk, _encoding, callback) => {
    callback();
  };
  writable.write(buffer);
  return writable;
}

/** Web Readable stream */
export function buffer2readablestream(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return ReadableStream.from(buffer);
}

/** Web Readable stream */
export function buffer2writablestream(buffer: Buffer) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError("Invalid Buffer");
  return Writable.toWeb(buffer2writable(buffer));
}
