import { useState, useRef } from "react";

// ── Brand ─────────────────────────────────────────────────────
const N   = "#144A9A";
const ND  = "#0e3470";
const NM  = "#1a5bbf";
const P   = "#F8BA8D";
const PB  = "#FFF4EA";
const PD  = "#7a3500";
const BG  = "#F5F7FB";
const TX  = "#1a1a2e";
const MT  = "#777777";
const BD  = "#E0E7F3";
const F   = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ── Platform Logos ────────────────────────────────────────────
const FB  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>;
const IG  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig)"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="white"/></svg>;
const WA  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#25D366"/><path d="M17.5 6.5C16 5 14.1 4 12 4 7.6 4 4 7.6 4 12c0 1.4.4 2.8 1 4L4 20l4.1-1.1c1.1.6 2.4 1 3.9 1 4.4 0 8-3.6 8-8 0-2.1-.9-4.1-2.5-5.4z" fill="white"/></svg>;
const TW  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000"/><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/></svg>;
const TK  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.27 8.27 0 004.84 1.55V7.12a4.85 4.85 0 01-1.07-.43z" fill="white"/></svg>;
const EM  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/></svg>;
const SP  = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#144A9A"/><path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 11.5H8.5V9.5h2v4.5h3V9.5h2v6z" fill="white"/></svg>;
const WEB = ({s=12}) => <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#6366F1" strokeWidth="2"/><path d="M12 2a15 15 0 010 20M12 2a15 15 0 000 20M2 12h20" stroke="#6366F1" strokeWidth="1.5" fill="none"/></svg>;

const LOGOS = { Facebook: FB, Instagram: IG, WhatsApp: WA, "Twitter/X": TW, TikTok: TK, Email: EM, "SalaamPay App": SP, "Web Form": WEB };
const SRC   = { Facebook:{col:"#1877F2",bg:"#EEF3FF"}, Instagram:{col:"#C13584",bg:"#FDF0F8"}, WhatsApp:{col:"#25D366",bg:"#E8FDF1"}, "Twitter/X":{col:"#000",bg:"#F0F0F0"}, TikTok:{col:"#010101",bg:"#F0F0F0"}, Email:{col:"#EA4335",bg:"#FFF0EE"}, "SalaamPay App":{col:N,bg:"#EEF3FF"}, "Web Form":{col:"#6366F1",bg:"#F0EEFF"} };
const PRI   = { urgent:{l:"Urgent",col:"#EF4444",bg:"#FFF0F0"}, high:{l:"High",col:"#F59E0B",bg:"#FFFBEB"}, medium:{l:"Medium",col:"#3B82F6",bg:"#EFF6FF"}, normal:{l:"Normal",col:"#10B981",bg:"#ECFDF5"} };
const DC    = { "Social Media":{bg:"rgba(20,74,154,.1)",col:N}, "SalaamPay Support":{bg:"rgba(124,58,237,.1)",col:"#7C3AED"}, "Bank Accounts":{bg:"rgba(8,145,178,.1)",col:"#0891B2"} };

// ── Shared components ─────────────────────────────────────────
const av = (nm="",sz=38) => {
  const ini=(nm||"?").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  return <div style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(135deg,${NM},${N})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*0.34,fontWeight:700,flexShrink:0,fontFamily:F}}>{ini}</div>;
};
const Chip = ({label,bg,col,small})=><span style={{background:bg,color:col,fontSize:small?9:10,fontWeight:700,padding:"2px 8px",borderRadius:20,fontFamily:F,display:"inline-flex",alignItems:"center",gap:4}}>{label}</span>;
const SrcChip = ({src,small})=>{ const m=SRC[src]||{col:N,bg:"#EEF3FF"}; const Logo=LOGOS[src]; return <Chip label={<>{Logo&&<Logo s={small?9:11}/>} {src}</>} bg={m.bg} col={m.col} small={small}/> };
const PriChip = ({pri,small})=>{ const m=PRI[pri?.toLowerCase()]||PRI.normal; return <Chip label={m.l} bg={m.bg} col={m.col} small={small}/> };
const SlaTimer= ({text})=>text?<span style={{fontSize:9,fontWeight:700,color:"#EF4444",background:"rgba(239,68,68,.1)",padding:"1px 7px",borderRadius:20,fontFamily:F}}>{text}</span>:null;
const TagChip = ({name})=><span style={{background:`${N}18`,color:N,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20,fontFamily:F}}>{name}</span>;
const DeptChip= ({dept})=>{ const m=DC[dept]||{bg:"#f0f4fa",col:"#666"}; return <span style={{background:m.bg,color:m.col,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,fontFamily:F}}>{dept}</span> };
const Btn = ({children,onClick,v="primary",small,style:s={}})=>{
  const vs={primary:{background:N,color:"#fff",border:"none"},ghost:{background:"transparent",color:N,border:`1.5px solid ${N}`},peach:{background:PB,color:PD,border:"none"},secondary:{background:"#F0F4FA",color:"#555",border:"none"},danger:{background:"#FFF0F0",color:"#C62828",border:"none"},success:{background:"#ECFDF5",color:"#065F46",border:"none"}};
  return <button onClick={onClick} style={{...vs[v]||vs.primary,borderRadius:8,padding:small?"5px 11px":"8px 16px",fontSize:small?10:12,fontWeight:700,cursor:"pointer",fontFamily:F,...s}}>{children}</button>;
};

