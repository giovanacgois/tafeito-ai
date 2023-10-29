import { Box, Typography } from "@mui/material";
import TaskInput from "../TaskInput";
import { CustomizedSectionBox } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_CATEGORIAS } from "../../utils/api";
import { Categoria } from "../../utils/model";
import { MainProps } from "./Main";

const Main = (props: MainProps) => {
  const [selectedTaskInput, setSelectedTaskInput] = useState<string | null>(
    null
  );

  const { categorias } = props;
  const renderCategoriaSection = (categoriaItem: Categoria) => {
    return (
      <CustomizedSectionBox key={categoriaItem.id}>
        <Typography variant="h3">{categoriaItem.descricao}</Typography>
        <div> TODO: Listar tarefas {categoriaItem.descricao}</div>
        {selectedTaskInput === null ||
        selectedTaskInput === categoriaItem.descricao ? (
          <TaskInput
            onSelectCreateTask={(category) => {
              setSelectedTaskInput(category);
            }}
            category={categoriaItem.descricao}
          ></TaskInput>
        ) : null}
      </CustomizedSectionBox>
    );
  };

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

      {categorias.map((categoria) => renderCategoriaSection(categoria))}
    </>
  );
};

const MainWrapper = () => {
  const [categorias, setCategorias] = useState<null | Categoria[]>(null);
  useEffect(() => {
    axios.get(URL_CATEGORIAS).then((response) => {
      setCategorias(response.data);
    });
  }, []);

  console.log(categorias);

  if (categorias !== null) {
    return <Main categorias={categorias} />;
  }
  return <div>Loading!</div>;
};

export default MainWrapper;
