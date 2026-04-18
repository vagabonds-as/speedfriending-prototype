/* global React, HC, H_StatusBarLight */
// Website-suite: 6 landingssider for speedfriending.no — forbruker, ambassadør, B2B,
// sponsor, presse og investor. Hver er rendret i mobilviewport (402×874) for å
// simulere mobilbrowseren, men repreresenterer hele nettsiden.
//
// Designprinsipper:
//   - Fraunces serif-font for hero-overskrifter (magasin-følelse, ikke tech-startup-glatt)
//   - Mye whitespace
//   - Sosial proof overalt (tall, sitater, logoer)
//   - Samme farge-system som app (plum/coral), men voksen web-tone
//   - Norsk gjennomgående

// ---------------------------------------------------------------------------
// Felles primitiver
// ---------------------------------------------------------------------------

const SERIF = '"Fraunces", Georgia, serif';
const SANS = '-apple-system, "SF Pro Display", "Roboto", system-ui, sans-serif';

function W_Chrome({ children, bg }) {
  // Mobilbrowser-ramme — ingen tab-bar. Bare telefonform, status bar, og hjemindikator.
  return (
    <div style={{
      width:402, height:874, borderRadius:52, overflow:'hidden', position:'relative',
      background: bg || '#FFFFFF',
      boxShadow:'0 0 0 12px #0F0812, 0 0 0 13px rgba(255,255,255,.06), 0 60px 120px rgba(0,0,0,.5), 0 20px 40px rgba(0,0,0,.3)',
      fontFamily: SANS,
    }}>
      <div style={{position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:124, height:36, borderRadius:22, background:'#000', zIndex:50}}/>
      <div style={{position:'absolute', inset:0}}>{children}</div>
      <div style={{position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:138, height:5, borderRadius:3, background:'rgba(0,0,0,.25)', zIndex:60}}/>
    </div>
  );
}

function W_BrowserBar({ url = 'speedfriending.no', dark }) {
  // Simulert browser-adresserad — gir webkontekst uten å ta mye plass.
  const fg = dark ? 'rgba(255,255,255,.72)' : HC.fgDim;
  const bg = dark ? 'rgba(255,255,255,.08)' : 'rgba(42,33,52,.05)';
  return (
    <div style={{
      margin:'8px 14px 0', padding:'7px 12px', borderRadius:10,
      background: bg,
      display:'flex', alignItems:'center', gap:8,
      fontSize:11.5, color: fg, fontWeight:500,
    }}>
      <svg width="11" height="11" viewBox="0 0 11 11" style={{flexShrink:0}}>
        <rect x="2.5" y="5" width="6" height="4.5" rx="1" fill="none" stroke={fg} strokeWidth="1"/>
        <path d="M4 5V3.5a1.5 1.5 0 013 0V5" fill="none" stroke={fg} strokeWidth="1"/>
      </svg>
      <span>{url}</span>
    </div>
  );
}

function W_Logo({ color = HC.fg, size = 'normal' }) {
  // Speedfriending-wordmark i Fraunces — magasin, ikke tech.
  const fs = size === 'large' ? 22 : 17;
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:7}}>
      <div style={{
        width: size === 'large' ? 22 : 18,
        height: size === 'large' ? 22 : 18,
        borderRadius: size === 'large' ? 6 : 5,
        background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
      }}/>
      <span style={{
        fontFamily: SERIF, fontSize: fs, fontWeight:700, letterSpacing:'-.015em', color,
      }}>
        Speedfriending
      </span>
    </div>
  );
}

function W_NavBar({ dark, active }) {
  // Top-nav: logo + to-tre lenker + CTA. Kompakt nok for 402px.
  const fg = dark ? '#FFF' : HC.fg;
  const fgDim = dark ? 'rgba(255,255,255,.6)' : HC.fgDim;
  return (
    <div style={{
      padding:'14px 20px 10px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <W_Logo color={fg}/>
      <div style={{
        width:26, height:26, borderRadius:6,
        display:'flex', flexDirection:'column', justifyContent:'center', gap:4,
        alignItems:'center',
      }}>
        <div style={{width:16, height:1.5, background:fg, borderRadius:1}}/>
        <div style={{width:16, height:1.5, background:fg, borderRadius:1}}/>
      </div>
    </div>
  );
}

function W_Kicker({ children, color }) {
  return (
    <div style={{
      fontSize:10, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase',
      color: color || HC.plum,
    }}>
      {children}
    </div>
  );
}

function W_SectionLabel({ children, color }) {
  // Større kapitteltittel, Fraunces semi.
  return (
    <div style={{
      fontFamily:SERIF, fontSize:11, fontWeight:700, letterSpacing:'.2em',
      textTransform:'uppercase', color: color || HC.plum, marginBottom:8,
    }}>
      {children}
    </div>
  );
}

function W_Divider({ dark, dashed }) {
  const c = dark ? 'rgba(255,255,255,.14)' : HC.divider;
  return <div style={{height:1, background: dashed ? 'transparent' : c, borderTop: dashed ? `1px dashed ${c}` : 'none'}}/>;
}

function W_PressLogos({ dark }) {
  // Aspiratsjonelle VG/Dagbladet/NRK-logoer — kun tekst, ikke ekte bitmap.
  const c = dark ? 'rgba(255,255,255,.72)' : HC.fgDim;
  const items = [
    { n:'VG', style:{ fontWeight:900, fontSize:17, letterSpacing:'.02em' } },
    { n:'Dagbladet', style:{ fontFamily:SERIF, fontStyle:'italic', fontWeight:700, fontSize:14 } },
    { n:'NRK', style:{ fontWeight:800, fontSize:15, letterSpacing:'.08em' } },
    { n:'Aftenposten', style:{ fontFamily:SERIF, fontWeight:600, fontSize:12 } },
    { n:'E24', style:{ fontWeight:800, fontSize:15 } },
  ];
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'0 2px', gap:10,
    }}>
      {items.map((it, i) => (
        <div key={i} style={{ color:c, opacity:.75, ...it.style }}>{it.n}</div>
      ))}
    </div>
  );
}

function W_Footer({ dark }) {
  // Kompakt footer brukt på alle sider.
  const fg = dark ? '#FFF' : HC.fg;
  const fgDim = dark ? 'rgba(255,255,255,.54)' : HC.fgDim;
  const fgFaint = dark ? 'rgba(255,255,255,.36)' : HC.fgFaint;
  const div = dark ? 'rgba(255,255,255,.14)' : HC.divider;
  return (
    <div style={{
      marginTop:40, padding:'28px 22px 24px',
      background: dark ? 'transparent' : HC.cream,
      borderTop: `1px solid ${div}`,
    }}>
      <W_Logo color={fg}/>
      <div style={{marginTop:14, fontSize:12, lineHeight:1.6, color:fgDim, maxWidth:260}}>
        Den første plattformen som måler og reduserer ensomhet i Norge. Mål: −1 UCLA-poeng for 100 000 nordmenn innen 2030.
      </div>

      <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
        <div>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:fgFaint, marginBottom:8}}>Selskap</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, fontSize:12, color:fgDim}}>
            <div>Om oss</div>
            <div>Presse</div>
            <div>Investorer</div>
            <div>Kontakt</div>
            <div>Karriere</div>
          </div>
        </div>
        <div>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:fgFaint, marginBottom:8}}>Løsninger</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, fontSize:12, color:fgDim}}>
            <div>For brukere</div>
            <div>Ambassadører</div>
            <div>Bedrifter</div>
            <div>Sponsorer</div>
            <div>Vertskap</div>
          </div>
        </div>
      </div>

      <div style={{marginTop:22, paddingTop:16, borderTop:`1px solid ${div}`, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10.5, color:fgFaint}}>
        <span>Speedfriending AS · 925 111 222</span>
        <span>Oslo · Trondheim</span>
      </div>
      <div style={{marginTop:8, fontSize:10, color:fgFaint, display:'flex', gap:12}}>
        <span>Personvern</span>
        <span>Vilkår</span>
        <span>Cookies</span>
      </div>
    </div>
  );
}

function W_Badge({ children, color }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'5px 10px', borderRadius:14,
      background: `${color || HC.plum}14`,
      color: color || HC.plum,
      fontSize:10.5, fontWeight:700, letterSpacing:'.08em',
    }}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// 1) FORBRUKER-LANDING: "Møt din stamme"
// ---------------------------------------------------------------------------

