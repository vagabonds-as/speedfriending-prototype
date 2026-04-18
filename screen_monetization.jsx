/* global React, HC, H_StatusBarLight */
// Monetization-skjermer — Speedfriending+ premium, administrer, referral, ta med venn
// Design-prinsipp: ikke påtrengende, ingen FOMO, ingen dark patterns.
// Vi selger events-opplevelser, ikke tilgang til venner.

// ────────────────────────────────────────────────────────────────────────────
// 1. PREMIUM-OPPGRADERING — Speedfriending+
// ────────────────────────────────────────────────────────────────────────────

function ScreenPremium() {
  const [plan, setPlan] = React.useState('yearly'); // 'monthly' | 'yearly'

  const benefits = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="6.5" fill="none" stroke={HC.coral} strokeWidth="1.5"/>
          <path d="M9 5v4l2.5 2" stroke={HC.coral} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: 'Tidlig tilgang — 24 timer før andre',
      body: 'Populære events fylles raskt. Få se dem først, så du ikke må stresse.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="6.5" cy="7" r="2.5" fill="none" stroke={HC.plum} strokeWidth="1.5"/>
          <circle cx="11.5" cy="7" r="2.5" fill="none" stroke={HC.plum} strokeWidth="1.5"/>
          <path d="M2 15c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5M9 15c0-2.2 2-3.5 4.5-3.5s2.5.5 2.5.5" fill="none" stroke={HC.plum} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Gjestepass — 1 per måned',
      body: 'Ta med en venn gratis på et event. De trenger ikke konto.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M3 4h12M5 9h8M7 14h4" stroke={HC.plum} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Avanserte filtre',
      body: 'Filtrer på stemning, størrelse, språk og prisklasse.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <rect x="3" y="3" width="12" height="12" rx="2" fill="none" stroke={HC.amber} strokeWidth="1.5"/>
          <path d="M3 7h12M7 3v12" stroke={HC.amber} strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Månedlig tilbakeblikk',
      body: 'Et personlig brev den 1. hver måned — hvem du møtte, hva du opplevde.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M9 2l2 4 4 .5-3 3 .8 4.2L9 11.6 5.2 13.7 6 9.5 3 6.5l4-.5z" fill="none" stroke={HC.coral} strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Frida Premium',
      body: 'En mer personlig AI-guide som husker deg og foreslår kvelder etter stemning.',
    },
  ];

  const yearly = { price: 699, per: 'år', monthly: Math.round(699/12), tag: 'Sparer 2 mnd' };
  const monthly = { price: 79, per: 'mnd', monthly: 79, tag: null };

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp-header med lukk */}
        <div style={{padding:'18px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 3l7 7M10 3l-7 7" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.fgDim}}>Speedfriending+</div>
          <div style={{width:38}}/>
        </div>

        {/* Hero — enkel, uten FOMO */}
        <div style={{padding:'32px 28px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 11px', borderRadius:14,
            background:`${HC.coral}18`, color:HC.coralDeep,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
          }}>
            <span style={{width:6, height:6, borderRadius:3, background:HC.coral}}/>
            Gjør Speedfriending litt rommere
          </div>
          <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-0.022em', color:HC.fg, lineHeight:1.1}}>
            Mer tid, flere valg,<br/>og en venn av gangen.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14.5, color:HC.fgDim, lineHeight:1.55}}>
            Du trenger ikke Speedfriending+ for å bruke appen. Det er et tillegg for deg som vil dykke dypere i miljøet.
          </p>
        </div>

        {/* Fordeler */}
        <div style={{padding:'26px 24px 0'}}>
          <div style={{background:HC.card, borderRadius:16, padding:'6px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            {benefits.map((b, i) => (
              <div key={i} style={{
                display:'flex', gap:14, padding:'14px 0',
                borderBottom: i < benefits.length-1 ? `1px solid ${HC.divider}` : 'none',
                alignItems:'flex-start',
              }}>
                <div style={{width:34, height:34, borderRadius:17, background:HC.cream, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
                  {b.icon}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, letterSpacing:'-0.005em'}}>{b.title}</div>
                  <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.5}}>{b.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan-valg */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Velg plan
          </div>

          {/* Årlig */}
          <button onClick={()=>setPlan('yearly')} style={{
            width:'100%', padding:'16px 18px', borderRadius:14,
            background: HC.card,
            border: plan==='yearly' ? `2px solid ${HC.plum}` : `1px solid ${HC.divider}`,
            cursor:'pointer', marginBottom:10, textAlign:'left',
            display:'flex', alignItems:'center', gap:14,
            boxShadow: plan==='yearly' ? `0 4px 14px ${HC.plum}20` : '0 1px 4px rgba(42,33,52,.03)',
            fontFamily:'inherit',
          }}>
            <div style={{
              width:22, height:22, borderRadius:11, flexShrink:0,
              border: plan==='yearly' ? 'none' : `1.5px solid ${HC.fgFaint}`,
              background: plan==='yearly' ? HC.plum : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              {plan==='yearly' && <div style={{width:9, height:9, borderRadius:5, background:'#fff'}}/>}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Årlig</div>
                {yearly.tag && (
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:'.05em', padding:'2px 7px', borderRadius:8, background:`${HC.green}18`, color:HC.green}}>
                    {yearly.tag}
                  </div>
                )}
              </div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3}}>
                {yearly.price} kr/år · tilsvarer {yearly.monthly} kr/mnd
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:17, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{yearly.price} kr</div>
              <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:2}}>per år</div>
            </div>
          </button>

          {/* Månedlig */}
          <button onClick={()=>setPlan('monthly')} style={{
            width:'100%', padding:'16px 18px', borderRadius:14,
            background: HC.card,
            border: plan==='monthly' ? `2px solid ${HC.plum}` : `1px solid ${HC.divider}`,
            cursor:'pointer', marginBottom:10, textAlign:'left',
            display:'flex', alignItems:'center', gap:14,
            boxShadow: plan==='monthly' ? `0 4px 14px ${HC.plum}20` : '0 1px 4px rgba(42,33,52,.03)',
            fontFamily:'inherit',
          }}>
            <div style={{
              width:22, height:22, borderRadius:11, flexShrink:0,
              border: plan==='monthly' ? 'none' : `1.5px solid ${HC.fgFaint}`,
              background: plan==='monthly' ? HC.plum : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              {plan==='monthly' && <div style={{width:9, height:9, borderRadius:5, background:'#fff'}}/>}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Månedlig</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3}}>Bytt eller avslutt når du vil</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:17, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{monthly.price} kr</div>
              <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:2}}>per mnd</div>
            </div>
          </button>

          {/* Ærlige detaljer */}
          <div style={{padding:'12px 4px 0', fontSize:11.5, color:HC.fgDim, lineHeight:1.6}}>
            Fornyes automatisk. Avslutt når du vil — like enkelt som å starte.
          </div>
        </div>

        {/* Gratis-prøve-kort */}
        <div style={{padding:'20px 24px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`, display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:34, height:34, borderRadius:17, background:`${HC.green}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
              <svg width="15" height="15" viewBox="0 0 15 15"><path d="M3 7.5l3 3 6-6" stroke={HC.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>14 dager gratis — ekte gratis</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>
                Vi spør ikke om betaling før prøveperioden er over. Ingen kort kreves nå.
              </div>
            </div>
          </div>
        </div>

        <div style={{flex:1, minHeight:20}}/>

        {/* Sticky bunn med Vipps-CTA */}
        <div style={{padding:'16px 22px 28px', background:`linear-gradient(180deg, transparent 0%, ${HC.bg} 25%)`, position:'sticky', bottom:0}}>
          <button style={{
            width:'100%', height:54, borderRadius:27, border:'none',
            background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
            color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
            boxShadow:`0 10px 24px ${HC.coral}40`, fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}>
            Start 14 dager gratis
          </button>
          <button style={{
            width:'100%', marginTop:10, height:48, borderRadius:24, border:`1px solid ${HC.divider}`,
            background:HC.card, color:HC.fg, fontSize:13.5, fontWeight:700, cursor:'pointer',
            fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="2" width="12" height="10" rx="2" fill="#FF5B24"/><text x="7" y="9" textAnchor="middle" fontSize="5" fontWeight="700" fill="#fff" fontFamily="system-ui">vipps</text></svg>
            Betal direkte med Vipps — {plan==='yearly' ? '699 kr/år' : '79 kr/mnd'}
          </button>
          <div style={{textAlign:'center', marginTop:12, fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            Prisen er {plan==='yearly' ? '699 kr per år' : '79 kr per måned'}. Ingen skjulte avgifter.
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenPremium = ScreenPremium;


// ────────────────────────────────────────────────────────────────────────────
// 2. ADMINISTRER SPEEDFRIENDING+
// ────────────────────────────────────────────────────────────────────────────

function ScreenPremiumManage() {
  const [confirmCancel, setConfirmCancel] = React.useState(false);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="09:12"/>

        {/* Topp-header */}
        <div style={{padding:'18px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M8 2l-5 4.5 5 4.5" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.fgDim}}>Abonnement</div>
          <div style={{width:38}}/>
        </div>

        {/* Status-hero */}
        <div style={{padding:'26px 24px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.plum} 0%, ${HC.plumDeep} 100%)`,
            borderRadius:20, padding:'22px 22px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.plum}30`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-50, top:-50, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>
            <div style={{position:'relative'}}>
              <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:14, background:'rgba(255,255,255,.18)', fontSize:10, fontWeight:700, letterSpacing:'.12em'}}>
                <span style={{width:6, height:6, borderRadius:3, background:HC.green}}/>
                AKTIV
              </div>
              <h1 style={{margin:'12px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.15}}>
                Speedfriending+ Årlig
              </h1>
              <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, paddingTop:14, borderTop:'1px solid rgba(255,255,255,.14)'}}>
                <div>
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', opacity:.7}}>NESTE BETALING</div>
                  <div style={{fontSize:15, fontWeight:700, marginTop:3}}>12. mars 2027</div>
                  <div style={{fontSize:11, opacity:.75, marginTop:1}}>699 kr via Vipps</div>
                </div>
                <div>
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', opacity:.7}}>MEDLEM SIDEN</div>
                  <div style={{fontSize:15, fontWeight:700, marginTop:3}}>12. mars 2026</div>
                  <div style={{fontSize:11, opacity:.75, marginTop:1}}>1 måned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Denne måneden */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Denne måneden
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { label:'Gjestepass brukt', val:'0 av 1', sub:'Fornyes 1. mai' },
              { label:'Tidlig tilgang brukt', val:'3 events', sub:'Sist: Brettspill i morgen' },
              { label:'Frida-samtaler', val:'12', sub:'Ubegrenset' },
            ].map((r, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', padding:'14px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{r.label}</div>
                  <div style={{fontSize:11, color:HC.fgFaint, marginTop:2}}>{r.sub}</div>
                </div>
                <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Handlinger */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Gjør endringer
          </div>
          <div style={{background:HC.card, borderRadius:14, boxShadow:'0 1px 8px rgba(42,33,52,.04)', overflow:'hidden'}}>
            {[
              {
                label:'Pause i 1 måned',
                sub:'Ingen betaling, beholder alt — gjenopptas automatisk',
                icon:(<svg width="16" height="16" viewBox="0 0 16 16"><rect x="4" y="3" width="3" height="10" rx="1" fill={HC.fg}/><rect x="9" y="3" width="3" height="10" rx="1" fill={HC.fg}/></svg>),
              },
              {
                label:'Bytt til månedlig (79 kr/mnd)',
                sub:'Gjelder fra neste fornyelse',
                icon:(<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 6h10l-2-2M13 10H3l2 2" stroke={HC.fg} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
              },
              {
                label:'Endre betalingsmåte',
                sub:'Vipps · +47 *** ** 342',
                icon:(<svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="4" width="12" height="9" rx="1.5" fill="none" stroke={HC.fg} strokeWidth="1.4"/><path d="M2 7h12" stroke={HC.fg} strokeWidth="1.4"/></svg>),
              },
              {
                label:'Last ned kvitteringer',
                sub:'1 kvittering tilgjengelig',
                icon:(<svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v9M4 7l4 4 4-4M3 13h10" stroke={HC.fg} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
              },
            ].map((a, i, arr) => (
              <button key={i} style={{
                width:'100%', padding:'14px 16px', background:'transparent', border:'none',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', alignItems:'center', gap:12, cursor:'pointer', textAlign:'left',
                fontFamily:'inherit',
              }}>
                <div style={{width:34, height:34, borderRadius:17, background:HC.cream, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  {a.icon}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{a.label}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{a.sub}</div>
                </div>
                <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Avslutt — LIKE ENKELT som å oppgradere */}
        <div style={{padding:'28px 24px 0'}}>
          {!confirmCancel ? (
            <button onClick={()=>setConfirmCancel(true)} style={{
              width:'100%', padding:'14px 16px', borderRadius:14,
              background:'transparent', border:`1px solid ${HC.divider}`,
              color:HC.fgDim, fontSize:13, fontWeight:600, cursor:'pointer',
              fontFamily:'inherit',
            }}>
              Avslutt abonnement
            </button>
          ) : (
            <div style={{background:HC.card, borderRadius:14, padding:'18px 18px', boxShadow:'0 2px 12px rgba(42,33,52,.06)', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>
                Avslutt Speedfriending+?
              </div>
              <div style={{fontSize:12.5, color:HC.fgDim, marginTop:8, lineHeight:1.55}}>
                Du beholder premium til 12. mars 2027 — det du allerede har betalt for. Ingen ytterligere betaling etter det.
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:16}}>
                <button onClick={()=>setConfirmCancel(false)} style={{
                  padding:'12px', borderRadius:22, border:`1px solid ${HC.divider}`,
                  background:HC.card, color:HC.fg, fontSize:13, fontWeight:700, cursor:'pointer',
                  fontFamily:'inherit',
                }}>
                  Ombestem deg
                </button>
                <button style={{
                  padding:'12px', borderRadius:22, border:'none',
                  background:HC.fg, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
                  fontFamily:'inherit',
                }}>
                  Ja, avslutt
                </button>
              </div>
              <div style={{fontSize:11, color:HC.fgFaint, marginTop:12, textAlign:'center', lineHeight:1.5}}>
                Vi sender en bekreftelse på e-post. Du kan starte på nytt når som helst.
              </div>
            </div>
          )}
        </div>

        {/* Kontakt */}
        <div style={{padding:'20px 24px 30px'}}>
          <div style={{fontSize:11.5, color:HC.fgFaint, textAlign:'center', lineHeight:1.6}}>
            Spørsmål? Skriv til <span style={{color:HC.plum, fontWeight:700, textDecoration:'underline'}}>hjelp@speedfriending.com</span><br/>
            Vi svarer innen 24 timer.
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenPremiumManage = ScreenPremiumManage;


// ────────────────────────────────────────────────────────────────────────────
// 3. REFERRAL — inviter en venn til appen
// ────────────────────────────────────────────────────────────────────────────

function ScreenReferral() {
  const [copied, setCopied] = React.useState(false);

  const invited = [
    { n:'Marte H.', status:'Møtte opp på event', credit:150, bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
    { n:'Simen A.', status:'Registrerte seg', credit:50, bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
    { n:'Ingrid K.', status:'Invitasjon sendt', credit:0, bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
  ];
  const totalCredit = invited.reduce((s,i) => s + i.credit, 0);
  const link = 'speedfriending.com/v/viktor';

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="16:04"/>

        {/* Topp-header */}
        <div style={{padding:'18px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M8 2l-5 4.5 5 4.5" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.fgDim}}>Inviter en venn</div>
          <div style={{width:38}}/>
        </div>

        {/* Hero med kreditt-status */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.coralDeep} 100%)`,
            borderRadius:20, padding:'22px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.coral}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', opacity:.85}}>DIN OPPTJENTE KREDITT</div>
              <div style={{fontSize:38, fontWeight:700, letterSpacing:'-0.025em', marginTop:6, lineHeight:1}}>
                {totalCredit} kr
              </div>
              <div style={{fontSize:12.5, opacity:.9, marginTop:8, lineHeight:1.5}}>
                Brukes automatisk ved neste event-reservasjon.
              </div>
            </div>
          </div>
        </div>

        {/* Hvordan det funker */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Slik funker det
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              {
                n:'1', title:'Del en lenke',
                body:'De får en vanlig SMS. Kan ignorere uten å lage konto.',
              },
              {
                n:'2', title:'De registrerer seg',
                body:'50 kr til deg, 50 kr til dem.',
              },
              {
                n:'3', title:'De kommer på sitt første event',
                body:'Ytterligere 100 kr til deg. Vi tror på opplevelser, ikke bare klikk.',
              },
            ].map((s, i, arr) => (
              <div key={i} style={{
                display:'flex', gap:14, padding:'14px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                alignItems:'flex-start',
              }}>
                <div style={{
                  width:30, height:30, borderRadius:15, background:`${HC.plum}14`,
                  color:HC.plum, fontSize:13, fontWeight:700,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1,
                }}>
                  {s.n}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{s.title}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3, lineHeight:1.5}}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lenke + delingsknapper */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Din invitasjonslenke
          </div>
          <div style={{
            background:HC.card, borderRadius:14, padding:'12px 14px',
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
            display:'flex', alignItems:'center', gap:10,
          }}>
            <div style={{flex:1, minWidth:0, fontSize:12.5, color:HC.fg, fontFamily:'monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
              {link}
            </div>
            <button onClick={()=>{ setCopied(true); setTimeout(()=>setCopied(false), 1800); }} style={{
              padding:'8px 14px', borderRadius:18, border:'none',
              background: copied ? HC.green : HC.plum,
              color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer',
              fontFamily:'inherit', flexShrink:0,
              transition:'background .2s',
            }}>
              {copied ? 'Kopiert!' : 'Kopier'}
            </button>
          </div>

          {/* SMS/iMessage */}
          <button style={{
            marginTop:10, width:'100%', padding:'14px 16px', borderRadius:14, border:'none',
            background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow:`0 8px 20px ${HC.coral}30`,
            fontFamily:'inherit',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H8l-3 3v-3H4a2 2 0 01-2-2V4z" fill="#fff"/></svg>
            Del via SMS eller iMessage
          </button>

          <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:10, paddingLeft:4, lineHeight:1.5}}>
            De mottar en vanlig SMS med lenke. Kan ignorere uten å lage konto.
          </div>
        </div>

        {/* Forhåndsvisning */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Hva vennen mottar
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            <div style={{fontSize:13, color:HC.fg, lineHeight:1.55, fontStyle:'italic'}}>
              "Hei! Jeg har begynt å gå på Speedfriending-events i Trondheim — sosiale kvelder med småprat. Tenkte du kanskje hadde lyst til å se. Hvis du booker et event får vi begge 50 kr kreditt. {link}"
            </div>
            <div style={{marginTop:10, paddingTop:10, borderTop:`1px dashed ${HC.divider}`, fontSize:11, color:HC.fgFaint}}>
              Du kan tilpasse teksten før du sender.
            </div>
          </div>
        </div>

        {/* Tidligere invitasjoner */}
        <div style={{padding:'26px 24px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Dine invitasjoner
            </div>
            <div style={{fontSize:11, color:HC.fgDim}}>{invited.length} totalt</div>
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {invited.map((p, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{width:34, height:34, borderRadius:17, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:13, flexShrink:0}}>
                  {p.n[0]}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{p.n}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{p.status}</div>
                </div>
                <div style={{
                  fontSize:12, fontWeight:700,
                  color: p.credit > 0 ? HC.green : HC.fgFaint,
                  padding:'3px 9px', borderRadius:10,
                  background: p.credit > 0 ? `${HC.green}14` : 'transparent',
                }}>
                  {p.credit > 0 ? `+${p.credit} kr` : 'Venter'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ærlighet om grenser */}
        <div style={{padding:'22px 24px 30px'}}>
          <div style={{fontSize:11, color:HC.fgFaint, textAlign:'center', lineHeight:1.6}}>
            Maks 500 kr kreditt per måned. Gyldig i 12 mnd. Kan ikke kombineres med andre tilbud.
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenReferral = ScreenReferral;


// ────────────────────────────────────────────────────────────────────────────
// 4. TA MED EN VENN (etter reservasjon) — invitér til spesifikt event
// ────────────────────────────────────────────────────────────────────────────

function ScreenInviteFriend() {
  const [sent, setSent] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const recent = [
    { n:'Anja', sub:'Fra brettspill-kvelden', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
    { n:'Thomas', sub:'Fra vinkvelden 4. april', bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
    { n:'Marte', sub:'Kollega', bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="16:42"/>

        {/* Topp */}
        <div style={{padding:'18px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 3l7 7M10 3l-7 7" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.fgDim}}>Etter reservasjon</div>
          <button style={{background:'transparent', border:'none', fontSize:12.5, color:HC.fgDim, cursor:'pointer', fontWeight:600, padding:'8px 4px', fontFamily:'inherit'}}>
            Hopp over
          </button>
        </div>

        {/* Headline */}
        <div style={{padding:'24px 28px 0'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:12, background:`${HC.green}18`, color:HC.green, fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase'}}>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke={HC.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Plassen din er reservert
          </div>
          <h1 style={{margin:'12px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.022em', color:HC.fg, lineHeight:1.15}}>
            Kjenner du noen<br/>som kunne tenke seg å komme?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:14, color:HC.fgDim, lineHeight:1.55}}>
            De får første event til halv pris. Du trenger ikke fortelle dem at du er på Speedfriending — bare send invitasjonen.
          </p>
        </div>

        {/* Event-kort */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:12, background:HC.card, boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            <div style={{width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#FFF', fontSize:10, fontWeight:700, lineHeight:1.1}}>
              <span>FRE</span>
              <span style={{fontSize:12, marginTop:1}}>19/4</span>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Brettspill på Trekroneren</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>19:00 · Fjordgata 7</div>
            </div>
            <div style={{textAlign:'right', flexShrink:0}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', color:HC.fgFaint, textTransform:'uppercase'}}>Vennens pris</div>
              <div style={{fontSize:13, fontWeight:700, color:HC.coralDeep, marginTop:2}}>
                <span style={{textDecoration:'line-through', color:HC.fgFaint, fontWeight:500, marginRight:4}}>199</span>
                99 kr
              </div>
            </div>
          </div>
        </div>

        {/* Nylige kontakter */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Noen du har møtt før
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'6px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            {recent.map((c, i) => {
              const isSel = selected === i;
              return (
                <div key={i} onClick={()=>setSelected(isSel ? null : i)} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                  borderBottom: i < recent.length-1 ? `1px solid ${HC.divider}` : 'none',
                  cursor:'pointer',
                }}>
                  <div style={{width:34, height:34, borderRadius:17, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:13, flexShrink:0}}>
                    {c.n[0]}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{c.n}</div>
                    <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{c.sub}</div>
                  </div>
                  <div style={{
                    width:22, height:22, borderRadius:11, flexShrink:0,
                    border: isSel ? 'none' : `1.5px solid ${HC.fgFaint}`,
                    background: isSel ? HC.coral : 'transparent',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {isSel && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SMS/iMessage-alternativ */}
        <div style={{padding:'14px 24px 0'}}>
          <button style={{
            width:'100%', padding:'14px 16px', borderRadius:14, border:`1px dashed ${HC.fgFaint}`, background:'transparent',
            display:'flex', alignItems:'center', gap:12, cursor:'pointer', fontFamily:'inherit',
          }}>
            <div style={{width:34, height:34, borderRadius:17, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 4a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2H7l-3 3v-3H4a2 2 0 01-2-2V4z" fill="none" stroke={HC.plum} strokeWidth="1.5"/></svg>
            </div>
            <div style={{flex:1, textAlign:'left'}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Inviter via SMS eller iMessage</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>Åpner delingsmenyen i telefonen</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgDim} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Forhåndsvisning */}
        <div style={{padding:'20px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Hva {selected !== null ? recent[selected].n : 'vennen'} ser
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            <div style={{fontSize:13, color:HC.fg, lineHeight:1.55, fontStyle:'italic'}}>
              "Jeg har booket brettspill på Trekroneren fredag 19. april kl 19. Har du lyst til å bli med? 4 min fra sentrum, og første event er halv pris — 99 kr i stedet for 199."
            </div>
            <div style={{marginTop:10, paddingTop:10, borderTop:`1px dashed ${HC.divider}`, fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
              Med en lenke til event-detaljene. De trenger ikke laste ned Speedfriending for å svare. Kan ignorere uten å lage konto.
            </div>
          </div>
        </div>

        <div style={{flex:1, minHeight:20}}/>

        {/* Sticky bunn-CTA */}
        <div style={{padding:'16px 22px 28px', background:`linear-gradient(180deg, transparent 0%, ${HC.bg} 30%)`, position:'sticky', bottom:0}}>
          <button
            onClick={()=>setSent(true)}
            disabled={selected === null && !sent}
            style={{
              width:'100%', height:54, borderRadius:27, border:'none',
              background: (selected !== null || sent)
                ? `linear-gradient(100deg, ${HC.coral}, ${HC.plum})`
                : HC.fgFaint,
              color:'#fff', fontSize:15, fontWeight:700,
              cursor: (selected !== null || sent) ? 'pointer' : 'default',
              boxShadow: (selected !== null) ? `0 10px 24px ${HC.coral}40` : 'none',
              fontFamily:'inherit',
            }}
          >
            {sent
              ? 'Sendt til ' + recent[selected].n
              : (selected !== null
                  ? `Send invitasjon til ${recent[selected].n}`
                  : 'Velg hvem du vil invitere')}
          </button>
          <div style={{textAlign:'center', marginTop:10, fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
            Ingen avgifter. De betaler 99 kr direkte, du er ikke ansvarlig.
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenInviteFriend = ScreenInviteFriend;
