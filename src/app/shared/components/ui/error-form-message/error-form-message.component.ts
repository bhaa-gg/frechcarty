import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FromErrMessagePipe } from '../../../Pipes/from-err-message.pipe';

@Component({
  selector: 'Eco-error-form-message',
  imports: [ FromErrMessagePipe  ],
  templateUrl: './error-form-message.component.html',
  styleUrl: './error-form-message.component.css'
})
export class ErrorFormMessageComponent {

  @Input({ required: false, alias: "ErrorMessage" }) ErrorMessage !: any
  @Input({ required: false, alias: "control" }) control!: AbstractControl | any



}
