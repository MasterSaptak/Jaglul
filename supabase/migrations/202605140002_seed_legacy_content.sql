-- Seed Legacy Content into Supabase
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

    -- Post: Speakers at the Roundtable
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Speakers at the Roundtable', 'Speakers at the Roundtable on “Geopolitical Security of Bangladesh: Perspectives on the Humanitarian Corridor.” The roundtable was organized by the Center...', 'Speakers at the Roundtable on “Geopolitical Security of Bangladesh: Perspectives on the Humanitarian Corridor.”

The roundtable was organized by the Center for Governance and Security Analysis and held at the CIRDAP Auditorium, Dhaka, on May 31, 2025.

The session was chaired by Colonel (Retd.) Md. Jaglul Ahsan, Executive Director of the Center for Governance and Security Analysis, who also presented the keynote paper. Emphasizing that the corridor is intricately linked to national security, Jaglul Ahsan stated that such decisions should not be taken unilaterally by the government. Given the current absence of a functioning parliament, he stressed the importance of engaging in open dialogue with all political parties before arriving at any conclusion.', 'Event', 'security', ARRAY['Security & Policy', 'Public Dialogue'], 'speakers-at-the-roundtable', '2025-05-30T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/news/news1.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: The colonel organized......
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'The colonel organized......', 'At 03 April, 2025 the colonel organized an assembly and Human Chain to reclaim the lands...', 'At 03 April, 2025 the colonel organized an assembly and Human Chain to reclaim the lands. The local community actively participated in this peaceful demonstration to protest against unauthorized land occupations and demand the return of properties to their rightful owners.

The event highlights Colonel Ahsan''s commitment to justice and civic action, mobilizing citizens to stand up for their fundamental rights.', 'Civic', 'civic', ARRAY['Civic Action & Rights', 'Community Engagement'], 'the-colonel-organized', '2025-04-05T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/news/news2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Nation's future lies on children.
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Nation''s future lies on children.', 'Nation’s future lies on children. Colonel, therefore, organizes periodic art competition for them to develop their mental faculty...', 'Nation’s future lies on children. Colonel, therefore, organizes periodic art competition for them to develop their mental faculty since early childhood.

These events not only encourage creativity but also foster a sense of community and positive engagement among the youth. Recognizing that education and artistic expression are vital components of character development, these initiatives aim to provide children with platforms to showcase their talents and build self-confidence.', 'Education', 'education', ARRAY['Education & Youth', 'Community Engagement'], 'nations-future-lies-on-children', '2024-06-17T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/news/news3.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: A Heartwarming Initiative...
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'A Heartwarming Initiative...', 'A Heartwarming Initiative in the Heart of the Jamuna Char: Even amidst the biting cold winds of winter, Colonel’s Foundation and the NGO UPSAM...', 'A Heartwarming Initiative in the Heart of the Jamuna Char: Even amidst the biting cold winds of winter, Colonel’s Foundation and the NGO UPSAM joined forces to distribute essential winter clothing to the vulnerable communities.

This timely intervention provided much-needed relief to hundreds of families facing harsh weather conditions without adequate protection. The distribution drive underscores the ongoing commitment to humanitarian assistance and supporting the most marginalized segments of society during times of acute need.', 'Humanitarian', 'humanitarian', ARRAY['Humanitarian', 'Community Support'], 'a-heartwarming-initiative', '2021-01-17T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/news/news4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Strengthening Veterans Support Networks Across Bangladesh
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Strengthening Veterans Support Networks Across Bangladesh', 'Colonel Ahsan addresses the need for comprehensive welfare programs for retired military personnel across Bangladesh.', 'The welfare of our retired soldiers remains one of the most pressing yet overlooked issues in our nation. After decades of service, many veterans find themselves without adequate support systems.

During a recent gathering of retired officers, Colonel Ahsan outlined a comprehensive framework for improving veteran welfare:

**Key Proposals:**
- Establishment of regional veteran support centers
- Healthcare access improvements for retired personnel
- Skill development programs for post-military careers
- Mental health support initiatives

"Our soldiers gave their best years to the nation. It is our collective responsibility to ensure they are not forgotten," stated Colonel Ahsan during the address.

The initiative has already received support from several veteran organizations and is expected to be presented to relevant authorities in the coming months.

This marks another step in Colonel Ahsan''s ongoing commitment to those who served alongside him during three decades of military service.', 'News', 'veterans', ARRAY['Veterans Welfare', 'Community Engagement'], 'strengthening-veterans-support-networks-across-bangladesh', '2026-01-27T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=40', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=41', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Youth Leadership Summit 2026 — Building Tomorrow's Leaders
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Youth Leadership Summit 2026 — Building Tomorrow''s Leaders', 'Upcoming event to mentor the next generation of leaders — registration now open for young professionals.', 'The Youth Leadership Summit 2026 aims to inspire and equip the next generation of Bangladeshi leaders with the skills, ethics, and vision needed to serve their communities.

