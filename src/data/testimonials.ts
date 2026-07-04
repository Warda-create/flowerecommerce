// src/data/testimonials.ts
import { Testimonial, TeamMember } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sophia Martinez",
    avatar: "/images/testimonials/45.jpg",
    location: "New York, NY",
    rating: 5,
    comment:
      "I ordered the Eternal Romance bouquet for our 10th anniversary and my husband was absolutely speechless. The flowers arrived perfectly packaged, fresh, and even more beautiful than the photos. The delivery was prompt and the gift message card was elegant. Flora & Grace has our business for life!",
    occasion: "Anniversary",
    date: "2024-02-14",
  },
  {
    id: "2",
    name: "James O'Brien",
    avatar: "/images/testimonials/46.jpg",
    location: "Chicago, IL",
    rating: 5,
    comment:
      "I've been ordering from Flora & Grace for 3 years now for my wife's birthday. Every single time, the quality exceeds my expectations. Their customer service is exceptional too — when I had a last-minute delivery time change, they accommodated it without any fuss.",
    occasion: "Birthday",
    date: "2024-01-20",
  },
  {
    id: "3",
    name: "Isabella Chen",
    avatar: "/images/testimonials/47.jpg",
    location: "San Francisco, CA",
    rating: 5,
    comment:
      "The Pink Bliss Peonies are absolutely heavenly. As a florist myself, I can appreciate the quality of these blooms — they're sourced beautifully and arranged with real artistry. I ordered them for my own home and couldn't be happier.",
    occasion: "Just Because",
    date: "2024-02-05",
  },
  {
    id: "4",
    name: "Robert Williams",
    avatar: "/images/testimonials/48.jpg",
    location: "Miami, FL",
    rating: 5,
    comment:
      "Sent the Sympathy Garden Basket to my colleague who lost her mother. She told me the flowers were gorgeous and that they brought some comfort during a difficult time. Thank you for handling this with such care and thoughtfulness.",
    occasion: "Sympathy",
    date: "2024-01-30",
  },
  {
    id: "5",
    name: "Emily Johnson",
    avatar: "/images/testimonials/49.jpg",
    location: "Seattle, WA",
    rating: 5,
    comment:
      "The Blush & Berry Bridal bouquet was everything I dreamed of for my wedding day. Flora & Grace worked with me months in advance to customize it perfectly. On my wedding day, it was flawless. Worth every penny for the most important day of my life.",
    occasion: "Wedding",
    date: "2024-02-18",
  },
  {
    id: "6",
    name: "Michael Thompson",
    avatar: "/images/testimonials/50.jpg",
    location: "Boston, MA",
    rating: 4,
    comment:
      "Excellent quality flowers and a beautifully designed website that makes ordering a pleasure. The Mother's Day Garden I sent to my mom had her in tears of joy. The fresh flower scent was incredible and lasted over 10 days.",
    occasion: "Mother's Day",
    date: "2024-02-10",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Grace Laurent",
    role: "Founder & Head Florist",
    bio: "With over 20 years of experience in floral design, Grace founded Flora & Grace to bring Paris-quality floral artistry to American homes. Trained at the École Nationale Supérieure de Fleuriste in Paris, she combines traditional techniques with modern aesthetics.",
    image: "/images/team/49.jpg",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "2",
    name: "Marco Rossi",
    role: "Creative Director",
    bio: "Marco's background in fine arts and interior design brings a distinctive visual sensibility to every arrangement. He leads our creative team, setting trends and developing signature collections that grace the pages of major lifestyle magazines.",
    image: "/images/team/50.jpg",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "3",
    name: "Amelia Park",
    role: "Senior Floral Designer",
    bio: "Amelia specializes in wedding and event florals, having designed for over 200 weddings across the country. Her meticulous attention to detail and ability to translate a couple's vision into floral reality has made her one of our most sought-after designers.",
    image: "/images/team/51.jpg",
    social: {
      instagram: "https://instagram.com",
    },
  },
  {
    id: "4",
    name: "David Chen",
    role: "Head of Sustainability",
    bio: "David ensures that every flower we sell meets our strict sustainability standards. He works directly with our network of 50+ certified farms to maintain ethical sourcing practices, fair trade principles, and environmentally responsible growing methods.",
    image: "/images/team/52.jpg",
    social: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
];