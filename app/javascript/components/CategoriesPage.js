import React from "react"
import PropTypes from "prop-types"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CategoriesPage = ({ menu, categories }) => {
  return (
    <Layout currentMenu={menu}>
      <Container maxWidth="lg">
        <Box component="main">
          <Typography py={2} variant='h4'>Categorias</Typography>
          <ul>
            {categories.map((category) => <li key={category.id}>{category.name}</li>)}
          </ul>
        </Box>
      </Container>
    </Layout>
  )
}

export default CategoriesPage
