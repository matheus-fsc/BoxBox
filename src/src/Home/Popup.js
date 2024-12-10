import React from 'react';
import './Style/Popup.css';

export default function Popup({ isPopupVisible, handleClosePopup }) {
  if (!isPopupVisible) return null;

  return (
    <div id="registerPopup" className="popup">
      <div className="popup-content">
        <span className="close" onClick={handleClosePopup}>&times;</span>
        <h2>Registrar</h2>
        <form>
          <label htmlFor="username">Nome de Usuário:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}