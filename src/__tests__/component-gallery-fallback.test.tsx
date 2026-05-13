/**
 * Component tests — GalleryFallback (visual smoke for the non-WebGL path)
 *
 * Covers:
 *   - Renders a card for every image passed in
 *   - Each card is a button when onImageClick is provided
 *   - Clicking a card calls onImageClick with the correct slug
 *   - onImagesLoaded is called on mount
 *   - SR-only reason label is rendered when reason prop is set
 *   - Cards are plain divs (not buttons) when onImageClick is omitted
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryFallback from '@/features/gallery/GalleryFallback';
import type { NormalizedImage } from '@/features/gallery/useTextureLoader';

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

const IMAGES: NormalizedImage[] = [
  { src: '/projects/a.png', alt: 'Project Alpha', slug: 'alpha' },
  { src: '/projects/b.png', alt: 'Project Beta',  slug: 'beta'  },
  { src: '/projects/c.png', alt: 'Project Gamma', slug: 'gamma' },
];

describe('GalleryFallback', () => {
  it('renders a card for every image', () => {
    render(<GalleryFallback images={IMAGES} />);
    IMAGES.forEach(img => {
      expect(screen.getByText(img.alt)).toBeInTheDocument();
    });
  });

  it('renders buttons when onImageClick is provided', () => {
    render(<GalleryFallback images={IMAGES} onImageClick={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(IMAGES.length);
  });

  it('calls onImageClick with the correct slug on click', () => {
    const onClick = vi.fn();
    render(<GalleryFallback images={IMAGES} onImageClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Project Alpha/i }));
    expect(onClick).toHaveBeenCalledWith('alpha');
  });

  it('calls onImagesLoaded on mount', () => {
    const onLoaded = vi.fn();
    render(<GalleryFallback images={IMAGES} onImagesLoaded={onLoaded} />);
    expect(onLoaded).toHaveBeenCalledTimes(1);
  });

  it('renders an SR-only status label for no-webgl reason', () => {
    render(<GalleryFallback images={IMAGES} reason="no-webgl" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/WebGL is not available/i);
  });

  it('renders an SR-only status label for reduced-motion reason', () => {
    render(<GalleryFallback images={IMAGES} reason="reduced-motion" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/reduced/i);
  });

  it('renders no buttons when onImageClick is omitted', () => {
    render(<GalleryFallback images={IMAGES} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('renders the gallery list landmark', () => {
    render(<GalleryFallback images={IMAGES} />);
    expect(screen.getByRole('list', { name: /Project gallery/i })).toBeInTheDocument();
  });

  it('renders images with correct alt text', () => {
    render(<GalleryFallback images={IMAGES} />);
    IMAGES.forEach(img => {
      expect(screen.getByAltText(img.alt)).toBeInTheDocument();
    });
  });
});
