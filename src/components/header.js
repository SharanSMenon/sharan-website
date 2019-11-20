import React from "react"
import { Typography, AppBar, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, Button, Link } from "gatsby-theme-material-ui"
import { MenuIcon } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolBar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
    '&:hover': {
      textDecoration: "none"
    }

  },
}))
export const Header = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Link to="/" className={classes.link}>
            <Button>
              <Typography variant="h6" className={classes.title}>
                Sharan S Menon

              </Typography>
            </Button>
          </Link>
          {/*<Button color="inherit">*/}
          {/*  <Link to="/" className={classes.link}>Home</Link>*/}
          {/*</Button>*/}
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
