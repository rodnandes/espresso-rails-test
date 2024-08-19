import React from "react"
import Layout from "./Layout";
// TODO: Implement PropTypes
// import PropTypes from "prop-types"

export default function StatementsPage(props) {
  return (
    <React.Fragment>
      <Layout currentMenu={props.menu}>
        Statements: <ul>{props.statements.map(statement => <li key={`item-${statement.id}`}>{statement.id}</li>)}</ul>
      </Layout>
    </React.Fragment>
  )
}
