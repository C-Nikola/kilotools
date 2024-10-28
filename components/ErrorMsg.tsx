export default function ErrorMsg({ errMsg }: { errMsg: string }) {
  return (
    <div className="text-center text-[var(--ant-color-error)]">{errMsg}</div>
  );
}
