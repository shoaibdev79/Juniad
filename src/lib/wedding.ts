// Wedding invitation details for Junaid Asghar & Sahrish
// Sab details yahin se change hoti hain — naam, date, venue, contacts waghera.
export const wedding = {
  groom: "Junaid Asghar",
  bride: "Sahrish",
  groomUrdu: "جنید اصغر",
  brideUrdu: "سحرش",
  groomFamily: "Son of Mr. & Mrs. Muhammad Asghar Ali",
  groomFamilyUrdu: "جناب و محترمہ محمد اصغر علی کے صاحبزادے",
  brideFamily: "Daughter of Mr. & Mrs. Muhammad Atta Ullah",
  brideFamilyUrdu: "جناب و محترمہ محمد عطا اللہ کی صاحبزادی",
  heroIntro:
    "In the Name of Allah who is the most Beneficent & Merciful\nMr. & Mrs. Muhammad Asghar Ali\nRequest the Pleasure of your company at the\nWedding Ceremony of their beloved Son",
  heroIntroUrdu:
    "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے\nجناب و محترمہ محمد اصغر علی\nاپنے پیارے صاحبزادے کی شادی میں شرکت کے متمنی ہیں",
  date: "2027-01-01T18:00:00+05:00", // 1 January 2027, 6:00 PM Pakistan time
  dateText: "1st January 2027",
  day: "Friday",
  time: "06:00 PM",
  // Venue: Dewan-e-khas (Marriage & Banquet Hall), Akbar Road, Okara
  venue: "Dewan-e-khas (Marriage & Banquet Hall)",
  address: "Akbar Road, Okara, Pakistan",
  venues: [
    {
      tag: "Wedding Venue · Friday 1 Jan",
      tagUrdu: "مقامِ تقریب · جمعہ 1 جنوری",
      name: "Dewan-e-khas (Marriage & Banquet Hall)",
      nameUrdu: "دیوانِ خاص (میریج و بینکوئٹ ہال)",
      address: "Akbar Road, Okara, Pakistan",
      addressUrdu: "اکبر روڈ، اوکاڑہ، پاکستان",
      mapQuery: "Dewan-e-khas Marriage & Banquet Hall, Akbar Road, Okara, Pakistan",
      mapUrl: "https://share.google/hMGqYAatvkKfdPplh",
    },
  ],
  welcome:
    "In the Name of Allah who is the most Beneficent & Merciful\n\nMr. & Mrs. Muhammad Asghar Ali\nRequest the pleasure of your company at the Wedding Ceremony of their beloved son\nJunaid Asghar with Sahrish\n\nINSHA ALLAH\nYour presence and prayers will bless this joyous occasion ♥",
  welcomeUrdu:
    "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے\n\nجناب و محترمہ محمد اصغر علی\nاپنے پیارے صاحبزادے جنید اصغر کی سحرش کے ساتھ شادی میں آپ کی باوقار شرکت کے متمنی ہیں۔\n\nان شاء اللہ\nآپ کی تشریف آوری اور دعائیں ہمارے لیے باعثِ مسرت و برکت ہوں گی۔",
  timeline: [
    {
      day: "FRIDAY, 1ST JANUARY 2027",
      time: "06:00 PM",
      title: "Wedding Ceremony",
      urdu: "تقریبِ شادی",
      note: "Guests are requested to be seated by 06:00 PM",
    },
    {
      day: "",
      time: "08:00 PM",
      title: "Dinner",
      urdu: "عشائیہ",
      note: "Dinner will be served at the venue",
    },
  ],
  preEvents: [] as { day: string; time: string; title: string; urdu: string; note: string }[],
  // Apne RSVP contact numbers yahan likhein, masalan: [{ name: "Junaid Asghar", phone: "0300-1234567" }]
  rsvpContacts: [] as { name: string; phone: string }[],
  lookingForward: "All Family Members",
  lookingForwardUrdu: "تمام اہل خانہ",
  transportation:
    "For directions and transportation arrangements, please contact the host family.",
  accommodation:
    "Respected out-of-town guests are warmly welcomed. For any assistance or directions, please contact the host family.",
  gifts:
    "Your gracious presence, love and prayers for Junaid & Sahrish are the greatest gifts we could ever ask for.",
};
