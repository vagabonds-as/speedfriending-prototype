/* global React, HC, H_StatusBarLight */
// Dating — 8 skjermer for dating-events i Speedfriending.
// Kjerneprinsipp fra concept-dating.md (Loop 3):
//   - Ikke et eget dating-spor. Ikke en "dating-mode" som toggle.
//   - Dating er en EVENT-KATEGORI med strengt samtykke per event.
//   - Samtykke hentes ved påmelding, ikke globalt. Dating-match oppstår kun
//     etter IRL-møte gjennom asymmetrisk opt-in.
//   - LHBTQ+ er førsteklasses borger, ikke tillegg.
//   - Rapport-flyt er synlig og seriøst håndtert.
// Farge: coral (#F0826B) som primær dating-tagging, rose-aksent (#E8B8A0) som
// sekundær — aldri plum for dating.

const DC = {
  rose: '#E8B8A0',          // rose-aksent spesifikt for dating
  roseSoft: '#F5DCCC',
  roseDeep: '#A66A4E',
};

// ────────────────────────────────────────────────────────────────────────────
// Felles — lite hjerte-ikon, mildt utformet (ikke Tinder-flammende)
// ────────────────────────────────────────────────────────────────────────────

function DatingHeart({ size = 14, color, filled = false }) {
  return filled ? (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M7 12.5s-5-3.3-5-7A3 3 0 017 3a3 3 0 015 2.5c0 3.7-5 7-5 7z" fill={color}/>
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M7 12.5s-5-3.3-5-7A3 3 0 017 3a3 3 0 015 2.5c0 3.7-5 7-5 7z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

function DatingBadge({ label = 'Dating-kveld', size = 'sm' }) {
  const padding = size === 'lg' ? '6px 12px' : '4px 9px';
  const fontSize = size === 'lg' ? 11.5 : 10;
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding, borderRadius:13,
      background:HC.coral, color:'#fff',
      fontSize, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase',
      boxShadow:`0 2px 6px ${HC.coral}40`,
    }}>
      <DatingHeart size={size === 'lg' ? 12 : 10} color="#fff" filled/>
      {label}
    </div>
  );
}

