import React from 'react';
import {useQuery, useMutation} from '@apollo/client';

import Loader from './loader';
import {qPizzaTypes} from '../graphql/queries';
import {qSendOrder} from '../graphql/mutations';

import '../css/order.css';

export default function (props) {
    const {loading, error, data} = useQuery(qPizzaTypes);

    if (error) return <p>Error occured while processing data</p>;
    if (loading) return <Loader/>;

    let {pizzaTypes} = data;
    let {appState, setAppState} = props,
        {cart} = appState;

    if (!cart.length) return <p>Nothing in cart right now</p>;

    const currencySign = appState.preferredCurrency === "USD" ? '$' : '€';

    let totalPrice = (cart.reduce((total, id) => {
        let pizzaType = pizzaTypes.find(p => p.id === id);
        if (!pizzaType) return null;

        let currency = appState.preferredCurrency === "USD"
            ? pizzaType.priceUSD
            : pizzaType.priceEUR;

        return total + currency;
    }, 0) + data.deliveryCost).toFixed(2) + currencySign;

    const [sendOrderFunc, { mutationData }] = useMutation(qSendOrder);

    let {orderAddress, orderName} = appState;

    const sendOrder = async () => {
        if (!appState.orderAddress || !appState.orderName || !appState.cart || !appState.cart.length) {
            alert("Must type in all fields to file an order");
            return;
        }

        try {
            await sendOrderFunc({ variables: {
                order: {
                    pizzazIds: cart,
                    address: orderAddress,
                    name: orderName
                }
            } });
            alert("Thanks for placing an order!")
        } catch (e) {
            alert("Failed to place order. Please do an attempt later.");
            console.log(e);
        }

    };

    return (
        <div className={"postOrder"}>
            <table className={"postOrderTable"}>
                <tbody>
                {Array.from(new Set(cart)).map(id => {
                    let pizzaType = pizzaTypes.find(p => p.id === id);
                    if (!pizzaType) return null;

                    let amount = cart.filter(cid => cid === id).length;
                    let currency = appState.preferredCurrency === "USD"
                        ? pizzaType.priceUSD
                        : pizzaType.priceEUR;
                    let price = currency * amount;

                    return (<tr>
                        <td>{pizzaType.name}</td>
                        <td>{currency + currencySign}</td>
                        <td><b>x{amount}</b></td>

                        <td>{price + currencySign}</td>
                    </tr>)
                })}
                <tr>
                    <td>Delivery cost:</td>
                    <td/>
                    <td/>
                    <td>{data.deliveryCost + currencySign}</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td/>
                    <td/>
                    <td>{totalPrice}</td>
                </tr>
                </tbody>
            </table>


            <label>Your name
                <input type={"text"} value={appState.orderName} placeholder={"John Smith"}
                       onChange={e => setAppState({orderName: e.target.value})}/>
            </label>

            <label>Your address
                <input type={"text"} value={appState.orderAddress} placeholder={"Wales, Square st., 124"}
                       onChange={e => setAppState({orderAddress: e.target.value})}/>
            </label>

            <button className={"cartButton"} onClick={sendOrder}>Send order</button>
        </div>
    );
}