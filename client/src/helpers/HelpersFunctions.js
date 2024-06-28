// Generate a strong password
function generateStrongPassword () {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const numbers = "0123456789";
    let password = "";

    // Ensure at least one number
    password += numbers[Math.floor(Math.random() * numbers.length)];

    for (let i = 1; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    // Shuffle the password to ensure the number is not always at the same position
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
};

//to achive the grand child of an objct
function getNestedProperty(obj, path) {
    return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}

export  {generateStrongPassword, getNestedProperty};