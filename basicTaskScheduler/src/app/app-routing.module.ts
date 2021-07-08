import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scheduler', pathMatch: 'full' }, //Default Page
  { path: 'scheduler', loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
