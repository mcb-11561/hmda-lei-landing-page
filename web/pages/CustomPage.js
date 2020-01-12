import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import JotformEmbed from 'react-jotform-embed'

class CustomPage extends React.Component {
  render () {
    const {config} = this.props
    return (
      <Layout config={config}>
        {' '}
        <div>
          <JotformEmbed src='https://form.jotform.com/93215160810144' />
        </div>{' '}
      </Layout>
    )
  }
}

CustomPage.propTypes = {
  config: PropTypes.object
}

export default CustomPage
