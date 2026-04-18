/* global React, HC, H_StatusBarLight */
// Sesongale skjermer: jul, 17. mai (frokost + kveld), nyttår, sommer, vinter-modus (UI-variant),
// og nasjonal Loneliness Report Norway 2027.
//
// Tonen gjennom hele filen: voksen, varm, aldri stakkarsliggjørende. Brukerne er aktive —
// de er ikke "de ensomme", de er folk som bruker Speedfriending sesongalt.

// ---------------------------------------------------------------------------
// Små delte primitiver for seasonal-skjermene
// ---------------------------------------------------------------------------

function S_Kicker({ children, color }) {
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color: color || HC.plum}}>
      {children}
    </div>
  );
}

function S_EventCard({ day, time, title, venue, seats, tint, note }) {
  return (
    <div style={{
      padding:'16px 16px', borderRadius:14, background:HC.card,
      border:`1px solid ${HC.divider}`,
      boxShadow:'0 1px 4px rgba(42,33,52,.03)',
      display:'flex', gap:14, alignItems:'flex-start',
    }}>
      <div style={{
        width:46, height:52, borderRadius:10, background:`${tint}18`, color:tint,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        flexShrink:0, padding:'4px 0',
      }}>
        <span style={{fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase'}}>{day}</span>
        <span style={{fontSize:13, fontWeight:700, marginTop:2}}>{time}</span>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, lineHeight:1.3}}>{title}</div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3}}>{venue}</div>
        {note && <div style={{fontSize:11, color:tint, marginTop:5, fontWeight:600, fontStyle:'italic'}}>{note}</div>}
        <div style={{marginTop:8, display:'flex', alignItems:'center', gap:6}}>
          <div style={{display:'flex', marginLeft:0}}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:18, height:18, borderRadius:9,
                background:['#D4A85C','#B890D4','#7895C4'][i],
                border:'2px solid #FFF',
                marginLeft: i === 0 ? 0 : -6,
              }}/>
            ))}
          </div>
          <span style={{fontSize:10.5, color:HC.fgDim}}>{seats}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1) JUL-ALENE PROGRAM (23–26. DESEMBER)
// ---------------------------------------------------------------------------

function ScreenChristmas() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F7EEE6'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="16:42"/>

        {/* Hero: varm, moden — ingen "stakkarslig alene"-tone */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            borderRadius:22, overflow:'hidden', position:'relative',
            background:`linear-gradient(165deg, #5E3071 0%, #8A4C5E 55%, #C45A44 100%)`,
            color:'#FFF', padding:'28px 24px 26px',
          }}>
            {/* Subtile lyspunkter — ikke stjerner, men varme stuelys */}
            <div style={{position:'absolute', right:24, top:22, width:6, height:6, borderRadius:3, background:'rgba(255,230,180,.6)', boxShadow:'0 0 14px rgba(255,230,180,.8)'}}/>
            <div style={{position:'absolute', right:56, top:44, width:4, height:4, borderRadius:2, background:'rgba(255,230,180,.5)', boxShadow:'0 0 10px rgba(255,230,180,.7)'}}/>
            <div style={{position:'absolute', right:14, top:70, width:5, height:5, borderRadius:2.5, background:'rgba(255,230,180,.55)', boxShadow:'0 0 12px rgba(255,230,180,.7)'}}/>
            <div style={{position:'absolute', right:-40, bottom:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.04)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.82}}>
                23–26. desember
              </div>
              <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.1}}>
                Julen er her.
                <br/>
                <span style={{opacity:.88}}>Og vi er her.</span>
              </h1>
              <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.55, opacity:.92}}>
                23 andre oslofolk bruker Speedfriending gjennom helgen. Ingen krav, ingen førstkomme.
                Bare åpne dører i fire dager.
              </p>
              <div style={{marginTop:20, display:'flex', alignItems:'center', gap:14, fontSize:11.5, opacity:.85}}>
                <span>7 events</span>
                <span style={{opacity:.4}}>·</span>
                <span>Aftenen → 2. juledag</span>
              </div>
            </div>
          </div>
        </div>

        {/* "Dette er ikke" — kort tonesetting */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:'#FFF', border:`1px solid ${HC.divider}`,
            fontSize:12, lineHeight:1.55, color:HC.fg,
          }}>
            <span style={{fontWeight:700, color:HC.plum}}>Vi sier ikke "jul uten familie".</span>
            <span style={{color:HC.fgDim}}> Mange er her fordi de bor nytt i byen, fordi familien er i utlandet, eller fordi de rett og slett har lyst på gode mennesker i julen. Alle grunner er gyldige.</span>
          </div>
        </div>

        {/* Julaften — hovedevent */}
        <div style={{padding:'26px 22px 0'}}>
          <S_Kicker color={HC.coralDeep}>Julaften · 24. des</S_Kicker>
          <div style={{marginTop:10}}>
            <div style={{
              padding:'20px 20px', borderRadius:16,
              background:HC.card, border:`1px solid ${HC.divider}`,
              boxShadow:'0 4px 14px rgba(42,33,52,.05)',
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10}}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep}}>
                    17:00 · Kulturhuset
                  </div>
                  <h3 style={{margin:'6px 0 0', fontSize:19, fontWeight:700, color:HC.fg, letterSpacing:'-.015em', lineHeight:1.2}}>
                    Julaften på Kulturhuset
                  </h3>
                  <p style={{margin:'8px 0 0', fontSize:12.5, lineHeight:1.55, color:HC.fgDim}}>
                    Tradisjonell ribbe og pinnekjøtt, stearinlys, levende pianomusikk. 16 andre kommer —
                    vi sitter rundt to lange bord.
                  </p>
                </div>
                <div style={{
                  width:58, height:62, borderRadius:12,
                  background:`linear-gradient(160deg, ${HC.coralDeep}, #5E3071)`,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  color:'#FFF', flexShrink:0,
                }}>
                  <span style={{fontSize:9, fontWeight:700, letterSpacing:'.1em', opacity:.85}}>DES</span>
                  <span style={{fontSize:24, fontWeight:700, lineHeight:1, marginTop:2}}>24</span>
                </div>
              </div>

              <div style={{marginTop:16, paddingTop:14, borderTop:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <div style={{display:'flex'}}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{
                        width:24, height:24, borderRadius:12,
                        background:['#D4A85C','#B890D4','#7895C4','#3E8F65'][i],
                        border:'2px solid #FFF',
                        marginLeft: i === 0 ? 0 : -8,
                      }}/>
                    ))}
                    <div style={{
                      width:24, height:24, borderRadius:12,
                      background:HC.plum, border:'2px solid #FFF', marginLeft:-8,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#FFF', fontSize:9, fontWeight:700,
                    }}>+12</div>
                  </div>
                  <span style={{fontSize:11, color:HC.fgDim}}>16 påmeldt · plass til 4 til</span>
                </div>
                <div style={{fontSize:12.5, fontWeight:700, color:HC.plum}}>380 kr</div>
              </div>

              <button style={{
                marginTop:14, width:'100%', padding:'12px 16px', borderRadius:10, border:'none',
                background:HC.plumDeep, color:'#FFF', fontSize:13, fontWeight:700, cursor:'pointer',
              }}>
                Reserver plass
              </button>
            </div>
          </div>
        </div>

        {/* De andre dagene */}
        <div style={{padding:'26px 22px 0'}}>
          <S_Kicker color={HC.plum}>Hele helgen</S_Kicker>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { day:'23.12', time:'18:00', title:'Hjemmelaget julemat med 7 andre', venue:'Hos vertsfamilie på Grünerløkka', seats:'4 plasser igjen', tint:HC.amber, note:'Vi lager ribbe sammen fra kl 15' },
              { day:'25.12', time:'11:00', title:'Juletre-vandring i Frognerparken', venue:'Møtes ved hovedinngangen · gratis', seats:'11 påmeldt', tint:HC.green, note:null },
              { day:'25.12', time:'16:00', title:'1. juledag med risgrøt og film', venue:'Folketeatret kafé · Karl Johan', seats:'6 plasser igjen', tint:HC.lilac, note:null },
              { day:'26.12', time:'13:00', title:'Lang tur til Sognsvann, kaffe etterpå', venue:'T-bane 5 fra Nationaltheatret', seats:'14 påmeldt', tint:HC.plum, note:'Kledelig varmt' },
              { day:'26.12', time:'19:00', title:'2. juledag-vinsmaking', venue:'Søstrene Karlsen · Frogner', seats:'3 plasser igjen', tint:HC.coral, note:null },
              { day:'24.12', time:'22:00', title:'Julenatt-walk med gløgg', venue:'Aker Brygge → Operaen', seats:'9 påmeldt', tint:HC.coralDeep, note:'For nattugler' },
            ].map((e, i) => (
              <S_EventCard key={i} {...e}/>
            ))}
          </div>
        </div>

        {/* Myk oppfølging — Frida */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{
            padding:'16px 18px', borderRadius:14,
            background:`${HC.plum}0D`, border:`1px solid ${HC.plum}22`,
            display:'flex', gap:12, alignItems:'flex-start',
          }}>
            <div style={{
              width:36, height:36, borderRadius:18,
              background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF', fontWeight:700, fontSize:14, flexShrink:0,
            }}>F</div>
            <div style={{flex:1}}>
              <div style={{fontSize:12, fontWeight:700, color:HC.fg}}>Frida</div>
              <div style={{fontSize:12, color:HC.fg, marginTop:4, lineHeight:1.5}}>
                Hvis du vil snakke med meg gjennom julen, er jeg her. Ingen tidsavgrensning, ingen venteliste.
              </div>
              <button style={{
                marginTop:10, padding:'8px 14px', borderRadius:20, border:`1px solid ${HC.plum}`,
                background:'transparent', color:HC.plum, fontSize:11.5, fontWeight:700, cursor:'pointer',
              }}>
                Skriv til Frida
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2) 17. MAI-FROKOST
// ---------------------------------------------------------------------------

