import { Button, Col, Drawer, Row } from "antd";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import SideMenu from "./SideMenu";
import { GithubOutlined, MenuOutlined } from "@ant-design/icons";
import CMDK from "./CMDK";
import ThemeToggle from "./ThemeToggle";
import { ReactNode, useEffect, useState } from "react";
import styles from "@/styles/components/Layout.module.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { LOCAL_STORAGE_KEY } from "@/utils/const";
import { useDispatch } from "react-redux";
import { initialFavoriteTools } from "@/store/favoriteTools/favoriteToolsReducer";
import LanguageSelector from "./LanguageSelector";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "@next/third-parties/google";
import { appConfig } from "@/config";

export default function Layout({ children }: { children?: ReactNode }) {
  const [showMenu, setShowMenu] = useState(true);
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
    setShowDrawerMenu((showDrawerMenu) => !showDrawerMenu);
  };
  const { asPath } = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const initialToolNames = localStorage.getItem(
      LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME
    );
    dispatch(
      initialFavoriteTools(initialToolNames ? JSON.parse(initialToolNames) : [])
    );
  }, [dispatch]);

  return (
    <>
      <Row className={styles.index} wrap={false}>
        <Col
          xs={{ flex: "0px" }}
          sm={{ flex: showMenu ? "240px" : "0px" }}
          className={styles.sideMenuCol}
        >
          <SideMenu />
        </Col>

        <Col className={styles.indexMain} flex={1}>
          <Row
            className="!mx-[26px] mb-[25px] pt-[26px]"
            gutter={8}
            wrap={false}
          >
            <Col xs={{ flex: "0px" }} sm={{ flex: 0 }}>
              <Button onClick={handleShowMenu} icon={<MenuOutlined />} />
            </Col>
            <Col flex={1}>
              <CMDK />
            </Col>
            <Button
              icon={<GithubOutlined />}
              href="https://github.com/C-Nikola/kilotools"
              target="_blank"
            />
            <Col>
              <LanguageSelector />
            </Col>
            <Col>
              <ThemeToggle />
            </Col>
          </Row>
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{
              scrollbars: { autoHide: "scroll" },
            }}
            style={{ padding: "25px 26px 26px", height: "calc(100% - 83px)" }}
          >
            {children}
          </OverlayScrollbarsComponent>
        </Col>
        <Drawer
          rootClassName={styles.drawerMenu}
          onClose={() => setShowDrawerMenu(false)}
          open={showDrawerMenu}
          closable={false}
          styles={{
            body: {
              padding: 0,
            },
          }}
          width={240}
        >
          <SideMenu />
        </Drawer>
      </Row>
      {appConfig.gaId && <GoogleAnalytics gaId={appConfig.gaId} />}
    </>
  );
}
