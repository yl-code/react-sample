import dva from "dva";
import "./index.css";

// 1. Initialize
const createHistory = require("history").createBrowserHistory;
export const app = dva({ history: createHistory() });

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/demo").default);

// 通过使用 dynamic API 动态导入 model
// app.model(require("./models/user").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
