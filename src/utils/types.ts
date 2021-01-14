import type { RestEndpointMethodTypes } from "@octokit/rest";

export type Repo = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];
