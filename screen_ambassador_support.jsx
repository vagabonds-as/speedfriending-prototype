/* global React, HC, H_StatusBarLight */
// Ambassadør-økonomi + krisehåndtering + ressurser
// Martine er en ekte person: hun tjener 500-3000 kr/mnd, må forstå skatt,
// må kunne ringe mennesker når noe går galt, og må føle at Speedfriending
// er en mentor — ikke en overvåker. Ingen leaderboards. Ingen dark patterns.

// ────────────────────────────────────────────────────────────────────────────
// Felles små byggeklosser
// ────────────────────────────────────────────────────────────────────────────

function A_Header({ eyebrow, title, subtitle, time = '14:23', onBack }) {
  return (
    <>
      <H_StatusBarLight time={time}/>
      <div style={{padding:'14px 22px 0', display:'flex', alignItems:'center', gap:10}}>
        {onBack !== false ? (
          <button style={{
            width:36, height:36, borderRadius:18, border:'none',
            background:'rgba(255,255,255,.7)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 3px rgba(42,33,52,.06)',
          }}>
            <svg width="12" height="14" viewBox="0 0 12 14">
              <path d="M9 2L3 7l6 5" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <div style={{width:36}}/>}
      </div>
      <div style={{padding:'18px 24px 0'}}>
        {eyebrow && (
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
            {eyebrow}
          </div>
        )}
        <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
          {title}
        </h1>
        {subtitle && (
          <p style={{margin:'8px 0 0', fontSize:14, color:HC.fgDim, lineHeight:1.5}}>{subtitle}</p>
        )}
      </div>
    </>
  );
}

function A_SectionLabel({ children, color = HC.plum }) {
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color, marginBottom:10}}>
      {children}
    </div>
  );
}

function A_Chevron() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14">
      <path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 1. UTBETALINGSOVERSIKT — Martines månedlige inntjening
// ════════════════════════════════════════════════════════════════════════════

