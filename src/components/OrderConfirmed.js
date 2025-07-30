import React from 'react';
import './OrderConfirmed.css';

function OrderConfirmed({ orderId, productName, totalPrice, onProceedToPayment }) { // Added onProceedToPayment
    return (
        <div className="order-confirmed-card">
            <div className="celebration-icon-container">
                <span className="celebration-icon">🎉</span> {/* Placeholder */}
            </div>
            <h2 className="confirmation-title">¡Orden Aceptada!</h2>
            <p className="confirmation-subtitle">Tu pedido ha sido confirmado y procesado</p>

            <div className="order-id-box">
                <span className="order-id-label">Número de Orden de Compra</span>
                <span className="confirmed-order-id">{orderId}</span>
            </div>

            <div className="confirmation-details-grid">
                <div className="summary-section">
                    <h3>Resumen del Pedido</h3>
                    <div className="detail-row">
                        <span>Producto:</span>
                        <span>{productName}</span>
                    </div>
                    <div className="detail-row">
                        <span>Total a pagar:</span>
                        <span className="total-amount-summary">{totalPrice}</span>
                    </div>
                    <div className="detail-row">
                        <span>Estado:</span>
                        <span className="order-status-confirmed">Confirmado</span>
                    </div>
                </div>

                <div className="next-steps-section">
                    <h3>Próximos Pasos</h3>
                    <ul className="next-steps-list">
                        <li><span className="step-bullet active"></span> Proceder al pago</li>
                        <li><span className="step-bullet"></span> Compra del producto</li>
                        <li><span className="step-bullet"></span> Envío internacional</li>
                        <li><span className="step-bullet"></span> Entrega en Venezuela</li>
                    </ul>
                </div>
            </div>

            <button className="proceed-to-payment-button" onClick={onProceedToPayment}> {/* Added onClick */}
                Proceder al Pago
                <span className="arrow-icon">➡️</span>
            </button>
        </div>
    );
}

export default OrderConfirmed;