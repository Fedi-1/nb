import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommercantComponent } from './commercant/commercant.component';
import { LivreurComponent } from './livreur/livreur.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ParametresComponent } from './parametres/parametres.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'clients', component: ClientComponent },
    { path:'commercants', component: CommercantComponent},
    { path: 'livreurs', component: LivreurComponent},
    { path: 'stats', component: StatisticsComponent},
    { path: 'parametres', component: ParametresComponent}
];
