import { atom } from "recoil";
import {  Movie} from "../types";

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
	default: [] as Movie[]
}) 

export const watchedMediaState = atom ({
	key: 'watchedMediaState',
	default: [] as Movie[],
}) 

export const tvshowDataState = atom ({
	key: 'tvShowDataState',
	default: [] as Movie[],
}) 

export const movieDataState = atom ({
	key: 'movieDataState',
	default: [] as Movie[],
}) 

export const isClickedState = atom ({
	key: 'isClickedState',
	default: false,
}) 

export const clickedMediaState = atom ({
	key: 'clickedMediaState',
	default: {
		id: null,
		media_type: '',
		overview: '',
		poster_path: '',
		release_date: '',
		title: '',
		vote_average: null,
		vote_count: null,
	},
}) 

export const isValidEmailAtom = atom({
	key: 'isValidEmail', 
	default: false, 
})

export const errorMessageAtom = atom({
    key: 'error', 
    default: { 
		email: '', 
		password: ''
	}
}); 





 