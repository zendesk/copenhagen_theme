import * as React from "react";
import * as ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar";

var category1 = [
    {
      name: "CET Designer",
      sections: [
        {
          name: "One",
          id: 1,
          href: "/"
        },
        {
          name: "Two",
          id: 2,
          href: "/"
        }
      ]
    },
    {
      name: "Catalogues",
      sections: [
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "Two",
          id: 22,
          href: "/"
        }
      ]
    },
    {
      name: "MyConfigura",
      sections: [
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "One",
          id: 21,
          href: "/"
        },
        {
          name: "Two",
          id: 22,
          href: "/"
        }
      ]
    }
  ];
  

ReactDOM.render(<Sidebar categories={category1} />, document.getElementById("sidebar"));

{}