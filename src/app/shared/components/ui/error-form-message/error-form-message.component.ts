import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'Eco-error-form-message',
  imports: [JsonPipe],
  templateUrl: './error-form-message.component.html',
  styleUrl: './error-form-message.component.css'
})
export class ErrorFormMessageComponent {

  @Input({ required: false, alias: "ErrorMessage" }) ErrorMessage !: string | null
  @Input({ required: false, alias: "control" }) control!: AbstractControl | null


}
