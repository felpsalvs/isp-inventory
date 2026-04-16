import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private storageKey = 'equipment-data';

  private getStoredData(): Equipment[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private setStoredData(data: Equipment[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAll(): Promise<Equipment[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.getStoredData();
  }

  async getById(id: string): Promise<Equipment | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const data = this.getStoredData();
    return data.find(eq => eq.id === id);
  }

  async create(equipment: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Equipment> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const data = this.getStoredData();
    const newEq: Equipment = {
      ...equipment,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    data.push(newEq);
    this.setStoredData(data);
    return newEq;
  }

  async update(id: string, updates: Partial<Omit<Equipment, 'id' | 'createdAt'>>): Promise<Equipment | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const data = this.getStoredData();
    const index = data.findIndex(eq => eq.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updates, updatedAt: new Date() };
    this.setStoredData(data);
    return data[index];
  }

  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const data = this.getStoredData();
    const filtered = data.filter(eq => eq.id !== id);
    if (filtered.length === data.length) return false;
    this.setStoredData(filtered);
    return true;
  }
}