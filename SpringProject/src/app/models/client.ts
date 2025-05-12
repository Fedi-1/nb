export interface Client {
  idUser?: number;
  nom: string;
  prenom: string;
  age: number;
  tlf: string;
  email: string;
  statut: string;
  motdepasse: string;
  photodeprofil?: string;
  adresse: string;
  codePostale: string;
  zip: string;
}