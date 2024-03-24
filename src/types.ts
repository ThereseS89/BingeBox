

export interface Movie {
	name: string;
	original_name: string;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
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
	id: number;
    Name: string;
    Genre: string;
    Duration: string;
    PremiereYear: number;
    ShortDescription: string;
    Actors: string[];
    Image: string;
}

export interface myListMovie {
	id: number;
	media_type: string;
	poster_path: string;
	title: string;
}

export interface Saved {
	id: string; 
	saved: boolean; 
  }


	
export interface MediaDetails {
		backdrop_path: string;
		belongs_to_collection: null;
		budget: number;
		genres: Genre[];
		homepage: string;
		id: number;
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
		seasons: number;
		spoken_languages: ""[];
		status: string;
		tagline: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	}

	interface Genre {
		id: number;
		name: string;
	}

	export interface Actors {
		cast: Actor[]
	}

	interface Actor {
		name: string;
	}