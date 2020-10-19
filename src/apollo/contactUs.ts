import { gql } from "@apollo/client"
import * as yup from "yup"

export interface ContactDetails {
  firstName: string
  surname: string
  email: string
  message: string
}

export interface ContactUsRes {
  contactUs: boolean
}

export const CONTACT_US = gql`
  mutation ContactUs(
    $firstName: String!
    $surname: String!
    $email: String!
    $message: String!
  ) {
    contactUs(
      firstName: $firstName
      surname: $surname
      email: $email
      message: $message
    )
  }
`

export const ContactUsSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  surname: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  message: yup.string().min(1, "Too Short!").required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
})
