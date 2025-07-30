import React from 'react';
import './Stepper.css';

function Stepper({ currentStep }) {
    const steps = [
        { id: 1, name: 'Solicitud de Pedido' },
        { id: 2, name: 'Recepción de Cotización' },
        { id: 3, name: 'Orden Confirmada' },
        { id: 4, name: 'Pago' },
        { id: 5, name: 'Seguimiento' }, // New step name
    ];

    return (
        <div className="stepper-container-bar">
            {steps.map((step) => (
                <React.Fragment key={step.id}>
                    <div className={`step-bar ${currentStep >= step.id ? 'active' : ''}`}>
                        <div className="step-number-bar">{step.id}</div>
                    </div>
                    {step.id < steps.length && (
                        <div className={`step-line-bar ${currentStep > step.id ? 'active' : ''}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Stepper;