Colonel (Retd.) Md. Jaglul Ahsan will serve as the keynote speaker, sharing insights from three decades of military leadership and public service.

**Summit Highlights:**
- Leadership workshops led by distinguished speakers
- Interactive sessions on ethical decision-making
- Networking opportunities with established professionals
- Certificate of participation for all attendees

The summit is open to young professionals aged 18-35 who demonstrate commitment to community service and national development.

"Leadership is not about position — it is about responsibility. Our youth must learn this early," says Colonel Ahsan.

Registration is free but limited to 200 participants.', 'Event', 'education', ARRAY['Public Dialogue', 'Community Engagement'], 'youth-leadership-summit-2026-building-tomorrows-leaders', '2026-02-14T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=50', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=51', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Op-Ed: Ethics in Institutional Leadership — Lessons from Three Decades
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Op-Ed: Ethics in Institutional Leadership — Lessons from Three Decades', 'Reflections on maintaining integrity in public and private institutions — lessons from three decades of service.', 'In my thirty years of service to the Bangladesh Army, I have witnessed both the heights of institutional integrity and the depths of ethical compromise. This reflection is not an accusation — it is an observation.

**The Foundation of Ethical Leadership**

True leadership begins with a simple commitment: to never compromise principles for personal gain. This sounds simple. In practice, it is extraordinarily difficult.

Institutions are built on trust. When that trust is broken — through corruption, favoritism, or moral cowardice — the entire structure weakens. I have seen good officers remain silent when they should have spoken. I have seen careers destroyed for speaking truth.

**The Cost of Integrity**

Let me be clear: ethical resistance comes with a price. I have paid it. Many others have paid it. Careers stalled, opportunities denied, relationships strained.

But I ask you — what is the alternative? To participate in systems we know are wrong? To advance by abandoning our principles?

**A Call to the Next Generation**

To the young officers and public servants reading this: your choices matter. Every small compromise accumulates. Every silent acceptance of wrongdoing normalizes it.

Choose integrity. Even when it costs you. Especially when it costs you.

The nation needs leaders who cannot be bought, intimidated, or silenced. Be that leader.', 'Op-Ed', 'civic', ARRAY['Public Dialogue', 'Security & Policy'], 'op-ed-ethics-in-institutional-leadership-lessons-from-three-decades', '2026-01-09T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=6', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Humanitarian Relief Efforts in Flood-Affected Sylhet Region
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Humanitarian Relief Efforts in Flood-Affected Sylhet Region', 'Colonel Ahsan joins relief operations providing essential supplies to families displaced by recent flooding.', 'In response to the devastating floods that struck the Sylhet region, Colonel (Retd.) Md. Jaglul Ahsan personally participated in relief distribution efforts organized by veteran community groups.

**Relief Activities:**
- Distribution of food packages to 500+ families
- Medical supplies delivered to temporary shelters
- Coordination with local authorities for rescue operations
- Establishment of temporary relief centers

"In times of crisis, rank and status mean nothing. What matters is action," Colonel Ahsan stated while distributing supplies.

The operation was conducted in coordination with local administration and involved over 50 volunteers from various veteran organizations.

**How to Help:**

Those wishing to contribute to ongoing relief efforts can contact the official channels listed on this website. All donations are transparently documented and reported.

The Colonel expressed gratitude to all volunteers and donors who made this operation possible.', 'Humanitarian', 'humanitarian', ARRAY['Humanitarian', 'Community Engagement'], 'humanitarian-relief-efforts-in-flood-affected-sylhet-region', '2025-12-19T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=70', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=71', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=72', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Public Dialogue: National Security in the Modern Era
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Public Dialogue: National Security in the Modern Era', 'An open discussion on Bangladesh''s security challenges and the role of informed citizenry.', 'A public dialogue session was held addressing the evolving security landscape of Bangladesh and the importance of an informed, engaged citizenry in national defense.

Colonel Ahsan, drawing from his experience including UN peacekeeping missions in Sierra Leone and Mali, provided perspectives on:

**Discussion Topics:**
- Regional security dynamics in South Asia
- The role of veterans in national security discourse
- Civic responsibility and national defense
- Misinformation and its impact on security perception

The session attracted over 150 attendees including students, professionals, and fellow veterans.

"Security is not just a military matter. It requires an informed public that understands both threats and responsibilities," noted Colonel Ahsan.

Future sessions are planned on a quarterly basis.', 'Event', 'security', ARRAY['Security & Policy', 'Public Dialogue'], 'public-dialogue-national-security-in-the-modern-era', '2025-11-29T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=80', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=81', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Veterans Reunification Ceremony — Artillery Regiment
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Veterans Reunification Ceremony — Artillery Regiment', 'Annual gathering of Artillery Regiment veterans celebrating decades of brotherhood and service.', 'The annual Veterans Reunification Ceremony brought together over 200 retired officers and soldiers of the Artillery Regiment for a day of remembrance, celebration, and renewal of bonds forged in service.

