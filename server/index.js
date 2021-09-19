const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const cors=require('cors');
const bodyParser=require('body-parser');
const morgan=require('morgan');
var mongoose = require('mongoose');
const userRouter=require('./routes/routes');
const { addUser, removeUser,getUser } = require('./entity');
const app =express();
const server=http.createServer(app);
const io=socketio(server,{cors:{origin:"*"}});
 

app.use(cors());
app.use(bodyParser.json());
app.use(morgan());

app.use('/user',userRouter);
mongoose.connect("mongodb://localhost:27017/workTry", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(() =>
    console.log('MongoDB successfully connected.')
).catch(err => console.log(err));


io.on('connect',(socket)=>{

    console.log("user connected");

    socket.on('join',({name,room},callBack)=>{

        const {user,error}=addUser({id:socket.id,name:name,room:room})
        if(error)
        {
            callBack(error);
            return ;
        }

        socket.join(user.room);
        socket.emit('message',{user:"admin",text:`welcome ${user.name}`});
        socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.name} has joined`})
    })

    socket.on('sendMsg',(message,callBack)=>{
        callBack();

       // console.log("messssageeeeeeeeeeeee",message)
        const user=getUser(socket.id);
       // console.log("userttttttttttttttttttt",user)
        if(user)
        {    
        io.to(user.room).emit('message',{user:user.name,text:message})
    }
    else{
        callBack("user not found")
    }

    })


    socket.on('disconnect',()=>{

        console.log("disconnectedddddd");
        const user=removeUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('message',{user:"admin",text:`${user.name} has left`})
        }
    })

})



app.get('/',(req,res)=>{
    console.log("api is ruuning",);
    res.json("api is running")

})



server.listen("4000",()=>{

    console.log("server is running on server on 4000");
})