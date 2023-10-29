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
      <CustomizedSectionBox key={categoriaItem.id} pt={2} pb={1}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem",
            marginBottom: "8px",
          }}
        >
          {categoriaItem.descricao}
        </Typography>
        {selectedTaskInput === null ||
        selectedTaskInput === categoriaItem.descricao ? (
          <TaskInput
            category={categoriaItem}
            onSelectCreateTask={(category) => {
              setSelectedTaskInput(category);
            }}
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
        sx={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}
      ></Box>
      <CustomizedSectionBox>
        <Typography
          variant="h1"
          sx={{
            fontSize: "3rem",
          }}
        >
          Suas tarefas
        </Typography>
      </CustomizedSectionBox>

      {categorias.map((categoria) => renderCategoriaSection(categoria))}
    </>
  );
};

const MainWrapper = () => {
  const [categorias, setCategorias] = useState<null | Categoria[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORIAS);
      setCategorias(response.data);
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
    fetchCategories();
  }, []);

  if (categorias !== null) {
    return <Main categorias={categorias} />;
  }
  return <div>Loading!</div>;
};

export default MainWrapper;
