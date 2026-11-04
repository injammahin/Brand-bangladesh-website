/* =========================================================
   BRAND BANGLADESH — Content data (bilingual EN / BN)
   In production this comes from the CMS. Every figure in
   `stats` is a placeholder and MUST be checked against its
   official source before launch.
   ========================================================= */
const content = {
  heroSlides: [
    { seed: 'bb-hero-sundarban', place: { en: 'Sundarban, Khulna', bn: 'সুন্দরবন, খুলনা' } },
    { seed: 'bb-hero-tea', place: { en: 'Tea gardens, Sylhet', bn: 'চা বাগান, সিলেট' } },
    { seed: 'bb-hero-coast', place: { en: "Cox's Bazar, Chattogram", bn: 'কক্সবাজার, চট্টগ্রাম' } },
    { seed: 'bb-hero-river', place: { en: 'Floating market, Barishal', bn: 'ভাসমান বাজার, বরিশাল' } },
    { seed: 'bb-hero-ratargul', place: { en: 'Ratargul swamp forest, Sylhet', bn: 'রাতারগুল জলাবন, সিলেট' } },
    { seed: 'bb-hero-padma', place: { en: 'Padma Bridge, Munshiganj', bn: 'পদ্মা সেতু, মুন্সীগঞ্জ' } }
  ],

  /* value is a number; `fmt` decides decimals. pillar/region allow filtering */
  stats: [
    { id: 'pop', link: '/article/founders', v: 170, unit: { en: 'million', bn: 'মিলিয়ন' }, pre: '~', label: { en: 'People, one of the youngest populations in Asia', bn: 'মানুষের দেশ—এশিয়ার অন্যতম তরুণ জাতি' }, src: { en: 'BBS Population & Housing Census', bn: 'বিবিএস জনশুমারি ও গৃহগণনা' }, year: 2022, pillar: 'people', story: { en: 'Meet the founders under thirty', bn: 'ত্রিশের নিচের উদ্যোক্তাদের গল্প' }, chart: [52, 60, 68, 75, 82, 90, 100] },
    { id: 'rmg', link: '/article/rmg', v: 2, suf: { en: 'nd', bn: 'য়' }, label: { en: 'Largest exporter of clothing (single country)', bn: 'একক দেশ হিসেবে বিশ্বের পোশাক রপ্তানিতে অবস্থান' }, src: { en: 'WTO World Trade Statistical Review', bn: 'ডব্লিউটিও ওয়ার্ল্ড ট্রেড স্ট্যাটিস্টিক্যাল রিভিউ' }, year: 2023, pillar: 'exports', story: { en: 'Inside the green garment factories', bn: 'সবুজ পোশাক কারখানার ভেতরে' }, chart: [40, 48, 55, 61, 70, 84, 100] },
    { id: 'unesco', link: '/article/paharpur', v: 3, label: { en: 'UNESCO World Heritage Sites', bn: 'ইউনেস্কো ঘোষিত বিশ্ব ঐতিহ্য' }, src: { en: 'UNESCO World Heritage List', bn: 'ইউনেস্কো বিশ্ব ঐতিহ্য তালিকা' }, year: 2025, pillar: 'culture', story: { en: 'Paharpur: the great vihara', bn: 'পাহাড়পুর: মহাবিহারের গল্প' } },
    { id: 'mangrove', link: '/article/sundarban', v: 6017, unit: { en: 'km²', bn: 'বর্গকিমি' }, label: { en: 'Of Sundarban inside Bangladesh, the largest mangrove forest', bn: 'জুড়ে বাংলাদেশের সুন্দরবন—পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন' }, src: { en: 'Bangladesh Forest Department', bn: 'বন অধিদপ্তর' }, year: 2024, pillar: 'tourism', region: 'khulna', story: { en: 'A week in the tide country', bn: 'জোয়ার-ভাটার দেশে এক সপ্তাহ' } },
    { id: 'beach', link: '/publication/tourism/0', v: 120, pre: '~', unit: { en: 'km', bn: 'কিমি' }, label: { en: "Of natural sea beach at Cox's Bazar", bn: 'দীর্ঘ কক্সবাজার—বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্রসৈকত' }, src: { en: 'Bangladesh Tourism Board', bn: 'বাংলাদেশ ট্যুরিজম বোর্ড' }, year: 2024, pillar: 'tourism', region: 'chattogram', story: { en: "Cox's Bazar beyond the beach", bn: 'সৈকতের বাইরের কক্সবাজার' } },
    { id: 'districts', link: '/article/digital', v: 64, label: { en: 'Districts across eight divisions', bn: 'জেলা নিয়ে গড়া আটটি বিভাগ' }, src: { en: 'Government of Bangladesh', bn: 'বাংলাদেশ সরকার' }, year: 2024, pillar: 'governance', story: { en: 'How digital services reach every district', bn: 'প্রতিটি জেলায় যেভাবে পৌঁছাচ্ছে ডিজিটাল সেবা' } },
    { id: 'zones', link: '/article/zone', v: 100, unit: { en: 'zones', bn: 'টি অঞ্চল' }, label: { en: 'Economic zones planned nationwide', bn: 'দেশজুড়ে পরিকল্পিত অর্থনৈতিক অঞ্চল' }, src: { en: 'BEZA', bn: 'বেজা' }, year: 2024, pillar: 'investment', story: { en: 'Setting up in an economic zone', bn: 'অর্থনৈতিক অঞ্চলে ব্যবসা শুরুর গল্প' }, chart: [20, 34, 45, 58, 70, 86, 100] },
    { id: 'tea', link: '/article/tea', v: 160, pre: '~', unit: { en: 'gardens', bn: 'টি বাগান' }, label: { en: 'Tea gardens, most of them in Sylhet', bn: 'চা বাগান, যার বেশির ভাগই সিলেটে' }, src: { en: 'Bangladesh Tea Board', bn: 'বাংলাদেশ চা বোর্ড' }, year: 2024, pillar: 'exports', region: 'sylhet', story: { en: 'Tea, rain and hills in Sylhet', bn: 'সিলেটের চা, বৃষ্টি আর পাহাড়' } }
  ],

  pillars: [
    {
      id: 'tourism', icon: 'fa-mountain-sun', c: '#4C9D8E', seed: 'bb-p-tourism',
      name: { en: 'Tourism', bn: 'পর্যটন' },
      line: { en: 'Beaches, mangroves, hills and heritage, waiting to be explored.', bn: 'সৈকত, ম্যানগ্রোভ, পাহাড় আর ঐতিহ্য—ঘুরে দেখার অপেক্ষায়।' },
      aud: { en: 'For travellers', bn: 'ভ্রমণপিপাসুদের জন্য' },
      intro: { en: "From the longest natural sea beach to the tiger's mangrove forest and misty tea hills, Bangladesh rewards the traveller who arrives curious. Plan by season, travel responsibly and let the rivers set the pace.", bn: 'বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্রসৈকত, রয়েল বেঙ্গল টাইগারের সুন্দরবন আর কুয়াশামাখা চা-বাগানের টিলা—যে কৌতূহল নিয়ে আসবেন, বাংলাদেশ তার চেয়ে অনেক বেশি ফিরিয়ে দেবে। ঋতু বুঝে পরিকল্পনা করুন, প্রকৃতির যত্ন নিয়ে ঘুরুন, আর নদীর ছন্দে ধীরে ধীরে দেশটাকে চিনে নিন।' },
      subs: [{ en: 'Destinations', bn: 'গন্তব্য' }, { en: 'Best seasons', bn: 'উপযুক্ত ঋতু' }, { en: 'Sample itineraries', bn: 'নমুনা ভ্রমণসূচি' }, { en: 'Travel tips', bn: 'ভ্রমণ পরামর্শ' }],
      cta: { en: 'Plan your visit', bn: 'ভ্রমণ পরিকল্পনা করুন' }, ctaTopic: 'tourism', regions: ['chattogram', 'khulna', 'sylhet']
    },
    {
      id: 'exports', icon: 'fa-ship', c: '#F38020', seed: 'bb-p-exports',
      name: { en: 'Exports', bn: 'রপ্তানি' },
      line: { en: 'A reliable global supplier, from garments to software.', bn: 'পোশাক থেকে সফটওয়্যার—বিশ্ববাজারে আস্থার নাম বাংলাদেশ।' },
      aud: { en: 'For buyers', bn: 'ক্রেতাদের জন্য' },
      intro: { en: 'Bangladesh makes for the world. Ready-made garments lead the way, with leather, pharmaceuticals, jute, agro products and IT services growing behind them. Find the right sector and start sourcing.', bn: 'বাংলাদেশে তৈরি পণ্য আজ পৌঁছে যায় বিশ্বের নানা প্রান্তে। এই যাত্রার নেতৃত্বে তৈরি পোশাকশিল্প, পাশাপাশি দ্রুত এগিয়ে চলেছে চামড়া, ওষুধ, পাট, কৃষিপণ্য আর আইটি সেবা। আপনার প্রয়োজনের খাতটি খুঁজে নিন, আজই শুরু করুন পণ্য সংগ্রহ।' },
      subs: [{ en: 'Ready-made garments', bn: 'তৈরি পোশাক' }, { en: 'Leather', bn: 'চামড়া' }, { en: 'Pharmaceuticals', bn: 'ওষুধ' }, { en: 'Jute', bn: 'পাট' }, { en: 'Agro products', bn: 'কৃষিপণ্য' }, { en: 'IT services', bn: 'আইটি সেবা' }],
      cta: { en: 'Contact the exports desk', bn: 'রপ্তানি ডেস্কের সঙ্গে যোগাযোগ করুন' }, ctaTopic: 'exports', regions: ['dhaka', 'chattogram', 'sylhet']
    },
    {
      id: 'governance', icon: 'fa-landmark', c: '#0E5B5C', seed: 'bb-p-governance',
      name: { en: 'Governance', bn: 'সুশাসন' },
      line: { en: 'Reforms, digital public services and growing transparency.', bn: 'সংস্কার, ডিজিটাল সেবা আর বাড়তে থাকা স্বচ্ছতা।' },
      aud: { en: 'For partners', bn: 'উন্নয়ন সহযোগীদের জন্য' },
      intro: { en: 'Public services are moving online, closer to citizens and easier to track. Here are the reforms, the reports and the people making government work better.', bn: 'সরকারি সেবা এখন হাতের মুঠোয়—ঘরে বসেই আবেদন, মোবাইলেই অগ্রগতির খোঁজ। এখানে পাবেন সংস্কারের খবর, প্রতিবেদন আর সেই মানুষদের গল্প, যাঁরা সেবাকে পৌঁছে দিচ্ছেন নাগরিকের দোরগোড়ায়।' },
      subs: [{ en: 'Reforms', bn: 'সংস্কার' }, { en: 'Digital services', bn: 'ডিজিটাল সেবা' }, { en: 'Transparency', bn: 'স্বচ্ছতা' }, { en: 'Reports', bn: 'প্রতিবেদন' }],
      cta: { en: 'Read the reports', bn: 'প্রতিবেদন পড়ুন' }, ctaHref: 'publication.html#reports', regions: ['dhaka']
    },
    {
      id: 'investment', icon: 'fa-chart-line', c: '#D71920', seed: 'bb-p-invest',
      name: { en: 'Investment & Immigration', bn: 'বিনিয়োগ ও অভিবাসন' },
      line: { en: 'Incentives, economic zones and a clear path to set up.', bn: 'প্রণোদনা, অর্থনৈতিক অঞ্চল আর ব্যবসা শুরুর সহজ পথ।' },
      aud: { en: 'For investors', bn: 'বিনিয়োগকারীদের জন্য' },
      intro: { en: 'A large, young workforce, a strategic location between South and Southeast Asia, and dedicated economic zones. Start with the basics here; the official authorities hold the details on incentives, visas and work permits.', bn: 'বিশাল ও তরুণ কর্মশক্তি, দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার সংযোগস্থলে কৌশলগত অবস্থান, আর বিনিয়োগের জন্যই গড়ে তোলা অর্থনৈতিক অঞ্চল। শুরুর তথ্যগুলো এখানে জেনে নিন; প্রণোদনা, ভিসা ও ওয়ার্ক পারমিটের খুঁটিনাটি জানাবে সংশ্লিষ্ট সরকারি কর্তৃপক্ষ।' },
      subs: [{ en: 'Why Bangladesh', bn: 'কেন বাংলাদেশ' }, { en: 'Incentives', bn: 'প্রণোদনা' }, { en: 'Economic zones', bn: 'অর্থনৈতিক অঞ্চল' }, { en: 'Setting up a business', bn: 'ব্যবসা শুরু' }, { en: 'Visas & work permits', bn: 'ভিসা ও ওয়ার্ক পারমিট' }],
      steps: [
        { en: 'Choose your sector and location', bn: 'খাত ও স্থান নির্বাচন' },
        { en: 'Register the company', bn: 'কোম্পানি নিবন্ধন' },
        { en: 'Apply for licences and incentives', bn: 'লাইসেন্স ও প্রণোদনার আবেদন' },
        { en: 'Visas and work permits for staff', bn: 'কর্মীদের ভিসা ও ওয়ার্ক পারমিট' }
      ],
      cta: { en: 'Talk to the investment desk', bn: 'বিনিয়োগ ডেস্কের সঙ্গে কথা বলুন' }, ctaTopic: 'investment', regions: ['dhaka', 'chattogram']
    },
    {
      id: 'culture', icon: 'fa-drum', c: '#EE1B5B', seed: 'bb-p-culture',
      name: { en: 'Culture & Heritage', bn: 'সংস্কৃতি ও ঐতিহ্য' },
      line: { en: 'Festivals, music, crafts and a thousand years of history.', bn: 'উৎসব, সংগীত, কারুশিল্প আর হাজার বছরের ইতিহাস।' },
      aud: { en: 'For the curious', bn: 'অনুসন্ধিৎসুদের জন্য' },
      intro: { en: 'Pohela Boishakh in the streets, baul songs by the river, jamdani on the loom and ancient monasteries in the north. A culture that is lived every day, not kept behind glass.', bn: 'রাজপথে পহেলা বৈশাখের রং, নদীর ঘাটে বাউলের সুর, তাঁতে জামদানির নকশা আর উত্তরের প্রাচীন বিহার—আমাদের সংস্কৃতি জাদুঘরের কাচে বন্দি নয়, বেঁচে আছে মানুষের প্রতিদিনের জীবনে।' },
      subs: [{ en: 'Festivals', bn: 'উৎসব' }, { en: 'Music', bn: 'সংগীত' }, { en: 'Crafts', bn: 'কারুশিল্প' }, { en: 'Literature', bn: 'সাহিত্য' }, { en: 'Cuisine', bn: 'খাবার' }, { en: 'Archaeology', bn: 'প্রত্নতত্ত্ব' }],
      cta: { en: 'Explore the gallery', bn: 'গ্যালারি দেখুন' }, ctaHref: 'publication.html', regions: ['rajshahi', 'dhaka', 'mymensingh']
    },
    {
      id: 'people', icon: 'fa-people-group', c: '#C9A062', seed: 'bb-p-people',
      name: { en: 'People', bn: 'মানুষ' },
      line: { en: 'Entrepreneurs, artists, athletes and achievers worldwide.', bn: 'উদ্যোক্তা, শিল্পী, ক্রীড়াবিদ আর বিশ্বজুড়ে সফল বাংলাদেশিরা।' },
      aud: { en: 'For the diaspora', bn: 'প্রবাসীদের জন্য' },
      intro: { en: 'The real strength of Bangladesh is its people. Founders, artists, athletes, young innovators and a diaspora of millions show every day what Bangladeshis can do.', bn: 'বাংলাদেশের আসল শক্তি তার মানুষ। উদ্যোক্তা, শিল্পী, ক্রীড়াবিদ, তরুণ উদ্ভাবক আর বিশ্বজুড়ে ছড়িয়ে থাকা কোটি প্রবাসী প্রতিদিন প্রমাণ করছেন—বাংলাদেশিরা কী পারে।' },
      subs: [{ en: 'Entrepreneurs', bn: 'উদ্যোক্তা' }, { en: 'Artists', bn: 'শিল্পী' }, { en: 'Athletes', bn: 'ক্রীড়াবিদ' }, { en: 'Young innovators', bn: 'তরুণ উদ্ভাবক' }, { en: 'Diaspora achievers', bn: 'সফল প্রবাসী' }],
      cta: { en: 'Share your story', bn: 'আপনার গল্প বলুন' }, ctaHref: 'community.html#submit', regions: ['sylhet', 'dhaka']
    }
  ],

  /* x/y = label centre on the stylised map (viewBox 0 0 540 560) */
  regions: [
    { id: 'rangpur', x: 150, y: 95, name: { en: 'Rangpur', bn: 'রংপুর' }, line: { en: 'Heritage palaces, Shataranji weaving and northern farmlands.', bn: 'জমিদারবাড়ি, শতরঞ্জি বুনন আর উত্তরের কৃষিভূমি।' }, land: { en: 'Flat, fertile plains fed by the Teesta.', bn: 'তিস্তার জলে উর্বর সমতলভূমি।' }, food: { en: 'Shidol, a fermented fish speciality', bn: 'সিদল' }, econ: { en: 'Agriculture, tobacco, handloom', bn: 'কৃষি, তামাক, তাঁতশিল্প' }, tags: [{ en: 'Tajhat Palace', bn: 'তাজহাট জমিদারবাড়ি' }, { en: 'Shataranji', bn: 'শতরঞ্জি' }], pillars: ['culture', 'exports'] },
    { id: 'mymensingh', x: 290, y: 150, name: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, line: { en: 'Folk ballads, the Brahmaputra and the Garo hills.', bn: 'মৈমনসিংহ গীতিকা, ব্রহ্মপুত্র আর গারো পাহাড়।' }, land: { en: 'Riverbanks rising to the Garo hills in the north.', bn: 'ব্রহ্মপুত্রের তীর থেকে উত্তরে গারো পাহাড় পর্যন্ত বিস্তৃত জনপদ।' }, food: { en: 'Monda sweets of Muktagacha', bn: 'মুক্তাগাছার মণ্ডা' }, econ: { en: 'Fisheries, agriculture, education', bn: 'মৎস্য, কৃষি, শিক্ষা' }, tags: [{ en: 'Folk ballads', bn: 'মৈমনসিংহ গীতিকা' }, { en: 'Garo hills', bn: 'গারো পাহাড়' }], pillars: ['culture', 'people'] },
    { id: 'sylhet', x: 430, y: 150, name: { en: 'Sylhet', bn: 'সিলেট' }, line: { en: 'Tea gardens, haor wetlands and a global diaspora.', bn: 'চা বাগান, হাওর আর বিশ্বজুড়ে প্রবাসী।' }, land: { en: 'Green hills, tea estates and seasonal wetlands.', bn: 'সবুজ পাহাড়, চা বাগান আর মৌসুমি হাওর।' }, food: { en: 'Satkora beef and seven-layer tea', bn: 'সাতকরা দিয়ে রান্না মাংস আর সাত রঙের চা' }, econ: { en: 'Tea, remittance, natural gas', bn: 'চা, প্রবাসী আয়, প্রাকৃতিক গ্যাস' }, tags: [{ en: 'Tea gardens', bn: 'চা বাগান' }, { en: 'Ratargul', bn: 'রাতারগুল' }], pillars: ['tourism', 'people'] },
    { id: 'rajshahi', x: 105, y: 225, name: { en: 'Rajshahi', bn: 'রাজশাহী' }, line: { en: 'Mangoes, silk and the ruins of Paharpur.', bn: 'আম, রেশম আর পাহাড়পুরের প্রত্নস্থল।' }, land: { en: 'Dry plains along the Padma.', bn: 'পদ্মাপারের লালমাটির বরেন্দ্রভূমি।' }, food: { en: 'Mangoes and kalai roti', bn: 'আম ও কালাই রুটি' }, econ: { en: 'Silk, mango, agriculture', bn: 'রেশম, আম, কৃষি' }, tags: [{ en: 'Paharpur', bn: 'পাহাড়পুর' }, { en: 'Silk', bn: 'রেশম' }], pillars: ['culture', 'exports'] },
    { id: 'dhaka', x: 255, y: 270, name: { en: 'Dhaka', bn: 'ঢাকা' }, line: { en: "The beating heart: capital, commerce and Old Dhaka's lanes.", bn: 'দেশের হৃৎস্পন্দন—রাজধানী, বাণিজ্য আর পুরান ঢাকার গলি।' }, land: { en: 'A river-ringed capital in the heart of the delta.', bn: 'ব-দ্বীপের কেন্দ্রে নদীঘেরা রাজধানী।' }, food: { en: 'Kacchi biryani and bakarkhani', bn: 'কাচ্চি বিরিয়ানি ও বাকরখানি' }, econ: { en: 'Garments, services, finance', bn: 'পোশাকশিল্প, সেবা, আর্থিক খাত' }, tags: [{ en: 'Old Dhaka', bn: 'পুরান ঢাকা' }, { en: 'Jamdani', bn: 'জামদানি' }], pillars: ['investment', 'culture', 'exports'] },
    { id: 'khulna', x: 150, y: 405, name: { en: 'Khulna', bn: 'খুলনা' }, line: { en: 'Gateway to the Sundarban and the mosque city of Bagerhat.', bn: 'সুন্দরবনের প্রবেশদ্বার ও বাগেরহাটের মসজিদের শহর।' }, land: { en: 'Tidal rivers and mangrove coast.', bn: 'জোয়ার-ভাটার নদী আর ম্যানগ্রোভ উপকূল।' }, food: { en: 'Chui jhal and golda prawns', bn: 'চুইঝাল ও গলদা চিংড়ি' }, econ: { en: 'Shrimp, port of Mongla, jute', bn: 'চিংড়ি, মোংলা বন্দর, পাট' }, tags: [{ en: 'Sundarban', bn: 'সুন্দরবন' }, { en: 'Bagerhat', bn: 'বাগেরহাট' }], pillars: ['tourism', 'culture'] },
    { id: 'barishal', x: 275, y: 425, name: { en: 'Barishal', bn: 'বরিশাল' }, line: { en: "Rivers, floating markets and Kuakata's sunrise-to-sunset beach.", bn: 'নদী, ভাসমান বাজার আর কুয়াকাটার সূর্যোদয়-সূর্যাস্ত সৈকত।' }, land: { en: 'A maze of rivers and canals.', bn: 'নদী আর খালের জালে বোনা জনপদ।' }, food: { en: 'Hilsa and guava', bn: 'ইলিশ ও পেয়ারা' }, econ: { en: 'Fisheries, rice, river trade', bn: 'মৎস্য, ধান, নদীবাণিজ্য' }, tags: [{ en: 'Floating markets', bn: 'ভাসমান বাজার' }, { en: 'Kuakata', bn: 'কুয়াকাটা' }], pillars: ['tourism'] },
    { id: 'chattogram', x: 420, y: 395, name: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, line: { en: "Port city, Cox's Bazar and the Hill Tracts.", bn: 'বন্দরনগরী, কক্সবাজার আর পার্বত্য অঞ্চল।' }, land: { en: 'Hills meeting the Bay of Bengal.', bn: 'যেখানে পাহাড় এসে মিশেছে বঙ্গোপসাগরে।' }, food: { en: 'Mezban beef and dried fish', bn: 'মেজবান ও শুঁটকি' }, econ: { en: 'Main sea port, shipbuilding, tourism', bn: 'প্রধান সমুদ্রবন্দর, জাহাজ নির্মাণ, পর্যটন' }, tags: [{ en: "Cox's Bazar", bn: 'কক্সবাজার' }, { en: 'Hill Tracts', bn: 'পার্বত্য চট্টগ্রাম' }], pillars: ['tourism', 'exports', 'investment'] }
  ],

  stories: [
    { id: 'sundarban', seed: 'bb-s-sundarban', pillar: 'tourism', region: 'khulna', issue: 'sundarban', min: 8, title: { en: 'A week in the tide country of the Sundarban', bn: 'সুন্দরবনের জোয়ার-ভাটার দেশে এক সপ্তাহ' }, ex: { en: 'Twice a day the forest floods and drains. We followed the boatmen, honey hunters and forest guards who live by its rhythm.', bn: 'দিনে দুবার বন ভাসে, আবার নেমে যায় পানি। সেই ছন্দে বাঁচা মাঝি, মৌয়াল আর বনরক্ষীদের সঙ্গে আমরা কাটিয়েছি এক সপ্তাহ।' } },
    { id: 'rmg', seed: 'bb-s-rmg', pillar: 'exports', region: 'dhaka', issue: 'makers', min: 6, title: { en: 'Inside the green garment factories setting new standards', bn: 'নতুন মানদণ্ড গড়ছে যে সবুজ পোশাক কারখানাগুলো' }, ex: { en: 'Solar roofs, recycled water and safer floors: how a sector rebuilt its reputation.', bn: 'সৌর ছাদ, পুনর্ব্যবহৃত পানি আর নিরাপদ কর্মপরিবেশ—যেভাবে একটি খাত ফিরিয়ে আনল সুনাম।' } },
    { id: 'paharpur', seed: 'bb-s-paharpur', pillar: 'culture', region: 'rajshahi', issue: 'heritage', min: 7, title: { en: 'Paharpur: the monastery that shaped a region', bn: 'পাহাড়পুর: যে মহাবিহার গড়ে দিয়েছিল একটি অঞ্চল' }, ex: { en: 'More than a thousand years ago, scholars travelled here from across Asia.', bn: 'হাজার বছরেরও বেশি আগে এশিয়ার নানা প্রান্ত থেকে এখানে আসতেন জ্ঞানীরা।' } },
    { id: 'founders', seed: 'bb-s-founder', pillar: 'people', region: 'chattogram', issue: 'young', min: 5, title: { en: 'The young founders building tech from Chattogram', bn: 'চট্টগ্রাম থেকে প্রযুক্তি গড়ছেন যে তরুণ উদ্যোক্তারা' }, ex: { en: 'Port logistics, fintech and a coffee shop that became an incubator.', bn: 'বন্দর লজিস্টিকস, ফিনটেক আর একটা কফিশপ, যা হয়ে উঠল ইনকিউবেটর।' } },
    { id: 'digital', seed: 'bb-s-digital', pillar: 'governance', region: 'dhaka', min: 4, title: { en: 'How digital services save citizens a trip to the office', bn: 'ডিজিটাল সেবা যেভাবে কমাচ্ছে অফিসে যাওয়ার ঝামেলা' }, ex: { en: 'Birth certificates, land records and tax returns now start on a phone.', bn: 'জন্মনিবন্ধন, ভূমি রেকর্ড আর আয়কর রিটার্ন—এখন শুরু হয় মোবাইলেই।' } },
    { id: 'tea', seed: 'bb-s-tea', pillar: 'tourism', region: 'sylhet', issue: 'tourism', min: 6, title: { en: 'Tea, rain and hills in Sylhet', bn: 'সিলেটের চা, বৃষ্টি আর পাহাড়' }, ex: { en: 'Walking the estates with the pluckers who start before sunrise.', bn: 'ভোরের আলো ফোটার আগেই যাঁরা পাতা তুলতে নামেন, সেই চা-শ্রমিকদের সঙ্গে বাগানে এক সকাল।' } },
    { id: 'zone', seed: 'bb-s-zone', pillar: 'investment', region: 'chattogram', min: 5, title: { en: 'Setting up in an economic zone: one investor\'s first year', bn: 'অর্থনৈতিক অঞ্চলে ব্যবসা শুরু: এক বিনিয়োগকারীর প্রথম বছর' }, ex: { en: 'From site selection to first shipment in eleven months.', bn: 'জায়গা বাছাই থেকে প্রথম চালান—এগারো মাসে।' } },
    { id: 'hilsa', seed: 'bb-s-hilsa', pillar: 'culture', region: 'barishal', issue: 'food', min: 6, title: { en: "Hilsa: the river's silver", bn: 'ইলিশ: নদীর রুপালি ফসল' }, ex: { en: 'A fish, a season and a whole culture of cooking.', bn: 'একটি মাছ, একটি মৌসুম, আর তাকে ঘিরে বাঙালির রান্নার সমৃদ্ধ ঐতিহ্য।' } }
  ],

  timeline: [
    { y: 1952, t: { en: 'Language Movement', bn: 'ভাষা আন্দোলন' }, d: { en: 'A people stand up for their mother tongue, Bangla.', bn: 'মাতৃভাষা বাংলার জন্য রুখে দাঁড়ায় একটি জাতি।' } },
    { y: 1971, t: { en: 'Independence', bn: 'স্বাধীনতা' }, d: { en: 'After the Liberation War, Bangladesh is born.', bn: 'মুক্তিযুদ্ধের মধ্য দিয়ে জন্ম নেয় বাংলাদেশ।' } },
    { y: 1974, t: { en: 'United Nations', bn: 'জাতিসংঘ' }, d: { en: 'Bangladesh joins the community of nations.', bn: 'জাতিসংঘের সদস্যপদ লাভ করে বাংলাদেশ।' } },
    { y: 1997, t: { en: 'Sundarban on the world stage', bn: 'বিশ্বমঞ্চে সুন্দরবন' }, d: { en: 'The mangrove forest is inscribed as a UNESCO World Heritage Site.', bn: 'ইউনেস্কো বিশ্ব ঐতিহ্যের তালিকায় যুক্ত হয় সুন্দরবন।' } },
    { y: 1999, t: { en: 'Mother Language Day', bn: 'মাতৃভাষা দিবস' }, d: { en: '21 February becomes International Mother Language Day.', bn: '২১ ফেব্রুয়ারি পায় আন্তর্জাতিক মাতৃভাষা দিবসের স্বীকৃতি।' } },
    { y: 2026, t: { en: 'The next chapter', bn: 'পরের অধ্যায়' }, d: { en: 'A young nation writes its story for the world.', bn: 'তরুণ এক জাতি বিশ্বকে শোনাচ্ছে নিজের গল্প।' } }
  ],

  wall: [
    { seed: 'bb-w-1', name: { en: 'Nadia, Toronto', bn: 'নাদিয়া, টরন্টো' }, q: { en: 'I taught my daughter to cook shorshe ilish over a video call. Now she makes it better than me.', bn: 'ভিডিও কলে মেয়েকে সরষে ইলিশ রান্না শিখিয়েছিলাম। এখন সে আমার চেয়েও ভালো রাঁধে।' } },
    { seed: 'bb-w-2', name: { en: 'Rakib, Bogura', bn: 'রাকিব, বগুড়া' }, q: { en: 'Our village school got solar power this year. The kids study after dark now.', bn: 'এ বছর আমাদের গ্রামের স্কুলে সৌরবিদ্যুৎ এসেছে। সন্ধ্যা নামলেও এখন ছেলেমেয়েদের পড়া থামে না।' } },
    { seed: 'bb-w-3', name: { en: 'Farzana, London', bn: 'ফারজানা, লন্ডন' }, q: { en: "Every Boishakh I wear my grandmother's red-and-white saree on Brick Lane.", bn: 'প্রতি বৈশাখে ব্রিক লেনে নানির লাল-সাদা শাড়িটা পরি।' } },
    { seed: 'bb-w-4', name: { en: 'Tanvir, Sylhet', bn: 'তানভীর, সিলেট' }, q: { en: 'I guide visitors through Ratargul by boat. Every one of them leaves quieter than they came.', bn: 'নৌকায় করে অতিথিদের রাতারগুল ঘুরিয়ে দেখাই। যে-ই আসুক, ফেরে আগের চেয়ে অনেক প্রশান্ত মন নিয়ে।' } },
    { seed: 'bb-w-5', name: { en: 'Mitu, Rajshahi', bn: 'মিতু, রাজশাহী' }, q: { en: 'My silk scarves now sell to customers in Japan. I still weave every one by hand.', bn: 'আমার রেশমি স্কার্ফ এখন জাপানে বিক্রি হয়। এখনো প্রতিটি হাতে বুনি।' } },
    { seed: 'bb-w-6', name: { en: 'Arif, Dubai', bn: 'আরিফ, দুবাই' }, q: { en: 'The first thing I do when I land in Dhaka is drink a cup of roadside tea.', bn: 'ঢাকায় নেমে প্রথমেই যা করি—রাস্তার ধারের টং দোকানে এক কাপ চা।' } }
  ],

  themes: [
    { id: 'all', en: 'All themes', bn: 'সব বিষয়' },
    { id: 'nature', en: 'Nature', bn: 'প্রকৃতি' },
    { id: 'heritage', en: 'Heritage', bn: 'ঐতিহ্য' },
    { id: 'tourism', en: 'Tourism', bn: 'পর্যটন' },
    { id: 'food', en: 'Food', bn: 'খাদ্য' },
    { id: 'economy', en: 'Economy', bn: 'অর্থনীতি' },
    { id: 'culture', en: 'Culture', bn: 'সংস্কৃতি' },
    { id: 'people', en: 'People', bn: 'মানুষ' }
  ],

  issues: [
    {
      id: 'sundarban', no: 8, year: 2026, month: 10, theme: 'nature', c: '#0E5B5C', seed: 'bb-i-sundarban', region: 'khulna', pillars: ['tourism', 'culture'], pages: 48,
      title: { en: 'The Sundarban', bn: 'সুন্দরবন' }, dek: { en: "Inside the world's largest mangrove forest", bn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বনের ভেতরে' },
      note: { en: 'The Sundarban is not just a forest. It is a living wall that shields millions of people from the sea, a home for the Royal Bengal tiger and a workplace for honey hunters, fishers and boatmen. In this issue we travelled with the tide to meet them.', bn: 'সুন্দরবন কেবল একটি বন নয়। সমুদ্রের ঝড়-জলোচ্ছ্বাস থেকে লাখো মানুষকে আগলে রাখা এক জীবন্ত প্রাচীর, রয়েল বেঙ্গল টাইগারের ঘর, আর মৌয়াল, জেলে ও মাঝিদের জীবিকার ঠিকানা। এই সংখ্যায় জোয়ারের টানে ভেসে আমরা পৌঁছেছি তাঁদের জীবনের কাছে।' },
      articles: [
        { k: { en: 'Wildlife', bn: 'বন্যপ্রাণী' }, t: { en: 'Tigers of the tide country', bn: 'জোয়ার-ভাটার দেশের বাঘ' }, min: 12, p: 8 },
        { k: { en: 'People', bn: 'মানুষ' }, t: { en: 'The honey hunters of the Mouali season', bn: 'মৌয়ালদের মধু-মৌসুম' }, min: 9, p: 18 },
        { k: { en: 'Climate', bn: 'জলবায়ু' }, t: { en: 'How mangroves shield the coast', bn: 'যেভাবে উপকূল রক্ষা করে ম্যানগ্রোভ' }, min: 7, p: 26 },
        { k: { en: 'Travel', bn: 'ভ্রমণ' }, t: { en: 'Planning a responsible Sundarban trip', bn: 'দায়িত্বশীল সুন্দরবন ভ্রমণের পরিকল্পনা' }, min: 6, p: 34 }
      ]
    },
    {
      id: 'heritage', no: 7, year: 2026, month: 9, theme: 'heritage', c: '#8A5A2B', seed: 'bb-i-heritage', region: 'rajshahi', pillars: ['culture'], pages: 52,
      title: { en: 'Ancient Bengal', bn: 'প্রাচীন বাংলা' }, dek: { en: 'The archaeological heritage of Bangladesh', bn: 'বাংলাদেশের প্রত্নতাত্ত্বিক ঐতিহ্য' },
      articles: [
        { k: { en: 'Archaeology', bn: 'প্রত্নতত্ত্ব' }, t: { en: 'Paharpur: the great vihara', bn: 'পাহাড়পুর: মহাবিহারের গল্প' }, min: 11, p: 8 },
        { k: { en: 'History', bn: 'ইতিহাস' }, t: { en: "Mahasthangarh, one of Bengal's oldest cities", bn: 'মহাস্থানগড়: বাংলার প্রাচীনতম নগরীগুলোর একটি' }, min: 10, p: 18 },
        { k: { en: 'Heritage', bn: 'ঐতিহ্য' }, t: { en: 'The mosque city of Bagerhat', bn: 'বাগেরহাটের মসজিদের শহর' }, min: 8, p: 28 },
        { k: { en: 'Discovery', bn: 'আবিষ্কার' }, t: { en: 'Wari-Bateshwar and the river trade', bn: 'উয়ারী-বটেশ্বর ও নদীপথের বাণিজ্য' }, min: 7, p: 36 }
      ]
    },
    {
      id: 'tourism', no: 6, year: 2026, month: 8, theme: 'tourism', c: '#4C9D8E', seed: 'bb-i-tourism', region: 'chattogram', pillars: ['tourism'], pages: 44,
      title: { en: 'Seasons of Bangladesh', bn: 'বাংলাদেশের ঋতু' }, dek: { en: 'Where to go, and when', bn: 'কোথায় যাবেন, কখন যাবেন' },
      articles: [
        { k: { en: 'Coast', bn: 'উপকূল' }, t: { en: "Cox's Bazar beyond the beach", bn: 'সৈকতের বাইরের কক্সবাজার' }, min: 8, p: 8 },
        { k: { en: 'Hills', bn: 'পাহাড়' }, t: { en: 'Tea, rain and hills in Sylhet', bn: 'সিলেটের চা, বৃষ্টি আর পাহাড়' }, min: 9, p: 16 },
        { k: { en: 'Itinerary', bn: 'ভ্রমণসূচি' }, t: { en: 'Seven days in the Hill Tracts', bn: 'পার্বত্য অঞ্চলে সাত দিন' }, min: 10, p: 26 }
      ]
    },
    {
      id: 'food', no: 5, year: 2026, month: 7, theme: 'food', c: '#D71920', seed: 'bb-i-food', region: 'dhaka', pillars: ['culture'], pages: 40,
      title: { en: 'The Bangladeshi Table', bn: 'বাঙালির খাবার টেবিল' }, dek: { en: 'Traditional food, from river to rice field', bn: 'নদী থেকে ধানখেত—ঐতিহ্যবাহী খাবারের গল্প' },
      articles: [
        { k: { en: 'Rivers', bn: 'নদী' }, t: { en: "Hilsa: the river's silver", bn: 'ইলিশ: নদীর রুপালি ফসল' }, min: 8, p: 8 },
        { k: { en: 'Seasons', bn: 'ঋতু' }, t: { en: 'A winter of pitha', bn: 'পিঠার শীত' }, min: 6, p: 16 },
        { k: { en: 'City', bn: 'নগর' }, t: { en: "Old Dhaka's kitchens after dark", bn: 'রাতের পুরান ঢাকার রান্নাঘর' }, min: 9, p: 24 }
      ]
    },
    {
      id: 'rivers', no: 4, year: 2026, month: 5, theme: 'nature', c: '#2F6E9E', seed: 'bb-i-rivers', region: 'barishal', pillars: ['tourism', 'people'], pages: 40,
      title: { en: 'A Land of Rivers', bn: 'নদীমাতৃক দেশ' }, dek: { en: 'Life along the waters of the delta', bn: 'ব-দ্বীপের জলে-ভাসা জীবন' },
      articles: [
        { k: { en: 'People', bn: 'মানুষ' }, t: { en: 'Life on a char', bn: 'চরের জীবন' }, min: 9, p: 8 },
        { k: { en: 'Craft', bn: 'কারুশিল্প' }, t: { en: 'The boatbuilders of the south', bn: 'দক্ষিণের নৌকা কারিগর' }, min: 7, p: 18 }
      ]
    },
    {
      id: 'makers', no: 3, year: 2026, month: 2, theme: 'economy', c: '#F38020', seed: 'bb-i-makers', region: 'dhaka', pillars: ['exports', 'investment'], pages: 44,
      title: { en: 'Made in Bangladesh', bn: 'মেড ইন বাংলাদেশ' }, dek: { en: 'The makers behind a global supplier', bn: 'বিশ্ববাজারে বাংলাদেশের নেপথ্যের কারিগরেরা' },
      articles: [
        { k: { en: 'Garments', bn: 'পোশাক' }, t: { en: 'The new face of ready-made garments', bn: 'তৈরি পোশাকের নতুন চেহারা' }, min: 10, p: 8 },
        { k: { en: 'Jute', bn: 'পাট' }, t: { en: "Jute's second act", bn: 'পাটের দ্বিতীয় অধ্যায়' }, min: 7, p: 18 },
        { k: { en: 'Technology', bn: 'প্রযুক্তি' }, t: { en: "Dhaka's IT exporters", bn: 'ঢাকার আইটি রপ্তানিকারকেরা' }, min: 8, p: 26 }
      ]
    },
    {
      id: 'young', no: 2, year: 2025, month: 11, theme: 'people', c: '#141414', seed: 'bb-i-young', region: 'dhaka', pillars: ['people'], pages: 36,
      title: { en: 'Young Bangladesh', bn: 'তারুণ্যের বাংলাদেশ' }, dek: { en: 'The generation writing the next chapter', bn: 'যে প্রজন্ম লিখছে পরের অধ্যায়' },
      articles: [
        { k: { en: 'Business', bn: 'ব্যবসা' }, t: { en: 'Founders under thirty', bn: 'ত্রিশের নিচের উদ্যোক্তারা' }, min: 9, p: 8 },
        { k: { en: 'Sport', bn: 'খেলা' }, t: { en: 'The athletes changing the game', bn: 'মাঠ কাঁপানো নতুন প্রজন্মের ক্রীড়াবিদ' }, min: 7, p: 18 }
      ]
    },
    {
      id: 'boishakh', no: 1, year: 2025, month: 3, theme: 'culture', c: '#EE1B5B', seed: 'bb-i-boishakh', region: 'dhaka', pillars: ['culture'], pages: 36,
      title: { en: 'Pohela Boishakh', bn: 'পহেলা বৈশাখ' }, dek: { en: 'A nation welcomes the new year', bn: 'নতুন বছরকে বরণে মেতে ওঠে গোটা জাতি' },
      articles: [
        { k: { en: 'Festival', bn: 'উৎসব' }, t: { en: 'Colours of the Mangal Shobhajatra', bn: 'মঙ্গল শোভাযাত্রার রং' }, min: 6, p: 8 },
        { k: { en: 'Village', bn: 'গ্রাম' }, t: { en: 'A new year at the village mela', bn: 'গ্রামের মেলায় নববর্ষ' }, min: 7, p: 16 }
      ]
    }
  ],

  reports: [
    { type: 'report', size: '4.2 MB', date: { en: 'Oct 2026', bn: 'অক্টোবর ২০২৬' }, title: { en: 'Bangladesh Investment Guide 2026', bn: 'বাংলাদেশ বিনিয়োগ নির্দেশিকা ২০২৬' } },
    { type: 'brochure', size: '2.8 MB', date: { en: 'Sep 2026', bn: 'সেপ্টেম্বর ২০২৬' }, title: { en: 'Tourism Seasons Brochure', bn: 'ভ্রমণ মৌসুমের ব্রোশিওর' } },
    { type: 'press', size: '320 KB', date: { en: 'Sep 2026', bn: 'সেপ্টেম্বর ২০২৬' }, title: { en: 'Brand Bangladesh launches its national magazine', bn: 'জাতীয় ম্যাগাজিন প্রকাশ করল ব্র্যান্ড বাংলাদেশ' } },
    { type: 'report', size: '3.5 MB', date: { en: 'Aug 2026', bn: 'আগস্ট ২০২৬' }, title: { en: 'Exports at a Glance: Sector Profiles', bn: 'এক নজরে রপ্তানি: খাতভিত্তিক পরিচিতি' } },
    { type: 'brochure', size: '5.1 MB', date: { en: 'Jun 2026', bn: 'জুন ২০২৬' }, title: { en: 'Culture & Heritage Map', bn: 'সংস্কৃতি ও ঐতিহ্যের মানচিত্র' } },
    { type: 'press', size: '210 KB', date: { en: 'Apr 2026', bn: 'এপ্রিল ২০২৬' }, title: { en: 'Media advisory: Pohela Boishakh campaign', bn: 'গণমাধ্যম বিজ্ঞপ্তি: পহেলা বৈশাখ ক্যাম্পেইন' } }
  ],

  faq: [
    { q: { en: 'Is this a government website?', bn: 'এটি কি সরকারি ওয়েবসাইট?' }, a: { en: 'Brand Bangladesh is a national identity and storytelling platform. For official services and regulations we link directly to the relevant authorities.', bn: 'ব্র্যান্ড বাংলাদেশ একটি জাতীয় পরিচিতি ও গল্প বলার প্ল্যাটফর্ম। সরকারি সেবা ও বিধিবিধান জানতে আমরা আপনাকে সরাসরি সংশ্লিষ্ট কর্তৃপক্ষের ওয়েবসাইটে নিয়ে যাই।' } },
    { q: { en: 'Can I use the logo and photos?', bn: 'আমি কি লোগো ও ছবি ব্যবহার করতে পারব?' }, a: { en: 'Yes, through the media kit, as long as you follow the brand guidelines and credit the photographer.', bn: 'হ্যাঁ, মিডিয়া কিট থেকে নিতে পারবেন—শুধু ব্র্যান্ড নির্দেশিকা মেনে চলুন এবং আলোকচিত্রীর নাম উল্লেখ করুন।' } },
    { q: { en: 'How are community stories chosen?', bn: 'কমিউনিটির গল্প কীভাবে বাছাই হয়?' }, a: { en: 'Every submission is read by our team. We publish stories that are original, respectful and true, and we may edit lightly for length.', bn: 'প্রতিটি লেখা আমাদের সম্পাদকীয় দল মনোযোগ দিয়ে পড়ে। মৌলিক, শ্রদ্ধাশীল ও সত্য গল্পগুলোই প্রকাশিত হয়; প্রয়োজনে দৈর্ঘ্যের জন্য সামান্য সম্পাদনা করা হতে পারে।' } },
    { q: { en: 'Where do your numbers come from?', bn: 'আপনাদের পরিসংখ্যান কোথা থেকে আসে?' }, a: { en: 'Every figure shows its source and year. We use official statistics and recognised international organisations.', bn: 'প্রতিটি পরিসংখ্যানের সঙ্গে উৎস ও বছর দেওয়া থাকে। আমরা সরকারি পরিসংখ্যান ও স্বীকৃত আন্তর্জাতিক সংস্থার তথ্য ব্যবহার করি।' } }
  ]
};

export default content;
