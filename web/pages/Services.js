import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import JotformEmbed from 'react-jotform-embed';

class Services extends React.Component {
    render () {
      const {config} = this.props
      return (
        <Layout config={config}> <div>
      </div> </Layout>
      )
    }
  }
  
  Services.propTypes = {
    config: PropTypes.object
  }
  
  export default Services