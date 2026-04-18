/* global React, HC, H_StatusBarLight */
// Business-overlay — ikke et eget spor/app, men et filter/toggle i eksisterende
// Speedfriending-app. Navy (#2A3B5E) er aksent for alt business-markert;
// coral/plum beholdes for sosiale elementer. Språket er voksent og direkte
// (ikke "connection request", ikke LinkedIn-cold), men fortsatt Speedfriending-varmt.

// --- Felles business-tokens ---
const BIZ = {
  navy: '#2A3B5E',
  navyDeep: '#1A2640',
  navySoft: 'rgba(42,59,94,.12)',
  navyWash: 'rgba(42,59,94,.06)',
};

// Liten pille-komponent for "Business"-tag
function BizTag({ label, filled }) {
  if (filled) {
    return (
      <span style={{
        display:'inline-flex', alignItems:'center', gap:5,
        padding:'4px 10px', borderRadius:10,
        background:BIZ.navy, color:'#FFF',
        fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
      }}>
        <span style={{width:5, height:5, borderRadius:3, background:'#FFF', opacity:.9}}/>
        {label || 'Business'}
      </span>
    );
  }
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'4px 10px', borderRadius:10,
      background:BIZ.navySoft, color:BIZ.navy,
      fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
    }}>
      <span style={{width:5, height:5, borderRadius:3, background:BIZ.navy}}/>
      {label || 'Business'}
    </span>
  );
}

