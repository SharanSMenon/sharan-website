import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const Post = ({ data: { prismicPost } }) => {
  const { data } = prismicPost
  return (
    <Layout>
      <h1 style={{ fontSize: "3.5rem", marginBottom:"-22px" }}>{data.title.text}</h1>
      <p>By Sharan Sajiv Menon on {data.published}</p>
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
