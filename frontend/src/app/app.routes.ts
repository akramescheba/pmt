import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import { AuthComponent } from './components/auth/auth.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdminComponent } from './components/users/admin/admin.component';
import { MembreComponent } from './components/users/membre/membre.component';
import { ObservateurComponent } from './components/users/observateur/observateur.component';
import {ListeTachesComponent} from './components/pages/liste-taches/liste-taches.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import {AuthguardService} from "./components/services/authguard.service";
import {loginGuard} from "./components/guards/login.guard";
import {useRoleGuard} from "./components/guards/use-role.guard";
import {AdduserformComponent} from './components/formulaires/adduserform/adduserform.component';
import {TachesComponent} from './components/pages/taches/taches.component'

export const routes: Routes = [

  {
    path: 'login' , 
    component:AuthComponent, 
    canActivate:[loginGuard]
  },
  {
    path: '',
    component: AdminComponent, 
    canActivate: [AuthguardService, useRoleGuard],
    data: { roles: ['Administrateur'] } 
  },
  {
    path: '',
    component: MembreComponent, 
    canActivate: [AuthguardService, useRoleGuard], 
    data: { roles: ['Membre'] }
  
  },
  {
    path: '',
    component: ObservateurComponent,  
    canActivate: [AuthguardService,useRoleGuard ], 
    data: { roles: ['Observateur'] }
  },
  {
    path: 'admin',
    component: AdminComponent, 
    canActivate: [AuthguardService, useRoleGuard],
    data: { roles: ['Administrateur'] } 
  },
  {
    path: 'membre',
    component: MembreComponent, 
    canActivate: [AuthguardService, useRoleGuard], 
    data: { roles: ['Membre'] }
  
  },
  {
    path: 'observateur',
    component: ObservateurComponent,  
    canActivate: [AuthguardService,useRoleGuard ], 
    data: { roles: ['Observateur'] }
  },
  {path:'liste-des-taches', component:ListeTachesComponent},
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthguardService] 
  },
];
