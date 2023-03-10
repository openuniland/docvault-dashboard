import React from "react";
import { Sidebar } from "app/components/Sidebar";

const withSidebar = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            overflowY: "scroll",
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withSidebar;
