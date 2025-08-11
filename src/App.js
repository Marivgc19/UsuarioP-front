import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import OrderRequestForm from './components/OrderRequestForm';
import ChatSupportModal from './components/ChatSupportModal';
import TrackingModal from './components/TrackingModal';
import QuotationReceived from './components/QuotationReceived';
import ModificationRequestModal from './components/ModificationRequestModal';
import OrderConfirmed from './components/OrderConfirmed';
import MakePayment from './components/MakePayment';
import OrderTracking from './components/OrderTracking';
import PaymentSuccessNotification from './components/PaymentSuccessNotification';
import SatisfactionSurveyModal from './components/SatisfactionSurveyModal'; // New import

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showChatModal, setShowChatModal] = useState(false);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [showModificationModal, setShowModificationModal] = useState(false);
    const [showPaymentSuccessNotification, setShowPaymentSuccessNotification] = useState(false);
    const [showSurveyModal, setShowSurveyModal] = useState(false); // New state for survey modal
    const [orderData, setOrderData] = useState(null); // New state for order data
    const [ordersList, setOrdersList] = useState([ // Estado global para lista de órdenes
        {
            id: 'ORD-2024-001234',
            product: 'iPhone 15 Pro Max',
            price: '1,319.00',
            status: 'En Tránsito',
            progress: 60,
            statusColor: '#FFB300',
            submittedAt: '2024-01-15T10:30:00.000Z'
        },
        {
            id: 'ORD-2024-001233',
            product: 'MacBook Air M2',
            price: '1,199.00',
            status: 'Entregado',
            progress: 100,
            statusColor: '#66BB6A',
            submittedAt: '2024-01-10T14:20:00.000Z'
        }
    ]);

    // Dummy data for quotation
    const quotationDetails = {
        product: 'iPhone 15 Pro Max',
        quantity: '1 unidad',
        productPrice: '$1,199.00',
        internationalShipping: '$45.00',
        courierVenezuela: '$15.00',
        serviceCommission: '$60.00',
        total: '$1,319.00'
    };

    const handleOpenChat = () => setShowChatModal(true);
    const handleCloseChat = () => setShowChatModal(false);

    const handleOpenTracking = () => setShowTrackingModal(true);
    const handleCloseTracking = () => setShowTrackingModal(false);

    const handleOpenModification = () => setShowModificationModal(true);
    const handleCloseModification = () => setShowModificationModal(false);

    const handleOpenSurvey = () => setShowSurveyModal(true); // New handler
    const handleCloseSurvey = () => setShowSurveyModal(false); // New handler

    // Función para generar ID único de orden
    const generateOrderId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ORD-2024-${timestamp.toString().slice(-6)}${randomNum}`;
    };

    // Función para agregar nueva orden a la lista
    const addNewOrder = (formData) => {
        const orderId = generateOrderId();
        const productSummary = formData.cartItems.length === 1 
            ? `${formData.cartItems.length} producto` 
            : `${formData.cartItems.length} productos`;
        
        const newOrder = {
            id: orderId,
            product: productSummary,
            price: 'Pendiente', // Precio pendiente hasta recibir cotización
            status: 'Solicitud Enviada',
            progress: 25,
            statusColor: '#4CAF50', // Verde para solicitud enviada
            submittedAt: formData.submittedAt,
            cartItems: formData.cartItems,
            deliveryType: formData.deliveryType,
            deliveryVenezuela: formData.deliveryVenezuela
        };

        setOrdersList(prevOrders => [newOrder, ...prevOrders]); // Agregar al inicio de la lista
        return orderId;
    };

    // --- Step Transition Handlers ---
    const handleFormSubmit = (formData) => {
        const newOrderId = addNewOrder(formData);
        setOrderData({...formData, orderId: newOrderId});
        setCurrentStep(5); // Saltar directo al tracking después de enviar la solicitud
    };

    const handleRejectProposal = () => {
        if (window.confirm('¿Estás seguro de que quieres rechazar la propuesta? Se regresará al inicio.')) {
            setCurrentStep(1);
        }
    };

    const handleAcceptQuotation = () => {
        setCurrentStep(3);
    };

    const handleProceedToPayment = () => {
        setCurrentStep(4);
    };

    const handlePaymentConfirmed = () => {
        setShowPaymentSuccessNotification(true);
        setTimeout(() => {
            setShowPaymentSuccessNotification(false);
            setCurrentStep(5);
        }, 2000);
    };

    const getStepContentTitle = (step) => {
        switch (step) {
            case 1: return "Solicitud de Pedido";
            case 2: return "Recepción de Cotización";
            case 3: return "Orden Confirmada";
            case 4: return "Realizar Pago";
            case 5: return "Seguimiento del Pedido";
            default: return "Paso Desconocido";
        }
    };

    return (
        <div className="App">
            <Header
                onOpenChat={handleOpenChat}
                onOpenTracking={handleOpenTracking}
            />
            <div className="main-content">
                

                {currentStep === 1 && (
                    <OrderRequestForm onSubmitForm={handleFormSubmit} />
                )}

                {currentStep === 2 && (
                    <QuotationReceived
                        quotation={quotationDetails}
                        onSolicitarModificacion={handleOpenModification}
                        onAceptarCotizacion={handleAcceptQuotation}
                        onRechazarPropuesta={handleRejectProposal}
                    />
                )}

                {currentStep === 3 && (
                    <OrderConfirmed
                        orderId="ORD-2024-001234"
                        productName={quotationDetails.product}
                        totalPrice={quotationDetails.total}
                        onProceedToPayment={handleProceedToPayment}
                    />
                )}

                {currentStep === 4 && (
                    <MakePayment
                        orderId="ORD-2024-001234"
                        totalAmount={quotationDetails.total}
                        onPaymentConfirmed={handlePaymentConfirmed}
                    />
                )}

                {currentStep === 5 && (
                    <OrderTracking
                        orderId={orderData?.orderId || "ORD-2024-001234"}
                        orderData={orderData}
                        onOpenSurvey={handleOpenSurvey} // Pass the new handler
                    />
                )}

            </div>

            {showChatModal && <ChatSupportModal onClose={handleCloseChat} />}
            {showTrackingModal && <TrackingModal onClose={handleCloseTracking} ordersList={ordersList} />}
            {showModificationModal && <ModificationRequestModal onClose={handleCloseModification} />}
            {showPaymentSuccessNotification && <PaymentSuccessNotification />}

            {/* Satisfaction Survey Modal */}
            {showSurveyModal && <SatisfactionSurveyModal onClose={handleCloseSurvey} />}
        </div>
    );
}

export default App;