import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";
import { Modal } from "./primitives/Modal";
import { Button } from "./primitives/Button";

interface TaskModalProps {
  task: KanbanTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: KanbanTask) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = React.useState<string>(task?.title ?? "");
  const [description, setDescription] = React.useState(task?.description ?? "");
  const [priority, setPriority] = React.useState(task?.priority ?? "low");
  const [dueDate, setDueDate] = React.useState<string>(
    task?.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
  );

  React.useEffect(() => {
    if (task) {
      setTitle(task?.title ?? "");
      setDescription(task.description ?? "");
      setPriority(task.priority ?? "low");
      setDueDate(task.dueDate ? task.dueDate.toISOString().split("T")[0] : "");
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <h2 className="font-semibold text-lg mb-4">Edit Task</h2>

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

      {task.createdAt && (
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

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
