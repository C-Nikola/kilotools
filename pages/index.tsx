import styles from "@/styles/Home.module.scss";
import { Card, Col, Divider, Row, Space, Typography } from "antd";
import Link from "next/link";
import { ToolCard, tools } from "@/utils/toolsList";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import useLocalStorageListener from "@/hooks/useLocalStorageListener";
import { LOCAL_STORAGE_KEY } from "@/utils/const";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const { Title } = Typography;

function Home() {
  const { t } = useTranslation("toolList");
  const { value: localFavoriteTools } = useLocalStorageListener<string[]>(
    LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
    "array"
  );

  const [favoriteTools, setFavoriteTools] = useState<ToolCard[]>([]);

  useEffect(() => {
    if (!localFavoriteTools) {
      return;
    }
    setFavoriteTools(
      tools.filter(({ key }) => {
        return localFavoriteTools.includes(key);
      })
    );
  }, [localFavoriteTools]);

  return (
    <>
      <NextSeo title="Kilotools" description="A short description goes here." />
      <Link
        href="https://www.producthunt.com/posts/kilotools?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-kilotools"
        target="_blank"
        className="inline-block"
      >
        <Image
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594414&theme=light"
          alt="Kilotools - One&#0045;Stop&#0032;Shop&#0032;for&#0032;Developer&#0032;Tools | Product Hunt"
          width="250"
          height="54"
          unoptimized
        />
      </Link>
      <Divider />
      {favoriteTools.length > 0 && <Title level={2}>Favorite tools</Title>}
      <Row gutter={[16, 16]}>
        {favoriteTools.map((card) => (
          <Col xs={24} md={12} lg={8} xl={6} key={card.title}>
            <Link href={card.link}>
              <Card className="h-full border-2">
                <Space direction="vertical">
                  {card.icon}
                  <h3 className="text-lg font-bold mb-2">{t(card.title)}</h3>
                  <p className={styles.cardDesc}>{t(card.description)}</p>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {favoriteTools.length > 0 && <Divider />}
      <Row gutter={[16, 16]}>
        {tools.map((card) => (
          <Col xs={24} md={12} lg={8} xl={6} key={card.title}>
            <Link href={card.link}>
              <Card className="h-full border-2">
                <Space direction="vertical">
                  {card.icon}
                  <h3 className="text-lg font-bold mb-2">{t(card.title)}</h3>
                  <p className={styles.cardDesc}>{t(card.description)}</p>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Home;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
