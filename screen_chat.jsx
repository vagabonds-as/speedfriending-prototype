/* global React, HC, H_StatusBarLight */
// Chat — tre skjermer: oversikt, en-til-en detalj, Frida (AI-guide)
// Tone: rolig, voksen, varm. Ingen "skriver..."-indikatorer, ingen påtrengende badges.

// --- Felles byggeklosser ---------------------------------------------------

function CaveatFontLoader() {
  // Frida bruker Caveat for håndskriftsfølelse. Lastes én gang.
  React.useEffect(() => {
    const id = 'caveat-font-link';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
}

function Avatar({ name, bg, size = 44, ring, fridaStyle }) {
  const initial = name ? name[0] : '?';
  if (fridaStyle) {
    return (
      <div style={{
        width: size, height: size, borderRadius: size/2,
        background: `linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 2px 10px ${HC.plum}40`,
        position: 'relative',
      }}>
        {/* liten stjerne-glimt for AI-natur */}
        <svg width={size*0.5} height={size*0.5} viewBox="0 0 20 20">
          <path d="M10 2l1.8 5.4L17 9l-5.2 1.6L10 16l-1.8-5.4L3 9l5.2-1.6z" fill="#FFF3E0" opacity="0.95"/>
          <circle cx="15.5" cy="4.5" r="1.2" fill="#FFF3E0" opacity="0.75"/>
          <circle cx="4" cy="15" r="0.9" fill="#FFF3E0" opacity="0.6"/>
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: bg || 'linear-gradient(135deg,#B890D4,#6A3F8A)',
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#FFF3E0', fontWeight:700, fontSize: size*0.34,
      boxShadow: ring ? `0 0 0 2px ${HC.bg}, 0 0 0 3px ${ring}` : 'none',
    }}>
      {initial}
    </div>
  );
}

function CrewAvatarStack({ avatars, size = 44 }) {
  // 3 små avatarer i en liten klynge
  return (
    <div style={{position:'relative', width:size, height:size}}>
      {avatars.slice(0,3).map((a, i) => {
        const s = size * 0.62;
        const positions = [
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: (size - s)/2 },
        ];
        return (
          <div key={i} style={{
            position:'absolute', width:s, height:s, borderRadius:s/2,
            background: a.bg, color:'#FFF3E0',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: s*0.4, fontWeight:700,
            boxShadow: `0 0 0 2px ${HC.card}`,
            ...positions[i],
          }}>
            {a.n[0]}
          </div>
        );
      })}
    </div>
  );
}

function UnreadDot({ size = 7 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:size/2,
      background: HC.coral,
      boxShadow: `0 0 0 3px ${HC.coral}22`,
    }}/>
  );
}

// --- Skjerm 1: Chat-oversikt ----------------------------------------------

