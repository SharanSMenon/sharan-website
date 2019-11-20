import React from "react"
import { Typography} from "@material-ui/core"

export const Footer = () => {
  return (
    <div style={{
        width:"83%",
        margin:"0 auto"
    }}>
        <hr></hr>
        <Typography variant="h6">&copy; {new Date().getFullYear()} Sharan S Menon</Typography>
    </div>
  )
}
export default Footer
