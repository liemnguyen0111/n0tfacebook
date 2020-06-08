const router = require('express').Router()
let fs = require('fs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const moment = require('moment')
const { User, Post, Comment, Friend} = require('../models')


// Find most recent friend posts - Done (Tim)
router.get('/posts/friendrecentposts/:userUuid', (req, res) => {

// Find all users where userUuid equal to uuid
  User.findAll({ where: { uuid: req.params.userUuid }, include: [{model : User, as : 'friend', attributes : ['uuid']}] })
  .then(async (data) =>
  {
    // Turn data into an array 
      data = await JSON.parse(JSON.stringify(data[0]))

    // Now data is an array, we can loop through and filter out an object that we want 
      data = data.friend.map(val => {return  val.uuid })

      Post.findAll({ where: { userUUid : {[Op.in] : data }}, 
        attributes : [Sequelize.fn('MAX', Sequelize.col('id'))], group : ['userUuid'] , raw: true, })
      .then( async object => 
        {
            let temp = []
            object = object.map( value =>  ( parseInt(JSON.stringify(value).split(/[\:}]/)[1])))
            object.sort((a,b) => a.id - b.id)
            Post.findAll({ where : { id : {[Op.in] : object }}, attributes : ["id", "body", "time"],
            include : [{model : User, attributes : ["firstName", "lastName"]}]
        })
            .then(post => res.json(post))
            .catch(err => console.error(err))

        })
        .catch(err => console.error(err))
   
  })
  .catch(err=> console.error(err));
  
})

// Find all posts - Done (Tim)
router.get('/posts/findall/:userUuid', (req, res) => {

    Post.findAll({ where : {userUuid : req.params.userUuid }, include : [Comment]})
    .then((data)=> 
    {
        res.json(data)
    })
    .catch(err => console.log(404))
  
})

// Get a post - Done (Tim)
router.get('/posts/getpost/:postId', (req, res) => {
    Post.findOne({ where : {id : req.params.postId }, include : [Comment]})
    .then((data)=> 
    {
       res.json(data)
    })
    .catch(err => console.log(404))
})

// Add a Post - - Inprogress (Working on getting the image work)
router.post('/posts/addpost', async (req, res) =>{
    
    let id = req.rawHeaders.findIndex((item) => (item === 'Cookie'))
    id = req.rawHeaders[id + 1].split(/[\=;" "]/)

    let temp 
    let uuid
    id.map((val,key) => {
        if( val === 'name'){ uuid = id[key + 1]}
        if( val === 'io' ) { 
            temp = id[key + 1]
        }
    })
    let check = false
    let postImage
    let path
    if(req.files)
    {
        postImage = await req.files.postImage
 
       await postImage.mv(`./public/assets/Image/+${temp}+` + postImage.name, async (err) =>
        {
            if(err)
            {
                console.log('Failed to upload')
                console.log(err)
            }
            else
            {
                console.log('sucess to upload')
               
            }
        })    
        check = true
        path = `assets/Image/+${temp}+` + postImage.name   
    }
    
        path = ((check)? path : '#')
     let body = {userUuid: uuid , body: req.body.posttext , image : path , time : `On ${moment().format(`l LT`)}`}
    
 
    Post.create(body)
    .then((data) => {
        data.dataValues.comments = []
        User.findOne({ where : { uuid : uuid }, attributes : ['firstName', 'lastName']})
        .then(({firstName,lastName}) => {

            res.json([{data},{firstName,lastName}])
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  
})

// Update Post info - Inprogress (Working on getting the image work)
router.put('/posts/update/:userUuid/:postId', (req,res) =>
{
    Post.update(req.body, { where: { id : req.params.postId }})
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

// Delete a Post - Done (Tim)
router.delete('/posts/delete/:userUuid/:postId', (req,res) => {
    Post.destroy({where : {id : req.params.postId , userUuid: req.params.userUuid}})
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

module.exports = router