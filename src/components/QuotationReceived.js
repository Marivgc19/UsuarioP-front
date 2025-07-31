import React, { useState } from 'react'; // Importa useState
import './QuotationReceived.css';
import { Player } from '@lottiefiles/react-lottie-player'; // Asegúrate de que el Player esté importado

// Importa tus archivos Lottie
import moneyBagLottie from '../assets/lottie/wired-flat-298-coins-hover-jump.json';
import alarmClockLottie from '../assets/lottie/wired-flat-236-alarm-clock-hover-pinch.json';
import editLottie from '../assets/lottie/wired-flat-35-edit-hover-line.json';
import approveLottie from '../assets/lottie/wired-flat-37-approve-checked-simple-hover-pinch.json';
import errorLottie from '../assets/lottie/wired-flat-1140-error-hover-oscillate.json';

function QuotationReceived({ quotation, onSolicitarModificacion, onAceptarCotizacion, onRechazarPropuesta }) {
    // Estados para controlar el hover de cada icono
    const [isMoneyBagHovered, setIsMoneyBagHovered] = useState(false);
    const [isClockHovered, setIsClockHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isApproveHovered, setIsApproveHovered] = useState(false);
    const [isErrorHovered, setIsErrorHovered] = useState(false);

    return (
        <div className="quotation-received-card">
            <div
                className="quotation-header-icon"
                onMouseEnter={() => setIsMoneyBagHovered(true)} // Activar hover
                onMouseLeave={() => setIsMoneyBagHovered(false)} // Desactivar hover
            >
                {/* Reemplaza 💰 con la animación Lottie del dinero */}
                <Player
                    key={isMoneyBagHovered ? 'money-bag-active' : 'money-bag-inactive'}
                    autoplay={isMoneyBagHovered} // Solo reproduce en hover
                    loop={false} // Se reproduce una vez
                    src={moneyBagLottie}
                    className="lottie-icon" // Clase para estilizar Lottie
                    style={{ height: '50px', width: '50px' }} // Ajusta el tamaño según necesites
                />
            </div>
            <h2 className="quotation-title">Cotización Recibida</h2>
            <p className="quotation-subtitle">Revisa los detalles de tu cotización</p>

            <div
                className="response-time-notice"
                onMouseEnter={() => setIsClockHovered(true)} // Activar hover
                onMouseLeave={() => setIsClockHovered(false)} // Desactivar hover
            >
                {/* Reemplaza ⏰ con la animación Lottie del reloj */}
                <Player
                    key={isClockHovered ? 'clock-active' : 'clock-inactive'}
                    autoplay={isClockHovered} // Solo reproduce en hover
                    loop={true} // Se repite mientras esté en hover
                    src={alarmClockLottie}
                    className="lottie-icon" // Clase para estilizar Lottie
                    style={{ height: '24px', width: '24px', marginRight: '5px' }} // Ajusta el tamaño y el margen
                />
                Plazo máximo para responder: 48 horas desde la recepción de esta cotización
            </div>

            <div className="quotation-details-grid">
                <div className="details-section">
                    <h3>Detalles de la Cotización</h3>
                    <div className="detail-row">
                        <span>Producto:</span>
                        <span>{quotation.product}</span>
                    </div>
                    <div className="detail-row">
                        <span>Cantidad:</span>
                        <span>{quotation.quantity}</span>
                    </div>
                    <div className="detail-row">
                        <span>Precio del producto:</span>
                        <span>{quotation.productPrice}</span>
                    </div>
                    <div className="detail-row">
                        <span>Envío Internacional:</span>
                        <span>{quotation.internationalShipping}</span>
                    </div>
                    <div className="detail-row">
                        <span>Courier en Venezuela:</span>
                        <span>{quotation.courierVenezuela}</span>
                    </div>
                    <div className="detail-row">
                        <span>Comisión de servicio:</span>
                        <span>{quotation.serviceCommission}</span>
                    </div>
                    <div className="total-row">
                        <span>Total:</span>
                        <span className="total-amount">{quotation.total}</span>
                    </div>
                </div>

                <div className="time-estimate-section">
                    <h3>Tiempo Estimado</h3>
                    <div className="estimate-box">
                        <span className="estimate-days">15-20 días</span>
                        <span className="estimate-label">Tiempo estimado de entrega</span>
                    </div>
                    <div className="quotation-actions">
                        <button
                            className="btn-modify"
                            onClick={onSolicitarModificacion}
                            onMouseEnter={() => setIsEditHovered(true)} // Activar hover
                            onMouseLeave={() => setIsEditHovered(false)} // Desactivar hover
                        >
                            <span className="btn-icon">
                                {/* Reemplaza ✏️ con la animación Lottie del lápiz */}
                                <Player
                                    key={isEditHovered ? 'edit-active' : 'edit-inactive'}
                                    autoplay={isEditHovered} // Solo reproduce en hover
                                    loop={false} // Se reproduce una vez
                                    src={editLottie}
                                    className="lottie-icon" // Clase para estilizar Lottie
                                    style={{ height: '20px', width: '20px', marginRight: '5px' }} // Ajusta el tamaño y el margen
                                />
                            </span>
                            Solicitar Modificación
                        </button>
                        <button
                            className="btn-accept"
                            onClick={onAceptarCotizacion}
                            onMouseEnter={() => setIsApproveHovered(true)} // Activar hover
                            onMouseLeave={() => setIsApproveHovered(false)} // Desactivar hover
                        >
                            <span className="btn-icon">
                                {/* Reemplaza ✔️ con la animación Lottie del check */}
                                <Player
                                    key={isApproveHovered ? 'approve-active' : 'approve-inactive'}
                                    autoplay={isApproveHovered} // Solo reproduce en hover
                                    loop={true} // Se repite mientras esté en hover
                                    src={approveLottie}
                                    className="lottie-icon" // Clase para estilizar Lottie
                                    style={{ height: '20px', width: '20px', marginRight: '5px' }} // Ajusta el tamaño y el margen
                                />
                            </span>
                            Aceptar Cotización
                        </button>
                        <button
                            className="btn-reject"
                            onClick={onRechazarPropuesta}
                            onMouseEnter={() => setIsErrorHovered(true)} // Activar hover
                            onMouseLeave={() => setIsErrorHovered(false)} // Desactivar hover
                        >
                            <span className="btn-icon">
                                {/* Reemplaza ✖️ con la animación Lottie de la cruz */}
                                <Player
                                    key={isErrorHovered ? 'error-active' : 'error-inactive'}
                                    autoplay={isErrorHovered} // Solo reproduce en hover
                                    loop={true} // Se repite mientras esté en hover
                                    src={errorLottie}
                                    className="lottie-icon" // Clase para estilizar Lottie
                                    style={{ height: '20px', width: '20px', marginRight: '5px' }} // Ajusta el tamaño y el margen
                                />
                            </span>
                            Rechazar Propuesta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuotationReceived;