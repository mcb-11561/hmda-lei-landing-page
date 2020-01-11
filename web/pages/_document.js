import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import client from '../client'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then(lang => {
      return {...initialProps, lang}
    })
  }

  render () {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
      {/* HTML Meta Tags */}
      <meta
            content="/static/android-chrome-256x256.png"
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
            content="/static/android-chrome-256x256.png"
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
            content="/static/android-chrome-256x256.png"
            key="twitter-iamge"
            name="twitter:image"
          />
          {/* Favicon */}
          <link
            href="/static/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/static/site.webmanifest" rel="manifest" />
          <link
            color="#5bbad5"
            href="/static/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <link href="/static/favicon.ico" rel="shortcut icon" />
          <meta content="#00aba9" name="msapplication-TileColor" />
          <meta
            content="/static/browserconfig.xml"
            name="msapplication-config"
          />
          <meta content="#ffffff" name="theme-color" />
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
