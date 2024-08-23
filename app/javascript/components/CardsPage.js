import React, {useState} from "react"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import AddIcon from "@mui/icons-material/Add";
import CardDialog from "./CardDialog";

const CardsPage = ({menu, cards}) => {


  const [modalOpen, setmodalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const handleOpenModal = (_event, cardId) => {
    setCurrentCard(cards.find(card => card.id === cardId));
    setmodalOpen(true);
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  function CardsList({cards}) {
    return (
      <List>
        {cards?.map((card) => (
          <React.Fragment key={card.id}>
            <ListItem secondaryAction={<Button variant="outlined" onClick={(e) => handleOpenModal(e, card.id)}
                                               endIcon={<EditIcon/>}>Editar</Button>}>
              <ListItemAvatar>
                <Avatar>
                  <CreditCardIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Cartão ${card.user?.name}`} secondary={`**** **** **** ${card.last4}`}/>
            </ListItem>
            <Divider/>
          </React.Fragment>
        ))}
      </List>
    );
  }

  return (
    <Layout currentMenu={menu}>
      <Container maxWidth="lg">
        <Box component="main">
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography py={2} variant='h4'>Cartões</Typography>
            <Button onClick={handleOpenModal} variant="contained" endIcon={<AddIcon/>}>Cadastrar Cartão</Button>
          </Box>
          <CardsList cards={cards}/>
        </Box>
        <CardDialog currentCard={currentCard} modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
      </Container>
    </Layout>
  )
}

export default CardsPage
