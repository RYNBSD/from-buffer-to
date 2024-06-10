const { isReadable } = require("node:stream");
const { isUint8Array, isArrayBuffer } = require("node:util/types");
const {
  buffer2string,
  buffer2number,
  buffer2uint8,
  buffer2array,
  buffer2readable,
  buffer2writable,
  buffer2readablestream,
  buffer2writablestream,
} = require("../build/index.js");
const {
  isArrayOfNumber,
  isWritable,
  isReadableStream,
  isWritableStream,
} = require("../build/is.js");

function testFn(b2a, condition) {
  const buffer = Buffer.alloc(1);
  const result = b2a(buffer);
  expect(condition(result)).toBe(true);
  expect(() => {
    b2a(null);
  }).toThrow(TypeError);
}

describe("Buffer From", () => {
  it("String", () => {
    testFn(buffer2string, (str) => typeof str === "string");
  });

  it("Number", () => {
    testFn(buffer2number, isArrayOfNumber);
  });

  it("Uint8Array", () => {
    testFn(buffer2uint8, isUint8Array);
  });

  it("ArrayBuffer", () => {
    testFn(buffer2array, isArrayBuffer);
  });

  it("Readable", () => {
    testFn(buffer2readable, isReadable);
  });

  it("Writable", () => {
    testFn(buffer2writable, isWritable);
  });

  it("ReadableStream", () => {
    testFn(buffer2readablestream, isReadableStream);
  });

  it("WritableStream", () => {
    testFn(buffer2writablestream, isWritableStream);
  });
});
