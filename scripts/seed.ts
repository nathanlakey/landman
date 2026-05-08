/**
 * Landman Seed Script
 * Run with: npx ts-node --project tsconfig.json scripts/seed.ts
 * Or: npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ──────────────────────────────────────────
// AGENTS
// ──────────────────────────────────────────
const agents = [
  {
    name: 'Dale Harmon',
    title: 'Founder & Principal Broker',
    email: 'dale@landman.com',
    phone: '(512) 555-0101',
    bio: 'Dale founded Landman after two decades operating cattle ranches across the Texas Hill Country. He has personally closed over $400 million in rural real estate transactions.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    states_served: ['TX'],
  },
  {
    name: 'Cassandra Webb',
    title: 'Senior Land Agent — Hill Country',
    email: 'cassandra@landman.com',
    phone: '(512) 555-0102',
    bio: 'Cassandra grew up on a working cattle ranch in Kerr County and has spent 15 years specializing in Hill Country ranch transactions. She holds a degree in Agricultural Economics from Texas A&M.',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    states_served: ['TX'],
  },
  {
    name: 'Marcus Delgado',
    title: 'Land Agent — South Texas',
    email: 'marcus@landman.com',
    phone: '(210) 555-0201',
    bio: 'Marcus specializes in South Texas hunting ranches and wildlife properties. He is a certified wildlife biologist and licensed real estate agent with a deep network across the brush country.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    states_served: ['TX'],
  },
  {
    name: 'Linda Forsythe',
    title: 'Land Agent — Panhandle & West Texas',
    email: 'linda@landman.com',
    phone: '(806) 555-0301',
    bio: 'Linda was raised on a wheat farm in the Texas Panhandle and has spent 12 years representing buyers and sellers of agricultural and ranch land across West and North Texas.',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    states_served: ['TX'],
  },
  {
    name: 'Travis Odom',
    title: 'Land Agent — East Texas & Piney Woods',
    email: 'travis@landman.com',
    phone: '(936) 555-0401',
    bio: 'Travis specializes in East Texas timber, recreational, and hunting properties. He is a licensed forester and has decades of experience in the Piney Woods region.',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    states_served: ['TX'],
  },
]

// ──────────────────────────────────────────
// LISTINGS (15 properties)
// ──────────────────────────────────────────
const listings = [
  {
    title: 'Spring Creek Ranch — Kerr County',
    slug: 'spring-creek-ranch-kerr-county',
    location_city: 'Kerrville',
    location_county: 'Kerr',
    acreage: 2400,
    price: 14500000,
    property_type: 'ranch',
    description: `Spring Creek Ranch is a landmark Hill Country property offering 2,400 acres of pristine Texas terrain. The ranch features three live water creeks, including over 1.5 miles of the legendary Guadalupe River frontage. The improved main compound includes a four-bedroom limestone lodge, foreman's quarters, equipment barns, and a historic stone smokehouse.\n\nThe land supports a substantial white-tailed deer herd managed under an MLD program, with significant trophy bucks documented each season. Turkey, dove, and axis deer are abundant throughout the property.\n\nThe ranch has been meticulously maintained by the current family ownership for over 40 years, with exceptional road infrastructure, cross-fencing, and water distribution.`,
    features: [
      '1.5 miles Guadalupe River frontage',
      '3 live water creeks',
      '4-bedroom limestone lodge',
      'MLD wildlife management program',
      'Trophy whitetail deer',
      'Axis deer and turkey',
      'Foreman quarters and barns',
      'Excellent road infrastructure',
      'Hunting blinds and feeders throughout',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      'https://images.unsplash.com/photo-1567448400815-dd30a1bb17e4?w=800&q=80',
    ],
  },
  {
    title: 'Brushy Hollow Hunting Ranch',
    slug: 'brushy-hollow-hunting-ranch',
    location_city: 'Uvalde',
    location_county: 'Uvalde',
    acreage: 1850,
    price: 7400000,
    property_type: 'hunting',
    description: `Brushy Hollow is an exceptional South Texas hunting ranch spanning 1,850 acres of classic Texas brush country. The property has been managed under a strict trophy program for 18 consecutive years, producing whitetail bucks scoring in excess of 200 B&C.\n\nThe ranch is completely high-fenced and features a comfortable 5-bedroom lodge with full kitchen and entertaining area, skeet range, and a network of sendero roads providing access throughout the property.\n\nWater is abundant with three water wells, a stock tank, and multiple watering stations. This is a turn-key trophy hunting operation ready for immediate enjoyment.`,
    features: [
      'High-fenced perimeter',
      '18-year trophy whitetail management',
      '200+ B&C bucks documented',
      '5-bedroom hunting lodge',
      'Skeet range',
      'Three water wells',
      'Multiple watering stations',
      'Improved sendero road network',
      'Turkey and quail habitat',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    ],
  },
  {
    title: 'Lone Star Farms — Hale County',
    slug: 'lone-star-farms-hale-county',
    location_city: 'Plainview',
    location_county: 'Hale',
    acreage: 3200,
    price: 9600000,
    property_type: 'farm',
    description: `Lone Star Farms offers a rare opportunity to acquire 3,200 contiguous acres of Panhandle farmland in one of Texas' most productive agricultural regions. The land is currently in cotton and grain sorghum production, with all farm equipment included in the sale.\n\nThe property is served by a Ogallala Aquifer irrigation system with 8 permitted wells and 6 center pivot irrigation systems. Soil quality is exceptional throughout, with NRCS reports available for review.\n\nAdditional improvements include a large equipment shop, two grain storage facilities with combined capacity of 80,000 bushels, and a comfortable 3-bedroom farm house.`,
    features: [
      '8 Ogallala Aquifer irrigation wells',
      '6 center pivot systems',
      'Cotton and grain sorghum production',
      'All farm equipment included',
      '80,000 bushel grain storage',
      'Equipment shop',
      '3-bedroom farm house',
      'Contiguous acreage',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    ],
  },
  {
    title: 'Pineywoods Whitetail Property',
    slug: 'pineywoods-whitetail-property',
    location_city: 'Lufkin',
    location_county: 'Angelina',
    acreage: 780,
    price: 2340000,
    property_type: 'recreational',
    description: `A stunning East Texas recreational property nestled deep in the Piney Woods. This 780-acre tract features mature mixed timber stands, a 12-acre private lake stocked with largemouth bass and catfish, and excellent whitetail deer and turkey habitat.\n\nThe property has 1.4 miles of frontage on Sandy Creek, providing excellent fishing and swimming. A 2-bedroom cabin with generator power and modern utilities serves as a comfortable base camp.\n\nThis is a rare opportunity to secure a private legacy recreational property in one of East Texas' most desirable corridors.`,
    features: [
      '12-acre private stocked lake',
      '1.4 miles Sandy Creek frontage',
      'Mature mixed timber stands',
      'Excellent whitetail and turkey habitat',
      '2-bedroom cabin with utilities',
      'Generator power system',
      'Private road access',
      'Minutes from Lufkin amenities',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ],
  },
  {
    title: 'Rio Grande Bottomland Ranch',
    slug: 'rio-grande-bottomland-ranch',
    location_city: 'Del Rio',
    location_county: 'Val Verde',
    acreage: 5600,
    price: 22400000,
    property_type: 'ranch',
    description: `One of the finest wildlife ranches remaining on the Rio Grande, this 5,600-acre property offers extraordinary diversity of habitat and an unmatched wildlife resource. The ranch straddles rugged canyon terrain and fertile bottomland, creating a diverse ecosystem that supports whitetail deer, mule deer, javelina, quail, dove, and abundant turkey.\n\nThe property features over 4 miles of Rio Grande frontage and three seasonal creeks. The headquarters compound includes a fully restored 6-bedroom hacienda, guest casitas, a covered outdoor kitchen, and a private airstrip.\n\nMineral rights are negotiable. This is a once-in-a-generation legacy land acquisition.`,
    features: [
      '4+ miles Rio Grande frontage',
      'Private airstrip (3,200 ft)',
      '6-bedroom hacienda headquarters',
      'Guest casitas',
      'Diverse wildlife: whitetail, mule deer, quail',
      'Canyon and bottomland terrain',
      'Seasonal creek system',
      'Covered outdoor kitchen and entertaining',
      'Mineral rights negotiable',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
  },
  {
    title: 'Blanco River Retreat',
    slug: 'blanco-river-retreat',
    location_city: 'Blanco',
    location_county: 'Blanco',
    acreage: 425,
    price: 5100000,
    property_type: 'recreational',
    description: `The Blanco River Retreat offers 425 acres of quintessential Hill Country beauty with over 3,000 feet of crystal-clear Blanco River frontage. The property is a naturalist's paradise, featuring native wildflower meadows, ancient live oak groves, and stunning limestone bluffs.\n\nThe property includes a beautifully restored 3-bedroom main house with a wraparound porch overlooking the river, a 1-bedroom guest cottage, and a private swimming hole. The spring-fed river provides year-round swimming and fishing for Guadalupe bass.`,
    features: [
      '3,000+ feet Blanco River frontage',
      'Year-round spring-fed river',
      '3-bedroom restored main house',
      '1-bedroom guest cottage',
      'Private swimming hole',
      'Native wildflower meadows',
      'Ancient live oak groves',
      'Limestone bluffs and canyon views',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1533574904762-b9e574e5e07d?w=800&q=80',
    ],
  },
  {
    title: 'Palo Pinto Cattle Ranch',
    slug: 'palo-pinto-cattle-ranch',
    location_city: 'Mineral Wells',
    location_county: 'Palo Pinto',
    acreage: 1600,
    price: 5600000,
    property_type: 'ranch',
    description: `A well-established North Texas cattle operation spanning 1,600 acres of rolling Cross Timbers terrain. The ranch has been actively run as a cow/calf operation with a carrying capacity of approximately 180 animal units. The property is fully fenced and cross-fenced into six pastures with water provided to each.\n\nFour stock tanks and two water wells serve the property. Improvements include a 3-bedroom ranch house, large covered working pens, hay barn, and a well-equipped equipment shop. The ranch is game-fenced on two sides and offers excellent whitetail hunting.`,
    features: [
      '180 AU carrying capacity',
      '6 cross-fenced pastures',
      '4 stock tanks',
      '2 water wells',
      '3-bedroom ranch house',
      'Covered working pens',
      'Hay barn and equipment shop',
      'Partial game fence',
      'Excellent whitetail habitat',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80',
    ],
  },
  {
    title: 'Rolling Plains Quail Ranch',
    slug: 'rolling-plains-quail-ranch',
    location_city: 'Childress',
    location_county: 'Childress',
    acreage: 4800,
    price: 8640000,
    property_type: 'hunting',
    description: `This 4,800-acre Rolling Plains property is one of the premier quail hunting ranches in Texas. Managed exclusively for wild bobwhite quail over the past decade, the ranch consistently produces exceptional hunting with wild bird populations that are increasingly rare in today's landscape.\n\nThe property features the classic Rolling Plains mixed grass prairie, native brush, and playa lake systems that define premier bobwhite habitat. Two comfortable hunting lodges accommodate up to 16 guests. Helicopter quail surveys are conducted annually.`,
    features: [
      'Wild bobwhite quail management',
      'Annual helicopter surveys',
      'Classic Rolling Plains habitat',
      'Two hunting lodges (16 guest capacity)',
      'Playa lake system',
      'Native brush and mixed grass prairie',
      'Dove and whitetail deer bonus',
      'Excellent road system throughout',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    ],
  },
  {
    title: 'Hill Country Legacy Ranch',
    slug: 'hill-country-legacy-ranch',
    location_city: 'Fredericksburg',
    location_county: 'Gillespie',
    acreage: 3100,
    price: 26350000,
    property_type: 'ranch',
    description: `Seldom does a property of this caliber become available in the Texas Hill Country. This 3,100-acre legacy ranch situated in the heart of Gillespie County is one of the most iconic properties in the region, having been held by the same family for over 80 years.\n\nThe ranch features 2.4 miles of Pedernales River frontage with towering limestone bluffs, abundant live oaks, and extraordinary wildlife. The property is fully game-fenced and supports exceptional white-tailed deer, turkey, axis deer, and blackbuck antelope.\n\nThe improvements are extraordinary: a 7,200 sq. ft. stone lodge designed by a renowned Texas architect, four guest cabins, a manager's residence, and extensive equestrian facilities including a covered arena.`,
    features: [
      '2.4 miles Pedernales River frontage',
      '7,200 sq. ft. stone lodge',
      'Architect-designed main house',
      '4 guest cabins',
      'Manager\'s residence',
      'Covered equestrian arena',
      'Fully game-fenced',
      'Axis deer and blackbuck antelope',
      'Held by same family for 80+ years',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=800&q=80',
    ],
  },
  {
    title: 'Guadalupe River Farm & Ranch',
    slug: 'guadalupe-river-farm-ranch',
    location_city: 'Seguin',
    location_county: 'Guadalupe',
    acreage: 890,
    price: 4450000,
    property_type: 'agricultural',
    description: `An exceptional combination property featuring 890 acres of productive farmland and recreational land along the Guadalupe River in Guadalupe County. The property is split between 400 acres of improved coastal Bermuda pasture, 200 acres of cropland, and 290 acres of native brush and river bottom.\n\nThe Guadalupe River provides over a mile of frontage with excellent fishing. Agricultural income from the hay and crop operations helps offset ownership costs. A recently renovated 4-bedroom farmhouse serves as the main residence.`,
    features: [
      '1+ mile Guadalupe River frontage',
      '400 acres coastal Bermuda pasture',
      '200 acres cropland',
      'Hay production income',
      '4-bedroom renovated farmhouse',
      'Excellent fishing access',
      'Native wildlife habitat',
      'Close to San Antonio and Austin',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
  },
  {
    title: 'Frio River Canyon Ranch — SOLD',
    slug: 'frio-river-canyon-ranch-sold',
    location_city: 'Leakey',
    location_county: 'Real',
    acreage: 1200,
    price: 8400000,
    property_type: 'ranch',
    description: `This remarkable Frio River Canyon Ranch offered 1,200 acres of breathtaking terrain in Real County, one of the most desirable counties in the Texas Hill Country. The property was acquired by a private family.`,
    features: ['Frio River frontage', 'Canyon terrain', 'Wildlife management', 'Hunting camp'],
    status: 'sold',
    images: [
      'https://images.unsplash.com/photo-1533574904762-b9e574e5e07d?w=800&q=80',
    ],
  },
  {
    title: 'Bee Creek Deer Ranch',
    slug: 'bee-creek-deer-ranch',
    location_city: 'Llano',
    location_county: 'Llano',
    acreage: 510,
    price: 2040000,
    property_type: 'hunting',
    description: `Bee Creek Deer Ranch offers 510 acres of Hill Country hunting land in coveted Llano County. The ranch features exceptional native brush, scattered live oaks, and a strong year-round creek. Wildlife is abundant with white-tailed deer, turkey, hogs, and dove.\n\nA comfortable 2-bedroom hunting cabin provides a base camp, with blinds and feeders in place. The property is low-fenced and has been managed on a quality deer management program for 10 years.`,
    features: [
      'Year-round Bee Creek',
      '10-year QDM program',
      'Abundant white-tailed deer',
      '2-bedroom hunting cabin',
      'Blinds and feeders included',
      'Turkey, hogs, and dove',
      'Coveted Llano County location',
    ],
    status: 'reduced',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ],
  },
  {
    title: 'Caprock Canyon Cattle Ranch',
    slug: 'caprock-canyon-cattle-ranch',
    location_city: 'Silverton',
    location_county: 'Briscoe',
    acreage: 8400,
    price: 16800000,
    property_type: 'ranch',
    description: `An iconic West Texas cattle ranch situated at the dramatic edge of the Caprock Escarpment in Briscoe County. The 8,400-acre property offers some of the most spectacular scenery in all of Texas, with breathtaking canyon views, red rock formations, and sweeping plains.\n\nThe ranch currently carries 250 head of cattle on improved and native pastures. Water is plentiful with 12 stock tanks and 6 windmills. The historic stone headquarters includes a restored 5-bedroom ranch house and multiple outbuildings dating to the 1880s.`,
    features: [
      '250 head cattle capacity',
      '12 stock tanks and 6 windmills',
      'Historic 1880s stone headquarters',
      '5-bedroom restored ranch house',
      'Caprock Escarpment canyon views',
      'Mule deer and pronghorn antelope',
      'Multiple outbuildings',
      'Contiguous deeded acreage',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    ],
  },
  {
    title: 'Lost Pines Recreational Tract',
    slug: 'lost-pines-recreational-tract',
    location_city: 'Bastrop',
    location_county: 'Bastrop',
    acreage: 165,
    price: 825000,
    property_type: 'recreational',
    description: `A rare opportunity to own a 165-acre recreational tract in the heart of the Lost Pines region of Bastrop County. The property is heavily wooded with the signature loblolly pines and native hardwoods that define this unique Texas ecosystem.\n\nThe land features a seasonal creek, abundant wildlife including deer and hogs, and exceptional privacy within 35 minutes of Austin. A small cabin shell is in place and ready for your personal vision.`,
    features: [
      'Lost Pines loblolly pine forest',
      'Seasonal creek',
      'Abundant wildlife',
      '35 minutes from Austin',
      'Cabin shell in place',
      'Exceptional privacy',
      'Native hardwood understory',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ],
  },
  {
    title: 'South Texas Sendero Ranch',
    slug: 'south-texas-sendero-ranch',
    location_city: 'Laredo',
    location_county: 'Webb',
    acreage: 2900,
    price: 8700000,
    property_type: 'hunting',
    description: `Deep in the South Texas brush country, this 2,900-acre sendero ranch represents the gold standard for Tamaulipan thornscrub wildlife management. The property is completely high-fenced and has been under strict trophy management for 15 years.\n\nThe ranch produces consistently exceptional whitetail deer, with genetics supporting bucks regularly exceeding 200 B&C. A complete and comfortable camp facility including a 4-bedroom lodge, walk-in cooler, skinning station, and ATV barn supports full hunting operations. The property is turn-key and ready for the next ownership.`,
    features: [
      'Complete high fence perimeter',
      '15-year trophy management program',
      '200+ B&C whitetail genetics',
      '4-bedroom lodge',
      'Walk-in cooler and skinning station',
      'ATV barn and equipment',
      'Turn-key hunting operation',
      'Classic South Texas sendero terrain',
    ],
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    ],
  },
]

// ──────────────────────────────────────────
// SEED FUNCTION
// ──────────────────────────────────────────
async function seed() {
  console.log('🌱 Seeding Landman database...\n')

  // Clear existing data
  console.log('Clearing existing data...')
  await supabase.from('inquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('listings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('agents').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Insert agents
  console.log('Inserting agents...')
  const { data: insertedAgents, error: agentError } = await supabase
    .from('agents')
    .insert(agents)
    .select()

  if (agentError) {
    console.error('Agent insert error:', agentError)
    process.exit(1)
  }
  console.log(`✓ Inserted ${insertedAgents!.length} agents`)

  // Map agent names to IDs
  const agentMap: Record<string, string> = {}
  insertedAgents!.forEach((a: { id: string; name: string }) => {
    agentMap[a.name] = a.id
  })

  // Assign agents to listings
  const listingsWithAgents = listings.map((l, i) => ({
    ...l,
    agent_id: insertedAgents![i % insertedAgents!.length].id,
  }))

  // Insert listings
  console.log('Inserting listings...')
  const { data: insertedListings, error: listingError } = await supabase
    .from('listings')
    .insert(listingsWithAgents)
    .select()

  if (listingError) {
    console.error('Listing insert error:', listingError)
    process.exit(1)
  }
  console.log(`✓ Inserted ${insertedListings!.length} listings`)

  console.log('\n🎉 Seed complete!')
  console.log(`   ${insertedAgents!.length} agents`)
  console.log(`   ${insertedListings!.length} listings`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
