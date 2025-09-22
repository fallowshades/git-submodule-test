import { JWT } from "@edgefirst-dev/jwt";

export class IDToken extends JWT {
	override get issuer() {
		return this.parser.string("iss");
	}

	override get subject() {
		return this.parser.string("sub");
	}

	get email() {
		return this.parser.string("email");
	}
}
//pnpm add @edgefirst-dev/jwt