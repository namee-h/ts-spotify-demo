import { CLIENT_ID, SCOPES } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URI;

  const scope = SCOPES;
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  console.log("🔐 Generated code_verifier:", codeVerifier);
  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    console.log("🎯 Redirecting to:", authUrl.toString());

    setTimeout(() => {
      window.location.href = authUrl.toString();
    }, 100);
  }
};
