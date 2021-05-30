import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterModule } from 'src/app/components/common/footer/footer.module';
import { BackgroundModule } from 'src/app/components/common/background/background.module';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FooterModule,
    BackgroundModule,
    RouterModule.forChild(routes),
  ],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
