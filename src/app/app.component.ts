import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterOutlet } from '@angular/router';
import { AngularMaterialModule} from './AngularMaterialModule'
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule} from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,FormsModule,HttpClientModule,ReactiveFormsModule,AngularMaterialModule,CommonModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BLOGWEB';



  constructor(private router: Router,private fb:FormBuilder,private snackBar:MatSnackBar){}

  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  navigateToViewAll() {
    this.router.navigate(['/view-all']);
  }


 
}
