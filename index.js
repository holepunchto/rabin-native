const binding = require('./binding')

class RabinChunker {
  constructor(opts = {}) {
    const {
      minSize = 512 * 1024, // 512 KiB
      maxSize = 8 * 1024 * 1024 // 8 MiB
    } = opts

    this._handle = binding.init(minSize, maxSize)
  }

  *push(data) {
    while (true) {
      const length = binding.push(this._handle, data.buffer, data.byteOffset, data.byteLength)

      if (length === 0) return

      data = data.subarray(length)

      yield {
        length
      }
    }
  }

  end() {
    const length = binding.end(this._handle)

    return {
      length
    }
  }
}

exports.Chunker = RabinChunker
