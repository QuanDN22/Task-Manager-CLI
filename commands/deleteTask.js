// Importing packages and functions
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import Todos from "../schema/TodoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";

export async function getTaskCode() {
    try {
        // Prompting the user to enter the todo code
        const answers = await inquirer.prompt([
            { name: 'code', message: 'Enter the code of the todo:', type: 'input' }
        ])

        // Trimming user's response so that 
        // the todo code does not contain starting or trailing whitespace
        answers.code = answers.code.trim()

        return answers
    }
    catch (error) {
        // Error handling
        console.log('Something went wrong...\n', error)
    }
}

export default async function deleteTask() {
    try {
        // obtaining the code todo provided by user
        const userCode = await getTaskCode()

        // Connecting to database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Finding and Deleting the todo...').start()

        // Delete the task
        const response = await Todos.deleteOne({ code: userCode.code })
        
        // Stopping the spinner
        spinner.stop()

        // Checking the delete operation
        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided code. Deletion failed.'))
        }
        else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        // Disconnecting from the database
        await disconnectDB()
    }
    catch (error) {
        // Error handling
        console.log('Something went wrong, Error', error);
        process.exit(1)
    }
}

// await deleteTask()
