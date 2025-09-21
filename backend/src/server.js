import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'

import incidentsRouter from './routes/incidents.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/sos', incidentsRouter)
app.use('/api', incidentsRouter) // For /send-alert and /log-event if they are in incidents



const port = process.env.PORT || 4000
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
