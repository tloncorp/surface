import { CSSProperties } from "react";

// This is used to style both `Tab` and the
// I wanted to include this in the Tab component, but eslint was complaining...

const tabStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 8,
  borderRadius: "6px",
  minWidth: "100px",
  height: "36px",
  gap: 8,
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
};

export default tabStyle;
