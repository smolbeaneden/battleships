import express from 'express'
import cookieParser from 'cookie-parser'
import roomRoutes from './routes/room.js'
import playerRoutes from './routes/player.js'
import gameRoutes from './routes/game.js'
const app = express()
const port = 8000
import bodyParser from 'body-parser'
import cors from 'cors'

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin - NOT wildcard
  credentials: true // Allow cookies to be sent
}));

app.use(bodyParser.json())
app.use(express.json())
app.use(express.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
//   res.header('Access-Control-Allow-Credentials', 'true') // If you are sending credentials
//   next()
// })

app.get('/', (req, res) => {
  console.log(`Server listening at http://localhost:${port}`)
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).json({ result: req.body.text })
})

app.use('/room', (req, res, next) => {
  console.log('=== REQUEST TO /room ===')
  console.log('Full path:', req.path)
  console.log('Method:', req.method)
  console.log('Params:', req.params)
  console.log('=======================')
  next()
})

app.use('/room', roomRoutes)
app.use('/player', playerRoutes)
app.use('/game', gameRoutes)

app.listen(port, 'localhost', () => {
  console.log(`Listening on ${port}`)
})
