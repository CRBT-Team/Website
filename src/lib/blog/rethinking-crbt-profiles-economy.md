---
category: Announcement
title: Rethinking CRBT Profiles & Economy
description: The future of CRBT and its Profiles & Economy features.
author: Clembs
date: 2022-04-24
minutes: 5
---

<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte'; import BlogHeader from
	'$lib/components/BlogHeader.svelte';
</script>

<MetaTags title={title} description={description} />
<BlogHeader metadata={metadata} />

Hi CRBT fans,

It has been a while since I've been thinking of repurposing the CRBT Profiles system you all know and love.

## The background

"CRBT Profiles" was originally designed back in 2020, when Discord's own profile system was very lacking and where you essentially just had avatars & usernames.

Flash forward to 2022, and Discord has added profile banners, bios ("About Me"), pronouns and per-server profiles. This made making profiles more accessible and now everyone can check anyone's profile from a single click, which is awesome, but also makes CRBT Profiles basically obsolete.

CRBT Profiles still have their own distinctive features, namely the "Birthday" and "Website" fields, and I had planned to integrate them more into the ecosystem with the addition of profile vanity URLs (e.g. https://crbt.app/@Clembs would bring up my CRBT Profile page).

Other cool features I was planning on adding back were Profile Badges & Banners, which would've given a use for the Purplet economy, which you all have been farming to death lately (it's crazy how dedicated some users are).

But I realized those features weren't enough to make the CRBT Profiles rivalize the Discord profiles. I designed CRBT as an extension of Discord, not as its concurrent, thus I had to rethink the way I wanted to make the CRBT Profiles system and the Economy, because if Profiles were obsolete, it would've not made any sense to keep them as is.

So here's my plan for CRBT v11:

### Web Profiles & Discovery

I will make CRBT Profiles a web-based system, where users can link to their Discord profiles with a vanity URL of their choice + some extra CRBT Profile stuff Discord was lacking (like the "Birthday" field).

So theoretically, users will be able to visit https://crbt.app/@Clembs and get a mix of my Discord profile, with some CRBT-specific fields thrown in there.

Profiles will also be made public, allowing for a way to search them in the CRBT web app. This has been a growing pain in the Discord community, so I'm hoping to make user discovery easy.

As for CRBT Badges, I'm not sure if I'll keep them, though I can maybe keep them in the `/user info` page (with a special "OG" badge & "Purplet" badge for people who got Purplets before it shutting down).

### Per-server Economy

This leads me to the second point: Economy, or more specifically, the global Purplet economy.

As you know, for now the Purplets are essentially useless as the CRBT Store has not been implemented yet. But the purpose of the Store was to sell Profile badges & banners. Therefore this leaves us with badges which, while cool, probably don't justify the whole CRBT Profile & Economy systems at all.

I've been thinking for a while about making a per-server economy system, where server owners & admins could create their own stores to sell roles, boosters, and other kinds of stuff, which would be way more interesting.

## The future

Starting from today, CRBT Profiles & Economy commands are going to be read-only until the next update in May, where they'll be gradually be removed in favor of those two new modules.

I've also started to clean up CRBT from the inside out to only keep the features that matter and to focus on newer stuff like [Role Pickers, Localizations & Moderation](/blog/11.5-changelog).

If you have any questions, please feel free to join our [Community server](/discord) and ask away!
