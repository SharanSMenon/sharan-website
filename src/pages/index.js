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
import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { ListItemText, List, ListItem } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"

export default () => {
  const data = useStaticQuery(graphql`
      query {
          allPrismicPost {
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
  const edges = data.allPrismicPost.edges
  return (
    <Layout>
      <List>
        {edges.map((edge, i) => (
          <Link to={`/blog/${edge.node.uid}`}>
            <ListItem button key={i}>
              <ListItemText primary={edge.node.data.title.text}/>
            </ListItem>
          </Link>
        ))}
      </List>
    </Layout>
  )
}
