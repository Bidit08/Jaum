import Notification from "../models/Notification.js";

/**
 * Utility to create a notification in-app
 */
export const createNotification = async ({
  user,
  title,
  message,
  type,
  link,
}) => {
  try {
    await Notification.create({
      user,
      title,
      message,
      type,
      link,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};
