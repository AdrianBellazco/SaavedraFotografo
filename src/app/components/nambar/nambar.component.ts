import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nambar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './nambar.component.html',
  styleUrls: ['./nambar.component.css']
})
export class NambarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
