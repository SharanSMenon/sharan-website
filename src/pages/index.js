
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { ListItemText, List, ListItem, ListSubheader, ListItemSecondaryAction, Button, TextField } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"
import TagDialog from '../components/tagDialog'
import { Autocomplete } from '@material-ui/lab'

let containsAll = (arr, target) => target.every(v => arr.includes(v));

export default () => {
  const [tagSelected, setTags] = useState([])
  const [post, setPost] = useState({})
  const [open, setOpen] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [filterTags, setFilterTags] = useState([])
  const [posts, setPosts] = useState([]);

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

  let edges = [...data.allPrismicPost.edges];

  const allTags = []
  edges.forEach(edge => {
    const tags = edge.node.tags
    allTags.push(...tags)
  })

  const blogtags = Array.from(new Set(allTags))

  useEffect(() => {
    let change = data.allPrismicPost.edges.filter(edge => edge.node.data.title.text.toLowerCase().includes(filterText));
    change = change.filter(edge => containsAll(edge.node.tags, filterTags))
    setPosts(change)
  }, [filterText, filterTags])
  
  return (
    <Layout>
      <br></br>
      <TextField fullWidth
        label="Filter Posts by Title"
        variant="outlined"
        value={filterText} onChange={e => setFilterText(e.target.value)}

      />
      <br />
      <Autocomplete
        multiple
        id="tags-filled"
        options={blogtags}
        getOptionLabel={option => option}
        defaultValue={[]}
        onChange={(event, newValues) => setFilterTags(newValues)}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params} variant="outlined" label="Select Tags" placeholder="Tag" margin="normal"
            fullWidth
          />
        )}
      />
      <List
        subheader={
          <ListSubheader component="div">
            There are {data.allPrismicPost.totalCount} blog posts
          </ListSubheader>
        }
      >
        {posts.map((edge, i) => (

          <ListItem button key={i}>
            <Link to={`/blog/${edge.node.uid}`}>
              <ListItemText primary={edge.node.data.title.text}
                secondary={`By Sharan Sajiv Menon - ${edge.node.data.published}`} />
            </Link>
            <ListItemSecondaryAction>
              <Button onClick={() => {
                setTags(edge.node.tags)
                setOpen(true)
                setPost({
                  title: edge.node.data.title.text,
                  author: 'Sharan Sajiv Menon',
                  published: edge.node.data.published
                })
                console.log("Hello")
              }}>View Tags</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TagDialog open={open} tags={tagSelected} closeDialog={() => setOpen(false)} post={post} />
    </Layout>
  )
}
