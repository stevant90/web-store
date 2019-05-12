import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ item, selectCard }) => {
    const { description, features, name, price, _id, selected, type } = item;

    const handleSelect = () => {
        selectCard(_id);
    }

    const templateTitle = <span>Edge Delivery <span className="Card__template-title">| {`${name.slice(1)}`}</span></span>;

    return (
        <article className="Card">
            <h3 className={`Card__title ${selected ? "Card__title--selected" : ""}`}>{type === 'templates' ? templateTitle : name}</h3>
            <div className="Card__content">
                <p className="Card__description">{description}</p>
                <ul className="Card__features">
                    {features.map(feature => {
                        return <li key={feature}>{feature}</li>;
                    })}
                </ul>
                <p className="Card__price">{price}</p>
                <div className="Card__btn-wrapper">
                    <button
                        className={`Card__btn ${selected ? "Card__btn--selected" : ""}`}
                        onClick={handleSelect}
                    >
                        {!selected ? 'Select' : 'Selected'}
                        {selected
                            && <i className="fas fa-check"></i>
                        }
                    </button>
                </div>
            </div>
        </article>
    );
}

Card.propTypes = {
    item: PropTypes.object.isRequired,
    selectCard: PropTypes.func,
};

export default Card;