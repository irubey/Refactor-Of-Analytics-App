import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const fields = await prisma.tick.create({
    data: {
      name: "test",
      author: {}, // replace with actual author
      route: "route", // replace with actual route
      location: "location", // replace with actual location
      session: "session", // replace with actual session
    },
  })
  console.log(fields)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