function BackButton() {
  return (
    <button style={{
      width:38, height:38, borderRadius:19,
      background:HC.card, border:'none',
      boxShadow:'0 2px 8px rgba(42,33,52,.08)',
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M9 2L3 7l6 5" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 1. DATING-EVENT-BADGE på events-feed
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingBadge() {
  const events = [
    {
      id:1, date:'Tor 24. apr · 19:00', title:'Slow Dating Dinner for 6',
      venue:'Smalhans, St. Hanshaugen', attendees:'4 av 6 plasser igjen',
      dating:true, datingNote:'Alle deltakere har bekreftet at dette er romantisk',
      tint:HC.coral, price:699,
    },
    {
      id:2, date:'Fre 25. apr · 19:30', title:'Brettspill på Trekroneren',
      venue:'Fjordgata 7', attendees:'14 kommer',
      dating:false, tint:HC.plum, price:79,
    },
    {
      id:3, date:'Lør 26. apr · 11:00', title:'Single Hike til Ullevålseter',
      venue:'Start: Sognsvann', attendees:'6 av 8 plasser igjen',
      dating:true, datingNote:'Alle deltakere har bekreftet at dette er romantisk',
      tint:HC.coral, price:299,
    },
    {
      id:4, date:'Lør 26. apr · 15:00', title:'Søndagskaffe m/ bokprat',
      venue:'Jacobsen & Svart', attendees:'8 kommer',
      dating:false, tint:HC.amber, price:49,
    },
    {
      id:5, date:'Tor 30. apr · 19:00', title:'Kulturbesøk — Munchmuseet',
      venue:'Munchmuseet + Territoriet', attendees:'3 av 6 plasser igjen',
      dating:true, datingNote:'Alle deltakere har bekreftet at dette er romantisk',
      tint:HC.coral, price:499,
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="14:12"/>

        <div style={{padding:'20px 24px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Events</div>
          <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Denne uka i Oslo
          </h1>
        </div>

        {/* Filter — dating vises som ett valg blant flere, ikke eksklusiv */}
        <div style={{padding:'16px 24px 0', display:'flex', gap:8, overflowX:'auto'}}>
          {[
            { label:'Alle', active:true, bg:HC.plum },
            { label:'Dating-kvelder', active:false, bg:HC.coral, icon:true },
            { label:'Mat', active:false },
            { label:'Uteliv', active:false },
            { label:'Friluft', active:false },
          ].map((f, i) => (
            <button key={i} style={{
              padding:'8px 14px', borderRadius:18, border:'none',
              background: f.active ? (f.bg || HC.plum) : HC.card,
              color: f.active ? '#fff' : HC.fg,
              fontSize:13, fontWeight:600, cursor:'pointer',
              flexShrink:0, display:'inline-flex', alignItems:'center', gap:6,
              boxShadow: f.active ? `0 4px 12px ${(f.bg||HC.plum)}35` : '0 1px 4px rgba(42,33,52,.04)',
            }}>
              {f.icon && <DatingHeart size={11} color={f.active ? '#fff' : HC.coral} filled/>}
              {f.label}
            </button>
          ))}
        </div>

        <div style={{padding:'20px 22px 12px', display:'grid', gap:12}}>
          {events.map(e => (
            <div key={e.id} style={{
              background:HC.card, borderRadius:16, overflow:'hidden',
              boxShadow: e.dating
                ? `0 8px 22px ${HC.coral}20, 0 0 0 1.5px ${HC.coral}`
                : '0 2px 10px rgba(42,33,52,.06)',
            }}>
              <div style={{
                padding:'12px 16px',
                background: e.dating ? `linear-gradient(95deg, ${HC.coral}14, ${DC.rose}14)` : `${e.tint}0e`,
                borderBottom:`1px solid ${HC.divider}`,
                display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:e.dating ? HC.coralDeep : e.tint}}>
                  {e.date.toUpperCase()}
                </div>
                {e.dating && <DatingBadge/>}
              </div>
              <div style={{padding:'14px 16px 16px'}}>
                <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>{e.title}</div>
                <div style={{fontSize:12.5, color:HC.fgDim, marginTop:4}}>{e.venue}</div>
                {e.dating && (
                  <div style={{
                    marginTop:10, padding:'10px 12px',
                    background: `${DC.rose}20`, borderRadius:10,
                    border:`1px solid ${DC.rose}40`,
                    display:'flex', gap:9, alignItems:'flex-start',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{flexShrink:0, marginTop:1}}>
                      <circle cx="7" cy="7" r="6" fill="none" stroke={HC.coralDeep} strokeWidth="1.4"/>
                      <path d="M4.5 7.2L6.2 9l3.3-4" stroke={HC.coralDeep} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div style={{fontSize:12, color:HC.coralDeep, lineHeight:1.4, fontWeight:600}}>
                      {e.datingNote}
                    </div>
                  </div>
                )}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
                  <div style={{fontSize:12, color:HC.fgDim}}>{e.attendees}</div>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{e.price} kr</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 2. DATING EVENT-DETALJ — Slow Dating Dinner for 6
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingDetail() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:96}}>
        <H_StatusBarLight time="14:15"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <BackButton/>
          <button aria-label="Lagre" style={{
            width:38, height:38, borderRadius:19, background:HC.card, border:'none',
            boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="14" height="16" viewBox="0 0 14 16">
              <path d="M2 2h10v12l-5-3-5 3z" fill="none" stroke={HC.fg} strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Hero-banner */}
        <div style={{margin:'20px 22px 0', borderRadius:20, overflow:'hidden', position:'relative', height:200,
          background:`linear-gradient(135deg, ${HC.coral} 0%, ${DC.rose} 70%, ${HC.coralSoft} 100%)`,
          boxShadow:`0 14px 32px ${HC.coral}35`,
        }}>
          <div style={{position:'absolute', right:-40, top:-30, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.14)'}}/>
          <div style={{position:'absolute', bottom:-20, left:-10, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
          <div style={{position:'absolute', top:16, left:18}}>
            <DatingBadge size="lg"/>
          </div>
          <div style={{position:'absolute', bottom:18, left:20, right:20, color:'#fff'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', opacity:.92}}>TORSDAG 24. APRIL · 19:00</div>
            <div style={{fontSize:22, fontWeight:700, letterSpacing:'-.01em', marginTop:4, lineHeight:1.15}}>
              Slow Dating Dinner for 6
            </div>
            <div style={{fontSize:13, opacity:.92, marginTop:3}}>Smalhans restaurant · St. Hanshaugen</div>
          </div>
        </div>

        {/* Samtykke-fakta-kort — tydeligste element */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, padding:'16px 18px',
            border:`1.5px solid ${HC.coral}`,
            boxShadow:`0 4px 14px ${HC.coral}18`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8" fill={HC.coral}/>
                <path d="M5.5 9L8 11.3l4.5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coralDeep}}>
                Samtykke bekreftet
              </div>
            </div>
            <div style={{fontSize:14, color:HC.fg, marginTop:10, lineHeight:1.5, fontWeight:500}}>
              Alle deltakere har samtykket til romantisk kontekst. Dette er ikke et vanlig sosialt event.
            </div>
            <div style={{marginTop:12, padding:'10px 12px', background:`${DC.rose}18`, borderRadius:10,
              fontSize:12.5, color:HC.fg, lineHeight:1.45,
            }}>
              <strong style={{color:HC.coralDeep}}>Oppsett:</strong> 3 menn, 3 kvinner (hetero-kveld). Aldersrange 30–42 år. For LGBT+-varianter, se egen filtrering.
            </div>
          </div>
        </div>

        {/* Detaljer */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{background:HC.card, borderRadius:14, padding:'14px 18px', display:'grid', gap:10, boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { k:'Format', v:'3-retters middag, roterende seter hver 25. min' },
              { k:'Varighet', v:'Ca. 2 t 30 min · starter 19:00' },
              { k:'Pris', v:'699 kr · forrett + hovedrett inkludert' },
              { k:'Vert', v:'Martine L. fra Speedfriending er til stede hele kvelden' },
              { k:'Verifisering', v:'Krav: ID-verifisert profil (gjøres én gang)' },
            ].map((row, i, arr) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12,
                paddingBottom: i < arr.length-1 ? 10 : 0,
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{fontSize:11.5, fontWeight:700, color:HC.fgDim, letterSpacing:'.06em', textTransform:'uppercase', minWidth:78}}>{row.k}</div>
                <div style={{fontSize:13.5, color:HC.fg, flex:1, textAlign:'right', lineHeight:1.4}}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plasser igjen */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep, marginBottom:10}}>
            Plasser · 4 av 6 igjen
          </div>
          <div style={{display:'flex', gap:8}}>
            {[
              { g:'K', booked:true },
              { g:'K', booked:true },
              { g:'K', booked:false },
              { g:'M', booked:true },
              { g:'M', booked:false },
              { g:'M', booked:false },
            ].map((s, i) => (
              <div key={i} style={{
                flex:1, aspectRatio:'1/1.2', borderRadius:10,
                background: s.booked ? HC.coral : HC.card,
                border: s.booked ? 'none' : `1.5px dashed ${HC.coralSoft}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color: s.booked ? '#fff' : HC.coralSoft, fontWeight:700, fontSize:14,
                boxShadow: s.booked ? `0 3px 8px ${HC.coral}30` : 'none',
              }}>
                {s.booked ? s.g : '·'}
              </div>
            ))}
          </div>
          <div style={{fontSize:11.5, color:HC.fgDim, marginTop:8, lineHeight:1.4}}>
            K = kvinner, M = menn. Du ser kun antall og kjønnsfordeling — ikke navn eller profiler på forhånd.
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'22px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background:HC.coral, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            boxShadow:`0 10px 22px ${HC.coral}45`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <DatingHeart size={14} color="#fff" filled/>
            Reserver plass · 699 kr
          </button>
          <div style={{textAlign:'center', fontSize:11.5, color:HC.fgDim, marginTop:10, lineHeight:1.4}}>
            Du må bekrefte samtykke i neste steg før betaling
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 3. SAMTYKKE FØR RESERVASJON
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingConsent() {
  const [checks, setChecks] = React.useState([false, false, false]);
  const allChecked = checks.every(Boolean);

  const items = [
    {
      title:'Jeg forstår at dette er en romantisk kontekst',
      body:'Alle 6 deltakere har sagt ja til at kvelden har romantisk intensjon. Dette er ikke et vanlig sosialt event.',
    },
    {
      title:'Jeg skal behandle alle deltakere med respekt',
      body:'Ingen nedsettende kommentarer, ingen vedvarende tilnærminger etter at noen har sagt nei, ingen overgrep av noen art. Grenser respekteres.',
    },
    {
      title:'Jeg vil ikke kontakte noen senere uten deres eksplisitte samtykke',
      body:'Etter eventet kan dere begge velge hverandre via Speedfriending. Hvis du ikke får beskjed om match, er svaret nei — og det aksepterer jeg stille og uten forfølgelse.',
    },
  ];

  const toggle = (i) => setChecks(c => c.map((v, j) => j === i ? !v : v));

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:110}}>
        <H_StatusBarLight time="14:17"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <BackButton/>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', color:HC.coralDeep}}>STEG 1 AV 2</div>
          <div style={{width:38}}/>
        </div>

        <div style={{padding:'24px 26px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 11px', borderRadius:14,
            background:`${HC.coral}18`, color:HC.coralDeep,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
          }}>
            <DatingHeart size={11} color={HC.coralDeep} filled/>
            Samtykke før reservasjon
          </div>
          <h1 style={{margin:'14px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Vi bygger noe mildt og trygt. Kan du være med på det?
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14, color:HC.fgDim, lineHeight:1.55}}>
            Kryss av for hver punkt under. Dette er ikke juridiske fintrykk — det er hvordan kvelden faktisk fungerer.
          </p>
        </div>

        <div style={{padding:'22px 22px 0', display:'grid', gap:12}}>
          {items.map((it, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              background:HC.card, borderRadius:16, padding:'16px 18px',
              border:checks[i] ? `1.5px solid ${HC.coral}` : `1px solid ${HC.divider}`,
              boxShadow: checks[i] ? `0 4px 14px ${HC.coral}18` : '0 1px 6px rgba(42,33,52,.04)',
              cursor:'pointer', textAlign:'left', fontFamily:'inherit',
              display:'flex', gap:14, alignItems:'flex-start', width:'100%',
            }}>
              <div style={{
                width:24, height:24, borderRadius:12, flexShrink:0, marginTop:1,
                background: checks[i] ? HC.coral : 'transparent',
                border: checks[i] ? `1.5px solid ${HC.coral}` : `1.5px solid ${HC.fgFaint}`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {checks[i] && (
                  <svg width="13" height="13" viewBox="0 0 13 13">
                    <path d="M3 6.5L5.5 9 10 4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg, lineHeight:1.35}}>{it.title}</div>
                <div style={{fontSize:12.5, color:HC.fgDim, marginTop:6, lineHeight:1.5}}>{it.body}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Soft reminder */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{background:`${DC.rose}25`, borderRadius:14, padding:'14px 16px', display:'flex', gap:10, alignItems:'flex-start'}}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{flexShrink:0, marginTop:1}}>
              <circle cx="9" cy="9" r="7.5" fill="none" stroke={HC.coralDeep} strokeWidth="1.5"/>
              <path d="M9 5v5M9 12.5v.5" stroke={HC.coralDeep} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.5}}>
              Om du krysser en grense, ringer vi deg innen 24 timer. Rapporter anonymt via eventet, og vi har ansvaret videre. Moderering er reell, ikke symbolsk.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'22px 22px 0'}}>
          <button disabled={!allChecked} style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background: allChecked ? HC.coral : HC.fgFaint,
            color:'#fff',
            fontSize:15, fontWeight:700,
            cursor: allChecked ? 'pointer' : 'not-allowed',
            fontFamily:'inherit',
            boxShadow: allChecked ? `0 10px 22px ${HC.coral}45` : 'none',
            opacity: allChecked ? 1 : .6,
          }}>
            {allChecked ? 'Gå videre til betaling' : `Kryss av alle ${checks.filter(Boolean).length}/3`}
          </button>
          <button style={{
            width:'100%', marginTop:10, padding:'12px', borderRadius:24, border:'none',
            background:'transparent', color:HC.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Avbryt — jeg vil ikke reservere
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 4. POST-DATE OPT-IN — etter eventet
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingOptIn() {
  const [picks, setPicks] = React.useState({});

  const people = [
    { id:'kari',  name:'Kari, 34',   hint:'Snakket om Ibsen',       bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
    { id:'anja',  name:'Anja, 31',   hint:'Deler interessen for fjelltur', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
    { id:'ingrid',name:'Ingrid, 36', hint:'Satt ved siden av deg i 2. runde', bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
  ];

  const setChoice = (id, choice) => setPicks(p => ({ ...p, [id]: p[id] === choice ? null : choice }));

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:110}}>
        <H_StatusBarLight time="22:34"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <BackButton/>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', color:HC.coralDeep}}>1 TIME ETTER EVENT</div>
          <div style={{width:38}}/>
        </div>

        <div style={{padding:'20px 26px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 11px', borderRadius:14,
            background:`${HC.coral}18`, color:HC.coralDeep,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
          }}>
            <DatingHeart size={11} color={HC.coralDeep} filled/>
            Slow Dating · Smalhans
          </div>
          <h1 style={{margin:'14px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Var det noen du vil bli kjent med romantisk?
          </h1>
          <p style={{margin:'12px 0 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55}}>
            Du kan kun velge personer du faktisk møtte i kveld. Den andre får aldri vite at du har vurdert dem — med mindre dere begge velger hverandre.
          </p>
        </div>

        <div style={{padding:'22px 22px 0', display:'grid', gap:10}}>
          {people.map(p => (
            <div key={p.id} style={{
              background:HC.card, borderRadius:16, padding:'14px 16px',
              boxShadow: picks[p.id] === 'dating' ? `0 6px 18px ${HC.coral}30, 0 0 0 1.5px ${HC.coral}` : '0 1px 6px rgba(42,33,52,.05)',
              display:'flex', gap:14, alignItems:'center',
            }}>
              <div style={{width:48, height:48, borderRadius:24, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:16, flexShrink:0}}>
                {p.name[0]}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>{p.name}</div>
                <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>{p.hint}</div>
              </div>
              <div style={{display:'flex', gap:6, flexShrink:0}}>
                <button onClick={() => setChoice(p.id, 'friend')} aria-label="Som venn" style={{
                  width:40, height:40, borderRadius:20, border:'none',
                  background: picks[p.id] === 'friend' ? HC.plum : `${HC.plum}14`,
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="5" cy="6" r="2.2" fill="none" stroke={picks[p.id] === 'friend' ? '#fff' : HC.plum} strokeWidth="1.5"/>
                    <circle cx="11" cy="6" r="2.2" fill="none" stroke={picks[p.id] === 'friend' ? '#fff' : HC.plum} strokeWidth="1.5"/>
                    <path d="M2 13c0-2 1.5-3 3-3s3 1 3 3M8 13c0-2 1.5-3 3-3s3 1 3 3" stroke={picks[p.id] === 'friend' ? '#fff' : HC.plum} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </button>
                <button onClick={() => setChoice(p.id, 'dating')} aria-label="Romantisk" style={{
                  width:40, height:40, borderRadius:20, border:'none',
                  background: picks[p.id] === 'dating' ? HC.coral : `${HC.coral}14`,
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <DatingHeart size={17} color={picks[p.id] === 'dating' ? '#fff' : HC.coral} filled/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Asymmetri-forklaring */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{background:`${DC.rose}25`, borderRadius:14, padding:'14px 16px', display:'flex', gap:10, alignItems:'flex-start'}}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{flexShrink:0, marginTop:1}}>
              <circle cx="9" cy="9" r="7.5" fill="none" stroke={HC.coralDeep} strokeWidth="1.5"/>
              <path d="M9 5v5" stroke={HC.coralDeep} strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="12.5" r=".8" fill={HC.coralDeep}/>
            </svg>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.5}}>
              <strong>Hvis bare du velger Kari:</strong> ingenting skjer. Kari får aldri varsel.
              <br/><strong>Hvis begge velger hverandre:</strong> chatten åpnes i morgen tidlig.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'22px 22px 0', display:'grid', gap:8}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background:HC.coral, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            boxShadow:`0 10px 22px ${HC.coral}45`,
          }}>
            Send valgene mine
          </button>
          <button style={{
            width:'100%', padding:'12px', borderRadius:24, border:'none',
            background:'transparent', color:HC.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Ingen passet — takk for kvelden
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 5. DATING-MATCH — Kari har også valgt deg
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingMatch() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse at top, ${HC.coral}22 0%, transparent 55%), radial-gradient(ellipse at bottom, ${DC.rose}2a 0%, transparent 55%)`, pointerEvents:'none'}}/>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="08:14"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'flex-end'}}>
          <button aria-label="Lukk" style={{
            width:38, height:38, borderRadius:19, background:HC.card, border:'none',
            boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 3l7 7M10 3l-7 7" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Hero-avatar-par */}
        <div style={{padding:'32px 24px 0', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{position:'relative', width:200, height:116, marginBottom:18}}>
            <div style={{position:'absolute', left:0, top:8, width:96, height:96, borderRadius:48,
              background:'linear-gradient(135deg,#D4A85C,#8A5A3B)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:36,
              boxShadow:`0 6px 20px rgba(42,33,52,.2), 0 0 0 4px ${HC.bg}`,
            }}>V</div>
            <div style={{position:'absolute', right:0, top:8, width:96, height:96, borderRadius:48,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:36,
              boxShadow:`0 6px 20px rgba(42,33,52,.2), 0 0 0 4px ${HC.bg}`,
            }}>K</div>
            <div style={{position:'absolute', left:'50%', top:34, transform:'translateX(-50%)', width:48, height:48, borderRadius:24,
              background:HC.coral,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 8px 20px ${HC.coral}55, 0 0 0 4px ${HC.bg}`,
            }}>
              <DatingHeart size={24} color="#fff" filled/>
            </div>
          </div>

          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 11px', borderRadius:14,
            background:`${HC.coral}18`, color:HC.coralDeep,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
          }}>
            Dating-match
          </div>
          <h1 style={{margin:'14px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15, textAlign:'center'}}>
            Kari har også valgt deg
          </h1>
          <p style={{margin:'12px 24px 0', fontSize:14.5, color:HC.fgDim, lineHeight:1.55, textAlign:'center'}}>
            Dere møttes på Smalhans i går. Dere kan nå chatte direkte — dere trenger ingen intro.
          </p>
        </div>

        {/* Respekt-nugget */}
        <div style={{padding:'22px 28px 0'}}>
          <div style={{
            background:HC.card, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${DC.rose}`,
            display:'flex', gap:10, alignItems:'flex-start',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{flexShrink:0, marginTop:1}}>
              <path d="M8 1l2 4 4.5.5-3.3 3.3.8 4.5L8 11l-4 2.3.8-4.5L1.5 5.5 6 5z" fill={HC.coral}/>
            </svg>
            <div style={{fontSize:12.5, color:HC.fg, lineHeight:1.5}}>
              <strong style={{color:HC.coralDeep}}>Uansett hva som skjer, vær respektfull.</strong> Hvis hun svarer kort, slutter å svare, eller trekker seg — aksepter det. Ingen forfølgelse.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'28px 22px 32px'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background:HC.coral, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            boxShadow:`0 10px 22px ${HC.coral}45`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H7l-3 3v-3H4a2 2 0 01-2-2z" fill="#fff"/>
            </svg>
            Start samtalen med Kari
          </button>
          <button style={{
            width:'100%', marginTop:8, padding:'12px', borderRadius:24, border:'none',
            background:'transparent', color:HC.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Senere
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 6. RAPPORTER UPASSENDE OPPFØRSEL — dating-spesifikk
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingReport() {
  const [category, setCategory] = React.useState(null);

  const categories = [
    { id:'boundary', label:'Krysset en grense',      severity:'høy', icon:'⚠' },
    { id:'pressure', label:'Press eller uønsket fysisk kontakt', severity:'høy', icon:'⚠' },
    { id:'message',  label:'Melding etter uten samtykke',     severity:'middels', icon:'!' },
    { id:'disrespect', label:'Nedsettende oppførsel',          severity:'middels', icon:'!' },
    { id:'other',    label:'Noe annet jeg vil rapportere',    severity:'lav', icon:'·' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:120}}>
        <H_StatusBarLight time="23:48"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <BackButton/>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', color:HC.coralDeep}}>RAPPORTER</div>
          <div style={{width:38}}/>
        </div>

        {/* Topp-assurance — stor og tydelig */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral}, ${DC.roseDeep})`,
            borderRadius:18, padding:'18px 20px', color:'#fff',
            boxShadow:`0 12px 26px ${HC.coral}40`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path d="M11 2L2 6v6c0 4.5 4 8 9 8s9-3.5 9-8V6l-9-4z" fill="rgba(255,255,255,.25)"/>
                <path d="M7 11l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', opacity:.95}}>DATING-KONTEKST · HØY ALVORLIGHET</div>
            </div>
            <div style={{fontSize:19, fontWeight:700, letterSpacing:'-0.01em', marginTop:10, lineHeight:1.25}}>
              Hvis noen krysset en grense, si fra umiddelbart.
            </div>
            <div style={{fontSize:13, marginTop:8, lineHeight:1.5, opacity:.95}}>
              Vi ringer deg innen 24 timer. Ingen kopi går til den andre parten. Modereringsteamet har saken før rettssak eller utestengelse.
            </div>
          </div>
        </div>

        <div style={{padding:'22px 26px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coralDeep, marginBottom:10}}>
            Hva skjedde?
          </div>
        </div>

        <div style={{padding:'0 22px', display:'grid', gap:10}}>
          {categories.map(c => {
            const isHigh = c.severity === 'høy';
            const sevColor = c.severity === 'høy' ? HC.coralDeep : (c.severity === 'middels' ? HC.amber : HC.fgDim);
            const isActive = category === c.id;
            return (
              <button key={c.id} onClick={() => setCategory(c.id)} style={{
                background:HC.card, borderRadius:14, padding:'14px 16px',
                border: isActive ? `1.5px solid ${HC.coral}` : `1px solid ${HC.divider}`,
                boxShadow: isActive ? `0 4px 14px ${HC.coral}20` : '0 1px 4px rgba(42,33,52,.04)',
                cursor:'pointer', textAlign:'left', fontFamily:'inherit',
                display:'flex', gap:12, alignItems:'center', width:'100%',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:10, flexShrink:0,
                  background:`${sevColor}18`, color:sevColor,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18, fontWeight:700,
                }}>{c.icon}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{c.label}</div>
                  <div style={{fontSize:11.5, color:sevColor, marginTop:2, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em'}}>
                    {c.severity === 'høy' ? 'Høy alvorlighet · vi ringer' : c.severity === 'middels' ? 'Middels · svar innen 24 t' : 'Vi følger opp'}
                  </div>
                </div>
                {isHigh && (
                  <div style={{padding:'3px 8px', borderRadius:10, background:HC.coralDeep, color:'#fff', fontSize:9.5, fontWeight:700, letterSpacing:'.08em'}}>
                    24 T
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Akutt-tiltak */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{background:HC.card, borderRadius:14, padding:'14px 16px', boxShadow:'0 1px 6px rgba(42,33,52,.05)'}}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep, marginBottom:8}}>
              Akutt fare nå?
            </div>
            <div style={{display:'flex', gap:8}}>
              <button style={{
                flex:1, padding:'12px', borderRadius:22, border:'none',
                background:HC.coralDeep, color:'#fff',
                fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
              }}>
                Ring 112
              </button>
              <button style={{
                flex:1, padding:'12px', borderRadius:22, border:'none',
                background:HC.coral, color:'#fff',
                fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
              }}>
                Ring Speedfriending-vakt
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'22px 22px 0'}}>
          <button disabled={!category} style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background: category ? HC.coral : HC.fgFaint,
            color:'#fff',
            fontSize:15, fontWeight:700,
            cursor: category ? 'pointer' : 'not-allowed',
            fontFamily:'inherit',
            boxShadow: category ? `0 10px 22px ${HC.coral}45` : 'none',
            opacity: category ? 1 : .6,
          }}>
            Send rapport anonymt
          </button>
          <div style={{fontSize:11.5, color:HC.fgDim, marginTop:10, lineHeight:1.4, textAlign:'center'}}>
            Rapporten sendes kryptert. Den andre parten ser aldri at du har rapportert.
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 7. LHBTQ+ DATING-EVENTS — førsteklasses filtering
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingLGBT() {
  const [pref, setPref] = React.useState('alle');

  const prefOptions = [
    { id:'women-women', label:'Kvinner som søker kvinner' },
    { id:'men-men',     label:'Menn som søker menn' },
    { id:'pansexual',   label:'Pansexual' },
    { id:'bi',          label:'Bifil' },
    { id:'alle',        label:'Alle / åpen for alt' },
  ];

  const events = [
    {
      id:1, date:'Fre 25. apr · 19:00', title:'Slow Dating Dinner — WLW',
      venue:'Bass, Grünerløkka', tag:'Kvinner som søker kvinner',
      attendees:'3 av 6 plasser', age:'28–40', tint:HC.coral,
    },
    {
      id:2, date:'Lør 26. apr · 15:00', title:'Queer Kaffe & Kultur',
      venue:'Sentralen + Pride House', tag:'Åpen for alle',
      attendees:'5 av 8 plasser', age:'25–45', tint:HC.coral,
    },
    {
      id:3, date:'Ons 30. apr · 19:30', title:'Single Menn-middag',
      venue:'Lofthus Samvirkelag', tag:'Menn som søker menn',
      attendees:'4 av 6 plasser', age:'30–45', tint:HC.coral,
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:26"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <BackButton/>
          <div style={{
            padding:'4px 10px', borderRadius:12,
            background:`linear-gradient(90deg, ${HC.coral}, ${DC.rose}, #B788C9, #7895C4)`,
            fontSize:10, fontWeight:700, letterSpacing:'.14em', color:'#fff',
          }}>LHBTQ+</div>
          <div style={{width:38}}/>
        </div>

        <div style={{padding:'20px 26px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coralDeep}}>Dating-events</div>
          <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Hvem ser du etter?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55}}>
            Alle kategorier er likestilt. Vi har events for alle — og alle events er trygge rom.
          </p>
        </div>

        {/* Preferanse-pills — kompakt kolonne */}
        <div style={{padding:'18px 22px 0', display:'grid', gap:8}}>
          {prefOptions.map(o => {
            const active = pref === o.id;
            return (
              <button key={o.id} onClick={() => setPref(o.id)} style={{
                padding:'13px 16px', borderRadius:14, border:'none',
                background: active ? HC.coral : HC.card,
                color: active ? '#fff' : HC.fg,
                fontSize:14, fontWeight:600, cursor:'pointer', textAlign:'left',
                fontFamily:'inherit',
                boxShadow: active ? `0 6px 16px ${HC.coral}30` : '0 1px 4px rgba(42,33,52,.04)',
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{
                  width:22, height:22, borderRadius:11,
                  background: active ? 'rgba(255,255,255,.3)' : `${HC.coral}18`,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M3 6.5l2 2 4-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                {o.label}
              </button>
            );
          })}
        </div>

        <div style={{padding:'24px 26px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
            Kommende events · {events.length}
          </div>
        </div>

        <div style={{padding:'12px 22px 0', display:'grid', gap:10}}>
          {events.map(e => (
            <div key={e.id} style={{
              background:HC.card, borderRadius:16, overflow:'hidden',
              boxShadow:`0 2px 10px rgba(42,33,52,.06), 0 0 0 1px ${HC.coral}30`,
            }}>
              <div style={{padding:'12px 16px', background:`${HC.coral}10`, borderBottom:`1px solid ${HC.divider}`,
                display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:HC.coralDeep}}>
                  {e.date.toUpperCase()}
                </div>
                <DatingBadge label={e.tag}/>
              </div>
              <div style={{padding:'14px 16px 14px'}}>
                <div style={{fontSize:15.5, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>{e.title}</div>
                <div style={{fontSize:12.5, color:HC.fgDim, marginTop:4}}>{e.venue}</div>
                <div style={{display:'flex', gap:12, marginTop:10, fontSize:11.5, color:HC.fgDim}}>
                  <span>{e.age} år</span>
                  <span style={{opacity:.4}}>·</span>
                  <span>{e.attendees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'20px 26px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, fontSize:12, color:HC.fgDim, lineHeight:1.5}}>
            Noe vi burde ha som ikke finnes her? <span style={{color:HC.coralDeep, fontWeight:600}}>Foreslå et event</span>. Vi tar ikke betalt for å lage flere kategorier.
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 8. DATING-PREMIUM — 149 kr/mnd
// ────────────────────────────────────────────────────────────────────────────

function ScreenDatingPremium() {
  const [plan, setPlan] = React.useState('monthly');

  const benefits = [
    {
      title:'Tidlig tilgang — 24 timer før andre',
      body:'Populære dating-events fylles opp på under en time. Du ser dem først.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="6.5" fill="none" stroke={HC.coral} strokeWidth="1.5"/>
          <path d="M9 5v4l2.5 2" stroke={HC.coral} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
    },
    {
      title:'Se gjestelister — anonymt',
      body:'Kun alder + "ser etter"-kategori. Ingen navn, ingen profiler. Du vet hva du går til uten å se hvem.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="3" fill="none" stroke={HC.coral} strokeWidth="1.5"/>
          <path d="M3 9c0 3.5 3 6.5 6 6.5s6-3 6-6.5S12 2.5 9 2.5 3 5.5 3 9z" fill="none" stroke={HC.coral} strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title:'Prioritert påmelding til populære events',
      body:'Fullbooket på 1 time? Du er først i køen når plasser frigjøres.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M9 2l2 4.5 4.5.5-3.5 3.2.8 4.5L9 12l-3.8 2.3.8-4.5L2.5 7l4.5-.5z" fill="none" stroke={HC.coral} strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title:'Post-event statistikk',
      body:'Se hvor mange som valgte deg som venn eller dating — uten navn. Brukes til å forstå deg selv, ikke score andre.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <rect x="3" y="10" width="3" height="5" fill={HC.coral}/>
          <rect x="7.5" y="7" width="3" height="8" fill={HC.coral}/>
          <rect x="12" y="4" width="3" height="11" fill={HC.coral}/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:120}}>
        <H_StatusBarLight time="14:29"/>

        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 3l7 7M10 3l-7 7" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.coralDeep}}>Dating+</div>
          <div style={{width:38}}/>
        </div>

        {/* Hero */}
        <div style={{padding:'22px 28px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 11px', borderRadius:14,
            background:`${HC.coral}18`, color:HC.coralDeep,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
          }}>
            <DatingHeart size={11} color={HC.coralDeep} filled/>
            Kun for dating-kvelder
          </div>
          <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-0.022em', color:HC.fg, lineHeight:1.12}}>
            Litt mer forsprang,<br/>litt mer innsikt.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14.5, color:HC.fgDim, lineHeight:1.55}}>
            Dating+ er for deg som vil komme først inn på populære kvelder. Du trenger det ikke — men det gir deg rom til å bla i ro.
          </p>
        </div>

        {/* Pris-kort */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral}, ${DC.rose})`,
            borderRadius:20, padding:'22px 24px', color:'#fff',
            boxShadow:`0 14px 30px ${HC.coral}40`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'70%', background:'rgba(255,255,255,.12)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', opacity:.92}}>SPEEDFRIENDING DATING+</div>
              <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:12}}>
                <div style={{fontSize:44, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1}}>149</div>
                <div style={{fontSize:16, fontWeight:600, opacity:.92}}>kr/mnd</div>
              </div>
              <div style={{fontSize:12.5, marginTop:6, opacity:.9}}>
                Stopper når du vil. Event-billetter kommer i tillegg.
              </div>
            </div>
          </div>
        </div>

        {/* Fordeler */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep, marginBottom:10}}>
            Det du får
          </div>
          <div style={{background:HC.card, borderRadius:16, padding:'4px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {benefits.map((b, i, arr) => (
              <div key={i} style={{
                display:'flex', gap:14, padding:'14px 0', alignItems:'flex-start',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:10,
                  background:`${HC.coral}12`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>{b.icon}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-.005em'}}>{b.title}</div>
                  <div style={{fontSize:12.5, color:HC.fgDim, marginTop:3, lineHeight:1.5}}>{b.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eksempel-gjesteliste */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep, marginBottom:10}}>
            Slik ser en gjesteliste ut
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'14px 16px', boxShadow:'0 1px 6px rgba(42,33,52,.05)'}}>
            <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginBottom:8}}>Slow Dating Dinner · Smalhans</div>
            <div style={{display:'grid', gap:6, fontSize:12.5, color:HC.fg}}>
              {[
                { age:32, seek:'Ser etter kvinner' },
                { age:35, seek:'Ser etter menn' },
                { age:31, seek:'Ser etter menn' },
                { age:38, seek:'Ser etter kvinner' },
                { age:34, seek:'Ser etter menn' },
              ].map((p, i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i < 4 ? `1px solid ${HC.divider}` : 'none'}}>
                  <span>{p.age} år</span>
                  <span style={{color:HC.fgDim}}>{p.seek}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:11, color:HC.fgDim, marginTop:10, fontStyle:'italic', lineHeight:1.4}}>
              Ingen navn. Ingen bilder. Bare nok til å vite om du passer.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'24px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:28, border:'none',
            background:HC.coral, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            boxShadow:`0 10px 22px ${HC.coral}45`,
          }}>
            Prøv Dating+ for 149 kr/mnd
          </button>
          <div style={{textAlign:'center', fontSize:11.5, color:HC.fgDim, marginTop:10, lineHeight:1.4}}>
            Dating+ er separat fra Speedfriending+. Du kan ha begge, eller bare den ene.
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Eksport
// ────────────────────────────────────────────────────────────────────────────

window.H_ScreenDatingBadge   = ScreenDatingBadge;
window.H_ScreenDatingDetail  = ScreenDatingDetail;
window.H_ScreenDatingConsent = ScreenDatingConsent;
window.H_ScreenDatingOptIn   = ScreenDatingOptIn;
window.H_ScreenDatingMatch   = ScreenDatingMatch;
window.H_ScreenDatingReport  = ScreenDatingReport;
window.H_ScreenDatingLGBT    = ScreenDatingLGBT;
window.H_ScreenDatingPremium = ScreenDatingPremium;
