import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  // Existing methods
  login(email: string, motdepasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, motdepasse }).pipe(
      tap((response: any) => {
        sessionStorage.setItem('connectedUser', JSON.stringify(response));
      })
    );
  }

  registerClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerClient`, clientData);
  }

  registerCommercant(commercantData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerCommercant`, commercantData);
  }
  
  registerLivreur(livreurData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerLivreur`, livreurData);
  }

  // New methods for client management
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  updateClient(clientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients/${clientData.id}`, clientData);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }
}