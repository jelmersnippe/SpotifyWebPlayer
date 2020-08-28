import React from "react";
import "./SidebarItem.scss";

function SidebarItem({ text, Icon, path }) {
  return (
    <li className="sidebar-item" key={text}>
      <a className="link" href={path} title={text}>
        {Icon ? (
          <>
            <Icon className="icon" />
            <h4 className="text">{text}</h4>
          </>
        ) : (
          <span className="text">{text}</span>
        )}
      </a>
    </li>
  );
}

export default SidebarItem;
