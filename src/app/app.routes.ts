import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import {Home} from './component/home/home';
import {Login} from './component/login/login';
import {Register} from './component/register/register';
import {Modo} from './component/modo/modo';
import {Libre} from './component/libre/libre';
import {Aprendizaje} from './component/aprendizaje/aprendizaje';
import {Perfil} from './component/perfil/perfil';
import {ComoJugar} from './component/comoJugar/comoJugar';
import { ConocerMas } from './component/conocer-mas/conocer-mas';

export const routes: Routes = [{
  path: '',
  component: Login
  },

  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component : Register
  },
  {
    path: 'home',
    component : Home
  },
  {
    path: 'modo',
    component : Modo
  },
  {
    path: 'libre',
    component : Libre
  },
  {
    path: 'aprendizaje',
    component : Aprendizaje
  },
  {
    path: 'perfil',
    component : Perfil
  },
  {
  path: 'comojugar',
  component : ComoJugar
   },
   {
  path: 'conocermas',
  component: ConocerMas
},


  {
    path: '**',
    redirectTo: ''
  }

  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
