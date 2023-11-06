import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WandelingsComponent} from "./component/wandelings/wandelings.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: WandelingsComponent},
  {path: 'cars', component: WandelingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