function ScreenMay17Morning() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FAF6F0'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="07:14"/>

        {/* Hero — rød/hvit/blå, men behersket */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            borderRadius:22, overflow:'hidden', position:'relative',
            background:'linear-gradient(165deg, #BA3247 0%, #932535 60%, #1F3B6F 100%)',
            color:'#FFF', padding:'28px 24px 28px',
          }}>
            {/* Subtile båndstripe-elementer, ikke flagg */}
            <div style={{position:'absolute', left:0, top:0, bottom:0, width:4, background:'rgba(255,255,255,.3)'}}/>
            <div style={{position:'absolute', right:-50, top:-50, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.85}}>
                17. mai · Morgen
              </div>
              <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.1}}>
                Ingen burde være alene på Norges nasjonaldag.
              </h1>
              <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.55, opacity:.92}}>
                Fire morgenevents i Oslo — frokost, vandring, barnetog-utsikt, familievennlig champagnebrunch.
                Møt hjelpsomme bordverter ved inngangen.
              </p>
            </div>
          </div>
        </div>

        {/* Sporstatus — tidslinje for dagen */}
        <div style={{padding:'22px 22px 0'}}>
          <S_Kicker color={HC.coralDeep}>Din morgen</S_Kicker>
          <div style={{
            marginTop:10, padding:'18px 18px', borderRadius:14,
            background:HC.card, border:`1px solid ${HC.divider}`,
          }}>
            {[
              { t:'07:00', title:'Møt opp ved Frognerparken', sub:'Viktor, du har valgt champagnebrunch-sporet', active:true },
              { t:'07:30', title:'Frokost starter', sub:'Langbord for 18 — du har plass 4' },
              { t:'10:00', title:'Vandring mot Karl Johan', sub:'Ca. 25 min gange · stopper innom Slottsparken' },
              { t:'11:00', title:'Barnetoget passerer', sub:'Vi står på Egertorget · lett å finne gruppen' },
            ].map((step, i, arr) => (
              <div key={i} style={{display:'flex', gap:12, paddingBottom: i < arr.length-1 ? 14 : 0}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0}}>
                  <div style={{
                    width:12, height:12, borderRadius:6,
                    background: step.active ? HC.coralDeep : `${HC.plum}33`,
                    border: step.active ? `3px solid ${HC.coralDeep}22` : 'none',
                  }}/>
                  {i < arr.length-1 && <div style={{width:1.5, flex:1, background:HC.divider, marginTop:4}}/>}
                </div>
                <div style={{flex:1, paddingBottom: i < arr.length-1 ? 4 : 0}}>
                  <div style={{display:'flex', gap:8, alignItems:'baseline'}}>
                    <span style={{fontSize:11, fontWeight:700, color:HC.coralDeep, fontVariantNumeric:'tabular-nums'}}>{step.t}</span>
                    <span style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>{step.title}</span>
                  </div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:3, lineHeight:1.45}}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Morgenevents */}
        <div style={{padding:'26px 22px 0'}}>
          <S_Kicker color={HC.plum}>Andre morgenalternativer</S_Kicker>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { day:'17.05', time:'07:00', title:'Champagnebrunch i Frognerparken', venue:'Langbord ved Vigelandsparken · 18 plasser', seats:'4 plasser igjen', tint:HC.coralDeep, note:'Bunad anbefales (ikke påkrevd)' },
              { day:'17.05', time:'08:30', title:'Frokost for familier med barn', venue:'Gamle Aker kirkegaard-kaféen · barnevennlig', seats:'9 av 20 · mye plass', tint:HC.green, note:'Barn under 10 gratis' },
              { day:'17.05', time:'09:00', title:'Flaggheising og kaffe ved Akershus', venue:'Oppmøte ved Myntgata 2', seats:'11 påmeldt', tint:HC.amber, note:null },
              { day:'17.05', time:'09:30', title:'Karl Johan-vandring for nye oslofolk', venue:'Start: Nationaltheatret T-bane', seats:'6 plasser igjen', tint:HC.plum, note:'For deg som flyttet hit i år' },
            ].map((e, i) => (
              <S_EventCard key={i} {...e}/>
            ))}
          </div>
        </div>

        {/* Bunad-uttrykket */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:`${HC.amber}10`, border:`1px solid ${HC.amber}44`,
            display:'flex', gap:12, alignItems:'flex-start',
          }}>
            <div style={{width:28, height:28, borderRadius:14, background:`${HC.amber}33`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke={HC.amber} strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div style={{fontSize:11.5, color:HC.fg, lineHeight:1.55}}>
              <span style={{fontWeight:700}}>Har du ikke bunad?</span>
              <span style={{color:HC.fgDim}}> Helt greit. Halvparten av folkene som kommer har festkjole, penbukse eller bare hva de har. 17. mai er om å være sammen, ikke om hva du har på.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3) 17. MAI-KVELD
// ---------------------------------------------------------------------------

function ScreenMay17Evening() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#2E1F3A'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:24, color:'#FFF'}}>
        <H_StatusBarLight time="19:42"/>

        {/* Hero — kveldsvarm, ikke fest-surrealistisk */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            borderRadius:22, overflow:'hidden', position:'relative',
            background:'linear-gradient(165deg, #5E3071 0%, #7B3E4F 55%, #C45A44 100%)',
            padding:'28px 24px 28px',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,230,180,.08)'}}/>
            <div style={{position:'absolute', right:30, top:50, width:5, height:5, borderRadius:2.5, background:'rgba(255,220,160,.7)', boxShadow:'0 0 12px rgba(255,220,160,.6)'}}/>
            <div style={{position:'absolute', right:70, top:30, width:3, height:3, borderRadius:1.5, background:'rgba(255,220,160,.5)', boxShadow:'0 0 8px rgba(255,220,160,.6)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.82}}>
                17. mai · Kveld
              </div>
              <h1 style={{margin:'14px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.15}}>
                Hagen, bålet, bunad-rusk.
              </h1>
              <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.55, opacity:.9}}>
                Etter frokost og barnetog: myk landing. Unge og eldre sammen, rundt et bål eller på en
                bakgårdsveranda. Stemningen er mett.
              </p>
            </div>
          </div>
        </div>

        {/* Kvelds-events */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.65)'}}>
            Fra 18:00 og utover
          </div>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                time:'18:00 → sent', title:'Bål og bunad-rusk i hagen',
                venue:'Privat hage på Vinderen · T-bane 1 til Vinderen',
                sub:'Vertsfamilie serverer rømmegrøt og spekemat. Barn rundt bålet, pensjonister i stoler, oss midt i.',
                host:'Marte og Jens · ambassadører siden 2024',
                seats:'12 av 20', tint:'#D9A24A',
              },
              {
                time:'19:00', title:'Tidlig-80-tall 17. mai-kveld',
                venue:'Bakgården på Kampen · Hølmas hovedinngang',
                sub:'Vi spiller plater fra den gangen, spiser marsipankake og synger «Ja vi elsker» én gang — før vi går over til samtaler.',
                host:'Erlend · ambassadør',
                seats:'7 av 14', tint:'#B788C9',
              },
              {
                time:'20:30', title:'Ung + eldre pizzakveld',
                venue:'Sentralen · Øvre Slottsgate',
                sub:'Vi blander bevisst aldersgrupper. Ingen "seniorbord" og "ungdomsbord". Bare bord.',
                host:'Speedfriending-kurert',
                seats:'18 av 30', tint:'#3E8F65',
              },
              {
                time:'22:00', title:'Taket på Sentralen — kveldsutsikt',
                venue:'Nederste rampe, 6. etg',
                sub:'Siste plassen på dagen. Litt musikk, utsikt over byen, en flaske å dele.',
                host:'Kurert kveldskrets',
                seats:'4 plasser igjen', tint:'#F0826B',
              },
            ].map((e, i) => (
              <div key={i} style={{
                padding:'18px 18px', borderRadius:14,
                background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:e.tint}}>
                    {e.time}
                  </div>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.55)'}}>{e.seats}</div>
                </div>
                <div style={{marginTop:8, fontSize:16, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.25}}>
                  {e.title}
                </div>
                <div style={{marginTop:4, fontSize:11.5, color:'rgba(255,255,255,.65)'}}>{e.venue}</div>
                <div style={{marginTop:10, fontSize:12, lineHeight:1.55, color:'rgba(255,255,255,.82)'}}>
                  {e.sub}
                </div>
                <div style={{marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.1)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.55)'}}>{e.host}</div>
                  <button style={{
                    padding:'7px 14px', borderRadius:18, border:`1px solid ${e.tint}`,
                    background:'transparent', color:e.tint, fontSize:11.5, fontWeight:700, cursor:'pointer',
                  }}>
                    Meld på
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-liner på dagen */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
            fontSize:11.5, lineHeight:1.55, color:'rgba(255,255,255,.75)',
          }}>
            <span style={{color:'#FFF', fontWeight:700}}>Mette etter frokost?</span> Det er helt greit å bare dukke opp.
            Ingen forventes å delta i alt. Du kan hoppe av og på — vi har ambassadører tilstede på alle events
            til kl 23.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4) NYTTÅRSAFTEN-EVENTS
// ---------------------------------------------------------------------------

function ScreenNewYear() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#1C1530'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:24, color:'#FFF'}}>
        <H_StatusBarLight time="22:18"/>

        {/* Hero */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            borderRadius:22, overflow:'hidden', position:'relative',
            background:'linear-gradient(165deg, #2A2134 0%, #5E3071 50%, #8B5A9E 100%)',
            padding:'32px 24px 28px',
          }}>
            {/* Subtile lyspunkter — ikke fyrverkeri, mer kveldslys */}
            <div style={{position:'absolute', top:20, right:40, width:4, height:4, borderRadius:2, background:'rgba(255,220,160,.8)', boxShadow:'0 0 12px rgba(255,220,160,.8)'}}/>
            <div style={{position:'absolute', top:50, right:80, width:3, height:3, borderRadius:1.5, background:'rgba(255,220,160,.6)', boxShadow:'0 0 10px rgba(255,220,160,.6)'}}/>
            <div style={{position:'absolute', top:28, right:110, width:5, height:5, borderRadius:2.5, background:'rgba(250,178,157,.8)', boxShadow:'0 0 14px rgba(250,178,157,.8)'}}/>
            <div style={{position:'absolute', bottom:20, right:20, width:3, height:3, borderRadius:1.5, background:'rgba(183,136,201,.7)', boxShadow:'0 0 10px rgba(183,136,201,.7)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', opacity:.78}}>
                31. desember 2027
              </div>
              <h1 style={{margin:'16px 0 0', fontSize:32, fontWeight:700, letterSpacing:'-.03em', lineHeight:1.05}}>
                Et år tar slutt.
                <br/>
                <span style={{background:'linear-gradient(90deg, #FAB29D, #B788C9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Et nytt begynner.</span>
              </h1>
              <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.55, opacity:.88}}>
                Fem kvelder. Fem måter å feire på. Vi har kuratert nyttårsaftener der ingen havner alene
                ved midnatt — uten at det skal føles som arrangert tristhet.
              </p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'18px 20px', borderRadius:14,
            background:'rgba(183,136,201,.1)', border:'1px solid rgba(183,136,201,.2)',
            display:'flex', justifyContent:'space-between', alignItems:'center',
          }}>
            <div>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'#B788C9'}}>
                Til midnatt
              </div>
              <div style={{marginTop:4, fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1, fontVariantNumeric:'tabular-nums'}}>
                1t 42m
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.5)'}}>
                Du er med
              </div>
              <div style={{marginTop:4, fontSize:13, fontWeight:700, color:'#FFF'}}>
                Aker Brygge-kvelden
              </div>
            </div>
          </div>
        </div>

        {/* Events */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.6)'}}>
            Kveldens kretser
          </div>
          <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                mainBig:'Aker Brygge', t:'Nyttårsaften på Aker Brygge med 12 andre',
                sub:'Vi har bord på Alex Sushi fra 20:00. Går ut på brygga når fyrverkeriet starter.',
                host:'Margrete og Eirik · bordverter',
                time:'20:00 → 00:30', seats:'Du er registrert · 12 andre', tint:'#B788C9',
                you:true,
              },
              {
                mainBig:'Operaen', t:'Midnatt på Operataket',
                sub:'Klatr opp taket, ta med noe varmt å drikke. Vi møtes ved hjørnet kl 23:30.',
                host:'Speedfriending-kurert',
                time:'23:30 → 01:00', seats:'9 av 18', tint:'#F0826B',
              },
              {
                mainBig:'Frogner', t:'Rolig middag hos vertsfamilie',
                sub:'Lite selskap (8 personer), hjemmelaget fem-retters, stille prat. Ingen TV-sending av kongens tale.',
                host:'Nina · ambassadør siden 2023',
                time:'19:00 → sent', seats:'3 plasser igjen', tint:'#3E8F65',
              },
              {
                mainBig:'Sentralen', t:'Dansegolv for deg som vil danse',
                sub:'DJ-sett, dansegolv, 40 mennesker. For deg som ikke er ferdig ennå når midnatt passerer.',
                host:'Speedfriending x Sentralen',
                time:'22:00 → 04:00', seats:'28 av 40', tint:'#FAB29D',
              },
              {
                mainBig:'Etter', t:'1. januar-vandring på Sognsvann',
                sub:'Hvis du vil starte året med bevegelse. Kl 11 ved T-bane-utgangen. Ingen krav til form.',
                host:'Gjentakende tradisjon',
                time:'1. jan · 11:00', seats:'Åpent for alle', tint:'#7F4D95',
              },
            ].map((e, i) => (
              <div key={i} style={{
                padding:'18px 18px', borderRadius:14,
                background: e.you ? 'rgba(183,136,201,.12)' : 'rgba(255,255,255,.05)',
                border: e.you ? `1.5px solid ${e.tint}` : '1px solid rgba(255,255,255,.1)',
                position:'relative',
              }}>
                {e.you && (
                  <div style={{
                    position:'absolute', top:-9, right:16,
                    padding:'2px 10px', borderRadius:10,
                    background:e.tint, color:'#2A2134',
                    fontSize:9.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
                  }}>
                    Du er med
                  </div>
                )}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:e.tint}}>
                    {e.mainBig}
                  </div>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.5)', fontVariantNumeric:'tabular-nums'}}>{e.time}</div>
                </div>
                <div style={{marginTop:8, fontSize:15.5, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.25}}>
                  {e.t}
                </div>
                <div style={{marginTop:8, fontSize:12, lineHeight:1.55, color:'rgba(255,255,255,.78)'}}>
                  {e.sub}
                </div>
                <div style={{marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.08)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:10.5, color:'rgba(255,255,255,.5)'}}>{e.host}</div>
                  <div style={{fontSize:10.5, color:e.tint, fontWeight:700}}>{e.seats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub — Frida på nyttår */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
            fontSize:11.5, lineHeight:1.55, color:'rgba(255,255,255,.75)',
          }}>
            <span style={{color:'#FFF', fontWeight:700}}>Om midnatt blir tung:</span> Frida er oppe hele natten.
            Ingen spørsmål om hvorfor. Bare en samtale som fins.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5) SOMMERPROGRAM (JUNI–AUGUST)
// ---------------------------------------------------------------------------

function ScreenSummer() {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#F0F5F0'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:24}}>
        <H_StatusBarLight time="15:08"/>

        {/* Hero */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{
            borderRadius:22, overflow:'hidden', position:'relative',
            background:'linear-gradient(165deg, #3E8F65 0%, #5FAE7A 50%, #D9A24A 100%)',
            color:'#FFF', padding:'28px 24px 26px',
          }}>
            <div style={{position:'absolute', right:-40, top:-20, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.1)'}}/>
            <div style={{position:'absolute', right:40, bottom:-40, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,.06)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', opacity:.85}}>
                Sommer 2027 · Juni–August
              </div>
              <h1 style={{margin:'14px 0 0', fontSize:30, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.1}}>
                Byen er grønn.
                <br/>
                <span style={{opacity:.9}}>Vi er utendørs.</span>
              </h1>
              <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.5, opacity:.92}}>
                Piknikker i Frognerparken, kajakk i Oslofjorden, hyttehelger i Nordmarka. Vi flytter alt
                ut når været tillater det.
              </p>
              <div style={{marginTop:18, display:'flex', gap:16, fontSize:11, opacity:.85}}>
                <span>42 events i juli</span>
                <span style={{opacity:.5}}>·</span>
                <span>18°C og opp kreves</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kategorier */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', gap:8, overflowX:'auto', marginLeft:-22, marginRight:-22, paddingLeft:22, paddingRight:22, paddingBottom:6}}>
            {[
              { label:'Alle', count:42, active:true },
              { label:'Piknik', count:14 },
              { label:'Vann', count:11 },
              { label:'Hytte', count:6 },
              { label:'Konsert', count:8 },
              { label:'Matlaging', count:3 },
            ].map((c, i) => (
              <button key={i} style={{
                flexShrink:0, padding:'9px 16px', borderRadius:20, cursor:'pointer',
                border: c.active ? 'none' : `1px solid ${HC.divider}`,
                background: c.active ? HC.green : HC.card,
                color: c.active ? '#FFF' : HC.fg,
                fontSize:12.5, fontWeight:700,
                display:'flex', gap:8, alignItems:'center',
              }}>
                {c.label}
                <span style={{
                  fontSize:10.5, fontWeight:700,
                  color: c.active ? 'rgba(255,255,255,.75)' : HC.fgDim,
                }}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Denne helgen — hero-event */}
        <div style={{padding:'22px 22px 0'}}>
          <S_Kicker color={HC.green}>Denne helgen</S_Kicker>
          <div style={{
            marginTop:10, padding:'0', borderRadius:18, overflow:'hidden',
            background:HC.card, border:`1px solid ${HC.divider}`,
            boxShadow:'0 4px 16px rgba(42,33,52,.06)',
          }}>
            {/* Foto-proxy med gradient — piknik-stemning */}
            <div style={{
              height:140, background:`linear-gradient(165deg, #5FAE7A 0%, #3E8F65 50%, #C8DAA8 100%)`,
              position:'relative',
            }}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 70%, rgba(255,230,180,.3), transparent)'}}/>
              <div style={{position:'absolute', left:20, bottom:16, color:'#FFF'}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', opacity:.85}}>LØR 19.JUN · 13:00</div>
                <div style={{marginTop:4, fontSize:22, fontWeight:700, letterSpacing:'-.015em'}}>Stor-piknik i Frognerparken</div>
              </div>
            </div>
            <div style={{padding:'18px 20px'}}>
              <p style={{margin:0, fontSize:12.5, lineHeight:1.55, color:HC.fgDim}}>
                Vi har leid ut området ved Vigeland-statuen. 38 andre har allerede sagt ja. Hver person tar
                med én rett. Vi stiller med pledd og drikke.
              </p>
              <div style={{marginTop:14, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <div style={{display:'flex'}}>
                    {[0,1,2,3,4].map(i => (
                      <div key={i} style={{
                        width:24, height:24, borderRadius:12,
                        background:['#D4A85C','#B890D4','#7895C4','#3E8F65','#F0826B'][i],
                        border:'2px solid #FFF',
                        marginLeft: i === 0 ? 0 : -8,
                      }}/>
                    ))}
                  </div>
                  <span style={{fontSize:11, color:HC.fgDim}}>38 påmeldt · plass til 12 til</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:HC.green}}>Gratis</div>
              </div>
              <button style={{
                marginTop:14, width:'100%', padding:'12px 16px', borderRadius:10, border:'none',
                background:HC.green, color:'#FFF', fontSize:13, fontWeight:700, cursor:'pointer',
              }}>
                Meld på — jeg tar med salat
              </button>
            </div>
          </div>
        </div>

        {/* Juli-aktiviteter */}
        <div style={{padding:'26px 22px 0'}}>
          <S_Kicker color={HC.plum}>Kommende uker</S_Kicker>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:10}}>
            {[
              { day:'Tir', time:'18:30', title:'Kajakktur fra Sørenga til Hovedøya', venue:'Leie av kajakk + guide inkl.', seats:'8 av 12', tint:'#7895C4', note:'Middels form · 2t' },
              { day:'Ons', time:'19:00', title:'Utendørs-konsert i Slottsparken', venue:'Oslo Sommerkonsert · gratis', seats:'24 påmeldt', tint:HC.amber, note:null },
              { day:'Lør', time:'14:00', title:'Bading og grill ved Sognsvann', venue:'Møtes ved t-banen', seats:'Åpent — bare møt opp', tint:HC.green, note:'Lavterskel' },
              { day:'Lør', time:'Hele helgen', title:'Hyttehelg Nordmarda (2 netter)', venue:'Kikut, 8-personers hytte · 650 kr', seats:'4 plasser igjen', tint:HC.coral, note:'Fredag kveld → søndag' },
              { day:'Søn', time:'11:00', title:'Kajakk + brunsj i Oslofjorden', venue:'Fra Aker Brygge', seats:'6 av 10', tint:'#7895C4', note:null },
              { day:'Tor', time:'20:00', title:'Hage-grill på Grünerløkka', venue:'Privat bakgård · Hølmas', seats:'7 av 14', tint:HC.coralDeep, note:null },
            ].map((e, i) => (
              <S_EventCard key={i} {...e}/>
            ))}
          </div>
        </div>

        {/* Hyttehelg — eget kort */}
        <div style={{padding:'26px 22px 0'}}>
          <S_Kicker color={HC.coralDeep}>Lange turer</S_Kicker>
          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { when:'3–5. juli', where:'Kikut', nights:'2 netter', price:'650 kr', tint:HC.green },
              { when:'17–19. juli', where:'Sognsvannshytta', nights:'2 netter', price:'580 kr', tint:HC.amber },
              { when:'7–9. august', where:'Kobberhaughytta', nights:'2 netter', price:'720 kr', tint:HC.coral },
              { when:'21–23. august', where:'Solfjellstua', nights:'2 netter', price:'650 kr', tint:HC.plum },
            ].map((h, i) => (
              <div key={i} style={{
                padding:'14px 14px', borderRadius:12,
                background:HC.card, border:`1px solid ${HC.divider}`,
              }}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:h.tint}}>
                  {h.when}
                </div>
                <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>{h.where}</div>
                <div style={{marginTop:2, fontSize:11, color:HC.fgDim}}>{h.nights}</div>
                <div style={{marginTop:8, fontSize:12, fontWeight:700, color:HC.fg}}>{h.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fellesferien-note */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            padding:'14px 16px', borderRadius:12,
            background:HC.cream, border:`1px solid ${HC.divider}`,
            fontSize:11.5, lineHeight:1.55, color:HC.fgDim,
          }}>
            <span style={{color:HC.fg, fontWeight:700}}>Fellesferien (uke 28–30):</span> Ingen er igjen i Oslo, sier alle. Men det er
            vi. 1 800 aktive brukere er fortsatt i byen. Vi holder events gående hele juli.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6) VINTER-MODUS (ESTETISK UI-VARIANT)
