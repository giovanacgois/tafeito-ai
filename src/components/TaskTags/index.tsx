import { Box, Chip, IconButton, Tooltip, Input } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import { useState } from "react";
import axios from "axios";

import { TaskTagsProps } from "./TaskTags";
import { useGlobalContext } from "../../utils/Global";
import { URL_TAREFAS_ADICIONAR_ETIQUETA } from "../../utils/api";

const TaskTags = (props: TaskTagsProps) => {
  const { task } = props;
  const [isAdding, setIsAdding] = useState(false);

  const { setRefetchTaskStatus, refetchTaskStatus } = useGlobalContext();

  const renderAddButton = () => {
    return (
      <Tooltip title="Adicionar etiqueta">
        <IconButton
          color="secondary"
          edge="end"
          aria-label="Adicionar etiqueta"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          <SellIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const addTaskTag = async (tag: string) => {
    const taskId = task?.id ?? -1;
    const CUSTOM_TASK_TAG_URL = URL_TAREFAS_ADICIONAR_ETIQUETA.replace(
      ":id",
      taskId.toString()
    ).replace(":tag", tag);
    try {
      await axios.post(CUSTOM_TASK_TAG_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      console.error("erro ao adicionar tag");
    }
    setIsAdding(false);
  };

  const removeTaskTag = async (tag: string) => {
    const taskId = task?.id ?? -1;
    const CUSTOM_TASK_TAG_URL = URL_TAREFAS_ADICIONAR_ETIQUETA.replace(
      ":id",
      taskId.toString()
    ).replace(":tag", tag);
    try {
      await axios.delete(CUSTOM_TASK_TAG_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      console.error("erro ao adicionar tag");
    }
    setIsAdding(false);
  };

  const checkKeyPressed = (e: any) => {
    if (e.keyCode == 13) {
      addTaskTag(e.target.value);
    }
    if (e.keyCode == 27) {
      setIsAdding(false);
    }
  };

  const renderTextInput = () => {
    return <Input autoFocus onKeyDown={checkKeyPressed} />;
  };
  return (
    <Box display={"flex"} px={1} pb={2} alignItems={"center"} flexWrap={"wrap"}>
      {task.etiquetas.map((tag) => (
        <Box key={"task-tag-" + tag} pr={1} pb={1}>
          <Chip
            color="secondary"
            key={tag}
            label={tag}
            size="small"
            onDelete={() => removeTaskTag(tag)}
          />
        </Box>
      ))}
      {isAdding === false ? renderAddButton() : renderTextInput()}
    </Box>
  );
};

export default TaskTags;
