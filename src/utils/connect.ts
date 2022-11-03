import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function connect() {
  try {
    await prisma.connect()
    console.log('Connected to DB')
  } catch(error) {
    console.error('Could not connect to DB')
    process.exit(1)
  }
}