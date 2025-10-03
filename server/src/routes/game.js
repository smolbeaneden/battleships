import { Router } from 'express'
import { rooms } from '../serverData.ts'
const router = Router()

router.get('/:roomID/state', (req, res) => {
  console.log(rooms.value[req.params.roomID].state)
  res.send(rooms.value[req.params.roomID].state)
})

router.get('/:roomID/turn', (req, res) => {
  console.log(rooms.value[req.params.roomID].turn)
  res.send({data: rooms.value[req.params.roomID].turn === req.cookies.sessionId})
})

router.put('/:roomID/turn', (req, res) => {
  const ID = req.cookies.sessionId
  if (rooms.value[req.params.roomID].hostID === ID) {
    rooms.value[req.params.roomID].turn = req.body.turn? ID: rooms.value[req.params.roomID].playerID
  }
  else{
    rooms.value[req.params.roomID].turn = req.body.turn? ID: rooms.value[req.params.roomID].hostID
  }
})

router.put('/:roomID', (req, res) => {
  if (rooms.value[req.params.roomID].hostID === req.cookies.sessionId) {
    rooms.value[req.params.roomID].playerBoard[req.body.y][req.body.x].clicked = true
    res.send({data: rooms.value[req.params.roomID].playerBoard[req.body.y][req.body.x].ship})
  }
  else{
    rooms.value[req.params.roomID].hostBoard[req.body.y][req.body.x].clicked = true
    res.send({data: rooms.value[req.params.roomID].hostBoard[req.body.y][req.body.x].ship})
  }
})

export default router