Colonel Ahsan, commissioned into the Artillery Regiment in 1990, addressed the gathering with reflections on shared experiences and the importance of maintaining connections.

**Event Highlights:**
- Memorial tribute to fallen comrades
- Recognition of recently retired personnel
- Updates on veteran welfare initiatives
- Fellowship dinner and cultural program

"The bonds we formed in uniform do not dissolve with retirement. They strengthen with time," said Colonel Ahsan.

The event also served as a platform for discussing ongoing veteran welfare challenges and coordinating support efforts.', 'Event', 'veterans', ARRAY['Veterans Welfare', 'Community Engagement'], 'veterans-reunification-ceremony-artillery-regiment', '2025-11-14T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=90', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=91', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: A Heartwarming Initiative: Winter Clothes for Underprivileged Children
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'A Heartwarming Initiative: Winter Clothes for Underprivileged Children', 'Colonel Ahsan organizes distribution of winter clothing to children in rural Bogura.', 'As winter approaches, Colonel (Retd.) Md. Jaglul Ahsan organized a winter clothes distribution drive for underprivileged children in his home district of Bogura.

**Initiative Details:**
- 300+ children received warm clothing
- Blankets distributed to elderly residents
- Local volunteers mobilized from veteran community
- Schools identified beneficiaries through transparent selection

"The nation''s future lies in our children. Ensuring their basic needs is not charity — it is our duty," stated Colonel Ahsan.

The initiative was funded through personal contributions and donations from fellow veterans. All distributions were documented and verified.

**Continued Support:**

This annual initiative continues to grow. Those wishing to support future drives can contact the official channels.', 'Humanitarian', 'humanitarian', ARRAY['Humanitarian', 'Community Engagement'], 'a-heartwarming-initiative-winter-clothes-for-underprivileged-children', '2025-10-24T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=100', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=101', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=102', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Roundtable Discussion: Bangladesh's Role in Regional Stability
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Roundtable Discussion: Bangladesh''s Role in Regional Stability', 'Expert panel discusses Bangladesh''s strategic position and responsibilities in South Asian security.', 'A high-level roundtable brought together academics, former diplomats, and military professionals to discuss Bangladesh''s evolving role in regional security architecture.

Colonel Ahsan, drawing from his experience as a UN Military Intelligence Officer in Mali, contributed perspectives on:

**Key Discussion Points:**
- Bangladesh''s peacekeeping legacy and soft power
- Maritime security challenges in the Bay of Bengal
- Cross-border security cooperation frameworks
- The role of informed public discourse in security policy

**Speakers at the Roundtable:**
- Col. (Retd.) Md. Jaglul Ahsan - Military & UN Experience
- Distinguished academics from Dhaka University
- Former diplomats with regional expertise

"Our security dialogue must move beyond headlines to substance. Informed citizens are our greatest asset," noted Colonel Ahsan.

Proceedings will be published as a policy brief.', 'Event', 'security', ARRAY['Security & Policy', 'Public Dialogue'], 'roundtable-discussion-bangladeshs-role-in-regional-stability', '2025-09-14T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=110', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=111', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Educational Support Program Launch — Scholarships for Veterans' Children
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Educational Support Program Launch — Scholarships for Veterans'' Children', 'New scholarship fund established to support higher education for children of retired soldiers.', 'Colonel Ahsan announced the launch of a scholarship program aimed at supporting the educational aspirations of children from veteran families facing financial hardship.

**Program Details:**
- Annual scholarships for higher education
- Merit and need-based selection criteria
- Transparent selection committee
- Support for technical and professional education

"Education transforms lives. Veterans'' children must not be held back by financial constraints," stated Colonel Ahsan.

The initial fund will support 20 students annually, with plans to expand based on contributions.

**Application Process:**

