import { Router } from 'express';
import {rooms} from "../serverData.js";
const router = Router();

router.get('/:roomID/state', (req, res) => {
  console.log(rooms.value[req.params.playerID].state)
  res.send(rooms.value[req.params.playerID].state)
})


export default router;
