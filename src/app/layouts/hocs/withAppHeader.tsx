import React from "react";
import { AppHeader } from "app/components/AppHeader";

const withAppHeader = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <AppHeader />
        <div
          style={{
            overflowY: "auto",
            overflowX: "auto",
            marginTop: "100px",
            height: "calc(100vh - 100px)",
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withAppHeader;
