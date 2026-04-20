import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Subscribable } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="post-list-container">
    <h1 class="page-title">Post List</h1>

    <div class="top-buttons">
      <button [routerLink]="['']" class="btn primary-btn">Home</button>
      <button [routerLink]="['create']" class="btn secondary-btn">Create Post</button>
    </div>

    <table class="post-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts; index as i">
          <td>{{ i + 1}}</td>
          <td>{{ post?.title }}</td>
          <td>{{ post?.description }}</td>
          <td class="button-row">
            <button [routerLink]="['show', post?.id]" class="btn primary-btn">Show</button>
            <button [routerLink]="['edit', post?.id]" class="btn edit-btn">Edit</button>
            <button (click)="deletePost(post.id)" class="btn delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: ``
})
export class PostListComponent implements OnInit{

  posts : Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.log("Error while fetching Posts", error);
      }
    })
  }

  deletePost(id: number) {
    if(confirm("Are you sure you want to delete the Post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id != id);
        }, 
        error: (error) => {
          console.log("Failed to delete", error);
        }
      })
    }
  }

}