// ── Data ──────────────────────────────────────────────────────
const CONVOS = [
  {av:"AH",nm:"Amina Hassan",    src:"WhatsApp",      pri:"urgent",tag:"Reversal Request",              sla:"Reply: 12m overdue",preview:"Salam, my reversal request from yesterday...",breach:true, unread:3},
  {av:"YA",nm:"Yusuf Al-Rashid", src:"SalaamPay App", pri:"high",  tag:"E-Murabaha Disbursement Delay", sla:null,                preview:"Application submitted 3 weeks ago...",      breach:false,unread:0},
  {av:"FM",nm:"Fatima Malik",    src:"Facebook",      pri:"medium",tag:"Business Capital Financing",    sla:null,                preview:"I saw your post about business capital...",  breach:false,unread:0},
  {av:"IO",nm:"Ibrahim Osei",    src:"Instagram",     pri:"urgent",tag:"Account Locked",                sla:"Reply: 28m overdue",preview:"My account has been locked...",               breach:true, unread:1},
  {av:"ZI",nm:"Zainab Idris",    src:"Email",         pri:"normal",tag:"House Financing",               sla:null,                preview:"Re: house financing enquiry...",             breach:false,unread:0},
  {av:"OF",nm:"Omar Farouq",     src:"Twitter/X",     pri:"normal",tag:"General Enquiry",               sla:null,                preview:"As-salamu alaykum, I wanted to enquire...", breach:false,unread:0},
];
const MSGS = [
  {dir:"in",  body:"Salam! My reversal request from yesterday has not been processed. Reference TXN-2024-8841. Please assist urgently.", time:"10:02 AM",note:false},
  {dir:"note",body:"Internal note · Aisha: Escalated to finance team. Awaiting confirmation.",                                            time:"",        note:true},
  {dir:"out", body:"Wa alaykum as-salam! We have received your request and escalated it to our finance team. Update within 4 hours. JazakAllah Khayr.", time:"You · 10:15 AM", note:false},
  {dir:"in",  body:"JazakAllah. I am waiting. This is very urgent as I need the funds.",                                                 time:"10:32 AM",note:false},
];
const CONTACTS = [
  {av:"AH",nm:"Amina Hassan",    em:"amina@email.com",  src:"WhatsApp",      dept:"SalaamPay Support",status:"new",       acct:"SP-10024"},
  {av:"YA",nm:"Yusuf Al-Rashid", em:"yusuf@email.com",  src:"SalaamPay App", dept:"SalaamPay Support",status:"contacted", acct:"SP-10098"},
  {av:"FM",nm:"Fatima Malik",    em:"fatima@email.com", src:"Facebook",      dept:"Bank Accounts",    status:"qualified", acct:null},
  {av:"IO",nm:"Ibrahim Osei",    em:"ibrahim@email.com",src:"Instagram",     dept:"Social Media",     status:"new",       acct:null},
  {av:"ZI",nm:"Zainab Idris",    em:"zainab@email.com", src:"Email",         dept:"Bank Accounts",    status:"converted", acct:null},
];
const PIPE_COLS = [
  {key:"new",       label:"New",       col:N},
  {key:"contacted", label:"Contacted", col:"#F59E0B"},
  {key:"qualified", label:"Qualified", col:"#10B981"},
  {key:"converted", label:"Converted", col:"#6366F1"},
];
const TEAM_DATA = [
  {av:"AM",nm:"Aisha Mohamed",  em:"aisha@salaam.com",  role:"admin",chs:["Facebook","Instagram","WhatsApp","Twitter/X","TikTok","Email","SalaamPay App"],depts:["Social Media","SalaamPay Support"],active:true},
  {av:"HA",nm:"Hassan Abdi",    em:"hassan@salaam.com", role:"agent",chs:["SalaamPay App","WhatsApp"],                                                    depts:["SalaamPay Support"],               active:true},
  {av:"MW",nm:"Maryam Wanjiru", em:"maryam@salaam.com", role:"agent",chs:["Facebook","Instagram","TikTok"],                                               depts:["Social Media"],                    active:true},
  {av:"SO",nm:"Salim Omondi",   em:"salim@salaam.com",  role:"agent",chs:["Email","SalaamPay App"],                                                       depts:["Bank Accounts"],                   active:true},
  {av:"KN",nm:"Khadija Noor",   em:"khadija@salaam.com",role:"agent",chs:["Facebook","Email"],                                                            depts:["Bank Accounts"],                   active:false},
];
const AUDIT_DATA = [
  {av:"AM",nm:"Aisha Mohamed",  act:"Status changed",  bg:"#EFF6FF",tc:"#1D4ED8",detail:"Amina Hassan → contacted",           time:"10:32 AM"},
  {av:"HA",nm:"Hassan Abdi",    act:"Message sent",    bg:"#F5F3FF",tc:"#5B21B6",detail:"Yusuf Al-Rashid · SalaamPay",        time:"10:28 AM"},
  {av:"AM",nm:"Aisha Mohamed",  act:"Tag added",       bg:"#EEF3FF",tc:N,        detail:"Reversal Request → Amina Hassan",    time:"10:20 AM"},
  {av:"SY",nm:"System",         act:"SLA breached",    bg:"#FFF0F0",tc:"#C62828",detail:"Ibrahim Osei · response overdue",    time:"10:15 AM"},
  {av:"MW",nm:"Maryam Wanjiru", act:"Resolved",        bg:"#ECFDF5",tc:"#065F46",detail:"Omar Farouq · General Enquiry",      time:"10:09 AM"},
  {av:"SO",nm:"Salim Omondi",   act:"Note added",      bg:"#FFFBEB",tc:"#92400E",detail:"Fatima Malik · internal note",       time:"09:58 AM"},
  {av:"AM",nm:"Aisha Mohamed",  act:"Contact created", bg:"#ECFDF5",tc:"#065F46",detail:"New contact: Zainab Idris via Email",time:"09:44 AM"},
  {av:"HA",nm:"Hassan Abdi",    act:"Assigned",        bg:"#FFF4E6",tc:"#B45309",detail:"Amina Hassan → Hassan Abdi",         time:"09:30 AM"},
  {av:"MW",nm:"Maryam Wanjiru", act:"CSAT received",   bg:"#FFFBEB",tc:"#92400E",detail:"Omar Farouq · rated 5/5",            time:"09:20 AM"},
  {av:"SO",nm:"Salim Omondi",   act:"Status changed",  bg:"#EFF6FF",tc:"#1D4ED8",detail:"Zainab Idris → qualified",           time:"09:10 AM"},
];
const CH_STATS = [
  {nm:"Facebook",   pct:74,count:42,col:"#1877F2",Logo:FB},
  {nm:"Instagram",  pct:55,count:31,col:"#C13584",Logo:IG},
  {nm:"WhatsApp",   pct:48,count:27,col:"#25D366",Logo:WA},
  {nm:"SalaamPay",  pct:37,count:21,col:N,        Logo:SP},
  {nm:"Email",      pct:25,count:14,col:"#EA4335", Logo:EM},
  {nm:"Twitter/X",  pct:12,count:7, col:"#333",    Logo:TW},
];
const ALL_CHS = ["Facebook","Instagram","WhatsApp","Twitter/X","TikTok","Email","SalaamPay App"];

