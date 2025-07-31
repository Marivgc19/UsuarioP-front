import React, { useState } from 'react';
import './Header.css';
import { Player } from '@lottiefiles/react-lottie-player';
import truckAnimation from '../assets/lottie/wired-lineal-497-truck-delivery-loop-cycle.json';


function Header({ onOpenChat, onOpenTracking }) {
    const [isTruckHovered, setIsTruckHovered] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <span className="logo-text">ImportaFácil</span>
                <span className="logo-subtitle">Tu importadora de confianza</span>
            </div>
            <nav className="nav-buttons">
                <button className="nav-button chat-button" onClick={onOpenChat}>
                    <span className="dot"></span> Chat Soporte
                </button>
                <button
                    className="nav-button tracking-button"
                    onClick={onOpenTracking}
                    onMouseEnter={() => {
                        console.log("Mouse entered tracking button"); // Para depuración
                        setIsTruckHovered(true);
                    }}
                    onMouseLeave={() => {
                        console.log("Mouse left tracking button"); // Para depuración
                        setIsTruckHovered(false);
                    }}
                >
                    <Player
                        key={isTruckHovered ? 'truck-anim-active' : 'truck-anim-inactive'} // Cambia la key para forzar reinicio al cambiar el estado
                        autoplay={isTruckHovered} // Se reproduce solo si está en hover
                        loop={true}                 // Se repite mientras esté en hover
                        src={truckAnimation}
                        style={{ height: '30px', width: '30px', marginRight: '10px' }}
                    />
                    Tracking
                </button>
            </nav>
        </header>
    );
}

export default Header;