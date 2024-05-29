import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactComponent } from './shared/pages/contact/contact.component';

const routes: Routes = [
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'about',
    component:AboutPageComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
