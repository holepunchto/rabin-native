const test = require('brittle')
const fs = require('fs')
const path = require('path')
const rabin = require('.')

const shakespeare = fs.readFileSync(path.join(__dirname, 'test/fixtures/shakespeare.txt'))

test('basic', (t) => {
  const chunker = new rabin.Chunker()
  const chunks = []

  for (const chunk of chunker.push(shakespeare)) {
    chunks.push(chunk)
  }

  const chunk = chunker.end()

  if (chunk) chunks.push(chunk)

  t.alike(chunks, [
    { length: 1159284 },
    { length: 682783 },
    { length: 2058950 },
    { length: 776735 },
    { length: 764378 }
  ])
})
