// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const C = {
  navy:"#003865", blue:"#1D4F91", light:"#6CACE4", sky:"#B9D9EB",
  bg:"#F4F7FB", border:"#E2EAF4", text:"#1A2A3A", muted:"#64748B", soft:"#94A3B8",
};

const INDUSTRIES = [
  { id:"tech",       label:"Tech & AI",           color:"#1D4F91" },
  { id:"consulting", label:"Consulting",           color:"#7C3AED" },
  { id:"finance",    label:"Finance & Banking",    color:"#0891B2" },
  { id:"pe_vc",      label:"PE & VC",              color:"#B45309" },
  { id:"healthcare", label:"Healthcare & Biotech", color:"#059669" },
  { id:"consumer",   label:"Consumer & Retail",    color:"#E0427A" },
  { id:"media",      label:"Media & Entertainment",color:"#F59E0B" },
  { id:"energy",     label:"Energy & Industrials", color:"#6B7280" },
  { id:"realestate", label:"Real Estate",          color:"#92400E" },
  { id:"nonprofit",  label:"Gov & Nonprofit",      color:"#10B981" },
];
const IC = Object.fromEntries(INDUSTRIES.map(i=>[i.id, i.color]));

const ALUMNI = [
  // ── Tech & AI ──
  { id:1,  name:"Jordan Riley",      cls:"CBS '19", industry:"tech",       company:"Google",        role:"Strategy & Operations Manager",    av:"JR", note:"Met at NYC Trek. Very responsive. Suggested connecting with her S&O team leads before applying. Interview has 3 rounds — case, data exercise, leadership panel.", status:"Connected",      last:"2026-04-10" },
  { id:2,  name:"Marcus Webb",       cls:"CBS '21", industry:"tech",       company:"Meta",          role:"Product Manager, Ads",             av:"MW", note:"Coffee chat scheduled for Apr 19. Preparing questions about PM transition from consulting and Meta's internal mobility process.", status:"Scheduled",      last:"2026-04-12" },
  { id:3,  name:"David Kim",         cls:"CBS '17", industry:"tech",       company:"Microsoft",     role:"PMM Director, Azure",              av:"DK", note:"Offered to review my resume and intro me to the CBS recruiting coordinator at MSFT.", status:"Followed Up",    last:"2026-04-07" },
  { id:4,  name:"Caitlin Park",      cls:"CBS '20", industry:"tech",       company:"Apple",         role:"Strategy Manager",                 av:"CP", note:"Shared Apple CBS recruiting timeline — 5 rounds total. Prepare system design + strategy cases.", status:"Connected",      last:"2026-04-09" },
  { id:5,  name:"Devon Clarke",      cls:"CBS '19", industry:"tech",       company:"NVIDIA",        role:"Business Dev Manager",             av:"DC", note:"Deep-dive on AI infra. Recommended reading Jensen's shareholder letters before interview.", status:"Followed Up",    last:"2026-04-06" },
  { id:51, name:"Isabelle Fontaine", cls:"CBS '22", industry:"tech",       company:"Amazon",        role:"S&O Lead, AWS",                    av:"IF", note:"CMC referral. Amazon LDIP program is the main CBS entry. She recruits on-campus every fall.", status:"Not Contacted",  last:"—" },
  { id:52, name:"Tyler Grant",       cls:"CBS '20", industry:"tech",       company:"Salesforce",    role:"VP, Product Strategy",             av:"TG", note:"CMC referral. Salesforce MBA program hires 8-10 CBS per year into product and strategy roles.", status:"Not Contacted",  last:"—" },
  // ── Consulting ──
  { id:6,  name:"Amara Okonkwo",     cls:"CBS '22", industry:"consulting", company:"McKinsey",      role:"Associate",                        av:"AO", note:"CBS Women in Business event connection. Offered to do a mock case next week.", status:"New",            last:"2026-04-13" },
  { id:7,  name:"Thomas Whitfield",  cls:"CBS '20", industry:"consulting", company:"BCG",           role:"Project Leader",                   av:"TW", note:"BCG Digital track specialist. Advised focusing on TMT and healthcare cases for CBS recruiting.", status:"Connected",      last:"2026-04-08" },
  { id:8,  name:"Priya Watson",      cls:"CBS '18", industry:"consulting", company:"Bain",          role:"Manager, PE Group",                av:"PW", note:"PE Group at Bain is highly competitive. Suggested networking with 3+ Bain CBS alums before applying.", status:"Followed Up",    last:"2026-04-05" },
  { id:9,  name:"James Osei",        cls:"CBS '21", industry:"consulting", company:"Deloitte",      role:"Senior Consultant, Strategy",      av:"JO", note:"Deloitte S&C — emphasizes Government & Public Services. Good CBS placement historically.", status:"Scheduled",      last:"2026-04-11" },
  { id:10, name:"Nadia Petrov",      cls:"CBS '23", industry:"consulting", company:"Accenture",     role:"Management Consultant",            av:"NP", note:"Joined through CBS on-campus recruiting. Accenture Song is a rising track for MBAs.", status:"New",            last:"2026-04-14" },
  { id:53, name:"Rafael Morales",    cls:"CBS '21", industry:"consulting", company:"Oliver Wyman",  role:"Engagement Manager",               av:"RM", note:"CMC referral. Oliver Wyman is strong in financial services strategy. CBS is a top feeder school.", status:"Not Contacted",  last:"—" },
  { id:54, name:"Sophie Brennan",    cls:"CBS '19", industry:"consulting", company:"L.E.K. Consulting",role:"Associate",                    av:"SB", note:"CMC referral. L.E.K. focuses on life sciences and PE due diligence. Less on-campus presence but strong for those who target it.", status:"Not Contacted",  last:"—" },
  // ── Finance & Banking ──
  { id:11, name:"Emily Hartwell",    cls:"CBS '20", industry:"finance",    company:"Goldman Sachs", role:"VP, Investment Banking (TMT)",     av:"EH", note:"Great M&A track conversation. Recruiting opens in September — submit before October for best shot.", status:"Followed Up",    last:"2026-04-08" },
  { id:12, name:"Kofi Mensah",       cls:"CBS '19", industry:"finance",    company:"JPMorgan",      role:"Executive Director, IB",           av:"KM", note:"JPM CBS hiring is heavy — 15-20 MBAs per year. Fit interviews are as important as technical prep.", status:"Connected",      last:"2026-04-09" },
  { id:13, name:"Yuki Tanaka",       cls:"CBS '22", industry:"finance",    company:"Morgan Stanley",role:"Associate, Equity Research",       av:"YT", note:"Equity research path is less common for MBAs — she was one of 3 from CBS. Niche but viable.", status:"Scheduled",      last:"2026-04-12" },
  { id:14, name:"Patrick O'Brien",   cls:"CBS '21", industry:"finance",    company:"BlackRock",     role:"Associate, Multi-Asset Strategy",  av:"PO", note:"BlackRock is expanding CBS hiring. Alts and systematic strategy teams are most active for MBAs.", status:"New",            last:"2026-04-13" },
  { id:15, name:"Laura Castillo",    cls:"CBS '18", industry:"finance",    company:"Citadel",       role:"Portfolio Analyst",                av:"LC", note:"Citadel super selective — 2-3 from CBS per year. CBS Value Investing Club is a big plus.", status:"Followed Up",    last:"2026-04-07" },
  { id:55, name:"Antoine Dupont",    cls:"CBS '20", industry:"finance",    company:"Lazard",        role:"Vice President, M&A",              av:"AD", note:"CMC referral. Lazard is a boutique with strong M&A franchise. CBS recruits 3-4 per year into IB roles.", status:"Not Contacted",  last:"—" },
  { id:56, name:"Chioma Eze",        cls:"CBS '21", industry:"finance",    company:"Evercore",      role:"Associate, Advisory",              av:"CE", note:"CMC referral. Evercore is a top elite boutique. She previously interned at Goldman — strong technical background expected.", status:"Not Contacted",  last:"—" },
  // ── PE & VC ──
  { id:16, name:"Alexandra Stone",   cls:"CBS '21", industry:"pe_vc",      company:"Blackstone",    role:"Associate, Real Estate PE",        av:"AS", note:"Blackstone RE Group — CBS is a top feeder. She moved from Goldman IB. Network heavily before applying.", status:"Scheduled",      last:"2026-04-11" },
  { id:17, name:"Liam Fitzgerald",   cls:"CBS '23", industry:"pe_vc",      company:"a16z",          role:"Investor (Consumer/B2B)",          av:"LF", note:"Interested in Physical AI. VC recruiting is mostly off-cycle — start networking in Year 1.", status:"New",            last:"2026-04-14" },
  { id:18, name:"Benjamin Tran",     cls:"CBS '20", industry:"pe_vc",      company:"KKR",           role:"Associate",                        av:"BT", note:"KKR hires almost exclusively from pre-MBA banking. He's the rare MBA direct hire. Case prep is grueling.", status:"Connected",      last:"2026-04-09" },
  { id:19, name:"Zoe Nakamura",      cls:"CBS '22", industry:"pe_vc",      company:"General Atlantic",role:"Associate",                     av:"ZN", note:"GA focuses on growth equity. She loves the portfolio company engagement model.", status:"Followed Up",    last:"2026-04-06" },
  { id:20, name:"Kwame Asante",      cls:"CBS '19", industry:"pe_vc",      company:"Sequoia",       role:"Scout / Operator Partner",         av:"KA", note:"Sequoia Scout is a great CBS entry point. Started in S&O at Stripe before moving to VC.", status:"New",            last:"2026-04-14" },
  { id:57, name:"Mia Hoffman",       cls:"CBS '21", industry:"pe_vc",      company:"Warburg Pincus",role:"Associate",                        av:"MH", note:"CMC referral. Warburg focuses on tech-enabled services and healthcare. MBA associate path is active.", status:"Not Contacted",  last:"—" },
  { id:58, name:"Sebastian Cruz",    cls:"CBS '20", industry:"pe_vc",      company:"Andreessen Horowitz",role:"Deal Team",                  av:"SC", note:"CMC referral. a16z deal team is highly selective. He advises building a strong operator/founder network first.", status:"Not Contacted",  last:"—" },
  // ── Healthcare & Biotech ──
  { id:21, name:"Fatima Al-Hassan",  cls:"CBS '20", industry:"healthcare", company:"J&J",           role:"Strategy Manager, MedTech",        av:"FA", note:"J&J LCLDP rotational program is the best CBS entry to medtech strategy. Apply early.", status:"Connected",      last:"2026-04-10" },
  { id:22, name:"Erik Larsson",      cls:"CBS '21", industry:"healthcare", company:"Pfizer",        role:"Sr. Associate, Corporate Strategy",av:"EL", note:"Post-COVID Pfizer is restructuring. Corporate strategy team is leaner but high-visibility.", status:"Followed Up",    last:"2026-04-07" },
  { id:23, name:"Jade Williams",     cls:"CBS '22", industry:"healthcare", company:"UnitedHealth",  role:"Strategy Associate",               av:"JW", note:"UHG Optum division is aggressively hiring MBAs. Health tech + data angle is the hottest track.", status:"Scheduled",      last:"2026-04-11" },
  { id:59, name:"Marco Esposito",    cls:"CBS '20", industry:"healthcare", company:"Eli Lilly",     role:"Director, Commercial Strategy",    av:"ME", note:"CMC referral. Lilly's GLP-1 success has made it one of the hottest pharma strategy destinations for MBAs.", status:"Not Contacted",  last:"—" },
  // ── Consumer & Retail ──
  { id:24, name:"Claire Moreau",     cls:"CBS '20", industry:"consumer",   company:"LVMH",          role:"Strategy & Development",           av:"CM", note:"LVMH hires ~5 CBS MBAs into DARE rotation. French is a plus but not required.", status:"New",            last:"2026-04-13" },
  { id:25, name:"Jamal Henderson",   cls:"CBS '19", industry:"consumer",   company:"Nike",          role:"Senior Brand Manager",             av:"JH", note:"Nike is competitive. He emphasized brand love and consumer insight skills.", status:"Connected",      last:"2026-04-08" },
  { id:60, name:"Anna Kowalski",     cls:"CBS '21", industry:"consumer",   company:"P&G",           role:"Brand Manager, Beauty",            av:"AK", note:"CMC referral. P&G MBA program is one of the most structured in CPG. She manages a $200M brand.", status:"Not Contacted",  last:"—" },
  // ── Media & Entertainment ──
  { id:26, name:"Valentina Cruz",    cls:"CBS '21", industry:"media",      company:"Netflix",       role:"Strategy & Finance Associate",     av:"VC", note:"Netflix S&F rotational program is the main CBS path. Prepare for intense business case interviews.", status:"Followed Up",    last:"2026-04-06" },
  { id:27, name:"Finn Morrison",     cls:"CBS '22", industry:"media",      company:"Spotify",       role:"Product Strategy Manager",         av:"FM", note:"Spotify values data-driven product thinking. He came from consulting — strong analytics component.", status:"Scheduled",      last:"2026-04-12" },
  { id:61, name:"Lucia Fernandez",   cls:"CBS '20", industry:"media",      company:"Disney",        role:"Manager, Corporate Strategy",      av:"LF2", note:"CMC referral. Disney CBS hiring is mostly into corporate strategy and parks strategy. Theme parks and streaming both active.", status:"Not Contacted",  last:"—" },
  // ── Energy & Industrials ──
  { id:28, name:"Omar Abdullah",     cls:"CBS '19", industry:"energy",     company:"BP",            role:"VP, Strategy & Portfolio",         av:"OA", note:"Energy transition is reshaping BP's strategy team. Lots of CBS hiring in ESG and new energy ventures.", status:"Connected",      last:"2026-04-09" },
  { id:62, name:"Ingrid Svensson",   cls:"CBS '21", industry:"energy",     company:"Siemens Energy",role:"Strategy Analyst",                 av:"IS", note:"CMC referral. Siemens Energy is actively hiring MBAs into strategy roles as grid buildout accelerates.", status:"Not Contacted",  last:"—" },
  // ── Real Estate ──
  { id:29, name:"Hannah Brooks",     cls:"CBS '20", industry:"realestate", company:"Brookfield",    role:"Associate, Real Assets",           av:"HB", note:"Brookfield hires 3-4 CBS per year into global infrastructure and RE funds. IB background helps.", status:"New",            last:"2026-04-14" },
  { id:63, name:"Carlos Ramirez",    cls:"CBS '22", industry:"realestate", company:"CBRE",          role:"VP, Capital Markets Advisory",     av:"CR", note:"CMC referral. CBRE is the largest commercial RE firm. CBS hires go into capital markets, advisory, and proptech strategy.", status:"Not Contacted",  last:"—" },
  // ── Gov & Nonprofit ──
  { id:30, name:"Samuel Okafor",     cls:"CBS '18", industry:"nonprofit",  company:"World Bank",    role:"Operations Officer",               av:"SO", note:"World Bank YPP program is competitive. CBS has a strong track record. Macro and dev economics ideal.", status:"Followed Up",    last:"2026-04-05" },
  { id:64, name:"Diana Papadopoulos",cls:"CBS '21", industry:"nonprofit",  company:"Gates Foundation",role:"Program Officer",                av:"DP", note:"CMC referral. Gates Foundation hires CBS MBAs into program and strategy roles. Global health and education tracks most active.", status:"Not Contacted",  last:"—" },
];

