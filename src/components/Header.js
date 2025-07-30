import React from 'react';
import './Header.css';
import { ReactComponent as RocketIcon } from '../assets/rocket.svg'; // Assuming you have an SVG icon

function Header({ onOpenChat, onOpenTracking }) { // Receive props
    return (
        <header className="header">
            <div className="logo-container">
                <RocketIcon className="rocket-icon" />
                <span className="logo-text">ImportaFácil</span>
                <span className="logo-subtitle">Tu importadora de confianza</span>
            </div>
            <nav className="nav-buttons">
                <button className="nav-button chat-button" onClick={onOpenChat}>
                    <span className="dot"></span> Chat Soporte
                </button>
                <button className="nav-button tracking-button" onClick={onOpenTracking}>
                    <span className="tracking-icon">🚚</span> Tracking
                </button>
            </nav>
        </header>
    );
}

export default Header;