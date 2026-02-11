const test = require('brittle')
const fs = require('fs')
const path = require('path')
const rabin = require('.')

const shakespeare = fs.readFileSync(path.join(__dirname, 'test/fixtures/shakespeare.txt'))

test('basic', (t) => {
  const chunker = new rabin.Chunker()
  const chunks = []

  for (const chunk of chunker.update(shakespeare)) {
    chunks.push(chunk)
  }

  const chunk = chunker.final()

  if (chunk) chunks.push(chunk)

  t.alike(chunks, [2725155, 541553, 1333425, 1038392])
})
