import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
     io = new Server(server,{
        cors:{
            origin:[
                "http://localhost:5173",
                "https://zyntra-frontend-zeta.vercel.app"
            ],
             methods: ["GET", "POST"],
            credentials:true
        }
    });

    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};