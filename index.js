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
      const len = binding.update(this._handle, data.buffer, data.byteOffset, data.byteLength)

      if (len === 0) return

      yield len
    }
  }

  final() {
    return binding.final(this._handle)
  }
}

exports.Chunker = RabinChunker
