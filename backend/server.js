const express = require('express')
const cors = require('cors')
const dotnev = require('dotenv')
dotnev.config({ path: './conf.env' });
const mongoose = require('mongoose')
const router = require('./routes/usersRouter')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CONN_STR, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
}).then((conn) => {
    // console.log(conn)
    console.log('DB connected')
})
const userRouter = require('./routes/usersRouter')
const adminRouter = require('./routes/adminRouter')
app.use('/users', userRouter)
app.use('/dashboard', adminRouter)






// const testUser = new User({
//     id: 3,
//     name: "wajdi",
//     age: 23
// })

// testUser.save()
// .then(doc => {
//     console.log(doc)
// }).catch(err => console.log(err))







// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

// app.post('/register', (req, res) => {
//     res.send("Hello register")
// })

// app.post('/login', (req, res) => {
//     res.send("Hello login")
// })

// app.get('/profile', (req, res) => {
//     res.send("Hello profile")
// })


app.listen(8080, () => {
    console.log("http://localhost:8080")
})
