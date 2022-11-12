import { useQueryClient } from "@tanstack/react-query";
import {
  Notification2ListResponseVM,
  useGetEngagementV1PrivateNotification,
} from "../../services";
import { Status, useUserSignalREvent } from "./useUserSignalREvent";

const useUpdateUserNotificationWithSignalr = () => {
  const queryClient = useQueryClient();

  /** NOTIFICATION INFINITE QUERY */
  useUserSignalREvent("notification", (data) => {
    queryClient.setQueriesData<Notification2ListResponseVM>(
      useGetEngagementV1PrivateNotification.info({}).key,
      (prev) => {
        const list = [...(prev?.list || [])];

        list.unshift({
          createDate: data.createDate,
          id: data.id,
          level: data.level,
          read: data.read,
          type: data.type,
          userId: data.userId,
          message: data.message,
          readDate: data.readDate,
        });

        const prevCount = prev?.count || 0;

        return { count: prevCount + 1, list };
      },
    );
  });

  /** NOTIFICATION INFINITE QUERY */
  useUserSignalREvent("notificationStatusChange", (data) => {
    queryClient.setQueriesData<Notification2ListResponseVM>(
      useGetEngagementV1PrivateNotification.info({}).key,
      (prev) => {
        let list = [...(prev?.list || [])];
        let prevCount = prev?.count || 0;

        if (data.status === Status.read) {
          data.ids.forEach((notificationId) => {
            const notification = list.find(({ id }) => id === notificationId);
            if (notification) {
              notification.read = true;
            }
          });
        } else {
          list = list.filter(
            ({ id }) => id !== undefined && !data.ids.includes(id),
          );
          const r = Math.abs((prev?.list?.length || 0) - list?.length);

          prevCount = prevCount - r;
        }

        return { list, count: prevCount };
      },
    );
  });
};

export { useUpdateUserNotificationWithSignalr };
