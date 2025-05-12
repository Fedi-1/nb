import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminStatsService, DashboardStats, MonthlyStats } from '../admin-stats.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, CurrencyPipe, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  dashboardStats: DashboardStats | null = null;
  monthlyStats: MonthlyStats | null = null;
  currentYear: number = new Date().getFullYear();
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // Chart configurations
  chartColors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63'];
  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  constructor(private statsService: AdminStatsService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadMonthlyStats(this.currentYear);
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    this.statsService.getDashboardStats().subscribe({
      next: (data) => {
        this.dashboardStats = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dashboard statistics';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadMonthlyStats(year: number): void {
    this.isLoading = true;
    this.statsService.getMonthlyStats(year).subscribe({
      next: (data) => {
        this.monthlyStats = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load monthly statistics';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onYearChange(): void {
    this.loadMonthlyStats(this.currentYear);
  }

  get sortedCities() {
    if (!this.dashboardStats) return [];
    return Object.entries(this.dashboardStats.cityDistribution)
      .sort((a, b) => b[1] - a[1]);
  }

  get sortedProducts() {
    return this.dashboardStats?.topProducts || [];
  }
  getMonthCount(monthNumber: number): number {
    if (!this.monthlyStats) return 0;
    return this.monthlyStats[monthNumber.toString()] || 0;
  }

  getBarWidth(monthNumber: number): string {
    if (!this.monthlyStats) return '0%';
    
    const maxCount = Math.max(...Object.values(this.monthlyStats));
    const currentCount = this.getMonthCount(monthNumber);
    
    if (maxCount === 0) return '0%';
    return `${(currentCount / maxCount) * 100}%`;
  }
}