import { useState } from 'react';

export default function AddTaskModal({ onClose, onSave, defaultTask }) {
  const [form, setForm] = useState(
    defaultTask || { title: '', description: '', status: 'To Do', dueDate: '' }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title) return alert('Title required');
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg border border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {defaultTask ? 'Edit Task' : 'Add Task'}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="Status (To Do/In Progress/Done)"
          className="w-full mb-4 p-2 border rounded border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
