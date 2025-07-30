import React, { useState } from 'react';
import './MakePayment.css';

function MakePayment({ orderId, totalAmount, onPaymentConfirmed }) { // Added onPaymentConfirmed prop
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [paymentProof, setPaymentProof] = useState(null);

    const paymentMethods = {
        bolivares: {
            title: 'Pago en Bolívares (Bs)',
            icon: '💰',
            options: {
                pagoMovil: {
                    label: 'Pago Móvil (Validación automática)',
                    instructions: 'Realiza el pago móvil a: 0414-1234567 (Banco Venezuela) - El sistema validará automáticamente tu pago.'
                },
                transferenciaBancaria: {
                    label: 'Transferencia Bancaria (Validación automática)',
                    instructions: 'Realiza una transferencia a: Banco Mercantil C.A., Cta. Corriente 0105-0000-00-1234567890, RIF J-00000000-0, Titular: ImportaFácil C.A. - El sistema validará automáticamente tu pago.'
                }
            }
        },
        dolares: {
            title: 'Pago en Dólares ($)',
            icon: '💵',
            options: {
                binanceUSDT: {
                    label: 'Binance USDT (Validación manual)',
                    instructions: 'Transfiere a nuestra billetera Binance USDT (TRC20): TXYABCDEF12345. Asegúrate de enviar el monto exacto. La validación es manual y puede tardar unas horas.'
                },
                zelle: {
                    label: 'Zelle (Validación manual)',
                    instructions: 'Envía a nuestro correo Zelle: correo@ejemplo.com. Asegúrate de incluir el número de orden en la descripción. La validación es manual y puede tardar unas horas.'
                },
                payPal: {
                    label: 'PayPal (Validación manual)',
                    instructions: 'Envía a nuestra cuenta PayPal: paypal@ejemplo.com. Por favor, cubre las comisiones de PayPal. La validación es manual y puede tardar unas horas.'
                }
            }
        }
    };

    const getInstructions = () => {
        if (!selectedPaymentMethod) {
            return "Selecciona un método de pago para ver las instrucciones";
        }

        for (const typeKey in paymentMethods) {
            if (paymentMethods[typeKey].options[selectedPaymentMethod]) {
                return paymentMethods[typeKey].options[selectedPaymentMethod].instructions;
            }
        }
        return "Instrucciones no disponibles para el método seleccionado.";
    };

    const handlePaymentProofChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }
        if (!referenceNumber || !paymentProof) {
            alert('Por favor, ingresa el número de referencia y sube el comprobante de pago.');
            return;
        }

        // Simulate API call or processing
        console.log({
            orderId,
            totalAmount,
            selectedPaymentMethod,
            referenceNumber,
            paymentProof: paymentProof ? paymentProof.name : null
        });

        // Call the parent handler to show notification and change step
        onPaymentConfirmed(); // Trigger the success notification and step change
        // Optionally, reset form fields here if needed
        setReferenceNumber('');
        setPaymentProof(null);
        document.getElementById('paymentProofInput').value = ''; // Clear file input
    };

    return (
        <div className="make-payment-card">
            <div className="payment-header-icon">
                <span className="payment-icon">💳</span>
            </div>
            <h2 className="payment-title">Realizar el Pago</h2>
            <p className="payment-subtitle">
                Completa el pago de tu orden #{orderId} por un total de <span className="payment-amount">{totalAmount}</span>
            </p>

            <div className="payment-notice">
                <span className="clock-icon">⏰</span>
                Plazo máximo para pagar: 24 horas. Después de este tiempo, la orden será cancelada automáticamente.
            </div>

            <div className="payment-content-grid">
                <div className="left-column">
                    <div className="amount-to-pay-box">
                        <span className="amount-label">Monto a Pagar</span>
                        <span className="total-amount-display">{totalAmount}</span>
                        <span className="total-order-label">Total del pedido</span>
                    </div>

                    <h3>Métodos de Pago</h3>
                    <div className="payment-methods-group">
                        {/* Pago en Bolívares */}
                        <div className="payment-method-category bolivares-section">
                            <span className="category-header-icon">{paymentMethods.bolivares.icon}</span>
                            <span className="category-header-title">{paymentMethods.bolivares.title}</span>
                            <div className="radio-options-container">
                                {Object.entries(paymentMethods.bolivares.options).map(([key, option]) => (
                                    <label key={key} className={`radio-option ${selectedPaymentMethod === key ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={key}
                                            checked={selectedPaymentMethod === key}
                                            onChange={() => setSelectedPaymentMethod(key)}
                                        />
                                        <div className="option-content">
                                            <span className="method-icon">
                                                {key === 'pagoMovil' ? '📱' : '🏛️'}
                                            </span>
                                            <span className="option-label">{option.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Pago en Dólares */}
                        <div className="payment-method-category dolares-section">
                            <span className="category-header-icon">{paymentMethods.dolares.icon}</span>
                            <span className="category-header-title">{paymentMethods.dolares.title}</span>
                            <div className="radio-options-container">
                                {Object.entries(paymentMethods.dolares.options).map(([key, option]) => (
                                    <label key={key} className={`radio-option ${selectedPaymentMethod === key ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={key}
                                            checked={selectedPaymentMethod === key}
                                            onChange={() => setSelectedPaymentMethod(key)}
                                        />
                                        <div className="option-content">
                                            <span className="method-icon">
                                                {key === 'binanceUSDT' && '₿'}
                                                {key === 'zelle' && '💸'}
                                                {key === 'payPal' && '🅿️'}
                                            </span>
                                            <span className="option-label">{option.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-column">
                    <h3>Instrucciones de Pago</h3>
                    <div className="payment-instructions-box">
                        <p className="instructions-text">{getInstructions()}</p>
                    </div>

                    <h3>Comprobante de Pago</h3>
                    <p className="proof-instructions">Una vez realizado el pago, carga el comprobante aquí.</p>

                    <form onSubmit={handleSubmitPayment} className="payment-proof-form">
                        <div className="form-group">
                            <label htmlFor="referenceNumber">Número de Referencia/Transacción:</label>
                            <input
                                type="text"
                                id="referenceNumber"
                                value={referenceNumber}
                                onChange={(e) => setReferenceNumber(e.target.value)}
                                placeholder="Ej: 123456789"
                                className="text-input"
                                required
                            />
                        </div>

                        <div className="file-upload-area">
                            <span className="upload-icon">⬆️</span>
                            <button type="button" className="select-file-button" onClick={() => document.getElementById('paymentProofInput').click()}>
                                Subir Comprobante
                            </button>
                            <input
                                type="file"
                                id="paymentProofInput"
                                accept="image/jpeg, image/png, application/pdf"
                                onChange={handlePaymentProofChange}
                                style={{ display: 'none' }}
                                required
                            />
                            {paymentProof && <span className="file-name">{paymentProof.name}</span>}
                            <span className="file-info">JPG, PNG, PDF. Max 10MB</span>
                        </div>

                        <button type="submit" className="submit-payment-button">
                            Confirmar Pago
                            <span className="check-icon">✅</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MakePayment;