import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Livreur } from '../models/livreur';
import { LivreurService } from '../livreur.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livreur',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent {
  isUsersDropdownOpen = false;
  livreurs: Livreur[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(
    private livreurService: LivreurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLivreurs();
  }

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  loadLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe({
      next: (data) => this.livreurs = data,
      error: (err) => {
        console.error('Error loading livreurs:', err);
        Swal.fire('Erreur', 'Échec du chargement des livreurs', 'error');
      }
    });
  }

  addLivreur(): void {
    Swal.fire({
      title: 'Ajouter un nouveau Livreur',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">Nom</label>
              <input id="swal-input1" class="swal2-input professional-input" placeholder="Dupont">
            </div>
            <div class="form-group">
              <label for="swal-input2">Prénom</label>
              <input id="swal-input2" class="swal2-input professional-input" placeholder="Jean">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input3">Email</label>
              <input id="swal-input3" class="swal2-input professional-input" placeholder="jean.dupont@example.com" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input4">Mot de passe</label>
              <input id="swal-input4" class="swal2-input professional-input" placeholder="••••••••" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Âge</label>
              <input id="swal-input5" class="swal2-input professional-input" placeholder="35" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input6">Téléphone</label>
              <input id="swal-input6" class="swal2-input professional-input" placeholder="+33 6 12 34 56 78">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="swal-input7">Tarif Livraison</label>
              <input id="swal-input7" class="swal2-input professional-input" placeholder="10.50" type="number" min="0" step="0.01">
            </div>
            <div class="form-group">
              <label for="swal-input8">Tarif Retour</label>
              <input id="swal-input8" class="swal2-input professional-input" placeholder="8.00" type="number" min="0" step="0.01">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Ajouter',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      preConfirm: () => {
        const nom = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const prenom = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const motdepasse = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const age = Number((document.getElementById('swal-input5') as HTMLInputElement).value);
        const tlf = (document.getElementById('swal-input6') as HTMLInputElement).value;
        const tarif_livraison = parseFloat((document.getElementById('swal-input7') as HTMLInputElement).value);
        const tarif_retour = parseFloat((document.getElementById('swal-input8') as HTMLInputElement).value);

        if (!nom || !prenom || !email || !motdepasse || !tlf || isNaN(age) || isNaN(tarif_livraison) || isNaN(tarif_retour)) {
          Swal.showValidationMessage('Veuillez remplir tous les champs correctement');
          return false;
        }

        if (age < 18 || age > 120) {
          Swal.showValidationMessage('L\'âge doit être entre 18 et 120 ans');
          return false;
        }

        return {
          nom,
          prenom,
          email,
          motdepasse,
          age,
          tlf,
          tarifLivraison: tarif_livraison,
          tarifRetour: tarif_retour,
          tarif_retour,
          statut: 'livreur'
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.livreurService.createLivreur(result.value).subscribe({
          next: (newLivreur) => {
            this.livreurs.push(newLivreur);
            Swal.fire({
              title: 'Succès!',
              text: 'Livreur ajouté avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Error creating livreur:', err);
            let errorMessage = 'Échec de l\'ajout du livreur';
            if (err.error && err.error.message) {
              errorMessage += `: ${err.error.message}`;
            } else if (err.status === 400) {
              errorMessage += ': Données invalides';
            }
            Swal.fire({
              title: 'Erreur!',
              text: errorMessage,
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  editLivreur(livreur: Livreur): void {
    Swal.fire({
      title: 'Modifier le Livreur',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">Prénom</label>
              <input id="swal-input1" class="swal2-input professional-input" value="${livreur.prenom}">
            </div>
            <div class="form-group">
              <label for="swal-input2">Nom</label>
              <input id="swal-input2" class="swal2-input professional-input" value="${livreur.nom}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input4">Email</label>
              <input id="swal-input4" class="swal2-input professional-input" value="${livreur.email}" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input3">Mot de passe</label>
              <input id="swal-input3" class="swal2-input professional-input" placeholder="Laisser vide pour ne pas changer" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Âge</label>
              <input id="swal-input5" class="swal2-input professional-input" value="${livreur.age}" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input7">Téléphone</label>
              <input id="swal-input7" class="swal2-input professional-input" value="${livreur.tlf}">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="swal-input8">Tarif Livraison</label>
              <input id="swal-input8" class="swal2-input professional-input" value="${livreur.tarifLivraison}" type="number" min="0" step="0.01">
            </div>
            <div class="form-group">
              <label for="swal-input9">Tarif Retour</label>
              <input id="swal-input9" class="swal2-input professional-input" value="${livreur.tarifRetour}" type="number" min="0" step="0.01">
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
        const tarif_livraison = +(document.getElementById('swal-input8') as HTMLInputElement)?.value;
        const tarif_retour = +(document.getElementById('swal-input9') as HTMLInputElement)?.value;

        if (!nom || !prenom || !email || !tlf || isNaN(tarif_livraison) || isNaN(tarif_retour)) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        if (age < 18 || age > 120) {
          Swal.showValidationMessage('L\'âge doit être entre 18 et 120 ans');
          return false;
        }

        if (tarif_livraison < 0 || tarif_retour < 0) {
          Swal.showValidationMessage('Les tarifs doivent être positifs');
          return false;
        }

        return {
          idUser: livreur.idUser,
          nom: nom,
          prenom: prenom,
          motdepasse: motdepasse || livreur.motdepasse,
          email: email,
          age: age,
          tlf: tlf,
          statut: 'livreur',
          tarifLivraison: tarif_livraison,
          tarifRetour: tarif_retour
        } as Livreur;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.livreurService.updateLivreur(livreur.idUser!, result.value).subscribe({
          next: (updatedLivreur) => {
            const index = this.livreurs.findIndex(l => l.idUser === livreur.idUser);
            if (index !== -1) {
              this.livreurs[index] = updatedLivreur;
            }
            Swal.fire({
              title: 'Mis à jour!',
              text: 'Livreur modifié avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Error updating livreur:', err);
            Swal.fire({
              title: 'Erreur!',
              text: err.error?.message || 'Échec de la modification du livreur.',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  deleteLivreur(livreur: Livreur) {
    if (!livreur?.idUser) {
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
      html: `Êtes-vous sûr de vouloir supprimer <strong>${livreur.nom} ${livreur.prenom}</strong> ?`,
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
        this.livreurService.deleteLivreur(livreur.idUser!).subscribe({
          next: () => {
            this.livreurs = this.livreurs.filter(l => l.idUser !== livreur.idUser);
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le livreur a été supprimé.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire({
              title: 'Erreur',
              text: err.error?.message || 'Échec de la suppression du livreur',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  searchLivreur(): void {
    if (!this.searchQuery.trim()) {
      this.loadLivreurs();
      this.isSearchActive = false;
      return;
    }

    this.isSearchActive = true;
    this.livreurService.searchLivreurs(this.searchQuery).subscribe({
      next: (data) => this.livreurs = data,
      error: (err) => console.error('Error searching livreurs:', err)
    });
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchLivreur();
    }
  }

  updateStatus(livreur: Livreur, newStatus: string): void {
    this.livreurService.updateLivreurStatut(livreur.idUser!, newStatus).subscribe({
      next: (updated) => {
        const index = this.livreurs.findIndex(l => l.idUser === updated.idUser);
        if (index !== -1) {
          this.livreurs[index] = updated;
        }
        Swal.fire({
          title: 'Statut mis à jour!',
          text: '',
          icon: 'success',
          confirmButtonColor: '#4CAF50'
        });
      },
      error: (err) => {
        console.error('Error updating status:', err);
        Swal.fire({
          title: 'Erreur',
          text: 'Échec de la mise à jour du statut',
          icon: 'error',
          confirmButtonColor: '#F44336'
        });
      }
    });
  }
}