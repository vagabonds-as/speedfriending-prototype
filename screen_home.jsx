/* global React, HC, H_StatusBarLight */
// Hjem — hovedskjermen etter login. Navigasjon til alle andre områder via tab-bar.

function ScreenHome() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp: hilsen + profilbilde */}
        <div style={{padding:'22px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Torsdag</div>
            <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              Hei Viktor.
            </h1>
          </div>
          <div style={{width:42, height:42, borderRadius:21, background:'linear-gradient(135deg,#D4A85C,#8A5A3B)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:15, boxShadow:'0 2px 8px rgba(42,33,52,.1)'}}>
            V
          </div>
        </div>

        {/* Kveldens mulighet — den viktigste kortet */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
            I kveld
          </div>
          <div style={{
            background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
            borderRadius:20, padding:'20px 22px', color:'#fff',
            boxShadow:`0 12px 28px ${HC.coral}35`,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-40, top:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', opacity:.88}}>19:00 · SØSTRENE KARLSEN</div>
              <h2 style={{margin:'6px 0 0', fontSize:22, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.15}}>
                Vinsmaking med Martine
              </h2>
              <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.5, opacity:.95}}>
                5 andre kommer — Kari, Erik, Anja og 2 du ikke kjenner ennå.
              </p>
              <div style={{display:'flex', alignItems:'center', gap:16, marginTop:16, fontSize:12, opacity:.88}}>
                <span>Start om 4 t 37 min</span>
                <span style={{opacity:.5}}>·</span>
                <span>4 min fra deg</span>
              </div>
              <button style={{
                marginTop:16, padding:'10px 18px', borderRadius:22, border:'none',
                background:'rgba(255,255,255,.95)', color:HC.plum, fontSize:13.5, fontWeight:700, cursor:'pointer',
              }}>
                Se detaljer
              </button>
            </div>
          </div>
        </div>

        {/* Ukas kuraterte — link til Discovery */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Resten av uka
            </div>
            <button style={{background:'transparent', border:'none', fontSize:12, color:HC.fgDim, fontWeight:600, cursor:'pointer', padding:0}}>
              Se alle →
            </button>
          </div>
          <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6, marginLeft:-2, marginRight:-22, paddingLeft:2, paddingRight:22}}>
            {[
              { d:'Fre', t:'19:00', title:'Brettspill', loc:'Trekroneren', tint:HC.coral },
              { d:'Lør', t:'11:00', title:'Bymarka-tur', loc:'Skistua', tint:HC.green },
              { d:'Søn', t:'15:00', title:'Søndagskaffe', loc:'Jacobsen & Svart', tint:HC.amber },
              { d:'Tir', t:'19:30', title:'Bokklubb', loc:'Bokhuset', tint:HC.plum },
            ].map((e, i) => (
              <div key={i} style={{
                flexShrink:0, width:160, padding:'14px 14px 14px', borderRadius:14,
                background:HC.card, border:`1px solid ${HC.divider}`,
                boxShadow:'0 1px 4px rgba(42,33,52,.03)',
              }}>
                <div style={{width:34, height:34, borderRadius:10, background:`${e.tint}18`, color:e.tint, fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1.1}}>
                  <span>{e.d}</span>
                  <span style={{fontSize:9.5, opacity:.7, marginTop:1}}>{e.t}</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:10}}>{e.title}</div>
                <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{e.loc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dine kontakter — siste aktivitet */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Siden sist
            </div>
            <button style={{background:'transparent', border:'none', fontSize:12, color:HC.fgDim, fontWeight:600, cursor:'pointer', padding:0}}>
              Alle kontakter →
            </button>
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { n:'Kari', ev:'Møtes på brettspill i morgen', bg:'linear-gradient(135deg,#E8B8A0,#B5694A)', hot:true },
              { n:'Erik', ev:'Sist sett 18. april — vinkvelden', bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
              { n:'Anja', ev:'Ny kontakt · likte Jazzklubb også', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
            ].map((p, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
              }}>
                <div style={{position:'relative', width:36, height:36}}>
                  <div style={{width:36, height:36, borderRadius:18, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:13}}>
                    {p.n[0]}
                  </div>
                  {p.hot && <div style={{position:'absolute', right:-2, bottom:-2, width:12, height:12, borderRadius:6, background:HC.coral, border:`2px solid ${HC.card}`}}/>}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{p.n}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{p.ev}</div>
                </div>
                <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            ))}
          </div>
        </div>

        {/* Månedens stemning (link til H1) */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, borderRadius:18, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="17" height="17" viewBox="0 0 17 17"><path d="M3 3h11v11H3z" fill="none" stroke={HC.plum} strokeWidth="1.4"/><path d="M3 7h11" stroke={HC.plum} strokeWidth="1.4"/><path d="M6 3v11" stroke={HC.plum} strokeWidth="1.4"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum}}>Månedens rapport</div>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:2, lineHeight:1.3}}>Et brev fra deg, til deg — klar 1. mai</div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

window.H_ScreenHome = ScreenHome;
