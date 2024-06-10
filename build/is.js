import { Stream, Readable, Writable } from "node:stream";
import { ReadableStream, WritableStream } from "node:stream/web";
export function isInstanceof(value, cls) {
    return (typeof cls === "function" &&
        (value instanceof cls || (value === null || value === void 0 ? void 0 : value.name) === cls.name));
}
export function isStream(value) {
    return isInstanceof(value, Stream);
}
export function isReadable(value) {
    return isInstanceof(value, Readable);
}
export function isWritable(value) {
    return isInstanceof(value, Writable);
}
export function isReadableStream(value) {
    return isInstanceof(value, ReadableStream);
}
export function isWritableStream(value) {
    return isInstanceof(value, WritableStream);
}
export function isArrayOfString(array) {
    if (!Array.isArray(array))
        return false;
    for (const arr of array)
        if (typeof arr !== "string")
            return false;
    return true;
}
export function isArrayOfNumber(array) {
    if (!Array.isArray(array))
        return false;
    for (const arr of array)
        if (typeof arr !== "number")
            return false;
    return true;
}
//# sourceMappingURL=is.js.map