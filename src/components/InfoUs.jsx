import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { db } from "../firebase/config";
import animatedGif2 from '/src/assets/gifLogo3.gif';
import { EyeSlashIcon, FaceFrownIcon } from '@heroicons/react/24/solid';

const InfoUs = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { phoneWithCountryCode } = location.state || {};
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    
    useEffect(() => {
        if (phoneWithCountryCode) {
            //console.log("Phone number received:", phoneWithCountryCode);
            // Aquí puedes agregar la lógica para consultar la información del usuario

            const getUserData = async () => {
                const userDoc = doc(db, "users", phoneWithCountryCode);
                const userSnap = await getDoc(userDoc);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                    setError("");
                } else {
                    setError("No se encontró un usuario con ese número de celular.");
                }
            };

            getUserData();
        }
    }, [phoneWithCountryCode]);

    useEffect(() => {
        if (userData) {
            const geocodeLatLng = async () => {
                const geocoder = new window.google.maps.Geocoder();
                const latlng = {
                    lat: parseFloat(userData.latitud),
                    lng: parseFloat(userData.longitud),
                };

                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            setAddress(results[0].formatted_address);
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            };

            geocodeLatLng();
        }
    }, [userData]);

    const handleExit = () => {
        navigate("/");
    };

    const userPosition = userData ? { lat: parseFloat(userData.latitud), lng: parseFloat(userData.longitud) } : null;

    return (
        <>
            <div className="card-gen-infoUs">
                <h1>Información del Usuario</h1>
                {error ? (
                    <>
                        <FaceFrownIcon style={{ width: "50px" }}/>
                        <p style={{ color: "red", marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}>{error}</p>
                        <div style={{ marginBottom: "3rem" }} className="button-container">
                            <button className="exit-button" onClick={handleExit}>Salir</button>
                        </div>
                    </>
                ) : (
                    <div className="card-infoUs">
                        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        {userData ? (
                            userData.PodevWeb ? (
                            
                                    <div style={{ height: "60vh", width: "100%", borderRadius: "15px", overflow: "hidden" }}>
                                        <Map
                                            defaultZoom={15}
                                            defaultCenter={userPosition}
                                            mapId={import.meta.env.VITE_MAP_ID}
                                        >
                                            <AdvancedMarker
                                                position={userPosition}
                                                onClick={() => setOpen(true)}
                                            />
                                            {open && (
                                                <InfoWindow
                                                    position={userPosition}
                                                    onCloseClick={() => setOpen(false)}
                                                >
                                                    <div className="InfoWindow">
                                                        <div className="gif-container">
                                                            <img src={animatedGif2} className="animated-gif-infoUs" alt="Animated GIF" />
                                                        </div>
                                                        <p><strong>Usuario:</strong> {userData.nombre} {userData.apellido}</p>
                                                        <p><strong>Dirección:</strong> {address}</p>
                                                    </div>
                                                </InfoWindow>
                                            )}
                                        </Map>
                                    </div>
                                
                            ) : (
                                <>
                                    <div>
                                        <EyeSlashIcon style={{ width: "50px"}}/>
                                        <p style={{ color: "red", paddingLeft: "1rem", paddingRight: "1rem"}}>
                                            El usuario no tiene activa la función para visualizar su ubicación.
                                        </p>
                                    </div>
                                </>
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                        </APIProvider>
                        <div className="infoUs">
                            {userData && (
                                <div>
                                    <h2 style={{ textAlign: "center" }}>
                                        <strong>{userData.nombre} {userData.apellido}</strong>
                                    </h2>
                                    <p><strong>Celular:</strong> {phoneWithCountryCode}</p>
                                    <p style={{ paddingBottom: "2rem" }}><strong>Email:</strong> {userData.email}</p>
                                    <hr />
                                    <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>
                                        <strong>Contacto de emergencia</strong>
                                    </h2>
                                    <p><strong>Nombre:</strong> {userData.nombreContacto}</p>
                                    <p><strong>Número:</strong> {userData.numeroContacto}</p>
                                </div>
                            )}
                            <div className="button-container">
                                <button className="exit-button" onClick={handleExit}>Salir</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default InfoUs