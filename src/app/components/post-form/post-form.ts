import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-post-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
  <div class="container">
    <h2 class="title">{{ isEdit ? "Update a New Post" : "Create a Post"}}</h2>

    <div class="button-group">
      <button [routerLink]="['']" class="btn primary-btn">Home</button>
      <button [routerLink]="['/post']" class="btn secondary-btn">Posts</button>
    </div>
    <form [formGroup]="postForm"  (ngSubmit)="onSubmit()">
      <label for="title">Title:</label>
      <input type="text" id="title" formControlName="title" required>

      <label for="description">Description:</label>
      <textarea id="description" formControlName="description" rows="5" cols="40" required></textarea>
      <div class="form-btn-right">
        <button class="btn secondary-btn" type="submit">{{ isEdit ? "Update" : "Submit"}}</button>
      </div>
    </form>
  </div>
  `,
  styles: ``
})
export class PostFormComponent implements OnInit{
  post : Post | null = null;
  postForm ! : FormGroup
  isEdit : boolean = false;
  editingPostId : any | null = null;

  constructor(private postService: PostService, private route : ActivatedRoute, private formBuilder: FormBuilder, private router : Router) {
    this.postForm = this.formBuilder.group({
      title: '',
      description: ''
    })
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url;
    const secondSegment = segments[1]?.path;
    if(secondSegment == "edit") {
      this.isEdit = true;
      const id = this.route.snapshot.params["id"];
      this.editPost(id);
    }
  }

  editPost(id : any) : void {
    this.editingPostId = id;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.postForm.patchValue({
          title: post.title,
          description: post.description
        })
      }, 
      error: (error) => {
        console.log("Error while fetching Post", error)
      }
    });

    console.log(this.postForm);
  }

  onSubmit() : void {
    const formValue = this.postForm.value;
    if(this.isEdit && this.editingPostId) {
      this.updatePost(this.editingPostId, formValue);
    } else {
      this.createPost(formValue)
    }
  }

  updatePost(id: any, post: Post) {
    this.postService.updatePost(id, post).subscribe({
      next: () => {
        this.router.navigate(['/post'])
      }, 
      error: (error) => {
        console.log("Error while updating the post", error)
      }
    })
  }

  createPost(post : Post) {
    this.postService.createPost(post).subscribe({
      next: () => {
        this.router.navigate(['/post'])
      }, 
      error: (error) => {
        console.log("Error Logged", error);
      }
    });
  }
}