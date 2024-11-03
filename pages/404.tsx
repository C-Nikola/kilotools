import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Custom404() {
  const { t } = useTranslation("toolList");
  return <h1 style={{ margin: "0 auto" }}>404 - Page Not Found</h1>;
}

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
