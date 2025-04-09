const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())

app.use(cors())

const blogs = [
    {
      id: "1",
      title: "F# is an excellent Microsoft tech stack",
      author: "James Faultleroy",      
      url: "https://www.google.com",
      likes: 5
    },
    {
      id: "2",
      title: "Scala is a scalable traditional tech launguage",
      author: "Samantha Taverner",
      url: "https://za.yahoo.com",
      likes: 10
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (request, response) => {
    response.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
    const id = request.params.id
    const blog = blogs.find(blog => blog.id === id)
    if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/blogs/:id', (request, response) => {
    const id = request.params.id
    notes = blogs.filter(blog => blog.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = blogs.length > 0
      ? Math.max(...blogs.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

  app.post('/api/blogs', (request, response) => { 
    const body = request.body

    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: generateId(),
    }

    blogs = blogs.concat(note)
  
    response.json(blog)
  })

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)