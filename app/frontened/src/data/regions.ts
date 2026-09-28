export type RegionId = 'north' | 'south' | 'east' | 'west';

export interface RegionData {
  id: RegionId;
  index: string;
  name: string;
  label: string;
  heading: string;
  knowledgeTitle: string;
  tagline: string;
  scriptTraditions: string;
  defaultState: string;
  states: string[];
  description: string;
  story: string;
}

export const REGIONS: Record<RegionId, RegionData> = {
  north: {
    id: 'north',
    index: '01',
    name: 'North',
    label: 'NORTH',
    heading: 'THE NORTH',
    knowledgeTitle: 'The knowledge of the North',
    tagline: 'Himalayan & Gangetic Plain Traditions',
    scriptTraditions: 'Sharada · Devanagari · Gurmukhi · Perso-Arabic',
    defaultState: 'jammu-and-kashmir',
    states: [
      'jammu-and-kashmir',
      'himachal',
      'punjab',
      'haryana',
      'chandigarh',
      'delhi',
      'uttarakhand',
      'uttar-pradesh',
      'rajasthan',
    ],
    description:
      'Northern manuscript traditions span birch-bark codices of Kashmir to paper court registers and philosophical commentaries of the Gangetic plains.',
    story:
      'Northern manuscript traditions span birch-bark codices of Kashmir to paper court registers and philosophical commentaries of the Gangetic plains, preserving Buddhist, Vedic, and literary knowledge across generations.',
  },
  south: {
    id: 'south',
    index: '02',
    name: 'South',
    label: 'SOUTH',
    heading: 'THE SOUTH',
    knowledgeTitle: 'The knowledge of the South',
    tagline: 'Peninsular Palm-Leaf Traditions',
    scriptTraditions: 'Grantha · Tamil · Malayalam · Kannada · Telugu',
    defaultState: 'tamil-nadu',
    states: [
      'tamil-nadu',
      'kerala',
      'karnataka',
      'andhra-pradesh',
      'telangana',
      'puducherry',
      'lakshadweep',
    ],
    description:
      'Peninsular traditions are defined by incised palm-leaf folios, preserving classical literature, medical treatises, astronomy, and temple archives.',
    story:
      'Peninsular traditions are defined by incised palm-leaf folios, preserving classical literature, medical treatises, astronomy, and temple archives through resilient regional scribal lineages.',
  },
  east: {
    id: 'east',
    index: '03',
    name: 'East',
    label: 'EAST',
    heading: 'THE EAST',
    knowledgeTitle: 'The knowledge of the East',
    tagline: 'Eastern Incised & Sanchi Traditions',
    scriptTraditions: 'Odia · Gaudi-Bengali · Assamese · Maithili',
    defaultState: 'odisha',
    states: [
      'odisha',
      'west-bengal',
      'bihar',
      'jharkhand',
      'assam',
      'sikkim',
      'arunachal-pradesh',
      'manipur',
      'meghalaya',
      'mizoram',
      'nagaland',
      'tripura',
      'andaman-and-nicobar',
    ],
    description:
      'Eastern India’s manuscript heritage encompasses circular stylus incisions on palm leaf and treated sanchi bark, carrying Buddhist sutras and regional epics.',
    story:
      'Eastern India’s manuscript heritage encompasses circular stylus incisions on palm leaf and treated sanchi bark, carrying Buddhist sutras, regional epics, and specialized scholarly treatises.',
  },
  west: {
    id: 'west',
    index: '04',
    name: 'West',
    label: 'WEST',
    heading: 'THE WEST',
    knowledgeTitle: 'The knowledge of the West',
    tagline: 'Arid Paper & Bhandara Traditions',
    scriptTraditions: 'Gujarati · Devanagari · Modi · Jain Nagari',
    defaultState: 'gujarat',
    states: [
      'gujarat',
      'maharashtra',
      'goa',
      'madhya-pradesh',
      'chhattisgarh',
      'dadra-and-nagar-haveli',
      'daman-and-diu',
    ],
    description:
      'Western manuscript traditions developed rich paper collections preserved in temple bhandaras, featuring illustrated folios and mercantile documentation.',
    story:
      'Western manuscript traditions developed rich paper manuscript collections preserved in temple bhandaras, featuring illustrated folios, mercantile documentation, and extensive philosophical archives.',
  },
};

export const ALL_REGIONS: RegionData[] = [
  REGIONS.north,
  REGIONS.south,
  REGIONS.east,
  REGIONS.west,
];

export function isValidRegion(id: unknown): id is RegionId {
  return typeof id === 'string' && (id === 'north' || id === 'south' || id === 'east' || id === 'west');
}

export function getRegionById(id: string | null | undefined): RegionData {
  if (isValidRegion(id)) {
    return REGIONS[id];
  }
  return REGIONS.east;
}

export function getRegionForState(stateKey: string): RegionData {
  const normalized = stateKey.toLowerCase().trim();
  for (const region of ALL_REGIONS) {
    if (region.states.includes(normalized)) {
      return region;
    }
  }
  return REGIONS.east;
}

export function isStateInRegion(stateKey: string, regionId: RegionId): boolean {
  const normalized = stateKey.toLowerCase().trim();
  return REGIONS[regionId]?.states.includes(normalized) ?? false;
}
