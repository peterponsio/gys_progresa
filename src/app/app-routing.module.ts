import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recover-pass',
    loadChildren: () => import('./pages/recover-pass/recover-pass.module').then( m => m.RecoverPassPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'element-details',
    loadChildren: () => import('./pages/element-details/element-details.module').then( m => m.ElementDetailsPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'mis-anuncios',
    loadChildren: () => import('./pages/mis-anuncios/mis-anuncios.module').then( m => m.MisAnunciosPageModule)
  },
  {
    path: 'mis-favoritos',
    loadChildren: () => import('./pages/mis-favoritos/mis-favoritos.module').then( m => m.MisFavoritosPageModule)
  },
  {
    path: 'chat-sesion',
    loadChildren: () => import('./pages/chat-sesion/chat-sesion.module').then( m => m.ChatSesionPageModule)
  },  {
    path: 'phone-login',
    loadChildren: () => import('./phone-login/phone-login.module').then( m => m.PhoneLoginPageModule)
  },
  {
    path: 'element-details-user',
    loadChildren: () => import('./pages/element-details-user/element-details-user.module').then( m => m.ElementDetailsUserPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'edit-ofert',
    loadChildren: () => import('./pages/edit-ofert/edit-ofert.module').then( m => m.EditOfertPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
