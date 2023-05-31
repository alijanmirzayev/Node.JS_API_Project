import { Comments } from "./datas/Comment.js";
import { Posts } from "./datas/Post.js";
import express from "express";

const app = express();
app.use(express.json());

// GET - api/posts
app.get('/api/posts', (req, res) => {
    return res.status(200).send(Posts)
})

// GET - api/posts/1
app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const data = Posts.find(item => item.id == +id)
    return res.status(200).send(data)
})

// GET - api/posts/1/comments
app.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params
    const data = Comments.filter(item => item.postId == +id)
    return res.status(200).send(data)
})

// GET - api/comments?postId=1 : api/comments?username=ravanzli
app.get('/api/comments/', (req, res) => {
    const { postId, username } = req.query;
    if (postId) {
        const data = Comments.filter(item => item.postId == +id)
        return res.status(200).send(data)
    }
    if (username) {
        const data = Comments.filter(item => item.username == username)
        return res.status(200).send(data)
    }
})

// Post - api/posts
app.post('/api/posts', (req, res) => {
    const { title, body, likeCount } = req.body;
    let newPost = {
        id: Math.floor(Math.random() * 1254),
        title,
        body,
        likeCount
    }
    Posts.push(newPost)
    return res.status(200).send(newPost)
})

// PUT - api/posts
app.put('/api/posts', (req, res) => {
    const item = Posts.find(item => item.id == req.body.id)
    if (item) {
        item.title = req.body.title;
        item.body = req.body.body;
        item.likeCount = req.body.likeCount;
        return res.status(200).send(item)

    }
    return res.status(404).send('Post not found!')
})

// DELETE - api/posts
app.delete('/api/posts', (req, res) => {
    const data = Posts.filter(item => item.id == req.body.id)
    return res.status(200).send(data)
})

// Server Operation
app.listen(6060, () => {
    console.log('Server is up. Port: 6060')
})