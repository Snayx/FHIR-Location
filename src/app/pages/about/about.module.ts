import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BackgroundModule } from 'src/app/components/common/background/background.module';
import { NavbarModule } from 'src/app/components/common/navbar/navbar.module';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavbarModule,
    BackgroundModule,
    RouterModule.forChild(routes),
  ],
  exports: [AboutComponent],
})
export class AboutModule {}
