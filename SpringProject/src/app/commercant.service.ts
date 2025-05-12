import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { commercant } from './models/commercant';

@Injectable({
  providedIn: 'root'
})
export class CommercantService {

  private apiUrl = 'http://localhost:8081/api/commercants';
  
  constructor(private http: HttpClient) { }

  getAllCommercants(): Observable<commercant[]> {
    return this.http.get<commercant[]>(this.apiUrl);
  }

  createCommercant(commercant: commercant): Observable<commercant> {
    return this.http.post<commercant>(this.apiUrl, commercant);
  }

  getCommercantById(id: number): Observable<commercant> {
    return this.http.get<commercant>(`${this.apiUrl}/${id}`);
  }

  updateCommercant(id: number, commercant: commercant): Observable<commercant> {
    return this.http.put<commercant>(`${this.apiUrl}/${id}`, commercant);
  }

  deleteCommercant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCommercants(query: string): Observable<commercant[]> {
    return this.http.get<commercant[]>(`${this.apiUrl}/search?query=${query}`);
  }
}