import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BotpressLoaderService } from './botpress-loader.service';

describe('BotpressLoaderService', () => {
  afterEach(() => {
    document.querySelector('footer')?.remove();
    document.getElementById('botpress-webchat')?.remove();
    document.getElementById('botpress-config')?.remove();
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('loads Botpress sequentially only after the footer intersects', async () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    const disconnect = vi.fn();

    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe = vi.fn();
      disconnect = disconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '100px';
      thresholds = [0.1];
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
    document.body.appendChild(document.createElement('footer'));

    const service = TestBed.inject(BotpressLoaderService);
    service.initFooterDetection();

    expect(document.getElementById('botpress-webchat')).toBeNull();
    expect(document.getElementById('botpress-config')).toBeNull();

    intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    const injector = document.getElementById('botpress-webchat');
    expect(injector).not.toBeNull();
    expect(document.getElementById('botpress-config')).toBeNull();
    expect(disconnect).toHaveBeenCalledOnce();

    injector?.dispatchEvent(new Event('load'));
    await Promise.resolve();
    const config = document.getElementById('botpress-config');
    expect(config).not.toBeNull();

    config?.dispatchEvent(new Event('load'));
    await Promise.resolve();
    expect(service.loadState()).toBe('loaded');
  });
});
