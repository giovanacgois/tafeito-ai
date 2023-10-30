import { Box } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { apiClient } from "../../provider/customAxiosClient";
import { useGlobalContext } from "../../utils/Global";
import { URL_TAREFAS } from "../../utils/api";
import { usePreviousValue } from "../../utils/hooks";
import { Tarefa } from "../../utils/model";
import Task from "../Task";
import TaskInput from "../TaskInput";
import { TaskListProps, TaskListWrapperProps } from "./TaskList";

const TaskList = (props: TaskListProps) => {
  const { tasks, categoria } = props;
  const [editTaskId, setEditTaskId] = useState<null | number>(null);
  const { setIsEditingTask, softDeletedTasks } = useGlobalContext();

  const renderTasks = () => {
    return tasks
      .filter((task) => {
        return softDeletedTasks.includes(task.id) === false;
      })
      .map((tarefa) => {
        return (
          <Box key={"task-list-task-" + tarefa.id}>
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
      const response = await apiClient.get(URL_TAREFAS);
      const tasksByCategory = response.data
        .filter((task: Tarefa) => task.id_categoria === categoria.id)
        .sort((taskA: Tarefa, taskB: Tarefa) => {
          return taskA.id - taskB.id;
        });
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
