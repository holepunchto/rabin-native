# rabin-native

https://github.com/holepunchto/librabin bindings for JavaScript.

```
npm i rabin-native
```

## Usage

```js
const rabin = require('rabin-native')

const chunker = new rabin.Chunker()
const chunks = []

for (const chunk of chunker.push(shakespeare)) {
  chunks.push(chunk)
}

const chunk = chunker.end()

if (chunk) chunks.push(chunk)
```

## License

Apache-2.0
