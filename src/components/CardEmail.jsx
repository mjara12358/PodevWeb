import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import podevLogo from '/src/assets/podevsinfondo.png'
import myImage from '/src/assets/imgLogoMap2.png';

const CardEmail = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const phoneWithCountryCode = `+57${phoneNumber}`;
        if (/^\d{10}$/.test(phoneNumber)) {
            //console.log("Phone number with country code:", phoneWithCountryCode);
            // Aquí puedes agregar la lógica para consultar la información del usuario
            setErrorMessage("");
            navigate('/InfoUs', { state: { phoneWithCountryCode } });
        } else {
            setErrorMessage("El número de celular debe tener 10 dígitos.");
        }
    };

    return (
        <>
        <div className="card-gen">
            <div className="card-cel">
                <div className="description">
                    <div className="card-cel-title">
                        <img src={podevLogo} className="logo" alt="Podev Logo" />
                        <h1>Podev Web</h1>
                    </div>
                    <p>En este apartado, puedes ingresar el numero de celular del usuario 
                        para consultar información detallada sobre él. Podrás obtener datos 
                        como el nombre, email, nombre del contacto de emergencia, número del 
                        contacto de emergencia y, lo más importante, la ubicación del usuario, 
                        la cual se actualizará cada 5 minutos. Esta funcionalidad te permitirá 
                        tener información crucial de manera rápida y precisa.</p>
                </div>
                <div className="form">
                    <div className="image-container">
                        <img src={myImage} className="medium-image" alt="My Image" />
                    </div>
                    <label htmlFor="phone" className="cel-label"># Número de celular del usuario</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Ingresa el número de celular" 
                        className="cel-input" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button className="submit-button" onClick={handleSubmit}>Consultar</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
        </>
    )
}

export default CardEmail