import app from "./app.js";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

function main(){
    app.listen(8000,()=>{
        console.log(`App is listening on http://localhost:8000`);
    })
}

main()
// .then(async ()=>{
//     await prisma.$disconnect()
// })
// .catch(async (err)=>{
//     await prisma.$disconnect()
//     console.log("Error || ",err.message);
// })


