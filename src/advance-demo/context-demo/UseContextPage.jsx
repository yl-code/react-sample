import React, { useContext } from "react";
import { ThemeContext, UserContext } from "./Context";

export function UseContextPage() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  console.log("render UseContextPage");

  return (
    <h2 style={{ color: theme.color }}>
      UseContextPage: {user.name} - {theme.color}
    </h2>
  );
}
