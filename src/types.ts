

export interface Movie {
	mediaId: string,
	imageposter: string;
	name: string;
	original_name: string;
	backdrop_path: string;
	genre_ids: number[];
	id: string;
	media_type: string;
	mediaType: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	first_air_date: string;
	profile_path: string;
  }


  export interface myList {

		items: Movie[]
  }

export interface Media {
	id: string;
    Name: string;
    Genre: string;
    Duration: string;
    PremiereYear: number;
    ShortDescription: string;
    Actors: string[];
    Image: string;
}

export interface myListMovie {
	id: string;
	media_type: string;
	poster_path: string;
	title: string;
}

export interface Saved {
	id: string; 
	saved: boolean; 
  }


	
export interface MediaDetails {
		mediaId: string,
		imageposter: string;
		name: string;
		original_name: string;
		genre_ids: number[];
		backdrop_path: string;
		belongs_to_collection: null;
		budget: number;
		genres: Genre[];
		homepage: string;
		id: string;
		imdb_id: string;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: ""[];
		production_countries: ""[];
		release_date: string;
		revenue: number;
		runtime: number;
		episode_run_time: string;
		seasons: number;
		spoken_languages: ""[];
		status: string;
		tagline: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
		media_type: string;
		PremiereYear: string;
		first_air_date: string;
	}

	interface Genre {
		id: number;
		name: string;
	}

	export interface Actors extends Actor {
		cast: Actor[]
		name: string
	}

	export interface Actor {
		name: string;
	}
	

	export interface SelectedMedia extends Movie {
		adult: boolean;
		backdrop_path: string;
		belongs_to_collection: null,
		budget: number;
		genres: Genre[];
		homepage: string;
		id: string;
		imdb_id: string;
		media_type: string;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: ProductionCompany[];
		production_countries: ProductionCountry[];
		release_date: string;
		revenue: number;
		runtime: number;
		spoken_languages: SpokenLanguage[];
		status: string;
		tagline: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
		seasons: string;
		PremiereYear: string;
		first_air_date: string;
		episode_run_time: string;

	}


	
	interface Genre {
		id: number;
		name: string;
	}
	
	interface ProductionCompany {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}
	
	interface ProductionCountry {
		iso_3166_1: string;
		name: string;
	}
	
	interface SpokenLanguage {
		english_name: string;
		iso_639_1: string;
		name: string;
	}

 
	