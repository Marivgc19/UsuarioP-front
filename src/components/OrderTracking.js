import React from 'react';
import './OrderTracking.css';

function OrderTracking({ orderId, onOpenSurvey }) { // Added onOpenSurvey prop
    // Dummy data for tracking steps, replace with actual data from backend
    const trackingSteps = [
        {
            id: 'payment_confirmed',
            label: 'Pago Confirmado',
            date: '15/01/2024',
            icon: '✔️',
            color: 'green'
        },
        {
            id: 'product_purchased',
            label: 'Producto Comprado',
            date: '16/01/2024',
            icon: '📦',
            color: 'blue'
        },
        {
            id: 'in_transit',
            label: 'En Tránsito',
            date: 'Estimado: 25/01/2024',
            icon: '✈️',
            color: 'orange'
        },
        // Add more steps here
    ];

    const currentProgress = 60;
    const currentStatusText = "Tu producto está en camino a nuestro almacén en Venezuela";

    return (
        <div className="order-tracking-card">
            <div className="tracking-header-icon">
                <span className="tracking-icon">📦</span>
            </div>
            <h2 className="tracking-title">Seguimiento del Pedido</h2>
            <p className="tracking-subtitle">Monitorea el progreso de tu pedido en tiempo real</p>

            <div className="tracking-steps-grid">
                {trackingSteps.map(step => (
                    <div key={step.id} className={`tracking-step-box ${step.color}`}>
                        <div className="step-icon-circle">
                            <span className="step-icon">{step.icon}</span>
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
                <button className="action-button survey" onClick={onOpenSurvey}> {/* Added onClick handler */}
                    <span className="button-icon">📝</span> Encuesta
                </button>
            </div>
        </div>
    );
}

export default OrderTracking;