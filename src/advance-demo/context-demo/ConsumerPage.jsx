import React from "react";
import { ThemeContext, UserContext } from "./Context";

/**
 * context.consumer 这种写法比较难受
 * 多个 context 需要嵌套多层 consumer 函数
 *
 * consumer 的嵌套顺序不用与 provider 的嵌套顺序一致
 *
 */

// export function ConsumerPage() {
//   return (
//     <ThemeContext.Consumer>
//       {(theme) => (
//         <UserContext.Consumer>
//           {(user) => <RealCom theme={theme} user={user} />}
//         </UserContext.Consumer>
//       )}
//     </ThemeContext.Consumer>
//   );
// }

export function ConsumerPage() {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ThemeContext.Consumer>
          {(theme) => <RealCom theme={theme} user={user} />}
        </ThemeContext.Consumer>
      )}
    </UserContext.Consumer>
  );
}

const RealCom = (props) => {
  const { theme, user } = props;

  console.log("render RealCom");

  return (
    <h2 style={{ color: theme.color }}>
      ConsumerPage: {user.name} - {theme.color}
    </h2>
  );
};
