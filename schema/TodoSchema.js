import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['completed', 'pending'],
        default: 'pending',
        trim: true
    },
    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    }
}, {
    timestamps: true
});

TodoSchema.pre('save', function(next) {
    this.code = nanoid(20)
    next()
})

const Todos = mongoose.model('Todo', TodoSchema)
export default Todos