// ── NAV ───────────────────────────────────────────────────────
const NAV = [
  {k:"login",    l:"Login"},
  {k:"dashboard",l:"Dashboard"},
  {k:"inbox",    l:"Inbox",     badge:6},
  {k:"contacts", l:"Contacts"},
  {k:"pipeline", l:"Pipeline"},
  {k:"team",     l:"Team"},
  {k:"roles",    l:"Roles & Access"},
  {k:"reports",  l:"Reports"},
  {k:"audit",    l:"Audit Trail"},
];

// ══════════════════════════════════════════════════════════════
// PAGE COMPONENTS
// ══════════════════════════════════════════════════════════════

function LoginPage({onLogin}){
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${ND} 0%,${N} 60%,${NM} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F}}>
      <div style={{background:"#fff",borderRadius:20,padding:"44px 42px",width:400,boxShadow:"0 24px 80px rgba(0,0,0,.3)"}}>
        <div style={{textAlign:"center",marginBottom:30}}>
          <div style={{fontSize:30,fontWeight:900,color:N}}>Salaam</div>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:2.5,color:"#888",textTransform:"uppercase",marginTop:3}}>Microfinance Bank</div>
          <div style={{marginTop:8,display:"inline-block",background:`${P}30`,color:PD,fontSize:11,fontWeight:700,padding:"3px 14px",borderRadius:20}}>Social CRM</div>
        </div>
        <div style={{fontSize:20,fontWeight:800,color:TX,marginBottom:4}}>Welcome back</div>
        <div style={{fontSize:13,color:"#999",marginBottom:22}}>Sign in to your admin account</div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,fontWeight:700,color:"#444",display:"block",marginBottom:5}}>Email address</label>
          <input defaultValue="admin@salaam.com" style={{width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:13,fontFamily:F,boxSizing:"border-box"}}/>
        </div>
        <div style={{marginBottom:22}}>
          <label style={{fontSize:11,fontWeight:700,color:"#444",display:"block",marginBottom:5}}>Password</label>
          <input type="password" defaultValue="password" style={{width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:13,fontFamily:F,boxSizing:"border-box"}}/>
        </div>
        <Btn onClick={onLogin} style={{width:"100%",padding:13,fontSize:14}}>Sign In</Btn>
        <div style={{textAlign:"center",fontSize:11,color:"#ccc",marginTop:20}}>Contact your administrator if you need access.</div>
      </div>
    </div>
  );
}

