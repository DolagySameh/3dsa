import { Injectable } from '@angular/core';
import { Post, Category, SiteInfo, BlogData } from '../models/post.model';
import data from '../data/posts.json';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly data = data as unknown as BlogData;

  getPosts(): Post[] {
    return this.data.posts;
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.data.posts.find((p) => p.slug === slug);
  }

  getCategories(): Category[] {
    return this.data.categories;
  }

  getSiteInfo(): SiteInfo {
    return this.data.siteInfo;
  }

  getFeaturedPosts(): Post[] {
    return this.data.posts.filter((p) => p.featured);
  }

  getRecentPosts(limit = 3): Post[] {
    return [...this.data.posts]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, limit);
  }

  getRelatedPosts(slug: string, limit = 3): Post[] {
    const post = this.getPostBySlug(slug);
    if (!post) return [];
    return this.data.posts
      .filter((p) => p.slug !== slug && p.category === post.category)
      .slice(0, limit);
  }

  searchAndFilter(posts: Post[], query: string, category: string): Post[] {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.name.toLowerCase().includes(q);
      const matchesCategory = !category || category === 'all' || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }
}