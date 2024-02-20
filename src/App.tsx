import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css'

let taskId: number = 1;

interface Task {
  id: number;
  description: string;
  isComplete: boolean;
}

interface TaskItemProps {
  task: Task;
  onCheckChange: (id: number) => boolean;
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number, newTask: string) => void;
}

interface TaskListProps {
  taskList: Task[];
  onCheckChange: (id: number) => boolean;
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number, newTask: string) => void;
}

function InputTask({ onTaskSubmit }: { onTaskSubmit: (e: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onTaskSubmit}>
      <input 
        type="text" 
        placeholder="Type task..."
        name="textbox"
        autoComplete='off'
      >
      </input>
      <button>Add Task</button>
    </form>
  );
}

function TaskCounter({ numTasks }: { numTasks: number }) {
  return (
    <>
      {numTasks > 0 ? <p>{numTasks} tasks(s) left to complete</p> : <p>All tasks have been completed</p>}
    </>
  );
}

function TaskList({ taskList, onCheckChange, onDeleteClick, onEditClick }: TaskListProps) {
  return (
    <ul>
      {taskList.map(task =>
        <TaskItem 
          task={task} 
          onCheckChange={onCheckChange}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      )}
    </ul>
  );
}

function TaskItem({ task, onCheckChange, onDeleteClick, onEditClick }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.description);

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewTask(e.target.value);
  }

  return (
    <li key={task.id}>
      <input 
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onCheckChange(task.id)}
        />
        {isEditing ?
          <input 
            type="text" 
            value={newTask} 
            onChange={handleNewTaskChange}
            placeholder={task.description}
          /> :
          <span>{task.description}</span>
        }
        <button onClick={() => {
          if (isEditing) {
            onEditClick(task.id, newTask);
            setIsEditing(false);
          }
          else {
            setIsEditing(true);
          }
        }}>edit</button>
        <button onClick={() => onDeleteClick(task.id)}>delete</button>
    </li>
  );
}

export default function App() {
  const [list, setList] = useState<Task[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setList([...list, {
      id: taskId,
      description: e.currentTarget.textbox.value,
      isComplete: false
    }]);
    e.currentTarget.reset();
    ++taskId;
  }

  function handleChecked(id: number): boolean {
    const editList = list.slice();
    const taskIndex = editList.findIndex(task => task.id === id);

    editList[taskIndex] = {
      ...editList[taskIndex],
      isComplete: !editList[taskIndex].isComplete
    };
    setList(editList);

    return editList[taskIndex].isComplete;
  }

  function handleDelete(id: number): void {
    setList(list.filter(task => task.id !== id));
  }

  function handleEdit(id: number, newTask: string): void {
    const editList = list.slice();
    const taskIndex = editList.findIndex(task => task.id === id);
    editList[taskIndex].description = newTask;
    setList(editList); 
  }

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <InputTask onTaskSubmit={handleSubmit} />
      <TaskCounter numTasks={list.filter(task => !task.isComplete).length} />
      <TaskList 
        taskList={list}
        onCheckChange={handleChecked}
        onDeleteClick={handleDelete} 
        onEditClick={handleEdit}
      />
    </div>
  );
}