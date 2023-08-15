import { api } from "components/api/agent";

export const PROFILE = "/profile";
export const MY_APPLICTONS = "/StartProcessing";
export const PROCESSES = "/processes";
export const APPLICATIONS = "/applications";
export const INSTRUCTIONS = "/instruction";

export const SUBSTITUTE = "/substitute";

const url = new URL(api || "").host;

export const CARDS = `https://${url}/Admin_CardsPlasticOrdering`;
