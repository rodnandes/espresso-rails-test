import React, {useState} from "react"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export default function CategoryDialog({modalOpen, handleCloseModal}) {

  const [categoryName, setCategoryName] = useState('');

  function handleSubmit(event) {
    // TODO: Implement API submission
    event.preventDefault();
    console.log(categoryName);
    handleCloseModal();
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
      <DialogTitle sx={{p: 2}}>Cadastrar categoria</DialogTitle>

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
          Informe o nome da categoria
        </DialogContentText>
        <TextField
          required
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{justifyContent: 'flex-start', p: 2}}>
        <Button variant='contained' type="submit">Cadastrar</Button>
      </DialogActions>
    </Dialog>
  );
}
