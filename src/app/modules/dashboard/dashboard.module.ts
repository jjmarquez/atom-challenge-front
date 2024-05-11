import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule, MatCardModule, PipesModule],
})
export class DashboardModule {}
