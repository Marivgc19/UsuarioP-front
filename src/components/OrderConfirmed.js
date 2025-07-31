import React, { useState } from 'react'; // Importa useState
import './OrderConfirmed.css';
import { Player } from '@lottiefiles/react-lottie-player'; // Importa el Player

// Importa tus archivos Lottie
import confettiLottie from '../assets/lottie/wired-flat-1103-confetti-hover-pinch.json';
import shareArrowLottie from '../assets/lottie/wired-flat-751-share-hover-slide.json'; // Usaremos este para la flecha

function OrderConfirmed({ orderId, productName, totalPrice, onProceedToPayment }) {
    // Estados para controlar el hover de cada icono
    const [isConfettiHovered, setIsConfettiHovered] = useState(false);
    const [isArrowHovered, setIsArrowHovered] = useState(false);

    return (
        <div className="order-confirmed-card">
            <div
                className="celebration-icon-container"
                onMouseEnter={() => setIsConfettiHovered(true)} // Activar hover
                onMouseLeave={() => setIsConfettiHovered(false)} // Desactivar hover
            >
                {/* Reemplaza 🎉 con la animación Lottie de confeti */}
                <Player
                    key={isConfettiHovered ? 'confetti-active' : 'confetti-inactive'} // Cambia la key para reiniciar la animación
                    autoplay={isConfettiHovered} // Solo reproduce en hover
                    loop={true} // Se repite mientras esté en hover (pinch sugiere loop)
                    src={confettiLottie}
                    className="lottie-icon" // Puedes añadir una clase CSS si lo necesitas
                    style={{ height: '80px', width: '80px' }} // Ajusta el tamaño según necesites
                />
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

            <button
                className="proceed-to-payment-button"
                onClick={onProceedToPayment}
                onMouseEnter={() => setIsArrowHovered(true)} // Activar hover
                onMouseLeave={() => setIsArrowHovered(false)} // Desactivar hover
            >
                Proceder al Pago
                <span className="arrow-icon">
                    {/* Reemplaza ➡️ con la animación Lottie de la flecha */}
                    <Player
                        key={isArrowHovered ? 'arrow-active' : 'arrow-inactive'}
                        autoplay={isArrowHovered} // Solo reproduce en hover
                        loop={false} // Se reproduce una vez (slide sugiere no loop)
                        src={shareArrowLottie} // Usando el Lottie de "share" para la flecha
                        className="lottie-icon" // Clase para estilizar Lottie
                        style={{ height: '24px', width: '24px', marginLeft: '10px' }} // Ajusta el tamaño y el margen
                    />
                </span>
            </button>
        </div>
    );
}

export default OrderConfirmed;