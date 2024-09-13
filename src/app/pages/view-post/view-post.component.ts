import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { CommentService } from '../../services/comment.service';
import { error } from 'console';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AngularMaterialModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {


  postData:any;
  commentForm!:FormGroup;
  comments:any
  postId=this.activatedRoute.snapshot.params['id'];

  constructor(
    private postService:PostService,
    private snackBar :MatSnackBar,
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    private commentService:CommentService
  ){}

  ngOnInIt(){
    console.log(this.postId);
    this.getPostById;

    this.commentForm=this.fb.group({
      postedBy:[null,Validators.required],
      content:[null,Validators.required]
    })
  }

  publishComment(){
    const postedBy=this.commentForm.get('postedBy')?.value;
    const content=this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId,postedBy,content).subscribe(res=>{
      this.snackBar.open("comment posted Successfully","ok");
      this.getCommentsByPost();
    },error=>{
      this.snackBar.open("Something Went Wrong","ok");  
    })
  }


  getCommentsByPost(){
    this.commentService.getAllCommentsByPost(this.postId).subscribe(res=>{
      this.comments=res;
    },error=>{
      this.snackBar.open("something went wrong","ok");
    })
  }
  getPostById(){
    this.postService.getPostById(this.postId).subscribe(res=>{
      this.postData=res;
      console.log(res);
      this.getCommentsByPost();

    },error=>{
      this.snackBar.open("Something went wrong!!!!!","Ok")
    })

  }

  likePost(){
    this.postService.likePost(this.postId).subscribe(res=>{

      this.snackBar.open("post liked Successfully","ok");
      this.getPostById();
    },error=>{
      this.snackBar.open("Something went wrong!!!!!","Ok")
    })
  }

}
