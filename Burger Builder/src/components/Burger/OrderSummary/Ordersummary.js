import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary.js] componentDidUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredient).map(ingreKey => {
            return (
                <li key={ingreKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingreKey}
                    </span>: {this.props.ingredient[ingreKey]}
                </li>
            );
        });

        return(
            <Auxiliary>
                <h3>You Order Summary:</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: €{this.props.price.toFixed(2)}</strong></p>
                <p>Contiune to checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancel}>
                        CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinue}>
                        CONTIUNE
                </Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;