import React, { useState } from 'react';
import './ModificationRequestModal.css';

function ModificationRequestModal({ onClose }) {
    const [modificationType, setModificationType] = useState('');
    const [modificationDetails, setModificationDetails] = useState('');
    const attemptsLeft = 2; // Hardcoded for now based on image "2 de 3"

    const handleSubmitModification = (e) => {
        e.preventDefault();
        console.log('Solicitud de Modificación enviada:', {
            modificationType,
            modificationDetails
        });
        alert('Solicitud de modificación enviada. Nos pondremos en contacto pronto.');
        onClose(); // Close the modal
    };

    return (
        <div className="modal-overlay">
            <div className="modification-modal-content">
                <div className="modification-header">
                    <span className="modification-icon">✍️</span> Solicitud de Modificación
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="modification-body">
                    <p className="attempts-left-text">
                        Intentos restantes: {attemptsLeft} de 3. Después del tercer intento, la compra será rechazada automáticamente.
                    </p>

                    <form onSubmit={handleSubmitModification} className="modification-form">
                        <div className="form-group">
                            <label htmlFor="modificationType">Tipo de Modificación</label>
                            <select
                                id="modificationType"
                                value={modificationType}
                                onChange={(e) => setModificationType(e.target.value)}
                                className="select-input"
                                required
                            >
                                <option value="">Seleccionar tipo</option>
                                <option value="cantidad">Cambio de Cantidad</option>
                                <option value="especificaciones">Cambio de Especificaciones</option>
                                <option value="envio">Cambio de Tipo de Envío</option>
                                <option value="entrega">Cambio de Entrega en Venezuela</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modificationDetails">Detalles de la Modificación</label>
                            <textarea
                                id="modificationDetails"
                                value={modificationDetails}
                                onChange={(e) => setModificationDetails(e.target.value)}
                                placeholder="Describe los cambios que deseas realizar..."
                                className="textarea-input"
                                rows="6"
                                required
                            ></textarea>
                        </div>
                        <div className="modal-buttons">
                            <button type="submit" className="btn-send-modification">
                                Enviar Modificación
                            </button>
                            <button type="button" className="btn-cancel-modification" onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModificationRequestModal;