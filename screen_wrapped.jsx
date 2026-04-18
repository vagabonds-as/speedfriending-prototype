/* global React, HC, H_StatusBarLight */
// Wrapped 2026 — 12-skjerms sekvens, Spotify Wrapped-moment for Speedfriending.
// Leveres 15. desember. Varm, personlig, delbar. Ikke for sukkersøt.
// Eksport: window.H_ScreenWrapped (wrapper med indeks-state + auto-advance + sveipe).

const { useState: useStateW, useEffect: useEffectW, useRef: useRefW, useMemo: useMemoW } = React;

// ----- Farge-palett (mørk lavendel + coral for fremhevinger) -----
const WC = {
  // Night-palette (mørk lavendel for hovedskjermene)
  bgTop:     '#1F1528',
  bgMid:     '#3B2C45',
  bgDeep:    '#5C3E6E',
  bgPlum:    '#7F4D95',
  // Morgenlys-palette (for lysere skjermer — 3, 7, 9, 10)
  dawnTop:   '#F4EDE7',
  dawnMid:   '#EFE4D8',
  dawnBot:   '#E6D3C2',
  // Tekst
  fg:        '#F7F0E8',
  fgDim:     'rgba(247,240,232,.70)',
  fgFaint:   'rgba(247,240,232,.42)',
  dayFg:     '#2A2134',
  dayFgDim:  'rgba(42,33,52,.68)',
  dayFgFaint:'rgba(42,33,52,.38)',
  card:      '#FFFFFF',
  // Aksenter
  coral:     '#F0826B',
  coralSoft: '#FAB29D',
  coralDeep: '#C45A44',
  lilac:     '#B788C9',
  plum:      '#7F4D95',
  plumDeep:  '#5E3071',
  amber:     '#E8B87A',
  green:     '#8BC9A3',
  sage:      '#A8BFA0',
};

// ----- Delt: mørk status-bar (H_StatusBarDark hvis ikke finnes) -----
function W_StatusBarDark({ time = '9:41' }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 26px 0', fontFamily:'-apple-system,system-ui', color:WC.fg, fontSize:15.5, fontWeight:600}}>
      <span>{time}</span>
      <span style={{display:'inline-flex', gap:6, alignItems:'center'}}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".6" fill={WC.fg}/><rect x="4.5" y="5" width="3" height="6" rx=".6" fill={WC.fg}/><rect x="9" y="2.5" width="3" height="8.5" rx=".6" fill={WC.fg}/><rect x="13.5" y="0" width="3" height="11" rx=".6" fill={WC.fg}/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="2.5" fill="none" stroke={WC.fg} strokeOpacity=".5"/><rect x="2" y="2" width="17" height="7" rx="1.4" fill={WC.fg}/></svg>
      </span>
    </div>
  );
}
// Eksponer hvis ikke finnes fra før
if (!window.H_StatusBarDark) window.H_StatusBarDark = W_StatusBarDark;

// ----- Stjernefelt (gjenbruk fra friendship_moment sin stil) -----
function W_StarField({ density = 80, opacity = 1, seed = 42 }) {
  const stars = useMemoW(() => {
    const arr = []; let s = seed;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < density; i++) {
      arr.push({ x: r()*100, y: r()*100, r: 0.3 + r()*1.4, o: 0.18 + r()*0.6, d: 3 + r()*6 });
    }
    return arr;
  }, [density, seed]);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity}}>
      {stars.map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r={s.r*0.18} fill={WC.fg} opacity={s.o}
          style={{animation:`wrapped_pulse ${s.d}s ease-in-out infinite`, animationDelay:`${(i%7)*0.4}s`}}/>
      ))}
    </svg>
  );
}

