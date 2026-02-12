const { Transform } = require('streamx')
const binding = require('./binding')

class RabinChunker {
  constructor(opts = {}) {
    const {
      minimumSize = 512 * 1024, // 512 KiB
      maximumSize = 8 * 1024 * 1024 // 8 MiB
    } = opts

    this._handle = binding.init(minimumSize, maximumSize)
  }

  *update(data) {
    while (true) {
      const length = binding.update(this._handle, data.buffer, data.byteOffset, data.byteLength)

      if (length === 0) return

      yield {
        length
      }
    }
  }

  final() {
    const length = binding.final(this._handle)

    return {
      length
    }
  }
}

exports.Chunker = RabinChunker

class RabinChunkerStream extends Transform {
  constructor(opts = {}) {
    super(opts)

    this._chunker = new RabinChunker(opts)
  }

  _transform(data, cb) {
    for (const chunk of this._chunker.update(data)) {
      this.push(chunk)
    }

    cb(null)
  }

  _final(cb) {
    const chunk = this._chunker.final()

    if (chunk) this.push(chunk)

    this.push(null)

    cb(null)
  }
}

exports.ChunkerStream = RabinChunkerStream
