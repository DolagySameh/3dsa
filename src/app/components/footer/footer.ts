import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { SiteInfo, Category } from '../../models/post.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  site!: SiteInfo;
  categories: Category[] = [];
  constructor(private blog: BlogService) {
    this.site = blog.getSiteInfo();
    this.categories = blog.getCategories();
  }
}