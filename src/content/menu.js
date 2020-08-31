import React, {useState} from 'react';
import {useQuery} from '@apollo/client';

import Loader from './loader';
import Navbar from "../navbar";
import '../css/menu.css';
import {qPizzaTypes} from '../graphql/queries';

export default function (props) {
    const {loading, error, data} = useQuery(qPizzaTypes);

    if (error) return <p>Error occured while processing data</p>;
    if (loading) return <Loader/>;

    let {appState, setAppState} = props;

    let {preferredCurrency} = appState;

    const addPizzaToCart = (id, amount = 1) =>
            setAppState({cart: appState.cart.concat(Array(amount).fill(id))}),
        setPreferredCurrency = currency => setAppState({preferredCurrency: currency.target.value});

    const amount = id => appState.menuAmounts[id] == null ? 1 : appState.menuAmounts[id],
        changeAmount = (id, val) => setAppState({
            menuAmounts: Object.assign(appState.menuAmounts, {[id]: val})
        });

    return (
        <div>
            <p className={"pizzasCurrencySelect"}><b>Currency</b>
                <select
                    value={preferredCurrency} onChange={setPreferredCurrency}>
                    <option value={"USD"}>USD</option>
                    <option value={"EUR"}>EUR</option>
                </select>
            </p>

            <div className={"pizzasBlock"}>
                {data.pizzaTypes.map(pizzaType => {
                        const price = appState.preferredCurrency === "USD"
                            ? `${pizzaType.priceUSD}$`
                            : `${pizzaType.priceEUR}€`;

                        return (
                            <div key={pizzaType.id}>
                                <img src={pizzaType.pictureURL} alt={pizzaType.name}/>
                                <h2>{pizzaType.name}</h2>
                                <p>{pizzaType.description}</p>
                                <p><b>Price: {price}</b></p>
                                <input type={"number"} className={"pizzaAmountInput"}
                                       min={1}
                                       value={amount(pizzaType.id)}
                                       onChange={e => changeAmount(pizzaType.id, parseInt(e.target.value, 10))}/>
                                <button className={'button'}
                                        onClick={() => addPizzaToCart(pizzaType.id, amount(pizzaType.id))}>Add to
                                    cart
                                </button>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    );
}