const EVENTS = [
  { id:1,  date:"2026-04-18", title:"Google CBS Info Session",             type:"Info Session", company:"Google",        ind:"tech",       time:"6:00 PM",  loc:"Uris Hall 301",       desc:"Google S&O and PM teams walk through recruiting timeline, role expectations, and live Q&A with current CBS alumni." },
  { id:2,  date:"2026-04-22", title:"McKinsey Case Workshop",              type:"Workshop",     company:"McKinsey",      ind:"consulting", time:"5:30 PM",  loc:"Warren Hall 4th Fl",  desc:"Hands-on case practice led by McKinsey CBS alums. Live case with immediate feedback. Bring pen and paper." },
  { id:3,  date:"2026-04-25", title:"Goldman Sachs MBA Finance Night",     type:"Networking",   company:"Goldman Sachs", ind:"finance",    time:"7:00 PM",  loc:"Faculty Club",        desc:"Goldman CBS alumni across IBD, S&T, and Asset Management host an informal networking dinner. RSVP required." },
  { id:4,  date:"2026-04-28", title:"Blackstone Real Estate Seminar",      type:"Speaker",      company:"Blackstone",    ind:"pe_vc",      time:"12:30 PM", loc:"Geffen Hall",         desc:"Blackstone RE Group VP presents on deal sourcing, asset management, and the MBA path into private equity." },
  { id:5,  date:"2026-05-02", title:"Amazon Leadership Panel",             type:"Panel",        company:"Amazon",        ind:"tech",       time:"6:30 PM",  loc:"Uris Hall 142",       desc:"Amazon BizOps and S&O leaders share day-to-day realities, leadership principles in action, and interview tips." },
  { id:6,  date:"2026-05-06", title:"BCG Digital Ventures Night",          type:"Networking",   company:"BCG",           ind:"consulting", time:"6:30 PM",  loc:"Riverside Church",    desc:"BCG Digital team presents on tech-strategy hybrid careers. Great for CBS students targeting digital transformation." },
  { id:7,  date:"2026-05-08", title:"J&J MedTech Strategy Talk",           type:"Speaker",      company:"J&J",           ind:"healthcare", time:"5:00 PM",  loc:"Uris Hall 301",       desc:"J&J LCLDP alumna walks through the rotational program structure and healthcare strategy career paths post-CBS." },
  { id:8,  date:"2026-05-12", title:"KKR Private Equity Panel",            type:"Panel",        company:"KKR",           ind:"pe_vc",      time:"7:00 PM",  loc:"Warren Hall 4th Fl",  desc:"KKR Associates share candid perspectives on the buy-side career path, deal execution, and life post-banking." },
  { id:9,  date:"2026-05-15", title:"Netflix S&F Recruiting Preview",      type:"Info Session", company:"Netflix",       ind:"media",      time:"5:30 PM",  loc:"Geffen Hall",         desc:"Netflix Strategy & Finance team previews the rotational program structure, CBS recruiting timeline, and culture." },
  { id:10, date:"2026-05-19", title:"CBS Finance & Consulting Career Fair", type:"Networking",  company:"CBS CMC",       ind:"consulting", time:"2:00 PM",  loc:"Roone Arledge Aud.", desc:"Annual CBS spring career fair. 40+ firms across consulting, finance, and corporate strategy in attendance." },
  { id:11, date:"2026-05-21", title:"Nike Brand Strategy Masterclass",     type:"Workshop",     company:"Nike",          ind:"consumer",   time:"5:00 PM",  loc:"Uris Hall 301",       desc:"Nike SVP Marketing shares how CBS grads build brand careers in global consumer. Focus on DTC and digital channels." },
  { id:12, date:"2026-05-27", title:"BP Energy Transition Forum",          type:"Speaker",      company:"BP",            ind:"energy",     time:"4:30 PM",  loc:"Geffen Hall",         desc:"BP VP Strategy discusses how MBA graduates navigate energy transition roles in oil majors and green ventures." },
];

const INIT_ENTRIES = [
  { id:1, alumId:1,  date:"2026-04-10", type:"Coffee Chat", note:"Discussed Google S&O interview process. 3 rounds: case study, data analysis exercise, leadership panel. She recommended connecting with 2 more team leads before applying." },
  { id:2, alumId:1,  date:"2026-03-28", type:"LinkedIn",    note:"Sent connection request after NYC Trek. She responded within 24 hours and suggested a coffee chat." },
  { id:3, alumId:2,  date:"2026-04-12", type:"Email",       note:"Scheduled coffee chat for April 19. Preparing 5 questions about PM transition from consulting and Meta's internal mobility." },
  { id:4, alumId:11, date:"2026-04-08", type:"Coffee Chat", note:"Great M&A insight from Emily. Goldman TMT group is most active for CBS. Recruiting opens September — submit by October." },
  { id:5, alumId:11, date:"2026-03-20", type:"Event",       note:"Met at CBS Finance Club Goldman night. She remembered me when I followed up — shows value of standing out at events." },
  { id:6, alumId:3,  date:"2026-04-07", type:"Email",       note:"David reviewed resume — suggested highlighting AI/Digital transformation projects more and quantifying PwC project outcomes." },
  { id:7, alumId:6,  date:"2026-04-03", type:"Coffee Chat", note:"Priya walked through McKinsey CBS on-campus recruiting. First round late October, finals in November. Join CBS Consulting Club case team ASAP." },
];

const OFFERS = [
  { id:1, user:"Anonymous CBS '26", company:"Goldman Sachs", role:"Investment Banking Associate",  date:"2026-04-12", likes:24,
    comments:[
      { id:1, user:"CBS '27", text:"Congrats!! Was this through on-campus or off-cycle?", date:"2026-04-12" },
      { id:2, user:"Anonymous CBS '27", text:"Which group? TMT or Healthcare?", date:"2026-04-13" },
      { id:3, user:"CBS '26", text:"Huge! GS IB is a dream. How many rounds total?", date:"2026-04-13" },
    ]
  },
  { id:2, user:"CBS '26", company:"McKinsey",  role:"Associate",                    date:"2026-04-10", likes:31,
    comments:[
      { id:1, user:"CBS '27", text:"This is so inspiring. Which office?", date:"2026-04-10" },
      { id:2, user:"Anonymous CBS '28", text:"Did you come from a consulting background pre-MBA?", date:"2026-04-11" },
    ]
  },
  { id:3, user:"Anonymous CBS '26", company:"Google", role:"Strategy & Operations Mgr", date:"2026-04-08", likes:18,
    comments:[
      { id:1, user:"CBS '27", text:"S&O at Google is amazing. Which team — ads, cloud, or hardware?", date:"2026-04-09" },
      { id:2, user:"CBS '27", text:"How was the interview process? Heard it's a lot of case + data.", date:"2026-04-09" },
    ]
  },
  { id:4, user:"CBS '26", company:"Blackstone", role:"Private Equity Associate",     date:"2026-04-06", likes:42,
    comments:[
      { id:1, user:"Anonymous CBS '27", text:"Blackstone PE 🔥 RE or Corporate PE?", date:"2026-04-07" },
      { id:2, user:"CBS '26", text:"Incredible. Did you go IB → PE or MBA direct?", date:"2026-04-07" },
      { id:3, user:"CBS '27", text:"This is the dream path. Congrats!!!", date:"2026-04-08" },
    ]
  },
  { id:5, user:"Anonymous CBS '26", company:"Netflix", role:"Strategy & Finance Associate", date:"2026-04-04", likes:15,
    comments:[
      { id:1, user:"CBS '27", text:"S&F at Netflix is such a great rotational program. Congrats!", date:"2026-04-05" },
    ]
  },
];

