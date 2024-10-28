export default function ErrorMsg({ errMsg }: { errMsg: string }) {
  return (
    <div
      className="text-center"
      style={{
        color: "var(--ant-color-error)",
      }}
    >
      {errMsg}
    </div>
  );
}
