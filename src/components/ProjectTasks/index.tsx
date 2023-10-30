import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { apiClient } from "../../provider/customAxiosClient";
import { useGlobalContext } from "../../utils/Global";
import { URL_TAREFAS, URL_TAREFAS_PLANEJAR_PROJETO } from "../../utils/api";
import { Categoria } from "../../utils/model";
import { ProjectTasksProps } from "./ProjectTasks";
import { CustomizedSectionBox } from "../Main/styles";

const ProjectTasks = (props: ProjectTasksProps) => {
  const { categories } = props;
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  const [projectText, setProjectText] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const { isLoading, setIsLoading, setRefetchTaskStatus, refetchTaskStatus } =
    useGlobalContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (selectedCategory !== null && projectText !== "") {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [selectedCategory, projectText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(parseInt((event.target as HTMLInputElement).value));
  };

  const createTask = async (catId: number, taskDecription: string) => {
    const payload = {
      id_categoria: catId,
      descricao: taskDecription,
    };

    await apiClient.post(URL_TAREFAS, payload);
  };

  const createProjectTasks = async () => {
    const currentCategory = categories
      .filter((cat) => cat.id === selectedCategory)
      .shift() as Categoria;

    setIsLoading(true);
    const payload = {
      descricao: `Categoria do projeto: ${currentCategory?.descricao}
      Projeto: ${projectText}
      `,
    };
    try {
      const res = await apiClient.post(URL_TAREFAS_PLANEJAR_PROJETO, payload);
      await Promise.all(
        res.data?.map((taskSuggestion: string) =>
          createTask(currentCategory.id, taskSuggestion)
        )
      );
      setIsLoading(false);
      enqueueSnackbar("Tarefas criadas com sucesso.", { variant: "success" });
      setRefetchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar("Erro ao criar as tarefas, tente novamente.", {
        variant: "error",
      });
    }
    setSelectedCategory(-1);
    setProjectText("");
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Projeto Inteligente &#10024;
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>&#129302; O GePeTo do TaFeito</DialogTitle>

        {!isLoading ? (
          <Box>
            <DialogContent>
              <DialogContentText>
                <Box
                  sx={{
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "row",
                      color: "warning",
                      alignContent: "center",
                      justifyContent: "center",
                      flexFlow: "row wrap",
                      alignItems: "center",
                      padding: "0px",
                    }}
                  >
                    <Typography variant="body1" sx={{ padding: "2px" }}>
                      &#10024; O GePeTo está gerando tarefas para você...
                      &#10024;
                    </Typography>

                    <Typography variant="caption">
                      Você pode fechar essa janela, será notificado quando ele
                      terminar.
                    </Typography>
                  </Box>

                  <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                  </Box>
                </Box>
                <DialogActions>
                  <Box>
                    <Button onClick={handleClose}>Fechar</Button>
                  </Box>
                </DialogActions>
              </DialogContentText>
            </DialogContent>
          </Box>
        ) : (
          <Box>
            <DialogContent>
              <DialogContentText>
                Qual seu novo objetivo? Descreva o que deseja fazer e o{" "}
                <strong>GePeTo</strong> criará tarefas para que seu objetivo
                seja alcançado.
              </DialogContentText>
              <FormControl>
                <FormLabel id="radio-button-categories">
                  <br></br>Selecione a Categoria:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-button-categories"
                  name="categories-group"
                  value={selectedCategory}
                  onChange={handleChange}
                >
                  {categories.map((cat) => {
                    return (
                      <Box key={cat.id}>
                        <FormControlLabel
                          value={cat.id}
                          control={<Radio />}
                          label={cat.descricao}
                        />
                      </Box>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Descrição do projeto"
                multiline
                fullWidth
                variant="standard"
                value={projectText}
                disabled={isLoading}
                onChange={(e) => {
                  setProjectText(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Box>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                  onClick={createProjectTasks}
                  disabled={isValidForm === false || isLoading}
                >
                  Gerar Tarefas &#10024;
                </Button>
              </Box>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default ProjectTasks;
