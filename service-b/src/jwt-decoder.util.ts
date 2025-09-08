export function decodeJwt(token) {
  const [headerB64, payloadB64, signatureB64] = token.split('.');

  // atob() works with Base64, so replace URL-safe chars
  const base64UrlToJson = (b64) =>
    JSON.parse(
      decodeURIComponent(
        atob(b64.replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );

  return {
    header: base64UrlToJson(headerB64),
    payload: base64UrlToJson(payloadB64),
  };
}
