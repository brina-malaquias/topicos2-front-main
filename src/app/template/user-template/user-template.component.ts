import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, MatButton, MatIcon, MenuComponent],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent {

}
