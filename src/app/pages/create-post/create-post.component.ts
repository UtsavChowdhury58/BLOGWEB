import { Component, NgModule, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { ok } from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
// import {PostService} from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AngularMaterialModule,AppComponent,CommonModule,ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  postForm!:FormGroup;

  tags: String []=[];

  // private postService:PostService

  constructor(private router: Router,private fb:FormBuilder,private snackBar:MatSnackBar ,private postService:PostService){}

  ngOnInit(){
    this.postForm=this.fb.group({
      name:[null,Validators.required],
      content:[null,Validators.required],
      img:[null,Validators.required],
      postedBy:[null,Validators.required]
    })

    
  }



  add(event:any){
    const value= (event.value ||'').trim();
    if(value){
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag:any){
    const index= this.tags.indexOf(tag);
    if(index>=0){
      this.tags.splice(index,1);
    }

  }

  createPost(){
    const data= this.postForm.value;

    data.tags=this.tags;
  
      this.postService.createNewPost(data).subscribe(
  

      (res)=>{
        this.snackBar.open("Post Created Successfully","ok");
      },
      (error)=>{
        this.snackBar.open("Something Went Wrong!!!","ok")
      }
    )

}
}

