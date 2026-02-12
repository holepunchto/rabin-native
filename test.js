const test = require('brittle')
const fs = require('fs')
const path = require('path')
const rabin = require('.')

const shakespeare = fs.readFileSync(path.join(__dirname, 'test/fixtures/shakespeare.txt'))

test('basic', (t) => {
  const chunker = new rabin.Chunker()
  const chunks = []

  let data = Buffer.from(shakespeare)

  while (data.byteLength > 0) {
    for (const chunk of chunker.push(data.subarray(0, 1024))) {
      chunks.push(chunk)
    }

    data = data.subarray(1024)
  }

  const chunk = chunker.end()

  if (chunk) chunks.push(chunk)

  t.alike(chunks, [
    { length: 1159284, offset: 0 },
    { length: 682783, offset: 1159284 },
    { length: 2058950, offset: 1842067 },
    { length: 776735, offset: 3901017 },
    { length: 764378, offset: 4677752 }
  ])
})
