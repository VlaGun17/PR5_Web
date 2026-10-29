import { Provider } from "@nestjs/common";
import { config } from "process";

export const STORE_CONFIG = 'STORE_CONFIG';
export const FEE_CALCULATOR = 'FEE_CALCULATOR';

export interface StoreConfig {
  storeName: string;
  defaultCurrency: string;
  taxPercent: number;
}

export interface FeeCalculator {
  calculateTax(amount: number): number;
}

export const storeConfigValue: StoreConfig = {
  storeName: 'Apothecary & Pharmacy Store',
  defaultCurrency: 'UAH',
  taxPercent: 0.20,
};

export const StoreConfigProvider: Provider = {
  provide: STORE_CONFIG,
  useValue: storeConfigValue,
};

export const FeeCalculatorProvider: Provider = {
    provide: FEE_CALCULATOR,
    useFactory: (config: StoreConfig): FeeCalculator => {
        return {
            calculateTax: (amount: number) => amount * config.taxPercent,
        };
    },
    inject: [STORE_CONFIG],
}