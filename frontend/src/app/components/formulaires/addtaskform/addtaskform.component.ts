import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addtaskform',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './addtaskform.component.html',
  styleUrl: './addtaskform.component.css'
})
export class AddtaskformComponent {
  faCirclePlus=faCirclePlus;
}
