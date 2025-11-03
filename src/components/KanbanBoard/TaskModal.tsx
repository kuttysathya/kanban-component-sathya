import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";
import { Modal } from "./primitives/Modal";
import { Button } from "./primitives/Button";

interface TaskModalProps {
  task: KanbanTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: KanbanTask) => void;
  onDelete: (taskId: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = React.useState<string>(task?.title ?? "");
  const [description, setDescription] = React.useState(task?.description ?? "");
  const [priority, setPriority] = React.useState(task?.priority ?? "low");
  const [status, setStatus] = React.useState("todo");
  const [dueDate, setDueDate] = React.useState<string>(
    task?.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
  );

  React.useEffect(() => {
    if (task) {
      setTitle(task?.title ?? "");
      setDescription(task.description ?? "");
      setPriority(task.priority ?? "low");
      setStatus(task.status ?? "todo");
      setDueDate(task.dueDate ? task.dueDate.toISOString().split("T")[0] : "");
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!task) return;
    onSave({
      ...task,
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <h2 id="modal-title" className="font-semibold text-lg mb-4">
        {task?.title ? "Edit Task" : "Create Task"}
      </h2>

      <div id="modal-description" className="sr-only">
        Fill form fields to create or edit a task. Press Escape to close modal.
      </div>

      <label className="text-sm font-medium">Title</label>
      <input
        className="w-full border p-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="text-sm font-medium">Description</label>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="text-sm font-medium">Priority</label>
      <select
        className="w-full border p-2 rounded mb-3"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high" | "urgent")
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <label className="text-sm font-medium">Status / Column</label>
      <select
        className="w-full border p-2 rounded mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>

      {task?.createdAt && (
        <p className="text-xs text-neutral-500 mb-2">
          Created on: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      )}

      <label className="text-sm font-medium">Due Date</label>
      <input
        type="date"
        className="w-full border p-2 rounded mb-4"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex justify-between mt-3">
        {task?.id && (
          <Button
            variant="secondary"
            className="text-red-600 border-red-400"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
