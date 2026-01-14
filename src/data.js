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
    price: 180000,
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
    price: 115000,
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
    price: 90000,
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
    price: 72000,
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
    price: 95000,
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
    price: 55000,
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
    price: 80000,
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
    price: 21000,
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
  {
    id: "9",
    title: "Laptop Pro 15\"",
    price: 780000,
    shortDescription: "High-performance workstation with 4K display and all-day battery life.",
    description: `Unleash your creative potential with the Laptop Pro 15". Designed for professionals who demand power and portability, this machine features a stunning 15.6-inch 4K Retina-class display that delivers true-to-life colors and razor-sharp detail. Whether you're editing 8K video, designing complex 3D models, or simply enjoying your favorite movies, the visual experience is nothing short of breathtaking. Powered by the latest 12-core processor and dedicated graphics, it handles intensive tasks with ease, ensuring a smooth and responsive workflow.

The Laptop Pro 15" isn't just about raw performance; it's built for the long haul. The high-capacity battery provides up to 12 hours of usage on a single charge, keeping you productive from your morning commute to your late-night brainstorming sessions. The sleek, aerospace-grade aluminum chassis is both durable and lightweight, making it the perfect travel companion. With a comprehensive suite of ports including Thunderbolt 4, HDMI, and an SD card slot, connectivity is never an issue.

Typing is a joy on the backlit precision keyboard, which offers optimal key travel and tactile feedback. The expansive glass trackpad supports multi-touch gestures for intuitive navigation. Security is integrated seamlessly with a fingerprint sensor for instant login. Experience the perfect harmony of power, design, and efficiency with the Laptop Pro 15"—your ultimate tool for turning ideas into reality.`,
    image: "src/images/laptop.jpg",
    isNew: true,
    category: "Electronics",
    features: [
        "15.6\" 4K Display",
        "12-Core Processor",
        "12-Hour Battery Life",
        "Thunderbolt 4 Support"
    ],
    reviews: 89,
    rating: 4.8
  },
  {
    id: "10",
    title: "Wireless Mouse X500",
    price: 30000,
    shortDescription: "Ergonomic precision mouse with multi-device connectivity.",
    description: `Take control of your digital world with the Wireless Mouse X500. Engineered for comfort and precision, this mouse features an ergonomic sculpted design that fits perfectly in the palm of your hand, reducing strain during extended use. The soft-touch rubber grip ensures a secure hold, while the high-precision optical sensor delivers accurate tracking on virtually any surface, from glass tables to rough denim.

Productivity is at your fingertips with the X500's programmable buttons. Customize commands for your favorite apps to speed up your workflow. The hyper-fast scroll wheel lets you fly through long documents and web pages with a single spin. Connectivity is versatile, offering both Bluetooth and a 2.4GHz USB receiver, allowing you to pair with up to three devices and switch between them seamlessly with the touch of a button.

Say goodbye to frequent battery changes. The Wireless Mouse X500 boasts an impressive battery life of up to 70 days on a full charge via the included USB-C cable. A quick one-minute charge gives you three hours of use, ensuring you're never left powerless in a critical moment. Available in a range of modern colors, the X500 is the perfect blend of style, comfort, and functionality.`,
    image: "src/images/mouse.jpg",
    isNew: false,
    category: "Accessories",
    features: [
        "Ergonomic Sculpted Design",
        "Multi-Device Pairing",
        "Hyper-Fast Scrolling",
        "70-Day Battery Life"
    ],
    reviews: 215,
    rating: 4.5
  },
  {
    id: "11",
    title: "USB-C Hub 7-in-1",
    price: 36000,
    shortDescription: "Expand your connectivity with 7 essential ports in one sleek device.",
    description: `Unlock the full potential of your laptop with the USB-C Hub 7-in-1. in a world where ports are becoming scarce, this compact powerhouse brings back the connectivity you need. It features a 4K HDMI port for crystal-clear external display output, three high-speed USB 3.0 ports for your peripherals, SD and microSD card readers for easy photo transfers, and a USB-C Power Delivery port to keep your laptop charged while you work.

Designed for portability and durability, the hub is encased in a premium aluminum alloy shell that dissipates heat effectively and matches the aesthetic of modern MacBooks and ultrabooks. Its slim profile slips easily into your pocket or laptop bag, making it an essential accessory for digital nomads, photographers, and students. No drivers are required—simply plug and play to instantly expand your workspace.

The USB-C Hub 7-in-1 supports pass-through charging up to 100W, so you never have to sacrifice a charging port for data transfer. The high-speed data transfer rates of up to 5Gbps mean you can transfer a customized HD movie in seconds. reliable, versatile, and stylish, this hub serves as the bridge between your cutting-edge laptop and your essential devices.`,
    image: "src/images/hub.jpg",
    isNew: false,
    category: "Electronics",
    features: [
        "4K HDMI Output",
        "100W Power Delivery",
        "3x USB 3.0 Ports",
        "SD/MicroSD Readers"
    ],
    reviews: 340,
    rating: 4.6
  },
  {
    id: "12",
    title: "Monitor Stand Adjustable",
    price: 45000,
    shortDescription: "Ergonomic aluminum stand to elevate your display and organize your desk.",
    description: `Elevate your workspace—literally and figuratively—with the Monitor Stand Adjustable. Designed to improve your posture and reduce neck strain, this stand raises your monitor to an optimal eye level, promoting a healthier and more comfortable working position. Constructed from high-grade aluminum, it supports monitors up to 32 inches and 20kg with rock-solid stability, ensuring your expensive display is always safe.

The stand's sleek, minimalist design not only looks great but also helps you declutter your desk. The space underneath is perfect for stowing your keyboard and mouse when not in use, creating a clean and organized surface for writing or sketching. The surface is treated with a sandblasted anodized finish that is resistant to scratches and fingerprints, maintaining its premium look over time.

Functionality is enhanced with built-in cable management channels, keeping unsightly wires neatly tucked away. Non-slip silicone pads on the base protect your desk surface and prevent the stand from shifting. organizing your workspace has never been this stylish or effective. Invest in your health and productivity with the Monitor Stand Adjustable.`,
    image: "src/images/stand.jpg",
    isNew: false,
    category: "Home & Living",
    features: [
        "Ergonomic Height",
        "Premium Aluminum Body",
        "Desk Organizer Space",
        "Supports up to 20kg"
    ],
    reviews: 112,
    rating: 4.7
  },
];

// Export for usage if using modules, but for now we'll rely on global scope inclusion order
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, MOCK_PRODUCTS };
}