const NEWS = [
  { id:1,  ind:"tech",       company:"OpenAI",        cat:"AI · Models",      title:"GPT-5 sets new capability ceiling — enterprise AI adoption timelines compress by 2 years",                 tag:"#GPT5",           date:"2026-04-14", summary:"OpenAI's GPT-5 dramatically outperforms prior benchmarks, with particular strength in multi-step reasoning and code. Enterprise API is live; consumer rollout follows next month. This is forcing competitors to accelerate roadmaps and is reshaping how companies think about AI deployment timelines." },
  { id:2,  ind:"tech",       company:"NVIDIA",        cat:"Hardware & Infra", title:"Blackwell Ultra ships to hyperscalers, cutting LLM training costs by 60%",                                 tag:"#AIInfra",        date:"2026-04-13", summary:"NVIDIA's Blackwell Ultra GPU is now shipping to Google, AWS, and Microsoft Azure. HBM4 memory architecture slashes large model training costs significantly, making it viable for mid-market companies to train proprietary models. Demand is outpacing supply by 3x through year-end." },
  { id:3,  ind:"tech",       company:"Microsoft",     cat:"Product",          title:"Copilot bundled into all M365 tiers — Microsoft bets AI is now a commodity feature",                       tag:"#Copilot",        date:"2026-04-12", summary:"Microsoft is removing the $30/month Copilot add-on and bundling AI capabilities into all Office 365 plans. This directly challenges Google Workspace AI features and raises the baseline expectation for productivity software globally." },
  { id:4,  ind:"tech",       company:"Apple",         cat:"Product",          title:"Apple Intelligence expands to 40 languages with iOS 19.4 — Asian markets now fully supported",            tag:"#AppleAI",        date:"2026-04-11", summary:"Apple's on-device AI now supports Korean, Japanese, and 38 other languages. The key differentiator remains privacy — processing stays on-device. This is Apple's biggest AI expansion since the original launch and is expected to drive significant iPhone upgrade cycles in Asia." },
  { id:5,  ind:"tech",       company:"Google",        cat:"AI Strategy",      title:"Google DeepMind consolidation yields Gemini 2.0 Ultra — takes multimodal benchmark crown",               tag:"#Gemini",         date:"2026-04-10", summary:"Following the DeepMind-Google Brain merger, the unified AI research organization has released Gemini 2.0 Ultra, which leads on multimodal benchmarks. Real-time video understanding is the flagship capability — the demo shows live camera-to-answer response under 100ms." },
  { id:6,  ind:"consulting", company:"McKinsey",      cat:"Research",         title:"McKinsey Global Institute: AI execution gap widens — only 12% of firms achieve at-scale ROI",            tag:"#AIStrategy",     date:"2026-04-13", summary:"McKinsey's annual CEO survey shows a widening gulf between AI ambition and execution. Only 12% of firms that invested heavily in AI are seeing material returns. The report points to talent gaps, change management failures, and siloed data as the primary blockers. This is driving demand for MBA-level AI strategy consultants." },
  { id:7,  ind:"consulting", company:"BCG",           cat:"Digital Ventures", title:"BCG X launches 10 new AI-native ventures, signaling shift from advisory to build-and-scale model",       tag:"#BCGx",           date:"2026-04-11", summary:"BCG X, the firm's venture building arm, has launched 10 new AI-native companies in Q1 2026 across healthcare diagnostics, climate tech, and enterprise productivity. This shift reflects consulting firms' evolution from pure advisory toward equity-stake venture co-creation — a significant career path change for MBAs." },
  { id:8,  ind:"consulting", company:"Bain",          cat:"M&A Advisory",     title:"Bain's PE advisory practice posts record Q1 — buyout deal volume recovering faster than expected",      tag:"#BainPE",         date:"2026-04-09", summary:"Bain's PE advisory division had its strongest Q1 since 2021 as deal volume recovers. The firm's private equity practice — one of the most coveted CBS exit paths — is expanding its associate class. Bain's strength in due diligence and operational improvement makes it uniquely valuable to PE clients." },
  { id:9,  ind:"finance",    company:"Goldman Sachs", cat:"AI in Banking",    title:"Goldman's AI-assisted deal platform processes 3× more memos per analyst — IB staffing model shifts",    tag:"#GoldmanAI",      date:"2026-04-12", summary:"Goldman Sachs has deployed an internal LLM that drafts initial CIMs, pitchbooks, and deal memos. Analysts report 3x throughput improvement. Senior bankers spend more time on client judgment and deal strategy. The implication: fewer junior hires but higher-caliber work expected of those who are brought in." },
  { id:10, ind:"finance",    company:"JPMorgan",      cat:"Markets & Trading", title:"JPMorgan's LLM-powered trading desk executes $2T in notional trades in Q1 2026",                       tag:"#AlgoTrading",    date:"2026-04-10", summary:"JPMorgan's LOXM trading AI now handles a meaningful share of equities order execution. The model incorporates real-time sentiment data from earnings calls, SEC filings, and news feeds. This marks a significant milestone in institutional adoption of LLM-driven quantitative strategies." },
  { id:11, ind:"finance",    company:"BlackRock",     cat:"Asset Management",  title:"Aladdin 2.0 integrates generative AI for real-time portfolio stress testing at institutional scale",    tag:"#Aladdin",        date:"2026-04-09", summary:"BlackRock has launched Aladdin 2.0 with generative AI-driven scenario modeling. Portfolio managers can now run natural language queries against the full risk system — 'What happens to this portfolio if PCE stays above 3% for 18 months?' The system manages $21T in assets under advisement." },
  { id:12, ind:"pe_vc",      company:"KKR",           cat:"Private Equity",   title:"KKR closes $20B flagship buyout fund — largest close since 2019, signals PE market recovery",            tag:"#PE",             date:"2026-04-11", summary:"KKR's Americas Fund XIV closed at $20B, making it the largest PE fundraise since 2019. LP appetite has returned as rate expectations stabilize. The fund will focus on technology buyouts, healthcare services, and infrastructure — the three sectors with the most pricing power in the current environment." },
  { id:13, ind:"pe_vc",      company:"a16z",          cat:"Venture Capital",   title:"a16z leads $500M into Physical AI — robotics and embodied intelligence take center stage in VC",         tag:"#PhysicalAI",     date:"2026-04-09", summary:"Andreessen Horowitz has committed $500M across 8 Physical AI investments in Q1 2026. The thesis: as LLMs commoditize, the next value frontier is embedding intelligence into the physical world. Companies building robotics foundation models, manipulation systems, and autonomous industrial agents are the focus." },
  { id:14, ind:"pe_vc",      company:"Blackstone",    cat:"Real Assets",       title:"BREIT hits $150B AUM as retail alternative investment demand surges globally",                          tag:"#BREIT",          date:"2026-04-08", summary:"Blackstone's non-traded REIT surpassed $150B in AUM, driven by global wealth management distribution. The vehicle democratizes access to institutional-quality real estate for high-net-worth individuals. Blackstone is expanding distribution partnerships with wirehouses and independent advisors globally." },
  { id:15, ind:"healthcare", company:"J&J",           cat:"MedTech",           title:"J&J's AI-guided surgical robot gets FDA clearance — inflection point for robotic surgery adoption",     tag:"#MedTech",        date:"2026-04-13", summary:"Johnson & Johnson's OTTAVA robotic surgery platform received FDA 510(k) clearance for general laparoscopic procedures. The AI guidance layer reduces surgeon cognitive load by handling instrument targeting and tissue identification. J&J projects $3B in robotics revenue by 2030." },
  { id:16, ind:"healthcare", company:"UnitedHealth",  cat:"Health Systems",    title:"Optum AI triage reduces ER wait times 35% across 500 hospitals — scale-up to 2,000 sites planned",   tag:"#Optum",          date:"2026-04-11", summary:"UnitedHealth's Optum division completed a massive pilot of its AI-powered emergency triage system. By predicting patient acuity and routing upon arrival, average wait times dropped 35%. The system uses NLP to parse chief complaints and structured data to predict deterioration risk." },
  { id:17, ind:"healthcare", company:"Moderna",       cat:"Biotech",           title:"mRNA platform pivots to oncology — 6 personalized cancer vaccines now in Phase II trials",             tag:"#mRNA",           date:"2026-04-09", summary:"Moderna is leveraging its mRNA manufacturing expertise to build individualized neoantigen vaccines. Each vaccine is custom-synthesized based on genomic sequencing of a patient's tumor. Phase II data in melanoma and lung cancer will read out in late 2026, potentially validating a new treatment paradigm." },
  { id:18, ind:"consumer",   company:"Nike",          cat:"Brand Strategy",    title:"Nike DTC revenue surpasses wholesale for first time — membership model drives the structural shift",    tag:"#DTC",            date:"2026-04-12", summary:"Nike's direct-to-consumer revenue exceeded its wholesale business for the first time in Q1 2026. The company's membership program now has 90M active members who spend 3x more than non-members. This is the culmination of a 5-year strategy to regain brand premium and margin through direct relationships." },
  { id:19, ind:"consumer",   company:"LVMH",          cat:"Luxury",            title:"LVMH's $2B digital experience investment turns stores into content studios for Gen Z luxury",          tag:"#LuxuryTech",     date:"2026-04-10", summary:"LVMH is retrofitting flagship stores across Paris, NYC, and Tokyo into immersive content production environments. The bet: Gen Z luxury consumers discover through social media but still want tactile retail experiences. The investment covers AR try-on, in-store filming infrastructure, and creator residency programs." },
  { id:20, ind:"consumer",   company:"P&G",           cat:"Consumer Goods",    title:"P&G deploys generative AI across 50 brands — personalizing product formulations at individual scale", tag:"#ConsumerAI",     date:"2026-04-08", summary:"Procter & Gamble has launched an AI system that can customize product formulations based on consumer skin type, climate, and preference data. Starting with skincare, the platform enables mass personalization at scale. P&G sees this as a moat against private label competition." },
  { id:21, ind:"media",      company:"Netflix",       cat:"Streaming",         title:"Netflix ad-supported tier hits 70M subscribers — advertising now 25% of total revenue",               tag:"#NetflixAds",     date:"2026-04-13", summary:"Netflix's ad tier has grown faster than any previous product launch in the company's history. At 70M subscribers paying $7-15/month with ads, the monetization per engagement hour now rivals linear TV. Netflix is building a full-stack ad tech platform to replace its reliance on Microsoft's infrastructure." },
  { id:22, ind:"media",      company:"Spotify",       cat:"Audio",             title:"Spotify AI DJ drives 20% increase in daily listening time — reshaping music discovery economics",      tag:"#SpotifyAI",      date:"2026-04-11", summary:"Spotify's AI DJ, which creates personalized radio experiences with context-aware narration, has driven a 20% increase in daily active listening time. The product creates a new surface for podcast-music hybrid content and significantly improves ad inventory quality by keeping users engaged longer." },
  { id:23, ind:"media",      company:"Disney",        cat:"Entertainment",     title:"Disney streaming turns profitable — content cost discipline and sports rights key to the turnaround",  tag:"#Disney",         date:"2026-04-09", summary:"Disney+ and Hulu combined reached profitability in Q1 2026 after years of losses. The turnaround came from content spending rationalization (down 18% YoY) and the addition of live sports content through the ESPN bundle. Bob Iger's content quality over quantity strategy appears to be working." },
  { id:24, ind:"energy",     company:"BP",            cat:"Energy Transition", title:"BP exits offshore wind, redirects $10B to low-carbon LNG and green hydrogen through 2028",            tag:"#EnergyTransition",date:"2026-04-12", summary:"BP announced a strategic pivot away from offshore wind after persistent margin disappointments, redirecting capital to lower-carbon natural gas and green hydrogen projects. The move reflects a broader industry reassessment of wind economics amid supply chain inflation and permitting delays." },
  { id:25, ind:"energy",     company:"Siemens",       cat:"Industrials",       title:"Siemens Energy wins 40-country grid contract as global electricity demand surges with AI datacenters",  tag:"#Siemens",        date:"2026-04-10", summary:"Siemens Energy secured a landmark grid stabilization contract covering 40 countries as AI datacenter power demand creates grid stress globally. The contract is worth €8B over 5 years and covers transformer manufacturing, grid management software, and on-site storage solutions." },
  { id:26, ind:"realestate", company:"Brookfield",    cat:"Real Assets",       title:"Brookfield raises $25B decarbonization fund — largest climate-focused real assets vehicle on record",  tag:"#Brookfield",     date:"2026-04-11", summary:"Brookfield's Renewable Transition Fund III closed at $25B, targeting decarbonization of existing real estate and infrastructure assets. The strategy focuses on retrofitting commercial real estate with solar, heat pumps, and building management AI — generating both ESG and financial returns." },
  { id:27, ind:"realestate", company:"CBRE",          cat:"CRE Trends",        title:"CBRE: AI-driven office demand recovery — tech tenants re-leasing premium space in NYC and SF",         tag:"#CBRE",           date:"2026-04-09", summary:"CBRE's Q1 2026 market report shows tech companies re-entering the office leasing market at premium. AI companies requiring collaboration-dense work environments are driving absorption in Class A buildings. NYC Midtown and SF SoMa are the primary beneficiaries, with asking rents up 12% YoY." },
  { id:28, ind:"nonprofit",  company:"World Bank",    cat:"Development Finance",title:"World Bank commits $30B to climate adaptation in emerging markets — largest single-fund mobilization", tag:"#WorldBank",      date:"2026-04-12", summary:"The World Bank's new Climate Resilience Fund represents the largest single mobilization of climate finance in the institution's history. The capital will flow to 50 countries for infrastructure hardening, agricultural adaptation, and coastal protection. 30% is earmarked for women-led community projects." },
  { id:29, ind:"nonprofit",  company:"Gates Foundation",cat:"Global Health",   title:"Gates Foundation AI disease surveillance detects 3 novel outbreak signals in Q1 2026",               tag:"#GlobalHealth",   date:"2026-04-10", summary:"The Gates Foundation's global health AI network, which ingests data from 180 countries including hospital records, pharmacy sales, and social media, flagged three potential novel outbreak signals in Q1 2026. Two were false positives; one led to early containment of a respiratory variant in Southeast Asia." },
  { id:30, ind:"nonprofit",  company:"IMF",           cat:"Economics",         title:"IMF World Economic Outlook: AI productivity gains could add 7% to global GDP by 2030",                tag:"#IMF",            date:"2026-04-08", summary:"The IMF's flagship economic report quantifies the potential productivity dividend from AI adoption at 7% of global GDP by 2030, contingent on widespread deployment and reskilling investment. The report warns that without proactive policy, AI benefits will concentrate in high-income countries, widening global inequality." },
];

