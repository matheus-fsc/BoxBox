import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Home.css';
import Logo from './Logo';
import HomeContent from './HomeContent';
import Popup from './Popup';
import Footer from './Footer';

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
      <Logo />
      <div className='Home'>
        <HomeContent
          nickname={nickname}
          setNickname={setNickname}
          region={region}
          setRegion={setRegion}
          handlePlayClick={handlePlayClick}
          handleRegisterClick={handleRegisterClick}
        />
      </div>
      <Popup isPopupVisible={isPopupVisible} handleClosePopup={handleClosePopup} />
      <Footer />
    </div>
  );
}