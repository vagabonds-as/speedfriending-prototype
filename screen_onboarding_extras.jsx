/* global React, HC, H_StatusBarLight */
// Onboarding-extras — fem skjermer som fyller hullene før og etter Ankomst.
// Tone: voksen, varm, Oslo-forankret. Ikke dating-app, ikke amerikansk hype.

// ───────────────────────────────────────────────────────────────────────────
// 1) VELKOMST — første skjerm etter at appen er installert.
//    Før Ankomst O1. Ingen Frida ennå — bare en dør inn.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenWelcome() {
  const C = window.HC;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      {/* Bakgrunn — mykt kveldslys over Oslo-tonen */}
      <div style={{
        position:'absolute', inset:0,
        background:`radial-gradient(ellipse at 20% 10%, ${C.coralSoft}28 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, ${C.lilac}22 0%, transparent 60%)`,
      }}/>
      <div style={{
        position:'absolute', top:-80, right:-60, width:260, height:260, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.coral}22 0%, transparent 70%)`,
      }}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="19:42"/>

        {/* Liten stemplet merkelapp øverst */}
        <div style={{padding:'32px 28px 0', display:'flex', justifyContent:'center'}}>
          <div style={{
            fontSize:10.5, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase',
            color:C.plum, padding:'6px 14px', borderRadius:20,
            border:`1px solid ${C.plum}30`, background:`${C.plum}08`,
          }}>
            Oslo · bare for inviterte
          </div>
        </div>

        {/* Hovedtittel — plassert høyt, generøs luft */}
        <div style={{flex:1, padding:'40px 30px 0', display:'flex', flexDirection:'column'}}>
          <h1 style={{
            margin:0, fontSize:44, fontWeight:700, letterSpacing:'-0.03em',
            color:C.fg, lineHeight:1.02,
          }}>
            Møt din<br/>stamme.
          </h1>
          <p style={{
            margin:'20px 0 0', fontSize:17, lineHeight:1.45,
            color:C.fgDim, maxWidth:300,
          }}>
            Nye venner, ekte møter i Oslo.<br/>
            <span style={{color:C.fgFaint, fontSize:14}}>
              Små kvelder. Kjente rom. Folk du kommer til å like.
            </span>
          </p>

          {/* Liten illustrativ detalj — tre sirkler som antyder "stamme" */}
          <div style={{marginTop:38, display:'flex', gap:-8, alignItems:'center'}}>
            {[
              { bg:'linear-gradient(135deg,#E8B8A0,#B5694A)', l:'K' },
              { bg:'linear-gradient(135deg,#7895C4,#2E4A75)', l:'E' },
              { bg:'linear-gradient(135deg,#B890D4,#6A3F8A)', l:'A' },
            ].map((p, i) => (
              <div key={i} style={{
                width:38, height:38, borderRadius:19, background:p.bg,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#FFF3E0', fontWeight:700, fontSize:13,
                border:`2.5px solid ${C.bg}`,
                marginLeft: i===0 ? 0 : -10,
                boxShadow:'0 2px 6px rgba(42,33,52,.08)',
              }}>
                {p.l}
              </div>
            ))}
            <span style={{marginLeft:14, fontSize:12.5, color:C.fgDim, fontStyle:'italic'}}>
              &quot;Ble bokvennen min etter første kveld.&quot; — Anja, Grünerløkka
            </span>
          </div>
        </div>

        {/* Login-knapper */}
        <div style={{padding:'0 24px 22px'}}>
          {/* Vipps — primær */}
          <button style={{
            width:'100%', padding:'15px 20px', borderRadius:14, border:'none',
            background:C.coral, color:'#fff',
            fontSize:15.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow:`0 8px 20px ${C.coral}48`,
            marginBottom:10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" fill="#fff"/></svg>
            Fortsett med Vipps
          </button>

          {/* Apple */}
          <button style={{
            width:'100%', padding:'13px 20px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:C.card, color:C.fg,
            fontSize:14.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            marginBottom:8,
          }}>
            <svg width="15" height="17" viewBox="0 0 15 17" fill={C.fg}><path d="M12.3 9.1c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3.1-1.7-1.3-.1-2.6.8-3.2.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.4-.9-2.4-3.5zm-2.1-6.4C10.8 2 11.2 1 11.1 0c-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.5 1 .1 2-.5 2.7-1.1z"/></svg>
            Fortsett med Apple
          </button>

          {/* Google */}
          <button style={{
            width:'100%', padding:'13px 20px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:C.card, color:C.fg,
            fontSize:14.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            marginBottom:8,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path fill="#4285F4" d="M15.68 8.18c0-.55-.05-1.1-.15-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.4v2h2.6c1.5-1.4 2.4-3.5 2.4-5.86z"/><path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.83 4.83 0 01-7.16-2.52h-2.7v2.08A8 8 0 008 16z"/><path fill="#FBBC04" d="M3.54 9.54a4.8 4.8 0 010-3.08V4.38H.84a8 8 0 000 7.24l2.7-2.08z"/><path fill="#EA4335" d="M8 3.16c1.18 0 2.24.4 3.07 1.2l2.3-2.3A8 8 0 00.84 4.38l2.7 2.08A4.78 4.78 0 018 3.16z"/></svg>
            Fortsett med Google
          </button>

          {/* E-post */}
          <button style={{
            width:'100%', padding:'13px 20px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:'transparent', color:C.fg,
            fontSize:14.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}>
            <svg width="16" height="12" viewBox="0 0 16 12"><rect x=".5" y=".5" width="15" height="11" rx="1.5" fill="none" stroke={C.fg} strokeWidth="1.2"/><path d="M1 2l7 5 7-5" stroke={C.fg} strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
            E-post
          </button>

          {/* Allerede medlem */}
          <div style={{textAlign:'center', marginTop:18}}>
            <span style={{fontSize:13, color:C.fgDim}}>Allerede medlem? </span>
            <button style={{
              border:'none', background:'transparent', padding:0, margin:0,
              fontSize:13, color:C.plum, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            }}>
              Logg inn
            </button>
          </div>

          {/* GDPR nederst */}
          <div style={{
            marginTop:14, textAlign:'center',
            fontSize:11, lineHeight:1.5, color:C.fgFaint,
          }}>
            Ved å fortsette godtar du våre <span style={{textDecoration:'underline'}}>vilkår</span> og{' '}
            <span style={{textDecoration:'underline'}}>personvern</span>.<br/>
            Vi deler aldri dataene dine. Du bestemmer hva som vises.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 2) EMPTY-TILSTAND OSLO — etter Ankomst, men for få events i hennes bydel.
//    Varm fail-håndtering, ikke "ingen resultater funnet".
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenEmptyOslo() {
  const C = window.HC;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="16:08"/>

        {/* Toppkort — varm melding, ikke feilmelding */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:8}}>
            Nordre Aker
          </div>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.15}}>
            Vi er på vei til<br/>din bydel.
          </h1>
          <p style={{margin:'14px 0 0', fontSize:14.5, lineHeight:1.5, color:C.fgDim}}>
            Vi starter på Grünerløkka og utvider sakte. Så lenge — her er tre kvelder i sentrum som er innenfor et kvarter fra deg.
          </p>
        </div>

        {/* Polaroid-ish illustrasjon av kart / ventende bydel */}
        <div style={{padding:'20px 24px 0'}}>
          <div style={{
            background:C.cream, border:`1px solid ${C.divider}`,
            borderRadius:14, padding:'18px 18px 16px',
            display:'flex', gap:14, alignItems:'center',
          }}>
            <div style={{
              width:56, height:56, borderRadius:14,
              background:`linear-gradient(135deg, ${C.lilac}30, ${C.coral}28)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="none" stroke={C.plum} strokeWidth="1.6" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.5" fill={C.plum}/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700, color:C.fg, marginBottom:3}}>
                Første event på Grefsen i mai
              </div>
              <div style={{fontSize:12, color:C.fgDim, lineHeight:1.4}}>
                Vi lover. Vi sender beskjed den dagen det åpner.
              </div>
            </div>
          </div>
        </div>

        {/* Alternative events innenfor 15 min */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:10, padding:'0 2px'}}>
            15 min unna · Sentrum
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {[
              {
                d:'Tor', t:'19:30',
                title:'Vinkveld på Territoriet',
                loc:'Grünerløkka · 12 min',
                who:'6 andre kommer. Gjennomsnittsalder 31.',
                tint:C.coral,
              },
              {
                d:'Lør', t:'11:00',
                title:'Søndagsvandring Akerselva',
                loc:'Oppmøte Nedre Foss · 8 min',
                who:'4 andre. Rolig tempo, vi stopper ved Mathallen.',
                tint:C.green,
              },
              {
                d:'Man', t:'18:30',
                title:'Bokklubb: Knausgård, sakte',
                loc:'Eldorado Bokhandel · 14 min',
                who:'5 andre. Du trenger ikke ha lest alt.',
                tint:C.plum,
              },
            ].map((e, i) => (
              <div key={i} style={{
                background:C.card, borderRadius:14, padding:'14px 16px',
                border:`1px solid ${C.divider}`,
                boxShadow:'0 1px 4px rgba(42,33,52,.03)',
                display:'flex', gap:12, alignItems:'flex-start',
              }}>
                <div style={{
                  width:44, height:44, borderRadius:11,
                  background:`${e.tint}16`, color:e.tint,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                  <span style={{fontSize:10.5, fontWeight:700, letterSpacing:'.04em'}}>{e.d}</span>
                  <span style={{fontSize:10, opacity:.75, marginTop:1}}>{e.t}</span>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:700, color:C.fg, lineHeight:1.25}}>{e.title}</div>
                  <div style={{fontSize:11.5, color:C.fgDim, marginTop:3}}>{e.loc}</div>
                  <div style={{fontSize:11.5, color:C.fgDim, marginTop:6, fontStyle:'italic', lineHeight:1.4}}>
                    {e.who}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Valg — vent eller utvid */}
        <div style={{padding:'26px 24px 0'}}>
          <button style={{
            width:'100%', padding:'14px 18px', borderRadius:14, border:'none',
            background:C.fg, color:C.cream,
            fontSize:14.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            marginBottom:10,
          }}>
            Vis flere i sentrum
          </button>
          <button style={{
            width:'100%', padding:'13px 18px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:'transparent', color:C.fg,
            fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Si fra når det åpner på Grefsen
          </button>
          <div style={{textAlign:'center', marginTop:16, fontSize:11.5, color:C.fgFaint, lineHeight:1.5}}>
            Vi sender ingen pushmeldinger før første invitasjon.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 3) VENNE-PROFIL — offentlig view av Kari. Ingen private data.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenFriendProfile() {
  const C = window.HC;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="20:14"/>

        {/* Header — tilbake-pil */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:C.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="16" height="14" viewBox="0 0 16 14"><path d="M7 1L2 7l5 6M2 7h13" stroke={C.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:'transparent', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="4" height="18" viewBox="0 0 4 18"><circle cx="2" cy="2" r="2" fill={C.fgDim}/><circle cx="2" cy="9" r="2" fill={C.fgDim}/><circle cx="2" cy="16" r="2" fill={C.fgDim}/></svg>
          </button>
        </div>

        {/* Avatar + navn */}
        <div style={{padding:'18px 24px 0', textAlign:'center'}}>
          <div style={{
            width:100, height:100, borderRadius:50,
            background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#FFF3E0', fontWeight:700, fontSize:38,
            margin:'0 auto 14px',
            boxShadow:'0 6px 20px rgba(42,33,52,.12)',
            border:`3px solid ${C.card}`,
          }}>
            K
          </div>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>
            Kari
          </h1>
          <div style={{marginTop:6, fontSize:13, color:C.fgDim, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <svg width="10" height="12" viewBox="0 0 12 14"><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" fill="none" stroke={C.fgDim} strokeWidth="1.4"/><circle cx="6" cy="5" r="1.5" fill={C.fgDim}/></svg>
            <span>Oslo · Grünerløkka</span>
          </div>
          {/* Liten kontekst — ikke "om meg" */}
          <div style={{marginTop:12, padding:'10px 16px', background:C.cream, borderRadius:12, fontSize:13, color:C.fg, lineHeight:1.5, display:'inline-block', maxWidth:280, fontStyle:'italic'}}>
            &quot;Leser for mye, går for lite. Jobber med det.&quot;
          </div>
        </div>

        {/* CTA — Send melding */}
        <div style={{padding:'22px 24px 0'}}>
          <button style={{
            width:'100%', padding:'14px 18px', borderRadius:14, border:'none',
            background:C.coral, color:'#fff',
            fontSize:14.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:`0 6px 16px ${C.coral}40`,
          }}>
            <svg width="16" height="14" viewBox="0 0 18 16"><path d="M1 3a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 3v-3H3a2 2 0 01-2-2V3z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
            Send melding
          </button>
        </div>

        {/* Felles events — hvor dere har møttes */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:10, padding:'0 2px'}}>
            Dere har møttes · 3 ganger
          </div>
          <div style={{background:C.card, borderRadius:14, padding:'4px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {[
              { t:'Vinkveld på Territoriet', d:'12. april', loc:'Grünerløkka' },
              { t:'Brettspillkveld hos Trekroneren', d:'4. april', loc:'Majorstuen' },
              { t:'Søndagsvandring Akerselva', d:'24. mars', loc:'Nedre Foss' },
            ].map((e, i, arr) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                borderBottom: i < arr.length-1 ? `1px solid ${C.divider}` : 'none',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:10, background:`${C.coral}14`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 18 18"><rect x="3" y="4" width="12" height="11" rx="1.5" fill="none" stroke={C.coral} strokeWidth="1.4"/><path d="M3 8h12" stroke={C.coral} strokeWidth="1.4"/><path d="M6 2v4M12 2v4" stroke={C.coral} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:C.fg}}>{e.t}</div>
                  <div style={{fontSize:11, color:C.fgDim, marginTop:2}}>{e.d} · {e.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Felles interesser — tagger, ikke profildata */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:10, padding:'0 2px'}}>
            Dere deler
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {[
              { l:'Sakte bøker', me:true },
              { l:'Vin uten snobberi', me:true },
              { l:'Hagetur våren', me:false },
              { l:'Lange turer', me:true },
              { l:'Jazz på Herr Nilsen', me:false },
            ].map((t, i) => (
              <span key={i} style={{
                padding:'8px 14px', borderRadius:20,
                background: t.me ? `${C.plum}12` : C.card,
                border: t.me ? `1px solid ${C.plum}30` : `1px solid ${C.divider}`,
                fontSize:12.5, fontWeight:600,
                color: t.me ? C.plum : C.fgDim,
              }}>
                {t.l}
              </span>
            ))}
          </div>
        </div>

        {/* Link til minner */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            background:C.cream, borderRadius:14, padding:'14px 16px',
            border:`1px solid ${C.divider}`,
            display:'flex', alignItems:'center', gap:12, cursor:'pointer',
          }}>
            <div style={{width:36, height:36, borderRadius:18, background:`${C.amber}18`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="17" height="17" viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="1.5" fill="none" stroke={C.amber} strokeWidth="1.4"/><rect x="3" y="11" width="12" height="4" fill={C.amber} opacity=".4"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:C.amber}}>
                Våre øyeblikk
              </div>
              <div style={{fontSize:13, fontWeight:700, color:C.fg, marginTop:2}}>
                3 kvelder fra i vinter og vår
              </div>
            </div>
            <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={C.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Footer — privacy reminder */}
        <div style={{padding:'22px 24px 0', fontSize:11, color:C.fgFaint, textAlign:'center', lineHeight:1.5}}>
          Kari bestemmer hva som vises her. Du ser bare det dere deler.
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 4) FELLES MINNER — polaroid-kortsamling fra events dere har vært på.
//    Krem-hvit bakgrunn, Caveat-håndskrift for dato og venue.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenSharedMemories() {
  const C = window.HC;

  const polaroids = [
    {
      date:'12. april',
      venue:'Territoriet',
      tint:'linear-gradient(135deg,#F0C9B0,#C87E5E)',
      emoji:'🍷',
      quote:'«Alle vinene jeg ikke forstår smaker av eik.»',
      who:'— Kari, tredje glass',
      rotate:-2,
    },
    {
      date:'4. april',
      venue:'Trekroneren',
      tint:'linear-gradient(135deg,#C5D4B8,#6E8D60)',
      emoji:'🎲',
      quote:'«Vi ga opp regelheftet og fant på våre egne.»',
      who:'— kl. 23:40',
      rotate:1.5,
    },
    {
      date:'24. mars',
      venue:'Akerselva',
      tint:'linear-gradient(135deg,#C7B8D4,#7F6A95)',
      emoji:'🌸',
      quote:'«Første hestehov. Neste uke er det vår.»',
      who:'— Kari, ved Mathallen',
      rotate:-1,
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.cream}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:20}}>
        <H_StatusBarLight time="20:19"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', alignItems:'center', gap:12}}>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:C.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="16" height="14" viewBox="0 0 16 14"><path d="M7 1L2 7l5 6M2 7h13" stroke={C.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.amber}}>
              Kari · våre øyeblikk
            </div>
            <h1 style={{margin:'2px 0 0', fontSize:22, fontWeight:700, color:C.fg, letterSpacing:'-0.01em', fontFamily:'"Caveat", "Segoe Script", cursive'}}>
              3 kvelder, så langt.
            </h1>
          </div>
        </div>

        {/* Liten preamble */}
        <div style={{padding:'18px 28px 0', fontSize:13, color:C.fgDim, lineHeight:1.5, fontStyle:'italic'}}>
          Små bilder fra kvelder dere har delt. Dere bestemmer selv hva dere vil huske.
        </div>

        {/* Polaroid-kort */}
        <div style={{padding:'30px 26px 0', display:'flex', flexDirection:'column', gap:30}}>
          {polaroids.map((p, i) => (
            <div key={i} style={{
              alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
              transform:`rotate(${p.rotate}deg)`,
              background:'#FFFDF8',
              padding:'14px 14px 20px',
              borderRadius:4,
              boxShadow:'0 10px 30px rgba(42,33,52,.14), 0 2px 6px rgba(42,33,52,.08)',
              width:260,
              border:'1px solid rgba(42,33,52,.04)',
            }}>
              {/* Selve "bildet" */}
              <div style={{
                width:'100%', height:200, borderRadius:2,
                background:p.tint,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:64,
                boxShadow:'inset 0 0 30px rgba(0,0,0,.08)',
                marginBottom:12,
              }}>
                {p.emoji}
              </div>

              {/* Håndskrevet tekst under */}
              <div style={{
                fontFamily:'"Caveat", "Segoe Script", "Bradley Hand", cursive',
                fontSize:22, color:C.fg, lineHeight:1.1,
                display:'flex', justifyContent:'space-between', alignItems:'baseline',
                marginBottom:6,
              }}>
                <span>{p.date}</span>
                <span style={{fontSize:18, color:C.plum}}>{p.venue}</span>
              </div>
              <div style={{
                fontSize:13, color:C.fg, lineHeight:1.45, fontStyle:'italic',
                marginTop:4,
              }}>
                {p.quote}
              </div>
              <div style={{
                fontSize:11.5, color:C.fgFaint, marginTop:6,
                fontFamily:'"Caveat", cursive',
              }}>
                {p.who}
              </div>
            </div>
          ))}
        </div>

        {/* Tom tilstand fremover */}
        <div style={{padding:'30px 28px 0'}}>
          <div style={{
            border:`1.5px dashed ${C.divider}`,
            borderRadius:8,
            padding:'24px 18px', textAlign:'center',
            background:'rgba(255,255,255,.5)',
          }}>
            <div style={{fontSize:13, color:C.fgDim, lineHeight:1.5, fontStyle:'italic'}}>
              Neste øyeblikk venter et sted i byen.<br/>
              Ingen press.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 5) MOTTATT INVITASJON — Kari inviterer deg. Personlig tone.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenInvitationReceived() {
  const C = window.HC;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{
        position:'absolute', top:-100, left:-60, width:280, height:280, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.coral}20 0%, transparent 70%)`,
      }}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="17:32"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:C.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke={C.fg} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum}}>
            En invitasjon
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Kari-hilsen — avatar + navn + tekst */}
        <div style={{padding:'28px 26px 0'}}>
          <div style={{display:'flex', alignItems:'flex-start', gap:14}}>
            <div style={{
              width:52, height:52, borderRadius:26,
              background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:20,
              flexShrink:0,
              boxShadow:'0 3px 10px rgba(42,33,52,.1)',
            }}>
              K
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, color:C.fgDim}}>
                <span style={{color:C.fg, fontWeight:700}}>Kari</span> sendte deg en invitasjon
              </div>
              <div style={{fontSize:11, color:C.fgFaint, marginTop:2}}>
                for litt siden
              </div>
            </div>
          </div>

          {/* Karis håndskrevne hilsen */}
          <div style={{
            marginTop:18, padding:'18px 20px 16px',
            background:C.cream,
            borderRadius:'18px 18px 18px 4px',
            border:`1px solid ${C.divider}`,
            fontSize:15.5, lineHeight:1.5, color:C.fg,
            boxShadow:'0 4px 14px rgba(42,33,52,.05)',
          }}>
            &quot;Du — husker du vi snakket om vinylkvelder? Det er en på lørdag. Tenkte på deg. Blir bare vi og tre andre jeg liker.&quot;
            <div style={{
              marginTop:10, fontSize:18, color:C.plum,
              fontFamily:'"Caveat", "Segoe Script", cursive',
            }}>
              — Kari
            </div>
          </div>
        </div>

        {/* Event-kort */}
        <div style={{padding:'26px 24px 0'}}>
          <div style={{
            background:C.card, borderRadius:18, overflow:'hidden',
            border:`1px solid ${C.divider}`,
            boxShadow:'0 6px 18px rgba(42,33,52,.06)',
          }}>
            {/* Banner */}
            <div style={{
              height:90, background:`linear-gradient(135deg, ${C.plum} 0%, ${C.coral} 100%)`,
              position:'relative', overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff',
            }}>
              <div style={{position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:60, background:'rgba(255,255,255,.12)'}}/>
              <div style={{position:'relative', textAlign:'center'}}>
                <div style={{fontSize:10, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', opacity:.88}}>
                  Lørdag 25. april
                </div>
                <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.01em', marginTop:4}}>
                  Vinyl &amp; vin
                </div>
              </div>
            </div>

            {/* Detaljer */}
            <div style={{padding:'18px 20px 20px'}}>
              <div style={{display:'flex', alignItems:'flex-start', gap:12, padding:'8px 0'}}>
                <div style={{width:24, flexShrink:0, display:'flex', justifyContent:'center', paddingTop:2}}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke={C.plum} strokeWidth="1.4"/><path d="M8 4v4l3 2" stroke={C.plum} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>20:00 — ca. 23:00</div>
                  <div style={{fontSize:12, color:C.fgDim, marginTop:1}}>Kvelden starter rolig.</div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'flex-start', gap:12, padding:'8px 0'}}>
                <div style={{width:24, flexShrink:0, display:'flex', justifyContent:'center', paddingTop:2}}>
                  <svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 1C4.2 1 2 3.2 2 6c0 3.8 5 9 5 9s5-5.2 5-9c0-2.8-2.2-5-5-5z" fill="none" stroke={C.plum} strokeWidth="1.4"/><circle cx="7" cy="6" r="1.6" fill={C.plum}/></svg>
                </div>
                <div>
                  <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>Bar Brutus, Grünerløkka</div>
                  <div style={{fontSize:12, color:C.fgDim, marginTop:1}}>Eiekrogen 2 · 12 min gange fra deg</div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'flex-start', gap:12, padding:'8px 0'}}>
                <div style={{width:24, flexShrink:0, display:'flex', justifyContent:'center', paddingTop:2}}>
                  <svg width="18" height="14" viewBox="0 0 18 14"><circle cx="5" cy="5" r="2.5" fill="none" stroke={C.plum} strokeWidth="1.4"/><circle cx="13" cy="5" r="2.5" fill="none" stroke={C.plum} strokeWidth="1.4"/><path d="M1 13c0-2 2-3.5 4-3.5M13 13c0-2 2-3.5 4-3.5M5 13c0-2 2-3.5 4-3.5" stroke={C.plum} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>Kari + 3 andre</div>
                  <div style={{fontSize:12, color:C.fgDim, marginTop:1}}>Erik, Anja, Mari. Alle kjent.</div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'flex-start', gap:12, padding:'8px 0 0'}}>
                <div style={{width:24, flexShrink:0, display:'flex', justifyContent:'center', paddingTop:2}}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3h10v10H3z" fill="none" stroke={C.plum} strokeWidth="1.4"/><circle cx="8" cy="8" r="2" fill={C.plum}/></svg>
                </div>
                <div>
                  <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>Inngang 150 kr</div>
                  <div style={{fontSize:12, color:C.fgDim, marginTop:1}}>Betales i døra. Ingen dresskode.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Svar-valg */}
        <div style={{padding:'22px 24px 0'}}>
          <button style={{
            width:'100%', padding:'15px 20px', borderRadius:14, border:'none',
            background:C.coral, color:'#fff',
            fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            boxShadow:`0 8px 20px ${C.coral}44`,
            marginBottom:10,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <svg width="14" height="11" viewBox="0 0 14 11"><path d="M2 6l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Kommer gjerne
          </button>
          <button style={{
            width:'100%', padding:'13px 20px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:C.card, color:C.fg,
            fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Kan ikke denne gangen
          </button>
          <div style={{textAlign:'center', marginTop:14, fontSize:11.5, color:C.fgFaint, lineHeight:1.5}}>
            Kari får beskjed — ingen standardtekst fra appen.
          </div>
        </div>
      </div>
    </div>
  );
}

// Eksporter til window
window.H_ScreenWelcome = H_ScreenWelcome;
window.H_ScreenEmptyOslo = H_ScreenEmptyOslo;
window.H_ScreenFriendProfile = H_ScreenFriendProfile;
window.H_ScreenSharedMemories = H_ScreenSharedMemories;
window.H_ScreenInvitationReceived = H_ScreenInvitationReceived;
