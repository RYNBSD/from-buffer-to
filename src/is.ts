import { Stream, Readable, Writable } from "node:stream";
import { ReadableStream, WritableStream } from "node:stream/web";

export function isInstanceof<T>(value: any, cls: T): value is T {
  return (
    typeof cls === "function" &&
    (value instanceof cls || value?.name === cls.name)
  );
}

export function isStream(value: unknown): value is Stream {
  return isInstanceof(value, Stream);
}

export function isReadable(value: unknown): value is Readable {
  return isInstanceof(value, Readable);
}

export function isWritable(value: unknown): value is Writable {
  return isInstanceof(value, Writable);
}

export function isReadableStream(value: unknown): value is ReadableStream {
  return isInstanceof(value, ReadableStream);
}

export function isWritableStream(value: unknown): value is WritableStream {
  return isInstanceof(value, WritableStream);
}

export function isArrayOfString(array: unknown[]): array is string[] {
  if (!Array.isArray(array)) return false;
  for (const arr of array) if (typeof arr !== "string") return false;
  return true;
}

export function isArrayOfNumber(array: unknown[]): array is number[] {
  if (!Array.isArray(array)) return false;
  for (const arr of array) if (typeof arr !== "number") return false;
  return true;
}
