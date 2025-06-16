import express from 'express'
const app = express()
const port = 8000
import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use(express.text());


app.post('/api', (req, res) => {
  console.log(req.body)
  res.status(200).json({result: req.body.text});
})

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
