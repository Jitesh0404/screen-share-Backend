const User = require("../Schemas/UserSchema.js");
const bcrypt = require("bcryptjs");
const loginRegister = async (req,res,next) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Email and Password is required"
            })
        }
        // finding user from DB
        const user = await User.findOne({email});
        console.log(user);
    
        // if user not there then register 
        if(!user){
            // hashing password
            const hashPassword = bcrypt.hashSync(password,10);
            console.log(hashPassword);
            
            const newUser = new User({email:email,password:hashPassword})
            await newUser.save()
            return res.status(201).json({
                success:true,
                message:"User Registered successfully"
            })
        }
        // validating password
        const isPasswordCorrect = bcrypt.compareSync(password,user.password);
        if(!isPasswordCorrect){
            return res.status(201).json({
                success:false,
                message:"Incorrect Password.Try Again !!!"
            })
        }
        
        return res.status(200).json({
            success:true,
            message : "User Logged In Successfully",
            data:user

        })
    } catch (error) {
        console.dir(error)
        next(error)
    }
}

module.exports = {
    loginRegister
}