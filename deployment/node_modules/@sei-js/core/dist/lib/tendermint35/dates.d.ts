import { ReadonlyDate } from 'readonly-date';
export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
    readonly nanoseconds?: number;
}
export interface DateWithNanoseconds extends Date {
    /** Nanoseconds after the time stored in a vanilla Date (millisecond granularity) */
    nanoseconds?: number;
}
