import { Component, Input, OnInit, signal } from '@angular/core';
import { LikeDislikeService } from '../../app/services/like.dislike.service';

@Component({
  standalone: true,
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
})
export class LikeDislikeComponent implements OnInit {
  @Input() postId!: string; // Input property for post ID
  likes = signal<number>(0);
  dislikes = signal<number>(0);

  constructor(private likeDislikeService: LikeDislikeService) {}

  ngOnInit(): void {
    // Load initial counts from the service
    this.likes.set(this.likeDislikeService.getLikes(this.postId));
    this.dislikes.set(this.likeDislikeService.getDislikes(this.postId));
  }

  addLike(): void {
    this.likeDislikeService.addLike(this.postId);
    this.likes.set(this.likeDislikeService.getLikes(this.postId)); // Update signal
  }

  addDislike(): void {
    this.likeDislikeService.addDislike(this.postId);
    this.dislikes.set(this.likeDislikeService.getDislikes(this.postId)); // Update signal
  }
}
