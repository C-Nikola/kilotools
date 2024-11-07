import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Flex, Select } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import {
  noCase,
  camelCase,
  pascalCase,
  pascalSnakeCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from "change-case";
import TextArea from "antd/es/input/TextArea";
import _ from "lodash";
import TransformCustom from "@/components/TransformCustom";
import { getErrorMsg } from "@/utils/error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import CaseConverterDesc from "@/components/pageDescription/CaseConverterDesc";

type CaseKeys = keyof typeof typeList;

export default function CaseConverter() {
  const { t } = useTranslation("toolList");

  const [input, setInput] = useState("");
  const [caseType, setCaseType] = useState<keyof typeof typeList>("Lowercase");

  const output = useMemo(() => {
    if (input === "" || input === null || input === undefined) {
      return {
        isErr: false,
        result: "",
      };
    }
    try {
      const result = typeList[caseType].format(input);
      return {
        isErr: false,
        result,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [input, caseType]);

  const handleChangeType = (activeType: string) => {
    setCaseType(activeType as CaseKeys);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  };

  const typeOptions = useMemo(() => {
    return Object.keys(typeList).map((key) => {
      return {
        label: t(`caseConverter.${key}`),
        value: key,
      };
    });
  }, [t]);

  return (
    <>
      <NextSeo
        title={t("caseConverter.title")}
        description={t("caseConverter.description")}
      />
      <ToolPageHeader title="Case Converter" toolName="case-converter" />
      <TransformCustom
        inputLabel="Your string"
        outputLable="Converted string"
        argsChildren={
          <Flex justify="end" align="center" gap={8}>
            Case:
            <Select
              className="w-40"
              value={caseType}
              options={typeOptions}
              onChange={handleChangeType}
              showSearch
            />
          </Flex>
        }
        from={
          <TextArea
            value={input}
            onChange={handleInputChange}
            autoSize={{ minRows: 10 }}
            styles={{
              textarea: { border: 0, outline: "none", boxShadow: "none" },
            }}
          />
        }
        to={
          <TextAreaCopyable
            value={output.result}
            status={output.isErr ? "error" : ""}
            readOnly
            autoSize={{ minRows: 5 }}
            styles={{
              textarea: { border: 0, outline: "none", boxShadow: "none" },
            }}
          />
        }
      />
      <CaseConverterDesc />
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

const typeList = {
  Lowercase: {
    label: "Lowercase",
    format: (input: string) => input.toLocaleLowerCase(),
  },
  Uppercase: {
    label: "Uppercase",
    format: (input: string) => input.toLocaleUpperCase(),
  },
  Camelcase: {
    label: "Camelcase",
    format: camelCase,
  },
  Capitalcase: {
    label: "Capitalcase",
    format: capitalCase,
  },
  Constantcase: {
    label: "Constantcase",
    format: constantCase,
  },
  Pascalcase: {
    label: "Pascalcase",
    format: pascalCase,
  },
  Dotcase: {
    label: "Dotcase",
    format: dotCase,
  },
  PascalSnakeCase: {
    label: "PascalSnakeCase",
    format: pascalSnakeCase,
  },
  Nocase: {
    label: "Nocase",
    format: noCase,
  },
  KebabCase: {
    label: "KebabCase",
    format: kebabCase,
  },
  Pathcase: {
    label: "Pathcase",
    format: pathCase,
  },
  Sentencecase: {
    label: "Sentencecase",
    format: sentenceCase,
  },
  Snakecase: {
    label: "Snakecase",
    format: snakeCase,
  },
  Mockingcase: {
    label: "Mockingcase",
    format: (input: string) =>
      input
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join(""),
  },
  TrainCase: {
    label: "TrainCase",
    format: trainCase,
  },
};
