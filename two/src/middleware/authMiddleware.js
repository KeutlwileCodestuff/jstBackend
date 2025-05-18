import jwt from 'jsonwebtoken'


// this middleware checks if the token sent with the 'get todos' request from the user
// infact belongs to that user before the request hits the endpoint

function authMiddleware(req, res, next){
    const token = req.headers['authorization']
    if(!token){return res.status(401).json({message: 'No token provided'})}

    jwt.verify(token , process.env.JWT_SECRET , (err , decoded) =>{
        if(err) {return res.status(401).json({message:'Invalid token'})}

        req.userId = decoded.id 
        next()
    }) 
}

export default authMiddleware