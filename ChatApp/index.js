const express = require("express");
const app= express();
const mongoose = require("mongoose");
const path = require("path");
const Chat= require("./models/chat.js");
const methodOverride= require("method-override");

app.set("views" , path.join(__dirname , "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join( __dirname, "public")));  //to
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then(() =>{
    console.log("connection successfull")
})
    .catch(err => console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}



app.get("/chats" , async(req, res)=>{
    let chats=await Chat.find();
//console.log(chats);
    res.render("index.ejs" , {chats});
});

app.get("/chats/new" , (req, res) =>{
    res.render("new.ejs");

});

app.post("/chats", (req, res) => {
    let {from, to, message} = req.body;
    let newchat = new Chat({ 
        from: from,
        to: to,
        message: message,
        created_at: new Date() 
    });

    newchat.save().then(result => { // Changed "res" to "result" to avoid conflict
        console.log("chat was saved");
        res.redirect("/chats");
    }).catch(err => {
        console.log(err);
        res.status(500).send("Error saving chat");
    });
});



app.get("/chats/:id/edit" , async (req, res) =>{
    let {id }= req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});


app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newMesg } = req.body;
    try {
        let updateChat = await Chat.findByIdAndUpdate(
            id,
            { message: newMesg },
            { runValidators: true, new: true }
        );
        console.log(updateChat);
        res.redirect("/chats");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating chat");
    }
});


app.delete("/chats/:id" , async(req, res)=>{
    let {id}= req.params;
    let chatdelete= await Chat.findByIdAndDelete(id);
    console.log(chatdelete);
    res.redirect('/chats');
})

app.get("/" , (req, res) =>{
res.send("server is working");
})

app.listen(8080 , ()=>{
    console.log("server is listening on port 8080");
})