import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

interface ContentBlock {
  type: 'heading' | 'paragraph';
  text: string;
  index?: number;
}

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit {
  post: Post | undefined;
  related: Post[] = [];
  blocks: ContentBlock[] = [];
  headings: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private blog: BlogService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      this.post = this.blog.getPostBySlug(slug);
      if (!this.post) {
        this.router.navigate(['/404']);
        return;
      }
      this.related = this.blog.getRelatedPosts(slug, 3);
      this.parseContent();
    });
  }

  parseContent() {
    if (!this.post) return;
    const parts = this.post.content.split(/\n\n+/);
    let hIndex = 0;
    this.blocks = [];
    this.headings = [];
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace(/^##\s*/, '');
        this.headings.push(text);
        hIndex++;
        this.blocks.push({ type: 'heading', text, index: hIndex });
      } else {
        this.blocks.push({ type: 'paragraph', text: trimmed });
      }
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  trackBySlug(_i: number, p: Post) { return p.slug; }
}