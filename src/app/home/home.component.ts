import { Component } from '@angular/core';
import { AuthService } from '../components/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