// Liten toppbar med "tilbake" og tittel — gjenbrukes i flere skjermer
function BizTopbar({ title, onBack, right }) {
  return (
    <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:10}}>
      <button onClick={onBack} style={{
        border:'none', background:'transparent', cursor:'pointer', padding:6,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <svg width="10" height="16" viewBox="0 0 10 16">
          <path d="M8 2L2 8l6 6" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{flex:1, fontSize:15, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>{title}</div>
      {right}
    </div>
  );
}

// =============================================================================
// 1) AKTIVER BUSINESS-MODUS
// =============================================================================
// Viktor er i Innstillinger > Business-overlay. En stor toggle lar ham skru
// det på, med tydelig forklaring at dette IKKE er LinkedIn — det er de samme
// mingling-eventene han kjenner, bare merket for profesjonell kontekst.

function ScreenBizActivate() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Innstillinger"/>

        {/* Hero-seksjon: navy-gradient som signal-farge */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{
            background:`linear-gradient(145deg, ${BIZ.navy} 0%, ${BIZ.navyDeep} 100%)`,
            borderRadius:22, padding:'26px 24px 24px', color:'#FFF',
            boxShadow:`0 14px 34px ${BIZ.navy}38`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-50, top:-30, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>
            <div style={{position:'absolute', right:-20, bottom:-60, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.04)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.82}}>
                Business-overlay
              </div>
              <h2 style={{margin:'10px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.2}}>
                Er du gründer, freelancer eller selvstendig næringsdrivende?
              </h2>
              <p style={{margin:'14px 0 0', fontSize:13.5, lineHeight:1.55, opacity:.9}}>
                Aktiver Business-overlay for å se profesjonelle events i feeden din — frokoster, lunsjer, co-working-dager
                med andre gründere.
              </p>
            </div>
          </div>
        </div>

        {/* Selve togglen — stor, tydelig */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, padding:'18px 18px 16px',
            border:`1px solid ${HC.divider}`,
            boxShadow:'0 1px 6px rgba(42,33,52,.04)',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Aktiver Business-overlay</div>
                <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>
                  Legger til business-events i feeden. Kan skrus av når som helst.
                </div>
              </div>
              {/* Toggle i "på"-tilstand, farget navy */}
              <div style={{
                width:50, height:30, borderRadius:15, background:BIZ.navy,
                position:'relative', flexShrink:0,
                boxShadow:`inset 0 1px 3px rgba(0,0,0,.15)`,
              }}>
                <div style={{
                  position:'absolute', right:2, top:2, width:26, height:26, borderRadius:13, background:'#FFF',
                  boxShadow:'0 2px 4px rgba(0,0,0,.2)',
                }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Forklaring — "dette er IKKE LinkedIn" */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:10}}>
            Hva er dette — og hva er det ikke
          </div>

          <div style={{
            background:HC.cream, borderRadius:14, padding:'16px 16px', border:`1px solid ${HC.divider}`,
            marginBottom:10,
          }}>
            <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
              <div style={{
                width:26, height:26, borderRadius:13, background:`${HC.green}22`, color:HC.green,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.5}}>
                <strong style={{fontWeight:700}}>Dette er:</strong> mingle-events der du møter andre gründere og freelancere i ekte,
                uformelle rom. Frokoster, lunsjer, workshop-dager. Du blir kjent med mennesker, ikke leads.
              </div>
            </div>
          </div>

          <div style={{
            background:HC.cream, borderRadius:14, padding:'16px 16px', border:`1px solid ${HC.divider}`,
            marginBottom:10,
          }}>
            <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
              <div style={{
                width:26, height:26, borderRadius:13, background:`${HC.coralDeep}1E`, color:HC.coralDeep,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 4l6 6M10 4l-6 6" stroke={HC.coralDeep} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              </div>
              <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.5}}>
                <strong style={{fontWeight:700}}>Dette er ikke:</strong> LinkedIn-networking. Ingen "connection requests". Ingen pitch-slides.
                Ingen visittkort-utveksling i appen. Hvis noen forsøker å selge til deg, blir de rapportert og stoppet.
              </div>
            </div>
          </div>
        </div>

        {/* Forventning-setting */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:BIZ.navyWash, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${BIZ.navySoft}`,
          }}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:BIZ.navy}}>
              Hvordan feeden endrer seg
            </div>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.55, marginTop:6}}>
              Du får se events merket både <em>social</em> og <em>business</em>. Du kan filtrere hjem-tabben til én av dem,
              eller vise begge. Din sosiale profil forblir skjult for business-deltakere.
            </div>
          </div>
        </div>

        {/* Fotnote */}
        <div style={{padding:'18px 26px 0', fontSize:11, color:HC.fgFaint, lineHeight:1.5, textAlign:'center'}}>
          Business-overlay inkluderes i abonnementet ditt. Ingen ekstra kostnad.
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 2) BUSINESS-FEED
// =============================================================================
// Events filtrert til business-tag. Navy-aksent markerer business,
// men UI-skjelettet er identisk med den sosiale event-feeden.

function ScreenBizFeed() {
  const events = [
    {
      day:'Tor', date:'23. apr', time:'07:30', title:'First Coffee Thursday',
      venue:'Mesh Youngstorget', seats:'4 plasser igjen av 10', price:'245 kr',
      accent:BIZ.navy, gender:'5 kvinner · 5 menn',
    },
    {
      day:'Tor', date:'23. apr', time:'19:00', title:'Solopreneurs After-Work',
      venue:'Bar Brutus', seats:'8 plasser igjen av 20', price:'195 kr',
      accent:BIZ.navy, gender:'balansert',
    },
    {
      day:'Fre', date:'24. apr', time:'11:30', title:'Founders Lunch',
      venue:'Vaaghals · sentrum', seats:'2 plasser igjen av 6', price:'450 kr',
      accent:BIZ.navy, gender:'3 kvinner · 3 menn',
    },
    {
      day:'Lør', date:'25. apr', time:'10:00', title:'Workshop Saturday — fra EPF til AS',
      venue:'SoCentral', seats:'12 plasser igjen av 16', price:'795 kr',
      accent:BIZ.navy, gender:'balansert',
    },
    {
      day:'Tir', date:'28. apr', time:'09:00', title:'Co-working Crew',
      venue:'StartupLab', seats:'3 plasser igjen av 8', price:'395 kr',
      accent:BIZ.navy, gender:'4 kvinner · 4 menn',
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp — med business-badge */}
        <div style={{padding:'22px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <BizTag/>
            <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              Events denne uka
            </h1>
            <div style={{fontSize:12.5, color:HC.fgDim, marginTop:4}}>5 profesjonelle · 12 sosiale</div>
          </div>
          <div style={{width:42, height:42, borderRadius:21, background:'linear-gradient(135deg,#D4A85C,#8A5A3B)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:15}}>
            V
          </div>
        </div>

        {/* Liten filter-bar */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
            {['Alle business', 'Denne uka', 'Mesh', 'StartupLab', 'Helg'].map((f, i) => (
              <button key={i} style={{
                flexShrink:0, padding:'8px 13px', borderRadius:14,
                border: i === 0 ? 'none' : `1px solid ${HC.divider}`,
                background: i === 0 ? BIZ.navy : HC.card,
                color: i === 0 ? '#FFF' : HC.fg,
                fontSize:12, fontWeight:600, cursor:'pointer',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Event-liste */}
        <div style={{padding:'18px 22px 0', display:'flex', flexDirection:'column', gap:10}}>
          {events.map((e, i) => (
            <div key={i} style={{
              background:HC.card, borderRadius:16, padding:'14px 16px',
              border:`1px solid ${HC.divider}`,
              boxShadow:'0 1px 6px rgba(42,33,52,.04)',
              borderLeft:`3px solid ${e.accent}`,
              display:'flex', gap:12,
            }}>
              {/* Dato-blokk */}
              <div style={{
                flexShrink:0, width:54, padding:'10px 0', borderRadius:10,
                background:BIZ.navyWash, color:BIZ.navy,
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', opacity:.8}}>{e.day}</div>
                <div style={{fontSize:18, fontWeight:700, marginTop:2}}>{e.date.split(' ')[0]}</div>
                <div style={{fontSize:9, opacity:.7, marginTop:2}}>{e.time}</div>
              </div>

              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:4}}>
                  <BizTag/>
                </div>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-.005em', lineHeight:1.25}}>
                  {e.title}
                </div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3}}>{e.venue}</div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8, fontSize:11, color:HC.fgDim}}>
                  <span style={{color:BIZ.navy, fontWeight:600}}>{e.seats}</span>
                  <span style={{opacity:.4}}>·</span>
                  <span>{e.gender}</span>
                  <span style={{opacity:.4}}>·</span>
                  <span>{e.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bunnlinje */}
        <div style={{padding:'20px 22px 0', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            Kuratert 50/50 kjønn · verifiserte gründere · ingen salgs-scoutere
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 3) BUSINESS EVENT-DETALJ
// =============================================================================
// Solopreneurs After-Work torsdag 19:00 på Bar Brutus. Deltaker-liste er
// anonymisert — kun profesjon, ingen selskapsnavn, ingen bilder.

function ScreenBizDetail() {
  const attendees = [
    { role:'Utvikler', fase:'Solo · 3 år', gender:'K' },
    { role:'Designer', fase:'Freelance · 5 år', gender:'K' },
    { role:'Regnskapsfører', fase:'EPF · 2 år', gender:'M' },
    { role:'Coach', fase:'AS · 1 ansatt', gender:'K' },
    { role:'Markedsfører', fase:'Freelance · 4 år', gender:'M' },
    { role:'Produkt-lead', fase:'Gründer seed', gender:'K' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:110}}>
        <H_StatusBarLight time="14:23"/>

        {/* Header — navy-gradient stripe i toppen */}
        <div style={{padding:'0'}}>
          <div style={{
            background:`linear-gradient(145deg, ${BIZ.navy} 0%, ${BIZ.navyDeep} 100%)`,
            padding:'0 22px 28px',
            color:'#FFF',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-60, top:-30, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.05)'}}/>

            <div style={{padding:'14px 0 8px', display:'flex', alignItems:'center'}}>
              <button style={{
                border:'none', background:'rgba(255,255,255,.15)', cursor:'pointer', padding:8, borderRadius:18,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="10" height="16" viewBox="0 0 10 16">
                  <path d="M8 2L2 8l6 6" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div style={{marginTop:10, position:'relative'}}>
              <BizTag filled/>
              <h1 style={{margin:'12px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.18}}>
                Solopreneurs After-Work
              </h1>
              <div style={{marginTop:10, fontSize:13, opacity:.92, lineHeight:1.5}}>
                Torsdag 23. april · 19:00–21:30<br/>
                Bar Brutus, Vulkan
              </div>
            </div>
          </div>
        </div>

        {/* Vert */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Vert
          </div>
          <div style={{
            background:HC.card, borderRadius:14, padding:'12px 14px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:40, height:40, borderRadius:20, background:`linear-gradient(135deg, ${BIZ.navy}, ${BIZ.navyDeep})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:14}}>
              S
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Signe · gründer</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>AS · seed-fase · fintech · verifisert</div>
            </div>
            <div style={{
              width:22, height:22, borderRadius:11, background:`${HC.green}22`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        {/* Plasser + balanse */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{display:'flex', gap:8}}>
            <div style={{flex:1, background:HC.card, borderRadius:12, padding:'12px 14px', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Plasser</div>
              <div style={{fontSize:18, fontWeight:700, color:BIZ.navy, marginTop:4, letterSpacing:'-.01em'}}>6 av 8 fylt</div>
            </div>
            <div style={{flex:1, background:HC.card, borderRadius:12, padding:'12px 14px', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Balanse</div>
              <div style={{fontSize:18, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-.01em'}}>4K · 2M</div>
            </div>
          </div>
        </div>

        {/* Deltaker-liste — anonymisert */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy}}>
              Hvem kommer
            </div>
            <div style={{fontSize:11, color:HC.fgFaint}}>Navn vises når du møtes</div>
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'2px 14px', border:`1px solid ${HC.divider}`}}>
            {attendees.map((a, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{
                  width:34, height:34, borderRadius:17, background:BIZ.navySoft,
                  display:'flex', alignItems:'center', justifyContent:'center', color:BIZ.navy,
                  fontWeight:700, fontSize:11,
                }}>
                  {a.gender}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{a.role}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{a.fase}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format-boks */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Hva som skjer
          </div>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.55}}>
              Uformell mingling med første drink inkludert. Vi deler ikke opp i grupper — bare møt folk.
              Ingen pitch-runder. Ingen visittkort-utveksling.
            </div>
          </div>
        </div>

        {/* Culture-note */}
        <div style={{padding:'14px 22px 0'}}>
          <div style={{
            background:BIZ.navyWash, borderRadius:12, padding:'12px 14px',
            border:`1px solid ${BIZ.navySoft}`, fontSize:11.5, color:BIZ.navy, lineHeight:1.55,
          }}>
            <strong style={{fontWeight:700}}>Husk:</strong> Dette er <em>ikke</em> et networking-event. Ingen "korte salgs-pitcher",
            ingen lead-jakt. Bare bli kjent.
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div style={{
        position:'absolute', left:0, right:0, bottom:0,
        padding:'14px 22px 20px',
        background:'linear-gradient(180deg, rgba(244,237,231,0) 0%, rgba(244,237,231,1) 30%)',
        display:'flex', gap:10, alignItems:'center',
      }}>
        <div style={{flex:1}}>
          <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>195 kr</div>
          <div style={{fontSize:10.5, color:HC.fgDim, marginTop:1}}>Inkl. første drink</div>
        </div>
        <button style={{
          padding:'14px 26px', borderRadius:14, border:'none',
          background:BIZ.navy, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
          boxShadow:`0 8px 20px ${BIZ.navy}3A`,
        }}>
          Meld meg på
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 4) BUSINESS-PROFIL-TILLEGG
// =============================================================================
// I Deg-tab: en egen seksjon for profesjonell info. Helt separat fra sosial
// profil. "Bare synlig på business-events."

function ScreenBizProfile() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Din profil"/>

        {/* Tab-strip — veksler mellom Sosial og Business */}
        <div style={{padding:'8px 22px 0'}}>
          <div style={{
            display:'flex', background:HC.card, borderRadius:12, padding:4,
            border:`1px solid ${HC.divider}`, gap:2,
          }}>
            <button style={{
              flex:1, padding:'9px 10px', borderRadius:9, border:'none',
              background:'transparent', color:HC.fgDim, fontSize:12.5, fontWeight:600, cursor:'pointer',
            }}>
              Sosial
            </button>
            <button style={{
              flex:1, padding:'9px 10px', borderRadius:9, border:'none',
              background:BIZ.navy, color:'#FFF', fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Business
            </button>
          </div>
        </div>

        {/* Privacy-melding */}
        <div style={{padding:'14px 22px 0'}}>
          <div style={{
            background:BIZ.navyWash, borderRadius:12, padding:'10px 14px',
            border:`1px solid ${BIZ.navySoft}`,
            display:'flex', alignItems:'center', gap:10,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M7 1.5c2.5 0 4.5 2 4.5 4.5v1h.5a1 1 0 011 1v4.5a1 1 0 01-1 1H2a1 1 0 01-1-1V8a1 1 0 011-1h.5V6c0-2.5 2-4.5 4.5-4.5zm0 1.5A3 3 0 004 6v1h6V6a3 3 0 00-3-3z" fill={BIZ.navy}/>
            </svg>
            <div style={{fontSize:11.5, color:BIZ.navy, fontWeight:600, lineHeight:1.45}}>
              Bare synlig på business-events. Ikke koblet til din sosiale profil.
            </div>
          </div>
        </div>

        {/* Profilkort */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, padding:'18px 18px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{width:56, height:56, borderRadius:28, background:`linear-gradient(135deg, ${BIZ.navy}, ${BIZ.navyDeep})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:19}}>
              V
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:15, fontWeight:700, color:HC.fg}}>Viktor · grunnlegger</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>Speedfriending AS · seed-fase</div>
              <div style={{display:'inline-flex', alignItems:'center', gap:4, marginTop:6, padding:'2px 8px', borderRadius:8, background:`${HC.green}18`, color:HC.green, fontSize:10, fontWeight:700, letterSpacing:'.05em'}}>
                <svg width="9" height="9" viewBox="0 0 9 9"><path d="M2 5l2 2 3-4" stroke={HC.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Verifisert gründer
              </div>
            </div>
          </div>
        </div>

        {/* Felter */}
        <div style={{padding:'20px 22px 0', display:'flex', flexDirection:'column', gap:10}}>
          {/* Yrke */}
          <div style={{background:HC.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:4}}>
              Yrke / rolle
            </div>
            <div style={{fontSize:13.5, fontWeight:600, color:HC.fg}}>
              Gründer, produktansvarlig
            </div>
          </div>

          {/* Bransje */}
          <div style={{background:HC.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:4}}>
              Bransje
            </div>
            <div style={{fontSize:13.5, fontWeight:600, color:HC.fg}}>
              Consumer tech · sosial
            </div>
          </div>

          {/* Fase */}
          <div style={{background:HC.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:4}}>
              Fase
            </div>
            <div style={{fontSize:13.5, fontWeight:600, color:HC.fg}}>
              Seed, første 10 ansatte
            </div>
          </div>

          {/* Ser etter */}
          <div style={{background:BIZ.navyWash, borderRadius:12, padding:'14px 16px', border:`1px solid ${BIZ.navySoft}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:BIZ.navy, marginBottom:6}}>
              Jeg ser etter innspill på
            </div>
            <div style={{fontSize:13, color:HC.fg, lineHeight:1.5}}>
              Hvordan håndtere første nedbemanning — og folk som har vært gjennom en Series A uten å bli spist opp.
            </div>
          </div>

          {/* Kan hjelpe med */}
          <div style={{background:HC.cream, borderRadius:12, padding:'14px 16px', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim, marginBottom:6}}>
              Jeg kan hjelpe med
            </div>
            <div style={{fontSize:13, color:HC.fg, lineHeight:1.5}}>
              Consumer-app go-to-market · onboarding-optimalisering · community-building fra null.
            </div>
          </div>
        </div>

        {/* Edit-knapp */}
        <div style={{padding:'20px 22px 0'}}>
          <button style={{
            width:'100%', padding:'14px', borderRadius:12,
            background:'transparent', color:BIZ.navy,
            border:`1px solid ${BIZ.navy}`,
            fontSize:13.5, fontWeight:700, cursor:'pointer',
          }}>
            Rediger business-profil
          </button>
        </div>

        {/* Eksplisitt privacy-fotnote */}
        <div style={{padding:'16px 26px 0', fontSize:11, color:HC.fgFaint, lineHeight:1.5, textAlign:'center'}}>
          Business-profil deles kun med deltakere på events du melder deg på. Aldri synlig i Social-feeden.
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 5) GRÜNDER-VERIFISERING
// =============================================================================
// LinkedIn-lenk eller Brønnøysund-registerupload. Enkelt, ikke-kaldt.

function ScreenBizVerify() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Verifiser gründer-status"/>

        {/* Motivasjon */}
        <div style={{padding:'14px 22px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy}}>
            Steg 1 av 3
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Vis at du er ekte.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55}}>
            Dette hjelper oss holde events ekte — ingen cold-sale-scoutere, ingen MLM-rekruttører. Bare folk som faktisk
            bygger noe.
          </p>
        </div>

        {/* Metode 1: LinkedIn */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            Velg én metode
          </div>

          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14, cursor:'pointer',
            textAlign:'left',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10, background:'#0A66C2',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              color:'#FFF', fontWeight:700, fontSize:17, fontFamily:'serif',
            }}>
              in
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Lenk LinkedIn-profil</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
                Raskest. Vi henter kun rolle og selskap — ikke kontakter eller innlegg.
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Metode 2: BRREG */}
        <div style={{padding:'10px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14, cursor:'pointer',
            textAlign:'left',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10, background:BIZ.navyWash,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:BIZ.navy,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M3 7l6-4 6 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" fill="none" stroke={BIZ.navy} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M7 16v-5h4v5" fill="none" stroke={BIZ.navy} strokeWidth="1.5"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Slå opp i Brønnøysund</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
                Skriv inn org.nr — vi verifiserer automatisk at du står registrert.
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Metode 3: Manuell */}
        <div style={{padding:'10px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14, cursor:'pointer',
            textAlign:'left',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10, background:`${HC.amber}22`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:HC.amber,
            }}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path d="M3 14h11M8.5 3v8M5 7l3.5-3 3.5 3" fill="none" stroke={HC.amber} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Last opp dokumentasjon</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
                Gjennomgås manuelt innen 24 timer. For EPF uten AS-registrering.
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Hvorfor-boks */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            background:BIZ.navyWash, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${BIZ.navySoft}`,
          }}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:BIZ.navy, marginBottom:6}}>
              Hvorfor vi spør
            </div>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.55}}>
              Forrige gang vi kjørte events uten verifisering, dukket det opp forsikringsselgere og nettverks-MLM-folk.
              Ekte gründere sluttet å komme. Nå stopper vi det i døra.
            </div>
          </div>
        </div>

        {/* Privacy-fotnote */}
        <div style={{padding:'16px 26px 0', fontSize:11, color:HC.fgFaint, lineHeight:1.55, textAlign:'center'}}>
          Vi lagrer verifiserings-metadata, ikke kildedokumenter. LinkedIn-token kan trekkes tilbake når som helst.
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 6) BUSINESS-CREW
// =============================================================================
// 5 gründere som møtes månedlig som "Co-working Crew". Samme mekanikk som
// sosial crew, men navy-fargetoner og profesjonell framing.

function ScreenBizCrew() {
  const members = [
    { n:'Signe',  role:'Fintech-gründer',      bg:'linear-gradient(135deg,#8CA4CC,#2E4A75)', last:'I går · delte en cashflow-mal' },
    { n:'Torstein', role:'UX-freelancer',       bg:'linear-gradient(135deg,#7895C4,#1E3B66)', last:'18. apr · var på lunsj' },
    { n:'Mari',   role:'Regnskaps-solo',       bg:'linear-gradient(135deg,#A4B8D4,#4A6090)', last:'14. apr · skal skalere' },
    { n:'Kristoffer', role:'Dev-tool gründer',  bg:'linear-gradient(135deg,#9CAFCC,#3A5680)', last:'12. apr · fikk første kunde' },
    { n:'Viktor', role:'Consumer-tech (deg)',  bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)', last:'— du', self:true },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Ditt crew" right={<BizTag/>}/>

        {/* Hero */}
        <div style={{padding:'8px 22px 0'}}>
          <div style={{
            background:`linear-gradient(145deg, ${BIZ.navy} 0%, ${BIZ.navyDeep} 100%)`,
            borderRadius:20, padding:'22px 22px 20px', color:'#FFF',
            boxShadow:`0 12px 28px ${BIZ.navy}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-40, top:-30, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.07)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', opacity:.85}}>
                Co-working Crew
              </div>
              <h2 style={{margin:'8px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.2}}>
                De andre fire som faktisk skjønner
              </h2>
              <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.5, opacity:.9}}>
                5 gründere, månedlig lunsj første fredag. Alle tidligfase, alle har egne AS eller EPF.
              </p>
              <div style={{display:'flex', alignItems:'center', gap:14, marginTop:14, fontSize:11.5, opacity:.85}}>
                <span>Neste: fre 2. mai · 12:00</span>
                <span style={{opacity:.5}}>·</span>
                <span>Smalhans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medlemmer */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:10}}>
            Medlemmer (5)
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'2px 14px', border:`1px solid ${HC.divider}`}}>
            {members.map((m, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                opacity: m.self ? .85 : 1,
              }}>
                <div style={{width:38, height:38, borderRadius:19, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:14}}>
                  {m.n[0]}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{m.n}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{m.role}</div>
                </div>
                <div style={{fontSize:10.5, color:HC.fgFaint, textAlign:'right', maxWidth:110, lineHeight:1.35}}>
                  {m.last}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fellesrom */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:10}}>
            Fellesrom
          </div>
          <div style={{
            background:HC.card, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:36, height:36, borderRadius:10, background:BIZ.navyWash, color:BIZ.navy, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path d="M3 5a2 2 0 012-2h7a2 2 0 012 2v6a2 2 0 01-2 2h-4l-2 3v-3H5a2 2 0 01-2-2V5z" fill="none" stroke={BIZ.navy} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Gruppe-chat</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>Signe: "Anyone har erfaring med Stripe-kontoer for AS?" · 2t</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Stat-boks */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', justifyContent:'space-between',
          }}>
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Møttes</div>
              <div style={{fontSize:16, fontWeight:700, color:BIZ.navy, marginTop:3}}>4 ganger</div>
            </div>
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Sammen siden</div>
              <div style={{fontSize:16, fontWeight:700, color:BIZ.navy, marginTop:3}}>januar</div>
            </div>
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Kjønn</div>
              <div style={{fontSize:16, fontWeight:700, color:BIZ.navy, marginTop:3}}>2K · 3M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 7) KVINNER-FØRST TOGGLE
// =============================================================================
// Bumble-Bizz-inspirert. I Business-innstillinger: en toggle der Viktor (mann)
// kan aktivere "Kvinner åpner chat først". Inspirert av konseptet, men norsk:
// ikke gamifisert, bare trygt.

function ScreenBizWomenFirst() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Chat-regler"/>

        {/* Hero */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:20, padding:'22px 22px',
            border:`1px solid ${HC.divider}`,
            boxShadow:'0 2px 10px rgba(42,33,52,.04)',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
              <div style={{
                width:36, height:36, borderRadius:18, background:`${HC.lilac}22`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="6" r="3.5" fill="none" stroke={HC.plum} strokeWidth="1.6"/>
                  <path d="M3 16c0-3.5 3-5.5 6-5.5s6 2 6 5.5" fill="none" stroke={HC.plum} strokeWidth="1.6"/>
                </svg>
              </div>
              <BizTag/>
            </div>
            <h1 style={{margin:'6px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
              Kvinner åpner chat først
            </h1>
            <p style={{margin:'12px 0 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55}}>
              Norske gründer-events er ofte mannsdominerte. Uten design-grep blir kvinner raskt overvelmed av meldinger
              etter events. Dette er vårt svar.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, padding:'18px 18px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>La kvinner åpne først</div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>
                Hvis du matcher med en kvinne etter et event, kan hun sende første melding. Du kan svare når hun gjør det.
              </div>
            </div>
            <div style={{
              width:50, height:30, borderRadius:15, background:BIZ.navy,
              position:'relative', flexShrink:0,
              boxShadow:'inset 0 1px 3px rgba(0,0,0,.15)',
            }}>
              <div style={{position:'absolute', right:2, top:2, width:26, height:26, borderRadius:13, background:'#FFF', boxShadow:'0 2px 4px rgba(0,0,0,.2)'}}/>
            </div>
          </div>
        </div>

        {/* Explainer-steg */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:10}}>
            Slik fungerer det
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {[
              { n:1, title:'Dere møtes på event', sub:'Du og en kvinne treffes på en Founders Lunch.' },
              { n:2, title:'Begge markerer "hold kontakt"', sub:'Post-event i appen — gjensidig samtykke.' },
              { n:3, title:'Hun kan sende første melding', sub:'Du ser matchen, men kan ikke chate først.' },
              { n:4, title:'Dere snakker normalt fra da', sub:'Ingen begrensninger etter første melding.' },
            ].map((s, i) => (
              <div key={i} style={{
                background:HC.card, borderRadius:12, padding:'12px 14px', border:`1px solid ${HC.divider}`,
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{
                  width:28, height:28, borderRadius:14, background:BIZ.navyWash, color:BIZ.navy,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12.5, fontWeight:700, flexShrink:0,
                }}>
                  {s.n}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{s.title}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nyansering */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            background:BIZ.navyWash, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${BIZ.navySoft}`,
          }}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:BIZ.navy, marginBottom:6}}>
              Hvorfor default på
            </div>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.55}}>
              Kvinnelig NPS i mannsdominerte miljøer faller raskt ved ubalanse. Dette grepet koster deg ingenting — du kan
              fortsatt svare og ta initiativ senere. Men det lar henne velge tempoet.
            </div>
          </div>
        </div>

        {/* Valg */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.55, textAlign:'center'}}>
            Ikke-binære brukere får velge om de vil telles som "kan åpne" eller "venter". Samme sosial logikk som Bumble Bizz.
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 8) POST-EVENT BUSINESS-NOTAT
// =============================================================================
// Etter event: Viktor har vært på Founders Lunch, kan notere for seg selv.
// Privat — ikke synlig for andre, ikke synkronisert til Social-siden av app.

function ScreenBizNote() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:110}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Etter event"/>

        {/* Event-kontekst */}
        <div style={{padding:'8px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:14, padding:'12px 14px',
            border:`1px solid ${HC.divider}`, borderLeft:`3px solid ${BIZ.navy}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{
              width:38, height:38, borderRadius:10, background:BIZ.navyWash, color:BIZ.navy,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <rect x="3" y="4" width="12" height="11" rx="1.5" fill="none" stroke={BIZ.navy} strokeWidth="1.4"/>
                <path d="M3 7.5h12M6 2v3M12 2v3" stroke={BIZ.navy} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <BizTag/>
              </div>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:5}}>Founders Lunch · Vaaghals</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>Fredag 18. april · 11:30–13:00</div>
            </div>
          </div>
        </div>

        {/* Privacy-badge */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 10px', borderRadius:10,
            background:BIZ.navyWash, color:BIZ.navy,
            fontSize:10.5, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M5 1c1.5 0 2.5 1 2.5 2.5V4H8a.5.5 0 01.5.5v3A.5.5 0 018 8H2a.5.5 0 01-.5-.5v-3A.5.5 0 012 4h.5V3.5C2.5 2 3.5 1 5 1z" fill={BIZ.navy}/>
            </svg>
            Privat notat · bare du ser det
          </div>
        </div>

        {/* Prompt */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Hva du vil huske
          </div>
        </div>

        {/* Hovedtekst-felt */}
        <div style={{padding:'0 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:14, padding:'16px 16px',
            border:`1px solid ${HC.divider}`, minHeight:160,
          }}>
            <div style={{fontSize:13.5, color:HC.fg, lineHeight:1.55}}>
              Snakket med <strong style={{color:BIZ.navy, fontWeight:700}}>Kari</strong> om mulig samarbeid på community-bygging — hun har vært gjennom første Series A i en consumer-app og skjønner
              <em> eksakt</em> hvor vi står.<br/><br/>
              Invitér til kaffe neste uke, gjerne før workshop på SoCentral.<br/><br/>
              <span style={{color:HC.fgDim}}>Også: <strong style={{color:HC.fg, fontWeight:700}}>Magnus</strong> jobber med B2B-SaaS onboarding — ikke relevant nå, men notér for senere.</span>
            </div>
          </div>
        </div>

        {/* Personer du møtte */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Personer fra eventet
          </div>
          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
            {[
              { n:'Kari',   role:'Consumer-gründer', tagged:true },
              { n:'Magnus', role:'B2B-SaaS',          tagged:false },
              { n:'Ingrid', role:'UX-freelancer',     tagged:false },
              { n:'Lars',   role:'Fintech-PM',        tagged:false },
              { n:'Hanne',  role:'Growth-coach',      tagged:false },
            ].map((p, i) => (
              <div key={i} style={{
                flexShrink:0, width:96, padding:'10px 10px', borderRadius:12,
                background:HC.card,
                border: p.tagged ? `1.5px solid ${BIZ.navy}` : `1px solid ${HC.divider}`,
                textAlign:'center',
              }}>
                <div style={{width:32, height:32, borderRadius:16, background:`${BIZ.navy}22`, color:BIZ.navy, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, margin:'0 auto'}}>
                  {p.n[0]}
                </div>
                <div style={{fontSize:11.5, fontWeight:700, color:HC.fg, marginTop:6}}>{p.n}</div>
                <div style={{fontSize:10, color:HC.fgDim, marginTop:1, lineHeight:1.25}}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:12, padding:'12px 14px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:10,
          }}>
            <div style={{
              width:28, height:28, borderRadius:14, background:`${HC.amber}22`, color:HC.amber,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <circle cx="7" cy="7" r="5.5" fill="none" stroke={HC.amber} strokeWidth="1.4"/>
                <path d="M7 4v3.5l2 1.5" stroke={HC.amber} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1, fontSize:12, color:HC.fg, lineHeight:1.45}}>
              <strong style={{fontWeight:700}}>Påminn om 7 dager</strong> · hvis du ikke har kontaktet Kari innen da
            </div>
            <div style={{
              width:36, height:22, borderRadius:11, background:BIZ.navy,
              position:'relative', flexShrink:0,
            }}>
              <div style={{position:'absolute', right:2, top:2, width:18, height:18, borderRadius:9, background:'#FFF'}}/>
            </div>
          </div>
        </div>

        {/* Privacy-fotnote */}
        <div style={{padding:'16px 26px 0', fontSize:11, color:HC.fgFaint, lineHeight:1.55, textAlign:'center'}}>
          Notater synkroniseres kryptert på tvers av enhetene dine. Aldri synlig for andre deltakere, aldri indeksert.
        </div>
      </div>

      {/* Sticky lagre-knapp */}
      <div style={{
        position:'absolute', left:0, right:0, bottom:0,
        padding:'14px 22px 20px',
        background:'linear-gradient(180deg, rgba(244,237,231,0) 0%, rgba(244,237,231,1) 30%)',
      }}>
        <button style={{
          width:'100%', padding:'14px', borderRadius:14, border:'none',
          background:BIZ.navy, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
          boxShadow:`0 8px 20px ${BIZ.navy}3A`,
        }}>
          Lagre notat
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 9) PARTNER-FORSLAG (Frida)
// =============================================================================
// Frida (maskoten) foreslår: "Du og Simen jobber begge med bærekraft-startups.
// Han deltar på Founders Lunch fredag. Vil du se eventet?"

function ScreenBizPartnerSuggest() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        <BizTopbar title="Forslag fra Frida"/>

        {/* Frida-kort (stor) */}
        <div style={{padding:'8px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:20, padding:'22px 22px',
            border:`1px solid ${HC.divider}`,
            boxShadow:'0 8px 24px rgba(42,33,52,.06)',
            position:'relative', overflow:'hidden',
          }}>
            {/* Frida-avatar (placeholder til faktisk maskot er designet) */}
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
              <div style={{
                width:44, height:44, borderRadius:22,
                background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#FFF', fontWeight:700, fontSize:17,
                boxShadow:`0 4px 12px ${HC.coral}40`,
              }}>
                F
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Frida</div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>foreslår noen for deg</div>
              </div>
              <BizTag/>
            </div>

            <div style={{fontSize:14.5, color:HC.fg, lineHeight:1.55, fontWeight:500}}>
              Du og <strong style={{color:BIZ.navy, fontWeight:700}}>Simen</strong> jobber begge med bærekraft-startups. Han har vært gjennom grønn investering-runde i år.
            </div>
            <div style={{marginTop:10, fontSize:13, color:HC.fgDim, lineHeight:1.55}}>
              Han deltar på <strong style={{color:HC.fg, fontWeight:700}}>Founders Lunch fredag 25. april på Vaaghals</strong>. 2 plasser igjen.
            </div>
          </div>
        </div>

        {/* Simen-kort */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Om Simen
          </div>
          <div style={{
            background:HC.card, borderRadius:14, padding:'16px 16px',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
              <div style={{width:48, height:48, borderRadius:24, background:'linear-gradient(135deg,#8CA4CC,#2E4A75)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:17}}>
                S
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Simen · gründer</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>Grønn logistikk-AS · seed-fase · Oslo</div>
              </div>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:4, padding:'3px 8px', borderRadius:8,
                background:`${HC.green}18`, color:HC.green, fontSize:9.5, fontWeight:700, letterSpacing:'.05em',
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4l2 2 3-4" stroke={HC.green} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                VERIFISERT
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:4}}>
              <div>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Felles grunnlag</div>
                <div style={{fontSize:12.5, color:HC.fg, marginTop:3, lineHeight:1.5}}>
                  Begge consumer-facing · begge seed-fase · begge basert i Oslo sentrum
                </div>
              </div>
              <div style={{borderTop:`1px solid ${HC.divider}`, paddingTop:8}}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Hva han trenger innspill på</div>
                <div style={{fontSize:12.5, color:HC.fg, marginTop:3, lineHeight:1.5}}>
                  Community-bygging — noe du akkurat skrev du kan bidra med.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eventet */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy, marginBottom:8}}>
            Eventet
          </div>
          <div style={{
            background:HC.card, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            borderLeft:`3px solid ${BIZ.navy}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{
              flexShrink:0, width:48, padding:'8px 0', borderRadius:10,
              background:BIZ.navyWash, color:BIZ.navy,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', opacity:.8}}>Fre</div>
              <div style={{fontSize:16, fontWeight:700, marginTop:1}}>25</div>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, letterSpacing:'-.005em'}}>Founders Lunch</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>11:30 · Vaaghals · 450 kr · 2 plasser igjen</div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{padding:'22px 22px 0', display:'flex', flexDirection:'column', gap:8}}>
          <button style={{
            width:'100%', padding:'14px 18px', borderRadius:14, border:'none',
            background:BIZ.navy, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
            boxShadow:`0 8px 20px ${BIZ.navy}3A`,
          }}>
            Se eventet
          </button>
          <button style={{
            width:'100%', padding:'13px 18px', borderRadius:14,
            background:'transparent', color:HC.fgDim,
            border:`1px solid ${HC.divider}`,
            fontSize:13, fontWeight:600, cursor:'pointer',
          }}>
            Ikke interessant denne gang
          </button>
        </div>

        {/* Bunntekst */}
        <div style={{padding:'16px 26px 0', fontSize:11, color:HC.fgFaint, lineHeight:1.55, textAlign:'center'}}>
          Frida foreslår basert på fase og bransje — ikke på tidligere kontakter eller salgsdata.
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 10) BUSINESS-SWITCHER (rask filter i Hjem)
// =============================================================================
// I toppen av Hjem-tab: tre-valg-bryter "Alle / Social / Business". Filtrerer
// feeden umiddelbart. Viser hvordan Business-overlay integrerer seg uten å
// føle seg som et eget spor.

