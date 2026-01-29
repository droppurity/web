// Redefining interface locally to ensure self-containment as per previous file structure
export interface CityData {
  slug: string;
  name: string;
  monument: string;
  image: string;
  dataAiHint: string;
  localTitle: string;
  localSubtitle: string;
  localPlanTitle: string;
  exampleName: string;
  localGreeting?: string;
  localFormTitle?: string;
  seoKeywords?: string[];
  areas?: string[];
}

const imageKitBaseUrl = "https://ik.imagekit.io/gdal96mht/cities";
const heroImageFilename = "hero-shot.jpg";

// Helper to bust cache with a version timestamp
const v = "v=" + new Date().getFullYear();

// --- DIMENSION 1: RO VARIANTS (40+) ---
const roVariants = [
  "RO", "RO purifier", "RO water purifier", "Water purifier", "Water filter",
  "RO machine", "RO system", "Reverse osmosis", "Drinking water purifier",
  "Domestic RO", "Home RO", "Kitchen RO", "Compact RO", "Automatic RO",
  "Wall mounted RO", "Under sink RO", "UV purifier", "Alkaline RO", "Copper RO"
];

// --- DIMENSION 2: RENT VARIANTS (25+) ---
const rentVariants = [
  "on rent", "for rent", "rental", "monthly rental", "monthly rent",
  "subscription", "lease", "hire", "rent service", "rented",
  "on lease", "rental plan", "rental service"
];

// --- DIMENSION 3: PRICE VARIANTS (20+) ---
const prices = [
  "299", "₹299", "299 per month", "299/month", "under 300",
  "cheap", "budget", "low cost", "affordable", "lowest price",
  "monthly cost", "price", "rent price", "rates", "tariff"
];

// --- DIMENSION 4: INTENT MODIFIERS (30+) ---
const userIntent = [
  "near me", "best", "cheapest", "trusted", "verified",
  "instant", "same day", "urgent", "fast", "quick",
  "with free service", "with free maintenance", "no deposit", "zero deposit",
  "for home", "for apartment", "for rented house", "for family",
  "for bachelors", "for pg", "for office", "for shop"
];

// --- DIMENSION 6: AREAS (Sample per city) ---
// This will be mixed in from the city object

// --- ALGORITHMIC GENERATOR ---
const generateSeoKeywords = (city: string, areas: string[] = [], localKeywords: string[] = []): string[] => {
  const keywords = new Set<string>();

  // 1. MASTER FORMULA: [RO] + [RENT] + [CITY] (High Volume)
  roVariants.forEach(ro => {
    rentVariants.forEach(rent => {
      keywords.add(`${ro} ${rent} in ${city}`);
      keywords.add(`${ro} ${rent} ${city}`);
    });
  });

  // 2. MASTER FORMULA: [RO] + [RENT] + [PRICE] + [CITY] (High Intent)
  roVariants.slice(0, 10).forEach(ro => { // Limit to top 10 to avoid explosion
    rentVariants.slice(0, 10).forEach(rent => {
      prices.forEach(price => {
        keywords.add(`${ro} ${rent} ${price} ${city}`);
        keywords.add(`${ro} ${rent} ${city} ${price}`);
      });
    });
  });

  // 3. MASTER FORMULA: [RO] + [RENT] + [INTENT] + [CITY]
  roVariants.slice(0, 5).forEach(ro => {
    rentVariants.slice(0, 5).forEach(rent => {
      userIntent.forEach(intent => {
        keywords.add(`${ro} ${rent} ${intent} ${city}`);
        keywords.add(`${ro} ${rent} ${city} ${intent}`);
      });
    });
  });

  // 4. MICRO-LOCALITY: [RO] + [RENT] + [AREA] + [CITY]
  // This is the "20M" multiplier. We generate specific area combinations.
  if (areas.length > 0) {
    areas.forEach(area => {
      keywords.add(`RO on rent in ${area} ${city}`);
      keywords.add(`Water purifier rental ${area} ${city}`);
      keywords.add(`RO rent near ${area}`);
      keywords.add(`${city} ${area} RO rental`);
    });
  }

  // 5. BROKEN ENGLISH & HINGLISH (Direct injection)
  const hinglish = ["ka price", "ka rent", "chahiye", "lagwana hai", "rent par", "rate kya hai"];
  hinglish.forEach(h => {
    keywords.add(`RO ${h} ${city}`);
    keywords.add(`Water purifier ${h} ${city}`);
  });

  // Add manually provided local keywords
  localKeywords.forEach(k => keywords.add(k));

  // Return unique list
  return Array.from(keywords);
};

