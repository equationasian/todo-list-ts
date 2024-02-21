import { FormEvent, useState } from 'react';
import "./App.css";
import InputTask from './InputTask';
import TaskCounter from './TaskCounter';
import TaskList from './TaskList';
import { Task } from './TaskInterface';
import { Typography, Box } from '@mui/material';

let taskId: number = 1;

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
    <Box sx={{
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Typography variant='h4' sx={{mb: 3}}>Todo List</Typography>
      <InputTask onTaskSubmit={handleSubmit} />
      <TaskCounter numTasks={list.filter(task => !task.isComplete).length} />
      <TaskList 
        taskList={list}
        onCheckChange={handleChecked}
        onDeleteClick={handleDelete} 
        onEditClick={handleEdit}
      />
    </Box>
  );
}