function ScreenWebHome() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background: HC.bg}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <H_StatusBarLight time="19:14"/>
        <W_BrowserBar url="speedfriending.no"/>
        <W_NavBar/>

        {/* HERO */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.coralDeep}>Oslo · Trondheim · Bergen</W_Kicker>
          <h1 style={{
            margin:'16px 0 0',
            fontFamily: SERIF,
            fontSize:54, fontWeight:700, letterSpacing:'-.035em', lineHeight:.96,
            color: HC.fg,
          }}>
            Møt din<br/>
            <span style={{color:HC.plum, fontStyle:'italic'}}>stamme.</span>
          </h1>
          <p style={{
            margin:'22px 0 0', fontSize:15.5, lineHeight:1.55, color:HC.fgDim,
            maxWidth:320,
          }}>
            Ekte møter, ikke nye apper. Små grupper, kuraterte kvelder,
            og en måleapparat som viser at vennskap faktisk vokser.
          </p>

          {/* Primær-CTA */}
          <div style={{marginTop:26, display:'flex', flexDirection:'column', gap:10}}>
            <button style={{
              padding:'16px 20px', borderRadius:14, border:'none',
              background: HC.fg, color:'#FFF',
              fontSize:14.5, fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:10,
              letterSpacing:'-.005em',
            }}>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="#FFF">
                <path d="M9.97 1.6c-.09 1.02-.5 1.97-1.15 2.71-.7.75-1.77 1.32-2.83 1.24-.1-1 .38-2.01 1.07-2.7.77-.78 2.05-1.37 2.91-1.25zM12.8 11.2c-.47.68-.96 1.33-1.72 1.34-.76.01-.99-.44-1.85-.44s-1.11.43-1.84.45c-.75.03-1.3-.73-1.77-1.41-.96-1.4-1.7-3.97-.71-5.7.49-.87 1.37-1.42 2.32-1.44.72-.02 1.4.49 1.85.49.46 0 1.28-.6 2.17-.51.37.01 1.43.15 2.1 1.13-.05.04-1.26.74-1.24 2.2.02 1.74 1.52 2.32 1.54 2.33-.01.04-.25.83-.85 1.56z"/>
              </svg>
              Last ned app
            </button>
            <div style={{display:'flex', gap:10}}>
              <button style={{
                flex:1, padding:'14px 16px', borderRadius:14,
                background:'#FFF', border:`1px solid ${HC.divider}`,
                fontSize:12.5, fontWeight:600, cursor:'pointer', color:HC.fg,
              }}>
                Bli ambassadør
              </button>
              <button style={{
                flex:1, padding:'14px 16px', borderRadius:14,
                background:'#FFF', border:`1px solid ${HC.divider}`,
                fontSize:12.5, fontWeight:600, cursor:'pointer', color:HC.fg,
              }}>
                For bedrifter
              </button>
            </div>
          </div>

          <div style={{marginTop:14, fontSize:11.5, color:HC.fgFaint}}>
            4.8 ★ · 1 247 anmeldelser · App Store + Google Play
          </div>
        </div>

        {/* Illustrasjons-hero */}
        <div style={{
          margin:'36px 20px 0',
          borderRadius:22,
          overflow:'hidden',
          position:'relative',
          height:240,
          background:`linear-gradient(160deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
        }}>
          <svg viewBox="0 0 360 240" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
            {/* Bordform */}
            <ellipse cx="180" cy="180" rx="140" ry="36" fill="rgba(255,255,255,.1)"/>
            <ellipse cx="180" cy="170" rx="120" ry="22" fill="#FAF5EF" opacity=".92"/>
            {/* Kaffekopper */}
            <circle cx="130" cy="158" r="9" fill="#2A2134"/>
            <circle cx="130" cy="158" r="6.5" fill="#7F4D95"/>
            <circle cx="200" cy="168" r="9" fill="#2A2134"/>
            <circle cx="200" cy="168" r="6.5" fill="#C45A44"/>
            <circle cx="240" cy="156" r="9" fill="#2A2134"/>
            <circle cx="240" cy="156" r="6.5" fill="#F0826B"/>
            {/* Stoler — silhuetter */}
            <g>
              <circle cx="95" cy="90" r="22" fill="#FAB29D"/>
              <path d="M72 128 Q72 108 95 108 Q118 108 118 128 L118 175 L72 175 Z" fill="#FAB29D"/>
            </g>
            <g>
              <circle cx="180" cy="72" r="24" fill="#C45A44"/>
              <path d="M154 114 Q154 92 180 92 Q206 92 206 114 L206 168 L154 168 Z" fill="#C45A44"/>
            </g>
            <g>
              <circle cx="265" cy="90" r="22" fill="#7F4D95"/>
              <path d="M242 128 Q242 108 265 108 Q288 108 288 128 L288 175 L242 175 Z" fill="#7F4D95"/>
            </g>
            {/* Lys-ring over bordet */}
            <ellipse cx="180" cy="40" rx="80" ry="8" fill="rgba(255,255,255,.18)"/>
            <line x1="180" y1="0" x2="180" y2="32" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
          </svg>
          <div style={{
            position:'absolute', bottom:14, left:16, right:16,
            fontSize:11.5, color:'rgba(255,255,255,.85)', fontWeight:600,
            letterSpacing:'.04em',
          }}>
            Onsdag kveld · Fuglen, Grünerløkka
          </div>
        </div>

        {/* Social proof — tall */}
        <div style={{padding:'40px 24px 0', textAlign:'center'}}>
          <div style={{
            fontFamily:SERIF, fontSize:15, fontStyle:'italic', fontWeight:400,
            color:HC.fgDim, marginBottom:8,
          }}>
            Siden januar 2026 —
          </div>
          <div style={{
            fontFamily:SERIF, fontSize:38, fontWeight:700, letterSpacing:'-.02em',
            color:HC.plum, lineHeight:1.05,
          }}>
            1 847 nye<br/>
            vennskap skapt.
          </div>
          <div style={{marginTop:14, fontSize:12.5, color:HC.fgDim, lineHeight:1.5}}>
            Hvert vennskap er stemplet med et ekte sted og en ekte kveld.
            Ingen profiler som ikke møtes.
          </div>
        </div>

        {/* Hvordan det funker — tre steg */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Slik funker det</W_SectionLabel>
          <h2 style={{
            margin:'6px 0 20px',
            fontFamily:SERIF, fontSize:28, fontWeight:700, letterSpacing:'-.025em',
            lineHeight:1.1, color:HC.fg,
          }}>
            Tre små skritt til<br/>en ny kveld.
          </h2>

          {[
            { n:'01', t:'Velg en kveld', d:'Maks 5 kvelder per uke. Kuratert etter interesse og nabolag. Ingen uendelig scroll.' },
            { n:'02', t:'Ta en stol', d:'6–10 personer per event. Ambassadøren står for vertskapet. Ingen awkward intro-runder.' },
            { n:'03', t:'Gå bort og si hei', d:'Møt. Snakk. Kanskje sees dere igjen. Vi teller bare vennskapene dere selv bekrefter.' },
          ].map((s, i) => (
            <div key={i} style={{
              padding:'18px 18px', marginTop: i === 0 ? 0 : 10,
              background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`,
              display:'flex', gap:16, alignItems:'flex-start',
            }}>
              <div style={{
                fontFamily:SERIF, fontSize:22, fontWeight:700,
                color:HC.plum, opacity:.7, lineHeight:1, flexShrink:0,
              }}>{s.n}</div>
              <div>
                <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, letterSpacing:'-.005em'}}>{s.t}</div>
                <div style={{fontSize:12, lineHeight:1.5, color:HC.fgDim, marginTop:4}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{padding:'40px 24px 0'}}>
          <div style={{
            padding:'24px 22px', borderRadius:18,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{
              fontFamily:SERIF, fontSize:42, fontWeight:700, color:HC.plum,
              lineHeight:.8, marginBottom:6,
            }}>
              "
            </div>
            <div style={{
              fontFamily:SERIF, fontSize:19, lineHeight:1.35, color:HC.fg,
              letterSpacing:'-.01em', fontStyle:'italic', fontWeight:400,
            }}>
              Jeg flyttet til Oslo alene. Etter tre måneder hadde jeg en fast crew jeg spiste søndags­middag med. Det var det jeg trengte — ikke enda en dating-app.
            </div>
            <div style={{marginTop:16, display:'flex', alignItems:'center', gap:10}}>
              <div style={{
                width:32, height:32, borderRadius:16,
                background:`linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`,
                color:'#FFF', fontSize:12, fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>MK</div>
              <div>
                <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>Maria Kristiansen</div>
                <div style={{fontSize:10.5, color:HC.fgFaint}}>28, Oslo · bruker siden februar 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Presse-logoer */}
        <div style={{padding:'40px 20px 0'}}>
          <div style={{textAlign:'center', marginBottom:16}}>
            <W_Kicker>Omtalt i</W_Kicker>
          </div>
          <W_PressLogos/>
        </div>

        {/* Målgruppe-piler */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Også for deg</W_SectionLabel>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:12}}>
            {[
              { t:'Bli ambassadør', d:'Vert din by. 2 500–5 000 kr i måneden.', c:HC.coral },
              { t:'For bedrifter', d:'Speedfriending for Teams. Målbart benefit.', c:HC.plum },
              { t:'For sponsorer', d:'Vær del av Norges største sosiale helse-plattform.', c:HC.amber },
            ].map((x, i) => (
              <div key={i} style={{
                padding:'16px 18px', borderRadius:14,
                background:'#FFF', border:`1px solid ${HC.divider}`,
                display:'flex', justifyContent:'space-between', alignItems:'center', gap:12,
              }}>
                <div>
                  <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{x.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>{x.d}</div>
                </div>
                <div style={{
                  fontFamily:SERIF, fontSize:22, color: x.c, lineHeight:1,
                }}>→</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stort CTA */}
        <div style={{padding:'40px 24px 0'}}>
          <div style={{
            padding:'32px 24px', borderRadius:22,
            background: HC.fg, color:'#FFF', textAlign:'center',
          }}>
            <div style={{
              fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em',
              lineHeight:1.15, marginBottom:16,
            }}>
              Kvelden venter<br/>
              <span style={{color:HC.coral, fontStyle:'italic'}}>på deg.</span>
            </div>
            <button style={{
              width:'100%', padding:'14px 18px', borderRadius:12, border:'none',
              background:'#FFF', color:HC.fg, fontSize:13.5, fontWeight:700, cursor:'pointer',
            }}>
              Last ned gratis
            </button>
            <div style={{marginTop:10, fontSize:10.5, color:'rgba(255,255,255,.55)'}}>
              iOS · Android · Første måned gratis
            </div>
          </div>
        </div>

        <W_Footer/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2) AMBASSADØR-LANDING: "Bli vert for din by"
// ---------------------------------------------------------------------------

function ScreenWebAmbassador() {
  const testimonials = [
    { name:'Sigrid B.', city:'Oslo · Grünerløkka', q:'Jeg hadde aldri arrangert noe før. Speedfriending ga meg en manual, et budsjett og backup hvis noe gikk galt. Min tredje kveld fylte seg opp på 12 timer.', earn:'4 200 kr / mnd' },
    { name:'Anders M.', city:'Trondheim · Midtbyen', q:'Det er overraskende givende å se folk komme alene og gå ut med planer for neste helg. Jeg gjør det rundt jobb — ikke som jobb.', earn:'2 800 kr / mnd' },
    { name:'Leyla S.', city:'Bergen · Skostredet', q:'Jeg har bygd opp en fast crew av 40 personer i byen. Mange sees hver uke uten at jeg må være der. Det er det beste.', earn:'3 400 kr / mnd' },
    { name:'Jonas H.', city:'Oslo · Sagene', q:'Skeivt-vennlige kvelder var det jeg savnet. Nå arrangerer jeg annenhver uke, og menneskene som kommer er alle vi jeg ønsket fantes.', earn:'3 900 kr / mnd' },
    { name:'Ida R.', city:'Stavanger · Sentrum', q:'Begynte som student. Nå er jeg Stavangers ambassadør-lead med fire under meg. Det har blitt en bi-karriere jeg ikke planla.', earn:'5 100 kr / mnd' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <H_StatusBarLight time="11:28"/>
        <W_BrowserBar url="speedfriending.no/ambassador"/>
        <W_NavBar/>

        {/* HERO */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.coralDeep}>For ambassadører</W_Kicker>
          <h1 style={{
            margin:'14px 0 0', fontFamily:SERIF, fontSize:46, fontWeight:700,
            letterSpacing:'-.03em', lineHeight:.98, color:HC.fg,
          }}>
            Bli vert<br/>
            for <span style={{color:HC.coralDeep, fontStyle:'italic'}}>din by.</span>
          </h1>
          <p style={{margin:'20px 0 0', fontSize:15, lineHeight:1.55, color:HC.fgDim}}>
            Du samler 6–10 mennesker på et kafé eller en bar i nabolaget ditt.
            Vi tar resten: invitasjoner, betaling, deltaker-kvalitet, sikkerhet.
          </p>

          <button style={{
            marginTop:22, width:'100%', padding:'16px 20px', borderRadius:14, border:'none',
            background: HC.coralDeep, color:'#FFF',
            fontSize:14.5, fontWeight:700, cursor:'pointer',
          }}>
            Søk om intervju
          </button>
          <div style={{marginTop:8, textAlign:'center', fontSize:11, color:HC.fgFaint}}>
            Søknaden tar 4 minutter. Vi svarer innen 5 virkedager.
          </div>
        </div>

        {/* Tall-strip */}
        <div style={{padding:'36px 24px 0'}}>
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0,
            background:'#FFF', borderRadius:16, border:`1px solid ${HC.divider}`,
            overflow:'hidden',
          }}>
            {[
              { n:'2 500–5 000', l:'kr / mnd typisk' },
              { n:'6–10', l:'gjester / kveld' },
              { n:'1 kveld', l:'i uka' },
            ].map((x, i) => (
              <div key={i} style={{
                padding:'16px 12px', textAlign:'center',
                borderRight: i < 2 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-.015em', lineHeight:1.05}}>
                  {x.n}
                </div>
                <div style={{fontSize:10, color:HC.fgDim, marginTop:4, letterSpacing:'.04em'}}>
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eksempel-bilder av events */}
        <div style={{padding:'36px 20px 0'}}>
          <W_SectionLabel>Slik ser det ut</W_SectionLabel>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10}}>
            {[
              { bg:`linear-gradient(135deg, #C45A44, #7F4D95)`, ic:'☕', t:'Kaffe + samtale', c:'Oslo · onsdag' },
              { bg:`linear-gradient(135deg, #7F4D95, #3B2450)`, ic:'🍷', t:'Vin + ost', c:'Trondheim · fredag' },
              { bg:`linear-gradient(160deg, #F0826B, #FAB29D)`, ic:'🥾', t:'Fjelltur', c:'Bergen · søndag' },
              { bg:`linear-gradient(135deg, #3E8F65, #2A2134)`, ic:'📚', t:'Bokklubb', c:'Oslo · mandag' },
            ].map((x, i) => (
              <div key={i} style={{
                aspectRatio:'1', borderRadius:14, position:'relative', overflow:'hidden',
                background: x.bg,
                padding:14, display:'flex', flexDirection:'column', justifyContent:'space-between',
              }}>
                <div style={{fontSize:32}}>{x.ic}</div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:'#FFF', letterSpacing:'-.005em'}}>{x.t}</div>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.7)', marginTop:2}}>{x.c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hvem passer */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Passer det deg?</W_SectionLabel>
          <h2 style={{
            margin:'6px 0 18px', fontFamily:SERIF, fontSize:26, fontWeight:700,
            letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg,
          }}>
            De beste ambassa­dørene vi har delt én ting.
          </h2>
          <div style={{fontSize:13.5, lineHeight:1.6, color:HC.fgDim}}>
            De liker å sette sammen mennesker. Ikke å være midtpunkt.
          </div>

          <div style={{marginTop:16, background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { t:'Du bor i Oslo, Trondheim, Bergen eller Stavanger', d:'Vi utvider til Tromsø og Kristiansand høsten 2026.' },
              { t:'Du har 4–6 timer i uka å bruke', d:'Planlegging + én kveld. Ikke full jobb.' },
              { t:'Du er 25+ år og komfortabel med folk', d:'Yngre er velkommen, men livs-erfaring hjelper.' },
              { t:'Du har et sted som liker å samle', d:'En kafé, bar eller studio. Vi hjelper med å forhandle.' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 18px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', gap:12, alignItems:'flex-start',
              }}>
                <div style={{
                  width:20, height:20, borderRadius:10, background:`${HC.coral}1A`,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2 2 5-5.5" stroke={HC.coralDeep} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{row.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{row.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inntjening og opplæring */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Hva du tjener</W_SectionLabel>
          <div style={{
            padding:'22px 20px', borderRadius:16,
            background: `linear-gradient(135deg, ${HC.coralDeep} 0%, ${HC.plum} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontFamily:SERIF, fontSize:36, fontWeight:700, letterSpacing:'-.025em', lineHeight:1}}>
              2 500–5 000 kr
            </div>
            <div style={{marginTop:4, fontSize:13, opacity:.9, fontWeight:600}}>per måned, netto</div>
            <div style={{marginTop:14, fontSize:12, lineHeight:1.55, opacity:.82}}>
              400 kr per event (4 i måneden) + 50 kr per returnerende gjest + bonus
              når kvelden får 4.5+★. Vi skatter og utbetaler månedlig via Vipps eller bankkonto.
            </div>
          </div>

          <div style={{marginTop:12, padding:'14px 16px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`, fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
            <span style={{color:HC.fg, fontWeight:700}}>Opplæring inkludert:</span> 3 timer
            digital + én praktisk kveld med en erfaren ambassadør i din by. Ingen kostnad.
          </div>
        </div>

        {/* Testimonials — 5 stk */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Fra våre ambassadører</W_SectionLabel>
          <h2 style={{margin:'6px 0 16px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15, color:HC.fg}}>
            118 ambassa­dører, 34 byer i Norden.
          </h2>

          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                padding:'18px 18px', borderRadius:14, background:'#FFF',
                border:`1px solid ${HC.divider}`,
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
                  <div>
                    <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{t.name}</div>
                    <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:2}}>{t.city}</div>
                  </div>
                  <W_Badge color={HC.coralDeep}>{t.earn}</W_Badge>
                </div>
                <div style={{fontSize:12.5, lineHeight:1.5, color:HC.fg, fontStyle:'italic', fontFamily:SERIF}}>
                  "{t.q}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Søknadsskjema */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Søk nå</W_SectionLabel>
          <h2 style={{margin:'6px 0 18px', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Fortell oss om deg selv.
          </h2>

          <div style={{background:'#FFF', borderRadius:16, border:`1px solid ${HC.divider}`, padding:'20px 18px'}}>
            {[
              { l:'Navn', v:'', ph:'Ola Nordmann' },
              { l:'E-post', v:'', ph:'ola@epost.no' },
              { l:'Din by', v:'Oslo', ph:'' },
              { l:'Hvorfor vil du bli ambassadør?', v:'', ph:'2–3 setninger holder', area:true },
            ].map((f, i) => (
              <div key={i} style={{marginBottom: i < 3 ? 14 : 0}}>
                <div style={{fontSize:11, fontWeight:700, color:HC.fgDim, marginBottom:6, letterSpacing:'.04em'}}>
                  {f.l}
                </div>
                <div style={{
                  padding: f.area ? '10px 12px' : '11px 12px',
                  background: HC.cream, borderRadius:10,
                  border:`1px solid ${HC.divider}`,
                  fontSize:13, color: f.v ? HC.fg : HC.fgFaint,
                  minHeight: f.area ? 72 : 'auto',
                }}>
                  {f.v || f.ph}
                </div>
              </div>
            ))}
            <button style={{
              marginTop:18, width:'100%', padding:'14px 18px', borderRadius:12, border:'none',
              background:HC.coralDeep, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
            }}>
              Send søknad
            </button>
          </div>
        </div>

        <W_Footer/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3) B2B-LANDING: "Reduser ensomhet i din arbeidsstyrke"
// ---------------------------------------------------------------------------

function ScreenWebBusiness() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F8F6F2'}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <H_StatusBarLight time="09:42"/>
        <W_BrowserBar url="speedfriending.no/teams"/>
        <W_NavBar/>

        {/* HERO — strammere, SaaS-følelse */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.plum}>For HR og People Ops</W_Kicker>
          <h1 style={{
            margin:'14px 0 0', fontFamily:SERIF, fontSize:38, fontWeight:700,
            letterSpacing:'-.025em', lineHeight:1.02, color:HC.fg,
          }}>
            Reduser ensomhet<br/>
            i arbeidsstyrken din.<br/>
            <span style={{color:HC.plum, fontStyle:'italic'}}>Målbart.</span>
          </h1>
          <p style={{margin:'20px 0 0', fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Hjemmekontor gjorde teamet ditt mer produktivt — og mer isolert.
            Speedfriending for Teams gir ansatte kuraterte event­invitasjoner
            som måles gjennom UCLA Loneliness Scale.
          </p>

          <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10}}>
            <button style={{
              padding:'15px 18px', borderRadius:12, border:'none',
              background:HC.plumDeep, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
            }}>
              Book 20-min demo
            </button>
            <button style={{
              padding:'13px 18px', borderRadius:12,
              background:'transparent', color:HC.fg, fontSize:13, fontWeight:600, cursor:'pointer',
              border:`1px solid ${HC.divider}`,
            }}>
              Last ned produktark (PDF)
            </button>
          </div>
          <div style={{marginTop:12, fontSize:11, color:HC.fgFaint}}>
            GDPR-compliant · Data i EU (Frankfurt) · ISO 27001 underveis
          </div>
        </div>

        {/* Kunde-logoer (aspiratsjonelle) */}
        <div style={{padding:'40px 20px 0'}}>
          <div style={{textAlign:'center', marginBottom:14}}>
            <W_Kicker color={HC.fgFaint}>I bruk hos</W_Kicker>
          </div>
          <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:14, padding:'0 2px'}}>
            {['Cognite', 'DNB', 'Telenor', 'Schibsted', 'Kolonial'].map((n, i) => (
              <div key={i} style={{fontSize:11, fontWeight:700, color:HC.fgFaint, letterSpacing:'.04em', opacity:.72}}>
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Problem-boks: kostnadstall */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coralDeep}>Det skjulte tallet</W_Kicker>
          <div style={{
            marginTop:12, padding:'24px 20px', borderRadius:14,
            background:'#FFF', border:`1px solid ${HC.divider}`,
          }}>
            <div style={{
              fontFamily:SERIF, fontSize:52, fontWeight:700,
              letterSpacing:'-.035em', color:HC.coralDeep, lineHeight:.95,
            }}>
              2 mrd kr
            </div>
            <div style={{marginTop:10, fontSize:13.5, lineHeight:1.5, color:HC.fg, fontWeight:600}}>
              Det ensomme ansatte koster norske arbeidsgivere årlig.
            </div>
            <div style={{marginTop:6, fontSize:11, lineHeight:1.5, color:HC.fgDim}}>
              Sykefravær, redusert engasjement, turnover. Cigna Loneliness at Work (2024) —
              ekstrapolert til norsk lønnsmasse (SSB).
            </div>
          </div>

          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{padding:'14px 12px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontFamily:SERIF, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>58%</div>
              <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>norske kontoransatte rapporterer ukentlig ensomhet i arbeidstid.</div>
            </div>
            <div style={{padding:'14px 12px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontFamily:SERIF, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>2,3×</div>
              <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>så sannsynlig at ensomme slutter innen 12 mnd.</div>
            </div>
          </div>
        </div>

        {/* Case-studier — 3 */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Resultater fra pilotene</W_SectionLabel>
          <div style={{fontSize:11, color:HC.fgFaint, marginBottom:14}}>
            Anonymisert med samtykke. Tall fra egenrapportering (UCLA LS-3, eNPS).
          </div>

          {[
            {
              co:'SaaS-selskap, 480 ansatte', sector:'Teknologi · Oslo',
              big:'42%', bigLabel:'reduksjon i rapportert isolasjon',
              meta:'3 mnd · 87 av 124 aktiverte',
              q:'Vi trodde vi måtte løse det på kontoret. Viste seg ansatte heller ville møte kolleger over noe annet enn jobb.',
              who:'People Ops Lead',
              tint:HC.plum,
            },
            {
              co:'Advokatfirma, 210 ansatte', sector:'Juridisk · Oslo',
              big:'+18', bigLabel:'eNPS-punkter blant juniorer',
              meta:'6 mnd · ansatte 25–32 hovedgruppe',
              q:'Gjennomtrekket blant juniorer var problemet vi ikke hadde vokabular for.',
              who:'Fung. HR-direktør',
              tint:HC.coralDeep,
            },
            {
              co:'Oslo-kommunalt foretak, 1 100 ansatte', sector:'Offentlig',
              big:'−0,9', bigLabel:'i gjennomsnittlig UCLA-score',
              meta:'4 mnd · pilot i to avdelinger',
              q:'Vi har for første gang et benefit de ansatte selv ber om igjen.',
              who:'Avd.leder, organisasjon',
              tint:HC.green,
            },
          ].map((c, i) => (
            <div key={i} style={{
              marginTop: i === 0 ? 0 : 12,
              padding:'20px 18px', borderRadius:14, background:'#FFF',
              border:`1px solid ${HC.divider}`,
              boxShadow:'0 2px 8px rgba(42,33,52,.03)',
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{c.co}</div>
                <div style={{fontSize:10, color:HC.fgFaint}}>{c.sector}</div>
              </div>
              <div style={{marginTop:12, display:'flex', alignItems:'baseline', gap:12}}>
                <div style={{fontFamily:SERIF, fontSize:36, fontWeight:700, color:c.tint, letterSpacing:'-.03em', lineHeight:.95}}>{c.big}</div>
                <div style={{fontSize:11, color:HC.fg, fontWeight:600, lineHeight:1.3}}>{c.bigLabel}</div>
              </div>
              <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim}}>{c.meta}</div>
              <div style={{marginTop:12, paddingLeft:10, borderLeft:`2px solid ${c.tint}40`, fontSize:12, lineHeight:1.5, fontStyle:'italic', color:HC.fg, fontFamily:SERIF}}>
                "{c.q}"
              </div>
              <div style={{marginTop:6, fontSize:10.5, color:HC.fgFaint}}>— {c.who}</div>
            </div>
          ))}
        </div>

        {/* Pakke-oversikt */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Pakker</W_SectionLabel>
          <h2 style={{margin:'6px 0 16px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Per ansatt per måned.
          </h2>

          {[
            { name:'Pilot', price:'Gratis', dur:'1 måned', feat:['Opp til 20 ansatte', 'Ubegrenset events', 'Månedsrapport'], tint:HC.plum, recommended:false },
            { name:'Standard', price:'99 kr', dur:'per ansatt/mnd', feat:['Ubegrenset ansatte', 'Kvartals-rapport', 'Dedikert onboarding', 'SSO'], tint:HC.plumDeep, recommended:true },
            { name:'Enterprise', price:'Avtales', dur:'fra 500 ansatte', feat:['Alt i Standard', 'Skreddersydd rapport', 'SLA 99,9%', 'API-tilgang'], tint:HC.fg, recommended:false },
          ].map((p, i) => (
            <div key={i} style={{
              marginTop: i === 0 ? 0 : 12,
              padding:'18px 18px', borderRadius:14,
              background:'#FFF',
              border: p.recommended ? `2px solid ${p.tint}` : `1px solid ${HC.divider}`,
              position:'relative',
            }}>
              {p.recommended && (
                <div style={{
                  position:'absolute', top:-8, left:16,
                  padding:'3px 10px', borderRadius:8,
                  background:p.tint, color:'#FFF', fontSize:9.5, fontWeight:700, letterSpacing:'.1em',
                }}>ANBEFALT</div>
              )}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>{p.name}</div>
                <div>
                  <span style={{fontFamily:SERIF, fontSize:22, fontWeight:700, color:p.tint, letterSpacing:'-.015em'}}>{p.price}</span>
                  <span style={{fontSize:10.5, color:HC.fgFaint, marginLeft:6}}>{p.dur}</span>
                </div>
              </div>
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:6}}>
                {p.feat.map((f, j) => (
                  <div key={j} style={{display:'flex', gap:8, alignItems:'center', fontSize:11.5, color:HC.fgDim}}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2 2 5-5.5" stroke={p.tint} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button style={{
            marginTop:18, width:'100%', padding:'14px 18px', borderRadius:12, border:'none',
            background:HC.plumDeep, color:'#FFF', fontSize:13.5, fontWeight:700, cursor:'pointer',
          }}>
            Gå til B2B-portalen →
          </button>
        </div>

        {/* Avsluttende CTA */}
        <div style={{padding:'40px 24px 0'}}>
          <div style={{
            padding:'26px 22px', borderRadius:18,
            background:`linear-gradient(135deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontFamily:SERIF, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15}}>
              La oss regne på din bedrift.
            </div>
            <div style={{marginTop:10, fontSize:12.5, lineHeight:1.5, opacity:.9}}>
              20-min samtale. Vi viser hvordan UCLA-målingen fungerer, og hva
              ensomhet koster dere hvis ingenting endres.
            </div>
            <button style={{
              marginTop:16, width:'100%', padding:'13px 18px', borderRadius:10, border:'none',
              background:'#FFF', color:HC.plumDeep, fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              Book demo
            </button>
          </div>
        </div>

        <W_Footer/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4) SPONSOR-LANDING: "Vær del av Norges mest omtalte sosiale helse-plattform"
// ---------------------------------------------------------------------------

function ScreenWebSponsor() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <H_StatusBarLight time="13:55"/>
        <W_BrowserBar url="speedfriending.no/sponsor"/>
        <W_NavBar/>

        {/* HERO */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.amber}>For merkevarer og sponsorer</W_Kicker>
          <h1 style={{
            margin:'14px 0 0', fontFamily:SERIF, fontSize:40, fontWeight:700,
            letterSpacing:'-.025em', lineHeight:1, color:HC.fg,
          }}>
            Vær del av Norges<br/>
            mest <span style={{color:HC.amber, fontStyle:'italic'}}>omtalte</span><br/>
            sosiale helse-<br/>plattform.
          </h1>
          <p style={{margin:'20px 0 0', fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Speedfriending-events i Oslo, Trondheim og Bergen hver uke.
            9 400 aktive brukere. 180 events i måneden. Få din merkevare
            inn i den kvelden folk faktisk husker.
          </p>

          <button style={{
            marginTop:22, width:'100%', padding:'16px 20px', borderRadius:14, border:'none',
            background:HC.fg, color:'#FFF', fontSize:14, fontWeight:700, cursor:'pointer',
          }}>
            Kontakt sponsoransvarlig
          </button>
          <div style={{marginTop:10, textAlign:'center', fontSize:11, color:HC.fgFaint}}>
            Lotte Myhre · sponsor@speedfriending.no · +47 452 11 220
          </div>
        </div>

        {/* Eksponering-tall */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Eksponering</W_SectionLabel>
          <h2 style={{margin:'6px 0 18px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Hva merkevaren din faktisk får.
          </h2>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { n:'9 424', l:'aktive brukere', c:HC.plum },
              { n:'180', l:'events / mnd', c:HC.coralDeep },
              { n:'2,8M', l:'visninger i Q1 2026', c:HC.amber },
              { n:'4,8★', l:'gjennomsnittlig event-rating', c:HC.green },
            ].map((x, i) => (
              <div key={i} style={{
                padding:'18px 16px', borderRadius:14,
                background:'#FFF', border:`1px solid ${HC.divider}`,
              }}>
                <div style={{fontFamily:SERIF, fontSize:32, fontWeight:700, color:x.c, letterSpacing:'-.025em', lineHeight:1}}>
                  {x.n}
                </div>
                <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.4}}>
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demografi */}
        <div style={{padding:'36px 24px 0'}}>
          <W_SectionLabel>Demografi</W_SectionLabel>
          <div style={{
            padding:'18px 18px', borderRadius:14,
            background:'#FFF', border:`1px solid ${HC.divider}`,
          }}>
            {[
              { l:'Alder 25–34', v:58 },
              { l:'Alder 35–44', v:24 },
              { l:'Alder 20–24 + 45+', v:18 },
              { l:'Bor i Oslo-området', v:52 },
              { l:'Høyere utdanning', v:79 },
              { l:'Månedlig utgift 5 000 kr+', v:44 },
            ].map((row, i) => (
              <div key={i} style={{marginTop: i === 0 ? 0 : 12}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11.5}}>
                  <span style={{color:HC.fg, fontWeight:600}}>{row.l}</span>
                  <span style={{color:HC.fgDim}}>{row.v}%</span>
                </div>
                <div style={{marginTop:5, height:5, background:HC.cream, borderRadius:3, overflow:'hidden'}}>
                  <div style={{width:`${row.v}%`, height:'100%', background:`linear-gradient(90deg, ${HC.amber}, ${HC.coralDeep})`}}/>
                </div>
              </div>
            ))}
            <div style={{marginTop:14, paddingTop:10, borderTop:`1px dashed ${HC.divider}`, fontSize:10, color:HC.fgFaint, lineHeight:1.45}}>
              Kilde: Speedfriending-bruker­undersøkelse mars 2026. N = 1 280.
            </div>
          </div>
        </div>

        {/* Case-studier */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Merkevarer vi har samarbeidet med</W_SectionLabel>
          <div style={{fontSize:11, color:HC.fgFaint, marginBottom:14}}>
            Eksempler. Vi konfidensialiserer detaljer inntil merkevaren ønsker å nevnes.
          </div>

          {[
            {
              brand:'Aperol', cat:'Drikke · italiensk aperitivo',
              big:'3 200', bigL:'gjestekvelder med Aperol Spritz i 12 uker',
              q:'Speedfriending gav oss en kveld der folk bestilte Spritz uten å føle de var del av en kampanje.',
              who:'Brand Manager, Campari Nordic',
              tint:HC.coralDeep,
              bg:'#FEEDE5',
            },
            {
              brand:'Carlsberg', cat:'Øl · lokal pub-kultur',
              big:'12', bigL:'byer aktivert med pub-quiz-serie',
              q:'Vi prøvde tradisjonell aktivering i årevis. Dette var første gang vi så returnerende gjester hver uke.',
              who:'Head of Nordic Brand',
              tint:HC.plum,
              bg:'#F4EDF5',
            },
            {
              brand:'Oslo Nye Sparebank', cat:'Finans · studentsegment',
              big:'+22%', bigL:'økning i student-konto­registreringer',
              q:'Vi eksponerte ikke som reklame — vi sponset «Første-måneden i Oslo»-kveldene. Det var mye rimeligere og mye mer effektivt.',
              who:'Markedsdirektør',
              tint:HC.green,
              bg:'#E5F2EC',
            },
          ].map((c, i) => (
            <div key={i} style={{
              marginTop: i === 0 ? 0 : 12,
              padding:'20px 18px', borderRadius:14,
              background:'#FFF', border:`1px solid ${HC.divider}`,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-.015em'}}>
                  {c.brand}
                </div>
                <div style={{fontSize:10, color:HC.fgFaint}}>{c.cat}</div>
              </div>
              <div style={{marginTop:14, display:'flex', alignItems:'baseline', gap:12}}>
                <div style={{fontFamily:SERIF, fontSize:32, fontWeight:700, color:c.tint, letterSpacing:'-.025em', lineHeight:.95}}>
                  {c.big}
                </div>
                <div style={{fontSize:11, color:HC.fg, fontWeight:600, lineHeight:1.35}}>
                  {c.bigL}
                </div>
              </div>
              <div style={{marginTop:12, padding:'12px 14px', background:c.bg, borderRadius:10, fontSize:12, lineHeight:1.5, color:HC.fg, fontStyle:'italic', fontFamily:SERIF}}>
                "{c.q}"
              </div>
              <div style={{marginTop:8, fontSize:10.5, color:HC.fgFaint}}>— {c.who}</div>
            </div>
          ))}
        </div>

        {/* Pakke-oversikt */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Sponsor-pakker</W_SectionLabel>
          <h2 style={{margin:'6px 0 16px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Skalerer med din ambisjon.
          </h2>

          {[
            { name:'Lokal', price:'Fra 25 000 kr', dur:'per måned', what:'10–15 events i én by · logo-synlighet · produkt-sampling', tint:HC.amber },
            { name:'Nasjonal', price:'Fra 120 000 kr', dur:'per kvartal', what:'Alle 4 byer · branded serie · month­lig rapport · co-creation', tint:HC.coralDeep },
            { name:'Tittelsponsor', price:'Avtales', dur:'årlig', what:'Navngitt event-serie · pressekontakt · kreativt partnerskap · første-rett på nye byer', tint:HC.plum },
          ].map((p, i) => (
            <div key={i} style={{
              marginTop: i === 0 ? 0 : 10,
              padding:'18px 18px', borderRadius:14,
              background:'#FFF', border:`1px solid ${HC.divider}`,
              borderLeft:`3px solid ${p.tint}`,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{p.name}</div>
                <div>
                  <span style={{fontFamily:SERIF, fontSize:17, fontWeight:700, color:p.tint, letterSpacing:'-.01em'}}>{p.price}</span>
                  <span style={{fontSize:10, color:HC.fgFaint, marginLeft:5}}>{p.dur}</span>
                </div>
              </div>
              <div style={{marginTop:8, fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
                {p.what}
              </div>
            </div>
          ))}
        </div>

        {/* Kontakt-skjema */}
        <div style={{padding:'40px 24px 0'}}>
          <div style={{
            padding:'24px 22px', borderRadius:18,
            background:HC.fg, color:'#FFF',
          }}>
            <W_Kicker color={HC.amber}>Kontakt sponsor­ansvarlig</W_Kicker>
            <div style={{marginTop:12, fontFamily:SERIF, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15}}>
              La oss snakke om hva din merkevare vil oppnå.
            </div>

            <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
              {[
                { l:'Merkevare', ph:'Aperol Nordic' },
                { l:'Din rolle', ph:'Brand Manager' },
                { l:'E-post', ph:'navn@epost.no' },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.12em', color:'rgba(255,255,255,.52)', marginBottom:4}}>
                    {f.l.toUpperCase()}
                  </div>
                  <div style={{
                    padding:'10px 12px', background:'rgba(255,255,255,.07)', borderRadius:8,
                    border:'1px solid rgba(255,255,255,.14)',
                    fontSize:12.5, color:'rgba(255,255,255,.52)',
                  }}>
                    {f.ph}
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              marginTop:16, width:'100%', padding:'13px 18px', borderRadius:10, border:'none',
              background:HC.amber, color:HC.fg, fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              Send forespørsel
            </button>
          </div>
        </div>

        <W_Footer/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5) PRESSE-SIDE: for journalister
// ---------------------------------------------------------------------------

function ScreenWebPress() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.cream}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <H_StatusBarLight time="10:18"/>
        <W_BrowserBar url="speedfriending.no/presse"/>
        <W_NavBar/>

        {/* HERO */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.plum}>Presserom</W_Kicker>
          <h1 style={{
            margin:'14px 0 0', fontFamily:SERIF, fontSize:44, fontWeight:700,
            letterSpacing:'-.03em', lineHeight:.98, color:HC.fg,
          }}>
            Speedfriending<br/>
            i <span style={{color:HC.plum, fontStyle:'italic'}}>tall</span> og <span style={{color:HC.plum, fontStyle:'italic'}}>ord.</span>
          </h1>
          <p style={{margin:'20px 0 0', fontSize:14, lineHeight:1.55, color:HC.fgDim}}>
            Presseressurser, bilder, faktaark og direkte­kontakt.
            Vi svarer innen to timer på hverdager mellom 09–17.
          </p>
        </div>

        {/* Presse-kontakt — øverst for tilgjengelighet */}
        <div style={{padding:'30px 24px 0'}}>
          <div style={{
            padding:'18px 18px', borderRadius:14,
            background:HC.fg, color:'#FFF',
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:46, height:46, borderRadius:23,
              background:`linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:14, fontWeight:700,
            }}>VS</div>
            <div style={{flex:1}}>
              <div style={{fontSize:12.5, fontWeight:700}}>Viktor Sanden</div>
              <div style={{fontSize:11, color:'rgba(255,255,255,.62)', marginTop:1}}>Gründer · presse-kontakt</div>
              <div style={{marginTop:6, fontSize:11, color:'rgba(255,255,255,.82)'}}>
                viktor@speedfriending.com<br/>
                +47 906 12 345
              </div>
            </div>
          </div>
        </div>

        {/* Speedfriending i tall */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Speedfriending i tall</W_SectionLabel>
          <h2 style={{margin:'6px 0 16px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Per 18. april 2026.
          </h2>

          <div style={{background:'#FFF', borderRadius:16, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { l:'Aktive brukere', v:'9 424', sub:'i Oslo, Trondheim, Bergen og Stavanger' },
              { l:'Events arrangert', v:'20 129', sub:'fra lansering (januar 2024)' },
              { l:'Bekreftede vennskap', v:'1 847', sub:'kun fysiske møter teller' },
              { l:'NPS', v:'+62', sub:'gjennomsnitt over 12 måneder' },
              { l:'UCLA-reduksjon', v:'−0,8', sub:'blant aktive 3+ mnd (N = 680)' },
              { l:'Ambassadører', v:'118', sub:'i 34 byer i Norden' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 18px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14,
              }}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>{row.l}</div>
                  <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:2}}>{row.sub}</div>
                </div>
                <div style={{fontFamily:SERIF, fontSize:22, fontWeight:700, color:HC.plum, letterSpacing:'-.02em', lineHeight:1}}>
                  {row.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gründerens bakgrunn */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Om gründeren</W_SectionLabel>
          <div style={{
            padding:'20px 18px', borderRadius:16, background:'#FFF',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>
              Viktor Sanden, 34
            </div>
            <div style={{fontSize:11.5, color:HC.fgFaint, marginTop:4}}>
              Trondheim · tidligere Vagabonds Consulting
            </div>
            <div style={{marginTop:14, fontSize:12.5, lineHeight:1.6, color:HC.fgDim}}>
              Startet Speedfriending i 2023 etter at han selv flyttet alene til en ny by.
              Bakgrunn fra konsulent­bransjen (Deloitte, Sopra Steria) og AI/tech-gründermiljøet.
              Tidligere daglig leder i Vagabonds Consulting.
              Speedfriending er hans fjerde selskap og første innen sosial helse.
            </div>
            <div style={{marginTop:14, display:'flex', gap:8, flexWrap:'wrap'}}>
              <W_Badge color={HC.plum}>LinkedIn</W_Badge>
              <W_Badge color={HC.coralDeep}>Tale-forespørsler</W_Badge>
              <W_Badge color={HC.green}>Intervjuklipp</W_Badge>
            </div>
          </div>
        </div>

        {/* Download-boks */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Nedlastbart materiale</W_SectionLabel>
          <h2 style={{margin:'6px 0 16px', fontFamily:SERIF, fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:HC.fg}}>
            Alt du trenger, ett klikk unna.
          </h2>

          <div style={{background:'#FFF', borderRadius:16, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { l:'Høyoppløselige bilder', d:'Gründer, team, events · 14 bilder · 78 MB', fmt:'ZIP' },
              { l:'Logo-pakke', d:'SVG, PNG, sort/hvit/farget · 6 filer · 2 MB', fmt:'ZIP' },
              { l:'Faktaark', d:'Selskapsfakta, tall, tidslinje · 4 sider', fmt:'PDF' },
              { l:'Sitater fra gründeren', d:'Korte og lange · på norsk og engelsk', fmt:'DOCX' },
              { l:'UCLA-metodikk', d:'Hvordan vi måler sosial helse · teknisk notat', fmt:'PDF' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{
                  width:38, height:38, borderRadius:8,
                  background:HC.cream, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontWeight:700, color:HC.plum, letterSpacing:'.06em',
                  flexShrink:0,
                }}>
                  {row.fmt}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{row.l}</div>
                  <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>{row.d}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M7 2v8m0 0l-3-3m3 3l3-3M2 12h10" stroke={HC.plum} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Siste i pressen */}
        <div style={{padding:'40px 24px 0'}}>
          <W_SectionLabel>Siste i pressen</W_SectionLabel>
          <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { pub:'Dagens Næringsliv', date:'12. apr 2026', h:'«Ensomhet i arbeidslivet koster 2 mrd — nå måler denne appen det»', excerpt:'DN Talent-intervju med Viktor Sanden om hvorfor HR-ledere har begynt å måle sosial helse.' },
              { pub:'NRK P2 Ekko', date:'3. apr 2026', h:'«Den første plattformen som prøver å måle vennskap»', excerpt:'Radio-intervju om UCLA-skalaen og hva som skjer når man gjør sosial helse til et produkt.' },
              { pub:'E24', date:'28. mar 2026', h:'«Norsk oppstart henter 12M etter ti-dobling i brukere»', excerpt:'Speedfriendings Pre-seed-runde dekket av E24 — fokus på B2B-mulighet.' },
              { pub:'VG Helg', date:'15. mar 2026', h:'«Jeg gikk på min første Speedfriending-kveld — og kom hjem med en middags­invitasjon»', excerpt:'Feature av Marie Simonsen om førstegangsopplevelsen.' },
              { pub:'Kapital', date:'1. mar 2026', h:'«De 30 under 30»', excerpt:'Viktor Sanden nevnt på årets 30-under-30-liste for sosial innovasjon.' },
            ].map((x, i) => (
              <div key={i} style={{padding:'14px 16px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <div style={{fontSize:10.5, fontWeight:700, color:HC.plum, letterSpacing:'.08em', textTransform:'uppercase'}}>
                    {x.pub}
                  </div>
                  <div style={{fontSize:10, color:HC.fgFaint}}>{x.date}</div>
                </div>
                <div style={{marginTop:6, fontFamily:SERIF, fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-.01em', lineHeight:1.3}}>
                  {x.h}
                </div>
                <div style={{marginTop:6, fontSize:11.5, color:HC.fgDim, lineHeight:1.45}}>
                  {x.excerpt}
                </div>
              </div>
            ))}
          </div>
        </div>

        <W_Footer/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6) INVESTOR-SIDE: for potensielle investorer
// ---------------------------------------------------------------------------

function ScreenWebInvestor() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#0F0812'}}>
      <div style={{height:'100%', overflowY:'auto'}}>
        <div style={{color:'#FFF'}}><H_StatusBarLight time="16:02"/></div>

        {/* Browser-bar (mørk) */}
        <div style={{
          margin:'8px 14px 0', padding:'7px 12px', borderRadius:10,
          background:'rgba(255,255,255,.08)',
          display:'flex', alignItems:'center', gap:8,
          fontSize:11.5, color:'rgba(255,255,255,.72)', fontWeight:500,
        }}>
          <svg width="11" height="11" viewBox="0 0 11 11" style={{flexShrink:0}}>
            <rect x="2.5" y="5" width="6" height="4.5" rx="1" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="1"/>
            <path d="M4 5V3.5a1.5 1.5 0 013 0V5" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="1"/>
          </svg>
          <span>speedfriending.no/investor</span>
        </div>

        <div style={{padding:'14px 20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <W_Logo color="#FFF"/>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.18em', color:'rgba(255,255,255,.5)', textTransform:'uppercase'}}>
            Investor-side
          </div>
        </div>

        {/* HERO */}
        <div style={{padding:'28px 24px 0'}}>
          <W_Kicker color={HC.coral}>Investor-side</W_Kicker>
          <h1 style={{
            margin:'14px 0 0', fontFamily:SERIF, fontSize:42, fontWeight:700,
            letterSpacing:'-.03em', lineHeight:1, color:'#FFF',
          }}>
            Den første platt­<br/>formen som måler<br/>
            <span style={{color:HC.coral, fontStyle:'italic'}}>sosial helse.</span>
          </h1>
          <p style={{margin:'20px 0 0', fontSize:14.5, lineHeight:1.55, color:'rgba(255,255,255,.64)'}}>
            Ensomhet koster Norge 2 mrd i året — ingen måler det.
            Vi har bygd infrastrukturen. 9 400 brukere og 180 events / mnd, alt i Norden.
          </p>
        </div>

        {/* Status-banner */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:'rgba(240,130,107,.1)',
            border:'1px solid rgba(240,130,107,.28)',
            fontSize:12, lineHeight:1.5, color:'rgba(255,255,255,.86)',
          }}>
            <span style={{color:HC.coral, fontWeight:700}}>Status:</span> Vi henter ikke aktivt nå,
            men snakker gjerne. Neste runde planlagt Q4 2026 (Series Seed).
          </div>
        </div>

        {/* PROBLEMET */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>01 · Problemet</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            Ensomhet er den største folkehelse­utfordringen ingen ser på dashbordet.
          </h2>
          <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { n:'28%', l:'av norske 18–34 åringer rapporterer ukentlig ensomhet' },
              { n:'50%', l:'så høy dødelighets­risiko som røyking' },
              { n:'$406B', l:'global markedsstørrelse (WHO, 2027-prognose)' },
              { n:'0', l:'eksisterende plattformer som måler det' },
            ].map((x, i) => (
              <div key={i} style={{padding:'14px 12px', borderRadius:12, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)'}}>
                <div style={{fontFamily:SERIF, fontSize:24, fontWeight:700, color:HC.coral, letterSpacing:'-.02em', lineHeight:1}}>
                  {x.n}
                </div>
                <div style={{marginTop:6, fontSize:10.5, color:'rgba(255,255,255,.6)', lineHeight:1.4}}>
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LØSNINGEN */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>02 · Løsningen</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            Tre-lags plattform. Ett måle­punkt.
          </h2>

          <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { n:'B2C', t:'Appen', d:'9 400 brukere i Oslo/Trondheim/Bergen. Kuraterte events. UCLA-måling passivt.' },
              { n:'B2B2C', t:'Ambassa­dør-portal', d:'118 ambassadører i 34 byer. Skalerbart uten egen ansatt per marked.' },
              { n:'B2B', t:'Teams', d:'HR-dashboard. 99 kr / ansatt / mnd. Pilot-kunder: Cognite, DNB, Telenor.' },
            ].map((x, i) => (
              <div key={i} style={{
                padding:'14px 16px', borderRadius:12,
                background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)',
                display:'flex', gap:14, alignItems:'flex-start',
              }}>
                <div style={{
                  padding:'3px 8px', borderRadius:6,
                  background:`${HC.coral}28`, color:HC.coral,
                  fontSize:9.5, fontWeight:700, letterSpacing:'.08em', flexShrink:0,
                }}>{x.n}</div>
                <div>
                  <div style={{fontSize:13, fontWeight:700, color:'#FFF'}}>{x.t}</div>
                  <div style={{fontSize:11.5, color:'rgba(255,255,255,.58)', marginTop:4, lineHeight:1.45}}>{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MARKED */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>03 · Markedet</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            406 mrd $ globalt innen 2030.
          </h2>
          <div style={{marginTop:16, background:'rgba(255,255,255,.04)', borderRadius:12, border:'1px solid rgba(255,255,255,.08)', overflow:'hidden'}}>
            {[
              { l:'TAM (global)', v:'$406B', sub:'WHO-estimat, wellness + social health' },
              { l:'SAM (Norden + EU)', v:'$12B', sub:'HR-benefits, sosiale events, psykisk helse' },
              { l:'SOM (Norge, år 3)', v:'$45M', sub:'9 % penetrasjon av norsk kontor­arbeids­styrke' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length-1 ? '1px solid rgba(255,255,255,.08)' : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14,
              }}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:700, color:'#FFF'}}>{row.l}</div>
                  <div style={{fontSize:10, color:'rgba(255,255,255,.44)', marginTop:2}}>{row.sub}</div>
                </div>
                <div style={{fontFamily:SERIF, fontSize:20, fontWeight:700, color:HC.coral, letterSpacing:'-.015em'}}>
                  {row.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TREKKRAFT */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>04 · Trekkraft</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            Ti-doblet på 12 måneder.
          </h2>

          {/* Sparkline-graf */}
          <div style={{marginTop:18, padding:'20px 16px', background:'rgba(255,255,255,.04)', borderRadius:12, border:'1px solid rgba(255,255,255,.08)'}}>
            <svg width="100%" height="100" viewBox="0 0 340 100">
              <defs>
                <linearGradient id="grad-inv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={HC.coral} stopOpacity=".6"/>
                  <stop offset="1" stopColor={HC.coral} stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 10 90 L 50 86 L 90 82 L 130 74 L 170 62 L 210 50 L 250 36 L 290 22 L 330 10" fill="none" stroke={HC.coral} strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M 10 90 L 50 86 L 90 82 L 130 74 L 170 62 L 210 50 L 250 36 L 290 22 L 330 10 L 330 100 L 10 100 Z" fill="url(#grad-inv)"/>
              {/* Avery-dots */}
              <circle cx="330" cy="10" r="4" fill={HC.coral}/>
            </svg>
            <div style={{marginTop:10, display:'flex', justifyContent:'space-between', fontSize:10, color:'rgba(255,255,255,.4)'}}>
              <span>Apr 2025</span>
              <span>Apr 2026</span>
            </div>
            <div style={{marginTop:10, display:'flex', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:10, color:'rgba(255,255,255,.5)'}}>Brukere</div>
                <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:'#FFF', letterSpacing:'-.02em'}}>890 → 9 424</div>
              </div>
              <div>
                <div style={{fontSize:10, color:'rgba(255,255,255,.5)'}}>MRR</div>
                <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:HC.coral, letterSpacing:'-.02em'}}>680 K kr</div>
              </div>
            </div>
          </div>

          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { n:'+62', l:'NPS · 12-mnd snitt' },
              { n:'72%', l:'månedlig aktiv retention' },
              { n:'38%', l:'bruttomar­gin (B2B)' },
              { n:'5,2 mnd', l:'CAC payback' },
            ].map((x, i) => (
              <div key={i} style={{padding:'12px 12px', borderRadius:10, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)'}}>
                <div style={{fontFamily:SERIF, fontSize:18, fontWeight:700, color:'#FFF', letterSpacing:'-.015em'}}>
                  {x.n}
                </div>
                <div style={{marginTop:4, fontSize:10, color:'rgba(255,255,255,.54)', lineHeight:1.4}}>
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>05 · Team</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            Fire grundere, ti års kombinert erfaring.
          </h2>

          <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { n:'Viktor Sanden', r:'Grunder · CEO', bg:'Deloitte · Sopra Steria · 4. selskap', init:'VS', c:HC.plum },
              { n:'Ingeborg Lyng', r:'Co-grunder · CPO', bg:'Bekk · Schibsted · PM 7 år', init:'IL', c:HC.coralDeep },
              { n:'Marius K.', r:'CTO', bg:'Cognite · AWS · 10 år backend', init:'MK', c:HC.green },
              { n:'Sofie Wang', r:'Head of Community', bg:'Kulturelle Hus Oslo · 6 år events', init:'SW', c:HC.amber },
            ].map((p, i) => (
              <div key={i} style={{
                padding:'14px 16px', borderRadius:12,
                background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)',
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{
                  width:40, height:40, borderRadius:20,
                  background:`linear-gradient(135deg, ${p.c}, ${p.c}99)`,
                  color:'#FFF', fontSize:13, fontWeight:700,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>{p.init}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:'#FFF'}}>{p.n}</div>
                  <div style={{fontSize:10.5, color:HC.coral, marginTop:1, fontWeight:600}}>{p.r}</div>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.5)', marginTop:2}}>{p.bg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAP TABLE (høyt nivå) */}
        <div style={{padding:'40px 24px 0'}}>
          <W_Kicker color={HC.coral}>06 · Eier­struktur</W_Kicker>
          <h2 style={{margin:'10px 0 0', fontFamily:SERIF, fontSize:26, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, color:'#FFF'}}>
            Cap table — høyt nivå.
          </h2>

          <div style={{marginTop:18, background:'rgba(255,255,255,.04)', borderRadius:12, border:'1px solid rgba(255,255,255,.08)', overflow:'hidden'}}>
            {[
              { l:'Grundere', v:'68%', c:HC.coral },
              { l:'Angel-investorer (pre-seed)', v:'14%', c:HC.plum },
              { l:'Ansatte-opsjoner (ESOP)', v:'12%', c:HC.amber },
              { l:'Innovasjon Norge (SkatteFUNN)', v:'6%', c:HC.green },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length-1 ? '1px solid rgba(255,255,255,.08)' : 'none',
              }}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11.5}}>
                  <span style={{color:'#FFF', fontWeight:600}}>{row.l}</span>
                  <span style={{color:row.c, fontWeight:700}}>{row.v}</span>
                </div>
                <div style={{marginTop:5, height:4, background:'rgba(255,255,255,.07)', borderRadius:2, overflow:'hidden'}}>
                  <div style={{width:row.v, height:'100%', background:row.c}}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:10, fontSize:10.5, color:'rgba(255,255,255,.42)', lineHeight:1.5}}>
            Forrige runde: 4M kr pre-seed, desember 2024, 18M verdi post-money.
            Detaljer under NDA.
          </div>
        </div>

        {/* AVSLUTTENDE CTA */}
        <div style={{padding:'40px 24px 0'}}>
          <div style={{
            padding:'24px 22px', borderRadius:18,
            background:`linear-gradient(135deg, ${HC.coralDeep} 0%, ${HC.plum} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontFamily:SERIF, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.15}}>
              Vi henter ikke aktivt nå.<br/>Men vi snakker gjerne.
            </div>
            <div style={{marginTop:12, fontSize:12.5, lineHeight:1.5, opacity:.9}}>
              Neste runde er planlagt Q4 2026. Hvis du tenker langsiktig på
              sosial helse, psykisk helse eller europeisk consumer — la oss møtes.
            </div>
            <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:8}}>
              <button style={{
                padding:'13px 18px', borderRadius:10, border:'none',
                background:'#FFF', color:HC.plumDeep, fontSize:13, fontWeight:700, cursor:'pointer',
                width:'100%',
              }}>
                Book en uformell prat
              </button>
              <button style={{
                padding:'13px 18px', borderRadius:10,
                background:'transparent', border:'1px solid rgba(255,255,255,.3)',
                color:'#FFF', fontSize:13, fontWeight:600, cursor:'pointer',
                width:'100%',
              }}>
                Last ned deck (PDF, 24 sider)
              </button>
            </div>
            <div style={{marginTop:14, fontSize:10.5, color:'rgba(255,255,255,.62)', textAlign:'center'}}>
              viktor@speedfriending.com
            </div>
          </div>
        </div>

        <div style={{height:48}}/>

        {/* Minimal footer for dark mode */}
        <div style={{padding:'20px 24px 28px', borderTop:'1px solid rgba(255,255,255,.08)', marginTop:16}}>
          <W_Logo color="#FFF"/>
          <div style={{marginTop:12, fontSize:10, color:'rgba(255,255,255,.36)', display:'flex', justifyContent:'space-between'}}>
            <span>Speedfriending AS · 925 111 222</span>
            <span>Konfidensielt</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EKSPORT — skjermene trenger å være wrappet i en rot-komponent uten telefon-
// rammen, fordi Hjem.html sin H_Phone-wrapper kan ikke nås (web-prototyper
// bruker egen W_Chrome eller bare det som ligger i H_Phone uten activeTab).
// Vi eksporterer direkte-render-komponentene.
// ---------------------------------------------------------------------------

window.H_WebHome = ScreenWebHome;
window.H_WebAmbassador = ScreenWebAmbassador;
window.H_WebBusiness = ScreenWebBusiness;
window.H_WebSponsor = ScreenWebSponsor;
window.H_WebPress = ScreenWebPress;
window.H_WebInvestor = ScreenWebInvestor;
