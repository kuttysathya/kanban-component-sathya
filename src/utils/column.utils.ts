export const reorderTasks = (tasks: string[], start: number, end: number) => {
  const list = [...tasks];
  const [removed] = list.splice(start, 1);
  list.splice(end, 0, removed);
  return list;
};