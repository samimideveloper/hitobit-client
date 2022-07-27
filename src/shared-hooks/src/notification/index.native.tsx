import { StyleProp, TextStyle } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useTheme } from "shared-theme/src";

type Message = {
  message: string;
};

const useNotification = () => {
  const toast = useToast();
  const { colors } = useTheme();
  // const { i18n } = useTranslation();

  const toastOptions: ToastOptions = {
    animationType: "slide-in",
    dangerColor: colors.secondaryActive,
    successColor: colors.secondaryActive,
    warningColor: colors.secondaryActive,
    placement: "top",
    duration: 3000,
    swipeEnabled: true,
    textStyle: {
      fontFamily: "IRANYekanFN",
      fontSize: 12,
      color: colors.onBackground,
    },
  };

  const successNotification = ({ message }: Message) => {
    toast.show(message, {
      ...toastOptions,
      type: "success",
    });
  };
  const errorNotification = ({ message }: Message) => {
    toast.show(message, {
      ...toastOptions,
      type: "danger",
    });
  };

  const infoNotification = ({ message }: Message) => {
    toast.show(message, {
      ...toastOptions,
      type: "normal",
    });
  };
  const warningNotification = ({ message }: Message) => {
    toast.show(message, {
      ...toastOptions,
      type: "warning",
    });
  };

  return {
    successNotification,
    errorNotification,
    warningNotification,
    infoNotification,
  };
};

export { useNotification };

interface ToastOptions {
  type?: "success" | "danger" | "warning";
  duration?: number;
  placement?: "top" | "bottom";
  animationType?: "slide-in" | "zoom-in";
  successColor?: string;
  dangerColor?: string;
  warningColor?: string;
  swipeEnabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}
