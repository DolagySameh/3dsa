import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post, Category } from '../../models/post.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featured: Post[] = [];
  recent: Post[] = [];
  categories: Category[] = [];

  constructor(private blog: BlogService) {}

  ngOnInit() {
    this.featured = this.blog.getFeaturedPosts().slice(0, 3);
    this.recent = this.blog.getRecentPosts(3);
    this.categories = this.blog.getCategories();
  }

  trackBySlug(_i: number, p: Post) { return p.slug; }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}