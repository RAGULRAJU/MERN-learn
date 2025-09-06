const rateLimit = require("../config/upstash")

const rateLimiter = async (req,res,next)=>{
    try {
        const {success} = await rateLimit.rate.limit("limit-key")
        if(!success) return res.status(429).json({mesage: "Too many requests recieved, Please try again after sometime"})
        
        next()
    } catch (error) {
        console.log("Ratelimit Error")
        next()
    }
}

module.exports={rateLimiter}