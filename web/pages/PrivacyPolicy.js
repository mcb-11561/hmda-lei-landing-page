import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

class PrivacyPolicy extends React.Component {
    render () {
      const {config} = this.props
      return (
        <Layout config={config}> <div>
    
      </div> </Layout>
      )
    }
  }
  
  PrivacyPolicy.propTypes = {
    config: PropTypes.object
  }
  
  export default PrivacyPolicy