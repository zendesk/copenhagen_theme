import React, { useState, useEffect } from "react";

export interface Data {
  sections: Section[];
  page: number;
  previous_page: null;
  next_page: null;
  per_page: number;
  page_count: number;
  count: number;
  sort_by: string;
  sort_order: string;
  categories: Category[];
}

export interface Category {
  id: number;
  url: string;
  html_url: string;
  position: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  locale: Locale;
  source_locale: Locale;
  outdated: boolean;
}

export enum Locale {
  EnUs = "en-us"
}

export interface Section {
  id: number;
  url: string;
  html_url: string;
  category_id: number;
  position: number;
  sorting: Sorting;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  locale: Locale;
  source_locale: Locale;
  outdated: boolean;
  parent_section_id: number | null;
  theme_template: ThemeTemplate;
}

export enum Sorting {
  Manual = "manual",
  Title = "title"
}

export enum ThemeTemplate {
  SectionPage = "section_page",
  SectionPagesChatPage = "section_pages/chat_page"
}

interface Props {
  // categories: Category[];
}

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

export default function Sidebar(props: Props) {
  // const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(0);
  const [data, setData] = useState<Data>();
  const [liClass, setListClass] = useState("sidebar-item");
  const url =
    "/api/v2/help_center/en-us/sections.json?include=categories&per_page=100";

  function expand(id: number) {
    setOpenId(prevState => {
      if (prevState === id) {
        return 0;
      }
      return id;
    });
    // setOpen(!open);
  }

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  }

  useEffect(() => {
    (async () => {
      const response = await fetchUrl();
      setData(response);
    })();
  }, []);

  console.log(data);
  const categories = data && data.categories;
  const sections = data && data.sections;

  function updateStyle(id: number) {
    // if (openId === id) {
    //   setListClass("sidebar-item open");
    // } else {
    //   setListClass("sidebar-item");
    // }
    setListClass(openId == id ? "sidebar-item" : "sidebar-item open");
  }
  if (document.getElementById("home")) {
    return <> </>;
  }

  return (
    <div id="sidebar" className="sidebar-panel">
      <ul className="sidebar">
        <li className="sidebar-item sidebar-home open material-icons-big">
          <a
            href="https://www.configura.com/academy/cet-designer"
            className="custom-sidebar-item-title"
            target="_blank"
          >
            <i className="material-icons custom-icon-margin-right blue-icon">
              school
            </i>
            Academy and training
          </a>
        </li>
        <li className="sidebar-item sidebar-home open material-icons-big">
          <a
            href="https://www.configura.com/products/system-recommendations/cet-designer"
            className="custom-sidebar-item-title"
            target="_blank"
          >
            <i className="material-icons custom-icon-margin-right blue-icon">
              computer
            </i>
            System recommendations
          </a>
        </li>
        <li className="sidebar-item sidebar-home open material-icons-big">
          <a
            href="https://www.configura.com/products/release-notes/cet-designer"
            className="custom-sidebar-item-title"
            target="_blank"
          >
            <i className="material-icons custom-icon-margin-right blue-icon">
              import_contacts
            </i>
            Release notes
          </a>
        </li>
        <li className="sidebar-item sidebar-home open custom-margin-bottom material-icons-big">
          <a
            href=" https://www.configura.com/my/forum"
            className="custom-sidebar-item-title"
            target="_blank"
          >
            <i className="material-icons custom-icon-margin-right blue-icon">
              forum
            </i>
            Forums
          </a>
        </li>

        {categories &&
          categories
            .filter(category => category.name !== "Contact Us")
            .map((category, index) => {
              return (
                <li
                  className={
                    category.id === openId
                      ? "sidebar-item open"
                      : "sidebar-item"
                  }
                  key={index}
                  onClick={e => {
                    expand(category.id);
                    // updateStyle(category.id);
                  }}
                >
                  <h4 className="sidebar-item-title">{category.name}</h4>
                  <ul>
                    {openId === category.id &&
                      sections
                        .filter(
                          section =>
                            section.category_id === category.id &&
                            !section.parent_section_id
                        )
                        .map(section => {
                          return (
                            <li key={section.id}>
                              <a href={section.url}>{section.name}</a>
                            </li>
                          );
                        })}
                  </ul>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
