const express=require("express");
const app=express();
const fs=require("fs");

//this middleware is used to make req.body works
app.use(express.json());

//this middleware is used to get form datat
app.use(express.urlencoded({extended:true}));

const todolist=[];
const about=(req,res)=>{
    res.send("about page")
}
app.post("/todo",async(req,res)=>{
    console.log("hello word");
    // console.log(req.headers.name);
    console.log("2",req.body);
    const response=req.body;
    fs.writeFileSync("output.txt", "");
    todolist.push(response);
    console.log("todolist",todolist);
    const tod=JSON.stringify(todolist,null,2);
    console.log("tod",tod)
    fs.appendFileSync("output.txt", tod);
    res.send(todolist);
})

app.get("/getall",(req,res)=>{
    console.log("hello word");
    // console.log(req.headers.name);
    const data=fs.readFileSync("output.txt","utf-8");
   // console.log(data)
    res.send(data);
})


app.delete("/todo/:id",(req,res)=>{
    console.log(req.params.id);
    let _id=req.params.id;
    let resttod=[];
    for(let i=0;i<todolist.length;i++)
    {
        if(todolist[i].id!==_id)
        {
            resttod.push(todolist[i]);
        }
    }
    res.send(resttod)

})


app.get("/gettodo",(req,res)=>{
    let _id=req.query.id;
    console.log(_id)
    const listdata=fs.readFileSync("output.txt","utf-8");
    const result=JSON.parse(listdata);
    console.log(result)
    let resttod=[];
    for(let i=0;i<result.length;i++)
    {
        if(result[i].id===_id)
        {
            resttod.push(result[i])
        }
    }
    res.send(resttod);
})

app.listen(3000,()=>{
    console.log("listening on port")
})