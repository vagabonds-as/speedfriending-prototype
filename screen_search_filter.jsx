/* global React, HC, H_StatusBarLight */
// Search + Filter — rolige, nøkterne skjermer for Events-tab.
// Prinsipp: vi manipulerer ikke søket. Resultater vises flatt, uten fremheving
// uten grunn. Filter viser antall treff direkte — ikke "Bruk filter".

// =====================================================================
//  SØK — inngang fra Events-tab. Tomt felt viser forslag; input gir treff.
// =====================================================================
function ScreenSearch() {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  // Mock-data: populate bare hvis det finnes faktiske matches
  const allEvents = [
    { id:'e1', title:'Padel-kveld på Nidarø', venue:'Nidarø padelbane', date:'Tor 24. apr · 19:00', tint:HC.green },
    { id:'e2', title:'Vinsmaking med Kari', venue:'Søstrene Karlsen',    date:'Fre 25. apr · 19:30', tint:HC.coral },
    { id:'e3', title:'Brettspill på Trekroneren', venue:'Trekroneren',    date:'Lør 26. apr · 18:00', tint:HC.plum },
    { id:'e4', title:'Fjelltur fra Skistua',  venue:'Bymarka',            date:'Søn 27. apr · 10:00', tint:HC.green },
  ];
  const allPeople = [
    { id:'p1', name:'Kari Solheim',  note:'Møttes på Vinkvelden · 18. apr', initial:'K', hue:20 },
    { id:'p2', name:'Erik Nordby',   note:'Møttes på Padel-kveld · 10. apr', initial:'E', hue:140 },
    { id:'p3', name:'Anja Berge',    note:'Møttes på Jazzklubb · 4. apr', initial:'A', hue:270 },
    { id:'p4', name:'Karina Lund',   note:'I crewet til Martine',           initial:'K', hue:340 },
  ];
  const allVenues = [
    { id:'v1', name:'Territoriet',   sub:'Vinbar · Solsiden',      count:'12 kvelder' },
    { id:'v2', name:'Mathallen',     sub:'Mat og smak · Midtbyen', count:'9 kvelder'  },
    { id:'v3', name:'Trekroneren',   sub:'Brettspill · Fjordgata', count:'7 kvelder'  },
    { id:'v4', name:'Grünerløkka',   sub:'Område · Oslo',          count:'21 kvelder' },
  ];
  const allHosts = [
    { id:'h1', name:'Martine L.',    role:'Vertinne · Vin & naturvin',  initial:'M', hue:350 },
    { id:'h2', name:'Henrik A.',     role:'Vert · Brettspill',          initial:'H', hue:60  },
    { id:'h3', name:'Ingrid R.',     role:'Vertinne · Fjelltur',        initial:'I', hue:160 },
  ];

  const qLower = q.trim().toLowerCase();
  const has = (s) => s.toLowerCase().includes(qLower);
  const eventHits = qLower ? allEvents.filter(e => has(e.title) || has(e.venue)) : [];
  const peopleHits = qLower ? allPeople.filter(p => has(p.name) || has(p.note)) : [];
  const venueHits = qLower ? allVenues.filter(v => has(v.name) || has(v.sub)) : [];
  const hostHits = qLower ? allHosts.filter(h => has(h.name) || has(h.role)) : [];
  const totalHits = eventHits.length + peopleHits.length + venueHits.length + hostHits.length;

  const recent = ['padel', 'Kari', 'Grünerløkka'];
  const popularVenues = allVenues.slice(0, 3);
  const suggestedPeople = allPeople.slice(0, 3);

  React.useEffect(() => {
    // Auto-fokus inputfelt for naturlig tastatur-flyt
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="14:31"/>

        {/* Søkelinje + Avbryt */}
        <div style={{padding:'14px 18px 0', display:'flex', alignItems:'center', gap:12}}>
          <div style={{
            flex:1, display:'flex', alignItems:'center', gap:10,
            padding:'10px 14px', borderRadius:14, background:HC.card,
            boxShadow:'0 2px 8px rgba(42,33,52,.05)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" fill="none" stroke={HC.fgDim} strokeWidth="1.6"/>
              <path d="M11 11l3.5 3.5" stroke={HC.fgDim} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Søk events, personer, venuer"
              style={{
                flex:1, border:'none', outline:'none', background:'transparent',
                fontSize:15, color:HC.fg, fontFamily:'inherit',
                letterSpacing:'-0.01em',
              }}
            />
            {q && (
              <button
                onClick={()=>setQ('')}
                aria-label="Tøm søkefeltet"
                style={{
                  width:20, height:20, borderRadius:10, border:'none',
                  background:HC.fgFaint, cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M1 1l6 6M7 1l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
          <button style={{
            border:'none', background:'transparent', cursor:'pointer',
            fontSize:14, color:HC.plum, fontWeight:600, fontFamily:'inherit',
            padding:'4px 2px',
          }}>Avbryt</button>
        </div>

        {/* Sveip-indikator (antyder at søk kan avvises) */}
        <div style={{height:4, display:'flex', justifyContent:'center', marginTop:10}}>
          <div style={{width:42, height:4, borderRadius:2, background:HC.fgFaint, opacity:.35}}/>
        </div>

        {/* Tom tilstand: forslag */}
        {!q && (
          <div style={{padding:'18px 22px 30px'}}>
            {/* Nylige søk */}
            <SS_Section label="Nylige søk">
              <div style={{display:'flex', flexDirection:'column'}}>
                {recent.map((term, i) => (
                  <button key={term} onClick={()=>setQ(term)} style={{
                    border:'none', background:'transparent', cursor:'pointer',
                    padding:'12px 2px',
                    borderBottom: i < recent.length-1 ? `1px solid ${HC.divider}` : 'none',
                    display:'flex', alignItems:'center', gap:12, textAlign:'left',
                    fontFamily:'inherit',
                  }}>
                    <div style={{width:30, height:30, borderRadius:15, background:`${HC.plum}12`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="13" height="13" viewBox="0 0 13 13">
                        <circle cx="6.5" cy="6.5" r="5" fill="none" stroke={HC.plum} strokeWidth="1.3"/>
                        <path d="M6.5 4v2.8l1.8 1" stroke={HC.plum} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span style={{flex:1, fontSize:14, color:HC.fg, fontWeight:500}}>{term}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M3 8l5-5M3 3h5v5" stroke={HC.fgFaint} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </SS_Section>

            {/* Populære venuer */}
            <SS_Section label="Populære venuer" style={{marginTop:24}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                {popularVenues.map((v, i) => (
                  <button key={v.id} onClick={()=>setQ(v.name)} style={{
                    border:'none', background:'transparent', cursor:'pointer',
                    padding:'12px 2px',
                    borderBottom: i < popularVenues.length-1 ? `1px solid ${HC.divider}` : 'none',
                    display:'flex', alignItems:'center', gap:12, textAlign:'left',
                    fontFamily:'inherit',
                  }}>
                    <div style={{width:36, height:36, borderRadius:10, background:`${HC.coral}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 1l6 4v9H2V5l6-4z" fill="none" stroke={HC.coral} strokeWidth="1.4" strokeLinejoin="round"/>
                        <rect x="6" y="8" width="4" height="6" fill="none" stroke={HC.coral} strokeWidth="1.4"/>
                      </svg>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13.5, fontWeight:600, color:HC.fg, letterSpacing:'-0.01em'}}>{v.name}</div>
                      <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{v.sub} · {v.count}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SS_Section>

            {/* Foreslåtte personer */}
            <SS_Section label="Foreslåtte personer" style={{marginTop:24}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                {suggestedPeople.map((p, i) => (
                  <button key={p.id} onClick={()=>setQ(p.name.split(' ')[0])} style={{
                    border:'none', background:'transparent', cursor:'pointer',
                    padding:'12px 2px',
                    borderBottom: i < suggestedPeople.length-1 ? `1px solid ${HC.divider}` : 'none',
                    display:'flex', alignItems:'center', gap:12, textAlign:'left',
                    fontFamily:'inherit',
                  }}>
                    <SS_Avatar initial={p.initial} hue={p.hue}/>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13.5, fontWeight:600, color:HC.fg, letterSpacing:'-0.01em'}}>{p.name}</div>
                      <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{p.note}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SS_Section>
          </div>
        )}

        {/* Resultater */}
        {q && (
          <div style={{padding:'18px 22px 30px'}}>
            {totalHits === 0 ? (
              <div style={{padding:'48px 12px 0', textAlign:'center'}}>
                <div style={{fontSize:14, color:HC.fg, fontWeight:600}}>Ingen treff på "{q}"</div>
                <div style={{fontSize:12, color:HC.fgDim, marginTop:6, lineHeight:1.5}}>
                  Prøv et annet ord, eller bla i Events-feeden.
                </div>
              </div>
            ) : (
              <>
                {eventHits.length > 0 && (
                  <SS_Section label={`Events · ${eventHits.length}`}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      {eventHits.map((e, i) => (
                        <div key={e.id} style={{
                          padding:'12px 2px',
                          borderBottom: i < eventHits.length-1 ? `1px solid ${HC.divider}` : 'none',
                          display:'flex', alignItems:'center', gap:12,
                        }}>
                          <div style={{width:36, height:36, borderRadius:10, background:`${e.tint}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                              <rect x="2" y="4" width="12" height="10" rx="1.5" fill="none" stroke={e.tint} strokeWidth="1.4"/>
                              <path d="M5 2v3M11 2v3M2 8h12" stroke={e.tint} strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <div style={{flex:1, minWidth:0}}>
                            <SS_Highlight text={e.title} q={q}/>
                            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{e.date} · {e.venue}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SS_Section>
                )}

                {peopleHits.length > 0 && (
                  <SS_Section label={`Personer · ${peopleHits.length}`} style={{marginTop: eventHits.length ? 24 : 0}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      {peopleHits.map((p, i) => (
                        <div key={p.id} style={{
                          padding:'12px 2px',
                          borderBottom: i < peopleHits.length-1 ? `1px solid ${HC.divider}` : 'none',
                          display:'flex', alignItems:'center', gap:12,
                        }}>
                          <SS_Avatar initial={p.initial} hue={p.hue}/>
                          <div style={{flex:1, minWidth:0}}>
                            <SS_Highlight text={p.name} q={q}/>
                            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{p.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SS_Section>
                )}

                {venueHits.length > 0 && (
                  <SS_Section label={`Venuer · ${venueHits.length}`} style={{marginTop: (eventHits.length || peopleHits.length) ? 24 : 0}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      {venueHits.map((v, i) => (
                        <div key={v.id} style={{
                          padding:'12px 2px',
                          borderBottom: i < venueHits.length-1 ? `1px solid ${HC.divider}` : 'none',
                          display:'flex', alignItems:'center', gap:12,
                        }}>
                          <div style={{width:36, height:36, borderRadius:10, background:`${HC.coral}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                              <path d="M8 1l6 4v9H2V5l6-4z" fill="none" stroke={HC.coral} strokeWidth="1.4" strokeLinejoin="round"/>
                              <rect x="6" y="8" width="4" height="6" fill="none" stroke={HC.coral} strokeWidth="1.4"/>
                            </svg>
                          </div>
                          <div style={{flex:1, minWidth:0}}>
                            <SS_Highlight text={v.name} q={q}/>
                            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{v.sub} · {v.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SS_Section>
                )}

                {hostHits.length > 0 && (
                  <SS_Section label={`Vertinner og verter · ${hostHits.length}`} style={{marginTop:(eventHits.length || peopleHits.length || venueHits.length) ? 24 : 0}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      {hostHits.map((h, i) => (
                        <div key={h.id} style={{
                          padding:'12px 2px',
                          borderBottom: i < hostHits.length-1 ? `1px solid ${HC.divider}` : 'none',
                          display:'flex', alignItems:'center', gap:12,
                        }}>
                          <SS_Avatar initial={h.initial} hue={h.hue}/>
                          <div style={{flex:1, minWidth:0}}>
                            <SS_Highlight text={h.name} q={q}/>
                            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{h.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SS_Section>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Liten seksjonsoverskrift (nøktern — bare en label, ingen dekor)
function SS_Section({ label, children, style }) {
  return (
    <div style={style}>
      <div style={{
        fontSize:10.5, fontWeight:700, letterSpacing:'.14em',
        textTransform:'uppercase', color:HC.fgDim,
        marginBottom:8,
      }}>{label}</div>
      {children}
    </div>
  );
}

function SS_Avatar({ initial, hue }) {
  return (
    <div style={{
      width:36, height:36, borderRadius:18,
      background:`linear-gradient(135deg, hsl(${hue} 50% 60%), hsl(${hue} 45% 42%))`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#FFF3E0', fontWeight:700, fontSize:13,
      flexShrink:0,
    }}>{initial}</div>
  );
}

// Subtil uthevning i treff — bare fet, ingen fargeskifte. Rolig.
function SS_Highlight({ text, q }) {
  const idx = text.toLowerCase().indexOf(q.trim().toLowerCase());
  if (!q || idx < 0) {
    return <div style={{fontSize:13.5, fontWeight:600, color:HC.fg, letterSpacing:'-0.01em'}}>{text}</div>;
  }
  const before = text.slice(0, idx);
  const match  = text.slice(idx, idx + q.trim().length);
  const after  = text.slice(idx + q.trim().length);
  return (
    <div style={{fontSize:13.5, fontWeight:500, color:HC.fg, letterSpacing:'-0.01em'}}>
      {before}<span style={{fontWeight:700, color:HC.plum}}>{match}</span>{after}
    </div>
  );
}

// =====================================================================
//  FILTER — full-screen sheet over Events-feed. Reset + live-CTA.
// =====================================================================
function ScreenFilter() {
  const [priceMax, setPriceMax] = React.useState(249);
  const [days, setDays] = React.useState(['Fre','Lør']);
  const [types, setTypes] = React.useState(['Brettspill','Vinsmaking']);
  const [distance, setDistance] = React.useState(15);
  const [crewOnly, setCrewOnly] = React.useState(false);
  const [soberOnly, setSoberOnly] = React.useState(false);
  const [bringFriend, setBringFriend] = React.useState(false);

  // Mocked hit-count som reagerer på valg
  const hitCount = React.useMemo(() => {
    let n = 28;
    n -= Math.floor((499 - priceMax) / 40);
    n -= (7 - days.length) * 1;
    n -= (4 - types.length) * 2;
    n -= Math.floor((30 - distance) / 4);
    if (crewOnly) n -= 6;
    if (soberOnly) n -= 4;
    if (bringFriend) n -= 3;
    return Math.max(0, n);
  }, [priceMax, days, types, distance, crewOnly, soberOnly, bringFriend]);

  const reset = () => {
    setPriceMax(499);
    setDays([]);
    setTypes([]);
    setDistance(30);
    setCrewOnly(false);
    setSoberOnly(false);
    setBringFriend(false);
  };

  const allDays = ['Man','Tir','Ons','Tor','Fre','Lør','Søn'];
  const allTypes = ['Brettspill','Vinsmaking','Fjelltur','Bokklubb','Jazz','Løpetur','Mat','Padel'];

  const toggle = (arr, setArr, v) => {
    setArr(arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]);
  };

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:33"/>

        {/* Sveip-indikator */}
        <div style={{height:4, display:'flex', justifyContent:'center', marginTop:12}}>
          <div style={{width:42, height:4, borderRadius:2, background:HC.fgFaint, opacity:.35}}/>
        </div>

        {/* Topp: tittel + lukk */}
        <div style={{padding:'16px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Filter</div>
            <h1 style={{margin:'4px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              Finn din kveld
            </h1>
          </div>
          <button aria-label="Lukk filter" style={{
            width:34, height:34, borderRadius:17, background:HC.card, border:'none',
            boxShadow:'0 2px 8px rgba(42,33,52,.06)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M2 2l8 8M10 2l-8 8" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollbart innhold */}
        <div style={{flex:1, overflowY:'auto', padding:'20px 24px 160px'}}>

          {/* Prisrange */}
          <SF_Section label="Prisrange" value={priceMax === 499 ? 'Alle priser' : `Opptil ${priceMax} kr`}>
            <SF_Slider
              min={0} max={499} step={10}
              value={priceMax}
              onChange={setPriceMax}
              leftLabel="0 kr"
              rightLabel="499 kr"
            />
          </SF_Section>

          {/* Dag-valg */}
          <SF_Section label="Dager" value={days.length === 0 ? 'Alle dager' : days.join(', ')} style={{marginTop:28}}>
            <div style={{display:'flex', gap:6, justifyContent:'space-between'}}>
              {allDays.map(d => {
                const on = days.includes(d);
                return (
                  <button key={d} onClick={()=>toggle(days, setDays, d)} style={{
                    flex:1, padding:'10px 0', borderRadius:10, border:'none',
                    background: on ? HC.plum : HC.card,
                    color: on ? '#fff' : HC.fg,
                    fontSize:12.5, fontWeight:600, cursor:'pointer',
                    boxShadow: on ? '0 2px 8px rgba(127,77,149,.2)' : '0 1px 3px rgba(42,33,52,.04)',
                    fontFamily:'inherit',
                    letterSpacing:'.01em',
                  }}>{d}</button>
                );
              })}
            </div>
          </SF_Section>

          {/* Type */}
          <SF_Section label="Type" value={types.length === 0 ? 'Alle typer' : `${types.length} valgt`} style={{marginTop:28}}>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {allTypes.map(t => {
                const on = types.includes(t);
                return (
                  <button key={t} onClick={()=>toggle(types, setTypes, t)} style={{
                    padding:'8px 14px', borderRadius:20, border:'none',
                    background: on ? HC.plum : HC.card,
                    color: on ? '#fff' : HC.fg,
                    fontSize:13, fontWeight:600, cursor:'pointer',
                    boxShadow: on ? '0 2px 8px rgba(127,77,149,.2)' : '0 1px 3px rgba(42,33,52,.04)',
                    fontFamily:'inherit',
                    display:'inline-flex', alignItems:'center', gap:6,
                  }}>
                    {on && (
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {t}
                  </button>
                );
              })}
            </div>
          </SF_Section>

          {/* Avstand */}
          <SF_Section label="Avstand" value={distance === 30 ? 'Hele byen' : `Opptil ${distance} min gange`} style={{marginTop:28}}>
            <SF_Slider
              min={0} max={30} step={1}
              value={distance}
              onChange={setDistance}
              leftLabel="0 min"
              rightLabel="30 min"
            />
          </SF_Section>

          {/* Toggles */}
          <div style={{marginTop:28, background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            <SF_Toggle
              label="Kun crew-kompatible"
              sub="Kvelder der noen i crewet ditt er med"
              on={crewOnly}
              onChange={setCrewOnly}
            />
            <SF_Toggle
              label="Kun nøktern-vennlige"
              sub="Ingen alkohol som hovedaktivitet"
              on={soberOnly}
              onChange={setSoberOnly}
              border
            />
            <SF_Toggle
              label="Med plass til å ta med venn"
              sub="Ekstra plass tilgjengelig"
              on={bringFriend}
              onChange={setBringFriend}
              border
            />
          </div>

          {/* Reset-lenke (synlig, ikke skjult) */}
          <div style={{marginTop:24, textAlign:'center'}}>
            <button onClick={reset} style={{
              border:'none', background:'transparent', cursor:'pointer',
              fontSize:13, fontWeight:600, color:HC.fgDim,
              textDecoration:'underline', textUnderlineOffset:3,
              fontFamily:'inherit', padding:'8px 16px',
            }}>Tilbakestill alle filter</button>
          </div>
        </div>

        {/* Bunn-CTA: vis antall treff direkte */}
        <div style={{
          position:'absolute', bottom:84, left:0, right:0,
          padding:'16px 22px 18px',
          background:'rgba(244,237,231,.96)', backdropFilter:'blur(20px)',
          borderTop:`1px solid ${HC.divider}`,
          display:'flex', gap:12, alignItems:'center',
        }}>
          <button onClick={reset} style={{
            padding:'14px 18px', borderRadius:28, border:`1px solid ${HC.divider}`,
            background:HC.card, color:HC.fg,
            fontSize:13, fontWeight:600, cursor:'pointer',
            fontFamily:'inherit',
          }}>Reset</button>
          <button style={{
            flex:1, padding:'14px', borderRadius:28, border:'none',
            background: hitCount === 0 ? HC.fgFaint : HC.plum,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            letterSpacing:'.01em',
            boxShadow: hitCount === 0 ? 'none' : '0 6px 16px rgba(127,77,149,.28)',
            fontFamily:'inherit',
          }}>
            {hitCount === 0 ? 'Ingen events matcher' : `Vis ${hitCount} events`}
          </button>
        </div>
      </div>
    </div>
  );
}

function SF_Section({ label, value, children, style }) {
  return (
    <div style={style}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12}}>
        <div style={{fontSize:13, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{label}</div>
        <div style={{fontSize:12, color:HC.fgDim, fontWeight:500}}>{value}</div>
      </div>
      {children}
    </div>
  );
}

function SF_Slider({ min, max, step, value, onChange, leftLabel, rightLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{position:'relative', height:36, display:'flex', alignItems:'center'}}>
        {/* Track */}
        <div style={{position:'absolute', left:0, right:0, height:4, borderRadius:2, background:HC.divider}}/>
        {/* Fill */}
        <div style={{position:'absolute', left:0, width:`${pct}%`, height:4, borderRadius:2, background:HC.plum}}/>
        {/* Native range for interaksjon */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e)=>onChange(Number(e.target.value))}
          style={{
            position:'absolute', left:0, right:0, width:'100%',
            appearance:'none', WebkitAppearance:'none', background:'transparent',
            height:36, cursor:'pointer', margin:0, padding:0, zIndex:2,
          }}
          className="sf_range"
        />
        {/* Knott */}
        <div style={{
          position:'absolute', left:`calc(${pct}% - 11px)`,
          width:22, height:22, borderRadius:11, background:'#fff',
          border:`2px solid ${HC.plum}`, boxShadow:'0 2px 8px rgba(42,33,52,.15)',
          pointerEvents:'none',
        }}/>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fgFaint, marginTop:2}}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <style>{`
        .sf_range::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 22px; height: 22px; background: transparent; cursor: pointer; }
        .sf_range::-moz-range-thumb { width: 22px; height: 22px; background: transparent; border: none; cursor: pointer; }
      `}</style>
    </div>
  );
}

function SF_Toggle({ label, sub, on, onChange, border }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:12,
      padding:'14px 0',
      borderTop: border ? `1px solid ${HC.divider}` : 'none',
    }}>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:600, color:HC.fg, letterSpacing:'-0.01em'}}>{label}</div>
        <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{sub}</div>
      </div>
      <button
        onClick={()=>onChange(!on)}
        aria-pressed={on}
        aria-label={label}
        style={{
          width:46, height:28, borderRadius:14, border:'none', cursor:'pointer',
          background: on ? HC.plum : HC.divider,
          position:'relative', padding:0,
          transition:'background .15s ease',
          flexShrink:0,
        }}>
        <div style={{
          position:'absolute', top:2, left: on ? 20 : 2,
          width:24, height:24, borderRadius:12, background:'#fff',
          boxShadow:'0 1px 3px rgba(0,0,0,.2)',
          transition:'left .15s ease',
        }}/>
      </button>
    </div>
  );
}

Object.assign(window, { H_ScreenSearch: ScreenSearch, H_ScreenFilter: ScreenFilter });
