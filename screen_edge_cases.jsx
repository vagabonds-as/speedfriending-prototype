/* global React, HC, H_StatusBarLight */
// Booking edge cases — reservasjonsbekreftelse, avbestilling, venteliste,
// sen ankomst, og ambassadør-avlysning. Varme, tydelige, uten shaming.

// ============================================================================
// Felles små byggeklosser
// ============================================================================

function EC_Header({ eyebrow, title, time = '14:23', onBack }) {
  return (
    <>
      <H_StatusBarLight time={time}/>
      <div style={{padding:'14px 22px 0', display:'flex', alignItems:'center', gap:10}}>
        {onBack ? (
          <button onClick={onBack} style={{
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
      </div>
    </>
  );
}

function EC_EventLine({ dag, tid, title, venue, tint = HC.plum }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:12, padding:'12px 0',
    }}>
      <div style={{
        width:44, height:44, borderRadius:12, background:`${tint}18`,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        color:tint, lineHeight:1.1,
      }}>
        <span style={{fontSize:10, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>{dag}</span>
        <span style={{fontSize:11, fontWeight:600, opacity:.85, marginTop:1}}>{tid}</span>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{title}</div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>{venue}</div>
      </div>
      <svg width="10" height="14" viewBox="0 0 10 14">
        <path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ============================================================================
// 1) Bekreftelse etter reservasjon — umiddelbart etter Vipps
// ============================================================================

function ScreenConfirmation() {
  // QR-mønster generert deterministisk fra "bookingId" — kun visuell illusjon
  const qrCells = React.useMemo(() => {
    const seed = [3,7,1,9,4,2,8,5,6,0,3,7,1,9,4,2,8,5,6,0,3,7,1,9,4];
    const cells = [];
    for (let r = 0; r < 21; r++) {
      for (let c = 0; c < 21; c++) {
        // Posisjonsmarkører i 3 hjørner
        const inCorner =
          (r < 7 && c < 7) ||
          (r < 7 && c > 13) ||
          (r > 13 && c < 7);
        if (inCorner) {
          const lr = r < 7 ? r : r - 14;
          const lc = c < 7 ? c : c - 14;
          const onEdge = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const onInner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          cells.push(onEdge || onInner ? 1 : 0);
        } else {
          cells.push(((seed[(r*c+r+c) % seed.length] + r*c) % 5) > 2 ? 1 : 0);
        }
      }
    }
    return cells;
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
        <EC_Header time="14:23" eyebrow="Bekreftet" title="Vi sees torsdag."/>

        {/* Vennlig undertekst */}
        <div style={{padding:'8px 24px 0'}}>
          <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Betalingen gikk gjennom. Du finner alt du trenger her — ingen grunn til å stresse.
          </p>
        </div>

        {/* Event-kortet med dato og sted */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
            borderRadius:20, padding:'20px 22px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.coral}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-40, top:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', opacity:.88}}>TOR 23. APR · 19:00</div>
              <h2 style={{margin:'6px 0 0', fontSize:20, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.2}}>
                Vinsmaking med Martine
              </h2>
              <div style={{margin:'10px 0 0', fontSize:13, lineHeight:1.5, opacity:.92}}>
                Søstrene Karlsen · Fjordgata 7
              </div>
              <div style={{display:'flex', alignItems:'center', gap:16, marginTop:14, fontSize:12, opacity:.88}}>
                <span>Plass #3 av 6</span>
                <span style={{opacity:.5}}>·</span>
                <span>4 min fra deg</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR-kort */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:18, padding:'22px 22px 18px',
            boxShadow:'0 6px 18px rgba(42,33,52,.06)',
            textAlign:'center',
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim}}>
              Vis i døra
            </div>

            {/* QR-illustrasjon */}
            <div style={{
              margin:'14px auto 0', width:180, height:180, padding:10,
              background:'#fff', borderRadius:12, border:`1px solid ${HC.divider}`,
              display:'grid', gridTemplateColumns:'repeat(21, 1fr)', gap:0,
            }}>
              {qrCells.map((v, i) => (
                <div key={i} style={{background: v ? HC.fg : 'transparent', aspectRatio:'1'}}/>
              ))}
            </div>

            <div style={{fontSize:12, color:HC.fgDim, marginTop:14}}>
              Booking #SF-23849 · Viktor Sandén
            </div>
          </div>
        </div>

        {/* Knapper — kalender + del */}
        <div style={{padding:'18px 22px 0', display:'grid', gap:10}}>
          <button style={{
            padding:'14px 16px', borderRadius:14, border:'none',
            background:HC.card, color:HC.fg, fontSize:14, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', gap:12, textAlign:'left',
            boxShadow:'0 1px 4px rgba(42,33,52,.05)',
            fontFamily:'inherit',
          }}>
            <div style={{width:36, height:36, borderRadius:10, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="2" y="4" width="12" height="10" rx="1.5" fill="none" stroke={HC.plum} strokeWidth="1.4"/>
                <path d="M2 7h12" stroke={HC.plum} strokeWidth="1.4"/>
                <path d="M5 2v3M11 2v3" stroke={HC.plum} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div>Legg til i kalender</div>
              <div style={{fontSize:11, color:HC.fgDim, fontWeight:500, marginTop:1}}>Varsel 1 time før</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button style={{
            padding:'14px 16px', borderRadius:14, border:'none',
            background:HC.cream, color:HC.fg, fontSize:14, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', gap:12, textAlign:'left',
            boxShadow:'0 1px 4px rgba(42,33,52,.05)',
            fontFamily:'inherit',
          }}>
            <div style={{width:36, height:36, borderRadius:10, background:`${HC.coral}1c`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="5" cy="5" r="2.2" fill="none" stroke={HC.coral} strokeWidth="1.4"/>
                <circle cx="11" cy="5" r="2.2" fill="none" stroke={HC.coral} strokeWidth="1.4"/>
                <path d="M2 14c0-2.4 2-4 4-4M14 14c0-2.4-2-4-4-4" fill="none" stroke={HC.coral} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div>Ta med en venn</div>
              <div style={{fontSize:11, color:HC.fgDim, fontWeight:500, marginTop:1}}>Del lenken — det er én plass til</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Hva nå */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'16px 18px',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Hva nå
            </div>
            <p style={{margin:'6px 0 0', fontSize:13, lineHeight:1.55, color:HC.fg}}>
              Du får en liten påminnelse torsdag morgen. Martine hilser på i døra — bare vis QR-koden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenConfirmation = ScreenConfirmation;

// ============================================================================
// 2) Avbestilling — før/etter 17:00 samme dag
// ============================================================================

function ScreenCancel() {
  // Simuler at det er samme dag. Før 17:00 = full refusjon.
  const [now] = React.useState({ h: 14, m: 23 });
  const beforeCutoff = now.h < 17;
  const [reason, setReason] = React.useState('');
  const [step, setStep] = React.useState('confirm'); // 'confirm' | 'done'

  const reasons = [
    'Noe kom i veien',
    'Jeg orker ikke i dag',
    'Føler meg dårlig',
    'Praktisk grunn (jobb, barn)',
    'Noe annet',
  ];

  if (step === 'done') {
    return (
      <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
        <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
          <EC_Header time="14:23" eyebrow="Avbestilt" title="Det er helt ok."/>

          <div style={{padding:'10px 24px 0'}}>
            <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
              {beforeCutoff
                ? 'Pengene er på vei tilbake. Vi rydder plassen, og den kan gå til noen som står på venteliste.'
                : 'Plassen er frigjort. Vi sees når det passer bedre — det er alltid en ny kveld.'}
            </p>
          </div>

          {/* Refusjonsstatus */}
          {beforeCutoff && (
            <div style={{padding:'22px 22px 0'}}>
              <div style={{
                background:HC.card, borderRadius:14, padding:'16px 18px',
                boxShadow:'0 2px 8px rgba(42,33,52,.05)',
                display:'flex', alignItems:'center', gap:14,
              }}>
                <div style={{width:40, height:40, borderRadius:20, background:`${HC.green}18`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M3 9l4 4 8-8" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.green}}>
                    Refusjon startet
                  </div>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:2}}>
                    249 kr — tilbake på Vipps innen 2–3 dager
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forslag til andre kvelder */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:8}}>
              Kanskje en annen kveld
            </div>
            <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
              <EC_EventLine dag="Lør" tid="11:00" title="Bymarka-tur" venue="Skistua · 8 kommer" tint={HC.green}/>
              <div style={{height:1, background:HC.divider}}/>
              <EC_EventLine dag="Tir" tid="19:30" title="Bokklubb" venue="Bokhuset · 5 kommer" tint={HC.plum}/>
            </div>
          </div>

          <div style={{padding:'26px 22px 0'}}>
            <button style={{
              width:'100%', padding:'14px', borderRadius:22, border:'none',
              background:HC.fg, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
              fontFamily:'inherit',
            }}>
              Tilbake til Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
        <EC_Header time="14:23" eyebrow="Avbestill" title="Vi skjønner. Livet skjer." onBack={()=>{}}/>

        {/* Event som avbestilles */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:14, padding:'14px 16px',
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', color:HC.coral}}>TOR 23. APR · 19:00</div>
            <div style={{fontSize:15, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-0.01em'}}>
              Vinsmaking med Martine
            </div>
            <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>
              Søstrene Karlsen · Plass #3
            </div>
          </div>
        </div>

        {/* Refusjonspolicy — tydelig og rolig */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            Refusjon
          </div>
          <div style={{
            background: beforeCutoff ? `${HC.green}0e` : `${HC.amber}10`,
            border:`1px solid ${beforeCutoff ? HC.green : HC.amber}40`,
            borderRadius:14, padding:'16px 18px',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{
                width:8, height:8, borderRadius:4,
                background: beforeCutoff ? HC.green : HC.amber,
              }}/>
              <div style={{
                fontSize:13, fontWeight:700, color: beforeCutoff ? HC.green : HC.amber,
              }}>
                {beforeCutoff ? 'Du får hele beløpet tilbake' : 'Ingen refusjon denne gangen'}
              </div>
            </div>
            <p style={{margin:'8px 0 0', fontSize:12.5, lineHeight:1.55, color:HC.fg}}>
              {beforeCutoff
                ? 'Avbestillinger før klokka 17:00 samme dag er gratis. Du avbestiller nå kl 14:23 — det går fint.'
                : 'Etter klokka 17:00 samme dag betaler vi vertinnen uansett. Plassen din frigjøres så noen andre kan få den.'}
            </p>

            {/* Tidslinje */}
            <div style={{marginTop:14, padding:'12px 0 0', borderTop:`1px dashed ${HC.divider}`}}>
              <div style={{position:'relative', height:28}}>
                <div style={{position:'absolute', top:13, left:0, right:0, height:2, background:HC.divider, borderRadius:1}}/>
                <div style={{position:'absolute', top:13, left:0, width: beforeCutoff ? '45%' : '100%', height:2, background:beforeCutoff ? HC.green : HC.amber, borderRadius:1}}/>
                {/* Nå-punkt */}
                <div style={{position:'absolute', top:9, left: beforeCutoff ? '45%' : '60%', transform:'translateX(-50%)'}}>
                  <div style={{width:10, height:10, borderRadius:5, background:beforeCutoff ? HC.green : HC.amber, border:'2px solid #fff', boxShadow:'0 1px 3px rgba(42,33,52,.15)'}}/>
                </div>
                {/* Cutoff */}
                <div style={{position:'absolute', top:9, left:'72%', transform:'translateX(-50%)'}}>
                  <div style={{width:10, height:10, borderRadius:5, background:HC.fgDim, border:'2px solid #fff'}}/>
                </div>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:10.5, color:HC.fgDim, marginTop:4}}>
                <span>Nå · 14:23</span>
                <span>Frist · 17:00</span>
                <span>Event · 19:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frivillig årsak */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:4}}>
            Frivillig
          </div>
          <div style={{fontSize:13, color:HC.fg, marginBottom:10}}>
            Ønsker du å dele hvorfor? Det hjelper oss å bli bedre.
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {reasons.map(r => (
              <button key={r} onClick={()=>setReason(reason === r ? '' : r)} style={{
                padding:'8px 14px', borderRadius:18, border:'none',
                background: reason === r ? HC.plum : HC.card,
                color: reason === r ? '#fff' : HC.fg,
                fontSize:12.5, fontWeight:600, cursor:'pointer',
                boxShadow: reason === r ? '0 3px 10px rgba(127,77,149,.25)' : '0 1px 3px rgba(42,33,52,.04)',
                fontFamily:'inherit',
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'28px 22px 0', display:'grid', gap:10}}>
          <button onClick={()=>setStep('done')} style={{
            width:'100%', padding:'14px', borderRadius:22, border:'none',
            background: beforeCutoff ? HC.fg : HC.coralDeep,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            fontFamily:'inherit',
          }}>
            {beforeCutoff ? 'Avbestill og få refusjon' : 'Avbestill uten refusjon'}
          </button>
          <button style={{
            width:'100%', padding:'12px', borderRadius:22, border:'none',
            background:'transparent', color:HC.fgDim, fontSize:13, fontWeight:600, cursor:'pointer',
            fontFamily:'inherit',
          }}>
            Nei, jeg blir med likevel
          </button>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenCancel = ScreenCancel;

// ============================================================================
// 3) Event fullt — venteliste + alternativer
// ============================================================================

function ScreenWaitlist() {
  const [joined, setJoined] = React.useState(false);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
        <EC_Header time="14:23" eyebrow="Fullt" title="Denne kvelden er full." onBack={()=>{}}/>

        <div style={{padding:'10px 24px 0'}}>
          <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Det er godt nytt — mange ville med. Du kan stille deg på venteliste, eller finne en annen kveld.
          </p>
        </div>

        {/* Event-kort med "FULLT" badge */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, overflow:'hidden',
            boxShadow:'0 2px 10px rgba(42,33,52,.06)',
            position:'relative',
          }}>
            <div style={{padding:'14px 18px 12px', background:`${HC.fgDim}0c`, borderBottom:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:HC.fgDim}}>TOR 23. APR · 19:00</div>
              <div style={{
                padding:'3px 9px', borderRadius:12, background:HC.fgDim, color:'#fff',
                fontSize:10, fontWeight:700, letterSpacing:'.08em',
              }}>
                FULLT
              </div>
            </div>
            <div style={{padding:'16px 18px 16px'}}>
              <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>Vinsmaking med Martine</div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:3}}>Søstrene Karlsen · Martine L.</div>
              <div style={{display:'flex', alignItems:'center', gap:16, marginTop:12, paddingTop:12, borderTop:`1px dashed ${HC.divider}`, fontSize:11.5, color:HC.fgDim}}>
                <span>6 av 6 plasser tatt</span>
                <span style={{opacity:.5}}>·</span>
                <span>{joined ? 'Du er #2 i køen' : '4 på venteliste'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Venteliste-CTA */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background: joined ? `${HC.green}10` : HC.cream,
            border:`1px solid ${joined ? HC.green + '40' : HC.divider}`,
            borderRadius:14, padding:'16px 18px',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{
                width:38, height:38, borderRadius:19,
                background: joined ? `${HC.green}20` : `${HC.plum}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {joined ? (
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8l4 4 7-8" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={HC.plum} strokeWidth="1.4"/><path d="M8 5v4l2 1" stroke={HC.plum} strokeWidth="1.4" strokeLinecap="round"/></svg>
                )}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>
                  {joined ? 'Du står på venteliste' : 'Få beskjed hvis en plass åpner seg'}
                </div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.5}}>
                  {joined
                    ? 'Vi varsler deg med en gang noen gir fra seg plassen. Ingen kortbelastning nå.'
                    : 'Varsel i appen + SMS. Du betaler kun hvis du får plass og takker ja.'}
                </div>
              </div>
            </div>
            {!joined && (
              <button onClick={()=>setJoined(true)} style={{
                marginTop:14, width:'100%', padding:'12px', borderRadius:22, border:'none',
                background:HC.plum, color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer',
                fontFamily:'inherit',
              }}>
                Sett meg på venteliste
              </button>
            )}
            {joined && (
              <button style={{
                marginTop:14, width:'100%', padding:'12px', borderRadius:22, border:'none',
                background:'rgba(255,255,255,.7)', color:HC.fg, fontSize:13, fontWeight:600, cursor:'pointer',
                fontFamily:'inherit',
              }}>
                Ta meg av venteliste
              </button>
            )}
          </div>
        </div>

        {/* Alternativer samme kveld */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Samme kveld — ledig plass
            </div>
            <span style={{fontSize:12, color:HC.fgDim, fontWeight:600}}>3 stk</span>
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { dag:'Tor', tid:'19:00', title:'Brettspillkveld', venue:'Trekroneren · 3 plasser igjen', tint:HC.coral },
              { dag:'Tor', tid:'19:30', title:'Jazzklubb', venue:'Antikvariatet · 5 plasser igjen', tint:HC.plum },
              { dag:'Tor', tid:'20:00', title:'Søndagskaffe-klubb', venue:'Jacobsen & Svart · 2 plasser', tint:HC.amber },
            ].map((e, i, arr) => (
              <div key={i}>
                <EC_EventLine {...e}/>
                {i < arr.length - 1 && <div style={{height:1, background:HC.divider}}/>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenWaitlist = ScreenWaitlist;

// ============================================================================
// 4) Sen ankomst — "jeg kommer for sent"
// ============================================================================

function ScreenLateArrival() {
  const [eta, setEta] = React.useState(15); // minutter
  const [sent, setSent] = React.useState(false);

  const etaOptions = [5, 10, 15, 20, 30];

  if (sent) {
    return (
      <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
        <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
          <EC_Header time="19:08" eyebrow="Meldt fra" title="Martine vet du er på vei."/>

          <div style={{padding:'10px 24px 0'}}>
            <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
              Pust rolig. Martine tar imot deg uansett — hun holder plassen din varm.
            </p>
          </div>

          {/* Meldingsboble — hva som ble sendt */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:8}}>
              Dette fikk Martine
            </div>
            <div style={{
              background:HC.card, borderRadius:14, padding:'14px 16px',
              boxShadow:'0 1px 6px rgba(42,33,52,.05)',
              position:'relative',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
                <div style={{width:32, height:32, borderRadius:16, background:'linear-gradient(135deg,#E8B8A0,#B5694A)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:12}}>M</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>Martine L.</div>
                  <div style={{fontSize:10.5, color:HC.fgDim}}>Vertinne · Søstrene Karlsen</div>
                </div>
              </div>
              <div style={{
                background:`${HC.plum}10`, borderRadius:12, padding:'12px 14px',
                fontSize:13, lineHeight:1.55, color:HC.fg,
              }}>
                Hei Martine — Viktor her. Jeg er dessverre forsinket med ca. {eta} min.
                Beklager! Jeg kommer så fort jeg kan.
              </div>
              <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:8, textAlign:'right'}}>
                Sendt kl 19:08 · Levert
              </div>
            </div>
          </div>

          {/* Trygghetsmelding */}
          <div style={{padding:'22px 22px 0'}}>
            <div style={{
              background:`${HC.green}0e`,
              border:`1px solid ${HC.green}40`,
              borderRadius:14, padding:'14px 16px',
              display:'flex', alignItems:'flex-start', gap:12,
            }}>
              <div style={{width:32, height:32, borderRadius:16, background:`${HC.green}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l3 3 7-7" stroke={HC.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{fontSize:13, lineHeight:1.55, color:HC.fg}}>
                <b>Plassen er din.</b> Vi venter ikke med å begynne, men Martine sier ifra til de andre og viser deg rett inn når du kommer.
              </div>
            </div>
          </div>

          {/* Veibeskrivelse + oppdater */}
          <div style={{padding:'22px 22px 0', display:'grid', gap:10}}>
            <button style={{
              padding:'14px 16px', borderRadius:14, border:'none',
              background:HC.card, color:HC.fg, fontSize:14, fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', gap:12, textAlign:'left',
              boxShadow:'0 1px 4px rgba(42,33,52,.05)',
              fontFamily:'inherit',
            }}>
              <div style={{width:36, height:36, borderRadius:10, background:`${HC.coral}1c`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 14s-5-4.5-5-8a5 5 0 0110 0c0 3.5-5 8-5 8z" fill="none" stroke={HC.coral} strokeWidth="1.4"/><circle cx="8" cy="6" r="1.6" fill={HC.coral}/></svg>
              </div>
              <div style={{flex:1}}>
                <div>Åpne veibeskrivelse</div>
                <div style={{fontSize:11, color:HC.fgDim, fontWeight:500, marginTop:1}}>Fjordgata 7 · 8 min i bil</div>
              </div>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <button onClick={()=>setSent(false)} style={{
              padding:'12px 16px', borderRadius:22, border:'none',
              background:'transparent', color:HC.fgDim, fontSize:13, fontWeight:600, cursor:'pointer',
              fontFamily:'inherit',
            }}>
              Oppdater ETA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
        <EC_Header time="19:08" eyebrow="På vei" title="Forsinket? Det går bra." onBack={()=>{}}/>

        <div style={{padding:'10px 24px 0'}}>
          <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Gi Martine en rask beskjed — så slipper du å stresse og hun vet hvor lenge hun skal holde plassen.
          </p>
        </div>

        {/* Eventet nå */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:14, padding:'14px 16px',
            boxShadow:'0 1px 8px rgba(42,33,52,.04)',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:12, background:`${HC.coral}18`, color:HC.coral, fontSize:10, fontWeight:700, letterSpacing:'.06em', width:'fit-content'}}>
              <span style={{width:6, height:6, borderRadius:3, background:HC.coral}}/>
              STARTET 19:00
            </div>
            <div style={{fontSize:15, fontWeight:700, color:HC.fg, marginTop:8, letterSpacing:'-0.01em'}}>
              Vinsmaking med Martine
            </div>
            <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>
              Søstrene Karlsen · Du har plass #3
            </div>
          </div>
        </div>

        {/* ETA-velger */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Hvor lenge til?
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:8}}>
            {etaOptions.map(min => (
              <button key={min} onClick={()=>setEta(min)} style={{
                padding:'14px 0', borderRadius:14, border:'none',
                background: eta === min ? HC.plum : HC.card,
                color: eta === min ? '#fff' : HC.fg,
                fontSize:14, fontWeight:700, cursor:'pointer',
                boxShadow: eta === min ? '0 4px 12px rgba(127,77,149,.25)' : '0 1px 3px rgba(42,33,52,.05)',
                fontFamily:'inherit',
                display:'flex', flexDirection:'column', alignItems:'center', gap:2,
              }}>
                <span style={{fontSize:15}}>{min}</span>
                <span style={{fontSize:10, fontWeight:500, opacity: eta === min ? .8 : .6}}>min</span>
              </button>
            ))}
          </div>
        </div>

        {/* Forhåndsvisning av meldingen */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:8}}>
            Vi sender dette til Martine
          </div>
          <div style={{
            background:`${HC.plum}10`, borderRadius:12, padding:'14px 16px',
            fontSize:13, lineHeight:1.6, color:HC.fg,
          }}>
            Hei Martine — Viktor her. Jeg er dessverre forsinket med ca. <b>{eta} min</b>.
            Beklager! Jeg kommer så fort jeg kan.
          </div>
        </div>

        {/* Trygghet */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'flex-start', gap:12,
          }}>
            <div style={{width:28, height:28, borderRadius:14, background:`${HC.green}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l2.5 2.5L10 3" stroke={HC.green} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{fontSize:12.5, lineHeight:1.55, color:HC.fg}}>
              Martine tar imot deg uansett. Du mister ikke plassen selv om du kommer 30 min ut i kvelden.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'28px 22px 0'}}>
          <button onClick={()=>setSent(true)} style={{
            width:'100%', padding:'14px', borderRadius:22, border:'none',
            background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            boxShadow:`0 6px 16px ${HC.coral}30`,
            fontFamily:'inherit',
          }}>
            Gi beskjed til Martine
          </button>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenLateArrival = ScreenLateArrival;

// ============================================================================
// 5) Ambassadør har avlyst — varsel til deltakere
// ============================================================================

function ScreenAmbassadorCancelled() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:30}}>
        <EC_Header time="15:41" eyebrow="Avlyst" title="Martine klarte ikke i kveld."/>

        <div style={{padding:'10px 24px 0'}}>
          <p style={{margin:0, fontSize:14.5, lineHeight:1.55, color:HC.fgDim}}>
            Det kan skje. Hun har bedt oss si unnskyld og hilse. Pengene er allerede på vei tilbake til deg.
          </p>
        </div>

        {/* Avlyst event */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:16, overflow:'hidden',
            boxShadow:'0 2px 10px rgba(42,33,52,.06)',
            position:'relative',
          }}>
            <div style={{padding:'14px 18px 12px', background:`${HC.fgDim}0c`, borderBottom:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:HC.fgDim, textDecoration:'line-through', opacity:.7}}>
                TOR 23. APR · 19:00
              </div>
              <div style={{
                padding:'3px 9px', borderRadius:12, background:HC.fgDim, color:'#fff',
                fontSize:10, fontWeight:700, letterSpacing:'.08em',
              }}>
                AVLYST
              </div>
            </div>
            <div style={{padding:'16px 18px 16px'}}>
              <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em', opacity:.75}}>
                Vinsmaking med Martine
              </div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:3}}>
                Søstrene Karlsen · Martine L.
              </div>

              {/* Martines hilsen */}
              <div style={{
                marginTop:14, padding:'12px 14px', borderRadius:12,
                background:`${HC.coral}10`, border:`1px solid ${HC.coral}25`,
              }}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <div style={{width:28, height:28, borderRadius:14, background:'linear-gradient(135deg,#E8B8A0,#B5694A)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:11}}>M</div>
                  <div style={{fontSize:11.5, fontWeight:700, color:HC.fg}}>Hilsen fra Martine</div>
                </div>
                <div style={{fontSize:12.5, lineHeight:1.55, color:HC.fg, fontStyle:'italic'}}>
                  "Så leit. Jeg er blitt syk og orker ikke å være vertinne i kveld. Håper dere finner en annen kveld — jeg setter opp en ny vinkveld neste uke."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refusjon-status */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:`${HC.green}0e`,
            border:`1px solid ${HC.green}40`,
            borderRadius:14, padding:'14px 18px',
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{width:40, height:40, borderRadius:20, background:`${HC.green}20`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M3 9l4 4 8-8" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.green}}>
                Full refusjon startet
              </div>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:2}}>
                249 kr tilbake på Vipps · 2–3 dager
              </div>
            </div>
          </div>
        </div>

        {/* Alternativer samme kveld */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Andre kvelder samme dag
            </div>
            <span style={{fontSize:12, color:HC.fgDim, fontWeight:600}}>3 stk</span>
          </div>
          <p style={{margin:'0 0 10px', fontSize:12.5, lineHeight:1.55, color:HC.fgDim}}>
            Om du har lyst å ut likevel — her er det som går av stabelen torsdag kveld.
          </p>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { dag:'Tor', tid:'19:00', title:'Brettspillkveld', venue:'Trekroneren · Henrik A.', tint:HC.coral },
              { dag:'Tor', tid:'19:30', title:'Jazzklubb', venue:'Antikvariatet · Ingrid R.', tint:HC.plum },
              { dag:'Tor', tid:'20:00', title:'Kveldsmat-klubb', venue:'Jacobsen & Svart · Anja S.', tint:HC.amber },
            ].map((e, i, arr) => (
              <div key={i}>
                <EC_EventLine {...e}/>
                {i < arr.length - 1 && <div style={{height:1, background:HC.divider}}/>}
              </div>
            ))}
          </div>
        </div>

        {/* Martines neste event */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:36, height:36, borderRadius:18, background:'linear-gradient(135deg,#E8B8A0,#B5694A)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:13}}>M</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum}}>Martines neste</div>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:2}}>Vinkveld tor 30. april · 19:00</div>
            </div>
            <button style={{
              padding:'7px 12px', borderRadius:18, border:'none',
              background:HC.plum, color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer',
              fontFamily:'inherit',
            }}>
              Reserver
            </button>
          </div>
        </div>

        {/* Tilbake-knapp */}
        <div style={{padding:'26px 22px 0'}}>
          <button style={{
            width:'100%', padding:'14px', borderRadius:22, border:`1px solid ${HC.divider}`,
            background:'transparent', color:HC.fg, fontSize:14, fontWeight:600, cursor:'pointer',
            fontFamily:'inherit',
          }}>
            Tilbake til Events
          </button>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenAmbassadorCancelled = ScreenAmbassadorCancelled;
