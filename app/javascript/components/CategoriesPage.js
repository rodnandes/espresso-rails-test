import React, {useState} from "react"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import CategoryDialog from "./CategoryDialog";

const CategoriesPage = ({menu, categories}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function CategoriesList({categories}) {
    return (
      <List>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CategoryIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category.name}/>
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
            <Typography py={2} variant='h4'>Categorias</Typography>
            <Button onClick={handleOpenModal} variant="contained" endIcon={<AddIcon/>}>Cadastrar categoria</Button>
          </Box>
          <CategoriesList categories={categories}/>
          <CategoryDialog modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
        </Box>
      </Container>
    </Layout>
  )
}

export default CategoriesPage
