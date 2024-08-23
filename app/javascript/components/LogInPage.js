import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LogInPage = (props) => {

  return (
    <Box sx={{display: 'flex', background: '#2196f3', minHeight: '100vh', p: 4}}>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Box sx={{width: '180px', alignSelf: 'center', mb: 6}}>
        <img src="/assets/espressoLogo.svg"
             alt="Espresso Logo"/>
      </Box>
        <Paper bgcolor='white' sx={{p: 4, mb: 6}}>
          <form id="login" action="/users/sign_in" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <input type="hidden" name="authenticity_token" value={props.csrf_token}/>
            <Box sx={{mb: 4}}>
              <Typography variant="h5">Logar no Espresso</Typography>
            </Box>
            <Box sx={{mb: 2}}>
              <TextField sx={{mb: 2}} fullWidth label="E-mail" id="user_email" name="user[email]"/>
              <TextField sx={{mb: 2}} fullWidth label="Senha" id="user_password" name="user[password]"/>
            </Box>
            <Button variant='contained' type="submit" sx={{mr: 2}}>Entrar</Button>
            <Button variant='outlined' href="/users/sign_up">Criar conta</Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default LogInPage
