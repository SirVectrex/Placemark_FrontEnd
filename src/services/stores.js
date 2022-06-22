import { writable } from 'svelte/store';

export const loggedin = writable(false);
export const isAdmin = writable(null)
export const currentUserName = writable(null);

export const PointOnMap = writable(null);

export const SelectedPOI = writable(null);

export const setImage = writable(null);
export const showReviews = writable(null)
export const newPOI = writable(null);
export const reload_map = writable(false);