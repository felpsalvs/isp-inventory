import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../../../core/services/equipment.service';
import { Equipment } from '../../../core/models/equipment.model';
import {
  IonButtonComponent,
  IonCardComponent,
  IonIconComponent,
  IonSpinnerComponent
} from '@brisanet/ion';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtonComponent,
    IonCardComponent,
    IonIconComponent,
    IonSpinnerComponent
  ]
})
export class EquipmentListComponent implements OnInit {
  private equipmentService = inject(EquipmentService);
  private router = inject(Router);

  equipments = signal<Equipment[]>([]);
  loading = signal(false);

  async ngOnInit() {
    this.loading.set(true);
    try {
      const data = await this.equipmentService.getAll();
      this.equipments.set(data);
    } catch (error) {
      console.error('Erro ao carregar equipamentos', error);
    } finally {
      this.loading.set(false);
    }
  }

  createNew() {
    this.router.navigate(['/equipment/create']);
  }

  editEquipment(id: string) {
    this.router.navigate(['/equipment/edit', id]);
  }

  async deleteEquipment(id: string) {
    if (confirm('Tem certeza que deseja deletar este equipamento?')) {
      try {
        await this.equipmentService.delete(id);
        this.equipments.update(list => list.filter(eq => eq.id !== id));
      } catch (error) {
        console.error('Erro ao deletar', error);
      }
    }
  }
}