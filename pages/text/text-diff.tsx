import Full from "@/components/Full";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Divider, List, Tag, Typography } from "antd";
import dynamic from "next/dynamic";

const { Title } = Typography;

// window is not defined
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const DiffEditorUI = dynamic(() => import("@/components/ui/DiffEditorUI"), {
  ssr: false,
});

export default function TextDiff() {
  return (
    <>
      <ToolPageHeader title="Text diff" toolName="text-diff" />
      <Full scrollable>
        <DiffEditorUI original={defaultOriginal} modified={defaultModified} />
      </Full>
      <Divider>
        <Title level={3}>How to use</Title>
      </Divider>
      <List
        header={<Title level={3}>Keymap</Title>}
        bordered
        dataSource={keymap}
        renderItem={(item) => (
          <List.Item>
            <Tag>{item.key}</Tag>
            {item.desc}
          </List.Item>
        )}
      />
    </>
  );
}

const keymap = [
  {
    key: "F3",
    desc: "next diff (please activate modified editor)",
  },
  {
    key: "F4",
    desc: "previous diff (please activate modified editor)",
  },
];

const defaultOriginal = `original text
a
b
c
d
e
f
g
h
i
j
k
l
n
m
o
p
q
r
s
t
u
v
w
x
y
z
1
2
3
4
5
6
7
8
9
10
11
12
13`;

const defaultModified = `modified text
a
b
c
d
a
f
g
h
i
j
k
l
n
m
o
p
a
r
s
t
u
v
w
x
y
z
1
2
3
a
5
6
7
8
9
10
11
12
13`;
