import { Routes } from '@angular/router';
import { EquipmentListComponent } from './features/equipment/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './features/equipment/equipment-form/equipment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/equipment', pathMatch: 'full' },
  { path: 'equipment', component: EquipmentListComponent },
  { path: 'equipment/create', component: EquipmentFormComponent },
  { path: 'equipment/edit/:id', component: EquipmentFormComponent }
];
