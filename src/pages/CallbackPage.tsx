import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useExchangeToken from "../hooks/useExchangeToken";
import LoadingSpinner from "../common/components/loadingSpinner/LoadingSpinner";

const CallbackPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: () => {
      // console.log("✅ 토큰 교환 성공->홈으로 이동");
      navigate("/");
    },
  });

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    if (!hasRunRef.current && code && codeVerifier) {
      hasRunRef.current = true;
      exchangeToken({ code, codeVerifier });
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      console.error("❌ code 또는 code_verifier 없음");
    }
  }, [code, codeVerifier, exchangeToken]);

  return <LoadingSpinner />;
};

export default CallbackPage;
