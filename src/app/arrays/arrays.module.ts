import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArraysRoutingModule } from './arrays-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { OptimizationPageComponent } from './pages/optimization-page/optimization-page.component';

@NgModule({
  declarations: [LayoutPageComponent, OptimizationPageComponent],
  imports: [CommonModule, ArraysRoutingModule, SharedModule],
})
export class ArraysModule {}
