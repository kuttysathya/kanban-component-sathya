import { useState } from "react";
import type { KanbanColumn } from "../components/KanbanBoard/KanbanBoard.types";

export interface KanbanBoardData {
  columns: KanbanColumn[];
}

export const useKanbanBoard = (initialData: KanbanBoardData) => {
  const [data, setData] = useState(initialData);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const renameColumn = (columnId: string, newTitle: string) => {
    setData((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      ),
    }));
  };

  const deleteColumn = (columnId: string) => {
    setData((prev) => ({
      columns: prev.columns.filter((col) => col.id !== columnId),
    }));
  };

  const [keyboardDrag, setKeyboardDrag] = useState({
    taskId: null as string | null,
    columnId: null as string | null,
  });

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const toggleTaskSelect = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const clearSelection = () => setSelectedTasks([]);

  const isColumnOverLimit = (columnId: string): boolean => {
    const col = data.columns.find((c) => c.id === columnId);
    if (!col || !col.limit) return false;
    return col.taskIds.length >= col.limit;
  };
  const isColumnNearLimit = (columnId: string): boolean => {
    const col = data.columns.find((c) => c.id === columnId);
    if (!col || !col.limit) return false;
    return (
      col.taskIds.length >= col.limit * 0.8 && col.taskIds.length < col.limit
    );
  };

  const onDragStart = (taskId: string, columnId: string) => {
    setDraggingTaskId(taskId);
    setSourceColumnId(columnId);
    setKeyboardDrag({ taskId, columnId });
  };

  const onDragOver = (columnId: string) => {
    setOverColumnId(columnId);
  };

  const onDragLeave = (columnId: string) => {
    if (overColumnId === columnId) {
      setOverColumnId(null);
    }
  };

  const onDrop = (targetColumnId: string) => {
    if (!draggingTaskId || !sourceColumnId) return;
    if (targetColumnId === sourceColumnId) return;

    const updatedCols = data.columns.map((col) => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          taskIds: col.taskIds.filter((id) => id !== draggingTaskId),
        };
      }

      if (col.id === targetColumnId) {
        return { ...col, taskIds: [...col.taskIds, draggingTaskId] };
      }

      return col;
    });

    setData({ columns: updatedCols });

    // ✅ Reset drag state
    setDraggingTaskId(null);
    setSourceColumnId(null);
    setOverColumnId(null);
    setKeyboardDrag({ taskId: null, columnId: null });
  };

  const moveTaskKeyboard = (
    taskId: string,
    columnId: string,
    direction: "up" | "down" | "left" | "right"
  ) => {
    const colIndex = data.columns.findIndex((c) => c.id === columnId);
    const column = data.columns[colIndex];
    const taskIndex = column.taskIds.indexOf(taskId);

    // Inside same column
    if (direction === "up" && taskIndex > 0) {
      const updated = [...column.taskIds];
      updated.splice(taskIndex, 1);
      updated.splice(taskIndex - 1, 0, taskId);

      const updatedCols = [...data.columns];
      updatedCols[colIndex] = { ...column, taskIds: updated };

      setData({ columns: updatedCols });
    }

    if (direction === "down" && taskIndex < column.taskIds.length - 1) {
      const updated = [...column.taskIds];
      updated.splice(taskIndex, 1);
      updated.splice(taskIndex + 1, 0, taskId);

      const updatedCols = [...data.columns];
      updatedCols[colIndex] = { ...column, taskIds: updated };

      setData({ columns: updatedCols });
    }

    // Move across columns
    if (direction === "left" && colIndex > 0) {
      const prevCol = data.columns[colIndex - 1];
      const updatedSource = column.taskIds.filter((id) => id !== taskId);
      const updatedTarget = [...prevCol.taskIds, taskId];

      const updatedCols = [...data.columns];
      updatedCols[colIndex] = { ...column, taskIds: updatedSource };
      updatedCols[colIndex - 1] = { ...prevCol, taskIds: updatedTarget };

      setData({ columns: updatedCols });
      setKeyboardDrag({ taskId, columnId: prevCol.id });
    }

    if (direction === "right" && colIndex < data.columns.length - 1) {
      const nextCol = data.columns[colIndex + 1];
      const updatedSource = column.taskIds.filter((id) => id !== taskId);
      const updatedTarget = [...nextCol.taskIds, taskId];

      const updatedCols = [...data.columns];
      updatedCols[colIndex] = { ...column, taskIds: updatedSource };
      updatedCols[colIndex + 1] = { ...nextCol, taskIds: updatedTarget };

      setData({ columns: updatedCols });
      setKeyboardDrag({ taskId, columnId: nextCol.id });
    }
  };

  const cancelKeyboardDrag = () => {
    setKeyboardDrag({ taskId: null, columnId: null });
    setDraggingTaskId(null);
  };

  return {
    data,
    draggingTaskId,
    overColumnId,
    onDragOver,
    onDragLeave,
    onDragStart,
    onDrop,
    keyboardDrag,
    moveTaskKeyboard,
    cancelKeyboardDrag,
    collapsedColumns,
    toggleColumn,
    renameColumn,
    deleteColumn,
    selectedTasks,
    toggleTaskSelect,
    clearSelection,
    isColumnOverLimit,
    isColumnNearLimit,
  };
};
