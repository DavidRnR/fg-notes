import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { FrameDataComponent } from './frame-data.component';

const routes: Routes = [
    { path: '', component: FrameDataComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameDataRoutingModule {}
