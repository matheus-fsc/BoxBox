import React, { useEffect, useRef } from 'react';
import './Style/SettingsMenu.css';

export default function SettingsMenu({ isVisible, toggleMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, toggleMenu]);

  return (
    <div ref={menuRef} className={`settings-sidebar ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={toggleMenu}>×</button>
      <ul>
        <li>Configuração 1</li>
        <li>Configuração 2</li>
        <li>Configuração 3</li>
      </ul>
    </div>
  );
}