
const constants = require('./constants');
const fs = require('fs');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

let sql = `-- Seed Legacy Content into Supabase
-- This script is idempotent and handles unique guards for posts and media.

DO $$
DECLARE
    admin_id UUID;
    post_id UUID;
BEGIN
    -- Get the first admin user ID if available, or use a placeholder
    SELECT id INTO admin_id FROM auth.users LIMIT 1;
    IF admin_id IS NULL THEN
        -- Fallback to a zero UUID if no users exist (for local testing/migration)
        admin_id := '00000000-0000-0000-0000-000000000000';
    END IF;

    ---------------------------------------------------------------------------
    -- 1. Import INITIAL_POSTS
    ---------------------------------------------------------------------------
`;

const initialPosts = [
  {
    id: 'news-1',
    title: 'Speakers at the Roundtable',
    excerpt: 'Speakers at the Roundtable on “Geopolitical Security of Bangladesh: Perspectives on the Humanitarian Corridor.” The roundtable was organized by the Center...',
    content: `Speakers at the Roundtable on “Geopolitical Security of Bangladesh: Perspectives on the Humanitarian Corridor.”\n\nThe roundtable was organized by the Center for Governance and Security Analysis and held at the CIRDAP Auditorium, Dhaka, on May 31, 2025.\n\nThe session was chaired by Colonel (Retd.) Md. Jaglul Ahsan, Executive Director of the Center for Governance and Security Analysis, who also presented the keynote paper. Emphasizing that the corridor is intricately linked to national security, Jaglul Ahsan stated that such decisions should not be taken unilaterally by the government. Given the current absence of a functioning parliament, he stressed the importance of engaging in open dialogue with all political parties before arriving at any conclusion.`,
    date: 'May 31, 2025',
    category: 'Event',
    tags: ['Security & Policy', 'Public Dialogue'],
    thematicArea: 'security',
    imageUrl: '/news/news1.jpeg',
    images: ['/news/news1.jpeg'],
    author: 'Jaglul'
  },
  {
    id: 'news-2',
    title: 'The colonel organized......',
    excerpt: 'At 03 April, 2025 the colonel organized an assembly and Human Chain to reclaim the lands...',
    content: `At 03 April, 2025 the colonel organized an assembly and Human Chain to reclaim the lands. The local community actively participated in this peaceful demonstration to protest against unauthorized land occupations and demand the return of properties to their rightful owners.\n\nThe event highlights Colonel Ahsan's commitment to justice and civic action, mobilizing citizens to stand up for their fundamental rights.`,
    date: 'April 6, 2025',
    category: 'Civic',
    tags: ['Civic Action & Rights', 'Community Engagement'],
    thematicArea: 'civic',
    imageUrl: '/news/news2.jpg',
    images: ['/news/news2.jpg'],
    author: 'Jaglul'
  },
  {
    id: 'news-3',
    title: "Nation's future lies on children.",
    excerpt: 'Nation’s future lies on children. Colonel, therefore, organizes periodic art competition for them to develop their mental faculty...',
    content: `Nation’s future lies on children. Colonel, therefore, organizes periodic art competition for them to develop their mental faculty since early childhood.\n\nThese events not only encourage creativity but also foster a sense of community and positive engagement among the youth. Recognizing that education and artistic expression are vital components of character development, these initiatives aim to provide children with platforms to showcase their talents and build self-confidence.`,
    date: 'June 18, 2024',
    category: 'Education',
    tags: ['Education & Youth', 'Community Engagement'],
    thematicArea: 'education',
    imageUrl: '/news/news3.jpg',
    images: ['/news/news3.jpg'],
    author: 'Jaglul'
  },
  {
    id: 'news-4',
    title: 'A Heartwarming Initiative...',
    excerpt: 'A Heartwarming Initiative in the Heart of the Jamuna Char: Even amidst the biting cold winds of winter, Colonel’s Foundation and the NGO UPSAM...',
    content: `A Heartwarming Initiative in the Heart of the Jamuna Char: Even amidst the biting cold winds of winter, Colonel’s Foundation and the NGO UPSAM joined forces to distribute essential winter clothing to the vulnerable communities.\n\nThis timely intervention provided much-needed relief to hundreds of families facing harsh weather conditions without adequate protection. The distribution drive underscores the ongoing commitment to humanitarian assistance and supporting the most marginalized segments of society during times of acute need.`,
    date: 'January 18, 2021',
    category: 'Humanitarian',
    tags: ['Humanitarian', 'Community Support'],
    thematicArea: 'humanitarian',
    imageUrl: '/news/news4.jpg',
    images: ['/news/news4.jpg'],
    author: 'Jaglul'
  },
  {
    id: 'news-5', // Re-indexed from original id: '1'
    title: 'Strengthening Veterans Support Networks Across Bangladesh',
    excerpt: 'Colonel Ahsan addresses the need for comprehensive welfare programs for retired military personnel across Bangladesh.',
    content: `The welfare of our retired soldiers remains one of the most pressing yet overlooked issues in our nation. After decades of service, many veterans find themselves without adequate support systems.\n\nDuring a recent gathering of retired officers, Colonel Ahsan outlined a comprehensive framework for improving veteran welfare:\n\n**Key Proposals:**\n- Establishment of regional veteran support centers\n- Healthcare access improvements for retired personnel\n- Skill development programs for post-military careers\n- Mental health support initiatives\n\n"Our soldiers gave their best years to the nation. It is our collective responsibility to ensure they are not forgotten," stated Colonel Ahsan during the address.\n\nThe initiative has already received support from several veteran organizations and is expected to be presented to relevant authorities in the coming months.\n\nThis marks another step in Colonel Ahsan's ongoing commitment to those who served alongside him during three decades of military service.`,
    date: 'Jan 28, 2026',
    category: 'News',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'veterans',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    images: ['https://picsum.photos/800/600?random=40', 'https://picsum.photos/800/600?random=41'],
    author: 'Jaglul'
  },
  {
    id: 'news-6', // Re-indexed from original id: '2'
    title: 'Youth Leadership Summit 2026 — Building Tomorrow\'s Leaders',
    excerpt: 'Upcoming event to mentor the next generation of leaders — registration now open for young professionals.',
    content: `The Youth Leadership Summit 2026 aims to inspire and equip the next generation of Bangladeshi leaders with the skills, ethics, and vision needed to serve their communities.\n\nColonel (Retd.) Md. Jaglul Ahsan will serve as the keynote speaker, sharing insights from three decades of military leadership and public service.\n\n**Summit Highlights:**\n- Leadership workshops led by distinguished speakers\n- Interactive sessions on ethical decision-making\n- Networking opportunities with established professionals\n- Certificate of participation for all attendees\n\nThe summit is open to young professionals aged 18-35 who demonstrate commitment to community service and national development.\n\n"Leadership is not about position — it is about responsibility. Our youth must learn this early," says Colonel Ahsan.\n\nRegistration is free but limited to 200 participants.`,
    date: 'Feb 15, 2026',
    category: 'Event',
    tags: ['Public Dialogue', 'Community Engagement'],
    thematicArea: 'education',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    images: ['https://picsum.photos/800/600?random=50', 'https://picsum.photos/800/600?random=51'],
    author: 'Jaglul'
  },
  {
    id: 'news-7', // Re-indexed from original id: '3'
    title: 'Op-Ed: Ethics in Institutional Leadership — Lessons from Three Decades',
    excerpt: 'Reflections on maintaining integrity in public and private institutions — lessons from three decades of service.',
    content: `In my thirty years of service to the Bangladesh Army, I have witnessed both the heights of institutional integrity and the depths of ethical compromise. This reflection is not an accusation — it is an observation.\n\n**The Foundation of Ethical Leadership**\n\nTrue leadership begins with a simple commitment: to never compromise principles for personal gain. This sounds simple. In practice, it is extraordinarily difficult.\n\nInstitutions are built on trust. When that trust is broken — through corruption, favoritism, or moral cowardice — the entire structure weakens. I have seen good officers remain silent when they should have spoken. I have seen careers destroyed for speaking truth.\n\n**The Cost of Integrity**\n\nLet me be clear: ethical resistance comes with a price. I have paid it. Many others have paid it. Careers stalled, opportunities denied, relationships strained.\n\nBut I ask you — what is the alternative? To participate in systems we know are wrong? To advance by abandoning our principles?\n\n**A Call to the Next Generation**\n\nTo the young officers and public servants reading this: your choices matter. Every small compromise accumulates. Every silent acceptance of wrongdoing normalizes it.\n\nChoose integrity. Even when it costs you. Especially when it costs you.\n\nThe nation needs leaders who cannot be bought, intimidated, or silenced. Be that leader.`,
    date: 'Jan 10, 2026',
    category: 'Op-Ed',
    tags: ['Public Dialogue', 'Security & Policy'],
    thematicArea: 'civic',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    images: ['https://picsum.photos/800/600?random=6'],
    author: 'Jaglul'
  },
  {
    id: 'news-8', // Re-indexed from original id: '4'
    title: 'Humanitarian Relief Efforts in Flood-Affected Sylhet Region',
    excerpt: 'Colonel Ahsan joins relief operations providing essential supplies to families displaced by recent flooding.',
    content: `In response to the devastating floods that struck the Sylhet region, Colonel (Retd.) Md. Jaglul Ahsan personally participated in relief distribution efforts organized by veteran community groups.\n\n**Relief Activities:**\n- Distribution of food packages to 500+ families\n- Medical supplies delivered to temporary shelters\n- Coordination with local authorities for rescue operations\n- Establishment of temporary relief centers\n\n"In times of crisis, rank and status mean nothing. What matters is action," Colonel Ahsan stated while distributing supplies.\n\nThe operation was conducted in coordination with local administration and involved over 50 volunteers from various veteran organizations.\n\n**How to Help:**\n\nThose wishing to contribute to ongoing relief efforts can contact the official channels listed on this website. All donations are transparently documented and reported.\n\nThe Colonel expressed gratitude to all volunteers and donors who made this operation possible.`,
    date: 'Dec 20, 2025',
    category: 'Humanitarian',
    tags: ['Humanitarian', 'Community Engagement'],
    thematicArea: 'humanitarian',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    images: ['https://picsum.photos/800/600?random=70', 'https://picsum.photos/800/600?random=71', 'https://picsum.photos/800/600?random=72'],
    author: 'Jaglul'
  },
  {
    id: 'news-9', // Re-indexed from original id: '5'
    title: 'Public Dialogue: National Security in the Modern Era',
    excerpt: 'An open discussion on Bangladesh\'s security challenges and the role of informed citizenry.',
    content: `A public dialogue session was held addressing the evolving security landscape of Bangladesh and the importance of an informed, engaged citizenry in national defense.\n\nColonel Ahsan, drawing from his experience including UN peacekeeping missions in Sierra Leone and Mali, provided perspectives on:\n\n**Discussion Topics:**\n- Regional security dynamics in South Asia\n- The role of veterans in national security discourse\n- Civic responsibility and national defense\n- Misinformation and its impact on security perception\n\nThe session attracted over 150 attendees including students, professionals, and fellow veterans.\n\n"Security is not just a military matter. It requires an informed public that understands both threats and responsibilities," noted Colonel Ahsan.\n\nFuture sessions are planned on a quarterly basis.`,
    date: 'Nov 30, 2025',
    category: 'Event',
    tags: ['Security & Policy', 'Public Dialogue'],
    thematicArea: 'security',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    images: ['https://picsum.photos/800/600?random=80', 'https://picsum.photos/800/600?random=81'],
    author: 'Jaglul'
  },
  {
    id: 'news-10', // Re-indexed from original id: '6'
    title: 'Veterans Reunification Ceremony — Artillery Regiment',
    excerpt: 'Annual gathering of Artillery Regiment veterans celebrating decades of brotherhood and service.',
    content: `The annual Veterans Reunification Ceremony brought together over 200 retired officers and soldiers of the Artillery Regiment for a day of remembrance, celebration, and renewal of bonds forged in service.\n\nColonel Ahsan, commissioned into the Artillery Regiment in 1990, addressed the gathering with reflections on shared experiences and the importance of maintaining connections.\n\n**Event Highlights:**\n- Memorial tribute to fallen comrades\n- Recognition of recently retired personnel\n- Updates on veteran welfare initiatives\n- Fellowship dinner and cultural program\n\n"The bonds we formed in uniform do not dissolve with retirement. They strengthen with time," said Colonel Ahsan.\n\nThe event also served as a platform for discussing ongoing veteran welfare challenges and coordinating support efforts.`,
    date: 'Nov 15, 2025',
    category: 'Event',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'veterans',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    images: ['https://picsum.photos/800/600?random=90', 'https://picsum.photos/800/600?random=91'],
    author: 'Jaglul'
  },
  {
    id: 'news-11', // Re-indexed from original id: '7'
    title: 'A Heartwarming Initiative: Winter Clothes for Underprivileged Children',
    excerpt: 'Colonel Ahsan organizes distribution of winter clothing to children in rural Bogura.',
    content: `As winter approaches, Colonel (Retd.) Md. Jaglul Ahsan organized a winter clothes distribution drive for underprivileged children in his home district of Bogura.\n\n**Initiative Details:**\n- 300+ children received warm clothing\n- Blankets distributed to elderly residents\n- Local volunteers mobilized from veteran community\n- Schools identified beneficiaries through transparent selection\n\n"The nation's future lies in our children. Ensuring their basic needs is not charity — it is our duty," stated Colonel Ahsan.\n\nThe initiative was funded through personal contributions and donations from fellow veterans. All distributions were documented and verified.\n\n**Continued Support:**\n\nThis annual initiative continues to grow. Those wishing to support future drives can contact the official channels.`,
    date: 'Oct 25, 2025',
    category: 'Humanitarian',
    tags: ['Humanitarian', 'Community Engagement'],
    thematicArea: 'humanitarian',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    images: ['https://picsum.photos/800/600?random=100', 'https://picsum.photos/800/600?random=101', 'https://picsum.photos/800/600?random=102'],
    author: 'Jaglul'
  },
  {
    id: 'news-12', // Re-indexed from original id: '8'
    title: 'Roundtable Discussion: Bangladesh\'s Role in Regional Stability',
    excerpt: 'Expert panel discusses Bangladesh\'s strategic position and responsibilities in South Asian security.',
    content: `A high-level roundtable brought together academics, former diplomats, and military professionals to discuss Bangladesh's evolving role in regional security architecture.\n\nColonel Ahsan, drawing from his experience as a UN Military Intelligence Officer in Mali, contributed perspectives on:\n\n**Key Discussion Points:**\n- Bangladesh's peacekeeping legacy and soft power\n- Maritime security challenges in the Bay of Bengal\n- Cross-border security cooperation frameworks\n- The role of informed public discourse in security policy\n\n**Speakers at the Roundtable:**\n- Col. (Retd.) Md. Jaglul Ahsan - Military & UN Experience\n- Distinguished academics from Dhaka University\n- Former diplomats with regional expertise\n\n"Our security dialogue must move beyond headlines to substance. Informed citizens are our greatest asset," noted Colonel Ahsan.\n\nProceedings will be published as a policy brief.`,
    date: 'Sep 15, 2025',
    category: 'Event',
    tags: ['Security & Policy', 'Public Dialogue'],
    thematicArea: 'security',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    images: ['https://picsum.photos/800/600?random=110', 'https://picsum.photos/800/600?random=111'],
    author: 'Jaglul'
  },
  {
    id: 'news-13', // Re-indexed from original id: '9'
    title: 'Educational Support Program Launch — Scholarships for Veterans\' Children',
    excerpt: 'New scholarship fund established to support higher education for children of retired soldiers.',
    content: `Colonel Ahsan announced the launch of a scholarship program aimed at supporting the educational aspirations of children from veteran families facing financial hardship.\n\n**Program Details:**\n- Annual scholarships for higher education\n- Merit and need-based selection criteria\n- Transparent selection committee\n- Support for technical and professional education\n\n"Education transforms lives. Veterans' children must not be held back by financial constraints," stated Colonel Ahsan.\n\nThe initial fund will support 20 students annually, with plans to expand based on contributions.\n\n**Application Process:**\n\nApplications will open in April. Details will be published on official channels.`,
    date: 'Aug 20, 2025',
    category: 'News',
    tags: ['Veterans Welfare', 'Community Engagement'],
    thematicArea: 'education',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    images: ['https://picsum.photos/800/600?random=120'],
    author: 'Jaglul'
  },
  {
    id: 'news-14', // Re-indexed from original id: '10'
    title: 'Civic Awareness Campaign: Know Your Constitutional Rights',
    excerpt: 'Public awareness sessions educating citizens on fundamental rights and civic responsibilities.',
    content: `A series of civic awareness sessions was organized to educate citizens, particularly youth, about their constitutional rights and responsibilities.\n\n**Campaign Focus:**\n- Understanding fundamental rights\n- Civic responsibilities in a democracy\n- Legal recourse for rights violations\n- Role of institutions in protecting rights\n\nColonel Ahsan addressed the sessions, drawing parallels between military discipline and civic responsibility:\n\n"Just as soldiers know their duties, citizens must know their rights. An informed citizenry is the foundation of a strong nation."\n\nSessions were held across multiple locations in Dhaka.`,
    date: 'Jul 10, 2025',
    category: 'Event',
    tags: ['Public Dialogue', 'Community Engagement'],
    thematicArea: 'civic',
    imageUrl: 'https://picsum.photos/800/600?random=13',
    images: ['https://picsum.photos/800/600?random=130', 'https://picsum.photos/800/600?random=131'],
    author: 'Jaglul'
  }
];

