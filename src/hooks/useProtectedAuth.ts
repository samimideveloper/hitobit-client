import { useRef, useState } from "react";
import {
  PurposeType,
  RequestError,
  usePostAuthV1PrivateAuthGetcode,
} from "../services";

export type UserData = {
  otpCode: string;
  totp?: string;
  otpToken?: string;
  purpose: PurposeType;
};

type Resolve = ({ otpCode, otpToken, totp, purpose }: UserData) => void;
type Reject = (error: RequestError | Error | null) => void;
type Trigger = { onResolve: Resolve; onReject?: Reject };
export type PurposeFunction = (purpose: PurposeType) => void;

export const useProtectedAuth = () => {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<Trigger>({
    onResolve: () => null,
    onReject: () => null,
  });

  const onClose = () => setOpen(false);

  const {
    mutate,
    isLoading,
    data: otpToken,
    error,
  } = usePostAuthV1PrivateAuthGetcode();

  const trigger = async (
    onResolve: (userData: UserData) => void,
    onReject?: (error: RequestError | Error | null) => void,
  ) => {
    triggerRef.current.onResolve = onResolve;
    triggerRef.current.onReject = onReject;
    setOpen(true);
  };

  const onSubmit = (purpose: PurposeType, otpCode: string, totp?: string) => {
    console.log("1");
    triggerRef.current?.onResolve({ otpCode, totp, otpToken, purpose });
    console.log("2");
    onClose();
    console.log("3");

    triggerRef.current?.onReject?.(error);

    triggerRef.current = {
      onResolve: () => null,
      onReject: () => null,
    };
  };

  const getCode = (purpose: PurposeType) => {
    mutate({ headerParams: { purpose } });
  };

  const authOptions = {
    onClose,
    open,
    onSubmit,
    error,
    isLoading,
    getCode,
  };

  return { trigger, authOptions };
};
