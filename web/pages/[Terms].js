import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

class Terms extends React.Component {
    render () {
      const {config} = this.props
      const router = useRouter()
  const { Terms } = router.query
      return (
        <Layout config={config}> <div>
    <p>Terms: {Terms}</p>
      </div> </Layout>
      )
    }
  }
  
  Terms.propTypes = {
    config: PropTypes.object
  }
  
  
  export default Terms