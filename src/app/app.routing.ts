import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { OpponentsComponent } from './opponents/opponents.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'notes', component: OpponentsComponent },
    { path: 'frame-data', loadChildren: () => import('./frame-data/frame-data.module').then(m => m.FrameDataModule)},
    { path: '',   redirectTo: 'notes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
