export interface CityData {
  slug: string;
  name: string;
  monument: string;
  image: string;
  dataAiHint: string;
  localTitle?: string; // Kept for backwards compatibility just in case
  greeting: string;
  localHeadline: string;
  localSubHeadline: string;
  localCallbackHeading: string;
}

const imageKitBaseUrl = "https://ik.imagekit.io/gdal96mht/cities";
const heroImageFilename = "hero-shot.jpg";

export const cityData: CityData[] = [
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    monument: 'Vidhana Soudha',
    image: `${imageKitBaseUrl}/bengaluru/${heroImageFilename}`,
    dataAiHint: 'vidhana soudha',
    greeting: 'ನಮಸ್ಕಾರ',
    localHeadline: 'ಬೆಂಗಳೂರಲ್ಲಿ RO ವಾಟರ್ ಪ್ಯೂರಿಫೈರ್ ಬಾಡಿಗೆಗೆ',
    localSubHeadline: 'ತಿಂಗಳಿಗೆ ₹299 ರಿಂದ ಶುರು',
    localCallbackHeading: 'ಬೆಂಗಳೂರಲ್ಲಿ ಕಾಲ್ಬ್ಯಾಕ್ ವಿನಂತಿಸಿ',
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    monument: 'Chennai Central',
    image: `${imageKitBaseUrl}/chennai/${heroImageFilename}`,
    dataAiHint: 'chennai central station',
    greeting: 'வணக்கம்',
    localHeadline: 'சென்னையில் RO வாட்டர் பியூரிஃபையர் வாடகைக்கு',
    localSubHeadline: 'மாதம் ₹299 முதல்',
    localCallbackHeading: 'சென்னையில் கால்பேக் கோரவும்',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    monument: 'India Gate',
    image: `${imageKitBaseUrl}/delhi/${heroImageFilename}`,
    dataAiHint: 'india gate',
    greeting: 'नमस्ते',
    localHeadline: 'दिल्ली में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'दिल्ली में कॉलबैक का अनुरोध करें',
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    monument: 'Raja Nahar Singh Palace',
    image: `${imageKitBaseUrl}/faridabad/${heroImageFilename}`,
    dataAiHint: 'raja nahar palace',
    greeting: 'नमस्ते',
    localHeadline: 'फरीदाबाद में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'फरीदाबाद में कॉलबैक का अनुरोध करें',
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    monument: 'ISKCON Temple',
    image: `${imageKitBaseUrl}/ghaziabad/${heroImageFilename}`,
    dataAiHint: 'iskcon temple',
    greeting: 'नमस्ते',
    localHeadline: 'गाजियाबाद में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'गाजियाबाद में कॉलबैक का अनुरोध करें',
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    monument: 'Cyber Hub',
    image: `${imageKitBaseUrl}/gurugram/${heroImageFilename}`,
    dataAiHint: 'gurugram cyber hub',
    greeting: 'नमस्ते',
    localHeadline: 'गुरुग्राम में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'गुरुग्राम में कॉलबैक का अनुरोध करें',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    monument: 'Charminar',
    image: `${imageKitBaseUrl}/hyderabad/${heroImageFilename}`,
    dataAiHint: 'charminar',
    greeting: 'నమస్కారం',
    localHeadline: 'హైదరాబాద్‌లో RO వాటర్ ప్యూరిఫైయర్ అద్దెకు',
    localSubHeadline: 'నెలకు ₹299 నుండి ప్రారంభం',
    localCallbackHeading: 'హైదరాబాద్‌లో కాల్‌బ్యాక్ అభ్యర్థించండి',
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    monument: 'Howrah Bridge',
    image: `${imageKitBaseUrl}/kolkata/${heroImageFilename}`,
    dataAiHint: 'howrah bridge',
    greeting: 'নমস্কার',
    localHeadline: 'কলকাতায় RO ওয়াটার পিউরিফায়ার ভাড়ায়',
    localSubHeadline: 'প্রতি মাসে ₹299 থেকে শুরু',
    localCallbackHeading: 'কলকাতায় একটি কলব্যাক অনুরোধ করুন',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    monument: 'Gateway of India',
    image: `${imageKitBaseUrl}/mumbai/${heroImageFilename}`,
    dataAiHint: 'gateway india',
    greeting: 'नमस्कार',
    localHeadline: 'मुंबईत RO वॉटर प्यूरीफायर भाड्याने',
    localSubHeadline: '₹299/महिन्यापासून सुरू',
    localCallbackHeading: 'मुंबईत कॉलबॅकची विनंती करा',
  },
  {
    slug: 'noida',
    name: 'Noida',
    monument: 'DLF Mall of India',
    image: `${imageKitBaseUrl}/noida/${heroImageFilename}`,
    dataAiHint: 'modern building',
    greeting: 'नमस्ते',
    localHeadline: 'नोएडा में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'नोएडा में कॉलबैक का अनुरोध करें',
  },
  {
    slug: 'pune',
    name: 'Pune',
    monument: 'Shaniwar Wada',
    image: `${imageKitBaseUrl}/pune/${heroImageFilename}`,
    dataAiHint: 'shaniwar wada',
    greeting: 'नमस्कार',
    localHeadline: 'पुण्यात RO वॉटर प्यूरीफायर भाड्याने',
    localSubHeadline: '₹299/महिन्यापासून सुरू',
    localCallbackHeading: 'पुण्यात कॉलबॅकची विनंती करा',
  },
  {
    slug: 'bokaro-steel-city',
    name: 'Bokaro Steel City',
    monument: 'Bokaro Steel Plant',
    image: `${imageKitBaseUrl}/bokaro-steel-city/${heroImageFilename}`,
    dataAiHint: 'bokaro steel plant',
    greeting: 'नमस्ते',
    localHeadline: 'बोकारो स्टील सिटी में RO वॉटर प्यूरीफायर किराए पर',
    localSubHeadline: '₹299/माह से शुरू',
    localCallbackHeading: 'बोकारो स्टील सिटी में कॉलबैक का अनुरोध करें',
  },
];
