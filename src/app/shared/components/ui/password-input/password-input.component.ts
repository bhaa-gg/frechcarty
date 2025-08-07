import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'Eco-password-input',
  imports: [],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

  showPassword: boolean = true

  @Input() value: string = "";
  @Input() id: string = "";
  @Input() name: string = '';
  @Input() labelFor: string = '';
  @Input() labelName: string = '';

  OnChange: (val: any) => void = () => {

  }
  OnTouched: () => void = () => { }

  registerOnChange(fn: any): void {
    this.OnChange = fn
  }
  registerOnTouched(fn: any): void {
    this.OnTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {

  }
  writeValue(val: any): void {
    console.log(val);
    this.value = val
  }

}
