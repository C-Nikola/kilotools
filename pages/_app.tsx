import React from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import ConfigProvider from "@/components/ConfigProvider";
import ThemeProvider from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "@/store/store";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfigProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default appWithTranslation(App);
