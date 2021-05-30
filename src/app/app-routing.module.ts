import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

/**
 * Using Angular FireAuth built in guard
 *  if not logged in go to login page
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: async () =>
      (await import('./auth/login/login.module')).LoginModule
  },
  {
    path: 'register',
    loadChildren: async () =>
      (await import('./auth/registration/registration.module')).RegistrationModule
  },
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'home',
        loadChildren: async () =>
          (await import('./pages/home/home.module')).HomeModule
      },
      {
        path: 'edit',
        loadChildren: async () =>
          (await import('./pages/additem/additem.module')).AdditemModule
      },
      {
        path: 'add',
        loadChildren: async () =>
          (await import('./pages/additem/additem.module')).AdditemModule
      },
      {
        path: 'about',
        loadChildren: async () =>
          (await import('./pages/about/about.module')).AboutModule
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
