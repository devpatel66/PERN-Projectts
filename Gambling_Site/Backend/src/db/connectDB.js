import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
async function connectDB(){
    try {
        await pri.sync();
        // await sequelize.authenticate();
    } catch (error) {
        console.log("DB connection error || ",error.message);
    }
    
}

export default connectDB