export const cityData: CityData[] = [
  {
    slug: 'ro-on-rent-bengaluru',
    name: 'Bengaluru',
    monument: 'Vidhana Soudha',
    image: `${imageKitBaseUrl}/bengaluru/${heroImageFilename}?${v}`,
    dataAiHint: 'vidhana soudha',
    localTitle: 'Rent RO Water Purifier in Bengaluru / ಬೆಂಗಳೂರಲ್ಲಿ RO ವಾಟರ್ ಪ್ಯೂರಿಫೈರ್ ಬಾಡಿಗೆಗೆ',
    localSubtitle: 'Starting at ₹299/mo / ತಿಂಗಳಿಗೆ ₹299 ರಿಂದ ಶುರು',
    localPlanTitle: 'Bengaluru Plans / ಬೆಂಗಳೂರು ಯೋಜನೆಗಳು',
    exampleName: 'Manjunath',
    localGreeting: 'ನಮಸ್ಕಾರ',
    localFormTitle: 'Request a Callback in Bengaluru / ಬೆಂಗಳೂರಲ್ಲಿ ಕಾಲ್‌ಬ್ಯಾಕ್ ವಿನಂತಿಸಿ',
    areas: ["Whitefield", "Indiranagar", "Koramangala", "HSR Layout", "BTM Layout", "Electronic City", "Marathahalli", "Yelahanka", "Hebbal", "Rajajinagar", "Malleshwaram", "Basavanagudi", "JP Nagar", "Jayanagar", "Bannerghatta Road"],
    get seoKeywords() { // Lazy getter to use local 'areas'
      return generateSeoKeywords(this.name, this.areas, [
        'ಬೆಂಗಳೂರಲ್ಲಿ RO ಬಾಡಿಗೆಗೆ', 'ವಾಟರ್ ಪ್ಯೂರಿಫೈರ್ ಬಾಡಿಗೆ', 'ಶುದ್ಧ ನೀರು ಬಾಡಿಗೆಗೆ',
        'Commercial RO plant rent Bangalore'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-chennai',
    name: 'Chennai',
    monument: 'Chennai Central',
    image: `${imageKitBaseUrl}/chennai/${heroImageFilename}?${v}`,
    dataAiHint: 'chennai central station',
    localTitle: 'Rent RO Water Purifier in Chennai / சென்னையில் RO வாட்டர் பியூரிஃபையர் வாடகைக்கு',
    localSubtitle: 'Starting at ₹299/mo / மாதம் ₹299 முதல்',
    localPlanTitle: 'Chennai Plans / சென்னை திட்டங்கள்',
    exampleName: 'Senthil',
    localGreeting: 'வணக்கம்',
    localFormTitle: 'Request a Callback in Chennai / சென்னையில் கால்பேக் கோருங்கள்',
    areas: ["OMR", "Velachery", "Adyar", "Anna Nagar", "T Nagar", "Tambaram", "Guindy", "Porur", "Chromepet"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'சென்னையில் RO வாடகைக்கு', 'வாட்டர் பியூரிஃபையர் வாடகை', 'RO வாட்டர் கேன்'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-delhi',
    name: 'Delhi',
    monument: 'India Gate',
    image: `${imageKitBaseUrl}/delhi/${heroImageFilename}?${v}`,
    dataAiHint: 'india gate',
    localTitle: 'Rent RO Water Purifier in Delhi / दिल्ली में RO वॉटर प्यूरीफायर',
    localSubtitle: 'Starting at ₹299/mo / सिर्फ ₹299 से शुरू',
    localPlanTitle: 'Delhi Plans / दिल्ली प्लान्स',
    exampleName: 'Amit',
    localGreeting: 'नमस्ते',
    localFormTitle: 'Request a Callback in Delhi / दिल्ली में कॉलबैक का अनुरोध करें',
    areas: ["South Delhi", "Dwarka", "Rohini", "Laxmi Nagar", "Janakpuri", "Saket", "Vasant Kunj", "Mayur Vihar"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'दिल्ली में RO किराए पर', 'वॉटर प्यूरीफायर किराया', 'RO ऑन रेंट', 'Single room RO rent Delhi'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-faridabad',
    name: 'Faridabad',
    monument: 'Raja Nahar Singh Palace',
    image: `${imageKitBaseUrl}/faridabad/${heroImageFilename}?${v}`,
    dataAiHint: 'raja nahar palace',
    localTitle: 'Rent RO Water Purifier in Faridabad / फरीदाबाद में RO वॉटर प्यूरीफायर',
    localSubtitle: 'Starting at ₹299/mo / सिर्फ ₹299 से शुरू',
    localPlanTitle: 'Faridabad Plans / फरीदाबाद प्लान्स',
    exampleName: 'Rajesh',
    localGreeting: 'नमस्ते',
    localFormTitle: 'Request a Callback in Faridabad / फरीदाबाद में कॉलबैक का अनुरोध करें',
    areas: ["NIT Faridabad", "Ballabhgarh", "Sector 15", "Sector 21", "Greater Faridabad"],
    get seoKeywords() { return generateSeoKeywords(this.name, this.areas, ['फरीदाबाद में RO', 'वॉटर प्यूरीफायर फरीदाबाद']); }
  },
  {
    slug: 'ro-on-rent-ghaziabad',
    name: 'Ghaziabad',
    monument: 'ISKCON Temple',
    image: `${imageKitBaseUrl}/ghaziabad/${heroImageFilename}?${v}`,
    dataAiHint: 'iskcon temple',
    localTitle: 'Rent RO Water Purifier in Ghaziabad / गाजियाबाद में RO वॉटर प्यूरीफायर',
    localSubtitle: 'Starting at ₹299/mo / सिर्फ ₹299 से शुरू',
    localPlanTitle: 'Ghaziabad Plans / गाजियाबाद प्लान्स',
    exampleName: 'Vikas',
    localGreeting: 'नमस्ते',
    localFormTitle: 'Request a Callback in Ghaziabad / गाजियाबाद में कॉलबack का अनुरोध करें',
    areas: ["Indirapuram", "Vasundhara", "Vaishali", "Raj Nagar Extension", "Crossings Republik"],
    get seoKeywords() { return generateSeoKeywords(this.name, this.areas, ['गाजियाबाद में RO', 'वॉटर प्यूरीफायर किराया गाजियाबाद']); }
  },
  {
    slug: 'ro-on-rent-gurugram',
    name: 'Gurugram',
    monument: 'Cyber Hub',
    image: `${imageKitBaseUrl}/gurugram/${heroImageFilename}?${v}`,
    dataAiHint: 'gurugram cyber hub',
    localTitle: 'Rent RO Water Purifier in Gurugram / गुरुग्राम में RO वॉटर प्यूरीफायर',
    localSubtitle: 'Starting at ₹299/mo / सिर्फ ₹299 से शुरू',
    localPlanTitle: 'Gurugram Plans / गुरुग्राम प्लान्स',
    exampleName: 'Rahul',
    localGreeting: 'नमस्ते',
    localFormTitle: 'Request a Callback in Gurugram / गुरुग्राम में कॉलबैक का अनुरोध करें',
    areas: ["Cyber City", "Udyog Vihar", "Sector 56", "MG Road", "Sohna Road", "DLF"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'गुरुग्राम में RO', 'गुडगाँव वॉटर प्यूरीफायर', 'RO किराया गुडगाँव', 'RO rent Gurgaon'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-hyderabad',
    name: 'Hyderabad',
    monument: 'Charminar',
    image: `${imageKitBaseUrl}/hyderabad/${heroImageFilename}?${v}`,
    dataAiHint: 'charminar',
    localTitle: 'Rent RO Water Purifier in Hyderabad / హైదరాబాద్‌లో RO వాటర్ ప్యూరిఫైయర్ అద్దెకు',
    localSubtitle: 'Starting at ₹299/mo / నెల‌కు ₹299 నుండి ప్రారంభం',
    localPlanTitle: 'Hyderabad Plans / హైదరాబాద్ ప్లాన్స్',
    exampleName: 'Sai',
    localGreeting: 'నమస్కారం',
    localFormTitle: 'Request a Callback in Hyderabad / హైదరాబాద్‌లో కాల్‌బ్యాక్ అభ్యర్థించండి',
    areas: ["Gachibowli", "Hitech City", "Kukatpally", "Banjara Hills", "Jubilee Hills", "Madhapur", "Kondapur"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'హైదరాబాద్‌లో RO అద్దెకు', 'వాటర్ ప్యూరిఫైయర్ అద్దె'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-kolkata',
    name: 'Kolkata',
    monument: 'Howrah Bridge',
    image: `${imageKitBaseUrl}/kolkata/${heroImageFilename}?${v}`,
    dataAiHint: 'howrah bridge',
    localTitle: 'Rent RO Water Purifier in Kolkata / কলকাতায় RO ওয়াটার পিউরিফায়ার',
    localSubtitle: 'Starting at ₹299/mo / মাত্র ₹299 থেকে শুরু',
    localPlanTitle: 'Kolkata Plans / কলকাতার প্ল্যান',
    exampleName: 'Abhishek',
    localGreeting: 'নমস্কার',
    localFormTitle: 'Request a Callback in Kolkata / কলকাতায় কলব্যাক অনুরোধ করুন',
    areas: ["Salt Lake", "New Town", "Park Street", "Ballygunge", "Dum Dum", "Jadavpur"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'কলকাতায় RO ভাড়া', 'ওয়াটার পিউরিফায়ার ভাড়া'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-mumbai',
    name: 'Mumbai',
    monument: 'Gateway of India',
    image: `${imageKitBaseUrl}/mumbai/${heroImageFilename}?${v}`,
    dataAiHint: 'gateway india',
    localTitle: 'Rent RO Water Purifier in Mumbai / मुंबईत RO वॉटर प्युरिफायर भाड्याने',
    localSubtitle: 'Starting at ₹299/mo / फक्त ₹299 पासून सुरू',
    localPlanTitle: 'Mumbai Plans / मुंबई प्लॅन्स',
    exampleName: 'Rohan',
    localGreeting: 'नमस्कार',
    localFormTitle: 'Request a Callback in Mumbai / मुंबईत कॉलबॅकची विनंती करा',
    areas: ["Andheri", "Bandra", "Juhu", "Powai", "Goregaon", "Thane", "Navi Mumbai", "Dadar"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'मुंबईत RO भाड्याने', 'वॉटर प्युरिफायर भाड्याने'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-noida',
    name: 'Noida',
    monument: 'DLF Mall of India',
    image: `${imageKitBaseUrl}/noida/${heroImageFilename}?${v}`,
    dataAiHint: 'modern building',
    localTitle: 'Rent RO Water Purifier in Noida / नोएडा में RO वॉटर प्यूरीफायर',
    localSubtitle: 'Starting at ₹299/mo / सिर्फ ₹299 से शुरू',
    localPlanTitle: 'Noida Plans / नोएडा प्लान्स',
    exampleName: 'Amit',
    localGreeting: 'नमस्ते',
    localFormTitle: 'Request a Callback in Noida / नोएडा में कॉलबैक का अनुरोध करें',
    areas: ["Sector 62", "Sector 18", "Sector 15", "Greater Noida", "Noida Extension"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'नोएडा में RO', 'वॉटर प्यूरीफायर किराया नोएडा'
      ]);
    }
  },
  {
    slug: 'ro-on-rent-pune',
    name: 'Pune',
    monument: 'Shaniwar Wada',
    image: `${imageKitBaseUrl}/pune/${heroImageFilename}?${v}`,
    dataAiHint: 'shaniwar wada',
    localTitle: 'Rent RO Water Purifier in Pune / पुण्यात RO वॉटर प्युरिफायर भाड्याने',
    localSubtitle: 'Starting at ₹299/mo / फक्त ₹299 पासून सुरू',
    localPlanTitle: 'Pune Plans / पुणे प्लॅन्स',
    exampleName: 'Aditya',
    localGreeting: 'नमस्कार',
    localFormTitle: 'Request a Callback in Pune / पुण्यात कॉलबॅकची विनंती करा',
    areas: ["Hinjewadi", "Viman Nagar", "Wakad", "Koregaon Park", "Magarpatta", "Kothrud", "Baner"],
    get seoKeywords() {
      return generateSeoKeywords(this.name, this.areas, [
        'पुण्यात RO भाड्याने', 'वॉटर प्युरिफायर भाड्याने'
      ]);
    }
  },
];