Applications will open in April. Details will be published on official channels.', 'News', 'education', ARRAY['Veterans Welfare', 'Community Engagement'], 'educational-support-program-launch-scholarships-for-veterans-children', '2025-08-19T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=120', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Post: Civic Awareness Campaign: Know Your Constitutional Rights
    INSERT INTO public.posts (
        type, title, caption, description, category, theme, tags, slug, created_at, visibility, created_by
    ) VALUES (
        'news', 'Civic Awareness Campaign: Know Your Constitutional Rights', 'Public awareness sessions educating citizens on fundamental rights and civic responsibilities.', 'A series of civic awareness sessions was organized to educate citizens, particularly youth, about their constitutional rights and responsibilities.

**Campaign Focus:**
- Understanding fundamental rights
- Civic responsibilities in a democracy
- Legal recourse for rights violations
- Role of institutions in protecting rights

Colonel Ahsan addressed the sessions, drawing parallels between military discipline and civic responsibility:

"Just as soldiers know their duties, citizens must know their rights. An informed citizenry is the foundation of a strong nation."

Sessions were held across multiple locations in Dhaka.', 'Event', 'civic', ARRAY['Public Dialogue', 'Community Engagement'], 'civic-awareness-campaign-know-your-constitutional-rights', '2025-07-09T18:30:00.000Z', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        caption = EXCLUDED.caption,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        theme = EXCLUDED.theme,
        tags = EXCLUDED.tags,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=130', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', 'https://picsum.photos/800/600?random=131', 'external')
    ON CONFLICT DO NOTHING;
    
    ---------------------------------------------------------------------------
    -- 2. Import VISION_GALLERIES as 'gallery' posts
    ---------------------------------------------------------------------------

    -- Vision Gallery: Fostering Bangladeshi Nationalism
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Fostering Bangladeshi Nationalism', 'Colonel Ahsan''s dedication to building national strength and celebrating Bangladeshi identity.', 'fostering-bangladeshi-nationalism', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/465791953_10162150083333459_3538810215910352806_n.png', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/466597514_10162171911533459_2853993337708550756_n.png', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/508347498_4097295620416543_2723286459891613803_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/515513194_10163251069743459_7681430015598696916_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/516460815_10163251069513459_1816602609160032729_n.png', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/529359309_10163441269028459_935160947875100638_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/6.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/7.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/8.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/Capture.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/Capture2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Fostering%20Bangladeshi%20Nationalism/WhatsApp-Image-2025-09-07-at-12.59.15-PM-e1757228546712.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Vision Gallery: Socio-economic Advancement of the Area
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Socio-economic Advancement of the Area', 'Driving growth, sustainable development, and economic empowerment in local communities.', 'socio-economic-advancement-of-the-area', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/2-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/3-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/4-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/476049319_10162629710098459_931686657325601274_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/490207983_1081969920639371_7206286735146710256_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/5-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/6-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Socio-economic%20Advancement%20of%20the%20Area/dhan-vanga.png', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Vision Gallery: Empowering Retired Soldiers
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Empowering Retired Soldiers', 'Honoring service through welfare programs, rehabilitation, and unwavering support for veterans.', 'empowering-retired-soldiers', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Empowering%20Retired%20Soldiers/2-2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Empowering%20Retired%20Soldiers/3-2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Empowering%20Retired%20Soldiers/517368139_10163300104983459_7044419975793322602_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Empowering%20Retired%20Soldiers/6-2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Empowering%20Retired%20Soldiers/7-2.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Vision Gallery: Promoting Leadership Amongst the Next Generation
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Promoting Leadership Amongst the Next Generation', 'Equipping young minds with ethical values, skills, and the courage to lead tomorrow.', 'promoting-leadership-amongst-the-next-generation', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/2-3.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/4-3.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/57c2eb7c-b97c-4cad-b447-239e84fa04c0.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/6-3.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.52-PM-2.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.53-PM-1.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.53-PM-2.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM-1.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM-3.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-07-21-at-2.39.54-PM.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/WhatsApp-Image-2025-09-02-at-8.24.07-PM.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/c82df912-313c-401b-82c2-d25b17980cf1.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Leadership%20amongst%20the%20Next%20Generation/football-2.png', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Vision Gallery: Promoting Humanitarian Works
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Promoting Humanitarian Works', 'Selfless service to humanity during crises, disasters, and times of need.', 'promoting-humanitarian-works', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/1-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/10-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/11-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/12.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/13.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/2-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/3-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/4-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/5-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/506308429_10163129556403459_4506199923414108729_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/506436189_10163133443153459_1897875658459740856_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/6-4.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Humanitarian%20Works/7-3.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    -- Vision Gallery: Promoting Entrepreneurship & Employment
    INSERT INTO public.posts (
        type, title, description, slug, visibility, created_by
    ) VALUES (
        'gallery', 'Promoting Entrepreneurship & Employment', 'Empowering individuals to create value, generate jobs, and drive economic independence.', 'promoting-entrepreneurship-employment', 'published', admin_id
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        updated_at = now()
    RETURNING id INTO post_id;

    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/1-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/1-5.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/2-5.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/3-5.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/5-1.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/505819887_1126957282807301_2232541966119681135_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/1127828532720176_3092620948142861044_n.jpg', 'external')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.media (post_id, type, url, bucket)
    VALUES (post_id, 'image', '/Promoting%20Entrepreneurship%20&%20Employment/f37bf507-a479-498b-873f-a77fcabd88da.jpeg', 'external')
    ON CONFLICT DO NOTHING;
    
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
