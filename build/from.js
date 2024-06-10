var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { isArrayBuffer, isSharedArrayBuffer, isUint8Array, } from "node:util/types";
import { isArrayOfNumber, isArrayOfString, isReadable, isReadableStream, isStream, } from "./is.js";
import { Readable } from "node:stream";
export function string2buffer(str, strict = false) {
    if (Array.isArray(str)) {
        if (strict) {
            if (isArrayOfString(str))
                return str.map((s) => Buffer.from(s));
            else
                throw new TypeError("Provided array is not array of string");
        }
        return str.map((s) => Buffer.from(s));
    }
    else if (typeof str === "string")
        return Buffer.from(str);
    throw new TypeError("Invalid parameter type.");
}
export function number2buffer(nbr, strict = false) {
    if (Array.isArray(nbr)) {
        if (strict) {
            if (isArrayOfNumber(nbr))
                return Buffer.from(nbr);
            else
                throw new TypeError("Provided array is not array of number");
        }
        return Buffer.from(nbr);
    }
    throw new TypeError("Invalid parameter type.");
}
export function any2buffer(any) {
    return Buffer.from(any);
}
export function uint8array2buffer(uint8) {
    if (!isUint8Array(uint8))
        throw new TypeError("Invalid Uint8Array");
    return Buffer.from(uint8);
}
export function array2buffer(array) {
    if (!isArrayBuffer(array) && !isSharedArrayBuffer(array))
        throw new TypeError("Invalid ArrayBuffer");
    return Buffer.from(array);
}
export function stream2buffer(stream) {
    if (!isStream(stream))
        throw new TypeError("Invalid Stream");
    return new Promise((resolve, reject) => {
        const buffer = [];
        stream.on("data", (chunk) => buffer.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(buffer)));
        stream.on("error", (err) => reject(`Can\'t convert stream - ${err}`));
    });
}
/** Node Readable stream */
export function readable2buffer(readable) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, readable_1, readable_1_1;
        var _b, e_1, _c, _d;
        if (!isReadable(readable))
            throw new TypeError("Invalid Readable");
        const buffer = [];
        try {
            for (_a = true, readable_1 = __asyncValues(readable); readable_1_1 = yield readable_1.next(), _b = readable_1_1.done, !_b; _a = true) {
                _d = readable_1_1.value;
                _a = false;
                const chunk = _d;
                buffer.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = readable_1.return)) yield _c.call(readable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Buffer.concat(buffer);
    });
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
export function readablestream2buffer(readableStream) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isReadableStream(readableStream))
            throw new TypeError("Invalid ReadableStream");
        const readable = Readable.fromWeb(readableStream);
        return readable2buffer(readable);
    });
}
/** Web Writable stream */
// export async function writablestream2buffer(writableStream: WritableStream) {
//   if (!isWritableStream(writableStream))
//     throw new TypeError("Invalid writable");
//   const writable = Writable.fromWeb(writableStream);
//   return writable2buffer(writable);
// }
export function url2buffer(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        const arrayBuffer = yield res.arrayBuffer();
        return array2buffer(arrayBuffer);
    });
}
//# sourceMappingURL=from.js.map