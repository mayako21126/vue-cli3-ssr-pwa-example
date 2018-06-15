const app = require('./server')

const port = process.env.PORT || 8081

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
