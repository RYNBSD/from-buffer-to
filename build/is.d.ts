/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Stream, Readable, Writable } from "node:stream";
import { ReadableStream, WritableStream } from "node:stream/web";
export declare function isInstanceof<T>(value: any, cls: T): value is T;
export declare function isStream(value: unknown): value is Stream;
export declare function isReadable(value: unknown): value is Readable;
export declare function isWritable(value: unknown): value is Writable;
export declare function isReadableStream(value: unknown): value is ReadableStream;
export declare function isWritableStream(value: unknown): value is WritableStream;
export declare function isArrayOfString(array: unknown[]): array is string[];
export declare function isArrayOfNumber(array: unknown[]): array is number[];
//# sourceMappingURL=is.d.ts.map