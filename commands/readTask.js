// Importing packages and functions
import chalk from "chalk";
import ora from "ora";

import Todos from "../schema/TodoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";

export default async function readTask() {
    try {
        // connecting to database
        await connectDB()

        // starting the spinner
        const spinner = ora('Fetching all todos...').start()

        // fetching all the todos from the database
        const todos = await Todos.find({})

        // stopping the spinner
        spinner.stop()

        // check if todos exists or not
        if (todos.length === 0) {
            console.log(chalk.blueBright('You do not have any tasks yet!'))
        } else {
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo Code: ' ) + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                )
            })
        }

        // disconnecting to database
        await disconnectDB()
    }
    catch (error) {
        // Error handling
        console.error(error);
        process.exit(1);
    }
} 

// readTask()