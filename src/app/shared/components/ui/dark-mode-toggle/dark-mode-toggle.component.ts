import { Component } from '@angular/core';

@Component({
  selector: 'Eco-dark-mode-toggle',
  imports: [],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent {
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}
}
