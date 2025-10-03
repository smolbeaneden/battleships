import { Router } from 'express'
const router = Router()

import { generatePlayerID, deletePlayerID } from '../controllers/PlayerController.ts'

router.get('/new', (req, res) => {
  if (!req.cookies.sessionId) {
    console.log('New player')
    let ID = generatePlayerID()
    res.cookie('sessionId', ID, {
      httpOnly: false,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
    })
    res.json({ ID })
  }
})

router.delete('/:playerId', (req, res) => {
  if (deletePlayerID(req.params.playerID)) {
    res.status(204).send()
  } else {
    res.status(404).send('user not found')
  }
})

export default router
