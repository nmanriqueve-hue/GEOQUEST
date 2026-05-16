import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Modo } from './component/modo/modo';
import { Libre } from './component/libre/libre';
import { Aprendizaje } from './component/aprendizaje/aprendizaje';
import { Perfil } from './component/perfil/perfil';
import { ComoJugar } from './component/comoJugar/comoJugar';
import { ConocerMas } from './component/conocer-mas/conocer-mas';
import { authGuard } from './service/auth.guard';
import { Questions } from './component/questions/questions';
import { All } from './component/game/all/all';
import { CallingCodes } from './component/game/calling-codes/calling-codes';
import { Capitals } from './component/game/capitals/capitals';
import { Continents } from './component/game/continents/continents';
import { Currencies } from './component/game/currencies/currencies';
import { Flags } from './component/game/flags/flags';
import { Language } from './component/game/language/language';
import { Population } from './component/game/population/population';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
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
    //canActivate: [authGuard]
  },
  {
    path: 'modo',
    component: Modo,
    //canActivate: [authGuard]
  },
  {
    path: 'libre',
    component: Libre,
    //canActivate: [authGuard]
  },
  {
    path: 'aprendizaje',
    component: Aprendizaje,
    //canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: Perfil,
    //canActivate: [authGuard]
  },
  {
    path: 'comojugar',
    component: ComoJugar,
    //canActivate: [authGuard]
  },
  {
    path: 'conocermas',
    component: ConocerMas,
    //canActivate: [authGuard]
  },
  {
    path: 'questions',
    component: Questions,
    //canActivate: [authGuard]
  },
  {
    path: 'all',
    component: All,
    //canActivate: [authGuard]
  },
  {
    path: 'calling-codes',
    component: CallingCodes,
    //canActivate: [authGuard]
  },  {
    path: 'capitals',
    component: Capitals,
    //canActivate: [authGuard]
  },  {
    path: 'continents',
    component: Continents,
    //canActivate: [authGuard]
  },  {
    path: 'currencies',
    component: Currencies,
    //canActivate: [authGuard]
  },  {
    path: 'flags',
    component: Flags,
    //canActivate: [authGuard]
  },  {
    path: 'language',
    component: Language,
    //canActivate: [authGuard]
  },
  {
    path: 'population',
    component: Population,
    //canActivate: [authGuard]
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
