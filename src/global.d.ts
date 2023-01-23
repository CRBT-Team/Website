/// <reference types="@sveltejs/kit" />
/// <reference types="svelte-gestures" />

import type { Rest } from "@purplet/rest";
import type { APIUser, RESTGetAPICurrentUserGuildsResult } from "discord-api-types/v10";

declare namespace App {
  interface Locals {
    rest: Rest;
    user: APIUser;
    guilds: RESTGetAPICurrentUserGuildsResult;
  }
}