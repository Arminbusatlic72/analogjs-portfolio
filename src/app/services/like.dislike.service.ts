import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeDislikeService {
  private likesKey = 'blogLikes';
  private dislikesKey = 'blogDislikes';

  constructor() {
    // Initialize local storage if it doesn't exist
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (this.isLocalStorageAvailable()) {
      if (!localStorage.getItem(this.likesKey)) {
        localStorage.setItem(this.likesKey, JSON.stringify({}));
      }
      if (!localStorage.getItem(this.dislikesKey)) {
        localStorage.setItem(this.dislikesKey, JSON.stringify({}));
      }
    }
  }

  private isLocalStorageAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  private getLikesFromStorage(): { [key: string]: number } {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.likesKey) || '{}');
    }
    return {};
  }

  private getDislikesFromStorage(): { [key: string]: number } {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.dislikesKey) || '{}');
    }
    return {};
  }

  private saveLikesToStorage(likes: { [key: string]: number }): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.likesKey, JSON.stringify(likes));
    }
  }

  private saveDislikesToStorage(dislikes: { [key: string]: number }): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.dislikesKey, JSON.stringify(dislikes));
    }
  }

  getLikes(postId: string): number {
    const likes = this.getLikesFromStorage();
    return likes[postId] || 0;
  }

  getDislikes(postId: string): number {
    const dislikes = this.getDislikesFromStorage();
    return dislikes[postId] || 0;
  }

  // addLike(postId: string): void {
  //   const likes = this.getLikesFromStorage();
  //   likes[postId] = (likes[postId] || 0) + 1;
  //   this.saveLikesToStorage(likes);
  // }

  // addDislike(postId: string): void {
  //   const dislikes = this.getDislikesFromStorage();
  //   dislikes[postId] = (dislikes[postId] || 0) + 1;
  //   this.saveDislikesToStorage(dislikes);
  // }

  addLike(postId: string): void {
    if (!this.isLocalStorageAvailable()) return;

    const likes = this.getLikesFromStorage();
    // Increment the like count for the specific postId
    likes[postId] = (likes[postId] || 0) + 1;
    this.saveLikesToStorage(likes);
  }

  addDislike(postId: string): void {
    if (!this.isLocalStorageAvailable()) return;

    const dislikes = this.getDislikesFromStorage();
    // Increment the dislike count for the specific postId
    dislikes[postId] = (dislikes[postId] || 0) + 1;
    this.saveDislikesToStorage(dislikes);
  }
}
