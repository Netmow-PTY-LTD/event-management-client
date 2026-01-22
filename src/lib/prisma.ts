import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import Database from 'better-sqlite3'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const dbUrl = process.env.DATABASE_URL?.replace('file:', '') || './dev.db'
const adapter = new PrismaLibSql({ url: `file:${dbUrl}` })

// Create a new client if the global one doesn't exist or is missing new models
const createPrismaClient = () => {
  return new PrismaClient({
    adapter,
    log: ['error'],
  })
}

export const prisma = (() => {
  if (process.env.NODE_ENV === 'production') {
    return createPrismaClient()
  }

  // In dev, we check if the global instance has the new models
  // If not (due to HMR caching an old instance), we force a new one
  const existing = globalForPrisma.prisma
  if (existing && (existing as any).subscriptionPackage) {
    return existing
  }

  const fresh = createPrismaClient()
  globalForPrisma.prisma = fresh
  return fresh
})()
