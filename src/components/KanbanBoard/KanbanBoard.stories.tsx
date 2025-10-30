import type { Meta, StoryObj } from '@storybook/react';
import KanbanBoard from './KanbanBoard';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Kanban/KanbanBoard',
  component: KanbanBoard,
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {};