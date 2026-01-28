
export interface CityData {
  slug: string;
  name: string;
  monument: string;
  image: string;
  dataAiHint: string;
  localTitle: string;
}

const imageKitBaseUrl = "https://ik.imagekit.io/gdal96mht/cities";
const heroImageFilename = "hero-shot.jpg";


// Helper to bust cache with a version timestamp
const v = "v=" + new Date().getFullYear();

export const cityData: CityData[] = [
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    monument: 'Vidhana Soudha',
    image: `${imageKitBaseUrl}/bengaluru/${heroImageFilename}?${v}`,
    dataAiHint: 'vidhana soudha',
    localTitle: 'ಬೆಂಗಳೂರಲ್ಲಿ RO ವಾಟರ್ ಪ್ಯೂರಿಫೈರ್ ಬಾಡಿಗೆಗೆ, ತಿಂಗಳಿಗೆ ₹299 ರಿಂದ ಶುರು',
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    monument: 'Chennai Central',
    image: `${imageKitBaseUrl}/chennai/${heroImageFilename}?${v}`,
    dataAiHint: 'chennai central station',
    localTitle: 'சென்னையில் RO வாட்டர் பியூரிஃபையர் வாடகைக்கு, மாதம் ₹299 முதல்',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    monument: 'India Gate',
    image: `${imageKitBaseUrl}/delhi/${heroImageFilename}?${v}`,
    dataAiHint: 'india gate',
    localTitle: 'दिल्ली में RO वॉटर प्यूरीफायर किराए पर, ₹299/माह से शुरू',
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    monument: 'Raja Nahar Singh Palace',
    image: `${imageKitBaseUrl}/faridabad/${heroImageFilename}?${v}`,
    dataAiHint: 'raja nahar palace',
    localTitle: 'फरीदाबाद में RO वॉटर प्यूरीफायर किराए पर, ₹299/माह से शुरू',
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    monument: 'ISKCON Temple',
    image: `${imageKitBaseUrl}/ghaziabad/${heroImageFilename}?${v}`,
    dataAiHint: 'iskcon temple',
    localTitle: 'गाजियाबाद में RO वॉटर प्यूरीफायर किराए पर, ₹299/माह से शुरू',
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    monument: 'Cyber Hub',
    image: `${imageKitBaseUrl}/gurugram/${heroImageFilename}?${v}`,
    dataAiHint: 'gurugram cyber hub',
    localTitle: 'गुरुग्राम में RO वॉटर प्यूरीफायर किराए पर, ₹299/माह से शुरू',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    monument: 'Charminar',
    image: `${imageKitBaseUrl}/hyderabad/${heroImageFilename}?${v}`,
    dataAiHint: 'charminar',
    localTitle: 'హైదరాబాద్‌లో RO వాటర్ ప్యూరిఫైయర్ అద్దెకు, నెలకు ₹299 నుండి ప్రారంభం',
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    monument: 'Howrah Bridge',
    image: `${imageKitBaseUrl}/kolkata/${heroImageFilename}?${v}`,
    dataAiHint: 'howrah bridge',
    localTitle: 'কলকাতায় RO ওয়াটার পিউরিফায়ার ভাড়ায়, প্রতি মাসে ₹299 থেকে শুরু',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    monument: 'Gateway of India',
    image: `${imageKitBaseUrl}/mumbai/${heroImageFilename}?${v}`,
    dataAiHint: 'gateway india',
    localTitle: 'मुंबईत RO वॉटर प్యూరిఫायर भाड्याने, ₹299/महिन्यापासून सुरू',
  },
  {
    slug: 'noida',
    name: 'Noida',
    monument: 'DLF Mall of India',
    image: `${imageKitBaseUrl}/noida/${heroImageFilename}?${v}`,
    dataAiHint: 'modern building',
    localTitle: 'नोएडा में RO वॉटर प्यूरीफायर किराए पर, ₹299/माह से शुरू',
  },
  {
    slug: 'pune',
    name: 'Pune',
    monument: 'Shaniwar Wada',
    image: `${imageKitBaseUrl}/pune/${heroImageFilename}?${v}`,
    dataAiHint: 'shaniwar wada',
    localTitle: 'पुण्यात RO वॉटर प్యూరిఫायर भाड्याने, ₹299/महिन्यापासून सुरू',
  },
];
