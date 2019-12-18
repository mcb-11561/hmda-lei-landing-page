import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Link from "next/link";

class Terms extends React.Component {
    render () {
      const {config} = this.props
      return (
        <Layout config={config}> <div>
    
      </div> </Layout>
      )
    }
  }
  
  Terms.propTypes = {
    config: PropTypes.object
  }
  
  export default Terms