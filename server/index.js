const fs = require('fs')
const path = require('path')
const express = require('express')
const vueServerRenderer = require('vue-server-renderer')

const app = express()

// Server-Side Bundle File
const serverBundleFilePath = path.join(__dirname, '../d/bundle.server.js')
const serverBundleFileCode = fs.readFileSync(serverBundleFilePath, 'utf8')
const bundleRenderer = vueServerRenderer.createBundleRenderer(
    serverBundleFileCode
)

// Client-Side Bundle File
const clientBundleFilePath = path.join(__dirname, '../dist/bundle.client.js')
const clientBundleFileUrl = '/bundle.client.js'

// Server-Side Rendering
app.get('/', function(req, res) {
    const context = { url: req.url }
    // console.log(context)
    bundleRenderer.renderToString(context, (err, html) => {
        // console.log(html);
        if (err) {
            res.status(500).send(`
        <h1>Error: ${err.message}</h1>
        <pre>${err.stack}</pre>
      `)
        } else {
            res.send(`
            <!DOCTYPE html><html><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><!--[if IE]><link rel="icon" href="/favicon.ico"><![endif]--><title>dd</title><link as=script href=/bundle.client.js rel=preload><link as=style href=/css/main.474a140d.css rel=preload><link href=/css/main.474a140d.css rel=stylesheet><link rel=icon type=image/png sizes=32x32 href=/img/icons/favicon-32x32.png><link rel=icon type=image/png sizes=16x16 href=/img/icons/favicon-16x16.png><link rel=manifest href=/manifest.json><meta name=theme-color content=#4DBA87><meta name=apple-mobile-web-app-capable content=no><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content=dd><link rel=apple-touch-icon href=/img/icons/apple-touch-icon-152x152.png><link rel=mask-icon href=/img/icons/safari-pinned-tab.svg color=#4DBA87><meta name=msapplication-TileImage content=/img/icons/msapplication-icon-144x144.png><meta name=msapplication-TileColor content=#000000></head><body><noscript><strong>We're sorry but dd doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src=./dist/bundle.client.js></script></body></html>`)
        }
    })
})

app.get('/data', function(req, res) {
    function randNum() {
        return Math.round(Math.random() * 100)
    }
    res.send({
        name: `Hans-${randNum()}`,
        age: randNum()
    })
})

// Client-Side Bundle File
app.get(clientBundleFileUrl, function(req, res) {
    const clientBundleFileCode = fs.readFileSync(clientBundleFilePath, 'utf8')
    res.send(clientBundleFileCode)
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})
