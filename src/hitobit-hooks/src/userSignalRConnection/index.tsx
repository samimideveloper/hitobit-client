import { URLManager } from "hitobit-modules";
import { RequestError } from "hitobit-services";
import { handleAccessTokenExpired } from "hitobit-services/src/context/userManager";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-js";
import { UserSignalRContext } from "./signalRContext";
import { useSubscribe } from "./subscribe";
import { useUpdateUserAssetWithSignalr } from "./userAsset";
import { useUpdateOrderWithSignalr } from "./userOrder";

const UserSignalRConnection = ({ children }: { children: ReactNode }): any => {
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
      dependencies={[!!userData?.access_token, URLManager.signalRBaseUrl]}
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

  useUpdateOrderWithSignalr();

  return null;
};

export { UserSignalRConnection };
