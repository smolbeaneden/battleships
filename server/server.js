import express from 'express';
import roomRoutes from './routes/rooms.js';
import playerRoutes from './routes/players.js';
import preGameRoutes from './routes/preGame.js';
import gameRoutes from './routes/game.js';
const app = express()
const port = 8000
import bodyParser from 'body-parser'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => {
  console.log(`Server listening at http://localhost:${port}`);
  res.send("hello")
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).json({result: req.body.text});
})

app.use('/room', roomRoutes);
app.use('/player', playerRoutes);
app.use('/preGame', preGameRoutes);
app.use('/game', gameRoutes);

app.listen(port, 'localhost', () => {
  console.log(`Listening on ${port}`);
})