const SC = { "New":"#10B981","Connected":"#1D4F91","Scheduled":"#F59E0B","Followed Up":"#6CACE4","Not Contacted":"#94A3B8" };
const EVC = { "Info Session":"#1D4F91","Workshop":"#7C3AED","Networking":"#10B981","Speaker":"#F59E0B","Panel":"#0891B2" };
const TABS = [
  { id:"dashboard",label:"Dashboard",icon:"⊞" },
  { id:"alumni",   label:"Alumni",   icon:"👥" },
  { id:"tracker",  label:"Tracker",  icon:"📊" },
  { id:"events",   label:"Events",   icon:"📅" },
  { id:"news",     label:"News",     icon:"📰" },
];

/* ── Atoms ── */
const Av = ({i,size=36,color=C.blue}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:color,color:"#fff",fontWeight:700,fontSize:Math.floor(size*0.33),flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{i}</div>
);
const Tag = ({label,color}) => (
  <span style={{fontSize:11,fontWeight:600,color,background:color+"22",border:`1px solid ${color}44`,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap",display:"inline-block"}}>{label}</span>
);
const Card = ({children,style={},onClick}) => (
  <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",...style}} onClick={onClick}>{children}</div>
);
const Btn = ({children,active=false,color=C.blue,onClick,style={}}) => (
  <button onClick={onClick} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${active?color:C.border}`,background:active?color:"#F1F5F9",color:active?"#fff":C.muted,padding:"7px 14px",fontSize:12,fontWeight:600,lineHeight:1.4,whiteSpace:"nowrap",...style}}>{children}</button>
);

/* ── Modal wrapper ── */
const Modal = ({title,onClose,children,wide=false}) => (
  <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#fff",borderRadius:"16px 16px 0 0",width:"100%",maxWidth:wide?700:500,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -4px 32px rgba(0,0,0,0.15)"}}>
      <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:700,color:C.navy}}>{title}</div>
        <button onClick={onClose} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:C.soft,lineHeight:1,padding:"2px 6px"}}>✕</button>
      </div>
      <div style={{overflowY:"auto",flex:1,padding:"16px 20px 24px"}}>{children}</div>
    </div>
  </div>
);

/* ── Lion ── */
const Lion = ({size=30}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{flexShrink:0}}>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(r=>(
      <ellipse key={r} cx="50" cy="20" rx="5.5" ry="10" fill="#1D4F91" transform={`rotate(${r} 50 50)`}/>
    ))}
    <circle cx="50" cy="50" r="27" fill="#1D4F91"/>
    <ellipse cx="31" cy="30" rx="8" ry="9" fill="#003865"/>
    <ellipse cx="69" cy="30" rx="8" ry="9" fill="#003865"/>
    <ellipse cx="31" cy="30" rx="4" ry="5" fill="#B9D9EB" opacity="0.5"/>
    <ellipse cx="69" cy="30" rx="4" ry="5" fill="#B9D9EB" opacity="0.5"/>
    <circle cx="50" cy="52" r="21" fill="#003865"/>
    <ellipse cx="42" cy="47" rx="4.5" ry="4" fill="#B9D9EB"/>
    <ellipse cx="58" cy="47" rx="4.5" ry="4" fill="#B9D9EB"/>
    <circle cx="42" cy="47" r="2" fill="#001F3F"/>
    <circle cx="58" cy="47" r="2" fill="#001F3F"/>
    <circle cx="43" cy="46" r="0.8" fill="#fff"/>
    <circle cx="59" cy="46" r="0.8" fill="#fff"/>
    <ellipse cx="50" cy="55" rx="5" ry="3.5" fill="#B9D9EB"/>
    <path d="M45 59 Q50 64 55 59" stroke="#B9D9EB" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <line x1="50" y1="58" x2="50" y2="61" stroke="#B9D9EB" strokeWidth="1.2"/>
    {[[37,56],[40,58],[37,60],[63,56],[60,58],[63,60]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1" fill="#6CACE4"/>
    ))}
    <path d="M36 27 L40 20 L45 25 L50 17 L55 25 L60 20 L64 27" stroke="#B9D9EB" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/* ── AlumniSearch: App 외부 독립 컴포넌트 (포커스 유지) ── */
function AlumniPage({
  alumInd, setAlumInd, alumQ, setAlumQ,
  selAlum, setSelAlum,
  setEmailModal, setDraft, setLogModal, setTrkAlum,
  setTab, setMenuOpen,
  isMobile, p
}) {
  const go = (t) => { setTab(t); setMenuOpen(false); setSelAlum(null); };
  const Sec = ({children}) => <div style={{maxWidth:860,margin:"0 auto",padding:"16px 16px 60px"}}>{children}</div>;

  const fAlumni = ALUMNI.filter(a => {
    const q = alumQ.toLowerCase();
    return (alumInd==="All" || a.industry===alumInd)
      && (!q || a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  });

  if (selAlum) {
    const ind = INDUSTRIES.find(x=>x.id===selAlum.industry);
    const ic = ind?.color || C.blue;
    return (
      <Sec>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button onClick={()=>setSelAlum(null)} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${C.border}`,background:"#F1F5F9",color:C.muted,padding:"7px 14px",fontSize:12,fontWeight:600}}>← Back</button>
          <span style={{fontSize:13,color:C.muted}}>Alumni Directory</span>
        </div>
        <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",marginBottom:14}}>
          <div style={{height:4,background:ic}}/>
          <div style={{padding:p}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:ic,color:"#fff",fontWeight:700,fontSize:18,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{selAlum.av}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:isMobile?16:18,fontWeight:700,color:C.navy,marginBottom:4,fontFamily:"'Playfair Display',serif"}}>{selAlum.name}</div>
                <div style={{fontSize:13,color:C.muted,marginBottom:6}}>{selAlum.role}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  <span style={{fontSize:11,fontWeight:600,color:ic,background:ic+"22",border:`1px solid ${ic}44`,padding:"2px 8px",borderRadius:20}}>{selAlum.company}</span>
                  <span style={{fontSize:11,fontWeight:600,color:ic,background:ic+"22",border:`1px solid ${ic}44`,padding:"2px 8px",borderRadius:20}}>{ind?.label}</span>
                  <span style={{fontSize:11,color:C.soft,alignSelf:"center"}}>{selAlum.cls}</span>
                </div>
                <span style={{fontSize:11,fontWeight:600,color:SC[selAlum.status]||C.blue,background:(SC[selAlum.status]||C.blue)+"22",border:`1px solid ${(SC[selAlum.status]||C.blue)}44`,padding:"2px 8px",borderRadius:20}}>{selAlum.status}</span>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
              <button onClick={()=>{setEmailModal(selAlum);setDraft("");}} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${ic}`,background:ic,color:"#fff",padding:"7px 14px",fontSize:12,fontWeight:600}}>✉ Draft Cold Email</button>
              <button onClick={()=>setLogModal(selAlum)} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${C.border}`,background:"#F1F5F9",color:C.muted,padding:"7px 14px",fontSize:12,fontWeight:600}}>📝 Log Interaction</button>
              <button onClick={()=>{setTrkAlum(selAlum);go("tracker");}} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${C.border}`,background:"#F1F5F9",color:C.muted,padding:"7px 14px",fontSize:12,fontWeight:600}}>📊 View Timeline</button>
            </div>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",marginBottom:14}}>
          <div style={{padding:p,borderBottom:`1px solid ${C.border}`}}><h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>💬 Notes & Context</h3></div>
          <div style={{padding:p}}>
            <p style={{fontSize:13,color:C.text,lineHeight:1.65,margin:0}}>{selAlum.note}</p>
            <p style={{fontSize:11,color:C.soft,margin:"8px 0 0"}}>Last contact: {selAlum.last}</p>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden"}}>
          <div style={{padding:p,borderBottom:`1px solid ${C.border}`}}><h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>🎓 Interview Prep — {selAlum.company}</h3></div>
          <div style={{padding:p,display:"flex",flexDirection:"column",gap:10}}>
            {[
              {label:"Process", val:"Typically 4–5 rounds: phone screen, case/technical, behavioral, and a final panel. Expect 6–8 weeks total."},
              {label:"Key Skills", val:selAlum.industry==="tech"?"Product thinking, data fluency, cross-functional leadership, SQL basics.":selAlum.industry==="consulting"?"Problem structuring, hypothesis-driven thinking, executive communication, case interviews.":selAlum.industry==="finance"?"Financial modeling, valuation (DCF, comps, LBO), sector knowledge, deal execution.":selAlum.industry==="pe_vc"?"LBO modeling, deal sourcing, portfolio ops, operator mindset.":selAlum.industry==="healthcare"?"Healthcare systems, regulatory landscape, market access, reimbursement strategy.":selAlum.industry==="consumer"?"Consumer insight, brand strategy, P&L management, go-to-market execution.":selAlum.industry==="media"?"Content strategy, monetization models, audience analytics, partnership development.":selAlum.industry==="energy"?"Energy economics, ESG integration, infrastructure finance, regulatory policy.":selAlum.industry==="realestate"?"RE finance, cap rates, development underwriting, market analysis.":"Stakeholder management, program evaluation, policy analysis, impact measurement."},
              {label:"Alumni Tip", val:`"${selAlum.note} Connect your PwC AI/Digital and RLWRLD Physical AI experience to what this role demands."`},
              {label:"CBS Resources", val:`CMC runs ${selAlum.company} prep workshops each semester. Check the CBS Alumni Interview Database for past questions.`},
            ].map(x=>(
              <div key={x.label} style={{padding:"12px 14px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:10,fontWeight:700,color:ic,textTransform:"uppercase",letterSpacing:0.5,marginBottom:5}}>{x.label}</div>
                <div style={{fontSize:13,color:C.text,lineHeight:1.65}}>{x.val}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>
    );
  }

  return (
    <Sec>
      <h2 style={{fontSize:isMobile?16:18,fontWeight:700,color:C.navy,margin:"0 0 14px",fontFamily:"'Playfair Display',serif"}}>Alumni Directory</h2>
      <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",marginBottom:14}}>
        <div style={{padding:p}}>
          <input
            value={alumQ}
            onChange={e=>setAlumQ(e.target.value)}
            placeholder="🔍  Search by name, company, or role…"
            style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:C.bg,color:C.text,boxSizing:"border-box",marginBottom:12}}
          />
          <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Filter by Industry</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>setAlumInd("All")} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${alumInd==="All"?C.blue:C.border}`,background:alumInd==="All"?C.blue:"#F1F5F9",color:alumInd==="All"?"#fff":C.muted,padding:"4px 10px",fontSize:11,fontWeight:600}}>All</button>
            {INDUSTRIES.map(ind=>(
              <button key={ind.id} onClick={()=>setAlumInd(ind.id)} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${alumInd===ind.id?ind.color:C.border}`,background:alumInd===ind.id?ind.color:"#F1F5F9",color:alumInd===ind.id?"#fff":C.muted,padding:"4px 10px",fontSize:11,fontWeight:600}}>{ind.label}</button>
            ))}
          </div>
          <div style={{fontSize:12,color:C.muted,marginTop:10}}>{fAlumni.length} alumni found</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {fAlumni.map(a=>{
          const ind=INDUSTRIES.find(x=>x.id===a.industry);
          return (
            <div key={a.id} style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",cursor:"pointer"}} onClick={()=>setSelAlum(a)}>
              <div style={{padding:p}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:ind?.color||C.blue,color:"#fff",fontWeight:700,fontSize:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{a.av}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:4}}>
                      <span style={{fontSize:14,fontWeight:700,color:C.navy}}>{a.name}</span>
                      <span style={{fontSize:11,fontWeight:600,color:SC[a.status]||C.blue,background:(SC[a.status]||C.blue)+"22",border:`1px solid ${(SC[a.status]||C.blue)}44`,padding:"2px 8px",borderRadius:20}}>{a.status}</span>
                    </div>
                    <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{a.role}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,fontWeight:600,color:ind?.color||C.blue,background:(ind?.color||C.blue)+"22",border:`1px solid ${(ind?.color||C.blue)}44`,padding:"2px 8px",borderRadius:20}}>{a.company}</span>
                      <span style={{fontSize:11,fontWeight:600,color:ind?.color||C.blue,background:(ind?.color||C.blue)+"22",border:`1px solid ${(ind?.color||C.blue)}44`,padding:"2px 8px",borderRadius:20}}>{ind?.label}</span>
                      <span style={{fontSize:11,color:C.soft,alignSelf:"center"}}>{a.cls}</span>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <button onClick={e=>{e.stopPropagation();setEmailModal(a);setDraft("");}} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${ind?.color||C.blue}`,background:ind?.color||C.blue,color:"#fff",padding:"7px 14px",fontSize:11,fontWeight:600,flex:1}}>✉ Email</button>
                  <button onClick={e=>{e.stopPropagation();setLogModal(a);}} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${C.border}`,background:"#F1F5F9",color:C.muted,padding:"7px 14px",fontSize:11,fontWeight:600,flex:1}}>📝 Log</button>
                  <span style={{marginLeft:"auto",alignSelf:"center",fontSize:12,color:C.soft}}>View profile →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

function NewsPage({newsInd, setNewsInd, newsQ, setNewsQ, setNewsDetail, isMobile, p}) {
  const Sec = ({children}) => <div style={{maxWidth:860,margin:"0 auto",padding:"16px 16px 60px"}}>{children}</div>;

  const fNews = NEWS.filter(n=>{
    const q = newsQ.toLowerCase();
    return (newsInd==="All" || n.ind===newsInd)
      && (!q || n.title.toLowerCase().includes(q) || n.company.toLowerCase().includes(q) || n.cat.toLowerCase().includes(q) || n.tag.toLowerCase().includes(q));
  });

  return (
    <Sec>
      <h2 style={{fontSize:isMobile?16:18,fontWeight:700,color:C.navy,margin:"0 0 14px",fontFamily:"'Playfair Display',serif"}}>Industry News Feed</h2>
      <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",marginBottom:14}}>
        <div style={{padding:p}}>
          <input
            value={newsQ}
            onChange={e=>setNewsQ(e.target.value)}
            placeholder="🔍  Search news, companies, topics…"
            style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:C.bg,color:C.text,boxSizing:"border-box",marginBottom:12}}
          />
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>setNewsInd("All")} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${newsInd==="All"?C.blue:C.border}`,background:newsInd==="All"?C.blue:"#F1F5F9",color:newsInd==="All"?"#fff":C.muted,padding:"4px 10px",fontSize:11,fontWeight:600}}>All Industries</button>
            {INDUSTRIES.map(ind=>(
              <button key={ind.id} onClick={()=>setNewsInd(ind.id)} style={{fontFamily:"inherit",cursor:"pointer",borderRadius:8,border:`1px solid ${newsInd===ind.id?ind.color:C.border}`,background:newsInd===ind.id?ind.color:"#F1F5F9",color:newsInd===ind.id?"#fff":C.muted,padding:"4px 10px",fontSize:11,fontWeight:600}}>{ind.label}</button>
            ))}
          </div>
          <div style={{fontSize:12,color:C.muted,marginTop:10}}>{fNews.length} stories</div>
        </div>
      </div>

      {newsInd==="All" && !newsQ ? (
        INDUSTRIES.map(ind=>{
          const indNews = NEWS.filter(n=>n.ind===ind.id);
          if(!indNews.length) return null;
          return (
            <div key={ind.id} style={{marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:4,height:18,borderRadius:2,background:ind.color,flexShrink:0}}/>
                <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>{ind.label}</h3>
                <span style={{fontSize:11,color:ind.color,background:ind.color+"18",padding:"1px 8px",borderRadius:20,fontWeight:600}}>{indNews.length}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {indNews.map(n=>(
                  <div key={n.id} style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",cursor:"pointer",borderLeft:`3px solid ${ind.color}`}} onClick={()=>setNewsDetail(n)}>
                    <div style={{padding:"12px 16px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:6}}>
                        <div style={{display:"flex",gap:6}}>
                          <span style={{fontSize:11,fontWeight:600,color:ind.color,background:ind.color+"22",border:`1px solid ${ind.color}44`,padding:"2px 8px",borderRadius:20}}>{n.company}</span>
                          <span style={{fontSize:11,fontWeight:600,color:C.muted,background:C.muted+"22",border:`1px solid ${C.muted}44`,padding:"2px 8px",borderRadius:20}}>{n.cat}</span>
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span style={{fontSize:11,fontWeight:600,color:ind.color}}>{n.tag}</span>
                          <span style={{fontSize:11,color:C.soft}}>{n.date}</span>
                        </div>
                      </div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.5}}>{n.title}</div>
                      <div style={{fontSize:12,color:C.muted,marginTop:6}}>Tap to read summary →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {fNews.length===0 ? (
            <div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,padding:"40px 20px",textAlign:"center"}}>
              <div style={{fontSize:13,color:C.soft}}>No stories match your search.</div>
            </div>
          ) : fNews.map(n=>{
            const ind = INDUSTRIES.find(x=>x.id===n.ind);
            return (
              <div key={n.id} style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 1px 6px rgba(0,48,101,0.07)",overflow:"hidden",cursor:"pointer",borderLeft:`3px solid ${ind?.color||C.blue}`}} onClick={()=>setNewsDetail(n)}>
                <div style={{padding:"12px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:6}}>
                    <div style={{display:"flex",gap:6}}>
                      <span style={{fontSize:11,fontWeight:600,color:ind?.color||C.blue,background:(ind?.color||C.blue)+"22",border:`1px solid ${(ind?.color||C.blue)}44`,padding:"2px 8px",borderRadius:20}}>{n.company}</span>
                      <span style={{fontSize:11,fontWeight:600,color:C.muted,background:C.muted+"22",border:`1px solid ${C.muted}44`,padding:"2px 8px",borderRadius:20}}>{n.cat}</span>
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:600,color:ind?.color||C.blue}}>{n.tag}</span>
                      <span style={{fontSize:11,color:C.soft}}>{n.date}</span>
                    </div>
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.5}}>{n.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Sec>
  );
}

/* ═══════════════════════════════════════════ */
export default function App() {
  const [tab, setTab]           = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  // Alumni
  const [alumInd, setAlumInd]   = useState("All");
  const [alumQ, setAlumQ]         = useState("");
  const [selAlum, setSelAlum]   = useState(null);

  // Email modal
  const [emailModal, setEmailModal] = useState(null); // alumni object
  const [draft, setDraft]           = useState("");
  const [genning, setGenning]       = useState(false);

  // Tracker
  const [entries, setEntries]   = useState(INIT_ENTRIES);
  const [logModal, setLogModal] = useState(null); // alumni object
  const newNoteRef              = useRef("");
  const [noteT, setNoteT]       = useState("Email");
  const [noteDate, setNoteDate] = useState(new Date().toISOString().slice(0,10));
  const [trkAlum, setTrkAlum]   = useState(null);

  // Events calendar
  const [calView, setCalView]   = useState("list"); // list | month | week
  const [calMonth, setCalMonth] = useState(new Date("2026-04-01"));

  // News
  const [newsInd, setNewsInd]   = useState("All");
  const [newsQ, setNewsQ]         = useState("");
  const [newsDetail, setNewsDetail] = useState(null);

  // Offers
  const [rsvpd, setRsvpd]                   = useState([]);
  const [offerLikes, setOfferLikes]         = useState([]);
  const [openOfferComments, setOpenOfferComments] = useState(null);
  const [userComments, setUserComments]     = useState({}); // {offerId: [{id, text, date}]}
  const logDate                             = useRef(new Date().toISOString().slice(0,10));

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(()=>{
    const fn=()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[]);

  const go = (t) => { setTab(t); setMenuOpen(false); setSelAlum(null); };
  const p = isMobile ? "12px 14px" : "16px 20px";


  // Email generation
  const genEmail = async (a) => {
    setGenning(true);
    await new Promise(r=>setTimeout(r,1100));
    const ind = INDUSTRIES.find(x=>x.id===a.industry);
    const templates = {
      tech: `Subject: Coffee Chat Request — CBS MBA Student (Tech & AI Background)\n\nHi ${a.name.split(" ")[0]},\n\nI hope this message finds you well! My name is Inseok Lee, and I'm a first-year MBA student at Columbia Business School (Class of 2028) with a background in AI/Digital strategy consulting at PwC Korea and Physical AI strategy at RLWRLD, a Korean robotics foundation model startup.\n\nI came across your profile and was genuinely inspired by your journey to ${a.role} at ${a.company}. Given my focus on transitioning into tech strategy and operations post-MBA, I'd love to hear how you navigated your path from CBS and what you'd do differently if starting over.\n\nWould you be open to a 20–30 minute virtual coffee chat at your convenience? I'm happy to work around your schedule.\n\nThank you so much for considering this.\n\nBest,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu\nLinkedIn: linkedin.com/in/inseoklee`,
      consulting: `Subject: Coffee Chat Request — CBS MBA '28 (Consulting Background)\n\nHi ${a.name.split(" ")[0]},\n\nI hope this finds you well! I'm Inseok Lee, a first-year student at Columbia Business School (Class of 2028). Prior to CBS, I spent several years at PwC Korea as an AI and digital transformation consultant, working end-to-end on strategy through system implementation for large enterprise clients.\n\nI'm exploring consulting post-MBA and would love to learn about your experience at ${a.company} — particularly how the work differs from pre-MBA consulting and what makes for a strong CBS candidate for your group.\n\nWould you be open to a 20–30 minute call at your convenience?\n\nWarm regards,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu`,
      finance: `Subject: Coffee Chat Request — CBS MBA '28 Interested in ${a.company}\n\nHi ${a.name.split(" ")[0]},\n\nMy name is Inseok Lee, a first-year MBA student at Columbia Business School (Class of 2028). I have a background in strategy consulting at PwC Korea and am actively exploring finance and investment banking opportunities post-MBA.\n\nI've been particularly drawn to ${a.company}'s work in ${a.role.toLowerCase().includes("m&a")||a.role.toLowerCase().includes("banking") ? "M&A and capital markets" : "asset management and portfolio strategy"}, and your transition from CBS to ${a.company} is exactly the path I'm researching.\n\nWould you have 20–30 minutes for a virtual coffee chat? I'd be grateful for any insights about the recruiting process and day-to-day life on your team.\n\nBest regards,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu`,
      pe_vc: `Subject: Coffee Chat — CBS MBA '28, Exploring ${a.industry==="pe_vc" && a.company.includes("a16z") || a.company.includes("Sequoia") ? "VC" : "PE"}\n\nHi ${a.name.split(" ")[0]},\n\nI'm Inseok Lee, a first-year MBA student at Columbia Business School (Class of 2028). My background spans AI strategy consulting at PwC Korea and business development at RLWRLD, a Physical AI startup backed by LG, SK Telecom, and Kakao.\n\nI'm exploring ${a.company.includes("a16z")||a.company.includes("Sequoia") ? "venture capital — particularly in AI and deep tech" : "private equity, especially in technology and healthcare-adjacent sectors"}. Your path from CBS to ${a.role} at ${a.company} is one I find particularly compelling.\n\nCould we set up a 20-minute call? I have specific questions about your deal flow sourcing and what CBS students can do to stand out.\n\nThank you,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu`,
      healthcare: `Subject: Coffee Chat — CBS MBA '28 Interested in Healthcare Strategy\n\nHi ${a.name.split(" ")[0]},\n\nI hope this message finds you well! I'm Inseok Lee, a first-year student at Columbia Business School (Class of 2028) with a background in AI and digital transformation consulting. I've become increasingly interested in applying those skills to healthcare strategy, particularly at the intersection of AI and clinical operations.\n\nYour role as ${a.role} at ${a.company} is exactly the kind of position I'm targeting post-MBA. I'd love to hear about your recruiting experience, the day-to-day nature of the work, and any advice for a CBS student coming from a non-healthcare consulting background.\n\nWould a 20–30 minute call work for you?\n\nBest,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu`,
      default: `Subject: Coffee Chat Request — CBS MBA '28\n\nHi ${a.name.split(" ")[0]},\n\nMy name is Inseok Lee, and I'm a first-year MBA student at Columbia Business School (Class of 2028). Before CBS, I worked in AI/Digital strategy consulting at PwC Korea and in business development at RLWRLD, a Physical AI startup.\n\nI'm genuinely inspired by your career path to ${a.role} at ${a.company}, and I'd love to learn more about your experience and any advice you'd share with a CBS student on a similar path.\n\nWould you be open to a 20–30 minute virtual coffee chat at your convenience?\n\nThank you so much.\n\nBest regards,\nInseok Lee\nColumbia Business School, MBA '28\ninseok.lee@columbia.edu`,
    };
    setDraft(templates[a.industry] || templates.default);
    setGenning(false);
  };

  const addNote = () => {
    if (!newNoteRef.current.trim()||!logModal) return;
    setEntries(p=>[{id:Date.now(),alumId:logModal.id,date:noteDate,type:noteT,note:newNoteRef.current.trim()},...p]);
    newNoteRef.current="";
  };

  const upcoming = EVENTS.filter(e=>e.date>=new Date().toISOString().slice(0,10)).slice(0,3);

  /* ── Filtered news ── */


  /* ── Calendar helpers ── */
  const daysInMonth = (y,m)=>new Date(y,m+1,0).getDate();
  const firstDayOfMonth = (y,m)=>new Date(y,m,1).getDay();
  const eventsOnDate = (dateStr)=>EVENTS.filter(e=>e.date===dateStr);

  /* ── DRAWER ── */
  const Drawer = () => menuOpen ? (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex"}} onClick={e=>{if(e.target===e.currentTarget)setMenuOpen(false);}}>
      <div style={{flex:1,background:"rgba(0,0,0,0.45)"}} onClick={()=>setMenuOpen(false)}/>
      <div style={{width:240,background:C.navy,height:"100%",display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,0.3)",overflowY:"auto"}}>
        <div style={{padding:"16px 16px 12px",borderBottom:"1px solid rgba(255,255,255,0.1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Lion size={24}/>
            <span style={{color:"#fff",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:12}}>COLUMBIA <span style={{color:C.sky}}>IN</span> SIGHT</span>
          </div>
          <button onClick={()=>setMenuOpen(false)} style={{background:"transparent",border:"none",color:C.sky,fontSize:18,cursor:"pointer",lineHeight:1,padding:"2px 6px"}}>✕</button>
        </div>
        <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:10,alignItems:"center"}}>
          <Av i="IL" size={32} color={C.blue}/>
          <div>
            <div style={{color:"#fff",fontWeight:600,fontSize:13}}>Inseok Lee</div>
            <div style={{color:C.sky,fontSize:11}}>CBS MBA '28</div>
          </div>
        </div>
        <div style={{padding:"10px 8px",flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>go(t.id)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 12px",borderRadius:8,marginBottom:3,background:tab===t.id?"rgba(185,217,235,0.15)":"transparent",border:tab===t.id?`1px solid ${C.sky}33`:"1px solid transparent",cursor:"pointer",fontFamily:"inherit",color:tab===t.id?C.sky:"#94B8D0",fontSize:14,fontWeight:tab===t.id?600:400,textAlign:"left"}}>
              <span style={{fontSize:16}}>{t.icon}</span>{t.label}
              {tab===t.id&&<span style={{marginLeft:"auto",fontSize:8}}>●</span>}
            </button>
          ))}
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:10,color:"rgba(185,217,235,0.4)",textAlign:"center"}}>Columbia In Sight · CBS Networking</div>
      </div>
    </div>
  ) : null;

  /* ── HEADER ── */
  const Header = () => (
    <header style={{background:C.navy,position:"sticky",top:0,zIndex:200,boxShadow:"0 2px 12px rgba(0,56,101,0.3)"}}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>go("dashboard")}>
          <Lion size={isMobile?26:30}/>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:isMobile?12:14,color:"#fff",letterSpacing:-0.3,lineHeight:1.1}}>
              COLUMBIA <span style={{color:C.sky}}>IN</span> SIGHT
            </div>
            {!isMobile&&<div style={{fontSize:9,color:C.sky,opacity:0.8}}>Columbia Business School</div>}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {!isMobile&&<div style={{display:"flex",alignItems:"center",gap:7}}><Av i="IL" size={26} color={C.blue}/><span style={{color:"#fff",fontSize:12,fontWeight:600}}>Inseok · '28</span></div>}
          <button onClick={()=>setMenuOpen(true)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(185,217,235,0.3)",borderRadius:8,cursor:"pointer",padding:"8px 10px",display:"flex",flexDirection:"column",gap:4,lineHeight:0}}>
            <span style={{display:"block",width:18,height:2,background:C.sky,borderRadius:2}}/>
            <span style={{display:"block",width:18,height:2,background:C.sky,borderRadius:2}}/>
            <span style={{display:"block",width:18,height:2,background:C.sky,borderRadius:2}}/>
          </button>
        </div>
      </div>
    </header>
  );

  const Sec = ({children}) => <div style={{maxWidth:860,margin:"0 auto",padding:"16px 16px 60px"}}>{children}</div>;
  const SH = ({title}) => <h2 style={{fontSize:isMobile?16:18,fontWeight:700,color:C.navy,margin:"0 0 14px",fontFamily:"'Playfair Display',serif"}}>{title}</h2>;

  /* ═══ DASHBOARD ═══ */
  const Dashboard = () => (
    <Sec>
      <div style={{marginBottom:16}}>
        <h1 style={{fontSize:isMobile?18:20,fontWeight:700,color:C.navy,margin:0,fontFamily:"'Playfair Display',serif"}}>Good morning, Inseok 👋</h1>
        <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Your CBS networking snapshot for today.</p>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        {[
          {label:"Connected", val:ALUMNI.filter(a=>a.status==="Connected").length,  icon:"🤝",color:C.blue},
          {label:"Scheduled", val:ALUMNI.filter(a=>a.status==="Scheduled").length,   icon:"☕",color:"#F59E0B"},
          {label:"Follow-up", val:ALUMNI.filter(a=>a.status==="Followed Up").length, icon:"📬",color:"#7C3AED"},
          {label:"New",       val:ALUMNI.filter(a=>a.status==="New").length,          icon:"✨",color:"#10B981"},
        ].map(s=>(
          <Card key={s.label} style={{cursor:"pointer"}} onClick={()=>go("tracker")}>
            <div style={{padding:"14px 10px",textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:isMobile?20:24,fontWeight:700,color:s.color,lineHeight:1}}>{s.val}</div>
              <div style={{fontSize:isMobile?10:11,color:C.muted,fontWeight:500,marginTop:3}}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card style={{marginBottom:14}}>
        <div style={{padding:p,borderBottom:`1px solid ${C.border}`}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>⚡ Quick Actions</h3>
        </div>
        <div style={{padding:p,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {label:"Find an Alumni",       sub:"Browse by industry",  icon:"👥",go:"alumni"},
            {label:"Log a Note",           sub:"Track conversations",  icon:"📝",go:"tracker"},
            {label:"View Events",          sub:"Upcoming recruiting",  icon:"📅",go:"events"},
            {label:"Read Industry News",   sub:"Latest trends",        icon:"📰",go:"news"},
          ].map(a=>(
            <button key={a.label} onClick={()=>go(a.go)} style={{display:"flex",alignItems:"center",gap:10,background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 12px",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <span style={{fontSize:22}}>{a.icon}</span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:C.navy,lineHeight:1.2}}>{a.label}</div>
                <div style={{fontSize:11,color:C.soft,marginTop:2}}>{a.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card style={{marginBottom:14}}>
        <div style={{padding:p,borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>🕐 Recent Activity</h3>
          <Btn onClick={()=>go("tracker")} style={{padding:"4px 10px",fontSize:11}}>View All →</Btn>
        </div>
        <div style={{padding:`0 ${isMobile?"14px":"20px"}`}}>
          {INIT_ENTRIES.slice(0,4).map(e=>{
            const a=ALUMNI.find(x=>x.id===e.alumId);
            const ind=INDUSTRIES.find(x=>x.id===a?.industry);
            return (
              <div key={e.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
                <Av i={a?.av||"?"} size={34} color={ind?.color||C.blue}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:2}}>
                    <span style={{fontSize:13,fontWeight:600,color:C.text}}>{a?.name}</span>
                    <span style={{fontSize:11,color:C.soft,flexShrink:0}}>{e.type} · {e.date}</span>
                  </div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{e.note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card style={{marginBottom:14}}>
        <div style={{padding:p,borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>📅 Upcoming Events</h3>
          <Btn onClick={()=>go("events")} style={{padding:"4px 10px",fontSize:11}}>View All →</Btn>
        </div>
        <div style={{padding:`0 ${isMobile?"14px":"20px"}`}}>
          {upcoming.map(ev=>(
            <div key={ev.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>go("events")}>
              <div style={{width:40,textAlign:"center",flexShrink:0,paddingTop:2}}>
                <div style={{fontSize:18,fontWeight:700,color:EVC[ev.type]||C.blue,lineHeight:1}}>{ev.date.slice(8)}</div>
                <div style={{fontSize:9,color:C.soft,textTransform:"uppercase"}}>{new Date(ev.date).toLocaleString("en",{month:"short"})}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:C.navy,marginBottom:3}}>{ev.title}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Tag label={ev.type} color={EVC[ev.type]||C.blue}/>
                  <span style={{fontSize:11,color:C.muted,alignSelf:"center"}}>{ev.time} · {ev.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* News Highlights */}
      <Card style={{marginBottom:14}}>
        <div style={{padding:p,borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>📰 Industry News Highlights</h3>
          <Btn onClick={()=>go("news")} style={{padding:"4px 10px",fontSize:11}}>Full Feed →</Btn>
        </div>
        <div style={{padding:`0 ${isMobile?"14px":"20px"}`}}>
          {(()=>{
            // Pick 1 from each of 5 different industries for diversity
            const picks=["tech","consulting","finance","pe_vc","healthcare","consumer","media","energy"].reduce((acc,ind)=>{
              if(acc.length>=5) return acc;
              const n=NEWS.find(x=>x.ind===ind);
              if(n) acc.push(n);
              return acc;
            },[]);
            return picks.map(n=>{
              const ind=INDUSTRIES.find(x=>x.id===n.ind);
              return (
                <div key={n.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>{setNewsDetail(n);go("news");}}>
                  <Tag label={n.company} color={ind?.color||C.blue}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.45,marginBottom:3,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{n.title}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,color:C.muted}}>{ind?.label}</span>
                      <span style={{fontSize:11,color:ind?.color||C.light,fontWeight:600}}>{n.tag}</span>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </Card>

      {/* Offer Board */}
      <Card>
        <div style={{padding:p,borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.navy,margin:0}}>🎉 Offer Board</h3>
          <Tag label="CBS '26–'28" color={C.blue}/>
        </div>
        <div style={{padding:`0 ${isMobile?"14px":"20px"}`}}>
          {OFFERS.map(o=>{
            const isLiked=offerLikes.includes(o.id);
            const openComments=openOfferComments===o.id;
            return (
              <div key={o.id} style={{padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
                {/* Offer row */}
                <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:"#10B981",flexShrink:0,marginTop:4}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{o.company} <span style={{color:C.muted,fontWeight:400,fontSize:12}}>· {o.role}</span></div>
                    <div style={{fontSize:11,color:C.soft,marginTop:1}}>{o.user} · {o.date}</div>
                  </div>
                </div>
                {/* Like + Comment buttons */}
                <div style={{display:"flex",gap:8,paddingLeft:20}}>
                  <button onClick={()=>setOfferLikes(p=>isLiked?p.filter(x=>x!==o.id):[...p,o.id])}
                    style={{display:"flex",alignItems:"center",gap:4,background:"transparent",border:`1px solid ${isLiked?"#E0427A":C.border}`,borderRadius:20,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit",color:isLiked?"#E0427A":C.muted,fontSize:12,fontWeight:600,transition:"all 0.15s"}}>
                    {isLiked?"❤️":"🤍"} {o.likes+(isLiked?1:0)}
                  </button>
                  <button onClick={()=>setOpenOfferComments(openComments?null:o.id)}
                    style={{display:"flex",alignItems:"center",gap:4,background:"transparent",border:`1px solid ${openComments?C.blue:C.border}`,borderRadius:20,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit",color:openComments?C.blue:C.muted,fontSize:12,fontWeight:600,transition:"all 0.15s"}}>
                    💬 {o.comments.length}
                  </button>
                </div>
                {/* Comments section */}
                {openComments&&(
                  <div style={{marginTop:10,paddingLeft:20}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>{o.comments.length+(userComments[o.id]||[]).length} Comments</span>
                      <button onClick={()=>setOpenOfferComments(null)}
                        style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:20,padding:"2px 10px",cursor:"pointer",fontSize:11,color:C.muted,fontFamily:"inherit"}}>
                        Close ✕
                      </button>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                      {/* 기존 예시 댓글 */}
                      {o.comments.map(c=>(
                        <div key={c.id} style={{background:C.bg,borderRadius:8,padding:"8px 11px",border:`1px solid ${C.border}`}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                            <span style={{fontSize:11,fontWeight:700,color:C.navy}}>{c.user}</span>
                            <span style={{fontSize:10,color:C.soft}}>{c.date}</span>
                          </div>
                          <div style={{fontSize:12,color:C.text,lineHeight:1.5}}>{c.text}</div>
                        </div>
                      ))}
                      {/* 사용자가 작성한 댓글 */}
                      {(userComments[o.id]||[]).map(c=>(
                        <div key={c.id} style={{background:"#EDF4FB",borderRadius:8,padding:"8px 11px",border:`1px solid ${C.blue}33`}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                            <span style={{fontSize:11,fontWeight:700,color:C.blue}}>You · {c.date}</span>
                            <button onClick={()=>setUserComments(prev=>({...prev,[o.id]:(prev[o.id]||[]).filter(x=>x.id!==c.id)}))}
                              style={{background:"transparent",border:"none",cursor:"pointer",color:C.soft,fontSize:14,lineHeight:1,padding:"0 2px"}}>✕</button>
                          </div>
                          <div style={{fontSize:12,color:C.text,lineHeight:1.5}}>{c.text}</div>
                        </div>
                      ))}
                    </div>
                    {/* 댓글 작성창 */}
                    <div style={{display:"flex",gap:7}}>
                      <input
                        defaultValue=""
                        placeholder="Add a comment… (Enter to post)"
                        style={{flex:1,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 10px",fontSize:12,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text}}
                        onKeyDown={e=>{
                          if(e.key==="Enter"&&e.target.value.trim()){
                            const text=e.target.value.trim();
                            setUserComments(prev=>({...prev,[o.id]:[...(prev[o.id]||[]),{id:Date.now(),text,date:new Date().toISOString().slice(0,10)}]}));
                            e.target.value="";
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </Sec>
  );



    /* ═══ TRACKER ═══ */
  const Tracker = () => (
    <Sec>
      <SH title="Networking Tracker"/>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {ALUMNI.map(a=>{
          const ind=INDUSTRIES.find(x=>x.id===a.industry);
          const aEntries=entries.filter(e=>e.alumId===a.id);
          const isOpen=trkAlum?.id===a.id;
          return (
            <Card key={a.id}>
              <div style={{padding:p,cursor:"pointer"}} onClick={()=>setTrkAlum(isOpen?null:a)}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <Av i={a.av} size={36} color={ind?.color||C.blue}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
                      <span style={{fontSize:13,fontWeight:600,color:C.navy}}>{a.name}</span>
                      <div style={{display:"flex",gap:6}}>
                        <Tag label={a.status} color={SC[a.status]||C.blue}/>
                        {aEntries.length>0&&<span style={{fontSize:11,color:C.soft,alignSelf:"center"}}>{aEntries.length} note{aEntries.length>1?"s":""}</span>}
                      </div>
                    </div>
                    <div style={{fontSize:12,color:C.muted,marginTop:2}}>{a.company} · {a.role}</div>
                  </div>
                  <span style={{color:C.soft,fontSize:14,flexShrink:0,transition:"transform 0.2s",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
                </div>
              </div>
              {isOpen&&(
                <div style={{borderTop:`1px solid ${C.border}`,padding:p,background:"#FAFCFF"}}>
                  <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                    <Btn active color={ind?.color||C.blue} onClick={()=>setLogModal(a)} style={{padding:"6px 12px",fontSize:12}}>+ Log Interaction</Btn>
                    <Btn onClick={()=>{setEmailModal(a);setDraft("");}} style={{padding:"6px 12px",fontSize:12}}>✉ Draft Email</Btn>
                    <Btn onClick={()=>setSelAlum(a)} style={{padding:"6px 12px",fontSize:12}}>👤 Full Profile</Btn>
                  </div>
                  {aEntries.length===0 ? (
                    <div style={{textAlign:"center",padding:"16px 0",color:C.soft,fontSize:13}}>No entries yet — click "Log Interaction" to start tracking.</div>
                  ) : (
                    <div style={{display:"flex",flexDirection:"column"}}>
                      {aEntries.map((e,i,arr)=>(
                        <div key={e.id} style={{display:"flex",gap:12}}>
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <div style={{width:9,height:9,borderRadius:"50%",background:ind?.color||C.blue,flexShrink:0,marginTop:3}}/>
                            {i<arr.length-1&&<div style={{width:2,flex:1,background:C.border,margin:"3px 0"}}/>}
                          </div>
                          <div style={{paddingBottom:12,flex:1}}>
                            <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                              <Tag label={e.type} color={ind?.color||C.blue}/>
                              <span style={{fontSize:11,color:C.soft}}>{e.date}</span>
                            </div>
                            <div style={{fontSize:13,color:C.text,lineHeight:1.65,background:C.bg,padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`}}>{e.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Sec>
  );

  /* ═══ EVENTS ═══ */
  const Events = () => {
    const y=calMonth.getFullYear(), m=calMonth.getMonth();
    const totalDays=daysInMonth(y,m), startDay=firstDayOfMonth(y,m);
    const monthName=calMonth.toLocaleString("en",{month:"long",year:"numeric"});
    return (
      <Sec>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:14}}>
          <SH title="Events & Recruiting Calendar"/>
          <div style={{display:"flex",gap:6}}>
            {["list","month"].map(v=>(
              <Btn key={v} active={calView===v} onClick={()=>setCalView(v)} style={{padding:"5px 12px",fontSize:12,textTransform:"capitalize"}}>{v==="list"?"📋 List":"📆 Calendar"}</Btn>
            ))}
          </div>
        </div>

        {calView==="month"&&(
          <Card style={{marginBottom:14}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button onClick={()=>setCalMonth(new Date(y,m-1,1))} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:18,color:C.blue,padding:"0 6px"}}>‹</button>
              <span style={{fontSize:14,fontWeight:700,color:C.navy}}>{monthName}</span>
              <button onClick={()=>setCalMonth(new Date(y,m+1,1))} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:18,color:C.blue,padding:"0 6px"}}>›</button>
            </div>
            <div style={{padding:"10px 12px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
                  <div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:C.muted,padding:"4px 0"}}>{d}</div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                {Array.from({length:startDay}).map((_,i)=><div key={`e${i}`}/>)}
                {Array.from({length:totalDays}).map((_,i)=>{
                  const dayNum=i+1;
                  const dateStr=`${y}-${String(m+1).padStart(2,"0")}-${String(dayNum).padStart(2,"0")}`;
                  const dayEvs=eventsOnDate(dateStr);
                  const isToday=dateStr===new Date().toISOString().slice(0,10);
                  return (
                    <div key={dayNum} style={{minHeight:52,padding:"4px 3px",borderRadius:6,background:dayEvs.length>0?"#EDF4FB":isToday?"#FFF8E7":"transparent",border:isToday?`1px solid #F59E0B`:`1px solid ${dayEvs.length>0?C.border:"transparent"}`}}>
                      <div style={{fontSize:11,fontWeight:isToday?700:400,color:isToday?"#F59E0B":C.text,marginBottom:2,textAlign:"center"}}>{dayNum}</div>
                      {dayEvs.slice(0,2).map(ev=>(
                        <div key={ev.id} style={{fontSize:9,background:EVC[ev.type]||C.blue,color:"#fff",borderRadius:3,padding:"1px 4px",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.company}</div>
                      ))}
                      {dayEvs.length>2&&<div style={{fontSize:9,color:C.muted,textAlign:"center"}}>+{dayEvs.length-2}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {EVENTS.map(ev=>{
            const indObj=INDUSTRIES.find(x=>x.id===ev.ind);
            const isRsvpd=rsvpd.includes(ev.id);
            return (
              <Card key={ev.id} style={{borderLeft:`4px solid ${EVC[ev.type]||C.blue}`}}>
                <div style={{padding:p}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:8}}>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <Tag label={ev.type} color={EVC[ev.type]||C.blue}/>
                      <Tag label={ev.company} color={indObj?.color||C.blue}/>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:12,fontWeight:700,color:C.navy}}>{ev.date}</div>
                      <div style={{fontSize:11,color:C.muted}}>{ev.time}</div>
                    </div>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:3}}>{ev.title}</div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:8}}>📍 {ev.loc}</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.65,marginBottom:12}}>{ev.desc}</div>
                  <Btn active={isRsvpd} color={isRsvpd?"#10B981":C.blue}
                    onClick={()=>setRsvpd(p=>p.includes(ev.id)?p.filter(x=>x!==ev.id):[...p,ev.id])}>
                    {isRsvpd?"✓ RSVP'd":"RSVP"}
                  </Btn>
                </div>
              </Card>
            );
          })}
        </div>
      </Sec>
    );
  };





  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans','Segoe UI',sans-serif",color:C.text}}>
      <Drawer/>
      <Header/>
      {emailModal&&(()=>{
        const ind=INDUSTRIES.find(x=>x.id===emailModal.industry);
        const ic=ind?.color||C.blue;
        return (
          <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)"}} onClick={e=>{if(e.target===e.currentTarget){setEmailModal(null);setDraft("");}}}>
            <div style={{background:"#fff",borderRadius:"16px 16px 0 0",width:"100%",maxWidth:700,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -4px 32px rgba(0,0,0,0.15)"}}>
              <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:700,color:C.navy}}>Draft Email — {emailModal.name}</div>
                <button onClick={()=>{setEmailModal(null);setDraft("");}} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:C.soft,lineHeight:1,padding:"2px 6px"}}>✕</button>
              </div>
              <div style={{overflowY:"auto",flex:1,padding:"16px 20px 24px"}}>
                <div style={{display:"flex",gap:10,alignItems:"center",padding:"10px 14px",background:C.bg,borderRadius:10,marginBottom:14,border:`1px solid ${C.border}`}}>
                  <Av i={emailModal.av} size={36} color={ic}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{emailModal.name}</div>
                    <div style={{fontSize:12,color:C.muted}}>{emailModal.role} · {emailModal.company}</div>
                  </div>
                  <Tag label={ind?.label||emailModal.industry} color={ic}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                  <div style={{fontSize:12,color:C.muted}}>Personalized for {ind?.label} track</div>
                  <Btn active color={C.navy} onClick={()=>genEmail(emailModal)} style={{display:"flex",alignItems:"center",gap:6}}>
                    {genning?<><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> Generating…</>:"✨ Generate AI Draft"}
                  </Btn>
                </div>
                {draft?(
                  <>
                    <div style={{background:"#EDF4FB",borderRadius:8,padding:"7px 12px",marginBottom:10,fontSize:11,color:C.blue,fontWeight:600}}>
                      ✨ AI-generated for {ind?.label} track — personalize before sending
                    </div>
                    <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={14}
                      style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px",fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",background:"#fff",boxSizing:"border-box",color:C.text,lineHeight:1.7}}
                    />
                    <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
                      <Btn active color={ic} onClick={()=>navigator.clipboard?.writeText(draft)}>📋 Copy to Clipboard</Btn>
                      <Btn onClick={()=>setDraft("")} style={{padding:"7px 14px"}}>↺ Regenerate</Btn>
                    </div>
                  </>
                ):(
                  <div style={{textAlign:"center",padding:"30px 0",color:C.soft,fontSize:13,background:C.bg,borderRadius:10,border:`1px solid ${C.border}`}}>
                    Click <strong>✨ Generate AI Draft</strong> to create a personalized cold email for {emailModal.name.split(" ")[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
      {logModal&&(()=>{
        const ind=INDUSTRIES.find(x=>x.id===logModal.industry);
        const ic=ind?.color||C.blue;
        const recentEntries=entries.filter(e=>e.alumId===logModal.id).slice(0,3);
        return (
          <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)"}} onClick={e=>{if(e.target===e.currentTarget){setLogModal(null);setNewNote("");}}}>
            <div style={{background:"#fff",borderRadius:"16px 16px 0 0",width:"100%",maxWidth:500,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -4px 32px rgba(0,0,0,0.15)"}}>
              <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:700,color:C.navy}}>Log Interaction — {logModal.name}</div>
                <button onClick={()=>{setLogModal(null);setNewNote("");}} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:C.soft,lineHeight:1,padding:"2px 6px"}}>✕</button>
              </div>
              <div style={{overflowY:"auto",flex:1,padding:"16px 20px 24px"}}>
                <div style={{display:"flex",gap:10,alignItems:"center",padding:"10px 14px",background:C.bg,borderRadius:10,marginBottom:14,border:`1px solid ${C.border}`}}>
                  <Av i={logModal.av} size={34} color={ic}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{logModal.name}</div>
                    <div style={{fontSize:12,color:C.muted}}>{logModal.company} · {logModal.cls}</div>
                  </div>
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Interaction Type</div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {["Email","Coffee Chat","LinkedIn","Event","Call","Other"].map(t=>(
                      <Btn key={t} active={noteT===t} color={ic} onClick={()=>setNoteT(t)} style={{padding:"4px 10px",fontSize:12}}>{t}</Btn>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Date</div>
                  <input
                    type="date"
                    value={noteDate}
                    onChange={e=>setNoteDate(e.target.value)}
                    style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text,width:"100%",boxSizing:"border-box"}}
                  />
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Notes</div>
                  <textarea
                    defaultValue=""
                    onChange={e=>{newNoteRef.current=e.target.value;}}
                    placeholder="What did you discuss? Key takeaways? Next steps?"
                    rows={4}
                    key={logModal?.id}
                    style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",background:"#fff",boxSizing:"border-box",color:C.text}}
                  />
                </div>
                <Btn active color={ic} onClick={()=>{addNote();setLogModal(null);}} style={{width:"100%",padding:"10px",fontSize:13,marginBottom:16}}>
                  + Save Entry
                </Btn>
                {recentEntries.length>0&&(
                  <>
                    <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Recent History</div>
                    {recentEntries.map(e=>(
                      <div key={e.id} style={{padding:"9px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,marginBottom:6}}>
                        <div style={{display:"flex",gap:7,marginBottom:4}}>
                          <Tag label={e.type} color={ic}/>
                          <span style={{fontSize:11,color:C.soft,alignSelf:"center"}}>{e.date}</span>
                        </div>
                        <div style={{fontSize:12,color:C.text,lineHeight:1.55}}>{e.note}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}
      {newsDetail&&(()=>{
        const ind=INDUSTRIES.find(x=>x.id===newsDetail.ind);
        return (
          <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)"}} onClick={e=>{if(e.target===e.currentTarget)setNewsDetail(null);}}>
            <div style={{background:"#fff",borderRadius:"16px 16px 0 0",width:"100%",maxWidth:700,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -4px 32px rgba(0,0,0,0.15)"}}>
              <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:700,color:C.navy}}>Article Summary</div>
                <button onClick={()=>setNewsDetail(null)} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:C.soft,lineHeight:1,padding:"2px 6px"}}>✕</button>
              </div>
              <div style={{overflowY:"auto",flex:1,padding:"16px 20px 24px"}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                  <Tag label={newsDetail.company} color={ind?.color||C.blue}/>
                  <Tag label={newsDetail.cat} color={C.muted}/>
                  <span style={{fontSize:11,fontWeight:600,color:ind?.color||C.blue,alignSelf:"center"}}>{newsDetail.tag}</span>
                  <span style={{fontSize:11,color:C.soft,alignSelf:"center",marginLeft:"auto"}}>{newsDetail.date}</span>
                </div>
                <h3 style={{fontSize:16,fontWeight:700,color:C.navy,lineHeight:1.45,margin:"0 0 14px"}}>{newsDetail.title}</h3>
                <div style={{fontSize:14,color:C.text,lineHeight:1.8,padding:"16px",background:C.bg,borderRadius:10,borderLeft:`4px solid ${ind?.color||C.blue}`,marginBottom:16}}>
                  {newsDetail.summary}
                </div>
                <div style={{padding:"12px 14px",background:"#EDF4FB",borderRadius:10,border:`1px solid ${C.blue}22`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:4}}>💼 WHY THIS MATTERS FOR CBS RECRUITING</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.6}}>
                    {newsDetail.ind==="consulting"?"Consulting firms are building AI-native practices. Speaking to this trend signals digital fluency in case interviews.":
                     newsDetail.ind==="finance"?"AI is reshaping financial services. Being able to discuss these changes shows commercial awareness in banking interviews.":
                     newsDetail.ind==="pe_vc"?"Deal volume and sector focus shifts tell you which firms are hiring and what experience they value. Ask sharp questions in coffee chats.":
                     newsDetail.ind==="healthcare"?"Healthcare AI adoption is accelerating. This context is essential for McKinsey Health, J&J LCLDP, and Optum recruiting.":
                     newsDetail.ind==="tech"?"These AI trends shape product, S&O, and BizDev roles. Analyze them fluently in case and behavioral interviews.":
                     newsDetail.ind==="consumer"?"Brand strategy and DTC shifts are core themes in consumer recruiting — Nike, LVMH, P&G all want candidates who understand these dynamics.":
                     newsDetail.ind==="media"?"Streaming economics and AI disruption are front-of-mind for Netflix and Spotify recruiters. Show you understand the business model.":
                     newsDetail.ind==="energy"?"Energy transition provides rich material for ESG and infrastructure roles. Know the macro context well.":
                     newsDetail.ind==="realestate"?"Real estate tech and capital flows affect PE, IB coverage, and advisory roles — relevant even outside pure RE recruiting.":
                     "Understanding macro trends helps you craft a compelling 'why this industry' narrative and ask differentiated questions to alumni contacts."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      {tab==="dashboard" && <Dashboard/>}
      {tab==="alumni"    && <AlumniPage alumInd={alumInd} setAlumInd={setAlumInd} alumQ={alumQ} setAlumQ={setAlumQ} selAlum={selAlum} setSelAlum={setSelAlum} setEmailModal={setEmailModal} setDraft={setDraft} setLogModal={setLogModal} setTrkAlum={setTrkAlum} setTab={setTab} setMenuOpen={setMenuOpen} isMobile={isMobile} p={p}/>}
      {tab==="tracker"   && <Tracker/>}
      {tab==="events"    && <Events/>}
      {tab==="news"      && <NewsPage newsInd={newsInd} setNewsInd={setNewsInd} newsQRef={newsQRef} setNewsQ={setNewsQ} fNews={fNews} newsQ={newsQ} setNewsDetail={setNewsDetail} isMobile={isMobile} p={p}/>}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        html,body{margin:0;padding:0;overflow-x:hidden;-webkit-text-size-adjust:100%;}
        *{box-sizing:border-box;}
        input::placeholder,textarea::placeholder{color:#94A3B8;}
        input:focus,textarea:focus{border-color:#1D4F91!important;box-shadow:0 0 0 3px rgba(29,79,145,0.08);}
        button{-webkit-tap-highlight-color:transparent;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(0,56,101,0.15);border-radius:4px;}
        @media(max-width:400px){
          [data-stats]{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </div>
  );
}
