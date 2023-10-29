import { Box, Typography } from "@mui/material";
import NavBar from "../NavBar";
import TaskInput from "../TaskInput";
import { CustomizedSectionBox } from "./styles";
import { useState } from "react";
import { TaskCategory } from "../TaskInput/TaskInput";

const Main = () => {
  const [selectedTaskInput, setSelectedTaskInput] = useState<string | null>(
    null
  );

  return (
    <>
      <Box
        display="flex"
        flex-weap={"wrap"}
        sx={{ margin: "8px 16px 24px 16px" }}
      ></Box>
      <CustomizedSectionBox>
        <Typography variant="h1">Suas tarefas</Typography>
      </CustomizedSectionBox>
      <CustomizedSectionBox>
        <Typography variant="h3">Pessoal</Typography>
        <div> TODO: Listar tarefas pessoais</div>
        {selectedTaskInput === null || selectedTaskInput === "Pessoal" ? (
          <TaskInput
            onSelectCreateTask={(category) => {
              setSelectedTaskInput(category);
            }}
            category={"Pessoal"}
          ></TaskInput>
        ) : null}
      </CustomizedSectionBox>
      <CustomizedSectionBox>
        <Typography variant="h3">Trabalho</Typography>
        <div> TODO: Listar tarefas do trabalho</div>
        {selectedTaskInput === null || selectedTaskInput === "Trabalho" ? (
          <TaskInput
            onSelectCreateTask={(category) => {
              setSelectedTaskInput(category);
            }}
            category={"Trabalho"}
          ></TaskInput>
        ) : null}
      </CustomizedSectionBox>
    </>
  );
};

export default Main;
