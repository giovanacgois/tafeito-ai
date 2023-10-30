import { createContext, useContext } from "react";

export type GlobalContent = {
  isEditingTask: boolean;
  setIsEditingTask: (c: boolean) => void;
  selectedTaskInput: string | null;
  setSelectedTaskInput: (c: string | null) => void;
  refetchTaskStatus: number;
  setRefetchTaskStatus: (c: number) => void;
  isLoading: boolean;
  setIsLoading: (c: boolean) => void;
  softDeletedTasks: number[];
  setSoftDeletedTasks: (c: number[]) => void;
  softDeletedTasksRef: any;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isEditingTask: false,
  setIsEditingTask: () => {},
  selectedTaskInput: null,
  setSelectedTaskInput: () => {},
  refetchTaskStatus: 0,
  setRefetchTaskStatus: () => {},
  isLoading: false,
  setIsLoading: () => {},
  softDeletedTasks: [],
  setSoftDeletedTasks: () => {},
  softDeletedTasksRef: [],
});

export const useGlobalContext = () => useContext(MyGlobalContext);
