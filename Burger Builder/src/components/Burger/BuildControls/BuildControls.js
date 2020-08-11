import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>€{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                ingreLabel={ctrl.label}
                // type={ctrl.type}
                // below is more efficient
                addIngredient={() => props.addIngredient(ctrl.type)}
                removeIngredient={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabledButton[ctrl.type]} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.canOrder}
            onClick={props.canPurchase}>
                ORDER NOW
        </button>
    </div>
);

export default buildControls;