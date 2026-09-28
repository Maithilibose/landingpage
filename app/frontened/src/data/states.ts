export type StateStory = {
  name: string;
  languages: string[];
  material: string;
  traditions: string[];
  manuscriptCount: number;
  description: string;
  story: string;
  period: string;
  script: string;
};

export const stateStories: Record<string, StateStory> = {
  "andaman-and-nicobar": {
    name: "Andaman and Nicobar Islands",
    languages: ["Hindi", "Bengali", "Tamil", "Nicobarese"],
    material: "Paper · Palm leaf",
    traditions: ["Oral traditions", "Community knowledge", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "Island communities preserve diverse forms of cultural memory through oral traditions, written records and community knowledge.",
    story:
      "Explore the layered cultural traditions of the islands and the ways knowledge has been preserved across generations.",
  },

  "andhra-pradesh": {
    name: "Andhra Pradesh",
    languages: ["Telugu", "Sanskrit"],
    material: "Palm leaf · Paper",
    traditions: ["Literature", "Religion", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Telugu script",
    description:
      "A manuscript tradition connected with Telugu literature, religious texts and scholarly knowledge.",
    story:
      "Discover manuscripts carrying literary, religious and philosophical knowledge through generations.",
  },

  "arunachal-pradesh": {
    name: "Arunachal Pradesh",
    languages: ["Tibetan", "English", "Local languages"],
    material: "Paper · Handmade materials",
    traditions: ["Buddhism", "Religion", "Oral traditions"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Tibetan · Multiple scripts",
    description:
      "Himalayan knowledge traditions connect written records with religious, cultural and oral heritage.",
    story:
      "Explore knowledge traditions shaped by Himalayan communities, religious institutions and generations of oral transmission.",
  },

  assam: {
    name: "Assam",
    languages: ["Assamese", "Sanskrit"],
    material: "Sanchi leaf · Paper",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Assamese script",
    description:
      "Assam's manuscript heritage includes literary, religious and historical traditions preserved across generations.",
    story:
      "Explore written traditions that connect literature, religion and regional history.",
  },

  bihar: {
    name: "Bihar",
    languages: ["Hindi", "Sanskrit", "Maithili"],
    material: "Paper · Palm leaf",
    traditions: ["Philosophy", "Religion", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "A region deeply connected with philosophical, religious and literary traditions.",
    story:
      "Discover manuscript traditions connected with major intellectual and religious traditions of eastern India.",
  },

  chandigarh: {
    name: "Chandigarh",
    languages: ["Hindi", "Punjabi", "English"],
    material: "Paper",
    traditions: ["Literature", "Administration", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari · Gurmukhi",
    description:
      "Written heritage in Chandigarh reflects the wider literary and historical traditions of northern India.",
    story:
      "Explore records and written traditions connected with the cultural history of the region.",
  },

  chhattisgarh: {
    name: "Chhattisgarh",
    languages: ["Chhattisgarhi", "Hindi", "Sanskrit"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "Folk traditions"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari",
    description:
      "Regional written traditions intersect with religious, literary and oral forms of cultural memory.",
    story:
      "Discover the relationship between written knowledge and living cultural traditions.",
  },

  "dadra-and-nagar-haveli": {
    name: "Dadra and Nagar Haveli",
    languages: ["Gujarati", "Hindi", "Marathi"],
    material: "Paper · Palm leaf",
    traditions: ["Folk traditions", "Religion", "Community knowledge"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "The region carries diverse cultural traditions shaped by communities from western India.",
    story:
      "Explore regional knowledge traditions preserved through community memory and written culture.",
  },

  "daman-and-diu": {
    name: "Daman and Diu",
    languages: ["Gujarati", "Hindi", "Portuguese"],
    material: "Paper",
    traditions: ["History", "Religion", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "The region reflects layered cultural and historical traditions shaped by different communities.",
    story:
      "Discover written heritage shaped by the meeting of Indian and European cultural histories.",
  },

  delhi: {
    name: "Delhi",
    languages: ["Hindi", "Urdu", "Sanskrit"],
    material: "Paper",
    traditions: ["Literature", "History", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari · Perso-Arabic",
    description:
      "Delhi has long been a meeting point for literary, scholarly, religious and administrative traditions.",
    story:
      "Explore written knowledge shaped by centuries of intellectual and cultural exchange.",
  },

  goa: {
    name: "Goa",
    languages: ["Konkani", "Marathi", "Portuguese"],
    material: "Paper",
    traditions: ["Religion", "History", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "Goa's written heritage reflects a meeting of Indian, regional and European traditions.",
    story:
      "Explore manuscripts and records that preserve the region's layered cultural history.",
  },

  gujarat: {
    name: "Gujarat",
    languages: ["Gujarati", "Sanskrit"],
    material: "Paper",
    traditions: ["Literature", "Religion", "Jain scholarship"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Gujarati script",
    description:
      "Gujarat has a rich tradition of illustrated and religious manuscript preservation.",
    story:
      "Explore manuscript traditions connected with literature, religious knowledge and scholarship.",
  },

  haryana: {
    name: "Haryana",
    languages: ["Hindi", "Sanskrit", "Punjabi"],
    material: "Paper",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari · Gurmukhi",
    description:
      "Northern Indian literary and religious traditions have shaped the region's written heritage.",
    story:
      "Discover manuscripts connected with regional literature, religious traditions and historical memory.",
  },

  himachal: {
    name: "Himachal Pradesh",
    languages: ["Hindi", "Sanskrit", "Tibetan"],
    material: "Paper · Birch bark",
    traditions: ["Buddhism", "Religion", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "Mountain manuscript traditions preserve Buddhist, religious and literary knowledge.",
    story:
      "Discover manuscripts shaped by Himalayan religious and scholarly traditions.",
  },

  "jammu-and-kashmir": {
    name: "Jammu & Kashmir",
    languages: ["Kashmiri", "Sanskrit", "Urdu"],
    material: "Paper · Birch bark",
    traditions: ["Philosophy", "Religion", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "A region with layered Sanskrit, Kashmiri, Islamic and Himalayan manuscript traditions.",
    story:
      "Explore the intersection of philosophical, literary and religious knowledge preserved across centuries.",
  },

  jharkhand: {
    name: "Jharkhand",
    languages: ["Hindi", "Santali", "Nagpuri"],
    material: "Paper · Palm leaf",
    traditions: ["Oral traditions", "Religion", "Folk knowledge"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Multiple scripts",
    description:
      "The region carries diverse forms of community knowledge alongside written traditions.",
    story:
      "Explore the relationship between written records, oral traditions and indigenous cultural memory.",
  },

  karnataka: {
    name: "Karnataka",
    languages: ["Kannada", "Sanskrit"],
    material: "Palm leaf · Paper",
    traditions: ["Literature", "Philosophy", "Religion"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Kannada script",
    description:
      "Karnataka's manuscript traditions span literature, philosophy, religion and scholarship.",
    story:
      "Discover manuscripts carrying generations of literary and philosophical knowledge.",
  },

  kerala: {
    name: "Kerala",
    languages: ["Malayalam", "Sanskrit"],
    material: "Palm leaf",
    traditions: ["Medicine", "Literature", "Astronomy"],
    manuscriptCount: 98,
    period: "Demo collection",
    script: "Malayalam script",
    description:
      "Manuscript traditions preserving literature, medicine, astronomy and other forms of knowledge.",
    story:
      "Discover how manuscripts became vessels for literary, scientific, philosophical and medical knowledge.",
  },

  lakshadweep: {
    name: "Lakshadweep",
    languages: ["Malayalam", "Jeseri"],
    material: "Paper · Palm leaf",
    traditions: ["Religion", "Literature", "Community knowledge"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Malayalam script",
    description:
      "Island traditions preserve literary, religious and community knowledge through generations.",
    story:
      "Explore the cultural memory of island communities and their written traditions.",
  },

  "madhya-pradesh": {
    name: "Madhya Pradesh",
    languages: ["Hindi", "Sanskrit"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari",
    description:
      "Central India has long carried literary, religious and scholarly traditions across different communities.",
    story:
      "Explore manuscripts connecting central India's literary, philosophical and religious heritage.",
  },

  maharashtra: {
    name: "Maharashtra",
    languages: ["Marathi", "Sanskrit"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari · Modi",
    description:
      "Maharashtra's manuscript heritage includes literary, religious and scholarly traditions.",
    story:
      "Discover texts that preserve Marathi literary culture alongside broader Sanskrit traditions.",
  },

  manipur: {
    name: "Manipur",
    languages: ["Meitei", "Bengali", "Sanskrit"],
    material: "Paper · Handmade materials",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Meitei Mayek · Bengali",
    description:
      "Manipur has a distinctive written heritage shaped by regional literature, religion and history.",
    story:
      "Explore manuscripts reflecting the cultural memory and literary traditions of the northeast.",
  },

  meghalaya: {
    name: "Meghalaya",
    languages: ["Khasi", "Garo", "English"],
    material: "Paper",
    traditions: ["Oral traditions", "Community knowledge", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Roman · Multiple scripts",
    description:
      "Community knowledge and oral traditions form an important part of Meghalaya's cultural heritage.",
    story:
      "Explore how cultural memory is preserved through community traditions and written records.",
  },

  mizoram: {
    name: "Mizoram",
    languages: ["Mizo", "English"],
    material: "Paper",
    traditions: ["Literature", "Oral traditions", "Community knowledge"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Roman",
    description:
      "Mizoram's written traditions developed alongside rich oral and community knowledge systems.",
    story:
      "Discover how literature and community memory preserve regional cultural knowledge.",
  },

  nagaland: {
    name: "Nagaland",
    languages: ["English", "Nagamese", "Local languages"],
    material: "Paper",
    traditions: ["Oral traditions", "Community knowledge", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Roman · Multiple scripts",
    description:
      "Nagaland contains diverse community traditions in which oral knowledge plays an important role.",
    story:
      "Explore the relationship between written records and the many living knowledge traditions of the region.",
  },

  odisha: {
    name: "Odisha",
    languages: ["Odia", "Sanskrit"],
    material: "Palm leaf",
    traditions: ["Literature", "Philosophy", "Religion"],
    manuscriptCount: 126,
    period: "Demo collection",
    script: "Odia script",
    description:
      "A manuscript tradition shaped by palm-leaf writing, illustration, literature and knowledge passed through generations.",
    story:
      "Explore manuscript traditions connected with literature, philosophy and religious knowledge preserved on fragile palm leaves.",
  },

  puducherry: {
    name: "Puducherry",
    languages: ["Tamil", "French", "Telugu"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Tamil · Multiple scripts",
    description:
      "Puducherry carries layered literary and historical traditions shaped by regional and colonial encounters.",
    story:
      "Explore written heritage shaped by Tamil literary culture and the region's multilingual history.",
  },

  punjab: {
    name: "Punjab",
    languages: ["Punjabi", "Hindi", "Sanskrit"],
    material: "Paper",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Gurmukhi · Devanagari",
    description:
      "Punjab's written heritage is closely connected with Punjabi literature, religious traditions and regional history.",
    story:
      "Discover texts and written traditions that preserve generations of literary and religious knowledge.",
  },

  rajasthan: {
    name: "Rajasthan",
    languages: ["Rajasthani", "Hindi", "Sanskrit"],
    material: "Paper",
    traditions: ["Literature", "Religion", "Jain scholarship"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari",
    description:
      "Rajasthan is home to important traditions of illustrated, literary and religious manuscripts.",
    story:
      "Discover manuscript traditions shaped by literature, religious scholarship and regional culture.",
  },

  sikkim: {
    name: "Sikkim",
    languages: ["Nepali", "Sikkimese", "Tibetan"],
    material: "Paper",
    traditions: ["Buddhism", "Religion", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Tibetan · Devanagari",
    description:
      "Sikkim's written heritage includes Himalayan Buddhist and regional literary traditions.",
    story:
      "Explore manuscripts connected with Buddhist scholarship and Himalayan cultural traditions.",
  },

  "tamil-nadu": {
    name: "Tamil Nadu",
    languages: ["Tamil", "Sanskrit"],
    material: "Palm leaf",
    traditions: ["Literature", "Grammar", "Philosophy"],
    manuscriptCount: 143,
    period: "Demo collection",
    script: "Tamil script",
    description:
      "A long literary tradition preserved through manuscripts, texts and generations of scholarship.",
    story:
      "Explore manuscript traditions carrying literature, grammar, philosophy and cultural memory.",
  },

  telangana: {
    name: "Telangana",
    languages: ["Telugu", "Urdu", "Sanskrit"],
    material: "Palm leaf · Paper",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Telugu · Perso-Arabic",
    description:
      "Telangana's written heritage reflects Telugu, Sanskrit, Urdu and regional traditions.",
    story:
      "Explore the meeting of literary, religious and historical traditions across the Deccan.",
  },

  tripura: {
    name: "Tripura",
    languages: ["Bengali", "Kokborok", "Sanskrit"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "History"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Bengali · Devanagari",
    description:
      "Tripura's cultural heritage reflects the meeting of northeastern and Bengali literary traditions.",
    story:
      "Explore written traditions connecting regional history, literature and religious knowledge.",
  },

  uttarakhand: {
    name: "Uttarakhand",
    languages: ["Hindi", "Sanskrit"],
    material: "Paper · Birch bark",
    traditions: ["Religion", "Philosophy", "Literature"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari",
    description:
      "Himalayan knowledge traditions connect religious, philosophical and literary manuscripts.",
    story:
      "Discover written knowledge preserved across the Himalayan landscape.",
  },

  "uttar-pradesh": {
    name: "Uttar Pradesh",
    languages: ["Hindi", "Sanskrit", "Urdu"],
    material: "Paper",
    traditions: ["Literature", "Religion", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Devanagari · Perso-Arabic",
    description:
      "A major centre of literary, philosophical and religious traditions with a layered manuscript heritage.",
    story:
      "Explore manuscripts connected with northern India's literary and intellectual traditions.",
  },

  "west-bengal": {
    name: "West Bengal",
    languages: ["Bengali", "Sanskrit"],
    material: "Paper · Palm leaf",
    traditions: ["Literature", "Religion", "Philosophy"],
    manuscriptCount: 0,
    period: "Collection data",
    script: "Bengali script",
    description:
      "West Bengal's manuscript traditions reflect Bengali literature, Sanskrit scholarship and religious knowledge.",
    story:
      "Explore written traditions connecting Bengali literary culture with broader scholarly traditions.",
  },
};