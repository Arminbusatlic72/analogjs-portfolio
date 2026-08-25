import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

type BotpressLoadState = 'idle' | 'loading' | 'loaded' | 'error';

const BOTPRESS_INJECT_URL = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
const BOTPRESS_CONFIG_URL = 'https://files.bpcontent.cloud/2025/05/13/12/20250513125442-3XC30M7N.js';

@Injectable({ providedIn: 'root' })
export class BotpressLoaderService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly state = signal<BotpressLoadState>('idle');
  private observer: IntersectionObserver | null = null;

  readonly loadState = this.state.asReadonly();

  initFooterDetection(): void {
    if (!isPlatformBrowser(this.platformId) || this.observer || this.state() !== 'idle') return;

    const footer = this.document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        this.observer?.disconnect();
        this.observer = null;
        void this.loadOnDemand();
      },
      { rootMargin: '100px', threshold: 0.1 },
    );
    this.observer.observe(footer);
  }

  async loadOnDemand(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.state() === 'loading' || this.state() === 'loaded') return;

    this.state.set('loading');
    try {
      await this.appendScript('botpress-webchat', BOTPRESS_INJECT_URL);
      await this.appendScript('botpress-config', BOTPRESS_CONFIG_URL);
      this.state.set('loaded');
    } catch (error) {
      this.state.set('error');
      console.error('[BotpressLoader] Unable to load webchat.', error);
    }
  }

  cleanup(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private appendScript(id: string, src: string): Promise<void> {
    const existing = this.document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset['loaded'] === 'true') return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = existing ?? this.document.createElement('script');
      const handleLoad = () => {
        script.dataset['loaded'] = 'true';
        resolve();
      };
      const handleError = () => {
        script.remove();
        reject(new Error(`Failed to load ${src}`));
      };

      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      if (!existing) {
        script.id = id;
        script.src = src;
        script.async = true;
        this.document.body.appendChild(script);
      }
    });
  }
}
