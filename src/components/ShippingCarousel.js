import React, { useState, useRef } from 'react';
import './ShippingCarousel.css';
import { Player } from '@lottiefiles/react-lottie-player';
import airPlaneLottie from '../assets/lottie/FTQoLAnxbj.json';
import cargoShipLottie from '../assets/lottie/wired-flat-1337-cargo-ship-hover-pinch.json';
import woodenBoxLottie from '../assets/lottie/wired-flat-1356-wooden-box-hover-pinch.json';

const ShippingCarousel = ({ selectedValue, onSelect }) => {
    const [hoveredOption, setHoveredOption] = useState(null);
    const carouselRef = useRef(null);

    const options = [
        {
            value: 'doorToWarehouse',
            label: 'Puerta a Puerta (a nuestro almacén)',
            lottie: woodenBoxLottie,
            description: 'Recogemos en tu dirección y lo llevamos a nuestro almacén.'
        },
        {
            value: 'air',
            label: 'Envío Aéreo',
            lottie: airPlaneLottie,
            description: 'Envío rápido por vía aérea, ideal para paquetes pequeños.'
        },
        {
            value: 'maritime',
            label: 'Envío Marítimo',
            lottie: cargoShipLottie,
            description: 'Envío económico por vía marítima, ideal para grandes volúmenes.'
        },
    ];

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 300; // Ajusta este valor según el ancho de las tarjetas
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="shipping-carousel-container">
            <h3 className="carousel-title">Tipo de Envío</h3>
            <div className="carousel-wrapper">
                <button
                    type="button"
                    className="carousel-arrow left-arrow"
                    onClick={() => scrollCarousel('left')}
                >
                    &lt;
                </button>
                <div className="shipping-carousel" ref={carouselRef}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`shipping-card ${selectedValue === option.value ? 'selected' : ''}`}
                            onClick={() => onSelect(option.value)}
                            onMouseEnter={() => setHoveredOption(option.value)}
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            <Player
                                key={hoveredOption === option.value || selectedValue === option.value ? 'active' : 'inactive'}
                                autoplay={hoveredOption === option.value || selectedValue === option.value}
                                loop={true}
                                src={option.lottie}
                                className="shipping-lottie-icon"
                            />
                            <h4 className="shipping-card-title">{option.label}</h4>
                            <p className="shipping-card-description">{option.description}</p>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="carousel-arrow right-arrow"
                    onClick={() => scrollCarousel('right')}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ShippingCarousel;