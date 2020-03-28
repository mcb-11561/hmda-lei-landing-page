require('dotenv').config()

import qs from 'querystring'
import fetch from 'node-fetch'
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const RAPID_LEI_TOKEN = process.env.RAPID_LEI_TOKEN
const RAPID_LEI_HOST = process.env.RAPID_LEI_HOST
const RAPID_LEI_ID = process.env.RAPID_LEI_ID

export async function handler(event, context) {
  const authResult = await fetch(`${RAPID_LEI_HOST}/auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: qs.stringify({
      grant_type: 'client_credentials',
      client_id: RAPID_LEI_ID,
      client_secret: RAPID_LEI_TOKEN
    })
  }).then((r) => r.json())

  const token = authResult.access_token

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const {email, firstName, lastName, ...payload} = JSON.parse(event.body)
  const name = `${firstName} ${lastName}`

  // const customer = await stripe.customers.create({
  //   name,
  //   email,
  //   payment_method: paymentMethod,
  //   invoice_settings: {
  //     default_payment_method: paymentMethod
  //   }
  // })

  // const subscription = await stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [{plan: 'plan_FSDjyHWis0QVwl'}],
  //   expand: ['latest_invoice.payment_intent']
  // })

  const leiPayload = {
    firstName,
    lastName,
    companyName: payload.companyName,
    companyNumber: payload.companyNumber,
    legalJurisdiction: payload.legalJurisdiction,
    isLevel2DataAvailable: payload.isLevel2DataAvailable,
    multiYearSupport: 1
  }

  const order = await fetch(`${RAPID_LEI_HOST}/leis/orders/create`, {
    headers,
    method: 'POST',
    body: JSON.stringify(leiPayload)
  }).then((r) => r.json())

  console.log('Order Response', order)

  const orderStatus = await fetch(
    `${RAPID_LEI_HOST}/lei/orders/${order.orderTrackingCode}/status`,
    {
      headers,
      method: 'GET'
    }
  ).then((r) => r.json())

  console.log('Order Status', orderStatus)

  const rdConfirmation = await fetch(
    `${RAPID_LEI_HOST}/lei/orders/${order.orderTrackingCode}/confirmation/true`,
    {
      headers,
      method: 'PUT'
    }
  ).then((r) => r.json())

  console.log('RD Confirmation', rdConfirmation)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // customer,
      orderStatus
    })
  }
}
