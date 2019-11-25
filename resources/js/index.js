import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";

import App from "./App";

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

let user = JSON.parse(
    document.querySelector('meta[name="user"]').getAttribute("content")
);

const el = document.getElementById("app");

Modal.setAppElement(el);

render(<App csrfToken={csrfToken} user={user} />, el);
