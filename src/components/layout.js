import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Header from "./header";
import Footer from "./footer"
const useStyles = makeStyles(theme => ({
  content: {
    width: "80%",
    margin: "0 auto"
  }
}))
export default (props) => {
  const layoutStyles = useStyles()
  return (
    <div>
      <Header />
      <div className={layoutStyles.content}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
