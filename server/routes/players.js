import { Router } from 'express';
const router = Router();

import {generatePlayerID, deletePlayerID} from "../controllers/PlayerController.ts";

router.get('/new', (req, res) => {
  res.send(generatePlayerID());
})

router.delete('/:playerId', (req, res) => {
  if(deletePlayerID(req.params.playerID)){
    res.status(204).send()
  }
  else{
    res.status(404).send('user not found');
  }
})

export default router;
