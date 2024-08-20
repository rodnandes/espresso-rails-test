import React from "react"
import PropTypes from "prop-types"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EmployeesPage = ({ menu, employees }) => {
  return (
    <Layout currentMenu={menu}>
      <Container maxWidth="lg">
        <Box component="main">
          <Typography py={2} variant='h4'>Funcionários</Typography>
          <ul>
            {employees.map((employee) => <li key={employee.id}>{employee.email}</li>)}
          </ul>
        </Box>
      </Container>
    </Layout>
  )
}


export default EmployeesPage
