import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './shared/services/flowbite.service';
import { NavBarComponent } from "./core/layouts/nav-bar/nav-bar.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";
import { AuthService } from './core/services/auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EcomerceRoute';


  private readonly _flowbiteService = inject(FlowbiteService);
  private readonly _authService = inject(AuthService);
  loadMyFlowbite() {
    this._flowbiteService.loadFlowbite(flowbite => {
      console.log("load flowbite" ,flowbite);
      initFlowbite();
    })
  }
  ngOnInit(): void {
    this.loadMyFlowbite();
    this._authService.saveUser();
    // this._authService.isLoggedIn();
  }



  
}
