import { Box } from "@mui/material";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useSnackbar } from "notistack";
import { useGlobalContext } from "../../utils/Global";
import {
  URL_TAREFAS_ATUALIZAR,
  URL_TAREFAS_CONCLUIR,
  URL_TAREFAS_REABRIR,
} from "../../utils/api";
import DeleteTaskDialog from "../DeleteTaskDialog";
import { TaskProps } from "./Task";
import TaskTags from "../TaskTags";

const Task = (props: TaskProps) => {
  const { task, onTaskChange } = props;

  const {
    setIsEditingTask,
    setRefetchTaskStatus: setRefetchTaskStatus,
    refetchTaskStatus: refetchTaskStatus,
  } = useGlobalContext();
  const [error, setError] = useState<null | string>(null);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [checked, setChecked] = useState([0]);
  const { enqueueSnackbar } = useSnackbar();
  const labelId = `checkbox-list-label-${task.id}`;
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      completeTask();
    } else {
      newChecked.splice(currentIndex, 1);
      reopenTask();
    }

    setChecked(newChecked);
  };

  const deleteTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = URL_TAREFAS_ATUALIZAR.replace(
      ":id",
      taskId.toString()
    );
    try {
      await axios.delete(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa deletada com sucesso.", { variant: "success" });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao deletar a tarefa.", { variant: "error" });
    }
  };

  const completeTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = URL_TAREFAS_CONCLUIR.replace(
      ":id",
      taskId.toString()
    );
    try {
      await axios.post(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa concluída", { variant: "success" });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar concluir a tarefa.", {
        variant: "error",
      });
    }
  };

  const reopenTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = URL_TAREFAS_REABRIR.replace(
      ":id",
      taskId.toString()
    );
    try {
      await axios.post(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa reaberta!", { variant: "success" });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar reabrir a tarefa.", { variant: "error" });
    }
  };

  const renderFinishedText = () => {
    if (task.data_conclusao) {
      return format(parseISO(task.data_conclusao), "'Concluída em' dd/MM/yyyy");
    }
    return;
  };

  return (
    <>
      <ListItem
        key={"task-" + setIsEditingTask + task.id}
        secondaryAction={
          <Box>
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => {
                onTaskChange(task.id);
                setIsEditingTask(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="deletar"
              onClick={() => {
                if (openedDialog === false) {
                  setOpenedDialog(true);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(task.id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            primary={task.descricao}
            secondary={renderFinishedText()}
          />
        </ListItemButton>
      </ListItem>
      <TaskTags task={task} />
      <DeleteTaskDialog
        task={task}
        openedDialog={openedDialog}
        deleteCallback={() => {
          setOpenedDialog(false);
          deleteTask();
        }}
        cancelCallback={() => {
          setOpenedDialog(false);
        }}
      />
    </>
  );
};

export default Task;
