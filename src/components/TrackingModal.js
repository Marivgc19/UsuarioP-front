import React, { useState } from 'react';
import './TrackingModal.css';

function TrackingModal({ onClose }) {
    const [orderNumber, setOrderNumber] = useState('');
    const [orders, setOrders] = useState([
        {
            id: 'ORD-2024-001234',
            product: 'iPhone 15 Pro Max',
            price: '1,319.00',
            status: 'En Tránsito',
            progress: 60, // Percentage for the progress bar
            statusColor: '#FFB300' // Orange for 'En Tránsito'
        },
        {
            id: 'ORD-2024-001233',
            product: 'MacBook Air M2',
            price: '1,199.00',
            status: 'Entregado',
            progress: 100, // 100% for delivered
            statusColor: '#66BB6A' // Green for 'Entregado'
        },
        // Add more dummy data as needed
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real app, you'd filter orders based on orderNumber
        // For this example, we'll just log it.
        console.log('Searching for order:', orderNumber);
        // You would typically make an API call here and update the 'orders' state
        // with the search results.
    };

    return (
        <div className="modal-overlay">
            <div className="tracking-modal-content">
                <div className="tracking-header">
                    <span className="tracking-icon-header">📦</span> Tracking de Pedidos
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Ingresa tu número de orden..."
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            Buscar
                        </button>
                    </form>
                </div>

                <div className="order-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card" style={{ '--status-color': order.statusColor }}>
                            <div className="order-card-header">
                                <span className="order-id">{order.id}</span>
                                <span className="order-status" style={{ backgroundColor: order.statusColor }}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="order-details">{order.product} - ${order.price}</p>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${order.progress}%`, backgroundColor: order.statusColor }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TrackingModal;