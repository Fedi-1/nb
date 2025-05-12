import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminSettingsService, AdminUpdateDTO } from '../admin-settings.service';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  showPassword: boolean = false;
  adminData: AdminUpdateDTO = {
    nom: '',
    prenom: '',
    age: 0,
    tlf: '',
    email: '',
    statut: '',
    motdepasse: '',
    photodeprofil: ''
  };
  errorMessage: string = '';
  successMessage: string = '';
  adminId: number = 1; // Should come from authentication service

  constructor(
    private adminSettingsService: AdminSettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAdminData();
  }

  loadAdminData(): void {
    this.adminSettingsService.getAdminDetails(this.adminId)
      .subscribe({
        next: (data) => {
          this.adminData = {
            ...data,
            motdepasse: ''
          };
        },
        error: (error) => {
          console.error('Error loading admin data:', error);
          this.errorMessage = 'Échec du chargement des données. Veuillez réessayer.';
        }
      });
  }

  saveSettings(): void {
    // Basic validation
    if (!this.adminData.prenom || !this.adminData.nom) {
      this.errorMessage = 'Le prénom et le nom sont obligatoires.';
      return;
    }

    if (!this.adminData.email) {
      this.errorMessage = 'L\'email est obligatoire.';
      return;
    }

    const updateData: AdminUpdateDTO = {
      idUser: this.adminId,
      nom: this.adminData.nom,
      prenom: this.adminData.prenom,
      age: this.adminData.age,
      tlf: this.adminData.tlf,
      email: this.adminData.email,
      statut: this.adminData.statut,
      motdepasse: this.adminData.motdepasse,
      photodeprofil: this.adminData.photodeprofil
    };

    this.adminSettingsService.updateAdminDetails(this.adminId, updateData)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Modifications enregistrées avec succès!';
          this.errorMessage = '';
          // Reload data without password
          this.loadAdminData();
        },
        error: (error) => {
          console.error('Error updating admin settings:', error);
          this.errorMessage = 'Échec de la mise à jour. Veuillez réessayer.';
          this.successMessage = '';
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}