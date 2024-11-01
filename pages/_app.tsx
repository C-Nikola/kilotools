import React from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import ConfigProvider from "@/components/ConfigProvider";
import ThemeProvider from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "@/store/store";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface Locale {
  locale: string;
}

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("toolList");

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfigProvider>
          <Layout t={t}>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default appWithTranslation(App);

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
