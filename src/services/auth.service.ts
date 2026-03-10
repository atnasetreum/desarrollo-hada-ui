import { createScopedClient } from "./http-client";

const authHttp = createScopedClient("/auth");

export type CheckTokenResponse = {
  valid: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export const authService = {
  login(payload: { email: string; password: string }) {
    return authHttp.post("/login", payload);
  },
  checkToken() {
    return authHttp.get<CheckTokenResponse>("/check-token");
  },
  logout() {
    return authHttp.post("/logout");
  },
  refreshToken() {
    return authHttp.post("/refresh-token");
  },
};
