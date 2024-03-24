
import { atom, atomFamily } from "recoil";
import {  Actors, MediaDetails, Movie, Saved} from "../types";

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


export const savedToListState = atom<Record<string, boolean>>({
	key: 'savedToListState',
	default: {},
});

export const savedToWatchedState = atom<Record<string, boolean>>({
	key: 'savedToWatchedState',
	default: {},
})

export const clickedMediaState = atom ({
	key: 'clickedMediaState',
	default: [] as MediaDetails[],
}) 

export const actorsState = atom ({
	key: 'actorsState',
	default: [] as Actors[] ,
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

export const layoutState = atom ({
	key: 'layoutState',
	default: true,
}) 





 