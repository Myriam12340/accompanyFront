export class Mission {
    id: number | null;
    consultant: number;
    manager:number;
    titre?:string | null;
    nom : string ;
    nomManager:string | null;
    manageremail:string|null ;
    date_debut: Date;
    date_fin: Date;

    couleur: string;
    evaluations : any ;
    nbeval : any ;
 old : boolean;
}
