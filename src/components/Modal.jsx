import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const Modal = ({ type, className, closeModal, selectedTemplates, selectedProducts }) => {

    const renderInformations = () => {
        let data = type === 'templates' ? selectedTemplates : selectedProducts;

        return data.map(item => {
            return <Card key={item._id} item={item} />
        });
    }
    
    return (
        <div className={className}>
            <div className="Modal__title-btn-wrapper">
                <h2
                    className="Modal__title">
                    {type === 'templates' ? 'Template you chose' : (selectedProducts.length > 1 ? 'Products you chose' : 'Product you chose')}
                </h2>
                <button
                    className="Modal__btn"
                    onClick={closeModal}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="Modal__content">
                {renderInformations()}
            </div>
        </div>
    );
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectedTemplates: PropTypes.array.isRequired,
    selectedProducts: PropTypes.array.isRequired
};

export default Modal;