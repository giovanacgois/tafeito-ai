import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

import { TaskInputProps } from "./TaskInput";
import { URL_TAREFAS } from "../../utils/api";
import { enqueueSnackbar } from "notistack";

const TaskInput = (props: TaskInputProps) => {
  const { onSelectCreateTask, category } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState<null | string>(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<null | string>(null);

  const onClick = () => {
    onSelectCreateTask(category.descricao);
    setIsOpen(true);
  };

  const cancelCreateTask = () => {
    onSelectCreateTask(null);
    setTaskDescription(null);
    setIsOpen(false);
  };

  const createTask = async () => {
    const payload = {
      // your post data goes here
      id_categoria: category.id,
      descricao: taskDescription,
    };

    try {
      const response = await axios.post(URL_TAREFAS, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponse(response.data);
      setError(null);
      setTaskDescription(null);
      onSelectCreateTask(null);
      setIsOpen(false);
      enqueueSnackbar("Tarefa criada", { variant: "success" });
    } catch (err) {
      setResponse(null);
      setError((err as Error).message);
      enqueueSnackbar("Erro ao criar tarefa", { variant: "error" });

    }
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
            Adicionar Tarefa
          </Button>
        </Box>
      ) : (
        <Box>
          <Card>
            <CardContent>
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                value={taskDescription}
                onChange={(event) => setTaskDescription(event.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                component="label"
                variant="contained"
                onClick={cancelCreateTask}
              >
                Cancelar
              </Button>
              <Button
                component="label"
                variant="contained"
                onClick={createTask}
              >
                Criar
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default TaskInput;
