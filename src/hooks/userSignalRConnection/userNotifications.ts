import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import {
  Notification2ListResponseVM,
  useGetEngagementV1PrivateNotification,
  useGetEngagementV1PrivateNotificationType,
} from "../../services";
import { Status, useUserSignalREvent } from "./useUserSignalREvent";

const useUpdateUserNotificationWithSignalr = () => {
  const queryClient = useQueryClient();

  /** NOTIFICATION INFINITE QUERY */
  useUserSignalREvent("notification", (data) => {
    queryClient.setQueriesData<InfiniteData<Notification2ListResponseVM>>(
      useGetEngagementV1PrivateNotification.info({}).key,
      (prev) => {
        const item = prev?.pages?.[0];
        if (item) {
          item.list?.unshift({
            createDate: data.createDate,
            id: data.id,
            level: data.level,
            read: data.read,
            type: data.type,
            userId: data.userId,
            message: data.message,
            readDate: data.readDate,
            subject: data.subject,
          });
          item.count = item.count + 1;
        }
        return prev;
      },
    );
    queryClient.invalidateQueries(
      useGetEngagementV1PrivateNotificationType.info().key,
      { refetchType: "all" },
    );
  });

  /** NOTIFICATION INFINITE QUERY */
  useUserSignalREvent("notificationStatusChange", (data) => {
    queryClient.setQueriesData<InfiniteData<Notification2ListResponseVM>>(
      useGetEngagementV1PrivateNotification.info({}).key,
      (prev) => {
        let list = [...(prev?.pages[0]?.list || [])];
        let prevCount = prev?.pages[0].count || 0;

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
          const r = Math.abs((prev?.pages[0].list?.length || 0) - list?.length);

          prevCount = prevCount - r;
        }

        return {
          pages: [{ list, count: prevCount }],
          pageParams: [prev?.pageParams],
        };
      },
    );
  });
};

export { useUpdateUserNotificationWithSignalr };
