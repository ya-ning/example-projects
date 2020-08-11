import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';

const INGREDIENTS_PRICES = {
    // capitalize all the words for global 
    meat: 1.5,
    cheese: 0.7,
    salad: 0.9,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 2.5,
        // base price (only the bread)
        makeOrder: false,
        canPurchase: false
    };

    updateOrderState (ingredients) {
        const sum = Object.keys(ingredients).map(ingreKey => {
            return ingredients[ingreKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        //Object.key() turns objects into arrays
        this.setState({makeOrder: sum > 0});
        //{makeOrder: sum > 0} either TRUE or FALSE
    };

    addIngredientHandler = (type) => {
        //INGREDIENTS AMOUNT
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newCount;

        //PRICE
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        //UPDATE THE STATE OF INGREDIENTS AND PRICE
        this.setState({ingredients: updatedIngredient, totalPrice: newPrice});
        this.updateOrderState(updatedIngredient);
    };

    removeIngredientHandler = (type) => {
        //INGREDIENTS AMOUNT
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newCount;
        
        //PRICE
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        //UPDATE THE STATE OF INGREDIENTS AND PRICE
        this.setState({ingredients: updatedIngredient, totalPrice: newPrice});
        this.updateOrderState(updatedIngredient);
    };

    purchaseHandler = () => {
        this.setState({canPurchase: true});
        //console.log(this);
        //BurgerBuilder {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
    };

    purchaseCancelHandler = () => {
        this.setState({canPurchase: false});
    };

    continueHandler = () => {
        alert('Continue the order');
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        return(
            <Auxiliary>
                <Modal
                    show={this.state.canPurchase}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredient={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler} 
                        purchaseContinue={this.continueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButton={disabledInfo}
                    canOrder={this.state.makeOrder}
                    canPurchase={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Auxiliary>
        );
    }
};

export default BurgerBuilder;