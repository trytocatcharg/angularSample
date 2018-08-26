import { Pipe, PipeTransform } from '@angular/core';
import { AppCommon } from '../shared/common'

@Pipe({ name: 'week' })
export class WeekPipe implements PipeTransform {
    transform(value: Date): number {
        return AppCommon.getWeekNumber(value);
    }

   
}