import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarModule } from 'src/app/components/common/navbar/navbar.module';
import { BackgroundModule } from 'src/app/components/common/background/background.module';
import { RouterModule, Routes } from '@angular/router';
import { ListItemModule } from 'src/app/components/list-item/list-item.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NavbarModule,
    BackgroundModule,
    RouterModule.forChild(routes),
    ListItemModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
