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
  IconPassword,
  IconPasswordUser,
  IconPhotoScan,
  IconProps,
  IconSettingsAutomation,
  IconShieldCheckered,
  IconSql,
  IconSquareKey,
  IconToml,
  IconUnlink,
} from "@tabler/icons-react";
import { ItemType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
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
  icon?: ReactNode
): MenuItemType {
  return {
    type: "item",
    key: `${parentKey}-${key}`,
    icon,
    label: (
      <Link
        className="truncate"
        style={{
          maxWidth: "calc(100% - 24px)",
        }}
        href={link}
        title={label}
      >
        <span>{label}</span>
      </Link>
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
    name: "Crypto/Encode",
    components: [
      {
        title: "rsa.title",
        key: "rsa-key-pair-generator",
        description: "rsa.description",
        link: "/crypto/rsa-key-pair-generator",
        icon: IconId,
      },
      {
        title: "MD5",
        key: "md5",
        description: "",
        link: "/crypto/md5",
        icon: IconLetterM,
      },
      {
        title: "SHA",
        key: "sha1",
        description: "",
        link: "/crypto/sha1",
        icon: IconLetterS,
      },
      {
        title: "RIPEMD",
        key: "ripemd",
        description: "",
        link: "/crypto/ripemd",
        icon: IconLetterR,
      },
      {
        title: "AES encrypt",
        key: "aes-encrypt",
        description: "",
        link: "/crypto/aes-encrypt",
        icon: IconLetterA,
      },
      {
        title: "AES decrypt",
        key: "aes-decrypt",
        description: "",
        link: "/crypto/aes-decrypt",
        icon: IconLetterASmall,
      },
    ],
  },
  {
    name: "Converter",
    components: [
      {
        title: "Base64 Encode/Decode",
        key: "base64-encode",
        description:
          "Easily encode and decode Base64 data with our online utility, so you can transmit your data safely or decode Base64-encoded strings.",
        link: "/converter/base-64-encoder",
        icon: IconFileDigit,
      },
      {
        title: "CSV to JSON",
        key: "csv-to-json",
        description:
          "Easily convert CSV data to JSON format with our free tool. Quickest way to turn tabular data into a JSON format for APIs and data processing.",
        link: "/converter/csv-to-json",
        icon: IconCsv,
      },
      {
        title: "YAML to JSON",
        key: "yaml-to-json",
        description:
          "Easily convert YAML to JSON with our converter. Useful when you're working with configuration files and need to switch between them.",
        link: "/converter/yaml-to-json",
        icon: IconListTree,
      },
      {
        title: "JSON to CSV",
        key: "json-to-csv",
        description:
          "Transform your JSON data into sleek CSV format with Jam's free online converter. Simply paste your JSON and watch the magic happen!",
        link: "/converter/json-to-csv",
        icon: IconJson,
      },
      {
        title: "JSON to YAML",
        key: "json-to-yaml",
        description:
          "Easily convert JSON to YAML with our converter. Perfect for when you're juggling configuration files and need a switch between formats.",
        link: "/converter/json-to-yaml",
        icon: IconJson,
      },
      {
        title: "Date-time Converter",
        key: "date-time-converter",
        description: "",
        link: "/converter/date-time-converter",
        icon: IconCalendarStats,
      },
      {
        title: "Query Params to JSON",
        key: "query-params-to-json",
        description:
          "Convert URL query parameters into a structured JSON object, simplifying the process of parsing and manipulating URL data in web applications.",
        link: "/converter/query-params-to-json",
        icon: IconBrandGoogleBigQuery,
      },
      {
        title: ".env to netlify.toml",
        key: "env-to-netlify-toml",
        description:
          "This free tool allows you to quickly and easily convert your .env file variables into the format needed for your netlify.toml file.",
        link: "/converter/env-to-netlify-toml",
        icon: IconSettingsAutomation,
      },
      {
        title: "Image to Base64 Converter",
        key: "image-to-base64-converter",
        description:
          "Instantly convert images to Base64 strings. Embed images directly in your code. Fast, free, and developer-friendly.",
        link: "/converter/image-to-base64",
        icon: IconPhotoScan,
      },
      {
        title: "Integer base converter",
        key: "integer-base-converter",
        description:
          "Convert a number between different bases (decimal, hexadecimal, binary, octal, base64, ...)",
        link: "/converter/integer-base-converter",
        icon: IconNumber123,
      },
      {
        title: "Color converter",
        key: "color-converter",
        description:
          "Convert color between the different formats (hex, rgb, hsl and css name",
        link: "/converter/color-converter",
        icon: IconColorFilter,
      },
      {
        title: "Case converter",
        key: "case-converter",
        description:
          "Transform the case of a string and choose between different formats",
        link: "/converter/case-converter",
        icon: IconLetterCase,
      },
      {
        title: "Text to unicode",
        key: "text-to-unicode",
        description: "Parse and convert text to unicode and vice-versa",
        link: "/converter/text-to-unicode",
        icon: IconAmpersand,
      },
      {
        title: "XML to JSON",
        key: "xml-to-json",
        description: "Convert XML to JSON",
        link: "/converter/xml-to-json",
        icon: IconFileTypeXml,
      },
      {
        title: "JSON to XML",
        key: "json-to-xml",
        description: "Convert JSON to XML",
        link: "/converter/json-to-xml",
        icon: IconJson,
      },
      {
        title: "Markdown to HTML",
        key: "markdown-to-html",
        description: "Convert Markdown to Html and allow to print (as PDF)",
        link: "/converter/markdown-to-html",
        icon: IconMarkdown,
      },
      {
        title: "Escape HTML entities",
        key: "escape-html-entities",
        description:
          "Escape or unescape HTML entities (replace characters like <,>, &, \" and ' with their HTML version)",
        link: "/converter/escape-html-entities",
        icon: IconHtml,
      },
      {
        title: "YAML to TOML",
        key: "yaml-to-toml",
        description: "Parse and convert YAML to TOML.",
        link: "/converter/yaml-to-toml",
        icon: IconListTree,
      },
      {
        title: "TOML to YAML",
        key: "toml-to-yaml",
        description: "Parse and convert TOML to YAML.",
        link: "/converter/toml-to-yaml",
        icon: IconToml,
      },
      {
        title: "JSON to TOML",
        key: "json-to-toml",
        description: "Parse and convert JSON to TOML.",
        link: "/converter/json-to-toml",
        icon: IconJson,
      },
      {
        title: "TOML to JSON",
        key: "toml-to-json",
        description: "Parse and convert TOML to JSON.",
        link: "/converter/toml-to-json",
        icon: IconToml,
      },
    ],
  },
  {
    name: "Web",
    components: [
      {
        title: "JSON Formatter",
        key: "json-formatter",
        description: "",
        link: "/web/json-formatter",
        icon: IconJson,
      },
      {
        title: "URL Encoder/decoder",
        key: "url-encoder",
        description:
          "Convert URLs to a safe format with URL encoding or decode URL-encoded strings back to their original format.",
        link: "/web/url-encoder",
        icon: IconUnlink,
      },
      {
        title: "URL parser",
        key: "url-parser",
        description:
          "Parse a URL into its separate constituent parts (protocol, origin, params, port, username-password, ...)",
        link: "/web/url-parser",
        icon: IconLink,
      },
      {
        title: "MIME types",
        key: "mime-types",
        description: "Convert MIME types to file extensions and vice-versa.",
        link: "/web/mime-types",
        icon: IconBrandMedium,
      },
      {
        title: "Basic auth generator",
        key: "basic-auth-generator",
        description:
          "Generate a base64 basic auth header from a username and password.",
        link: "/web/basic-auth-generator",
        icon: IconPasswordUser,
      },
      {
        title: "XML formatter",
        key: "xml-formatter",
        description:
          "Prettify your XML string into a friendly, human-readable format.",
        link: "/web/xml-formatter",
        icon: IconFileTypeXml,
      },
    ],
  },
  {
    name: "Development",
    components: [
      {
        title: "JWT Parser",
        key: "jwt-parser",
        description:
          "Easily decode JWT tokens and view their header, payload, and signature. Perfect for debugging and analyzing JSON Web Tokens.",
        link: "/dev/jwt-parser",
        icon: IconKey,
      },
      {
        title: "Token Generator",
        key: "token-generator",
        description:
          "Generate random string with the chars you want, uppercase or lowercase letters, numbers and/or symbols.",
        link: "/dev/token-generator",
        icon: IconAbc,
      },
      {
        title: "Password Generator",
        key: "password-generator",
        description: "",
        link: "/dev/password-generator",
        icon: IconSquareKey,
      },
      {
        title: "Hash Text",
        key: "hash-text",
        description:
          "Hash a text string using the function you need : MD5, SHA1, SHA256, SHA224, SHA512, SHA384, SHA3 or RIPEMD160",
        link: "/dev/hash-text",
        icon: IconHash,
      },
      {
        title: "Bcrypt",
        key: "bcrypt",
        description:
          "Hash and compare text string using bcrypt. Bcrypt is a password-hashing function based on the Blowfish cipher.",
        link: "/dev/bcrypt",
        icon: IconLock,
      },
      {
        title: "Encrypt / decrypt text",
        key: "encrypt-text",
        description:
          "Encrypt clear text and decrypt ciphertext using crypto algorithms like AES, TripleDES, Rabbit or RC4.",
        link: "/dev/encrypt-text",
        icon: IconLockSquareRounded,
      },
      {
        title: "Hmac generator",
        key: "hmac-generator",
        description:
          "Computes a hash-based message authentication code (HMAC) using a secret key and your favorite hashing function.",
        link: "/dev/hmac-generator",
        icon: IconBaselineDensityLarge,
      },
      {
        title: "Crontab generator",
        key: "crontab-generator",
        description:
          "Validate and generate crontab and get the human-readable description of the cron schedule.",
        link: "/dev/crontab-generator",
        icon: IconHourglassHigh,
      },
      {
        title: "SQL formatter",
        key: "sql-formatter",
        description:
          "Format and prettify your SQL queries online (it supports various SQL dialects).",
        link: "/dev/sql-formatter",
        icon: IconSql,
      },
      {
        title: "Javascript minify",
        key: "javascript-minify",
        description: "",
        link: "/dev/javascript-minify",
        icon: IconBrandJavascript,
      },
      {
        title: "YAML formatter",
        key: "yaml-formatter",
        description:
          "Prettify your YAML string into a friendly, human-readable format.",
        link: "/dev/yaml-formatter",
        icon: IconListTree,
      },
    ],
  },
  {
    name: "Network",
    components: [
      {
        title: "MAC address lookup",
        key: "mac-address-lookup",
        description:
          "Find the vendor and manufacturer of a device by its MAC address.",
        link: "/net/mac-address-lookup",
        icon: IconDeviceImacPin,
      },
    ],
  },
  {
    name: "Text",
    components: [
      {
        title: "Text diff",
        description: "Compare two texts and see the differences between them.",
        key: "text-diff",
        link: "/text/text-diff",
        icon: IconArrowsDiff,
      },
    ],
  },
  {
    name: "Security",
    components: [
      {
        title: "Xss defence",
        description: "",
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

// 使用方式https://github.com/ant-design/ant-design/issues/48369
const menuItems: SubMenuType<MenuItemType>[] = toolsByCategory.map(
  (category) => {
    const children: MenuItemType[] = category.components.map((tool) => {
      const Icon = tool.icon;
      return getItem(
        tool.title,
        category.name,
        tool.key,
        tool.link,
        <Icon size={24} />
      );
    });

    return getSubMenu(category.name, category.name, children);
  }
);

export { toolsByCategory, tools, menuItems, getItem };
export type { Tool, ToolCategory, ToolCard };
