// utils/notifications.js
import toast from "react-hot-toast";

export const successLogin = (message) => toast.success(message);
export const errorLogin = (message) => toast.error(message);
