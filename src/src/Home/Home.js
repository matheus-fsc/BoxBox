import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [region, setRegion] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    const isValidNickname = /^[a-zA-Z0-9_]+$/.test(nickname);
    if (isValidNickname && region) {
      navigate('/jogar');
    } else {
      alert('Por favor, insira um nickname válido e escolha uma região.');
    }
  };

  const handleRegisterClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='container'>
      <div className='Logo'>
        <h1 className='LogoTex'>BoxBox.io</h1>
      </div>
      
      <div className='Home'>
        <div className='HomeContent'>
          <div className='InputContainer'>
            <input
              type='text'
              placeholder='Digite seu nome'
              className='HomeInput'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className='RegionContainer'>
              <select
                className='HomeInputRegion'
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value=''>Escolha sua região</option>
                <option value='norte'>Norte</option>
                <option value='nordeste'>Nordeste</option>
                <option value='centro-oeste'>Centro-Oeste</option>
                <option value='sudeste'>Sudeste</option>
                <option value='sul'>Sul</option>
              </select>
            </div>
          </div>
          <button className='HomeButton' onClick={handlePlayClick}>Jogar</button>
          <button className='RegisterButton' onClick={handleRegisterClick}>Registrar</button>
        </div>
      </div>
      {isPopupVisible && (
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
      )}
      <footer>
        <p>BoxBox - 2021</p>
      </footer>
    </div>
  );
}