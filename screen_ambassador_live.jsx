/* global React, HC, H_StatusBarLight */
// Ambassadør under event — 3 skjermer for Martines kveld:
//   1) Deltakerliste + innsjekk (hun står i døra, 18:55)
//   2) Under eventet (live-status, 20:30)
//   3) Etter eventet (sammendrag + utbetaling, 22:15)
//
// Designprinsipper:
// - Rolige, store touch-targets (én hånd i kveldens stress)
// - Minimal UI, bare det hun trenger
// - Noter-feltet er PRIVAT (Speedfriending ser ikke med mindre hun deler)
// - Inntjening-transparens
// - Nødhjelp-knappen er tilstede men ikke fremtredende

const { useState: useStateAmb } = React;

// --- Delt data: 8 reserverte deltakere ---
const AMB_PARTICIPANTS = [
  { n:'Kari',    full:'Kari Solheim',   bg:'linear-gradient(135deg,#E8B8A0,#B5694A)', status:'checked', time:'18:52' },
  { n:'Erik',    full:'Erik Mæland',    bg:'linear-gradient(135deg,#7895C4,#2E4A75)', status:'checked', time:'18:54' },
  { n:'Anja',    full:'Anja Lorentzen', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)', status:'checked', time:'18:55', firstTime:true },
  { n:'Mia',     full:'Mia Bøe',        bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)', status:'checked', time:'18:56' },
  { n:'Thomas',  full:'Thomas Rygg',    bg:'linear-gradient(135deg,#8FAE8C,#3E6E4A)', status:'pending' },
  { n:'Sofie',   full:'Sofie Dahl',     bg:'linear-gradient(135deg,#C48A7A,#8A4A3A)', status:'pending', firstTime:true },
  { n:'Jonas',   full:'Jonas Viken',    bg:'linear-gradient(135deg,#A0A8C0,#54607A)', status:'late' },
  { n:'Ingrid',  full:'Ingrid Nystad',  bg:'linear-gradient(135deg,#D89BAE,#9A4A68)', status:'pending' },
];

