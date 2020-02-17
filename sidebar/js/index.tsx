import * as React from "react";
import * as ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar";

// function index() {
// React.useEffect(() => {
//   // Create an scoped async function in the hook
//   async function fetchData () {
//     await fetch("/api/v2/help_center/en-us/sections.json?include=categories&per_page=100")
//       .then(res => res.json())
//       .then(res => {setCategory(res)})
//       .catch(() => this.setState({ hasErrors: true }));
//   }
// }, []);

// return category
// }

// async function fetchData () {
//   fetch("/api/v2/help_center/en-us/sections.json?include=categories&per_page=100")
//     .then(res => res.json())
//     .then(res => this.setState({ planets: res }))
//     .catch(() => this.setState({ hasErrors: true }));
// }

function domReady(callback: () => void) {
  document.readyState === "interactive" || document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
}

domReady(() => {
  ReactDOM.render(
    <Sidebar />,
    document.body.appendChild(document.createElement("DIV"))
  );
});
