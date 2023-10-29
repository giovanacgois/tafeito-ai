type TaskCategory = "Trabalho" | "Pessoal";

export type TaskInputProps = {
  onSelectCreateTask: (category: TaskCategory | null) => void;
  category: TaskCategory;
};
