import { fromBase64 } from "./base64.utils";

function base64UrlDecode(str: string): string {
  try {
    const decoded = fromBase64(str, { urlSafe: true });
    if (!decoded) throw new Error("Invalid token");
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

function decodeJWT(token: string): {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
} {
  try {
    const [header, payload, signature] = token.split(".");

    if (!header || !payload || !signature) {
      throw new Error("Invalid token");
    }

    return {
      header: JSON.parse(base64UrlDecode(header)),
      payload: JSON.parse(base64UrlDecode(payload)),
      signature,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export { decodeJWT, base64UrlDecode };
