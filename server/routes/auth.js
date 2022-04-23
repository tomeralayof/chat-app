const express = require('express');
const router = express.Router();
const userAuthData = require("../userAuth/userDetails");
const {User} = require('../schemas/user-schema');

router.post("/",async(req,res)=>{

   const userDataAuth = userAuthData(req);
  let isUserExist = await User.findOne({email: userDataAuth.email});
  if (isUserExist){
    return res.send(isUserExist);
  }
  
  const user = await new User(userDataAuth);
  
  user.save(userDataAuth);

  res.send(user);
});

router.get("/",async(req,res) => {
  let getUser = await User.findOne({email:req.query.email});
  res.send(getUser);
});

module.exports = router;