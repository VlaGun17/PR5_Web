export class CreateMedicineDto {
    private title: string;
    private price: number;
    private dosageMg: number;
    private isPrescriptionRequired: boolean;
    private expirationDate: Date;
}