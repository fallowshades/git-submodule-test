// /**
//  * This is the configuration file for the OAuth2 strategy.
//  *
//  * Here we're using the well-known endpoint to discover the OAuth2 server
//  * configuration. This is the recommended way to configure the OAuth2 strategy
//  * as it allows us to automatically get the correct configuration.
//  *
//  * We're also setting the scopes we want to use, `openid` is required for
//  * ID token, `contacts:read:own` and `contacts:write:own` are the scopes we
//  * need to read and write contacts.
//  * @module
//  * @author Sergio Xalambrí
//  * @copyright
//  */
// import { OAuth2Strategy } from "remix-auth-oauth2";
// // import env from "./env";

// export type Tokens = OAuth2Strategy.VerifyOptions["tokens"];

// export default await OAuth2Strategy.discover<Tokens>(
// 	new URL("/.well-known/oauth-authorization-server", process.env.ISSUER_HOST),
// 	{
// 		clientId: 'NcePF2XPTGKIL02IyZl4ClnHDpp11HoW',
// 		clientSecret:'a long, randomly-generated string stored in env',
// 		redirectURI: "http://localhost:3000/auth",
// 		scopes: ["openid", "contacts:read:own", "contacts:write:own"],
// 		audience: process.env.AUDIENCE,
// 	},
// 	async ({ tokens }) => tokens,
// );


// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:4280',
//   clientID: 'NcePF2XPTGKIL02IyZl4ClnHDpp11HoW',
//   issuerBaseURL: 'https://dev-iyyohso4hyblfvno.us.auth0.com'
// };