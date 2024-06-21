import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MenuComponent} from "../menu/menu.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
