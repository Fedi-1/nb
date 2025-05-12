import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  isUsersDropdownOpen = false;
  clients: Client[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error loading clients:', err)
    });
  }

  addClient(): void {
    Swal.fire({
      title: 'Add New Client',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">First Name</label>
              <input id="swal-input1" class="swal2-input professional-input" placeholder="John">
            </div>
            <div class="form-group">
              <label for="swal-input2">Last Name</label>
              <input id="swal-input2" class="swal2-input professional-input" placeholder="Doe">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input4">Email</label>
              <input id="swal-input4" class="swal2-input professional-input" placeholder="john.doe@example.com" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input3">Password</label>
              <input id="swal-input3" class="swal2-input professional-input" placeholder="••••••••" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Age</label>
              <input id="swal-input5" class="swal2-input professional-input" placeholder="30" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input7">Phone</label>
              <input id="swal-input7" class="swal2-input professional-input" placeholder="+1 234 567 8900">
            </div>
          </div>
          
          <div class="form-group full-width">
            <label for="swal-input6">Address</label>
            <input id="swal-input6" class="swal2-input professional-input" placeholder="123 Main St">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input8">Postal Code</label>
              <input id="swal-input8" class="swal2-input professional-input" placeholder="12345">
            </div>
            <div class="form-group">
              <label for="swal-input9">ZIP Code</label>
              <input id="swal-input9" class="swal2-input professional-input" placeholder="10001">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Add Client',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        return {
          nom: (document.getElementById('swal-input2') as HTMLInputElement).value,
          prenom: (document.getElementById('swal-input1') as HTMLInputElement).value,
          motdepasse: (document.getElementById('swal-input3') as HTMLInputElement).value,
          email: (document.getElementById('swal-input4') as HTMLInputElement).value,
          age: +(document.getElementById('swal-input5') as HTMLInputElement).value,
          adresse: (document.getElementById('swal-input6') as HTMLInputElement).value,
          tlf: (document.getElementById('swal-input7') as HTMLInputElement).value,
          codePostale: (document.getElementById('swal-input8') as HTMLInputElement).value,
          zip: (document.getElementById('swal-input9') as HTMLInputElement).value,
          statut: 'client'
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.clientService.createClient(result.value).subscribe({
          next: (newClient) => {
            this.clients.push(newClient);
            Swal.fire({
              title: 'Success!',
              text: 'Client added successfully.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => Swal.fire({
            title: 'Error!',
            text: 'Failed to add client.',
            icon: 'error',
            confirmButtonColor: '#F44336'
          })
        });
      }
    });
  }

  editClient(client: Client): void {
    Swal.fire({
      title: 'Edit Client',
      html: `
        <div class="professional-form">
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input1">First Name</label>
              <input id="swal-input1" class="swal2-input professional-input" value="${client.prenom}">
            </div>
            <div class="form-group">
              <label for="swal-input2">Last Name</label>
              <input id="swal-input2" class="swal2-input professional-input" value="${client.nom}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input4">Email</label>
              <input id="swal-input4" class="swal2-input professional-input" value="${client.email}" type="email">
            </div>
            <div class="form-group">
              <label for="swal-input3">Password</label>
              <input id="swal-input3" class="swal2-input professional-input" value="${client.motdepasse}" type="password">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input5">Age</label>
              <input id="swal-input5" class="swal2-input professional-input" value="${client.age}" type="number" min="18" max="120">
            </div>
            <div class="form-group">
              <label for="swal-input7">Phone</label>
              <input id="swal-input7" class="swal2-input professional-input" value="${client.tlf}">
            </div>
          </div>
          
          <div class="form-group full-width">
            <label for="swal-input6">Address</label>
            <input id="swal-input6" class="swal2-input professional-input" value="${client.adresse}">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="swal-input8">Postal Code</label>
              <input id="swal-input8" class="swal2-input professional-input" value="${client.codePostale}">
            </div>
            <div class="form-group">
              <label for="swal-input9">ZIP Code</label>
              <input id="swal-input9" class="swal2-input professional-input" value="${client.zip}">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        return {
          id_user: client.idUser,
          nom: (document.getElementById('swal-input2') as HTMLInputElement).value,
          prenom: (document.getElementById('swal-input1') as HTMLInputElement).value,
          motdepasse: (document.getElementById('swal-input3') as HTMLInputElement).value,
          email: (document.getElementById('swal-input4') as HTMLInputElement).value,
          age: +(document.getElementById('swal-input5') as HTMLInputElement).value,
          adresse: (document.getElementById('swal-input6') as HTMLInputElement).value,
          tlf: (document.getElementById('swal-input7') as HTMLInputElement).value,
          codePostale: (document.getElementById('swal-input8') as HTMLInputElement).value,
          zip: (document.getElementById('swal-input9') as HTMLInputElement).value,
          statut: 'client'
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.clientService.updateClient(client.idUser!, result.value).subscribe({
          next: (updatedClient) => {
            const index = this.clients.findIndex(c => c.idUser === client.idUser);
            if (index !== -1) {
              this.clients[index] = updatedClient;
            }
            Swal.fire({
              title: 'Updated!',
              text: 'Client updated successfully.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => Swal.fire({
            title: 'Error!',
            text: 'Failed to update client.',
            icon: 'error',
            confirmButtonColor: '#F44336'
          })
        });
      }
    });
  }

  deleteClient(client: Client) {
    if (!client?.idUser) {
      Swal.fire({
        title: 'Error',
        text: 'Cannot delete client: Missing ID',
        icon: 'error',
        confirmButtonColor: '#F44336'
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Deletion',
      html: `Are you sure you want to delete <strong>${client.nom} ${client.prenom}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#F44336',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-delete-btn',
        cancelButton: 'professional-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.idUser!).subscribe({
          next: () => {
            this.clients = this.clients.filter(c => c.idUser !== client.idUser);
            Swal.fire({
              title: 'Deleted!',
              text: 'Client has been removed.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete client',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  searchClient(): void {
    if (!this.searchQuery.trim()) {
      this.loadClients();
      this.isSearchActive = false;
      return;
    }

    this.isSearchActive = true;
    this.clientService.searchClients(this.searchQuery).subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error searching clients:', err)
    });
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchClient();
    }
  }
}