import http from 'node:http'
import { Readable } from 'node:stream'

async function handler(req, res) {
  const readable = new Readable({
    read() {

      // para informar que os dados acabaram
      this.push(null)
    }
  })

  readable.pipe(res)
}



http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('server running at 3000'))