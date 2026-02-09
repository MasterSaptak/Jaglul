import { Post, Video, Comment, MediaItem } from './types';

export const ADMIN_PASSWORD = "admin"; // Simple for demo purposes

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Veterans Welfare: A Call for Unity',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Jan 15, 2026',
    youtubeId: 'wCzM4lGzVWU'
  },
  {
    id: '2',
    title: 'Reflections on 30 Years of Service',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Dec 16, 2025',
    youtubeId: 'wCzM4lGzVWU'
  },
  {
    id: '3',
    title: 'Independence Day Message 2025',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Mar 26, 2025',
    youtubeId: 'wCzM4lGzVWU'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Strengthening Veterans Support Networks Across Bangladesh',
    excerpt: 'Colonel Ahsan addresses the need for comprehensive welfare programs for retired military personnel across Bangladesh.',
    content: `The welfare of our retired soldiers remains one of the most pressing yet overlooked issues in our nation. After decades of service, many veterans find themselves without adequate support systems.

During a recent gathering of retired officers, Colonel Ahsan outlined a comprehensive framework for improving veteran welfare:

**Key Proposals:**
- Establishment of regional veteran support centers
- Healthcare access improvements for retired personnel
- Skill development programs for post-military careers
- Mental health support initiatives

"Our soldiers gave their best years to the nation. It is our collective responsibility to ensure they are not forgotten," stated Colonel Ahsan during the address.

The initiative has already received support from several veteran organizations and is expected to be presented to relevant authorities in the coming months.

This marks another step in Colonel Ahsan's ongoing commitment to those who served alongside him during three decades of military service.`,
    date: 'Jan 28, 2026',
    category: 'News',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'veterans',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    images: ['https://picsum.photos/800/600?random=40', 'https://picsum.photos/800/600?random=41'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 12
  },
  {
    id: '2',
    title: 'Youth Leadership Summit 2026 — Building Tomorrow\'s Leaders',
    excerpt: 'Upcoming event to mentor the next generation of leaders — registration now open for young professionals.',
    content: `The Youth Leadership Summit 2026 aims to inspire and equip the next generation of Bangladeshi leaders with the skills, ethics, and vision needed to serve their communities.

Colonel (Retd.) Md. Jaglul Ahsan will serve as the keynote speaker, sharing insights from three decades of military leadership and public service.

**Summit Highlights:**
- Leadership workshops led by distinguished speakers
- Interactive sessions on ethical decision-making
- Networking opportunities with established professionals
- Certificate of participation for all attendees

The summit is open to young professionals aged 18-35 who demonstrate commitment to community service and national development.

"Leadership is not about position — it is about responsibility. Our youth must learn this early," says Colonel Ahsan.

Registration is free but limited to 200 participants.`,
    date: 'Feb 15, 2026',
    category: 'Event',
    tags: ['Public Dialogue', 'Community Engagement'],
    thematicArea: 'education',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    images: ['https://picsum.photos/800/600?random=50', 'https://picsum.photos/800/600?random=51'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 8,
    eventDetails: {
      location: 'Bangladesh Army Stadium Conference Hall, Dhaka',
      eventDate: 'March 15, 2026 • 9:00 AM - 5:00 PM',
      organizer: 'Veterans Leadership Foundation',
      role: 'Keynote Speaker & Chief Guest',
      attendees: 200,
      outcome: 'Expected to train 200 emerging leaders in ethical leadership principles'
    }
  },
  {
    id: '3',
    title: 'Op-Ed: Ethics in Institutional Leadership — Lessons from Three Decades',
    excerpt: 'Reflections on maintaining integrity in public and private institutions — lessons from three decades of service.',
    content: `In my thirty years of service to the Bangladesh Army, I have witnessed both the heights of institutional integrity and the depths of ethical compromise. This reflection is not an accusation — it is an observation.

**The Foundation of Ethical Leadership**

True leadership begins with a simple commitment: to never compromise principles for personal gain. This sounds simple. In practice, it is extraordinarily difficult.

Institutions are built on trust. When that trust is broken — through corruption, favoritism, or moral cowardice — the entire structure weakens. I have seen good officers remain silent when they should have spoken. I have seen careers destroyed for speaking truth.

**The Cost of Integrity**

Let me be clear: ethical resistance comes with a price. I have paid it. Many others have paid it. Careers stalled, opportunities denied, relationships strained.

But I ask you — what is the alternative? To participate in systems we know are wrong? To advance by abandoning our principles?

**A Call to the Next Generation**

To the young officers and public servants reading this: your choices matter. Every small compromise accumulates. Every silent acceptance of wrongdoing normalizes it.

Choose integrity. Even when it costs you. Especially when it costs you.

The nation needs leaders who cannot be bought, intimidated, or silenced. Be that leader.`,
    date: 'Jan 10, 2026',
    category: 'Op-Ed',
    tags: ['Public Dialogue', 'Security & Policy'],
    thematicArea: 'civic',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 24
  },
  {
    id: '4',
    title: 'Humanitarian Relief Efforts in Flood-Affected Sylhet Region',
    excerpt: 'Colonel Ahsan joins relief operations providing essential supplies to families displaced by recent flooding.',
    content: `In response to the devastating floods that struck the Sylhet region, Colonel (Retd.) Md. Jaglul Ahsan personally participated in relief distribution efforts organized by veteran community groups.

**Relief Activities:**
- Distribution of food packages to 500+ families
- Medical supplies delivered to temporary shelters
- Coordination with local authorities for rescue operations
- Establishment of temporary relief centers

"In times of crisis, rank and status mean nothing. What matters is action," Colonel Ahsan stated while distributing supplies.

The operation was conducted in coordination with local administration and involved over 50 volunteers from various veteran organizations.

**How to Help:**

Those wishing to contribute to ongoing relief efforts can contact the official channels listed on this website. All donations are transparently documented and reported.

The Colonel expressed gratitude to all volunteers and donors who made this operation possible.`,
    date: 'Dec 20, 2025',
    category: 'Humanitarian',
    tags: ['Humanitarian', 'Community Engagement'],
    thematicArea: 'humanitarian',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    images: ['https://picsum.photos/800/600?random=70', 'https://picsum.photos/800/600?random=71', 'https://picsum.photos/800/600?random=72'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 18,
    eventDetails: {
      location: 'Sylhet Division, Bangladesh',
      eventDate: 'December 18-22, 2025',
      organizer: 'Veterans Community Relief Network',
      role: 'Relief Coordinator',
      attendees: 50,
      outcome: '500+ families received essential supplies; 3 relief centers established'
    }
  },
  {
    id: '5',
    title: 'Public Dialogue: National Security in the Modern Era',
    excerpt: 'An open discussion on Bangladesh\'s security challenges and the role of informed citizenry.',
    content: `A public dialogue session was held addressing the evolving security landscape of Bangladesh and the importance of an informed, engaged citizenry in national defense.

Colonel Ahsan, drawing from his experience including UN peacekeeping missions in Sierra Leone and Mali, provided perspectives on:

**Discussion Topics:**
- Regional security dynamics in South Asia
- The role of veterans in national security discourse
- Civic responsibility and national defense
- Misinformation and its impact on security perception

The session attracted over 150 attendees including students, professionals, and fellow veterans.

"Security is not just a military matter. It requires an informed public that understands both threats and responsibilities," noted Colonel Ahsan.

Future sessions are planned on a quarterly basis.`,
    date: 'Nov 30, 2025',
    category: 'Event',
    tags: ['Security & Policy', 'Public Dialogue'],
    thematicArea: 'security',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    images: ['https://picsum.photos/800/600?random=80', 'https://picsum.photos/800/600?random=81'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 15,
    eventDetails: {
      location: 'Dhaka University Senate Building',
      eventDate: 'November 28, 2025 • 3:00 PM',
      organizer: 'Strategic Studies Forum',
      role: 'Panel Speaker',
      attendees: 150,
      outcome: 'Quarterly dialogue series initiated; student engagement increased'
    }
  },
  {
    id: '6',
    title: 'Veterans Reunification Ceremony — Artillery Regiment',
    excerpt: 'Annual gathering of Artillery Regiment veterans celebrating decades of brotherhood and service.',
    content: `The annual Veterans Reunification Ceremony brought together over 200 retired officers and soldiers of the Artillery Regiment for a day of remembrance, celebration, and renewal of bonds forged in service.

Colonel Ahsan, commissioned into the Artillery Regiment in 1990, addressed the gathering with reflections on shared experiences and the importance of maintaining connections.

**Event Highlights:**
- Memorial tribute to fallen comrades
- Recognition of recently retired personnel
- Updates on veteran welfare initiatives
- Fellowship dinner and cultural program

"The bonds we formed in uniform do not dissolve with retirement. They strengthen with time," said Colonel Ahsan.

The event also served as a platform for discussing ongoing veteran welfare challenges and coordinating support efforts.`,
    date: 'Nov 15, 2025',
    category: 'Event',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'veterans',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    images: ['https://picsum.photos/800/600?random=90', 'https://picsum.photos/800/600?random=91'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 22,
    eventDetails: {
      location: 'Artillery Centre, Dhaka Cantonment',
      eventDate: 'November 14, 2025',
      organizer: 'Artillery Regiment Veterans Association',
      role: 'Guest of Honor',
      attendees: 200,
      outcome: 'Welfare fund contributions collected; 15 veterans recognized'
    }
  },
  {
    id: '7',
    title: 'A Heartwarming Initiative: Winter Clothes for Underprivileged Children',
    excerpt: 'Colonel Ahsan organizes distribution of winter clothing to children in rural Bogura.',
    content: `As winter approaches, Colonel (Retd.) Md. Jaglul Ahsan organized a winter clothes distribution drive for underprivileged children in his home district of Bogura.

**Initiative Details:**
- 300+ children received warm clothing
- Blankets distributed to elderly residents
- Local volunteers mobilized from veteran community
- Schools identified beneficiaries through transparent selection

"The nation's future lies in our children. Ensuring their basic needs is not charity — it is our duty," stated Colonel Ahsan.

The initiative was funded through personal contributions and donations from fellow veterans. All distributions were documented and verified.

**Continued Support:**

This annual initiative continues to grow. Those wishing to support future drives can contact the official channels.`,
    date: 'Oct 25, 2025',
    category: 'Humanitarian',
    tags: ['Humanitarian', 'Community Engagement'],
    thematicArea: 'humanitarian',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    images: ['https://picsum.photos/800/600?random=100', 'https://picsum.photos/800/600?random=101', 'https://picsum.photos/800/600?random=102'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 31,
    eventDetails: {
      location: 'Bogura District, Bangladesh',
      eventDate: 'October 20-24, 2025',
      organizer: 'Veterans Welfare Trust',
      role: 'Chief Organizer',
      attendees: 40,
      outcome: '300+ children received winter clothing; 50 elderly received blankets'
    }
  },
  {
    id: '8',
    title: 'Roundtable Discussion: Bangladesh\'s Role in Regional Stability',
    excerpt: 'Expert panel discusses Bangladesh\'s strategic position and responsibilities in South Asian security.',
    content: `A high-level roundtable brought together academics, former diplomats, and military professionals to discuss Bangladesh's evolving role in regional security architecture.

Colonel Ahsan, drawing from his experience as a UN Military Intelligence Officer in Mali, contributed perspectives on:

**Key Discussion Points:**
- Bangladesh's peacekeeping legacy and soft power
- Maritime security challenges in the Bay of Bengal
- Cross-border security cooperation frameworks
- The role of informed public discourse in security policy

**Speakers at the Roundtable:**
- Col. (Retd.) Md. Jaglul Ahsan - Military & UN Experience
- Distinguished academics from Dhaka University
- Former diplomats with regional expertise

"Our security dialogue must move beyond headlines to substance. Informed citizens are our greatest asset," noted Colonel Ahsan.

Proceedings will be published as a policy brief.`,
    date: 'Sep 15, 2025',
    category: 'Event',
    tags: ['Security & Policy', 'Public Dialogue'],
    thematicArea: 'security',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    images: ['https://picsum.photos/800/600?random=110', 'https://picsum.photos/800/600?random=111'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 19,
    eventDetails: {
      location: 'BIISS Conference Hall, Dhaka',
      eventDate: 'September 12, 2025 • 10:00 AM - 2:00 PM',
      organizer: 'Strategic Studies Forum & BIISS',
      role: 'Panelist & Expert Contributor',
      attendees: 80,
      outcome: 'Policy brief published; media coverage achieved'
    }
  },
  {
    id: '9',
    title: 'Educational Support Program Launch — Scholarships for Veterans\' Children',
    excerpt: 'New scholarship fund established to support higher education for children of retired soldiers.',
    content: `Colonel Ahsan announced the launch of a scholarship program aimed at supporting the educational aspirations of children from veteran families facing financial hardship.

**Program Details:**
- Annual scholarships for higher education
- Merit and need-based selection criteria
- Transparent selection committee
- Support for technical and professional education

"Education transforms lives. Veterans' children must not be held back by financial constraints," stated Colonel Ahsan.

The initial fund will support 20 students annually, with plans to expand based on contributions.

**Application Process:**

Applications will open in April. Details will be published on official channels.`,
    date: 'Aug 20, 2025',
    category: 'News',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'education',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    images: ['https://picsum.photos/800/600?random=120'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 27,
    eventDetails: {
      location: 'Mirpur DOHS, Dhaka',
      eventDate: 'August 15, 2025',
      organizer: 'Veterans Education Trust',
      role: 'Founder & Chairman',
      outcome: 'Fund established; 20 annual scholarships committed'
    }
  },
  {
    id: '10',
    title: 'Civic Awareness Campaign: Know Your Constitutional Rights',
    excerpt: 'Public awareness sessions educating citizens on fundamental rights and civic responsibilities.',
    content: `A series of civic awareness sessions was organized to educate citizens, particularly youth, about their constitutional rights and responsibilities.

**Campaign Focus:**
- Understanding fundamental rights
- Civic responsibilities in a democracy
- Legal recourse for rights violations
- Role of institutions in protecting rights

Colonel Ahsan addressed the sessions, drawing parallels between military discipline and civic responsibility:

"Just as soldiers know their duties, citizens must know their rights. An informed citizenry is the foundation of a strong nation."

Sessions were held across multiple locations in Dhaka.`,
    date: 'Jul 10, 2025',
    category: 'Event',
    tags: ['Public Dialogue', 'Community Engagement'],
    thematicArea: 'civic',
    imageUrl: 'https://picsum.photos/800/600?random=13',
    images: ['https://picsum.photos/800/600?random=130', 'https://picsum.photos/800/600?random=131'],
    author: 'Jaglul',
    commentsEnabled: true,
    commentCount: 14,
    eventDetails: {
      location: 'Multiple locations, Dhaka',
      eventDate: 'July 5-10, 2025',
      organizer: 'Citizens Awareness Forum',
      role: 'Lead Speaker',
      attendees: 450,
      outcome: '5 sessions conducted; 450+ citizens educated'
    }
  }
];

// Sample approved comments for demonstration
export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    name: 'Mohammad Rahman',
    email: 'rahman@example.com',
    content: 'This is exactly what our veterans need. Thank you Colonel sahib for continuing to fight for those who served.',
    date: 'Jan 29, 2026',
    approved: true,
    replies: [
      {
        id: 'r1',
        commentId: 'c1',
        name: 'Col. Jaglul Ahsan',
        content: 'Thank you for your support. The work continues.',
        date: 'Jan 29, 2026',
        isAuthor: true
      }
    ]
  },
  {
    id: 'c2',
    postId: '1',
    name: 'Fatima Begum',
    email: 'fatima@example.com',
    content: 'My father served for 25 years. The healthcare support for veterans is truly inadequate. I hope these proposals become reality.',
    date: 'Jan 30, 2026',
    approved: true
  },
  {
    id: 'c3',
    postId: '3',
    name: 'Karim Ahmed',
    email: 'karim@example.com',
    content: 'Powerful words, sir. We need more leaders willing to speak truth regardless of consequences.',
    date: 'Jan 12, 2026',
    approved: true
  },
  {
    id: 'c4',
    postId: '3',
    name: 'Nasreen Akhter',
    email: 'nasreen@example.com',
    content: 'This should be required reading for every public servant. Ethics cannot be optional.',
    date: 'Jan 15, 2026',
    approved: true
  },
  {
    id: 'c5',
    postId: '4',
    name: 'Abdul Haque',
    email: 'haque@example.com',
    content: 'Was present during the relief distribution. The organization and dedication was remarkable. Salute to all volunteers.',
    date: 'Dec 23, 2025',
    approved: true
  },
  {
    id: 'c6',
    postId: '7',
    name: 'Shamim Hossain',
    email: 'shamim@example.com',
    content: 'Seeing the smiles on those children\'s faces was worth everything. May Allah bless this initiative.',
    date: 'Oct 26, 2025',
    approved: true
  },
  {
    id: 'c7',
    postId: '9',
    name: 'Rabeya Sultana',
    email: 'rabeya@example.com',
    content: 'As a veteran\'s daughter, this scholarship program gives me hope. Education should not be a privilege.',
    date: 'Aug 22, 2025',
    approved: true
  }
];

// Media Gallery Items (auto-populated from posts)
export const MEDIA_GALLERY: MediaItem[] = [
  { id: 'm1', postId: '1', imageUrl: 'https://picsum.photos/800/600?random=4', caption: 'Veterans Support Network Meeting', date: 'Jan 28, 2026', year: '2026', thematicArea: 'veterans' },
  { id: 'm2', postId: '2', imageUrl: 'https://picsum.photos/800/600?random=5', caption: 'Youth Leadership Summit Preparation', date: 'Feb 15, 2026', year: '2026', thematicArea: 'education' },
  { id: 'm3', postId: '4', imageUrl: 'https://picsum.photos/800/600?random=7', caption: 'Flood Relief Distribution, Sylhet', date: 'Dec 20, 2025', year: '2025', thematicArea: 'humanitarian' },
  { id: 'm4', postId: '4', imageUrl: 'https://picsum.photos/800/600?random=70', caption: 'Relief Supplies Preparation', date: 'Dec 18, 2025', year: '2025', thematicArea: 'humanitarian' },
  { id: 'm5', postId: '5', imageUrl: 'https://picsum.photos/800/600?random=8', caption: 'National Security Dialogue, DU', date: 'Nov 30, 2025', year: '2025', thematicArea: 'security' },
  { id: 'm6', postId: '6', imageUrl: 'https://picsum.photos/800/600?random=9', caption: 'Artillery Regiment Reunion', date: 'Nov 15, 2025', year: '2025', thematicArea: 'veterans' },
  { id: 'm7', postId: '7', imageUrl: 'https://picsum.photos/800/600?random=10', caption: 'Winter Clothes Distribution, Bogura', date: 'Oct 25, 2025', year: '2025', thematicArea: 'humanitarian' },
  { id: 'm8', postId: '7', imageUrl: 'https://picsum.photos/800/600?random=100', caption: 'Children Receiving Winter Clothing', date: 'Oct 22, 2025', year: '2025', thematicArea: 'humanitarian' },
  { id: 'm9', postId: '8', imageUrl: 'https://picsum.photos/800/600?random=11', caption: 'Regional Security Roundtable', date: 'Sep 15, 2025', year: '2025', thematicArea: 'security' },
  { id: 'm10', postId: '9', imageUrl: 'https://picsum.photos/800/600?random=12', caption: 'Scholarship Program Launch', date: 'Aug 20, 2025', year: '2025', thematicArea: 'education' },
  { id: 'm11', postId: '10', imageUrl: 'https://picsum.photos/800/600?random=13', caption: 'Civic Awareness Session', date: 'Jul 10, 2025', year: '2025', thematicArea: 'civic' }
];

export const CONTACT_REASONS = [
  "Veterans Welfare Inquiry",
  "Media / Interview Request",
  "Event Invitation / Speaking Engagement",
  "Collaboration Proposal",
  "General Inquiry",
  "Other"
];

export const POST_CATEGORIES = ['All', 'News', 'Event', 'Humanitarian', 'Op-Ed', 'Policy'];
export const POST_TAGS = ['Humanitarian', 'Public Dialogue', 'Security & Policy', 'Community Engagement', 'Veterans Welfare'];
export const POST_YEARS = ['2026', '2025', '2024'];

// Thematic Area Configuration
export const THEMATIC_AREAS = {
  humanitarian: {
    id: 'humanitarian',
    title: 'Humanitarian Work',
    subtitle: 'Relief, Aid & Community Support',
    description: 'Organized relief efforts, charitable initiatives, and community support programs led by Colonel Ahsan.',
    icon: 'Heart',
    color: 'army-red'
  },
  education: {
    id: 'education',
    title: 'Education & Youth',
    subtitle: 'Leadership Development & Scholarships',
    description: 'Programs focused on youth empowerment, educational support, and developing future leaders.',
    icon: 'GraduationCap',
    color: 'army-gold'
  },
  security: {
    id: 'security',
    title: 'National Security & Policy',
    subtitle: 'Strategic Dialogue & Public Discourse',
    description: 'Expert commentary and public dialogue on national security, regional stability, and policy matters.',
    icon: 'Shield',
    color: 'army-navy'
  },
  veterans: {
    id: 'veterans',
    title: 'Veterans Welfare',
    subtitle: 'Support, Unity & Advocacy',
    description: 'Initiatives supporting retired military personnel through welfare programs, community building, and advocacy.',
    icon: 'Medal',
    color: 'army-green'
  },
  civic: {
    id: 'civic',
    title: 'Civic Action & Rights',
    subtitle: 'Awareness, Ethics & Public Responsibility',
    description: 'Civic awareness campaigns, ethical leadership advocacy, and public rights education.',
    icon: 'Scale',
    color: 'army-olive'
  }
};
