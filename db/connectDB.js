import mongoose from 'mongoose'
import chalk from 'chalk'
import ora from 'ora'

import dotevn from 'dotenv'
dotevn.config() 

export async function connectDB(){
    try {
        const spinner = ora('Connecting to the database...').start()
        await mongoose.connect(process.env.MONGO_URI)
        spinner.stop()
        console.log(chalk.greenBright('Successfully connected to database!!!'))   
    } catch (error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1) 
    }
}



export async function disconnectDB(){
    try {
        await mongoose.disconnect()
        console.log(chalk.greenBright('Disconnected from the database.'))
    } catch(error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1) 
    }
}

// connectDB()
// disconnectDB()