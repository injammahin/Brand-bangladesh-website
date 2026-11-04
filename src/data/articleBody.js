/* Sample long-form body text (EN / BN) used until the CMS supplies real articles. */
export function articleBody(topic) {
  const T = topic; // { en, bn }
  return {
    intro: {
      en: `Some places explain themselves at once. Others ask you to slow down, listen and come back. ${T.en} belongs to the second kind, and the people who know it best say the same thing: you understand it only by spending time with it.`,
      bn: `কিছু জায়গা প্রথম দেখাতেই নিজেকে বুঝিয়ে দেয়। আবার কিছু জায়গা চায় আপনি থামুন, শুনুন, আর বারবার ফিরে আসুন। "${T.bn}" দ্বিতীয় ধরনের—আর যাঁরা একে সবচেয়ে ভালো চেনেন, তাঁরাও একই কথা বলেন: সময় না দিলে একে বোঝা যায় না।`,
    },
    paras: [
      {
        en: 'We travelled with local guides, farmers, makers and families who shared their days with us. What follows is built on their words, checked with experts and photographed over several weeks.',
        bn: 'আমরা ঘুরেছি স্থানীয় গাইড, কৃষক, কারিগর আর পরিবারগুলোর সঙ্গে, যাঁরা আমাদের সঙ্গে ভাগ করে নিয়েছেন তাঁদের দিনগুলো। এই লেখা গড়ে উঠেছে তাঁদেরই কথায়; তথ্য মিলিয়ে নেওয়া হয়েছে বিশেষজ্ঞদের সঙ্গে, আর ছবি তোলা হয়েছে কয়েক সপ্তাহ ধরে।',
      },
      {
        en: 'The story is also one of change. New roads, phones and markets have opened doors, and a younger generation is finding fresh ways to carry old knowledge forward without losing what makes it special.',
        bn: 'এই গল্প বদলেরও। নতুন রাস্তা, মোবাইল ফোন আর বাজার খুলে দিয়েছে নতুন দরজা; তরুণ প্রজন্ম পুরোনো জ্ঞানকে নতুনভাবে এগিয়ে নিচ্ছে—তার বিশেষত্ব না হারিয়েই।',
      },
    ],
    h2: { en: 'What it means for visitors', bn: 'ভ্রমণকারীদের জন্য কিছু কথা' },
    paras2: [
      {
        en: 'Travel slowly, hire local guides and buy directly from the people who make things. Respect seasons and protected areas. The rewards are conversations, meals and memories that no guidebook can promise.',
        bn: 'ধীরে ঘুরুন, স্থানীয় গাইড নিন, আর যাঁরা জিনিস বানান তাঁদের কাছ থেকেই কিনুন। ঋতু আর সংরক্ষিত এলাকার নিয়ম মেনে চলুন। বিনিময়ে পাবেন এমন আলাপ, খাবার আর স্মৃতি, যা কোনো গাইডবই দিতে পারে না।',
      },
    ],
    quote: {
      en: 'People come for the view. They come back for the people.',
      bn: 'মানুষ আসে দৃশ্য দেখতে, ফিরে আসে মানুষের টানে।',
    },
  };
}