function Dashboard(){
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{fontSize:20,fontWeight:800,color:N,marginBottom:14}}>Dashboard</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,minmax(0,1fr))",gap:10,marginBottom:14}}>
        {[
          {l:"Total Contacts",v:"142",d:"+12 this week",c:N},
          {l:"New Leads",     v:"38", d:"+5 today",     c:P},
          {l:"Qualified",     v:"27", d:null,           c:"#3B82F6"},
          {l:"Converted",     v:"24", d:"+3 this week", c:"#10B981"},
          {l:"Avg CSAT",      v:"4.2/5",d:null,         c:"#F59E0B"},
          {l:"SLA Breaches",  v:"2",  d:null,           c:"#EF4444",vc:"#EF4444"},
        ].map(s=>(
          <div key={s.l} style={{background:"#fff",borderRadius:11,padding:"12px 13px",borderTop:`3px solid ${s.c}`,boxShadow:"0 1px 5px rgba(0,0,0,.05)"}}>
            <div style={{fontSize:9,color:MT,fontWeight:500}}>{s.l}</div>
            <div style={{fontSize:20,fontWeight:800,color:s.vc||N,marginTop:3}}>{s.v}</div>
            {s.d&&<div style={{fontSize:9,color:"#22c55e",fontWeight:600,marginTop:2}}>{s.d}</div>}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>Leads by channel</div>
          {CH_STATS.map(b=>(
            <div key={b.nm} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:4,width:88,flexShrink:0,fontSize:10,color:TX}}><b.Logo s={11}/>{b.nm}</div>
              <div style={{flex:1,height:6,background:"#f0f4fa",borderRadius:6,overflow:"hidden"}}><div style={{width:`${b.pct}%`,height:"100%",background:b.col,borderRadius:6}}/></div>
              <span style={{fontSize:10,color:MT,width:22,textAlign:"right"}}>{b.count}</span>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>SLA breaches</div>
          {[{nm:"Amina Hassan",det:"WhatsApp · Unassigned",badge:"Reply 12m overdue"},{nm:"Ibrahim Osei",det:"Instagram · Unassigned",badge:"Reply 28m overdue"}].map(b=>(
            <div key={b.nm} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid #f0f4fa"}}>
              <div><div style={{fontSize:11,fontWeight:700}}>{b.nm}</div><div style={{fontSize:9,color:MT,marginTop:1}}>{b.det}</div></div>
              <span style={{fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20,background:"#fff0f0",color:"#ef4444"}}>{b.badge}</span>
            </div>
          ))}
          <div style={{marginTop:9,padding:"7px 10px",background:"#ecfdf5",borderRadius:6,fontSize:10,color:"#065f46",fontWeight:600}}>All other conversations within SLA targets</div>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
        <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>Agent performance</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
          <thead><tr>{["Agent","Total","Resolved","SLA met","Avg response","CSAT"].map(h=><th key={h} style={{textAlign:"left",color:MT,fontWeight:600,padding:"4px 10px",borderBottom:"1px solid #f0f4fa",fontSize:10}}>{h}</th>)}</tr></thead>
          <tbody>
            {[["Aisha Mohamed",28,24,22,"14m","4.6"],["Hassan Abdi",31,26,24,"19m","4.3"],["Maryam Wanjiru",24,19,17,"22m","4.1"],["Salim Omondi",18,14,12,"31m","3.8"]].map(r=>(
              <tr key={r[0]}><td style={{padding:"6px 10px",fontWeight:700}}>{r[0]}</td><td style={{padding:"6px 10px"}}>{r[1]}</td><td style={{padding:"6px 10px",color:"#10b981",fontWeight:700}}>{r[2]}</td><td style={{padding:"6px 10px"}}>{r[3]}</td><td style={{padding:"6px 10px"}}>{r[4]}</td><td style={{padding:"6px 10px",color:"#f59e0b",fontWeight:700}}>{r[5]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Inbox(){
  const [sel,setSel] = useState(CONVOS[0]);
  const [isNote,setIsNote] = useState(false);
  const [reply,setReply] = useState("");
  const [showTags,setShowTags] = useState(false);

  return (
    <div style={{display:"flex",height:"100%"}}>
      {/* Conversation list */}
      <div style={{width:262,borderRight:`1px solid ${BD}`,overflowY:"auto",background:"#fff",flexShrink:0}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #f0f4fa"}}>
          <input readOnly placeholder="Search conversations..." style={{width:"100%",padding:"6px 10px",borderRadius:8,border:`1px solid ${BD}`,fontSize:11,background:BG,fontFamily:F,boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:4,marginTop:6}}>
            {["Open","Resolved","Snoozed"].map((s,i)=><button key={s} style={{flex:1,padding:"4px 0",borderRadius:6,border:"none",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:F,background:i===0?N:"#f0f4fa",color:i===0?"#fff":"#888"}}>{s}</button>)}
          </div>
        </div>
        {CONVOS.map((c,i)=>(
          <div key={i} onClick={()=>setSel(c)} style={{display:"flex",gap:8,padding:"10px 12px",borderBottom:"1px solid #f0f4fa",cursor:"pointer",background:sel?.av===c.av?"#eef3ff":"#fff",borderLeft:`3px solid ${c.breach?"#ef4444":sel?.av===c.av?N:"transparent"}`}}>
            {av(c.nm,31)}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,fontWeight:700,color:TX,fontFamily:F}}>{c.nm}</span><span style={{fontSize:9,color:"#bbb"}}>2m ago</span></div>
              <div style={{display:"flex",gap:3,flexWrap:"wrap",marginTop:3}}><SrcChip src={c.src} small/><PriChip pri={c.pri} small/>{c.unread>0&&<span style={{background:N,color:"#fff",fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 6px",fontFamily:F}}>{c.unread}</span>}</div>
              {c.sla&&<div style={{marginTop:3}}><SlaTimer text={c.sla}/></div>}
              <div style={{fontSize:10,color:"#999",marginTop:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:F}}>{c.preview}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Thread */}
      {sel&&(
        <div style={{flex:1,display:"flex",flexDirection:"column",background:BG}}>
          <div style={{padding:"11px 16px",background:"#fff",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            {av(sel.nm,36)}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:800,color:N,fontFamily:F}}>{sel.nm}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
                <SrcChip src={sel.src}/><PriChip pri={sel.pri}/>
                <TagChip name={sel.tag}/>
                <SlaTimer text={sel.sla}/>
              </div>
            </div>
            <div style={{display:"flex",gap:5}}>
              <Btn v="ghost" small onClick={()=>setShowTags(!showTags)}>Tag</Btn>
              <select style={{padding:"4px 8px",borderRadius:7,border:`1.5px solid ${BD}`,fontSize:10,fontWeight:700,color:N,fontFamily:F}}><option>Urgent</option><option>High</option><option>Medium</option><option>Normal</option></select>
              <Btn v="success" small>Resolve</Btn>
              <Btn v="secondary" small>Assign</Btn>
            </div>
          </div>

          {showTags&&(
            <div style={{background:"#fff",borderBottom:`1px solid ${BD}`,padding:"9px 16px"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#888",marginBottom:7,fontFamily:F}}>ADD TAG</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {["Reversal Request","Pending Transaction","E-Murabaha Onboarding","Account Locked","Password Reset","House Financing","Fraud Report"].map(t=>(
                  <button key={t} onClick={()=>setShowTags(false)} style={{background:`${N}12`,color:N,border:`1px solid ${N}30`,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:F}}>{t}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{flex:1,overflowY:"auto",padding:"16px 18px",display:"flex",flexDirection:"column",gap:10}}>
            {MSGS.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.note?"center":m.dir==="out"?"flex-end":"flex-start"}}>
                {m.note?(
                  <div style={{background:"#fffbeb",border:"1px dashed #f59e0b",borderRadius:9,padding:"8px 13px",maxWidth:"78%",fontSize:10,color:"#92400e",fontFamily:F}}>{m.body}</div>
                ):(
                  <div style={{maxWidth:"64%",padding:"10px 14px",fontSize:12,lineHeight:1.55,fontFamily:F,background:m.dir==="out"?N:"#fff",color:m.dir==="out"?"#fff":TX,borderRadius:m.dir==="out"?"14px 4px 14px 14px":"4px 14px 14px 14px",boxShadow:"0 1px 4px rgba(0,0,0,.07)"}}>
                    {m.body}
                    <div style={{fontSize:9,opacity:.5,marginTop:5,textAlign:"right"}}>{m.time}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{padding:"10px 14px",background:"#fff",borderTop:`1px solid ${BD}`}}>
            <div style={{display:"flex",gap:5,marginBottom:7}}>
              {[{l:"Reply",v:false},{l:"Internal Note",v:true}].map(o=>(
                <button key={String(o.v)} onClick={()=>setIsNote(o.v)} style={{padding:"3px 10px",borderRadius:7,border:"none",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:F,background:isNote===o.v?(o.v?"#fffbeb":N):"#f0f4fa",color:isNote===o.v?(o.v?"#92400e":"#fff"):"#888"}}>{o.l}</button>
              ))}
              <button style={{marginLeft:"auto",padding:"3px 10px",borderRadius:7,border:"none",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:F,background:"#f0f4fa",color:"#888"}}>Quick Replies</button>
            </div>
            <div style={{display:"flex",gap:8}}>
              <textarea value={reply} onChange={e=>setReply(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();setReply("");}}} rows={2} placeholder={isNote?"Internal note — only visible to team...":"Type a reply... (Enter to send)"} style={{flex:1,padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F,background:isNote?"#fffbeb":BG,resize:"none"}}/>
              <button onClick={()=>setReply("")} style={{background:N,color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F,alignSelf:"flex-end"}}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Contacts(){
  const [contacts,setContacts] = useState(CONTACTS);
  const [search,setSearch] = useState("");
  const filtered = contacts.filter(c=>c.nm.toLowerCase().includes(search.toLowerCase())||c.em.toLowerCase().includes(search.toLowerCase()));
  const updateStatus = (i,v)=>setContacts(prev=>prev.map((c,j)=>j===i?{...c,status:v}:c));
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:20,fontWeight:800,color:N}}>Contacts <span style={{fontSize:13,color:"#aaa",fontWeight:400}}>({contacts.length})</span></div></div>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, phone, account..." style={{flex:1,minWidth:200,padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F}}/>
        <select style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F}}><option>All statuses</option>{["new","contacted","qualified","converted","closed"].map(s=><option key={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}</select>
        <select style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F}}><option>All channels</option>{ALL_CHS.map(c=><option key={c}>{c}</option>)}</select>
      </div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:N}}>{["Customer","Channel","Department","Status","SalaamPay","Last active","Actions"].map(h=><th key={h} style={{padding:"10px 13px",textAlign:"left",color:"#fff",fontSize:10,fontWeight:700,letterSpacing:.4}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((c,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f0f4fa",background:i%2===0?"#fff":"#fafbff"}}>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",alignItems:"center",gap:8}}>{av(c.nm,27)}<div><div style={{fontSize:12,fontWeight:700}}>{c.nm}</div><div style={{fontSize:10,color:MT}}>{c.em}</div></div></div></td>
                <td style={{padding:"10px 13px"}}><SrcChip src={c.src} small/></td>
                <td style={{padding:"10px 13px"}}><DeptChip dept={c.dept}/></td>
                <td style={{padding:"10px 13px"}}>
                  <select value={c.status} onChange={e=>updateStatus(i,e.target.value)} style={{border:"none",background:"transparent",fontFamily:F,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                    {["new","contacted","qualified","converted","closed"].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </td>
                <td style={{padding:"10px 13px",fontSize:10,color:"#6366F1",fontWeight:600}}>{c.acct||"—"}</td>
                <td style={{padding:"10px 13px",fontSize:10,color:MT}}>Today</td>
                <td style={{padding:"10px 13px"}}><Btn v="secondary" small>View</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pipeline(){
  const [contacts,setContacts] = useState(CONTACTS);
  const move=(nm,newKey)=>setContacts(prev=>prev.map(c=>c.nm===nm?{...c,status:newKey}:c));
  return (
    <div style={{padding:"20px 22px",overflowX:"auto",fontFamily:F}}>
      <div style={{fontSize:20,fontWeight:800,color:N,marginBottom:14}}>Pipeline board</div>
      <div style={{display:"flex",gap:11,minWidth:660}}>
        {PIPE_COLS.map(col=>{
          const cc=contacts.filter(c=>c.status===col.key);
          return (
            <div key={col.key} style={{flex:1}}>
              <div style={{background:col.col,color:"#fff",borderRadius:"9px 9px 0 0",padding:"8px 12px",fontSize:11,fontWeight:800,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {col.label}<span style={{background:"rgba(255,255,255,.25)",borderRadius:20,padding:"1px 8px",fontSize:10}}>{cc.length}</span>
              </div>
              <div style={{background:"#f0f4fa",borderRadius:"0 0 9px 9px",padding:7,display:"flex",flexDirection:"column",gap:6,minHeight:180}}>
                {cc.map((c,i)=>(
                  <div key={i} style={{background:"#fff",borderRadius:9,padding:"10px 11px",boxShadow:"0 1px 4px rgba(0,0,0,.06)",borderLeft:`3px solid ${col.col}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>{av(c.nm,24)}<span style={{fontSize:11,fontWeight:700,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.nm}</span></div>
                    <div style={{marginTop:5}}><SrcChip src={c.src} small/></div>
                    <div style={{marginTop:3}}><DeptChip dept={c.dept}/></div>
                    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginTop:7}}>
                      {PIPE_COLS.filter(cl=>cl.key!==col.key).map(cl=>(
                        <button key={cl.key} onClick={()=>move(c.nm,cl.key)} style={{border:`1px solid ${cl.col}`,background:"transparent",color:cl.col,borderRadius:5,padding:"2px 6px",fontSize:8,fontWeight:700,cursor:"pointer",fontFamily:F}}>{cl.label}</button>
                      ))}
                    </div>
                  </div>
                ))}
                {cc.length===0&&<div style={{textAlign:"center",color:"#ccc",fontSize:11,padding:"20px 0"}}>Empty</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Team(){
  const [members,setMembers] = useState(TEAM_DATA);
  const toggle=(nm)=>setMembers(prev=>prev.map(m=>m.nm===nm?{...m,active:!m.active}:m));
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:20,fontWeight:800,color:N}}>Team members</div><Btn>+ Add member</Btn></div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:N}}>{["Member","Role","Channels","Departments","Status","Actions"].map(h=><th key={h} style={{padding:"10px 13px",textAlign:"left",color:"#fff",fontSize:10,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {members.map((m,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f0f4fa",background:i%2===0?"#fff":"#fafbff"}}>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",alignItems:"center",gap:9}}>{av(m.nm,27)}<div><div style={{fontSize:12,fontWeight:700}}>{m.nm}</div><div style={{fontSize:10,color:MT}}>{m.em}</div></div></div></td>
                <td style={{padding:"10px 13px"}}><span style={{background:m.role==="admin"?"#eef3ff":"#f5f5f5",color:m.role==="admin"?N:"#555",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,textTransform:"capitalize"}}>{m.role}</span></td>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>{m.chs.map(ch=>{const L=LOGOS[ch];return L?<L key={ch} s={13}/>:null;})}</div></td>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{m.depts.map(d=><DeptChip key={d} dept={d}/>)}</div></td>
                <td style={{padding:"10px 13px"}}><span style={{background:m.active?"#e6f9f0":"#fff0f0",color:m.active?"#1a7a4a":"#c62828",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>{m.active?"Active":"Inactive"}</span></td>
                <td style={{padding:"10px 13px"}}><Btn v={m.active?"danger":"success"} small onClick={()=>toggle(m.nm)}>{m.active?"Deactivate":"Activate"}</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Roles(){
  const [editMember,setEditMember] = useState(null);
  const [selChs,setSelChs]   = useState(ALL_CHS);
  const [selDepts,setSelDepts] = useState(["Social Media","SalaamPay Support"]);
  const [selRole,setSelRole]   = useState("admin");
  const toggleCh = (c)=>setSelChs(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  const toggleDept=(d)=>setSelDepts(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{fontSize:20,fontWeight:800,color:N,marginBottom:14}}>Roles &amp; Access Control</div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden",marginBottom:14}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:N}}>{["Member","Role","Channels","Departments","Status","Actions"].map(h=><th key={h} style={{padding:"10px 13px",textAlign:"left",color:"#fff",fontSize:10,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {TEAM_DATA.map((m,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f0f4fa",background:i%2===0?"#fff":"#fafbff"}}>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",alignItems:"center",gap:9}}>{av(m.nm,27)}<div><div style={{fontSize:12,fontWeight:700}}>{m.nm}</div><div style={{fontSize:10,color:MT}}>{m.em}</div></div></div></td>
                <td style={{padding:"10px 13px"}}><span style={{background:m.role==="admin"?"#eef3ff":"#f5f5f5",color:m.role==="admin"?N:"#555",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,textTransform:"capitalize"}}>{m.role}</span></td>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>{m.chs.map(ch=>{const L=LOGOS[ch];return L?<L key={ch} s={13}/>:null;})}</div></td>
                <td style={{padding:"10px 13px"}}><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{m.depts.map(d=><DeptChip key={d} dept={d}/>)}</div></td>
                <td style={{padding:"10px 13px"}}><span style={{background:m.active?"#e6f9f0":"#fff0f0",color:m.active?"#1a7a4a":"#c62828",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>{m.active?"Active":"Inactive"}</span></td>
                <td style={{padding:"10px 13px"}}><Btn v="ghost" small onClick={()=>setEditMember(m.nm)}>Edit Access</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMember&&(
        <div style={{background:"#fff",borderRadius:12,padding:"18px 20px",boxShadow:"0 2px 12px rgba(0,0,0,.08)",borderTop:`4px solid ${P}`}}>
          <div style={{fontSize:14,fontWeight:800,color:N,marginBottom:14}}>Edit access — {editMember}</div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:8}}>Role</div>
            <div style={{display:"flex",gap:6}}>{["admin","agent","viewer"].map(r=><button key={r} onClick={()=>setSelRole(r)} style={{padding:"5px 14px",borderRadius:20,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:F,textTransform:"capitalize",background:selRole===r?N:"#f0f4fa",color:selRole===r?"#fff":"#888"}}>{r}</button>)}</div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:8}}>Channel access</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {ALL_CHS.map(c=>{const L=LOGOS[c];return(<button key={c} onClick={()=>toggleCh(c)} style={{padding:"5px 12px",borderRadius:20,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:F,display:"inline-flex",alignItems:"center",gap:4,background:selChs.includes(c)?N:"#f0f4fa",color:selChs.includes(c)?"#fff":"#888"}}>{L&&<L s={10}/>}{c}</button>);})}
            </div>
          </div>
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:8}}>Department access</div>
            <div style={{display:"flex",gap:6}}>
              {["Social Media","SalaamPay Support","Bank Accounts"].map(d=>{const m=DC[d]||{};return(<button key={d} onClick={()=>toggleDept(d)} style={{padding:"5px 14px",borderRadius:20,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:F,background:selDepts.includes(d)?m.col||N:"#f0f4fa",color:selDepts.includes(d)?"#fff":"#888"}}>{d}</button>);})}</div>
          </div>
          <div style={{display:"flex",gap:8}}><Btn onClick={()=>setEditMember(null)}>Save Changes</Btn><Btn v="secondary" onClick={()=>setEditMember(null)}>Cancel</Btn></div>
        </div>
      )}
    </div>
  );
}

function Reports(){
  const funnel=[{l:"New",v:38,c:N},{l:"Contacted",v:27,c:"#F59E0B"},{l:"Qualified",v:27,c:"#3B82F6"},{l:"Converted",v:24,c:"#10B981"}];
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{fontSize:20,fontWeight:800,color:N,marginBottom:14}}>Reports</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10,marginBottom:14}}>
        {[{l:"Total contacts",v:"142",c:N},{l:"Avg response time",v:"18m",c:"#6366F1"},{l:"Avg CSAT score",v:"4.2/5",c:"#F59E0B"},{l:"CSAT responses",v:"87",c:"#10B981"}].map(s=>(
          <div key={s.l} style={{background:"#fff",borderRadius:11,padding:"13px 14px",borderLeft:`4px solid ${s.c}`,boxShadow:"0 1px 5px rgba(0,0,0,.05)"}}><div style={{fontSize:10,color:MT,fontWeight:500}}>{s.l}</div><div style={{fontSize:22,fontWeight:800,color:N,marginTop:4}}>{s.v}</div></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>Pipeline funnel</div>
          {funnel.map(f=>{const p=Math.round((f.v/142)*100);return(
            <div key={f.l} style={{marginBottom:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,fontWeight:600}}>{f.l}</span><span style={{fontSize:11,color:MT}}>{f.v} ({p}%)</span></div>
              <div style={{height:8,background:"#f0f4fa",borderRadius:8,overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:f.c,borderRadius:8}}/></div>
            </div>
          );})}
        </div>
        <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>Channel breakdown</div>
          {CH_STATS.map(b=>(
            <div key={b.nm} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:4,width:88,flexShrink:0,fontSize:10,color:TX}}><b.Logo s={11}/>{b.nm}</div>
              <div style={{flex:1,height:6,background:"#f0f4fa",borderRadius:6,overflow:"hidden"}}><div style={{width:`${b.pct}%`,height:"100%",background:b.col,borderRadius:6}}/></div>
              <span style={{fontSize:10,color:MT,width:22,textAlign:"right"}}>{b.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
        <div style={{fontSize:12,fontWeight:800,color:N,marginBottom:12}}>Agent performance — last 30 days</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
          <thead><tr>{["Agent","Total","Resolved","SLA response","SLA resolution","Avg response","CSAT"].map(h=><th key={h} style={{textAlign:"left",color:MT,fontWeight:600,padding:"5px 10px",borderBottom:"1px solid #f0f4fa",fontSize:10}}>{h}</th>)}</tr></thead>
          <tbody>
            {[["Aisha Mohamed",28,24,22,21,"14m","4.6/5"],["Hassan Abdi",31,26,24,23,"19m","4.3/5"],["Maryam Wanjiru",24,19,17,16,"22m","4.1/5"],["Salim Omondi",18,14,12,11,"31m","3.8/5"]].map(r=>(
              <tr key={r[0]} style={{borderBottom:"1px solid #f8faff"}}><td style={{padding:"7px 10px",fontWeight:700}}>{r[0]}</td><td style={{padding:"7px 10px"}}>{r[1]}</td><td style={{padding:"7px 10px",color:"#10b981",fontWeight:700}}>{r[2]}</td><td style={{padding:"7px 10px"}}>{r[3]}</td><td style={{padding:"7px 10px"}}>{r[4]}</td><td style={{padding:"7px 10px"}}>{r[5]}</td><td style={{padding:"7px 10px",color:"#f59e0b",fontWeight:700}}>{r[6]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditTrail(){
  return (
    <div style={{padding:"20px 22px",overflowY:"auto",fontFamily:F}}>
      <div style={{fontSize:20,fontWeight:800,color:N,marginBottom:14}}>Audit Trail</div>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <input placeholder="Search by contact or team member..." style={{flex:1,minWidth:200,padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F}}/>
        <select style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${BD}`,fontSize:12,fontFamily:F}}><option>All actions</option><option>Status changed</option><option>Message sent</option><option>Tag added</option><option>SLA breached</option><option>Resolved</option><option>Assigned</option></select>
      </div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
        {AUDIT_DATA.map((a,i)=>(
          <div key={i} style={{display:"flex",gap:11,padding:"10px 14px",borderBottom:"1px solid #f0f4fa",alignItems:"flex-start",background:i%2===0?"#fff":"#fafbff"}}>
            {av(a.nm,30)}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                <span style={{fontSize:11,fontWeight:700}}>{a.nm}</span>
                <span style={{background:a.bg,color:a.tc,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{a.act}</span>
                <span style={{fontSize:10,color:MT}}>{a.detail}</span>
              </div>
            </div>
            <div style={{fontSize:9,color:MT,flexShrink:0}}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────
function Sidebar({active,setActive}){
  return (
    <div style={{width:208,background:`linear-gradient(180deg,${ND} 0%,${N} 100%)`,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"16px 16px 13px",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:F}}>Salaam</div>
        <div style={{fontSize:8,color:P,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginTop:2,fontFamily:F}}>Microfinance Bank</div>
        <div style={{fontSize:8,color:"rgba(255,255,255,.28)",marginTop:1,fontFamily:F}}>Social CRM v3 — Admin</div>
      </div>
      <div style={{margin:"7px 9px 0",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.5)",borderRadius:6,padding:"5px 9px",display:"flex",alignItems:"center",gap:6}}>
        <svg width="11" height="11" viewBox="0 0 16 16"><path d="M8 2L1 14h14L8 2z" stroke="#fca5a5" strokeWidth="1.5" fill="none"/><line x1="8" y1="7" x2="8" y2="10" stroke="#fca5a5" strokeWidth="1.5"/><circle cx="8" cy="12" r=".8" fill="#fca5a5"/></svg>
        <span style={{fontSize:10,color:"#fca5a5",fontWeight:700,fontFamily:F}}>2 SLA breaches</span>
      </div>
      <nav style={{flex:1,padding:"9px 7px"}}>
        {NAV.filter(n=>n.k!=="login").map(item=>{
          const on=active===item.k;
          return (
            <div key={item.k} onClick={()=>setActive(item.k)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",borderRadius:8,cursor:"pointer",marginBottom:2,background:on?"rgba(255,255,255,.15)":"transparent",borderLeft:`3px solid ${on?P:"transparent"}`,transition:"background .12s"}}>
              <span style={{fontSize:12,color:on?"#fff":"rgba(255,255,255,.6)",fontWeight:on?700:500,flex:1,fontFamily:F}}>{item.l}</span>
              {item.badge&&<span style={{background:P,color:PD,fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 6px",fontFamily:F}}>{item.badge}</span>}
            </div>
          );
        })}
      </nav>
      <div style={{padding:"11px 15px",borderTop:"1px solid rgba(255,255,255,.1)"}}>
        <div style={{fontSize:8,color:"rgba(255,255,255,.28)",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7,fontFamily:F}}>Channels</div>
        {[[FB,"Facebook"],[IG,"Instagram"],[WA,"WhatsApp"],[TW,"Twitter/X"],[SP,"SalaamPay"],[EM,"Email"]].map(([Logo,nm])=>(
          <div key={nm} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
            <Logo s={11}/><span style={{fontSize:10,color:"rgba(255,255,255,.5)",fontFamily:F}}>{nm}</span>
          </div>
        ))}
      </div>
      <div style={{padding:"11px 15px",borderTop:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} title="Sign out">
        {av("Salaam Admin",28)}
        <div><div style={{fontSize:11,color:"#fff",fontWeight:700,fontFamily:F}}>Salaam Admin</div><div style={{fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:F}}>Administrator</div></div>
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────
export default function SalaamCRM(){
  const [view,setView] = useState("login");

  const pages = { dashboard:<Dashboard/>, inbox:<Inbox/>, contacts:<Contacts/>, pipeline:<Pipeline/>, team:<Team/>, roles:<Roles/>, reports:<Reports/>, audit:<AuditTrail/> };

  if(view==="login"){
    return <LoginPage onLogin={()=>setView("dashboard")}/>;
  }

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:F,background:BG,overflow:"hidden"}}>
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#D0D8EE;border-radius:10px;}input,textarea,select,button{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;}input:focus,textarea:focus,select:focus{outline:none;}`}</style>
      <Sidebar active={view} setActive={setView}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:48,background:"#fff",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",padding:"0 22px",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontSize:13,fontWeight:800,color:N,fontFamily:F}}>Salaam Microfinance Bank — Social CRM</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{background:"rgba(239,68,68,.1)",color:"#ef4444",fontSize:11,fontWeight:800,padding:"3px 11px",borderRadius:20,fontFamily:F}}>2 SLA breaches</span>
            <span style={{fontSize:12,color:MT,fontFamily:F}}>Salaam Admin · Administrator</span>
          </div>
        </div>
        <div style={{flex:1,overflow:"hidden"}}>{pages[view]||<Dashboard/>}</div>
      </div>
    </div>
  );
}
