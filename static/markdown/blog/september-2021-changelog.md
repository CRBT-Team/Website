---
title: September 2021 Update
description: Added activities, removed Music & NSFW commands, fixed a lot of bugs and removed all error messages
date: 2021-09-29
---

## Added

- Bad word detection in `//setname`, `//setbio` (in beta), alongside a new minimum length requirement.

#### Activities

These commands will allow you to start the following activities in a voice channel:

- `//chess`: Chess in the Park
- `//poker`: Poker Night
- `//betrayal`: Betrayal.io
- `//fishington`: Fishington.io

#### To-Do lists

Finally out of Experimental features, these commands will allow you to manage your own to-do list:

- `//addtodo`
- `//viewtodo`
- `//checktodo`
- `//cleartodo`

## Changed

- Increased loading speed of static data
- Bumped Aoi.js version to 4.5.0
- Made files shorter in size by optimizing their contents
- Moved `//youtube-together` from the Music module to Fun
- Renamed the "Basic" module to "General"
- Tweaked `//translate`'s appearance
- Added a new "Generic" error message to replace all Aoi.js' weird error messages
- Added a new "GitHub" button in `//crbt`, as well as in Discord Bots & top.gg's pages

## Fixed

- "Invalid message ID in [...]" in all places
- Several typos
- Updated ()help to have the Logs module, replacing Music.
- `//help general | settings` not showing "You can't disable this module."
- `//icon's usage recommending to use a user ID instead of a server ID
- `//mutedrole` doing weird shenanigans (experimental)

### Removed

- NSFW module
- Music module
- Experimental features
- Suggested commands in `//help`
