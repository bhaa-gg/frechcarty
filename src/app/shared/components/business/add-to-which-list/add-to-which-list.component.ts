import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Eco-add-to-which-list',
  imports: [],
  templateUrl: './add-to-which-list.component.html',
  styleUrl: './add-to-which-list.component.css'
})
export class AddToWhichListComponent {
  @Output() addToWichListFire_1: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromWichListFire_1: EventEmitter<string> = new EventEmitter<string>();
  @Input() inWish!: boolean
  @Input() loadingBtnWish!: string

  @Input() productId !: string




  onClick() {
   this.inWish ? this.deleteFromWichListFire_1.emit() : this.addToWichListFire_1.emit();
  }


}
