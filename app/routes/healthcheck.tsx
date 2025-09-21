/**
 * The /healthcheck route is used to check the application is working correctly.
 *
 * Here we check the health of the issuer and resource servers, as our web app
 * depends on them to work correctly. If any of them is down, we return a 503
 * error. This is useful for load balancers and monitoring tools to check the
 * health of the application.
 * @module
 * @author Sergio Xalambrí
 * @copyright
 */

import { globalAppContext } from "~/server/context"
import type { Route } from "./+types/healthcheck";
import { getServerEnv } from "~/env.server";
// export async function loader({ context }: Route.LoaderArgs) {
//     // const { clientEnv } = context.get(globalAppContext);
//       const serverEnv = getServerEnv();
// 	let responses = await Promise.all([
// 		fetch(new URL("/healthcheck", serverEnv.ISSUER_HOST)),
// 		fetch(new URL("/healthcheck", serverEnv.RESOURCE_HOST)),
// 	]);

// 	for (let response of responses) {
// 		if (response.ok) continue;
// 		return Response.json(
// 			{ message: "Healthcheck failed" },
// 			{ status: 503, statusText: "Service Unavailable" },
// 		);
// 	}

// 	return Response.json({ message: "Healthcheck successful" });
// }

export async function loader({ context }: Route.LoaderArgs) {
  const serverEnv = getServerEnv();

  try {
    let responses = await Promise.all([
      fetch(new URL("/healthcheck", serverEnv.ISSUER_HOST).toString()),
    ]);

    for (let response of responses) {
      if (!response.ok) {
        return new Response(
          JSON.stringify({ message: "Healthcheck failed" }),
          { status: 503, statusText: "Service Unavailable", headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Healthcheck successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Handle network errors or fetch exceptions here
    return new Response(
      JSON.stringify({ message: "Healthcheck could not be completed", error: String(error) }),
      { status: 503, statusText: "Service Unavailable", headers: { "Content-Type": "application/json" } }
    );
  }
}