import React from "react";
import { render } from "react-dom";

import App from "./App";

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
const userId = parseInt(
    document.querySelector('meta[name="user-id"]').getAttribute("content")
);

render(
    <App csrfToken={csrfToken} userId={userId} />,
    document.getElementById("app")
);
