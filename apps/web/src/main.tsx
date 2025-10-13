import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// index.html の <div id="root"> に App を描画する
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);