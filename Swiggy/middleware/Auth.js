

const Auth = (req, res, next)=>{
    // ADD Items 
    //Authentication karna padega 
    const token = "ABCDEF";
    const Access = token == "ABCDEF"?1:0;

    if (!Access) {
        return res.status(403).send("Permission is required");
    }

    next();
}

module.exports = {
    Auth
}