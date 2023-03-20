import React from "react";
import { AppHeader } from "app/components/AppHeader";

const withAppHeader = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <AppHeader />
        <div
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            maxWidth: "calc(100vw - 300px)",
            overflowX: "auto",
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withAppHeader;
