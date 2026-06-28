const adminMiddleware =async (req,res,next)=>{
    try {
        const {role}=req.user;
        if(role !== "admin") throw new Error("Access Denied");
        next(); 
    } catch (error) {
        next(error)
    }
};

export default adminMiddleware;