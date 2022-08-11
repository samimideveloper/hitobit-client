import { MessageHeaders } from "@microsoft/signalr";
import { URLManager } from "hitobit-modules";
import { handleAccessTokenExpired, RequestError } from "hitobit-services";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-js";
import { UserSignalRContext } from "./signalRContext";
import { useSubscribe } from "./subscribe";
import { useUpdateUserAssetWithSignalr } from "./userAsset";
import { useUpdateOrderWithSignalr } from "./userOrder";
import { useUpdateUserWalletWithSignalr } from "./userWallet";
import { useUserSignalREvent } from "./useUserSignalREvent";

const UserSignalRConnectionProvider = ({
  children,
  dependencies,
  headers,
}: {
  children: ReactNode;
  dependencies?: any[];
  headers?: MessageHeaders;
}): any => {
  const { userData } = useAuth();

  return (
    <UserSignalRContext.Provider
      connectEnabled={!!userData?.access_token && typeof window !== "undefined"}
      onError={async (error?: Error | RequestError) => {
        if (RequestError.isApiException(error)) {
          if (error?.status === 401) {
            await handleAccessTokenExpired();
          }
        }
      }}
      headers={headers}
      dependencies={[
        !!userData?.access_token,
        URLManager.signalRBaseUrl,
        ...(dependencies || []),
      ]}
      url={URLManager.signalRBaseUrl}
    >
      <>
        <ConnectToSignalRListeners />
        {children}
      </>
    </UserSignalRContext.Provider>
  );
};

const ConnectToSignalRListeners = () => {
  useSubscribe();

  useUpdateUserAssetWithSignalr();

  useUpdateUserWalletWithSignalr();

  useUpdateOrderWithSignalr();

  return null;
};

export { UserSignalRConnectionProvider, useUserSignalREvent };
