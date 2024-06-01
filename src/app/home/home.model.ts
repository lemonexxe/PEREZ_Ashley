

export class User {
    id: string;
    main: string;
    side: string;
    Drinks: string[] = [];
    preferred: boolean = false;
   
    
    constructor(id: string = '', main: string = '', side: string = '', preferred: boolean = false, Drinks: string[] = []) {
        this.id = id;
        this.main = main;
        this.side = side;
        this.Drinks = Drinks;
        this.preferred = preferred;
     
    }
}

export interface iUser {
    id: string;
    main: string;
    side: string;
    Drinks: string[]
    preferred: boolean;
    
}
