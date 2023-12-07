import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'calculate',
    loadChildren: () =>
      import('./arrays/arrays.module').then((m) => m.ArraysModule),
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '', redirectTo: 'calculate', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
