"use client";

import InfinitePerspectiveSlider from "@/components/ui/infinite-perspective-slider";

// Paints the theme background out of the box. Pass `images` for your own set.
export default function InfinitePerspectiveSliderDemo() {
  return (
    <InfinitePerspectiveSlider
      cardWidth={320}
      cardGap={24}
      perspective={2200}
      scrollSpeed={1}
      scrollLerp={0.1}
      maxRotation={80}
    />
  );
}
export { InfinitePerspectiveSliderDemo };
