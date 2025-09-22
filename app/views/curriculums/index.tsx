
import { href, redirect } from "react-router";
import { getAPIClient } from "~/middleware/api-client"
import type { Route } from "./+types/index";

export async function loader({ context }: Route.LoaderArgs) {
	let api = getAPIClient(context);
	let contacts = await api.contacts();
	let contact = contacts.at(0);
	if (!contact) return redirect(href("/contacts/new"));
	return redirect(
		href("/curriculums/:contactId", { contactId: contact.id.toString() }),
	);
}