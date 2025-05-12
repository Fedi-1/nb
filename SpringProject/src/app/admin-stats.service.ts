import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalClients: number;
  totalOrders: number;
  totalRevenue: number;
  cityDistribution: { [city: string]: number };
  topProducts: Array<{ name: string, count: number }>;
}

export interface MonthlyStats {
  [month: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {
  private baseUrl = 'http://localhost:8081/api/admin/stats';

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard`);
  }

  getMonthlyStats(year: number): Observable<MonthlyStats> {
    return this.http.get<MonthlyStats>(`${this.baseUrl}/monthly`, {
      params: { year: year.toString() }
    });
  }
}