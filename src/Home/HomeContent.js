import React from 'react';
import './Style/HomeContent.css';

export default function HomeContent({ nickname, setNickname, region, setRegion, handlePlayClick, handleRegisterClick }) {
  return (
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
            <option value=''>Região</option>
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
  );
}