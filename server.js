// BOILERPLATE FOR PAUL HUMPHREY EXPRESS server.js FILES

// steps to setup this server:
// 1. create "root" folder for the entire project...
// 2. create server.js file in root of directory...  i.e. the "entry point" for the server
// 3. create "public" folder to contain the website files... i.e. what the client has access to
    // 3a. create html, css, js, images folders inside public to hold those files...
// 4. create .gitignore file  (ignore node_modules & .DS_Store, whatever else desired...)
// 6. npm init... create node project (answer prompts as needed... to create package.json info file)
    // 6a. npm install express
    // 6b. npm install body-parser
    // 6c. npm install request
    // 6d. npm install multer
    // 6e. npm install mongodb
// 7. REMEMBER TO GIVE MONGODB A NAME!!  e.g. db_name
// 8. in a new terminal tab, start "nodemon" to run express server...  listening on port defined at bottom of server.js file (e.g. 8080)
// 9. in another new terminal tab, start the database server daemon: "sudo mongod" to run mongodb... listening on dedicated port 27017...
// 10. OPTIONAL...  PREFER TO DO THIS FROM GITHUB FIRST git init...  create repository (creates .git folder) and push!

// we need these from the npm_modules foler
var express = require('express')
var HTTP = require('http')
var HTTPS = require('https')
var fs = require('fs')

// start the express server app
var app = express()

// middleware static file server from public folder
app.use(express.static('./public'))

// when client gets /, send our home page from the public folder (/html/index.html)
app.get('/', function(req,res){
    res.sendFile('./html/index.html', {root: './public'})
})

// web vr demo stuff
app.get('/webvr', function(req,res){
    res.sendFile('./web-vr-170830/index.html', {root: './public'})
})

// 404 page
app.get('/404', function(req,res){
    res.sendFile('./html/404.html', {root: './public'})
})

// 404 error handling middleware
app.use(function(req, res, next){
    res.status(404)
    res.redirect('/404')
})

// USE THIS CODE ONCE PUSHED UP TO DROPLET
try {
    var httpsConfig = {
        key  : fs.readFileSync('/etc/letsencrypt/live/paulhumphrey.me/privkey.pem'),
        cert : fs.readFileSync('/etc/letsencrypt/live/paulhumphrey.me/cert.pem')
    }
    var httpsServer = HTTPS.createServer(httpsConfig, app)
    httpsServer.listen(443)
    var httpApp = express()
    httpApp.use(function(req, res){
        console.log(req.url)
        res.redirect('https://paulhumphrey.me' + req.url)
    })
    httpApp.listen(80)
}
catch(error){
    console.log(error)
    console.log('could not set up HTTPS')
    app.listen(8080)
}
finally {
    console.log('this code runs regardless of whether the above code succeeded or failed')
}



// app.listen(8080)
