import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tabs from '../components/Tabs';
import Modal from './Modal';
import { fetchData } from '../service/communicationService';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            templates: [],
            selectedTemplates: [],
            selectedProducts: [],
            modalOpen: false,
            serverError: null
        };
    }

    static propTypes = {
        Component: PropTypes.any,
        type: PropTypes.string
    }

    loadData = (type) => {

        fetchData(type, data => {
            const newData = data.map(item => {
                return { ...item, selected: false, type };
            });

            this.setState({ data: newData });

            if (type === 'templates') {
                this.setState({ templates: newData });
            }
        }, error => {
            this.setState({ serverError: error })
        });
    }

    componentDidMount() {
        const { type } = this.props;

        this.loadData(type);
    }

    componentDidUpdate(prevProps) {
        const { type } = this.props;

        if (type !== prevProps.type) {
            this.loadData(type);
            this.setState({ selectedProducts: [] });
        }
    }

    selectCard = (cardId) => {
        const { templates, data } = this.state;
        const { type } = this.props;

        let selectedItems;
        let selectedTemplates = [];
        let selectedProducts = [];

        if (type === 'templates') {
            selectedItems = templates.map(template => {
                if (cardId === template._id) {
                    return { ...template, selected: true };
                }
                return template;
            });

            selectedTemplates = selectedItems.filter(template => template.selected);

        } else if (type === 'products') {
            selectedItems = data.map(product => {
                if (cardId === product._id) {
                    return { ...product, selected: true };
                }
                return product;
            });

            selectedProducts = selectedItems.filter(product => product.selected);
        }

        this.setState({
            data: selectedItems,
            selectedTemplates,
            selectedProducts,
        });
    }

    isCardSelected = () => {
        const { data } = this.state;
        const { type } = this.props;

        let cardSelected;

        if (type === 'templates') {
            cardSelected = data.some(template => template.selected);
        } else if (type === 'products') {
            cardSelected = data.some(product => product.selected);
        }

        return cardSelected;
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        const { data } = this.state;
        const newData = data.map(item => ({ ...item, selected: false }));

        this.setState({
            modalOpen: false,
            data: newData,
            selectedProducts: []
        });
    }

    render() {

        const { Component, type } = this.props;
        const { data, modalOpen, selectedProducts, selectedTemplates } = this.state;
        const selectedProductsLength = selectedProducts.length;

        return (
            <section className={`AppContainer ${modalOpen ? "AppContainer--fixed" : ""}`}>
                <h1 className="AppContainer__title">Manage Subscription</h1>
                <Tabs selectedProductsLength={selectedProductsLength} />
                <main className="AppContiner__main">
                    <Component
                        data={data}
                        selectCard={this.selectCard}
                    />
                    <Modal
                        className={`Modal ${modalOpen ? 'Modal--open' : ''}`}
                        closeModal={this.closeModal}
                        type={type}
                        selectedTemplates={selectedTemplates}
                        selectedProducts={selectedProducts}
                    />
                </main>
                {data.length > 0
                    && (
                        <div className="AppContainer__btn-wrapper">
                            <button
                                className={`AppContainer__btn ${!this.isCardSelected() ? "AppContainer__btn--disabled" : ""}`}
                                onClick={this.openModal}
                            >
                                Next
                            <i className="fas fa-arrow-right"></i>
                            </button>
                            or
                            <Link
                                to={type === 'templates' ? '/products' : '/'}
                            >
                                Back
                            </Link>
                        </div>
                    )}
            </section>
        );
    }
}