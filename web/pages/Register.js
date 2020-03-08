import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import RegistrationForm from '../components/RegistrationForm'

function Register({config}) {
  return (
    <Layout config={config}>
      <div style={{width: '90%', maxWidth: '40rem', margin: '0 auto'}}>
        <RegistrationForm />
      </div>
    </Layout>
  )
}

Register.propTypes = {
  config: PropTypes.object
}

export default Register
