/**
 * Shared Data
 */

const CATEGORIES = [
  { name: "All Products", icon: "layout-grid" },
  { name: "Electronics", icon: "smartphone" },
  { name: "Fashion", icon: "shirt" },
  { name: "Home & Living", icon: "home" },
  { name: "Accessories", icon: "package" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Studio Wireless Pro",
    price: 299.0,
    shortDescription: "Noise cancelling premium audio experience with 40h battery.",
    description: `Experience listening like never before with the Studio Wireless Pro headphones. Engineered for the true audiophile, these headphones feature industry-leading Active Noise Cancellation (ANC) that blocks out external distractions, allowing you to immerse yourself fully in your music. Whether you're commuting in a busy city or working in a bustling office, the Studio Wireless Pro ensures that only the sounds you want to hear get through. The custom-tuned 40mm drivers deliver a rich, balanced soundstage with deep, punchy bass and crystal-clear highs, bringing every detail of your favorite tracks to life.

Designed for all-day comfort, the Studio Wireless Pro is crafted with premium memory foam ear cushions wrapped in soft, breathable protein leather. The lightweight, adjustable headband ensures a perfect fit for any head shape, eliminating fatigue even during the longest listening sessions. With up to 40 hours of battery life on a single charge, you can keep the music playing for days without needing to reach for a cable. And when you do need a boost, the quick-charge feature gives you 4 hours of playback with just a 10-minute charge.

Connectivity is seamless with the latest Bluetooth 5.3 technology, providing a stable, lag-free connection to your devices. The built-in microphone array utilizes beamforming technology to ensure your voice is heard clearly during calls, even in windy or noisy environments. Compatible with both iOS and Android, the Studio Wireless Pro also supports multi-point connection, allowing you to switch effortlessly between your phone and laptop. Elevate your audio experience with the perfect blend of style, comfort, and performance.`,
    image: "src/images/headphones.jpg", // Relative to index.html. Need to handle pathing for subpages.
    isNew: true,
    category: "Electronics",
    features: [
        "Active Noise Cancellation (ANC)",
        "40-Hour Battery Life",
        "Bluetooth 5.3 Connectivity",
        "Premium Memory Foam Cushions"
    ],
    reviews: 124,
    rating: 5
  },
  {
    id: "2",
    title: "Chronos Minimalist Watch",
    price: 185.0,
    shortDescription: "Precision engineered silver watch with leather strap.",
    description: `The Chronos Minimalist Watch is a testament to the beauty of simplicity. Stripping away the unnecessary, this timepiece focuses on what truly matters: elegance and precision. The ultra-slim stainless steel case features a brushed silver finish that catches the light just right, offering a sophisticated look that pairs perfectly with both casual and formal attire. The clean, uncluttered dial is protected by scratch-resistant sapphire crystal, ensuring that your watch remains as pristine as the day you bought it.

At the heart of the Chronos is a high-precision Japanese quartz movement, renowned for its reliability and accuracy. You'll never miss a beat with a timepiece that keeps perfect time, day in and day out. The genuine leather strap is soft to the touch and develops a unique patina over time, telling your personal story through its wear. It features a quick-release mechanism, allowing you to swap straps in seconds to match your outfit or mood.

Water-resistant up to 50 meters, the Chronos Minimalist Watch is built to withstand the rigors of daily life, whether you're caught in the rain or washing your hands. It's more than just a way to tell time; it's a statement of style and a commitment to quality. The watch comes in a premium presentation box, making it the perfect gift for yourself or a loved one who appreciates fine craftsmanship and timeless design.`,
    image: "src/images/watch.jpg",
    isNew: false,
    category: "Accessories",
    features: [
        "Japanese Quartz Movement",
        "Sapphire Crystal Glass",
        "Genuine Leather Strap",
        "50m Water Resistance"
    ],
    reviews: 86,
    rating: 4.5
  },
  {
    id: "3",
    title: "Nomad Leather Backpack",
    price: 145.0,
    shortDescription: "Genuine full-grain leather for the modern traveler.",
    description: `Embark on your next adventure with the Nomad Leather Backpack, the ultimate companion for the computer-toting traveler. Handcrafted from premium full-grain leather, this backpack is designed to age gracefully, developing a rich, rugged character that is uniquely yours. The durable construction is complemented by heavy-duty brass hardware and reinforced stitching, ensuring that it can handle whatever your journey throws at it.

Functionality meets style in the Nomad's thoughtful design. The spacious main compartment features a padded sleeve that comfortably fits laptops up to 15 inches, keeping your tech safe and secure. Multiple interior pockets provide organized storage for your charger, cables, notebook, and other essentials, while the easy-access front pocket is perfect for your passport, keys, or phone. The exterior side pockets are sized just right for a water bottle or umbrella.

Comfort hasn't been overlooked. The adjustable shoulder straps are padded and contoured to distribute weight evenly, reducing strain on your shoulders during long commutes or treks. The breathable back panel promotes airflow, keeping you cool on the move. Whether you're navigating the urban jungle or exploring the great outdoors, the Nomad Leather Backpack combines timeless aesthetics with modern utility to keep you organized and stylish.`,
    image: "src/images/backpack.jpg",
    isNew: false,
    category: "Fashion",
    features: [
        "Full-Grain Leather",
        "15-inch Laptop Sleeve",
        "Reinforced Stitching",
        "Ergonomic Padded Straps"
    ],
    reviews: 42,
    rating: 4.8
  },
  {
    id: "4",
    title: "Smart Hub Controller",
    price: 120.0,
    shortDescription: "Universal automation for your smart home devices.",
    description: `Transform your living space into a truly intelligent home with the Smart Hub Controller. This sleek, compact device acts as the central brain of your smart ecosystem, unifying all your connected devices into one seamless interface. Compatible with over 50,000 devices from thousands of brands, including lights, locks, thermostats, and sensors, the Smart Hub allows you to control everything from a single app or via voice commands with Alexa, Google Assistant, or Siri.

Setting up automation has never been easier. Create custom routines that fit your lifestyle—have the lights slowly brighten and the coffee maker start when you wake up, or ensure all doors are locked and the thermostat is adjusted when you leave for work. The intuitive mobile app gives you real-time status updates and alerts, so you can monitor your home from anywhere in the world. Security is a top priority, with bank-grade encryption ensuring your data and privacy are always protected.

The Smart Hub Controller isn't just about convenience; it's about efficiency. By optimizing your home's energy usage through smart scheduling and sensor-based automation, you can significantly reduce your utility bills. Its modern, minimalist design blends effortlessly with any home decor, and the reliable wireless connectivity ensures that your commands are executed instantly. Upgrade to the Smart Hub Controller and experience the future of home living today.`,
    image: "src/images/shub.jpg",
    isNew: false,
    category: "Electronics",
    features: [
        "Universal Compatibility",
        "Voice Assistant Support",
        "Custom Automation Routines",
        "Bank-Grade Security"
    ],
    reviews: 15,
    rating: 4.2
  },
  {
    id: "5",
    title: "Mechanical Tactile Keyboard",
    price: 155.0,
    shortDescription: "Hot-swappable tactile switches with RGB lighting.",
    description: `Elevate your typing and gaming experience with our Mechanical Tactile Keyboard. Built for enthusiasts and professionals alike, this keyboard features high-performance tactile mechanical switches that provide a satisfying bump and audible click with every keystroke, ensuring precision and feedback that membrane keyboards simply can't match. The hot-swappable PCB allows you to easily change out switches without soldering, giving you the freedom to customize the feel and sound of your board to your exact preference.

Aesthetics meet functionality with the dynamic per-key RGB lighting. Choose from millions of colors and a variety of lighting effects to match your setup or mood, all controllable directly from the keyboard or via our intuitive software. The keycaps are made from durable double-shot PBT, resistant to shine and wear, so the legends will never fade even after years of intense use. The compact 75% layout saves desk space without sacrificing essential keys like the arrow cluster and function row.

Durability is key. The keyboard boasts a solid aluminum top plate that provides structural integrity and a premium weight. Full N-key rollover and anti-ghosting technology ensure that every keypress is registered accurately, no matter how fast you type. Detachable USB-C connectivity offers portability and ease of use. Whether you're coding the next big app or battling in an intense ranked match, this Mechanical Tactile Keyboard delivers the performance and reliability you demand.`,
    image: "src/images/keyboard.jpg",
    isNew: true,
    category: "Electronics",
    features: [
        "Hot-Swappable Switches",
        "Per-Key RGB Lighting",
        "Double-Shot PBT Keycaps",
        "Aluminum Top Plate"
    ],
    reviews: 204,
    rating: 4.9
  },
  {
    id: "6",
    title: "Oak Aura Desk Lamp",
    price: 89.0,
    shortDescription: "Natural wood finish with adjustable warm light.",
    description: `Bring a touch of nature and warmth to your workspace with the Oak Aura Desk Lamp. Handcrafted from sustainably sourced solid oak, this lamp features a stunning wood grain finish that adds organic beauty to any modern or traditional desk setup. The design is both minimalist and functional, with a flexible arm that allows you to direct light exactly where you need it, perfect for late-night reading, detailed work, or creating a cozy ambient atmosphere.

The Oak Aura is equipped with a high-quality LED light source that emits a soft, warm glow, designed to reduce eye strain and promote relaxation. With the integrated touch-sensitive dimmer, you can easily adjust the brightness levels to suit your task—from a bright focus light to a gentle nightlight. The energy-efficient LED technology ensures a long lifespan of up to 50,000 hours, meaning you won't have to worry about changing bulbs for years to come.

Safety and stability are built-in. The weighted base ensures the lamp stays firmly in place, while the non-slip felt bottom protects your furniture from scratches. The cloth-covered cord adds a final touch of premium texture and durability. More than just a light source, the Oak Aura Desk Lamp is a piece of functional art that enhances your environment and wellbeing. Illuminate your work with style and sustainability.`,
    image: "src/images/lamp.jpg",
    isNew: false,
    category: "Home & Living",
    features: [
        "Solid Oak Construction",
        "Dimmable Warm LED",
        "Adjustable Flexible Arm",
        "Touch Control Base"
    ],
    reviews: 58,
    rating: 4.6
  },
  {
    id: "7",
    title: "Sonic Buds Gen 2",
    price: 129.0,
    shortDescription: "Active noise cancellation with crystal clear voice calls.",
    description: `Immerse yourself in pure sound with the Sonic Buds Gen 2. These next-generation wireless earbuds have been re-engineered from the ground up to deliver a premium audio experience that rivals bulky over-ear headphones. At the core is our advanced Active Noise Cancellation (ANC) technology, which intelligently adapts to your environment to silence unwanted background noise, whether you're on a plane or in a café. Transparency mode lets you hear the world around you with a tap, perfect for quick conversations.

The sonic performance is driven by custom 11mm dynamic drivers that produce a soundscape with deep, resonant bass and sparklingly clear trebles. We've also upgraded the microphone system with AI-enhanced noise reduction, ensuring your voice comes through crystal clear on calls, even in windy conditions. The ergonomic design ensures a secure, comfortable fit for all ear shapes, and with an IPX5 water resistance rating, they are perfect for sweaty workouts or runs in the rain.

Battery life is impressive, offering up to 8 hours of listening time on a single charge and an additional 24 hours with the compact wireless charging case. Fast pairing ensures you're connected the moment you open the case. With intuitive touch controls, you can manage your music, calls, and voice assistant without reaching for your phone. Experience the freedom of wireless audio without compromise with the Sonic Buds Gen 2.`,
    image: "src/images/buds.jpg",
    isNew: false,
    category: "Electronics",
    features: [
        "Adaptive ANC",
        "IPX5 Water Resistance",
        "32-Hour Total Battery",
        "AI-Enhanced Microphones"
    ],
    reviews: 310,
    rating: 4.7
  },
  {
    id: "8",
    title: "Organic Cotton Tee",
    price: 35.0,
    shortDescription: "Sustainable fabric with relaxed, breathable fit.",
    description: `Discover the perfect essential with our Organic Cotton Tee. We believe that a t-shirt should be more than just a basic layer; it should be a commitment to quality and the planet. Made from 100% GOTS-certified organic cotton, this tee is grown without harmful chemicals or pesticides, resulting in a fabric that is incredibly soft, breathable, and kind to sensitive skin. The medium-weight jersey fabric drapes beautifully, offering a fit that is relaxed yet tailored.

Every detail has been considered for durability and comfort. The neck is reinforced with cover stitching to maintain its shape wash after wash, and the garment is pre-shrunk to minimize shrinkage. The classic crew neck design makes it a versatile piece that pairs effortlessly with jeans, shorts, or layered under a jacket. It's the ultimate wardrobe staple for the conscious consumer who refuses to sacrifice style for sustainability.

Available in a range of earth-inspired colors, our Organic Cotton Tee is dyed using eco-friendly, low-impact dyes that save water and energy. By choosing this tee, you're supporting ethical manufacturing practices and reducing your environmental footprint. Feel the difference of premium organic cotton and embrace a style that feels as good as it looks. It's not just a t-shirt; it's a better choice for you and the world.`,
    image: "src/images/tee.jpg",
    isNew: false,
    category: "Fashion",
    features: [
        "100% Organic Cotton",
        "GOTS Certified",
        "Pre-Shrunk Fabric",
        "Eco-Friendly Dyes"
    ],
    reviews: 45,
    rating: 4.4
  },
];

// Export for usage if using modules, but for now we'll rely on global scope inclusion order
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, MOCK_PRODUCTS };
}
