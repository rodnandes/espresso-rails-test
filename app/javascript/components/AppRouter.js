import {BrowserRouter, Route, Routes} from "react-router-dom";
import StatementsPage from "./StatementsPage";
import EmployeesPage from "./EmployeesPage";
import CardsPage from "./CardsPage";
import CategoriesPage from "./CategoriesPage";

export default function AppRouter(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas" element={<StatementsPage menu={props.page} statements={props.statements}/>}/>
        <Route path="/funcionarios" element={<EmployeesPage menu={props.page} employees={props.employees}/>}/>
        <Route path="/cartoes" element={<CardsPage menu={props.page} cards={props.cards}/>}/>
        <Route path="/categorias" element={<CategoriesPage menu={props.page} categories={props.categories}/>}/>
      </Routes>
    </BrowserRouter>
  )
}
