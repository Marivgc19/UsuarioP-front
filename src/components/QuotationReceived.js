import React from 'react';
import './QuotationReceived.css';
// You might need an SVG for the money bag icon and the clock icon

function QuotationReceived({ quotation, onSolicitarModificacion, onAceptarCotizacion, onRechazarPropuesta }) {
    return (
        <div className="quotation-received-card">
            <div className="quotation-header-icon">
                {/* Assuming a money bag icon */}
                <span className="money-bag-icon">💰</span> {/* Placeholder */}
            </div>
            <h2 className="quotation-title">Cotización Recibida</h2>
            <p className="quotation-subtitle">Revisa los detalles de tu cotización</p>

            <div className="response-time-notice">
                <span className="clock-icon">⏰</span> {/* Placeholder */}
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
                        <button className="btn-modify" onClick={onSolicitarModificacion}>
                            <span className="btn-icon">✏️</span> Solicitar Modificación
                        </button>
                        <button className="btn-accept" onClick={onAceptarCotizacion}>
                            <span className="btn-icon">✔️</span> Aceptar Cotización
                        </button>
                        <button className="btn-reject" onClick={onRechazarPropuesta}>
                            <span className="btn-icon">✖️</span> Rechazar Propuesta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuotationReceived;