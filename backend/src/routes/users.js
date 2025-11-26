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
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt })
})

export default router
