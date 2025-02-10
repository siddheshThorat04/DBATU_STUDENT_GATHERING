const  jwt =require("jsonwebtoken")

const   generateTokenAndSetCookie = (userId,res) => {
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
    res.cookie("mbAuth",token,{
        httpOnly:true,
        secure:process.env.MODE === 'PRODUCTION',
        sameSite:"none",
        maxAge: 1000* 60 * 60 * 24 * 15
    })

}

module.exports= generateTokenAndSetCookie