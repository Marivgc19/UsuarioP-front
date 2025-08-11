import React from 'react';
import '../../src/styles/OrderTracking.css';
import { Player } from '@lottiefiles/react-lottie-player';

// Importa tus archivos Lottie.
import checkmarkLottie from '../assets/lottie/wired-flat-37-approve-checked-simple-hover-wobble.json';
import purchaseLottie from '../assets/lottie/IWTFP3ADxQ.json';
import airplaneLottie from '../assets/lottie/Airplane.json';
import editDocumentIcon from '../assets/lottie/wired-flat-245-edit-document-hover-pinch.json';

function OrderTracking({ orderId, onOpenSurvey }) {
    // Dummy data for tracking steps, replace with actual data from backend
    const trackingSteps = [
        {
            id: 'payment_confirmed',
            label: 'Pago Confirmado',
            date: '15/01/2024',
            icon: checkmarkLottie,
            color: 'green'
        },
        {
            id: 'product_purchased',
            label: 'Producto Comprado',
            date: '16/01/2024',
            icon: purchaseLottie,
            color: 'blue'
        },
        {
            id: 'in_transit',
            label: 'En Tránsito',
            date: 'Estimado: 25/01/2024',
            icon: airplaneLottie,
            color: 'orange'
        },
        // Add more steps here
    ];

    const currentProgress = 60;
    const currentStatusText = "Tu producto está en camino a nuestro almacén en Venezuela";

    return (
        <div className="order-tracking-card">
            <div className="tracking-header-icon">
                <Player
                    autoplay={true}
                    loop={true}
                    src={purchaseLottie}
                    className="lottie-icon main-tracking-lottie"
                    style={{ height: '70px', width: '70px' }}
                />
            </div>
            <h2 className="tracking-title">Seguimiento del Pedido</h2>
            <p className="tracking-subtitle">Monitorea el progreso de tu pedido en tiempo real</p>

            <div className="tracking-steps-grid">
                {trackingSteps.map(step => (
                    <div key={step.id} className={`tracking-step-box ${step.color}`}>
                        <div className="step-icon-circle">
                            <Player
                                autoplay={true}
                                loop={true}
                                src={step.icon}
                                className="lottie-icon"
                                style={
                                    (step.id === 'product_purchased' || step.id === 'in_transit')
                                        ? { height: '60px', width: '60px' }
                                        : { height: '40px', width: '40px' }
                                }
                            />
                        </div>
                        <p className="step-label">{step.label}</p>
                        <p className="step-date">{step.date}</p>
                    </div>
                ))}
            </div>

            <div className="current-status-section">
                <h3>Estado Actual</h3>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${currentProgress}%` }}></div>
                    <span className="progress-percentage">{currentProgress}% Completado</span>
                </div>
                <p className="status-text">{currentStatusText}</p>
            </div>

            <div className="tracking-actions">
                <button className="action-button survey" onClick={onOpenSurvey}>
                    {/* Se reemplaza el icono de emoji por el componente Player */}
                    <Player
                        autoplay
                        loop
                        src={editDocumentIcon}
                        style={{ height: '30px', width: '30px' }}
                    >
                    </Player> 
                    Encuesta
                </button>
            </div>
        </div>
    );
}

export default OrderTracking;