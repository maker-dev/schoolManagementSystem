const verifyRole = (permissions) => {
    return (req, res, next) => {
        const {role} = req.body;

        if (!role) {
            return res.status(401).json({ message: 'role is required' });
        }

        if (permissions.includes(role)) {
            next();
        } else {
            return res.status(401).json({message: "you don't have permission !"})
        }
    }
}

export default verifyRole;