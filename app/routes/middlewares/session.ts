
import { createCookie, createCookieSessionStorage } from "react-router";
import { unstable_createSessionMiddleware } from "remix-utils/middleware/session";


interface SessionData {
	refresh: string;
	email: string;
}

const cookie = createCookie("session", {
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 7, // 1 week
	path: "/",
	sameSite: "lax",
	secrets: [process.env.SESSION_SECRET ?? "default_session_secret"],
	secure: import.meta.env.PROD,
});

const sessionStorage = createCookieSessionStorage<SessionData>({
	cookie,
});

export const [sessionMiddleware, getSession] =
	unstable_createSessionMiddleware(sessionStorage);
