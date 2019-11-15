import React from "react"
import { Button, Chip } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grow from "@material-ui/core/Grow"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5)
  }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow in={true} ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
  const tags = props.tags;
  const post = props.post;
  const styles = useStyles();
  const handleClose = () => {
    props.closeDialog();
  }
  const handleClick = () => {}
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Tags for post: {post.title}</DialogTitle>
        <DialogContent>
          <div>
            {tags.map(tag => <Chip label={tag} className={styles.chip} onClick={handleClick}/>)}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Thank You!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
