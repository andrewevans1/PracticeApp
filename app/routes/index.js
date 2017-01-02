module.exports = () => {
  const router = require('express').Router()
  const utils = require('../utils')
  const config = require('../config')
  const crypto = require('crypto')

  // Home page is home
  router.get('/', (req, res, next) => {
    res.render('home')
  })

  router.get('/project1', (req, res, next) =>{
    res.render('project1')
  })
  
  router.get('/project2', (req, res, next) =>{
    res.render('project2')
  })
  
  router.get('/project3', (req, res, next) =>{
    res.render('project3')
  })

  router.get('/project4', (req, res, next) =>{
    res.render('project4')
  })

  router.get('/project5', (req, res, next) =>{
    res.render('project5')
  })

  router.get('/project6', (req, res, next) =>{
    res.render('project6')
  })

  router.get('/project7', (req, res, next) =>{
    res.render('project7')
  })

  router.get('/project8', (req, res, next) =>{
    res.render('project8')
  })
/*
  router.get('/rooms', utils.isAuthenticated, (req, res, next) => {
    res.render('rooms', {
      user: req.session.user,
      host: config.host
    })
  })

  router.get('/chat/:id', utils.isAuthenticated, (req, res, next) => {
    // Find a chatroom with the given id
    let getRoom = utils.findRoomById(req.app.locals.chatrooms, req.params.id)
    if (getRoom === undefined) {
      // 404
      return next()
    } else {
      res.render('chatroom', {
        user: req.session.user,
        host: config.host,
        room: getRoom.room,
        roomID: getRoom.roomID
      })
    }
  })

  router.post('/auth/login', (req, res) => {
    req.session.user = {
      profileId: utils.randomHex(),
      fullName: req.body.username,
      profilePic: 'https://unsplash.it/100/?image=' + (parseInt(crypto.createHash('md5').update(req.body.username).digest("hex").split("").filter(c => c.charCodeAt(0) >= 0x30 && c.charCodeAt(0) < 0x40).splice(0,10).join("")) % 1000)
    }
    req.session.isAuthenticated = true
    console.log(req.session.user)
    res.redirect('/rooms')
  })

  // logout
  router.get('/logout', (req, res, next) => {
    req.session.user = null
    req.session.isAuthenticated = false
    res.redirect('/')
  })
*/
  return router
}
