import { Notification } from "../models/Notification.js";
import successResponse from "../responseHandler/successResponse.js";

const getNotifications = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        const notifications = await Notification.find({
            $or: [
                { user: user_id },
                { user: null }
            ]
        }).sort({ createdAt: -1 });
        successResponse(res, "Notifications Fetched Successfully", notifications);
    } catch (error) {
        next(error);
    }
};

const readNotification = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        const notification_id = req.params.id;
        const notification = await Notification.findById(notification_id);
        if (!notification) {
            const error = new Error("Notification Not Found");
            error.statusCode = 404;
            throw error;
        };
        if (notification.user && notification.user.toString() != user_id.toString()) throw new Error("Access Denied");
        notification.isRead = true;
        await notification.save();
        successResponse(res, "Notification Read Successfully", notification);
    } catch (error) {
        next(error);
    }
};

const readAllNotifications = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        await Notification.updateMany({
            $or: [
                { user: user_id },
                { user: null }
            ],
            isRead: false
        }, {
            isRead: true
        });
        successResponse(res, "All Notifications Marked As Read");
    } catch (error) {
        next(error);
    }
};

export { getNotifications, readNotification, readAllNotifications };