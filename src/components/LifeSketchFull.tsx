import React from 'react';

export const LifeSketchFull: React.FC = () => {
  return (
    <section id="life-sketch" className="py-16 md:py-24 bg-army-cream relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-army-green/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Top: Title Block + Diamond Portrait ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start mb-12 lg:mb-20">
          {/* Left: Title + Opening Quote */}
          <div>
            <p className="text-sm text-army-olive/80 uppercase tracking-[0.2em] font-semibold leading-relaxed mb-1">
              Colonel<br />(Retired)
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-1">
              <span className="text-army-red">Md. Jaglul Ahsan,</span>{' '}
              <span className="text-army-navy">SUP, psc, G</span>
            </h2>

            <p className="text-xs sm:text-sm font-bold text-army-navy/50 uppercase tracking-[0.15em] mt-4 mb-8">
              LIFE SKETCH OF COL MD JAGLUL AHSAN, SUP, psc, G
            </p>

            {/* Maya Angelou Quote */}
            <div className="pl-6 border-l-4 border-army-navy/20">
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-army-navy leading-snug italic">
                "You may write me down in history<br />
                With your bitter, twisted lies,<br />
                You may trod me in the very dirt<br />
                But still, like dust, I'll rise."
              </blockquote>
              <cite className="block mt-3 text-lg font-bold text-army-navy not-italic">
                –Maya Angelo
              </cite>
            </div>
          </div>

          {/* Right: Diamond Portrait */}
          <div className="relative flex justify-center items-center py-10 lg:py-16">
            {/* Background Decorative Diamonds */}
            <div className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] bg-orange-500/15 rotate-45 rounded-3xl -translate-x-6 translate-y-6"></div>
            <div className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] bg-army-red/10 rotate-45 rounded-3xl translate-x-6 -translate-y-6 border-4 border-army-red/15"></div>

            {/* Main Image Diamond */}
            <div className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rotate-45 overflow-hidden rounded-[40px] md:rounded-[50px] border-[10px] border-white shadow-2xl z-10">
              <div className="-rotate-45 w-[142%] h-[142%] absolute top-[-21%] left-[-21%]">
                <img
                  src="/colonel-jaglul.png"
                  alt="Colonel Md Jaglul Ahsan"
                  className="w-full h-full object-cover object-top scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Accent Diamonds */}
            <div className="absolute w-14 h-14 bg-army-gold rotate-45 rounded-lg -bottom-6 -right-2 z-20"></div>
            <div className="absolute w-10 h-10 bg-army-red rotate-45 rounded-md top-6 -left-6 z-0"></div>
          </div>
        </div>

        {/* ── Full Biography ── */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-army-navy/80 leading-relaxed text-base sm:text-lg">

            {/* ── Paragraph 1 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">1.</span>
              If life is a stream of fall and rise as Maya Angelo says then the life of Col (retd) Jaglul is a flow with unprecedented frequency of pitch, roll and turbulence. However, most life do not flow the way we think it should have flown. Few undergoes adventures, few takes challenges, few compromises and only few takes a path of uncompromising stand to make the life challenging, eventful and dynamic. Col (retd) Jaglul took the later course echoing with Robert Frost;
            </p>

            <blockquote className="pl-8 border-l-4 border-army-gold/30 text-xl sm:text-2xl font-serif font-bold text-army-navy italic leading-snug py-2">
              "Two roads diverged in a yellow wood,<br />
              And I took the one less travelled by"
            </blockquote>

            {/* ── Paragraph 2 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">2.</span>
              Sometimes he was a goody first boy yet many a times a notorious lad. Sometimes he was the best in the playground yet was an extraordinary stage performer. Sometimes he was a sharp shooter in the firing range yet a writer of high-quality papers. Sometimes he was tough military commander yet a soft poet in the rain. He bears many dimensions of which few may contradict. Does not matter as he believes similar to Whitman <em>"Do I contradict myself, very well then I do because I am large, I contain multitudes."</em> Contradictions apart, one attribute he carried all along since boyhood to till date is his revolutionary stand against all unethical affair and injustice.
            </p>

            {/* ── Paragraph 3 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">3.</span>
              Col (retd) Jaglul had his own philosophy of life based on a strong opinion and acted accordingly. He never deviated from his philosophy and opinion come what may; withdrawn from college, piercing bullet in the chest or court martial on death charge. The reason being he had profound faith on Khalil Gibran's verse;
            </p>

            <blockquote className="pl-8 border-l-4 border-army-gold/30 text-xl sm:text-2xl font-serif font-bold text-army-navy italic leading-snug py-2">
              "Most love is lost When what is said Is not meant,<br />
              And when what is meant is not said"
            </blockquote>

            {/* ── Phase Divider: Early Life ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Early Life</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 4 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">4.</span>
              In one fine morning of countrywide political uprising in 1969, Colonel (Retd) Md Jaglul Ahsan, SUP, psc, G was born in his native Village Bansgari is at Narchi Union of Sariakandi UZ under Bogura District but he was brought up at Mirzapur Cadet College. He started his primary education at PTI School and stood first at a row from class one to five.
            </p>

            {/* ── Paragraph 5 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">5.</span>
              Hardly known is the fact whether his grooming up was conditioned by 69 uprising or by 71 revolutions but he carried the revolutionist vibe throughout his life. In one summer, holiday while at class six only, on a contest over mango on the tree, he challenged an unruly playmate threatening others with a big knife. Consequently, he got stabbed but recovered with only 11 stitches in the belly. In the next year, finding one big sized classmate beating another little one, as class captain, he warned him not to do so. Unfortunate big guy did not listen to his urge; thus, he boxed him to senseless for three and half hours. However, he was relieved from rustication due to his good result and his stand against an offence as recommended by the class teacher.
            </p>

            {/* ── Paragraph 6 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">6.</span>
              Later, he went to Mirzapur Cadet College in 1981 at class seven. His revolutionary attitude got compounded there due to extensive reading at library. Library gradually indoctrinated him on Che-Guevara, Mao, Ho Chi Min. Reading of Nakshal based novels like 'Kalbela' almost obsessed him with 'Quiksho Effect' on Animesh and Madhobilota. Influence of few enlightened teachers also acted as leverage to indoctrinate him with the great philosophy of Che Guevara;
            </p>

            <blockquote className="pl-8 border-l-4 border-army-red/30 text-xl sm:text-2xl font-serif font-bold text-army-navy italic leading-snug py-2">
              "If you tremble with indignation at every injustice then you are a comrade of mine"
            </blockquote>

            <p>
              Therefore, this time he organized collective protest against the physical abuse of senior cadets violating the college rule. With enormous injustice, he along with four other classmates were marked as leader of the protest and were sent to long leave for five months before the SSC exam. Despite such complicated status-cue, he passed SSC in 1986 with 805 marks. Discriminatory dealings of college authority with non-military background parents were a long-lasting fault line of cadet college. The trend became severe with the new principal. Consequently, Colonel and few others organized a deliberate walk out with their entire batch from the Mirzapur Cadet College to Dhaka. To avoid the road barricades set up from Davar cantonment, they ran, walk and ran 40 km day long through the jungle canopied village tracks and river ways and finally reached to Dhaka at night starting in the morning. It was really a long walk to justice but resulted in a huge injustice. He along with 20 others who all admitted the responsibility of leading the move, were withdrawn from the college. He went to Dhaka and enrolled in Dhaka Science College.
            </p>

            {/* ── Phase Divider: Education & Career ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Education &amp; Career</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 7 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">7.</span>
              Life at Dhaka was difficult for him due to migration challenges. However, he passed HSC in 1988 again with 812 marks and joined Bangladesh Military Academy in the same year and passed BSc in 1990 from Chittagong University with first class (605). He was commissioned in the regiment of artillery in famous 2 Field Regiment Artillery of Major Khondoker Rashid of 1975. Later, he completed his Masters on Defense Studies (618) from Staff College in 2005 and Masters on Business Administration in 2009 with A+. He also completed his Masters on Military Science with distinction (750) in 2012. He is also a graduate of European Center for Security Studies, Germany and is now undergoing PhD from Bangladesh University of Professionals (BUP). Col is expert both in sword and pen thus became best firer in 2006 amongst all officers of Bangladesh Army and also the best research best essay writing competition amongst all officers twice. Col was awarded with the সেনা উৎকর্ষ পদক (SUP) for his extra ordinary service, developing new army training doctrine and his research based writing contribution 2019.
            </p>

            {/* ── Phase Divider: Military Service ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Military Service</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 8 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">8.</span>
              Col (retd) Jaglul was an officer with an outstanding military career and unquestionable ethical standard. He served in various prestigious appointments as General Staff Officer-3, Brigade Major, Instructor, Chief Instructor, Commanding Officer of 02 major and 01 minor unit and General Staff Officer-1 of Doctrine Division, ARTDOC. Any military officer can understand from the appointments above, the quality of an officer in Bangladesh Army. He was a valiant soldier against every injustice, crime and crisis thus, in a fire fight he received bullet in his left hand and chest in a conflict with terrorists at Chittagong. He was declared almost dead but miraculously survived after second operation. This added more 31 stitches with 11 before, so Col is called by his course mates "Man with 42 stitches". However, Col Jaglul is now in his bonus life by the mercy of Almighty Allah, thus, he believes he has nothing to materially gain and earn in his life. In 1996, the then Captain Jaglul under the authority of move order of the then CAS Gen Nasim, was the first group commander to reach to Rajendrapur from Mymenshingh Cantonment with a pick up loaded with arms, ammunition, soldiers and poised to enter to DHAKA. He was face to face on gun point with the troops of the then Major Zakaria (later Brig Gen) placed to protect Dhaka. However, later both were negotiated to disarm. Unfortunate enough, it was General Nasim who back to 5 years had withdrawn him and 20 others from Cadet College.
            </p>

            {/* ── Phase Divider: International Service ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">International Service</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 9 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">9.</span>
              In 2005, the then Major Jaglul joined UNAMSIL, UN office HQ at Sierraleone as 'Head of Logistics' but soon he confronted with British Colonel David Heige as David used to keep the treasury state and account of all the "Diamonds" picked up from the mines whose 25% was to be spent for war victims. Hiding any information from "morning briefing" was against the UN Law, thus the then Major Jaglul placed this issue in one of the briefing sessions before all international observers. However, though Maj Jaglul was right yet he was posted from logistics branch to the remotest northern province of Sierra Leone as an UN Observer where he worked day and night to develop the life of poor Africans and received "Outstanding" performance appraisal report. In 2017/18 he again served as Military Intelligence Officer at Mali. There is a service rule that in entire service life an officer has to serve thrice on deputation either in RAB, BDR, DGFI or others but every time his name came for DGFI, BDR and RAB he managed to cancel the order as Col Jaglul believed that those organizations spoil soldierly beliefs and spirits, thus wanted to serve his entire service in Bangladesh Army only. However, just 02 years before the retirement, he was ordered to join any outside organization and the Col opted for BUP but not to those rusty organizations where money and power distracts from soldiership. Being a talented academician, he served as Chairman, Business Studies Department and later was posted as Additional Director, Research, Center for Higher Studies at BUP by one day notice as Colonel denied to allot classes to one of the relatives of lady of VC Gen Ataul Hakim Sarwar's lady who lacked procedural qualification.
            </p>

            {/* ── Phase Divider: Trials & Tribulations ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Trials &amp; Tribulations</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 10 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">10.</span>
              Col (retd) Jaglul Ahsan had a spectacular military career with approximate 85% TRACE* (Tabulated Record of Comparative Evaluation) marks where scoring mere 75 was nightmare for many officers. Point to ponder is that scoring 85% was one of the highest marks and is very rare amongst the officers. However, the officer fell victim of the Awami League since 2009 when he along with few other upright officers stood against the RAW-Politico-Military nexus in BD. As Commanding Officer of 9 Field Regiment Artillery at Savar, he along-with 03 other officers prepared to move to Peelkhana on 26th Feb 09 to rescue the officers and their families but was removed from his office by the order of the then GOC and Brigade Commander. Yet the officer was upright to look for the opportunities to prevent the RAW-politico-military conspiracies to destroy the BD Army. The officer again challenged Gen Moin U Ahmed in 2020, in his farewell address at Savar cantonment about the activities of politico-military leadership nexus with RAW to organize BDR killing and subdue BD Army. Consequently, his name along with few other officers were manipulatively included as the leader of the new army in a so-called Quo data plan of Major Zia and was activated by controlled sting operation.
            </p>

            {/* ── Paragraph 11 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">11.</span>
              The officer was called for the court-marshal enquiry with the charge of death penalty for alleged coup d'etat but it was an engineered sting operation in collaboration with RAW and DGFI. Corrupt Pro-Awami League military authority forfeiture his seniority for one year. Since then, he was deprived of prestigious postings and courses under the context of security clearance and were sent to far flung places of the country. He was barred from UN Mission, foreign courses or for that matter for any foreign assignment for long 10 years violating all official policies. However, he was given offer by General Aziz to meet General Tareq Siddique, an AL snob, before the last promotion board but Colonel never bowed down his head to any anti-state conspiracy of BAL. Having marked as "Threat to PM and National Security" over his intelligence file, finally, he was not promoted and was sent on retirement even without any proper farewell. He was not even given his entire service life entitlement of DOHS land. That's how a true upright nationalist soldier ended up under the heinous claws of BAL.
            </p>

            {/* ── Phase Divider: Post-Retirement ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Post-Retirement</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 12 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">12.</span>
              On retirement at 2020, Col Jaglul Ahsan started his second career in Trust Bank of BD Army as the Head of Purchase. But Col knew purchase department in BD was difficult job for him. Soon, he had frequent conflict with MD over loose purchase policies of TBL and unfair manipulation. After 05 August, when Jamat started conspiring to take control and capture various important posts of Banks, a nexus of businessmen and ex Generals started to conspire to terminate him but Col (Retd) Jaglul who never compromised under pressure and never accepted any dishonor in life, resigned from the bank job of 3.5 lakhs salary before the nexus could do anything. Now, he is living with his own business.
            </p>

            {/* ── Phase Divider: Legacy & Vision ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Legacy &amp; Vision</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 13 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">13.</span>
              Col (retd) Md Jaglul Ahsan was an outstanding military officer with uncompromising ethics and unquestionable military courage. As such he could not accept the systematic damage of Bangladesh Army by RAW-BAL nexus and revolted in his own way. He was a true soldier with nationalistic spirit and being a veteran instructor for long 10 years, still he commands huge influence and respect from the retired soldiers and officers all around the country. The officer is the adviser of the three largest retired soldier's group and at present trying to polarize all retired members of army, navy, air force, police, BGB, Ansar and even ex BNCCs under the banner of "Z Force". In 1971, Z Force fought against Pakistani Janta under Major Zia. Similarly, in this new Bangladesh, this force can fight against poverty, conspiracies, corruption, unethical system, culture and crimes under our beloved future leader "Mr. Tareq Zia" and his 31 points. Let Allah bestow all of us with courage and fortitude to stride across all the hurdles ahead. Let all human being to carry the message of the Earnest Hemingway's famous Novel naming "The Old man and the sea" that;
            </p>

            <blockquote className="pl-8 border-l-4 border-army-green/30 text-xl sm:text-2xl font-serif font-bold text-army-navy italic leading-snug py-2">
              "Man can be destroyed but not defeated"
            </blockquote>

            {/* ── Phase Divider: Personal Reflection ── */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-army-green/15"></div>
              <span className="text-xs font-bold text-army-olive/40 uppercase tracking-widest whitespace-nowrap">Personal Reflection</span>
              <div className="h-px flex-1 bg-army-green/15"></div>
            </div>

            {/* ── Paragraph 14 ── */}
            <p>
              <span className="font-bold text-army-navy mr-1">14.</span>
              Above are all the data collected from various sources and reference but as a man how he is. To me I am a very short tempered, bohemian, not very serious about discipline, workaholic, highly emotional and very careless and casual. These are my bad qualities but few good qualities I have as people says are extremely intelligent, ethical and uncompromising and have firm faith on the perception that <em>"Man cannot give anything to anyone, if someone can give, it is Almighty Allah"</em>.
            </p>

            {/* ── TRACE Note ── */}
            <div className="mt-8 pt-6 border-t border-army-green/10">
              <p className="text-sm text-army-olive/60 italic">
                <strong className="not-italic text-army-navy/70">Note:</strong> * TRACE — Tabulated Record of Comparative Evaluation is the average marks of an officer earned through entire service life.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
