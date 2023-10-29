import { Box, CardActions, TextField } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TaskInputProps } from "./TaskInput";

const TaskInput = (props: TaskInputProps) => {
  const { onSelectCreateTask, category } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    onSelectCreateTask(category);
    setIsOpen(true);
  };
  const cancelCreateTask = () => {
    onSelectCreateTask(null);
    setIsOpen(false);
  };

  const createTask = async () => {
    alert("Criando tarefa :)");
    onSelectCreateTask(null);
    setIsOpen(false);
  };

  return (
    <Box>
      {isOpen === false ? (
        <Box>
          <Button
            component="label"
            variant="contained"
            onClick={onClick}
            startIcon={<CloudUploadIcon />}
          >
            Adicionar tarefa
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField id="standard-basic" label="standard" variant="standard" />
          <CardActions
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              // 👇 Edit padding to further adjust position
              p: 2,
            }}
          >
            <Button
              component="label"
              variant="contained"
              onClick={cancelCreateTask}
            >
              Cancelar
            </Button>
            <Button component="label" variant="contained" onClick={createTask}>
              Criar
            </Button>
          </CardActions>
        </Box>
      )}
    </Box>
  );
};

export default TaskInput;
