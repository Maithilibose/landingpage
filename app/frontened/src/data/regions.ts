export type RegionId = 'north' | 'south' | 'east' | 'west';

export interface RegionInfo {
  id: RegionId;
  number: string;
  name: string;
  displayName: string;
  knowledgeTitle: string;
  tagline: string;
  description: string;
  story: string;
  defaultState: string;
  stateKeys: string[];
  keyScripts: string[];
  materials: string[];
}

export const REGIONS: RegionInfo[] = [
  {
    id: 'north',
    number: '01',
    name: 'NORTH',
    displayName: 'Northern Region',
    knowledgeTitle: 'The Knowledge of the North',
    tagline: 'Himalayan birch-bark, court codices & classical Sharada-Devanagari traditions',
    description:
      'Spanning Kashmir, the Himalayan foothills, and the Indo-Gangetic plains, northern manuscript traditions preserve birch-bark (bhurjapatra) folios, court chronicles, and diverse classical scripts.',
    story:
      'Northern traditions bridge the sacred valley of Kashmir—where Sharada manuscripts preserved Sanskrit treatises on birch bark—with the paper codices and shikasta records of the court and early Gurmukhi and Devanagari libraries across Punjab and the Gangetic plains.',
    defaultState: 'jammu-and-kashmir',
    stateKeys: [
      'jammu-and-kashmir',
      'ladakh',
      'himachal',
      'punjab',
      'chandigarh',
      'haryana',
      'delhi',
      'uttarakhand',
      'uttar-pradesh',
    ],
    keyScripts: ['Sharada', 'Devanagari', 'Gurmukhi', 'Perso-Arabic'],
    materials: ['Birch bark (Bhurjapatra)', 'Kashmiri rag paper', 'Sized paper'],
  },
  {
    id: 'south',
    number: '02',
    name: 'SOUTH',
    displayName: 'Southern Region',
    knowledgeTitle: 'The Knowledge of the South',
    tagline: 'Incised palm-leaf archives, Sangam literature & Grantha repositories',
    description:
      'Rooted in temple libraries, royal mutts, and coastal archives, southern traditions are distinguished by stylus-incised palmyra palm leaves preserving Dravidian literatures, Vedic commentaries, and scientific treatises.',
    story:
      'The southern manuscript world represents centuries of palm-leaf scribal mastery. From incised Tamil Sangam folios and Grantha Sanskrit codices to layered Malayalam, Kannada, and Telugu literary transmissions, manuscripts here were preserved through dedicated temple and community curation.',
    defaultState: 'tamil-nadu',
    stateKeys: [
      'tamil-nadu',
      'kerala',
      'karnataka',
      'andhra-pradesh',
      'telangana',
      'puducherry',
      'lakshadweep',
    ],
    keyScripts: ['Tamil', 'Grantha', 'Malayalam', 'Kannada', 'Telugu'],
    materials: ['Palmyra palm leaf (Borassus)', 'Talipot palm leaf (Corypha)', 'Wood covers'],
  },
  {
    id: 'east',
    number: '03',
    name: 'EAST',
    displayName: 'Eastern Region',
    knowledgeTitle: 'The Knowledge of the East',
    tagline: 'Circular Odia palm-leaf incisions, Sanchi bark & Maithili-Bengali heritage',
    description:
      'From the temple archives of Puri to the monasteries of Assam and Bengal, eastern traditions feature rounded palm-leaf scripts, Sanchi tree bark, and illustrated religious texts.',
    story:
      'Eastern traditions developed distinctive curved scripts designed to glide across palm leaves without tearing the delicate veins. Here, Odia palm-leaf illustrations, Sanchi bark folios of Assam, and early Bengali-Maithili treatises formed an unbroken chain of philosophical, astronomical, and devotional learning.',
    defaultState: 'odisha',
    stateKeys: [
      'odisha',
      'west-bengal',
      'bihar',
      'jharkhand',
      'assam',
      'arunachal-pradesh',
      'manipur',
      'meghalaya',
      'mizoram',
      'nagaland',
      'tripura',
      'sikkim',
      'andaman-and-nicobar',
    ],
    keyScripts: ['Odia', 'Bengali', 'Assamese', 'Tirhuta / Maithili', 'Tibetan'],
    materials: ['Talipot palm leaf', 'Sanchi bark (Aquilaria agallocha)', 'Handmade paper'],
  },
  {
    id: 'west',
    number: '04',
    name: 'WEST',
    displayName: 'Western Region',
    knowledgeTitle: 'The Knowledge of the West',
    tagline: 'Jain grantha bhandars, Modi administrative hands & illuminated folios',
    description:
      'Centered in the desert archives of Rajasthan, the merchant libraries of Gujarat, and Deccan administrative centers, western traditions preserve opulent illuminated manuscripts and administrative rolls.',
    story:
      'Western India’s dry climate and monastic patronage fostered some of the subcontinent’s most lavishly illuminated manuscripts. The Jain bhandars of Patan and Jaisalmer preserve ancient palm-leaf and gold-pigmented paper folios, alongside rapid Modi administrative hands and Marathi spiritual texts.',
    defaultState: 'gujarat',
    stateKeys: [
      'gujarat',
      'rajasthan',
      'maharashtra',
      'goa',
      'madhya-pradesh',
      'chhattisgarh',
      'dadra-and-nagar-haveli',
      'daman-and-diu',
    ],
    keyScripts: ['Gujarati / Devanagari', 'Jain Nagari', 'Modi', 'Maharastri'],
    materials: ['Gold-illuminated paper', 'Patan palm leaf', 'Cloth bindings'],
  },
];

export const REGIONS_BY_ID: Record<RegionId, RegionInfo> = {
  north: REGIONS[0],
  south: REGIONS[1],
  east: REGIONS[2],
  west: REGIONS[3],
};

export function getRegionById(id: string | null | undefined): RegionInfo {
  if (!id) return REGIONS_BY_ID.east;
  const normalized = id.toLowerCase().trim() as RegionId;
  return REGIONS_BY_ID[normalized] ?? REGIONS_BY_ID.east;
}

export function getRegionForState(stateKey: string): RegionInfo {
  const normalized = stateKey.toLowerCase().trim();
  const match = REGIONS.find((r) => r.stateKeys.includes(normalized));
  return match ?? REGIONS_BY_ID.east;
}
