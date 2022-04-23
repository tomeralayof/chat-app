const express = require('express');
const router = express.Router();
const {User} = require('../schemas/user-schema');

router.post("/", async(req,res)=> {
    const me = await User.findOne({_id: req.body._id});
    const user = await User.findOne({email: req.body.email});

    if(!user || me.email === user.email) return res.status(400).send("error ...");

    let isExist = isFriendExist(me.friends,user.email);
    if(isExist) return res.status(400).send("error ....");

    me.friends.push(user._id);
    me.save();
    res.send(me);
});

router.get("/friends", async(req,res) => {
    let getUser = await User.findOne({email:req.query.email});
    User.find({
    '_id': { $in: [
        ...getUser.friends
    ]}
    }, function(err, docs){
       return res.send(docs);
    });
});

function isFriendExist(arr,str) {
    let i = 0;
    for(; i < arr.length && arr[i].email != str; i++){} /*nothing*/
    return i === arr.length -1;
}

module.exports = router;