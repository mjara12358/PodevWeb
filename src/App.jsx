import React from "react";
import podevLogo from './assets/podevsinfondo.png'
import animatedGif from './assets/gifLogo.gif';
import './App.css'

function App() {


return (
<>  
  <div className="inicio-conteiner">
    <div>
      <div className="title">
          <a href="https://sites.google.com/umariana.edu.co/podevapp/inicio" target="_blank" rel="noopener noreferrer">
              <img src={podevLogo} className="logo" alt="Podev Logo" />
              <h1 className="title-text">Podev Web</h1>
          </a>
      </div>
    </div>
    <div>
      <div className="gif-container">
        <img src={animatedGif} className="animated-gif" alt="Animated GIF" />
      </div>
    </div>
  </div>  
  <div className="inicio-text">
      <p>Podev Web es el complemento ideal para la Podev App, diseñado especialmente para 
        los familiares de los usuarios ciegos que utilizan la aplicación. Este complemento 
        web proporciona herramientas esenciales para que los familiares puedan obtener 
        información precisa sobre la ubicación de sus seres queridos. De esta manera, 
        podrán estar al tanto de su paradero en todo momento, brindando una mayor 
        tranquilidad y seguridad a las familias. Con Podev Web, los familiares tendrán 
        acceso a una plataforma que les permite cuidar y apoyar a sus seres queridos con 
        discapacidad visual de manera más efectiva.</p>
        <p className="read-the-docs">
          <strong>Desarrollado por:</strong> Marlon Jaramillo
      </p>
  </div>
</>
)
}

export default App
