/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Readable, Writable } from "node:stream";
import { ReadableStream } from "node:stream/web";
export declare function buffer2string(buffer: Buffer): string;
export declare function buffer2number(buffer: Buffer): number[];
export declare function buffer2uint8(buffer: Buffer): Uint8Array;
export declare function buffer2array(buffer: Buffer): ArrayBufferLike;
/** Node Readable stream */
export declare function buffer2readable(buffer: Buffer): Readable;
/** Node Writable stream */
export declare function buffer2writable(buffer: Buffer): Writable;
/** Web Readable stream */
export declare function buffer2readablestream(buffer: Buffer): ReadableStream<number>;
/** Web Readable stream */
export declare function buffer2writablestream(buffer: Buffer): import("stream/web").WritableStream<any>;
//# sourceMappingURL=to.d.ts.map