function ScreenAmbPayout() {
  // Siste 6 måneder (eldste → nyeste). April = denne måneden.
  const months = [
    { m:'nov', v:1820 },
    { m:'des', v:2410 },
    { m:'jan', v:1560 },
    { m:'feb', v:2080 },
    { m:'mar', v:2640 },
    { m:'apr', v:2847, current:true },
  ];
  const maxV = Math.max(...months.map(x => x.v));

  const events = [
    { date:'16. apr', title:'Vinsmaking · Søstrene Karlsen', guests:6, sum:612, status:'Utbetalt' },
    { date:'12. apr', title:'Brettspill · Trekroneren', guests:8, sum:480, status:'Utbetalt' },
    { date:'09. apr', title:'Bymarka-tur · Skistua', guests:5, sum:315, status:'Utbetalt' },
    { date:'05. apr', title:'Søndagskaffe · Jacobsen & Svart', guests:7, sum:441, status:'Venter', note:'Utbetales 15. mai' },
    { date:'02. apr', title:'Bokklubb · Bokhuset', guests:4, sum:252, status:'Refundert', note:'Ambassadør ble syk' },
    { date:'29. mar', title:'Jazzklubb · Dokkhuset', guests:9, sum:567, status:'Utbetalt' },
    { date:'26. mar', title:'Middagsklubb · Fagn', guests:6, sum:540, status:'Utbetalt' },
    { date:'22. mar', title:'Vinkveld · Olsen bar', guests:8, sum:640, status:'Utbetalt' },
  ];

  const statusColor = (s) => ({
    'Utbetalt':  { bg:`${HC.green}15`, fg:HC.green },
    'Venter':    { bg:`${HC.amber}20`, fg:'#8A6320' },
    'Refundert': { bg:`${HC.fgFaint}`, fg:HC.fgDim },
  }[s] || { bg:HC.divider, fg:HC.fgDim });

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <A_Header
          eyebrow="Ambassadør · Økonomi"
          title="Utbetalinger"
        />

        {/* Hero — denne måneden */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.plum} 0%, ${HC.plumDeep} 100%)`,
            borderRadius:22, padding:'22px 22px 20px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.plum}30`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-60, top:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.07)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', opacity:.82, textTransform:'uppercase'}}>
                Denne måneden · April
              </div>
              <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:8}}>
                <span style={{fontSize:38, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1}}>2 847</span>
                <span style={{fontSize:16, fontWeight:600, opacity:.85}}>kr</span>
              </div>
              <div style={{fontSize:13, opacity:.9, marginTop:6}}>
                8 events · 53 gjester møtt
              </div>

              {/* Neste utbetaling */}
              <div style={{marginTop:18, padding:'12px 14px', borderRadius:14, background:'rgba(255,255,255,.14)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', gap:10}}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <rect x="2" y="4" width="14" height="11" rx="2" fill="none" stroke="#fff" strokeWidth="1.4"/>
                  <path d="M2 8h14" stroke="#fff" strokeWidth="1.4"/>
                  <circle cx="5" cy="11.5" r="1" fill="#fff"/>
                </svg>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:11, opacity:.82, fontWeight:600}}>Neste utbetaling</div>
                  <div style={{fontSize:13.5, fontWeight:700, marginTop:1}}>15. mai · Vipps 92 14 XX XX</div>
                </div>
                <svg width="10" height="14" viewBox="0 0 10 14">
                  <path d="M2 2l6 5-6 5" stroke="rgba(255,255,255,.75)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 6-mnd balkekart */}
        <div style={{padding:'26px 22px 0'}}>
          <A_SectionLabel>Siste 6 måneder</A_SectionLabel>
          <div style={{background:HC.card, borderRadius:16, padding:'18px 16px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            <div style={{display:'flex', alignItems:'flex-end', gap:8, height:120, padding:'0 4px'}}>
              {months.map((m, i) => {
                const h = Math.round((m.v / maxV) * 96) + 8;
                return (
                  <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
                    <div style={{fontSize:10.5, fontWeight:700, color: m.current ? HC.plum : HC.fgDim}}>
                      {m.v.toLocaleString('nb-NO')}
                    </div>
                    <div style={{
                      width:'100%', height:h, borderRadius:'6px 6px 3px 3px',
                      background: m.current
                        ? `linear-gradient(180deg, ${HC.coral} 0%, ${HC.plum} 100%)`
                        : `${HC.plum}22`,
                    }}/>
                  </div>
                );
              })}
            </div>
            <div style={{display:'flex', gap:8, marginTop:8, padding:'0 4px'}}>
              {months.map((m, i) => (
                <div key={i} style={{flex:1, textAlign:'center', fontSize:10.5, fontWeight:600, color: m.current ? HC.plum : HC.fgFaint, textTransform:'uppercase', letterSpacing:'.06em'}}>
                  {m.m}
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${HC.divider}`, marginTop:14, paddingTop:12, display:'flex', justifyContent:'space-between', fontSize:12}}>
              <span style={{color:HC.fgDim}}>Snitt 6 mnd</span>
              <span style={{color:HC.fg, fontWeight:700}}>2 226 kr / mnd</span>
            </div>
          </div>
        </div>

        {/* Skatt-påminnelse — tidlig og tydelig */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.cream, border:`1px solid ${HC.divider}`,
            borderRadius:16, padding:'16px 16px 14px',
          }}>
            <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                background:`${HC.amber}22`, display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9 1.5L16.5 15.5H1.5z" fill="none" stroke={HC.amber} strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 6v4.5" stroke={HC.amber} strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="9" cy="13" r=".9" fill={HC.amber}/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, lineHeight:1.35}}>
                  Dette er næringsinntekt
                </div>
                <p style={{margin:'4px 0 0', fontSize:12.5, color:HC.fgDim, lineHeight:1.55}}>
                  Vi sender A-melding til Skatteetaten automatisk hver måned. Du trenger ikke gjøre noe selv — men det lønner seg å vite hvor mye skatt som kommer.
                </p>
                <button style={{
                  marginTop:10, padding:'8px 14px', borderRadius:18, border:'none',
                  background:HC.card, color:HC.plum, fontSize:12, fontWeight:700, cursor:'pointer',
                  boxShadow:'0 1px 3px rgba(42,33,52,.06)',
                  display:'inline-flex', alignItems:'center', gap:6,
                }}>
                  Les skatte-guiden
                  <svg width="9" height="12" viewBox="0 0 9 12"><path d="M2 2l5 4-5 4" stroke={HC.plum} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Event-liste */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <A_SectionLabel>April · 8 events</A_SectionLabel>
            <button style={{background:'transparent', border:'none', fontSize:12, color:HC.fgDim, fontWeight:600, cursor:'pointer', padding:0}}>
              Eksporter CSV
            </button>
          </div>

          <div style={{background:HC.card, borderRadius:16, padding:'2px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {events.map((e, i) => {
              const sc = statusColor(e.status);
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'14px 0',
                  borderBottom: i < events.length - 1 ? `1px solid ${HC.divider}` : 'none',
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:12, flexShrink:0,
                    background:`${HC.plum}12`, color:HC.plum,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontWeight:700, lineHeight:1.15, letterSpacing:'.04em', textTransform:'uppercase',
                  }}>
                    <span>{e.date.split('.')[0]}</span>
                    <span style={{fontSize:9, opacity:.75, marginTop:1}}>apr</span>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:HC.fg, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                      {e.title}
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:8, marginTop:3}}>
                      <span style={{
                        display:'inline-block', padding:'2px 8px', borderRadius:10,
                        background:sc.bg, color:sc.fg, fontSize:10, fontWeight:700, letterSpacing:'.04em',
                      }}>
                        {e.status}
                      </span>
                      <span style={{fontSize:11, color:HC.fgDim}}>
                        {e.note || `${e.guests} gjester`}
                      </span>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{
                      fontSize:13.5, fontWeight:700,
                      color: e.status === 'Refundert' ? HC.fgFaint : HC.fg,
                      textDecoration: e.status === 'Refundert' ? 'line-through' : 'none',
                    }}>
                      {e.sum} kr
                    </div>
                    <div style={{fontSize:10.5, color:HC.fgDim, marginTop:1}}>
                      30% andel
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transparens-footer */}
        <div style={{padding:'20px 22px 0', textAlign:'center'}}>
          <p style={{margin:0, fontSize:11.5, color:HC.fgDim, lineHeight:1.55, maxWidth:320, marginInline:'auto'}}>
            Du tjener 30% av hver billett. Speedfriending tar 15% til drift. 55% går til venue.
            <br/>
            <button style={{background:'transparent', border:'none', color:HC.plum, fontSize:11.5, fontWeight:700, padding:0, cursor:'pointer', marginTop:6}}>
              Se full økonomi-oppdeling
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2. KRISEHÅNDTERING — Martine trenger hjelp NÅ
// ════════════════════════════════════════════════════════════════════════════

function ScreenAmbCrisis() {
  const [selected, setSelected] = React.useState(null); // null | 'guest' | 'venue' | 'medical' | 'cancel'

  const options = [
    {
      id: 'guest',
      tint: HC.coral,
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="8" r="4" fill="none" stroke={HC.coral} strokeWidth="1.6"/>
          <path d="M3 19c0-3.5 4-5.5 8-5.5s8 2 8 5.5" fill="none" stroke={HC.coral} strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="17" cy="6" r="4" fill={HC.coral}/>
          <path d="M17 4v2.5M17 7.8v.1" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Deltaker oppfører seg upassende',
      sub: 'Trakassering, aggresjon, full — vi ringer deg',
    },
    {
      id: 'venue',
      tint: HC.amber,
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M3 19h16" stroke={HC.amber} strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M5 19V9l6-5 6 5v10" fill="none" stroke={HC.amber} strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M9 19v-5h4v5" fill="none" stroke={HC.amber} strokeWidth="1.6"/>
        </svg>
      ),
      title: 'Venue-problem',
      sub: 'Stengt, ingen plass, dobbeltbooking',
    },
    {
      id: 'medical',
      tint: '#C43A3A',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="9" fill="none" stroke="#C43A3A" strokeWidth="1.6"/>
          <path d="M11 6v10M6 11h10" stroke="#C43A3A" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Medisinsk nødsituasjon',
      sub: 'Noen er skadet eller syk — 112 først',
    },
    {
      id: 'cancel',
      tint: HC.plum,
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="9" fill="none" stroke={HC.plum} strokeWidth="1.6"/>
          <path d="M7 7l8 8M15 7l-8 8" stroke={HC.plum} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Jeg klarer ikke kvelden — må avlyse',
      sub: 'Vi refunderer gjestene automatisk',
    },
  ];

  const renderFlow = () => {
    if (selected === 'guest') {
      return (
        <FlowCall
          tint={HC.coral}
          heading="Vi tar samtalen nå"
          body="Ikke konfronter alene. Ring oss — vi snakker med deg gjennom det, og kan kontakte politi om det eskalerer. Speedfriending dekker alt ansvar."
          phone="+47 22 00 00 00"
          phoneLabel="Speedfriending krise-team · 24/7"
          secondary={{ label:'Send anonymisert rapport etter kvelden', detail:'Vi fjerner deltakeren fra alle events. Ingen skam på deg.' }}
          onBack={() => setSelected(null)}
        />
      );
    }
    if (selected === 'venue') {
      return (
        <FlowCall
          tint={HC.amber}
          heading="Vi finner en løsning"
          body="Vi har back-up-venues i alle byer. Ring, så varsler vi gjestene via app mens du går til nytt sted."
          phone="+47 22 00 00 00"
          phoneLabel="Speedfriending drift · 24/7"
          secondary={{
            label:'Send alle gjester ny adresse nå',
            detail:'Push + SMS sendes med ETT trykk. Du velger venue fra liste.',
            action:'Velg back-up-venue',
          }}
          onBack={() => setSelected(null)}
        />
      );
    }
    if (selected === 'medical') {
      return (
        <FlowMedical onBack={() => setSelected(null)}/>
      );
    }
    if (selected === 'cancel') {
      return (
        <FlowCancel onBack={() => setSelected(null)}/>
      );
    }
    return null;
  };

  if (selected) {
    return (
      <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
        <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
          {renderFlow()}
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <A_Header
          eyebrow="Ambassadør · Hjelp"
          title="Hva skjer?"
          subtitle="Vi er her nå. Velg det som beskriver situasjonen — du trenger ikke forklare det perfekt."
        />

        <div style={{padding:'28px 22px 0', display:'flex', flexDirection:'column', gap:12}}>
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                background:HC.card, border:`1px solid ${HC.divider}`,
                borderRadius:16, padding:'16px 16px',
                display:'flex', alignItems:'center', gap:14,
                cursor:'pointer', textAlign:'left',
                boxShadow:'0 1px 8px rgba(42,33,52,.04)',
                width:'100%',
              }}
            >
              <div style={{
                width:48, height:48, borderRadius:14, flexShrink:0,
                background:`${opt.tint}15`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {opt.icon}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:700, color:HC.fg, lineHeight:1.3}}>{opt.title}</div>
                <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.4}}>{opt.sub}</div>
              </div>
              <A_Chevron/>
            </button>
          ))}
        </div>

        {/* Prinsipp-fot */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, display:'flex', gap:10, alignItems:'flex-start'}}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{flexShrink:0, marginTop:1}}>
              <circle cx="9" cy="9" r="7" fill="none" stroke={HC.plum} strokeWidth="1.4"/>
              <path d="M9 5.5V9l2.5 2" stroke={HC.plum} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <div>
              <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, lineHeight:1.35}}>Du får alltid et menneske</div>
              <p style={{margin:'2px 0 0', fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
                Ingen chat-bot. Ingen "send inn skjema og vent". En person tar telefonen innen 30 sekunder — døgnet rundt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Krise-flow: direkte telefonsamtale
function FlowCall({ tint, heading, body, phone, phoneLabel, secondary, onBack }) {
  return (
    <>
      <A_Header eyebrow="Krise-team" title={heading} subtitle={body}/>

      <div style={{padding:'28px 22px 0'}}>
        <a href={`tel:${phone.replace(/\s/g,'')}`} style={{textDecoration:'none'}}>
          <div style={{
            background:`linear-gradient(135deg, ${tint} 0%, ${HC.plumDeep} 100%)`,
            borderRadius:22, padding:'22px 22px', color:'#fff',
            boxShadow:`0 14px 28px ${tint}40`,
            display:'flex', alignItems:'center', gap:16,
          }}>
            <div style={{
              width:64, height:64, borderRadius:32, background:'rgba(255,255,255,.22)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path d="M8 4c1 0 2 1 2.5 3s1 3 .5 4-2 2-2 3 2 4 4 6 5 2.5 6 2.5 2-1 3-2 2-.5 4 .5 3 1.5 3 2.5-2 4-5 4c-4 0-9-2-13-6S4 11 4 7s3-3 4-3z"
                  fill="#fff"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', opacity:.88, textTransform:'uppercase'}}>Trykk for å ringe</div>
              <div style={{fontSize:22, fontWeight:700, marginTop:4, letterSpacing:'-0.01em'}}>{phone}</div>
              <div style={{fontSize:12, opacity:.88, marginTop:3}}>{phoneLabel}</div>
            </div>
          </div>
        </a>
      </div>

      {secondary && (
        <div style={{padding:'22px 22px 0'}}>
          <A_SectionLabel>Eller</A_SectionLabel>
          <button style={{
            width:'100%', background:HC.card, border:`1px solid ${HC.divider}`,
            borderRadius:16, padding:'16px 16px', cursor:'pointer', textAlign:'left',
            display:'flex', alignItems:'center', gap:14,
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
          }}>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, lineHeight:1.35}}>
                {secondary.action || secondary.label}
              </div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>
                {secondary.detail}
              </div>
            </div>
            <A_Chevron/>
          </button>
        </div>
      )}

      <div style={{padding:'22px 22px 0'}}>
        <button onClick={onBack} style={{
          background:'transparent', border:'none', color:HC.fgDim,
          fontSize:13, fontWeight:600, cursor:'pointer', padding:8,
        }}>
          ← Tilbake til valg
        </button>
      </div>
    </>
  );
}

// Krise-flow: medisinsk
function FlowMedical({ onBack }) {
  return (
    <>
      <A_Header
        eyebrow="Medisinsk"
        title="Ring 112 først"
        subtitle="Ikke vent på oss. Hjelp først, så varsler vi og støtter deg etterpå."
      />

      <div style={{padding:'28px 22px 0'}}>
        <a href="tel:112" style={{textDecoration:'none'}}>
          <div style={{
            background:'linear-gradient(135deg, #C43A3A 0%, #7A1E1E 100%)',
            borderRadius:22, padding:'26px 22px', color:'#fff',
            boxShadow:'0 14px 32px rgba(196,58,58,.45)',
            display:'flex', alignItems:'center', gap:16,
          }}>
            <div style={{
              width:72, height:72, borderRadius:36, background:'rgba(255,255,255,.22)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <span style={{fontSize:26, fontWeight:700, letterSpacing:'-.02em'}}>112</span>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', opacity:.88, textTransform:'uppercase'}}>Trykk for å ringe</div>
              <div style={{fontSize:20, fontWeight:700, marginTop:4, letterSpacing:'-0.01em'}}>Nødetatene</div>
              <div style={{fontSize:12, opacity:.88, marginTop:3}}>Ambulanse · brann · politi</div>
            </div>
          </div>
        </a>
      </div>

      <div style={{padding:'22px 22px 0'}}>
        <A_SectionLabel>Mens du venter</A_SectionLabel>
        <div style={{background:HC.card, borderRadius:16, padding:'6px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
          {[
            { t:'Hold plass — ikke flytt personen uten å måtte', b:'Med mindre det er brann eller umiddelbar fare' },
            { t:'Si klart hvor du er', b:'Venue-adresse står øverst i appen' },
            { t:'Vi varsler pårørende etter din beskjed', b:'Aldri uten ditt samtykke' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              padding:'14px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
              display:'flex', gap:12, alignItems:'flex-start',
            }}>
              <div style={{
                width:24, height:24, borderRadius:12, background:`${HC.green}20`,
                color:HC.green, fontSize:12, fontWeight:700, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.35}}>{item.t}</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{item.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'22px 22px 0'}}>
        <a href="tel:+4722000000" style={{textDecoration:'none', display:'block'}}>
          <div style={{
            background:HC.card, border:`1px solid ${HC.divider}`,
            borderRadius:16, padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
          }}>
            <div style={{
              width:40, height:40, borderRadius:20, background:`${HC.plum}15`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M5 3c1 0 1 1 1.3 2s.6 1.5.3 2-1 1-1 1.5 1 2.5 2.5 4 3 1.5 3.5 1.5 1-.5 1.5-1 1-.5 2 .2 1.5 1 1.5 1.5-1 2.3-3 2.3c-3 0-6-1.5-8.5-4S3 7 3 5s2-2 2-2z" fill={HC.plum}/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Etter 112 — ring oss</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>Speedfriending krise-team · 24/7</div>
            </div>
            <A_Chevron/>
          </div>
        </a>
      </div>

      <div style={{padding:'22px 22px 0'}}>
        <button onClick={onBack} style={{
          background:'transparent', border:'none', color:HC.fgDim,
          fontSize:13, fontWeight:600, cursor:'pointer', padding:8,
        }}>
          ← Tilbake til valg
        </button>
      </div>
    </>
  );
}

// Krise-flow: avlyse kvelden
function FlowCancel({ onBack }) {
  const [confirmed, setConfirmed] = React.useState(false);

  if (confirmed) {
    return (
      <>
        <A_Header
          eyebrow="Ferdig"
          title="Vi tar det herfra."
          subtitle="Du gjorde det rette. Ingen skam, ingen konsekvens for deg."
        />
        <div style={{padding:'28px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.green} 0%, #2A6647 100%)`,
            borderRadius:20, padding:'22px 22px', color:'#fff',
            boxShadow:`0 12px 24px ${HC.green}35`,
          }}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', opacity:.88, textTransform:'uppercase'}}>Bekreftet · 14:23</div>
            <div style={{fontSize:18, fontWeight:700, marginTop:8, lineHeight:1.35}}>Vinsmaking kl 19:00 er avlyst</div>
            <div style={{fontSize:13, opacity:.92, marginTop:8, lineHeight:1.5}}>
              6 gjester får push og SMS nå. Full refusjon på Vipps innen 2 timer. Venue er varslet.
            </div>
          </div>
        </div>

        <div style={{padding:'22px 22px 0'}}>
          <A_SectionLabel>Vi ringer deg i morgen</A_SectionLabel>
          <div style={{background:HC.card, borderRadius:16, padding:'14px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)', display:'flex', gap:12, alignItems:'flex-start'}}>
            <div style={{
              width:36, height:36, borderRadius:18, flexShrink:0,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontSize:13, fontWeight:700,
            }}>V</div>
            <div>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Viktor · grunnlegger</div>
              <p style={{margin:'2px 0 0', fontSize:12, color:HC.fgDim, lineHeight:1.5}}>
                Ikke for å sjekke deg — bare for å spørre hvordan du har det, og se om noe hos oss må endres.
              </p>
            </div>
          </div>
        </div>

        <div style={{padding:'22px 22px 0'}}>
          <button onClick={onBack} style={{
            background:'transparent', border:'none', color:HC.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer', padding:8,
          }}>
            ← Tilbake
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <A_Header
        eyebrow="Avlys kvelden"
        title="Det er ok. Det skjer."
        subtitle="Du får ikke en bot, og det påvirker ikke ambassadør-statusen din. Vi mister alle kvelden av og til."
      />

      <div style={{padding:'24px 22px 0'}}>
        <div style={{background:HC.card, borderRadius:16, padding:'18px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
          <div style={{fontSize:12, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:HC.fgDim}}>
            Hvis du bekrefter
          </div>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:12}}>
            {[
              { n:'1', t:'Alle 6 gjester får push + SMS', d:'De ser et varmt budskap fra Speedfriending — ikke fra deg' },
              { n:'2', t:'Full refusjon via Vipps automatisk', d:'Vi dekker kostnaden. Du taper ikke provisjonen din' },
              { n:'3', t:'Vi varsler venue', d:'Du trenger ikke ringe Søstrene Karlsen' },
              { n:'4', t:'Ingen rating-skade', d:'Avlysninger under 10% per år påvirker ingenting' },
            ].map(s => (
              <div key={s.n} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                <div style={{
                  width:22, height:22, borderRadius:11, flexShrink:0,
                  background:`${HC.plum}15`, color:HC.plum,
                  fontSize:11, fontWeight:700,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {s.n}
                </div>
                <div>
                  <div style={{fontSize:13, fontWeight:600, color:HC.fg, lineHeight:1.35}}>{s.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:'22px 22px 0'}}>
        <button
          onClick={() => setConfirmed(true)}
          style={{
            width:'100%', padding:'16px', borderRadius:16, border:'none',
            background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
            color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
            boxShadow:`0 10px 24px ${HC.coral}35`,
          }}
        >
          Avlys kvelden nå
        </button>
        <button
          onClick={onBack}
          style={{
            width:'100%', marginTop:10, padding:'14px',
            borderRadius:16, border:`1px solid ${HC.divider}`,
            background:'transparent', color:HC.fg,
            fontSize:13.5, fontWeight:600, cursor:'pointer',
          }}
        >
          Nei, jeg klarer det
        </button>
      </div>

      <div style={{padding:'20px 22px 0', textAlign:'center'}}>
        <button style={{
          background:'transparent', border:'none', color:HC.plum,
          fontSize:12.5, fontWeight:700, cursor:'pointer',
        }}>
          Usikker? Ring oss først →
        </button>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3. AMBASSADØR-RESSURSER — "biblioteket mitt"
// ════════════════════════════════════════════════════════════════════════════

function ScreenAmbResources() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <A_Header
          eyebrow="Ambassadør"
          title="Biblioteket mitt"
          subtitle="Ting jeg kan hente frem når jeg trenger det. Ikke en FAQ — mer som en hylle."
        />

        {/* Neste ambassadør-samling — varm innstigning */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.coralDeep} 100%)`,
            borderRadius:20, padding:'20px 22px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.coral}30`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-50, bottom:-50, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', opacity:.88, textTransform:'uppercase'}}>
                Neste samling · Torsdag 25. april · 20:00
              </div>
              <h2 style={{margin:'8px 0 0', fontSize:20, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.25}}>
                "Når stemningen ikke sitter — hva gjør du?"
              </h2>
              <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.5, opacity:.95}}>
                Online · 45 min · Viktor + 12 andre ambassadører deler erfaringer.
              </p>
              <button style={{
                marginTop:14, padding:'9px 18px', borderRadius:22, border:'none',
                background:'rgba(255,255,255,.95)', color:HC.coralDeep,
                fontSize:13, fontWeight:700, cursor:'pointer',
              }}>
                Meld på — Zoom-link sendes
              </button>
            </div>
          </div>
        </div>

        {/* Hylle 1 — Håndtering av vanskelige situasjoner */}
        <div style={{padding:'28px 22px 0'}}>
          <A_SectionLabel>Håndtering av vanskelige situasjoner</A_SectionLabel>
          <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6, marginLeft:-2, marginRight:-22, paddingLeft:2, paddingRight:22}}>
            {[
              { title:'Når noen drikker for mye', meta:'4 min · lest av deg', tint:HC.amber, read:true },
              { title:'Når to gjester har en konflikt', meta:'6 min', tint:HC.coral, read:false },
              { title:'Når en gjest føler seg utenfor', meta:'3 min · lest av deg', tint:HC.plum, read:true },
              { title:'Når venue plutselig stenger', meta:'5 min', tint:HC.green, read:false },
              { title:'Når du selv har en dårlig dag', meta:'7 min', tint:HC.lilac, read:false },
            ].map((c, i) => (
              <div key={i} style={{
                flexShrink:0, width:180, padding:'16px 14px 14px', borderRadius:14,
                background:HC.card, border:`1px solid ${HC.divider}`,
                boxShadow:'0 1px 4px rgba(42,33,52,.03)',
                display:'flex', flexDirection:'column', gap:10, minHeight:148,
              }}>
                <div style={{
                  width:36, height:36, borderRadius:10,
                  background:`${c.tint}18`, color:c.tint,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <rect x="3" y="2" width="12" height="14" rx="1.5" fill="none" stroke={c.tint} strokeWidth="1.4"/>
                    <path d="M6 6h6M6 9h6M6 12h4" stroke={c.tint} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>{c.title}</div>
                  <div style={{fontSize:11, color: c.read ? HC.green : HC.fgDim, marginTop:4, display:'flex', alignItems:'center', gap:4}}>
                    {c.read && (
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke={HC.green} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {c.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hylle 2 — Priya Parker */}
        <div style={{padding:'26px 22px 0'}}>
          <A_SectionLabel>Samtale-teknikker fra Priya Parker</A_SectionLabel>
          <div style={{background:HC.card, borderRadius:16, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { t:'Starten setter hele kvelden', d:'De første 3 minuttene avgjør om folk tør å være ærlige', dur:'8 min' },
              { t:'"Sterk ramme, myk tone"', d:'Priyas hovedprinsipp — hvordan du kan bruke det', dur:'6 min' },
              { t:'Avslutning er et ritual', d:'Ikke la kvelden "bare ebbe ut" — marker overgangen', dur:'5 min' },
              { t:'Aksept-taler og temaer', d:'Når et tema gir bedre samtaler enn "få folk til å mingle"', dur:'9 min' },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:18, flexShrink:0,
                  background:`${HC.plum}12`, color:HC.plum,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <polygon points="3,2 11,7 3,12" fill={HC.plum}/>
                  </svg>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>{item.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>{item.d}</div>
                </div>
                <div style={{fontSize:11, color:HC.fgDim, fontWeight:600, flexShrink:0}}>{item.dur}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hylle 3 — Peer chat */}
        <div style={{padding:'26px 22px 0'}}>
          <A_SectionLabel>Ambassadør-chat</A_SectionLabel>
          <div style={{background:HC.card, borderRadius:16, padding:'16px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            <div style={{display:'flex', alignItems:'center', gap:-8, marginBottom:12}}>
              {[
                { bg:'linear-gradient(135deg,#E8B8A0,#B5694A)', i:'S' },
                { bg:'linear-gradient(135deg,#7895C4,#2E4A75)', i:'J' },
                { bg:'linear-gradient(135deg,#B890D4,#6A3F8A)', i:'A' },
                { bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)', i:'M' },
                { bg:'linear-gradient(135deg,#90BFA0,#3E7F5E)', i:'L' },
              ].map((p, i) => (
                <div key={i} style={{
                  width:32, height:32, borderRadius:16, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#FFF3E0', fontSize:12, fontWeight:700,
                  border:`2px solid ${HC.card}`, marginLeft: i > 0 ? -10 : 0,
                }}>{p.i}</div>
              ))}
              <div style={{marginLeft:12, fontSize:12, color:HC.fgDim}}>+ 32 andre aktive nå</div>
            </div>

            <div style={{
              background:HC.cream, borderRadius:12, padding:'12px 14px', marginTop:4,
              borderLeft:`3px solid ${HC.lilac}`,
            }}>
              <div style={{fontSize:11.5, fontWeight:700, color:HC.plum}}>Sigrid, Bergen · for 12 min siden</div>
              <div style={{fontSize:12.5, color:HC.fg, marginTop:4, lineHeight:1.5}}>
                "Noen som har prøvd å starte kvelden med ett spørsmål istedenfor navn-runde? Gjorde det i går og det var magisk."
              </div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:6, display:'flex', gap:12}}>
                <span>💬 8 svar</span>
                <span>↗ Del din erfaring</span>
              </div>
            </div>

            <button style={{
              width:'100%', marginTop:12, padding:'11px', borderRadius:12,
              background:'transparent', border:`1px solid ${HC.divider}`,
              color:HC.plum, fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Åpne ambassadør-chat →
            </button>

            <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:10, textAlign:'center', lineHeight:1.5}}>
              Dette er ikke et support-forum. Det er kolleger som deler. Ingen leaderboards, ingen rangering.
            </div>
          </div>
        </div>

        {/* Hylle 4 — Direktelinje til grunnlegger */}
        <div style={{padding:'26px 22px 0'}}>
          <A_SectionLabel>Direktelinje</A_SectionLabel>
          <div style={{
            background:HC.card, borderRadius:16, padding:'18px 18px',
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:52, height:52, borderRadius:26, flexShrink:0,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontSize:18, fontWeight:700,
            }}>V</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg}}>Viktor</div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
                Grunnlegger. Svarer innen 24 t. Ikke om billing eller teknisk — om alt annet.
              </div>
            </div>
            <button style={{
              background:`${HC.plum}12`, border:'none', borderRadius:10,
              padding:'10px 12px', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M2 4.5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-3 3v-3H4a2 2 0 01-2-2v-7z" fill="none" stroke={HC.plum} strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Prinsipp-fot */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            padding:'16px 18px', borderRadius:14,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, lineHeight:1.35}}>Dette er støtte, ikke overvåkning</div>
            <p style={{margin:'4px 0 0', fontSize:11.5, color:HC.fgDim, lineHeight:1.55}}>
              Ingen scorer, ingen leaderboards, ingen sammenligning med andre ambassadører. Vi bryr oss om at du har det bra — ikke om du slår Sigrid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Export
// ────────────────────────────────────────────────────────────────────────────

window.H_ScreenAmbPayout = ScreenAmbPayout;
window.H_ScreenAmbCrisis = ScreenAmbCrisis;
window.H_ScreenAmbResources = ScreenAmbResources;
