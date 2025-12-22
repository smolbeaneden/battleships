import { Router } from 'express'
import { BOARD_SIZE, rooms, SHIPS } from '../serverData.ts'
const router = Router()

router.get('/:roomID/state', (req, res) => {

  res.send(rooms.value[req.params.roomID]?.state)
})

router.get('/:roomID/turn', (req, res) => {

  // console.log(req.cookies.sessionId)
  //console.log(rooms.value[req.params.roomID].playerBoard)
  res.send({data: (rooms.value[req.params.roomID]?.turn === req.cookies.sessionId).toString()})
})

router.put('/:roomID/turn', (req, res) => {
  const ID = req.cookies.sessionId
  if (rooms.value[req.params.roomID].hostID === ID) {
    console.log("id is host id")
    rooms.value[req.params.roomID].turn = req.body.turn? ID: rooms.value[req.params.roomID].playerID
  } else {
    rooms.value[req.params.roomID].turn = req.body.turn? ID: rooms.value[req.params.roomID].hostID
  }
  res.send(200)
})

// router.put('/:roomID', (req, res) => {
//   if (rooms.value[req.params.roomID].hostID === req.cookies.sessionId) {
//     rooms.value[req.params.roomID].playerBoard[req.body.y][req.body.x].clicked = true
//     res.send({data: rooms.value[req.params.roomID].playerBoard[req.body.y][req.body.x]['isShip']})
//   } else {
//     rooms.value[req.params.roomID].hostBoard[req.body.y][req.body.x].clicked = true
//     res.send({data: rooms.value[req.params.roomID].hostBoard[req.body.y][req.body.x]['isShip']})
//   }
// })

router.put('/:roomID/attack', (req, res) => {
  const xy = JSON.parse(req.body)
  const y = xy.y
  const x = xy.x
  console.log([ rooms.value[req.params.roomID].playerBoard[y][x],  rooms.value[req.params.roomID].hostBoard[y][x]])
  if(rooms.value[req.params.roomID]){
    if (rooms.value[req.params.roomID].hostID === req.cookies.sessionId) {
      console.log('attacking player')
      rooms.value[req.params.roomID].playerBoard[y][x]["clicked"] = true
      res.json({data: rooms.value[req.params.roomID].playerBoard[y][x]["isShip"]})
    }
    else{
      rooms.value[req.params.roomID].hostBoard[y][x]["clicked"] = true
      res.json({data: rooms.value[req.params.roomID].hostBoard[y][x]["isShip"]})
      console.log('attacking host')
    }
  }
})


router.get('/:roomID/end', (req, res) => {
  let hostPoints = 0
  let playerPoints = 0
  let playerType = rooms.value[req.params.roomID].hostID === req.cookies.sessionId? "host": "player";
  for(let i = 0; i < BOARD_SIZE; i++){
    for (let j = 0; j < BOARD_SIZE; j++){
      // console.log([rooms.value[req.params.roomID].hostBoard[i][j]["clicked"], rooms.value[req.params.roomID].hostBoard[i][j]["isShip"],
      //   rooms.value[req.params.roomID].playerBoard[i][j]["clicked"], rooms.value[req.params.roomID].playerBoard[i][j]["isShip"]])
      if(rooms.value[req.params.roomID].hostBoard[i][j]["clicked"] && rooms.value[req.params.roomID].hostBoard[i][j]["isShip"]) {
        playerPoints ++
      }
      if(rooms.value[req.params.roomID].playerBoard[i][j]["clicked"] && rooms.value[req.params.roomID].playerBoard[i][j]["isShip"]){
        hostPoints ++
      }
    }
  }
  console.log({"player": playerPoints})
  console.log({"host": hostPoints})
  console.log({"ships": SHIPS});
  console.log(playerType)
  if(hostPoints === SHIPS){
    res.json({data: {end: true, winner: playerType === "host"}})
  }
  else if (playerPoints === SHIPS){
    res.json({data: {end: true, winner: playerType === "player"}})
  }
  else{
    res.json({data: {end: false, winner: false}})
  }
})

export default router
