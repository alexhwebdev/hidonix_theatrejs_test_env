"use client";
import React, { useState } from 'react';
import styles from './toggleDropDown.module.scss';

// Define the DropdownItem type
type DropdownItem = {
  tech: string;
  desc: string;
};

const DropDownMenu = (
  // filteredPageContent
) => {
  // State to manage the open/close status of each menu
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    Menu: false,
    Menu2: false,
    Menu3: false,
  });

  const techSolutionsList: DropdownItem[] = [
    { 
      tech: `Menu`, 
      desc: `desc1`
    },
    { 
      tech: `Menu2`, 
      desc: `desc2`
    },
    { 
      tech: `Menu3`, 
      desc: `desc3`
    },
  ];

  // Toggle function for a specific menu
  // const toggleDropdown = (menuName: string) => {
  //   setDropdowns((prev) => ({
  //     ...prev,
  //     [menuName]: !prev[menuName], // Toggle the state for the clicked menu
  //   }));
  // };
  const toggleDropdown = (menuName: string) => {
    setDropdowns((prev) => {
      // Create a new object where only the clicked menu is open, others are closed
      const newState: { [key: string]: boolean } = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = key === menuName ? !prev[menuName] : false;
      });
      return newState;
    });
  };

  return (
    <div className={styles.dropDownMenu}>
      {/* Map over the array of menu data to create dropdowns */}
      {techSolutionsList.map((item, index) => (
        <div key={`tech1` + index} className={styles.dropdown__container}>
          <button
            className={styles.dropdown__button}
            onClick={() => toggleDropdown(item.tech)}
          >
            {item.tech}
          </button>

          <div className={`
            ${styles.dropdown__item} 
            ${dropdowns[item.tech] ? styles.show : ""}
          `}>
            <ul>
              {/* Map over the options for this item */}
              <li key={`tech` + index}>
                {item.desc}
              </li>

            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DropDownMenu;