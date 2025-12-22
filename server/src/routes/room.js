import { Router } from 'express'
const router = Router()
import {
  createNewRoom,
  authorizeOrAddPlayer,
  authorizeHost,
  authorizePlayer,
} from '../controllers/RoomController.ts'
import { rooms } from '../serverData.ts'

router.post('/new', (req, res) => {
  res.json({ data: createNewRoom(req.body) })
})

function auth(req, res, next) {
  //server will extract authorization information from the client's request header
  const authHeader = req.headers.authorization
  if (!authHeader) {
    let err = new Error('You are not authenticated!')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    next(err)
    return
  }

  //If this client request does not include the authorization information
  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
  const user = auth[0]
  const roomID = auth[1]

  //static credential values
  if (user === rooms.value[roomID].hostID) {
    next() // user authorized
  } else {
    let err = new Error('You are not authenticated!')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    next(err)
  }
}
// router.use(auth);

router.get('/:roomID/:playerID/join', (req, res) => {
  console.log('goo')
  res.json({ data: authorizeOrAddPlayer(req.params.roomID, req.params.playerID) })
})

router.get('/:roomID/:playerID/host', (req, res) => {
  console.log('respond num 1')
  res.send(authorizeHost(req.params.roomID, req.params.playerID))
})

router.get('/:roomID/:playerID/player', (req, res) => {
  console.log('respond num 2')
  res.send(authorizePlayer(req.params.roomID, req.params.playerID))
})

router.get('/:roomID/player', (req, res) => {
  console.log('respond num 3')
  let connected
  connected = rooms.value[req.params.roomID].playerID.length === 12
  res.json({ data: connected })
})

router.get('/:roomID/state', (req, res) => {
  console.log('respond num 4')
  res.json({data: rooms.value[req.params.roomID].state})
})

router.put('/:roomID/state', (req, res) => {

  rooms.value[req.params.roomID].state = JSON.parse(req.body)
  res.json({data: rooms.value[req.params.roomID].state})
})

router.put('/:roomID/:playerID/board', (req, res) => {

  if(rooms.value[req.params.roomID].playerID === req.params.playerID) {
    rooms.value[req.params.roomID].playerBoard = JSON.parse(req.body)
    rooms.value[req.params.roomID].playerReady = true;
    res.json({data: rooms.value[req.params.roomID].playerBoard})
  }
  else{
    rooms.value[req.params.roomID].hostBoard = JSON.parse(req.body)
    rooms.value[req.params.roomID].hostReady = true;
    res.json({data: rooms.value[req.params.roomID].hostBoard})
  }
})

router.get('/:roomID/:role/ready', (req, res) => {
  console.log('respond num 5')
  if(req.params.role === "host") {
    res.json({data: rooms.value[req.params.roomID].playerReady})
  }
  else{
    res.json({data: rooms.value[req.params.roomID].hostReady})
  }
})

router.get('/:roomID/:role/board', (req, res) => {
  console.log("board fetching by role")
  console.log({"role": req.params.role})

  if(req.params.role === "host") {
    console.log("host role")
    res.json({data: rooms.value[req.params.roomID].hostBoard, ok: true})
  }
  else if(req.params.role === "player") {
    console.log("player role")
    res.json({data: rooms.value[req.params.roomID].playerBoard, ok: true})
  }
  else{
    res.json({data: undefined, ok: false})
  }
})

export default router
