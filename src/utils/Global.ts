import { createContext, useContext } from "react";

export type GlobalContent = {
  isEditingTask: boolean;
  setIsEditingTask: (c: boolean) => void;
  selectedTaskInput: string | null;
  setSelectedTaskInput: (c: string | null) => void;
  refetchTaskStatus: number;
  setRefetchTaskStatus: (c: number) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isEditingTask: false,
  setIsEditingTask: () => {},
  selectedTaskInput: null,
  setSelectedTaskInput: () => {},
  refetchTaskStatus: 0,
  setRefetchTaskStatus: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
