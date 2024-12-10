import React, { useState } from 'react';
import './Style/Footer.css';
import SettingsIcon from './HomeAssets/Settings.svg';
import SettingsMenu from './SettingsMenu';

export default function Footer() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <footer>
      <img
        src={SettingsIcon}
        alt="Settings"
        className="settings-icon"
        onClick={toggleMenu}
      />
      <SettingsMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
    </footer>
  );
}