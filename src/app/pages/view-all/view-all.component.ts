import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-view-all',
  standalone: true,
  // imports: [AngularMaterialModule,CommonModule],
  imports:[AngularMaterialModule ,AppComponent,CommonModule,ReactiveFormsModule,HttpClientModule,CommonModule,RouterModule],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent  implements OnInit{

  allPosts:any;
  

  constructor(private postService : PostService,private snackBar:MatSnackBar,private router:Router){}
  ngOnInit(): void {
    this.getAllPosts();
    console.log("view all page loaded");
  }

 

  getAllPosts(){
    this.postService.getAllPosts().subscribe((res)=>{
      console.log(res);
      this.allPosts=res;
    },(error)=>{
      this.snackBar.open("something went wrong","ok")
    }) 
  }

 

}
