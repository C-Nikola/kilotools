// _document.tsx
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import { doExtraStyle } from '../scripts/genAntdCss';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    let fileName = '';
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    // 1.1 extract style which had been used
    fileName = doExtraStyle({
      cache,
    });
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* 1.2 inject css */}
          {fileName && <link rel="stylesheet" href={`/${fileName}`} />}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}