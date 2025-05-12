import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { commercant } from '../models/commercant';
import { CommercantService } from '../commercant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commercant',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './commercant.component.html',
  styleUrls: ['./commercant.component.css']
})
export class CommercantComponent {
  isUsersDropdownOpen = false;
  commercants: commercant[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(private commercantService: CommercantService) { }

  ngOnInit(): void {
    this.loadCommercants();
  }

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  loadCommercants(): void {
    this.commercantService.getAllCommercants().subscribe({
      next: (data) => this.commercants = data,
      error: (err) => console.error('Error loading commercants:', err)
    });
  }

 addCommercant(): void {
    Swal.fire({
      title: 'Ajouter un nouveau Commerçant',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">Prénom</label>
              <input id="swal-input1" class="swal2-input professional-input" placeholder="Jean">
            </div>
            <div class="form-group">
              <label for="swal-input2">Nom</label>
              <input id="swal-input2" class="swal2-input professional-input" placeholder="Dupont">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input4">Email</label>
              <input id="swal-input4" class="swal2-input professional-input" placeholder="jean.dupont@example.com" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input3">Mot de passe</label>
              <input id="swal-input3" class="swal2-input professional-input" placeholder="••••••••" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Âge</label>
              <input id="swal-input5" class="swal2-input professional-input" placeholder="35" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input7">Téléphone</label>
              <input id="swal-input7" class="swal2-input professional-input" placeholder="+33 6 12 34 56 78">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Ajouter',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        const nom = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const prenom = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const motdepasse = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const age = +(document.getElementById('swal-input5') as HTMLInputElement).value;
        const tlf = (document.getElementById('swal-input7') as HTMLInputElement).value;

        // Basic validation
        if (!nom || !prenom || !email || !motdepasse || !tlf) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        if (age < 18 || age > 120) {
          Swal.showValidationMessage('L\'âge doit être entre 18 et 120 ans');
          return false;
        }

        return {
          nom: nom,
          prenom: prenom,
          motdepasse: motdepasse,
          email: email,
          age: age,
          tlf: tlf,
          statut: 'commercant' // Hardcoded status
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        console.log('Creating commercant with data:', result.value);
        this.commercantService.createCommercant(result.value).subscribe({
          next: (newCommercant) => {
            this.commercants.push(newCommercant);
            Swal.fire({
              title: 'Succès!',
              text: 'Commerçant ajouté avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Error creating commercant:', err);
            Swal.fire({
              title: 'Erreur!',
              text: err.error?.message || 'Échec de l\'ajout du commerçant.',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  editCommercant(commercant: commercant): void {
    Swal.fire({
      title: 'Modifier le Commerçant',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">Prénom</label>
              <input id="swal-input1" class="swal2-input professional-input" value="${commercant.prenom}">
            </div>
            <div class="form-group">
              <label for="swal-input2">Nom</label>
              <input id="swal-input2" class="swal2-input professional-input" value="${commercant.nom}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input4">Email</label>
              <input id="swal-input4" class="swal2-input professional-input" value="${commercant.email}" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input3">Mot de passe</label>
              <input id="swal-input3" class="swal2-input professional-input" placeholder="Laisser vide pour ne pas changer" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Âge</label>
              <input id="swal-input5" class="swal2-input professional-input" value="${commercant.age}" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input7">Téléphone</label>
              <input id="swal-input7" class="swal2-input professional-input" value="${commercant.tlf}">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Enregistrer',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        const nom = (document.getElementById('swal-input2') as HTMLInputElement)?.value;
        const prenom = (document.getElementById('swal-input1') as HTMLInputElement)?.value;
        const motdepasse = (document.getElementById('swal-input3') as HTMLInputElement)?.value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement)?.value;
        const age = +(document.getElementById('swal-input5') as HTMLInputElement)?.value;
        const tlf = (document.getElementById('swal-input7') as HTMLInputElement)?.value;

        if (!nom || !prenom || !email || !tlf) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        if (age < 18 || age > 120) {
          Swal.showValidationMessage('L\'âge doit être entre 18 et 120 ans');
          return false;
        }

        return {
          idUser: commercant.idUser,
          nom: nom,
          prenom: prenom,
          motdepasse: motdepasse || commercant.motdepasse,
          email: email,
          age: age,
          tlf: tlf,
          statut: 'commercant' // Hardcoded status
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.commercantService.updateCommercant(commercant.idUser!, result.value).subscribe({
          next: (updatedCommercant) => {
            const index = this.commercants.findIndex(c => c.idUser === commercant.idUser);
            if (index !== -1) {
              this.commercants[index] = updatedCommercant;
            }
            Swal.fire({
              title: 'Mis à jour!',
              text: 'Commerçant modifié avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Error updating commercant:', err);
            Swal.fire({
              title: 'Erreur!',
              text: err.error?.message || 'Échec de la modification du commerçant.',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  deleteCommercant(commercant: commercant) {
    if (!commercant?.idUser) {
      Swal.fire({
        title: 'Erreur',
        text: 'Impossible de supprimer: ID manquant',
        icon: 'error',
        confirmButtonColor: '#F44336'
      });
      return;
    }

    Swal.fire({
      title: 'Confirmer la suppression',
      html: `Êtes-vous sûr de vouloir supprimer <strong>${commercant.nom} ${commercant.prenom}</strong> ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#F44336',
      cancelButtonText: 'Annuler',
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-delete-btn',
        cancelButton: 'professional-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.commercantService.deleteCommercant(commercant.idUser!).subscribe({
          next: () => {
            this.commercants = this.commercants.filter(c => c.idUser !== commercant.idUser);
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le commerçant a été supprimé.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire({
              title: 'Erreur',
              text: err.error?.message || 'Échec de la suppression du commerçant',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  searchCommercant(): void {
    if (!this.searchQuery.trim()) {
      this.loadCommercants();
      this.isSearchActive = false;
      return;
    }

    this.isSearchActive = true;
    this.commercantService.searchCommercants(this.searchQuery).subscribe({
      next: (data) => this.commercants = data,
      error: (err) => console.error('Error searching commercants:', err)
    });
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchCommercant();
    }
  }
}