export interface Testimonial {
  quote: string;
  name: string;
  date: string;
}

// Add new entries here as outlets/speakers publish on the book — newest first.
export const testimonials: Testimonial[] = [
  {
    quote:
      "It is such a privilege to share a few thoughts with you today in celebration on the occasion of this very important monograph about Patterson.",
    name: "Danielle Knapp",
    date: "July 2026",
  },
];
