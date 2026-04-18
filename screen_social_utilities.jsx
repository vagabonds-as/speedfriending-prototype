/* global React, HC, H_StatusBarLight */
// Sosiale utilities — fire skjermer for omsorgsfull håndtering av
// relasjoner, rapportering, deling og kalenderintegrering.
// Tone: voksen, respektfull, transparent. Ingen shaming, ingen drama,
// ingen automatiske handlinger.

// ───────────────────────────────────────────────────────────────────────────
// 1) FJERN VENN / BLOKKER — Viktor vil fjerne Kari fra kontaktene sine.
//    To tydelige valg med full transparens om hva hver handling gjør.
//    Bekreftelsesdialog før handling. Stille bekreftelse etterpå.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenRemoveBlock() {
  const C = window.HC;
  const [choice, setChoice] = React.useState(null);     // 'remove' | 'block' | null
  const [confirming, setConfirming] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const reset = () => { setChoice(null); setConfirming(false); setDone(false); };

  // Stille bekreftelse etter handling
  if (done) {
    const msg = choice === 'block'
      ? 'Kari er blokkert. Dere blir aldri matchet til samme kveld igjen.'
      : 'Kari er fjernet fra kontaktene dine. Felles historikk er slettet fra ditt syn.';
    return (
      <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
        <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
          <H_StatusBarLight time="14:47"/>
          <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', textAlign:'center'}}>
            <div style={{
              width:64, height:64, borderRadius:32,
              background:`${C.plum}14`,
              display:'flex', alignItems:'center', justifyContent:'center',
              marginBottom:22,
            }}>
              <svg width="28" height="20" viewBox="0 0 28 20"><path d="M3 10l7 7 15-15" stroke={C.plum} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.01em', color:C.fg, lineHeight:1.25}}>
              Gjort.
            </h1>
            <p style={{margin:'12px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim, maxWidth:300}}>
              {msg}
            </p>
            <div style={{marginTop:24, fontSize:12, color:C.fgFaint, lineHeight:1.5, maxWidth:280}}>
              Kari får ingen notifikasjon. Dette er mellom deg og appen.
            </div>
            <button onClick={reset} style={{
              marginTop:32, padding:'13px 26px', borderRadius:14, border:'none',
              background:C.fg, color:C.cream,
              fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            }}>
              Tilbake til profil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:47"/>

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
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim}}>
            Kontaktvalg
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Kari — hvem handler det om */}
        <div style={{padding:'22px 24px 0', textAlign:'center'}}>
          <div style={{
            width:72, height:72, borderRadius:36,
            background:'linear-gradient(135deg,#E8B8A0,#B5694A)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#FFF3E0', fontWeight:700, fontSize:28,
            margin:'0 auto 12px',
            boxShadow:'0 4px 14px rgba(42,33,52,.1)',
          }}>
            K
          </div>
          <div style={{fontSize:18, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>Kari</div>
          <div style={{fontSize:12, color:C.fgDim, marginTop:3}}>
            3 felles kvelder · sist 12. april
          </div>
        </div>

        {/* Preamble — ingen shaming */}
        <div style={{padding:'22px 28px 0', fontSize:13.5, color:C.fgDim, lineHeight:1.55, textAlign:'center'}}>
          Noen relasjoner passer ikke lenger, og det er greit.<br/>
          Du bestemmer — vi holder det privat.
        </div>

        {/* To valg — hver med tydelig forklaring */}
        <div style={{padding:'26px 22px 0', display:'flex', flexDirection:'column', gap:14}}>
          {/* Fjern fra kontakter — mykere */}
          <button
            onClick={() => { setChoice('remove'); setConfirming(true); }}
            style={{
              textAlign:'left', padding:'18px 20px', borderRadius:16,
              border:`1px solid ${C.divider}`, background:C.card,
              cursor:'pointer', fontFamily:'inherit', color:'inherit',
              display:'flex', gap:14, alignItems:'flex-start',
              boxShadow:'0 1px 4px rgba(42,33,52,.03)',
            }}
          >
            <div style={{
              width:40, height:40, borderRadius:12, flexShrink:0,
              background:`${C.amber}16`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="8" cy="7" r="3.5" fill="none" stroke={C.amber} strokeWidth="1.5"/>
                <path d="M2 17c0-3 2.5-5 6-5s6 2 6 5" fill="none" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 5l5 5M18 5l-5 5" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:15, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>
                Fjern fra kontakter
              </div>
              <div style={{fontSize:12.5, color:C.fgDim, marginTop:6, lineHeight:1.5}}>
                Kari forsvinner fra kontaktlisten din. Felles polaroider og historikk skjules fra ditt syn.
                <span style={{display:'block', marginTop:6, color:C.fgFaint, fontSize:11.5}}>
                  Dere kan fortsatt havne på samme event i fremtiden.
                </span>
              </div>
            </div>
          </button>

          {/* Blokker — sterkere */}
          <button
            onClick={() => { setChoice('block'); setConfirming(true); }}
            style={{
              textAlign:'left', padding:'18px 20px', borderRadius:16,
              border:`1px solid ${C.coralDeep}30`, background:`${C.coralDeep}08`,
              cursor:'pointer', fontFamily:'inherit', color:'inherit',
              display:'flex', gap:14, alignItems:'flex-start',
            }}
          >
            <div style={{
              width:40, height:40, borderRadius:12, flexShrink:0,
              background:`${C.coralDeep}16`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="none" stroke={C.coralDeep} strokeWidth="1.6"/>
                <path d="M4 4l12 12" stroke={C.coralDeep} strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:15, fontWeight:700, color:C.fg, letterSpacing:'-0.01em'}}>
                Blokker
              </div>
              <div style={{fontSize:12.5, color:C.fgDim, marginTop:6, lineHeight:1.5}}>
                Alt over — pluss at dere aldri blir plassert på samme event igjen. Kari ser deg ikke lenger i appen.
                <span style={{display:'block', marginTop:6, color:C.fgFaint, fontSize:11.5}}>
                  Du kan oppheve dette når som helst under Innstillinger.
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Hva Kari ser */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{
            background:C.cream, border:`1px solid ${C.divider}`,
            borderRadius:12, padding:'14px 16px',
            display:'flex', gap:12, alignItems:'flex-start',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{flexShrink:0, marginTop:1}}>
              <circle cx="9" cy="9" r="7.5" fill="none" stroke={C.plum} strokeWidth="1.3"/>
              <path d="M9 5v5M9 13v.01" stroke={C.plum} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{fontSize:12, color:C.fgDim, lineHeight:1.55}}>
              <span style={{color:C.fg, fontWeight:700}}>Kari får ingen beskjed.</span>{' '}
              Uansett hva du velger — hun blir ikke notifisert. Hun merker det bare hvis hun prøver å finne deg.
            </div>
          </div>
        </div>

        <div style={{padding:'18px 24px 0'}}>
          <button style={{
            width:'100%', padding:'13px 18px', borderRadius:14,
            border:`1px solid ${C.divider}`, background:'transparent', color:C.fgDim,
            fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Avbryt
          </button>
        </div>
      </div>

      {/* Bekreftelsesdialog */}
      {confirming && (
        <div style={{
          position:'absolute', inset:0, zIndex:80,
          background:'rgba(42,33,52,.5)',
          display:'flex', alignItems:'flex-end', justifyContent:'center',
        }}>
          <div style={{
            width:'100%', background:C.bg,
            borderTopLeftRadius:24, borderTopRightRadius:24,
            padding:'18px 24px 28px',
            boxShadow:'0 -10px 40px rgba(0,0,0,.25)',
          }}>
            <div style={{width:40, height:4, borderRadius:2, background:C.divider, margin:'0 auto 20px'}}/>
            <h2 style={{margin:0, fontSize:19, fontWeight:700, color:C.fg, letterSpacing:'-0.01em', textAlign:'center'}}>
              {choice === 'block' ? 'Blokker Kari?' : 'Fjern Kari fra kontaktene?'}
            </h2>
            <p style={{margin:'10px 0 0', fontSize:13, color:C.fgDim, lineHeight:1.55, textAlign:'center'}}>
              {choice === 'block'
                ? 'Dere blir aldri matchet på samme event igjen. Felles polaroider skjules fra deg.'
                : 'Felles polaroider skjules fra ditt syn. Dere kan fortsatt møtes på fremtidige events.'
              }
            </p>
            <div style={{marginTop:20}}>
              <button
                onClick={() => { setConfirming(false); setDone(true); }}
                style={{
                  width:'100%', padding:'14px 18px', borderRadius:14, border:'none',
                  background: choice === 'block' ? C.coralDeep : C.fg,
                  color: choice === 'block' ? '#fff' : C.cream,
                  fontSize:14.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                  marginBottom:8,
                }}
              >
                {choice === 'block' ? 'Ja, blokker' : 'Ja, fjern'}
              </button>
              <button
                onClick={() => { setConfirming(false); setChoice(null); }}
                style={{
                  width:'100%', padding:'13px 18px', borderRadius:14,
                  border:'none', background:'transparent', color:C.fg,
                  fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
                }}
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 2) RAPPORTERE BRUKER — Viktor har opplevd upassende oppførsel fra Erik.
//    Enkelt skjema, transparent om konsekvenser. Separat fra ambassadør-krise.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenReport() {
  const C = window.HC;

  const [category, setCategory] = React.useState(null);
  const [desc, setDesc] = React.useState('');
  const [hasAttachment, setHasAttachment] = React.useState(false);

  const categories = [
    { id:'harassment', label:'Trakassering',        sub:'Upassende kommentarer, berøring, press' },
    { id:'lies',       label:'Løgn om identitet',   sub:'Falsk profil, feilaktig bakgrunn' },
    { id:'threat',     label:'Trussel eller frykt', sub:'Du føler deg utrygg — vi prioriterer dette' },
    { id:'other',      label:'Noe annet',           sub:'Beskriv kort under' },
  ];

  const canSubmit = category && desc.trim().length >= 10;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="10:12"/>

        {/* Header */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:C.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="16" height="14" viewBox="0 0 16 14"><path d="M7 1L2 7l5 6M2 7h13" stroke={C.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim}}>
            Konfidensielt
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Heading */}
        <div style={{padding:'22px 26px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum}}>
            Rapporter Erik
          </div>
          <h1 style={{margin:'6px 0 0', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            Takk for at du sier fra.
          </h1>
          <p style={{margin:'12px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim}}>
            Dette gjør appen bedre for alle. Du bestemmer hva du deler —
            all informasjon går kun til Speedfriending-teamet.
          </p>
        </div>

        {/* Kategori */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:C.fgDim, marginBottom:10}}>
            Hva opplevde du?
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {categories.map(cat => {
              const sel = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    textAlign:'left', padding:'13px 16px', borderRadius:12,
                    border: sel ? `1.5px solid ${C.plum}` : `1px solid ${C.divider}`,
                    background: sel ? `${C.plum}0C` : C.card,
                    cursor:'pointer', fontFamily:'inherit', color:'inherit',
                    display:'flex', alignItems:'center', gap:12,
                  }}
                >
                  <div style={{
                    width:18, height:18, borderRadius:9,
                    border: sel ? `5px solid ${C.plum}` : `1.5px solid ${C.fgFaint}`,
                    background: sel ? C.card : 'transparent',
                    flexShrink:0, transition:'all .1s',
                  }}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>{cat.label}</div>
                    <div style={{fontSize:11.5, color:C.fgDim, marginTop:2}}>{cat.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Beskrivelse */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:C.fgDim, marginBottom:10}}>
            Beskriv kort (hva skjedde, når, hvor)
          </div>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Du trenger ikke ha alle detaljer. Bare fortell det du husker."
            style={{
              width:'100%', minHeight:96, padding:'12px 14px',
              borderRadius:12, border:`1px solid ${C.divider}`,
              background:C.card, color:C.fg,
              fontSize:13.5, lineHeight:1.5, fontFamily:'inherit',
              resize:'none', outline:'none', boxSizing:'border-box',
            }}
          />
          <div style={{marginTop:6, fontSize:11, color:C.fgFaint, textAlign:'right'}}>
            {desc.length} / 1000
          </div>
        </div>

        {/* Bilder */}
        <div style={{padding:'8px 24px 0'}}>
          <button
            onClick={() => setHasAttachment(!hasAttachment)}
            style={{
              width:'100%', padding:'12px 14px', borderRadius:12,
              border:`1.5px dashed ${hasAttachment ? C.plum : C.divider}`,
              background: hasAttachment ? `${C.plum}0A` : 'transparent',
              cursor:'pointer', fontFamily:'inherit', color:'inherit',
              display:'flex', alignItems:'center', gap:12,
            }}
          >
            <div style={{
              width:34, height:34, borderRadius:10,
              background:`${C.plum}14`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <rect x="2" y="3" width="14" height="12" rx="1.5" fill="none" stroke={C.plum} strokeWidth="1.4"/>
                <circle cx="6" cy="7" r="1.2" fill={C.plum}/>
                <path d="M2 13l4-4 4 3 3-2 3 3" fill="none" stroke={C.plum} strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{flex:1, minWidth:0, textAlign:'left'}}>
              <div style={{fontSize:13, fontWeight:700, color:C.fg}}>
                {hasAttachment ? '1 bilde lagt ved' : 'Legg ved bilder (valgfritt)'}
              </div>
              <div style={{fontSize:11, color:C.fgDim, marginTop:2}}>
                Skjermbilder, bilder fra stedet — kun hvis relevant
              </div>
            </div>
          </button>
        </div>

        {/* Transparens — hva skjer etterpå */}
        <div style={{padding:'24px 24px 0'}}>
          <div style={{
            background:`${C.plum}08`, border:`1px solid ${C.plum}20`,
            borderRadius:14, padding:'16px 18px',
          }}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:10}}>
              Hva skjer etter du sender?
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {[
                { n:'1', t:'Speedfriending-teamet leser rapporten innen 24 timer.' },
                { n:'2', t:'Ingen automatiske handlinger. Et menneske vurderer saken.' },
                { n:'3', t:'Er det alvorlig, ringer vi deg. Ellers får du e-post med status innen 3 dager.' },
                { n:'4', t:'Erik får aldri vite at det var du som rapporterte.' },
              ].map((s, i) => (
                <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                  <div style={{
                    width:22, height:22, borderRadius:11, flexShrink:0,
                    background:C.plum, color:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:700,
                  }}>{s.n}</div>
                  <div style={{fontSize:12.5, color:C.fg, lineHeight:1.5, paddingTop:3}}>
                    {s.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Separert fra krisehåndtering */}
        <div style={{padding:'14px 28px 0', fontSize:11.5, color:C.fgFaint, lineHeight:1.55, textAlign:'center'}}>
          Er du i akutt fare nå? Ring ambassadøren direkte fra event-siden,
          eller 113 hvis det haster.
        </div>

        {/* Send */}
        <div style={{padding:'22px 24px 0'}}>
          <button
            disabled={!canSubmit}
            style={{
              width:'100%', padding:'15px 20px', borderRadius:14, border:'none',
              background: canSubmit ? C.plum : `${C.fgFaint}40`,
              color: canSubmit ? '#fff' : C.fgFaint,
              fontSize:15, fontWeight:700,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              fontFamily:'inherit',
              boxShadow: canSubmit ? `0 8px 20px ${C.plum}40` : 'none',
              marginBottom:8,
            }}
          >
            Send rapport
          </button>
          <button style={{
            width:'100%', padding:'13px 20px', borderRadius:14,
            border:'none', background:'transparent', color:C.fgDim,
            fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 3) POLAROID-DELING — Viktor vil dele polaroid fra vinkvelden til IG Story.
//    Forhåndsrendret kort med initialer (ikke fulle navn), 3 delings-valg,
//    Rediger-knapp for egen tekst. Varme farger, Caveat for dato/sitat.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenPolaroidShare() {
  const C = window.HC;

  const [caption, setCaption] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  // 5 deltakere — kun initialer, samtykke-respekt
  const attendees = [
    { i:'V', bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)' },  // Viktor (deg selv)
    { i:'K', bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
    { i:'E', bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
    { i:'A', bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
    { i:'M', bg:'linear-gradient(135deg,#C5D4B8,#6E8D60)' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.cream}}>
      {/* Varme bakgrunnsglimt */}
      <div style={{
        position:'absolute', inset:0,
        background:`radial-gradient(ellipse at 15% 10%, ${C.coralSoft}28 0%, transparent 55%), radial-gradient(ellipse at 90% 90%, ${C.amber}20 0%, transparent 60%)`,
      }}/>

      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:18}}>
        <H_StatusBarLight time="22:48"/>

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
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.amber}}>
            Del øyeblikket
          </div>
          <div style={{width:40}}/>
        </div>

        {/* Polaroid-kort — forhåndsrendret */}
        <div style={{padding:'22px 0 0', display:'flex', justifyContent:'center'}}>
          <div style={{
            transform:'rotate(-1.5deg)',
            background:'#FFFDF8',
            padding:'16px 16px 22px',
            borderRadius:4,
            boxShadow:'0 18px 40px rgba(42,33,52,.18), 0 4px 10px rgba(42,33,52,.08)',
            width:280,
            border:'1px solid rgba(42,33,52,.04)',
          }}>
            {/* Selve bildet — varm vin-scene */}
            <div style={{
              width:'100%', height:220, borderRadius:2,
              background:`linear-gradient(135deg, #F0C9B0 0%, #C87E5E 60%, #8A4A35 100%)`,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end',
              padding:'16px',
              boxShadow:'inset 0 0 40px rgba(0,0,0,.12)',
              marginBottom:14, position:'relative', overflow:'hidden',
              boxSizing:'border-box',
            }}>
              {/* Bakgrunns-emoji som svakt motiv */}
              <div style={{position:'absolute', top:24, left:'50%', transform:'translateX(-50%)', fontSize:80, opacity:.82}}>
                🍷
              </div>
              {/* Deltakere — initialer nederst, pseudonymt */}
              <div style={{display:'flex', gap:-6, alignItems:'center', zIndex:2}}>
                {attendees.map((p, i) => (
                  <div key={i} style={{
                    width:30, height:30, borderRadius:15, background:p.bg,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#FFF3E0', fontWeight:700, fontSize:11.5,
                    border:'2px solid rgba(255,255,255,.92)',
                    marginLeft: i===0 ? 0 : -8,
                    boxShadow:'0 1px 3px rgba(0,0,0,.15)',
                  }}>
                    {p.i}
                  </div>
                ))}
              </div>

              {/* Valgfri egen caption oppå bildet */}
              {caption && (
                <div style={{
                  position:'absolute', top:14, left:12, right:12,
                  fontFamily:'"Caveat", "Segoe Script", cursive',
                  fontSize:20, color:'#FFF8EE', lineHeight:1.1,
                  textShadow:'0 2px 8px rgba(0,0,0,.35)',
                  textAlign:'center', zIndex:2,
                }}>
                  {caption}
                </div>
              )}
            </div>

            {/* Dato + venue — Caveat */}
            <div style={{
              fontFamily:'"Caveat", "Segoe Script", "Bradley Hand", cursive',
              fontSize:22, color:C.fg, lineHeight:1.1,
              display:'flex', justifyContent:'space-between', alignItems:'baseline',
              marginBottom:4,
            }}>
              <span>18. april</span>
              <span style={{fontSize:18, color:C.plum}}>Territoriet</span>
            </div>
            <div style={{fontSize:12, color:C.fgFaint, letterSpacing:'.02em'}}>
              5 sammen · Oslo
            </div>
          </div>
        </div>

        {/* Rediger-knapp */}
        <div style={{padding:'22px 24px 0', display:'flex', justifyContent:'center'}}>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              padding:'9px 18px', borderRadius:22,
              border:`1px solid ${C.divider}`, background:C.card,
              color:C.fg, fontSize:12.5, fontWeight:600,
              cursor:'pointer', fontFamily:'inherit',
              display:'inline-flex', alignItems:'center', gap:8,
              boxShadow:'0 1px 4px rgba(42,33,52,.04)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14"><path d="M1 11l8.5-8.5a1.4 1.4 0 012 2L3 13H1v-2z" fill="none" stroke={C.fg} strokeWidth="1.4" strokeLinejoin="round"/></svg>
            {editing ? 'Ferdig' : 'Rediger — legg til egen tekst'}
          </button>
        </div>

        {/* Tekstfelt når editing */}
        {editing && (
          <div style={{padding:'16px 26px 0'}}>
            <input
              value={caption}
              onChange={e => setCaption(e.target.value.slice(0, 60))}
              placeholder="En kort hilsen over polaroiden..."
              style={{
                width:'100%', padding:'12px 14px',
                borderRadius:12, border:`1px solid ${C.divider}`,
                background:C.card, color:C.fg,
                fontSize:14, fontFamily:'"Caveat", cursive',
                outline:'none', boxSizing:'border-box',
              }}
              autoFocus
            />
            <div style={{marginTop:6, fontSize:11, color:C.fgFaint, textAlign:'right'}}>
              {caption.length} / 60
            </div>
          </div>
        )}

        {/* Delings-alternativer */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim, marginBottom:12, textAlign:'center'}}>
            Del til
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {/* Instagram Story */}
            <button style={{
              padding:'14px 18px', borderRadius:14, border:'none',
              background:`linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)`,
              color:'#fff', fontSize:14.5, fontWeight:700,
              cursor:'pointer', fontFamily:'inherit',
              display:'flex', alignItems:'center', gap:12,
              boxShadow:'0 6px 18px rgba(221,42,123,.32)',
            }}>
              <div style={{
                width:30, height:30, borderRadius:8,
                background:'rgba(255,255,255,.22)',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.4"/>
                  <circle cx="8" cy="8" r="3" fill="none" stroke="#fff" strokeWidth="1.4"/>
                  <circle cx="11.5" cy="4.5" r="0.9" fill="#fff"/>
                </svg>
              </div>
              <span style={{flex:1, textAlign:'left'}}>Instagram Story</span>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/></svg>
            </button>

            {/* Kopier lenke */}
            <button style={{
              padding:'14px 18px', borderRadius:14, border:`1px solid ${C.divider}`,
              background:C.card, color:C.fg,
              fontSize:14, fontWeight:600,
              cursor:'pointer', fontFamily:'inherit',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:30, height:30, borderRadius:8,
                background:`${C.plum}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M6 10l4-4M5 11a3 3 0 01-3-3 3 3 0 013-3h2M11 5a3 3 0 013 3 3 3 0 01-3 3H9" stroke={C.plum} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{flex:1, textAlign:'left'}}>Kopier lenke</span>
              <span style={{fontSize:11, color:C.fgFaint}}>speedfr.app/p/x73k</span>
            </button>

            {/* SMS / iMessage */}
            <button style={{
              padding:'14px 18px', borderRadius:14, border:`1px solid ${C.divider}`,
              background:C.card, color:C.fg,
              fontSize:14, fontWeight:600,
              cursor:'pointer', fontFamily:'inherit',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:30, height:30, borderRadius:8,
                background:`${C.green}18`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3v-3H4a2 2 0 01-2-2V4z" fill="none" stroke={C.green} strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{flex:1, textAlign:'left'}}>SMS / iMessage</span>
              <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={C.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Privacy-note */}
        <div style={{padding:'22px 28px 0', fontSize:11.5, color:C.fgFaint, lineHeight:1.55, textAlign:'center'}}>
          Navn vises som initialer. De andre kan be om å skjule sitt — kom
          inn på <span style={{color:C.fgDim, fontWeight:600}}>Innstillinger → Deling</span>.
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 4) KALENDERINVITASJON — etter Viktor har reservert event.
//    4 valg (Apple, Google, Outlook, kopier lenke), forhåndsvisning,
//    Hopp over-knapp synlig. Rolig tone.
// ───────────────────────────────────────────────────────────────────────────
function H_ScreenCalendarInvite() {
  const C = window.HC;

  const [selected, setSelected] = React.useState(null);

  const providers = [
    {
      id:'apple', name:'Apple Calendar', sub:'Åpner iCal-appen',
      color:'#FFFFFF', iconBg:'#000000',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="2" y="4" width="16" height="14" rx="2.5" fill="#fff"/>
          <rect x="2" y="4" width="16" height="4" rx="2.5" fill="#E0383E"/>
          <text x="10" y="15" textAnchor="middle" fill="#111" fontSize="8" fontWeight="700" fontFamily="-apple-system,system-ui">25</text>
        </svg>
      ),
    },
    {
      id:'google', name:'Google Calendar', sub:'Åpner Google',
      color:'#FFFFFF', iconBg:'#FFFFFF',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="2" y="2" width="18" height="18" rx="2.5" fill="#fff" stroke="#E8E8E8" strokeWidth="0.6"/>
          <path d="M2 2h9v9H2z" fill="#4285F4"/>
          <path d="M11 2h9v9h-9z" fill="#EA4335"/>
          <path d="M2 11h9v9H2z" fill="#FBBC04"/>
          <path d="M11 11h9v9h-9z" fill="#34A853"/>
          <text x="11" y="14.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="-apple-system,system-ui">25</text>
        </svg>
      ),
    },
    {
      id:'outlook', name:'Outlook', sub:'Åpner Microsoft 365',
      color:'#FFFFFF', iconBg:'#0078D4',
      icon: (
        <svg width="22" height="18" viewBox="0 0 22 18">
          <rect x="0" y="0" width="13" height="18" rx="1" fill="#0078D4"/>
          <circle cx="6.5" cy="9" r="3.2" fill="#fff"/>
          <circle cx="6.5" cy="9" r="1.6" fill="#0078D4"/>
          <rect x="13.5" y="3" width="8" height="12" fill="#fff" stroke="#0078D4" strokeWidth=".5"/>
          <path d="M13.5 3l4 4 4-4" stroke="#0078D4" strokeWidth=".8" fill="none"/>
        </svg>
      ),
    },
    {
      id:'link', name:'Kopier som .ics-lenke', sub:'Åpner i hvilken som helst kalender',
      color:'transparent', iconBg:`${C.plum}14`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M7 11l4-4M6 12a3 3 0 01-3-3 3 3 0 013-3h2M12 6a3 3 0 013 3 3 3 0 01-3 3h-2" stroke={C.plum} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:C.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="15:02"/>

        {/* Header — "Hopp over" tydelig synlig */}
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:C.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.06)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke={C.fg} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <button style={{
            padding:'8px 14px', borderRadius:18, border:'none',
            background:'transparent', color:C.fgDim,
            fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Hopp over
          </button>
        </div>

        {/* Bekreftelse + tilbud */}
        <div style={{padding:'12px 26px 0'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:16, background:`${C.green}16`, marginBottom:14}}>
            <svg width="11" height="8" viewBox="0 0 11 8"><path d="M1 4l3 3 6-6" stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{fontSize:11, fontWeight:700, color:C.green, letterSpacing:'.04em'}}>
              Reservert
            </span>
          </div>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:C.fg, lineHeight:1.2}}>
            Vil du ha det i kalenderen?
          </h1>
          <p style={{margin:'10px 0 0', fontSize:14, lineHeight:1.55, color:C.fgDim}}>
            Helt valgfritt. Appen minner deg uansett 2 timer før.
          </p>
        </div>

        {/* Forhåndsvisning av kalenderoppføring */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.plum, marginBottom:10}}>
            Slik blir oppføringen
          </div>
          <div style={{
            background:C.card, borderRadius:14, overflow:'hidden',
            border:`1px solid ${C.divider}`,
            boxShadow:'0 2px 10px rgba(42,33,52,.04)',
          }}>
            {/* Fargemarkering som i iOS Calendar */}
            <div style={{display:'flex'}}>
              <div style={{width:4, background:C.coral, flexShrink:0}}/>
              <div style={{flex:1, padding:'14px 16px'}}>
                <div style={{fontSize:15, fontWeight:700, color:C.fg, letterSpacing:'-0.01em', lineHeight:1.25}}>
                  Vinsmaking med Martine
                </div>
                <div style={{fontSize:12, color:C.fgDim, marginTop:4}}>
                  Speedfriending · Oslo
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div style={{padding:'4px 16px 14px', borderTop:`1px solid ${C.divider}`, marginLeft:4}}>
              {[
                {
                  icon: (<svg width="15" height="15" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke={C.fgDim} strokeWidth="1.3"/><path d="M8 4v4l3 2" stroke={C.fgDim} strokeWidth="1.3" strokeLinecap="round"/></svg>),
                  label:'Torsdag 18. april',
                  sub:'19:00 — 22:30',
                },
                {
                  icon: (<svg width="13" height="15" viewBox="0 0 14 16"><path d="M7 1C4.2 1 2 3.2 2 6c0 3.8 5 9 5 9s5-5.2 5-9c0-2.8-2.2-5-5-5z" fill="none" stroke={C.fgDim} strokeWidth="1.3"/><circle cx="7" cy="6" r="1.4" fill={C.fgDim}/></svg>),
                  label:'Søstrene Karlsen',
                  sub:'Grünerløkka · 4 min fra deg',
                },
                {
                  icon: (<svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 4h10v9H3z" fill="none" stroke={C.fgDim} strokeWidth="1.3"/><path d="M3 7h10" stroke={C.fgDim} strokeWidth="1.3"/></svg>),
                  label:'Beskrivelse',
                  sub:'Liten vinkveld med Martine som vert. 5 gjester. Billett: 350 kr.',
                  wrap:true,
                },
                {
                  icon: (<svg width="14" height="15" viewBox="0 0 15 16"><path d="M2 12a5.5 5.5 0 0111 0" fill="none" stroke={C.fgDim} strokeWidth="1.3" strokeLinecap="round"/><circle cx="7.5" cy="5.5" r="2.5" fill="none" stroke={C.fgDim} strokeWidth="1.3"/><path d="M10 13.5l1.5 1.5 2.5-3" stroke={C.coral} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>),
                  label:'Varsling',
                  sub:'2 timer før',
                },
              ].map((r, i, arr) => (
                <div key={i} style={{
                  display:'flex', alignItems:'flex-start', gap:10,
                  padding:'10px 0',
                  borderBottom: i < arr.length-1 ? `1px solid ${C.divider}` : 'none',
                }}>
                  <div style={{width:22, display:'flex', justifyContent:'center', paddingTop:2, flexShrink:0}}>
                    {r.icon}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:C.fg}}>{r.label}</div>
                    <div style={{fontSize:12, color:C.fgDim, marginTop:2, lineHeight: r.wrap ? 1.45 : 1.3}}>
                      {r.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Provider-valg */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:C.fgDim, marginBottom:10, padding:'0 2px'}}>
            Velg kalender
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {providers.map(p => {
              const sel = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  style={{
                    padding:'13px 16px', borderRadius:13,
                    border: sel ? `1.5px solid ${C.plum}` : `1px solid ${C.divider}`,
                    background: sel ? `${C.plum}0C` : C.card,
                    cursor:'pointer', fontFamily:'inherit', color:'inherit',
                    display:'flex', alignItems:'center', gap:12,
                    boxShadow:'0 1px 4px rgba(42,33,52,.03)',
                  }}
                >
                  <div style={{
                    width:38, height:38, borderRadius:10, flexShrink:0,
                    background:p.iconBg,
                    border: p.iconBg === '#FFFFFF' ? `1px solid ${C.divider}` : 'none',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {p.icon}
                  </div>
                  <div style={{flex:1, minWidth:0, textAlign:'left'}}>
                    <div style={{fontSize:13.5, fontWeight:700, color:C.fg}}>{p.name}</div>
                    <div style={{fontSize:11.5, color:C.fgDim, marginTop:1}}>{p.sub}</div>
                  </div>
                  <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={sel ? C.plum : C.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primær-knapp — kun aktiv når valgt */}
        <div style={{padding:'22px 24px 0'}}>
          <button
            disabled={!selected}
            style={{
              width:'100%', padding:'15px 20px', borderRadius:14, border:'none',
              background: selected ? C.coral : `${C.fgFaint}40`,
              color: selected ? '#fff' : C.fgFaint,
              fontSize:15, fontWeight:700,
              cursor: selected ? 'pointer' : 'not-allowed',
              fontFamily:'inherit',
              boxShadow: selected ? `0 8px 20px ${C.coral}40` : 'none',
              marginBottom:10,
            }}
          >
            Legg til i kalender
          </button>
          <button style={{
            width:'100%', padding:'13px 18px', borderRadius:14,
            border:'none', background:'transparent', color:C.fgDim,
            fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }}>
            Kanskje senere
          </button>
        </div>

        {/* Rolig avslutning */}
        <div style={{padding:'16px 28px 0', fontSize:11.5, color:C.fgFaint, lineHeight:1.5, textAlign:'center'}}>
          Ingen spam, ingen delt kalenderdata.<br/>
          Hendelsen ligger kun på din enhet.
        </div>
      </div>
    </div>
  );
}

// Eksport til window
window.H_ScreenRemoveBlock = H_ScreenRemoveBlock;
window.H_ScreenReport = H_ScreenReport;
window.H_ScreenPolaroidShare = H_ScreenPolaroidShare;
window.H_ScreenCalendarInvite = H_ScreenCalendarInvite;
