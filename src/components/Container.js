import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="max-w-[1400px] screen-xl mx-auto overflow-y-hidden overflow-x-hidden">
      {children}
    </div>
  );
};
