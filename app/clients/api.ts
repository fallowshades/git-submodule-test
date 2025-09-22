/**
 * This is the API client, a class that is in charge of making the requests to
 * the API. It extends `BaseClient` to get some useful methods like `get`,
 * `post`, `patch`, and `delete`.
 *
 * The class is instantiated with the access token, which is used to
 * authenticate the requests. The access token is passed in the `Authorization`
 * header of the request automatically, so any instance of the class can be used
 * to make authenticated requests to the API automatically.
 *
 * This is similar to how Axios works, but with a more modern approach using
 * the Fetch API.
 * @module
 * @author Sergio Xalambrí
 * @copyright
 */
import { APIClient as BaseClient } from "@edgefirst-dev/api-client";
import { z } from "zod";
import * as Curriculum from "~/entities/curriculum";
// import env from "~/env";

export class APIClient extends BaseClient {
	constructor(protected accessToken: string) {
		const resourceHost = process.env.RESOURCE_HOST;
		if (!resourceHost) {
			throw new Error("RESOURCE_HOST environment variable is not defined");
		}
		super(new URL(resourceHost));
	}

	override async before(request: Request) {
		request.headers.set("Authorization", `Bearer ${this.accessToken}`);
		return request;
	}

	override async after(_: Request, response: Response) {
		if (response.ok) return response;
		let data = await response.json();
		let { error } = z.object({ error: z.string() }).parse(data);
		throw new Error(error);
	}

	async contacts(query?: string) {
		let response = query
			? await this.get(`/contacts?q=${encodeURIComponent(query.trim())}`)
			: await this.get("/contacts");
		let data = await response.json();
        return z.object({ contacts: z.array(Curriculum.curriculumSchema) }).parse(data).contacts;
	}

	async contact(id: number) {
		function _sanitizeUrl(url: string): string {
			if (!url) return "";
			let trimmed = url.trim();
			if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
				return `https://${trimmed}`; // or handle differently
			}
			return trimmed;
		}

		let response = await this.get(`/contacts?id=${encodeURIComponent(id)}`);
		let data = await response.json();
		console.log("Contacts raw data", data);

		// // Sanitize avatar URLs before validation
		// data.contacts = data.contacts.map((contact: { avatar: string }) => ({
		// 	...contact,
		// 	avatar: sanitizeUrl(contact.avatar),
		// }));

		 return z.object({ contacts: z.array(Curriculum.curriculumSchema) }).parse(data).contacts;

		// const parsed = z
		// 	.object({ contacts: z.array(Contact.Schema) })
		// 	.safeParse(data);
		// if (!parsed.success) {
		// 	console.error(parsed.error.format());
		// 	return []; // or handle error state
		// }
		// return parsed.data.contacts;
	}

	async createContact(input:Curriculum.InputType) {
		let response = await this.post("/contacts", {
			body: JSON.stringify(input),
		});
		let data = await response.json();
		 return z.object({ contacts: z.array(Curriculum.curriculumSchema) }).parse(data).contacts;
	}

	async updateContact(id: number, input: Curriculum.InputType) {
		let response = await this.patch(`/contacts?id=${encodeURIComponent(id)}`, {
			body: JSON.stringify(input),
		});
		let data = await response.json();
		 return z.object({ contacts: z.array(Curriculum.curriculumSchema) }).parse(data).contacts;
	}

	async deleteContact(id: number) {
		await this.delete(`/contacts?id=${encodeURIComponent(id)}`);
	}
}
