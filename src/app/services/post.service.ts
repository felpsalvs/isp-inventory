import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }

  getAllPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(post: Post) : Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  getPostById(id: any) : Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  updatePost(id: any, post: Post) : Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: any) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
