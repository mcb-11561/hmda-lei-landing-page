import PropTypes from 'prop-types'
import React, {Component} from 'react'
import NextSeo from 'next-seo'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import Layout from '../components/Layout'
import client from '../client'
import RenderSections from '../components/RenderSections'

const builder = imageUrlBuilder(client)

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