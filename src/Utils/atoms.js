import { atom } from "recoil";

export const isOverlayState = atom ({
	key: 'isOverlayState',
	default: false,
})

export const isLoggedInState = atom ({
	key: 'isLoggedInState',
	default: false,
})

export const showNavState = atom ({
	key: 'showNavState',
	default: false,
})

export const myListState = atom ({
	key: 'myListState',
	default: []
}) 

export const watchedMediaState = atom ({
	key: 'watchedMediaState',
	default: [],
}) 

 