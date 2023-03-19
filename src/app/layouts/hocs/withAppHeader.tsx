import React from "react";
import { AppHeader } from "app/components/AppHeader";

const withAppHeader = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <AppHeader />
        <div style={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withAppHeader;
