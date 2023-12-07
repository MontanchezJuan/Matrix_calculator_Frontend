import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SelectVariableComponent } from './components/select-variable/select-variable.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    SidebarComponent,
    SelectVariableComponent,
  ],
  imports: [CommonModule],
  exports: [NotFoundPageComponent, SidebarComponent, SelectVariableComponent],
})
export class SharedModule {}
