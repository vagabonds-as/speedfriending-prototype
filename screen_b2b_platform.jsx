/* global React, HC, H_StatusBarLight */
// Speedfriending B2B-plattform — 12 skjermer (Module 1 event-pakker + Module 4 sponsor).
// Seriøs B2B-stil (Lyra / Modern Health / Gympass-nivå). Hvite bakgrunner, tall-tung,
// dokument-følelse på rapporter. Alt er WEB-mobile view (ingen tab-bar).

// ---------------------------------------------------------------------------
// Felles primitiver
// ---------------------------------------------------------------------------

function P_Kicker({ children, color }) {
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color: color || HC.plum}}>
      {children}
    </div>
  );
}

function P_Wordmark({ color, sub }) {
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:8}}>
      <div style={{
        width:22, height:22, borderRadius:6,
        background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{width:8, height:8, borderRadius:4, background:'#FFF'}}/>
      </div>
      <div style={{fontSize:13, fontWeight:700, letterSpacing:'-.01em', color: color || HC.fg}}>
        Speedfriending <span style={{fontWeight:500, opacity:.6}}>{sub || 'for Teams'}</span>
      </div>
    </div>
  );
}

function P_WebNav({ sub, cta }) {
  // Liten nav-bar øverst i web-mobile view.
  return (
    <div style={{padding:'16px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <P_Wordmark sub={sub}/>
      <button style={{background:'transparent', border:'none', fontSize:12, fontWeight:600, color:HC.fgDim, cursor:'pointer', padding:0}}>
        {cta || 'Logg inn'}
      </button>
    </div>
  );
}

function P_Check({ color }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11">
      <path d="M1.5 5.5l2.5 2.5L9.5 2" stroke={color || HC.plum} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function P_BulletRow({ t, d, color }) {
  return (
    <div style={{padding:'12px 16px', display:'flex', gap:12, alignItems:'flex-start'}}>
      <div style={{width:20, height:20, borderRadius:10, background:`${color || HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
        <P_Check color={color || HC.plum}/>
      </div>
      <div>
        <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{t}</div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{d}</div>
      </div>
    </div>
  );
}

// Liten PDF-ikon-komponent (dokument-thumbnail)
function P_PDFDoc({ w = 44, h = 58, accent, label = 'PDF' }) {
  return (
    <div style={{
      width:w, height:h, borderRadius:4,
      background:'#FFF', border:`1px solid ${HC.divider}`,
      display:'flex', flexDirection:'column', padding:'6px 5px', gap:3, flexShrink:0,
      boxShadow:'0 2px 6px rgba(42,33,52,.06)',
    }}>
      <div style={{height:2, borderRadius:1, background:accent || HC.plum, width:'70%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'100%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'85%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'92%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'70%'}}/>
      <div style={{flex:1}}/>
      <div style={{fontSize:6, fontWeight:700, color:HC.fgFaint, textAlign:'center'}}>{label}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 1 — B2B HERO-LANDING (Module 1)
// ---------------------------------------------------------------------------

function ScreenB2BLanding2() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="09:14"/>
        <P_WebNav/>

        {/* Hero */}
        <div style={{padding:'38px 22px 0'}}>
          <P_Kicker>For HR, People Ops og CFO</P_Kicker>
          <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.08, color:HC.fg}}>
            Ensomhet koster norsk næringsliv{' '}
            <span style={{color:HC.coralDeep}}>2 milliarder kroner</span> årlig.
            <br/>
            <span style={{color:HC.plumDeep}}>Vi måler og reduserer det.</span>
          </h1>
          <p style={{margin:'18px 0 0', fontSize:14, lineHeight:1.55, color:HC.fgDim}}>
            Speedfriending er et connection-wellness-benefit for bedrifter.
            Kuraterte sosiale events, aggregert UCLA-måling, rapport til styret.
            Pilot for 30 ansatte starter på 85 000 kr.
          </p>

          <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10}}>
            <button style={{
              width:'100%', padding:'15px 20px', borderRadius:10, border:'none',
              background:HC.plumDeep, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
            }}>
              Start pilot — 3 events på 3 måneder
            </button>
            <button style={{
              width:'100%', padding:'15px 20px', borderRadius:10,
              background:'transparent', color:HC.fg, fontSize:14, fontWeight:600, cursor:'pointer',
              border:`1px solid ${HC.divider}`,
            }}>
              Last ned one-pager (PDF)
            </button>
          </div>

          <div style={{marginTop:12, fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            GDPR-compliant · Data lagres i EU · Ingen individdata eksponeres til arbeidsgiver
          </div>
        </div>

        {/* Kostnadstall — stor tabell */}
        <div style={{padding:'42px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Det skjulte tallet</P_Kicker>
          <div style={{
            marginTop:14, padding:'24px 20px', borderRadius:14,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:44, fontWeight:700, letterSpacing:'-.035em', color:HC.coralDeep, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>
              2 mrd kr
            </div>
            <div style={{marginTop:8, fontSize:13, lineHeight:1.5, color:HC.fg, fontWeight:600}}>
              Ensomhet og isolasjon blant norske kontoransatte — årlig samfunnskostnad.
            </div>
            <div style={{marginTop:6, fontSize:11, lineHeight:1.5, color:HC.fgDim}}>
              Beregnet fra sykefravær, redusert engasjement og turnover. Cigna Loneliness at Work 2024,
              ekstrapolert til SSB lønnsstatistikk.
            </div>
          </div>

          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {[
              { n:'20%', l:'av norske ansatte rapporterer ensomhet på jobb', src:'Gallup SGWP 2024' },
              { n:'2,3×', l:'så sannsynlig at ensomme ansatte slutter innen 12 mnd', src:'Cigna 2024' },
              { n:'26%', l:'økt mortalitet ved kronisk ensomhet', src:'Holt-Lunstad 2015' },
            ].map((s, i) => (
              <div key={i} style={{padding:'12px 10px', borderRadius:10, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:20, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>{s.n}</div>
                <div style={{fontSize:10, color:HC.fgDim, marginTop:4, lineHeight:1.3}}>{s.l}</div>
                <div style={{fontSize:8.5, color:HC.fgFaint, marginTop:4}}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hvordan det fungerer */}
        <div style={{padding:'42px 22px 0'}}>
          <P_Kicker>Hvordan det fungerer</P_Kicker>
          <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { n:'01', t:'Dere velger pakke', d:'Pulse (25k), Connect (85k), Always-On (350k). Alt er inkludert — venue, vert, app.' },
              { n:'02', t:'Vi arrangerer events', d:'Kuratert av oss. Ambassadør på plass. 20–40 ansatte per event.' },
              { n:'03', t:'Anonymisert UCLA-måling', d:'Ansatte svarer i appen. Aggregert rapport til HR — aldri individdata.' },
              { n:'04', t:'Rapport til styret', d:'Kvartalsvis sammendrag med NPS, deltakelse og UCLA-delta.' },
            ].map((s, i) => (
              <div key={i} style={{padding:'14px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`, display:'flex', gap:14}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.plum, letterSpacing:'-.01em', flexShrink:0, fontVariantNumeric:'tabular-nums'}}>{s.n}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{s.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo-bar pilotkunder */}
        <div style={{padding:'42px 22px 0'}}>
          <div style={{fontSize:11, color:HC.fgFaint, textAlign:'center'}}>Pilotkunder 2026–2027</div>
          <div style={{marginTop:12, padding:'20px 12px', borderRadius:12, background:HC.cream, border:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            {['Cognite', 'Oda', 'Kahoot!', 'Tibber'].map((n, i) => (
              <div key={i} style={{fontSize:13, fontWeight:700, color:HC.fgDim, letterSpacing:'-.01em', opacity:.75}}>{n}</div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div style={{padding:'42px 22px 0'}}>
          <div style={{padding:'24px 22px', borderRadius:16, background:`linear-gradient(135deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`, color:'#FFF'}}>
            <div style={{fontSize:20, fontWeight:700, letterSpacing:'-.015em', lineHeight:1.2}}>
              Start piloten denne måneden.
            </div>
            <div style={{marginTop:10, fontSize:12.5, lineHeight:1.5, opacity:.9}}>
              Connect-pakken (85k) dekker 3 events for 30 ansatte. Ingen bindingstid etter 3 måneder.
            </div>
            <button style={{
              marginTop:16, padding:'14px 18px', borderRadius:10, border:'none',
              background:'#FFF', color:HC.plumDeep, fontSize:13, fontWeight:700, cursor:'pointer', width:'100%',
            }}>
              Book 20 min demo →
            </button>
          </div>
          <div style={{marginTop:22, paddingTop:18, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', fontSize:10, color:HC.fgFaint}}>
            <span>Speedfriending AS · Org. 925 111 222</span>
            <span>Personvern · Vilkår</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 2 — PAKKE-OVERSIKT (5 pakker)
// ---------------------------------------------------------------------------

function ScreenB2BPackages() {
  const packages = [
    {
      name:'Pulse',
      price:'25 000 kr',
      sub:'Single event · inngangspakke',
      tint:HC.lilac,
      for:'Nye kunder som vil teste · 10–50 ansatte',
      items:[
        '1 Speedfriending-event (2–3 t)',
        '20–40 deltakere inkludert',
        'Dedikert vert fra oss',
        'In-app RSVP + post-event sammendrag',
      ],
    },
    {
      name:'Connect',
      price:'85 000 kr',
      sub:'Kvartals-pakke · mest solgt',
      tint:HC.plum,
      featured:true,
      for:'Mellomstore selskaper · 30 ansatte · 3 mnd',
      items:[
        '3 kuraterte events over 3 måneder',
        '30 ansatte-plasser (rullerer)',
        'Anonymisert NPS-rapport etter hvert event',
        'Aggregert UCLA-delta ved avslutning',
        'Success manager · månedlig call',
      ],
    },
    {
      name:'Always-On',
      price:'350 000 kr / år',
      sub:'Flaggskip · 12 mnd',
      tint:HC.plumDeep,
      for:'Scaleups 200–1000 ansatte',
      items:[
        '10–12 events årlig',
        'Branded in-app experience',
        'Slack / Teams-integrasjon',
        'Kvartalsvis rapport til styret',
        'Co-branded markedsføring',
      ],
    },
    {
      name:'Festival & Events',
      price:'150 – 400 000 kr',
      sub:'Per aktivering · B2B2C',
      tint:HC.coral,
      for:'Festivaler, merker, store arrangementer',
      items:[
        'Brandet Speedfriending-sone',
        '3–10 økter · 50–500+ deltakere',
        'Sponsor får full branding + app-data',
        'Delt oppside med arrangør',
      ],
    },
    {
      name:'Public & Municipalities',
      price:'500 000 – 1,2 mill kr',
      sub:'Per anbud · offentlig sektor',
      tint:HC.green,
      for:'Kommuner, KS, Helsedirektoratet',
      items:[
        'Integrert løsning: app + events + rapporter',
        'FHI-koblet UCLA-rapportering',
        'KPI-oppfølging per måned',
        'Målrettet mot ungdomsvelferd 18–35',
      ],
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="09:22"/>
        <P_WebNav/>

        <div style={{padding:'28px 22px 0'}}>
          <P_Kicker>Pakker for bedrifter 2027</P_Kicker>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Fem pakker. Konkrete priser.
          </h1>
          <p style={{margin:'10px 0 0', fontSize:13, color:HC.fgDim, lineHeight:1.5}}>
            Alt inkluderer venue, vert, app-tilgang og rapport. Ingen skjulte kostnader.
          </p>
        </div>

        <div style={{padding:'22px 22px 0', display:'flex', flexDirection:'column', gap:12}}>
          {packages.map((p, i) => (
            <div key={i} style={{
              position:'relative',
              borderRadius:14,
              border: p.featured ? `2px solid ${p.tint}` : `1px solid ${HC.divider}`,
              background:'#FFF',
              overflow:'hidden',
              boxShadow: p.featured ? `0 6px 20px ${p.tint}22` : '0 1px 3px rgba(42,33,52,.04)',
            }}>
              {p.featured && (
                <div style={{
                  position:'absolute', top:10, right:10, zIndex:2,
                  padding:'4px 8px', borderRadius:6,
                  background:p.tint, color:'#FFF',
                  fontSize:9.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
                }}>
                  Mest solgt
                </div>
              )}
              <div style={{padding:'18px 18px 0'}}>
                <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10}}>
                  <div>
                    <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:p.tint}}>
                      {p.sub}
                    </div>
                    <div style={{fontSize:22, fontWeight:700, color:HC.fg, letterSpacing:'-.02em', marginTop:4}}>
                      {p.name}
                    </div>
                  </div>
                  <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-.015em', textAlign:'right', fontVariantNumeric:'tabular-nums'}}>
                    {p.price}
                  </div>
                </div>
                <div style={{marginTop:6, fontSize:11, color:HC.fgDim}}>
                  {p.for}
                </div>
              </div>
              <div style={{marginTop:12, borderTop:`1px solid ${HC.divider}`}}>
                {p.items.map((item, j) => (
                  <div key={j} style={{
                    padding:'9px 16px', display:'flex', alignItems:'center', gap:10,
                    borderBottom: j < p.items.length - 1 ? `1px solid ${HC.divider}` : 'none',
                  }}>
                    <div style={{width:16, height:16, borderRadius:8, background:`${p.tint}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="9" height="9" viewBox="0 0 11 11"><path d="M1.5 5.5l2.5 2.5L9.5 2" stroke={p.tint} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div style={{fontSize:12, color:HC.fg, lineHeight:1.4}}>{item}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:'14px 16px', borderTop:`1px solid ${HC.divider}`}}>
                <button style={{
                  width:'100%', padding:'11px', borderRadius:9,
                  background: p.featured ? p.tint : 'transparent',
                  color: p.featured ? '#FFF' : p.tint,
                  border: p.featured ? 'none' : `1px solid ${p.tint}44`,
                  fontSize:12.5, fontWeight:700, cursor:'pointer',
                }}>
                  {p.featured ? 'Start Connect-pilot' : 'Mer om pakken'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trenger mer? Link til custom */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{padding:'16px 18px', background:HC.cream, borderRadius:12, border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>Trenger du noe annet?</div>
            <div style={{marginTop:4, fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
              Over 30 ansatte, konsernavtale, flere byer eller spesielle krav — vi skreddersyr.
            </div>
            <button style={{
              marginTop:12, padding:'10px 14px', borderRadius:8, border:`1px solid ${HC.plum}`,
              background:'transparent', color:HC.plum, fontSize:12, fontWeight:700, cursor:'pointer',
            }}>
              Be om custom-pakke →
            </button>
          </div>
        </div>

        <div style={{padding:'28px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint}}>
          Alle priser ekskl. mva · 30 dagers oppsigelsesrett i løpende avtaler
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 3 — CONNECT 85K DETALJ (Pilot-skjema)
// ---------------------------------------------------------------------------

function ScreenB2BConnectDetail() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="09:34"/>
        <P_WebNav/>

        {/* Back */}
        <div style={{padding:'14px 22px 0'}}>
          <div style={{fontSize:11, color:HC.fgDim, display:'inline-flex', alignItems:'center', gap:4}}>
            <span>←</span> Alle pakker
          </div>
        </div>

        {/* Hero */}
        <div style={{padding:'16px 22px 0'}}>
          <P_Kicker>Connect · kvartals-pakke</P_Kicker>
          <h1 style={{margin:'10px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.025em', color:HC.fg, lineHeight:1.1}}>
            3 events. 30 ansatte.<br/>
            3 måneder. <span style={{color:HC.plumDeep}}>85 000 kr.</span>
          </h1>
          <div style={{marginTop:14, padding:'14px 16px', borderRadius:12, background:HC.cream, border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
              Inkluderer alt: venues, ambassadører, app-tilgang for 30 ansatte, og
              aggregert rapport etter piloten. Ingen bindingstid etter 3 måneder.
            </div>
          </div>
        </div>

        {/* Hva du får — tidslinje */}
        <div style={{padding:'36px 22px 0'}}>
          <P_Kicker>Tidslinje</P_Kicker>
          <div style={{marginTop:14, padding:'2px 0 2px 20px', position:'relative'}}>
            <div style={{position:'absolute', left:7, top:12, bottom:12, width:2, background:`${HC.plum}33`}}/>
            {[
              { w:'Uke 1', t:'Kickoff', d:'30 min demo med People Ops. Vi setter opp bedrifts-tilgang og SSO.' },
              { w:'Uke 2', t:'Lansering internt', d:'Invitasjonsmateriell til dine 30 ansatte. De eier kontoen selv.' },
              { w:'Uke 4', t:'Event 1', d:'Middagsevent for 10 ansatte i Oslo. Ambassadør på plass.' },
              { w:'Uke 8', t:'Event 2', d:'Aktivitetsevent — løpetur eller vinsmaking. 10 nye ansatte.' },
              { w:'Uke 12', t:'Event 3 + rapport', d:'Siste event. Aggregert UCLA-delta og NPS leveres innen 7 dager etter.' },
            ].map((row, i) => (
              <div key={i} style={{position:'relative', paddingBottom: i === 4 ? 0 : 20}}>
                <div style={{position:'absolute', left:-20, top:4, width:16, height:16, borderRadius:8, background:HC.plum, border:'3px solid #FFF', boxShadow:`0 0 0 1px ${HC.plum}33`}}/>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>{row.w}</div>
                <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, marginTop:2}}>{row.t}</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{row.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hva rapporten viser */}
        <div style={{padding:'32px 22px 0'}}>
          <P_Kicker>Hva rapporten viser</P_Kicker>
          <div style={{marginTop:12, background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { t:'Aggregert UCLA-delta', d:'Gjennomsnittlig endring i ensomhets-score, kun vist hvis 10+ aktive.' },
              { t:'NPS per event', d:'Hvor fornøyde deltakerne var. Bransjegjennomsnitt: +38.' },
              { t:'Aktiveringsrate', d:'Hvor mange av de 30 plassene som faktisk ble brukt.' },
              { t:'Retention-signaler', d:'Om deltakere kom tilbake til event 2 og 3.' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'13px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', gap:12, alignItems:'flex-start',
              }}>
                <div style={{width:20, height:20, borderRadius:10, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
                  <P_Check/>
                </div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{row.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{row.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop:12, padding:'12px 14px',
            background:`${HC.green}0D`, border:`1px solid ${HC.green}33`, borderRadius:10,
            display:'flex', gap:10, alignItems:'flex-start',
          }}>
            <div style={{width:18, height:18, borderRadius:9, background:`${HC.green}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
              <svg width="10" height="10" viewBox="0 0 11 11"><path d="M5.5 1L2 2.5V5c0 2.2 1.5 4 3.5 5 2-1 3.5-2.8 3.5-5V2.5L5.5 1z" fill="none" stroke={HC.green} strokeWidth="1.4"/></svg>
            </div>
            <div style={{fontSize:10.5, color:HC.fg, lineHeight:1.5}}>
              <span style={{fontWeight:700}}>Ingen individdata.</span>
              <span style={{color:HC.fgDim}}> Rapportene viser aldri hvem som svarte hva. Personvern over innsikt — alltid.</span>
            </div>
          </div>
        </div>

        {/* Pilot-skjema */}
        <div style={{padding:'36px 22px 0'}}>
          <div style={{padding:'22px 20px', borderRadius:14, background:`linear-gradient(160deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`, color:'#FFF'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', opacity:.85}}>
              Pilot-skjema
            </div>
            <div style={{fontSize:18, fontWeight:700, letterSpacing:'-.015em', marginTop:8, lineHeight:1.2}}>
              Signer Connect-pilot på 3 minutter.
            </div>

            <div style={{marginTop:16, display:'flex', flexDirection:'column', gap:10}}>
              {[
                { l:'Bedrift', v:'Cognite AS' },
                { l:'Kontaktperson', v:'Ingrid Holmås' },
                { l:'E-post', v:'ingrid.h@cognite.com' },
                { l:'Antall ansatte totalt', v:'480' },
                { l:'Ønsket oppstart', v:'Mai 2027' },
              ].map((f, i) => (
                <div key={i} style={{
                  padding:'10px 12px', borderRadius:8,
                  background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
                }}>
                  <div style={{fontSize:9, fontWeight:600, color:'rgba(255,255,255,.65)', letterSpacing:'.08em', textTransform:'uppercase'}}>{f.l}</div>
                  <div style={{fontSize:12.5, color:'#FFF', fontWeight:500, marginTop:2}}>{f.v}</div>
                </div>
              ))}
            </div>

            <button style={{
              marginTop:18, width:'100%', padding:'14px', borderRadius:10, border:'none',
              background:'#FFF', color:HC.plumDeep, fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              Send inn pilot-forespørsel →
            </button>
            <div style={{marginTop:10, fontSize:10, opacity:.8, textAlign:'center'}}>
              Vi svarer innen 24 t · Ingen forpliktelse før kontrakt
            </div>
          </div>
        </div>

        <div style={{padding:'28px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint}}>
          85 000 kr ekskl. mva · Faktureres ved kontraktsignering
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 4 — CUSTOM-FORESPØRSEL-SKJEMA
// ---------------------------------------------------------------------------

function ScreenB2BCustomRequest() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="09:45"/>
        <P_WebNav/>

        <div style={{padding:'20px 22px 0'}}>
          <div style={{fontSize:11, color:HC.fgDim, display:'inline-flex', alignItems:'center', gap:4}}>
            <span>←</span> Alle pakker
          </div>
        </div>

        <div style={{padding:'18px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Custom-forespørsel</P_Kicker>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Trenger du mer enn 30 ansatte?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:12.5, color:HC.fgDim, lineHeight:1.5}}>
            Vi lager en skreddersydd pakke for større bedrifter, konsernavtaler eller
            unike behov. Svar under, så sender vi tilbud innen 3 virkedager.
          </p>
        </div>

        {/* Skjema */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>

            {/* Bedrift */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Bedrift</div>
              <div style={{padding:'12px 14px', borderRadius:10, border:`1px solid ${HC.plum}`, background:'#FFF'}}>
                <div style={{fontSize:13, fontWeight:500, color:HC.fg}}>DNB Bank ASA</div>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Din rolle</div>
              <div style={{padding:'12px 14px', borderRadius:10, border:`1px solid ${HC.divider}`, background:'#FFF'}}>
                <div style={{fontSize:13, fontWeight:500, color:HC.fg}}>Chief People Officer</div>
              </div>
            </div>

            {/* Antall ansatte */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Antall ansatte aktuelt</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
                {['30–100', '100–500', '500+'].map((r, i) => (
                  <div key={i} style={{
                    padding:'12px 10px', borderRadius:10, textAlign:'center',
                    border: i === 2 ? `1.5px solid ${HC.plum}` : `1px solid ${HC.divider}`,
                    background: i === 2 ? `${HC.plum}08` : '#FFF',
                    fontSize:12, fontWeight: i === 2 ? 700 : 500,
                    color: i === 2 ? HC.plum : HC.fg,
                  }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Byer */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Byer (velg alle som gjelder)</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                {[
                  { n:'Oslo', on:true },
                  { n:'Bergen', on:true },
                  { n:'Trondheim', on:true },
                  { n:'Stavanger', on:false },
                  { n:'Tromsø', on:false },
                  { n:'København', on:false },
                ].map((c, i) => (
                  <div key={i} style={{
                    padding:'8px 14px', borderRadius:16,
                    border: c.on ? `1.5px solid ${HC.plum}` : `1px solid ${HC.divider}`,
                    background: c.on ? HC.plum : '#FFF',
                    color: c.on ? '#FFF' : HC.fg,
                    fontSize:11.5, fontWeight: c.on ? 700 : 500,
                  }}>
                    {c.on && '✓ '}{c.n}
                  </div>
                ))}
              </div>
            </div>

            {/* Ønsket budsjett */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Indikativt budsjett per år</div>
              <div style={{padding:'12px 14px', borderRadius:10, border:`1px solid ${HC.divider}`, background:'#FFF'}}>
                <div style={{fontSize:13, fontWeight:500, color:HC.fg}}>500 000 – 1 500 000 kr</div>
              </div>
            </div>

            {/* Beskrivelse */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Kort om behovet</div>
              <div style={{padding:'12px 14px', borderRadius:10, border:`1px solid ${HC.divider}`, background:'#FFF', minHeight:76}}>
                <div style={{fontSize:12, color:HC.fg, lineHeight:1.5}}>
                  Vi har 9 000+ ansatte i Oslo-området og ønsker connection-benefits som del av den generelle wellness-porteføljen. Spesielt interessert i junior-segmentet (25–32 år) og ansatte på hjemmekontor. Start-pilot på 200 ansatte, deretter skalering.
                </div>
                <div style={{marginTop:8, fontSize:10, color:HC.fgFaint, textAlign:'right'}}>347 / 1000</div>
              </div>
            </div>

            {/* Ønsket oppstart */}
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>Ønsket oppstart</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
                {['Q2 2027', 'Q3 2027', 'Q4 2027'].map((r, i) => (
                  <div key={i} style={{
                    padding:'12px 10px', borderRadius:10, textAlign:'center',
                    border: i === 1 ? `1.5px solid ${HC.plum}` : `1px solid ${HC.divider}`,
                    background: i === 1 ? `${HC.plum}08` : '#FFF',
                    fontSize:12, fontWeight: i === 1 ? 700 : 500,
                    color: i === 1 ? HC.plum : HC.fg,
                  }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Innsending */}
        <div style={{padding:'28px 22px 0'}}>
          <button style={{
            width:'100%', padding:'15px', borderRadius:10, border:'none',
            background:HC.plumDeep, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
          }}>
            Be om custom-tilbud →
          </button>
          <div style={{marginTop:10, fontSize:11, color:HC.fgDim, textAlign:'center', lineHeight:1.5}}>
            Vi svarer innen 3 virkedager med et indikativt tilbud.<br/>
            Ingen forpliktelse før du har sett prisen.
          </div>
        </div>

        <div style={{padding:'28px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint}}>
          Typisk custom-pakke: 400 000 – 2 500 000 kr / år
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 5 — HR-DASHBOARD ETTER SIGNERING (Cognite · Connect)
// ---------------------------------------------------------------------------

function ScreenB2BHRDashboard2() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F8F6F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="10:12"/>

        {/* Topp */}
        <div style={{padding:'16px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <P_Wordmark sub="for Teams"/>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>Cognite</div>
            <div style={{width:26, height:26, borderRadius:13, background:'linear-gradient(135deg,#7895C4,#2E4A75)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:10.5}}>
              IH
            </div>
          </div>
        </div>

        <div style={{padding:'20px 22px 0'}}>
          <P_Kicker>Connect-pilot · uke 6 av 12</P_Kicker>
          <h1 style={{margin:'8px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            God morgen, Ingrid.
          </h1>
          <div style={{marginTop:4, fontSize:12, color:HC.fgDim}}>
            Piloten er halvveis. Her er status.
          </div>
        </div>

        {/* Kontrakt-info */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{padding:'14px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
                Aktiv pakke
              </div>
              <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, marginTop:3}}>
                Connect · 85 000 kr
              </div>
              <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>
                Kontrakt signert 12. feb 2027 · Slutter 12. mai 2027
              </div>
            </div>
            <div style={{
              padding:'5px 10px', borderRadius:12, background:`${HC.green}14`, color:HC.green,
              fontSize:10, fontWeight:700, letterSpacing:'.04em',
            }}>
              Aktiv
            </div>
          </div>
        </div>

        {/* Hoved-KPI — Plass-aktivering */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>Aktivering av 30 plasser</P_Kicker>
          <div style={{marginTop:10, padding:'18px 18px', borderRadius:14, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', alignItems:'baseline', gap:8}}>
              <div style={{fontSize:42, fontWeight:700, color:HC.fg, letterSpacing:'-.03em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>23</div>
              <div style={{fontSize:14, color:HC.fgDim, fontWeight:500}}>av 30 plasser aktivert</div>
            </div>
            <div style={{marginTop:12, height:8, borderRadius:4, background:HC.divider, overflow:'hidden'}}>
              <div style={{width:`${(23/30)*100}%`, height:'100%', background:`linear-gradient(90deg, ${HC.plum}, ${HC.plumDeep})`}}/>
            </div>
            <div style={{marginTop:8, display:'flex', justifyContent:'space-between', fontSize:10.5, color:HC.fgDim}}>
              <span>77% aktivert</span>
              <span>+4 siden forrige uke</span>
            </div>
          </div>
        </div>

        {/* Events arrangert */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>Events så langt</P_Kicker>
          <div style={{marginTop:10, background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              {
                n:'01',
                t:'Onsdagsmiddag · Smalhans',
                d:'14. mars 2027 · Grünerløkka',
                attended:11, invited:12, nps:62, state:'done',
              },
              {
                n:'02',
                t:'Løpetur langs Akerselva',
                d:'4. april 2027 · Oslo sentrum',
                attended:9, invited:10, nps:71, state:'done',
              },
              {
                n:'03',
                t:'Vinsmaking · Vulkan',
                d:'2. mai 2027 · Grünerløkka',
                attended:0, invited:10, nps:null, state:'upcoming',
              },
            ].map((e, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
                opacity: e.state === 'upcoming' ? 1 : 1,
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10}}>
                  <div style={{display:'flex', gap:10, alignItems:'flex-start', flex:1}}>
                    <div style={{
                      width:28, height:28, borderRadius:14,
                      background: e.state === 'done' ? `${HC.green}18` : `${HC.amber}18`,
                      color: e.state === 'done' ? HC.green : HC.amber,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:11, fontWeight:700, flexShrink:0,
                    }}>
                      {e.n}
                    </div>
                    <div>
                      <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{e.t}</div>
                      <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>{e.d}</div>
                    </div>
                  </div>
                  {e.state === 'done' ? (
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>{e.attended}/{e.invited}</div>
                      <div style={{fontSize:10, color:HC.green, fontWeight:600}}>NPS +{e.nps}</div>
                    </div>
                  ) : (
                    <div style={{
                      padding:'3px 8px', borderRadius:10,
                      background:`${HC.amber}18`, color:HC.amber,
                      fontSize:9.5, fontWeight:700,
                    }}>
                      Om 12 dager
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NPS sammendrag */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>NPS-sammendrag · aggregert</P_Kicker>
          <div style={{marginTop:10, padding:'18px 18px', borderRadius:14, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Gjennomsnittlig NPS</div>
                <div style={{marginTop:8, display:'flex', alignItems:'baseline', gap:10}}>
                  <div style={{fontSize:36, fontWeight:700, color:HC.green, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>+66</div>
                  <div style={{fontSize:11, color:HC.fgDim}}>n = 20 svar</div>
                </div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim}}>
                  Over bransjegj.snitt (+38)
                </div>
              </div>

              {/* Mini-distribusjon */}
              <div style={{display:'flex', gap:4, alignItems:'flex-end'}}>
                {[
                  { c:HC.coral, h:12 },
                  { c:HC.amber, h:20 },
                  { c:HC.green, h:48 },
                ].map((b, i) => (
                  <div key={i} style={{width:12, height:b.h, background:b.c, borderRadius:2}}/>
                ))}
              </div>
            </div>

            <div style={{marginTop:14, paddingTop:12, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', fontSize:10.5}}>
              <div>
                <div style={{color:HC.fgDim}}>Detractors (0–6)</div>
                <div style={{color:HC.fg, fontWeight:700, marginTop:2}}>2</div>
              </div>
              <div>
                <div style={{color:HC.fgDim}}>Passives (7–8)</div>
                <div style={{color:HC.fg, fontWeight:700, marginTop:2}}>4</div>
              </div>
              <div>
                <div style={{color:HC.fgDim}}>Promoters (9–10)</div>
                <div style={{color:HC.fg, fontWeight:700, marginTop:2}}>14</div>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div style={{
            marginTop:10, padding:'10px 12px',
            background:`${HC.green}0D`, border:`1px solid ${HC.green}33`, borderRadius:8,
            fontSize:10.5, color:HC.fg, lineHeight:1.5,
          }}>
            <span style={{fontWeight:700}}>Aggregert data, aldri individuelt.</span>
            <span style={{color:HC.fgDim}}> Kun vist ved 10+ svar per gruppe.</span>
          </div>
        </div>

        {/* Neste event CTA */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'18px 18px', borderRadius:14,
            background:`linear-gradient(135deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', opacity:.85}}>
              Neste event
            </div>
            <div style={{marginTop:8, fontSize:18, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.2}}>
              Vinsmaking · Vulkan
            </div>
            <div style={{marginTop:6, fontSize:12.5, opacity:.9}}>
              2. mai 2027 · kl 18:00 · 10 ansatte påmeldt
            </div>
            <div style={{marginTop:14, display:'flex', gap:8}}>
              <button style={{
                flex:1, padding:'10px', borderRadius:8, border:'none',
                background:'#FFF', color:HC.plumDeep, fontSize:11.5, fontWeight:700, cursor:'pointer',
              }}>
                Se deltakerliste
              </button>
              <button style={{
                flex:1, padding:'10px', borderRadius:8,
                background:'transparent', color:'#FFF', fontSize:11.5, fontWeight:700, cursor:'pointer',
                border:'1px solid rgba(255,255,255,.3)',
              }}>
                Inviter flere
              </button>
            </div>
          </div>
        </div>

        <div style={{padding:'22px 22px 0', textAlign:'center', fontSize:10.5, color:HC.fgFaint}}>
          Neste månedsoppsummering leveres 12. mai 2027
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 6 — HR AGGREGERT RAPPORT (Cognite Q2 2027)
// ---------------------------------------------------------------------------

function P_ReportBar({ label, value, max, color, suffix = '%' }) {
  const pct = (value / max) * 100;
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0'}}>
      <div style={{flex:'0 0 120px', fontSize:11, color:HC.fg}}>{label}</div>
      <div style={{flex:1, height:7, borderRadius:3.5, background:`${color}14`, overflow:'hidden'}}>
        <div style={{width:`${pct}%`, height:'100%', background:color, borderRadius:3.5}}/>
      </div>
      <div style={{flex:'0 0 38px', fontSize:11, color:HC.fg, fontWeight:700, textAlign:'right', fontVariantNumeric:'tabular-nums'}}>
        {value.toString().replace('.',',')}{suffix}
      </div>
    </div>
  );
}

function ScreenB2BHRReport() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FAF7F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:08"/>

        {/* Report-header — dokumentaktig */}
        <div style={{
          margin:'14px 18px 0', borderRadius:16,
          background:`linear-gradient(160deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`,
          color:'#FFF', padding:'24px 20px 26px',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:60, background:'rgba(255,255,255,.06)'}}/>

          <div style={{position:'relative'}}>
            <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.85}}>
              Speedfriending · Connect-rapport
            </div>
            <div style={{marginTop:10, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15}}>
              Cognite Q2 2027
            </div>
            <div style={{marginTop:6, fontSize:11, opacity:.85}}>
              Aggregert analyse · 12 uker · Mars–mai 2027
            </div>

            <div style={{marginTop:18, padding:'14px 0 0', borderTop:'1px solid rgba(255,255,255,.2)'}}>
              <div style={{fontSize:32, fontWeight:700, letterSpacing:'-.025em', lineHeight:1}}>
                42%
              </div>
              <div style={{marginTop:6, fontSize:12, opacity:.9, lineHeight:1.45}}>
                av aktive ansatte rapporterer sterkere sosial tilkobling etter 3 måneder.
              </div>
            </div>
          </div>
        </div>

        {/* Datagrunnlag */}
        <div style={{padding:'16px 22px 0', fontSize:10.5, color:HC.fgDim, lineHeight:1.5}}>
          <span style={{color:HC.fg, fontWeight:700}}>N = 23 aktiverte ansatte (av 30 mulige).</span>
          <span> 3 events over 12 uker. UCLA-LS-3 pre/post, NPS per event, kvalitativ feedback.</span>
        </div>

        {/* Hoved-KPI */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>Nøkkeltall</P_Kicker>
          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {[
              { t:'Aktivering', v:'23/30', sub:'77% av plasser brukt', c:HC.plum },
              { t:'Gj.snitt NPS', v:'+66', sub:'Over bransje (+38)', c:HC.green },
              { t:'UCLA-delta', v:'−0,9', sub:'Fra 5,2 til 4,3', c:HC.green },
              { t:'Retention', v:'74%', sub:'Kom tilbake til event 2+', c:HC.plum },
            ].map((k, i) => (
              <div key={i} style={{padding:'14px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>{k.t}</div>
                <div style={{marginTop:8, fontSize:24, fontWeight:700, color:k.c, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>{k.v}</div>
                <div style={{marginTop:6, fontSize:10, color:HC.fgDim}}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sterkere sosial tilkobling — delt på demografi */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>Styrket sosial tilkobling — aggregert</P_Kicker>
          <div style={{marginTop:10, padding:'14px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:11, color:HC.fgDim, marginBottom:6}}>% som rapporterer "noe/mye sterkere" etter 3 mnd</div>
            <P_ReportBar label="Alle aktive" value={42} max={100} color={HC.plum}/>
            <P_ReportBar label="Nyansatte (&lt;1 år)" value={58} max={100} color={HC.plumDeep}/>
            <P_ReportBar label="Hjemmekontor-dominert" value={51} max={100} color={HC.plumDeep}/>
            <P_ReportBar label="Etablerte ansatte (3+ år)" value={28} max={100} color={HC.lilac}/>
          </div>
          <div style={{marginTop:10, fontSize:10, color:HC.fgFaint, lineHeight:1.5}}>
            Kun grupper med 10+ svar vises. Figuren baseres på egenrapportering i appen dagen etter hvert event.
          </div>
        </div>

        {/* Kvalitativ sitering */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>Fra deltakerne — anonymisert</P_Kicker>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
            {[
              { q:'Jeg hadde knapt pratet med noen utenfor eget team før dette. Nå har jeg lunsj med en fra Commercial hver uke.', w:'Nyansatt, 29' },
              { q:'Det føltes ikke som et HR-initiativ. Det føltes som at kolleger bare ville hjem til Smalhans sammen.', w:'Senior engineer, 34' },
            ].map((q, i) => (
              <div key={i} style={{padding:'14px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:12, lineHeight:1.55, fontStyle:'italic', color:HC.fg, paddingLeft:10, borderLeft:`2px solid ${HC.plum}55`}}>
                  "{q.q}"
                </div>
                <div style={{marginTop:8, fontSize:10, color:HC.fgFaint}}>— {q.w}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Anbefaling */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Vår anbefaling</P_Kicker>
          <div style={{marginTop:10, padding:'16px 18px', borderRadius:12, background:`${HC.coral}0D`, border:`1px solid ${HC.coral}33`}}>
            <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
              Oppgrader til Always-On for Q3.
            </div>
            <div style={{marginTop:6, fontSize:11.5, color:HC.fg, lineHeight:1.5}}>
              Nyansatte-segmentet viser sterkest effekt. En utvidet avtale med månedlige events og Slack-integrasjon kan ta dere fra 23 til 100+ aktiverte ansatte.
            </div>
          </div>
        </div>

        {/* PDF-nedlasting */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            padding:'18px 18px', borderRadius:12,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{display:'flex', alignItems:'flex-start', gap:14}}>
              <P_PDFDoc/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
                  Cognite Q2 2027 — full rapport
                </div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:4, lineHeight:1.5}}>
                  12 sider · Aggregert data · Ingen individdata · Klar for styremøtet.
                </div>
              </div>
            </div>
            <button style={{
              marginTop:14, width:'100%', padding:'12px', borderRadius:9,
              background:HC.plumDeep, color:'#FFF', border:'none',
              fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Last ned PDF (1,2 MB)
            </button>
          </div>

          <div style={{marginTop:18, textAlign:'center', fontSize:10, color:HC.fgFaint, lineHeight:1.5}}>
            Generert 15. mai 2027 · Data lagres i EU · Slettes etter 36 mnd
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 7 — SPONSOR-LANDING
// ---------------------------------------------------------------------------

function ScreenSponsorLanding() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="10:02"/>
        <P_WebNav sub="for Sponsors"/>

        {/* Hero */}
        <div style={{padding:'34px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>For brand managers og sponsor-direktører</P_Kicker>
          <h1 style={{margin:'14px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.08, color:HC.fg}}>
            Hovedsponsor for <span style={{color:HC.coralDeep}}>100 events</span> i Oslo 2027.
          </h1>
          <p style={{margin:'16px 0 0', fontSize:14, lineHeight:1.55, color:HC.fgDim}}>
            Kategori-eksklusivitet for 20–35-åringer i norske storbyer. Pris:
            500 000–750 000 kr. Første sponsor får ti-års legacy.
          </p>
        </div>

        {/* Tall-boks */}
        <div style={{padding:'32px 22px 0'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {[
              { n:'30–50k', l:'live deltakere per år', tint:HC.coralDeep },
              { n:'1,5M+', l:'digitale eksponeringer', tint:HC.plum },
              { n:'23–35', l:'år · primær målgruppe', tint:HC.green },
              { n:'375 kr', l:'CPM (under marked)', tint:HC.amber },
            ].map((s, i) => (
              <div key={i} style={{padding:'16px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:22, fontWeight:700, color:s.tint, letterSpacing:'-.02em', lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:10.5, color:HC.fgDim, marginTop:8, lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hvorfor Speedfriending */}
        <div style={{padding:'36px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Hvorfor sponsor her?</P_Kicker>
          <div style={{marginTop:12, background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { t:'High-intent målgruppe', d:'Deltakerne møter opp personlig. Ingen scroll-trøtthet.', c:HC.plum },
              { t:'Samfunnsnytte i bunn', d:'UCLA-måling viser målbar reduksjon i ensomhet. Forankret i CSR.', c:HC.green },
              { t:'Kategori-eksklusivitet', d:'Kun én sponsor per kategori (f.eks. én drikke-sponsor, ingen konkurrenter).', c:HC.coral },
              { t:'Earned media garantert', d:'PR-verdi 500k–1,5M estimert via DN, Shifter, E24.', c:HC.amber },
            ].map((r, i, arr) => (
              <div key={i} style={{
                padding:'12px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', gap:12, alignItems:'flex-start',
              }}>
                <div style={{width:20, height:20, borderRadius:10, background:`${r.c}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
                  <P_Check color={r.c}/>
                </div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{r.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sosial proof — sponsor-referanser */}
        <div style={{padding:'32px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Sponsor-modellen globalt</P_Kicker>
          <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
            Bumble × Cointreau (Margarita Monday), Aperol × Coachella, Tinder × Manchester City. Experiential-sponsorater i direkte samme kategori.
          </div>
          <div style={{marginTop:14, padding:'18px 16px', borderRadius:12, background:HC.cream, border:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            {['Bumble IRL', 'Aperol', 'Cointreau', 'Tinder'].map((n, i) => (
              <div key={i} style={{fontSize:11.5, fontWeight:700, color:HC.fgDim, letterSpacing:'-.01em', opacity:.7}}>{n}</div>
            ))}
          </div>
        </div>

        {/* Pitchmøte CTA */}
        <div style={{padding:'36px 22px 0'}}>
          <div style={{
            padding:'22px 20px', borderRadius:16,
            background:`linear-gradient(135deg, ${HC.coralDeep} 0%, ${HC.coral} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontSize:18, fontWeight:700, letterSpacing:'-.015em', lineHeight:1.2}}>
              Book pitch-møte.
            </div>
            <div style={{marginTop:8, fontSize:12.5, lineHeight:1.5, opacity:.9}}>
              30 minutter. Vi viser sponsor-deck, impact-data og forslag til kategori-eksklusivitet for ditt merke.
            </div>
            <button style={{
              marginTop:16, padding:'13px 18px', borderRadius:10, border:'none',
              background:'#FFF', color:HC.coralDeep, fontSize:13, fontWeight:700, cursor:'pointer', width:'100%',
            }}>
              Book 30 min →
            </button>
            <div style={{marginTop:10, fontSize:10, opacity:.8, textAlign:'center'}}>
              Kun 1 hovedsponsor per kategori i 2027 · Oslo først
            </div>
          </div>
        </div>

        <div style={{padding:'24px 22px 0', fontSize:10, color:HC.fgFaint, textAlign:'center'}}>
          Kontakt: sponsors@speedfriending.com · +47 400 00 000
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 8 — SPONSOR-PAKKER
// ---------------------------------------------------------------------------

function ScreenSponsorPackages() {
  const tiers = [
    {
      name:'Kveld-sponsor',
      price:'25 000 kr',
      sub:'1 event · pilot-nivå',
      tint:HC.lilac,
      vol:'20–40 live deltakere',
      dig:'10 000 digitale eksp.',
      items:[
        'Logo på event-side',
        'Produktplassering 1 kveld',
        'Sosial medie-omtale fra vert',
        'NPS-sammendrag etter event',
      ],
    },
    {
      name:'Månedssponsor',
      price:'200 000 kr',
      sub:'10 events · 3 mnd',
      tint:HC.coral,
      vol:'200–400 live deltakere',
      dig:'150 000 digitale eksp.',
      items:[
        'Alt i Kveld-sponsor',
        'Branding på alle 10 events',
        'Opt-in CRM-liste (500+ unike)',
        'Månedlig rapport + PR-støtte',
        'Delvis kategori-eksklusivitet',
      ],
    },
    {
      name:'Hovedsponsor',
      price:'750 000 kr',
      sub:'100 events · 12 mnd · flaggskip',
      tint:HC.coralDeep,
      featured:true,
      vol:'3 000 live deltakere',
      dig:'1,5M digitale eksp.',
      items:[
        'Full kategori-eksklusivitet',
        '"Presented by"-rettighet',
        'Co-branded impact-rapport',
        'CRM-tilgang (3 000–5 000 unike)',
        'Earned media-garanti (PR-team)',
        'Right-of-first-refusal 2028',
      ],
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="10:18"/>
        <P_WebNav sub="for Sponsors"/>

        <div style={{padding:'28px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Sponsor-pakker 2027</P_Kicker>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Tre nivåer. Ingen forhandling.
          </h1>
          <p style={{margin:'10px 0 0', fontSize:12.5, color:HC.fgDim, lineHeight:1.5}}>
            Alle priser er faste. Kategori-eksklusivitet tildeles first-come.
          </p>
        </div>

        <div style={{padding:'22px 22px 0', display:'flex', flexDirection:'column', gap:12}}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              position:'relative',
              borderRadius:14,
              border: t.featured ? `2px solid ${t.tint}` : `1px solid ${HC.divider}`,
              background:'#FFF',
              overflow:'hidden',
              boxShadow: t.featured ? `0 8px 24px ${t.tint}22` : '0 1px 3px rgba(42,33,52,.04)',
            }}>
              {t.featured && (
                <div style={{
                  position:'absolute', top:10, right:10, zIndex:2,
                  padding:'4px 8px', borderRadius:6,
                  background:t.tint, color:'#FFF',
                  fontSize:9.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
                }}>
                  Flaggskip
                </div>
              )}
              <div style={{padding:'18px 18px 0'}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:t.tint}}>
                  {t.sub}
                </div>
                <div style={{marginTop:4, display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10}}>
                  <div style={{fontSize:22, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>
                    {t.name}
                  </div>
                  <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-.015em', textAlign:'right', fontVariantNumeric:'tabular-nums'}}>
                    {t.price}
                  </div>
                </div>
                <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
                  <div style={{padding:'8px 10px', borderRadius:8, background:HC.cream}}>
                    <div style={{fontSize:9, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:HC.fgDim}}>Live</div>
                    <div style={{fontSize:11, fontWeight:700, color:HC.fg, marginTop:2}}>{t.vol}</div>
                  </div>
                  <div style={{padding:'8px 10px', borderRadius:8, background:HC.cream}}>
                    <div style={{fontSize:9, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:HC.fgDim}}>Digital</div>
                    <div style={{fontSize:11, fontWeight:700, color:HC.fg, marginTop:2}}>{t.dig}</div>
                  </div>
                </div>
              </div>
              <div style={{marginTop:12, borderTop:`1px solid ${HC.divider}`}}>
                {t.items.map((item, j) => (
                  <div key={j} style={{
                    padding:'9px 16px', display:'flex', alignItems:'center', gap:10,
                    borderBottom: j < t.items.length - 1 ? `1px solid ${HC.divider}` : 'none',
                  }}>
                    <div style={{width:15, height:15, borderRadius:8, background:`${t.tint}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="8" height="8" viewBox="0 0 11 11"><path d="M1.5 5.5l2.5 2.5L9.5 2" stroke={t.tint} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div style={{fontSize:11.5, color:HC.fg, lineHeight:1.4}}>{item}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:'12px 16px', borderTop:`1px solid ${HC.divider}`}}>
                <button style={{
                  width:'100%', padding:'11px', borderRadius:9,
                  background: t.featured ? t.tint : 'transparent',
                  color: t.featured ? '#FFF' : t.tint,
                  border: t.featured ? 'none' : `1px solid ${t.tint}44`,
                  fontSize:12, fontWeight:700, cursor:'pointer',
                }}>
                  {t.featured ? 'Book pitch-møte' : 'Les mer'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sammenligning */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{padding:'14px 16px', background:HC.cream, borderRadius:10, border:`1px solid ${HC.divider}`, fontSize:10.5, color:HC.fgDim, lineHeight:1.5}}>
            <span style={{color:HC.fg, fontWeight:700}}>Per event:</span>{' '}
            Kveld-sponsor = 25 000 kr. Månedssponsor = 20 000 kr per event. Hovedsponsor = 7 500 kr per event. Stordriftsfordelen er reell.
          </div>
        </div>

        <div style={{padding:'28px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint}}>
          Alle priser ekskl. mva · Avtalene fornyes årlig
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 9 — SPONSOR-DASHBOARD (Aperol)
// ---------------------------------------------------------------------------

function P_SpArc({ pct, color, size = 110 }) {
  const r = size/2 - 10;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct/100);
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={HC.divider} strokeWidth="8"/>
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x={size/2} y={size/2+3} textAnchor="middle" fontSize="20" fontWeight="700" fill={HC.fg} style={{letterSpacing:'-.02em'}}>
        {pct}%
      </text>
      <text x={size/2} y={size/2+18} textAnchor="middle" fontSize="9" fill={HC.fgDim}>
        av 100 events
      </text>
    </svg>
  );
}

function ScreenSponsorDashboard() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F8F6F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="11:45"/>

        {/* Topp */}
        <div style={{padding:'16px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <P_Wordmark sub="for Sponsors"/>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>Aperol</div>
            <div style={{width:26, height:26, borderRadius:13, background:'linear-gradient(135deg, #F2933C, #C45A1A)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:10}}>A</div>
          </div>
        </div>

        {/* Hilsen */}
        <div style={{padding:'20px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Hovedsponsor · Oslo 2027</P_Kicker>
          <h1 style={{margin:'8px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Hei, Martina.
          </h1>
          <div style={{marginTop:4, fontSize:12, color:HC.fgDim}}>
            Her er hvordan Aperol-sponsoratet leverer akkurat nå.
          </div>
        </div>

        {/* Kontrakt-info */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{padding:'14px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coralDeep}}>
                Aktiv kontrakt
              </div>
              <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, marginTop:3}}>
                Hovedsponsor · 750 000 kr · 12 mnd
              </div>
              <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>
                1. mars 2027 – 28. feb 2028 · Kategori: Aperitiff
              </div>
            </div>
            <div style={{
              padding:'5px 10px', borderRadius:12, background:`${HC.coralDeep}14`, color:HC.coralDeep,
              fontSize:10, fontWeight:700, letterSpacing:'.04em',
            }}>
              Kat.ekskl.
            </div>
          </div>
        </div>

        {/* Hoved-KPI — events levert */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{padding:'18px 18px', borderRadius:14, background:'#FFF', border:`1px solid ${HC.divider}`, display:'flex', alignItems:'center', gap:18}}>
            <P_SpArc pct={32} color={HC.coralDeep}/>
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Events så langt</div>
              <div style={{marginTop:8, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>32</div>
              <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim}}>av 100 i 2027</div>
              <div style={{marginTop:6, fontSize:10.5, color:HC.green, fontWeight:600}}>På rute · +8 denne uken</div>
            </div>
          </div>
        </div>

        {/* Eksponering-grid */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Estimert eksponering · YTD</P_Kicker>
          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {[
              { t:'Live deltakere', v:'2 847', sub:'av mål 3 000', c:HC.coralDeep },
              { t:'Digitale eksp.', v:'1,2 M', sub:'av mål 1,5M', c:HC.plum },
              { t:'SoMe-deling', v:'387', sub:'posts med #aperol', c:HC.amber },
              { t:'Sampling', v:'4 200', sub:'Aperol Spritz servert', c:HC.green },
            ].map((k, i) => (
              <div key={i} style={{padding:'14px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>{k.t}</div>
                <div style={{marginTop:8, fontSize:20, fontWeight:700, color:k.c, letterSpacing:'-.015em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>{k.v}</div>
                <div style={{marginTop:6, fontSize:10, color:HC.fgDim}}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NPS for sponsor-integrering */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>NPS for sponsor-integrering</P_Kicker>
          <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.45}}>
            Hvor deltakerne opplever Aperol-integrasjonen som naturlig vs. påtrengende.
          </div>
          <div style={{marginTop:12, padding:'18px 18px', borderRadius:14, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', alignItems:'flex-end', gap:14}}>
              <div style={{fontSize:42, fontWeight:700, color:HC.green, letterSpacing:'-.03em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>+68</div>
              <div style={{fontSize:11, color:HC.fgDim, paddingBottom:6}}>n = 412 svar</div>
            </div>
            <div style={{marginTop:12, paddingTop:12, borderTop:`1px solid ${HC.divider}`, fontSize:11.5, color:HC.fg, lineHeight:1.55}}>
              <span style={{fontWeight:700}}>94%</span>
              <span style={{color:HC.fgDim}}> svarte at integrasjonen ikke opplevdes som påtrengende. Målet var 85%.</span>
            </div>
          </div>
        </div>

        {/* Kommende events */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Kommende events</P_Kicker>
          <div style={{marginTop:10, background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { t:'Fredagsmingling · Vippa', d:'28. apr · 40 ansatte Kahoot' },
              { t:'Onsdagsmiddag · Smalhans', d:'3. mai · 30 ansatte Oda' },
              { t:'Festival-kickoff · Tøyenparken', d:'15. mai · 250 deltakere' },
            ].map((e, i, arr) => (
              <div key={i} style={{
                padding:'12px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <div>
                  <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>{e.t}</div>
                  <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>{e.d}</div>
                </div>
                <div style={{fontSize:10.5, color:HC.coralDeep, fontWeight:700}}>→</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:'22px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint}}>
          Neste rapport: Q3 2027 · 1. august
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 10 — SPONSOR-INTEGRERING PÅ EVENT
// ---------------------------------------------------------------------------

function ScreenSponsorIntegration() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="18:24"/>
        <P_WebNav sub="for Sponsors"/>

        <div style={{padding:'20px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Slik ser sponsor-integrering ut</P_Kicker>
          <h1 style={{margin:'10px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Diskret. Naturlig.<br/>Aldri påtrengende.
          </h1>
          <p style={{margin:'10px 0 0', fontSize:12, color:HC.fgDim, lineHeight:1.5}}>
            Eksempel fra et Aperol-integrert event i Oslo, 14. april 2027.
          </p>
        </div>

        {/* Event-kort — slik deltaker ser det */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker>1 · Event-invitasjonen</P_Kicker>
          <div style={{marginTop:10, borderRadius:14, overflow:'hidden', border:`1px solid ${HC.divider}`, background:'#FFF'}}>
            <div style={{
              height:110, position:'relative',
              background:`linear-gradient(135deg, #F2933C 0%, #C45A1A 60%, ${HC.plumDeep} 100%)`,
            }}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 40%, rgba(255,255,255,.15), transparent 60%)'}}/>
              <div style={{position:'absolute', top:10, left:12, fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.8)'}}>
                Speedfriending · Onsdagsmingling
              </div>
              <div style={{position:'absolute', bottom:10, left:12, fontSize:18, fontWeight:700, color:'#FFF', letterSpacing:'-.01em'}}>
                Smalhans · 19:00
              </div>
              {/* Sponsor-tag — nederst høyre, små */}
              <div style={{
                position:'absolute', top:10, right:12,
                padding:'4px 8px', borderRadius:6,
                background:'rgba(255,255,255,.2)', backdropFilter:'blur(8px)',
                fontSize:8.5, fontWeight:700, color:'#FFF', letterSpacing:'.08em', textTransform:'uppercase',
              }}>
                Presented by Aperol
              </div>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:11, color:HC.fgDim}}>Middag og småprat i små grupper. 2 timer. Max 12 personer.</div>
            </div>
          </div>
          <div style={{marginTop:8, padding:'10px 12px', background:HC.cream, borderRadius:10, fontSize:10.5, color:HC.fgDim, lineHeight:1.5}}>
            <span style={{color:HC.fg, fontWeight:700}}>Tydelig "sponsor"-merking</span>, men ikke dominerende. Sponsor-tag oppe i hjørnet, aldri i tittelen.
          </div>
        </div>

        {/* På venuen — diskret servering */}
        <div style={{padding:'28px 22px 0'}}>
          <P_Kicker>2 · På venuen — servering</P_Kicker>
          <div style={{marginTop:10, padding:'16px 16px', borderRadius:14, background:HC.cream, border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              {/* Drink-ikon */}
              <div style={{
                width:52, height:52, borderRadius:10,
                background:'linear-gradient(160deg, #F2933C, #C45A1A)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#FFF', fontSize:22, flexShrink:0,
              }}>
                ●
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>
                  En Aperol Spritz på huset som velkomstdrink
                </div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>
                  Alle deltakere får én. Alternativ alkoholfri variant tilgjengelig. Aldri pitch — bare drikke.
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:10, padding:'12px 14px', background:'#FFF', border:`1px solid ${HC.divider}`, borderRadius:10}}>
            <div style={{fontSize:10.5, color:HC.fg, lineHeight:1.55}}>
              <span style={{fontWeight:700, color:HC.coralDeep}}>Aldri gjør:</span>
              <span style={{color:HC.fgDim}}> live-demo, QR-koder på bordet, "ambassador"-speech, logo-flagg ved hver stol. Det ødelegger deltakeropplevelsen.</span>
            </div>
          </div>
        </div>

        {/* Logo-placement-regler */}
        <div style={{padding:'28px 22px 0'}}>
          <P_Kicker>3 · Logo-placement</P_Kicker>
          <div style={{marginTop:10, background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { ok:true, t:'Serviett ved drikken', d:'Diskret, på hvit bakgrunn.' },
              { ok:true, t:'App-invitasjonens top-hjørne', d:'Max 30% av bildets bredde.' },
              { ok:true, t:'Vertens introduksjon', d:'"Kvelden er servert takket være Aperol" — 1 setning.' },
              { ok:false, t:'Bordpynt med logo', d:'Føles som produktplassering i stedet for bevertning.' },
              { ok:false, t:'Speil over inngang', d:'Brand tar over rommet.' },
              { ok:false, t:'Pitch-runde fra sponsor', d:'Aldri. Deltakere kom for folk, ikke reklame.' },
            ].map((r, i, arr) => (
              <div key={i} style={{
                padding:'11px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', gap:10, alignItems:'flex-start',
              }}>
                <div style={{
                  width:18, height:18, borderRadius:9,
                  background: r.ok ? `${HC.green}18` : `${HC.coralDeep}18`,
                  color: r.ok ? HC.green : HC.coralDeep,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1,
                  fontSize:10, fontWeight:700,
                }}>
                  {r.ok ? '✓' : '×'}
                </div>
                <div>
                  <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>{r.t}</div>
                  <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mål-metric */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{padding:'16px 18px', borderRadius:12, background:`${HC.green}0D`, border:`1px solid ${HC.green}33`}}>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.green}}>
              Måling av balansen
            </div>
            <div style={{marginTop:8, display:'flex', alignItems:'baseline', gap:10}}>
              <div style={{fontSize:28, fontWeight:700, color:HC.green, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>94%</div>
              <div style={{fontSize:11.5, color:HC.fg, fontWeight:500, lineHeight:1.3}}>
                av deltakere sier sponsor-integrasjonen er naturlig og ikke påtrengende.
              </div>
            </div>
            <div style={{marginTop:6, fontSize:10, color:HC.fgDim}}>
              Målt post-event i appen · n = 412 svar Q1 2027
            </div>
          </div>
        </div>

        <div style={{padding:'28px 22px 0', textAlign:'center', fontSize:10, color:HC.fgFaint, lineHeight:1.5}}>
          Speedfriendings sponsor-guide finnes som egen playbook.<br/>Be om tilgang via sponsors@speedfriending.com.
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 11 — SPONSOR-RAPPORT Q2 2027 (Aperol)
// ---------------------------------------------------------------------------

function ScreenSponsorReport() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FAF7F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="15:22"/>

        {/* Report-header */}
        <div style={{
          margin:'14px 18px 0', borderRadius:16,
          background:`linear-gradient(160deg, #C45A1A 0%, #F2933C 100%)`,
          color:'#FFF', padding:'24px 20px 26px',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:60, background:'rgba(255,255,255,.08)'}}/>

          <div style={{position:'relative'}}>
            <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.85}}>
              Aperol × Speedfriending · Q2 2027
            </div>
            <div style={{marginTop:10, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15}}>
              Sponsor-rapport
            </div>
            <div style={{marginTop:6, fontSize:11, opacity:.85}}>
              Hovedsponsor Oslo · april–juni 2027
            </div>

            <div style={{marginTop:18, padding:'14px 0 0', borderTop:'1px solid rgba(255,255,255,.2)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div>
                <div style={{fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>32</div>
                <div style={{marginTop:4, fontSize:10, opacity:.85}}>events levert</div>
              </div>
              <div>
                <div style={{fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>2 847</div>
                <div style={{marginTop:4, fontSize:10, opacity:.85}}>live deltakere</div>
              </div>
              <div>
                <div style={{fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>1,2 M</div>
                <div style={{marginTop:4, fontSize:10, opacity:.85}}>digitale inntrykk</div>
              </div>
              <div>
                <div style={{fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>+68</div>
                <div style={{marginTop:4, fontSize:10, opacity:.85}}>NPS sponsor-integ.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sammendrag / hook */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{padding:'16px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.35}}>
              Målet var 30 events og 3 000 deltakere. Vi er i rute etter halve året.
            </div>
            <div style={{marginTop:6, fontSize:11.5, color:HC.fgDim, lineHeight:1.55}}>
              Ingen deltakere har opplevd sponsor-integrasjonen som påtrengende i over 6% av tilfellene. Målet var &lt; 15%.
            </div>
          </div>
        </div>

        {/* Eksponerings-detaljer */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Eksponering · fordelt</P_Kicker>
          <div style={{marginTop:10, padding:'16px 16px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <P_ReportBar label="Instagram" value={682000} max={1500000} color={HC.coralDeep} suffix=""/>
            <P_ReportBar label="TikTok" value={418000} max={1500000} color={HC.coral} suffix=""/>
            <P_ReportBar label="LinkedIn" value={87000} max={1500000} color={HC.plum} suffix=""/>
            <P_ReportBar label="Earned/PR" value={45000} max={1500000} color={HC.amber} suffix=""/>
          </div>
          <div style={{marginTop:8, fontSize:10, color:HC.fgFaint}}>
            Tall er estimert via tracking pixels + influencer-rapporter + Meltwater PR-overvåkning.
          </div>
        </div>

        {/* Earned media */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Earned media · utvalg</P_Kicker>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
            {[
              { pub:'Dagens Næringsliv', head:'Aperol først til å sponse Norges ensomhets-tiltak', date:'12. mai 2027' },
              { pub:'Shifter', head:'Speedfriending-sponsor: "Aldri push-reklame"', date:'2. juni 2027' },
              { pub:'E24', head:'Sponsormarkedet finner nytt format i Oslo', date:'18. juni 2027' },
            ].map((a, i) => (
              <div key={i} style={{padding:'12px 14px', borderRadius:10, background:'#FFF', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.coralDeep}}>{a.pub}</div>
                <div style={{marginTop:4, fontSize:12, fontWeight:700, color:HC.fg, lineHeight:1.3}}>"{a.head}"</div>
                <div style={{marginTop:4, fontSize:10, color:HC.fgFaint}}>{a.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sitater fra deltakere */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>Fra deltakerne — anonymisert</P_Kicker>
          <div style={{marginTop:10, padding:'16px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:12, lineHeight:1.55, fontStyle:'italic', color:HC.fg, paddingLeft:10, borderLeft:`2px solid ${HC.coralDeep}55`}}>
              "Jeg kom ikke dit for en Aperol, men den velkomstdrinken var en fin start. Det er alt jeg trenger fra en sponsor."
            </div>
            <div style={{marginTop:8, fontSize:10, color:HC.fgFaint}}>— Kvinne, 28, onsdagsmingling</div>
          </div>
        </div>

        {/* CPM-regnestykke */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.coralDeep}>ROI-beregning</P_Kicker>
          <div style={{marginTop:10, padding:'16px 18px', borderRadius:12, background:HC.cream, border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>Sponsor-kostnad (YTD)</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>375 000 kr</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>Digitale eksponeringer</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>1 200 000</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>CPM</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>313 kr</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize:11}}>
              <span style={{color:HC.fgDim}}>Earned media-verdi</span>
              <span style={{color:HC.green, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>+ 880 000 kr</span>
            </div>
          </div>
        </div>

        {/* PDF */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{padding:'18px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
              <P_PDFDoc accent={HC.coralDeep}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
                  Aperol × Speedfriending Q2 2027
                </div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:4, lineHeight:1.5}}>
                  16 sider · Alle tall, deltakerfeedback og PR-arkiv · Klar for CSR-teamet.
                </div>
              </div>
            </div>
            <button style={{
              marginTop:14, width:'100%', padding:'12px', borderRadius:9,
              background:HC.coralDeep, color:'#FFF', border:'none',
              fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Last ned full rapport (PDF, 2,8 MB)
            </button>
          </div>
          <div style={{marginTop:14, textAlign:'center', fontSize:10, color:HC.fgFaint, lineHeight:1.5}}>
            Neste rapport: Q3 2027, 1. oktober<br/>Årsrapport + impact-rapport: 15. januar 2028
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SKJERM 12 — IMPACT-RAPPORT (Oslo Loneliness Reduction Partnership 2027)
// ---------------------------------------------------------------------------

function P_PageThumbnail({ n, title, accent }) {
  // Liten PDF-side-thumbnail for 8-siders rapport.
  return (
    <div style={{
      width:64, height:86, background:'#FFF',
      borderRadius:3, border:`1px solid ${HC.divider}`,
      boxShadow:'0 2px 6px rgba(42,33,52,.08)',
      padding:'6px 5px', display:'flex', flexDirection:'column', gap:2,
      position:'relative', flexShrink:0,
    }}>
      <div style={{height:3, borderRadius:1, background:accent, width:'68%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'100%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'80%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'92%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'70%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'86%'}}/>
      <div style={{marginTop:4, height:14, borderRadius:2, background:`${accent}18`}}/>
      <div style={{marginTop:2, height:1, borderRadius:.5, background:HC.divider, width:'90%'}}/>
      <div style={{height:1, borderRadius:.5, background:HC.divider, width:'66%'}}/>
      <div style={{flex:1}}/>
      <div style={{fontSize:7, fontWeight:700, color:HC.fgFaint, textAlign:'center'}}>s. {n}</div>
      <div style={{marginTop:4, fontSize:8, fontWeight:600, color:HC.fg, lineHeight:1.2, textAlign:'center', padding:'0 2px'}}>
        {title}
      </div>
    </div>
  );
}

function ScreenImpactReport() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F3EFE8'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="16:44"/>

        {/* Formelt header — dokumentforsiden */}
        <div style={{
          margin:'14px 14px 0', borderRadius:8,
          background:'#FFFFFF', border:`1px solid ${HC.divider}`,
          padding:'26px 20px',
          boxShadow:'0 8px 24px rgba(42,33,52,.08)',
        }}>
          <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:HC.fgDim, textAlign:'center'}}>
            Offentlig partnerskap · årsrapport
          </div>
          <div style={{marginTop:4, fontSize:8, color:HC.fgFaint, letterSpacing:'.08em', textAlign:'center'}}>
            Årgang 2027 · utgitt januar 2028
          </div>

          <div style={{marginTop:22, height:3, background:HC.plumDeep, width:44, marginLeft:'auto', marginRight:'auto', borderRadius:2}}/>

          <h1 style={{margin:'18px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15, textAlign:'center'}}>
            Oslo Loneliness Reduction Partnership 2027
          </h1>

          <div style={{marginTop:12, fontSize:11, color:HC.fgDim, lineHeight:1.55, textAlign:'center', maxWidth:280, marginLeft:'auto', marginRight:'auto'}}>
            Et treparts-samarbeid mellom Speedfriending, Folkehelseinstituttet og Aperol Nordic om målbar reduksjon av ensomhet blant unge voksne i Oslo.
          </div>

          {/* Logo-bar */}
          <div style={{marginTop:24, paddingTop:18, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <div style={{fontSize:10.5, fontWeight:700, color:HC.plumDeep, letterSpacing:'-.01em'}}>Speedfriending</div>
            <div style={{fontSize:10.5, fontWeight:700, color:HC.fgDim}}>FHI</div>
            <div style={{fontSize:10.5, fontWeight:700, color:HC.coralDeep}}>Aperol</div>
          </div>
        </div>

        {/* Hovedfunn */}
        <div style={{padding:'22px 22px 0'}}>
          <P_Kicker color={HC.plumDeep}>Hovedfunn 2027</P_Kicker>
          <div style={{marginTop:12, padding:'18px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, paddingBottom:14, borderBottom:`1px solid ${HC.divider}`}}>
              <div>
                <div style={{fontSize:28, fontWeight:700, color:HC.plumDeep, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>104</div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>events i Oslo gjennomført</div>
              </div>
              <div>
                <div style={{fontSize:28, fontWeight:700, color:HC.plumDeep, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>9 428</div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>unike deltakere</div>
              </div>
              <div>
                <div style={{fontSize:28, fontWeight:700, color:HC.green, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>−1,4</div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>UCLA-score · aggregert</div>
              </div>
              <div>
                <div style={{fontSize:28, fontWeight:700, color:HC.green, letterSpacing:'-.025em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>24 M</div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>kr samfunnsverdi estimert</div>
              </div>
            </div>
            <div style={{paddingTop:14, fontSize:11.5, color:HC.fg, lineHeight:1.55}}>
              <span style={{fontWeight:700}}>Ingen enkelt-intervensjon kan løse ensomhet.</span>
              <span style={{color:HC.fgDim}}> Men 104 kuraterte kvelder med 9 428 deltakere, målt med UCLA-LS-3 gjennom 12 måneder, viser at kombinasjonen kommune + forskning + privat sektor fungerer.</span>
            </div>
          </div>
        </div>

        {/* Sidene i rapporten — thumbnails */}
        <div style={{padding:'30px 22px 0'}}>
          <P_Kicker color={HC.plumDeep}>De 8 sidene</P_Kicker>
          <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
            Formelt dokument · ferdigformatert · korrekturlest av FHI
          </div>
          <div style={{marginTop:14, display:'flex', gap:10, overflowX:'auto', marginLeft:-22, marginRight:-22, paddingLeft:22, paddingRight:22, paddingBottom:6}}>
            {[
              { n:1, t:'Forord', c:HC.plumDeep },
              { n:2, t:'Sammendrag', c:HC.plum },
              { n:3, t:'Metode', c:HC.plum },
              { n:4, t:'Resultater', c:HC.green },
              { n:5, t:'Deltaker-profil', c:HC.coral },
              { n:6, t:'Økonomi', c:HC.amber },
              { n:7, t:'Anbefalinger', c:HC.coralDeep },
              { n:8, t:'Referanser', c:HC.fgDim },
            ].map((p, i) => (
              <P_PageThumbnail key={i} n={p.n} title={p.t} accent={p.c}/>
            ))}
          </div>
        </div>

        {/* Effektmålet — aggregert */}
        <div style={{padding:'30px 22px 0'}}>
          <P_Kicker color={HC.plumDeep}>Målt effekt · UCLA-LS-3</P_Kicker>
          <div style={{marginTop:12, padding:'18px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:11, color:HC.fgDim, marginBottom:8}}>
              Endring i ensomhet-score over 12 mnd · gruppe vs. kontroll
            </div>
            <div style={{display:'flex', alignItems:'flex-end', gap:14, paddingTop:4}}>
              <div style={{flex:1, textAlign:'center'}}>
                <div style={{height:60, width:'100%', background:`${HC.fgFaint}22`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:HC.fgDim}}>
                  −0,2
                </div>
                <div style={{marginTop:6, fontSize:10, color:HC.fgDim}}>Kontrollgruppe<br/>(n = 1 200)</div>
              </div>
              <div style={{flex:1, textAlign:'center'}}>
                <div style={{height:120, width:'100%', background:`linear-gradient(180deg, ${HC.green}22, ${HC.green})`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:'#FFF'}}>
                  −1,4
                </div>
                <div style={{marginTop:6, fontSize:10, color:HC.fgDim}}>Speedfriending-gruppe<br/>(n = 4 812)</div>
              </div>
            </div>
            <div style={{marginTop:12, paddingTop:10, borderTop:`1px solid ${HC.divider}`, fontSize:10.5, color:HC.fgDim, lineHeight:1.5}}>
              Effektstørrelse Cohen's d = −0,42. Over forventet fra Masi et al. (2011) metaanalyse (d = −0,20).
            </div>
          </div>
        </div>

        {/* Samfunnsøkonomi */}
        <div style={{padding:'30px 22px 0'}}>
          <P_Kicker color={HC.plumDeep}>Samfunnsøkonomi</P_Kicker>
          <div style={{marginTop:10, padding:'16px 18px', borderRadius:12, background:HC.cream, border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>Total programinvestering</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>1,25 MNOK</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>Spart helseutgift (konservativt)</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>6,8 MNOK</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${HC.divider}`, fontSize:11}}>
              <span style={{color:HC.fgDim}}>Produktivitet / sykefravær</span>
              <span style={{color:HC.fg, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>17,6 MNOK</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'10px 0 0', fontSize:12}}>
              <span style={{color:HC.fg, fontWeight:700}}>Netto samfunnsverdi</span>
              <span style={{color:HC.green, fontWeight:700, fontVariantNumeric:'tabular-nums'}}>+ 23,1 MNOK</span>
            </div>
            <div style={{marginTop:4, fontSize:10.5, color:HC.green, textAlign:'right', fontWeight:700}}>
              ROI 19× (konservativt anslag)
            </div>
          </div>
        </div>

        {/* Signaturer — formelt */}
        <div style={{padding:'30px 22px 0'}}>
          <P_Kicker color={HC.plumDeep}>Underskrevet av</P_Kicker>
          <div style={{marginTop:10, padding:'16px 18px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            {[
              { n:'Viktor Sandén', t:'Daglig leder, Speedfriending AS' },
              { n:'Guri Melby', t:'Byråd for folkehelse, Oslo kommune' },
              { n:'Camilla Stoltenberg', t:'Direktør, Folkehelseinstituttet' },
              { n:'Martina Rossi', t:'CMO, Aperol Nordic' },
            ].map((s, i, arr) => (
              <div key={i} style={{
                padding:'10px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{fontFamily:'Caveat, cursive', fontSize:18, color:HC.plumDeep, lineHeight:1}}>{s.n}</div>
                <div style={{marginTop:3, fontSize:10, color:HC.fgDim}}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PDF-knapp */}
        <div style={{padding:'30px 22px 0'}}>
          <div style={{padding:'18px 18px', borderRadius:12, background:'#FFF', border:`2px solid ${HC.plumDeep}`, boxShadow:`0 6px 18px ${HC.plum}22`}}>
            <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
              <P_PDFDoc accent={HC.plumDeep} label="A4"/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
                  Oslo Loneliness Reduction Partnership 2027
                </div>
                <div style={{fontSize:10.5, color:HC.fgDim, marginTop:4, lineHeight:1.5}}>
                  8 sider · A4 · 3,4 MB · Offentlig tilgjengelig
                </div>
              </div>
            </div>
            <button style={{
              marginTop:14, width:'100%', padding:'13px', borderRadius:9,
              background:HC.plumDeep, color:'#FFF', border:'none',
              fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              Last ned PDF →
            </button>
            <div style={{marginTop:10, fontSize:9.5, color:HC.fgFaint, textAlign:'center', lineHeight:1.5}}>
              Sitering: Speedfriending, FHI &amp; Aperol Nordic (2028). Oslo Loneliness Reduction Partnership 2027.
            </div>
          </div>
        </div>

        <div style={{padding:'24px 22px 0', textAlign:'center', fontSize:9.5, color:HC.fgFaint, lineHeight:1.5}}>
          Neste årgang: januar 2029<br/>
          Kontakt: impact@speedfriending.com
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Eksport
// ---------------------------------------------------------------------------

window.H_B2BLanding2 = ScreenB2BLanding2;
window.H_B2BPackages = ScreenB2BPackages;
window.H_B2BConnectDetail = ScreenB2BConnectDetail;
window.H_B2BCustomRequest = ScreenB2BCustomRequest;
window.H_B2BHRDashboard2 = ScreenB2BHRDashboard2;
window.H_B2BHRReport = ScreenB2BHRReport;
window.H_SponsorLanding = ScreenSponsorLanding;
window.H_SponsorPackages = ScreenSponsorPackages;
window.H_SponsorDashboard = ScreenSponsorDashboard;
window.H_SponsorIntegration = ScreenSponsorIntegration;
window.H_SponsorReport = ScreenSponsorReport;
window.H_ImpactReport = ScreenImpactReport;
