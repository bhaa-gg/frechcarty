import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'Eco-loading-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-btn.component.html',
  styleUrls: ['./loading-btn.component.css']
})
export class LoadingBtnComponent {
  @Input({ required: true }) isLoading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;

  constructor() {}
}
