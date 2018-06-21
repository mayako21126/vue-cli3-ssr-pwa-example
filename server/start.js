const app = require('../server')

const port = process.env.PORT || 8083

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
