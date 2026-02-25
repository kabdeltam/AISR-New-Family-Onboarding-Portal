
import type { PageContent, AdminUser } from '../types';

export const initialAdminUsers: AdminUser[] = [
  { id: '1', email: 'admin@aisr.org', passwordHash: 'password123' },
];

export const initialFooterImages: string[] = [
  'https://www.aisr.org/fs/resource-manager/view/ed11c643-1c9f-4e58-80f9-7bcb9a90ccf8',
  'https://www.aisr.org/fs/resource-manager/view/2fa3bcfc-0765-4a30-be48-26ac5263bd3e',
];

export const initialBackgroundImage: string = 'https://www.aisr.org/fs/resource-manager/view/7d01d316-fabd-4c14-a6e9-954ec5982917';
export const initialBackgroundOpacity: number = 0.1; // 10% opacity

export const initialPageData: Record<string, PageContent> = {
  // AIS-R (formerly Winter)
  'aisr-es': {
    id: 'aisr-es',
    title: 'Welcome to Elementary School',
    welcomeVideoUrl: 'https://www.aisr.org/fs/resource-manager/view/5af3ffe3-e787-4f9a-983d-3410f0705daf',
    topImageUrls: [
      'https://www.aisr.org/fs/resource-manager/view/d2865d7d-8adc-4571-85cb-4535d17a04bf',
      'https://www.aisr.org/fs/resource-manager/view/02780649-f882-4f4c-8379-edf9878bf2ca',
      'https://www.aisr.org/fs/resource-manager/view/5a138161-bf9c-4f3f-b9c2-b2505c8a4318'
    ],
    mainContent: `**Welcome to the Elementary School!** We are thrilled to have you join our community. Our team is dedicated to ensuring a smooth transition for your child into our classrooms and school culture. Explore the essentials below to get started.`,
    links: [],
    quickAccessCards: [
      {
        id: 'qa-calendar',
        title: 'School Calendar',
        variant: 'blue',
        linkUrl: 'https://www.aisr.org/about/calendar'
      },
      {
        id: 'qa-timings',
        title: 'School Timings',
        variant: 'yellow',
        description: '8:30 am to 3:30 pm Sundays through Thursday, until 2:30 pm on Tuesdays\nEarly years (Pre-K and KG1) finish at 1:15 pm daily'
      },
      {
        id: 'qa-handbook',
        title: 'ES Handbook',
        variant: 'blue',
        linkUrl: 'https://sites.google.com/aisr.org/es-handbook'
      }
    ],
    interactiveContent: [
      {
        id: 'lunch-services',
        title: 'Lunch Services',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Lunch Services',
          body: `*    Parents can order lunch for their children on a quarterly basis. Alternatively, children can choose to bring in packed lunch from home
*   To sign up for the food service, email the ES office at esoffice@aisr.org
*   You will be invoiced quarterly for the service by the Finance Office`,
          links: [
            { title: 'View the Lunch Menu', url: 'https://drive.google.com/file/d/1FDkdCrnDwCG7RbFJJos2dq_nEEBfjjnb/preview' }
          ],
        }
      },
      {
        id: 'parent-id',
        title: 'Parent ID Cards & Campus Entry',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Parent ID Cards & Campus Entry',
          body: `For the safety and security of our students and staff, all parents are required to have an AIS-R issued ID card to enter the campus. ID cards must be worn and visible at all times while on campus.

*   Parent ID cards are issued during orientation on the student's first day of school
*   As parents, you can scan your ID cards at the gate to enter the campus
*   You can credit your AIS-R cards at the Finance Office through cash or credit card payments, or through a wire transfer (must share proof of payment with finance@aisr.org)`,
          imageUrl: '',
        }
      },
      {
        id: 'lost-id',
        title: 'Replacing Lost ID Cards',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Replacing Lost ID Cards',
          body: `*   To replace a lost card, you must request a new one for a fee of 115 SAR
*   Payments can be settled at the Finance Office by cash or credit card payments, or through wire transfer (must share proof of payment with finance@aisr.org)
*   The receipt must then be taken to the ARC
*   New ID cards can be collected from the ARC either on the same day or on the following day`,
        }
      },
      {
        id: 'nanny-driver-id',
        title: 'Nanny/Driver Registration',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Nanny/Driver Registration',
          body: `*   Parents can add nannies/drivers through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form
*   Before hitting “Submit” at the bottom of the form, make sure to select all siblings so that changes are applied to the whole family
*   Drivers and nannies can have their photos taken at the gate 24–48 hours after the form is submitted
*   Note: Nannies and drivers are not able to add money to their ID cards`,
          links: [],
        }
      },
      {
        id: 'update-family-information-id',
        title: 'Updating Family and Contact Information',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Updating Family and Contact Information',
          body: `*   To better support families and to ensure seamless communication between school and home, parents should keep contact information up-to-date on our Student Information System
*   Parents can update information such as local phone numbers, student iqama number/Saudi National ID, transportation method, address and so on
*   Parents can update information directly through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form`,
          links: [],
        }
      },
      {
        id: 'school-supplies',
        title: 'School Supplies',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'School Supplies',
          body: `*   ES school supplies are provided by the school and are invoiced through the Finance Office
*   All school spirit merchandise is available for purchase at the Eagle’s Nest`,
          links: [
            { title: 'Elementary School Letter on School Supplies', url: 'https://docs.google.com/document/d/1blN8sh2tkhsJ23Vp-TxECy3uW9vo0VNNEc4LcaOf8-I/edit?usp=sharing' }
          ],
        }
      },
      {
        id: 'pe-uniforms',
        title: 'PE Uniforms',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'PE Uniforms',
          body: `*   Help us set our students up for success by making sure they are prepared for their PE classes, proudly showing their Eagle spirit
*   ES students (Pre-K to Grade 5) must wear the full PE uniform with both tops and bottoms to ensure they are comfortable, safe, and ready to participate in all activities
*   Uniforms can either be ordered online and delivered directly to your home, or can be purchased from ZAKS store at Atyaf Mall, 1st Floor (shops #27-29)
*   Try out samples at our school’s Eagles Nest`,
          links: [
            { title: 'ZAKS Website', url: 'https://www.zaksstore.com/shop/aisr/en/' },
            { title: 'View the Catalogue', url: 'https://drive.google.com/file/d/1C5aR9eA-wI3P-S7Vst1FlmjU6bIHSGvv/preview' }
          ],
        }
      },
      {
        id: 'tech-reqs',
        title: 'Technology Requirements',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'Technology Requirements',
          body: `Students in Grades 4 and 5 are required to bring their own Apple Macbooks. The following model below is the minimum suitable device for our BYOD Program:
*   MacBook Air 13”
*   Memory: 8GB
*   Storage Capacity: 256GB
*   Minimum processor: Apple M2/M3 chip
We strongly encourage you to purchase a protective case for the computer for ease of transportation as well as protection of a very expensive asset`,
          links: [{ title: 'Technology Update Letter', url: '#' }],
        }
      },
      {
        id: 'ascas',
        title: 'After School Activities (ASA) & Athletics Program',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'After School Activities (ASA) & Athletics Program',
          body: `*   Information about after school activities will be shared directly with families via email once every quarter. These updates will include details on the available offerings and instructions on how to sign up
*   To sign up for an after school activity, email the ES office at esoffice@aisr.org           
*   For more details about tryouts or the available sports programs, please reach out to Joelle Mikhael, ES Physical Education & Health Teacher (joemikhael@aisr.org)`,
          links: [
            { title: 'After School Activities', url: 'https://drive.google.com/file/d/1tMgB7G5bZn_s2b2wASQYOiFgGSYiYput/preview' },
            { title: 'Overview of the AIS-R Sports Program', url: 'https://drive.google.com/file/d/1HnnN8RURhkL9YpYwvgH2_ITcfLs27nmQ/preview' }
          ],
        }
      },
      {
        id: 'dismissal',
        title: 'End of Day Dismissal',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'End of Day Dismissal',
          body: `*    Teachers collect and escort ES students to their designated gate, bus, or after-school activity
*    Parents must indicate the student’s preferred method of transportation to school through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*    After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form for each child 
*    To accommodate playdates, any changes to the end of day transport arrangements need to be communicated to both the homeroom teacher and the ES office by 4:30 pm on the previous day`,
        }
      },
      {
        id: 'events',
        title: 'Events at AIS-R',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Events at AIS-R',
          body: `*   AIS-R sends a weekly newsletter called Eagle Central every Sunday at 4:00 PM to all parent AIS-R emails
*   You can also access Eagle Central through the AIS-R App
*   You are encouraged to download and regularly check the app throughout the year, as event dates may change due to local regulations and holidays`,
          links: [
            { title: 'AIS-R App on the Android Play Store', url: 'https://play.google.com/store/apps/details?id=com.finalsite.aisriyadh&hl=en' },
            { title: 'AIS-R App on the Apple App Store', url: 'https://apps.apple.com/be/app/ais-riyadh/id1623242259' }
          ],
        }
      },
      {
        id: 'islamic-studies',
        title: 'Islamic Studies',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Islamic Studies',
          body: `Islamic Studies is a mandatory subject for all Saudi national students, as required by the Ministry of Education.`,
          links: [
            { title: 'View the Islamic Studies Class Letter', url: 'https://docs.google.com/document/d/e/2PACX-1vSs56TfxtaLgY_FX4JnmOMMK-mHPy50CkZjYezVZsRWtRVNfRqgKkIMp3diKvc1HNkfKmkrJgx-N8HP/pub' }
          ],
        }
      },
    ],
  },
  'aisr-es-counselor': {
    id: 'aisr-es-counselor',
    title: 'ES Counselor\'s Corner',
    welcomeVideoUrl: '',
    mainContent: `Hello and a warm welcome from the Elementary School Counseling department!
    
    My role is to support the social and emotional well-being of all our students. I work with students, parents, and teachers to help children navigate the challenges of growing up.
    
    Please feel free to reach out if you have any questions or concerns about your child's transition to AIS-R. We are here to help!`,
    links: [
      { title: 'Parent Resources', url: '#' },
      { title: 'Schedule a Meeting', url: '#' },
    ],
  },
  'aisr-ms': {
    id: 'aisr-ms',
    title: 'Welcome to Middle School',
    welcomeVideoUrl: 'https://www.aisr.org/fs/resource-manager/view/9b97a1f2-cf82-469b-81d1-7a8e9f330b63',
//    topImageUrls: [
//      'https://www.aisr.org/fs/resource-manager/view/c206889a-20db-41ee-bf9f-431fb44db17f'
//    ],
    mainContent: `**Welcome to Middle School!** We are happy to have you join our community! Our dedicated faculty is here to support your child’s growth and ensure they feel confident and connected as they settle into their new schedules. Explore the essentials below to get started.`,
    links: [],
    quickAccessCards: [
      {
        id: 'qa-calendar',
        title: 'School Calendar',
        variant: 'blue',
        linkUrl: 'https://www.aisr.org/about/calendar'
      },
      {
        id: 'qa-timings',
        title: 'School Timings',
        variant: 'yellow',
        description: '8:30 am to 3:30 pm Sundays through Thursday, until 2:30 pm on Tuesdays'
      },
      {
        id: 'qa-handbook',
        title: 'MS Handbook',
        variant: 'blue',
        linkUrl: 'https://sites.google.com/aisr.org/ms-handbook'
      }
    ],
    interactiveContent: [
      {
        id: 'lunch-services',
        title: 'Lunch Services',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Lunch Services',
          body: `**A Cashless Campus**
*   AIS-R operates a cashless lunch system; students use their school ID cards to purchase meals from the dining hall or can choose to bring in their own lunch from home.
*   All middle school students are issued AIS-R ID cards during orientation
*   Parents and students can credit their cards at the Finance Office through cash or credit card payments, or through a wire transfer (make sure to share proof of payment with finance@aisr.org) 
*   The minimum top-up amount is 200 SAR 
*   There is no ATM on the AIS-R campus

**Checking Balances and Transaction History**
*    As parents, you can log in to your Odoo account for a detailed view of your child(ren)s balance and purchase history`,
          links: [
            { title: 'Logging in to your Odoo Account', url: 'https://aisr.odoo.com/' },
            { title: 'Helpful Tutorial on How to Login', url: 'https://youtu.be/PSkv06g7EBo' }
          ],
        }
      },
      {
        id: 'parent-id',
        title: 'Parent ID Cards & Campus Entry',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Parent ID Cards & Campus Entry',
          body: `For the safety and security of our students and staff, all parents are required to have an AIS-R issued ID card to enter the campus. ID cards must be worn and visible at all times while on campus.
*   Parent ID cards are issued during orientation on the student's first day of school
*   As parents, you can scan your ID cards at the gate to enter the campus
*   You can credit your AIS-R cards at the Finance Office through cash or credit card payments, or through a wire transfer (must share proof of payment with finance@aisr.org)`,
          imageUrl: '',
        }
      },
      {
        id: 'lost-id',
        title: 'Replacing Lost ID Cards',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Replacing Lost ID Cards',
          body: `*   To replace a lost card, you must request a new one for a fee of 115 SAR
*   Payments can be settled at the Finance Office by cash or credit card payments, or through wire transfer (must share proof of payment with finance@aisr.org)
*   The receipt must then be taken to the ARC
*   New ID cards can be collected from the ARC either on the same day or on the following day`,
        }
      },
      {
        id: 'nanny-driver-id',
        title: 'Nanny/Driver Registration',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Nanny/Driver Registration',
          body: `*   Parents can add nannies/drivers through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form
*   Before hitting “Submit” at the bottom of the form, make sure to select all siblings so that changes are applied to the whole family
*   Drivers and nannies can have their photos taken at the gate 24–48 hours after the form is submitted
*   Note: Nannies and drivers are not able to add money to their ID cards`,
          links: [],
        }
      },
      {
        id: 'update-family-information-id',
        title: 'Updating Family and Contact Information',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Updating Family and Contact Information',
          body: `*   To better support families and to ensure seamless communication between school and home, parents should keep contact information up-to-date on our Student Information System
*   Parents can update information such as local phone numbers, student iqama number/Saudi National ID,, transportation method, address and so on
*   Parents can update information directly through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form`,
          links: [],
        }
      },
      {
        id: 'school-supplies',
        title: 'School Supplies',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'School Supplies',
          body: `*   We recommend that students purchase their supplies before the first day of school. Doing so will ensure that they are well prepared for the first day of school
*   Middle School supply lists can be purchased locally by families
*   To purchase school supplies locally, [Jarir Bookstore](http://www.jarir.com/sa-en/school-supplies.html) is ready to help our families in gathering supplies. Upon arrival at any Jarir Bookstore, please provide your supply list to a store manager who will help you locate each item. If you like, they will prepare your school supplies while you browse the bookstore or enjoy a beverage at a neighboring cafe! There are [18 locations](https://www.jarir.com/kw-en/store-locator) in Riyadh.
*   All school spirit merchandise is available for purchase at the Eagle’s Nest`,
          links: [
            { title: 'View Middle School Supply List', url: 'https://www.aisr.org/learning/middle-school/supply-lists' },
            { title: 'Jarir Bookstore Locations', url: 'https://www.jarir.com/kw-en/store-locator' }
          ],
        }
      },
      {
        id: 'pe-uniforms',
        title: 'PE Uniforms',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'PE Uniforms',
          body: `*   Help us set our students up for success by making sure they are prepared for their PE classes, proudly showing their Eagle spirit!
*   MS students are only required to wear the PE shirts, giving them more flexibility while still maintaining consistency and representing pride during PE 
*   Uniforms can either be ordered online and delivered directly to your home, or can be purchased from ZAKS store at Atyaf Mall, 1st Floor (shops #27-29)
*   Try out samples at our school’s Eagles Nest`,
          links: [
            { title: 'ZAKS Website', url: 'https://www.zaksstore.com/shop/aisr/en/' },
            { title: 'View the Catalogue', url: 'https://drive.google.com/file/d/1C5aR9eA-wI3P-S7Vst1FlmjU6bIHSGvv/preview' }
          ],
        }
      },
      {
        id: 'tech-reqs',
        title: 'Technology Requirements',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'Technology Requirements',
          body: `Middle school students are required to bring their own Apple Macbooks
The following model below is the minimum suitable device for our BYOD Program:
*   MacBook Air 13”
*   Memory: 8GB
*   Storage Capacity: 256GB
*   Minimum processor: Apple M2/M3 chip
We strongly encourage you to purchase a protective case for the computer for ease of transportation as well as protection of a very expensive asset`,
          links: [{ title: 'Technology Update Letter', url: '#' }],
        }
      },
      {
        id: 'ascas',
        title: 'After School Activities (ASA) & Athletics Program',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'After School Activities (ASA) & Athletics Program',
          body: `*   Information about after school activities will be shared directly with families via email once every quarter. These updates will include details on the available offerings and instructions on how to sign up
*   To sign up for an after school activity, email the MS office at msoffice@aisr.org           
*   For more details about tryouts or the available sports programs, please reach out to David Johnson, AIS-R Athletics Director (djohnson@aisr.org)`,
          links: [
            { title: 'After School Activities', url: 'https://drive.google.com/file/d/1R5jyDdUjT9XBgSvPx3Hr6Hvr_09ChAKM/preview' },
            { title: 'Overview of the AIS-R Sports Program', url: 'https://drive.google.com/file/d/1HnnN8RURhkL9YpYwvgH2_ITcfLs27nmQ/preview' }
          ],
        }
      },
      {
        id: 'dismissal',
        title: 'End of Day Dismissal',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'End of Day Dismissal',
          body: `*   Students make their own way to their designated gate, bus, or activity
*    Parents must indicate the student’s preferred method of transportation to school through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*    After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form for each child`,
        }
      },
      {
        id: 'events',
        title: 'Events at AIS-R',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Events at AIS-R',
          body: `*   AIS-R sends a weekly newsletter called Eagle Central every Sunday at 4:00 PM to all parent AIS-R emails
*   You can also access Eagle Central through the AIS-R App
*   You are encouraged to download and regularly check the app throughout the year, as event dates may change due to local regulations and holidays`,
          links: [
            { title: 'AIS-R App on the Android Play Store', url: 'https://play.google.com/store/apps/details?id=com.finalsite.aisriyadh&hl=en' },
            { title: 'AIS-R App on the Apple App Store', url: 'https://apps.apple.com/be/app/ais-riyadh/id1623242259' }
          ],
        }
      },
      {
        id: 'islamic-studies',
        title: 'Islamic Studies',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Islamic Studies',
          body: `Islamic Studies is a mandatory subject for all Saudi national students, as required by the Ministry of Education.`,
          links: [
            { title: 'View the Islamic Studies Class Letter', url: 'https://docs.google.com/document/d/e/2PACX-1vSs56TfxtaLgY_FX4JnmOMMK-mHPy50CkZjYezVZsRWtRVNfRqgKkIMp3diKvc1HNkfKmkrJgx-N8HP/pub' }
          ],
        }
      },
      {
        id: 'electives',
        title: 'Electives Program',
        category: 'Course Offerings',
        modalContent: {
            title: 'Electives Program',
            body: `The Middle School offers a comprehensive electives program that enables students to explore their interests and develop new skills. Through this program, students can engage in a variety of subjects, including Arts, Technology, and World Languages.`,
            links: [
                { title: 'View Elective Offerings 2025-2026', url: 'https://docs.google.com/presentation/d/1OGmTYTtzRsFNbFZ2th-O-F8QW7n00hSys7s0djNMTrs/preview' }
            ]
        }
      },
    ],
  },
  'aisr-ms-counselor': {
    id: 'aisr-ms-counselor',
    title: 'MS Counselor\'s Corner',
    welcomeVideoUrl: '',
    mainContent: `Greetings and welcome to our new students and families! The Middle School Counseling Office provides targeted support for students transitioning mid-year.`,
    links: [
      { title: 'MS Counseling Program Overview', url: '#' },
    ],
  },
  'aisr-hs': {
    id: 'aisr-hs',
    title: 'Welcome to High School',
    welcomeVideoUrl: 'https://www.aisr.org/fs/resource-manager/view/c2c82a37-d270-4ae3-be75-238d2cc857e2',
    topImageUrls: [
      'https://www.aisr.org/fs/resource-manager/view/a3b119ec-aaaa-44d5-8215-2ac3873b8768',
      'https://www.aisr.org/fs/resource-manager/view/66cf1f3d-3e02-43cd-9daa-428de0f87402',
      'https://www.aisr.org/fs/resource-manager/view/aa8f283d-bd35-4dbf-bec8-e3c3fcc86ebc'
    ],
    mainContent: `**Welcome to the High School!** We are proud to have you join the AIS-R community. We are committed to ensuring a smooth and successful transition for your student as they engage with our curriculum and culture. Explore the essentials below to get started.

**Placements:** High school students are required to meet with the HS Counselor in order to prepare and review their course schedule prior to their first day of school. The HS Counseling Office will reach out to you to schedule an appointment. Please note that Math placement and World Languages are subject to the results of a placement test taken in the counseling center.
`,
    links: [],
    quickAccessCards: [
      {
        id: 'qa-calendar',
        title: 'School Calendar',
        variant: 'blue',
        linkUrl: 'https://www.aisr.org/about/calendar'
      },
      {
        id: 'qa-timings',
        title: 'School Timings',
        variant: 'yellow',
        description: '8:30 am to 3:30 pm Sundays through Thursday, until 2:30 pm on Tuesdays'
      },
      {
        id: 'qa-handbook',
        title: 'HS Handbook',
        variant: 'blue',
        linkUrl: 'https://sites.google.com/aisr.org/hs-handbook'
      }
    ],
    interactiveContent: [
      {
        id: 'lunch-services',
        title: 'Lunch Services',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Lunch Services',
          body: `**A Cashless Campus**
*   AIS-R operates a cashless lunch system; students use their school ID cards to purchase meals from the dining hall or can choose to bring in their own lunch from home.
*   All middle school students are issued AIS-R ID cards during orientation
*   Parents and students can credit their cards at the Finance Office through cash or credit card payments, or through a wire transfer (make sure to share proof of payment with finance@aisr.org) 
*   The minimum top-up amount is 200 SAR 
*   There is no ATM on the AIS-R campus

**Checking Balances and Transaction History**
*    As parents, you can log in to your Odoo account for a detailed view of your child(ren)s balance and purchase history`,
          links: [
            { title: 'Logging in to your Odoo Account', url: 'https://aisr.odoo.com/' },
            { title: 'Helpful Tutorial on How to Login', url: 'https://youtu.be/PSkv06g7EBo' }
          ],
        }
      },
      {
        id: 'parent-id',
        title: 'Parent ID Cards & Campus Entry',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Parent ID Cards & Campus Entry',
          body: `For the safety and security of our students and staff, all parents are required to have an AIS-R issued ID card to enter the campus. ID cards must be worn and visible at all times while on campus.

*   Parent ID cards are issued during orientation on the student's first day of school
*   As parents, you can scan your ID cards at the gate to enter the campus
*   You can credit your AIS-R cards at the Finance Office through cash or credit card payments, or through a wire transfer (must share proof of payment with finance@aisr.org)`,
          imageUrl: '',
        }
      },
      {
        id: 'lost-id',
        title: 'Replacing Lost ID Cards',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Replacing Lost ID Cards',
          body: `*   To replace a lost card, you must request a new one for a fee of 115 SAR
*   Payments can be settled at the Finance Office by cash or credit card payments, or through wire transfer (must share proof of payment with finance@aisr.org)
*   The receipt must then be taken to the ARC
*   New ID cards can be collected from the ARC either on the same day or on the following day`,
        }
      },
      {
        id: 'nanny-driver-id',
        title: 'Nanny/Driver Registration',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Nanny/Driver Registration',
          body: `*   Parents can add nannies/drivers through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form
*   Before hitting “Submit” at the bottom of the form, make sure to select all siblings so that changes are applied to the whole family
*   Drivers and nannies can have their photos taken at the gate 24–48 hours after the form is submitted
*   Note: Nannies and drivers are not able to add money to their ID cards`,
          links: [],
        }
      },
      {
        id: 'update-family-information-id',
        title: 'Updating Family and Contact Information',
        category: 'AIS-R ID Cards and Lunch Services',
        modalContent: {
          title: 'Updating Family and Contact Information',
          body: `*   To better support families and to ensure seamless communication between school and home, parents should keep contact information up-to-date on our Student Information System
*   Parents can update information such as local phone numbers, student iqama number/Saudi National ID,, transportation method, address and so on
*   Parents can update information directly through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*   After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form`,
          links: [],
        }
      },
      {
        id: 'school-supplies',
        title: 'School Supplies',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'School Supplies',
          body: `*   We recommend that students purchase their supplies before the first day of school. Doing so will ensure that they are well prepared for the first day of school
*   High School supply lists can be purchased locally by families
*   To purchase school supplies locally, [Jarir Bookstore](http://www.jarir.com/sa-en/school-supplies.html) is ready to help our families in gathering supplies. Upon arrival at any Jarir Bookstore, please provide your supply list to a store manager who will help you locate each item. If you like, they will prepare your school supplies while you browse the bookstore or enjoy a beverage at a neighboring cafe! There are [18 locations](https://www.jarir.com/kw-en/store-locator) in Riyadh.
*   All school spirit merchandise is available for purchase at the Eagle’s Nest`,
          links: [
            { title: 'View High School Supply List', url: 'https://www.aisr.org/learning/high-school/supply-lists' },
            { title: 'Jarir Bookstore Locations', url: 'https://www.jarir.com/kw-en/store-locator' }
          ],
        }
      },
      {
        id: 'pe-uniforms',
        title: 'PE Uniforms',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'PE Uniforms',
          body: `*   Help us set our students up for success by making sure they are prepared for their PE classes, proudly showing their Eagle spirit!
*   HS students are only required to wear the PE shirts, giving them more flexibility while still maintaining consistency and representing pride during PE 
*   Uniforms can either be ordered online and delivered directly to your home, or can be purchased from ZAKS store at Atyaf Mall, 1st Floor (shops #27-29)
*   Try out samples at our school’s Eagles Nest`,
          links: [
            { title: 'ZAKS Website', url: 'https://www.zaksstore.com/shop/aisr/en/' },
            { title: 'View the Catalogue', url: 'https://drive.google.com/file/d/1C5aR9eA-wI3P-S7Vst1FlmjU6bIHSGvv/preview' }
          ],
        }
      },
      {
        id: 'tech-reqs',
        title: 'Technology Requirements',
        category: 'Supplies and Uniforms',
        modalContent: {
          title: 'Technology Requirements',
          body: `High school students are required to bring their own Apple Macbooks
The following model below is the minimum suitable device for our BYOD Program:
*   MacBook Air 13”
*   Memory: 8GB
*   Storage Capacity: 256GB
*   Minimum processor: Apple M2/M3 chip
We strongly encourage you to purchase a protective case for the computer for ease of transportation as well as protection of a very expensive asset`,
          links: [{ title: 'Technology Update Letter', url: '#' }],
        }
      },
      {
        id: 'ascas',
        title: 'After School Activities (ASA) & Athletics Program',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'After School Activities (ASA) & Athletics Program',
          body: `*   Information about after-school activities will be shared directly with families via email once every quarter. These updates will include details on the available offerings and instructions on how to sign up 
*   To sign up for an after school activity, email the HS office at hsoffice@aisr.org
*   For more details about tryouts or the available sports programs, please reach out to David Johnson, AIS-R Athletics Director (djohnson@aisr.org)`,
          links: [
            { title: 'After School Activities', url: 'https://drive.google.com/file/d/10wSVFVr3VLngoH8MFywobkJg-wAE9_oA/preview' },
            { title: 'Overview of the AIS-R Sports Program', url: 'https://drive.google.com/file/d/1HnnN8RURhkL9YpYwvgH2_ITcfLs27nmQ/preview' }
          ],
        }
      },
      {
        id: 'dismissal',
        title: 'End of Day Dismissal',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'End of Day Dismissal',
          body: `*   Students make their own way to their designated gate, bus, or activity
*    Parents must indicate the student’s preferred method of transportation to school through the **PowerSchool Parent Portal** (*Note that you will only be able to access PowerSchool after the orientation. If you need assistance logging in, please contact the IT Office or send an email to tech_support@aisr.org*)
*    After logging in to PowerSchool, select “Forms” in the left navigation bar, then select and complete the “Student and Family Information Update” form for each child`,
        }
      },
      {
        id: 'events',
        title: 'Events at AIS-R',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Events at AIS-R',
          body: `*   AIS-R sends a weekly newsletter called Eagle Central every Sunday at 4:00 PM to all parent AIS-R emails
*   You can also access Eagle Central through the AIS-R App
*   You are encouraged to download and regularly check the app throughout the year, as event dates may change due to local regulations and holidays`,
          links: [
            { title: 'AIS-R App on the Android Play Store', url: 'https://play.google.com/store/apps/details?id=com.finalsite.aisriyadh&hl=en' },
            { title: 'AIS-R App on the Apple App Store', url: 'https://apps.apple.com/be/app/ais-riyadh/id1623242259' }
          ],
        }
      },
      {
        id: 'islamic-studies',
        title: 'Islamic Studies',
        category: 'Events, Activities, and Extra Offerings',
        modalContent: {
          title: 'Islamic Studies',
          body: `Islamic Studies is a mandatory subject for all Saudi national students, as required by the Ministry of Education.`,
          links: [
            { title: 'View the Islamic Studies Class Letter', url: 'https://docs.google.com/document/d/e/2PACX-1vSs56TfxtaLgY_FX4JnmOMMK-mHPy50CkZjYezVZsRWtRVNfRqgKkIMp3diKvc1HNkfKmkrJgx-N8HP/pub' }
          ],
        }
      },
    ],
  },
   'aisr-hs-counselor': {
    id: 'aisr-hs-counselor',
    title: 'HS Counselor\'s Corner',
    welcomeVideoUrl: '',
    mainContent: `The High School Counseling team is here to guide students through their academic journey and the college application process. We offer personalized support for course selection, career exploration, and university planning.
    
    Working closely with students across all grade levels, we help them: 
*   Choose appropriate courses and programs
*   Develop the skills and knowledge required to pursue their future educational and career goals 
*   Grow academically, socially, and personally at AIS-R`,
    links: [
      { title: 'HS Counseling Center Website', url: 'https://www.aisr.org/learning/high-school/counseling' },
      { title: 'College Counseling Handbook', url: 'https://www.aisr.org/learning/high-school/counseling/college-counseling' },
      { title: 'Meet the Team', url: '' }
    ],
  },
  // Standalone pages
  'ptso': {
    id: 'ptso',
    title: 'Parent Teacher Student Organization (PTSO)',
    welcomeVideoUrl: '',
    mainContent: `The PTSO is a vibrant organization that brings parents, teachers, and students together to build a strong school community. We are here to help you connect, celebrate, and get settled.

## What We Do?
At the PTSO, we are dedicated to connecting home and school. We organize events, support school initiatives, and provide a network for families. We encourage all parents to get involved! Our work involves the following:
*   **Celebrate Diversity:** We organize major events like the signature InterCultural Festival.
*   **Build Connections:** Join us for Parent Coffee Mornings to meet other families in a relaxed setting.
*   **Create Memories:** Bring the kids along for our Family Fun Days and community gatherings.
We encourage all parents to get involved - big or small, your contribution matters!`,
    links: [
      { 
        title: 'Meet the Team', 
        url: '#',
        modalContent: {
            title: 'Meet the PTSO Team',
            body: '',
            embedUrl: 'https://drive.google.com/file/d/18304iAMOYY1_cQSlbW0djEmunr9oOWn3/preview',
            links: []
        }
      },
      { 
        title: 'Join the PTSO', 
        url: '#',
        modalContent: {
            title: 'Join the PTSO',
            body: 'Great news! If you are a parent or guardian of an AIS-R student, you can easily become a member of the PTSO. Just scan the QR code to join.\n\nWe encourage you to:\n*   Attend our monthly meetings\n*   Volunteer for events\n*   Share your ideas and feedback',
            embedUrl: 'https://drive.google.com/file/d/147msdAXrdSic3LZTHkb7X41k3N2lJiQ3/preview',
            links: []
        }
      },
    ],
  },
  'booster-club': {
    id: 'booster-club',
    title: 'Booster Club',
    welcomeVideoUrl: '',
    mainContent: `Go Eagles! The Booster Club is the heartbeat of school spirit at AIS-R. We are a volunteer organization dedicated to fueling our student-athletes and activities programs across all divisions. May all Eagle athletes soar to their greatest potential!

## Booster Club Mission
To support and promote the athletic and activities programs of any division of the American International School-Riyadh

## Objectives
*   **Support:** To raise funds to provide financial support to the athletics and activities programs of any division of the American International School-Riyadh
*   **Spirit:** To foster school spirit and a sense of belonging among students, parents, faculty and staff`,
    links: [
      { title: 'View Athletics Calendar', url: 'https://drive.google.com/file/d/1HnnN8RURhkL9YpYwvgH2_ITcfLs27nmQ/view?usp=sharing'},
      { 
        title: 'Join the Booster Club', 
        url: '#',
        modalContent: {
            title: 'Join the Booster Club',
            body: 'Great news! If you are a parent or guardian of an AIS-R student, you can easily become a member of the Booster Club. Just scan the QR code to join',
            embedUrl: 'https://drive.google.com/file/d/1kVm_5bL9A9Usm5qBOrh5fjMGKLJq6KZ_/preview',
        } 
      },
    ],
  },
};
