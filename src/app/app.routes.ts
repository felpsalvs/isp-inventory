import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostListComponent } from './components/post-list/post-list';
import { PostItemComponent } from './components/post-item/post-item';
import { PostFormComponent } from './components/post-form/post-form';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'post/show/:id',
    component: PostItemComponent,
  },
  {
    path: 'post/edit/:id',
    component: PostFormComponent,
  },
  {
    path: 'post/create',
    component: PostFormComponent,
  },
];