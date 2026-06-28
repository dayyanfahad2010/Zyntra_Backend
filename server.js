import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import { initSocket } from "./src/socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

        initSocket(server);

    } catch (error) {
        console.log(error);
    }
};

startServer();