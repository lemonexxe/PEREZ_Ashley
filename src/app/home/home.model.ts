

export class User {
    id: string;
    title: string;
    Writer: string;
    genres: string[] = [];
    releaseDate: Date;
    isRated: boolean = false;
   
    
    constructor(id: string = '', title: string = '', artist: string = '', streams: number = 0, releaseDate: Date = new Date(), isRated: boolean = false, genres: string[] = []) {
        this.id = id;
        this.title = title;
        this.Writer = artist;
        this.genres = genres;
        this.releaseDate = releaseDate;
        this.isRated = isRated;
     
    }
}

export interface iUser {
    id: string;
    title: string;
    Writer: string;
    genres: string[]
    releaseDate: Date;
    isRated: boolean;
    
}
