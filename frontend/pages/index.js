import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [statuses, setStatuses] = useState(['To Do', 'In Progress', 'Done']);
  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSave = async (task) => {
    if (editTask) {
      const res = await axios.put(`${API}/${editTask._id}`, task);
      setTasks(tasks.map(t => t._id === editTask._id ? res.data : t));
    } else {
      const res = await axios.post(API, task);
      setTasks([...tasks, res.data]);
    }
    setModal(false);
    setEditTask(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      const updated = tasks.map(t =>
        t._id === draggableId ? { ...t, status: destination.droppableId } : t
      );
      setTasks(updated);
      axios.put(`${API}/${draggableId}`, { status: destination.droppableId });
    }
  };

  const addColumn = () => {
    const name = prompt('New column name:');
    if (name) setStatuses([...statuses, name]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="dashboard-title">TASK DASHBOARD</h1>
        <div className="flex gap-2">
          <button onClick={() => setModal(true)} className="btn btn-success">
            + Add Task
          </button>
          <button onClick={addColumn} className="btn btn-info">
            + Add Column
          </button>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="btn btn-dark"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 overflow-x-auto">
          {statuses.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  <h2 className="column-title">{status}</h2>
                  {tasks.filter(t => t.status === status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDelete}
                            onUpdate={(t) => { setEditTask(t); setModal(true); }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal */}
      {modal && (
        <AddTaskModal
          onClose={() => { setModal(false); setEditTask(null); }}
          onSave={handleSave}
          defaultTask={editTask}
        />
      )}
    </div>
  );
}
