import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'fromErrMessage'
})
export class FromErrMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    if (errors['required']) return 'This field is required';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['pattern']) return 'Invalid format';
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;

    return 'Invalid field'; // fallback
  }

}