function ScreenChatList({ onOpenChat, onOpenFrida }) {
  const frida = {
    id: 'frida',
    name: 'Frida',
    subtitle: 'Foreslo en vinkveld — vil du se?',
    time: '09:14',
    unread: true,
    frida: true,
  };

  const crews = [
    {
      id: 'crew-bymarka',
      title: 'Bymarka-tur 20. april',
      subtitle: 'Erik: Jeg tar med termos ☕',
      time: '11:42',
      members: [
        { n: 'Erik', bg: 'linear-gradient(135deg,#7895C4,#2E4A75)' },
        { n: 'Anja', bg: 'linear-gradient(135deg,#B890D4,#6A3F8A)' },
        { n: 'Mira', bg: 'linear-gradient(135deg,#E8B8A0,#B5694A)' },
      ],
      unread: true,
      count: 7,
    },
    {
      id: 'crew-bokklubb',
      title: 'Bokklubb Trondheim',
      subtitle: 'Sofia: Neste bok blir “Det usynlige barnet”',
      time: 'Tir',
      members: [
        { n: 'Sofia', bg: 'linear-gradient(135deg,#D4A85C,#8A5A3B)' },
        { n: 'Ola',   bg: 'linear-gradient(135deg,#7AA374,#3E6B3C)' },
        { n: 'Hanne', bg: 'linear-gradient(135deg,#C78BA6,#7A3E5A)' },
      ],
      count: 12,
    },
  ];

  const people = [
    {
      id: 'kari',
      name: 'Kari',
      subtitle: 'Godt å se deg i går. Takk for vinen 🍷',
      time: '22:08',
      bg: 'linear-gradient(135deg,#E8B8A0,#B5694A)',
      unread: true,
    },
    {
      id: 'erik',
      name: 'Erik',
      subtitle: 'Skulle vi ikke prøve det brettspilstedet?',
      time: 'I går',
      bg: 'linear-gradient(135deg,#7895C4,#2E4A75)',
    },
    {
      id: 'anja',
      name: 'Anja',
      subtitle: 'Du: Send meg tittelen når du husker den',
      time: 'Man',
      bg: 'linear-gradient(135deg,#B890D4,#6A3F8A)',
    },
    {
      id: 'mira',
      name: 'Mira',
      subtitle: 'Haha, den scenen glemmer jeg aldri',
      time: '12. apr',
      bg: 'linear-gradient(135deg,#C78BA6,#7A3E5A)',
    },
    {
      id: 'ola',
      name: 'Ola',
      subtitle: 'Du: Ja! Jazzklubben blir topp',
      time: '9. apr',
      bg: 'linear-gradient(135deg,#7AA374,#3E6B3C)',
    },
  ];

  const renderRow = (row, onClick) => (
    <button
      key={row.id}
      onClick={onClick}
      style={{
        display:'flex', alignItems:'center', gap:13,
        width:'100%', padding:'13px 22px', border:'none',
        background:'transparent', cursor:'pointer', textAlign:'left',
      }}
    >
      {row.frida ? (
        <Avatar fridaStyle name={row.name} size={46}/>
      ) : row.members ? (
        <CrewAvatarStack avatars={row.members} size={46}/>
      ) : (
        <Avatar name={row.name} bg={row.bg} size={46}/>
      )}

      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', alignItems:'baseline', gap:8}}>
          <span style={{
            fontWeight:700, color: HC.fg,
            fontFamily: row.frida ? "'Caveat', cursive" : 'inherit',
            fontSize: row.frida ? 20 : 14.5,
            lineHeight: row.frida ? 1 : 'inherit',
          }}>
            {row.frida ? row.name : (row.name || row.title)}
          </span>
          {row.count && (
            <span style={{fontSize:10.5, color:HC.fgFaint, fontWeight:500}}>
              · {row.count}
            </span>
          )}
          <span style={{marginLeft:'auto', fontSize:10.5, color: row.unread ? HC.coral : HC.fgFaint, fontWeight: row.unread ? 600 : 500}}>
            {row.time}
          </span>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:8, marginTop:3,
        }}>
          <span style={{
            flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            fontSize:12.5, color: row.unread ? HC.fg : HC.fgDim,
            fontWeight: row.unread ? 500 : 400,
            lineHeight:1.3,
          }}>
            {row.subtitle}
          </span>
          {row.unread && <UnreadDot/>}
        </div>
      </div>
    </button>
  );

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <CaveatFontLoader/>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:23"/>

        {/* Tittel */}
        <div style={{padding:'18px 22px 10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1 style={{margin:0, fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg}}>
            Samtaler
          </h1>
          <button style={{
            width:38, height:38, borderRadius:19, border:'none',
            background:HC.card, boxShadow:'0 1px 4px rgba(42,33,52,.06)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5.5" fill="none" stroke={HC.fgDim} strokeWidth="1.5"/>
              <path d="M11 11l3.2 3.2" stroke={HC.fgDim} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollbar liste */}
        <div style={{flex:1, overflowY:'auto', paddingBottom:12}}>

          {/* Frida alltid øverst, egen seksjon */}
          <div style={{padding:'4px 0 6px'}}>
            {renderRow(frida, () => onOpenFrida && onOpenFrida())}
          </div>

          <div style={{height:1, background:HC.divider, margin:'4px 22px 8px'}}/>

          {/* Crew-chats */}
          <div style={{padding:'2px 22px 6px'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Crew
            </div>
          </div>
          {crews.map(c => renderRow(c, () => onOpenChat && onOpenChat(c.id)))}

          <div style={{height:1, background:HC.divider, margin:'10px 22px 8px'}}/>

          {/* En-til-en */}
          <div style={{padding:'2px 22px 6px'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Kontakter
            </div>
          </div>
          {people.map(p => renderRow(p, () => onOpenChat && onOpenChat(p.id)))}

        </div>
      </div>
    </div>
  );
}

// --- Skjerm 2: Chat-detalj (en-til-en, Viktor + Kari) ---------------------

function MessageBubble({ from, text, time, showTime }) {
  const mine = from === 'me';
  return (
    <div style={{
      display:'flex', justifyContent: mine ? 'flex-end' : 'flex-start',
      padding:'2px 22px',
    }}>
      <div style={{maxWidth:'78%', display:'flex', flexDirection:'column', alignItems: mine ? 'flex-end' : 'flex-start'}}>
        <div style={{
          padding:'9px 14px',
          borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: mine ? HC.plum : HC.card,
          color: mine ? '#FFF3E0' : HC.fg,
          fontSize:14.5, lineHeight:1.42,
          boxShadow: mine ? 'none' : '0 1px 3px rgba(42,33,52,.05)',
          border: mine ? 'none' : `1px solid ${HC.divider}`,
        }}>
          {text}
        </div>
        {showTime && (
          <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:3, padding:'0 4px'}}>
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

function DayMarker({ label }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'16px 22px 10px'}}>
      <div style={{flex:1, height:1, background:HC.divider}}/>
      <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgFaint}}>
        {label}
      </div>
      <div style={{flex:1, height:1, background:HC.divider}}/>
    </div>
  );
}

function ScreenChatDetail({ onBack }) {
  // Viktor + Kari. Dagens samtale etter vinkvelden.
  const name = 'Kari';
  const avatarBg = 'linear-gradient(135deg,#E8B8A0,#B5694A)';

  const messages = [
    { day: 'I går', from: 'kari', text: 'Tusen takk for i kveld — vinen var bedre enn jeg trodde.', time: '22:08' },
    { day: 'I går', from: 'me',   text: 'Enig! Martine kan faget sitt.', time: '22:11' },
    { day: 'I går', from: 'kari', text: 'Skal vi teste Søstrene Karlsen igjen en gang? De har jazzkveld på torsdager.', time: '22:14' },
    { day: 'I dag', from: 'me',   text: 'Ja, gjerne. Neste torsdag?', time: '09:02' },
    { day: 'I dag', from: 'kari', text: 'Funker for meg. Jeg setter det i kalenderen.', time: '09:04', showTime: true },
    { day: 'I dag', from: 'kari', text: 'Og — jeg så at du var på brettspillkvelden sist. Hvordan var det?', time: '09:04' },
  ];

  // Grupper i dager
  const days = [];
  messages.forEach(m => {
    let d = days.find(x => x.day === m.day);
    if (!d) { d = { day: m.day, items: [] }; days.push(d); }
    d.items.push(m);
  });

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp-bar */}
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'10px 18px 12px',
          borderBottom:`1px solid ${HC.divider}`,
        }}>
          <button
            onClick={onBack}
            style={{background:'transparent', border:'none', cursor:'pointer', padding:6, marginLeft:-6}}
          >
            <svg width="11" height="18" viewBox="0 0 11 18">
              <path d="M9 2L2 9l7 7" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Avatar name={name} bg={avatarBg} size={38}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:15, fontWeight:700, color:HC.fg, lineHeight:1.1}}>{name}</div>
            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>På for 3 t siden</div>
          </div>
          <button style={{background:'transparent', border:'none', cursor:'pointer', padding:6}}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="9" cy="3.5" r="1.4" fill={HC.fgDim}/>
              <circle cx="9" cy="9" r="1.4" fill={HC.fgDim}/>
              <circle cx="9" cy="14.5" r="1.4" fill={HC.fgDim}/>
            </svg>
          </button>
        </div>

        {/* Scrollbar innhold */}
        <div style={{flex:1, overflowY:'auto', paddingBottom:8}}>

          {/* Felles kontekst-kort */}
          <div style={{padding:'14px 22px 0'}}>
            <div style={{
              background:HC.cream, borderRadius:14, padding:'12px 14px',
              border:`1px solid ${HC.divider}`,
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:34, height:34, borderRadius:17, background:`${HC.plum}14`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="5.5" cy="6" r="2.4" fill="none" stroke={HC.plum} strokeWidth="1.4"/>
                  <circle cx="10.5" cy="6" r="2.4" fill="none" stroke={HC.plum} strokeWidth="1.4"/>
                  <path d="M2 13c0-1.8 1.8-3 3.5-3M14 13c0-1.8-1.8-3-3.5-3" stroke={HC.plum} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plum}}>
                  Felles historie
                </div>
                <div style={{fontSize:12.5, color:HC.fg, marginTop:2, lineHeight:1.35}}>
                  Dere har møttes 3 ganger · sist i går på vinkvelden
                </div>
              </div>
            </div>
          </div>

          {/* Meldinger */}
          {days.map((d, di) => (
            <React.Fragment key={di}>
              <DayMarker label={d.day}/>
              {d.items.map((m, mi) => {
                const next = d.items[mi+1];
                const showTime = !next || next.from !== m.from || m.showTime;
                return (
                  <MessageBubble
                    key={mi}
                    from={m.from}
                    text={m.text}
                    time={m.time}
                    showTime={showTime}
                  />
                );
              })}
            </React.Fragment>
          ))}

          {/* "Lest"-markør nederst, mykt */}
          <div style={{display:'flex', justifyContent:'flex-end', padding:'6px 22px 0'}}>
            <span style={{fontSize:10.5, color:HC.fgFaint}}>Lest 09:06</span>
          </div>
        </div>

        {/* Input-felt */}
        <div style={{
          padding:'10px 16px 14px',
          borderTop:`1px solid ${HC.divider}`,
          background:'rgba(255,255,255,.65)',
          backdropFilter:'blur(10px)',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <div style={{
            flex:1,
            background:HC.card, borderRadius:22,
            padding:'10px 16px',
            border:`1px solid ${HC.divider}`,
            fontSize:13.5, color:HC.fgDim,
          }}>
            Skriv en melding
          </div>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:HC.plum, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 2px 8px ${HC.plum}40`,
          }}>
            <svg width="17" height="17" viewBox="0 0 17 17">
              <path d="M2 8.5L14.5 2.5 11 15l-2.5-5L2 8.5z" fill="#FFF3E0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Skjerm 3: Frida-chat (AI-guide) --------------------------------------

function FridaBubble({ text, time, showTime }) {
  return (
    <div style={{display:'flex', justifyContent:'flex-start', padding:'2px 22px'}}>
      <div style={{maxWidth:'82%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
        <div style={{
          padding:'12px 16px',
          borderRadius:'20px 20px 20px 6px',
          background:`linear-gradient(135deg, ${HC.cream} 0%, #F6E9E2 100%)`,
          color:HC.fg,
          fontFamily: "'Caveat', cursive",
          fontSize:20, lineHeight:1.28, fontWeight:500,
          border:`1px solid ${HC.lilac}33`,
          boxShadow:`0 1px 8px ${HC.plum}12`,
        }}>
          {text}
        </div>
        {showTime && (
          <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:3, padding:'0 4px', display:'flex', alignItems:'center', gap:5}}>
            <span style={{width:5, height:5, borderRadius:3, background:HC.lilac, display:'inline-block'}}/>
            Frida · {time}
          </div>
        )}
      </div>
    </div>
  );
}

