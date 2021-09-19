let users=[];

const addUser=({id,name,room})=>{

    console.log(",mmmmmmmmmmmmmmmmmmmmmmm",name,room);
    console.log("userssssssssssss",users);
    if(!name||!room)
    {
        console.log("not rewquiredddddddddddd",name,room);
        return {error:"name room is required"}
    }
    name=name.trim().toLowerCase()
    room=room.trim().toLowerCase()

    if(users.length)
    {
        const exitingUser=users.find(data=>data.name==name&&data.room==room);
        if(exitingUser)
        {
            console.log("extingggggggggguser",exitingUser);
            return {error:"users already exit"}
        }     
    }
    const user={id,name,room}  
    users.push(user);
    return{user}
}

const removeUser=(id)=>{

    const findIndex=users.findIndex(each=>each.id==id);
    console.log("findIndex",findIndex);
    if(findIndex>0)
    {
        return users.splice(findIndex,1)[0]
    }

}
const getUser=(id)=>{

    return users.find(each=>each.id==id);
  

}

module.exports={
    addUser,removeUser,getUser
}