const express = require("express");
const app= express();
const path= require("path");
let port =3000;


// app.use((req, res) =>{
//     console.log("request recieved");
//     let code= "<h1> fruits </h1>  <ul> <li> apple </li> <li> banana </li> </ul>"
//     res.send(code);
// })
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));


app.get("/ig/:username", (req, res)=>{
let {username}= req.params;
const instaData= require("./data.json");
const data= instaData[username];
console.log(data);
if(data){
    res.render("instagram.ejs" , {data});

}
// else{
//     res.render("error.ejs");
// }
});

app.listen(port , ()=>{
    console.log(`App is running on port ${port}`);
})
