import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  Box,
  CardActions,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CustomizedCardHeader } from "./styles";
import { useEffect, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      username !== null &&
      username !== "" &&
      password !== null &&
      password !== ""
    ) {
      setIsButtonActive(false);
    }
  }, [username, password]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const postLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: username,
        senha: password,
      }),
    };
    setErrorMessage("");
    fetch("http://localhost:3000/usuarios/login", requestOptions)
      .then(async (response) => {
        const dataResponse = await response.json();
        return {
          responseStatus: response.status,
          data: dataResponse,
        };
      })
      .then((data) => {
        if (data.responseStatus === 422 && data.data?.mensagem) {
          setErrorMessage(data.data?.mensagem);
        } else if (data.responseStatus === 400) {
          setErrorMessage("Requisição inválida!");
        } else if (data.responseStatus === 200) {
          navigate('/tarefas');
        }
      })
      .catch((error) =>
        setErrorMessage("Erro no servidor, tente novamente em alguns minutos!")
      );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 480 }}>
        <CustomizedCardHeader
          title={"TaFeito"}
          subheader={"Transforme suas tarefas em ações"}
        ></CustomizedCardHeader>

        <CardContent>
          <Box py={1}>
            <TextField
              fullWidth
              id="username"
              label="Usuário"
              variant="filled"
              value={username}
              onChange={(newValue) => setUsername(newValue.target.value)}
            />
          </Box>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              onChange={(newValue) => {
                setPassword(newValue.target.value);
              }}
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </CardContent>

        <CardActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Box width={"100%"}>
              {errorMessage && (
                <Typography color={"red"}>{errorMessage}</Typography>
              )}
            </Box>
            <Box width={"100%"}>
              <Button
                sx={{ width: "100%" }}
                onClick={() => postLogin()}
                disabled={isButtonActive}
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
