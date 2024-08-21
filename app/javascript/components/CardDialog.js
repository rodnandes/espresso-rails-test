import React, {useEffect, useState} from "react"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export default function CardDialog({currentCard, modalOpen, handleCloseModal}) {

  const [last4Digits, setLast4Digits] = useState('');
  const [cardUser, setCardUser] = useState('');
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setLast4Digits(currentCard?.last4 || '');
    setCardUser(currentCard?.user || '');
    setIsNew(currentCard === null || currentCard?.id === undefined);
  }, [currentCard]);

  function handleSubmit(event) {
    // TODO: Implement API submission
    event.preventDefault();
    console.log(last4Digits);
    console.log(cardUser);
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
      <DialogTitle sx={{p: 2}}>{isNew ? "Cadastar Cartão" : "Associar Funcionário"}</DialogTitle>

      <IconButton onClick={handleCloseModal}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                  }}>
        <CloseIcon/>
      </IconButton>
      <DialogContent sx={{p: 2}}>
        {isNew && <React.Fragment>
          <DialogContentText>
            Informe os dados
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="last4"
            label="Número"
            type="text"
            fullWidth
            variant="standard"
            value={last4Digits}
            onChange={(event) => setLast4Digits(event.target.value)}
          />
        </React.Fragment>}
        <TextField
          required
          margin="dense"
          id="user"
          label={`${isNew ? "Funcionário" : "E-mail"}`}
          type="text"
          fullWidth
          variant="standard"
          value={cardUser}
          onChange={(event) => setCardUser(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{justifyContent: 'flex-start', p: 2}}>
        <Button variant='contained' type="submit">{currentCard?.id ? "Salvar" : "Cadastar"}</Button>
      </DialogActions>
    </Dialog>
  );
}
