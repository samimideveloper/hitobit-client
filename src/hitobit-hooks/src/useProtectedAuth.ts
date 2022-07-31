import {
  PurposeType,
  RequestError,
  usePostAuthV1PrivateAuthGetcode,
} from "hitobit-services";
import { useRef, useState } from "react";

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
  const triggerRef = useRef<Trigger | null>(null);

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
    if (!triggerRef.current) {
      triggerRef.current = { onResolve, onReject };
    }
    setOpen(true);
  };

  const onSubmit = (purpose: PurposeType, otpCode: string, totp?: string) => {
    triggerRef.current?.onResolve({ otpCode, totp, otpToken, purpose });
    onClose();

    triggerRef.current?.onReject?.(error);
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
