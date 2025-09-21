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

router.post('/send-alert', async (req, res) => {
  const { userId, type, message } = req.body
  // In a real app, this would trigger SMS/Push
  // For now, we log it to the Alert table
  try {
    const alert = await prisma.alert.create({
      data: {
        userId: userId || 1, // Default to 1 if not provided (testing)
        type: type || 'SOS',
        message: message || 'Emergency Alert',
        status: 'sent'
      }
    })
    res.json({ success: true, alertId: alert.id })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'failed' })
  }
})

router.post('/log-event', async (req, res) => {
  const { type, details } = req.body
  // Log generic events
  console.log(`[EVENT LOG] ${type}:`, details)
  res.json({ success: true })
})

export default router
