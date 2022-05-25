import { writable } from 'svelte/store';

export const loggedin = writable(false);
export const isAdmin = writable(null)

export const PointOnMap = writable(null);

export const SelectedPOI = writable(null);

export const setImage = writable(null);
export const showReviews = writable(null)
