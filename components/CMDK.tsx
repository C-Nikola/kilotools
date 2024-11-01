import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal, Space, Tag } from "antd";
import { Command } from "cmdk";
import { forwardRef, useEffect, useState, useRef, LegacyRef } from "react";
import styles from "@/styles/components/CMDK.module.scss";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { tools } from "@/utils/toolsList";
import { useRouter } from "next/navigation";
import { TFunction } from "i18next";

const CMDK = ({ t }: { t: TFunction }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const cancelModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.search}>
        <Input placeholder="Search" onFocus={() => setOpen(true)} />
        <Tag className={styles.searchTip}>CMD + K</Tag>
      </div>
      <Modal
        centered
        footer={null}
        title={null}
        open={open}
        onCancel={cancelModal}
        className={styles.CMDKModal}
        focusTriggerAfterClose={false}
        destroyOnClose
      >
        <Command loop>
          <div className={styles.CMDKSearch}>
            <Space.Compact size="large" className="w-full">
              <SearchOutlined />
              <CommandInput />
            </Space.Compact>
          </div>
          <OverlayScrollbarsComponent
            element="div"
            className={styles.sideMenu}
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
          >
            <div className={styles.commandContent}>
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group
                  heading="Tools"
                  className={styles.commandGroupHeading}
                >
                  {tools.map((tool) => (
                    <CommandItem
                      key={tool.title}
                      onSelect={() => {
                        router.push(tool.link);
                        setOpen(false);
                      }}
                    >
                      <span>{t(tool.title)}</span>
                    </CommandItem>
                  ))}
                </Command.Group>
              </Command.List>
            </div>
          </OverlayScrollbarsComponent>
        </Command>
      </Modal>
    </>
  );
};

const CommandItem = forwardRef<
  React.ElementRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ ...props }, ref) => (
  <Command.Item ref={ref} className={styles.commandItem} {...props} />
));

CommandItem.displayName = Command.Item.displayName;

const CommandInput = ({ ...props }) => {
  const ref: LegacyRef<HTMLInputElement> = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Command.Input
      placeholder="Search..."
      ref={ref}
      className={styles.input}
      {...props}
    />
  );
};

CommandInput.displayName = Command.Input.displayName;

export default CMDK;
