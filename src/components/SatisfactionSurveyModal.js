import React, { useState } from 'react';
import './SatisfactionSurveyModal.css';

function SatisfactionSurveyModal({ onClose }) {
    const [rating, setRating] = useState(0); // For star rating
    const [recommendation, setRecommendation] = useState(''); // 'yes', 'maybe', 'no'
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send the survey data to your backend
        console.log({
            rating,
            recommendation,
            comments
        });
        alert('¡Gracias por tu opinión! Encuesta enviada exitosamente.');
        onClose(); // Close the modal after submission
    };

    return (
        <div className="survey-modal-overlay">
            <div className="survey-modal-content">
                <div className="survey-modal-header">
                    <span className="survey-header-icon">📝</span> {/* Pencil icon from image */}
                    <h2 className="survey-title">Encuesta de Satisfacción</h2>
                    <button className="survey-close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="survey-form">
                    <div className="form-group">
                        <label>¿Cómo calificarías nuestro servicio?</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= rating ? 'selected' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>¿Recomendarías nuestro servicio?</label>
                        <div className="recommendation-options">
                            <label className={`radio-option ${recommendation === 'yes' ? 'selected green' : ''}`}>
                                <input
                                    type="radio"
                                    name="recommend"
                                    value="yes"
                                    checked={recommendation === 'yes'}
                                    onChange={() => setRecommendation('yes')}
                                />
                                <span className="option-content">
                                    <span className="option-icon">✔️</span>
                                    Definitivamente sí
                                </span>
                            </label>
                            <label className={`radio-option ${recommendation === 'maybe' ? 'selected yellow' : ''}`}>
                                <input
                                    type="radio"
                                    name="recommend"
                                    value="maybe"
                                    checked={recommendation === 'maybe'}
                                    onChange={() => setRecommendation('maybe')}
                                />
                                <span className="option-content">
                                    <span className="option-icon">🙂</span>
                                    Probablemente sí
                                </span>
                            </label>
                            <label className={`radio-option ${recommendation === 'no' ? 'selected red' : ''}`}>
                                <input
                                    type="radio"
                                    name="recommend"
                                    value="no"
                                    checked={recommendation === 'no'}
                                    onChange={() => setRecommendation('no')}
                                />
                                <span className="option-content">
                                    <span className="option-icon">❌</span>
                                    No lo recomendaría
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">Comentarios adicionales</label>
                        <textarea
                            id="comments"
                            rows="4"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Cuéntanos tu experiencia..."
                            className="comments-textarea"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-survey-button">
                        Enviar Encuesta ✨
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SatisfactionSurveyModal;