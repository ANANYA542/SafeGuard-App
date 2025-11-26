import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.post('/', async (req, res) => {
  const { type, latitude, longitude, address, time } = req.body
  try {
    const inc = await prisma.incident.create({ data: { type, latitude, longitude, address, time: new Date(time) } })
    res.json({ id: inc.id })
  } catch (e) {
    res.status(400).json({ error: 'invalid' })
  }
})

export default router
