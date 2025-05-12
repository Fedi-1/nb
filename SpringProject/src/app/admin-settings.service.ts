import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUpdateDTO {
  idUser?: number;
  nom: string;
  prenom: string;
  age: number;
  tlf: string;
  email: string;
  statut: string;
  motdepasse: string;
  photodeprofil?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private apiUrl = 'http://localhost:8081/api/admin/settings';

  constructor(private http: HttpClient) { }

  getAdminDetails(id: number): Observable<AdminUpdateDTO> {
    return this.http.get<AdminUpdateDTO>(`${this.apiUrl}/${id}`);
  }

  updateAdminDetails(id: number, updateData: AdminUpdateDTO): Observable<AdminUpdateDTO> {
    return this.http.put<AdminUpdateDTO>(`${this.apiUrl}/${id}`, updateData);
  }
}