import { ReactNode } from "react";
import { useAuth } from "react-oidc-js";
import { getSignalRBaseUrl } from "shared-constants";
import { handleAccessTokenExpired } from "shared-services/src/context/userManager";
import { RequestError } from "shared-services/src/services/config";
import { UserSignalRContext } from "./signalRContext";
import { useSubscribe } from "./subscribe";
import { useUpdateUserAssetWithSignalr } from "./userAsset";
import { useUpdateOrderWithSignalr } from "./userOrder";

const UserSignalRConnection = ({ children }: { children: ReactNode }) => {
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
      dependencies={[!!userData?.access_token, getSignalRBaseUrl()]}
      url={getSignalRBaseUrl()}
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
