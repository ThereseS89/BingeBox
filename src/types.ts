export interface Movie {
	name: string;
	original_name: string;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
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