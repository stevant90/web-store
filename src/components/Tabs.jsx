import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Tabs = ({ selectedProductsLength }) => {

    const renderTabs = () => {
        const tabNames = ['Templates', 'Products'];
        let productTitle = `${selectedProductsLength > 0 ? `(${selectedProductsLength})` : ""}`;

        return tabNames.map(tabName => {
            return (
                <NavLink
                    exact
                    key={tabName}
                    to={tabName === 'Products' ? '/products' : '/'}
                    className="Tabs__item"
                >
                    {tabName === 'Products' ? `${tabName} ${productTitle}` : tabName}
                </NavLink>
            );
        });
    }
    return (
        <nav className="Tabs">
            {renderTabs()}
        </nav>
    );
};

Tabs.propTypes = {
    selectedProductsLength: PropTypes.number.isRequired
}; 

export default Tabs;