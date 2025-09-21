import { href, redirect } from "react-router";
// import auth from "~/auth";
// import { IDToken } from "~/entities/id-token";
// import { getSession } from "~/middlewares/session";
import type { Route } from "./+types/auth";

export async function loader({ request, context }: Route.LoaderArgs) {
	// let tokens = await auth.authenticate(request);
	// let session = getSession(context);

	// if (tokens.hasRefreshToken()) session.set("refresh", tokens.refreshToken());

	// let idToken = IDToken.decode(tokens.idToken());
	// session.set("email", idToken.email);

	return redirect(href("/"));//contacts
}
