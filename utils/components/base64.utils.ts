import { Base64 } from "js-base64";

export { toBase64, fromBase64, isValid, removePotentialDataAndMimePrefix };

function toBase64(
  str: string,
  { urlSafe = false }: { urlSafe?: boolean } = {}
) {
  const encoded = Base64.encode(str);
  return urlSafe ? transformUriSafe(encoded) : encoded;
}

function fromBase64(
  str: string,
  { urlSafe = false }: { urlSafe?: boolean } = {}
) {
  if (!isValid(str, { urlSafe })) {
    throw new Error("Incorrect base64 string");
  }

  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (urlSafe) {
    cleanStr = untransformUriSafe(cleanStr);
  }

  try {
    return Base64.decode(cleanStr);
  } catch (_) {
    throw new Error("Incorrect base64 string");
  }
}

function transformUriSafe(encoded: string) {
  return encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function untransformUriSafe(encoded: string): string {
  return encoded
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/[^A-Za-z0-9+/]/g, "");
}

function removePotentialDataAndMimePrefix(str: string) {
  return str.replace(/^data:.*?;base64,/, "");
}

function removePotentialPadding(str: string) {
  return str.replace(/=/g, "");
}

function isValid(str: string, { urlSafe = false }: { urlSafe?: boolean } = {}) {
  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (urlSafe) {
    cleanStr = untransformUriSafe(cleanStr);
  }

  try {
    const reEncodedBase64 = Base64.fromUint8Array(
      Base64.toUint8Array(cleanStr)
    );
    if (urlSafe) {
      return removePotentialPadding(reEncodedBase64) === cleanStr;
    }
    return reEncodedBase64 === cleanStr.replace(/\s/g, "");
  } catch (err) {
    return false;
  }
}
