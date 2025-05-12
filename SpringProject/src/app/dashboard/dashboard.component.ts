import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule,RouterModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isUsersDropdownOpen = false;
  notifications = [
    { id: 1, message: 'Nouvelle commande reçue', read: false },
    { id: 2, message: 'Mise à jour du système disponible', read: false },
    { id: 3, message: 'Rapport mensuel généré', read: true }
  ];

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  closeDropdowns(): void {
    this.isUsersDropdownOpen = false;
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }
}