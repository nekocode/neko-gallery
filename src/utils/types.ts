import type { RestEndpointMethodTypes } from "@octokit/rest";

export type User = RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"];

export type Repo = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];
