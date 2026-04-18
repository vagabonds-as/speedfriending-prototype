/* global React, HC, H_StatusBarLight */
// Avanserte features for v4.0: Tonight-mode (gruppe-swipe), Speedfriending Traveller,
// og AI-matching 2.0 (dybde-matching med Claude).
//
// Designprinsipper:
//  - Tonight-mode: leken, litt mer energi enn resten av appen
//  - Traveller: respektfull — "midlertidig besøkende", ikke "turist"
//  - AI-matching: transparent — brukeren skal se HVORFOR det matcher

// ═══════════════════════════════════════════════════════════════════════════
// Delte primitiver
// ═══════════════════════════════════════════════════════════════════════════

function A_Avatar({ name, bg, size = 36, ring, ringColor }) {
  const C = window.HC;
  const dim = size;
  return (
    <div style={{
      width:dim, height:dim, borderRadius:dim/2, background:bg,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#FFF3E0', fontWeight:700, fontSize:Math.round(dim*0.4),
      boxShadow: ring ? `0 0 0 2.5px ${ringColor || C.plum}` : '0 1px 3px rgba(42,33,52,.08)',
      flexShrink:0,
    }}>
      {name[0]}
    </div>
  );
}

function A_BackButton() {
  const C = window.HC;
  return (
    <button style={{
      width:40, height:40, borderRadius:20, border:'none',
      background:C.card, cursor:'pointer',
      display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow:'0 1px 4px rgba(42,33,52,.06)',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L3 7l6 5" stroke={C.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

function A_Kicker({ children, color }) {
  const C = window.HC;
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color: color || C.plum}}>
      {children}
    </div>
  );
}

// Palett for venner (brukt på tvers av skjermene)
const FRIENDS = {
  Viktor: 'linear-gradient(135deg,#D4A85C,#8A5A3B)',
  Kari:   'linear-gradient(135deg,#E8B8A0,#B5694A)',
  Erik:   'linear-gradient(135deg,#7895C4,#2E4A75)',
  Anja:   'linear-gradient(135deg,#B890D4,#6A3F8A)',
};

// ═══════════════════════════════════════════════════════════════════════════
// 1) TONIGHT START — Viktor oppretter en Tonight-session og inviterer 3 venner
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTonightStart() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      {/* Leken bakgrunn — litt mer energi */}
      <div style={{position:'absolute', top:-60, right:-80, width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${C.coral}22 0%, transparent 70%)`, pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:120, left:-60, width:220, height:220, borderRadius:'50%', background:`radial-gradient(circle, ${C.plum}18 0%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="18:04"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker color={C.coral}>Tonight-mode</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Hero — leken spark */}
        <div style={{padding:'18px 24px 0'}}>
          <div style={{fontSize:34, lineHeight:1, marginBottom:14}}>
            <span role="img" aria-label="kveld">✨</span>
          </div>
          <h1 style={{margin:0, fontSize:28, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.15}}>
            Hva skal vi gjøre<br/>i kveld?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim, maxWidth:320}}>
            Du og vennene dine swiper samtidig. Den første aktiviteten alle sier ja til — vinner.
          </p>
        </div>

        {/* Timer-bar */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:`linear-gradient(135deg, ${C.coral} 0%, ${C.plum} 100%)`,
            borderRadius:18, padding:'16px 20px', color:'#fff',
            boxShadow:`0 10px 24px ${C.coral}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            <div style={{position:'relative', display:'flex', alignItems:'center', gap:14}}>
              <div style={{
                width:46, height:46, borderRadius:23, background:'rgba(255,255,255,.18)',
                display:'flex', alignItems:'center', justifyContent:'center',
                backdropFilter:'blur(10px)',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <circle cx="11" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="1.8"/>
                  <path d="M11 7v5l3 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <path d="M8 2h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', opacity:.88, textTransform:'uppercase'}}>Decision window</div>
                <div style={{fontSize:20, fontWeight:700, marginTop:2, letterSpacing:'-0.01em'}}>10:00 minutter</div>
              </div>
            </div>
          </div>
        </div>

        {/* Invitér venner */}
        <div style={{padding:'26px 22px 0'}}>
          <A_Kicker>Inviter gjengen</A_Kicker>
          <div style={{marginTop:12, background:C.card, borderRadius:16, padding:'6px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { n:'Kari', sub:'Online nå · svarer raskt',     invited:true,  bg:FRIENDS.Kari },
              { n:'Erik', sub:'Online nå',                    invited:true,  bg:FRIENDS.Erik },
              { n:'Anja', sub:'Sist aktiv for 4 min siden',   invited:true,  bg:FRIENDS.Anja },
              { n:'Sofie', sub:'Offline — svarer kanskje ikke', invited:false, bg:'linear-gradient(135deg,#A8B890,#5E7A45)' },
            ].map((p, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${C.divider}` : 'none',
              }}>
                <A_Avatar name={p.n} bg={p.bg} size={40}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:700, color:C.fg}}>{p.n}</div>
                  <div style={{fontSize:11.5, color:C.fgDim, marginTop:1}}>{p.sub}</div>
                </div>
                {p.invited ? (
                  <div style={{
                    padding:'6px 12px', borderRadius:14,
                    background:`${C.coral}16`, color:C.coralDeep,
                    fontSize:11.5, fontWeight:700,
                  }}>Invitert</div>
                ) : (
                  <button style={{
                    padding:'6px 14px', borderRadius:14, border:`1px solid ${C.divider}`,
                    background:C.card, color:C.fgDim,
                    fontSize:11.5, fontWeight:700, cursor:'pointer',
                  }}>+ legg til</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Radius + hint */}
        <div style={{padding:'22px 22px 0'}}>
          <A_Kicker>Hvor</A_Kicker>
          <div style={{marginTop:12, background:C.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${C.divider}`, display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, borderRadius:18, background:`${C.plum}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 16c4-5 6-8 6-11a6 6 0 10-12 0c0 3 2 6 6 11z" fill="none" stroke={C.plum} strokeWidth="1.6"/><circle cx="9" cy="5" r="2" fill={C.plum}/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>Innenfor 3 km fra Grünerløkka</div>
              <div style={{fontSize:11.5, color:C.fgDim, marginTop:1}}>5 aktiviteter kuratert for dere</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={C.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'28px 22px 8px'}}>
          <button style={{
            width:'100%', padding:'16px', borderRadius:16, border:'none',
            background:`linear-gradient(135deg, ${C.coral} 0%, ${C.plum} 100%)`,
            color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
            letterSpacing:'-0.01em',
            boxShadow:`0 8px 20px ${C.coral}35`,
          }}>
            Start Tonight-session →
          </button>
          <p style={{margin:'14px 20px 0', fontSize:11.5, color:C.fgFaint, textAlign:'center', lineHeight:1.5}}>
            Vennene dine får push-varsel. Når alle tre har svart, starter swipe-runden.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2) TONIGHT SWIPE — Live gruppe-swipe med 4 personer og 5 aktiviteter
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTonightSwipe() {
  const C = window.HC;
  const ACTIVITIES = [
    { id:'vin', title:'Vinsmaking', where:'Territoriet, Grünerløkka', time:'20:00', emoji:'🍷', tint:C.plum, descr:'Naturvin + små retter. 4 plasser ledige.', votes:{ Viktor:'yes', Kari:'yes', Erik:'yes', Anja:'yes' }, isMatch:true },
    { id:'bar', title:'Bar-kveld',  where:'Himkok, Storgata',         time:'20:30', emoji:'🍸', tint:C.coral,descr:'Cocktails og lavt lydnivå. Ingen bestilling.', votes:{ Viktor:'yes', Kari:'no',  Erik:'yes', Anja:'—' }, isMatch:false },
    { id:'bre', title:'Brettspill', where:'Trekroneren, Møllergata',  time:'19:30', emoji:'🎲', tint:C.amber,descr:'200 spill å velge fra. Plass til 4 uten reservasjon.', votes:{ Viktor:'yes', Kari:'—',  Erik:'no',  Anja:'—' }, isMatch:false },
    { id:'kin', title:'Kino',       where:'Vega Scene',                time:'21:15', emoji:'🎬', tint:C.lilac,descr:'«Dog Man» eller «Folkeavstemning». Dere velger.', votes:{ Viktor:'—',  Kari:'—',  Erik:'—',  Anja:'—' }, isMatch:false },
    { id:'jaz', title:'Jazzklubb',  where:'Herr Nilsen',               time:'22:00', emoji:'🎷', tint:C.green,descr:'Live trio kl 22. Inngang 150 kr.', votes:{ Viktor:'—',  Kari:'—',  Erik:'—',  Anja:'—' }, isMatch:false },
  ];
  const active = ACTIVITIES[0]; // matchet
  const pending = ACTIVITIES.slice(1);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'absolute', top:-60, right:-80, width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${C.coral}1e 0%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="18:11"/>

        {/* Header med timer */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <div style={{display:'flex', alignItems:'center', gap:8, background:C.card, borderRadius:14, padding:'6px 12px', boxShadow:'0 1px 4px rgba(42,33,52,.06)'}}>
            <div style={{width:6, height:6, borderRadius:3, background:C.coral}}/>
            <span style={{fontSize:12, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>7:23</span>
            <span style={{fontSize:10.5, color:C.fgDim}}>igjen</span>
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Venner — live-status */}
        <div style={{padding:'14px 22px 0'}}>
          <A_Kicker color={C.coral}>Live — 4 swiper nå</A_Kicker>
          <div style={{marginTop:10, display:'flex', gap:10}}>
            {[
              { n:'Viktor', bg:FRIENDS.Viktor, status:'swiping', count:'1/5' },
              { n:'Kari',   bg:FRIENDS.Kari,   status:'swiping', count:'2/5' },
              { n:'Erik',   bg:FRIENDS.Erik,   status:'swiping', count:'3/5' },
              { n:'Anja',   bg:FRIENDS.Anja,   status:'done',    count:'5/5' },
            ].map((p, i) => (
              <div key={i} style={{flex:1, textAlign:'center'}}>
                <div style={{position:'relative', width:44, height:44, margin:'0 auto'}}>
                  <A_Avatar name={p.n} bg={p.bg} size={44} ring={true} ringColor={p.status === 'done' ? C.green : C.coral}/>
                  {p.status === 'swiping' && (
                    <div style={{position:'absolute', bottom:-2, right:-2, width:14, height:14, borderRadius:7, background:C.coral, border:`2px solid ${C.bg}`, animation:'pulse 1.4s infinite'}}/>
                  )}
                </div>
                <div style={{fontSize:11, fontWeight:700, color:C.fg, marginTop:6}}>{p.n}</div>
                <div style={{fontSize:10, color:C.fgDim, marginTop:1}}>{p.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Match-banner — alle enig om vin */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            borderRadius:22, padding:'24px 22px',
            background:`linear-gradient(135deg, ${C.coral} 0%, ${C.plum} 100%)`,
            color:'#fff', position:'relative', overflow:'hidden',
            boxShadow:`0 14px 30px ${C.coral}38`,
          }}>
            {/* Dekor */}
            <div style={{position:'absolute', right:-40, top:-40, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'absolute', left:-30, bottom:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>

            <div style={{position:'relative'}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                <div style={{
                  padding:'5px 11px', borderRadius:12, background:'rgba(255,255,255,.22)',
                  fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase',
                  backdropFilter:'blur(10px)',
                }}>
                  ✨ Match
                </div>
                <span style={{fontSize:11.5, opacity:.9}}>Alle fire sa ja</span>
              </div>
              <div style={{display:'flex', alignItems:'baseline', gap:12}}>
                <div style={{fontSize:38}}>{active.emoji}</div>
                <div>
                  <h2 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.1}}>{active.title}</h2>
                  <div style={{fontSize:12.5, opacity:.9, marginTop:4}}>{active.where} · {active.time}</div>
                </div>
              </div>
              <p style={{margin:'14px 0 0', fontSize:13, lineHeight:1.5, opacity:.95}}>{active.descr}</p>

              {/* Avatar-rad — alle ja */}
              <div style={{marginTop:16, display:'flex', alignItems:'center', gap:8}}>
                <div style={{display:'flex'}}>
                  {['Viktor','Kari','Erik','Anja'].map((n, i) => (
                    <div key={n} style={{marginLeft: i === 0 ? 0 : -10}}>
                      <div style={{
                        width:30, height:30, borderRadius:15, background:FRIENDS[n],
                        border:'2.5px solid #fff',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#FFF3E0', fontSize:11, fontWeight:700,
                      }}>{n[0]}</div>
                    </div>
                  ))}
                </div>
                <span style={{fontSize:11.5, opacity:.9}}>4 av 4 sa ja</span>
              </div>

              <button style={{
                marginTop:18, width:'100%', padding:'13px', borderRadius:14, border:'none',
                background:'rgba(255,255,255,.95)', color:C.plumDeep,
                fontSize:14, fontWeight:700, cursor:'pointer', letterSpacing:'-0.01em',
              }}>
                Lås valget →
              </button>
            </div>
          </div>
        </div>

        {/* Andre forslag — med live-stemmer */}
        <div style={{padding:'26px 22px 0'}}>
          <A_Kicker>Andre forslag</A_Kicker>
          <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
            {pending.map(a => {
              const yeses = ['Viktor','Kari','Erik','Anja'].filter(n => a.votes[n] === 'yes');
              const nos   = ['Viktor','Kari','Erik','Anja'].filter(n => a.votes[n] === 'no');
              const wait  = ['Viktor','Kari','Erik','Anja'].filter(n => a.votes[n] === '—');
              return (
                <div key={a.id} style={{
                  background:C.card, borderRadius:14, padding:'14px 16px',
                  boxShadow:'0 1px 4px rgba(42,33,52,.03)',
                  border:`1px solid ${C.divider}`,
                  display:'flex', alignItems:'center', gap:14,
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:12, background:`${a.tint}16`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22,
                  }}>{a.emoji}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>{a.title}</div>
                    <div style={{fontSize:11, color:C.fgDim, marginTop:1}}>{a.time} · {a.where.split(',')[0]}</div>
                    <div style={{marginTop:6, display:'flex', alignItems:'center', gap:10}}>
                      {yeses.length > 0 && (
                        <div style={{display:'flex', alignItems:'center', gap:4}}>
                          <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5L9 3" stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <span style={{fontSize:10.5, color:C.green, fontWeight:700}}>{yeses.length}</span>
                        </div>
                      )}
                      {nos.length > 0 && (
                        <div style={{display:'flex', alignItems:'center', gap:4}}>
                          <svg width="11" height="11" viewBox="0 0 11 11"><path d="M3 3l5 5M8 3l-5 5" stroke={C.coralDeep} strokeWidth="1.8" strokeLinecap="round"/></svg>
                          <span style={{fontSize:10.5, color:C.coralDeep, fontWeight:700}}>{nos.length}</span>
                        </div>
                      )}
                      {wait.length > 0 && (
                        <span style={{fontSize:10.5, color:C.fgFaint}}>{wait.length} venter</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{padding:'20px 22px 0', textAlign:'center'}}>
          <p style={{margin:0, fontSize:11.5, color:C.fgFaint, lineHeight:1.5}}>
            Første aktivitet alle fire sier ja til — vinner automatisk.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3) TONIGHT DECIDED — Match låst, Vipps-splitt, SMS til de andre
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTonightDecided() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'absolute', top:-40, left:-60, width:260, height:260, borderRadius:'50%', background:`radial-gradient(circle, ${C.green}1e 0%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="18:19"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker color={C.green}>Låst</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Feiring — stort element */}
        <div style={{padding:'22px 24px 0', textAlign:'center'}}>
          <div style={{fontSize:54, lineHeight:1, marginBottom:14}}>🎉</div>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            Alle er enige.
          </h1>
          <p style={{margin:'10px auto 0', fontSize:14, lineHeight:1.55, color:C.fgDim, maxWidth:300}}>
            Vinsmaking på Territoriet kl 20:00. Plasser holdt til alle fire i 20 minutter.
          </p>
        </div>

        {/* Bekreftelsen — stor kort */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            background:C.card, borderRadius:22, padding:'22px 22px',
            boxShadow:'0 8px 20px rgba(42,33,52,.08)',
            border:`1px solid ${C.divider}`,
          }}>
            {/* Sted + tid */}
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{
                width:56, height:56, borderRadius:14,
                background:`linear-gradient(135deg, ${C.plum}, ${C.plumDeep})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:28,
              }}>🍷</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:17, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>Territoriet</div>
                <div style={{fontSize:12, color:C.fgDim, marginTop:2}}>Markveien 58, Grünerløkka</div>
              </div>
            </div>

            {/* Detaljer */}
            <div style={{marginTop:18, display:'flex', gap:14}}>
              <div style={{flex:1, padding:'12px 14px', borderRadius:12, background:C.cream, border:`1px solid ${C.divider}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim}}>I kveld</div>
                <div style={{fontSize:16, fontWeight:700, color:C.fg, marginTop:3}}>20:00</div>
              </div>
              <div style={{flex:1, padding:'12px 14px', borderRadius:12, background:C.cream, border:`1px solid ${C.divider}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim}}>Varighet</div>
                <div style={{fontSize:16, fontWeight:700, color:C.fg, marginTop:3}}>~2 timer</div>
              </div>
            </div>

            {/* Hvem kommer */}
            <div style={{marginTop:18, display:'flex', alignItems:'center', gap:10}}>
              <div style={{display:'flex'}}>
                {['Viktor','Kari','Erik','Anja'].map((n, i) => (
                  <div key={n} style={{marginLeft: i === 0 ? 0 : -8}}>
                    <div style={{
                      width:30, height:30, borderRadius:15, background:FRIENDS[n],
                      border:`2.5px solid ${C.card}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#FFF3E0', fontSize:11, fontWeight:700,
                    }}>{n[0]}</div>
                  </div>
                ))}
              </div>
              <span style={{fontSize:12, color:C.fgDim}}>Viktor · Kari · Erik · Anja</span>
            </div>
          </div>
        </div>

        {/* Betaling — Vipps-splitt */}
        <div style={{padding:'24px 22px 0'}}>
          <A_Kicker>Betaling</A_Kicker>
          <div style={{marginTop:12, background:C.card, borderRadius:18, padding:'18px 18px', boxShadow:'0 4px 14px rgba(42,33,52,.06)', border:`1px solid ${C.divider}`}}>
            {/* Vipps-header */}
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:14}}>
              <div style={{
                width:38, height:38, borderRadius:10,
                background:'#FF5B24',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span style={{color:'#fff', fontWeight:800, fontSize:16, letterSpacing:'-0.02em'}}>V</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>Vipps-splitt</div>
                <div style={{fontSize:11, color:C.fgDim, marginTop:1}}>Du betaler nå, venner bekrefter via SMS</div>
              </div>
            </div>

            {/* Totalsum */}
            <div style={{padding:'14px 16px', borderRadius:12, background:C.cream, border:`1px solid ${C.divider}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:12.5, color:C.fgDim}}>4 × vinpakke</span>
                <span style={{fontSize:14, fontWeight:700, color:C.fg}}>1 400 kr</span>
              </div>
              <div style={{marginTop:10, paddingTop:10, borderTop:`1px solid ${C.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:13, fontWeight:700, color:C.fg}}>Per person</span>
                <span style={{fontSize:18, fontWeight:700, color:C.plum, letterSpacing:'-0.01em'}}>350 kr</span>
              </div>
            </div>

            {/* Status per person */}
            <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:8}}>
              {[
                { n:'Viktor', sub:'Du — betaler nå',             status:'pay', bg:FRIENDS.Viktor },
                { n:'Kari',   sub:'SMS sendt · venter på svar',  status:'wait', bg:FRIENDS.Kari },
                { n:'Erik',   sub:'SMS sendt · venter på svar',  status:'wait', bg:FRIENDS.Erik },
                { n:'Anja',   sub:'SMS sendt · venter på svar',  status:'wait', bg:FRIENDS.Anja },
              ].map((p, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'4px 0'}}>
                  <A_Avatar name={p.n} bg={p.bg} size={32}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:700, color:C.fg}}>{p.n}</div>
                    <div style={{fontSize:10.5, color:C.fgDim, marginTop:1}}>{p.sub}</div>
                  </div>
                  <div style={{fontSize:11.5, color:C.fgDim, fontWeight:600}}>350 kr</div>
                  {p.status === 'pay' ? (
                    <div style={{width:16, height:16, borderRadius:8, background:C.plum, display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  ) : (
                    <div style={{width:16, height:16, borderRadius:8, border:`1.5px dashed ${C.fgFaint}`}}/>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Primær-CTA */}
        <div style={{padding:'24px 22px 8px'}}>
          <button style={{
            width:'100%', padding:'16px', borderRadius:16, border:'none',
            background:'#FF5B24', color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer',
            letterSpacing:'-0.01em',
            boxShadow:'0 8px 20px rgba(255,91,36,.3)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}>
            <span>Betal 1 400 kr med Vipps</span>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M7 3l4 4-4 4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button style={{
            marginTop:10, width:'100%', padding:'14px', borderRadius:14, border:'none',
            background:'transparent', color:C.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer',
          }}>
            Legg til kalender
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4) TRAVELLER START — Viktor aktiverer Traveller for Stockholm-uken
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTravellerStart() {
  const C = window.HC;
  const tags = [
    { label:'nye opplevelser', active:true },
    { label:'business dinner', active:true },
    { label:'vandringer',      active:true },
    { label:'kunst',           active:false },
    { label:'nattbar',         active:false },
    { label:'kafé',            active:false },
    { label:'musikk',          active:false },
  ];
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="09:41"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker>Traveller-mode</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Hero — rolig, respektfull */}
        <div style={{padding:'18px 24px 0'}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 12px', borderRadius:14,
            background:`${C.plum}12`, color:C.plum,
            fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
            marginBottom:14,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 9.5l.6-3.2L1.2 4l3.3-.5z" fill={C.plum}/></svg>
            Midlertidig besøkende
          </div>
          <h1 style={{margin:0, fontSize:28, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.15}}>
            Du er i Stockholm<br/>denne uka.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim, maxWidth:320}}>
            Vi kobler deg med lokale ambassadører og andre besøkende. Din Oslo-historikk følger deg — så du slipper å starte på null.
          </p>
        </div>

        {/* Dato-range */}
        <div style={{padding:'26px 22px 0'}}>
          <A_Kicker>Når</A_Kicker>
          <div style={{marginTop:12, background:C.card, borderRadius:16, padding:'18px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{flex:1, padding:'12px 14px', borderRadius:12, background:C.cream, border:`1.5px solid ${C.plum}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum}}>Fra</div>
                <div style={{fontSize:15, fontWeight:700, color:C.fg, marginTop:3}}>Man 20. apr</div>
              </div>
              <div style={{color:C.fgFaint, fontSize:14}}>→</div>
              <div style={{flex:1, padding:'12px 14px', borderRadius:12, background:C.cream, border:`1.5px solid ${C.plum}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum}}>Til</div>
                <div style={{fontSize:15, fontWeight:700, color:C.fg, marginTop:3}}>Søn 26. apr</div>
              </div>
            </div>
            <div style={{marginTop:12, fontSize:11.5, color:C.fgDim, textAlign:'center'}}>
              7 netter · Södermalm (du er her nå)
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{padding:'26px 22px 0'}}>
          <A_Kicker>Hva ser du etter</A_Kicker>
          <p style={{margin:'6px 0 12px', fontSize:12, color:C.fgDim, lineHeight:1.5}}>
            Velg så mange du vil. Vi bruker dette til å kuratere Stockholm-feeden for deg.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {tags.map(t => (
              <div key={t.label} style={{
                padding:'9px 14px', borderRadius:18,
                background: t.active ? C.plum : C.card,
                color: t.active ? '#fff' : C.fgDim,
                border: t.active ? `1px solid ${C.plum}` : `1px solid ${C.divider}`,
                fontSize:12.5, fontWeight: t.active ? 700 : 600,
                display:'flex', alignItems:'center', gap:6,
                boxShadow: t.active ? `0 4px 10px ${C.plum}30` : 'none',
              }}>
                {t.active && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5L8.5 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* Portable trust */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{background:`${C.green}10`, borderRadius:14, padding:'14px 16px', border:`1px solid ${C.green}20`, display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, borderRadius:18, background:`${C.green}20`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 1l2 2h4v4l2 2-2 2v4h-4l-2 2-2-2H3v-4L1 9l2-2V3h4z" fill="none" stroke={C.green} strokeWidth="1.4"/><path d="M5.5 9l2.5 2.5L13 7" stroke={C.green} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:700, color:C.fg}}>Oslo-historikk følger deg</div>
              <div style={{fontSize:11, color:C.fgDim, marginTop:1, lineHeight:1.4}}>12 events, 4.9-rating · Stockholm-brukere ser dette</div>
            </div>
          </div>
        </div>

        {/* Primær-CTA */}
        <div style={{padding:'26px 22px 8px'}}>
          <button style={{
            width:'100%', padding:'16px', borderRadius:16, border:'none',
            background:C.plum, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer',
            letterSpacing:'-0.01em',
            boxShadow:`0 8px 20px ${C.plum}38`,
          }}>
            Aktiver Traveller → Stockholm
          </button>
          <p style={{margin:'14px 28px 0', fontSize:11, color:C.fgFaint, textAlign:'center', lineHeight:1.5}}>
            Oslo-kontaktene dine ser fortsatt deg — vi flytter bare feeden.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5) TRAVELLER FEED — Kuratert Stockholm-feed for Viktor
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTravellerFeed() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="11:28"/>

        {/* Header med by-toggle */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'7px 14px', borderRadius:18,
            background:`${C.plum}12`, color:C.plum,
            fontSize:12, fontWeight:700,
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11"><circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke={C.plum} strokeWidth="1.4"/><circle cx="5.5" cy="5.5" r="1.5" fill={C.plum}/></svg>
            Stockholm
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Hero */}
        <div style={{padding:'18px 24px 0'}}>
          <A_Kicker>Dag 3 av 7</A_Kicker>
          <h1 style={{margin:'6px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            Hva er du i humør til,<br/>Viktor?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.55, color:C.fgDim}}>
            Kuratert for deg — basert på dine tags og hvem som er her denne uka.
          </p>
        </div>

        {/* Utvalgt ambassadør */}
        <div style={{padding:'22px 22px 0'}}>
          <A_Kicker color={C.coralDeep}>Lokal ambassadør</A_Kicker>
          <div style={{
            marginTop:12, borderRadius:20, overflow:'hidden',
            background:`linear-gradient(135deg, #2E4A75 0%, #7F4D95 100%)`,
            color:'#fff', padding:'20px 20px',
            boxShadow:'0 10px 24px rgba(46,74,117,.3)',
            position:'relative',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            <div style={{position:'relative', display:'flex', gap:14, alignItems:'flex-start'}}>
              <A_Avatar name="Linnea" bg="linear-gradient(135deg,#F2D4B8,#C78F5E)" size={54}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <div style={{fontSize:15, fontWeight:700}}>Linnea</div>
                  <div style={{fontSize:10, padding:'2px 7px', borderRadius:8, background:'rgba(255,255,255,.2)', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', backdropFilter:'blur(10px)'}}>Ambassadør</div>
                </div>
                <div style={{fontSize:11.5, opacity:.85, marginTop:2}}>Södermalm · 3 års historikk her</div>
                <p style={{margin:'10px 0 0', fontSize:12.5, lineHeight:1.5, opacity:.95}}>
                  "Onsdag kl 19 tar jeg med en liten gjeng til Fotografiska etter stengning — så fint å ha en norsk som er her!"
                </p>
                <button style={{
                  marginTop:12, padding:'8px 14px', borderRadius:12, border:'none',
                  background:'rgba(255,255,255,.95)', color:'#2E4A75',
                  fontSize:12, fontWeight:700, cursor:'pointer',
                }}>
                  Si hei →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events denne uka */}
        <div style={{padding:'26px 22px 0'}}>
          <A_Kicker>For besøkende denne uka</A_Kicker>
          <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                d:'Ons', t:'19:00',
                title:'Fotografiska etter stengning',
                where:'Stadsgårdshamnen',
                host:'Linnea (ambassadør)',
                tags:['nye opplevelser','kunst'],
                match:'Matcher: nye opplevelser',
                attendees:['L','A','M','K'],
                count:'4 besøkende + 2 lokale',
                tint:C.plum,
              },
              {
                d:'Tor', t:'12:30',
                title:'Business lunch — Stockholm/Oslo-nettverk',
                where:'Clarion Sign, Norrmalm',
                host:'Karin (vertskap Clarion)',
                tags:['business dinner'],
                match:'Matcher: business dinner',
                attendees:['K','M','E'],
                count:'3 gründere fra Norden',
                tint:C.coral,
              },
              {
                d:'Fre', t:'10:00',
                title:'Morgentur — Djurgården',
                where:'Rosendals Trädgård',
                host:'Erik (ambassadør)',
                tags:['vandringer'],
                match:'Matcher: vandringer',
                attendees:['E','J','S','H','M'],
                count:'5 som du er i byen',
                tint:C.green,
              },
            ].map((e, i) => (
              <div key={i} style={{
                background:C.card, borderRadius:16, padding:'14px 16px',
                boxShadow:'0 1px 4px rgba(42,33,52,.04)',
                border:`1px solid ${C.divider}`,
              }}>
                <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                  <div style={{
                    width:46, height:54, borderRadius:12, background:`${e.tint}16`, color:e.tint,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    flexShrink:0, padding:'4px 0',
                  }}>
                    <span style={{fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase'}}>{e.d}</span>
                    <span style={{fontSize:13, fontWeight:700, marginTop:2}}>{e.t}</span>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13.5, fontWeight:700, color:C.fg, lineHeight:1.3}}>{e.title}</div>
                    <div style={{fontSize:11, color:C.fgDim, marginTop:3}}>{e.where} · hosted by {e.host}</div>
                    <div style={{fontSize:10.5, color:e.tint, marginTop:5, fontWeight:700}}>
                      {e.match}
                    </div>
                    <div style={{marginTop:8, display:'flex', alignItems:'center', gap:8}}>
                      <div style={{display:'flex'}}>
                        {e.attendees.slice(0,4).map((a, j) => (
                          <div key={j} style={{
                            width:20, height:20, borderRadius:10,
                            background:['#D4A85C','#B890D4','#7895C4','#A8B890','#E8B8A0'][j % 5],
                            border:`2px solid ${C.card}`,
                            marginLeft: j === 0 ? 0 : -6,
                            color:'#FFF3E0', fontSize:9, fontWeight:700,
                            display:'flex', alignItems:'center', justifyContent:'center',
                          }}>{a}</div>
                        ))}
                      </div>
                      <span style={{fontSize:10.5, color:C.fgDim}}>{e.count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notat */}
        <div style={{padding:'22px 22px 8px'}}>
          <div style={{background:C.cream, borderRadius:12, padding:'12px 14px', border:`1px solid ${C.divider}`, fontSize:11.5, color:C.fgDim, lineHeight:1.5, textAlign:'center'}}>
            Kun events for besøkende og vertslag vises. Lokale fellesskaper respekteres.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6) TRAVELLER REFLECTION — Viktor tilbake i Oslo, 3 nye kontakter
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenTravellerReflection() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="15:52"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker>Tilbake i Oslo</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Hero */}
        <div style={{padding:'18px 24px 0'}}>
          <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:12}}>
            <div style={{padding:'5px 11px', borderRadius:12, background:`${C.plum}12`, color:C.plum, fontSize:11, fontWeight:700}}>Stockholm</div>
            <div style={{color:C.fgFaint}}>→</div>
            <div style={{padding:'5px 11px', borderRadius:12, background:`${C.coral}14`, color:C.coralDeep, fontSize:11, fontWeight:700}}>Oslo</div>
          </div>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            3 nye kontakter fra Stockholm.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim, maxWidth:340}}>
            Vil du holde kontakten? Traveller-venner får sin egen kategori i porteføljen din — så du finner dem igjen neste gang du er i byen.
          </p>
        </div>

        {/* Kontaktene */}
        <div style={{padding:'24px 22px 0', display:'flex', flexDirection:'column', gap:12}}>
          {[
            {
              n:'Linnea', role:'Ambassadør · Södermalm', bg:'linear-gradient(135deg,#F2D4B8,#C78F5E)',
              note:'Dere var på Fotografiska og kaffe på Johan & Nyström. Hun nevnte at hun skal til Oslo i juli.',
              action:'default',
            },
            {
              n:'Marcus', role:'Besøkende fra København', bg:'linear-gradient(135deg,#8FAAD6,#45699C)',
              note:'Dere var på samme business-lunch. Også gründer, snakker norsk/dansk.',
              action:'default',
            },
            {
              n:'Sofia', role:'Fra Malmö, studerer i Stockholm', bg:'linear-gradient(135deg,#E5A5B8,#A86078)',
              note:'Dere møttes på Djurgården-turen fredag morgen. Delte interesse for kulturhistorie.',
              action:'default',
            },
          ].map((p, i) => (
            <div key={i} style={{
              background:C.card, borderRadius:16, padding:'16px 16px',
              boxShadow:'0 1px 6px rgba(42,33,52,.04)',
              border:`1px solid ${C.divider}`,
            }}>
              <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                <A_Avatar name={p.n} bg={p.bg} size={48}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:700, color:C.fg}}>{p.n}</div>
                  <div style={{fontSize:11, color:C.fgDim, marginTop:2}}>{p.role}</div>
                  <p style={{margin:'10px 0 0', fontSize:12.5, color:C.fgDim, lineHeight:1.5}}>{p.note}</p>
                </div>
              </div>
              <div style={{marginTop:14, display:'flex', gap:8}}>
                <button style={{
                  flex:1, padding:'11px', borderRadius:12, border:`1.5px solid ${C.plum}`,
                  background:`${C.plum}10`, color:C.plumDeep,
                  fontSize:12.5, fontWeight:700, cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                }}>
                  <svg width="11" height="11" viewBox="0 0 11 11"><path d="M5.5 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1L1 4.3l3.1-.5z" fill={C.plum}/></svg>
                  Hold kontakt
                </button>
                <button style={{
                  padding:'11px 16px', borderRadius:12, border:`1px solid ${C.divider}`,
                  background:'transparent', color:C.fgDim,
                  fontSize:12, fontWeight:600, cursor:'pointer',
                }}>
                  Senere
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info om Traveller-venner-kategorien */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{background:C.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${C.divider}`, display:'flex', alignItems:'flex-start', gap:12}}>
            <div style={{width:34, height:34, borderRadius:17, background:`${C.plum}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2}}>
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke={C.plum} strokeWidth="1.4"/><path d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13" fill="none" stroke={C.plum} strokeWidth="1.2"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:700, color:C.fg}}>Hva er "Traveller-venner"?</div>
              <p style={{margin:'4px 0 0', fontSize:11, color:C.fgDim, lineHeight:1.5}}>
                En egen kategori i porteføljen din for mennesker du har møtt på reise. Når du er i deres by — eller de i din — får dere begge beskjed.
              </p>
            </div>
          </div>
        </div>

        <div style={{padding:'20px 22px 0', textAlign:'center'}}>
          <button style={{
            background:'transparent', border:'none',
            fontSize:12.5, color:C.fgDim, fontWeight:600, cursor:'pointer',
          }}>
            Se alle 3 i porteføljen →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 7) AI MATCH Q — Frida spør 5 åpne dybdespørsmål én av gangen
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenAIMatchQ() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      {/* Subtil bakgrunns-glow for AI-feel */}
      <div style={{position:'absolute', top:-40, right:-60, width:220, height:220, borderRadius:'50%', background:`radial-gradient(circle, ${C.plum}20 0%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="21:14"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker>Dybde-matching</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Progress */}
        <div style={{padding:'14px 24px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <span style={{fontSize:11, fontWeight:700, color:C.plum, letterSpacing:'.1em', textTransform:'uppercase'}}>Spørsmål 2 av 5</span>
            <span style={{fontSize:11, color:C.fgDim}}>~3 min igjen</span>
          </div>
          <div style={{width:'100%', height:4, borderRadius:2, background:C.divider, overflow:'hidden'}}>
            <div style={{width:'40%', height:'100%', background:`linear-gradient(90deg, ${C.plum}, ${C.lilac})`, borderRadius:2}}/>
          </div>
        </div>

        {/* Frida — assistent */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
            <div style={{
              width:44, height:44, borderRadius:22,
              background:`linear-gradient(135deg, ${C.plum}, ${C.lilac})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 4px 12px ${C.plum}30`,
              flexShrink:0,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M10 2l1.5 3 3.3.5-2.4 2.3.6 3.2L10 9.5l-3 1.8.6-3.2L5.2 6l3.3-.5z" fill="#fff"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700, color:C.fg, display:'flex', alignItems:'center', gap:6}}>
                Frida
                <span style={{fontSize:9.5, padding:'2px 7px', borderRadius:8, background:`${C.plum}14`, color:C.plum, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase'}}>AI</span>
              </div>
              <div style={{fontSize:11, color:C.fgDim, marginTop:1}}>Stiller åpne spørsmål for dybde-matching</div>
            </div>
          </div>
        </div>

        {/* Spørsmålet — tydelig, sentrert */}
        <div style={{padding:'26px 24px 0'}}>
          <div style={{
            background:C.card, borderRadius:20, padding:'24px 22px',
            boxShadow:'0 4px 14px rgba(42,33,52,.06)',
            border:`1px solid ${C.divider}`,
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:12}}>Frida spør</div>
            <h2 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.25}}>
              Hva gjør deg mest levende?
            </h2>
            <p style={{margin:'12px 0 0', fontSize:13, lineHeight:1.55, color:C.fgDim}}>
              Svar fritt — 2 til 3 setninger. Ingen rett eller galt. Det du skriver, brukes kun til å finne dybde-matcher for deg.
            </p>
          </div>
        </div>

        {/* Tekstfelt */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:C.card, borderRadius:16, padding:'16px 18px',
            border:`1.5px solid ${C.plum}`,
            boxShadow:`0 2px 10px ${C.plum}14`,
            minHeight:120,
          }}>
            <p style={{margin:0, fontSize:14, lineHeight:1.55, color:C.fg, fontFamily:'inherit'}}>
              Når jeg står på et fjell, langt fra telefondekning, og vet at ingen forventer noe av meg akkurat nå — det gir meg en ro jeg ikke finner andre steder. Også når jeg lærer noe nytt, som å lese gammelt norrønt.
            </p>
            <div style={{marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontSize:10.5, color:C.fgFaint}}>183 tegn · ~2 setninger</span>
              <span style={{fontSize:10.5, color:C.green, fontWeight:700}}>✓ God lengde</span>
            </div>
          </div>
        </div>

        {/* Hint — hva Frida ser etter */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{background:`${C.plum}0c`, borderRadius:12, padding:'12px 14px', border:`1px solid ${C.plum}18`, display:'flex', gap:10, alignItems:'flex-start'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" style={{flexShrink:0, marginTop:2}}><circle cx="7" cy="7" r="6" fill="none" stroke={C.plum} strokeWidth="1.4"/><path d="M7 3.5v4M7 9.5v.5" stroke={C.plum} strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div style={{fontSize:11.5, color:C.fgDim, lineHeight:1.5}}>
              Frida ser ikke etter "riktig" svar — hun ser etter gjenklang. Skriv det som er sant.
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{padding:'22px 22px 8px', display:'flex', gap:10}}>
          <button style={{
            padding:'14px 18px', borderRadius:14, border:`1px solid ${C.divider}`,
            background:C.card, color:C.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer',
          }}>
            ← Forrige
          </button>
          <button style={{
            flex:1, padding:'14px', borderRadius:14, border:'none',
            background:`linear-gradient(135deg, ${C.plum}, ${C.lilac})`,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            letterSpacing:'-0.01em',
            boxShadow:`0 6px 16px ${C.plum}30`,
          }}>
            Neste spørsmål →
          </button>
        </div>

        {/* Fremgang — små prikker */}
        <div style={{padding:'16px 22px 0', display:'flex', justifyContent:'center', gap:6}}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{
              width: n === 2 ? 22 : 6, height:6, borderRadius:3,
              background: n < 2 ? C.plum : n === 2 ? C.plum : C.divider,
              transition:'all 0.3s',
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 8) AI MATCH RESULT — "Du og Kari matcher på dybde" med transparent forklaring
// ═══════════════════════════════════════════════════════════════════════════

function H_ScreenAIMatchResult() {
  const C = window.HC;
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'absolute', top:-40, right:-60, width:240, height:240, borderRadius:'50%', background:`radial-gradient(circle, ${C.plum}20 0%, transparent 70%)`, pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:140, left:-40, width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle, ${C.lilac}20 0%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="21:19"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <A_BackButton/>
          <A_Kicker>Match fra Frida</A_Kicker>
          <div style={{width:40}}/>
        </div>

        {/* Hero — to avatarer */}
        <div style={{padding:'22px 24px 0', textAlign:'center'}}>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:-14, marginBottom:16}}>
            <div style={{marginRight:-14, zIndex:2}}>
              <A_Avatar name="Viktor" bg={FRIENDS.Viktor} size={74} ring={true} ringColor="#FFFFFF"/>
            </div>
            <div style={{zIndex:1}}>
              <A_Avatar name="Kari" bg={FRIENDS.Kari} size={74} ring={true} ringColor="#FFFFFF"/>
            </div>
          </div>

          {/* Plum badge — dybde-match */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'8px 16px', borderRadius:20,
            background:`linear-gradient(135deg, ${C.plum}, ${C.lilac})`,
            color:'#fff', fontSize:13, fontWeight:700, letterSpacing:'-0.01em',
            boxShadow:`0 6px 16px ${C.plum}40`,
            marginBottom:14,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 9.5l.6-3.2L1.2 4l3.3-.5z" fill="#fff"/></svg>
            Dybde-match · 84%
          </div>

          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            Du og Kari matcher<br/>på dybde, ikke bare tags.
          </h1>
        </div>

        {/* Forklaring fra Frida */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{
            background:C.card, borderRadius:20, padding:'20px 20px',
            boxShadow:'0 4px 14px rgba(42,33,52,.06)',
            border:`1px solid ${C.divider}`,
          }}>
            {/* Frida header */}
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:14, borderBottom:`1px solid ${C.divider}`}}>
              <div style={{
                width:32, height:32, borderRadius:16,
                background:`linear-gradient(135deg, ${C.plum}, ${C.lilac})`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1l1 2.3 2.4.4-1.7 1.6.4 2.3L7 6.6 4.9 7.6l.4-2.3L3.6 3.7l2.4-.4z" fill="#fff"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12.5, fontWeight:700, color:C.fg}}>Hva Frida så</div>
                <div style={{fontSize:10.5, color:C.fgDim}}>Basert på svarene dine på 5 spørsmål</div>
              </div>
            </div>

            {/* Tre konkrete bevis */}
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {[
                {
                  emoji:'📖', title:'Delt interesse for kulturhistorie',
                  detail:'Du nevnte norrønt. Kari svarte om islandsk sagalitteratur. Begge trekkes mot "historien bak ting".',
                },
                {
                  emoji:'🏡', title:'Begge har flyttet siste to år',
                  detail:'Du flyttet fra Trondheim til Oslo i 2024. Kari kom fra Bergen i 2025. Dere vet hva det er å gjenoppbygge sosiale kretser.',
                },
                {
                  emoji:'✨', title:'Samme svar på "hva gir mening"',
                  detail:'Dere brukte begge uttrykk som "ro uten forventninger" og "å lære noe nytt for egen del". Ikke identisk, men samme frekvens.',
                },
              ].map((c, i) => (
                <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                  <div style={{
                    width:36, height:36, borderRadius:10,
                    background:`${C.plum}10`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, fontSize:18,
                  }}>{c.emoji}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:C.fg, lineHeight:1.3}}>{c.title}</div>
                    <p style={{margin:'4px 0 0', fontSize:11.5, color:C.fgDim, lineHeight:1.5}}>{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Transparens-notat */}
            <div style={{marginTop:16, paddingTop:14, borderTop:`1px solid ${C.divider}`, display:'flex', gap:10, alignItems:'flex-start'}}>
              <svg width="14" height="14" viewBox="0 0 14 14" style={{flexShrink:0, marginTop:2}}><circle cx="7" cy="7" r="6" fill="none" stroke={C.fgFaint} strokeWidth="1.3"/><path d="M7 3.5v4M7 9.5v.5" stroke={C.fgFaint} strokeWidth="1.3" strokeLinecap="round"/></svg>
              <p style={{margin:0, fontSize:10.5, color:C.fgFaint, lineHeight:1.5}}>
                Fride matcher på klang, ikke algoritme. Dere deler ikke tags perfekt — det er poenget. Forklaringen er full: Kari ser samme beskrivelse av deg.
              </p>
            </div>
          </div>
        </div>

        {/* Lite kort: hva gjør vi nå */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{background:C.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${C.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim, marginBottom:6}}>Forslag</div>
            <div style={{fontSize:13, fontWeight:700, color:C.fg, lineHeight:1.35}}>
              En kafé der dere kan snakke uten press
            </div>
            <p style={{margin:'4px 0 0', fontSize:11.5, color:C.fgDim, lineHeight:1.5}}>
              Jacobsen & Svart på Torggata har god akustikk for lange samtaler. Kari drikker te, så de har en god seleksjon.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:'24px 22px 8px', display:'flex', gap:10}}>
          <button style={{
            padding:'14px 18px', borderRadius:14, border:`1px solid ${C.divider}`,
            background:C.card, color:C.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer',
          }}>
            Senere
          </button>
          <button style={{
            flex:1, padding:'14px', borderRadius:14, border:'none',
            background:`linear-gradient(135deg, ${C.plum}, ${C.lilac})`,
            color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
            letterSpacing:'-0.01em',
            boxShadow:`0 6px 16px ${C.plum}30`,
          }}>
            Send hilsen til Kari →
          </button>
        </div>

        <div style={{padding:'16px 22px 0', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', fontSize:11.5, color:C.fgFaint, fontWeight:600, cursor:'pointer'}}>
            Hvorfor viser Frida meg dette? →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Eksporter
// ═══════════════════════════════════════════════════════════════════════════

Object.assign(window, {
  H_ScreenTonightStart,
  H_ScreenTonightSwipe,
  H_ScreenTonightDecided,
  H_ScreenTravellerStart,
  H_ScreenTravellerFeed,
  H_ScreenTravellerReflection,
  H_ScreenAIMatchQ,
  H_ScreenAIMatchResult,
});
