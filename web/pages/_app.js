import React from 'react'
import Router from "next/router"
import withGA from "next-ga"
import Head from "next/head"
import BaseApp, {Container} from 'next/app'
import client from '../client'
// import 'normalize.css'
import '../styles/shared.module.css'
import '../styles/layout.css'

const siteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `

class App extends BaseApp {
  static async getInitialProps ({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Add site config from sanity
    return client.fetch(siteConfigQuery).then(config => {
      if (!config) {
        return {pageProps}
      }
      if (config && pageProps) {
        pageProps.config = config
      }

      return {pageProps}
    })
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <>
      <Head>
          {/* HTML Meta Tags */}
          <meta
            content="/images/favicon/android-chrome-256x256.png"
            itemProp="image"
            key="google-image"
          />
          {/* Facebook Meta Tags */}
          <meta
            content={`https://hmda-lei.com`}
            key="facebook-url"
            property="og:url"
          />
          <meta
            content="/images/favicon/android-chrome-256x256.png"
            key="facebook-image"
            property="og:image"
          />
          {/* Twitter Meta Tags */}
          <meta
            content="summary_large_image"
            key="twitter-card"
            name="twitter:card"
          />
          <meta
            content="/images/favicon/android-chrome-256x256.png"
            key="twitter-iamge"
            name="twitter:image"
          />
          {/* Favicon */}
          <link
            href="/images/favicon/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/images/favicon/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/images/favicon/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/images/favicon/site.webmanifest" rel="manifest" />
          <link
            color="#5bbad5"
            href="/images/favicon/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <link href="/images/favicon/favicon.ico" rel="shortcut icon" />
          <meta content="#00aba9" name="msapplication-TileColor" />
          <meta
            content="/images/favicon/browserconfig.xml"
            name="msapplication-config"
          />
          <meta content="#ffffff" name="theme-color" /></Head>
      <Container>
        <Component {...pageProps} />
      </Container>
      </>
    )
  }
}

export default withGA("UA-155247999-1", Router)(App)
