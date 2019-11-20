import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Chip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(0.5)
  }
}))
const Post = ({ data: { prismicPost } }) => {
  const classes = useStyles()
  const { data, tags } = prismicPost
  return (
    <Layout>
      <h1 style={{ fontSize: "3.5rem", marginBottom:"-22px" }}>{data.title.text}</h1>
      <p>By Sharan Sajiv Menon on {data.published}</p>
      Tags: {tags.map((tag, i) => {
        return (
          <Chip 
            key={i}
            label={tag}
            variant="outlined"
            className={classes.chip}
          />
        )
      })}
      <hr/>
      <div dangerouslySetInnerHTML={{ __html: data.content.html }}/>
    </Layout>
  )
}
export default Post
export const pageQuery = graphql`
    query PostBySlug($uid: String!) {
        prismicPost(uid: { eq: $uid }) {
            uid
            tags
            data {
                published
                title {
                    text
                }
                content {
                    html
                }
            }
        }
    }
`
