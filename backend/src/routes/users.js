import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = Router()

function getUserId(req) {
  const h = req.headers.authorization || ''
  const t = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!t) return null
  try { const p = jwt.verify(t, process.env.JWT_SECRET || 'dev_secret'); return p.uid } catch { return null }
}

router.get('/me', async (req, res) => {
  const uid = getUserId(req)
  if (!uid) return res.status(401).json({ error: 'unauthorized' })
  const user = await prisma.user.findUnique({ where: { id: uid } })
  if (!user) return res.status(404).json({ error: 'not_found' })
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, latitude: user.latitude, longitude: user.longitude })
})

router.post('/update-location', async (req, res) => {
  const uid = getUserId(req)
  if (!uid) return res.status(401).json({ error: 'unauthorized' })
  const { latitude, longitude } = req.body
  if (!latitude || !longitude) return res.status(400).json({ error: 'missing_coords' })
  
  await prisma.user.update({ where: { id: uid }, data: { latitude, longitude } })
  await prisma.locationLog.create({ data: { userId: uid, latitude, longitude } })
  res.json({ success: true })
})

router.get('/get-nearby-users', async (req, res) => {
  const uid = getUserId(req)
  if (!uid) return res.status(401).json({ error: 'unauthorized' })
  
  const user = await prisma.user.findUnique({ where: { id: uid } })
  if (!user || !user.latitude || !user.longitude) return res.status(400).json({ error: 'no_location' })

  // Simple bounding box or distance check. For now, fetch all and filter in JS (not efficient for large DBs but fine for this task)
  const allUsers = await prisma.user.findMany({
    where: {
      id: { not: uid },
      latitude: { not: null },
      longitude: { not: null }
    },
    select: { id: true, name: true, latitude: true, longitude: true }
  })

  const radius = 0.5 // 500 meters approx in degrees? No, let's use Haversine
  const nearby = allUsers.filter(u => {
    const dist = getDistanceFromLatLonInKm(user.latitude, user.longitude, u.latitude, u.longitude)
    return dist <= 0.5 // 500 meters
  })

  res.json(nearby)
})

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default router
