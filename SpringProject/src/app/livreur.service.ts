import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livreur } from './models/livreur';


@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private apiUrl = 'http://localhost:8081/api/livreurs';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllLivreurs(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createLivreur(livreur: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(this.apiUrl, livreur, { headers: this.getHeaders() });
  }

  getLivreurById(id: number): Observable<Livreur> {
    return this.http.get<Livreur>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateLivreur(id: number, livreurDetails: Livreur): Observable<Livreur> {
    return this.http.put<Livreur>(`${this.apiUrl}/${id}`, livreurDetails, { headers: this.getHeaders() });
  }

  deleteLivreur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  searchLivreurs(query: string): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.apiUrl}/search?query=${query}`, { headers: this.getHeaders() });
  }

  getLivreursByStatut(statut: string): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.apiUrl}/statut/${statut}`, { headers: this.getHeaders() });
  }

  updateLivreurStatut(id: number, newStatut: string): Observable<Livreur> {
    return this.http.patch<Livreur>(`${this.apiUrl}/${id}/statut`, { statut: newStatut }, { headers: this.getHeaders() });
  }

  getLivreursByTarif(maxTarif: number): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.apiUrl}/tarif?max=${maxTarif}`, { headers: this.getHeaders() });
  }

  updateTarifs(id: number, nouveauTarifLivraison: number, nouveauTarifRetour: number): Observable<Livreur> {
    return this.http.patch<Livreur>(`${this.apiUrl}/${id}/tarifs`, 
      { 
        tarif_livraison: nouveauTarifLivraison, 
        tarif_retour: nouveauTarifRetour 
      }, 
      { headers: this.getHeaders() }
    );
  }
}