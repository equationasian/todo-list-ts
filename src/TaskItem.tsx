import { TaskItemProps } from "./TaskInterface";
import { useState, ChangeEvent } from "react";
import { Box, Typography, Checkbox, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskItem({ task, onCheckChange, onDeleteClick, onEditClick }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(task.description);
  
    function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>): void {
      setNewTask(e.target.value);
    }
  
    return (
      <li key={task.id} className="taskitem">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          border: 1,
          height: '5rem'
        }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center'
          }}>
            <Checkbox 
                checked={task.isComplete}
                onChange={() => onCheckChange(task.id)}
              />
              {isEditing ?
                <TextField
                  variant='outlined' 
                  value={newTask} 
                  onChange={handleNewTaskChange}
                  placeholder={task.description}
                /> :
                <Typography>{task.description}</Typography>
              }
            </Box>
            <Box sx={{
              display: 'flex',
              gap: 2
            }}>
              <IconButton color='primary' onClick={() => {
                if (isEditing) {
                  onEditClick(task.id, newTask);
                  setIsEditing(false);
                }
                else {
                  setIsEditing(true);
                }
              }}>
                <EditIcon />
              </IconButton>
              <IconButton color='primary' onClick={() => onDeleteClick(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
      </li>
    );
}