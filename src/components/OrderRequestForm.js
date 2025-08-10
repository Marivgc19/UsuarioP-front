import React, { useState } from 'react';
import '../../src/styles/OrderRequestForm.css';
import { Player } from '@lottiefiles/react-lottie-player';
import ShippingCarousel from './ShippingCarousel';
import DeliveryCarousel from './DeliveryCarousel';

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

    const [cartItems, setCartItems] = useState([]); // Lista de productos en el carrito

    const [deliveryType, setDeliveryType] = useState('');
    const [deliveryVenezuela, setDeliveryVenezuela] = useState('');

    const [hoveredDeliveryOption, setHoveredDeliveryOption] = useState(null);
    const [isFolderHovered, setIsFolderHovered] = useState(false);
    const [isCameraHovered, setIsCameraHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleAddToCart = () => {
        // Validaciones
        if (!requestType) {
            alert('Por favor, selecciona cómo deseas solicitar tu producto (Link o Foto + Descripción).');
            return;
        }

        // 2. Validar la URL si se seleccionó la opción de Link
        if (requestType === 'link' && !productUrl) {
            alert('Por favor, ingresa la URL del producto.');
            return;
        }

        // 3. Validar imagen y descripción si se seleccionó la opción de Foto
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
        
        // 4. Validar la cantidad
        if (quantity < 1) {
            alert('La cantidad debe ser al menos 1.');
            return;
        }

        // Crea el objeto del producto
        const newProduct = {
            requestType,
            productUrl: requestType === 'link' ? productUrl : null,
            productImage: requestType === 'photo' ? productImage : null,
            productDescription: requestType === 'photo' ? productDescription : null,
            quantity,
            technicalSpecs
        };

        // Agrega el producto al carrito
        setCartItems([...cartItems, newProduct]);

        // Limpia el formulario para el siguiente producto
        setRequestType('link');
        setProductUrl('');
        setProductImage(null);
        setProductDescription('');
        setQuantity(1);
        setTechnicalSpecs('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Por favor, agrega al menos un producto a tu caja.');
            return;
        }

        if (!deliveryType) {
            alert('Por favor, selecciona un tipo de envío.');
            return;
        }

        // 6. Validar la opción de entrega en Venezuela
        if (!deliveryVenezuela) {
            alert('Por favor, selecciona una opción de entrega en Venezuela.');
            return;
        }

        console.log('Carrito:', cartItems);
        console.log('Tipo de envío:', deliveryType);
        console.log('Entrega en Venezuela:', deliveryVenezuela);
        alert('Solicitud enviada (ver consola para datos). Pasando al siguiente paso...');
        onSubmitForm();
    };

    const handleRemoveFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

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
                                required
                            />
                        </div>
                    )}

                    <div
                        className={`photo-description-section ${requestType === 'photo' ? 'visible' : ''}`}
                        style={{ marginTop: '20px' }}
                    >
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
                                className="delivery-lottie-icon-archivo"
                                style={{ height: '100px', width: '100px', marginRight: '10px' }}
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
                                required
                            ></textarea>
                        </div>
                    </div>
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
                            required
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
                            required
                        ></textarea>
                    </div>
                </div>

                <button type="button" className="add-to-cart-button" onClick={handleAddToCart}>
                    Agregar a la Caja
                </button>

                {/* Lista del carrito */}
                {cartItems.length > 0 && (
                    <div className="cart-section">
                        <h3>Tu Caja</h3>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    Producto {index + 1} - Cantidad: {item.quantity}
                                    <button type="button" onClick={() => handleRemoveFromCart(index)}>
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Opciones de envío y entrega en Venezuela */}
                <div className="shipping-options">
                    <h3>Opciones de Envío</h3>
                    <ShippingCarousel
                        selectedValue={deliveryType}
                        onSelect={setDeliveryType}
                    />

                    <DeliveryCarousel
                        selectedValue={deliveryVenezuela}
                        onSelect={setDeliveryVenezuela}
                    />
                    <button type="submit" className="submit-button">
                        Enviar Solicitud ✨
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrderRequestForm;