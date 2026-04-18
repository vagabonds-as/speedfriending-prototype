/* global React, HC, H_StatusBarLight */
// B2B-suite: landingsside for HR-ledere, HR-dashboard og den offentlige Loneliness Report Oslo 2027.
// Alle tre renderes i mobilviewport (402×874). Visuelt mer behersket enn forbrukerappen —
// Modern Health / Lyra Health-aktig: mye hvitt, stramme typografi-grids, tall uten spinn.

// ---------------------------------------------------------------------------
// Felles primitiver
// ---------------------------------------------------------------------------

function B2B_Chrome({ children, bg }) {
  // Enklere ramme enn forbrukerappen — ingen tab-bar. Mobilviewport for å vise
  // hvordan HR-lederen opplever siden på telefon (LinkedIn-klikk o.l.).
  return (
    <div style={{
      width:402, height:874, borderRadius:52, overflow:'hidden', position:'relative',
      background: bg || '#FFFFFF',
      boxShadow:'0 0 0 12px #0F0812, 0 0 0 13px rgba(255,255,255,.06), 0 60px 120px rgba(0,0,0,.5), 0 20px 40px rgba(0,0,0,.3)',
    }}>
      <div style={{position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:124, height:36, borderRadius:22, background:'#000', zIndex:50}}/>
      <div style={{position:'absolute', inset:0}}>{children}</div>
      <div style={{position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:138, height:5, borderRadius:3, background:'rgba(0,0,0,.25)', zIndex:60}}/>
    </div>
  );
}

function B2B_Wordmark({ color }) {
  // Liten "Speedfriending for Teams"-lockup. Strammere enn forbruker-logoen.
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:8}}>
      <div style={{
        width:22, height:22, borderRadius:6,
        background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{width:8, height:8, borderRadius:4, background:'#FFF'}}/>
      </div>
      <div style={{fontSize:13, fontWeight:700, letterSpacing:'-.01em', color: color || HC.fg}}>
        Speedfriending <span style={{fontWeight:500, opacity:.6}}>for Teams</span>
      </div>
    </div>
  );
}

function B2B_Kicker({ children, color }) {
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color: color || HC.plum}}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1) B2B-LANDINGSSIDE
// ---------------------------------------------------------------------------

