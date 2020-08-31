import React from 'react';
import {useQuery} from '@apollo/client';

import Loader from './loader';
import {qPizzaTypes} from '../graphql/queries';

import '../css/cart.css';

export function Order(props) {
    let {cart, pizzaTypes, id, deleteItem} = props;

    let pizzaType = pizzaTypes.find(p => p.id === id);
    if (!pizzaType) return null;

    let count = cart.filter(p => p === id).length;

    return (<div className={"cartOrder"}>
        <h3>{pizzaType.name}</h3>
        <h4>Amount: {count}</h4>
        <button onClick={() => deleteItem(id)}
                className={"cartOrderButton"}>delete position
        </button>
    </div>)
}

export default function (props) {
    const {loading, error, data} = useQuery(qPizzaTypes);

    if (error) return <p>Error occured while processing data</p>;
    if (loading) return <Loader/>;

    let {pizzaTypes} = data;
    let {appState, setAppState} = props,
        {cart} = appState;

    const deleteItem = id => setAppState({cart: appState.cart.filter(item => item !== id)});

    if (!cart.length) return <p>Nothing in cart right now</p>;

    return (

        <div className={"cartBlock"}>
            {Array.from(new Set(cart)).map(id =>
                <Order id={id} cart={cart} pizzaTypes={pizzaTypes}
                       deleteItem={deleteItem}/>)}

            <button onClick={() => setAppState({currentPage: "postOrder"})}
                className={"cartButton"}>Proceed with order</button>
        </div>
    );
}