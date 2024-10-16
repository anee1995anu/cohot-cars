import jwt from 'jsonwebtoken'

export const authAdmin = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'admin not autherised'}) 
        }
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({message:'admin not autherised'}) 
        }

        
        // if(tokenVerified!== 'admin' ){
        //     return res.status(401).json({message:'access denied'}) 
        // }

        req.admin=tokenVerified
        
        next()
        
    } catch (error) {
        
        return res.status(401).json({message:'admin autherization failed'}) 
    }
}