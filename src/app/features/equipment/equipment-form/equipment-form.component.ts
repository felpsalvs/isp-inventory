import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EquipmentService } from '../../../core/services/equipment.service';
import { Equipment, EquipmentCategory, EquipmentStatus } from '../../../core/models/equipment.model';
import {
  IonButtonComponent,
  IonIconComponent,
  IonInputComponent,
  IonSelectComponent,
  IonSpinnerComponent
} from '@brisanet/ion';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    IonButtonComponent,
    IonIconComponent,
    IonInputComponent,
    IonSelectComponent,
    IonSpinnerComponent
  ]
})
export class EquipmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private equipmentService = inject(EquipmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEdit = signal(false);
  loading = signal(false);

  categories: EquipmentCategory[] = ['Fibra', 'FWA', 'Cabeamento', 'Diversos'];
  statuses: EquipmentStatus[] = ['Em Estoque', 'Em Uso', 'Defeito'];

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['Fibra', Validators.required],
      type: ['', Validators.required],
      sn_mac: ['', Validators.required],
      status: ['Em Estoque', Validators.required],
      heritage: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit.set(true);
      this.loadEquipment(id);
    }
  }

  async loadEquipment(id: string) {
    this.loading.set(true);
    try {
      const eq = await this.equipmentService.getById(id);
      if (eq) {
        this.form.patchValue(eq);
      }
    } catch (error) {
      console.error('Erro ao carregar equipamento', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      try {
        if (this.isEdit()) {
          const id = this.route.snapshot.params['id'];
          await this.equipmentService.update(id, this.form.value);
        } else {
          await this.equipmentService.create(this.form.value);
        }
        this.router.navigate(['/equipment']);
      } catch (error) {
        console.error('Erro ao salvar', error);
      } finally {
        this.loading.set(false);
      }
    }
  }

  cancel() {
    this.router.navigate(['/equipment']);
  }
}