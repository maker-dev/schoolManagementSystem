const verifyRole = (permissions) => {
    return (req, res, next) => {
        const user = req.user;

        if (permissions.includes(user.role)) {
            next();
        } else {
            return res.status(401).json({message: "you don't have permission !"})
        }
    }
}

export default verifyRole;