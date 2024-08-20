import React from "react"
import PropTypes from "prop-types"
import Layout from "./Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardsPage = ({ menu, cards }) => {
  return (
    <Layout currentMenu={menu}>
      <Container maxWidth="lg">
        <Box component="main">
          <Typography py={2} variant='h4'>Cartões</Typography>
          <ul>
            {cards.map((card) => <li key={card.id}>{card.last4}</li>)}
          </ul>
        </Box>
      </Container>
    </Layout>
  )
}

export default CardsPage
