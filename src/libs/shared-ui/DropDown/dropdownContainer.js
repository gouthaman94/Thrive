import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SortDownFill } from "../../../svgs/sortDownFill.svg";
import { ReactComponent as SortDown } from "../../../svgs/sortDown.svg";
import "./dropdownContainer.css";

export const Dropdown = (props) => {
  const { menuWidth, children, onToggleChange } = props;

  const iconRef = useRef(null);
  const dropdownRef = useRef(null);
  const [direction, setDirection] = useState("bottom-right");
  const [isDropDownMenuClose, setIsDropDownMenuClosed] = useState(true);

  const toggleDropdownOnTop = (onTop = true) => {
    const parent = dropdownRef.current.closest(".react-grid-item");
    if (parent) {
      const style = parent.getAttribute("style");
      if (style && style.includes("z-index")) {
        const newStyle = onTop
          ? style.replace("z-index: 5", "z-index: 6")
          : style.replace("z-index: 6", "z-index: 5");
        parent.setAttribute("style", newStyle);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.nodeName.toLowerCase() !== "html"
    ) {
      setIsDropDownMenuClosed && setIsDropDownMenuClosed(true);
      toggleDropdownOnTop(false);
      onToggleChange(false);
    }
    event.stopPropagation();
  };

  const handleOnToggle = (e) => {
    setIsDropDownMenuClosed(!isDropDownMenuClose);
    onToggleChange(!isDropDownMenuClose);
    e.stopPropagation();
  };

  const dropdownPosition = () => {
    const menuHeight = 150;
    const windowHeight = window.innerHeight;
    const { top, bottom, left } = dropdownRef.current.getBoundingClientRect();
    const bottomx = windowHeight - bottom;

    if (left < menuWidth + 40) {
      bottomx < menuHeight
        ? top < menuHeight
          ? setDirection("bottom-right")
          : setDirection("top-right")
        : setDirection("bottom-right");
    } else if (left >= menuWidth + 40) {
      bottomx < menuHeight
        ? top < menuHeight
          ? setDirection("bottom-left")
          : setDirection("top-left")
        : setDirection("bottom-left");
    }
  };

  useEffect(() => {
    if (!isDropDownMenuClose) {
      toggleDropdownOnTop(true);
      // dropdownPosition();
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropDownMenuClose]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      setDropDownMenuClose: setIsDropDownMenuClosed,
      dropDownMenuClosed: isDropDownMenuClose,
    })
  );

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div ref={iconRef} onClick={handleOnToggle}>
        {!isDropDownMenuClose ? <SortDownFill /> : <SortDown />}
      </div>
      <div
        className={`dropdown-content ${
          !isDropDownMenuClose ? "dropdown-content--show" : ""
        }  dropdown-content--${direction}`}
      >
        {childrenWithProps}
      </div>
    </div>
  );
};
