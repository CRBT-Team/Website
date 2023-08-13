import type { JoinLeaveData } from '$lib/types/messageBuilder';
import { writable } from 'svelte/store';

export const messageState = writable<Partial<JoinLeaveData>>();
