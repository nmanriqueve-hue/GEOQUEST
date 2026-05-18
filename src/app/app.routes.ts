import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Login } from './component/login/login';
import { Admin } from './component/admin/admin';
import { Register } from './component/register/register';
import { Modo } from './component/modo/modo';
import { Libre } from './component/libre/libre';
import { Aprendizaje } from './component/aprendizaje/aprendizaje';
import { Perfil } from './component/perfil/perfil';
import { ComoJugar } from './component/comoJugar/comoJugar';
import { ConocerMas } from './component/conocer-mas/conocer-mas';
import { authGuard } from './service/auth.guard';
import { Questions } from './component/questions/questions';
import { Achievements } from './component/achievements/achievements';
import { Ranking } from './component/ranking/ranking';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'modo',
    component: Modo,
    // canActivate: [authGuard],
  },
  {
    path: 'libre',
    component: Libre,
    // canActivate: [authGuard],
  },
  {
    path: 'aprendizaje',
    component: Aprendizaje,
    // canActivate: [authGuard],
  },
  {
    path: 'perfil',
    component: Perfil,
    // canActivate: [authGuard],
  },
  {
    path: 'comojugar',
    component: ComoJugar,
  },
  {
    path: 'conocermas',
    component: ConocerMas,
  },
  { path: 'questions/categoria/:id',
    component: Questions,
    // canActivate: [authGuard]
  },
  { path: 'questions/dificultad/:nivel',
    component: Questions,
    // canActivate: [authGuard]
  },
  {
    path: 'achievements',
    component: Achievements,
    // canActivate: [authGuard],
  },
  {
    path: 'ranking',
    component: Ranking,
    // canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
