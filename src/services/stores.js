import { writable } from 'svelte/store';

export const loggedin = writable(false);

export const PointOnMap = writable(null);

export const SelectedPOI = writable(null);