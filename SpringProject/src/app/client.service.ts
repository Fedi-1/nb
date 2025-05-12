import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id_user?: number;
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

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8081/api/clients';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchClients(query: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/search?query=${query}`);
  }
}