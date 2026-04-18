/* global React, HC, H_StatusBarLight */
// Systemiske skjermer — betaling feilet, offline, velkommen tilbake.
// Tonen: voksen, varm, aldri påtrengende. Ingen katastrofe-farger.

// ——————————————————————————————————————————————————————————
// 1) Betaling feilet / Vipps-timeout
// ——————————————————————————————————————————————————————————
function ScreenPaymentFailed() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>

        {/* Toppbar — tilbake-pil, ingen tittel (mykt) */}
        <div style={{padding:'14px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{
            width:38, height:38, borderRadius:19, border:'none',
            background:HC.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L3 7l6 5" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim}}>
            Betaling
          </div>
          <div style={{width:38}}/>
        </div>

        {/* Hero: rolig varselikon, beroligelse først */}
        <div style={{padding:'36px 28px 0', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
          <div style={{
            width:84, height:84, borderRadius:42,
            background:`${HC.amber}1C`,
            display:'flex', alignItems:'center', justifyContent:'center',
            marginBottom:22,
          }}>
            {/* Myk sirkulær informasjon — ikke "!"-alarm */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="16" stroke={HC.amber} strokeWidth="2"/>
              <path d="M19 12v9" stroke={HC.amber} strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="19" cy="26" r="1.4" fill={HC.amber}/>
            </svg>
          </div>

          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.01em', color:HC.fg, lineHeight:1.2}}>
            Betalingen gikk ikke gjennom
          </h1>

          <p style={{margin:'12px 0 0', fontSize:14.5, lineHeight:1.55, color:HC.fgDim, maxWidth:300}}>
            Ingen belastning har skjedd. Du kan prøve igjen — eller velge en annen betalingsmetode.
          </p>
        </div>

        {/* Forklaring (ikke-teknisk) */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, padding:'16px 18px',
            border:`1px solid ${HC.divider}`,
            boxShadow:'0 1px 6px rgba(42,33,52,.04)',
            display:'flex', gap:12, alignItems:'flex-start',
          }}>
            <div style={{
              width:34, height:34, borderRadius:17,
              background:`${HC.plum}14`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke={HC.plum} strokeWidth="1.6"/>
                <path d="M8 5v4" stroke={HC.plum} strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="8" cy="11" r=".9" fill={HC.plum}/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, marginBottom:4}}>
                Hva skjedde?
              </div>
              <div style={{fontSize:12.5, lineHeight:1.55, color:HC.fgDim}}>
                Vipps svarte ikke i tide. Det kan være midlertidig nettverksustabilitet — ikke noe galt med kortet ditt.
              </div>
            </div>
          </div>
        </div>

        {/* Ordre-oppsummering (for trygghet) */}
        <div style={{padding:'14px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{minWidth:0, flex:1}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum}}>
                  I kveld · 19:00
                </div>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg, marginTop:3, lineHeight:1.25}}>
                  Vinsmaking med Martine
                </div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>
                  Søstrene Karlsen · Trondheim
                </div>
              </div>
              <div style={{textAlign:'right', marginLeft:12}}>
                <div style={{fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>149 kr</div>
                <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:1}}>Ikke belastet</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA-er */}
        <div style={{padding:'26px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px', borderRadius:16, border:'none',
            background:HC.plum, color:'#fff',
            fontSize:15, fontWeight:700, letterSpacing:'-0.01em',
            cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow:`0 8px 20px ${HC.plum}35`,
          }}>
            {/* Vipps-lignende mark */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5l5 6 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Prøv Vipps igjen
          </button>

          <button style={{
            width:'100%', marginTop:10, padding:'15px', borderRadius:16,
            background:HC.card, border:`1px solid ${HC.divider}`,
            color:HC.fg, fontSize:14.5, fontWeight:700,
            cursor:'pointer',
          }}>
            Velg annen betalingsmetode
          </button>
        </div>

        {/* Sekundært: hva skjer nå */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            display:'flex', alignItems:'flex-start', gap:10,
            padding:'12px 14px', borderRadius:12,
            background:`${HC.green}0D`,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{marginTop:1, flexShrink:0}}>
              <path d="M3 8l3 3 7-7" stroke={HC.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{fontSize:12, lineHeight:1.55, color:HC.fgDim}}>
              Plassen din på eventet holdes i 10 minutter mens du prøver igjen.
            </div>
          </div>
        </div>

        {/* Support-lenke */}
        <div style={{padding:'22px 22px 10px', textAlign:'center'}}>
          <div style={{fontSize:12.5, color:HC.fgDim}}>
            Fortsatt trøbbel?{' '}
            <a href="#" style={{color:HC.plum, fontWeight:700, textDecoration:'none'}}>
              Snakk med oss
            </a>
          </div>
          <div style={{fontSize:11, color:HC.fgFaint, marginTop:6}}>
            Vi svarer som regel innen få minutter
          </div>
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————————————————
// 2) Ingen nett-tilkobling (offline)
// ——————————————————————————————————————————————————————————
function ScreenOffline() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>

        {/* Diskré toppbånd — rolig, ikke rød */}
        <div style={{padding:'14px 20px 0'}}>
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'10px 14px', borderRadius:12,
            background:`${HC.amber}14`,
            border:`1px solid ${HC.amber}30`,
          }}>
            <div style={{width:8, height:8, borderRadius:4, background:HC.amber}}/>
            <div style={{fontSize:11.5, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>
              Ingen nett-tilkobling
            </div>
            <div style={{flex:1}}/>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>
              Prøver igjen...
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{padding:'28px 28px 0', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
          <div style={{
            width:84, height:84, borderRadius:42,
            background:`${HC.plum}10`,
            display:'flex', alignItems:'center', justifyContent:'center',
            marginBottom:20,
            position:'relative',
          }}>
            {/* Offline-ikon: wifi med skråstrek */}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M6 15c4-4 9-6 15-6s11 2 15 6" stroke={HC.plum} strokeOpacity=".35" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M10 20c3-2.6 7-4.2 11-4.2s8 1.6 11 4.2" stroke={HC.plum} strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M14 25c2-1.6 4.4-2.6 7-2.6s5 1 7 2.6" stroke={HC.plum} strokeOpacity=".75" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="21" cy="31" r="1.8" fill={HC.plum}/>
              <path d="M5 5l32 32" stroke={HC.plum} strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.01em', color:HC.fg, lineHeight:1.2}}>
            Du er ikke tilkoblet
          </h1>
          <p style={{margin:'10px 0 0', fontSize:14, lineHeight:1.55, color:HC.fgDim, maxWidth:280}}>
            Appen oppdaterer seg selv så snart nettet er tilbake. Ingen hast.
          </p>
        </div>

        {/* Tilgjengelig offline */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.green, marginBottom:10, paddingLeft:4}}>
            Tilgjengelig nå
          </div>
          <div style={{
            background:HC.card, borderRadius:14,
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
            border:`1px solid ${HC.divider}`,
            overflow:'hidden',
          }}>
            {/* Reserverte events med QR */}
            <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${HC.divider}`}}>
              <div style={{
                width:40, height:40, borderRadius:10,
                background:`${HC.green}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                {/* QR-ikon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" stroke={HC.green} strokeWidth="1.5"/>
                  <rect x="12" y="2" width="6" height="6" rx="1" stroke={HC.green} strokeWidth="1.5"/>
                  <rect x="2" y="12" width="6" height="6" rx="1" stroke={HC.green} strokeWidth="1.5"/>
                  <rect x="13" y="13" width="2" height="2" fill={HC.green}/>
                  <rect x="16" y="13" width="2" height="2" fill={HC.green}/>
                  <rect x="13" y="16" width="2" height="2" fill={HC.green}/>
                  <rect x="16" y="16" width="2" height="2" fill={HC.green}/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Dine reserverte events</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>QR-koder og inngangsbilletter</div>
              </div>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* Tidligere kontakter */}
            <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${HC.divider}`}}>
              <div style={{
                width:40, height:40, borderRadius:10,
                background:`${HC.green}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="7" cy="7.5" r="2.8" stroke={HC.green} strokeWidth="1.5"/>
                  <circle cx="13" cy="7.5" r="2.8" stroke={HC.green} strokeWidth="1.5"/>
                  <path d="M2 16c0-2.2 2.2-3.5 4.5-3.5M17.5 16c0-2.2-2.2-3.5-4.5-3.5" stroke={HC.green} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Dine kontakter</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>Crew, profiler, notater</div>
              </div>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* Månedsrapport / lagret innhold */}
            <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:12}}>
              <div style={{
                width:40, height:40, borderRadius:10,
                background:`${HC.green}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke={HC.green} strokeWidth="1.5"/>
                  <path d="M6 8h8M6 11h5" stroke={HC.green} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Lagrede månedsbrev</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>Tidligere rapporter</div>
              </div>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        {/* Krever tilkobling */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgFaint, marginBottom:10, paddingLeft:4}}>
            Venter på nett
          </div>
          <div style={{
            background:'transparent', borderRadius:14,
            border:`1px dashed ${HC.divider}`,
            padding:'4px 16px',
          }}>
            {[
              { label:'Booke nye events' },
              { label:'Sende meldinger' },
              { label:'Oppdatere profilen' },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{
                  width:24, height:24, borderRadius:12,
                  background:`${HC.fgDim}14`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                  {/* Klokke-ikon */}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke={HC.fgDim} strokeWidth="1.3"/>
                    <path d="M6 3.5V6l1.8 1.2" stroke={HC.fgDim} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{flex:1, fontSize:12.5, color:HC.fgDim}}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Prøv igjen / innstillinger */}
        <div style={{padding:'22px 22px 0', display:'flex', gap:10}}>
          <button style={{
            flex:1, padding:'14px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            color:HC.fg, fontSize:13.5, fontWeight:700,
            cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 6A5 5 0 104 9.5" stroke={HC.fg} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M12 2v4h-4" stroke={HC.fg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            Prøv igjen
          </button>
          <button style={{
            flex:1, padding:'14px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            color:HC.fg, fontSize:13.5, fontWeight:700,
            cursor:'pointer',
          }}>
            Innstillinger
          </button>
        </div>

        <div style={{padding:'18px 22px 10px', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint}}>
            Vi oppdaterer automatisk når nettet kommer tilbake
          </div>
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————————————————
// 3) Velkommen tilbake — etter 60 dagers stille-modus
// ——————————————————————————————————————————————————————————
function ScreenWelcomeBack() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>

        {/* Hilsen — lav energi, bred luft */}
        <div style={{padding:'32px 28px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
            Velkommen tilbake
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Hei igjen, Viktor.
          </h1>
          <p style={{margin:'14px 0 0', fontSize:15, lineHeight:1.55, color:HC.fgDim, maxWidth:320}}>
            Alt er som det var. Ingen hast — ta tiden du trenger.
          </p>
        </div>

        {/* Crew — fortsatt der */}
        <div style={{padding:'32px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12, padding:'0 4px'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Ditt crew
            </div>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>
              Fortsatt her
            </div>
          </div>
          <div style={{
            background:HC.card, borderRadius:16, padding:'18px 18px 14px',
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap:-6, marginBottom:12}}>
              {[
                { n:'K', bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
                { n:'E', bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
                { n:'A', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
                { n:'M', bg:'linear-gradient(135deg,#86B89A,#3E7A56)' },
              ].map((p, i) => (
                <div key={i} style={{
                  width:40, height:40, borderRadius:20, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#FFF3E0', fontWeight:700, fontSize:14,
                  border:`2.5px solid ${HC.card}`,
                  marginLeft: i === 0 ? 0 : -10,
                }}>
                  {p.n}
                </div>
              ))}
              <div style={{
                width:40, height:40, borderRadius:20,
                background:HC.cream,
                border:`2.5px solid ${HC.card}`,
                marginLeft:-10,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:HC.fgDim, fontWeight:700, fontSize:12,
              }}>
                +3
              </div>
            </div>
            <div style={{fontSize:13.5, color:HC.fg, lineHeight:1.5}}>
              Kari, Erik, Anja og 4 andre er fortsatt i crewet ditt.
            </div>
            <div style={{fontSize:12, color:HC.fgDim, marginTop:4, lineHeight:1.5}}>
              Ingen har savnet deg høylytt — men døren er åpen når du er klar.
            </div>
          </div>
        </div>

        {/* Kari-kort — varm, konkret */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:16, padding:'16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:52, height:52, borderRadius:26,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:18,
              flexShrink:0,
            }}>
              K
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>
                Kari er fortsatt en kontakt
              </div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.4}}>
                Siste møte: vinkvelden på Søstrene, i februar.
              </div>
            </div>
          </div>
        </div>

        {/* Foreslåtte events — uten å presse */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{padding:'0 4px', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Hvis du har lyst
            </div>
            <div style={{fontSize:11.5, color:HC.fgDim, marginTop:4}}>
              Et par forslag — ingen påminnelser, ingen krav.
            </div>
          </div>
          <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6, marginLeft:-2, marginRight:-22, paddingLeft:2, paddingRight:22}}>
            {[
              { d:'Søn', t:'15:00', title:'Søndagskaffe', loc:'Jacobsen & Svart', tint:HC.amber },
              { d:'Ons', t:'19:00', title:'Stille lesekveld', loc:'Bokhuset', tint:HC.plum },
              { d:'Lør', t:'11:00', title:'Rolig bymarka-tur', loc:'Skistua', tint:HC.green },
            ].map((e, i) => (
              <div key={i} style={{
                flexShrink:0, width:170, padding:'14px 14px', borderRadius:14,
                background:HC.card, border:`1px solid ${HC.divider}`,
                boxShadow:'0 1px 4px rgba(42,33,52,.03)',
              }}>
                <div style={{width:34, height:34, borderRadius:10, background:`${e.tint}18`, color:e.tint, fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1.1}}>
                  <span>{e.d}</span>
                  <span style={{fontSize:9.5, opacity:.7, marginTop:1}}>{e.t}</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:10, lineHeight:1.25}}>{e.title}</div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{e.loc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diskret "Fortsett der du slapp" */}
        <div style={{padding:'26px 22px 0'}}>
          <button style={{
            width:'100%', padding:'14px 16px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
            cursor:'pointer', textAlign:'left',
            boxShadow:'0 1px 4px rgba(42,33,52,.03)',
          }}>
            <div style={{
              width:36, height:36, borderRadius:18,
              background:`${HC.plum}14`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 4-8 4z" fill={HC.plum}/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>
                Fortsett der du slapp
              </div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>
                Åpne februarrapporten din
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Diskret fotnote — din kontroll */}
        <div style={{padding:'22px 22px 10px', textAlign:'center'}}>
          <div style={{fontSize:11.5, color:HC.fgFaint, lineHeight:1.5}}>
            Stille-modus er fortsatt på.{' '}
            <a href="#" style={{color:HC.plum, fontWeight:600, textDecoration:'none'}}>
              Slå av når du er klar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenPaymentFailed = ScreenPaymentFailed;
window.H_ScreenOffline = ScreenOffline;
window.H_ScreenWelcomeBack = ScreenWelcomeBack;