function ScreenBizSwitcher() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="14:23"/>

        {/* Header */}
        <div style={{padding:'22px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Torsdag</div>
            <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              Hei Viktor.
            </h1>
          </div>
          <div style={{width:42, height:42, borderRadius:21, background:'linear-gradient(135deg,#D4A85C,#8A5A3B)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:15}}>
            V
          </div>
        </div>

        {/* Switcher — tre-veis */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            display:'flex', background:HC.card, borderRadius:14, padding:4,
            border:`1px solid ${HC.divider}`, gap:2,
            boxShadow:'0 1px 6px rgba(42,33,52,.04)',
          }}>
            <button style={{
              flex:1, padding:'10px 8px', borderRadius:10, border:'none',
              background:'transparent', color:HC.fgDim, fontSize:12.5, fontWeight:600, cursor:'pointer',
            }}>
              Alle
            </button>
            <button style={{
              flex:1, padding:'10px 8px', borderRadius:10, border:'none',
              background:'transparent', color:HC.fgDim, fontSize:12.5, fontWeight:600, cursor:'pointer',
            }}>
              Social
            </button>
            <button style={{
              flex:1, padding:'10px 8px', borderRadius:10, border:'none',
              background:BIZ.navy, color:'#FFF', fontSize:12.5, fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:5,
            }}>
              <span style={{width:5, height:5, borderRadius:3, background:'#FFF', opacity:.9}}/>
              Business
            </button>
          </div>
        </div>

        {/* Kontekst-hint */}
        <div style={{padding:'12px 22px 0'}}>
          <div style={{fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
            <strong style={{color:BIZ.navy, fontWeight:700}}>Business-filter aktivt.</strong> Viser 5 events denne uka. Sosiale events skjult.
          </div>
        </div>

        {/* Kveldens event (filtrert til business) */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            I kveld
          </div>
          <div style={{
            background:`linear-gradient(135deg, ${BIZ.navy} 0%, ${BIZ.navyDeep} 100%)`,
            borderRadius:20, padding:'20px 22px', color:'#fff',
            boxShadow:`0 12px 28px ${BIZ.navy}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-40, top:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', opacity:.88}}>19:00 · BAR BRUTUS</div>
              <h2 style={{margin:'6px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.15}}>
                Solopreneurs After-Work
              </h2>
              <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.5, opacity:.95}}>
                6 andre kommer — 4 kvinner, 2 menn. Balansert og uformelt.
              </p>
              <div style={{display:'flex', alignItems:'center', gap:16, marginTop:16, fontSize:12, opacity:.88}}>
                <span>Start om 4 t 37 min</span>
                <span style={{opacity:.5}}>·</span>
                <span>Vulkan</span>
              </div>
              <button style={{
                marginTop:16, padding:'10px 18px', borderRadius:22, border:'none',
                background:'rgba(255,255,255,.95)', color:BIZ.navy, fontSize:13.5, fontWeight:700, cursor:'pointer',
              }}>
                Se detaljer
              </button>
            </div>
          </div>
        </div>

        {/* Resten av uka — kun business */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:BIZ.navy}}>
              Resten av uka
            </div>
            <button style={{background:'transparent', border:'none', fontSize:12, color:HC.fgDim, fontWeight:600, cursor:'pointer', padding:0}}>
              Se alle →
            </button>
          </div>
          <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6, marginLeft:-2, marginRight:-22, paddingLeft:2, paddingRight:22}}>
            {[
              { d:'Fre', t:'11:30', title:'Founders Lunch',  loc:'Vaaghals' },
              { d:'Lør', t:'10:00', title:'Workshop Saturday',loc:'SoCentral' },
              { d:'Tir', t:'09:00', title:'Co-working Crew',  loc:'StartupLab' },
              { d:'Ons', t:'07:30', title:'First Coffee',     loc:'Mesh' },
            ].map((e, i) => (
              <div key={i} style={{
                flexShrink:0, width:160, padding:'14px 14px', borderRadius:14,
                background:HC.card, border:`1px solid ${HC.divider}`,
                borderLeft:`3px solid ${BIZ.navy}`,
                boxShadow:'0 1px 4px rgba(42,33,52,.03)',
              }}>
                <div style={{width:34, height:34, borderRadius:10, background:BIZ.navyWash, color:BIZ.navy, fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1.1}}>
                  <span>{e.d}</span>
                  <span style={{fontSize:9.5, opacity:.7, marginTop:1}}>{e.t}</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:10, lineHeight:1.25}}>{e.title}</div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{e.loc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bytt overlay-mente */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:32, height:32, borderRadius:16, background:`${HC.plum}14`, color:HC.plum, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3 5h8M3 9h6" stroke={HC.plum} strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="11" cy="9" r="1.5" fill={HC.plum}/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>Vil du også se sosiale events?</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>Bytt til "Alle" for å kombinere feeden.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Eksport
// =============================================================================

window.H_ScreenBizActivate        = ScreenBizActivate;
window.H_ScreenBizFeed            = ScreenBizFeed;
window.H_ScreenBizDetail          = ScreenBizDetail;
window.H_ScreenBizProfile         = ScreenBizProfile;
window.H_ScreenBizVerify          = ScreenBizVerify;
window.H_ScreenBizCrew            = ScreenBizCrew;
window.H_ScreenBizWomenFirst      = ScreenBizWomenFirst;
window.H_ScreenBizNote            = ScreenBizNote;
window.H_ScreenBizPartnerSuggest  = ScreenBizPartnerSuggest;
window.H_ScreenBizSwitcher        = ScreenBizSwitcher;
