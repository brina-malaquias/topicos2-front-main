import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule,
    MatCardModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
