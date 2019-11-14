import React from "react"
import { Link } from "gatsby-theme-material-ui";
import Layout from '../components/layout';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
  link: {
    color: "white",
    textDecoration:"none"
  }
}))

export default () => {
  const errorStyles = useStyles()
  return (
    <Layout>
      <h1>404. Oopsy</h1>
      <p>This page does not exist. Please go back home</p>
      <Button color={"primary"} variant={"contained"}>
        <Link to={"/"} className={errorStyles.link}>Go Home</Link>
      </Button>
    </Layout>
  )
};
