import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { getItem, getSubMenu, toolsByCategory } from "@/utils/toolsList";
import useLocalStorageListener from "@/hooks/useLocalStorageListener";
import { LOCAL_STORAGE_KEY } from "@/utils/const";
import { ItemType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
import _ from "lodash";
import Link from "next/link";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styles from "@/styles/components/SideMenu.module.scss";
import { TFunction } from "i18next";
import { withTranslation } from "next-i18next";

const SideMenu = ({ t }: { t: TFunction }) => {
  const { value: localFavoriteTools } = useLocalStorageListener<string[]>(
    LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
    "array"
  );

  const [tools, setTools] = useState<SubMenuType<MenuItemType>[]>([]);

  useEffect(() => {
    // https://github.com/ant-design/ant-design/issues/48369
    const items: SubMenuType<MenuItemType>[] = toolsByCategory.map(
      (category) => {
        const children: MenuItemType[] = category.components.map((tool) => {
          const Icon = tool.icon;
          return getItem(
            t(tool.title),
            t(category.name),
            tool.key,
            tool.link,
            <Icon size={24} />
          );
        });

        return getSubMenu(t(category.name), t(category.name), children);
      }
    );

    if (!localFavoriteTools || localFavoriteTools.length === 0) {
      setTools(items);
      return;
    }

    let tools: ItemType<MenuItemType>[] = [];
    toolsByCategory.map((category) => {
      category.components.forEach((tool) => {
        if (localFavoriteTools.includes(tool.key)) {
          const Icon = tool.icon;
          tools = [
            ...tools,
            getItem(
              t(tool.title),
              `${tool.key}`,
              "favorite",
              tool.link,
              <Icon size={24} />
            ),
          ];
        }
      });
    });
    const favoriteSubMenu: SubMenuType<MenuItemType> = {
      label: "Favorite",
      key: "favorite",
      children: tools,
    };
    setTools([favoriteSubMenu, ...items]);
  }, [localFavoriteTools, t]);

  return (
    <div className="h-full">
      <Link href="/" className={styles.heroWrap}>
        <div className={styles.textWrapperWrapper}>
          <div className={styles.textWrapper}>
            <div className={styles.title}>KILOTOOLS</div>
            <div className={styles.divider} />
            <div className={styles.subtitle}>
              One-Stop Shop for Developer Tools
            </div>
          </div>
        </div>
      </Link>
      <OverlayScrollbarsComponent
        element="div"
        className={styles.sideMenu}
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
        style={{ borderLeft: "1px solid var(--ant-color-split)" }}
      >
        <Menu
          style={{ width: "100%", height: "100%", paddingTop: 160, border: 0 }}
          mode="inline"
          items={tools}
        />
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default withTranslation("toolList")(SideMenu);
