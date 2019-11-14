import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";

import App from "./App";

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

let userId = document
    .querySelector('meta[name="user-id"]')
    .getAttribute("content");

userId = userId.length > 0 ? parseInt(userId) : null;

const el = document.getElementById("app");

Modal.setAppElement(el);

render(<App csrfToken={csrfToken} userId={userId} />, el);
