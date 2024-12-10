import React from 'react'
import './Home.css' 

export default function Home() {
  return (
    <div className='container'>
      <div className='Logo'>
          <h1 className='LogoTex'>BoxBox.io</h1>
      </div>
        
      <div className='Home'>
        <div className='HomeContent'>
              <div className='InputContainer'>
                <input type='text' placeholder='Digite seu nome' className='HomeInput'></input>
                <div className='RegionContainer'>
                  <select className='HomeInputRegion'>
                    <option value=''>Escolha sua região</option>
                    <option value='norte'>Norte</option>
                    <option value='nordeste'>Nordeste</option>
                    <option value='centro-oeste'>Centro-Oeste</option>
                    <option value='sudeste'>Sudeste</option>
                    <option value='sul'>Sul</option>
                  </select>
                </div>
              </div>
              <button className='HomeButton'>Jogar</button>
              <p className='HomeText'>Registrar</p>
        </div>
      </div>
      <footer>
          <p>BoxBox - 2021</p>
      </footer>
    </div>
  )
}