function MyBubble({ text, time, showTime }) {
  return (
    <div style={{display:'flex', justifyContent:'flex-end', padding:'2px 22px'}}>
      <div style={{maxWidth:'78%', display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
        <div style={{
          padding:'9px 14px',
          borderRadius:'18px 18px 4px 18px',
          background:HC.plum, color:'#FFF3E0',
          fontSize:14.5, lineHeight:1.42,
        }}>
          {text}
        </div>
        {showTime && (
          <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:3, padding:'0 4px'}}>
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

function FridaEventCard({ title, when, place, summary }) {
  return (
    <div style={{padding:'4px 22px 2px', display:'flex', justifyContent:'flex-start'}}>
      <div style={{
        maxWidth:'86%',
        background:HC.card, borderRadius:16,
        border:`1px solid ${HC.divider}`,
        boxShadow:`0 2px 10px ${HC.plum}10`,
        overflow:'hidden',
      }}>
        <div style={{
          background:`linear-gradient(135deg, ${HC.coral} 0%, ${HC.plum} 100%)`,
          padding:'12px 14px', color:'#FFF3E0',
        }}>
          <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', opacity:.9}}>
            {when.toUpperCase()}
          </div>
          <div style={{fontSize:15.5, fontWeight:700, marginTop:3, letterSpacing:'-0.01em'}}>
            {title}
          </div>
          <div style={{fontSize:11.5, opacity:.9, marginTop:2}}>{place}</div>
        </div>
        <div style={{padding:'11px 14px'}}>
          <div style={{fontSize:12.5, color:HC.fgDim, lineHeight:1.4}}>
            {summary}
          </div>
          <div style={{display:'flex', gap:8, marginTop:10}}>
            <button style={{
              flex:1, padding:'8px 10px', borderRadius:20, border:'none',
              background:HC.plum, color:'#FFF3E0', fontSize:12.5, fontWeight:700, cursor:'pointer',
            }}>
              Meld meg på
            </button>
            <button style={{
              padding:'8px 14px', borderRadius:20, border:`1px solid ${HC.divider}`,
              background:'transparent', color:HC.fgDim, fontSize:12.5, fontWeight:600, cursor:'pointer',
            }}>
              Senere
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenFridaChat({ onBack }) {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <CaveatFontLoader/>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp-bar */}
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'10px 18px 12px',
          borderBottom:`1px solid ${HC.divider}`,
        }}>
          <button
            onClick={onBack}
            style={{background:'transparent', border:'none', cursor:'pointer', padding:6, marginLeft:-6}}
          >
            <svg width="11" height="18" viewBox="0 0 11 18">
              <path d="M9 2L2 9l7 7" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Avatar fridaStyle name="Frida" size={38}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{
              fontFamily:"'Caveat', cursive", fontSize:22, fontWeight:600,
              color:HC.fg, lineHeight:1,
            }}>
              Frida
            </div>
            <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>
              Din guide hos Speedfriending
            </div>
          </div>
        </div>

        {/* Samtale */}
        <div style={{flex:1, overflowY:'auto', paddingBottom:8, paddingTop:14}}>

          <DayMarker label="I dag"/>

          <FridaBubble
            text="God morgen, Viktor. Jeg så at du hadde det fint i går — Kari skrev noe hyggelig."
            time="09:12"
          />
          <FridaBubble
            text="Det er noe jeg vil foreslå, hvis du er åpen for det."
            time="09:12"
            showTime
          />

          <div style={{height:8}}/>

          <FridaEventCard
            title="Vinkveld med Martine"
            when="Torsdag 19:00 · Søstrene Karlsen"
            place="4 min fra deg"
            summary="Kari har allerede sagt at hun kommer. Det passer godt siden dere snakket om å møtes igjen. 4 andre kommer også — to du har møtt før."
          />

          <FridaBubble
            text="Jeg foreslår ikke alltid — bare når det ser ut til å passe for deg."
            time="09:14"
            showTime
          />

          <div style={{height:6}}/>

          <MyBubble
            text="Det passer bra. Melder meg på."
            time="09:20"
            showTime
          />

          <FridaBubble
            text="Fint! En ting til — Erik har ikke vært på noe på to uker. Kanskje send ham en melding?"
            time="09:21"
            showTime
          />
        </div>

        {/* Input */}
        <div style={{
          padding:'10px 16px 14px',
          borderTop:`1px solid ${HC.divider}`,
          background:'rgba(255,255,255,.65)',
          backdropFilter:'blur(10px)',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <div style={{
            flex:1,
            background:HC.card, borderRadius:22,
            padding:'10px 16px',
            border:`1px solid ${HC.divider}`,
            fontSize:13.5, color:HC.fgDim,
          }}>
            Snakk med Frida
          </div>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none',
            background:`linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`,
            cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 2px 8px ${HC.plum}40`,
          }}>
            <svg width="17" height="17" viewBox="0 0 17 17">
              <path d="M2 8.5L14.5 2.5 11 15l-2.5-5L2 8.5z" fill="#FFF3E0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Wrapper som navigerer mellom de tre skjermene ------------------------

function ScreenChat() {
  const [view, setView] = React.useState('list'); // 'list' | 'detail' | 'frida'

  if (view === 'detail') {
    return <ScreenChatDetail onBack={() => setView('list')}/>;
  }
  if (view === 'frida') {
    return <ScreenFridaChat onBack={() => setView('list')}/>;
  }
  return (
    <ScreenChatList
      onOpenChat={() => setView('detail')}
      onOpenFrida={() => setView('frida')}
    />
  );
}

// Eksporter alle tre + wrapperen
Object.assign(window, {
  H_ScreenChatList: ScreenChatList,
  H_ScreenChatDetail: ScreenChatDetail,
  H_ScreenFridaChat: ScreenFridaChat,
  H_ScreenChat: ScreenChat,
});
