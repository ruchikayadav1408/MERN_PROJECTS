const mongoose = require("mongoose");
const Chat= require("./models/chat.js");


main().then(() =>{
    console.log("connection successfull")
})
    .catch(err => console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

let chats=[
    {
    from:"ali",
to:"priya",
message : 'hello',
created_at: new Date(),


},
{
    from:"neha",
    to:"riya",
    message : 'hello hiiii',
    created_at: new Date(),
    
},
{
from:"amit",
to:"preeti",
message : 'good morning',
created_at: new Date(),

}];

Chat.insertMany(chats);