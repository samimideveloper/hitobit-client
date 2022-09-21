import { createContext, useContext } from "react";
declare type NotificationPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

export interface NotificationArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  delay?: number;
}

export interface NotificationContextValues {
  successNotification: (notification: NotificationArgsProps) => void;
  errorNotification: (notification: NotificationArgsProps) => void;
  infoNotification: (notification: NotificationArgsProps) => void;
  warningNotification: (notification: NotificationArgsProps) => void;
}
const NotificationContext = createContext<NotificationContextValues>({
  successNotification: () => {},
  errorNotification: () => {},
  infoNotification: () => {},
  warningNotification: () => {},
});

const useNotification = () => {
  const {
    errorNotification,
    infoNotification,
    successNotification,
    warningNotification,
  } = useContext(NotificationContext);
  return {
    successNotification,
    errorNotification,
    infoNotification,
    warningNotification,
  };
};

export { NotificationContext, useNotification };
