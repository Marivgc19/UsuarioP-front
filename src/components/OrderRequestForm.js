import React, { useState } from 'react';
import './OrderRequestForm.css';
import { Player } from '@lottiefiles/react-lottie-player';

// Importa tus archivos Lottie
import airPlaneLottie from '../assets/lottie/FTQoLAnxbj.json';
import cargoShipLottie from '../assets/lottie/wired-flat-1337-cargo-ship-hover-pinch.json';
import woodenBoxLottie from '../assets/lottie/wired-flat-1356-wooden-box-hover-pinch.json';
import cameraLottie from '../assets/lottie/wired-flat-61-camera-hover-flash.json';
import folderLottie from '../assets/lottie/wired-flat-120-folder-hover-adding-files.json';
import linkLottie from '../assets/lottie/wired-flat-11-link-unlink-hover-bounce.json';

function OrderRequestForm({ onSubmitForm }) {
    const [requestType, setRequestType] = useState('link');
    const [productUrl, setProductUrl] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [technicalSpecs, setTechnicalSpecs] = useState('');
    const [deliveryType, setDeliveryType] = useState('');
    const [deliveryVenezuela, setDeliveryVenezuela] = useState('');

    // Estado para controlar qué opción de envío está en hover
    const [hoveredDeliveryOption, setHoveredDeliveryOption] = useState(null);

    // Nuevos estados para controlar el hover de los iconos individuales
    const [isFolderHovered, setIsFolderHovered] = useState(false);
    const [isCameraHovered, setIsCameraHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // --- Validaciones personalizadas para campos "requeridos" ---

        // Validación para tipo de solicitud (Link o Foto + Descripción)
        if (!requestType) {
            alert('Por favor, selecciona cómo deseas solicitar tu producto (Link o Foto + Descripción).');
            return;
        }

        // Validación condicional según el tipo de solicitud
        if (requestType === 'link' && !productUrl) {
            alert('Por favor, ingresa la URL del producto.');
            return;
        }

        if (requestType === 'photo') {
            if (!productImage) {
                alert('Por favor, sube una imagen del producto.');
                return;
            }
            if (!productDescription) {
                alert('Por favor, ingresa una descripción del producto.');
                return;
            }
        }
        
        // Validación para cantidad
        if (quantity < 1) {
            alert('La cantidad debe ser al menos 1.');
            return;
        }

        // Validación para Tipo de Envío
        if (!deliveryType) {
            alert('Por favor, selecciona un tipo de envío.');
            return;
        }

        // Validación para Entrega en Venezuela
        if (!deliveryVenezuela) {
            alert('Por favor, selecciona una opción de entrega en Venezuela.');
            return;
        }

        // Si todas las validaciones pasan, procede con el envío
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
        onSubmitForm();
    };

    // Función para determinar si una animación debe estar activa (en hover o seleccionada)
    const isActiveAnimation = (optionName) => {
        return hoveredDeliveryOption === optionName || deliveryType === optionName;
    };

    return (
        <div className="order-request-card">
            <h2 className="card-title">Solicitud de Pedido</h2>
            <p className="card-subtitle">Cuéntanos qué producto deseas importar</p>

            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-section">
                    <h3>¿Cómo deseas solicitar tu producto?</h3>
                    <div className="radio-group">
                        <label
                            className={`radio-option ${requestType === 'link' ? 'selected' : ''}`}
                            onMouseEnter={() => setIsLinkHovered(true)}
                            onMouseLeave={() => setIsLinkHovered(false)}
                        >
                            <input
                                type="radio"
                                name="requestType"
                                value="link"
                                checked={requestType === 'link'}
                                onChange={() => setRequestType('link')}
                                // Los radio buttons no necesitan 'required' aquí si se valida en handleSubmit
                            />
                            <div className="option-content">
                                <Player
                                    key={isLinkHovered ? 'link-active' : 'link-inactive'}
                                    autoplay={isLinkHovered}
                                    loop={false}
                                    src={linkLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
                                <div className="text-content">
                                    <span className="option-title">Link del Producto</span>
                                    <span className="option-description">Pega el enlace de cualquier tienda online</span>
                                </div>
                            </div>
                        </label>
                        <label
                            className={`radio-option ${requestType === 'photo' ? 'selected' : ''}`}
                            onMouseEnter={() => setIsCameraHovered(true)}
                            onMouseLeave={() => setIsCameraHovered(false)}
                        >
                            <input
                                type="radio"
                                name="requestType"
                                value="photo"
                                checked={requestType === 'photo'}
                                onChange={() => setRequestType('photo')}
                                // Los radio buttons no necesitan 'required' aquí si se valida en handleSubmit
                            />
                            <div className="option-content">
                                <Player
                                    key={isCameraHovered ? 'camera-active' : 'camera-inactive'}
                                    autoplay={isCameraHovered}
                                    loop={false}
                                    src={cameraLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
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
                                required // Campo requerido
                            />
                        </div>
                    )}

                    {requestType === 'photo' && (
                        <div className="photo-description-section" style={{ marginTop: '20px' }}>
                            <div
                                className="image-upload-area"
                                onMouseEnter={() => setIsFolderHovered(true)}
                                onMouseLeave={() => setIsFolderHovered(false)}
                            >
                                <Player
                                    key={isFolderHovered ? 'folder-active' : 'folder-inactive'}
                                    autoplay={isFolderHovered}
                                    loop={false}
                                    src={folderLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
                                <button type="button" className="select-image-button" onClick={() => document.getElementById('productImageInput').click()}>
                                    Seleccionar Imagen
                                </button>
                                <input
                                    type="file"
                                    id="productImageInput"
                                    accept="image/jpeg, image/png"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    // El atributo 'required' en input type="file" puede ser problemático con botones personalizados,
                                    // se maneja la validación en handleSubmit
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
                                    required // Campo requerido
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
                            required // Campo requerido
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
                            rows="5"
                            required // Campo requerido
                        ></textarea>
                    </div>

                    <h3>Tipo de Envío</h3>
                    <div className="checkbox-group">
                        <label
                            className={`checkbox-option ${deliveryType === 'doorToWarehouse' ? 'selected' : ''}`}
                            onMouseEnter={() => setHoveredDeliveryOption('doorToWarehouse')}
                            onMouseLeave={() => setHoveredDeliveryOption(null)}
                        >
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="doorToWarehouse"
                                checked={deliveryType === 'doorToWarehouse'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'doorToWarehouse' : '')}
                                // La validación se maneja en handleSubmit
                            />
                            <div className="option-content">
                                <Player
                                    key={isActiveAnimation('doorToWarehouse') ? 'box-active' : 'box-inactive'}
                                    autoplay={isActiveAnimation('doorToWarehouse')}
                                    loop={true}
                                    src={woodenBoxLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
                                <span className="option-title">Puerta a Puerta (a nuestro almacén)</span>
                            </div>
                        </label>
                        <label
                            className={`checkbox-option ${deliveryType === 'air' ? 'selected' : ''}`}
                            onMouseEnter={() => setHoveredDeliveryOption('air')}
                            onMouseLeave={() => setHoveredDeliveryOption(null)}
                        >
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="air"
                                checked={deliveryType === 'air'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'air' : '')}
                                // La validación se maneja en handleSubmit
                            />
                            <div className="option-content">
                                <Player
                                    key={isActiveAnimation('air') ? 'airplane-active' : 'airplane-inactive'}
                                    autoplay={isActiveAnimation('air')}
                                    loop={true}
                                    src={airPlaneLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
                                <span className="option-title">Envío Aéreo</span>
                            </div>
                        </label>
                        <label
                            className={`checkbox-option ${deliveryType === 'maritime' ? 'selected' : ''}`}
                            onMouseEnter={() => setHoveredDeliveryOption('maritime')}
                            onMouseLeave={() => setHoveredDeliveryOption(null)}
                        >
                            <input
                                type="checkbox"
                                name="deliveryType"
                                value="maritime"
                                checked={deliveryType === 'maritime'}
                                onChange={(e) => setDeliveryType(e.target.checked ? 'maritime' : '')}
                                // La validación se maneja en handleSubmit
                            />
                            <div className="option-content">
                                <Player
                                    key={isActiveAnimation('maritime') ? 'ship-active' : 'ship-inactive'}
                                    autoplay={isActiveAnimation('maritime')}
                                    loop={true}
                                    src={cargoShipLottie}
                                    className="delivery-lottie-icon"
                                    style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                />
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
                            required // Campo requerido
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