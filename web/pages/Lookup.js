import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import LookupForm from '../components/LookupForm'

function Lookup({config}) {
  return (
    <Layout config={config}>
      <div style={{width: '90%', maxWidth: '40rem', margin: '0 auto'}}>
        <LookupForm />
      </div>
    </Layout>
  )
}

Lookup.propTypes = {
  config: PropTypes.object
}

export default Lookup
