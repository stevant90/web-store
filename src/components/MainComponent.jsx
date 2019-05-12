import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const MainComponent = ({ data, selectCard }) => {

    const select = (cardId) => {
        selectCard(cardId);
    }

    return data.map(item => {
        return (
            <Card
                key={item._id}
                item={item}
                selectCard={select}
            />
        );
    });
}

MainComponent.propTypes = {
    data: PropTypes.array.isRequired,
    selectCard: PropTypes.func.isRequired,
};

export default MainComponent;
