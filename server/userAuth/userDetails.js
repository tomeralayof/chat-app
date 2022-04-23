function userData(data){
    return {
      name: data.name,
      email: data.email,
      image: data.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      isLogged: true,
      friends: []
    }
}

function getUserAuth(req) { 

    const data = req.body;

    const {profileObj} = data;
    return userData(profileObj || data);
}

module.exports = getUserAuth;