import dotenv from "dotenv";
import { app } from './app.js';
import connectDB from './database/index.js';
dotenv.config({
    path: '../.env'
})



const PORT =3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })


