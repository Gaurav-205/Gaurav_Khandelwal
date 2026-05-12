/**
 * Server component — static title overlay rendered on top of the 3-D gallery.
 * No JS is shipped for this element; it is pure HTML/CSS.
 */
import { Z_INDEX } from '@/lib/constants/zIndex';

export default function HeroOverlay() {
  return (
    <div
      className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center mix-blend-exclusion text-white"
      style={{ zIndex: Z_INDEX.GALLERY_OVERLAY }}
    >
      <div className="text-center">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
          <span className="italic">Gaurav Khandelwal</span>
        </h1>
        <p className="mt-4 text-white/60 font-montserrat text-sm tracking-widest">
          4 SHIPPED PROJECTS
        </p>
      </div>
    </div>
  );
}
