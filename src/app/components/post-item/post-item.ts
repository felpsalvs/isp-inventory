import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-item',
  imports: [RouterModule],
  template: `
  <div class="container">
    <h2 class="title">{{ post?.title }}</h2>

    <div class="button-group">
      <button [routerLink]="['']" class="btn primary-btn">Home</button>
      <button [routerLink]="['/post']" class="btn secondary-btn">Posts</button>
      <button [routerLink]="['/post/edit', post?.id]" class="btn edit-btn">Edit</button>
    </div>

    <p class="description">
      {{ post?.description }}
    </p>
  </div>`,
  styles: ``
})
export class PostItemComponent implements OnInit{
  post : Post | null = null;

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.showPost(id);
  }

  showPost(id : any) {
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
      }, 
      error: (error) => {
        console.log("Error while fetching Post", error)
      }
    })
  }

}