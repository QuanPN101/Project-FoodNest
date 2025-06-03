// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS

import "./index.css"; // nếu có thêm styles global

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
