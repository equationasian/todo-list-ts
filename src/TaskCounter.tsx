import { Box, Typography } from "@mui/material";

export default function TaskCounter({ numTasks }: { numTasks: number }) {
    return (
      <Box sx={{
        my: 2
      }}>
        {numTasks > 0 ? 
            <Typography variant='subtitle1'>{numTasks} tasks(s) left to complete</Typography> : 
            <Typography variant='subtitle1'>All tasks have been completed</Typography>
        }
      </Box>
    );
}