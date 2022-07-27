import * as React from "@types/react";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: React.PropsWithChildren<P>, context?: any): React.ReactElement<
      any,
      any
    > | null;
  }
}

declare global {
  interface Window {
    onUsersnapCXLoad: (api: { init: () => void }) => void;
  }
}
