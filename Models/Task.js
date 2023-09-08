const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    identity :{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['todo', 'in progress', 'done'],
        default: 'todo',
    },
    dueDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Task', taskSchema);

