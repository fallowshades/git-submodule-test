import type { Route } from "./+types/_layout"
import { data, Link, type MetaFunction,Form,
  NavLink,
  Outlet,
  RouterContextProvider,
  useFetchers,
  useLocation,
  useNavigation,
  useSubmit, } from "react-router"
import { convertDateToUserTz } from "~/utils/dates"
import { getAPIClient } from "~/middleware/api-client"
export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}


export async function loader({ request, context }: Route.LoaderArgs) {
  const ctx = context as unknown as RouterContextProvider
  let api = getAPIClient(ctx)
//   let session = getSession(ctx)

  let url = new URL(request.url)
    let query = url.searchParams.get('q') ?? undefined
    
    const timezoneDate = convertDateToUserTz(new Date(), request)
	
  try {
    let contacts = await api.contacts(query)
    return data({
      query,
      contacts,
        // viewer: { email: session.get('email') },
        timezoneDate: timezoneDate.toTimeString(),
    })
  } catch (error) {
    console.error('Failed to load contacts:', error)
    // Return fallback data or redirect to error page
    return data({
      query,
      contacts: [],
        // viewer: { email: session.get('email') },
      timezoneDate: timezoneDate.toTimeString(),
    })
  

  }
}

export function Component() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
         
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s next?
            </p>
            <ul>
              {resources.map(({ href, text, icon }) => (
                <li key={href}>
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}