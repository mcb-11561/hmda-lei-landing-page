/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useMemo} from 'react'
import {useAsync, useSetState} from 'react-use'
import PropTypes from 'prop-types'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js'
import Select from 'react-select'
import {useForm, Controller} from 'react-hook-form'
import useSWR from 'swr'
import fetch from 'unfetch'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const Field = React.forwardRef(({label, name, children, ...props}, ref) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>{children || <input id={name} name={name} ref={ref} {...props} />}</div>
    </div>
  )
})

function Wizard() {
  const jurisdictionList = useSWR('/.netlify/functions/jurisdictions', (url) =>
    fetch(url).then((r) => r.json())
  )

  const {
    handleSubmit,
    register,
    control,
    errors,
    getValues,
    isSubmitting,
    isSubmitted,
    isValid
  } = useForm()

  const stripe = useStripe()
  const elements = useElements()

  const [paymentMethod, setPaymentMethod] = useState()
  const [stripeError, setStripeError] = useState()

  const onSubmit = async (values) => {
    console.log(values)
    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.
    //   return
    // }

    // if (stripeError) {
    //   elements.getElement('card').focus()
    //   return
    // }

    // const payload = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    //   billing_details: {
    //     name: `${values.firstName} ${values.lastName}`,
    //     email: values.email
    //   }
    // })

    // if (payload.error) {
    //   setStripeError(payload.error)
    // } else {
    //   const {paymentMethod} = payload
    //   setPaymentMethod(paymentMethod)

    //   const result = await fetch('/.netlify/functions/request-lei', {
    //     headers,
    //     method: 'POST',
    //     body: JSON.stringify({...values, paymentMethod: paymentMethod.id})
    //   })
    //     .then((res) => res.json())
    //     .catch(console.error)

    //   return result
    // }

    const result = await fetch('/.netlify/functions/request-lei', {
      headers,
      method: 'POST',
      body: JSON.stringify({...values, legalJurisdiction: values.legalJurisdiction.value})
    })
      .then((res) => res.json())
      .catch(console.error)

    return result
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h3>Company Information</h3>

        <Field
          name="companyName"
          label="Company Name"
          ref={register({
            required: true
          })}
          autoFocus
        />

        <Field
          name="companyNumber"
          label="Company Number"
          ref={register({
            required: true
          })}
        />

        <Field label="Legal Jurisdiction">
          <Controller
            as={<Select options={jurisdictionList.data || []} />}
            rules={{required: true}}
            control={control}
            onChange={([selected]) => {
              console.log(selected)
              return selected
            }}
            name="legalJurisdiction"
          />
        </Field>

        <div>
          <label htmlFor="isLevel2">
            <div>
              <input type="checkbox" name="isLevel2DataAvailable" ref={register} />
              This company is owned by another company (at least 50%)
            </div>
          </label>
        </div>
      </section>

      <section>
        <h3>Applicant Information</h3>

        <Field
          name="firstName"
          label="First Name"
          ref={register({
            required: true
          })}
        />

        <Field
          name="lastName"
          label="Last Name"
          ref={register({
            required: true
          })}
        />

        <Field
          name="email"
          label="Email"
          type="email"
          ref={register({
            required: true
          })}
        />
      </section>

      {/* <section>
        <h3>Payment Method</h3>
        <CardElement />
      </section> */}

      <section>
        <h3>Submit Request</h3>
        <div>
          <label htmlFor="terms">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              ref={register({
                required: true
              })}
            />{' '}
            I hereby accept the Terms & Conditions and Privacy Policy and give permission to apply
            for an LEI.
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </section>
    </form>
  )
}

function RegistrationForm() {
  return (
    <Elements stripe={stripePromise}>
      <Wizard />
    </Elements>
  )
}

export default RegistrationForm
