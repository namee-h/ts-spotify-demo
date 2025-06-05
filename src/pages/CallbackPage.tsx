import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExchangeToken from "../hooks/useExchangeToken";

const CallbackPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: () => {
      console.log("✅ 토큰 교환 성공->홈으로 이동");
      navigate("/");
    },
  });

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    } else {
      console.error("❌ code 또는 code_verifier 없음");
    }
  }, [code, codeVerifier, exchangeToken]);

  return <div style={{ color: "white" }}>🔄 Spotify 인증 처리 중...</div>;
};

export default CallbackPage;
