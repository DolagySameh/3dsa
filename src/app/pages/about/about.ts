import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  authors: { name: string; avatar: string; role: string }[] = [];
  constructor(private blog: BlogService) {}
  ngOnInit() {
    const seen = new Set<string>();
    const list: { name: string; avatar: string; role: string }[] = [];
    for (const p of this.blog.getPosts()) {
      if (!seen.has(p.author.name)) {
        seen.add(p.author.name);
        list.push(p.author);
      }
    }
    this.authors = list;
  }
}