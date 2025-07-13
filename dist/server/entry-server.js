import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import React from "react";
function App() {
  const [count, setCount] = React.useState(0);
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "Vite SSR React App" }),
    /* @__PURE__ */ jsx("p", { children: "This component is server-side rendered!" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setCount((c) => c + 1),
        style: {
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        },
        children: [
          "计数器: ",
          count
        ]
      }
    )
  ] });
}
function render(url) {
  const html = renderToString(/* @__PURE__ */ jsx(App, {}));
  return { html };
}
export {
  render
};
