import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import { Col, ColorPicker, Row, Space } from "antd";
import type { Colord } from "colord";
import { colord, extend } from "colord";
import _ from "lodash";
import cmykPlugin from "colord/plugins/cmyk";
import hwbPlugin from "colord/plugins/hwb";
import namesPlugin from "colord/plugins/names";
import lchPlugin from "colord/plugins/lch";
import { ChangeEvent, useState } from "react";
import { AggregationColor } from "antd/es/color-picker/color";
import ErrorMsg from "@/components/ErrorMsg";
import { getErrorMsg } from "@/utils/error";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import ColorConverterDesc from "@/components/pageDescription/ColorConverterDesc";

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

export default function ColorConverter() {
  const { t } = useTranslation("toolList");

  const [error, setError] = useState<{
    errMsg: string;
    key: keyof typeof formats;
  }>({
    errMsg: "",
    key: "",
  });
  const [colorList, setColorList] = useState<{
    [K in keyof typeof formats]: string;
  }>({
    picker: "",
    hex: "",
    rgb: "",
    hsl: "",
    hwb: "",
    lch: "",
    cmyk: "",
    name: "",
  });

  const handleColorChange = (
    value: string,
    triggerKey: keyof typeof formats
  ) => {
    try {
      setError({
        errMsg: "",
        key: "",
      });
      const parsedColor = colord(value);
      if (!parsedColor.isValid()) {
        setError({
          errMsg: `Invalid ${triggerKey} format`,
          key: triggerKey,
        });
        return;
      }
      let colorObj = {};
      _.forEach(formats, (item, key) => {
        colorObj = {
          ...colorObj,
          [key]: item.format(parsedColor),
        };
        setColorList({ ...colorObj, [triggerKey]: value });
      });
    } catch (err) {
      setError({
        errMsg: getErrorMsg(err),
        key: triggerKey,
      });
    }
  };

  const handleColorPickerChange = (value: AggregationColor, css: string) => {
    setColorList({
      ...colorList,
      picker: value.toHexString(),
    });
    handleColorChange(value.toHexString(), "picker");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof formats
  ) => {
    const value = e.currentTarget.value;
    setColorList({
      ...colorList,
      [key]: value,
    });
    handleColorChange(value, key);
  };

  return (
    <>
      <NextSeo
        title={t("colorConverter.title")}
        description={t("colorConverter.description")}
      />
      <ToolPageHeader
        title={t("colorConverter.title")}
        toolName="color-converter"
      />
      <OneColumnWithCard>
        <Space className="w-full" direction="vertical">
          {Object.entries(formats).map(([key, value]) => {
            return (
              <Row gutter={16} key={key} align="middle">
                {value.type === "color-picker" ? (
                  <>
                    <Col className="text-right" flex="0 1 100px">
                      Color picker:
                    </Col>
                    <Col flex={1}>
                      <ColorPicker
                        className="w-full"
                        value={colorList[key]}
                        onChange={handleColorPickerChange}
                      />
                      {key === error.key && <ErrorMsg errMsg={error.errMsg} />}
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="text-right" flex="0 1 100px">
                      {key}:
                    </Col>
                    <Col flex={1}>
                      <InputCopyable
                        value={colorList[key]}
                        placeholder={value.placeholder}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handleInputChange(e, key);
                        }}
                      />
                      {key === error.key && <ErrorMsg errMsg={error.errMsg} />}
                    </Col>
                  </>
                )}
              </Row>
            );
          })}
        </Space>
      </OneColumnWithCard>
      <ColorConverterDesc />
    </>
  );
}

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}

const formats: {
  [key: string]: {
    label: string;
    parse?: (value: string) => Colord;
    format: (value: Colord) => string;
    placeholder?: string;
    invalidMessage?: string;
    type?: "text" | "color-picker";
  };
} = {
  picker: {
    label: "color picker",
    format: (v: Colord) => v.toHex(),
    type: "color-picker",
  },
  name: {
    label: "name",
    format: (v: Colord) => v.toName({ closest: true }) ?? "Unknown",
    placeholder: "royalblue",
  },
  hex: {
    label: "hex",
    format: (v: Colord) => v.toHex(),
    placeholder: "#395bc7",
  },
  rgb: {
    label: "rgb",
    format: (v: Colord) => v.toRgbString(),
    placeholder: "rgb(57, 91, 199)",
  },
  hsl: {
    label: "hsl",
    format: (v: Colord) => v.toHslString(),
    placeholder: "hsl(226, 56%, 50%)",
  },
  hwb: {
    label: "hwb",
    format: (v: Colord) => v.toHwbString(),
    placeholder: "hwb(226 22% 22%)",
  },
  lch: {
    label: "lch",
    format: (v: Colord) => v.toLchString(),
    placeholder: "lch(41.01% 63.52 285.48)",
  },
  cmyk: {
    label: "cmyk",
    format: (v: Colord) => v.toCmykString(),
    placeholder: "device-cmyk(71% 54% 0% 22%)",
  },
};
