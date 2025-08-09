import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    
    const current = new Date();
    const dateOfBirth = new Date(value);

    const age = current.getFullYear() - dateOfBirth.getFullYear();

    return age;
  }

}
