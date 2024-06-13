// Generate a strong password
function generateStrongPassword () {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
};

//to achive the grand child of an objct
function getNestedProperty(obj, path) {
    return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}

export  {generateStrongPassword, getNestedProperty};