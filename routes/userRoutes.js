const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { User, Post, Comment } = require('../models')

// User Login - done (Tim)
router.get('/users/:username/:password/login', (req, res) => {
    User.findOne({ where : {username: req.params.username, password : req.params.password }})
    .then(data => (data === null)? res.json(0) : res.json(data.dataValues.uuid))
    .catch(err => console.error(err))
})

// Get all user info - Done (Tim)
router.get('/users/info/:userid', (req, res) => {
  
    User.findAll({ where : { uuid : req.params.userid} , 
        include : [       
            {
                model : Post,
                include : [
                   { 
                       model : Comment
                    }
                ]
            } , {
                model : User,
                as : 'friend'
            } ,
            {
                model : User,
                as : 'Requestees'
            }
            ,
            {
                model : User,
                as : 'Requesters'
            }
        ] 
    })
    .then(async data => {
        data = await JSON.parse(JSON.stringify(data))
        console.log(data)
        let userInfo =  {FirstName : data[0].firstName, LastName : data[0].lastName, Age : data[0].age, Email : data[0].email, Gender: data[0].gender}
        let post = data[0].posts
        let friends = data[0].friend.map(val => {return {firstName : val.firstName, lastName : val.lastName, Age : val.age, Email : val.email, Gender: val.gender, Id : val.uuid}})
        let pendingRequest = data[0].Requesters
        let friendRequest = data[0].Requestees
        let aboutUser = {UserInfo : userInfo, UserPost : post, UserFriends : friends, PendingRequest : pendingRequest, FriendRequest: friendRequest}
       res.json(aboutUser)  
    })
    .catch(err => console.error(err))
})

// Add a user - done (Tim)
router.post('/users/register', (req, res) =>{
    User.findOrCreate( {where : { email : req.body.email , username : req.body.username}, 
        defaults: req.body })
    .then((data) => (data[data.length -1]? res.sendStatus(200): res.json("Email already existed")))
    .catch(err => console.error(err))
})

// Update user info requires 2 fields, password and user id - done (Tim)
router.put('/users/update/:password/:uuid', (req,res) =>
{
    User.update(req.body, { where: {password: req.params.password , id : req.params.uuid }})
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

// Delete a user requires to 2 fields, password and user id - done (Tim)
router.delete('/users/delete/:password/:uuid', (req,res) => {
    User.destroy({where : {password: req.params.password, uuid : req.params.uuid}})
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

module.exports = router