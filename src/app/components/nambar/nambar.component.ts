import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nambar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nambar.component.html',
  styleUrls: ['./nambar.component.css'],
})
export class NambarComponent {}
