import {gql} from '@apollo/client';

export const qPizzaTypes = gql`query {
    pizzaTypes {
        id
        name
        description
        pictureURL
        priceUSD
        priceEUR
    }
    deliveryCost
}`;