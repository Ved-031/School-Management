import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function renameField(){
  await prisma.$runCommandRaw({
    update: "students",
    updates: [{
      q: {},
      u: { $rename: { "firtname": "firstname" } }
    }]
  })
  console.log("field renamed");
}

renameField()
.catch((err) => console.log(err))
.finally(() => prisma.$disconnect())