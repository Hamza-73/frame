/**
 * All editorial content for the site lives here so the section components stay
 * presentational. Imagery is served from `/public/media` (local, optimised by
 * next/image) so the demo has no runtime third-party dependencies.
 */

export const SITE = {
  name: "FRAME",
  descriptor: "Independent creative production studio",
  locations: "London · Los Angeles",
  founded: "2014",
  showreelNote: "Reel 2026 · 01:48",
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/**
 * DEMO CONTACT DETAILS: replace before presenting to a real client.
 * `mailto:` and both social URLs are placeholders.
 */
export const CONTACT = {
  email: "hello@frame.film",
  emailHref: "mailto:hello@frame.film",
  studios: [
    { city: "London", line: "18 Bevenden Street, N1 6BG" },
    { city: "Los Angeles", line: "1123 Seward Street, CA 90038" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

export const PROJECT_TYPES = [
  "Brand film",
  "Commercial",
  "Fashion film",
  "Automotive",
  "Photography",
  "Social campaign",
  "Something else",
];

export const TICKER = [
  "Brand films",
  "Commercial production",
  "Creative direction",
  "Fashion film",
  "Automotive",
  "Photography",
  "Social campaigns",
];

export const STUDIO_STATS = [
  { value: "2014", label: "Founded in London", count: { from: 1990, to: 2014 } },
  { value: "120+", label: "Films delivered", count: { to: 120, suffix: "+" } },
  { value: "9", label: "Territories shot", count: { to: 9 } },
  { value: "1", label: "Craft standard", count: { to: 1 } },
];

export const projects = [
  {
    id: "apex",
    index: "01",
    title: "APEX",
    client: "APEX Motorsport",
    category: "Automotive Campaign",
    year: "2025",
    location: "Nevada, US",
    accent: "ember",
    tagline: "A car film with no car chase.",
    summary:
      "Ninety seconds of restraint, then noise. A launch campaign built on the silence before the speed.",
    description: [
      "A three-part launch campaign for an electric performance marque, shot across a decommissioned airfield in Nevada. We stripped the script back to a single idea: everything interesting happens before the wheels move.",
      "The hero film holds a locked-off wide for its first forty seconds, letting heat shimmer and tyre smoke do the work. When the cut finally comes, it lands harder for the wait.",
    ],
    services: ["Creative direction", "Production", "Cinematography", "Colour grade", "Sound design"],
    deliverables: ["Hero film 90s", "6 × 15s cutdowns", "42 campaign stills", "OOH master"],
    cover: { src: "/media/apex-01.jpg", alt: "The rear of a black SUV photographed in a darkened studio" },
    gallery: [
      { src: "/media/apex-02.jpg", alt: "A single car headlight isolated against a black background" },
      { src: "/media/apex-03.jpg", alt: "A car moving through city streets at speed" },
    ],
  },
  {
    id: "maison",
    index: "02",
    title: "MAISON",
    client: "Maison Aurel",
    category: "Luxury Fashion Film",
    year: "2025",
    location: "Lisbon, PT",
    accent: "lime",
    tagline: "Cut on the body's rhythm.",
    summary:
      "A collection film shot as one continuous movement through a Lisbon townhouse.",
    description: [
      "For the autumn collection we agreed on a single rule: no cuts for the first forty-seven seconds. The camera follows the fabric rather than the model, and the house (stairwell, tile, shadow) becomes the second lead.",
      "Everything was lit with practicals and one bounced source, so the palette belongs to the building instead of the grade.",
    ],
    services: ["Creative direction", "Fashion film", "Production", "Editorial", "Grade"],
    deliverables: ["Hero film 2:10", "Vertical cut 45s", "Editorial stills", "Campaign teaser"],
    cover: { src: "/media/maison-01.jpg", alt: "A model in a black sleeveless dress photographed in low light" },
    gallery: [
      { src: "/media/maison-02.jpg", alt: "A model in a sheer black top and gloves under editorial lighting" },
      { src: "/media/maison-03.jpg", alt: "Folded black fabric with deep creases" },
    ],
  },
  {
    id: "still-form",
    index: "03",
    title: "STILL / FORM",
    client: "Ostrom Atelier",
    category: "Architecture & Interiors",
    year: "2024",
    location: "Basel, CH",
    accent: "ember",
    tagline: "Light is the only actor.",
    summary:
      "A documentary portrait of a concrete chapel and the studio that built it.",
    description: [
      "Shot across four days at the same hours each morning, letting the building perform on its own schedule. We never moved a light or a chair.",
      "The result sits between architecture film and portraiture: a record of a space that behaves differently every fifteen minutes.",
    ],
    services: ["Direction", "Documentary", "Photography", "Colour grade"],
    deliverables: ["Documentary 8:20", "Architect interview", "60 stills", "Exhibition loop"],
    cover: { src: "/media/still-form-01.jpg", alt: "A grey concrete monolith photographed against the sky" },
    gallery: [
      { src: "/media/still-form-02.jpg", alt: "A dark brick wall beneath a modern skylight" },
      { src: "/media/still-form-03.jpg", alt: "Sunlight falling across a bare concrete room" },
    ],
  },
  {
    id: "after-hours",
    index: "04",
    title: "AFTER HOURS",
    client: "The Ninth Room",
    category: "Premium Hospitality",
    year: "2024",
    location: "London, UK",
    accent: "lime",
    tagline: "The last hour is the best hour.",
    summary:
      "A members' bar campaign that sold the atmosphere instead of the cocktail list.",
    description: [
      "Cast entirely from real members, filmed after close, and lit almost exclusively by the room's own fixtures. We asked the staff to behave as though the doors were shut: which is exactly how the room looks best.",
      "Delivered as a single film plus a vertical series designed to be watched with the sound off.",
    ],
    services: ["Strategy", "Production", "Casting", "Photography", "Social"],
    deliverables: ["Brand film 1:20", "5 × vertical films", "Interior stills", "Menu shoot"],
    cover: { src: "/media/after-hours-01.jpg", alt: "A dimly lit bar with a glowing counter" },
    gallery: [
      { src: "/media/after-hours-02.jpg", alt: "A dark restaurant interior with set tables" },
      { src: "/media/after-hours-03.jpg", alt: "A cocktail in a rocks glass photographed in close-up" },
    ],
  },
];

export const STORY_PANELS = [
  {
    id: "strategy",
    index: "01",
    title: "Strategy",
    copy: "We start with the feeling we want an audience to leave with, then reverse-engineer the story that produces it. No deck survives the first honest conversation.",
    image: { src: "/media/hs-strategy.jpg", alt: "A clapperboard held on set before a take" },
  },
  {
    id: "production",
    index: "02",
    title: "Production",
    copy: "A small senior crew, one location at a time, every frame accounted for. We over-plan so the set stays loose enough for the accident that makes the film.",
    image: { src: "/media/hs-production.jpg", alt: "A film crew working on a large soundstage" },
  },
  {
    id: "post",
    index: "03",
    title: "Post-production",
    copy: "Edit, sound and grade under one roof, until the film sounds the way it looks. Nothing leaves the building before it does.",
    image: { src: "/media/hs-post.jpg", alt: "An editing suite glowing in a darkened room" },
  },
];

export const services = [
  {
    number: "01",
    name: "Brand films",
    copy: "Long-form films that carry a point of view rather than a product description.",
    image: { src: "/media/svc-brand.jpg", alt: "A crew member holding a cinema camera" },
  },
  {
    number: "02",
    name: "Commercial production",
    copy: "End-to-end production for broadcast, digital and out-of-home: at any scale.",
    image: { src: "/media/svc-commercial.jpg", alt: "A group gathered around a camera setup" },
  },
  {
    number: "03",
    name: "Creative direction",
    copy: "Treatments, casting and art direction that give an idea a face.",
    image: { src: "/media/svc-creative.jpg", alt: "Hands sketching ideas into a notebook" },
  },
  {
    number: "04",
    name: "Photography",
    copy: "On-set stills and standalone campaigns, graded to sit beside the film.",
    image: { src: "/media/svc-photography.jpg", alt: "A studio light and director's chair inside a photography studio" },
  },
  {
    number: "05",
    name: "Social campaigns",
    copy: "Native-first vertical work that never looks like an afterthought.",
    image: { src: "/media/svc-social.jpg", alt: "A camera operator holding a gimbal rig" },
  },
];

export const processStages = [
  {
    id: "pre-production",
    index: "01",
    title: "Pre-production",
    copy: "Treatment, location scouting, casting and a shot list you can actually shoot on the day. We over-plan so the set stays loose.",
    detail: ["Treatment & mood film", "Casting from real people", "Location & permits", "Shot list and floorplan"],
    image: { src: "/media/process-pre.jpg", alt: "A camera body on a dark table during pre-production" },
  },
  {
    id: "production",
    index: "02",
    title: "Production",
    copy: "Senior crew, minimal footprint, a monitor everyone can see. Nothing gets decided in the edit that could be decided on the day.",
    detail: ["Senior-only crew", "Single-source lighting", "On-set colour", "Daily review cuts"],
    image: { src: "/media/process-production.jpg", alt: "A crew gathered around a camera in darkness" },
  },
  {
    id: "post-production",
    index: "03",
    title: "Post-production",
    copy: "Editorial, sound and grade under one roof, so the film keeps its temperature all the way to delivery.",
    detail: ["Offline & online edit", "Original score", "Grade in a calibrated suite", "Delivery masters"],
    image: { src: "/media/process-post.jpg", alt: "A keyboard and monitor inside a grading suite" },
  },
];

export const CTA_IMAGE = {
  src: "/media/cta-background.jpg",
  alt: "A car on an empty road at night",
};

export const PANORAMA_IMAGE = {
  src: "/media/panorama-ridgeline.jpg",
  alt: "A mountain ridgeline under a dark night sky",
};

export const SHADOW_IMAGE = {
  src: "/media/texture-shadow.jpg",
  alt: "The shadow of a wall cast in black and white",
};

export const HERO_IMAGE = {
  src: "/media/hero-film-set.jpg",
  alt: "A film crew silhouetted on a darkened soundstage",
};

export const STUDIO_IMAGES = {
  portrait: { src: "/media/studio-portrait.jpg", alt: "A cinematographer holding a camera in low light" },
  behind: { src: "/media/studio-bts.jpg", alt: "A camera operator filming on a tripod lit by blue and red light" },
};
