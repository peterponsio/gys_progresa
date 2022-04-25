import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list-elements',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'list-elements',
        loadChildren: () => import('./list-elements/list-elements.module').then( m => m.ListElementsPageModule)
      },
      {
        path: 'list-chats',
        loadChildren: () => import('./list-chats/list-chats.module').then( m => m.ListChatsPageModule)
      },
      {
        path: 'add-new-elements',
        loadChildren: () => import('./add-new-elements/add-new-elements.module').then( m => m.AddNewElementsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