// ----- Global CSS (keyframes) injiseres én gang -----
function W_GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html:`
      @keyframes wrapped_pulse {
        0%, 100% { opacity: .2; }
        50%      { opacity: 1; }
      }
      @keyframes wrapped_fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes wrapped_fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes wrapped_breathe {
        0%, 100% { transform: scale(1); opacity: .85; }
        50%      { transform: scale(1.035); opacity: 1; }
      }
      @keyframes wrapped_slowDrift {
        0%   { transform: translate(0, 0); }
        50%  { transform: translate(6px, -4px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes wrapped_polaroidDeal {
        from { opacity: 0; transform: translateY(40px) rotate(-8deg) scale(.9); }
        to   { opacity: 1; transform: translateY(0) rotate(-3deg) scale(1); }
      }
      @keyframes wrapped_bar {
        from { width: 0%; }
        to   { width: var(--wrapped-bar, 100%); }
      }
      @keyframes wrapped_drawLine {
        from { stroke-dashoffset: var(--line-len, 400); }
        to   { stroke-dashoffset: 0; }
      }
      @keyframes wrapped_cityGlow {
        0%, 100% { opacity: .4; }
        50%      { opacity: 1; }
      }
      @keyframes wrapped_shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}}/>
  );
}

// ===== Felles UI: progress-barer på toppen av hver skjerm =====
function W_ProgressBars({ current, total, onJump }) {
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, zIndex:30,
      display:'flex', gap:4, padding:'50px 16px 0',
    }}>
      {Array.from({length: total}).map((_, i) => (
        <div key={i}
          onClick={(e)=>{ e.stopPropagation(); onJump && onJump(i); }}
          style={{
            flex:1, height:2.5, borderRadius:2,
            background: i < current ? WC.fg : (i === current ? 'rgba(247,240,232,.25)' : 'rgba(247,240,232,.15)'),
            cursor:'pointer', position:'relative', overflow:'hidden',
          }}>
          {i === current && (
            <div style={{
              position:'absolute', inset:0, background:WC.fg,
              animation:'wrapped_bar 4.6s linear forwards',
              transformOrigin:'left',
              borderRadius:2,
            }}/>
          )}
        </div>
      ))}
    </div>
  );
}

// ===================================================================
// Skjerm 1 — Velkomst
// ===================================================================
function W_Screen1_Welcome() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 300),
      setTimeout(()=>setStage(2), 1400),
      setTimeout(()=>setStage(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgTop} 0%, ${WC.bgMid} 50%, ${WC.bgDeep} 100%)`}}>
      <W_StarField density={90} opacity={.85} seed={17}/>
      {/* Atmosfære-glød */}
      <div style={{position:'absolute', top:-80, left:-80, width:360, height:360, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.lilac}33 0%, ${WC.plum}22 40%, transparent 70%)`,
        pointerEvents:'none', animation:'wrapped_slowDrift 14s ease-in-out infinite'}}/>
      <div style={{position:'absolute', bottom:-100, right:-60, width:320, height:320, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.coral}22 0%, ${WC.lilac}18 40%, transparent 70%)`,
        pointerEvents:'none', animation:'wrapped_slowDrift 18s ease-in-out infinite', animationDelay:'2s'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <W_StatusBarDark/>

        <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'0 32px', textAlign:'center'}}>
          {/* Liten tagg øverst */}
          <div style={{
            opacity: stage>=1 ? 1 : 0,
            transition:'opacity 1s ease',
            marginBottom:22,
          }}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999, border:`1px solid ${WC.fgFaint}`, background:'rgba(247,240,232,.05)', backdropFilter:'blur(10px)'}}>
              <span style={{width:6, height:6, borderRadius:3, background:WC.coral, display:'inline-block', animation:'wrapped_pulse 2s ease-in-out infinite'}}/>
              <span style={{fontSize:10.5, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:WC.fg}}>Wrapped · 2026</span>
            </div>
          </div>

          {/* Navnet i Caveat — stort, varmt */}
          <div style={{
            opacity: stage>=2 ? 1 : 0,
            transform: stage>=2 ? 'translateY(0)' : 'translateY(18px)',
            transition:'opacity 1.2s ease, transform 1.2s ease',
          }}>
            <div style={{
              fontFamily:'"Caveat","Kalam",cursive', fontSize:112, fontWeight:700,
              color:WC.fg, lineHeight:.9, letterSpacing:'-0.01em',
              textShadow:`0 0 40px ${WC.coral}55, 0 2px 20px rgba(0,0,0,.3)`,
            }}>
              Viktor.
            </div>
          </div>

          {/* Undertittel */}
          <div style={{
            opacity: stage>=3 ? 1 : 0,
            transform: stage>=3 ? 'translateY(0)' : 'translateY(12px)',
            transition:'opacity 1.2s ease, transform 1.2s ease',
            marginTop:18,
          }}>
            <div style={{fontSize:24, fontWeight:600, color:WC.fg, letterSpacing:'-0.015em', lineHeight:1.2, maxWidth:280}}>
              Året ditt i<br/>Speedfriending.
            </div>
          </div>
        </div>

        {/* Bunn-hint */}
        <div style={{
          padding:'0 0 44px', textAlign:'center',
          opacity: stage>=3 ? 1 : 0, transition:'opacity 1s ease',
        }}>
          <div style={{fontSize:11, color:WC.fgFaint, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600}}>
            Trykk for å fortsette
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 2 — Totalt antall events
// ===================================================================
function W_Screen2_Total() {
  const [count, setCount] = useStateW(0);
  const [stage, setStage] = useStateW(0);
  const target = 14;

  useEffectW(() => {
    setStage(1);
    const dur = 1800;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick); else setStage(2);
    };
    raf = requestAnimationFrame(tick);
    const t3 = setTimeout(()=>setStage(3), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(t3); };
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(170deg, ${WC.bgMid} 0%, ${WC.bgDeep} 55%, ${WC.bgPlum} 100%)`}}>
      <W_StarField density={60} opacity={.55} seed={91}/>
      {/* Konfetti-lignende prikker i bakgrunnen */}
      <div style={{position:'absolute', inset:0, pointerEvents:'none'}}>
        {[...Array(14)].map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280 / 233280;
          return (
            <div key={i} style={{
              position:'absolute',
              left: `${(seed * 100)}%`,
              top: `${((seed * 7.3) % 1) * 100}%`,
              width:6, height:6, borderRadius:3,
              background: i % 3 === 0 ? WC.coral : i % 3 === 1 ? WC.lilac : WC.amber,
              opacity: .25 + seed * 0.3,
              animation:`wrapped_breathe ${4 + seed*3}s ease-in-out infinite`,
              animationDelay:`${seed*2}s`,
            }}/>
          );
        })}
      </div>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 36px'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coral, marginBottom:18, opacity: stage>=1?1:0, transition:'opacity .6s'}}>
            I 2026
          </div>

          <div style={{fontSize:20, fontWeight:500, color:WC.fgDim, letterSpacing:'-0.01em', lineHeight:1.3}}>
            dro du på
          </div>

          {/* Stor tallvisning */}
          <div style={{display:'flex', alignItems:'baseline', gap:14, marginTop:8}}>
            <div style={{
              fontSize:180, fontWeight:800, color:WC.fg, lineHeight:.9,
              letterSpacing:'-0.04em',
              fontVariantNumeric:'tabular-nums',
              textShadow:`0 0 40px ${WC.coral}44, 0 4px 24px rgba(0,0,0,.3)`,
              fontFeatureSettings:'"tnum"',
            }}>
              {count}
            </div>
            <div style={{fontSize:36, fontWeight:700, color:WC.fg, letterSpacing:'-0.02em', paddingBottom:18}}>
              kvelder
            </div>
          </div>

          <div style={{
            marginTop:32,
            opacity: stage>=3 ? 1 : 0,
            transform: stage>=3 ? 'translateY(0)' : 'translateY(10px)',
            transition:'opacity 1s ease, transform 1s ease',
          }}>
            <div style={{
              padding:'18px 20px', borderRadius:18,
              background:'rgba(247,240,232,.07)',
              border:`1px solid ${WC.fgFaint}`,
              backdropFilter:'blur(14px)',
            }}>
              <div style={{fontSize:16, lineHeight:1.4, color:WC.fg, fontWeight:500}}>
                Det er mer enn <span style={{color:WC.coral, fontWeight:700}}>72 %</span> av Speedfriendings-brukere i Oslo.
              </div>
            </div>
          </div>
        </div>

        <div style={{padding:'0 0 44px', textAlign:'center'}}>
          <div style={{fontSize:10.5, color:WC.fgFaint, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600}}>
            Wrapped · 2 av 12
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 3 — Første event (Polaroid-stil)
// ===================================================================
function W_Screen3_FirstEvent() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 1100),
      setTimeout(()=>setStage(3), 2000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgTop} 0%, ${WC.bgMid} 60%, ${WC.bgDeep} 100%)`}}>
      <W_StarField density={45} opacity={.4} seed={303}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'60px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coralSoft}}>
            Husker du?
          </div>
          <div style={{
            fontFamily:'"Caveat","Kalam",cursive', fontSize:54, fontWeight:700,
            color:WC.fg, lineHeight:.95, marginTop:8,
          }}>
            22. januar.
          </div>
        </div>

        {/* Polaroid — tiltet, lys bakgrunn på fotoet */}
        <div style={{display:'flex', justifyContent:'center', marginTop:28, perspective:1000}}>
          <div style={{
            width:260, background:'#F7F0E8', borderRadius:4, padding:'14px 14px 4px',
            boxShadow:'0 18px 40px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.3)',
            transform:'rotate(-3.5deg)',
            opacity: stage>=2?1:0,
            animation: stage>=2 ? 'wrapped_polaroidDeal 1s cubic-bezier(.25,.9,.3,1.1) forwards' : 'none',
          }}>
            {/* "Foto" — stilisert vinkveld-scene med gradient og vinglass-SVG */}
            <div style={{
              width:'100%', height:260, borderRadius:2, overflow:'hidden', position:'relative',
              background:`linear-gradient(170deg, #3B2C45 0%, #5C3E6E 50%, #8A5A3B 100%)`,
            }}>
              {/* Vinduslys-flekker */}
              <div style={{position:'absolute', top:18, left:20, width:56, height:78, borderRadius:4,
                background:`linear-gradient(180deg, ${WC.amber}aa 0%, ${WC.coralSoft}55 100%)`, opacity:.6, filter:'blur(2px)'}}/>
              <div style={{position:'absolute', top:18, left:84, width:56, height:78, borderRadius:4,
                background:`linear-gradient(180deg, ${WC.amber}aa 0%, ${WC.coralSoft}55 100%)`, opacity:.5, filter:'blur(2px)'}}/>
              {/* Bord-silhuett nederst */}
              <div style={{position:'absolute', bottom:0, left:0, right:0, height:80,
                background:`linear-gradient(180deg, transparent 0%, rgba(0,0,0,.55) 100%)`}}/>
              {/* Vinglass */}
              <svg viewBox="0 0 120 120" width="60" height="80" style={{position:'absolute', bottom:30, left:60}}>
                <path d="M30 10 Q30 45 60 48 Q90 45 90 10 Z" fill={`${WC.coral}bb`} stroke={WC.fg} strokeWidth="1" strokeOpacity=".4"/>
                <line x1="60" y1="48" x2="60" y2="95" stroke={WC.fg} strokeOpacity=".55" strokeWidth="1.5"/>
                <ellipse cx="60" cy="98" rx="22" ry="4" fill={WC.fg} fillOpacity=".5"/>
              </svg>
              {/* Stemningslys-glød */}
              <div style={{position:'absolute', bottom:40, right:30, width:40, height:40, borderRadius:'50%',
                background:`radial-gradient(circle, ${WC.amber}cc 0%, transparent 70%)`, filter:'blur(4px)'}}/>
            </div>
            {/* Håndskrevet undertekst */}
            <div style={{padding:'12px 4px 8px'}}>
              <div style={{fontFamily:'"Caveat","Kalam",cursive', fontSize:22, fontWeight:600, color:'#2A2134', lineHeight:1.05}}>
                Vinkvelden på Territoriet
              </div>
              <div style={{fontFamily:'"Caveat","Kalam",cursive', fontSize:15, color:'rgba(42,33,52,.6)', marginTop:2}}>
                Ditt aller første.
              </div>
            </div>
          </div>
        </div>

        {/* Liten note under bildet */}
        <div style={{
          padding:'28px 34px 0', textAlign:'center',
          opacity: stage>=3 ? 1 : 0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(10px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{fontSize:15, lineHeight:1.5, color:WC.fgDim, maxWidth:300, margin:'0 auto'}}>
            Du satt ved bordet nær vinduet.<br/>
            <span style={{color:WC.fg, fontWeight:600}}>Martine</span> hadde holdt av plassen.
          </div>
        </div>

        <div style={{flex:1}}/>
        <div style={{padding:'0 0 44px', textAlign:'center'}}>
          <div style={{fontSize:10.5, color:WC.fgFaint, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600}}>
            Der alt begynte
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 4 — Nye mennesker (horisontal avatar-scroll)
// ===================================================================
function W_Screen4_NewPeople() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 2200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const people = [
    { n:'Kari',    bg:'linear-gradient(135deg,#E8B8A0,#B5694A)', ring:WC.coral, tag:'NÆR'   },
    { n:'Erik',    bg:'linear-gradient(135deg,#7895C4,#2E4A75)', ring:WC.coral, tag:'VENN'  },
    { n:'Anja',    bg:'linear-gradient(135deg,#B890D4,#6A3F8A)', ring:WC.coral, tag:'VENN'  },
    { n:'Thomas',  bg:'linear-gradient(135deg,#5A6F8C,#2F3E54)', ring:WC.coral, tag:'VENN'  },
    { n:'Marte',   bg:'linear-gradient(135deg,#C89F6E,#8A5A3B)', ring:WC.coral, tag:'VENN'  },
    { n:'Jonas',   bg:'linear-gradient(135deg,#8FC4A8,#3F7A5E)', ring:null,      tag:null    },
    { n:'Mia',     bg:'linear-gradient(135deg,#E5B87A,#A67028)', ring:null,      tag:null    },
    { n:'Olivia',  bg:'linear-gradient(135deg,#D685A5,#8C3860)', ring:null,      tag:null    },
    { n:'Sander',  bg:'linear-gradient(135deg,#A89BC9,#5A4A80)', ring:null,      tag:null    },
    { n:'Ingrid',  bg:'linear-gradient(135deg,#F2A68A,#C4553A)', ring:null,      tag:null    },
    { n:'Jakob',   bg:'linear-gradient(135deg,#5C7A8F,#2A3D4A)', ring:null,      tag:null    },
    { n:'Hannah',  bg:'linear-gradient(135deg,#E1A8C0,#A0547C)', ring:null,      tag:null    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(175deg, ${WC.bgMid} 0%, ${WC.bgDeep} 60%, ${WC.bgPlum} 100%)`}}>
      <W_StarField density={50} opacity={.4} seed={555}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'56px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.lilac}}>
            Dette året
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:32, fontWeight:700, color:WC.fg, letterSpacing:'-0.025em', lineHeight:1.15}}>
            Du ble koblet med
          </h1>
          <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:4}}>
            <div style={{fontSize:92, fontWeight:800, color:WC.fg, lineHeight:1, letterSpacing:'-0.04em', fontVariantNumeric:'tabular-nums'}}>12</div>
            <div style={{fontSize:26, fontWeight:600, color:WC.fg, letterSpacing:'-0.02em'}}>mennesker</div>
          </div>
        </div>

        {/* Avatar-scroll — grupperes i 2 rader som avslører seg */}
        <div style={{marginTop:36, opacity: stage>=2?1:0, transition:'opacity 1s ease'}}>
          {/* Rad 1 */}
          <div style={{display:'flex', gap:14, overflowX:'auto', padding:'4px 24px 10px', scrollbarWidth:'none'}}>
            {people.slice(0, 6).map((p, i) => (
              <div key={p.n} style={{
                flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                opacity: stage>=2 ? 1 : 0,
                transform: stage>=2 ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity .6s ease ${i*0.06}s, transform .6s ease ${i*0.06}s`,
              }}>
                <div style={{position:'relative'}}>
                  {p.ring && (
                    <div style={{position:'absolute', inset:-4, borderRadius:'50%', border:`1.5px solid ${p.ring}`, opacity:.85}}/>
                  )}
                  <div style={{
                    width:60, height:60, borderRadius:30, background:p.bg,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#FFF3E0', fontWeight:700, fontSize:22,
                    boxShadow:`0 0 0 2px ${WC.bgDeep}, 0 6px 16px rgba(0,0,0,.35)`,
                  }}>{p.n[0]}</div>
                </div>
                <div style={{fontSize:11.5, fontWeight:600, color:WC.fg}}>{p.n}</div>
              </div>
            ))}
          </div>
          {/* Rad 2 */}
          <div style={{display:'flex', gap:14, overflowX:'auto', padding:'4px 24px 10px', scrollbarWidth:'none', marginTop:6}}>
            {people.slice(6).map((p, i) => (
              <div key={p.n} style={{
                flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                opacity: stage>=2 ? 1 : 0,
                transform: stage>=2 ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity .6s ease ${(i+6)*0.06}s, transform .6s ease ${(i+6)*0.06}s`,
              }}>
                <div style={{
                  width:60, height:60, borderRadius:30, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#FFF3E0', fontWeight:700, fontSize:22,
                  boxShadow:`0 0 0 2px ${WC.bgDeep}, 0 6px 16px rgba(0,0,0,.35)`,
                  opacity:.86,
                }}>{p.n[0]}</div>
                <div style={{fontSize:11.5, fontWeight:500, color:WC.fgDim}}>{p.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brudd-statistikker */}
        <div style={{
          padding:'30px 32px 0',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{display:'flex', gap:12}}>
            <div style={{flex:1, background:'rgba(247,240,232,.08)', border:`1px solid ${WC.fgFaint}`, borderRadius:16, padding:'16px 18px', backdropFilter:'blur(14px)'}}>
              <div style={{fontSize:34, fontWeight:800, color:WC.fg, lineHeight:1, letterSpacing:'-0.03em'}}>4</div>
              <div style={{fontSize:12.5, color:WC.fgDim, marginTop:4, fontWeight:500}}>ble venner</div>
            </div>
            <div style={{flex:1, background:'rgba(240,130,107,.14)', border:`1px solid ${WC.coral}`, borderRadius:16, padding:'16px 18px', backdropFilter:'blur(14px)'}}>
              <div style={{fontSize:34, fontWeight:800, color:WC.coralSoft, lineHeight:1, letterSpacing:'-0.03em'}}>1</div>
              <div style={{fontSize:12.5, color:WC.fg, marginTop:4, fontWeight:600}}>ble nær</div>
            </div>
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 5 — Den nærmeste (Kari)
// ===================================================================
function W_Screen5_Closest() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 1800),
      setTimeout(()=>setStage(4), 2800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(175deg, ${WC.bgTop} 0%, ${WC.bgMid} 40%, ${WC.coralDeep} 130%)`}}>
      <W_StarField density={45} opacity={.35} seed={777}/>
      {/* Varmt glow bak Kari */}
      <div style={{position:'absolute', top:130, left:'50%', transform:'translateX(-50%)', width:360, height:360, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.coral}33 0%, ${WC.lilac}22 40%, transparent 70%)`,
        animation:'wrapped_breathe 5s ease-in-out infinite', pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'52px 32px 0', textAlign:'center', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coralSoft}}>
            Den nærmeste
          </div>
          <div style={{fontSize:20, color:WC.fgDim, marginTop:14, fontWeight:500}}>
            Du har tilbrakt flest timer med
          </div>
        </div>

        {/* Kari-avatar stort, med navn i Caveat */}
        <div style={{
          marginTop:22, display:'flex', flexDirection:'column', alignItems:'center',
          opacity: stage>=2?1:0,
          transform: stage>=2 ? 'scale(1)' : 'scale(.92)',
          transition:'opacity 1s ease, transform 1s cubic-bezier(.25,.9,.3,1.1)',
        }}>
          <div style={{position:'relative'}}>
            {/* Animerte ringer */}
            {[0, .6, 1.2].map(d => (
              <div key={d} style={{
                position:'absolute', inset:-20, borderRadius:'50%',
                border:`1px solid ${WC.coralSoft}`, opacity:.4,
                animation:'wrapped_breathe 3s ease-in-out infinite',
                animationDelay:`${d}s`,
              }}/>
            ))}
            <div style={{
              width:140, height:140, borderRadius:70,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:54,
              boxShadow:`0 0 0 4px ${WC.bgDeep}, 0 0 0 6px ${WC.coral}, 0 20px 50px rgba(0,0,0,.5)`,
            }}>K</div>
          </div>
          <div style={{
            fontFamily:'"Caveat","Kalam",cursive', fontSize:72, fontWeight:700,
            color:WC.fg, marginTop:16, lineHeight:.9, letterSpacing:'-0.01em',
          }}>
            Kari
          </div>
        </div>

        {/* Hovedtall */}
        <div style={{
          padding:'24px 32px 0', textAlign:'center',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{display:'inline-flex', alignItems:'baseline', gap:10}}>
            <div style={{fontSize:68, fontWeight:800, color:WC.fg, letterSpacing:'-0.03em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>87</div>
            <div style={{fontSize:22, fontWeight:600, color:WC.fg}}>timer</div>
          </div>
          <div style={{fontSize:13.5, color:WC.fgDim, marginTop:6, letterSpacing:'.02em'}}>siden februar</div>
        </div>

        {/* Bruddstatistikk */}
        <div style={{
          padding:'24px 32px 0',
          opacity: stage>=4?1:0,
          transform: stage>=4 ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{
            padding:'16px 20px', borderRadius:18,
            background:'rgba(247,240,232,.07)',
            border:`1px solid ${WC.fgFaint}`,
            backdropFilter:'blur(14px)',
          }}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, textAlign:'center'}}>
              <div>
                <div style={{fontSize:24, fontWeight:800, color:WC.fg, lineHeight:1, letterSpacing:'-0.02em'}}>11</div>
                <div style={{fontSize:10.5, color:WC.fgDim, marginTop:4, fontWeight:600, letterSpacing:'.04em'}}>kvelder</div>
              </div>
              <div style={{borderLeft:`1px solid ${WC.fgFaint}`, borderRight:`1px solid ${WC.fgFaint}`, padding:'0 8px'}}>
                <div style={{fontSize:24, fontWeight:800, color:WC.fg, lineHeight:1, letterSpacing:'-0.02em'}}>3</div>
                <div style={{fontSize:10.5, color:WC.fgDim, marginTop:4, fontWeight:600, letterSpacing:'.04em'}}>kaffeavtaler</div>
              </div>
              <div>
                <div style={{fontSize:24, fontWeight:800, color:WC.coralSoft, lineHeight:1, letterSpacing:'-0.02em'}}>1</div>
                <div style={{fontSize:10.5, color:WC.fg, marginTop:4, fontWeight:700, letterSpacing:'.04em'}}>hyttetur</div>
              </div>
            </div>
            <div style={{marginTop:14, fontSize:12.5, color:WC.fgDim, textAlign:'center', lineHeight:1.45}}>
              En spontan, den siste helgen i oktober.
            </div>
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 6 — Crew
// ===================================================================
function W_Screen6_Crew() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 2300),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const members = [
    { n:'Kari',   bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
    { n:'Erik',   bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
    { n:'Anja',   bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
    { n:'Thomas', bg:'linear-gradient(135deg,#5A6F8C,#2F3E54)' },
    { n:'Marte',  bg:'linear-gradient(135deg,#C89F6E,#8A5A3B)' },
  ];

  // Plasseringer i sirkel rundt midten for "crew formation"
  const positions = members.map((_, i) => {
    const angle = (i / members.length) * Math.PI * 2 - Math.PI/2;
    return { x: 50 + Math.cos(angle)*32, y: 50 + Math.sin(angle)*32 };
  });

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgMid} 0%, ${WC.bgDeep} 50%, ${WC.bgPlum} 100%)`}}>
      <W_StarField density={55} opacity={.45} seed={1010}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'52px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.lilac}}>
            I mai
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:32, fontWeight:700, color:WC.fg, letterSpacing:'-0.025em', lineHeight:1.15}}>
            ble du del av<br/>et <span style={{color:WC.coral}}>crew</span>
          </h1>
        </div>

        {/* Sirkel-formasjon */}
        <div style={{position:'relative', width:300, height:300, margin:'32px auto 0'}}>
          <svg viewBox="0 0 100 100" width={300} height={300} style={{position:'absolute', inset:0}}>
            <defs>
              <radialGradient id="crewCore" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor={WC.coral} stopOpacity=".42"/>
                <stop offset="1" stopColor={WC.lilac} stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="crewLink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={WC.coral}/><stop offset="1" stopColor={WC.lilac}/>
              </linearGradient>
            </defs>
            {stage>=2 && <circle cx="50" cy="50" r="32" fill="url(#crewCore)" style={{animation:'wrapped_breathe 4s ease-in-out infinite'}}/>}
            {/* Koble alle par med tynne linjer når stage>=2 */}
            {stage>=2 && positions.map((p, i) =>
              positions.slice(i+1).map((q, j) => (
                <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                  stroke="url(#crewLink)" strokeWidth=".35" opacity=".4"
                  style={{animation:`wrapped_fadeIn .8s ease ${0.3 + (i+j)*0.05}s both`}}/>
              ))
            )}
          </svg>

          {/* Medlemmer */}
          {members.map((m, i) => (
            <div key={m.n} style={{
              position:'absolute', left:`${positions[i].x}%`, top:`${positions[i].y}%`,
              transform:'translate(-50%,-50%)',
              display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              opacity: stage>=2?1:0,
              transition: `opacity .8s ease ${0.2 + i*0.12}s, transform .8s ease ${0.2 + i*0.12}s`,
            }}>
              <div style={{
                width:54, height:54, borderRadius:27, background:m.bg,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#FFF3E0', fontWeight:700, fontSize:20,
                boxShadow:`0 0 0 2.5px ${WC.bgDeep}, 0 6px 18px rgba(0,0,0,.4)`,
              }}>{m.n[0]}</div>
              <div style={{fontSize:10.5, fontWeight:700, color:WC.fg, textShadow:`0 0 4px ${WC.bgDeep}`}}>{m.n}</div>
            </div>
          ))}

          {/* V i midten */}
          <div style={{
            position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
            width:60, height:60, borderRadius:30,
            background:'linear-gradient(135deg,#D4A85C,#8A5A3B)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#FFF3E0', fontWeight:700, fontSize:22,
            boxShadow:`0 0 0 3px ${WC.bgDeep}, 0 0 0 5px ${WC.coral}, 0 8px 24px rgba(0,0,0,.4)`,
            zIndex:10,
          }}>V</div>
        </div>

        {/* Stat-badge */}
        <div style={{
          padding:'12px 32px 0', textAlign:'center',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{display:'inline-block', padding:'14px 22px', borderRadius:18,
            background:'rgba(247,240,232,.08)', border:`1px solid ${WC.fgFaint}`, backdropFilter:'blur(14px)'}}>
            <div style={{display:'flex', alignItems:'baseline', gap:8, justifyContent:'center'}}>
              <div style={{fontSize:36, fontWeight:800, color:WC.fg, letterSpacing:'-0.03em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>9</div>
              <div style={{fontSize:16, fontWeight:600, color:WC.fg}}>ganger som crew</div>
            </div>
            <div style={{fontSize:12.5, color:WC.fgDim, marginTop:6}}>Det er mer enn de fleste.</div>
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 7 — Sosial helse-kurve
// ===================================================================
function W_Screen7_HealthCurve() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 2400),
      setTimeout(()=>setStage(4), 3400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // 12 måneder, start høy (ensom), slutt lav (mindre ensom)
  const data = [
    { m: 'Jan', s: 7.6 }, { m: 'Feb', s: 7.8 }, { m: 'Mar', s: 7.2 },
    { m: 'Apr', s: 6.8 }, { m: 'Mai', s: 6.2 }, { m: 'Jun', s: 5.8 },
    { m: 'Jul', s: 5.5 }, { m: 'Aug', s: 5.2 }, { m: 'Sep', s: 4.9 },
    { m: 'Okt', s: 4.7 }, { m: 'Nov', s: 4.5 }, { m: 'Des', s: 4.7 },
  ];
  const chartW = 320, chartH = 180, padX = 14, padY = 20;
  const minS = 3, maxS = 9;
  const xFor = (i) => padX + (i / (data.length-1)) * (chartW - padX*2);
  const yFor = (s) => padY + (1 - (s - minS) / (maxS - minS)) * (chartH - padY*2);

  const pathD = data.map((d, i) => `${i===0 ? 'M' : 'L'} ${xFor(i).toFixed(2)} ${yFor(d.s).toFixed(2)}`).join(' ');
  const areaD = pathD + ` L ${xFor(data.length-1)} ${chartH - padY} L ${xFor(0)} ${chartH - padY} Z`;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.dawnTop} 0%, ${WC.dawnMid} 60%, ${WC.dawnBot} 100%)`}}>
      {/* Soft glow bak midt */}
      <div style={{position:'absolute', top:140, left:'50%', transform:'translateX(-50%)', width:440, height:300, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.coral}22 0%, transparent 60%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight/>

        <div style={{padding:'52px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coral}}>
            Din sosiale helse-kurve
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, color:WC.dayFg, letterSpacing:'-0.02em', lineHeight:1.2}}>
            Du startet året litt alene.<br/>
            Nå står du et annet sted.
          </h1>
        </div>

        {/* Stort forbedret-tall */}
        <div style={{
          padding:'20px 32px 0', display:'flex', alignItems:'baseline', gap:10,
          opacity: stage>=2?1:0, transform: stage>=2 ? 'translateY(0)' : 'translateY(8px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{fontSize:72, fontWeight:800, color:WC.coral, letterSpacing:'-0.035em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>
            38<span style={{fontSize:36, fontWeight:700}}>%</span>
          </div>
          <div style={{fontSize:14, color:WC.dayFgDim, fontWeight:600, lineHeight:1.3, maxWidth:120}}>
            bedre enn i januar
          </div>
        </div>

        {/* Grafen */}
        <div style={{margin:'22px 22px 0', background:WC.card, borderRadius:20, padding:'18px 10px 12px', boxShadow:'0 4px 20px rgba(42,33,52,.06), 0 0 0 1px rgba(42,33,52,.04)'}}>
          <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
            <defs>
              <linearGradient id="w7area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={WC.coral} stopOpacity=".32"/>
                <stop offset="1" stopColor={WC.coral} stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="w7line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={WC.plum}/>
                <stop offset="1" stopColor={WC.coral}/>
              </linearGradient>
            </defs>
            {/* Gridlines */}
            {[4,6,8].map(s => (
              <line key={s} x1={padX} x2={chartW-padX} y1={yFor(s)} y2={yFor(s)}
                stroke={WC.dayFg} strokeOpacity=".06" strokeDasharray="2 3"/>
            ))}

            {/* Area */}
            {stage>=3 && (
              <path d={areaD} fill="url(#w7area)" style={{animation:'wrapped_fadeIn 1.2s ease .4s both'}}/>
            )}
            {/* Line */}
            {stage>=3 && (
              <path d={pathD} fill="none" stroke="url(#w7line)" strokeWidth="2.8"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="700" strokeDashoffset="0"
                style={{animation:'wrapped_drawLine 1.8s ease forwards', '--line-len': '700'}}/>
            )}

            {/* Dagens punkt */}
            {stage>=4 && (
              <>
                <circle cx={xFor(data.length-1)} cy={yFor(data[data.length-1].s)} r="7"
                  fill="none" stroke={WC.coral} strokeOpacity=".4" strokeWidth="2">
                  <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite"/>
                  <animate attributeName="stroke-opacity" values=".4;0;.4" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx={xFor(data.length-1)} cy={yFor(data[data.length-1].s)} r="5" fill={WC.coral} stroke={WC.card} strokeWidth="2"/>
              </>
            )}

            {/* X-akse labels */}
            {data.filter((_, i) => i % 2 === 0).map((d, idx) => (
              <text key={d.m} x={xFor(idx*2)} y={chartH - 4} textAnchor="middle"
                fontSize="9" fill={WC.dayFgFaint} fontWeight="600">{d.m}</text>
            ))}
          </svg>
          <div style={{display:'flex', justifyContent:'space-between', padding:'4px 10px 0', fontSize:10, color:WC.dayFgFaint, fontWeight:600, letterSpacing:'.04em'}}>
            <span>Mer ensom</span>
            <span style={{color:WC.green}}>Mindre ensom ↓</span>
          </div>
        </div>

        {/* Under-note */}
        <div style={{
          padding:'20px 32px 0', opacity: stage>=4?1:0, transition:'opacity .8s',
        }}>
          <div style={{fontSize:13.5, lineHeight:1.5, color:WC.dayFgDim, fontWeight:500}}>
            Fysiske møter flytter kurven. Du dukket opp.
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 8 — Det stille øyeblikket
// ===================================================================
function W_Screen8_QuietMoment() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 300),
      setTimeout(()=>setStage(2), 1400),
      setTimeout(()=>setStage(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, #1A1224 0%, #2F2038 55%, #4A3654 100%)`}}>
      <W_StarField density={100} opacity={.9} seed={3141}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'58px 32px 0', opacity: stage>=1?1:0, transition:'opacity 1.2s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.lilac}}>
            7. mars · 14:23 · Bymarka
          </div>
          <div style={{
            fontFamily:'"Caveat","Kalam",cursive', fontSize:48, fontWeight:700,
            color:WC.fg, lineHeight:1, marginTop:14, letterSpacing:'-0.01em',
          }}>
            Et øyeblikk
          </div>
        </div>

        {/* Fjell-illustrasjon */}
        <div style={{margin:'24px 0 0', position:'relative', height:230, opacity: stage>=2?1:0, transition:'opacity 1.5s ease'}}>
          <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMax meet" width="100%" height="100%">
            <defs>
              <linearGradient id="w8moon" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor={WC.coralSoft} stopOpacity="1"/>
                <stop offset="1" stopColor={WC.amber} stopOpacity=".6"/>
              </linearGradient>
              <linearGradient id="w8far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={WC.plum} stopOpacity=".8"/>
                <stop offset="1" stopColor={WC.plum} stopOpacity=".3"/>
              </linearGradient>
              <linearGradient id="w8mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={WC.plumDeep} stopOpacity=".95"/>
                <stop offset="1" stopColor={WC.plumDeep} stopOpacity=".6"/>
              </linearGradient>
              <linearGradient id="w8near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1A1224" stopOpacity="1"/>
                <stop offset="1" stopColor="#1A1224" stopOpacity=".85"/>
              </linearGradient>
            </defs>
            {/* Sol/måne-glød */}
            <circle cx="300" cy="70" r="28" fill="url(#w8moon)" opacity=".85"
              style={{animation:'wrapped_breathe 6s ease-in-out infinite'}}/>
            <circle cx="300" cy="70" r="44" fill={WC.coralSoft} opacity=".14"/>

            {/* Bakerst — myke fjell */}
            <path d="M0 140 L40 110 L80 130 L130 95 L180 115 L240 85 L300 105 L360 90 L400 120 L400 230 L0 230 Z"
              fill="url(#w8far)"/>
            {/* Midterst */}
            <path d="M0 170 L30 150 L80 165 L140 140 L200 155 L260 135 L320 150 L400 140 L400 230 L0 230 Z"
              fill="url(#w8mid)"/>
            {/* Nærmest — skarpere, mørkere */}
            <path d="M0 195 L50 180 L110 190 L170 175 L230 188 L290 180 L360 192 L400 185 L400 230 L0 230 Z"
              fill="url(#w8near)"/>
            {/* Tre-silhuetter */}
            {[60, 130, 210, 295].map((x, i) => (
              <g key={i} transform={`translate(${x}, ${185 - (i%2)*3})`}>
                <path d="M0 0 L-4 8 L-2 8 L-5 14 L-2 14 L-5 20 L5 20 L2 14 L5 14 L2 8 L4 8 Z" fill="#0F0812"/>
              </g>
            ))}
          </svg>
        </div>

        {/* Teksten */}
        <div style={{
          padding:'24px 32px 0', textAlign:'center',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(10px)',
          transition:'opacity 1.5s ease, transform 1.5s ease',
        }}>
          <div style={{fontSize:16, lineHeight:1.55, color:WC.fgDim, fontWeight:500, maxWidth:320, margin:'0 auto'}}>
            Du merket ett øyeblikk som<br/>
            <span style={{fontFamily:'"Caveat","Kalam",cursive', fontSize:26, fontWeight:700, color:WC.fg, letterSpacing:'.005em'}}>
              "behold for meg selv"
            </span>
          </div>
          <div style={{marginTop:18, fontSize:13.5, color:WC.fgFaint, fontStyle:'italic', lineHeight:1.5, maxWidth:280, margin:'18px auto 0'}}>
            Vi sier ikke hva det var —<br/>
            det var ditt.
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 9 — Byen din (Oslo)
// ===================================================================
function W_Screen9_City() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // Stiliserte "lys" på et Oslo-kart. Noen uthevet (de Viktor var på), andre dimmet.
  const dots = useMemoW(() => {
    const arr = []; let s = 1234;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 140; i++) {
      arr.push({
        x: 10 + r()*80,
        y: 15 + r()*70,
        size: 1 + r()*1.4,
        isMine: r() < 0.1, // ca 14 stk uthevet
        delay: r()*3,
      });
    }
    return arr;
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgTop} 0%, ${WC.bgMid} 50%, #3A2A42 100%)`}}>
      <W_StarField density={30} opacity={.3} seed={2024}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'52px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coralSoft}}>
            Byen din
          </div>
          <div style={{
            fontFamily:'"Caveat","Kalam",cursive', fontSize:72, fontWeight:700,
            color:WC.fg, lineHeight:.9, marginTop:10, letterSpacing:'-0.01em',
          }}>
            Oslo
          </div>
          <div style={{fontSize:16, color:WC.fgDim, marginTop:10, lineHeight:1.4, maxWidth:300}}>
            hadde <span style={{color:WC.fg, fontWeight:700}}>386 events</span> på Speedfriending dette året.
          </div>
        </div>

        {/* Kart-felt */}
        <div style={{position:'relative', width:340, height:240, margin:'22px auto 0'}}>
          {/* Stilisert "fjord-ramme" */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width={340} height={240} style={{position:'absolute', inset:0, opacity: stage>=2 ? .6 : 0, transition:'opacity 1.2s ease'}}>
            {/* Oslofjorden-lignende form i bunn */}
            <path d="M0 75 Q20 70 35 74 Q50 80 65 76 Q80 72 100 78 L100 100 L0 100 Z" fill={WC.plum} opacity=".3"/>
            {/* Bymarka-silhuett på toppen */}
            <path d="M0 15 Q15 8 30 12 Q45 6 60 11 Q75 7 100 13 L100 0 L0 0 Z" fill={WC.plumDeep} opacity=".35"/>
            {/* Veier — stiliserte linjer */}
            <line x1="10" y1="50" x2="90" y2="50" stroke={WC.fgFaint} strokeWidth=".2" strokeOpacity=".4" strokeDasharray=".8 1.2"/>
            <line x1="50" y1="18" x2="50" y2="72" stroke={WC.fgFaint} strokeWidth=".2" strokeOpacity=".4" strokeDasharray=".8 1.2"/>
            <line x1="20" y1="25" x2="75" y2="65" stroke={WC.fgFaint} strokeWidth=".2" strokeOpacity=".3" strokeDasharray=".6 1.5"/>
          </svg>

          {/* Lysene */}
          {dots.map((d, i) => (
            <div key={i} style={{
              position:'absolute', left:`${d.x}%`, top:`${d.y}%`,
              width: d.isMine ? 6 : d.size*2, height: d.isMine ? 6 : d.size*2,
              borderRadius:'50%',
              background: d.isMine ? WC.coral : WC.fg,
              opacity: stage>=2 ? (d.isMine ? .95 : .3) : 0,
              boxShadow: d.isMine ? `0 0 12px ${WC.coral}, 0 0 4px ${WC.coralSoft}` : 'none',
              transition: `opacity 1s ease ${d.delay*0.2}s`,
              animation: d.isMine ? `wrapped_cityGlow ${2.5 + d.delay}s ease-in-out infinite` : 'none',
              animationDelay: `${d.delay}s`,
            }}/>
          ))}

          {/* Venue-labels (minimalt) */}
          {stage>=2 && [
            { x:'22%', y:'42%', label:'Territoriet' },
            { x:'58%', y:'32%', label:'Mathallen' },
            { x:'72%', y:'58%', label:'Bar Brutus' },
          ].map((v, i) => (
            <div key={v.label} style={{
              position:'absolute', left:v.x, top:v.y,
              fontSize:10, fontWeight:700, color:WC.fg, opacity:.85,
              textShadow:`0 0 4px ${WC.bgMid}`,
              pointerEvents:'none', whiteSpace:'nowrap',
              transform:'translate(8px, -2px)',
              animation:`wrapped_fadeIn .8s ease ${1 + i*0.3}s both`,
              letterSpacing:'.02em',
            }}>
              {v.label}
            </div>
          ))}
        </div>

        {/* Bunn-statistikk */}
        <div style={{
          padding:'12px 32px 0',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{
            padding:'16px 18px', borderRadius:16,
            background:'rgba(247,240,232,.08)', border:`1px solid ${WC.fgFaint}`, backdropFilter:'blur(14px)',
          }}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:WC.fgDim}}>Du var på</div>
                <div style={{fontSize:28, fontWeight:800, color:WC.fg, letterSpacing:'-0.02em', lineHeight:1, marginTop:2, fontVariantNumeric:'tabular-nums'}}>14 av 386</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:WC.fgDim}}>Ringvirkning</div>
                <div style={{fontSize:16, fontWeight:700, color:WC.coral, marginTop:4}}>1 av 28</div>
              </div>
            </div>
            <div style={{fontSize:12.5, color:WC.fgDim, marginTop:12, lineHeight:1.45}}>
              brukere i Oslo møttes på én av <em>dine</em> kvelder.
            </div>
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 10 — Hva som kommer (projeksjonskurve)
// ===================================================================
function W_Screen10_Projection() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
      setTimeout(()=>setStage(3), 2200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // Kurve som går fra 87 opp mot 200 — stiplet for fremtid
  const past = [
    {x:0, y:0}, {x:1, y:6}, {x:2, y:18}, {x:3, y:31},
    {x:4, y:46}, {x:5, y:58}, {x:6, y:72}, {x:7, y:87},
  ];
  const future = [
    {x:7, y:87}, {x:8, y:104}, {x:9, y:122}, {x:10, y:142}, {x:11, y:168}, {x:12, y:200},
  ];
  const chartW = 320, chartH = 180, padX = 16, padY = 24;
  const maxX = 12, maxY = 210;
  const xFor = (x) => padX + (x / maxX) * (chartW - padX*2);
  const yFor = (y) => chartH - padY - (y / maxY) * (chartH - padY*2);
  const pastD = past.map((p, i) => `${i===0?'M':'L'} ${xFor(p.x).toFixed(1)} ${yFor(p.y).toFixed(1)}`).join(' ');
  const futureD = future.map((p, i) => `${i===0?'M':'L'} ${xFor(p.x).toFixed(1)} ${yFor(p.y).toFixed(1)}`).join(' ');

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.dawnTop} 0%, #F7E8D5 50%, ${WC.coralSoft}22 100%)`}}>
      {/* Varm soloppgang-glød i hjørnet */}
      <div style={{position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.coralSoft}88 0%, ${WC.amber}55 40%, transparent 70%)`, pointerEvents:'none'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight/>

        <div style={{padding:'52px 32px 0', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coral}}>
            Hva som kommer
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, color:WC.dayFg, letterSpacing:'-0.02em', lineHeight:1.2}}>
            Ved 2027-rytme blir<br/>
            <span style={{color:WC.coral}}>Kari</span> din nærmeste venn.
          </h1>
        </div>

        {/* Projeksjonskurve */}
        <div style={{margin:'22px 22px 0', background:WC.card, borderRadius:20, padding:'18px 10px 12px', boxShadow:'0 4px 20px rgba(42,33,52,.06), 0 0 0 1px rgba(42,33,52,.04)'}}>
          <div style={{padding:'0 8px 6px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:WC.dayFgFaint}}>Timer med Kari</div>
              <div style={{display:'flex', gap:10, alignItems:'baseline', marginTop:2}}>
                <div style={{fontSize:28, fontWeight:800, color:WC.dayFg, letterSpacing:'-0.02em', lineHeight:1}}>87</div>
                <div style={{fontSize:14, color:WC.dayFgDim, fontWeight:600}}>→ 200</div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:WC.dayFgFaint}}>Gjenstår</div>
              <div style={{fontSize:22, fontWeight:800, color:WC.coral, letterSpacing:'-0.02em', lineHeight:1, marginTop:2}}>113 t</div>
            </div>
          </div>

          <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} style={{marginTop:4}}>
            <defs>
              <linearGradient id="w10area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={WC.coral} stopOpacity=".3"/>
                <stop offset="1" stopColor={WC.coral} stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Bakgrunn */}
            {[50, 100, 150, 200].map(y => (
              <line key={y} x1={padX} x2={chartW-padX} y1={yFor(y)} y2={yFor(y)}
                stroke={WC.dayFg} strokeOpacity=".06" strokeDasharray="2 3"/>
            ))}
            <text x={chartW-padX-2} y={yFor(200)-3} textAnchor="end" fontSize="9" fill={WC.dayFgFaint} fontWeight="600">200 t</text>

            {/* Area under fortiden */}
            {stage>=2 && (
              <path d={`${pastD} L ${xFor(7)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`} fill="url(#w10area)"
                style={{animation:'wrapped_fadeIn 1s ease .3s both'}}/>
            )}
            {/* Fortidens linje — heltrukket */}
            {stage>=2 && (
              <path d={pastD} fill="none" stroke={WC.plum} strokeWidth="2.6"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="300" strokeDashoffset="0"
                style={{animation:'wrapped_drawLine 1.4s ease forwards', '--line-len': '300'}}/>
            )}
            {/* Fremtidens linje — stiplet */}
            {stage>=3 && (
              <path d={futureD} fill="none" stroke={WC.coral} strokeWidth="2.6"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="5 5" opacity=".75"
                style={{animation:'wrapped_fadeIn 1s ease .2s both'}}/>
            )}
            {/* Dagens punkt */}
            {stage>=2 && <circle cx={xFor(7)} cy={yFor(87)} r="5" fill={WC.plum} stroke={WC.card} strokeWidth="2"/>}
            {/* Fremtidig mål-punkt */}
            {stage>=3 && (
              <>
                <circle cx={xFor(12)} cy={yFor(200)} r="6" fill="none" stroke={WC.coral} strokeWidth="2"
                  style={{animation:'wrapped_fadeIn 1s ease .8s both'}}/>
                <circle cx={xFor(12)} cy={yFor(200)} r="3" fill={WC.coral}
                  style={{animation:'wrapped_fadeIn 1s ease .8s both'}}/>
              </>
            )}
            {/* Labels */}
            <text x={xFor(0)} y={chartH-4} textAnchor="start" fontSize="9" fill={WC.dayFgFaint} fontWeight="600">Nå</text>
            <text x={xFor(12)} y={chartH-4} textAnchor="end" fontSize="9" fill={WC.dayFgFaint} fontWeight="600">Des 2027</text>
          </svg>
        </div>

        {/* Bruddstatistikk */}
        <div style={{
          padding:'18px 32px 0',
          opacity: stage>=3?1:0,
          transform: stage>=3 ? 'translateY(0)' : 'translateY(10px)',
          transition:'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{fontSize:13.5, lineHeight:1.5, color:WC.dayFgDim, fontWeight:500}}>
            Dere trenger <span style={{color:WC.dayFg, fontWeight:700}}>113 timer</span> sammen til.
          </div>
          <div style={{display:'flex', gap:10, marginTop:12}}>
            {[
              { big:'~14', small:'events' },
              { big:'3', small:'hyttehelger' },
              { big:'56', small:'kaffeavtaler' },
            ].map((x, i) => (
              <div key={i} style={{flex:1, background:WC.card, borderRadius:12, padding:'10px 12px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
                <div style={{fontSize:20, fontWeight:800, color:WC.dayFg, letterSpacing:'-0.02em', lineHeight:1}}>{x.big}</div>
                <div style={{fontSize:10.5, color:WC.dayFgDim, marginTop:3, fontWeight:600}}>{x.small}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{flex:1}}/>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 11 — Takk
// ===================================================================
function W_Screen11_Thanks() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 300),
      setTimeout(()=>setStage(2), 1600),
      setTimeout(()=>setStage(3), 2800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgMid} 0%, ${WC.coralDeep} 75%, ${WC.amber} 130%)`}}>
      <W_StarField density={50} opacity={.3} seed={9090}/>
      {/* Stort varmt glow */}
      <div style={{position:'absolute', bottom:-120, left:'50%', transform:'translateX(-50%)', width:500, height:400, borderRadius:'50%',
        background:`radial-gradient(circle, ${WC.amber}55 0%, ${WC.coral}33 40%, transparent 70%)`,
        pointerEvents:'none', animation:'wrapped_breathe 6s ease-in-out infinite'}}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 32px', textAlign:'center'}}>
        <W_StatusBarDark/>

        <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
          {/* Liten tagg */}
          <div style={{
            opacity: stage>=1?1:0,
            transition:'opacity 1s ease',
            marginBottom:30,
          }}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999, border:`1px solid ${WC.fgFaint}`, background:'rgba(247,240,232,.07)', backdropFilter:'blur(10px)'}}>
              <span style={{fontSize:10.5, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:WC.fg}}>2026</span>
            </div>
          </div>

          {/* "Takk" i Caveat, stort */}
          <div style={{
            opacity: stage>=1?1:0,
            transform: stage>=1 ? 'scale(1)' : 'scale(.92)',
            transition:'opacity 1.2s ease, transform 1.2s cubic-bezier(.25,.9,.3,1.1)',
          }}>
            <div style={{
              fontFamily:'"Caveat","Kalam",cursive', fontSize:144, fontWeight:700,
              color:WC.fg, lineHeight:.9, letterSpacing:'-0.02em',
              textShadow:`0 0 60px ${WC.coral}77, 0 4px 30px rgba(0,0,0,.4)`,
            }}>
              Takk.
            </div>
          </div>

          {/* Undertekst */}
          <div style={{
            marginTop:32,
            opacity: stage>=2?1:0,
            transform: stage>=2 ? 'translateY(0)' : 'translateY(14px)',
            transition:'opacity 1.4s ease, transform 1.4s ease',
          }}>
            <div style={{fontSize:18, lineHeight:1.5, color:WC.fg, fontWeight:500, maxWidth:320, margin:'0 auto', letterSpacing:'-0.005em'}}>
              for at du var til stede.
            </div>
          </div>

          <div style={{
            marginTop:22,
            opacity: stage>=3?1:0,
            transform: stage>=3 ? 'translateY(0)' : 'translateY(10px)',
            transition:'opacity 1.4s ease, transform 1.4s ease',
          }}>
            <div style={{fontSize:14.5, lineHeight:1.6, color:WC.fgDim, maxWidth:320, margin:'0 auto', fontWeight:500}}>
              Oslo er et litt mindre ensomt sted<br/>i kveld, fordi du dukket opp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// Skjerm 12 — Del din Wrapped (CTA + Instagram-forhåndsvisning)
