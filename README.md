This package helps to convert any type to buffer and buffer to any type, with 0 dependencies. <br />
Why the package name is <mark>from-buffer-to</mark> ?<br />
**from buffer to any**<br />
**buffer to any**

# API

this package support various types: indexable, stream, url, numbers...

```js
import {
  // To Buffer
  string2buffer,
  number2buffer,
  any2buffer,
  uint8array2buffer,
  array2buffer,
  stream2buffer,
  readable2buffer,
  readablestream2buffer,
  url2buffer,

  // From Buffer
  buffer2string,
  buffer2number,
  buffer2uint8,
  buffer2array,
  buffer2readable,
  buffer2writable,
  buffer2readablestream,
  buffer2writablestream,

  // Additional Apis
  isInstanceof,
  isStream,
  isReadable,
  isWritable,
  isReadableStream,
  isWritableStream,
  isArrayOfString,
  isArrayOfNumber,
} from "@ryn-bsd/from-buffer-to";
```

Yes, as you say these are all **provided apis**

# Usage

```js
const buffer = Buffer.alloc(1);
const buf2str = buffer2string(buffer);
const str2buf = string2buffer(buf2str);
```

That easy, only one parameter and also the package provide it types definitions 😉.
