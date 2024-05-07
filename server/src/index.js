import express from 'express';

const app = express();
const PORT = 9090;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
})