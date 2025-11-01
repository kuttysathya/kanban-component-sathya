import React from "react";
import KanbanColumn from "./KanbanColumn";
import type { KanbanColumn as ColumnType, KanbanTask } from "./KanbanBoard.types";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";
import TaskModal from "./TaskModal";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
const [taskState, setTaskState] = React.useState(tasks);
const [selectedTask, setSelectedTask] = React.useState<KanbanTask | null>(null);
const [isModalOpen, setIsModalOpen] = React.useState(false);

const handleTaskClick = (task: KanbanTask) => {
  setSelectedTask(task);
  setIsModalOpen(true);
};

 const handleTaskSave = (updatedTask: KanbanTask) => {
    
    setTaskState((prev) => ({
      ...prev,
      [updatedTask.id]: updatedTask,
    }));
    setIsModalOpen(false);
  };

  const {
    data, draggingTaskId, overColumnId,
    onDragStart, onDragOver, onDragLeave, onDrop
  } = useKanbanBoard({ columns });

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        Kanban Board
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={column.taskIds.map((id) => taskState[id])}     //use updated tasks
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            draggingTaskId={draggingTaskId}
            isOver={overColumnId === column.id}
            onTaskClick={handleTaskClick}                     //click to edit
          />
        ))}
      </div>

     <TaskModal
        task={selectedTask} 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleTaskSave}
      /> 
    </div>
  );
};

export default KanbanBoard;
