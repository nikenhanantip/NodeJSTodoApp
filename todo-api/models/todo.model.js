const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const todoSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    deadline: {
        type: Date,
        default: Date.now,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false
});

// Define sequence attribute
todoSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Todo', todoSchema);