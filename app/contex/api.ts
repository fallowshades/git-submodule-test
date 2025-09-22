import { createContext } from "react-router";;
import type { APIClient } from "~/clients/api";

export const apiContext = createContext<APIClient>();
