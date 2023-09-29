import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardActions, TextField } from "@mui/material";
import { CustomizedCardHeader } from "./styles";
export default function Login() {
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
            <TextField fullWidth id="username" label="Usuário" variant="filled" />
          </Box>
          <Box py={1}>
          <TextField fullWidth id="password" label="Senha" variant="filled" />
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained">ENTRAR</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
