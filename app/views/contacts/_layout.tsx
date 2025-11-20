/**
 * @module
 * @author Sergio Xalambrí
 * @copyright
 */
import { useEffect, useId } from 'react'
import {
  data,
  Form,
  NavLink,
  Outlet,
  RouterContextProvider,
  useFetchers,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router'
import { apiClientMiddleware, getAPIClient } from '~/middleware/api-client'
// import { refreshMiddleware } from '~/middlewares/refresh'
import { getSession } from '~/middleware/session'
import type { Route } from './+types/_layout'

/**
 * Here we're configuring the refresh token middleware that will get a new
 * access token and the API client middleware that will create a new API client
 * instance using the access token from the refresh token middleware.
 */
export const unstable_middleware = [
  // refreshMiddleware,
  apiClientMiddleware,
] satisfies Route.unstable_MiddlewareFunction[]

export function meta(_: Route.MetaArgs) {
  return [{ title: 'Address Book' }]
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const ctx = context as unknown as RouterContextProvider
  let api = getAPIClient(ctx)
  let session = getSession(ctx)

  let url = new URL(request.url)
  let query = url.searchParams.get('q') ?? undefined

  try {
    let contacts = await api.contacts(query)
    return data({
      query,
      contacts,
      viewer: { email: session.get('email') },
    })
  } catch (error) {
    console.error('Failed to load contacts:', error)
    // Return fallback data or redirect to error page
    return data({
      query,
      contacts: [],
      viewer: { email: session.get('email') },
    })
  }
}

export default function Component({ loaderData }: Route.ComponentProps) {
  let navigation = useNavigation()
  let submit = useSubmit()
  let location = useLocation()
  const searchFormId = useId()
  const searchInputId = useId()
  const sidebarId = useId()

  let pendingFavorites = usePendingFavorites()
  let pendingDeletes = usePendingDeletes()

  let searching = useSearching()

  let { query } = loaderData
  useEffect(() => {
    let searchField = document.getElementById(searchInputId)
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query || ''
    }
  }, [query, searchInputId])

  return (
    <>
      <section id={sidebarId}>
        <aside>
          <h1>{loaderData.viewer.email}</h1>
          <Form
            action='/logout'
            method='POST'>
            <button type='submit'>Logout</button>
          </Form>
          <Form
            action={location.pathname}
            id={searchFormId}
            method='GET'
            onChange={(event) => {
              event.preventDefault()
              let isFirstSearch = loaderData.query === null
              submit(event.currentTarget, { replace: !isFirstSearch })
            }}>
            <input
              aria-label='Search contacts'
              className={searching ? 'loading' : ''}
              id={searchInputId}
              name='q'
              placeholder='Search'
              type='search'
              defaultValue={loaderData.query ?? ''}
            />
            <div
              aria-hidden
              hidden={!searching}
              id={'search-spinner'}
            />
          </Form>

          <Form action='/contacts/new'>
            <button type='submit'>New</button>
          </Form>
        </aside>

        <nav>
          {loaderData.contacts.length ? (
            <ul>
              {loaderData.contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      pendingDeletes.includes(contact.id)
                        ? 'deleting'
                        : isActive
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                    to={`/contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite || pendingFavorites.get(contact.id) ? (
                      <span>★</span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </section>

      <section
        id={'detail'}
        className={
          navigation.state === 'loading' && !searching ? 'loading' : ''
        }>
        <Outlet />
      </section>
    </>
  )
}

function usePendingFavorites() {
  let fetchers = useFetchers()

  return fetchers
    .filter((fetcher) => fetcher.key.startsWith('favorite:'))
    .map((fetcher) => {
      let id = Number(fetcher.key.slice('favorite:'.length))
      return { id, favorite: fetcher.formData?.get('favorite') === 'true' }
    })
    .reduce((map, { id, favorite }) => {
      map.set(id, favorite)
      return map
    }, new Map<number, boolean>())
}

function usePendingDeletes() {
  let fetchers = useFetchers()

  return fetchers
    .filter((fetcher) => fetcher.key.startsWith('destroy:'))
    .map((fetcher) => Number(fetcher.key.slice('destroy:'.length)))
}

function useSearching() {
  let location = useLocation()
  return new URLSearchParams(location.search).has('q')
}
