/* global React, HC, H_StatusBarLight */
// Ambassadør: Opprett nytt event (4 steg)
// Martine er lokal vert i Trondheim. Hun arrangerer jevnlig events — vinsmaking,
// brettspill, fjellturer. Hun tjener 30% per billett.
// Tonen er profesjonell men varm — hun er hobbyarrangør, ikke event-byrå.
//
// Designprinsipp: Ingen tvungne felter. Martine kan publisere med minimum info,
// eller gå dypt. Hele flyten lagres automatisk — hun kan lukke appen og komme
// tilbake. Inntekt er transparent: hun ser hva hun tjener før publisering.
//
// Eksporterer:
//   window.H_ScreenAmbCreate1   — Konsept
//   window.H_ScreenAmbCreate2   — Detaljer
//   window.H_ScreenAmbCreate3   — Samtalestartere
//   window.H_ScreenAmbCreate4   — Forhåndsvisning og publisering
//   window.H_ScreenAmbCreate    — Wrapper med navigasjon mellom stegene

const { useState, useMemo } = React;

// ────────────────────────────────────────────────────────────────────────────
// Delte komponenter
// ────────────────────────────────────────────────────────────────────────────

function ProgressHeader({ step, total = 4, onBack, onExit, autoSaved = true }) {
  return (
    <>
      <div style={{padding:'14px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <button onClick={onBack} style={{
          width:38, height:38, borderRadius:19, background:HC.card, border:'none',
          boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {step === 1 ? (
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 3l7 7M10 3l-7 7" stroke={HC.fg} strokeWidth="1.8" strokeLinecap="round"/></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15"><path d="M11 3L4 7.5 11 12" stroke={HC.fg} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.plum}}>Nytt event</div>
          <div style={{fontSize:11, color:HC.fgDim, marginTop:2, fontWeight:600}}>Steg {step} av {total}</div>
        </div>
        <button onClick={onExit} style={{
          minWidth:38, height:38, padding:'0 12px', borderRadius:19,
          background:'transparent', border:'none', cursor:'pointer',
          fontSize:12, fontWeight:600, color:HC.fgDim,
        }}>
          Lagre
        </button>
      </div>

      {/* Progresjonsbar */}
      <div style={{padding:'16px 24px 0'}}>
        <div style={{display:'flex', gap:6}}>
          {Array.from({length: total}).map((_, i) => (
            <div key={i} style={{
              flex:1, height:4, borderRadius:2,
              background: i < step ? HC.plum : `${HC.fg}14`,
              transition:'background .3s',
            }}/>
          ))}
        </div>
        {autoSaved && (
          <div style={{display:'flex', alignItems:'center', gap:6, marginTop:10, fontSize:10.5, color:HC.green, fontWeight:600}}>
            <svg width="11" height="11" viewBox="0 0 11 11"><circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke={HC.green} strokeWidth="1.3"/><path d="M3.5 5.5l1.5 1.5L7.5 4" stroke={HC.green} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Lagret automatisk
          </div>
        )}
      </div>
    </>
  );
}

function BottomBar({ primaryLabel, onPrimary, secondaryLabel, onSecondary, disabled, hint }) {
  return (
    <div style={{
      padding:'14px 20px 20px', background:`linear-gradient(180deg, transparent 0%, ${HC.bg} 35%)`,
      position:'sticky', bottom:0,
    }}>
      {hint && (
        <div style={{textAlign:'center', marginBottom:8, fontSize:11, color:HC.fgDim}}>{hint}</div>
      )}
      <div style={{display:'flex', gap:10}}>
        {secondaryLabel && (
          <button onClick={onSecondary} style={{
            flex:'0 0 auto', padding:'0 18px', height:52, borderRadius:26,
            background:HC.card, border:`1px solid ${HC.divider}`, color:HC.fg,
            fontSize:13.5, fontWeight:700, cursor:'pointer',
          }}>
            {secondaryLabel}
          </button>
        )}
        <button
          onClick={disabled ? undefined : onPrimary}
          style={{
            flex:1, height:52, borderRadius:26, border:'none',
            background: disabled ? HC.fgFaint : `linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
            color:'#fff', fontSize:14.5, fontWeight:700,
            cursor: disabled ? 'default' : 'pointer',
            boxShadow: disabled ? 'none' : `0 10px 24px ${HC.coral}40`,
          }}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// STEG 1 — Konsept
// Martine velger event-type og skriver inn tema/undertekst.
// AI-forslag: "brettspill-kvelder får 96% gjennomføring hos deg"
// ────────────────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  { key:'vinsmaking', label:'Vinsmaking', emoji:'🍷', color:HC.coral },
  { key:'brettspill', label:'Brettspill', emoji:'🎲', color:HC.plum },
  { key:'fjelltur',   label:'Fjelltur',   emoji:'🏔️', color:HC.green },
  { key:'matkurs',    label:'Matkurs',    emoji:'🍳', color:HC.amber },
  { key:'bokklubb',   label:'Bokklubb',   emoji:'📖', color:HC.plumDeep },
  { key:'padel',      label:'Padel',      emoji:'🎾', color:HC.green },
  { key:'kaffe',      label:'Kaffekveld', emoji:'☕', color:HC.amber },
  { key:'kveldsmat',  label:'Kveldsmat',  emoji:'🍝', color:HC.coral },
  { key:'tegning',    label:'Tegneklubb', emoji:'✏️', color:HC.lilac },
];

function ScreenAmbCreate1({ state, setState, onNext, onExit } = {}) {
  const [localType, setLocalType] = useState((state && state.type) || null);
  const [localTitle, setLocalTitle] = useState((state && state.title) || '');
  const [localSubtitle, setLocalSubtitle] = useState((state && state.subtitle) || '');

  const save = (patch) => {
    if (setState) setState({...state, ...patch, type: localType, title: localTitle, subtitle: localSubtitle});
  };

  const selected = EVENT_TYPES.find(t => t.key === localType);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="10:42"/>
        <ProgressHeader step={1} onBack={onExit} onExit={onExit}/>

        <div style={{flex:1, overflowY:'auto'}}>
          {/* Velkomst / hilsen */}
          <div style={{padding:'20px 24px 0'}}>
            <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              Hva slags kveld<br/>lager du, Martine?
            </h1>
            <p style={{margin:'10px 0 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55}}>
              Velg en type, eller hopp over — du kan legge til detaljer senere.
            </p>
          </div>

          {/* AI-innsikt */}
          <div style={{padding:'20px 22px 0'}}>
            <div style={{
              background:`linear-gradient(135deg, ${HC.plum}08, ${HC.coral}0E)`,
              border:`1px solid ${HC.plum}22`,
              borderRadius:14, padding:'14px 16px',
              display:'flex', gap:12, alignItems:'flex-start',
            }}>
              <div style={{
                width:28, height:28, borderRadius:14, flexShrink:0,
                background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1l1.5 4 4 .5-3 3 .7 4L7 10.5 3.8 12.5 4.5 8.5 1.5 5.5 5.5 5z" fill="#fff"/></svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum}}>Fra Speedfriending</div>
                <div style={{fontSize:12.5, color:HC.fg, marginTop:4, lineHeight:1.5}}>
                  Basert på din historikk får <strong>brettspill-kvelder 96% gjennomføring</strong> hos deg. Vinsmaking: 88%.
                </div>
              </div>
            </div>
          </div>

          {/* Type-valg (grid) */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Type event
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
              {EVENT_TYPES.map(t => {
                const active = localType === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setLocalType(t.key); save({type: t.key}); }}
                    style={{
                      padding:'14px 8px', borderRadius:12,
                      background: active ? HC.card : 'rgba(255,255,255,.55)',
                      border: active ? `1.5px solid ${t.color}` : `1px solid ${HC.divider}`,
                      cursor:'pointer', display:'flex', flexDirection:'column',
                      alignItems:'center', gap:6,
                      boxShadow: active ? `0 4px 12px ${t.color}22` : 'none',
                      transition:'all .15s',
                    }}
                  >
                    <div style={{fontSize:22}}>{t.emoji}</div>
                    <div style={{fontSize:12, fontWeight:active?700:600, color: active ? t.color : HC.fg}}>
                      {t.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tittel */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Tittel
            </div>
            <input
              type="text"
              value={localTitle}
              onChange={e => { setLocalTitle(e.target.value); save({title: e.target.value}); }}
              placeholder={selected ? `F.eks. "${selected.label} på Trekroneren"` : 'Gi kvelden en tittel'}
              style={{
                width:'100%', padding:'14px 16px', borderRadius:12,
                background:HC.card, border:`1px solid ${HC.divider}`,
                fontSize:14, fontWeight:600, color:HC.fg,
                outline:'none', fontFamily:'inherit',
                boxSizing:'border-box',
              }}
            />
          </div>

          {/* Undertekst / tema */}
          <div style={{padding:'16px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Tema eller undertekst <span style={{fontWeight:500, color:HC.fgFaint, textTransform:'none', letterSpacing:0}}>(valgfritt)</span>
            </div>
            <textarea
              value={localSubtitle}
              onChange={e => { setLocalSubtitle(e.target.value); save({subtitle: e.target.value}); }}
              placeholder='Hva gjør denne kvelden spesiell? "Tre bord, alle lærer et nytt spill sammen."'
              rows={3}
              style={{
                width:'100%', padding:'14px 16px', borderRadius:12,
                background:HC.card, border:`1px solid ${HC.divider}`,
                fontSize:13.5, color:HC.fg, lineHeight:1.5,
                outline:'none', resize:'none', fontFamily:'inherit',
                boxSizing:'border-box',
              }}
            />
            <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:8, paddingLeft:4, lineHeight:1.5}}>
              Deltakere ser dette først. Kort og konkret virker best.
            </div>
          </div>

          <div style={{height:16}}/>
        </div>

        <BottomBar
          primaryLabel="Fortsett til detaljer"
          onPrimary={onNext}
          disabled={false}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// STEG 2 — Detaljer
// Dato, tid, varighet, venue, plasser, pris.
// Viser inntektskalkulator i sanntid.
// ────────────────────────────────────────────────────────────────────────────

const OSLO_VENUES = [
  { name:'Territoriet',      addr:'Markveien 58', note:'Favoritt · brukt 4 ganger' },
  { name:'Mathallen',        addr:'Vulkan 5',     note:'Bordplass til 8' },
  { name:'Bar Brutus',       addr:'Eiriks gate 2', note:'Vinbar' },
  { name:'Tim Wendelboe',    addr:'Grüners gate 1', note:'Kaffebar' },
  { name:'Fuglen',           addr:'Universitetsgata 2', note:'Hyggelig, lavt lydnivå' },
  { name:'Trekroneren',      addr:'Pilestredet 18', note:'Brettspill-bar · stort utvalg' },
];

function ScreenAmbCreate2({ state, setState, onNext, onBack, onExit } = {}) {
  const [date, setDate] = useState((state && state.date) || 'Fredag 24. april');
  const [time, setTime] = useState((state && state.time) || '19:00');
  const [duration, setDuration] = useState((state && state.duration) || 3);
  const [venue, setVenue] = useState((state && state.venue) || null);
  const [venuePickerOpen, setVenuePickerOpen] = useState(false);
  const [seats, setSeats] = useState((state && state.seats) || 6);
  const [price, setPrice] = useState((state && state.price) || 149);

  const save = (patch) => {
    if (setState) setState({...state, ...patch, date, time, duration, venue, seats, price});
  };

  // Inntektsfordeling — 30% Martine, 30% Speedfriending, 20% venue, 19% buffer
  const breakdown = useMemo(() => {
    const martine = Math.round(price * 0.30);
    const platform = Math.round(price * 0.30);
    const venueCost = Math.round(price * 0.20);
    const buffer = price - martine - platform - venueCost;
    return { martine, platform, venueCost, buffer };
  }, [price]);

  const totalRevenue = seats * price;
  const martineTotal = seats * breakdown.martine;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="10:44"/>
        <ProgressHeader step={2} onBack={onBack} onExit={onExit}/>

        <div style={{flex:1, overflowY:'auto'}}>
          <div style={{padding:'20px 24px 0'}}>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
              Når, hvor, hvor mange,<br/>og hva koster det?
            </h1>
          </div>

          {/* Dato og tid */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Når
            </div>
            <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
              <div style={{display:'flex', alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:12.5, color:HC.fgDim, width:64}}>Dato</div>
                <input
                  type="text"
                  value={date}
                  onChange={e => { setDate(e.target.value); save({date: e.target.value}); }}
                  style={{flex:1, border:'none', outline:'none', background:'transparent', fontSize:13.5, fontWeight:600, color:HC.fg, fontFamily:'inherit'}}
                />
                <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="3" width="10" height="9" rx="1.5" fill="none" stroke={HC.fgDim} strokeWidth="1.3"/><path d="M2 6h10" stroke={HC.fgDim} strokeWidth="1.3"/><path d="M5 2v2M9 2v2" stroke={HC.fgDim} strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div style={{display:'flex', alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:12.5, color:HC.fgDim, width:64}}>Start</div>
                <input
                  type="text"
                  value={time}
                  onChange={e => { setTime(e.target.value); save({time: e.target.value}); }}
                  style={{flex:1, border:'none', outline:'none', background:'transparent', fontSize:13.5, fontWeight:600, color:HC.fg, fontFamily:'inherit'}}
                />
              </div>
              <div style={{display:'flex', alignItems:'center', padding:'12px 0'}}>
                <div style={{fontSize:12.5, color:HC.fgDim, width:64}}>Varighet</div>
                <div style={{flex:1, display:'flex', gap:6}}>
                  {[2, 3, 4].map(h => (
                    <button
                      key={h}
                      onClick={() => { setDuration(h); save({duration: h}); }}
                      style={{
                        padding:'6px 14px', borderRadius:14,
                        background: duration === h ? HC.plum : 'transparent',
                        color: duration === h ? '#fff' : HC.fg,
                        border: duration === h ? 'none' : `1px solid ${HC.divider}`,
                        fontSize:12, fontWeight:600, cursor:'pointer',
                      }}
                    >
                      {h} t
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Hvor
            </div>
            <button
              onClick={() => setVenuePickerOpen(v => !v)}
              style={{
                width:'100%', padding:'14px 16px', borderRadius:14,
                background:HC.card, border:`1px solid ${HC.divider}`,
                boxShadow:'0 1px 8px rgba(42,33,52,.04)',
                display:'flex', alignItems:'center', gap:12, cursor:'pointer',
                textAlign:'left',
              }}
            >
              <div style={{
                width:34, height:34, borderRadius:17, flexShrink:0,
                background: venue ? `linear-gradient(135deg, ${HC.plum}, ${HC.lilac})` : `${HC.fg}12`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15"><path d="M7.5 1.5c-2.7 0-4.5 2-4.5 4.5 0 3 4.5 7 4.5 7s4.5-4 4.5-7c0-2.5-1.8-4.5-4.5-4.5z" fill="none" stroke={venue ? '#fff' : HC.fgDim} strokeWidth="1.3"/><circle cx="7.5" cy="6" r="1.5" fill={venue ? '#fff' : HC.fgDim}/></svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:700, color: venue ? HC.fg : HC.fgDim}}>
                  {venue ? venue.name : 'Velg venue (eller skriv nytt sted)'}
                </div>
                {venue && <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{venue.addr}</div>}
              </div>
              <svg width="10" height="14" viewBox="0 0 10 14" style={{transform: venuePickerOpen ? 'rotate(90deg)' : 'none', transition:'transform .2s'}}>
                <path d="M2 2l6 5-6 5" stroke={HC.fgDim} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {venuePickerOpen && (
              <div style={{marginTop:8, background:HC.card, borderRadius:14, padding:'4px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
                <div style={{padding:'10px 0 6px', fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>
                  Dine faste venuer
                </div>
                {OSLO_VENUES.map((v, i) => (
                  <div
                    key={v.name}
                    onClick={() => { setVenue(v); setVenuePickerOpen(false); save({venue: v}); }}
                    style={{
                      display:'flex', alignItems:'center', gap:12, padding:'10px 0', cursor:'pointer',
                      borderBottom: i < OSLO_VENUES.length-1 ? `1px solid ${HC.divider}` : 'none',
                    }}
                  >
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{v.name}</div>
                      <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{v.addr} · {v.note}</div>
                    </div>
                  </div>
                ))}
                <div style={{padding:'10px 0', borderTop:`1px solid ${HC.divider}`, fontSize:12.5, fontWeight:600, color:HC.plum, cursor:'pointer'}}>
                  + Legg til nytt venue
                </div>
              </div>
            )}
          </div>

          {/* Antall plasser */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
                Antall plasser
              </div>
              <div style={{fontSize:10.5, color:HC.green, fontWeight:600}}>5–8 fungerer best</div>
            </div>
            <div style={{background:HC.card, borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
              <div style={{display:'flex', alignItems:'center', gap:16}}>
                <button
                  onClick={() => { const n = Math.max(2, seats - 1); setSeats(n); save({seats: n}); }}
                  style={{width:36, height:36, borderRadius:18, border:`1px solid ${HC.divider}`, background:HC.cream, fontSize:18, fontWeight:700, color:HC.fg, cursor:'pointer'}}
                >−</button>
                <div style={{flex:1, textAlign:'center'}}>
                  <div style={{fontSize:28, fontWeight:700, color:HC.fg, letterSpacing:'-0.02em'}}>{seats}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:-2}}>plasser</div>
                </div>
                <button
                  onClick={() => { const n = Math.min(20, seats + 1); setSeats(n); save({seats: n}); }}
                  style={{width:36, height:36, borderRadius:18, border:`1px solid ${HC.divider}`, background:HC.cream, fontSize:18, fontWeight:700, color:HC.fg, cursor:'pointer'}}
                >+</button>
              </div>
              {seats >= 5 && seats <= 8 && (
                <div style={{marginTop:12, padding:'8px 12px', borderRadius:10, background:`${HC.green}14`, fontSize:11.5, color:HC.green, fontWeight:600, textAlign:'center'}}>
                  Sweet spot — små nok til samtale, store nok for energi.
                </div>
              )}
              {seats > 12 && (
                <div style={{marginTop:12, padding:'8px 12px', borderRadius:10, background:`${HC.amber}18`, fontSize:11.5, color:'#A07430', fontWeight:600, textAlign:'center'}}>
                  Over 12: tenk på to bord eller parallellsesjoner.
                </div>
              )}
            </div>
          </div>

          {/* Pris og inntektskalkulator */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Pris per billett
            </div>

            <div style={{background:HC.card, borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
              <div style={{display:'flex', alignItems:'baseline', gap:4}}>
                <input
                  type="number"
                  value={price}
                  onChange={e => { const n = parseInt(e.target.value||'0', 10); setPrice(n); save({price: n}); }}
                  style={{
                    width:100, border:'none', outline:'none', background:'transparent',
                    fontSize:32, fontWeight:700, color:HC.fg, fontFamily:'inherit',
                    letterSpacing:'-0.02em',
                  }}
                />
                <div style={{fontSize:15, fontWeight:600, color:HC.fgDim}}>kr</div>
              </div>
              <div style={{display:'flex', gap:6, marginTop:10}}>
                {[99, 149, 199, 249].map(p => (
                  <button
                    key={p}
                    onClick={() => { setPrice(p); save({price: p}); }}
                    style={{
                      padding:'6px 12px', borderRadius:14,
                      background: price === p ? `${HC.plum}18` : 'transparent',
                      border: price === p ? `1px solid ${HC.plum}` : `1px solid ${HC.divider}`,
                      fontSize:11.5, fontWeight:600, color: price === p ? HC.plum : HC.fgDim,
                      cursor:'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Fordelingsvisning — hva går hvor */}
            <div style={{marginTop:12, background:`linear-gradient(135deg, ${HC.cream}, ${HC.bgSoft})`, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
                Fordeling per billett
              </div>
              {[
                { label:'Du tjener',               amount: breakdown.martine,   color: HC.green,    dim:false, strong:true },
                { label:'Speedfriending (plattform)', amount: breakdown.platform, color: HC.plum,  dim:false },
                { label:'Venue-dekning',           amount: breakdown.venueCost, color: HC.amber,    dim:false },
                { label:'Buffer / uforutsett',     amount: breakdown.buffer,    color: HC.fgDim,    dim:true },
              ].map((row, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'4px 0'}}>
                  <div style={{width:8, height:8, borderRadius:4, background: row.dim ? HC.fgFaint : row.color, flexShrink:0}}/>
                  <div style={{flex:1, fontSize:12.5, color: row.strong ? HC.fg : HC.fgDim, fontWeight: row.strong ? 700 : 500}}>
                    {row.label}
                  </div>
                  <div style={{fontSize: row.strong ? 14 : 13, fontWeight:700, color: row.strong ? HC.green : HC.fg, letterSpacing:'-0.01em'}}>
                    {row.amount} kr
                  </div>
                </div>
              ))}
              <div style={{height:1, background:HC.divider, margin:'10px 0'}}/>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, color:HC.fgDim}}>
                <span>Ved fullt event ({seats} plasser)</span>
                <span style={{fontWeight:700, color:HC.green}}>Du tjener {martineTotal} kr</span>
              </div>
              <div style={{marginTop:4, display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fgFaint}}>
                <span>Total omsetning</span>
                <span>{totalRevenue} kr</span>
              </div>
            </div>

            <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, paddingLeft:4, lineHeight:1.5}}>
              Buffer dekker ikke-oppmøte og siste-minutt avbestillinger. Du får fordelingen utbetalt kl. 00:00 dagen etter.
            </div>
          </div>

          <div style={{height:16}}/>
        </div>

        <BottomBar
          primaryLabel="Fortsett til samtalestartere"
          onPrimary={onNext}
          secondaryLabel="Tilbake"
          onSecondary={onBack}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// STEG 3 — Samtalestartere
// Bibliotek med forskningsbaserte spørsmål, gruppert etter dybde.
// Aron-inspirert (36 questions). Martine velger 5-10, kan skrive egne.
// ────────────────────────────────────────────────────────────────────────────

const STARTER_LIBRARY = [
  {
    group: 'Lett — åpning',
    subtitle: 'Trygge spørsmål som varmer opp. Bruk 2-3 av disse først.',
    color: HC.amber,
    questions: [
      'Hva er det beste som har skjedd deg i dag?',
      'Hvilket sted i Oslo føles som "hjem" for deg?',
      'Hva er en liten ting som gjorde deg glad sist uke?',
      'Hvis du kunne spise én rett resten av livet, hva?',
      'Hva gjør du når du trenger en pause fra alt?',
      'Hvilken årstid passer deg best — og hvorfor?',
      'Hva er siste bok, film eller podcast du anbefalte noen?',
      'Hva er et sted du har vært som overrasket deg?',
      'Hvem var du på 20? Er du fortsatt den personen?',
      'Hvis du ikke måtte jobbe i morgen, hva ville du gjort?',
    ],
  },
  {
    group: 'Middels — åpner opp',
    subtitle: 'Spørsmål som viser mer, uten å være skummelt.',
    color: HC.coral,
    questions: [
      'Hva er en beslutning som forandret retning på livet ditt?',
      'Hva er du mer stolt av enn andre kanskje skjønner?',
      'Hva ville du advart deg selv om på 25?',
      'Når følte du deg sist virkelig forstått?',
      'Hva gjør deg mest nervøs i nye situasjoner?',
      'Hva savner du fra en tidligere fase av livet?',
      'Hvem i livet ditt fortjener mer anerkjennelse enn de får?',
      'Hva er en vane du vil bli kvitt, men ikke klarer?',
      'Hva er en del av deg du har lært å like med årene?',
      'Hvilken type samtaler gir deg energi, og hvilke tapper deg?',
    ],
  },
  {
    group: 'Dypt — kun hvis gruppa er klar',
    subtitle: 'Aron-inspirerte. Kun avslutningsvis. Ikke tving noen.',
    color: HC.plum,
    questions: [
      'Hva er det siste du gråt av?',
      'Hva ville du gjort hvis du visste du ikke kunne mislykkes?',
      'Hva er du mest takknemlig for akkurat nå?',
      'Hvis du kunne spise middag med én person, levende eller død, hvem?',
      'Hva betyr vennskap for deg i dag versus for 10 år siden?',
      'Hvilket minne varmer deg når du har det tungt?',
      'Hva er noe du aldri har sagt høyt til noen?',
      'Hvis du visste du hadde ett år igjen, hva ville du gjort annerledes?',
      'Hva er ditt tydeligste barndomsminne?',
      'Hvis du kunne gi alle i rommet én ting, hva ville det vært?',
    ],
  },
];

function ScreenAmbCreate3({ state, setState, onNext, onBack, onExit } = {}) {
  const [selected, setSelected] = useState((state && state.starters) || []);
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customList, setCustomList] = useState((state && state.customStarters) || []);

  const save = (patch) => {
    if (setState) setState({...state, ...patch, starters: selected, customStarters: customList});
  };

  const toggle = (q) => {
    const next = selected.includes(q) ? selected.filter(x => x !== q) : [...selected, q];
    setSelected(next);
    save({starters: next});
  };

  const addCustom = () => {
    const t = customText.trim();
    if (!t) return;
    const next = [...customList, t];
    setCustomList(next);
    setCustomText('');
    setCustomOpen(false);
    save({customStarters: next});
  };

  const removeCustom = (idx) => {
    const next = customList.filter((_, i) => i !== idx);
    setCustomList(next);
    save({customStarters: next});
  };

  const totalSelected = selected.length + customList.length;
  const goodRange = totalSelected >= 5 && totalSelected <= 10;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="10:48"/>
        <ProgressHeader step={3} onBack={onBack} onExit={onExit}/>

        <div style={{flex:1, overflowY:'auto'}}>
          <div style={{padding:'20px 24px 0'}}>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
              Samtalestartere
            </h1>
            <p style={{margin:'8px 0 0', fontSize:13, color:HC.fgDim, lineHeight:1.55}}>
              Kort som legges på bordet. Fra Arons 36 spørsmål — tilpasset norsk. Velg 5–10.
            </p>
          </div>

          {/* Teller */}
          <div style={{padding:'16px 22px 0'}}>
            <div style={{
              padding:'12px 14px', borderRadius:12,
              background: goodRange ? `${HC.green}12` : HC.card,
              border: goodRange ? `1px solid ${HC.green}40` : `1px solid ${HC.divider}`,
              display:'flex', alignItems:'center', gap:10,
            }}>
              <div style={{
                width:30, height:30, borderRadius:15,
                background: goodRange ? HC.green : HC.fgFaint,
                color:'#fff', fontSize:13, fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {totalSelected}
              </div>
              <div style={{flex:1, fontSize:12.5, color:HC.fg, lineHeight:1.4}}>
                {totalSelected === 0 && 'Ingen valgt ennå. 5–10 er søt flekk.'}
                {totalSelected > 0 && totalSelected < 5 && `${5 - totalSelected} til for anbefalt minimum.`}
                {goodRange && 'Perfekt. Nok til variasjon, få nok til fordypning.'}
                {totalSelected > 10 && 'Litt mange. Vurder å droppe noen.'}
              </div>
            </div>
          </div>

          {/* Bibliotek grupper */}
          {STARTER_LIBRARY.map((grp, gi) => (
            <div key={gi} style={{padding:'20px 22px 0'}}>
              <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:6}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color: grp.color}}>
                  {grp.group}
                </div>
                <div style={{fontSize:10.5, color:HC.fgFaint, fontWeight:500}}>
                  {grp.questions.filter(q => selected.includes(q)).length} / {grp.questions.length}
                </div>
              </div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginBottom:10, lineHeight:1.5}}>{grp.subtitle}</div>
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                {grp.questions.map((q, qi) => {
                  const isSel = selected.includes(q);
                  return (
                    <button
                      key={qi}
                      onClick={() => toggle(q)}
                      style={{
                        textAlign:'left', padding:'12px 14px', borderRadius:11,
                        background: isSel ? HC.card : 'rgba(255,255,255,.55)',
                        border: isSel ? `1.5px solid ${grp.color}` : `1px solid ${HC.divider}`,
                        cursor:'pointer',
                        display:'flex', alignItems:'flex-start', gap:10,
                        boxShadow: isSel ? `0 2px 8px ${grp.color}18` : 'none',
                      }}
                    >
                      <div style={{
                        width:20, height:20, borderRadius:10, flexShrink:0, marginTop:1,
                        background: isSel ? grp.color : 'transparent',
                        border: isSel ? 'none' : `1.5px solid ${HC.fgFaint}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {isSel && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <div style={{flex:1, fontSize:13, color:HC.fg, lineHeight:1.5, fontWeight: isSel ? 600 : 500}}>
                        {q}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Egne spørsmål */}
          <div style={{padding:'24px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Dine egne
            </div>
            {customList.length > 0 && (
              <div style={{background:HC.card, borderRadius:14, padding:'4px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.04)', marginBottom:10}}>
                {customList.map((q, i) => (
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, padding:'10px 0', borderBottom: i < customList.length-1 ? `1px solid ${HC.divider}` : 'none'}}>
                    <div style={{width:18, height:18, borderRadius:9, background:HC.coral, color:'#fff', flexShrink:0, marginTop:2, display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div style={{flex:1, fontSize:13, color:HC.fg, lineHeight:1.5}}>{q}</div>
                    <button onClick={() => removeCustom(i)} style={{background:'transparent', border:'none', color:HC.fgFaint, fontSize:11, cursor:'pointer', fontWeight:600}}>Slett</button>
                  </div>
                ))}
              </div>
            )}
            {!customOpen ? (
              <button
                onClick={() => setCustomOpen(true)}
                style={{
                  width:'100%', padding:'12px 14px', borderRadius:12,
                  background:'rgba(255,255,255,.55)', border:`1px dashed ${HC.plum}55`,
                  fontSize:13, fontWeight:600, color:HC.plum, cursor:'pointer',
                }}
              >
                + Skriv eget spørsmål
              </button>
            ) : (
              <div style={{background:HC.card, borderRadius:12, padding:'12px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
                <textarea
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="Skriv et spørsmål som passer kvelden din…"
                  rows={2}
                  autoFocus
                  style={{
                    width:'100%', border:'none', outline:'none', background:'transparent',
                    fontSize:13.5, color:HC.fg, lineHeight:1.5, resize:'none', fontFamily:'inherit',
                    boxSizing:'border-box',
                  }}
                />
                <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:8}}>
                  <button onClick={() => { setCustomOpen(false); setCustomText(''); }} style={{background:'transparent', border:'none', color:HC.fgDim, fontSize:12, fontWeight:600, cursor:'pointer', padding:'6px 10px'}}>
                    Avbryt
                  </button>
                  <button onClick={addCustom} style={{padding:'6px 14px', borderRadius:14, border:'none', background:HC.plum, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer'}}>
                    Legg til
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{height:16}}/>
        </div>

        <BottomBar
          primaryLabel="Fortsett til forhåndsvisning"
          onPrimary={onNext}
          secondaryLabel="Tilbake"
          onSecondary={onBack}
          hint={totalSelected === 0 ? 'Du kan også hoppe over — deltakere får standardspørsmål.' : null}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// STEG 4 — Forhåndsvisning + publisering
// Viser hvordan eventet ser ut for deltakere. Bekrefter publisering.
// ────────────────────────────────────────────────────────────────────────────

function ScreenAmbCreate4({ state, setState, onBack, onPublish, onDraft, onExit } = {}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [published, setPublished] = useState(false);

  const s = state || {};
  const type = EVENT_TYPES.find(t => t.key === s.type);
  const title = s.title || (type ? `${type.label} med Martine` : 'Din kveld');
  const subtitle = s.subtitle || (type ? `Hyggelig ${type.label.toLowerCase()}-kveld i sentrum.` : 'Bli kjent med nye folk.');
  const date = s.date || 'Fredag 24. april';
  const time = s.time || '19:00';
  const duration = s.duration || 3;
  const venue = s.venue || OSLO_VENUES[0];
  const seats = s.seats || 6;
  const price = s.price || 149;
  const starters = s.starters || [];
  const custom = s.customStarters || [];
  const totalStarters = starters.length + custom.length;

  const martineEarn = Math.round(price * 0.30) * seats;

  if (published) {
    return (
      <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
        <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', textAlign:'center'}}>
          <div style={{
            width:96, height:96, borderRadius:48,
            background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 16px 40px ${HC.coral}50`,
            marginBottom:28,
          }}>
            <svg width="44" height="44" viewBox="0 0 44 44"><path d="M10 22l8 8 16-16" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Publisert.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14, color:HC.fgDim, lineHeight:1.55, maxWidth:280}}>
            "{title}" er nå på Discovery-feeden. Vi gir deg beskjed når første billett selges.
          </p>
          <div style={{marginTop:28, padding:'14px 20px', borderRadius:14, background:HC.card, boxShadow:'0 2px 12px rgba(42,33,52,.06)'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Potensiell inntekt</div>
            <div style={{fontSize:26, fontWeight:700, color:HC.green, marginTop:4, letterSpacing:'-0.02em'}}>{martineEarn} kr</div>
            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>hvis alle {seats} plassene blir fylt</div>
          </div>
          <button onClick={onExit} style={{marginTop:36, padding:'14px 28px', borderRadius:26, border:'none', background:HC.plum, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer'}}>
            Til Hjem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="10:53"/>
        <ProgressHeader step={4} onBack={onBack} onExit={onExit}/>

        <div style={{flex:1, overflowY:'auto'}}>
          <div style={{padding:'20px 24px 0'}}>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
              Slik ser eventet ut<br/>for deltakere
            </h1>
            <p style={{margin:'8px 0 0', fontSize:12.5, color:HC.fgDim, lineHeight:1.55}}>
              Scroll for å se hele detaljsiden. Publiser når du er fornøyd.
            </p>
          </div>

          {/* Preview-etikett */}
          <div style={{padding:'14px 24px 0'}}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'4px 10px', borderRadius:12,
              background:`${HC.plum}14`, color:HC.plum,
              fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
            }}>
              <span style={{width:5, height:5, borderRadius:3, background:HC.plum}}/>
              Forhåndsvisning
            </div>
          </div>

          {/* Mini-renderet event-kort (slik deltakere ser det) */}
          <div style={{padding:'12px 20px 0'}}>
            <div style={{background:HC.card, borderRadius:18, padding:14, boxShadow:'0 4px 16px rgba(42,33,52,.08)', border:`1px solid ${HC.divider}`}}>
              {/* Hero inne i preview */}
              <div style={{
                position:'relative', borderRadius:14, overflow:'hidden',
                background:`linear-gradient(135deg, ${(type && type.color) || HC.coral}, ${HC.plum})`,
                padding:'16px 16px 14px', color:'#fff',
              }}>
                <div style={{position:'absolute', right:-20, top:-20, width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,.09)'}}/>
                <div style={{position:'relative'}}>
                  <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', opacity:.85}}>
                    {date.toUpperCase()} · {time}–{
                      (() => {
                        const [h, m] = time.split(':').map(Number);
                        const endH = (h + duration) % 24;
                        return `${String(endH).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
                      })()
                    }
                  </div>
                  <div style={{margin:'6px 0 0', fontSize:18, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.15}}>
                    {title}
                  </div>
                  <div style={{marginTop:6, fontSize:11.5, opacity:.92, lineHeight:1.45}}>
                    {subtitle}
                  </div>
                  <div style={{marginTop:12, display:'flex', alignItems:'baseline', gap:10}}>
                    <div style={{fontSize:18, fontWeight:700}}>{price} kr</div>
                    <div style={{fontSize:10.5, opacity:.85}}>0 av {seats} plasser</div>
                  </div>
                </div>
              </div>

              {/* Vert-rad */}
              <div style={{display:'flex', alignItems:'center', gap:10, padding:'12px 2px 0'}}>
                <div style={{width:28, height:28, borderRadius:14, background:'linear-gradient(135deg,#E8B8A0,#B5694A)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:11}}>M</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:11.5, fontWeight:700, color:HC.fg}}>Vert: Martine</div>
                  <div style={{fontSize:10, color:HC.fgDim, marginTop:1}}>Ambassadør i Oslo · 47 kvelder arrangert</div>
                </div>
              </div>

              {/* Venue-rad */}
              <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 2px 0'}}>
                <div style={{width:28, height:28, borderRadius:14, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1.5c-2.3 0-4 1.7-4 4 0 2.7 4 6 4 6s4-3.3 4-6c0-2.3-1.7-4-4-4z" fill="none" stroke={HC.plum} strokeWidth="1.2"/><circle cx="6.5" cy="5.5" r="1.2" fill={HC.plum}/></svg>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:11.5, fontWeight:700, color:HC.fg}}>{venue.name}</div>
                  <div style={{fontSize:10, color:HC.fgDim, marginTop:1}}>{venue.addr}</div>
                </div>
              </div>

              {/* Samtalestartere-rad */}
              {totalStarters > 0 && (
                <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 2px 0'}}>
                  <div style={{width:28, height:28, borderRadius:14, background:`${HC.coral}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <svg width="13" height="13" viewBox="0 0 13 13"><path d="M2 3.5a2 2 0 012-2h5a2 2 0 012 2v4a2 2 0 01-2 2H6l-2 2v-2H4a2 2 0 01-2-2v-4z" fill="none" stroke={HC.coral} strokeWidth="1.2"/></svg>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:11.5, fontWeight:700, color:HC.fg}}>{totalStarters} samtalestartere</div>
                    <div style={{fontSize:10, color:HC.fgDim, marginTop:1}}>Legges på bordet under kvelden</div>
                  </div>
                </div>
              )}

              {/* Mock CTA-knapp */}
              <button disabled style={{
                width:'100%', marginTop:14, height:40, borderRadius:20, border:'none',
                background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`, color:'#fff',
                fontSize:12.5, fontWeight:700, opacity:.95, cursor:'default',
              }}>
                Si ja · Vipps {price} kr
              </button>
            </div>
          </div>

          {/* Oppsummering */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
              Oppsummering
            </div>
            <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
              {[
                { k:'Type',              v: type ? `${type.emoji} ${type.label}` : 'Ikke valgt' },
                { k:'Dato og tid',       v: `${date} · ${time} (${duration} t)` },
                { k:'Venue',             v: venue.name },
                { k:'Plasser',           v: `${seats}` },
                { k:'Pris',              v: `${price} kr` },
                { k:'Samtalestartere',   v: totalStarters > 0 ? `${totalStarters} valgt` : 'Standardspørsmål brukes' },
              ].map((r, i, arr) => (
                <div key={i} style={{display:'flex', padding:'10px 0', borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none'}}>
                  <div style={{flex:'0 0 110px', fontSize:11.5, color:HC.fgDim, fontWeight:500}}>{r.k}</div>
                  <div style={{flex:1, fontSize:12.5, color:HC.fg, fontWeight:600, textAlign:'right'}}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Inntekts-påminnelse */}
          <div style={{padding:'16px 22px 0'}}>
            <div style={{
              background:`${HC.green}10`, borderRadius:14, padding:'14px 16px',
              border:`1px solid ${HC.green}28`,
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:34, height:34, borderRadius:17,
                background:HC.green,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v12M4 6l4-4 4 4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.green}}>Din inntekt</div>
                <div style={{fontSize:15, fontWeight:700, color:HC.fg, marginTop:2, letterSpacing:'-0.01em'}}>Inntil {martineEarn} kr for denne kvelden</div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{Math.round(price * 0.30)} kr per billett · utbetalt dagen etter</div>
              </div>
            </div>
          </div>

          <div style={{height:16}}/>
        </div>

        {/* Bekreftelsesmodal */}
        {showConfirm && (
          <div style={{
            position:'absolute', inset:0, background:'rgba(42,33,52,.55)', backdropFilter:'blur(4px)',
            zIndex:10, display:'flex', alignItems:'flex-end',
          }}>
            <div style={{
              background:HC.bg, borderTopLeftRadius:28, borderTopRightRadius:28,
              width:'100%', padding:'24px 24px 32px',
              boxShadow:'0 -20px 40px rgba(0,0,0,.25)',
            }}>
              <div style={{width:36, height:4, borderRadius:2, background:HC.fgFaint, margin:'0 auto 20px'}}/>
              <h2 style={{margin:0, fontSize:20, fontWeight:700, letterSpacing:'-0.01em', color:HC.fg, textAlign:'center'}}>
                Publisere på Discovery-feeden nå?
              </h2>
              <p style={{margin:'10px 0 0', fontSize:13, color:HC.fgDim, lineHeight:1.55, textAlign:'center'}}>
                Eventet blir synlig for alle i Oslo. Du kan fortsatt redigere frem til 24 timer før start.
              </p>
              <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:8}}>
                <button
                  onClick={() => setPublished(true)}
                  style={{
                    width:'100%', height:52, borderRadius:26, border:'none',
                    background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`, color:'#fff',
                    fontSize:14.5, fontWeight:700, cursor:'pointer',
                    boxShadow:`0 10px 24px ${HC.coral}40`,
                  }}
                >
                  Publiser
                </button>
                <button
                  onClick={() => { setShowConfirm(false); if (onDraft) onDraft(); }}
                  style={{
                    width:'100%', height:48, borderRadius:24, background:HC.card,
                    border:`1px solid ${HC.divider}`, color:HC.fg,
                    fontSize:13.5, fontWeight:700, cursor:'pointer',
                  }}
                >
                  Lagre som utkast
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    width:'100%', height:44, background:'transparent', border:'none',
                    color:HC.fgDim, fontSize:13, fontWeight:600, cursor:'pointer',
                  }}
                >
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomBar
          primaryLabel="Publiser"
          onPrimary={() => setShowConfirm(true)}
          secondaryLabel="Tilbake"
          onSecondary={onBack}
          hint="Du kan redigere eller avlyse helt frem til 24 timer før start."
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Wrapper — navigerer mellom stegene, holder state
// ────────────────────────────────────────────────────────────────────────────

function ScreenAmbCreate({ onExit } = {}) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    type: 'brettspill',
    title: '',
    subtitle: '',
    date: 'Fredag 24. april',
    time: '19:00',
    duration: 3,
    venue: null,
    seats: 6,
    price: 149,
    starters: [],
    customStarters: [],
  });

  const handleExit = () => {
    if (onExit) onExit();
    else setStep(1);
  };

  const common = { state, setState, onExit: handleExit };

  if (step === 1) return <ScreenAmbCreate1 {...common} onNext={() => setStep(2)}/>;
  if (step === 2) return <ScreenAmbCreate2 {...common} onBack={() => setStep(1)} onNext={() => setStep(3)}/>;
  if (step === 3) return <ScreenAmbCreate3 {...common} onBack={() => setStep(2)} onNext={() => setStep(4)}/>;
  return <ScreenAmbCreate4 {...common} onBack={() => setStep(3)} onDraft={handleExit}/>;
}

// ────────────────────────────────────────────────────────────────────────────
// Eksporter
// ────────────────────────────────────────────────────────────────────────────

window.H_ScreenAmbCreate1 = ScreenAmbCreate1;
window.H_ScreenAmbCreate2 = ScreenAmbCreate2;
window.H_ScreenAmbCreate3 = ScreenAmbCreate3;
window.H_ScreenAmbCreate4 = ScreenAmbCreate4;
window.H_ScreenAmbCreate  = ScreenAmbCreate;
