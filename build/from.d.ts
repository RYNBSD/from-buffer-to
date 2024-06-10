/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { ReadableStream } from "node:stream/web";
import { type Stream, Readable } from "node:stream";
export declare function string2buffer(str: string, strict: false): Buffer;
export declare function string2buffer(str: string[], strict: boolean): Buffer[];
export declare function number2buffer<T extends number[] | readonly number[]>(nbr: T, strict?: boolean): Buffer;
export declare function any2buffer<T extends any[] | readonly any[]>(any: T): Buffer;
export declare function uint8array2buffer(uint8: Uint8Array): Buffer;
export declare function array2buffer(array: ArrayBuffer | SharedArrayBuffer): Buffer;
export declare function stream2buffer(stream: Stream): Promise<Buffer>;
/** Node Readable stream */
export declare function readable2buffer(readable: Readable): Promise<Buffer>;
/** Node Writable stream */
/** Web Readable stream */
export declare function readablestream2buffer(readableStream: ReadableStream): Promise<Buffer>;
/** Web Writable stream */
export declare function url2buffer(url: string | URL): Promise<Buffer>;
//# sourceMappingURL=from.d.ts.map