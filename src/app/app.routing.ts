import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { OpponentsComponent } from './opponents/opponents.component';

const routes: Routes = [
    { path: '', redirectTo: '/opponents', pathMatch: 'full' },
    { path: 'opponents', component: OpponentsComponent },
    { path: 'opponents/:id', component: OpponentsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
