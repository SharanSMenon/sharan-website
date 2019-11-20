
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { ListItemText, List, ListItem, ListSubheader, TextField } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"
import { Autocomplete } from '@material-ui/lab'
import { withStyles } from "@material-ui/styles"
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#2196F3',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgrey'
      },
      '&:hover fieldset': {
        borderColor: '#21CBF3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2196F3',
      },
    },
  },
})(TextField);
let containsAll = (arr, target) => target.every(v => arr.includes(v));

export default () => {
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
    let change = data.allPrismicPost.edges.filter(edge => edge.node.data.title.text.toLowerCase().includes(filterText.toLowerCase()));
    change = change.filter(edge => containsAll(edge.node.tags, filterTags))
    setPosts(change)
  }, [filterText, filterTags])

  return (
    <Layout>
      <br></br>
      <CssTextField fullWidth
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
          <CssTextField
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
          <Link to={`/blog/${edge.node.uid}`}>
            <ListItem button key={i}>
              <ListItemText primary={edge.node.data.title.text}
                secondary={`By Sharan Sajiv Menon - ${edge.node.data.published}`} />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <TagDialog open={open} tags={tagSelected} closeDialog={() => setOpen(false)} post={post} /> */}
    </Layout>
  )
}
