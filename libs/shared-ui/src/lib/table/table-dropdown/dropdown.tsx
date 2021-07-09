import React, { useEffect, useRef, useState } from "react";
import { SortDown, SortDownFill } from "@iron-hide/assets";
import Styles from "./dropdown.module.scss";

interface IDropDown {
  menuWidth: number;
  onToggleChange?: (change: boolean) => void;
  children: React.ReactNode;
}

export const Dropdown = (props: IDropDown) => {
  const { menuWidth, children, onToggleChange } = props;

  const iconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState("bottom-right");
  const [isDropDownMenuClose, setIsDropDownMenuClosed] = useState(true);

  const toggleDropdownOnTop = (onTop = true) => {
    const parent = dropdownRef?.current?.closest(".react-grid-item");
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

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.nodeName.toLowerCase() !== "html"
    ) {
      setIsDropDownMenuClosed && setIsDropDownMenuClosed(true);
      toggleDropdownOnTop(false);
      onToggleChange && onToggleChange(false);
    }
    event.stopPropagation();
  };

  const handleOnToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDropDownMenuClosed(!isDropDownMenuClose);
    onToggleChange && onToggleChange(!isDropDownMenuClose);
    e.stopPropagation();
  };

  const dropdownPosition = () => {
    if (dropdownRef.current) {
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
    }
  };

  useEffect(() => {
    if (!isDropDownMenuClose) {
      toggleDropdownOnTop(true);
      dropdownPosition();
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropDownMenuClose]);

  const childrenWithProps = React.Children.map(children, (child, i: number) =>
    React.cloneElement(child as React.ReactElement, {
      setDropDownMenuClose: setIsDropDownMenuClosed,
      dropDownMenuClosed: isDropDownMenuClose,
    }),
  );

  return (
    <div className={Styles.dropdown} ref={dropdownRef}>
      <div ref={iconRef} onClick={handleOnToggle}>
        {!isDropDownMenuClose ? <SortDownFill /> : <SortDown />}
      </div>
      <div
        className={`${Styles.dropdown_content} ${
          !isDropDownMenuClose ? Styles["dropdown-content--show"] : ""
        }  ${Styles[`dropdown-content--${direction}`]}`}
      >
        {childrenWithProps}
      </div>
    </div>
  );
};
