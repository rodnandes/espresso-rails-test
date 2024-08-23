import React from "react"
import PropTypes from "prop-types"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import EmployeeDialog from "./EmployeeDialog";

const EmployeesPage = ({menu, employees}) => {

  const [modalOpen, setmodalOpen] = React.useState(false);
  const [currentEmployee, setCurrentEmployee] = React.useState({});

  const handleOpenModal = (_event, employeeId) => {
    setCurrentEmployee(employees.find(employee => employee.id === employeeId));
    setmodalOpen(true);
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  function EmployeesList({employees}) {
    return (
      <List>
        {employees?.map((employee) => (
          <React.Fragment key={employee.id}>
            <ListItem secondaryAction={<Button variant="outlined" onClick={(e) => handleOpenModal(e, employee.id)}
                                               endIcon={<EditIcon/>}>Editar</Button>}>
              <ListItemAvatar>
                <Avatar>RF</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Employee item" secondary={employee.email}/>
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
            <Typography py={2} variant='h4'>Funcionários</Typography>
            <Button onClick={handleOpenModal} variant="contained" endIcon={<AddIcon/>}>Cadastrar Funcionário</Button>
          </Box>
          <EmployeesList employees={employees}/>
        </Box>
        <EmployeeDialog currentEmployee={currentEmployee} modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
      </Container>
    </Layout>
  )
}

export default EmployeesPage
