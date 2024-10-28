import _ from "lodash";

export function createToken({
  withUppercase = true,
  withLowercase = true,
  withNumbers = true,
  withSymbols = false,
  length = 64,
  alphabet,
}: {
  withUppercase?: boolean;
  withLowercase?: boolean;
  withNumbers?: boolean;
  withSymbols?: boolean;
  length?: number;
  alphabet?: string;
}) {
  // 将所有字符组合成一个字符串
  const allAlphabet =
    alphabet ??
    [
      withUppercase ? "ABCDEFGHIJKLMOPQRSTUVWXYZ" : "",
      withLowercase ? "abcdefghijklmopqrstuvwxyz" : "",
      withNumbers ? "0123456789" : "",
      withSymbols ? ".,;:!?./-\"'#{([-|\\@)]=}*+" : "",
    ].join("");

  // 重复 length 次，截取 0 - length，形成新的字符串
  const strArr = allAlphabet.repeat(length).split("");

  const token = _.shuffle(strArr).join("").substring(0, length);

  return token;
}
