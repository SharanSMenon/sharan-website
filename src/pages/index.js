// import React from "react"
// import { Link, useStaticQuery, graphql } from "gatsby"
// import Layout from "../components/layout";
// export default () => {
//     return (
//         <Layout>
//             Home Page
//         </Layout>
//     )
// }
import React, {useState} from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { ListItemText, List, ListItem, ListSubheader, ListItemSecondaryAction, Button } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"
import TagDialog from '../components/tagDialog'

export default () => {
  const [tagSelected, setTags] = useState([])
  const [post, setPost] = useState({})
  const [open, setOpen] = useState(false)
  const data = useStaticQuery(graphql`
      query {
          allPrismicPost {
              totalCount
              edges {
                  node {
                      tags
                      uid
                      data {
                          published
                          title {
                              text
                          }
                      }
                  }
              }
          }

      }
  `)
  const edges = data.allPrismicPost.edges;
  return (
    <Layout>
      <List
        subheader={
          <ListSubheader component="div">
            There are {data.allPrismicPost.totalCount} blog posts
          </ListSubheader>
        }
      >
        {edges.map((edge, i) => (

          <ListItem button key={i}>
            <Link to={`/blog/${edge.node.uid}`}>
              <ListItemText primary={edge.node.data.title.text}
                            secondary={`By Sharan Sajiv Menon - ${edge.node.data.published}`}/>
            </Link>
            <ListItemSecondaryAction>
              <Button onClick={() => {
                setTags(edge.node.tags)
                setOpen(true)
                setPost({
                  title: edge.node.data.title.text,
                  author:'Sharan Sajiv Menon',
                  published: edge.node.data.published
                })
                console.log("Hello")
              }}>View Tags</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TagDialog open={open} tags={tagSelected} closeDialog={() => setOpen(false)} post={post}/>
    </Layout>
  )
}
