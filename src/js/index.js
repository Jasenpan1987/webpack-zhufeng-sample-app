import notifyMe from "./notification";

import "../styles/styles.css";
import "../styles/styles.less";

window.onload= () => {
    document.getElementById("notify").addEventListener("click", () => {
        notifyMe();
    }, false);
};