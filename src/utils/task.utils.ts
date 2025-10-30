export const isOverdue = (dueDate: Date) => new Date() > dueDate;
export const getInitials = (name: string) => name.split(' ').map(x => x[0]).join('').toUpperCase();
