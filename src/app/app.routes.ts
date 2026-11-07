import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { BlogDetails } from './pages/blog-details/blog-details';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: Blog },
  { path: 'blog/:slug', component: BlogDetails },
  { path: 'about', component: About },
  { path: '404', component: NotFound },
  { path: '**', component: NotFound }
];