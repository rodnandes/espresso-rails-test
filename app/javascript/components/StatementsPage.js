import Layout from "./Layout";
// TODO: Implement PropTypes
// import PropTypes from "prop-types"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TablePagination from "@mui/material/TablePagination";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Card, CardContent} from "@mui/material";

export default function StatementsPage(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{p: 3}}>{children}</Box>}
      </div>
    );
  }

  function TableTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <React.Fragment>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Lista" {...a11yProps(0)} />
          <Tab label="Arquivadas" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CustomTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NoRecords />
        </TabPanel>
      </React.Fragment>
    );
  }

  function NoRecords() {
    return <Card>
      <CardContent>
        <Typography>Até o momento, não há despesas arquivadas.</Typography>
      </CardContent>
    </Card>
  }

  function CustomTable() {
    return <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Estabelecimento</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data Criação</TableCell>
              <TableCell>Cartão</TableCell>
              <TableCell>Comprovação</TableCell>
              <TableCell>Funcionário</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.statements?.map((statement) => (
              <TableRow
                key={statement.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {statement.merchant}
                </TableCell>
                <TableCell>{statement.cost}</TableCell>
                <TableCell>{statement.performed_at}</TableCell>
                <TableCell>{statement.card}</TableCell>
                <TableCell>{statement.proof}</TableCell>
                <TableCell>{statement.user}</TableCell>
                <TableCell>{statement.category}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={props.statements?.length}
        rowsPerPage={3}
        page={1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  }

  return (
    <Layout currentMenu={props.menu}>
      <Container maxWidth="lg">
        <Box component="main">
          <Typography py={2} variant='h4'>Despesas</Typography>
          <TableTabs />
        </Box>
      </Container>
    </Layout>
  )
}
