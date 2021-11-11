const express = require('express')
const app = express()
const cors = require('cors')
let path = require('path')
const routes = require('./routes')
const port = process.env.PORT || 4000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

app.use(cors({
    origin: "*",
    allowedHeaders: 'Origin,X-Requested-With, Content-Type, Accept'
}))




app.use('', routes)

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(err)
        return;
    }
})

app.listen(4000, () => {
    console.log(`Server is running on port ${port}`)
})