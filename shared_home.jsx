/* global React */
// Session: Hjem (ny) — navigasjonsskall + hjemskjerm

const HC = {
  bg: '#F4EDE7', bgSoft: '#EFE4D8',
  card: '#FFFFFF', cream: '#FAF5EF',
  fg: '#2A2134', fgDim: 'rgba(42,33,52,.66)', fgFaint: 'rgba(42,33,52,.38)',
  divider: 'rgba(42,33,52,.08)',
  coral: '#F0826B', coralSoft: '#FAB29D', coralDeep: '#C45A44',
  lilac: '#B788C9', plum: '#7F4D95', plumDeep: '#5E3071',
  green: '#3E8F65', amber: '#D9A24A',
};

function H_StatusBarLight({ time = '14:23' }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 26px 0', fontFamily:'-apple-system,system-ui', color:HC.fg, fontSize:15.5, fontWeight:600}}>
      <span>{time}</span>
      <span style={{display:'inline-flex', gap:6, alignItems:'center'}}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".6" fill={HC.fg}/><rect x="4.5" y="5" width="3" height="6" rx=".6" fill={HC.fg}/><rect x="9" y="2.5" width="3" height="8.5" rx=".6" fill={HC.fg}/><rect x="13.5" y="0" width="3" height="11" rx=".6" fill={HC.fg}/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="2.5" fill="none" stroke={HC.fg} strokeOpacity=".5"/><rect x="2" y="2" width="17" height="7" rx="1.4" fill={HC.fg}/></svg>
      </span>
    </div>
  );
}

function H_Phone({ children, bg, activeTab, onTabChange }) {
  // Hvis activeTab === undefined: Vi rendrer uten tab-bar. Dette brukes for
  // web-skjermer (speedfriending.no-prototyper) og andre skjermer som simulerer
  // mobilbrowser heller enn app. Skjermer som trenger app-tab-bar må sende
  // en gyldig activeTab (f.eks. 'home').
  const showTabBar = activeTab !== undefined;
  return (
    <div style={{
      width:402, height:874, borderRadius:52, overflow:'hidden', position:'relative',
      background: bg || HC.bg,
      boxShadow:'0 0 0 12px #0F0812, 0 0 0 13px rgba(255,255,255,.06), 0 60px 120px rgba(0,0,0,.5), 0 20px 40px rgba(0,0,0,.3)',
    }}>
      {/* Dynamic Island */}
      <div style={{position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:124, height:36, borderRadius:22, background:'#000', zIndex:50}}/>

      {/* Innhold */}
      <div style={{position:'absolute', inset:0, paddingBottom: showTabBar ? 84 : 0}}>
        {children}
      </div>

      {/* Tab-bar i bunn — kun hvis activeTab er definert */}
      {showTabBar && <H_TabBar active={activeTab} onChange={onTabChange}/>}

      {/* Home indicator */}
      <div style={{position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:138, height:5, borderRadius:3, background:'rgba(0,0,0,.25)', zIndex:60}}/>
    </div>
  );
}

function H_TabBar({ active, onChange }) {
  const tabs = [
    { id:'home',   label:'Hjem',    icon: HomeIcon },
    { id:'events', label:'Events',  icon: EventsIcon },
    { id:'crew',   label:'Crew',    icon: CrewIcon },
    { id:'chat',   label:'Chat',    icon: ChatIcon },
    { id:'you',    label:'Deg',     icon: YouIcon },
  ];

  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, height:84,
      background:'rgba(255,255,255,.92)', backdropFilter:'blur(20px)',
      borderTop:`1px solid ${HC.divider}`,
      display:'flex', alignItems:'flex-start', justifyContent:'space-around',
      padding:'12px 8px 0',
      zIndex:40,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              border:'none', background:'transparent', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'4px 8px', minWidth:54,
            }}
          >
            <Icon active={isActive} color={isActive ? HC.plum : HC.fgFaint}/>
            <span style={{
              fontSize:10.5, fontWeight: isActive ? 700 : 500,
              color: isActive ? HC.plum : HC.fgFaint,
              letterSpacing:'.02em',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// --- Ikoner (inline SVG, skiftbar mellom outline/filled) ---
function HomeIcon({ active, color }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 26 26"><path d="M13 3L3 11v12h7v-7h6v7h7V11z" fill={color}/></svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26"><path d="M13 3L3 11v12h7v-7h6v7h7V11z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>
  );
}
function EventsIcon({ active, color }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 26 26"><rect x="4" y="6" width="18" height="16" rx="2" fill={color}/><rect x="8" y="3" width="2" height="5" rx="1" fill={color}/><rect x="16" y="3" width="2" height="5" rx="1" fill={color}/></svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26"><rect x="4" y="6" width="18" height="16" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M4 11h18" stroke={color} strokeWidth="1.8"/><path d="M9 3v5M17 3v5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>
  );
}
function CrewIcon({ active, color }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="9" cy="10" r="3.5" fill={color}/><circle cx="17" cy="10" r="3.5" fill={color}/><path d="M3 21c0-3 3-5 6-5s6 2 6 5M11 21c0-3 3-5 6-5s6 2 6 5" fill={color}/></svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="9" cy="10" r="3.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="17" cy="10" r="3.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M3 21c0-3 3-5 6-5M23 21c0-3-3-5-6-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>
  );
}
function ChatIcon({ active, color }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 26 26"><path d="M3 6a3 3 0 013-3h14a3 3 0 013 3v10a3 3 0 01-3 3h-7l-4 4v-4H6a3 3 0 01-3-3V6z" fill={color}/></svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26"><path d="M3 6a3 3 0 013-3h14a3 3 0 013 3v10a3 3 0 01-3 3h-7l-4 4v-4H6a3 3 0 01-3-3V6z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>
  );
}
function YouIcon({ active, color }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="9" r="4.5" fill={color}/><path d="M4 22c0-4.5 4-7.5 9-7.5s9 3 9 7.5" fill={color}/></svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="9" r="4.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M4 22c0-4.5 4-7.5 9-7.5s9 3 9 7.5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>
  );
}

Object.assign(window, { HC, H_StatusBarLight, H_Phone, H_TabBar });
