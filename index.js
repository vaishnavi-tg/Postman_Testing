const express=require("express")
const app=express()
var users=[{
    name:"John",
    age:35,
    kidney:[{
        healthy:false
    }]
}]
app.use(express.json());

app.get("/",function(req,res){
    const JohnKidneys=users[0].kidney
    const numberofkidneys=JohnKidneys.length
    let numberofhealthykidneys=0
    for(let i=0;i<JohnKidneys.length;i++){
        if(JohnKidneys[i].healthy){
            numberofhealthykidneys=numberofhealthykidneys+1
        }
    }
    const numberofunhealthykidneys=numberofkidneys-numberofhealthykidneys
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    })
})
app.post("/",function(req,res){
    const ishealthy=req.body.ishealthy
    users[0].kidney.push({
        healthy:ishealthy
    })
    res.json({
        msg:"Done!"
    })

})
app.put("/",function(req,res){
    for(let i=0;i<users[0].kidney.length;i++){
        users[0].kidney[i].healthy=true
    }
    res.json({})
})
app.delete("/",function(req,res){
let atleastoneunhealthykidney=false
for(let i=0;i<users[0].kidney.length;i++){
    if(!users[0].kidney[i].healthy){
        atleastoneunhealthykidney=true
    }
    else{
        res.sendStatus(411).json({
            "msg":"You dont have bad kidneys"
        })
    }
}

    

    const newkidneys=[]
    for (let i=0;i<users[0].kidney[i].length;i++){
        if(users[0].kidney[i].healthy){
            newkidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidney=newkidneys
    res.json({msg:"Done"})
})

app.listen(3000)