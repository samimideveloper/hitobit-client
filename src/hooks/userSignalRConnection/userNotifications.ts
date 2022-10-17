import { useQueryClient } from "react-query";
import {
  getEngagementV1PrivateNotification,
  Notification2ResponseVM,
} from "../../services";
import { Status, useUserSignalREvent } from "./useUserSignalREvent";

const useUpdateUserNotificationWithSignalr = () => {
  const queryClient = useQueryClient();

  useUserSignalREvent("notification", (data) => {
    queryClient.setQueryData<Notification2ResponseVM[]>(
      getEngagementV1PrivateNotification.key,
      (prev) => {
        const newNotifications = [...(prev || [])];

        newNotifications.unshift({
          createDate: data.createDate,
          id: data.id,
          level: data.level,
          read: data.read,
          type: data.type,
          userId: data.userId,
          message: data.message,
          readDate: data.readDate,
        });

        return newNotifications;
      },
    );
  });

  useUserSignalREvent("notificationStatusChange", (data) => {
    queryClient.setQueryData<Notification2ResponseVM[]>(
      getEngagementV1PrivateNotification.key,
      (prev) => {
        let newStatusChangeNotifications = [...(prev || [])];
        if ((data.status = Status.read)) {
          data.ids.forEach((notificationId) => {
            const notification = newStatusChangeNotifications.find(
              ({ id }) => id === notificationId,
            );
            if (notification) {
              notification.read = true;
            }
          });
        } else {
          newStatusChangeNotifications = newStatusChangeNotifications.filter(
            ({ id }) => !data.ids.includes(id),
          );
        }

        return newStatusChangeNotifications;
      },
    );
  });
};

export { useUpdateUserNotificationWithSignalr };
