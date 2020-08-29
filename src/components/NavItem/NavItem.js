import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.scss";

function NavItem({ text, Icon, path, type }) {
  return (
    <div className={`nav-item ${type && type}`}>
      <NavLink
        className="link"
        exact={path === "/"}
        activeClassName="active"
        to={path}
      >
        {Icon ? (
          <>
            <Icon className="icon" />
            {text && <h4 className="text">{text}</h4>}
          </>
        ) : (
          <span className="text">{text}</span>
        )}
      </NavLink>
    </div>
  );
}

export default NavItem;
