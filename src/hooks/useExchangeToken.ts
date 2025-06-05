import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

//  useMutation<응답값타입, 에러타입, mutationFn 파라미터값 타입>
const useExchangeToken = (options?: {
  onSuccess?: (data: ExchangeTokenResponse) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
      // 외부에서 주입된 onSuccess 호출 (선택적으로)
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

export default useExchangeToken;