function ScreenB2BLanding() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FFFFFF'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="09:14"/>

        {/* Topp-nav — behersket, som et SaaS-tilbud */}
        <div style={{padding:'18px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <B2B_Wordmark/>
          <button style={{background:'transparent', border:'none', fontSize:12.5, fontWeight:600, color:HC.fgDim, cursor:'pointer', padding:0}}>
            Logg inn
          </button>
        </div>

        {/* Hero */}
        <div style={{padding:'44px 26px 0'}}>
          <B2B_Kicker color={HC.plum}>For HR og People Ops</B2B_Kicker>
          <h1 style={{margin:'14px 0 0', fontSize:34, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.08, color:HC.fg}}>
            Reduser ensomhet i din arbeidsstyrke.
            <br/>
            <span style={{color:HC.plumDeep}}>Målbart.</span>
          </h1>
          <p style={{margin:'18px 0 0', fontSize:15, lineHeight:1.55, color:HC.fgDim}}>
            Hjemmekontor gjorde teamet ditt mer produktivt — og mer isolert. Speedfriending er et benefit
            for ansatte: kuraterte småskala-events i Oslo og Trondheim, hver uke, måleksponert gjennom UCLA
            Loneliness Scale.
          </p>

          <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:10}}>
            <button style={{
              width:'100%', padding:'16px 20px', borderRadius:12, border:'none',
              background:HC.plumDeep, color:'#FFF', fontSize:14.5, fontWeight:700, cursor:'pointer',
              letterSpacing:'-.005em',
            }}>
              Pilot med 20 ansatte — 1 måned gratis
            </button>
            <button style={{
              width:'100%', padding:'16px 20px', borderRadius:12,
              background:'transparent', color:HC.fg, fontSize:14.5, fontWeight:600, cursor:'pointer',
              border:`1px solid ${HC.divider}`,
            }}>
              Book 20 min demo
            </button>
          </div>

          <div style={{marginTop:16, fontSize:11.5, color:HC.fgFaint, lineHeight:1.5}}>
            Ingen kredittkort. GDPR-compliant. Data holdt i EU (Frankfurt).
          </div>
        </div>

        {/* Problem-boks: kostnadstall */}
        <div style={{padding:'44px 26px 0'}}>
          <B2B_Kicker color={HC.coralDeep}>Det skjulte tallet</B2B_Kicker>
          <div style={{
            marginTop:14, padding:'26px 22px', borderRadius:16,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{fontSize:44, fontWeight:700, letterSpacing:'-.035em', color:HC.coralDeep, lineHeight:1}}>
              2 mrd kr
            </div>
            <div style={{marginTop:8, fontSize:13.5, lineHeight:1.5, color:HC.fg, fontWeight:600}}>
              Det ensomme ansatte koster norske arbeidsgivere årlig.
            </div>
            <div style={{marginTop:6, fontSize:11.5, lineHeight:1.5, color:HC.fgDim}}>
              Sykefravær, redusert engasjement, turnover. Cigna Loneliness at Work, 2024 — ekstrapolert
              til norsk lønnsmasse (SSB).
            </div>
          </div>

          {/* Tre understøttende tall */}
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{padding:'16px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:24, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>58%</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:4, lineHeight:1.4}}>av norske kontoransatte rapporterer ukentlig ensomhet i arbeidstid.</div>
            </div>
            <div style={{padding:'16px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:24, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>2,3×</div>
              <div style={{fontSize:11, color:HC.fgDim, marginTop:4, lineHeight:1.4}}>så sannsynlig at ensomme ansatte slutter innen 12 mnd.</div>
            </div>
          </div>
        </div>

        {/* Case-studier */}
        <div style={{padding:'44px 26px 0'}}>
          <B2B_Kicker>Resultater fra pilotene</B2B_Kicker>
          <div style={{fontSize:11, color:HC.fgFaint, marginTop:6, marginBottom:16}}>
            Anonymisert med samtykke. Tall fra deltakende ansattes egenrapportering (UCLA LS-3, NPS).
          </div>

          {[
            {
              co:'Cognite', sector:'SaaS · 480 ansatte',
              big:'42%', bigLabel:'reduksjon i rapportert isolasjon',
              meta:'Over 3 måneder · 87 av 124 ansatte aktiverte',
              q:'«Vi trodde vi måtte løse det på kontoret. Det viste seg at ansatte heller ville møte kolleger andre steder — over noe annet enn jobb.»',
              who:'Ingrid H., People Ops Lead',
              tint:HC.plum,
            },
            {
              co:'Et norsk advokatfirma', sector:'Juridisk · 210 ansatte',
              big:'+18', bigLabel:'punkter i NPS blant juniorer',
              meta:'6 måneder · yngre ansatte 25–32 var hovedgruppen',
              q:'«Gjennomtrekket blant juniorer var problemet vi ikke hadde vokabular for. Dette ga oss både tall og tiltak.»',
              who:'Fung. HR-direktør',
              tint:HC.coralDeep,
            },
            {
              co:'Et Oslo-kommunalt foretak', sector:'Offentlig · 1 100 ansatte',
              big:'−0,9', bigLabel:'i gjennomsnittlig UCLA LS-score',
              meta:'4 måneder · pilot i to avdelinger',
              q:'«Vi har for første gang et benefit de ansatte selv ber om igjen.»',
              who:'Avd.leder, organisasjon',
              tint:HC.green,
            },
          ].map((c, i) => (
            <div key={i} style={{
              marginTop: i === 0 ? 0 : 14,
              padding:'22px 20px', borderRadius:16, background:'#FFF',
              border:`1px solid ${HC.divider}`,
              boxShadow:'0 2px 12px rgba(42,33,52,.04)',
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{c.co}</div>
                <div style={{fontSize:10.5, color:HC.fgFaint}}>{c.sector}</div>
              </div>
              <div style={{marginTop:14, display:'flex', alignItems:'baseline', gap:12}}>
                <div style={{fontSize:38, fontWeight:700, color:c.tint, letterSpacing:'-.03em', lineHeight:1}}>{c.big}</div>
                <div style={{fontSize:12, color:HC.fg, fontWeight:600, lineHeight:1.3}}>{c.bigLabel}</div>
              </div>
              <div style={{marginTop:8, fontSize:11, color:HC.fgDim}}>{c.meta}</div>
              <div style={{marginTop:14, paddingLeft:12, borderLeft:`2px solid ${c.tint}40`, fontSize:12.5, lineHeight:1.55, fontStyle:'italic', color:HC.fg}}>
                {c.q}
              </div>
              <div style={{marginTop:8, fontSize:11, color:HC.fgFaint}}>— {c.who}</div>
            </div>
          ))}
        </div>

        {/* Hva inkluderer pilot */}
        <div style={{padding:'44px 26px 0'}}>
          <B2B_Kicker>Hva piloten inkluderer</B2B_Kicker>
          <div style={{marginTop:14, background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { t:'Opp til 20 ansatte', d:'Invitert via jobbmail eller domene-SSO. Ansatte eier kontoen selv.' },
              { t:'Ubegrenset events', d:'3–8 events i uka i Oslo/Trondheim. Vi kuraterer, bedriften betaler ikke per event.' },
              { t:'Kvartalsvis rapport', d:'Aggregert UCLA-score, deltakelse, NPS. Kun avdelinger med 10+ ansatte.' },
              { t:'Dedikert onboarding', d:'30 min med ditt People Ops-team, invitasjonsmateriell og intern lansering.' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                padding:'14px 18px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', gap:14, alignItems:'flex-start',
              }}>
                <div style={{width:22, height:22, borderRadius:11, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
                  <svg width="11" height="11" viewBox="0 0 11 11"><path d="M1.5 5.5l2.5 2.5L9.5 2" stroke={HC.plum} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{row.t}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.45}}>{row.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:16, padding:'14px 16px', background:HC.cream, borderRadius:12, fontSize:11.5, color:HC.fgDim, lineHeight:1.5}}>
            <span style={{color:HC.fg, fontWeight:700}}>Etter piloten:</span> 99 kr per ansatt per måned.
            Ingen bindingstid. Kanselleres når som helst.
          </div>
        </div>

        {/* Avsluttende CTA */}
        <div style={{padding:'44px 26px 0'}}>
          <div style={{
            padding:'26px 22px', borderRadius:18,
            background:`linear-gradient(135deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`,
            color:'#FFF',
          }}>
            <div style={{fontSize:20, fontWeight:700, letterSpacing:'-.015em', lineHeight:1.2}}>
              La oss regne på din bedrift.
            </div>
            <div style={{marginTop:10, fontSize:13, lineHeight:1.5, opacity:.9}}>
              20-minutters samtale. Vi viser hvordan UCLA-målingen fungerer, og hva det koster i ditt team
              hvis ingenting endres.
            </div>
            <button style={{
              marginTop:18, padding:'14px 20px', borderRadius:10, border:'none',
              background:'#FFF', color:HC.plumDeep, fontSize:13.5, fontWeight:700, cursor:'pointer',
              width:'100%',
            }}>
              Book demo →
            </button>
          </div>

          <div style={{marginTop:28, paddingTop:22, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontSize:10.5, color:HC.fgFaint}}>
              Speedfriending AS · Org. 925 111 222
            </div>
            <div style={{display:'flex', gap:14, fontSize:10.5, color:HC.fgDim}}>
              <span>Personvern</span>
              <span>Vilkår</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2) HR-DASHBOARD (Cognite)
// ---------------------------------------------------------------------------

function B2B_Sparkline({ points, color, height = 40, width = 130 }) {
  // Enkel SVG-sparkline for UCLA-score-fall.
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const path = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / range) * height;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const lastX = (points.length - 1) * step;
  const lastY = height - ((points[points.length - 1] - min) / range) * height;
  return (
    <svg width={width} height={height} style={{display:'block'}}>
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={lastX} cy={lastY} r="3" fill={color}/>
    </svg>
  );
}

function ScreenB2BDashboard() {
  const uclaPoints = [5.2, 5.1, 5.0, 4.8, 4.6, 4.5, 4.4, 4.3];
  const departments = [
    { name:'Engineering', n:58, activated:44, score:4.1, delta:-1.2 },
    { name:'Commercial', n:31, activated:22, score:4.5, delta:-0.7 },
    { name:'People & Finance', n:19, activated:15, score:4.2, delta:-0.9 },
    { name:'Design', n:16, activated:6, score:null, delta:null, suppressed:true }, // under 10 aktive
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F8F6F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="10:42"/>

        {/* Topp-bar */}
        <div style={{padding:'16px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <B2B_Wordmark/>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>Cognite</div>
            <div style={{width:28, height:28, borderRadius:14, background:'linear-gradient(135deg,#7895C4,#2E4A75)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF', fontWeight:700, fontSize:11}}>
              IH
            </div>
          </div>
        </div>

        {/* Hilsen + kontekst */}
        <div style={{padding:'22px 22px 0'}}>
          <B2B_Kicker>Dashboard · Q1 2027</B2B_Kicker>
          <h1 style={{margin:'8px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            God morgen, Ingrid.
          </h1>
          <div style={{marginTop:4, fontSize:12.5, color:HC.fgDim}}>
            Her er hvordan Speedfriending fungerer for Cognite akkurat nå.
          </div>
        </div>

        {/* Privacy-banner — bevisst fremhevet */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            padding:'12px 14px', borderRadius:10,
            background:`${HC.green}0D`, border:`1px solid ${HC.green}33`,
            display:'flex', alignItems:'flex-start', gap:10,
          }}>
            <div style={{width:22, height:22, borderRadius:11, background:`${HC.green}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
              <svg width="11" height="11" viewBox="0 0 11 11"><path d="M5.5 1L2 2.5V5c0 2.2 1.5 4 3.5 5 2-1 3.5-2.8 3.5-5V2.5L5.5 1z" fill="none" stroke={HC.green} strokeWidth="1.4"/></svg>
            </div>
            <div style={{fontSize:11, lineHeight:1.5, color:HC.fg}}>
              <span style={{fontWeight:700}}>Du ser aldri individdata.</span>
              <span style={{color:HC.fgDim}}> Tall er aggregert per avdeling, og kun vist hvis avdelingen har 10+ aktive ansatte.</span>
            </div>
          </div>
        </div>

        {/* Hovedtall — KPI-grid */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {/* Aktivering */}
            <div style={{padding:'16px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Aktivering</div>
              <div style={{marginTop:10, display:'flex', alignItems:'baseline', gap:4}}>
                <div style={{fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>87</div>
                <div style={{fontSize:12, color:HC.fgDim}}>av 124</div>
              </div>
              <div style={{marginTop:8, height:5, borderRadius:3, background:HC.divider, overflow:'hidden'}}>
                <div style={{width:`${(87/124)*100}%`, height:'100%', background:HC.plum}}/>
              </div>
              <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim}}>70% · +6 siden forrige måned</div>
            </div>

            {/* NPS */}
            <div style={{padding:'16px 14px', borderRadius:12, background:'#FFF', border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>NPS deltakere</div>
              <div style={{marginTop:10, display:'flex', alignItems:'baseline', gap:4}}>
                <div style={{fontSize:26, fontWeight:700, color:HC.green, letterSpacing:'-.02em'}}>+54</div>
              </div>
              <div style={{marginTop:8, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>
                n = 61 svar. Over bransjegj.snitt (+38).
              </div>
            </div>
          </div>
        </div>

        {/* UCLA-score over tid */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{padding:'18px 18px', borderRadius:14, background:'#FFF', border:`1px solid ${HC.divider}`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>UCLA LS-3 · gjennomsnitt</div>
                <div style={{marginTop:10, display:'flex', alignItems:'baseline', gap:10}}>
                  <div style={{fontSize:32, fontWeight:700, color:HC.fg, letterSpacing:'-.025em', lineHeight:1}}>4,3</div>
                  <div style={{fontSize:12, color:HC.green, fontWeight:700}}>↓ 0,9</div>
                </div>
                <div style={{marginTop:6, fontSize:10.5, color:HC.fgDim}}>Fra 5,2 i jan → 4,3 i mar</div>
              </div>
              <B2B_Sparkline points={uclaPoints} color={HC.green}/>
            </div>

            {/* Skala-forklaring */}
            <div style={{marginTop:14, paddingTop:14, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', fontSize:10, color:HC.fgFaint}}>
              <span>3 = lite ensom</span>
              <span>6 = meget ensom</span>
              <span>9 = ekstrem</span>
            </div>
          </div>
        </div>

        {/* Per avdeling — aggregert */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12}}>
            <B2B_Kicker>Per avdeling</B2B_Kicker>
            <div style={{fontSize:10.5, color:HC.fgFaint}}>Min. 10 aktive</div>
          </div>

          <div style={{background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {departments.map((d, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', alignItems:'center', gap:12,
                opacity: d.suppressed ? .6 : 1,
              }}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{d.name}</div>
                  <div style={{fontSize:10.5, color:HC.fgDim, marginTop:2}}>
                    {d.activated} av {d.n} aktivert
                  </div>
                </div>
                {d.suppressed ? (
                  <div style={{fontSize:10.5, color:HC.fgFaint, fontStyle:'italic', textAlign:'right'}}>
                    Skjult — &lt;10 aktive
                  </div>
                ) : (
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-.01em'}}>{d.score.toString().replace('.',',')}</div>
                    <div style={{fontSize:10.5, color: d.delta < 0 ? HC.green : HC.coralDeep, fontWeight:600, marginTop:1}}>
                      {d.delta > 0 ? '+' : ''}{d.delta.toString().replace('.',',')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Topp 3 events */}
        <div style={{padding:'28px 22px 0'}}>
          <B2B_Kicker>Events ansatte har gått på</B2B_Kicker>
          <div style={{marginTop:12, background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`, overflow:'hidden'}}>
            {[
              { rank:1, t:'Onsdagsmiddag på Smalhans', cat:'Mat · Grünerløkka', n:34, tint:HC.coral },
              { rank:2, t:'Tirsdagsløp langs Akerselva', cat:'Aktivitet · Oslo', n:28, tint:HC.green },
              { rank:3, t:'Vinsmaking med Martine', cat:'Mat · Frogner', n:19, tint:HC.lilac },
            ].map((e, i, arr) => (
              <div key={i} style={{
                padding:'14px 16px',
                borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{
                  width:28, height:28, borderRadius:14,
                  background:`${e.tint}20`, color:e.tint,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:700,
                }}>
                  {e.rank}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{e.t}</div>
                  <div style={{fontSize:10.5, color:HC.fgDim, marginTop:1}}>{e.cat}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{e.n}</div>
                  <div style={{fontSize:10, color:HC.fgFaint}}>ansatte</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Månedsrapport — brevformat, PDF */}
        <div style={{padding:'28px 22px 0'}}>
          <B2B_Kicker>Månedsrapport</B2B_Kicker>
          <div style={{
            marginTop:12, padding:'22px 20px', borderRadius:14,
            background:HC.cream, border:`1px solid ${HC.divider}`,
          }}>
            <div style={{display:'flex', alignItems:'flex-start', gap:14}}>
              <div style={{
                width:44, height:58, borderRadius:4,
                background:'#FFF', border:`1px solid ${HC.divider}`,
                display:'flex', flexDirection:'column', padding:'6px 5px', gap:3, flexShrink:0,
                boxShadow:'0 2px 6px rgba(42,33,52,.06)',
              }}>
                <div style={{height:2, borderRadius:1, background:HC.plum, width:'70%'}}/>
                <div style={{height:1, borderRadius:.5, background:HC.divider, width:'100%'}}/>
                <div style={{height:1, borderRadius:.5, background:HC.divider, width:'85%'}}/>
                <div style={{height:1, borderRadius:.5, background:HC.divider, width:'92%'}}/>
                <div style={{height:1, borderRadius:.5, background:HC.divider, width:'70%'}}/>
                <div style={{flex:1}}/>
                <div style={{fontSize:6, fontWeight:700, color:HC.fgFaint, textAlign:'center'}}>PDF</div>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
                  Mars 2027 — et brev til People Ops
                </div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:4, lineHeight:1.5}}>
                  6 sider. Rå tall, anbefalinger og én historie fra en (samtykkende) ansatt.
                  Klar for styremøtet.
                </div>
              </div>
            </div>
            <button style={{
              marginTop:16, width:'100%', padding:'12px 16px', borderRadius:10,
              background:HC.plumDeep, color:'#FFF', border:'none',
              fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              Last ned PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3) LONELINESS REPORT OSLO 2027
// ---------------------------------------------------------------------------

function LR_BarRow({ label, value, max, color, suffix = '%' }) {
  const pct = (value / max) * 100;
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'9px 0'}}>
      <div style={{flex:'0 0 94px', fontSize:11.5, color:HC.fg, fontWeight:500}}>{label}</div>
      <div style={{flex:1, height:8, borderRadius:4, background:`${color}14`, overflow:'hidden'}}>
        <div style={{width:`${pct}%`, height:'100%', background:color, borderRadius:4}}/>
      </div>
      <div style={{flex:'0 0 42px', fontSize:11.5, color:HC.fg, fontWeight:700, textAlign:'right'}}>
        {value.toString().replace('.',',')}{suffix}
      </div>
    </div>
  );
}

function LR_TimeChart() {
  // Oslo-tall 2019–2027. Peak i 2021 (pandemi), nedgang etter 2024.
  const years = [
    { y:2019, v:10.2 },
    { y:2020, v:11.8 },
    { y:2021, v:14.5 },
    { y:2022, v:13.9 },
    { y:2023, v:13.4 },
    { y:2024, v:13.0 },
    { y:2025, v:12.3 },
    { y:2026, v:11.6 },
    { y:2027, v:11.0 },
  ];
  const w = 340, h = 130, padL = 26, padR = 10, padT = 14, padB = 22;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const maxV = 16, minV = 8;
  const xOf = (i) => padL + (i / (years.length - 1)) * innerW;
  const yOf = (v) => padT + (1 - (v - minV) / (maxV - minV)) * innerH;
  const path = years.map((p, i) => `${i===0?'M':'L'} ${xOf(i).toFixed(1)} ${yOf(p.v).toFixed(1)}`).join(' ');
  const areaPath = `${path} L ${xOf(years.length-1)} ${padT+innerH} L ${padL} ${padT+innerH} Z`;

  return (
    <svg width={w} height={h} style={{display:'block'}}>
      {/* Gridlines */}
      {[10, 12, 14].map(v => (
        <g key={v}>
          <line x1={padL} x2={w-padR} y1={yOf(v)} y2={yOf(v)} stroke={HC.divider} strokeWidth="1"/>
          <text x={padL-6} y={yOf(v)+3} fontSize="9" fill={HC.fgFaint} textAnchor="end">{v}%</text>
        </g>
      ))}
      {/* Area */}
      <path d={areaPath} fill={`${HC.plum}14`}/>
      {/* Line */}
      <path d={path} stroke={HC.plum} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Peak marker */}
      <circle cx={xOf(2)} cy={yOf(14.5)} r="4" fill={HC.coral} stroke="#FFF" strokeWidth="1.5"/>
      <text x={xOf(2)} y={yOf(14.5)-10} fontSize="9" fill={HC.coralDeep} textAnchor="middle" fontWeight="700">Pandemi-topp</text>
      {/* Current marker */}
      <circle cx={xOf(years.length-1)} cy={yOf(11.0)} r="4" fill={HC.plum} stroke="#FFF" strokeWidth="1.5"/>
      {/* X labels */}
      {years.map((p, i) => (i % 2 === 0 || i === years.length-1) && (
        <text key={p.y} x={xOf(i)} y={h-6} fontSize="9" fill={HC.fgDim} textAnchor="middle">{p.y}</text>
      ))}
    </svg>
  );
}

function ScreenLonelinessReport() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FAF7F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="08:30"/>

        {/* Report-header: hvitt-på-plum, avis-aktig */}
        <div style={{
          margin:'14px 18px 0', borderRadius:18,
          background:`linear-gradient(160deg, ${HC.plumDeep} 0%, ${HC.plum} 100%)`,
          color:'#FFF', padding:'26px 22px 28px',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>
          <div style={{position:'absolute', right:-60, bottom:-60, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.04)'}}/>

          <div style={{position:'relative'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.8}}>
              Oslo Loneliness Report · Årgang 2027
            </div>
            <h1 style={{margin:'14px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.1}}>
              Oslo er litt mindre ensom i 2027.
            </h1>
            <div style={{marginTop:12, fontSize:13, lineHeight:1.5, opacity:.9}}>
              For fjerde år på rad publiserer Speedfriending anonymiserte funn om ensomhet i hovedstaden.
              Årets rapport viser den første stabile nedgangen siden pandemien.
            </div>

            <div style={{marginTop:20, paddingTop:18, borderTop:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'baseline', gap:16}}>
              <div>
                <div style={{fontSize:40, fontWeight:700, letterSpacing:'-.03em', lineHeight:1}}>11%</div>
                <div style={{marginTop:4, fontSize:10.5, opacity:.85, maxWidth:160, lineHeight:1.4}}>
                  av voksne oslofolk rapporterer kronisk ensomhet
                </div>
              </div>
              <div style={{paddingLeft:16, borderLeft:'1px solid rgba(255,255,255,.2)'}}>
                <div style={{fontSize:11, fontWeight:700, color:HC.coralSoft}}>↓ fra 13%</div>
                <div style={{fontSize:10, opacity:.75, marginTop:2}}>2024-nivå</div>
              </div>
            </div>
          </div>
        </div>

        {/* Datagrunnlag */}
        <div style={{padding:'18px 26px 0', fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
          <span style={{color:HC.fg, fontWeight:700}}>Basert på anonymisert data fra 23 470 Oslo-brukere,</span> kombinert
          med SSB Levekårsundersøkelsen 2026 og egne UCLA-LS-målinger gjennom 2027.
        </div>

        {/* Nedgang over tid */}
        <div style={{padding:'32px 22px 0'}}>
          <B2B_Kicker color={HC.plum}>Kronisk ensomhet over tid</B2B_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>Andel voksne oslofolk, 2019–2027</div>
          <div style={{marginTop:16, padding:'16px 8px 8px', background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`}}>
            <LR_TimeChart/>
          </div>
          <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, lineHeight:1.5}}>
            Kronisk ensom = UCLA LS-3 ≥ 6 over minst tre sammenhengende målinger. Peak i 2021 sammenfaller
            med omfattende hjemmekontor og sosial distansering.
          </div>
        </div>

        {/* Bydel-oversikt */}
        <div style={{padding:'32px 22px 0'}}>
          <B2B_Kicker color={HC.plum}>Oslo etter bydel</B2B_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>
            Andel som oppgir å være ofte eller alltid ensom
          </div>
          <div style={{marginTop:14, padding:'12px 16px 14px', background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`}}>
            {[
              { b:'Gamle Oslo',    v:14.2, c:HC.coralDeep },
              { b:'Grünerløkka',   v:13.8, c:HC.coral },
              { b:'St. Hanshaugen',v:11.9, c:HC.amber },
              { b:'Sagene',        v:11.2, c:HC.amber },
              { b:'Frogner',       v:10.4, c:HC.plum },
              { b:'Nordre Aker',   v: 8.9, c:HC.lilac },
              { b:'Vestre Aker',   v: 7.8, c:HC.green },
              { b:'Nordstrand',    v: 7.2, c:HC.green },
            ].map((d, i, arr) => (
              <div key={i} style={{borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none'}}>
                <LR_BarRow label={d.b} value={d.v} max={16} color={d.c}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, lineHeight:1.5}}>
            Høyest i indre øst (Gamle Oslo, Grünerløkka) — preget av yngre innflyttere og høy andel aleneboende.
            Lavest på Nordstrand og Vestre Aker, der husholdningsstørrelse og botid er større.
          </div>
        </div>

        {/* Kjønn og alder */}
        <div style={{padding:'32px 22px 0'}}>
          <B2B_Kicker color={HC.plum}>Kjønn og alder</B2B_Kicker>
          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {/* Kjønn */}
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Kjønn</div>
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fg, marginBottom:4}}>
                    <span>Menn</span><span style={{fontWeight:700}}>12,4%</span>
                  </div>
                  <div style={{height:6, borderRadius:3, background:`${HC.plum}14`}}>
                    <div style={{width:'62%', height:'100%', background:HC.plum, borderRadius:3}}/>
                  </div>
                </div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fg, marginBottom:4}}>
                    <span>Kvinner</span><span style={{fontWeight:700}}>9,8%</span>
                  </div>
                  <div style={{height:6, borderRadius:3, background:`${HC.coral}14`}}>
                    <div style={{width:'49%', height:'100%', background:HC.coral, borderRadius:3}}/>
                  </div>
                </div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fg, marginBottom:4}}>
                    <span>Ikke-binær</span><span style={{fontWeight:700}}>14,1%</span>
                  </div>
                  <div style={{height:6, borderRadius:3, background:`${HC.amber}14`}}>
                    <div style={{width:'71%', height:'100%', background:HC.amber, borderRadius:3}}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Alder */}
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Alder</div>
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
                {[
                  { a:'18–29', v:15.8, w:0.99 },
                  { a:'30–44', v:10.2, w:0.64 },
                  { a:'45–59', v: 9.1, w:0.57 },
                  { a:'60–74', v:10.7, w:0.67 },
                  { a:'75+',   v:13.3, w:0.83 },
                ].map((r, i) => (
                  <div key={i}>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:HC.fg, marginBottom:4}}>
                      <span>{r.a}</span><span style={{fontWeight:700}}>{r.v.toString().replace('.',',')}%</span>
                    </div>
                    <div style={{height:6, borderRadius:3, background:`${HC.plum}10`}}>
                      <div style={{width:`${r.w*100}%`, height:'100%', background:HC.plum, borderRadius:3}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{marginTop:12, fontSize:11, color:HC.fg, lineHeight:1.5, padding:'12px 14px', background:'#FFF', borderRadius:10, border:`1px solid ${HC.divider}`}}>
            <span style={{fontWeight:700}}>U-kurven holder seg.</span>
            <span style={{color:HC.fgDim}}> Yngre (18–29) og eldre (75+) er mest utsatt — men av ulike grunner: frafall fra studievenner hos de unge, dødsfall og redusert mobilitet hos de eldste.</span>
          </div>
        </div>

        {/* Delbare statistikk-kort */}
        <div style={{padding:'32px 22px 0'}}>
          <B2B_Kicker color={HC.plum}>Del på sosiale medier</B2B_Kicker>
          <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
            Kopier som bilde eller lenke. Alle kort krediterer Oslo Loneliness Report 2027.
          </div>
          <div style={{marginTop:14, display:'flex', gap:10, overflowX:'auto', marginLeft:-22, marginRight:-22, paddingLeft:22, paddingRight:22, paddingBottom:6}}>
            {[
              { head:'11%', body:'av voksne oslofolk er kronisk ensomme i 2027.', tag:'Ned fra 13% i 2024', tint:HC.plum },
              { head:'15,8%', body:'blant 18–29-åringer. Den mest utsatte aldersgruppen.', tag:'Oslo 2027', tint:HC.coral },
              { head:'Gamle Oslo', body:'bydelen med høyest ensomhet. 14,2%.', tag:'Lavest: Nordstrand, 7,2%', tint:HC.coralDeep },
              { head:'23 470', body:'oslofolk bidro til årets rapport. Anonymt.', tag:'Speedfriending 2027', tint:HC.green },
            ].map((c, i) => (
              <div key={i} style={{
                flexShrink:0, width:220, aspectRatio:'4/5',
                borderRadius:16, overflow:'hidden', position:'relative',
                background:`linear-gradient(160deg, ${c.tint} 0%, ${c.tint}CC 100%)`,
                color:'#FFF', padding:'20px 18px',
                display:'flex', flexDirection:'column', justifyContent:'space-between',
                boxShadow:'0 6px 20px rgba(42,33,52,.12)',
              }}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', opacity:.85}}>
                  Oslo Loneliness 2027
                </div>
                <div>
                  <div style={{fontSize:36, fontWeight:700, letterSpacing:'-.03em', lineHeight:1}}>{c.head}</div>
                  <div style={{marginTop:10, fontSize:13, lineHeight:1.3, fontWeight:500}}>{c.body}</div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:9.5, opacity:.8}}>
                  <span>{c.tag}</span>
                  <span style={{fontWeight:700}}>SF</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anbefalinger til myndigheter */}
        <div style={{padding:'36px 22px 0'}}>
          <B2B_Kicker color={HC.coralDeep}>Våre anbefalinger til myndigheter</B2B_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
            Fire konkrete tiltak Oslo kommune og Helse- og omsorgsdepartementet kan iverksette i 2028.
          </div>

          <div style={{marginTop:16, display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                n:'01',
                t:'Øremerk 40 mill. kr til "tredje sted"-finansiering i Gamle Oslo og Grünerløkka',
                d:'Kafeer, biblioteker og nabolagshus som er åpne kveld/helg. Bydelene med høyest ensomhet har færrest gratis møteplasser per innbygger.',
              },
              {
                n:'02',
                t:'Gjør ensomhetskartlegging til del av fastlegens årskontroll for 75+',
                d:'UCLA LS-3 tar 90 sekunder. Fastlegen er første kontaktpunkt for eldre som bor alene. Screening må utløse konkret henvisning — ikke bare samtale.',
              },
              {
                n:'03',
                t:'Skattefradrag for bedrifter som investerer i sosiale benefits',
                d:'Samme modell som kjøp av treningsmedlemskap (trivselsytelser, skatteloven §5-15). Reduserer ensomhet og sykefravær samtidig.',
              },
              {
                n:'04',
                t:'Inkluder sosial tilknytning i Norges folkehelseindikator',
                d:'FHI måler fysisk aktivitet og ernæring. Sosial integrasjon mangler. Uten måling, ingen tiltak — og ingen oppfølging.',
              },
            ].map((r, i) => (
              <div key={i} style={{
                padding:'16px 18px', borderRadius:12,
                background:'#FFF', border:`1px solid ${HC.divider}`,
                display:'flex', gap:14, alignItems:'flex-start',
              }}>
                <div style={{fontSize:18, fontWeight:700, color:HC.coralDeep, letterSpacing:'-.02em', flexShrink:0, lineHeight:1.1, fontVariantNumeric:'tabular-nums'}}>
                  {r.n}
                </div>
                <div>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg, lineHeight:1.35}}>{r.t}</div>
                  <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.55}}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metodenotat + CTA til full rapport */}
        <div style={{padding:'32px 22px 0'}}>
          <div style={{padding:'18px 18px', background:HC.cream, borderRadius:12, border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Metode
            </div>
            <div style={{marginTop:8, fontSize:11.5, color:HC.fg, lineHeight:1.55}}>
              Tall er basert på UCLA Loneliness Scale (3 items) innhentet gjennom Speedfriending-appen
              over 12 måneder, koblet mot Oslo-bydel via postnummer. Vektet mot SSB bydelssammensetning
              (alder, kjønn, fødeland). Ingen individdata er tilgjengelig for kommune eller tredjepart.
              Data lagres i EU og slettes etter 36 måneder.
            </div>
            <button style={{
              marginTop:14, padding:'10px 14px', borderRadius:8, border:`1px solid ${HC.plum}`,
              background:'transparent', color:HC.plumDeep, fontSize:12, fontWeight:700, cursor:'pointer',
            }}>
              Last ned hele rapporten (PDF, 38 sider)
            </button>
          </div>

          <div style={{marginTop:24, textAlign:'center', fontSize:10.5, color:HC.fgFaint, lineHeight:1.55}}>
            Oslo Loneliness Report er utgitt av Speedfriending AS.<br/>
            Neste utgave: våren 2028.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Eksport
// ---------------------------------------------------------------------------

window.H_ScreenB2BLanding = ScreenB2BLanding;
window.H_ScreenB2BDashboard = ScreenB2BDashboard;
window.H_ScreenLonelinessReport = ScreenLonelinessReport;
window.H_B2BChrome = B2B_Chrome;
