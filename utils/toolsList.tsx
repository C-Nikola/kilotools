import {
  Icon,
  IconAbc,
  IconAmpersand,
  IconArrowsDiff,
  IconBaselineDensityLarge,
  IconBrandGoogleBigQuery,
  IconBrandJavascript,
  IconBrandMedium,
  IconCalendarStats,
  IconColorFilter,
  IconCsv,
  IconDeviceImacPin,
  IconFileDigit,
  IconFileTypeXml,
  IconHash,
  IconHourglassHigh,
  IconHtml,
  IconId,
  IconJson,
  IconKey,
  IconLetterA,
  IconLetterASmall,
  IconLetterCase,
  IconLetterM,
  IconLetterR,
  IconLetterS,
  IconLink,
  IconListTree,
  IconLock,
  IconLockSquareRounded,
  IconMarkdown,
  IconNumber123,
  IconPasswordUser,
  IconPhotoScan,
  IconProps,
  IconSettingsAutomation,
  IconShieldCheckered,
  IconSpeakerphone,
  IconSql,
  IconSquareKey,
  IconToml,
  IconUnlink,
} from "@tabler/icons-react";
import { Tooltip } from "antd";
import { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import Link from "next/link";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

type Tool = {
  title: string;
  key: string;
  description: string;
  link: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

type ToolCard = {
  title: string;
  key: string;
  description: string;
  link: string;
  icon: ReactNode;
};

type ToolCategory = {
  name: string;
  components: Array<Tool>;
};

function getItem(
  label: string,
  parentKey: string,
  key: React.Key,
  link: string,
  description: string,
  icon?: ReactNode
): MenuItemType {
  return {
    type: "item",
    key: `${parentKey}-${key}`,
    icon,
    label: (
      <Tooltip placement="right" title={description}>
        <Link
          className="truncate"
          style={{
            maxWidth: "calc(100% - 24px)",
          }}
          href={link}
        >
          <span>{label}</span>
        </Link>
      </Tooltip>
    ),
  };
}

function getSubMenu(
  label: string,
  key: string,
  children: MenuItemType[],
  icon?: ReactNode
): SubMenuType<MenuItemType> {
  return {
    type: "submenu",
    key,
    icon,
    children,
    label: (
      <span
        className="truncate"
        style={{
          maxWidth: "calc(100% - 24px)",
        }}
        title={label}
      >
        {label}
      </span>
    ),
  };
}

const toolsByCategory: Array<ToolCategory> = [
  {
    name: "category.crypto",
    components: [
      {
        title: "rsa.title",
        key: "rsa-key-pair-generator",
        description: "rsa.description",
        link: "/crypto/rsa-key-pair-generator",
        icon: IconId,
      },
      {
        title: "MD5.title",
        key: "md5",
        description: "MD5.description",
        link: "/crypto/md5",
        icon: IconLetterM,
      },
      {
        title: "SHA.title",
        key: "sha1",
        description: "SHA.description",
        link: "/crypto/sha1",
        icon: IconLetterS,
      },
      {
        title: "RIPEMD.title",
        key: "ripemd",
        description: "RIPEMD.description",
        link: "/crypto/ripemd",
        icon: IconLetterR,
      },
      {
        title: "AESEncrypt.title",
        key: "aes-encrypt",
        description: "AESEncrypt.description",
        link: "/crypto/aes-encrypt",
        icon: IconLetterA,
      },
      {
        title: "AESDecrypt.title",
        key: "aes-decrypt",
        description: "AESDecrypt.description",
        link: "/crypto/aes-decrypt",
        icon: IconLetterASmall,
      },
    ],
  },
  {
    name: "category.converter",
    components: [
      {
        title: "base64EncodeDecode.title",
        key: "base64-encode",
        description: "base64EncodeDecode.description",
        link: "/converter/base-64-encoder",
        icon: IconFileDigit,
      },
      {
        title: "CSVToJSON.title",
        key: "csv-to-json",
        description: "CSVToJSON.description",
        link: "/converter/csv-to-json",
        icon: IconCsv,
      },
      {
        title: "YAMLToJSON.title",
        key: "yaml-to-json",
        description: "YAMLToJSON.description",
        link: "/converter/yaml-to-json",
        icon: IconListTree,
      },
      {
        title: "JSONToCSV.title",
        key: "json-to-csv",
        description: "JSONToCSV.description",
        link: "/converter/json-to-csv",
        icon: IconJson,
      },
      {
        title: "JSONToYAML.title",
        key: "json-to-yaml",
        description: "JSONToYAML.description",
        link: "/converter/json-to-yaml",
        icon: IconJson,
      },
      {
        title: "dateTimeConverter.title",
        key: "date-time-converter",
        description: "dateTimeConverter.description",
        link: "/converter/date-time-converter",
        icon: IconCalendarStats,
      },
      {
        title: "queryParamsToJSON.title",
        key: "query-params-to-json",
        description: "queryParamsToJSON.description",
        link: "/converter/query-params-to-json",
        icon: IconBrandGoogleBigQuery,
      },
      {
        title: "envToNetlifyToml.title",
        key: "env-to-netlify-toml",
        description: "envToNetlifyToml.description",
        link: "/converter/env-to-netlify-toml",
        icon: IconSettingsAutomation,
      },
      {
        title: "imageToBase64Converter.title",
        key: "image-to-base64-converter",
        description: "imageToBase64Converter.description",
        link: "/converter/image-to-base64",
        icon: IconPhotoScan,
      },
      {
        title: "integerBaseConverter.title",
        key: "integer-base-converter",
        description: "integerBaseConverter.description",
        link: "/converter/integer-base-converter",
        icon: IconNumber123,
      },
      {
        title: "colorConverter.title",
        key: "color-converter",
        description: "colorConverter.description",
        link: "/converter/color-converter",
        icon: IconColorFilter,
      },
      {
        title: "caseConverter.title",
        key: "case-converter",
        description: "caseConverter.description",
        link: "/converter/case-converter",
        icon: IconLetterCase,
      },
      {
        title: "textToUnicode.title",
        key: "text-to-unicode",
        description: "textToUnicode.description",
        link: "/converter/text-to-unicode",
        icon: IconAmpersand,
      },
      {
        title: "XMLToJSON.title",
        key: "xml-to-json",
        description: "XMLToJSON.description",
        link: "/converter/xml-to-json",
        icon: IconFileTypeXml,
      },
      {
        title: "JSONToXML.title",
        key: "json-to-xml",
        description: "JSONToXML.description",
        link: "/converter/json-to-xml",
        icon: IconJson,
      },
      {
        title: "markdownToHTML.title",
        key: "markdown-to-html",
        description: "markdownToHTML.description",
        link: "/converter/markdown-to-html",
        icon: IconMarkdown,
      },
      {
        title: "escapeHTMLEntities.title",
        key: "escape-html-entities",
        description: "escapeHTMLEntities.description",
        link: "/converter/escape-html-entities",
        icon: IconHtml,
      },
      {
        title: "YAMLToTOML.title",
        key: "yaml-to-toml",
        description: "YAMLToTOML.description",
        link: "/converter/yaml-to-toml",
        icon: IconListTree,
      },
      {
        title: "TOMLToYAML.title",
        key: "toml-to-yaml",
        description: "TOMLToYAML.description",
        link: "/converter/toml-to-yaml",
        icon: IconToml,
      },
      {
        title: "JSONToTOML.title",
        key: "json-to-toml",
        description: "JSONToTOML.description",
        link: "/converter/json-to-toml",
        icon: IconJson,
      },
      {
        title: "TOMLToJSON.title",
        key: "toml-to-json",
        description: "TOMLToJSON.description",
        link: "/converter/toml-to-json",
        icon: IconToml,
      },
    ],
  },
  {
    name: "category.web",
    components: [
      {
        title: "JSONFormatter.title",
        key: "json-formatter",
        description: "JSONFormatter.description",
        link: "/web/json-formatter",
        icon: IconJson,
      },
      {
        title: "URLEncodeDecoder.title",
        key: "url-encoder",
        description: "URLEncodeDecoder.description",
        link: "/web/url-encoder",
        icon: IconUnlink,
      },
      {
        title: "URLParser.title",
        key: "url-parser",
        description: "URLParser.description",
        link: "/web/url-parser",
        icon: IconLink,
      },
      {
        title: "MIMETypes.title",
        key: "mime-types",
        description: "MIMETypes.description",
        link: "/web/mime-types",
        icon: IconBrandMedium,
      },
      {
        title: "basicAuthGenerator.title",
        key: "basic-auth-generator",
        description: "basicAuthGenerator.description",
        link: "/web/basic-auth-generator",
        icon: IconPasswordUser,
      },
      {
        title: "XMLFormatter.title",
        key: "xml-formatter",
        description: "XMLFormatter.description",
        link: "/web/xml-formatter",
        icon: IconFileTypeXml,
      },
      {
        title: "speakingUrlGenerator.title",
        key: "speaking-url-generator",
        description: "speakingUrlGenerator.description",
        link: "/web/speaking-url-generator",
        icon: IconSpeakerphone,
      },
    ],
  },
  {
    name: "category.development",
    components: [
      {
        title: "JWTParser.title",
        key: "jwt-parser",
        description: "JWTParser.description",
        link: "/dev/jwt-parser",
        icon: IconKey,
      },
      {
        title: "tokenGenerator.title",
        key: "token-generator",
        description: "tokenGenerator.description",
        link: "/dev/token-generator",
        icon: IconAbc,
      },
      {
        title: "passwordGenerator.title",
        key: "password-generator",
        description: "passwordGenerator.description",
        link: "/dev/password-generator",
        icon: IconSquareKey,
      },
      {
        title: "hashText.title",
        key: "hash-text",
        description: "hashText.description",
        link: "/dev/hash-text",
        icon: IconHash,
      },
      {
        title: "bcrypt.title",
        key: "bcrypt",
        description: "bcrypt.description",
        link: "/dev/bcrypt",
        icon: IconLock,
      },
      {
        title: "encryptDecryptText.title",
        key: "encrypt-text",
        description: "encryptDecryptText.description",
        link: "/dev/encrypt-text",
        icon: IconLockSquareRounded,
      },
      {
        title: "hmacGenerator.title",
        key: "hmac-generator",
        description: "hmacGenerator.description",
        link: "/dev/hmac-generator",
        icon: IconBaselineDensityLarge,
      },
      {
        title: "crontabGenerator.title",
        key: "crontab-generator",
        description: "crontabGenerator.description",
        link: "/dev/crontab-generator",
        icon: IconHourglassHigh,
      },
      {
        title: "SQLFormatter.title",
        key: "sql-formatter",
        description: "SQLFormatter.description",
        link: "/dev/sql-formatter",
        icon: IconSql,
      },
      {
        title: "javascriptMinify.title",
        key: "javascript-minify",
        description: "javascriptMinify.description",
        link: "/dev/javascript-minify",
        icon: IconBrandJavascript,
      },
      {
        title: "YAMLFormatter.title",
        key: "yaml-formatter",
        description: "YAMLFormatter.description",
        link: "/dev/yaml-formatter",
        icon: IconListTree,
      },
    ],
  },
  {
    name: "category.network",
    components: [
      {
        title: "MACAddressLookup.title",
        key: "mac-address-lookup",
        description: "MACAddressLookup.description",
        link: "/net/mac-address-lookup",
        icon: IconDeviceImacPin,
      },
    ],
  },
  {
    name: "category.text",
    components: [
      {
        title: "textDiff.title",
        description: "textDiff.description",
        key: "text-diff",
        link: "/text/text-diff",
        icon: IconArrowsDiff,
      },
    ],
  },
  {
    name: "category.security",
    components: [
      {
        title: "xssDefence.title",
        description: "xssDefence.description",
        key: "xss-defence",
        link: "/security/xss-defence",
        icon: IconShieldCheckered,
      },
    ],
  },
];

let tools: Array<ToolCard> = [];

toolsByCategory.map((category) => {
  const toolList = category.components.map((tool) => {
    const Icon = tool.icon;
    return {
      ...tool,
      icon: <Icon size={40} />,
      category: category.name,
    };
  });

  tools = tools.concat(toolList);
});

export { toolsByCategory, tools, getItem, getSubMenu };
export type { Tool, ToolCategory, ToolCard };
