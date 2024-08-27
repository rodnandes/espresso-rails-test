import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {UserContext} from "./AppRouter";


export default function EmployeeDialog({currentEmployee, modalOpen, handleCloseModal}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { csrf_token } = useContext(UserContext)

  useEffect(() => {
    setName(currentEmployee?.name || '');
    setEmail(currentEmployee?.email || '');
  }, [currentEmployee]);

  function handleSubmit(event) {
    event.preventDefault();
    if(currentEmployee?.id) {
      editEmployee(currentEmployee.id).then(data => console.log(data));
    } else {
      createEmployee().then(data => console.log(data));
    }
    handleCloseModal();
  }

  const editEmployee = async (id) => {
    if (!id) return;

    const response = await fetch(`/api/v1/employees/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({user: {name, email}}),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf_token
      },
    });

    return await response.json();
  }


  const createEmployee = async () => {
    const response = await fetch(`/api/v1/employees`, {
      method: "POST",
      body: JSON.stringify({user: {name, email}}),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf_token
      },
    });

    return await response.json();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      keepMounted
      open={modalOpen}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
      slotProps={{backdrop: {sx: {background: 'rgba(0, 0, 0, 0.12)'}}}}
    >
      <DialogTitle sx={{p: 2}}>{currentEmployee?.id ? "Editar informações" : "Cadastar funcionário"}</DialogTitle>

      <IconButton onClick={handleCloseModal}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                  }}>
        <CloseIcon/>
      </IconButton>
      <DialogContent sx={{p: 2}}>
        <DialogContentText>
          Informe os dados
        </DialogContentText>
        <TextField
          required
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="email"
          label="E-mail"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{justifyContent: 'flex-start', p: 2}}>
        <Button variant='contained' type="submit">{currentEmployee?.id ? "Salvar" : "Cadastar"}</Button>
      </DialogActions>
    </Dialog>
  );
}