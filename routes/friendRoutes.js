const { join } = require("path");
const router = require("express").Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { User,Friend, FriendReq } = require("../models");

// Find all users that is your friend - Done (Tim)
router.get("/friend/myfriend/:userUuid", (req, res) => {

  // Find all users where userUuid equal to uuid
  User.findAll({ where: { uuid: req.params.userUuid }, include: [{model : User, as : 'friends', attributes : ['firstName','lastName','age','gender','email','uuid']}] })
    .then(async (data) =>
    {
      // Turn data into an array 
        data = await JSON.parse(JSON.stringify(data[0]))

      // Now data is an array, we can loop through and filter out an object that we want 
        data = data.friends.map(val => {return {fName:val.firstName, lName:val.lastName,Age:val.age,Gender:val.gender,Email:val.email,id:val.uuid}})

       // Return data back to user
        res.json(data)
     
    })
    .catch(err=> console.error(err));
});

// Find all user that not your friend - Done (Tim)
router.get("/friend/findfriend/:userUuid", (req, res) => {

  // Find all users where userUuid equal to uuid
  Friend.findAll({ where: { userUuid: req.params.userUuid} }
      )
    .then(async (data) =>
    {
      // Turn data into an array 
        data = await JSON.parse(JSON.stringify(data))
        data = await data.map(val => {return  val.friendUuid })

        // Push user id into the friend list
        data.push(req.params.userUuid)

      // Find all users that are not friend and itself
        User.findAll({ where : {uuid : { [Op.notIn] :  data }} })
        .then(list => res.json(list))
        .catch(err=> console.error(err))

    })
    .catch( err => console.error(err));
});

// Add a friend - Done (Time)
router.post("/friend/addfriend", (req, res) => {
  Friend.bulkCreate([{userUuid : req.body.userUuid, friendUuid : req.body.friendUuid },{friendUuid : req.body.userUuid, userUuid : req.body.friendUuid }])
    .then((data) => {
      deleteRequest(req.body.requesterId, req.body.requesteeId)
      res.sendStatus(200);
    })
    .catch( err => console.error(err));
});

// // Delete a friend / unfriend - Done (Tim)
router.delete("/friend/unfriend", (req, res) => {
  Friend.destroy({where: [ {[Op.or] : [{userUuid : req.body.userUuid, friendUuid : req.body.friendUuid },
                                        {userUuid : req.body.friendUuid, friendUuid : req.body.userUuid}] }]})
    .then(() => res.sendStatus(200))
    .catch( err => console.error(err));
});

// Friend request
router.post("/friend/request", (req,res) =>
{
  FriendReq.create(req.body)
  .then(()=> res.sendStatus(200))
  .catch(() => res.json('Pending'))
})


function deleteRequest(requester,requestee)
{
  FriendReq.destroy({where : {requesterId : requester, requesteeId : requestee}})
  .then(() => res.sendStatus(200))
  .catch(err=> console.error(err))
}

module.exports = router;