import React, { useContext } from "react";
import SidebarIcons from "../atoms/SidebarIcons";
import lightbulbIcon from "../atoms/img/lightbulbIcon.svg";
import reminderIcon from "../atoms/img/notificationIcon.svg";
import editIcon from "../atoms/img/editIcon.svg";
import archiveIcon from "../atoms/img/archiveIcon.svg";
import deleteIcon from "../atoms/img/deleteIcon.svg";
import style from "./sidebar.css";
import { ComponentContext } from "../Context/ComponentProvider";



const Sidebar = () => {

  const { currentComponent, setCurrentComponent, toggleComponent } =
    useContext(ComponentContext);

    
  const getButtonClassName = (componentName) => {
    if (currentComponent === componentName) {
      // console.log("first")
      return "active";
    }
    return "";
  };

  return (
    <>
      <div className="left-side-bar">
        <div>
          <div
            onClick={() => toggleComponent("notes")}
            className={getButtonClassName("notes")}
          >
            <SidebarIcons
              icon={lightbulbIcon}
              text="Notes"
              altxtsideicon="lightbulbIcon-svg"
            />
          </div>
          <SidebarIcons
            icon={reminderIcon}
            text="Reminders"
            altxtsideicon="reminderIcon-svg"
          />
          <SidebarIcons
            icon={editIcon}
            text="Edit Labels"
            altxtsideicon="editIcon-svg"
          />
          <SidebarIcons
            icon={archiveIcon}
            text="Archive"
            altxtsideicon="archiveIcon-svg"
          />
          <div
            onClick={() => toggleComponent("deleted-notes")}
            className={getButtonClassName("deleted-notes")}
          >
            <SidebarIcons
              icon={deleteIcon}
              text="Trash"
              altxtsideicon="trashIcon-svg"
            />
          </div>
        </div>
        <div className="license">
          <p> Open Source License</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
