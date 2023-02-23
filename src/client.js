import axios from 'axios'
import { Transform, Writable} from 'node:stream'
const url = 'http://localhost:3000'

async function consume() {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  return response.data
}

const stream = await consume()
stream
.pipe(
 new Transform({
    transform(chunk, enc, cb) {
      const item = JSON.parse(chunk)
      const myNumber = /\d+/.exec(item.name)[0]
      console.log(myNumber)

      cb()
    }
 })
)