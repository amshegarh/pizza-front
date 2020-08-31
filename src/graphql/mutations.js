import {gql} from '@apollo/client';

export const qSendOrder = gql`mutation($order: OrderInput) {
    sendOrder (order: $order)
}`;