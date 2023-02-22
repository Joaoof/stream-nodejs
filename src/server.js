import http from 'node:http'
import { Readable } from 'node:stream'
import { randomUUID } from 'node:crypto'

function * run () {
  for(let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `João-${index}`
    }
      yield data
  }
}

async function handler(req, res) {
  const readable = new Readable({
    read() {
      for(const data of run()) {
        console.log('sending', data)
        this.push(JSON.stringify(data) + "\n")
      }
      // para informar que os dados acabaram
      this.push(null)
    }
  })

  readable.pipe(res)
}



http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('server running at 3000'))