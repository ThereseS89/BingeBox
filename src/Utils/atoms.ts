import { atom } from "recoil";
import { Media} from "../types";

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
	default: [] as Media[]
}) 

export const watchedMediaState = atom ({
	key: 'watchedMediaState',
	default: [] as Media[],
}) 

export const isClickedState = atom ({
	key: 'isClickedState',
	default: false,
}) 

export const clickedMediaState = atom ({
	key: 'clickedMediaState',
	default: {
		id: null ,
		Name: '',
		Genre: '',
		Duration: '',
		PremiereYear: null,
		ShortDescription: '',
		Actors: [''],
		Image: '',
	},
}) 
 