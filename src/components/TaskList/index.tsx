import { Box } from "@mui/material";
import List from "@mui/material/List";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_TAREFAS } from "../../utils/api";
import { usePreviousValue } from "../../utils/hooks";
import { Tarefa } from "../../utils/model";
import { TaskListProps, TaskListWrapperProps } from "./TaskList";
import Task from "../Task";
import TaskInput from "../TaskInput";
import { useGlobalContext } from "../../utils/Global";

const TaskList = (props: TaskListProps) => {
  const { tasks, categoria } = props;
  const [editTaskId, setEditTaskId] = useState<null | number>(null);
  const { setIsEditingTask } = useGlobalContext();

  const renderTasks = () => {
    return tasks.map((tarefa) => {
      return (
        <Box key={tarefa.id}>
          {tarefa.id === editTaskId ? (
            <TaskInput
              cancelTask={() => {
                setEditTaskId(null);
                setIsEditingTask(false);
              }}
              submitTask={() => {
                setEditTaskId(null);
                setIsEditingTask(false);
              }}
              category={categoria}
              task={tarefa}
            />
          ) : (
            <Task
              task={tarefa}
              onTaskChange={(taskId) => {
                setEditTaskId(taskId);
              }}
            />
          )}
        </Box>
      );
    });
  };
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {renderTasks()}
      </List>
    </Box>
  );
};

const TaskListWrapper = (props: TaskListWrapperProps) => {
  const { categoria, taskStatus } = props;
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const prevTaskStatus = usePreviousValue(taskStatus);

  const fetchtasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL_TAREFAS);
      const tasksByCategory = response.data.filter(
        (task: Tarefa) => task.id_categoria === categoria.id
      );
      setTasks(tasksByCategory);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading === false && prevTaskStatus !== taskStatus) {
      fetchtasks();
    }
  }, [taskStatus]);

  useEffect(() => {
    if (loading === false) {
      fetchtasks();
    }
  }, []);

  return <TaskList tasks={tasks} categoria={categoria} />;
};

export default TaskListWrapper;
