import { Component, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post, Category } from '../../models/post.model';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  allPosts: Post[] = [];
  categories: Category[] = [];

  query = signal('');
  selectedCategory = signal('all');
  view = signal<'grid' | 'list'>('grid');
  page = signal(1);
  readonly pageSize = 6;

  constructor(private blog: BlogService, private router: Router, private route: ActivatedRoute) {
    this.allPosts = blog.getPosts();
    this.categories = blog.getCategories();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('category');
      if (cat) this.selectedCategory.set(cat);
      this.page.set(1);
    });
  }

  filtered = computed(() => {
    return this.blog.searchAndFilter(this.allPosts, this.query(), this.selectedCategory());
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  paginated = computed(() => {
    const p = this.page();
    const start = (p - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  onSearch() { this.page.set(1); }
  onCategoryChange() {
    this.page.set(1);
    this.router.navigate([], { relativeTo: this.route, queryParams: { category: this.selectedCategory() === 'all' ? null : this.selectedCategory() }, queryParamsHandling: 'merge' });
  }
  setView(v: 'grid' | 'list') { this.view.set(v); }
  goTo(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  trackBySlug(_i: number, p: Post) { return p.slug; }
}