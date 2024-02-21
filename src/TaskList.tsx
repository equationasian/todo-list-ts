import { Box } from "@mui/material";
import { TaskListProps } from "./TaskInterface";
import TaskItem from "./TaskItem";

export default function TaskList({ taskList, onCheckChange, onDeleteClick, onEditClick }: TaskListProps) {
    return (
      <Box sx={{
        height: '65%',
        width: '75%',
        overflowY: 'scroll',
        borderRadius: 1
      }}>
        <ul id="tasklist">
          {taskList.map(task =>
            <TaskItem 
              task={task} 
              onCheckChange={onCheckChange}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
            />
          )}
        </ul>
      </Box>
    );
}