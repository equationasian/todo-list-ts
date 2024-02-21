import { Box, TextField, Button } from "@mui/material";
import { FormEvent } from "react";

export default function InputTask({ onTaskSubmit }: { onTaskSubmit: (e: FormEvent<HTMLFormElement>) => void }) {
    return (
      <form onSubmit={onTaskSubmit} id="input-task-form">
        <Box sx={{
          display: 'flex',
          gap: '10px'
        }}>
          <TextField
            variant='outlined'  
            placeholder="Type task..."
            name="textbox"
            autoComplete='off'
          />
          <Button variant='contained'>Add Task</Button>
        </Box>
      </form>
    );
  }