export default function TaskCard({ task, onDelete, onUpdate }) {
  return (
    <div className="task-card hover-card">
      {/* Task Title */}
      <h3 className="task-title">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Dates */}
      <p className="task-date">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
      </p>
      <p className="task-date">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
      <p className="task-date">
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <button onClick={() => onUpdate(task)} className="btn btn-primary">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
