import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { TmBuilderComponent } from './tm-builder/tm-builder.component';
import { TmTemplateComponent } from './tm-template/tm-template.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginpageComponent,
  },
  {
    path: 'builder',
    component: TmBuilderComponent,
  },
  {
    path: 'tournament/:id',
    component: TmTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
