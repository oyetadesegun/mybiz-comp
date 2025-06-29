import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Business categories and types for realistic data
const BUSINESS_CATEGORIES = [
  'Retail', 'Technology', 'Food & Beverage', 
  'Healthcare', 'Finance', 'Education',
  'Manufacturing', 'Real Estate', 'Professional Services',
  'Arts & Entertainment'
];

const BUSINESS_TYPES = [
  'Startup', 'Small Business', 'Medium Enterprise',
  'Large Corporation', 'Non-Profit', 'Freelancer'
];

const URGENCY_LEVELS = ['low', 'medium', 'high', 'critical'];

async function main() {
  // Clear existing data
//   await prisma.documentMetaData.deleteMany();
//   await prisma.response.deleteMany();
//   await prisma.getHelpQuestion.deleteMany();
//   await prisma.profile.deleteMany();
//   await prisma.user.deleteMany();

  console.log('Creating admin user...');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@consultancy.com',
      name: 'Alex Johnson',
      role: 'ADMIN',
      password: '$2b$10$EXAMPLEHASHEDPASSWORD',
    },
  });

  console.log('Creating staff users...');
  // Create 5 staff members with different specialties
  const staffUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'marketing.expert@consultancy.com',
        name: 'Sarah Williams',
        role: 'STAFF',
        password: '$2b$10$EXAMPLEHASHEDPASSWORD',
      },
    }),
    prisma.user.create({
      data: {
        email: 'finance.specialist@consultancy.com',
        name: 'Robert Chen',
        role: 'STAFF',
        password: '$2b$10$EXAMPLEHASHEDPASSWORD',
      },
    }),
    prisma.user.create({
      data: {
        email: 'tech.advisor@consultancy.com',
        name: 'David Miller',
        role: 'STAFF',
        password: '$2b$10$EXAMPLEHASHEDPASSWORD',
      },
    }),
    prisma.user.create({
      data: {
        email: 'operations@consultancy.com',
        name: 'Emily Rodriguez',
        role: 'STAFF',
        password: '$2b$10$EXAMPLEHASHEDPASSWORD',
      },
    }),
    prisma.user.create({
      data: {
        email: 'legal.consultant@consultancy.com',
        name: 'James Wilson',
        role: 'STAFF',
        password: '$2b$10$EXAMPLEHASHEDPASSWORD',
      },
    }),
  ]);

  console.log('Creating customer users...');
  // Create 10 customer users
  const customerUsers = await Promise.all(
    Array.from({ length: 10 }).map((_, i) => 
      prisma.user.create({
        data: {
          email: `customer${i+1}@business.com`,
          name: faker.person.fullName(),
          role: 'USER',
          password: '$2b$10$EXAMPLEHASHEDPASSWORD',
        },
      })
    )
  );

  console.log('Creating profiles...');
  // Create profiles for staff
  await Promise.all([
    prisma.profile.create({
      data: {
        bio: 'Digital marketing specialist with 8+ years experience helping businesses grow their online presence',
        user: { connect: { id: staffUsers[0].id } },
      },
    }),
    prisma.profile.create({
      data: {
        bio: 'Financial consultant specializing in business planning, funding, and investment strategies',
        user: { connect: { id: staffUsers[1].id } },
      },
    }),
    prisma.profile.create({
      data: {
        bio: 'Technology advisor helping businesses implement digital transformation solutions',
        user: { connect: { id: staffUsers[2].id } },
      },
    }),
    prisma.profile.create({
      data: {
        bio: 'Operations expert with experience in supply chain optimization and business process improvement',
        user: { connect: { id: staffUsers[3].id } },
      },
    }),
    prisma.profile.create({
      data: {
        bio: 'Legal consultant specializing in business compliance, contracts, and intellectual property',
        user: { connect: { id: staffUsers[4].id } },
      },
    }),
  ]);

  // Create profiles for customers
  const customerProfiles = await Promise.all(
    customerUsers.map(user => 
      prisma.profile.create({
        data: {
          bio: `Business owner seeking ${faker.commerce.department()} consulting services`,
          user: { connect: { id: user.id } },
        },
      })
    )
  );

  console.log('Creating help questions...');
  // Create 10 help questions with varying statuses and details
  const questions = await Promise.all([
    // Question 1 - Marketing help (in progress)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Need comprehensive digital marketing strategy',
        businessName: 'Urban Fashion Co.',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Our online sales have plateaued despite increased ad spend. Need help optimizing our marketing channels.',
        businessCategory: 'Retail',
        urgencyLevel: 'high',
        fullName: customerUsers[0].name!,
        emailAddress: customerUsers[0].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        websiteUrl: faker.internet.url(),
        instagramUrl: `https://instagram.com/${faker.lorem.word()}`,
        status: 'in_progress',
        profileId: customerProfiles![0].id,
        documents: {
          create: [
            {
              name: 'marketing_plan.pdf',
              size: '2.1MB',
              url: 'https://storage.example.com/marketing_plan.pdf',
            },
            {
              name: 'sales_data.xlsx',
              size: '1.8MB',
              url: 'https://storage.example.com/sales_data.xlsx',
            },
          ],
        },
      },
    }),

    // Question 2 - Financial planning (pending)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Financial projections for investor pitch',
        businessName: 'TechStart Solutions',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Preparing Series A funding round and need professional financial projections for our pitch deck.',
        businessCategory: 'Technology',
        urgencyLevel: 'medium',
        fullName: customerUsers[1].name!,
        emailAddress: customerUsers[1].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        websiteUrl: faker.internet.url(),
        status: 'pending',
        profileId: customerProfiles[1].id
    }}),

    // Question 3 - Legal consultation (resolved)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Contract review for vendor agreement',
        businessName: 'Global Imports LLC',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Need legal review of international supplier contract before signing. Concerned about liability clauses.',
        businessCategory: 'Manufacturing',
        urgencyLevel: 'medium',
        fullName: customerUsers[2].name!,
        emailAddress: customerUsers[2].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        status: 'resolved',
       profileId: customerProfiles[2].id,
        documents: {
          create: {
            name: 'vendor_contract.pdf',
            size: '3.2MB',
            url: 'https://storage.example.com/vendor_contract.pdf',
          },
        },
      },
    }),

    // Question 4 - Tech implementation (in progress)
    prisma.getHelpQuestion.create({
      data: {
        title: 'CRM system selection and implementation',
        businessName: 'HealthPlus Clinics',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Need help selecting and implementing a CRM system for our chain of medical clinics.',
        businessCategory: 'Healthcare',
        urgencyLevel: 'high',
        fullName: customerUsers[3].name!,
        emailAddress: customerUsers[3].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        status: 'in_progress',
       profileId: customerProfiles[3].id,
      },
    }),

    // Question 5 - Operations optimization (pending)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Warehouse efficiency improvement',
        businessName: 'QuickShip Logistics',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Our warehouse operations are inefficient leading to delayed shipments. Need process optimization.',
        businessCategory: 'Professional Services',
        urgencyLevel: 'critical',
        fullName: customerUsers[4].name!,
        emailAddress: customerUsers[4].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        status: 'pending',
       profileId: customerProfiles[4].id,
        documents: {
          create: [
            {
              name: 'warehouse_layout.pdf',
              size: '4.5MB',
              url: 'https://storage.example.com/warehouse_layout.pdf',
            },
            {
              name: 'process_flows.pdf',
              size: '2.7MB',
              url: 'https://storage.example.com/process_flows.pdf',
            },
          ],
        },
      },
    }),

    // Question 6 - Social media strategy (in progress)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Social media content strategy',
        businessName: 'Bella Beauty Salon',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Need help creating a content calendar and growth strategy for Instagram and TikTok',
        businessCategory: 'Professional Services',
        urgencyLevel: 'medium',
        fullName: customerUsers[5].name!,
        emailAddress: customerUsers[5].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        instagramUrl: `https://instagram.com/${faker.lorem.word()}`,
        twitterUrl: `https://twitter.com/@${faker.lorem.word()}`,
        status: Status.in_progress,
       profileId: customerProfiles[5].id,
    }}),

    // Question 7 - Legal structure advice (closed)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Choosing the right business structure',
        businessName: 'Green Earth Landscaping',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Starting a new landscaping business and unsure whether to form an LLC or corporation',
        businessCategory: 'Professional Services',
        urgencyLevel: 'low',
        fullName: customerUsers[6].name!,
        emailAddress: customerUsers[6].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'no',
        status: 'closed',
       profileId: customerProfiles[6].id 
      },
    }),

    // Question 8 - E-commerce setup (pending)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Setting up online store',
        businessName: 'Artisan Crafts Collective',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Need guidance on choosing between Shopify, WooCommerce, or custom solution for our handmade products',
        businessCategory: 'Arts & Entertainment',
        urgencyLevel: 'medium',
        fullName: customerUsers[7].name!,
        emailAddress: customerUsers[7].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        websiteUrl: faker.internet.url(),
        status: 'pending',
       profileId: customerProfiles[7].id
    }}),

    // Question 9 - HR policies (in progress)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Developing employee handbook',
        businessName: 'City Dental Group',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Need help creating comprehensive HR policies and employee handbook as we expand our practice',
        businessCategory: 'Healthcare',
        urgencyLevel: 'high',
        fullName: customerUsers[8].name!,
        emailAddress: customerUsers[8].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        status: 'in_progress',
       profileId: customerProfiles[8].id 
      },
    }),

    // Question 10 - International expansion (pending)
    prisma.getHelpQuestion.create({
      data: {
        title: 'Market entry strategy for European expansion',
        businessName: 'Taste of Home Foods',
        businessType: faker.helpers.arrayElement(BUSINESS_TYPES),
        businessChallenge: 'Planning to expand our specialty food products to Germany and France. Need market analysis and entry strategy.',
        businessCategory: 'Food & Beverage',
        urgencyLevel: 'high',
        fullName: customerUsers[9].name!,
        emailAddress: customerUsers[9].email,
        businessAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        willingToPay: 'yes',
        websiteUrl: faker.internet.url(),
        status: 'pending',
       profileId: customerProfiles[9].id
    }}),
  ]);

  console.log('Creating responses...');
  // Create multiple responses for questions
  await Promise.all([
    // Responses for Question 1 (Marketing help)
    prisma.response.create({
      data: {
        content: 'Thank you for reaching out about your marketing challenges. I\'ve reviewed your materials and notice several opportunities for improvement in your ad targeting and landing page optimization.',
        question: { connect: { id: questions[0].id } },
        staff: { connect: { id: staffUsers[0].id } },
        customer: { connect: { id: customerUsers[0].id } },
        responseType: 'CX',
      },
    }),
    prisma.response.create({
      data: {
        content: 'I recommend we start with a full audit of your current marketing channels. Based on your sales data, you might be overspending on underperforming platforms.',
        question: { connect: { id: questions[0].id } },
        staff: { connect: { id: staffUsers[0].id } },
        customer: { connect: { id: customerUsers[0].id } },
        responseType: 'AGENT',
      },
    }),

    // Responses for Question 3 (Legal consultation - resolved)
    prisma.response.create({
      data: {
        content: 'I\'ve reviewed the vendor contract and identified three key areas of concern in the liability section. I recommend the following specific changes to protect your business interests.',
        question: { connect: { id: questions[2].id } },
        staff: { connect: { id: staffUsers[4].id } },
        customer: { connect: { id: customerUsers[2].id } },
        responseType: 'ADMIN',
      },
    }),
    prisma.response.create({
      data: {
        content: 'Following up on my previous comments, I\'ve drafted alternative language for the problematic clauses. Please review the attached document with my suggested revisions.',
        question: { connect: { id: questions[2].id } },
        staff: { connect: { id: staffUsers[4].id } },
        customer: { connect: { id: customerUsers[2].id } },
        responseType: 'ADMIN',
      },
    }),

    // Response for Question 4 (Tech implementation)
    prisma.response.create({
      data: {
        content: 'For medical clinics, HIPAA compliance is crucial in CRM selection. I recommend we narrow down to these three options that specialize in healthcare: 1) ClinicTracker, 2) HealthCRM, and 3) PracticeFusion.',
        question: { connect: { id: questions[3].id } },
        staff: { connect: { id: staffUsers[2].id } },
        customer: { connect: { id: customerUsers[3].id } },
        responseType: 'AGENT',
      },
    }),

    // Response for Question 6 (Social media strategy)
    prisma.response.create({
      data: {
        content: 'Your beauty salon would benefit greatly from before/after content and client testimonials. Let\'s schedule a call to discuss your brand aesthetic and content pillars for the calendar.',
        question: { connect: { id: questions[5].id } },
        staff: { connect: { id: staffUsers[0].id } },
        customer: { connect: { id: customerUsers[5].id } },
        responseType: 'CX',
      },
    }),

    // Response for Question 9 (HR policies)
    prisma.response.create({
      data: {
        content: 'For dental practices, you\'ll need specific policies around OSHA compliance, HIPAA, and continuing education requirements. I\'ll prepare a template customized for healthcare providers.',
        question: { connect: { id: questions[8].id } },
        staff: { connect: { id: staffUsers[3].id } },
        customer: { connect: { id: customerUsers[8].id } },
        responseType: 'SERVICE_PROVIDER',
      },
    }),

    // Response for Question 10 (International expansion)
    prisma.response.create({
      data: {
        content: 'European food import regulations can be complex. Before developing your market entry strategy, we need to confirm your products meet all EU food safety standards and labeling requirements.',
        question: { connect: { id: questions[9].id } },
        staff: { connect: { id: staffUsers[3].id } },
        customer: { connect: { id: customerUsers[9].id } },
        responseType: 'AGENT',
      },
    }),
  ]);

  console.log('✅ Seed data created successfully!');
  console.log(`- ${customerUsers.length} customer users`);
  console.log(`- ${staffUsers.length} staff members`);
  console.log(`- ${questions.length} help questions`);
  console.log('Admin login: admin@consultancy.com');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });