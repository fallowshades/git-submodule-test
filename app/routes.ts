// import { flatRoutes } from "@react-router/fs-routes"

// export default flatRoutes({
// 	ignoredRouteFiles: ["**/*.test.{ts,tsx}"],
// })


// import { route, index, RouteConfig } from "@react-router/dev/routes";
// import { flatRoutes } from "@react-router/fs-routes";

// export default (async function () {
//   const dynamicRoutes = await flatRoutes();

//   return [
//     index("./_index.tsx"),
//     route("healthcheck", "./healthcheck.tsx"),
//     ...dynamicRoutes,
//   ] satisfies RouteConfig;
// })();

import { crud, index, route,layout } from "@edgefirst-dev/crud-routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  ...crud('contacts'),
	 ...crud("curriculums"),

	route("healthcheck", "routes/healthcheck.tsx"),
	route("robots.txt", "routes/robots[.]txt.ts"),
	route("sitemap-index.xml", "routes/sitemap-index[.]xml.ts"),
	route("sitemap-:section.xml", "routes/sitemap-$lang[.]xml.ts"),
	route("localization/resource", "routes/localization/resource.ts"),
	route("resource.locales", "routes/resource.locales.ts"),// or for nested dynamic
// route("resources/locales/:lang/:ns", "routes/resources/locales/en/common.json"),
// route("resources/locales/:lang/:ns", "routes/resources/locales/bs/common.json"),
	route("auth", "routes/auth.tsx"),
	route("logout", "routes/logout.ts"),
	index("routes/_index.tsx"),
] satisfies RouteConfig;
