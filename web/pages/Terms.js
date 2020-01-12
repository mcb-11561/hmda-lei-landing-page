import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

class Terms extends React.Component {
  render () {
    const {config} = this.props
    return (
      <Layout config={config}>
        <div />
      </Layout>
    )
  }
}

Terms.propTypes = {
  config: PropTypes.object
}

export default Terms
