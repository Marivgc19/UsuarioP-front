import React, { useState } from 'react';
import './OrderRequestForm.css';
// import { ReactComponent as FolderIcon } from '../assets/folder-icon.svg'; // If you have an SVG

function OrderRequestForm({ onSubmitForm }) { // Receive onSubmitForm prop
    const [requestType, setRequestType] = useState('link');
    const [productUrl, setProductUrl] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [technicalSpecs, setTechnicalSpecs] = useState('');
    const [deliveryType, setDeliveryType] = useState('');
    const [deliveryVenezuela, setDeliveryVenezuela] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you'd typically send data to a backend
        console.log({
            requestType,
            productUrl: requestType === 'link' ? productUrl : null,
            productImage: requestType === 'photo' ? productImage : null,
            productDescription: requestType === 'photo' ? productDescription : null,
            quantity,
            technicalSpecs,
            deliveryType,
            deliveryVenezuela
        });
        alert('Solicitud enviada (ver consola para datos). Pasando al siguiente paso...');
        onSubmitForm(); // Call the function passed from App.js to change the step
    };

    return (
        <div className="order-request-card">
            <h2 className="card-title">Solicitud de Pedido</h2>
            <p className="card-subtitle">Cuéntanos qué producto deseas importar</p>

            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-section">
                    <h3>¿Cómo deseas solicitar tu producto?</h3>
                    <div className="radio-group">
                        <label className={`radio-option ${requestType === 'link' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="requestType"
                                value="link"
                                checked={requestType === 'link'}
                                onChange={() => setRequestType('link')}
                            />
                            <div className="option-content">
                                <span className="icon">🔗</span>
                                <div className="text-content">
                                    <span className="option-title">Link del Producto</span>
                                    <span className="option-description">Pega el enlace de cualquier tienda online</span>
                                </div>
                            </div>
                        </label>
                        <label className={`radio-option ${requestType === 'photo' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="requestType"
                                value="photo"
                                checked={requestType === 'photo'}
                                onChange={() => setRequestType('photo')}
                            />
                            <div className="option-content">
                                <span className="icon">📸</span>
                                <div className="text-content">
                                    <span className="option-title">Foto + Descripción</span>
                                    <span className="option-description">Sube una imagen con descripción detallada</span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {requestType === 'link' && (
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label htmlFor="productUrl">URL del Producto</label>
                            <input
                                type="url"
                                id="productUrl"
                                value={productUrl}
                                onChange={(e) => setProductUrl(e.target.value)}
                                placeholder="https://ejemplo.com/producto"
                                className="text-input"
                                required
                            />
                        </div>
                    )}

                    {requestType === 'photo' && (
                        <div className="photo-description-section" style={{ marginTop: '20px' }}>
                            <div className="image-upload-area">
                                <span className="folder-icon">📂</span>
                                <button type="button" className="select-image-button" onClick={() => document.getElementById('productImageInput').click()}>
                                    Seleccionar Imagen
                                </button>
                                <input
                                    type="file"
                                    id="productImageInput"
                                    accept="image/jpeg, image/png"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                {productImage && <span className="file-name">{productImage.name}</span>}
                                <span className="file-info">JPG, PNG, máximo 5MB</span>
                            </div>
                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <label htmlFor="productDescription">Descripción del Producto</label>
                                <textarea
                                    id="productDescription"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder="Describe el producto detalladamente..."
                                    className="textarea-input"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-section">
                    <h3>Detalles del Pedido</h3>
                    <div className="form-group">
                        <label htmlFor="quantity">Cantidad</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="text-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="technicalSpecs">Especificaciones Técnicas</label>
                        <textarea
                            id="technicalSpecs"
                            value={technicalSpecs}
                            onChange={(e) => setTechnicalSpecs(e.target.value)}
                            placeholder="Color, talla, modelo, características específicas, etc."
                            className="textarea-input"
                        ></textarea>
                    </div>

                    <h3>Tipo de Envío</h3>
                    <div className="checkbox-group">
                        <label className={`checkbox-option ${deliveryType === 'doorToWarehouse' ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="doorToWarehouse"
                                checked={deliveryType === 'doorToWarehouse'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'doorToWarehouse' : '')}
                            />
                            <div className="option-content">
                                <span className="icon">📦</span>
                                <span className="option-title">Puerta a Puerta (a nuestro almacén)</span>
                            </div>
                        </label>
                        <label className={`checkbox-option ${deliveryType === 'air' ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="air"
                                checked={deliveryType === 'air'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'air' : '')}
                            />
                            <div className="option-content">
                                <span className="icon">✈️</span>
                                <span className="option-title">Envío Aéreo</span>
                            </div>
                        </label>
                        <label className={`checkbox-option ${deliveryType === 'maritime' ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="maritime"
                                checked={deliveryType === 'maritime'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'maritime' : '')}
                            />
                            <div className="option-content">
                                <span className="icon">🚢</span>
                                <span className="option-title">Envío Marítimo</span>
                            </div>
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="deliveryVenezuela">Entrega en Venezuela</label>
                        <select
                            id="deliveryVenezuela"
                            value={deliveryVenezuela}
                            onChange={(e) => setDeliveryVenezuela(e.target.value)}
                            className="select-input"
                        >
                            <option value="">Seleccionar opción</option>
                            <option value="courier">🚚 Envío por Courier</option>
                            <option value="pickup">🏢 Retiro en Oficinas</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Enviar Solicitud ✨
                </button>
            </form>
        </div>
    );
}

export default OrderRequestForm;