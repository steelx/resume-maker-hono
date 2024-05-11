import { type Context } from "hono";
import {createKindeServerClient, GrantType, type SessionManager} from "@kinde-oss/kinde-typescript-sdk";
import {deleteCookie, getCookie, setCookie} from "hono/cookie";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!
});

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
} as const;

export const sessionManager: (c: Context) => SessionManager = (c) => {
  return {
    async getSessionItem(key: string) {
      return getCookie(c, key);
    },
    async setSessionItem(key: string, val: unknown) {
      const value = typeof val === "string" ? val : JSON.stringify(val);
      setCookie(c, key, value, cookieOptions);
    },
    async removeSessionItem(key: string) {
      deleteCookie(c, key)
    },
    async destroySession() {
      ["id_token", "access_token", "user", "refresh_token"].forEach((key: string) => {
        deleteCookie(c, key);
      })
    }
  }
};