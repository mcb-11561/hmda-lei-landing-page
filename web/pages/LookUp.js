import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import LookupForm from '../components/LookupForm'

class LookUp extends React.Component {
    render () {
      const {config} = this.props
      return (
    <Layout config={config}>
      <div style={{width: '90%', maxWidth: '40rem', margin: '0 auto'}}>
        <LookupForm />
      </div>
    </Layout>
  )
}

LookUp.propTypes = {
  config: PropTypes.object
}

export default LookUp
