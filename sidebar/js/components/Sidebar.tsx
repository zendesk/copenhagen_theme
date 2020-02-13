import * as React from "react";
import  {useState } from "react"



interface Section {
  name: string;
  id: number;
  href: string;
}

interface Category {
  name: string;
  sections: Section[];
}

interface Props {
  categories: Category[];
}

export default function Sidebar(props: Props) {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(0);

  function expand(id:number) {
    setOpenId(id);
    setOpen(!open);
  }

  return (
    <div className="sidebar-panel">
      <ul className="sidebar">
      <li className="sidebar-item sidebar-home open material-icons-big">
      <a href="https://www.configura.com/academy/cet-designer" className="custom-sidebar-item-title" target="_blank">
       <i className="material-icons custom-icon-margin-right blue-icon">school</i>
        Academy and training
     </a>
   </li>
   <li className="sidebar-item sidebar-home open material-icons-big">
     <a href="https://www.configura.com/products/system-recommendations/cet-designer" className="custom-sidebar-item-title" target="_blank">
       <i className="material-icons custom-icon-margin-right blue-icon">computer</i>
        System recommendations
     </a>
   </li>
   <li className="sidebar-item sidebar-home open material-icons-big">
     <a href="https://www.configura.com/products/release-notes/cet-designer" className="custom-sidebar-item-title" target="_blank">
       <i className="material-icons custom-icon-margin-right blue-icon">import_contacts</i>
        Release notes
     </a>
   </li>
   <li className="sidebar-item sidebar-home open custom-margin-bottom material-icons-big">
     <a href=" https://www.configura.com/my/forum" className="custom-sidebar-item-title" target="_blank">
       <i className="material-icons custom-icon-margin-right blue-icon">forum</i>
        Forums
     </a>
   </li>
      </ul>

      {props.categories &&
        props.categories.map((category, id) => {
          return (
            <>
              <ul key={id} onClick={e => expand(id)}>
                {category.name}
                {open &&
                  openId === id &&
                  category.sections.map(section => {
                    return (
                      <li>
                        <a href={section.href}>{section.name}</a>
                      </li>
                    );
                  })}
              </ul>
            </>
          );
        })}
    </div>
  );
}