// ===================================================================
function W_Screen12_Share() {
  const [stage, setStage] = useStateW(0);
  useEffectW(() => {
    const t = [
      setTimeout(()=>setStage(1), 200),
      setTimeout(()=>setStage(2), 900),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden',
      background:`linear-gradient(180deg, ${WC.bgTop} 0%, ${WC.bgMid} 50%, ${WC.bgDeep} 100%)`}}>
      <W_StarField density={70} opacity={.5} seed={4567}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <W_StatusBarDark/>

        <div style={{padding:'48px 32px 0', textAlign:'center', opacity: stage>=1?1:0, transition:'opacity .8s'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:WC.coralSoft}}>
            Del din Wrapped
          </div>
          <h1 style={{margin:'10px 0 0', fontSize:26, fontWeight:700, color:WC.fg, letterSpacing:'-0.02em', lineHeight:1.2}}>
            Fortell hvor du har vært.
          </h1>
        </div>

        {/* Story-forhåndsvisning — forenklet 9:16 kort */}
        <div style={{
          margin:'22px auto 0', width:220, height:354,
          borderRadius:22, overflow:'hidden',
          background:`linear-gradient(160deg, ${WC.bgTop} 0%, ${WC.coralDeep} 60%, ${WC.amber} 120%)`,
          boxShadow:'0 18px 40px rgba(0,0,0,.5), 0 0 0 3px rgba(247,240,232,.1)',
          position:'relative',
          opacity: stage>=1?1:0,
          transform: stage>=1 ? 'scale(1) rotate(-2deg)' : 'scale(.9) rotate(-2deg)',
          transition:'opacity 1s ease, transform 1s cubic-bezier(.25,.9,.3,1.1)',
        }}>
          {/* Indre stjerner */}
          <div style={{position:'absolute', inset:0, opacity:.4}}>
            <W_StarField density={30} opacity={.6} seed={8888}/>
          </div>
          {/* Speedfriending-logo øverst */}
          <div style={{position:'absolute', top:14, left:0, right:0, textAlign:'center'}}>
            <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:WC.fg, opacity:.85}}>
              Speedfriending · 2026
            </div>
          </div>

          {/* Hovedinnhold */}
          <div style={{position:'absolute', inset:'38% 16px 0', textAlign:'center'}}>
            <div style={{fontFamily:'"Caveat","Kalam",cursive', fontSize:44, fontWeight:700, color:WC.fg, lineHeight:.9, letterSpacing:'-0.01em', textShadow:`0 0 16px ${WC.coral}99`}}>
              Viktor
            </div>
            <div style={{fontSize:11.5, color:WC.fg, marginTop:8, opacity:.9, fontWeight:600, letterSpacing:'.02em'}}>
              dro på <span style={{fontWeight:800}}>14 kvelder</span>
            </div>
            <div style={{fontSize:11.5, color:WC.fg, opacity:.9, fontWeight:600, marginTop:3}}>
              møtte <span style={{fontWeight:800}}>12 mennesker</span>
            </div>
            <div style={{fontSize:11.5, color:WC.fg, opacity:.9, fontWeight:600, marginTop:3}}>
              1 ble <span style={{color:WC.coralSoft, fontWeight:800}}>nær</span>
            </div>
          </div>

          {/* Bunn */}
          <div style={{position:'absolute', bottom:14, left:0, right:0, textAlign:'center'}}>
            <div style={{fontSize:8.5, color:WC.fg, opacity:.7, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700}}>
              Oslo · 2026 Wrapped
            </div>
          </div>
        </div>

        {/* Plattform-ikoner */}
        <div style={{
          padding:'22px 32px 0',
          display:'flex', justifyContent:'center', gap:14,
          opacity: stage>=2?1:0, transition:'opacity 1s ease',
        }}>
          {['Instagram', 'TikTok', 'Snap', 'Meld.'].map(p => (
            <div key={p} style={{
              width:54, height:54, borderRadius:27,
              background:'rgba(247,240,232,.08)',
              border:`1px solid ${WC.fgFaint}`,
              backdropFilter:'blur(12px)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              fontSize:9, color:WC.fgDim, fontWeight:600,
            }}>
              <div style={{fontSize:18}}>{p[0]}</div>
            </div>
          ))}
        </div>

        <div style={{flex:1}}/>

        {/* CTAs */}
        <div style={{
          padding:'0 26px 30px',
          opacity: stage>=2?1:0, transition:'opacity 1s ease',
        }}>
          <button style={{
            width:'100%', height:54, borderRadius:27, border:'none',
            background:`linear-gradient(100deg, ${WC.coral} 0%, ${WC.coralDeep} 100%)`,
            color:WC.fg, fontSize:16, fontWeight:700,
            cursor:'pointer', boxShadow:`0 10px 28px ${WC.coral}55`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2v10m0 0L5 8m4 4l4-4M3 14v2h12v-2" stroke={WC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Del min Wrapped
          </button>
          <button style={{
            width:'100%', marginTop:10, height:48, borderRadius:24,
            border:`1px solid ${WC.fgFaint}`,
            background:'rgba(247,240,232,.04)', color:WC.fgDim,
            fontSize:14.5, fontWeight:600, cursor:'pointer',
          }}>
            Behold for meg selv
          </button>
          <div style={{textAlign:'center', marginTop:14, fontSize:10.5, color:WC.fgFaint, letterSpacing:'.08em', fontWeight:500}}>
            Ditt valg. Ingen får vite det hvis du ikke vil.
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// WRAPPER — indeks-state, auto-advance, sveipe
// ===================================================================
const WRAPPED_SCREENS = [
  W_Screen1_Welcome,
  W_Screen2_Total,
  W_Screen3_FirstEvent,
  W_Screen4_NewPeople,
  W_Screen5_Closest,
  W_Screen6_Crew,
  W_Screen7_HealthCurve,
  W_Screen8_QuietMoment,
  W_Screen9_City,
  W_Screen10_Projection,
  W_Screen11_Thanks,
  W_Screen12_Share,
];

function ScreenWrapped() {
  const [idx, setIdx] = useStateW(0);
  const total = WRAPPED_SCREENS.length;
  const touchStartX = useRefW(0);
  const touchStartY = useRefW(0);
  const Current = WRAPPED_SCREENS[idx];

  // Auto-advance hver 4.6s
  useEffectW(() => {
    const timer = setTimeout(() => {
      if (idx < total - 1) setIdx(idx + 1);
    }, 4600);
    return () => clearTimeout(timer);
  }, [idx, total]);

  const next = () => setIdx(i => Math.min(total - 1, i + 1));
  const prev = () => setIdx(i => Math.max(0, i - 1));

  const onTouchStart = (e) => {
    const t = e.touches ? e.touches[0] : e;
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  };

  const onClick = (e) => {
    // Venstre tredjedel = tilbake, høyre to-tredjedeler = frem
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) prev(); else next();
  };

  return (
    <div
      style={{position:'relative', height:'100%', overflow:'hidden', cursor:'pointer', userSelect:'none'}}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
    >
      <W_GlobalStyles/>

      {/* Progress-barer øverst */}
      <W_ProgressBars current={idx} total={total} onJump={setIdx}/>

      {/* Aktiv skjerm — får egen key så animasjoner restartes */}
      <div key={idx} style={{position:'absolute', inset:0, animation:'wrapped_fadeIn .4s ease'}}>
        <Current/>
      </div>

      {/* Subtil pil-hint nederst */}
      {idx < total - 1 && (
        <div style={{
          position:'absolute', bottom:22, right:22, zIndex:20,
          width:36, height:36, borderRadius:18,
          background:'rgba(247,240,232,.12)', border:`1px solid ${WC.fgFaint}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(10px)', pointerEvents:'none',
          opacity:.7,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" stroke={WC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
    </div>
  );
}

window.H_ScreenWrapped = ScreenWrapped;
window.WC = WC; // Gjør palett tilgjengelig for andre screens hvis ønsket
