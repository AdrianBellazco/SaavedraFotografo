<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
=======
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
>>>>>>> master

@Component({
  selector: 'app-nambar',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './nambar.component.html',
  styleUrls: ['./nambar.component.css']
})
export class NambarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Escucha los cambios en el estado del login
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    // Cierra sesión
    this.authService.logout();

    // Redirige a la página principal
    this.router.navigate(['/']);
  }
}
=======
  imports: [RouterLink],
  templateUrl: './nambar.component.html',
  styleUrls: ['./nambar.component.css'],
})
export class NambarComponent {}
>>>>>>> master
