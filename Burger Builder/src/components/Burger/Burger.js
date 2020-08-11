import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingreKey => {
        //console.log(props.ingredients);
        //{meat: 1, cheese: 2, salad: 2, bacon: 1}
        //console.log(props.ingredients[ingreKey]);
        //1, 2, 2, 1
        return [...Array(props.ingredients[ingreKey])].map((_, index) => {
            //console.log(ingreKey);
            //meat, cheese, cheese, salad, salad, bacon
            //console.log(index);
            //0, 0, 1, 0, 1, 0

            //ingreKey + index
            //meat 0, cheese 0, cheese 1, salad 0, salad 1, bacon 0
            return <BurgerIngredient
                key={ingreKey + index}
                type={ingreKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
        //[1, 2].concat([3, 4, 5])
        //[1, 2, 3, 4, 5]
    }, []);
    //Object.keys() turns objects into arrays, so that we can map through the array
    //reduce (previous value, current value)

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;