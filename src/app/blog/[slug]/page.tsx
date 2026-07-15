// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, CalendarDays, User, Clock, Share2 } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BLOG_POSTS: Record<string, BlogPost> = {
"luxury-destinations-this-year": {
    title: "10 Luxury Destinations You Must Visit This Year",
    category: "Luxury Travel",
    date: "July 10, 2026",
    author: "StayNest Team",
    readTime: "8 min read", 
    image: "/b-1.jpg",
    content: `
      <p>True luxury isn't just about five-star hotels anymore; it's about curated experiences, absolute privacy, and destinations that leave a lasting impact on your soul. This year, the global elite are leaning towards <em>mindful luxury</em>—a beautiful philosophy that combines strict environmental sustainability with world-class comfort and bespoke hospitality.</p>
      
      <p>Whether you dream of waking up over a crystal-clear ocean lagoon, exploring ancient cultural roots, or breathing crisp mountain air from a private infinity pool, these ten handpicked luxury destinations deserve a top spot on your bucket list this year.</p>

      <h3>1. Amalfi Coast, Italy</h3>
      <p>The Amalfi Coast remains the ultimate crown jewel of Mediterranean luxury. With its vibrant, pastel-colored villages clinging precariously to steep limestone cliffs, this legendary Italian destination is best experienced away from the crowds—ideally from the sparkling blue water.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Rent a private vintage Riva boat to explore hidden grottos, secluded beaches, and the iconic coastal silhouette at sunset.</li>
        <li><strong>Where to Stay:</strong> Historic cliffside boutique hotels in Positano or Ravello featuring private lemon groves and Michelin-starred dining.</li>
      </ul>
      
      <h3>2. Kyoto, Japan</h3>
      <p>Kyoto offers a sophisticated luxury that feeds the soul. Stepping away from the futuristic, neon-lit streets of Tokyo, Kyoto focuses deeply on preserving traditional architecture, manicured zen gardens, and centuries-old historic hospitality (Omotenashi).</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Book a private, master-led tea ceremony inside a beautifully preserved wooden machiya that is closed to the general public.</li>
        <li><strong>Where to Stay:</strong> An ultra-luxury <em>Ryokan</em> (traditional Japanese inn) featuring Tatami mats, multi-course Kaiseki dining, and private open-air hot springs (onsen).</li>
      </ul>

      <h3>3. Bora Bora, French Polynesia</h3>
      <p>Widely considered the ultimate global destination for absolute privacy and romantic escapes. Bora Bora boasts a unique geography defined by a striking volcanic peak surrounded by a mesmerizing, multi-toned turquoise lagoon.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Snorkel directly from your villa deck alongside marine biologists to explore private coral restoration projects and feed manta rays.</li>
        <li><strong>Where to Stay:</strong> Iconic overwater villas with glass-bottom floors, private plunge pools, and 24/7 boat-butler service.</li>
      </ul>

      <h3>4. Reykjanes Peninsula, Iceland</h3>
      <p>For travelers who equate luxury with raw adventure and dramatic landscapes, Iceland is redefining high-end hospitality. The Reykjanes region allows you to experience volcanic wonders without sacrificing elite comforts.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Take a private helicopter tour over active volcanic craters followed by a midnight soak in a VIP section of the Blue Lagoon.</li>
        <li><strong>Where to Stay:</strong> Architectural eco-hotels integrated directly into moss-covered lava fields, featuring massive floor-to-ceiling windows for Northern Lights viewing.</li>
      </ul>

      <h3>5. Serengeti National Park, Tanzania</h3>
      <p>An African safari is a classic bucket-list trip, but the luxury tier takes it to an entirely new level. Experience the raw majesty of the wild while enjoying comforts that rival any metropolitan five-star resort.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> A sunrise hot air balloon safari drifting silently over the Great Migration, followed by a champagne breakfast cooked by a private chef in the middle of the savannah.</li>
        <li><strong>Where to Stay:</strong> High-end glamping pavilions and canvas suites featuring private viewing decks, outdoor copper tubs, and personal safari guides.</li>
      </ul>

      <h3>6. Santorini, Greece</h3>
      <p>Famous for its dramatic volcanic caldera and iconic blue-domed churches, Santorini is the epitome of high-end Aegean relaxation. The real luxury here lies in watching the world's most beautiful sunset away from the public viewing points.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> A private wine-tasting tour through centuries-old volcanic vineyards, accompanied by a professional sommelier.</li>
        <li><strong>Where to Stay:</strong> Cave villas sculpted directly into the volcanic rock face in Oia, complete with heated infinity pools that seem to blend straight into the Aegean Sea.</li>
      </ul>

      <h3>7. Queenstown & Fiordland, New Zealand</h3>
      <p>Often dubbed the adventure capital of the world, Queenstown caters effortlessly to luxury travelers looking for high-octane thrills paired with absolute seclusion and pristine natural environments.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Fly via private chopper into the untouched fiords of Milford Sound for a day of isolation hiking, glacier-water kayaking, and high-altitude picnics.</li>
        <li><strong>Where to Stay:</strong> Ultra-exclusive alpine lodges overlooking Lake Wakatipu, featuring private helipads, indoor roaring fireplaces, and premium local Pinot Noir cellars.</li>
      </ul>

      <h3>8. Saint-Tropez, French Riviera</h3>
      <p>The playground of artists, celebrities, and billionaires since the 1950s. Saint-Tropez masterfully blends traditional Provençal charm—like historic cobblestone markets—with high-end yacht culture and exclusive beach clubs.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Secure a VIP reservation at a private beach club along Pampelonne Beach, accessible only via yacht tender.</li>
        <li><strong>Where to Stay:</strong> Secluded Mediterranean-style châteaux tucked away in the pine-covered hills, offering complete anonymity and sweeping ocean vistas.</li>
      </ul>

      <h3>9. Al Hajar Mountains, Oman</h3>
      <p>Oman is the Middle East’s best-kept luxury secret, trading glittering skyscrapers for authentic heritage and striking geological wonders. The rugged Al Hajar mountain range offers dramatic views and crisp, refreshing air.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> A guided stargazing session from a private mountain peak, thousands of feet above sea level, with zero light pollution.</li>
        <li><strong>Where to Stay:</strong> Clifftop luxury resorts designed like ancient Omani stone forts, hanging dramatically over deep canyons.</li>
      </ul>

      <h3>10. The Maldives (Private Islands)</h3>
      <p>No luxury travel list is complete without the Maldives. Moving beyond standard resorts, the trend now focuses on renting entirely private coral islands for the ultimate socially-distanced vacation.</p>
      <ul>
        <li><strong>Bespoke Experience:</strong> Dine at an exclusive underwater restaurant located five meters below the ocean surface, surrounded by vibrant marine life.</li>
        <li><strong>Where to Stay:</strong> Multi-bedroom ultra-villas built on private sandbanks, featuring personal waterslides, retractable roofs for sleeping under the stars, and dedicated 24-hour lifestyle hosts.</li>
      </ul>

      <hr />
      <blockquote>
        <strong>Final Travel Tip:</strong> When booking these elite locations, remember that high-season spots fill up up to a year in advance. Consider traveling during the "shoulder months" (e.g., May for Amalfi, September for Santorini) to experience the same luxury with far fewer crowds.
      </blockquote>
    `,
  },
  "best-places-to-travel-2026": {
    title: "Best Places To Travel In 2026",
    category: "Destination",
    date: "June 25, 2026",
    author: "StayNest Team",
    readTime: "5 min read",
    image: "/des.jpg",
    content: `
      <p>As we navigate 2026, travelers are seeking off-the-beaten-path locations over overcrowded tourist traps. Here are the top trending destinations capturing global attention this year.</p>
      
      <h3>1. Koh Samui, Thailand</h3>
      <p>While Phuket has always been crowded, Koh Samui has transformed into a high-end wellness sanctuary. It perfectly balances pristine white-sand beaches with premium eco-resorts.</p>
      
      <h3>2. Big Sky, Montana, USA</h3>
      <p>For those who prefer crisp mountain air over ocean breezes, Montana is the place to be. Luxury ranches here offer private fly-fishing streams, horseback riding, and gourmet farm-to-table dining under the stars.</p>
      
      <h3>3. Ljubljana, Slovenia</h3>
      <p>Europe's greenest capital is the perfect hidden gem. It offers stunning fairytale architecture, zero-emission city zones, and incredible lake views without the massive crowds of Paris or Rome.</p>
    `,
  },
  "how-to-choose-perfect-hotel": {
    title: "How To Choose The Perfect Hotel",
    category: "Hotel Guide",
    date: "June 18, 2026",
    author: "StayNest Team",
    readTime: "4 min read",
    image: "/guide.jpg",
    content: `
      <p>A bad hotel choice can ruin an otherwise perfect vacation. Finding the right accommodation requires looking beyond the basic price tag and promotional photos.</p>
      
      <h3>1. Location vs. Convenience</h3>
      <p>A hotel that is $20 cheaper but located an hour outside the city center will cost you more in taxi fares and lost time. Always map out your top 3 target attractions before filtering hotels.</p>
      
      <h3>2. Read Reviews Vertically, Not Horizontally</h3>
      <p>Don't just look at the overall score (e.g., 8.5/10). Filter reviews by <strong>"Most Recent"</strong> to check for sudden changes in management, cleanliness, or ongoing construction noise nearby.</p>
      
      <h3>3. Amenities Checklist</h3>
      <p>Does the hotel offer complimentary Wi-Fi, 24/7 room service, or a flexible cancellation policy? In 2026, flexibility is the ultimate luxury amenity.</p>
    `,
  },
  "luxury-travel-on-a-budget": {
    title: "Luxury Travel On A Budget",
    category: "Luxury Travel",
    date: "June 10, 2026",
    author: "StayNest Team",
    readTime: "5 min read",
    image: "/blog1.jpg",
    content: `
      <p>You don't need a million-dollar bank account to travel like a VIP. With smart planning, you can experience premium comfort for a fraction of the cost.</p>
      
      <h3>The Magic of 'Shoulder Season'</h3>
      <p>The shoulder season is the sweet spot between peak season and off-peak season. Traveling to Europe in September or Southeast Asia in April allows you to score 5-star hotel rooms at up to 50% discounts.</p>
      
      <h3>Leverage Credit Points & Loyalty Programs</h3>
      <p>Stop booking anonymously. Stick to major hotel chains or premium booking platforms like StayNest to accumulate loyalty points that can be redeemed for free room upgrades and lounge access.</p>
    `,
  },
  "top-mountain-retreats": {
    title: "Top Mountain Retreats",
    category: "Adventure",
    date: "May 28, 2026",
    author: "StayNest Team",
    readTime: "4 min read",
    image: "/adventure.jpg",
    content: `
      <p>Disconnect from the digital noise and reconnect with nature. These premier mountain retreats offer deep isolation paired with ultra-comfortable alpine cabins.</p>
      
      <h3>1. Zermatt, Switzerland</h3>
      <p>Nestled under the iconic Matterhorn, Zermatt is a car-free village that feels like a winter wonderland. Perfect for luxury skiing in winter and scenic hiking in summer.</p>
      
      <h3>2. Banff National Park, Canada</h3>
      <p>Wake up to the view of emerald lakes and massive pine forests. High-end eco-lodges here feature outdoor heated pools and private glass chalets designed for stargazing.</p>
    `,
  },
  "family-friendly-destinations": {
    title: "Family Friendly Destinations",
    category: "Family",
    date: "May 15, 2026",
    author: "StayNest Team",
    readTime: "5 min read",
    image: "/family.jpg",
    content: `
      <p>Planning a trip with kids requires a delicate balance between entertainment for children and relaxation for parents. Here are destinations that cater perfectly to multi-generational travel.</p>
      
      <h3>1. Gold Coast, Australia</h3>
      <p>Offering gorgeous beaches alongside world-class theme parks, the Gold Coast keeps everyone active. Family-friendly resorts here provide full kitchen facilities and dedicated kids' clubs.</p>
      
      <h3>2. Algarve, Portugal</h3>
      <p>Safe, sunny, and incredibly welcoming to children. The coastal resorts offer private villas with enclosed pools, calm ocean waters, and easy day trips to historic castles.</p>
    `,
  },
  "travel-safety-guide": {
    title: "Travel Safety Guide",
    category: "Travel Tips",
    date: "May 05, 2026",
    author: "StayNest Team",
    readTime: "6 min read",
    image: "/plan.jpg",
    content: `
      <p>Adventure is worthwhile, but safety is paramount. Traveling confidently in 2026 means being proactive about your digital and physical well-being.</p>
      
      <h3>1. Secure Digital Backups</h3>
      <p>Before leaving your house, upload clear digital copies of your passport, visa, flight tickets, and travel insurance to an encrypted cloud folder. Share this link with a trusted family member back home.</p>
      
      <h3>2. Research Common Local Scams</h3>
      <p>Every major tourist city has its unique scams—whether it's unregulated airport taxis or fake tour guides. Spend 20 minutes on travel forums reading about your specific destination before you arrive.</p>
      
      <h3>3. Invest in Premium Travel Insurance</h3>
      <p>Never skip insurance. A premium policy guarantees peace of mind against unexpected flight cancellations, lost baggage, or sudden medical emergencies overseas.</p>
    `,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) return { title: "Post Not Found | StayNest" };

  return {
    title: `${post.title} | StayNest Blog`,
    description: post.category,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FBF9] pb-24">
      
      <div className="mx-auto max-w-4xl px-6 pt-30">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors hover:text-[#16352E]"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to all blogs
        </Link>
      </div>

      <header className="mx-auto max-w-4xl px-6 pt-8 pb-6">
        <span className="inline-block rounded-xl bg-[#16352E]/5 px-3 py-1.5 text-xs font-bold text-[#16352E] border border-[#16352E]/10">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#16352E] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 text-xs text-gray-500">
          <div className="flex flex-wrap gap-5 font-semibold">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#16352E]" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#16352E]" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#16352E]" />
              {post.readTime}
            </div>
          </div>

          <button className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 font-bold text-gray-600 shadow-sm transition duration-200 hover:bg-gray-50 hover:text-[#16352E] active:scale-98">
            <Share2 size={14} /> 
            Share
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(22,53,46,0.05)] aspect-[16/9]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover transition duration-700 hover:scale-[1.01]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-12">
        <article
          className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed
            prose-headings:text-[#16352E] prose-headings:font-black prose-headings:tracking-tight
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:mb-6
            prose-strong:text-[#16352E]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      
    </main>
  );
}