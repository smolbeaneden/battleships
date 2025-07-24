import { Router } from 'express';
const router = Router();

import {createNewRoom} from '../controllers/RoomController.ts'
import {authorizeUser} from "../controllers/RoomController.js";

router.post('/new', (req, res) => {
  console.log(req.data)
  res.send(createNewRoom(req.data))
})
export default router;

router.get('/:roomID/:playerID', (req, res) => {
  res.send(authorizeUser(req.params.roomID, req.params.playerID))
})
