// import express from "express";
// import cors from "cors";
// import { Server as socketIO } from "socket.io";
// import http from "http";



// const app= express()
// app.use(cors())


 
// const users=[{}];    

// const server=http.createServer(app);
// const io = new socketIO(server);


// app.get("/",(req,res)=>{
//     res.send("Its Working")
// })


// io.on("connection",(socket)=>{
//     console.log('user connected');

//     socket.on('joined',({user})=>{
//         users[socket.id]=user;  
//     console.log(`${user} has joined`);
//     socket.broadcast.emit('userJoined',{user:"Admin" , message:`${users[socket.id]} has joined`});
//     socket.emit('welcome',{user:"Admin" , message:`welcome to the chat, ${users[socket.id]} `});
//     });


//    socket.on('message',({message,id})=>{
//     io.emit('sendMessage',{user:users[id] , message , id})
 
//    })


//     socket.on('disconnect',()=>{
//         socket.broadcast.emit('leave',{user:"Admin", message:` ${users[socket.id]}  has left `})
//         console.log( `user left`)
//     })

 
    
    
// })


// const port =process.env.PORT || 4500
// server.listen(port,()=>{
//     console.log(`listening on port http://localhost:${port}`)
// })

const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT  || 4500 ;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});


server.listen(port,()=>{
    console.log(`Working`);
})