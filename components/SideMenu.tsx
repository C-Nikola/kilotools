import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { getItem, menuItems, toolsByCategory } from "@/utils/toolsList";
import useLocalStorageListener from "@/hooks/useLocalStorageListener";
import { LOCAL_STORAGE_KEY } from "@/utils/const";
import { ItemType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
import _ from "lodash";
import Link from "next/link";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styles from "@/styles/components/SideMenu.module.scss";

const SideMenu: React.FC = () => {
  const { value: localFavoriteTools } = useLocalStorageListener<string[]>(
    LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
    "array"
  );

  const [favoriteTools, setFavoriteTools] =
    useState<SubMenuType<MenuItemType>[]>(menuItems);

  useEffect(() => {
    if (!localFavoriteTools || localFavoriteTools.length === 0) {
      setFavoriteTools(menuItems);
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
              tool.title,
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
    setFavoriteTools([favoriteSubMenu, ...menuItems]);
  }, [localFavoriteTools]);

  return (
    <div className="h-full">
      <Link href="/" className={styles.heroWrap}>
        <div className={styles.textWrapperWrapper}>
          <div className={styles.textWrapper}>
            <div className={styles.title}>KILOTOOLS</div>
            <div className={styles.divider} />
            <div className={styles.subtitle}>Handy tools for developers</div>
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
          items={favoriteTools}
        />
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default SideMenu;
