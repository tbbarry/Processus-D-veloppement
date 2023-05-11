export class Exercice {
    constructor(public codeModule: string,
                public titre: string,
                public description?: string,
                public duree?: string,
                public types?: string,
                public lienDoc?: string,
                public etat?: number,
                public dateDebutPrevue?: Date,
                public dateDebutReelle?: Date,
                public dateFinPrevue?: Date,
                public dateFinReelle?: Date,
                public commentaireStagiaire?: string,
                public commentaireCoach?: string,
                public notification?: string
                 ) {

    }
}