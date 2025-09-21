import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "missing" });
  email = String(email).trim().toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    const ok = await bcrypt.compare(password, exists.password);
    if (ok) {
      const token = jwt.sign(
        { uid: exists.id },
        process.env.JWT_SECRET || "dev_secret",
        { expiresIn: "7d" }
      );
      return res.json({ token });
    }
    return res.status(409).json({ error: "exists" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });
    const token = jwt.sign(
      { uid: user.id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: "server_error" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = String(email).trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "invalid" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "invalid" });
  const token = jwt.sign(
    { uid: user.id },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" }
  );
  res.json({ token });
});

export default router;
