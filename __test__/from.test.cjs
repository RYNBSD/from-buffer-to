const fs = require("node:fs");
const { Readable } = require("node:stream");
const { faker } = require("@faker-js/faker");
const {
  string2buffer,
  number2buffer,
  any2buffer,
  uint8array2buffer,
  array2buffer,
  stream2buffer,
  readable2buffer,
  readablestream2buffer,
  url2buffer,
} = require("../build/index.js");

describe("Buffer To", () => {
  it("String", () => {
    const str = "Hello World";
    expect(string2buffer(str)).toBeInstanceOf(Buffer);
    expect(() => {
      string2buffer(0);
    }).toThrow(TypeError);

    const strArr = ["Hello", "World"];
    expect(string2buffer(strArr)).toHaveLength(2);

    strArr.push(1);
    expect(() => string2buffer(strArr, true)).toThrow(TypeError);
  });

  it("Number", () => {
    const nbrArr = [0, 0];
    expect(number2buffer(nbrArr)).toBeInstanceOf(Buffer);

    nbrArr.push("");
    expect(() => {
      number2buffer(nbrArr, true);
    }).toThrow(TypeError);

    expect(() => {
      number2buffer("");
    }).toThrow(TypeError);
  });

  it("Any", () => {
    expect(any2buffer("")).toBeInstanceOf(Buffer);
  });

  it("Uint8Array", () => {
    const uint8 = new Uint8Array([0, 0, 0]);
    expect(uint8array2buffer(uint8)).toBeInstanceOf(Buffer);
    expect(() => {
      uint8array2buffer("");
    }).toThrow(TypeError);
  });

  it("ArrayBuffer & SharedArrayBuffer", () => {
    const arrayBuffer = new ArrayBuffer(0);
    expect(array2buffer(arrayBuffer)).toBeInstanceOf(Buffer);

    const sharedArrayBuffer = new SharedArrayBuffer(0);
    expect(array2buffer(sharedArrayBuffer)).toBeInstanceOf(Buffer);

    expect(() => {
      array2buffer("");
    }).toThrow(TypeError);
  });

  it("Stream", async () => {
    const stream = fs.createReadStream("asset/test.txt");
    const buffer = await stream2buffer(stream);
    expect(buffer).toBeInstanceOf(Buffer);
    await expect(async () => {
      await stream2buffer("");
    }).rejects.toThrow(TypeError);
  });

  it("Readable", async () => {
    const readable = fs.createReadStream("asset/test.txt");
    const buffer = await readable2buffer(readable);
    expect(buffer).toBeInstanceOf(Buffer);
    await expect(() => readable2buffer("")).rejects.toThrow(TypeError);
  });

  // it("Writable", async () => {
  //   const writable = fs.createWriteStream("asset/test.txt");
  //   const buffer = await writable2buffer(writable);
  //   expect(buffer).toBeInstanceOf(Buffer);
  //   await expect(() => writable2buffer("")).rejects.toThrow(TypeError);
  // });

  it("ReadableStream", async () => {
    const readable = fs.createReadStream("asset/test.txt");
    const readableStream = Readable.toWeb(readable);
    const buffer = await readablestream2buffer(readableStream);
    expect(buffer).toBeInstanceOf(Buffer);
    await expect(() => readablestream2buffer("")).rejects.toThrow(TypeError);
  });

  // it("WritableStream", async () => {
  //   const writable = fs.createWriteStream("asset/test.txt");
  //   const writableStream = Writable.toWeb(writable);
  //   const buffer = await writablestream2buffer(writableStream);
  //   expect(buffer).toBeInstanceOf(Buffer);
  //   await expect(() => writablestream2buffer("")).rejects.toThrow(TypeError);
  // });

  it("URL", async () => {
    const url = faker.image.avatar();
    const buffer = await url2buffer(url);
    expect(buffer).toBeInstanceOf(Buffer);
    await expect(() => url2buffer(0)).rejects.toThrow();
  });
});