// ---------------------------------------------------------------------------
//
// Viser hvordan HJEMSKJERMEN ser ut når brukeren har vinter-modus aktivert i innstillinger.
// Mørkere plum-lavendel palett, varmere lys, flere innendørs events, "Vinterens venner" synlig.

function ScreenWinterMode() {
  // Vinter-tokens: mørkere base, varmere aksent
  const W = {
    bg: '#26202E',
    bgSoft: '#2F2839',
    card: 'rgba(255,255,255,.055)',
    cardSolid: '#332B3E',
    fg: '#F4EDE7',
    fgDim: 'rgba(244,237,231,.65)',
    fgFaint: 'rgba(244,237,231,.42)',
    divider: 'rgba(244,237,231,.1)',
    accent: '#D9A27E',       // varm amber-okker
    accentSoft: '#E8BFA0',
    plum: '#C8A0DB',
    plumDeep: '#A478BD',
    coral: '#E89574',
    cream: '#3D3445',
  };

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:W.bg, color:W.fg}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:16}}>
        {/* Status bar — må manuelt invertere farger */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 26px 0', fontFamily:'-apple-system,system-ui', color:W.fg, fontSize:15.5, fontWeight:600}}>
          <span>19:04</span>
          <span style={{display:'inline-flex', gap:6, alignItems:'center'}}>
            <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".6" fill={W.fg}/><rect x="4.5" y="5" width="3" height="6" rx=".6" fill={W.fg}/><rect x="9" y="2.5" width="3" height="8.5" rx=".6" fill={W.fg}/><rect x="13.5" y="0" width="3" height="11" rx=".6" fill={W.fg}/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="2.5" fill="none" stroke={W.fg} strokeOpacity=".5"/><rect x="2" y="2" width="17" height="7" rx="1.4" fill={W.fg}/></svg>
          </span>
        </div>

        {/* Vinter-modus banner på toppen */}
        <div style={{padding:'10px 22px 0'}}>
          <div style={{
            padding:'8px 14px', borderRadius:20,
            background:`${W.accent}18`, border:`1px solid ${W.accent}33`,
            display:'inline-flex', alignItems:'center', gap:8,
            fontSize:10.5, fontWeight:700, letterSpacing:'.1em', color:W.accent,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M6 1v10M1 6h10M2.5 2.5l7 7M9.5 2.5l-7 7" stroke={W.accent} strokeWidth="1" strokeLinecap="round"/>
            </svg>
            VINTER-MODUS
          </div>
        </div>

        {/* Hilsen */}
        <div style={{padding:'14px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:W.plum}}>Onsdag kveld</div>
            <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:W.fg, lineHeight:1.15}}>
              Hei Viktor.
            </h1>
            <div style={{marginTop:4, fontSize:12, color:W.fgDim}}>
              −3°C ute. Lys inne.
            </div>
          </div>
          <div style={{width:42, height:42, borderRadius:21, background:'linear-gradient(135deg,#D4A85C,#8A5A3B)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:15, boxShadow:'0 2px 8px rgba(0,0,0,.3)'}}>
            V
          </div>
        </div>

        {/* Vinterens venner — hoved-feature */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:W.fgDim, marginBottom:10}}>
            Vinterens program
          </div>
          <div style={{
            borderRadius:20, overflow:'hidden', position:'relative',
            background:`linear-gradient(160deg, ${W.accent} 0%, #B5744D 60%, #7A4A36 100%)`,
            color:'#FFF', padding:'22px 22px',
          }}>
            <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.08)'}}/>
            {/* Subtile "indoor light" effects */}
            <div style={{position:'absolute', right:24, top:18, width:5, height:5, borderRadius:2.5, background:'rgba(255,235,200,.8)', boxShadow:'0 0 12px rgba(255,235,200,.8)'}}/>

            <div style={{position:'relative'}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', opacity:.88}}>NOV 2027 → FEB 2028</div>
              <div style={{marginTop:8, fontSize:21, fontWeight:700, letterSpacing:'-.015em', lineHeight:1.2}}>
                Vinterens venner
              </div>
              <p style={{margin:'10px 0 0', fontSize:12.5, lineHeight:1.55, opacity:.92}}>
                Kuratert krets for mørketiden. 12 kjente ansikter, ukentlige innendørs-events, én fast
                ambassadør som vet hvem du er.
              </p>
              <button style={{
                marginTop:14, padding:'10px 16px', borderRadius:22, border:'none',
                background:'rgba(255,255,255,.95)', color:'#7A4A36', fontSize:12.5, fontWeight:700, cursor:'pointer',
              }}>
                Se programmet
              </button>
            </div>
          </div>
        </div>

        {/* I kveld — innendørs */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:W.fgDim, marginBottom:10}}>
            I kveld · innendørs
          </div>
          <div style={{
            background:W.cardSolid, borderRadius:18, padding:'18px 20px',
            border:`1px solid ${W.divider}`,
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', color:W.coral}}>
              19:30 · LITTERATURHUSET
            </div>
            <div style={{marginTop:6, fontSize:18, fontWeight:700, letterSpacing:'-.01em', color:W.fg, lineHeight:1.2}}>
              Bokklubb med kakao
            </div>
            <p style={{margin:'8px 0 0', fontSize:12, lineHeight:1.5, color:W.fgDim}}>
              6 andre — vi diskuterer «Snøens historie» av Orhan Pamuk. Kakao og skillingsbolle inkl.
            </p>
            <button style={{
              marginTop:14, padding:'10px 16px', borderRadius:22, border:'none',
              background:W.plum, color:W.bg, fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Se detaljer
            </button>
          </div>
        </div>

        {/* Uka — innendørs fokus */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:W.plum}}>
              Denne uka
            </div>
            <button style={{background:'transparent', border:'none', fontSize:12, color:W.fgDim, fontWeight:600, cursor:'pointer', padding:0}}>
              Se alle →
            </button>
          </div>
          <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6, marginLeft:-22, marginRight:-22, paddingLeft:22, paddingRight:22}}>
            {[
              { d:'Tor', t:'19:00', title:'Pottemakerkurs', loc:'Kunstnernes Hus', tint:W.coral },
              { d:'Fre', t:'20:00', title:'Jazz & whisky', loc:'Herr Nilsen', tint:W.accent },
              { d:'Lør', t:'12:00', title:'Hjemmelaget brød', loc:'Hos Kari, Sagene', tint:W.accentSoft },
              { d:'Søn', t:'15:00', title:'Saunafellesskap', loc:'SALT Aker Brygge', tint:W.plum },
            ].map((e, i) => (
              <div key={i} style={{
                flexShrink:0, width:160, padding:'14px 14px', borderRadius:14,
                background:W.cardSolid, border:`1px solid ${W.divider}`,
              }}>
                <div style={{width:34, height:34, borderRadius:10, background:`${e.tint}24`, color:e.tint, fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1.1}}>
                  <span>{e.d}</span>
                  <span style={{fontSize:9.5, opacity:.8, marginTop:1}}>{e.t}</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:W.fg, marginTop:10}}>{e.title}</div>
                <div style={{fontSize:11, color:W.fgDim, marginTop:2}}>{e.loc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mørketids-rapport */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:`${W.accent}12`, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${W.accent}33`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{width:36, height:36, borderRadius:18, background:`${W.accent}22`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill={W.accent}/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13" stroke={W.accent} strokeWidth="1.2" strokeLinecap="round"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:W.accent}}>Mørketiden</div>
              <div style={{fontSize:12.5, fontWeight:700, color:W.fg, marginTop:2, lineHeight:1.3}}>
                Din sjekk-inn for januar — 3 min
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={W.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Auto-tilbakeknapp */}
        <div style={{padding:'22px 22px 0', fontSize:11, color:W.fgFaint, lineHeight:1.5}}>
          Vinter-modus slås automatisk av 15. februar. Kan endres i Innstillinger → Utseende.
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7) LONELINESS REPORT NORWAY 2027 (NASJONAL)
// ---------------------------------------------------------------------------

function NorwayMap({ regions }) {
  // Stilisert Norgeskart med 4 regioner som klikkbare sektorer.
  // SVG-path er forenklet silhuett — ikke topografisk korrekt, men gjenkjennelig.
  const w = 340, h = 280;
  return (
    <svg width={w} height={h} style={{display:'block'}}>
      {/* Fjord-baseline */}
      <rect x="0" y={h-2} width={w} height="2" fill={HC.divider}/>

      {/* Nord-Norge (øverst) */}
      <path
        d="M 170 10 L 220 22 L 260 55 L 250 90 L 210 85 L 190 65 Z"
        fill={regions['Nord'].color} opacity=".85"
        stroke="#FFF" strokeWidth="1.5"
      />
      <text x="215" y="52" fontSize="10" fill="#FFF" fontWeight="700" textAnchor="middle">Nord</text>
      <text x="215" y="66" fontSize="9" fill="rgba(255,255,255,.85)" textAnchor="middle">{regions['Nord'].v}%</text>

      {/* Midt-Norge */}
      <path
        d="M 165 90 L 205 90 L 225 125 L 210 150 L 180 150 L 165 125 Z"
        fill={regions['Midt'].color} opacity=".85"
        stroke="#FFF" strokeWidth="1.5"
      />
      <text x="195" y="122" fontSize="10" fill="#FFF" fontWeight="700" textAnchor="middle">Midt</text>
      <text x="195" y="136" fontSize="9" fill="rgba(255,255,255,.85)" textAnchor="middle">{regions['Midt'].v}%</text>

      {/* Vestlandet */}
      <path
        d="M 105 130 L 165 130 L 170 170 L 155 210 L 115 210 L 95 175 Z"
        fill={regions['Vest'].color} opacity=".85"
        stroke="#FFF" strokeWidth="1.5"
      />
      <text x="133" y="170" fontSize="10" fill="#FFF" fontWeight="700" textAnchor="middle">Vest</text>
      <text x="133" y="184" fontSize="9" fill="rgba(255,255,255,.85)" textAnchor="middle">{regions['Vest'].v}%</text>

      {/* Østlandet (inkl. Oslo) */}
      <path
        d="M 170 150 L 220 150 L 240 195 L 225 240 L 180 245 L 160 210 Z"
        fill={regions['Øst'].color} opacity=".95"
        stroke="#FFF" strokeWidth="1.5"
      />
      <text x="195" y="195" fontSize="10" fill="#FFF" fontWeight="700" textAnchor="middle">Øst</text>
      <text x="195" y="209" fontSize="9" fill="rgba(255,255,255,.9)" textAnchor="middle">{regions['Øst'].v}%</text>

      {/* Oslo-prikk */}
      <circle cx="205" cy="225" r="4" fill="#FFF" stroke={HC.plumDeep} strokeWidth="1.5"/>
      <text x="215" y="229" fontSize="9" fill={HC.fg} fontWeight="700">Oslo</text>
    </svg>
  );
}

function NR_CityBar({ city, value, max, color }) {
  const pct = (value / max) * 100;
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'9px 0'}}>
      <div style={{flex:'0 0 94px', fontSize:11.5, color:HC.fg, fontWeight:500}}>{city}</div>
      <div style={{flex:1, height:8, borderRadius:4, background:`${color}14`, overflow:'hidden'}}>
        <div style={{width:`${pct}%`, height:'100%', background:color, borderRadius:4}}/>
      </div>
      <div style={{flex:'0 0 42px', fontSize:11.5, color:HC.fg, fontWeight:700, textAlign:'right'}}>
        {value.toString().replace('.',',')}%
      </div>
    </div>
  );
}

function NR_TrendLine() {
  // Norge 2019–2027.
  const years = [
    { y:2019, v:11.2 },
    { y:2020, v:12.6 },
    { y:2021, v:15.1 },
    { y:2022, v:14.4 },
    { y:2023, v:13.8 },
    { y:2024, v:13.3 },
    { y:2025, v:12.5 },
    { y:2026, v:11.8 },
    { y:2027, v:11.3 },
  ];
  const w = 340, h = 130, padL = 26, padR = 10, padT = 14, padB = 22;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const maxV = 16, minV = 9;
  const xOf = (i) => padL + (i / (years.length - 1)) * innerW;
  const yOf = (v) => padT + (1 - (v - minV) / (maxV - minV)) * innerH;
  const path = years.map((p, i) => `${i===0?'M':'L'} ${xOf(i).toFixed(1)} ${yOf(p.v).toFixed(1)}`).join(' ');
  const areaPath = `${path} L ${xOf(years.length-1)} ${padT+innerH} L ${padL} ${padT+innerH} Z`;

  return (
    <svg width={w} height={h} style={{display:'block'}}>
      {[10, 12, 14].map(v => (
        <g key={v}>
          <line x1={padL} x2={w-padR} y1={yOf(v)} y2={yOf(v)} stroke={HC.divider} strokeWidth="1"/>
          <text x={padL-6} y={yOf(v)+3} fontSize="9" fill={HC.fgFaint} textAnchor="end">{v}%</text>
        </g>
      ))}
      <path d={areaPath} fill={`${HC.plum}14`}/>
      <path d={path} stroke={HC.plum} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={xOf(2)} cy={yOf(15.1)} r="4" fill={HC.coral} stroke="#FFF" strokeWidth="1.5"/>
      <text x={xOf(2)} y={yOf(15.1)-10} fontSize="9" fill={HC.coralDeep} textAnchor="middle" fontWeight="700">Pandemi-topp</text>
      <circle cx={xOf(years.length-1)} cy={yOf(11.3)} r="4" fill={HC.plum} stroke="#FFF" strokeWidth="1.5"/>
      {years.map((p, i) => (i % 2 === 0 || i === years.length-1) && (
        <text key={p.y} x={xOf(i)} y={h-6} fontSize="9" fill={HC.fgDim} textAnchor="middle">{p.y}</text>
      ))}
    </svg>
  );
}

function ScreenLonelinessReportNorway() {
  const regions = {
    'Nord':  { v:13.4, color:HC.coralDeep },
    'Midt':  { v:11.8, color:HC.coral },
    'Vest':  { v:10.1, color:HC.amber },
    'Øst':   { v:11.6, color:HC.plum },
  };

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#FAF7F2'}}>
      <div style={{height:'100%', overflowY:'auto', paddingBottom:32}}>
        <H_StatusBarLight time="08:30"/>

        {/* Hero */}
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
              Loneliness Report Norway · Årgang 2027
            </div>
            <h1 style={{margin:'14px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.1}}>
              Norge er litt mindre ensom i 2027.
            </h1>
            <div style={{marginTop:12, fontSize:13, lineHeight:1.5, opacity:.9}}>
              For første gang publiserer Speedfriending et nasjonalt bilde. Data fra alle storbyer og
              regionalt brudd, i samarbeid med Folkehelseinstituttet.
            </div>

            <div style={{marginTop:20, paddingTop:18, borderTop:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'baseline', gap:16}}>
              <div>
                <div style={{fontSize:40, fontWeight:700, letterSpacing:'-.03em', lineHeight:1}}>11,3%</div>
                <div style={{marginTop:4, fontSize:10.5, opacity:.85, maxWidth:170, lineHeight:1.4}}>
                  av voksne nordmenn rapporterer kronisk ensomhet
                </div>
              </div>
              <div style={{paddingLeft:16, borderLeft:'1px solid rgba(255,255,255,.2)'}}>
                <div style={{fontSize:11, fontWeight:700, color:HC.coralSoft}}>↓ fra 13,3%</div>
                <div style={{fontSize:10, opacity:.75, marginTop:2}}>2024-nivå</div>
              </div>
            </div>
          </div>
        </div>

        {/* FHI-partnerskap-stripe */}
        <div style={{padding:'16px 22px 0'}}>
          <div style={{
            padding:'12px 14px', borderRadius:10,
            background:'#FFF', border:`1px solid ${HC.divider}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{
              width:40, height:40, borderRadius:8,
              background:`linear-gradient(135deg, #1F3B6F 0%, #2E4A75 100%)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF', fontSize:9, fontWeight:700, letterSpacing:'.02em', lineHeight:1.1, textAlign:'center',
              flexShrink:0,
            }}>
              FHI
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>
                I samarbeid med
              </div>
              <div style={{fontSize:12, fontWeight:700, color:HC.fg, marginTop:2, lineHeight:1.3}}>
                Folkehelseinstituttet · Avdeling for psykisk helse og selvmord
              </div>
            </div>
          </div>
        </div>

        {/* Datagrunnlag */}
        <div style={{padding:'16px 26px 0', fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
          <span style={{color:HC.fg, fontWeight:700}}>Basert på 58 400 respondenter fra hele Norge,</span> koblet
          med SSB Levekårsundersøkelsen 2026 og FHIs nasjonale helseundersøkelser.
        </div>

        {/* Regionalt brudd — kart */}
        <div style={{padding:'28px 22px 0'}}>
          <S_Kicker color={HC.plum}>Norge etter region</S_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>Andel kronisk ensomme, 2027</div>
          <div style={{marginTop:14, padding:'16px 12px 8px', background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`}}>
            <NorwayMap regions={regions}/>
            <div style={{marginTop:4, padding:'0 10px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
              {Object.entries(regions).map(([name, r]) => (
                <div key={name} style={{display:'flex', alignItems:'center', gap:8, fontSize:10.5}}>
                  <div style={{width:10, height:10, borderRadius:5, background:r.color}}/>
                  <span style={{color:HC.fg, fontWeight:500}}>{name === 'Nord' ? 'Nord-Norge' : name === 'Midt' ? 'Midt-Norge' : name === 'Vest' ? 'Vestlandet' : 'Østlandet'}</span>
                  <span style={{color:HC.fgDim, marginLeft:'auto'}}>{r.v}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, lineHeight:1.5}}>
            Høyest i Nord-Norge — korrelert med lavere befolkningstetthet og mørketid. Lavest i Vestlandet,
            der tette fjordsamfunn og aktiv frivillighet drar tallet ned.
          </div>
        </div>

        {/* Nasjonal trend */}
        <div style={{padding:'32px 22px 0'}}>
          <S_Kicker color={HC.plum}>Utvikling over tid</S_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>Andel voksne nordmenn, 2019–2027</div>
          <div style={{marginTop:14, padding:'16px 8px 8px', background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`}}>
            <NR_TrendLine/>
          </div>
          <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, lineHeight:1.5}}>
            Fjerde år på rad med nedgang etter pandemi-toppen. Trenden er bekreftet av SSB og FHIs
            uavhengige målinger.
          </div>
        </div>

        {/* Storbyer */}
        <div style={{padding:'32px 22px 0'}}>
          <S_Kicker color={HC.plum}>Storbyer sammenlignet</S_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg}}>
            Andel kronisk ensomme voksne
          </div>
          <div style={{marginTop:14, padding:'12px 16px 14px', background:'#FFF', borderRadius:14, border:`1px solid ${HC.divider}`}}>
            {[
              { c:'Tromsø',        v:13.8, color:HC.coralDeep },
              { c:'Bodø',          v:12.7, color:HC.coral },
              { c:'Oslo',          v:11.0, color:HC.plum },
              { c:'Trondheim',     v:11.4, color:HC.plum },
              { c:'Kristiansand',  v:10.8, color:HC.amber },
              { c:'Stavanger',     v:10.2, color:HC.amber },
              { c:'Bergen',        v: 9.6, color:HC.lilac },
              { c:'Ålesund',       v: 8.9, color:HC.green },
            ].map((d, i, arr) => (
              <div key={i} style={{borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none'}}>
                <NR_CityBar city={d.c} value={d.v} max={16} color={d.color}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:10, fontSize:10.5, color:HC.fgFaint, lineHeight:1.5}}>
            Høyest i Tromsø — korrelert med høy studentandel og lang mørketid. Lavest i Ålesund, preget
            av sterke lokalsamfunn og lav aleneboende-andel.
          </div>
        </div>

        {/* Demografi */}
        <div style={{padding:'32px 22px 0'}}>
          <S_Kicker color={HC.plum}>Hvem er mest utsatt?</S_Kicker>
          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Aleneboende</div>
              <div style={{marginTop:10, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>
                18,4%
              </div>
              <div style={{marginTop:4, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>
                mot 7,9% blant folk i parforhold
              </div>
            </div>
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Unge voksne</div>
              <div style={{marginTop:10, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>
                16,1%
              </div>
              <div style={{marginTop:4, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>
                blant 18–29-åringer · høyest aldersgruppe
              </div>
            </div>
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>75+</div>
              <div style={{marginTop:10, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>
                13,7%
              </div>
              <div style={{marginTop:4, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>
                · nedgang fra 15,2% i 2024
              </div>
            </div>
            <div style={{padding:'16px 14px', background:'#FFF', borderRadius:12, border:`1px solid ${HC.divider}`}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>Nyinnvandret</div>
              <div style={{marginTop:10, fontSize:26, fontWeight:700, color:HC.fg, letterSpacing:'-.02em'}}>
                19,8%
              </div>
              <div style={{marginTop:4, fontSize:10.5, color:HC.fgDim, lineHeight:1.4}}>
                innen første 3 år i Norge
              </div>
            </div>
          </div>
        </div>

        {/* Delbare kort — med FHI-kreditering */}
        <div style={{padding:'32px 22px 0'}}>
          <S_Kicker color={HC.plum}>Del på sosiale medier</S_Kicker>
          <div style={{marginTop:6, fontSize:11, color:HC.fgDim, lineHeight:1.5}}>
            Kopier som bilde eller lenke. Alle kort krediterer Loneliness Report Norway 2027 og FHI.
          </div>
          <div style={{marginTop:14, display:'flex', gap:10, overflowX:'auto', marginLeft:-22, marginRight:-22, paddingLeft:22, paddingRight:22, paddingBottom:6}}>
            {[
              { head:'11,3%', body:'av voksne nordmenn er kronisk ensomme.', tag:'Ned fra 13,3% i 2024', tint:HC.plum },
              { head:'Nord-Norge', body:'regionen med høyest ensomhet. 13,4%.', tag:'Vestlandet lavest: 10,1%', tint:HC.coralDeep },
              { head:'16,1%', body:'blant 18–29-åringer. Mest utsatte aldersgruppe.', tag:'Nasjonalt 2027', tint:HC.coral },
              { head:'58 400', body:'nordmenn bidro til årets rapport. Anonymt.', tag:'Speedfriending x FHI', tint:HC.green },
              { head:'13,7%', body:'blant 75+. Første nedgang siden 2019.', tag:'Eldrebølge i gang', tint:HC.amber },
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
                  Norway Loneliness 2027
                </div>
                <div>
                  <div style={{fontSize:34, fontWeight:700, letterSpacing:'-.03em', lineHeight:1}}>{c.head}</div>
                  <div style={{marginTop:10, fontSize:13, lineHeight:1.3, fontWeight:500}}>{c.body}</div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:9.5, opacity:.85}}>
                  <span>{c.tag}</span>
                  <span style={{fontWeight:700}}>SF × FHI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anbefalinger til staten */}
        <div style={{padding:'36px 22px 0'}}>
          <S_Kicker color={HC.coralDeep}>Anbefalinger til regjeringen</S_Kicker>
          <div style={{marginTop:6, fontSize:13, fontWeight:700, color:HC.fg, lineHeight:1.3}}>
            Fem tiltak som Helse- og omsorgsdepartementet kan inkludere i neste folkehelsemelding.
          </div>

          <div style={{marginTop:16, display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                n:'01',
                t:'Nasjonal ensomhetsstrategi innen 2028',
                d:'Storbritannia har en ensomhetsminister og handlingsplan siden 2018. Norge mangler ennå koordinerende instans — FHI foreslår modell etter UK-eksempel.',
              },
              {
                n:'02',
                t:'Inkluder sosial tilknytning i Folkehelseindikatoren',
                d:'I dag måler FHI fysisk aktivitet, ernæring, røyking. Sosial integrasjon mangler som indikator. Uten måling, ingen tiltak — og ingen oppfølging.',
              },
              {
                n:'03',
                t:'Øremerk 200 mill. kr til lokale møteplasser i distriktene',
                d:'Nord-Norge og indre strøk har størst ensomhetsutfordringer. Bibliotek, frivilligsentraler og nabolagshus må finansieres utenfor storby-rammer.',
              },
              {
                n:'04',
                t:'Innfør UCLA-screening i fastlegens årskontroll (75+)',
                d:'UCLA LS-3 tar 90 sekunder. Fastlegen er første kontaktpunkt for eldre som bor alene. Screening må utløse konkret henvisning — ikke bare samtale.',
              },
              {
                n:'05',
                t:'Skattefradrag for bedrifter som investerer i sosiale benefits',
                d:'Samme modell som kjøp av treningsmedlemskap (skatteloven §5-15). Reduserer ensomhet og sykefravær samtidig.',
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

        {/* Metode + CTA */}
        <div style={{padding:'32px 22px 0'}}>
          <div style={{padding:'18px 18px', background:HC.cream, borderRadius:12, border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Metode
            </div>
            <div style={{marginTop:8, fontSize:11.5, color:HC.fg, lineHeight:1.55}}>
              Tall er basert på UCLA Loneliness Scale (3 items) innhentet gjennom Speedfriending-appen
              over 12 måneder (n = 58 400), vektet mot SSB befolkningssammensetning (alder, kjønn, region,
              fødeland). Regionalt brudd følger SSB-standard. Data lagres i EU og slettes etter 36 måneder.
              Ingen individdata er tilgjengelig for FHI, kommune eller tredjepart.
            </div>
            <button style={{
              marginTop:14, padding:'10px 14px', borderRadius:8, border:`1px solid ${HC.plum}`,
              background:'transparent', color:HC.plumDeep, fontSize:12, fontWeight:700, cursor:'pointer',
            }}>
              Last ned hele rapporten (PDF, 72 sider)
            </button>
          </div>

          <div style={{marginTop:24, textAlign:'center', fontSize:10.5, color:HC.fgFaint, lineHeight:1.55}}>
            Loneliness Report Norway er utgitt av Speedfriending AS<br/>
            i samarbeid med Folkehelseinstituttet.<br/>
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

window.H_ScreenChristmas = ScreenChristmas;
window.H_ScreenMay17Morning = ScreenMay17Morning;
window.H_ScreenMay17Evening = ScreenMay17Evening;
window.H_ScreenNewYear = ScreenNewYear;
window.H_ScreenSummer = ScreenSummer;
window.H_ScreenWinterMode = ScreenWinterMode;
window.H_ScreenLonelinessReportNorway = ScreenLonelinessReportNorway;
