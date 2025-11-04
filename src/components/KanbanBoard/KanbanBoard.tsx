import React from "react";
import KanbanColumn from "./KanbanColumn";
import type {
  KanbanColumn as ColumnType,
  KanbanTask,
} from "./KanbanBoard.types";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";
import TaskModal from "./TaskModal";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
  const [selectedTask, setSelectedTask] = React.useState<KanbanTask | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [taskState, setTaskState] = React.useState(
    Object.fromEntries(
      Object.entries(tasks).map(([id, t]) => [
        id,
        { ...t, createdAt: new Date(t.createdAt) },
      ])
    )
  );
  const [priorityFilter, setPriorityFilter] = React.useState("");
  const [assigneeFilter, setAssigneeFilter] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState("");

  const handleTaskClick = (task: KanbanTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskSave = (updatedTask: KanbanTask) => {
    setTaskState((prev) => ({
      ...prev,
      [updatedTask.id]: updatedTask,
    }));

    const column = data.columns.find((col) => col.id === updatedTask.status);
    if (column && !column.taskIds.includes(updatedTask.id)) {
      column.taskIds.push(updatedTask.id);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTaskState((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleAddTask = (columnId: string) => {
    setSelectedTask({
      id: Date.now().toString(),
      title: "",
      description: "",
      status: columnId,
      createdAt: new Date(),
      priority: "low",
    });
    setIsModalOpen(true);
  };

  const handleBulkDelete = () => {
    selectedTasks.forEach((id) => handleDeleteTask(id));
    clearSelection();
  };


  const {
    data,
    draggingTaskId,
    overColumnId,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    keyboardDrag,
    moveTaskKeyboard,
    cancelKeyboardDrag,
    renameColumn,
    toggleColumn,
    collapsedColumns,
    selectedTasks,
    toggleTaskSelect,
    clearSelection,
    isColumnOverLimit,
  } = useKanbanBoard({ columns });

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        Kanban Board
      </h2>

      {selectedTasks.length > 0 && (
        <div className="sticky top-0 z-50 flex items-center gap-3 mb-4 bg-yellow-50 border border-yellow-300 p-3 rounded-md animate-fadeIn">
          <span className="text-sm text-neutral-700 font-medium">
            {selectedTasks.length} selected
          </span>

          <button
            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
            onClick={handleBulkDelete}
          >
            Delete Selected
          </button>

          <button
            className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300 transition"
            onClick={clearSelection}
          >
            Clear
          </button>
        </div>
      )}

      <div aria-live="assertive" className="sr-only">
        {draggingTaskId && overColumnId
          ? `Moving task to ${overColumnId} column`
          : ""}
      </div>

      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          placeholder="Search tasks..."
          className="border rounded px-3 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => handleAddTask("To Do")}
          className="text-sm bg-blue-600 px-3 py-2 rounded-md text-white hover:bg-blue-700"
        >
          + Add task
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex items-center gap-2 text-base">
          <label
            htmlFor="priority-filter"
            className="text-neutral-700 font-medium"
          >
            Priority:
          </label>

          <select
            id="priority-filter"
            className="border border-neutral-300 rounded-md px-3 py-1.5 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <label
            htmlFor="assignee-filter"
            className="text-neutral-700 font-medium"
          >
            Assignee:
          </label>

          <select
            id="assignee-filter"
            className="border border-neutral-300 rounded-md px-3 py-1.5 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="">All</option>
            {Object.values(taskState)
              .map((t) => t.assignee)
              .filter(Boolean)
              .filter((v, i, s) => s.indexOf(v) === i)
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="tag-filter" className="text-neutral-700 font-medium">
            Tag
          </label>
          <select
            id="tag-filter"
            className="border border-neutral-300 rounded-md px-3 py-1.5 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All</option>
            {Object.values(taskState)
              .flatMap((t) => t.tags || [])
              .filter((v, i, s) => s.indexOf(v) === i)
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 pb-4 flex-col md:flex-row overflow-x-auto md:overflow-y-hidden overflow-y-auto md:overflow-x-auto snap-y md:snap-x snap-mandatory ">
        {data.columns.map((column) => {
          const filteredTasks = column.taskIds
            .map((id) => taskState[id])
            .filter(Boolean)
            .filter((t) =>
              t.title.toLowerCase().includes(search.toLowerCase()) &&
              (!priorityFilter || t.priority === priorityFilter) &&
              (!assigneeFilter || t.assignee === assigneeFilter) &&
              (!tagFilter || t.tags?.includes(tagFilter))
            );

          return (
            <div key={column.id}
              className="min-w-full md:min-w-[300px] md:max-w-[300px]"
            >
              <KanbanColumn
                column={column}
                tasks={filteredTasks}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                draggingTaskId={draggingTaskId}
                isOver={overColumnId === column.id}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
                keyboardDrag={keyboardDrag}
                moveTaskKeyboard={moveTaskKeyboard}
                cancelKeyboardDrag={cancelKeyboardDrag}
                renameColumn={renameColumn}
                toggleColumn={toggleColumn}
                collapsedColumns={collapsedColumns}
                onDeleteTask={handleDeleteTask}
                selectedTasks={selectedTasks}
                toggleTaskSelect={toggleTaskSelect}
                isColumnOverLimit={isColumnOverLimit}
              />
            </div>
          );
        })}
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleTaskSave}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default KanbanBoard;