initialPosts.forEach(post => {
    const slug = slugify(post.title);
    const createdAt = formatDate(post.date);
    const content = post.content.replace(/'/g, "''");
    const title = post.title.replace(/'/g, "''");
    const excerpt = post.excerpt.replace(/'/g, "''");
    const category = post.category || 'News';
    const theme = post.thematicArea || 'general';
    const tags = JSON.stringify(post.tags || []);

    sql += `
    -- Post: ${post.title}
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', '${title}', '${excerpt}', '${content}', '${category}', '${theme}', '${tags}'::jsonb, '${slug}', '${createdAt}', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    `;

    if (post.images) {
        post.images.forEach(img => {
            sql += `
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '${img}', 'external')
    ON CONFLICT DO NOTHING;
    `;
        });
    }
});

sql += `
    ---------------------------------------------------------------------------
    -- 2. Import VISION_GALLERIES as 'gallery' posts
    ---------------------------------------------------------------------------
`;

const VISION_GALLERIES = {
  "fostering-bangladeshi-nationalism": {
    id: "v1",
    slug: "fostering-bangladeshi-nationalism",
    title: "Fostering Bangladeshi Nationalism",
    description: "Colonel Ahsan's dedication to building national strength and celebrating Bangladeshi identity.",
    images: [
      { id: "img-1", url: "/Fostering%20Bangladeshi%20Nationalism/1.jpg" },
      { id: "img-2", url: "/Fostering%20Bangladeshi%20Nationalism/2.jpg" },
      { id: "img-3", url: "/Fostering%20Bangladeshi%20Nationalism/465791953_10162150083333459_3538810215910352806_n.png" },
      { id: "img-4", url: "/Fostering%20Bangladeshi%20Nationalism/466597514_10162171911533459_2853993337708550756_n.png" },
      { id: "img-5", url: "/Fostering%20Bangladeshi%20Nationalism/508347498_4097295620416543_2723286459891613803_n.jpg" },
      { id: "img-6", url: "/Fostering%20Bangladeshi%20Nationalism/515513194_10163251069743459_7681430015598696916_n.jpg" },
      { id: "img-7", url: "/Fostering%20Bangladeshi%20Nationalism/516460815_10163251069513459_1816602609160032729_n.png" },
      { id: "img-8", url: "/Fostering%20Bangladeshi%20Nationalism/529359309_10163441269028459_935160947875100638_n.jpg" },
      { id: "img-9", url: "/Fostering%20Bangladeshi%20Nationalism/6.jpg" },
      { id: "img-10", url: "/Fostering%20Bangladeshi%20Nationalism/7.jpg" },
      { id: "img-11", url: "/Fostering%20Bangladeshi%20Nationalism/8.jpg" },
      { id: "img-12", url: "/Fostering%20Bangladeshi%20Nationalism/Capture.jpg" },
      { id: "img-13", url: "/Fostering%20Bangladeshi%20Nationalism/Capture2.jpg" },
      { id: "img-14", url: "/Fostering%20Bangladeshi%20Nationalism/WhatsApp-Image-2025-09-07-at-12.59.15-PM-e1757228546712.jpeg" }
    ]
  },
  "socio-economic-advancement-of-the-area": {
    id: "v2",
    slug: "socio-economic-advancement-of-the-area",
    title: "Socio-economic Advancement of the Area",
    description: "Driving growth, sustainable development, and economic empowerment in local communities.",
    images: [
      { id: "img-15", url: "/Socio-economic%20Advancement%20of%20the%20Area/2-1.jpg" },
      { id: "img-16", url: "/Socio-economic%20Advancement%20of%20the%20Area/3-1.jpg" },
      { id: "img-17", url: "/Socio-economic%20Advancement%20of%20the%20Area/4-1.jpg" },
      { id: "img-18", url: "/Socio-economic%20Advancement%20of%20the%20Area/476049319_10162629710098459_931686657325601274_n.jpg" },
      { id: "img-19", url: "/Socio-economic%20Advancement%20of%20the%20Area/490207983_1081969920639371_7206286735146710256_n.jpg" },
      { id: "img-20", url: "/Socio-economic%20Advancement%20of%20the%20Area/5-1.jpg" },
      { id: "img-21", url: "/Socio-economic%20Advancement%20of%20the%20Area/6-1.jpg" },
      { id: "img-22", url: "/Socio-economic%20Advancement%20of%20the%20Area/dhan-vanga.png" }
    ]
  },
  "empowering-retired-soldiers": {
    id: "v3",
    slug: "empowering-retired-soldiers",
    title: "Empowering Retired Soldiers",
    description: "Honoring service through welfare programs, rehabilitation, and unwavering support for veterans.",
    images: [
      { id: "img-23", url: "/Empowering%20Retired%20Soldiers/2-2.jpg" },
      { id: "img-24", url: "/Empowering%20Retired%20Soldiers/3-2.jpg" },
      { id: "img-25", url: "/Empowering%20Retired%20Soldiers/517368139_10163300104983459_7044419975793322602_n.jpg" },
      { id: "img-26", url: "/Empowering%20Retired%20Soldiers/6-2.jpg" },
      { id: "img-27", url: "/Empowering%20Retired%20Soldiers/7-2.jpg" }
    ]
  },
  "promoting-leadership-amongst-the-next-generation": {
    id: "v4",
    slug: "promoting-leadership-amongst-the-next-generation",
    title: "Promoting Leadership Amongst the Next Generation",
    description: "Equipping young minds with ethical values, skills, and the courage to lead tomorrow.",
    images: [
      { id: "img-28", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/2-3.jpg" },
      { id: "img-29", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/4-3.jpg" },
      { id: "img-30", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/57c2eb7c-b97c-4cad-b447-239e84fa04c0.jpeg" },
      { id: "img-31", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/6-3.jpg" },
      { id: "img-32", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.52-PM-2.jpeg" },
      { id: "img-33", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.53-PM-1.jpeg" },
      { id: "img-34", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.53-PM-2.jpeg" },
      { id: "img-35", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM-1.jpeg" },
      { id: "img-36", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM-3.jpeg" },
      { id: "img-37", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM.jpeg" },
      { id: "img-38", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-09-02-at-8.24.07-PM.jpeg" },
      { id: "img-39", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/c82df912-313c-401b-82c2-d25b17980cf1.jpeg" },
      { id: "img-40", url: "/Promoting%20Leadership%20amongst%20the%20Next%20Generation/football-2.png" }
    ]
  },
  "promoting-humanitarian-works": {
    id: "v5",
    slug: "promoting-humanitarian-works",
    title: "Promoting Humanitarian Works",
    description: "Selfless service to humanity during crises, disasters, and times of need.",
    images: [
      { id: "img-41", url: "/Promoting%20Humanitarian%20Works/1-4.jpg" },
      { id: "img-42", url: "/Promoting%20Humanitarian%20Works/10-1.jpg" },
      { id: "img-43", url: "/Promoting%20Humanitarian%20Works/11-1.jpg" },
      { id: "img-44", url: "/Promoting%20Humanitarian%20Works/12.jpg" },
      { id: "img-45", url: "/Promoting%20Humanitarian%20Works/13.jpg" },
      { id: "img-46", url: "/Promoting%20Humanitarian%20Works/2-4.jpg" },
      { id: "img-47", url: "/Promoting%20Humanitarian%20Works/3-4.jpg" },
      { id: "img-48", url: "/Promoting%20Humanitarian%20Works/4-4.jpg" },
      { id: "img-49", url: "/Promoting%20Humanitarian%20Works/5-4.jpg" },
      { id: "img-50", url: "/Promoting%20Humanitarian%20Works/506308429_10163129556403459_4506199923414108729_n.jpg" },
      { id: "img-51", url: "/Promoting%20Humanitarian%20Works/506436189_10163133443153459_1897875658459740856_n.jpg" },
      { id: "img-52", url: "/Promoting%20Humanitarian%20Works/6-4.jpg" },
      { id: "img-53", url: "/Promoting%20Humanitarian%20Works/7-3.jpg" }
    ]
  },
  "promoting-entrepreneurship-employment": {
    id: "v6",
    slug: "promoting-entrepreneurship-employment",
    title: "Promoting Entrepreneurship & Employment",
    description: "Empowering individuals to create value, generate jobs, and drive economic independence.",
    images: [
      { id: "img-54", url: "/Promoting%20Entrepreneurship%20&%20Employment/1-1.jpg" },
      { id: "img-55", url: "/Promoting%20Entrepreneurship%20&%20Employment/1-5.jpg" },
      { id: "img-56", url: "/Promoting%20Entrepreneurship%20&%20Employment/2-5.jpg" },
      { id: "img-57", url: "/Promoting%20Entrepreneurship%20&%20Employment/3-5.jpg" },
      { id: "img-58", url: "/Promoting%20Entrepreneurship%20&%20Employment/5-1.jpg" },
      { id: "img-59", url: "/Promoting%20Entrepreneurship%20&%20Employment/505819887_1126957282807301_2232541966119681135_n.jpg" },
      { id: "img-60", url: "/Promoting%20Entrepreneurship%20&%20Employment/506016799_1127828532720176_3092620948142861044_n.jpg" },
      { id: "img-61", url: "/Promoting%20Entrepreneurship%20&%20Employment/f37bf507-a479-498b-873f-a77fcabd88da.jpeg" }
    ]
  }
};

Object.keys(VISION_GALLERIES).forEach(key => {
    const gallery = VISION_GALLERIES[key];
    const title = gallery.title.replace(/'/g, "''");
    const description = gallery.description.replace(/'/g, "''");

    sql += `
    -- Vision Gallery: ${gallery.title}
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', '${title}', '${description}', '${gallery.slug}', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    `;

    gallery.images.forEach(img => {
        sql += `
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '${img.url}', 'external')
    ON CONFLICT DO NOTHING;
    `;
    });
});

sql += `
    ---------------------------------------------------------------------------
    -- 3. General Gallery Catch-all Post
    ---------------------------------------------------------------------------
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'General Gallery', 'General media assets and miscellaneous photos.', 'general-gallery', 'published', admin_id
    ) ON CONFLICT (slug) DO NOTHING
    RETURNING id INTO post_id;

    -- If no new post was created, get the existing one
    IF post_id IS NULL THEN
        SELECT id INTO post_id FROM public.posts WHERE slug = 'general-gallery';
    END IF;

    -- Add unique media guard for (post_id, url) - creating a unique index if not exists
    -- This is already partially handled by ON CONFLICT DO NOTHING if we had a unique constraint.
    -- Let's ensure a unique constraint exists on (post_id, url) in public.media.
END $$;

-- Ensure media uniqueness to prevent duplicates on re-seed
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unique_post_media_url'
    ) THEN
        ALTER TABLE public.media ADD CONSTRAINT unique_post_media_url UNIQUE (post_id, url);
    END IF;
END $$;
`;

fs.writeFileSync('./supabase/migrations/202605140002_seed_legacy_content.sql', sql);
console.log('Seed migration generated successfully.');
