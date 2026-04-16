export type EquipmentCategory = 'Fibra' | 'FWA' | 'Cabeamento' | 'Diversos';
export type EquipmentStatus = 'Em Estoque' | 'Em Uso' | 'Defeito';

export interface Equipment {
    id: string;
    name: string;
    category: EquipmentCategory;
    type: string;
    sn_mac: string;
    status: EquipmentStatus;
    heritage: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
