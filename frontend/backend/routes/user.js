const express=require("express");
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { Mysecreate } = require("../config");

const singupschema=zod.object({
   username:zod.string(),
   firstName:zod.string(),
   lastName:zod.string(),
   password:zod.string()
})
router.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}=singupschema.safeParse(req.body);
    if(!success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    const user= await User.findOne({
        username:body.username
    })
    if(user){
        return res.json({
            message:"Email already taken"
        })
    }
   const dbUser=await User.create(body);
    const userId=dbUser._id;

   await Account.create({
    userId,
    balance:1+Math.random()*10000
   })

const token = jwt.sign({ userId },Mysecreate, { expiresIn: "2h" });
   res.json({
    message:"user created successfully",
    token:token,
    userId:userId,
    firstName1:body.firstName,
    lastName1:body.lastName,
    username1:body.username
   })

})



const singinSchema=zod.object({
    username:zod.string(),
    password:zod.string()
});

router.post("/signin",async(req,res)=>{
    const body=req.body;
    const {success}=singinSchema.safeParse(body);
    if(!success){
        return res.json(411)({
            message:"Invalid inputs"
        })
    }
    const user= await User.findOne({
          username:body.username,
          password:body.password
    })
    if(user._id){
     const token = jwt.sign({ userId:user._id },Mysecreate, { expiresIn: "2h" });
     res.json({
    message:"login successfully",
    token:token,
    firstName2:user.firstName,
    fullname:user.lastName,
    username: user.username,
    userId:user._id
     })
     return;
    }
    res.status(411).json({
        message:"Error while logging in "
    })
  
})



const updateSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.put("/update",authMiddleware,async(req,res)=>{
    const body=req.body;
    const {success}=updateSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"Invalid inputs"
        })
    }
    await User.updateOne({
        _id:req.userId
    },req.body);

    res.json({
        message:"updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=router;