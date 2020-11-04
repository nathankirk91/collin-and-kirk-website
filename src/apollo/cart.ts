import { gql } from "@apollo/client"

export const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession($email: String, $cart: [ItemInput]) {
    createCheckoutSession(cart: $cart, email: $email) {
      checkoutSessionId
    }
  }
`
