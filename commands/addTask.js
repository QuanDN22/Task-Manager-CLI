import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import Todos from "../schema/TodoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";

async function input() {
    const answers = await inquirer.prompt([
        { name: "name", message: "Enter name of the task:", type: "input" },
        { name: 'detail', message: "Enter the details of the task:", type: "input" }
    ])

    return answers
}

// const output = await input()
// console.log(output)

const askQuestion = async () => {
    const todoArray = []
    let loop = false

    do {
        const userRes = await input()
        todoArray.push(userRes)
        const confirmQ = await inquirer.prompt([
            { name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }
        ])
        if (confirmQ.confirm) {
            loop = true;
        }
        else {
            loop = false;
        }
    } while (loop)

    return todoArray
}

// const output = await askQuestion()
// console.log(output)

export default async function addTask() {
    try {
        // calling askQuestion() to get array of todo's
        const userResponse = await askQuestion()

        // connect to the database
        await connectDB()

        // Displaying a spinner with the following text message using ora
        let spinner = ora('Creating the todos...').start()

        // looping over every todo in the userResponse array
        // and saving each todo in the database
        for (let i = 0; i < userResponse.length; i++) {
            const response = userResponse[i];
            await Todos.create(response);
        }

        // Stopping the spinner and displaying the success message
        spinner.stop()
        console.log(
            chalk.greenBright('Created the todos!')
        )

        // disconnecting the database
        await disconnectDB()
    }
    catch (error) {
        // Error handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

// addTask()