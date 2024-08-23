import React from "react"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SignUpPage = (props) => {

  return (
    <Box sx={{display: 'flex', background: '#2196f3', minHeight: '100vh' }}>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{width: '180px', alignSelf: 'center', my: 6}}>
          <img src="/assets/espressoLogo.svg"
               alt="Espresso Logo"/>
        </Box>
        <Paper bgcolor='white' sx={{p: 2, mb: 6}}>
          <form id="signup" action="/users" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <input type="hidden" name="authenticity_token" value={props.csrf_token}/>
            <Box sx={{mb: 4}}>
              <Typography variant="h5">Criar conta</Typography>
            </Box>
            <Box>
              <Typography sx={{my: 2}}>Informe seus dados pessoais</Typography>
              <TextField sx={{mb: 2}} fullWidth label="Nome" id="user_name" name="user[name]"/>
              <TextField sx={{mb: 2}} fullWidth label="E-mail" id="user_email" name="user[email]"/>
              <TextField sx={{mb: 2}} fullWidth label="Senha" id="user_password" name="user[password]"/>
              <TextField sx={{mb: 2}} fullWidth label="Confirmação da senha" id="user_password_confirmation"
                         name="user[password_confirmation]"/>
              <TextField sx={{mb: 2}} fullWidth label="Nome da empresa" id="company_name"
                         name="user[company_attributes][name]"/>
              <TextField sx={{mb: 2}} fullWidth label="CNPJ" id="company_cnpj" name="user[company_attributes][cnpj]"/>
            </Box>
            <Button variant='contained' type="submit">Criar conta</Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}


export default SignUpPage
