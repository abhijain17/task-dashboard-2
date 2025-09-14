const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'To Do' },
  dueDate: Date,
  customFields: Object,
}, { timestamps: true }); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Task', TaskSchema);