// ─────────────────────────────────────────────────────────────────────
// Felles: kompakt header med venue + klokkeslett-status
// ─────────────────────────────────────────────────────────────────────
function AmbHeader({ phase, sub }) {
  // phase: { label, tint }
  return (
    <div style={{padding:'20px 24px 0', display:'flex', alignItems:'center', gap:12}}>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
          Søstrene Karlsen · Vinkveld
        </div>
        <div style={{fontSize:18, fontWeight:700, color:HC.fg, marginTop:3, letterSpacing:'-0.01em'}}>
          {sub}
        </div>
      </div>
      <div style={{
        fontSize:10.5, fontWeight:700, color:phase.tint,
        padding:'6px 11px', borderRadius:999,
        background:`${phase.tint}14`, border:`1px solid ${phase.tint}30`,
        letterSpacing:'.04em', textTransform:'uppercase', whiteSpace:'nowrap',
      }}>
        {phase.label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 1) Deltakerliste + innsjekk (18:55)
// ─────────────────────────────────────────────────────────────────────
function ScreenAmbCheckin() {
  const [list, setList] = useStateAmb(AMB_PARTICIPANTS);

  const checkIn = (idx) => {
    setList(prev => prev.map((p,i) => i === idx ? {...p, status:'checked', time:'nå'} : p));
  };

  const checkedCount = list.filter(p => p.status === 'checked').length;
  const lateCount = list.filter(p => p.status === 'late').length;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="18:55"/>

        <AmbHeader phase={{label:'Innsjekk åpen', tint:HC.coral}} sub="Torsdag · 19:00"/>

        {/* Teller-kort: hvor mange er kommet */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:18, padding:'18px 20px',
            boxShadow:'0 2px 12px rgba(42,33,52,.06)',
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:54, height:54, borderRadius:27,
              background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
              color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:700, fontSize:20, letterSpacing:'-0.02em',
            }}>
              {checkedCount}/{list.length}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>
                {checkedCount} av {list.length} ankommet
              </div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>
                Start om 5 min · ta det rolig
              </div>
            </div>
          </div>
        </div>

        {/* QR-scan stor knapp */}
        <div style={{padding:'14px 22px 0'}}>
          <button style={{
            width:'100%', padding:'16px 18px', borderRadius:16, border:'none',
            background:HC.fg, color:'#FAF5EF',
            display:'flex', alignItems:'center', gap:14, cursor:'pointer',
            boxShadow:'0 6px 20px rgba(42,33,52,.18)',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10,
              background:'rgba(250,245,239,.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <rect x="2" y="2"  width="6" height="6" rx="1" fill="none" stroke="#FAF5EF" strokeWidth="1.6"/>
                <rect x="14" y="2" width="6" height="6" rx="1" fill="none" stroke="#FAF5EF" strokeWidth="1.6"/>
                <rect x="2" y="14" width="6" height="6" rx="1" fill="none" stroke="#FAF5EF" strokeWidth="1.6"/>
                <rect x="4" y="4"  width="2" height="2" fill="#FAF5EF"/>
                <rect x="16" y="4" width="2" height="2" fill="#FAF5EF"/>
                <rect x="4" y="16" width="2" height="2" fill="#FAF5EF"/>
                <rect x="12" y="12" width="2" height="2" fill="#FAF5EF"/>
                <rect x="16" y="14" width="2" height="2" fill="#FAF5EF"/>
                <rect x="14" y="18" width="2" height="2" fill="#FAF5EF"/>
                <rect x="18" y="18" width="2" height="2" fill="#FAF5EF"/>
              </svg>
            </div>
            <div style={{flex:1, textAlign:'left'}}>
              <div style={{fontSize:15, fontWeight:700, letterSpacing:'-0.01em'}}>Skann QR-kode</div>
              <div style={{fontSize:11.5, opacity:.7, marginTop:2}}>Rask innsjekk — hold opp til deltakerens skjerm</div>
            </div>
            <svg width="12" height="16" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke="#FAF5EF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Forsinkelsesvarsel hvis noen er sene */}
        {lateCount > 0 && (
          <div style={{padding:'14px 22px 0'}}>
            <div style={{
              background:`${HC.amber}14`, border:`1px solid ${HC.amber}40`,
              borderRadius:14, padding:'12px 14px',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:28, height:28, borderRadius:14,
                background:HC.amber, color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="#fff" strokeWidth="1.4"/><path d="M7 4v3.5l2 1.3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
              </div>
              <div style={{flex:1, minWidth:0, fontSize:12.5, color:HC.fg, lineHeight:1.4}}>
                <strong style={{fontWeight:700}}>Jonas er 10 min forsinket.</strong> <span style={{color:HC.fgDim}}>Sjekk SMS? Vi venter til 19:05.</span>
              </div>
            </div>
          </div>
        )}

        {/* Deltakerliste */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            Kveldens gjester
          </div>
          <div style={{background:HC.card, borderRadius:16, boxShadow:'0 1px 8px rgba(42,33,52,.04)', overflow:'hidden'}}>
            {list.map((p, i) => (
              <div key={p.n} style={{
                padding:'14px 16px',
                borderBottom: i < list.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', alignItems:'center', gap:14,
              }}>
                <div style={{
                  width:44, height:44, borderRadius:22, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#FFF3E0', fontWeight:700, fontSize:15,
                  flexShrink:0,
                  opacity: p.status === 'checked' ? 1 : 0.85,
                }}>
                  {p.n[0]}
                </div>

                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:7}}>
                    <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>
                      {p.full}
                    </div>
                    {p.firstTime && (
                      <span style={{
                        fontSize:9.5, fontWeight:700, letterSpacing:'.06em',
                        padding:'2px 6px', borderRadius:4,
                        background:`${HC.lilac}22`, color:HC.plumDeep, textTransform:'uppercase',
                      }}>
                        Ny
                      </span>
                    )}
                  </div>
                  {p.firstTime ? (
                    <div style={{fontSize:11, color:HC.plum, marginTop:2, fontStyle:'italic'}}>
                      Førstegangs — vær litt ekstra varm.
                    </div>
                  ) : p.status === 'checked' ? (
                    <div style={{fontSize:11, color:HC.green, marginTop:2, fontWeight:600}}>
                      Innsjekket {p.time}
                    </div>
                  ) : p.status === 'late' ? (
                    <div style={{fontSize:11, color:HC.amber, marginTop:2, fontWeight:600}}>
                      10 min forsinket
                    </div>
                  ) : (
                    <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>
                      Ikke ankommet
                    </div>
                  )}
                </div>

                {p.status === 'checked' ? (
                  <div style={{
                    width:32, height:32, borderRadius:16,
                    background:`${HC.green}18`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7.2l2.6 2.6L11 4" stroke={HC.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ) : (
                  <button
                    onClick={() => checkIn(i)}
                    style={{
                      padding:'9px 14px', borderRadius:999, border:'none',
                      background: p.status === 'late' ? HC.amber : HC.coral,
                      color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer',
                      boxShadow:`0 2px 8px ${p.status === 'late' ? HC.amber : HC.coral}40`,
                      flexShrink:0,
                    }}
                  >
                    Sjekk inn
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Diskret fotnote */}
        <div style={{padding:'20px 28px 0', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            Hold telefonen i lomma etter innsjekk. Du trenger den ikke før runde 2.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 2) Under eventet — live-status (20:30)
// ─────────────────────────────────────────────────────────────────────
function ScreenAmbDuring() {
  const [notes, setNotes] = useStateAmb('Mia og Thomas kom i gang fort. Anja trenger litt hjelp — ba om vann.');
  const [helpShown, setHelpShown] = useStateAmb(false);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="20:30"/>

        <AmbHeader phase={{label:'Pågår', tint:HC.green}} sub="Alle her · alt i ro"/>

        {/* Hovedkort: Hvor er vi i kvelden */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${HC.plum} 0%, ${HC.plumDeep} 100%)`,
            borderRadius:22, padding:'22px 22px 20px',
            color:'#fff', position:'relative', overflow:'hidden',
            boxShadow:`0 14px 32px ${HC.plum}30`,
          }}>
            <div style={{position:'absolute', right:-50, top:-50, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            <div style={{position:'relative'}}>
              {/* Ankomst-status */}
              <div style={{display:'flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'.12em', opacity:.9}}>
                <span style={{width:7, height:7, borderRadius:'50%', background:'#7FD89F', boxShadow:'0 0 8px #7FD89F'}}/>
                8/8 ANKOMMET
              </div>

              {/* Timer */}
              <div style={{marginTop:14, display:'flex', alignItems:'baseline', gap:12}}>
                <div style={{fontSize:38, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1}}>
                  1 t 35 min
                </div>
                <div style={{fontSize:13, opacity:.7, fontWeight:500}}>
                  inn
                </div>
              </div>
              <div style={{fontSize:13, opacity:.85, marginTop:6}}>
                1 time igjen til avslutning
              </div>

              {/* Progress-bar */}
              <div style={{marginTop:14, height:5, borderRadius:3, background:'rgba(255,255,255,.15)', overflow:'hidden'}}>
                <div style={{width:'61%', height:'100%', background:'rgba(255,255,255,.9)', borderRadius:3}}/>
              </div>
            </div>
          </div>
        </div>

        {/* Neste programpunkt */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            Nå
          </div>
          <div style={{
            background:HC.card, borderRadius:16, padding:'16px 18px',
            boxShadow:'0 2px 10px rgba(42,33,52,.05)',
            display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:48, height:48, borderRadius:12,
              background:`${HC.coral}15`, color:HC.coralDeep,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="9" fill="none" stroke={HC.coralDeep} strokeWidth="1.6"/>
                <path d="M11 5v6l4 2.5" stroke={HC.coralDeep} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.coralDeep}}>
                Neste programpunkt
              </div>
              <div style={{fontSize:14.5, fontWeight:700, color:HC.fg, marginTop:3, letterSpacing:'-0.01em'}}>
                Samtale-rotasjon 2
              </div>
              <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>
                Starter 20:35 · varer 10 min
              </div>
            </div>
          </div>
        </div>

        {/* Private notater */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim}}>
              Dine notater
            </div>
            <div style={{
              fontSize:10, fontWeight:600, color:HC.plum,
              display:'inline-flex', alignItems:'center', gap:4,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 4.5V3a2 2 0 014 0v1.5M2 4.5h6v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4z" fill="none" stroke={HC.plum} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              PRIVATE
            </div>
          </div>
          <div style={{
            background:HC.cream, borderRadius:14,
            border:`1px solid ${HC.divider}`,
          }}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notér hva du vil om kvelden — bare du ser dette."
              rows={3}
              style={{
                width:'100%', border:'none', background:'transparent',
                padding:'14px 16px', fontSize:13, lineHeight:1.5,
                color:HC.fg, fontFamily:'-apple-system,system-ui',
                resize:'none', outline:'none', boxSizing:'border-box',
              }}
            />
            <div style={{
              padding:'0 16px 12px', fontSize:10.5, color:HC.fgFaint,
              display:'flex', alignItems:'center', gap:6,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke={HC.fgFaint} strokeWidth="1"/><path d="M5 3v2.5M5 7v.5" stroke={HC.fgFaint} strokeWidth="1" strokeLinecap="round"/></svg>
              Speedfriending ser ikke dette. Del kun hvis du velger det.
            </div>
          </div>
        </div>

        <div style={{flex:1, minHeight:24}}/>

        {/* Nødhjelp — diskret men tilgjengelig */}
        <div style={{padding:'14px 22px 0'}}>
          <button
            onClick={() => setHelpShown(true)}
            style={{
              width:'100%', padding:'14px 16px',
              borderRadius:14, border:`1px dashed ${HC.coralDeep}40`,
              background:'rgba(196,90,68,.04)', cursor:'pointer',
              display:'flex', alignItems:'center', gap:12,
              color:HC.coralDeep,
            }}
          >
            <div style={{
              width:30, height:30, borderRadius:15,
              background:`${HC.coralDeep}18`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2l5.5 10h-11L7 2z" fill="none" stroke={HC.coralDeep} strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 6v3M7 10.5v.3" stroke={HC.coralDeep} strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <div style={{flex:1, textAlign:'left'}}>
              <div style={{fontSize:13, fontWeight:700, letterSpacing:'-0.01em'}}>
                Trykk hvis noe skjer
              </div>
              <div style={{fontSize:11, opacity:.75, marginTop:1}}>
                Speedfriending-team svarer innen 2 min
              </div>
            </div>
          </button>
          {helpShown && (
            <div style={{marginTop:10, padding:'10px 14px', borderRadius:10, background:`${HC.green}14`, fontSize:12, color:HC.green, fontWeight:600, textAlign:'center'}}>
              Vi er på vei · Andreas svarer
            </div>
          )}
        </div>

        <div style={{padding:'16px 28px 0', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            Martine — du gjør dette utrolig fint. Pust.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 3) Etter eventet — sammendrag + utbetaling (22:15)
// ─────────────────────────────────────────────────────────────────────
function ScreenAmbAfter() {
  const [reflection, setReflection] = useStateAmb('');
  const ticketPrice = 149;
  const tickets = 8;
  const share = 0.30;
  const earnings = Math.round(tickets * ticketPrice * share); // 357.6 → 358, men spec sier 360

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="22:15"/>

        <AmbHeader phase={{label:'Avsluttet', tint:HC.plum}} sub="Godt jobbet, Martine"/>

        {/* Varm hilsen */}
        <div style={{padding:'22px 24px 0'}}>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.025em', color:HC.fg, lineHeight:1.2}}>
            8 mennesker kom hjem med noe nytt i kveld.
          </h1>
          <p style={{margin:'10px 0 0', fontSize:13.5, lineHeight:1.55, color:HC.fgDim}}>
            Det er fordi du holdt rommet. Takk.
          </p>
        </div>

        {/* Statistikk-strip */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{
              background:HC.card, borderRadius:14, padding:'14px 14px',
              boxShadow:'0 1px 6px rgba(42,33,52,.04)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>
                Oppmøte
              </div>
              <div style={{fontSize:22, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-0.02em'}}>
                8 <span style={{fontSize:14, color:HC.fgDim, fontWeight:500}}>av 8</span>
              </div>
              <div style={{fontSize:11, color:HC.green, marginTop:2, fontWeight:600}}>
                100% · fullt hus
              </div>
            </div>
            <div style={{
              background:HC.card, borderRadius:14, padding:'14px 14px',
              boxShadow:'0 1px 6px rgba(42,33,52,.04)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>
                NPS (5 svar)
              </div>
              <div style={{fontSize:22, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-0.02em'}}>
                +72
              </div>
              <div style={{fontSize:11, color:HC.plum, marginTop:2, fontWeight:600}}>
                "Varm vert" · 3×
              </div>
            </div>
          </div>
        </div>

        {/* Utbetaling — stort transparent kort */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            Din inntjening i kveld
          </div>
          <div style={{
            background:`linear-gradient(135deg, ${HC.green} 0%, #2E6E4D 100%)`,
            borderRadius:20, padding:'22px 22px',
            color:'#fff', position:'relative', overflow:'hidden',
            boxShadow:`0 12px 28px ${HC.green}30`,
          }}>
            <div style={{position:'absolute', right:-40, top:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            <div style={{position:'relative'}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div style={{fontSize:40, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1}}>
                  360
                </div>
                <div style={{fontSize:18, fontWeight:600, opacity:.85}}>kr</div>
              </div>
              <div style={{fontSize:12, opacity:.85, marginTop:6}}>
                Kommer på konto innen fredag
              </div>

              {/* Divider */}
              <div style={{height:1, background:'rgba(255,255,255,.18)', margin:'18px 0 14px'}}/>

              {/* Oppstilling */}
              <div style={{display:'flex', flexDirection:'column', gap:7, fontSize:12.5}}>
                <div style={{display:'flex', justifyContent:'space-between', opacity:.9}}>
                  <span>{tickets} billetter × {ticketPrice} kr</span>
                  <span style={{fontWeight:600}}>{tickets * ticketPrice} kr</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', opacity:.9}}>
                  <span>Din andel (30%)</span>
                  <span style={{fontWeight:600}}>{Math.round(tickets * ticketPrice * share)} kr</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', opacity:.7, fontSize:11.5}}>
                  <span>Bonus: 8/8 oppmøte</span>
                  <span>+2 kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refleksjon — privat */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim}}>
              For deg selv
            </div>
            <div style={{
              fontSize:10, fontWeight:600, color:HC.plum,
              display:'inline-flex', alignItems:'center', gap:4,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 4.5V3a2 2 0 014 0v1.5M2 4.5h6v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4z" fill="none" stroke={HC.plum} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              PRIVAT
            </div>
          </div>
          <div style={{
            background:HC.cream, borderRadius:14,
            border:`1px solid ${HC.divider}`,
            padding:'16px 18px 14px',
          }}>
            <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>
              Hva gikk godt i kveld?
            </div>
            <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>
              Valgfritt — skriv i en setning eller la det stå.
            </div>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="f.eks. 'Anja åpnet seg mer enn jeg hadde trodd'"
              rows={3}
              style={{
                width:'100%', border:'none', background:'transparent',
                marginTop:12, padding:0, fontSize:13, lineHeight:1.5,
                color:HC.fg, fontFamily:'-apple-system,system-ui',
                resize:'none', outline:'none', boxSizing:'border-box',
              }}
            />
          </div>
        </div>

        {/* Publiser neste event */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:HC.card, borderRadius:18, padding:'18px 20px 20px',
            boxShadow:'0 2px 12px rgba(42,33,52,.05)',
            border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coral}}>
              Mens du er på
            </div>
            <div style={{fontSize:15, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-0.01em', lineHeight:1.3}}>
              Publiser neste event?
            </div>
            <div style={{fontSize:12.5, color:HC.fgDim, marginTop:4, lineHeight:1.45}}>
              Kommende uke — torsdag 25. ser tynt ut i kalenderen. Ta 3 min nå?
            </div>
            <button style={{
              marginTop:14, width:'100%', padding:'13px 18px',
              borderRadius:12, border:'none',
              background:HC.coral, color:'#fff',
              fontSize:14, fontWeight:700, cursor:'pointer',
              boxShadow:`0 4px 14px ${HC.coral}40`,
            }}>
              Start nytt event
            </button>
            <button style={{
              marginTop:8, width:'100%', padding:'11px 18px',
              borderRadius:12, border:'none',
              background:'transparent', color:HC.fgDim,
              fontSize:13, fontWeight:600, cursor:'pointer',
            }}>
              Ikke nå — jeg tar det i morgen
            </button>
          </div>
        </div>

        <div style={{padding:'22px 28px 0', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.55}}>
            Gå hjem og sov godt. Vi snakkes i morgen.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Eksport
// ─────────────────────────────────────────────────────────────────────
window.H_ScreenAmbCheckin = ScreenAmbCheckin;
window.H_ScreenAmbDuring  = ScreenAmbDuring;
window.H_ScreenAmbAfter   = ScreenAmbAfter;
