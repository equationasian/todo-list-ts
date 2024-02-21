export interface Task {
    id: number;
    description: string;
    isComplete: boolean;
}

export interface TaskItemProps {
    task: Task;
    onCheckChange: (id: number) => boolean;
    onDeleteClick: (id: number) => void;
    onEditClick: (id: number, newTask: string) => void;
}

export interface TaskListProps {
    taskList: Task[];
    onCheckChange: (id: number) => boolean;
    onDeleteClick: (id: number) => void;
    onEditClick: (id: number, newTask: string) => void;
}