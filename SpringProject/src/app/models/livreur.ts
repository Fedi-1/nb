export interface Livreur {
    idUser?: number;
    nom: string;
    prenom: string;
    age: number;
    tlf: string;
    email: string;
    statut: string;
    motdepasse: string;
    tarifLivraison: number;
    tarifRetour: number;
    photodeprofil?: string;
}