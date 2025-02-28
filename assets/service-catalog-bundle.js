import{s as e,G as n,j as t,a8 as s,a9 as r,aa as a,ab as o,ac as i,u as l,ad as c,ae as u,Z as d,r as h,c as j,af as f,a2 as m,a3 as b,a4 as p,a5 as k,a6 as g,ag as v,ah as x,ai as w,aj as y,a0 as $}from"shared";import{g as _,a as q}from"ticket-fields";const z=e.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  color: ${(props) => getColorV8("grey", 800, props.theme)};

  &:hover {
    text-decoration: none;
    border: ${(props) => props.theme.borders.sm};
    border-color: ${(props) => getColorV8("blue", 600, props.theme)};
  }

  &:visited {
    text-decoration: none;
    color: ${(props) => getColorV8("grey", 800, props.theme)};
  }
`,S=e.div`
  font-size: ${e=>e.theme.fontSizes.md};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`,C=e.div`
  font-size: ${e=>e.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`,E=e.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${e=>e.theme.space.xxs};
`,I=e.div`
  color: ${e=>n("grey",600,e.theme)};
  background-color: ${e=>n("grey",100,e.theme)};
  margin-bottom: ${e=>e.theme.space.sm};
  width: ${e=>e.theme.space.xl};
  height: ${e=>e.theme.space.xl};
  text-align: center;
  align-content: center;
`,P=({serviceItem:e})=>t.jsxs(z,{href:`/hc/en-us/services/${e.id}`,children:[t.jsx(I,{children:t.jsx(s,{})}),t.jsxs(E,{children:[t.jsx(S,{children:e.name}),t.jsx(C,{children:e.description})]})]}),F=e(r)`
  padding: 0;
`,M=e(a)`
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`,L=()=>t.jsx(M,{xs:12,sm:6,md:4,lg:3,children:t.jsx(i,{width:"100%",height:"140px"})}),R=()=>t.jsx(F,{children:t.jsxs(o,{wrap:"wrap",children:[t.jsx(L,{}),t.jsx(L,{}),t.jsx(L,{}),t.jsx(L,{})]})}),A=e.div`
  padding: ${e=>e.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,T=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${e=>e.theme.space.xxs};
`,G=({helpCenterPath:e})=>{const{t:n}=l();return t.jsxs(A,{children:[t.jsxs(T,{children:[t.jsx(c,{children:n("service-catalog.empty-state.no-services","No services in sight")}),t.jsx(u,{children:n("service-catalog.empty-state.description","Once services are added to catalog, you'll find them here.")})]}),t.jsx(d,{isPrimary:!0,onClick:()=>{window.location.href=e},children:n("service-catalog.empty-state.go-to-homepage","Go to the homepage")})]})},O=e(a)`
  margin-bottom: ${e=>e.theme.space.md};
`,U=e.div`
  padding-top: ${e=>e.theme.space.sm};
`,B=e(r)`
  padding: 0;
`,N=16;function W({helpCenterPath:e}){const[n,s]=h.useState([]),[r,a]=h.useState(null),[i,c]=h.useState(null),[u,d]=h.useState(!1),[m,b]=h.useState(null),p=j(),{t:k}=l();if(m)throw m;h.useEffect((()=>{!async function(){d(!0);try{const e=await fetch(i?`/api/v2/help_center/service_catalog/items?page[size]=${N}&${i}`:`/api/v2/help_center/service_catalog/items?page[size]=${N}`),n=await e.json();if(e.ok&&(a(n.meta),s(n.service_catalog_items),d(!1)),!e.ok)throw d(!1),new Error(`HTTP error! status: ${e.status}`)}catch(e){d(!1),p({title:k("service-catalog.service-list-error-title","Services couldn't be loaded"),message:k("service-catalog.service-list-error-message","Give it a moment and try it again"),type:"error"}),b(e)}}()}),[i,p,k]);return t.jsx(U,{children:u?t.jsx(R,{}):t.jsxs(t.Fragment,{children:[t.jsx(B,{children:t.jsx(o,{wrap:"wrap",children:0!==n.length&&n.map((e=>t.jsx(O,{xs:12,sm:6,md:4,lg:3,children:t.jsx(P,{serviceItem:e},e.id)},e.id)))})}),0===n.length&&t.jsx(G,{helpCenterPath:e}),n.length>0&&t.jsxs(f,{children:[t.jsx(f.Previous,{onClick:()=>{r&&r.before_cursor&&c(`page[before]=${r?.before_cursor}`)},disabled:!i||i?.startsWith("page[before]")&&!r?.has_more,children:k("service-catalog.pagination.previous","Previous")}),t.jsx(f.Next,{onClick:()=>{r&&r.after_cursor&&c(`page[after]=${r.after_cursor}`)},disabled:i?.startsWith("page[after]")&&!r?.has_more||null==i&&!r?.has_more,children:k("service-catalog.pagination.next","Next")})]})]})})}async function H(e,n,s,r){m(r),await b(r,[()=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aw}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${r}.json`),()=>function(e){switch(e){case"../ticket-fields/translations/locales/af.json":return import("ticket-fields").then((function(e){return e.b}));case"../ticket-fields/translations/locales/ar-x-pseudo.json":return import("ticket-fields").then((function(e){return e.c}));case"../ticket-fields/translations/locales/ar.json":return import("ticket-fields").then((function(e){return e.d}));case"../ticket-fields/translations/locales/az.json":return import("ticket-fields").then((function(e){return e.e}));case"../ticket-fields/translations/locales/be.json":return import("ticket-fields").then((function(e){return e.f}));case"../ticket-fields/translations/locales/bg.json":return import("ticket-fields").then((function(e){return e.h}));case"../ticket-fields/translations/locales/bn.json":return import("ticket-fields").then((function(e){return e.i}));case"../ticket-fields/translations/locales/bs.json":return import("ticket-fields").then((function(e){return e.j}));case"../ticket-fields/translations/locales/ca.json":return import("ticket-fields").then((function(e){return e.k}));case"../ticket-fields/translations/locales/cs.json":return import("ticket-fields").then((function(e){return e.l}));case"../ticket-fields/translations/locales/cy.json":return import("ticket-fields").then((function(e){return e.m}));case"../ticket-fields/translations/locales/da.json":return import("ticket-fields").then((function(e){return e.n}));case"../ticket-fields/translations/locales/de-de.json":return import("ticket-fields").then((function(e){return e.o}));case"../ticket-fields/translations/locales/de-x-informal.json":return import("ticket-fields").then((function(e){return e.p}));case"../ticket-fields/translations/locales/de.json":return import("ticket-fields").then((function(e){return e.q}));case"../ticket-fields/translations/locales/el.json":return import("ticket-fields").then((function(e){return e.r}));case"../ticket-fields/translations/locales/en-001.json":return import("ticket-fields").then((function(e){return e.s}));case"../ticket-fields/translations/locales/en-150.json":return import("ticket-fields").then((function(e){return e.t}));case"../ticket-fields/translations/locales/en-au.json":return import("ticket-fields").then((function(e){return e.u}));case"../ticket-fields/translations/locales/en-ca.json":return import("ticket-fields").then((function(e){return e.v}));case"../ticket-fields/translations/locales/en-gb.json":return import("ticket-fields").then((function(e){return e.w}));case"../ticket-fields/translations/locales/en-my.json":return import("ticket-fields").then((function(e){return e.x}));case"../ticket-fields/translations/locales/en-ph.json":return import("ticket-fields").then((function(e){return e.y}));case"../ticket-fields/translations/locales/en-se.json":return import("ticket-fields").then((function(e){return e.z}));case"../ticket-fields/translations/locales/en-us.json":return import("ticket-fields").then((function(e){return e.A}));case"../ticket-fields/translations/locales/en-x-dev.json":return import("ticket-fields").then((function(e){return e.B}));case"../ticket-fields/translations/locales/en-x-keys.json":return import("ticket-fields").then((function(e){return e.C}));case"../ticket-fields/translations/locales/en-x-obsolete.json":return import("ticket-fields").then((function(e){return e.E}));case"../ticket-fields/translations/locales/en-x-pseudo.json":return import("ticket-fields").then((function(e){return e.F}));case"../ticket-fields/translations/locales/en-x-test.json":return import("ticket-fields").then((function(e){return e.G}));case"../ticket-fields/translations/locales/es-419.json":return import("ticket-fields").then((function(e){return e.H}));case"../ticket-fields/translations/locales/es-es.json":return import("ticket-fields").then((function(e){return e.J}));case"../ticket-fields/translations/locales/es.json":return import("ticket-fields").then((function(e){return e.K}));case"../ticket-fields/translations/locales/et.json":return import("ticket-fields").then((function(e){return e.L}));case"../ticket-fields/translations/locales/eu.json":return import("ticket-fields").then((function(e){return e.M}));case"../ticket-fields/translations/locales/fa-af.json":return import("ticket-fields").then((function(e){return e.N}));case"../ticket-fields/translations/locales/fa.json":return import("ticket-fields").then((function(e){return e.O}));case"../ticket-fields/translations/locales/fi.json":return import("ticket-fields").then((function(e){return e.P}));case"../ticket-fields/translations/locales/fil.json":return import("ticket-fields").then((function(e){return e.Q}));case"../ticket-fields/translations/locales/fo.json":return import("ticket-fields").then((function(e){return e.R}));case"../ticket-fields/translations/locales/fr-ca.json":return import("ticket-fields").then((function(e){return e.S}));case"../ticket-fields/translations/locales/fr.json":return import("ticket-fields").then((function(e){return e.U}));case"../ticket-fields/translations/locales/ga.json":return import("ticket-fields").then((function(e){return e.V}));case"../ticket-fields/translations/locales/he.json":return import("ticket-fields").then((function(e){return e.W}));case"../ticket-fields/translations/locales/hi.json":return import("ticket-fields").then((function(e){return e.X}));case"../ticket-fields/translations/locales/hr.json":return import("ticket-fields").then((function(e){return e.Y}));case"../ticket-fields/translations/locales/hu.json":return import("ticket-fields").then((function(e){return e.Z}));case"../ticket-fields/translations/locales/hy.json":return import("ticket-fields").then((function(e){return e._}));case"../ticket-fields/translations/locales/id.json":return import("ticket-fields").then((function(e){return e.$}));case"../ticket-fields/translations/locales/is.json":return import("ticket-fields").then((function(e){return e.a0}));case"../ticket-fields/translations/locales/it-ch.json":return import("ticket-fields").then((function(e){return e.a1}));case"../ticket-fields/translations/locales/it.json":return import("ticket-fields").then((function(e){return e.a2}));case"../ticket-fields/translations/locales/ja.json":return import("ticket-fields").then((function(e){return e.a3}));case"../ticket-fields/translations/locales/ka.json":return import("ticket-fields").then((function(e){return e.a4}));case"../ticket-fields/translations/locales/kk.json":return import("ticket-fields").then((function(e){return e.a5}));case"../ticket-fields/translations/locales/kl-dk.json":return import("ticket-fields").then((function(e){return e.a6}));case"../ticket-fields/translations/locales/ko.json":return import("ticket-fields").then((function(e){return e.a7}));case"../ticket-fields/translations/locales/ku.json":return import("ticket-fields").then((function(e){return e.a8}));case"../ticket-fields/translations/locales/lt.json":return import("ticket-fields").then((function(e){return e.a9}));case"../ticket-fields/translations/locales/lv.json":return import("ticket-fields").then((function(e){return e.aa}));case"../ticket-fields/translations/locales/mk.json":return import("ticket-fields").then((function(e){return e.ab}));case"../ticket-fields/translations/locales/mn.json":return import("ticket-fields").then((function(e){return e.ac}));case"../ticket-fields/translations/locales/ms.json":return import("ticket-fields").then((function(e){return e.ad}));case"../ticket-fields/translations/locales/mt.json":return import("ticket-fields").then((function(e){return e.ae}));case"../ticket-fields/translations/locales/my.json":return import("ticket-fields").then((function(e){return e.af}));case"../ticket-fields/translations/locales/nl-be.json":return import("ticket-fields").then((function(e){return e.ag}));case"../ticket-fields/translations/locales/nl.json":return import("ticket-fields").then((function(e){return e.ah}));case"../ticket-fields/translations/locales/no.json":return import("ticket-fields").then((function(e){return e.ai}));case"../ticket-fields/translations/locales/pl.json":return import("ticket-fields").then((function(e){return e.aj}));case"../ticket-fields/translations/locales/pt-br.json":return import("ticket-fields").then((function(e){return e.ak}));case"../ticket-fields/translations/locales/pt.json":return import("ticket-fields").then((function(e){return e.al}));case"../ticket-fields/translations/locales/ro.json":return import("ticket-fields").then((function(e){return e.am}));case"../ticket-fields/translations/locales/ru.json":return import("ticket-fields").then((function(e){return e.an}));case"../ticket-fields/translations/locales/sk.json":return import("ticket-fields").then((function(e){return e.ao}));case"../ticket-fields/translations/locales/sl.json":return import("ticket-fields").then((function(e){return e.ap}));case"../ticket-fields/translations/locales/sq.json":return import("ticket-fields").then((function(e){return e.aq}));case"../ticket-fields/translations/locales/sr-me.json":return import("ticket-fields").then((function(e){return e.ar}));case"../ticket-fields/translations/locales/sr.json":return import("ticket-fields").then((function(e){return e.as}));case"../ticket-fields/translations/locales/sv.json":return import("ticket-fields").then((function(e){return e.at}));case"../ticket-fields/translations/locales/th.json":return import("ticket-fields").then((function(e){return e.au}));case"../ticket-fields/translations/locales/tr.json":return import("ticket-fields").then((function(e){return e.av}));case"../ticket-fields/translations/locales/uk.json":return import("ticket-fields").then((function(e){return e.aw}));case"../ticket-fields/translations/locales/ur.json":return import("ticket-fields").then((function(e){return e.ax}));case"../ticket-fields/translations/locales/uz.json":return import("ticket-fields").then((function(e){return e.ay}));case"../ticket-fields/translations/locales/vi.json":return import("ticket-fields").then((function(e){return e.az}));case"../ticket-fields/translations/locales/zh-cn.json":return import("ticket-fields").then((function(e){return e.aA}));case"../ticket-fields/translations/locales/zh-tw.json":return import("ticket-fields").then((function(e){return e.aB}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../ticket-fields/translations/locales/${r}.json`),()=>function(e){switch(e){case"../shared/translations/locales/af.json":return import("shared").then((function(e){return e.ak}));case"../shared/translations/locales/ar-x-pseudo.json":return import("shared").then((function(e){return e.al}));case"../shared/translations/locales/ar.json":return import("shared").then((function(e){return e.am}));case"../shared/translations/locales/az.json":return import("shared").then((function(e){return e.an}));case"../shared/translations/locales/be.json":return import("shared").then((function(e){return e.ao}));case"../shared/translations/locales/bg.json":return import("shared").then((function(e){return e.ap}));case"../shared/translations/locales/bn.json":return import("shared").then((function(e){return e.aq}));case"../shared/translations/locales/bs.json":return import("shared").then((function(e){return e.ar}));case"../shared/translations/locales/ca.json":return import("shared").then((function(e){return e.as}));case"../shared/translations/locales/cs.json":return import("shared").then((function(e){return e.at}));case"../shared/translations/locales/cy.json":return import("shared").then((function(e){return e.au}));case"../shared/translations/locales/da.json":return import("shared").then((function(e){return e.av}));case"../shared/translations/locales/de-de.json":return import("shared").then((function(e){return e.aw}));case"../shared/translations/locales/de-x-informal.json":return import("shared").then((function(e){return e.ax}));case"../shared/translations/locales/de.json":return import("shared").then((function(e){return e.ay}));case"../shared/translations/locales/el.json":return import("shared").then((function(e){return e.az}));case"../shared/translations/locales/en-001.json":return import("shared").then((function(e){return e.aA}));case"../shared/translations/locales/en-150.json":return import("shared").then((function(e){return e.aB}));case"../shared/translations/locales/en-au.json":return import("shared").then((function(e){return e.aC}));case"../shared/translations/locales/en-ca.json":return import("shared").then((function(e){return e.aD}));case"../shared/translations/locales/en-gb.json":return import("shared").then((function(e){return e.aE}));case"../shared/translations/locales/en-my.json":return import("shared").then((function(e){return e.aF}));case"../shared/translations/locales/en-ph.json":return import("shared").then((function(e){return e.aG}));case"../shared/translations/locales/en-se.json":return import("shared").then((function(e){return e.aH}));case"../shared/translations/locales/en-us.json":return import("shared").then((function(e){return e.aI}));case"../shared/translations/locales/en-x-dev.json":return import("shared").then((function(e){return e.aJ}));case"../shared/translations/locales/en-x-keys.json":return import("shared").then((function(e){return e.aK}));case"../shared/translations/locales/en-x-obsolete.json":return import("shared").then((function(e){return e.aL}));case"../shared/translations/locales/en-x-pseudo.json":return import("shared").then((function(e){return e.aM}));case"../shared/translations/locales/en-x-test.json":return import("shared").then((function(e){return e.aN}));case"../shared/translations/locales/es-419.json":return import("shared").then((function(e){return e.aO}));case"../shared/translations/locales/es-es.json":return import("shared").then((function(e){return e.aP}));case"../shared/translations/locales/es.json":return import("shared").then((function(e){return e.aQ}));case"../shared/translations/locales/et.json":return import("shared").then((function(e){return e.aR}));case"../shared/translations/locales/eu.json":return import("shared").then((function(e){return e.aS}));case"../shared/translations/locales/fa-af.json":return import("shared").then((function(e){return e.aT}));case"../shared/translations/locales/fa.json":return import("shared").then((function(e){return e.aU}));case"../shared/translations/locales/fi.json":return import("shared").then((function(e){return e.aV}));case"../shared/translations/locales/fil.json":return import("shared").then((function(e){return e.aW}));case"../shared/translations/locales/fo.json":return import("shared").then((function(e){return e.aX}));case"../shared/translations/locales/fr-ca.json":return import("shared").then((function(e){return e.aY}));case"../shared/translations/locales/fr.json":return import("shared").then((function(e){return e.aZ}));case"../shared/translations/locales/ga.json":return import("shared").then((function(e){return e.a_}));case"../shared/translations/locales/he.json":return import("shared").then((function(e){return e.a$}));case"../shared/translations/locales/hi.json":return import("shared").then((function(e){return e.b0}));case"../shared/translations/locales/hr.json":return import("shared").then((function(e){return e.b1}));case"../shared/translations/locales/hu.json":return import("shared").then((function(e){return e.b2}));case"../shared/translations/locales/hy.json":return import("shared").then((function(e){return e.b3}));case"../shared/translations/locales/id.json":return import("shared").then((function(e){return e.b4}));case"../shared/translations/locales/is.json":return import("shared").then((function(e){return e.b5}));case"../shared/translations/locales/it-ch.json":return import("shared").then((function(e){return e.b6}));case"../shared/translations/locales/it.json":return import("shared").then((function(e){return e.b7}));case"../shared/translations/locales/ja.json":return import("shared").then((function(e){return e.b8}));case"../shared/translations/locales/ka.json":return import("shared").then((function(e){return e.b9}));case"../shared/translations/locales/kk.json":return import("shared").then((function(e){return e.ba}));case"../shared/translations/locales/kl-dk.json":return import("shared").then((function(e){return e.bb}));case"../shared/translations/locales/ko.json":return import("shared").then((function(e){return e.bc}));case"../shared/translations/locales/ku.json":return import("shared").then((function(e){return e.bd}));case"../shared/translations/locales/lt.json":return import("shared").then((function(e){return e.be}));case"../shared/translations/locales/lv.json":return import("shared").then((function(e){return e.bf}));case"../shared/translations/locales/mk.json":return import("shared").then((function(e){return e.bg}));case"../shared/translations/locales/mn.json":return import("shared").then((function(e){return e.bh}));case"../shared/translations/locales/ms.json":return import("shared").then((function(e){return e.bi}));case"../shared/translations/locales/mt.json":return import("shared").then((function(e){return e.bj}));case"../shared/translations/locales/my.json":return import("shared").then((function(e){return e.bk}));case"../shared/translations/locales/nl-be.json":return import("shared").then((function(e){return e.bl}));case"../shared/translations/locales/nl.json":return import("shared").then((function(e){return e.bm}));case"../shared/translations/locales/no.json":return import("shared").then((function(e){return e.bn}));case"../shared/translations/locales/pl.json":return import("shared").then((function(e){return e.bo}));case"../shared/translations/locales/pt-br.json":return import("shared").then((function(e){return e.bp}));case"../shared/translations/locales/pt.json":return import("shared").then((function(e){return e.bq}));case"../shared/translations/locales/ro.json":return import("shared").then((function(e){return e.br}));case"../shared/translations/locales/ru.json":return import("shared").then((function(e){return e.bs}));case"../shared/translations/locales/sk.json":return import("shared").then((function(e){return e.bt}));case"../shared/translations/locales/sl.json":return import("shared").then((function(e){return e.bu}));case"../shared/translations/locales/sq.json":return import("shared").then((function(e){return e.bv}));case"../shared/translations/locales/sr-me.json":return import("shared").then((function(e){return e.bw}));case"../shared/translations/locales/sr.json":return import("shared").then((function(e){return e.bx}));case"../shared/translations/locales/sv.json":return import("shared").then((function(e){return e.by}));case"../shared/translations/locales/th.json":return import("shared").then((function(e){return e.bz}));case"../shared/translations/locales/tr.json":return import("shared").then((function(e){return e.bA}));case"../shared/translations/locales/uk.json":return import("shared").then((function(e){return e.bB}));case"../shared/translations/locales/ur.json":return import("shared").then((function(e){return e.bC}));case"../shared/translations/locales/uz.json":return import("shared").then((function(e){return e.bD}));case"../shared/translations/locales/vi.json":return import("shared").then((function(e){return e.bE}));case"../shared/translations/locales/zh-cn.json":return import("shared").then((function(e){return e.bF}));case"../shared/translations/locales/zh-tw.json":return import("shared").then((function(e){return e.bG}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../shared/translations/locales/${r}.json`)]),p.render(t.jsx(k,{theme:g(n),children:t.jsx(v,{helpCenterPath:s,children:t.jsx(W,{helpCenterPath:s})})}),e)}const D=e=>"tagger"===e.type?e.custom_field_options.find((e=>e.default))?.value??null:null,J=async(e,n)=>{const[t,s]=await Promise.all([fetch(`/api/v2/ticket_forms/${e}`),fetch(`/api/v2/ticket_fields?locale=${n}`)]);if(!t.ok)throw new Error("Error fetching form data");if(!s.ok)throw new Error("Error fetching fields data");const r=await t.json(),a=await s.json(),o=r.ticket_form.ticket_field_ids,i=a.ticket_fields;let l=null;const c=o.map((e=>{const n=i.find((n=>n.id===e));return n&&"subject"!==n.type&&"description"!==n.type&&n.editable_in_portal?"lookup"===n.type&&"standard::service_catalog_item"===_(n.relationship_target_type)?(l=n,null):(e=>{const{id:n,type:t,description:s,title_in_portal:r,custom_field_options:a,required_in_portal:o,relationship_target_type:i}=e;return{id:n,type:t,name:`custom_fields_${n}`,description:s,label:r,options:a,required:o,relationship_target_type:i,error:null,value:D(e)}})(n):null})).filter(Boolean);if(!l)throw new Error("Associated lookup field not found");return{requestFields:c,associatedLookupField:l}};const V=e.div`
  border-bottom: ${e=>e.theme.borders.sm}
    ${e=>n("grey",300,e.theme)};
  padding-bottom: ${e=>e.theme.space.lg};
  margin-right: ${e=>e.theme.space.xl};

const StyledCol = styled(Col) `
  margin-bottom: ${(props) => props.theme.space.md};
`;
const Container$1 = styled.div `
  padding-top: ${(props) => props.theme.space.sm};
`;
const StyledGrid = styled(Grid) `
  padding: 0;
`;
const PAGE_SIZE = 16;
function ServiceCatalogList({ helpCenterPath, }) {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const [meta, setMeta] = reactExports.useState(null);
    const [currentCursor, setCurrentCursor] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const [error, setError] = reactExports.useState(null);
    const notify = useNotify();
    const { t } = useTranslation();
    if (error) {
        throw error;
    }
    reactExports.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(currentCursor
                    ? `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}&${currentCursor}`
                    : `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}`);
                const data = await response.json();
                if (response.ok) {
                    setMeta(data.meta);
                    setServiceCatalogItems(data.service_catalog_items);
                    setIsLoading(false);
                }
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            catch (error) {
                setIsLoading(false);
                notify({
                    title: t("service-catalog.service-list-error-title", "Services couldn't be loaded"),
                    message: t("service-catalog.service-list-error-message", "Give it a moment and try it again"),
                    type: "error",
                });
                setError(error);
            }
        }
        fetchData();
    }, [currentCursor, notify, t]);
    const handleNextClick = () => {
        if (meta && meta.after_cursor) {
            setCurrentCursor(`page[after]=${meta.after_cursor}`);
        }
    };
    const handlePreviousClick = () => {
        if (meta && meta.before_cursor) {
            setCurrentCursor(`page[before]=${meta?.before_cursor}`);
        }
    };
    return (jsxRuntimeExports.jsx(Container$1, { children: isLoading ? (jsxRuntimeExports.jsx(LoadingState, {})) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(StyledGrid, { children: jsxRuntimeExports.jsx(Row, { wrap: "wrap", children: serviceCatalogItems.length !== 0 &&
                            serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record }, record.id) }, record.id))) }) }), serviceCatalogItems.length === 0 && (jsxRuntimeExports.jsx(EmptyState, { helpCenterPath: helpCenterPath })), serviceCatalogItems.length > 0 && (jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: handlePreviousClick, disabled: !currentCursor ||
                                (currentCursor?.startsWith("page[before]") && !meta?.has_more), children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: handleNextClick, disabled: (currentCursor?.startsWith("page[after]") &&
                                !meta?.has_more) ||
                                (currentCursor == null && !meta?.has_more), children: t("service-catalog.pagination.next", "Next") })] }))] })) }));
}

function __variableDynamicImportRuntime2__$1(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.az; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aA; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aB; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aC; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.aD; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.aE; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.aF; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.aG; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.aH; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.aI; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.aJ; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.aK; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.aL; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.aM; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.aN; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.aO; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.aP; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.aQ; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.aR; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.aS; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.aT; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.aU; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.aV; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.bV; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime1__$1(path) {
  switch (path) {
    case '../ticket-fields/translations/locales/af.json': return import('ticket-fields').then(function (n) { return n.b; });
    case '../ticket-fields/translations/locales/ar-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.c; });
    case '../ticket-fields/translations/locales/ar.json': return import('ticket-fields').then(function (n) { return n.d; });
    case '../ticket-fields/translations/locales/az.json': return import('ticket-fields').then(function (n) { return n.e; });
    case '../ticket-fields/translations/locales/be.json': return import('ticket-fields').then(function (n) { return n.f; });
    case '../ticket-fields/translations/locales/bg.json': return import('ticket-fields').then(function (n) { return n.h; });
    case '../ticket-fields/translations/locales/bn.json': return import('ticket-fields').then(function (n) { return n.i; });
    case '../ticket-fields/translations/locales/bs.json': return import('ticket-fields').then(function (n) { return n.j; });
    case '../ticket-fields/translations/locales/ca.json': return import('ticket-fields').then(function (n) { return n.k; });
    case '../ticket-fields/translations/locales/cs.json': return import('ticket-fields').then(function (n) { return n.l; });
    case '../ticket-fields/translations/locales/cy.json': return import('ticket-fields').then(function (n) { return n.m; });
    case '../ticket-fields/translations/locales/da.json': return import('ticket-fields').then(function (n) { return n.n; });
    case '../ticket-fields/translations/locales/de-de.json': return import('ticket-fields').then(function (n) { return n.o; });
    case '../ticket-fields/translations/locales/de-x-informal.json': return import('ticket-fields').then(function (n) { return n.p; });
    case '../ticket-fields/translations/locales/de.json': return import('ticket-fields').then(function (n) { return n.q; });
    case '../ticket-fields/translations/locales/el.json': return import('ticket-fields').then(function (n) { return n.r; });
    case '../ticket-fields/translations/locales/en-001.json': return import('ticket-fields').then(function (n) { return n.s; });
    case '../ticket-fields/translations/locales/en-150.json': return import('ticket-fields').then(function (n) { return n.t; });
    case '../ticket-fields/translations/locales/en-au.json': return import('ticket-fields').then(function (n) { return n.u; });
    case '../ticket-fields/translations/locales/en-ca.json': return import('ticket-fields').then(function (n) { return n.v; });
    case '../ticket-fields/translations/locales/en-gb.json': return import('ticket-fields').then(function (n) { return n.w; });
    case '../ticket-fields/translations/locales/en-my.json': return import('ticket-fields').then(function (n) { return n.x; });
    case '../ticket-fields/translations/locales/en-ph.json': return import('ticket-fields').then(function (n) { return n.y; });
    case '../ticket-fields/translations/locales/en-se.json': return import('ticket-fields').then(function (n) { return n.z; });
    case '../ticket-fields/translations/locales/en-us.json': return import('ticket-fields').then(function (n) { return n.A; });
    case '../ticket-fields/translations/locales/en-x-dev.json': return import('ticket-fields').then(function (n) { return n.B; });
    case '../ticket-fields/translations/locales/en-x-keys.json': return import('ticket-fields').then(function (n) { return n.C; });
    case '../ticket-fields/translations/locales/en-x-obsolete.json': return import('ticket-fields').then(function (n) { return n.E; });
    case '../ticket-fields/translations/locales/en-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.F; });
    case '../ticket-fields/translations/locales/en-x-test.json': return import('ticket-fields').then(function (n) { return n.G; });
    case '../ticket-fields/translations/locales/es-419.json': return import('ticket-fields').then(function (n) { return n.H; });
    case '../ticket-fields/translations/locales/es-es.json': return import('ticket-fields').then(function (n) { return n.J; });
    case '../ticket-fields/translations/locales/es.json': return import('ticket-fields').then(function (n) { return n.K; });
    case '../ticket-fields/translations/locales/et.json': return import('ticket-fields').then(function (n) { return n.L; });
    case '../ticket-fields/translations/locales/eu.json': return import('ticket-fields').then(function (n) { return n.M; });
    case '../ticket-fields/translations/locales/fa-af.json': return import('ticket-fields').then(function (n) { return n.N; });
    case '../ticket-fields/translations/locales/fa.json': return import('ticket-fields').then(function (n) { return n.O; });
    case '../ticket-fields/translations/locales/fi.json': return import('ticket-fields').then(function (n) { return n.P; });
    case '../ticket-fields/translations/locales/fil.json': return import('ticket-fields').then(function (n) { return n.Q; });
    case '../ticket-fields/translations/locales/fo.json': return import('ticket-fields').then(function (n) { return n.R; });
    case '../ticket-fields/translations/locales/fr-ca.json': return import('ticket-fields').then(function (n) { return n.S; });
    case '../ticket-fields/translations/locales/fr.json': return import('ticket-fields').then(function (n) { return n.U; });
    case '../ticket-fields/translations/locales/ga.json': return import('ticket-fields').then(function (n) { return n.V; });
    case '../ticket-fields/translations/locales/he.json': return import('ticket-fields').then(function (n) { return n.W; });
    case '../ticket-fields/translations/locales/hi.json': return import('ticket-fields').then(function (n) { return n.X; });
    case '../ticket-fields/translations/locales/hr.json': return import('ticket-fields').then(function (n) { return n.Y; });
    case '../ticket-fields/translations/locales/hu.json': return import('ticket-fields').then(function (n) { return n.Z; });
    case '../ticket-fields/translations/locales/hy.json': return import('ticket-fields').then(function (n) { return n._; });
    case '../ticket-fields/translations/locales/id.json': return import('ticket-fields').then(function (n) { return n.$; });
    case '../ticket-fields/translations/locales/is.json': return import('ticket-fields').then(function (n) { return n.a0; });
    case '../ticket-fields/translations/locales/it-ch.json': return import('ticket-fields').then(function (n) { return n.a1; });
    case '../ticket-fields/translations/locales/it.json': return import('ticket-fields').then(function (n) { return n.a2; });
    case '../ticket-fields/translations/locales/ja.json': return import('ticket-fields').then(function (n) { return n.a3; });
    case '../ticket-fields/translations/locales/ka.json': return import('ticket-fields').then(function (n) { return n.a4; });
    case '../ticket-fields/translations/locales/kk.json': return import('ticket-fields').then(function (n) { return n.a5; });
    case '../ticket-fields/translations/locales/kl-dk.json': return import('ticket-fields').then(function (n) { return n.a6; });
    case '../ticket-fields/translations/locales/ko.json': return import('ticket-fields').then(function (n) { return n.a7; });
    case '../ticket-fields/translations/locales/ku.json': return import('ticket-fields').then(function (n) { return n.a8; });
    case '../ticket-fields/translations/locales/lt.json': return import('ticket-fields').then(function (n) { return n.a9; });
    case '../ticket-fields/translations/locales/lv.json': return import('ticket-fields').then(function (n) { return n.aa; });
    case '../ticket-fields/translations/locales/mk.json': return import('ticket-fields').then(function (n) { return n.ab; });
    case '../ticket-fields/translations/locales/mn.json': return import('ticket-fields').then(function (n) { return n.ac; });
    case '../ticket-fields/translations/locales/ms.json': return import('ticket-fields').then(function (n) { return n.ad; });
    case '../ticket-fields/translations/locales/mt.json': return import('ticket-fields').then(function (n) { return n.ae; });
    case '../ticket-fields/translations/locales/my.json': return import('ticket-fields').then(function (n) { return n.af; });
    case '../ticket-fields/translations/locales/nl-be.json': return import('ticket-fields').then(function (n) { return n.ag; });
    case '../ticket-fields/translations/locales/nl.json': return import('ticket-fields').then(function (n) { return n.ah; });
    case '../ticket-fields/translations/locales/no.json': return import('ticket-fields').then(function (n) { return n.ai; });
    case '../ticket-fields/translations/locales/pl.json': return import('ticket-fields').then(function (n) { return n.aj; });
    case '../ticket-fields/translations/locales/pt-br.json': return import('ticket-fields').then(function (n) { return n.ak; });
    case '../ticket-fields/translations/locales/pt.json': return import('ticket-fields').then(function (n) { return n.al; });
    case '../ticket-fields/translations/locales/ro.json': return import('ticket-fields').then(function (n) { return n.am; });
    case '../ticket-fields/translations/locales/ru.json': return import('ticket-fields').then(function (n) { return n.an; });
    case '../ticket-fields/translations/locales/sk.json': return import('ticket-fields').then(function (n) { return n.ao; });
    case '../ticket-fields/translations/locales/sl.json': return import('ticket-fields').then(function (n) { return n.ap; });
    case '../ticket-fields/translations/locales/sq.json': return import('ticket-fields').then(function (n) { return n.aq; });
    case '../ticket-fields/translations/locales/sr-me.json': return import('ticket-fields').then(function (n) { return n.ar; });
    case '../ticket-fields/translations/locales/sr.json': return import('ticket-fields').then(function (n) { return n.as; });
    case '../ticket-fields/translations/locales/sv.json': return import('ticket-fields').then(function (n) { return n.at; });
    case '../ticket-fields/translations/locales/th.json': return import('ticket-fields').then(function (n) { return n.au; });
    case '../ticket-fields/translations/locales/tr.json': return import('ticket-fields').then(function (n) { return n.av; });
    case '../ticket-fields/translations/locales/uk.json': return import('ticket-fields').then(function (n) { return n.aw; });
    case '../ticket-fields/translations/locales/ur.json': return import('ticket-fields').then(function (n) { return n.ax; });
    case '../ticket-fields/translations/locales/uz.json': return import('ticket-fields').then(function (n) { return n.ay; });
    case '../ticket-fields/translations/locales/vi.json': return import('ticket-fields').then(function (n) { return n.az; });
    case '../ticket-fields/translations/locales/zh-cn.json': return import('ticket-fields').then(function (n) { return n.aA; });
    case '../ticket-fields/translations/locales/zh-tw.json': return import('ticket-fields').then(function (n) { return n.aB; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case './translations/locales/af.json': return import('service-catalog-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('service-catalog-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('service-catalog-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('service-catalog-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('service-catalog-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('service-catalog-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('service-catalog-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('service-catalog-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('service-catalog-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('service-catalog-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('service-catalog-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('service-catalog-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('service-catalog-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('service-catalog-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('service-catalog-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('service-catalog-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('service-catalog-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('service-catalog-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('service-catalog-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('service-catalog-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('service-catalog-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('service-catalog-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('service-catalog-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('service-catalog-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('service-catalog-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('service-catalog-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('service-catalog-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('service-catalog-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('service-catalog-translations').then(function (n) { return n.E; });
    case './translations/locales/es-es.json': return import('service-catalog-translations').then(function (n) { return n.F; });
    case './translations/locales/es.json': return import('service-catalog-translations').then(function (n) { return n.G; });
    case './translations/locales/et.json': return import('service-catalog-translations').then(function (n) { return n.H; });
    case './translations/locales/eu.json': return import('service-catalog-translations').then(function (n) { return n.I; });
    case './translations/locales/fa-af.json': return import('service-catalog-translations').then(function (n) { return n.J; });
    case './translations/locales/fa.json': return import('service-catalog-translations').then(function (n) { return n.K; });
    case './translations/locales/fi.json': return import('service-catalog-translations').then(function (n) { return n.L; });
    case './translations/locales/fil.json': return import('service-catalog-translations').then(function (n) { return n.M; });
    case './translations/locales/fo.json': return import('service-catalog-translations').then(function (n) { return n.N; });
    case './translations/locales/fr-ca.json': return import('service-catalog-translations').then(function (n) { return n.O; });
    case './translations/locales/fr.json': return import('service-catalog-translations').then(function (n) { return n.P; });
    case './translations/locales/ga.json': return import('service-catalog-translations').then(function (n) { return n.Q; });
    case './translations/locales/he.json': return import('service-catalog-translations').then(function (n) { return n.R; });
    case './translations/locales/hi.json': return import('service-catalog-translations').then(function (n) { return n.S; });
    case './translations/locales/hr.json': return import('service-catalog-translations').then(function (n) { return n.T; });
    case './translations/locales/hu.json': return import('service-catalog-translations').then(function (n) { return n.U; });
    case './translations/locales/hy.json': return import('service-catalog-translations').then(function (n) { return n.V; });
    case './translations/locales/id.json': return import('service-catalog-translations').then(function (n) { return n.W; });
    case './translations/locales/is.json': return import('service-catalog-translations').then(function (n) { return n.X; });
    case './translations/locales/it-ch.json': return import('service-catalog-translations').then(function (n) { return n.Y; });
    case './translations/locales/it.json': return import('service-catalog-translations').then(function (n) { return n.Z; });
    case './translations/locales/ja.json': return import('service-catalog-translations').then(function (n) { return n._; });
    case './translations/locales/ka.json': return import('service-catalog-translations').then(function (n) { return n.$; });
    case './translations/locales/kk.json': return import('service-catalog-translations').then(function (n) { return n.a0; });
    case './translations/locales/kl-dk.json': return import('service-catalog-translations').then(function (n) { return n.a1; });
    case './translations/locales/ko.json': return import('service-catalog-translations').then(function (n) { return n.a2; });
    case './translations/locales/ku.json': return import('service-catalog-translations').then(function (n) { return n.a3; });
    case './translations/locales/lt.json': return import('service-catalog-translations').then(function (n) { return n.a4; });
    case './translations/locales/lv.json': return import('service-catalog-translations').then(function (n) { return n.a5; });
    case './translations/locales/mk.json': return import('service-catalog-translations').then(function (n) { return n.a6; });
    case './translations/locales/mn.json': return import('service-catalog-translations').then(function (n) { return n.a7; });
    case './translations/locales/ms.json': return import('service-catalog-translations').then(function (n) { return n.a8; });
    case './translations/locales/mt.json': return import('service-catalog-translations').then(function (n) { return n.a9; });
    case './translations/locales/my.json': return import('service-catalog-translations').then(function (n) { return n.aa; });
    case './translations/locales/nl-be.json': return import('service-catalog-translations').then(function (n) { return n.ab; });
    case './translations/locales/nl.json': return import('service-catalog-translations').then(function (n) { return n.ac; });
    case './translations/locales/no.json': return import('service-catalog-translations').then(function (n) { return n.ad; });
    case './translations/locales/pl.json': return import('service-catalog-translations').then(function (n) { return n.ae; });
    case './translations/locales/pt-br.json': return import('service-catalog-translations').then(function (n) { return n.af; });
    case './translations/locales/pt.json': return import('service-catalog-translations').then(function (n) { return n.ag; });
    case './translations/locales/ro.json': return import('service-catalog-translations').then(function (n) { return n.ah; });
    case './translations/locales/ru.json': return import('service-catalog-translations').then(function (n) { return n.ai; });
    case './translations/locales/sk.json': return import('service-catalog-translations').then(function (n) { return n.aj; });
    case './translations/locales/sl.json': return import('service-catalog-translations').then(function (n) { return n.ak; });
    case './translations/locales/sq.json': return import('service-catalog-translations').then(function (n) { return n.al; });
    case './translations/locales/sr-me.json': return import('service-catalog-translations').then(function (n) { return n.am; });
    case './translations/locales/sr.json': return import('service-catalog-translations').then(function (n) { return n.an; });
    case './translations/locales/sv.json': return import('service-catalog-translations').then(function (n) { return n.ao; });
    case './translations/locales/th.json': return import('service-catalog-translations').then(function (n) { return n.ap; });
    case './translations/locales/tr.json': return import('service-catalog-translations').then(function (n) { return n.aq; });
    case './translations/locales/uk.json': return import('service-catalog-translations').then(function (n) { return n.ar; });
    case './translations/locales/ur.json': return import('service-catalog-translations').then(function (n) { return n.as; });
    case './translations/locales/uz.json': return import('service-catalog-translations').then(function (n) { return n.at; });
    case './translations/locales/vi.json': return import('service-catalog-translations').then(function (n) { return n.au; });
    case './translations/locales/zh-cn.json': return import('service-catalog-translations').then(function (n) { return n.av; });
    case './translations/locales/zh-tw.json': return import('service-catalog-translations').then(function (n) { return n.aw; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderServiceCatalogList(container, settings, helpCenterPath, baseLocale) {
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__$1(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__$1(`../ticket-fields/translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime2__$1(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogList, { helpCenterPath: helpCenterPath }) }) }), container);
}

const getFieldValue = (field) => field.type === "tagger"
    ? field.custom_field_options.find((option) => option.default)?.value
    : undefined;
const formatField = (field) => {
    const { id, type, description, title_in_portal, custom_field_options, required_in_portal, relationship_target_type, } = field;
    return {
        id,
        type,
        name: `custom_fields_${id}`,
        description,
        label: title_in_portal,
        options: custom_field_options,
        required: required_in_portal,
        relationship_target_type,
        error: null,
        value: getFieldValue(field),
    };
};
const isAssociatedLookupField = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    if (customObjectKey === "standard::service_catalog_item") {
        return true;
    }
    return false;
};
const fetchTicketFields = async (form_id, baseLocale) => {
    const [formResponse, fieldsResponse] = await Promise.all([
        fetch(`/api/v2/ticket_forms/${form_id}`),
        fetch(`/api/v2/ticket_fields?locale=${baseLocale}`),
    ]);
    if (!formResponse.ok) {
        throw new Error("Error fetching form data");
    }
    if (!fieldsResponse.ok) {
        throw new Error("Error fetching fields data");
    }
    const formData = await formResponse.json();
    const fieldsData = await fieldsResponse.json();
    const ids = formData.ticket_form.ticket_field_ids;
    const ticketFieldsData = fieldsData.ticket_fields;
    let associatedLookupField = null;
    const requestFields = ids
        .map((id) => {
        const ticketField = ticketFieldsData.find((field) => field.id === id);
        if (ticketField &&
            ticketField.type !== "subject" &&
            ticketField.type !== "description" &&
            ticketField.editable_in_portal) {
            if (ticketField.type === "lookup" &&
                isAssociatedLookupField(ticketField)) {
                associatedLookupField = ticketField;
                return null;
            }
            return formatField(ticketField);
        }
        return null;
    })
        .filter(Boolean);
    if (!associatedLookupField) {
        throw new Error("Associated lookup field not found");
    }
    return { requestFields, associatedLookupField };
};
function useItemFormFields(serviceCatalogItem, baseLocale) {
    const [requestFields, setRequestFields] = reactExports.useState([]);
    const [associatedLookupField, setAssociatedLookupField] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchAndSetFields = async () => {
            if (serviceCatalogItem && serviceCatalogItem.form_id) {
                try {
                    const { requestFields, associatedLookupField } = await fetchTicketFields(serviceCatalogItem.form_id, baseLocale);
                    setRequestFields(requestFields);
                    setAssociatedLookupField(associatedLookupField);
                }
                catch (error) {
                    setError(error);
                }
            }
        };
        fetchAndSetFields();
    }, [baseLocale, serviceCatalogItem]);
    const handleChange = reactExports.useCallback((field, value) => {
        setRequestFields(requestFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }, [requestFields]);
    return {
        requestFields,
        associatedLookupField,
        error,
        setRequestFields,
        handleChange,
    };
}

const DescriptionWrapper = styled.div `
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`,X=e(x)`
  font-weight: ${e=>e.theme.fontWeights.semibold};
`,Z=e.div`
  font-size: ${e=>e.theme.fontSizes.md};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.expanded ? "none" : 3)};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
`,K=e(d)`
  margin-top: ${e=>e.theme.space.sm};
  font-size: ${e=>e.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`,Q=({title:e,description:n})=>{const[s,r]=h.useState(!1),{t:a}=l(),o=n.length>270;return t.jsxs(V,{children:[t.jsx(X,{tag:"h1",children:e}),t.jsx(Z,{expanded:s||!o,children:n}),o&&t.jsxs(K,{isLink:!0,onClick:()=>{r(!s)},children:[s?a("service-catalog.item.read-less","Read less"):a("service-catalog.item.read-more","Read more"),t.jsx(d.EndIcon,{children:s?t.jsx(w,{}):t.jsx(y,{})})]})]})},Y=e.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`,ee=e.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`,ne=e.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    margin-left: 0;
  }
`,te=e.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`,se=e.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;function re({requestFields:e,serviceCatalogItem:n,baseLocale:s,hasAtMentions:r,userRole:a,userId:o,brandId:i,defaultOrganizationId:c,handleChange:u,onSubmit:h}){const{t:j}=l();return t.jsxs(Y,{onSubmit:h,noValidate:!0,children:[t.jsxs(se,{children:[t.jsx(Q,{title:n.name,description:n.description}),t.jsx(ee,{children:e.map((e=>t.jsx(q,{field:e,baseLocale:s,hasAtMentions:r,userRole:a,userId:o,brandId:i,defaultOrganizationId:c,handleChange:u},e.id)))})]}),t.jsx(te,{children:t.jsx(ne,{children:t.jsx(d,{isPrimary:!0,size:"large",isStretched:!0,type:"submit",children:j("service-catalog.item.submit-button","Submit request")})})})]})}const ae=e.div`
  display: flex;
  flex-direction: column;
`;function oe({serviceCatalogItemId:e,baseLocale:n,hasAtMentions:s,userRole:r,organizations:a,userId:o,brandId:i}){const{serviceCatalogItem:c,errorFetchingItem:u}=function(e){const[n,t]=h.useState(),[s,r]=h.useState(null);return h.useEffect((()=>{(async()=>{try{const n=await fetch(`/api/v2/help_center/service_catalog/items/${e}`);if(!n.ok)throw new Error("Error fetching service catalog item");{const e=await n.json();t(e.service_catalog_item)}}catch(e){r(e)}})()}),[e]),{serviceCatalogItem:n,errorFetchingItem:s}}(e),{requestFields:d,associatedLookupField:f,error:m,setRequestFields:b,handleChange:p}=function(e,n){const[t,s]=h.useState([]),[r,a]=h.useState(),[o,i]=h.useState(null);h.useEffect((()=>{(async()=>{if(e&&e.form_id)try{const{requestFields:t,associatedLookupField:r}=await J(e.form_id,n);s(t),a(r)}catch(e){i(e)}})()}),[n,e]);const l=h.useCallback(((e,n)=>{s(t.map((t=>t.name===e.name?{...t,value:n}:t)))}),[t]);return{requestFields:t,associatedLookupField:r,error:o,setRequestFields:s,handleChange:l}}(c,n),{t:k}=l(),g=j();if(m)throw m;if(u)throw u;const v=a.length>0&&a[0]?.id?a[0]?.id?.toString():null;return t.jsx(ae,{children:c&&t.jsx(re,{requestFields:d,serviceCatalogItem:c,baseLocale:n,hasAtMentions:s,userRole:r,userId:o,brandId:i,defaultOrganizationId:v,handleChange:p,onSubmit:async e=>{if(e.preventDefault(),!c||!f)return;const t=await async function(e,n,t,s){try{const r=await fetch("/api/v2/users/me.json");if(!r.ok)throw new Error("Error fetching current user data");const a=await r.json(),o=n.map((e=>({id:e.id,value:e.value})));return await fetch(`/api/v2/requests?locale=${s}`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":a.user.authenticity_token},body:JSON.stringify({request:{subject:`Service request: ${e.name}`,comment:{body:`Hi, I would like to request ${e.name}. ${e.description.substring(0,100)}`},ticket_form_id:e.form_id,custom_fields:[...o,{id:t.id,value:e.id}],via:{channel:"web form",source:50}}})})}catch(e){return void console.error("Error submitting service request:",e)}}(c,d,f,n);if(t?.ok){if(t&&t.ok){$({type:"success",message:k("service-catalog.item.service-request-submitted","Service request submitted")});const e="/hc/requests/"+(await(t?.json())).request.id;window.location.href=e}}else if(422===t?.status){const e=(await t.json()).details.base,n=d.map((n=>{const t=e.find((e=>e.field_key===n.id));return t?{...n,error:t.description}:n}));b(n)}else g({title:k("service-catalog.item.service-request-error-title","Service couldn't be submitted"),message:k("service-catalog.item.service-request-error-message","Give it a moment and try it again"),type:"error"})}})})}async function ie(e,n,s,r){const{baseLocale:a}=s;m(a),await b(a,[()=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aw}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${a}.json`),()=>function(e){switch(e){case"../ticket-fields/translations/locales/af.json":return import("ticket-fields").then((function(e){return e.b}));case"../ticket-fields/translations/locales/ar-x-pseudo.json":return import("ticket-fields").then((function(e){return e.c}));case"../ticket-fields/translations/locales/ar.json":return import("ticket-fields").then((function(e){return e.d}));case"../ticket-fields/translations/locales/az.json":return import("ticket-fields").then((function(e){return e.e}));case"../ticket-fields/translations/locales/be.json":return import("ticket-fields").then((function(e){return e.f}));case"../ticket-fields/translations/locales/bg.json":return import("ticket-fields").then((function(e){return e.h}));case"../ticket-fields/translations/locales/bn.json":return import("ticket-fields").then((function(e){return e.i}));case"../ticket-fields/translations/locales/bs.json":return import("ticket-fields").then((function(e){return e.j}));case"../ticket-fields/translations/locales/ca.json":return import("ticket-fields").then((function(e){return e.k}));case"../ticket-fields/translations/locales/cs.json":return import("ticket-fields").then((function(e){return e.l}));case"../ticket-fields/translations/locales/cy.json":return import("ticket-fields").then((function(e){return e.m}));case"../ticket-fields/translations/locales/da.json":return import("ticket-fields").then((function(e){return e.n}));case"../ticket-fields/translations/locales/de-de.json":return import("ticket-fields").then((function(e){return e.o}));case"../ticket-fields/translations/locales/de-x-informal.json":return import("ticket-fields").then((function(e){return e.p}));case"../ticket-fields/translations/locales/de.json":return import("ticket-fields").then((function(e){return e.q}));case"../ticket-fields/translations/locales/el.json":return import("ticket-fields").then((function(e){return e.r}));case"../ticket-fields/translations/locales/en-001.json":return import("ticket-fields").then((function(e){return e.s}));case"../ticket-fields/translations/locales/en-150.json":return import("ticket-fields").then((function(e){return e.t}));case"../ticket-fields/translations/locales/en-au.json":return import("ticket-fields").then((function(e){return e.u}));case"../ticket-fields/translations/locales/en-ca.json":return import("ticket-fields").then((function(e){return e.v}));case"../ticket-fields/translations/locales/en-gb.json":return import("ticket-fields").then((function(e){return e.w}));case"../ticket-fields/translations/locales/en-my.json":return import("ticket-fields").then((function(e){return e.x}));case"../ticket-fields/translations/locales/en-ph.json":return import("ticket-fields").then((function(e){return e.y}));case"../ticket-fields/translations/locales/en-se.json":return import("ticket-fields").then((function(e){return e.z}));case"../ticket-fields/translations/locales/en-us.json":return import("ticket-fields").then((function(e){return e.A}));case"../ticket-fields/translations/locales/en-x-dev.json":return import("ticket-fields").then((function(e){return e.B}));case"../ticket-fields/translations/locales/en-x-keys.json":return import("ticket-fields").then((function(e){return e.C}));case"../ticket-fields/translations/locales/en-x-obsolete.json":return import("ticket-fields").then((function(e){return e.E}));case"../ticket-fields/translations/locales/en-x-pseudo.json":return import("ticket-fields").then((function(e){return e.F}));case"../ticket-fields/translations/locales/en-x-test.json":return import("ticket-fields").then((function(e){return e.G}));case"../ticket-fields/translations/locales/es-419.json":return import("ticket-fields").then((function(e){return e.H}));case"../ticket-fields/translations/locales/es-es.json":return import("ticket-fields").then((function(e){return e.J}));case"../ticket-fields/translations/locales/es.json":return import("ticket-fields").then((function(e){return e.K}));case"../ticket-fields/translations/locales/et.json":return import("ticket-fields").then((function(e){return e.L}));case"../ticket-fields/translations/locales/eu.json":return import("ticket-fields").then((function(e){return e.M}));case"../ticket-fields/translations/locales/fa-af.json":return import("ticket-fields").then((function(e){return e.N}));case"../ticket-fields/translations/locales/fa.json":return import("ticket-fields").then((function(e){return e.O}));case"../ticket-fields/translations/locales/fi.json":return import("ticket-fields").then((function(e){return e.P}));case"../ticket-fields/translations/locales/fil.json":return import("ticket-fields").then((function(e){return e.Q}));case"../ticket-fields/translations/locales/fo.json":return import("ticket-fields").then((function(e){return e.R}));case"../ticket-fields/translations/locales/fr-ca.json":return import("ticket-fields").then((function(e){return e.S}));case"../ticket-fields/translations/locales/fr.json":return import("ticket-fields").then((function(e){return e.U}));case"../ticket-fields/translations/locales/ga.json":return import("ticket-fields").then((function(e){return e.V}));case"../ticket-fields/translations/locales/he.json":return import("ticket-fields").then((function(e){return e.W}));case"../ticket-fields/translations/locales/hi.json":return import("ticket-fields").then((function(e){return e.X}));case"../ticket-fields/translations/locales/hr.json":return import("ticket-fields").then((function(e){return e.Y}));case"../ticket-fields/translations/locales/hu.json":return import("ticket-fields").then((function(e){return e.Z}));case"../ticket-fields/translations/locales/hy.json":return import("ticket-fields").then((function(e){return e._}));case"../ticket-fields/translations/locales/id.json":return import("ticket-fields").then((function(e){return e.$}));case"../ticket-fields/translations/locales/is.json":return import("ticket-fields").then((function(e){return e.a0}));case"../ticket-fields/translations/locales/it-ch.json":return import("ticket-fields").then((function(e){return e.a1}));case"../ticket-fields/translations/locales/it.json":return import("ticket-fields").then((function(e){return e.a2}));case"../ticket-fields/translations/locales/ja.json":return import("ticket-fields").then((function(e){return e.a3}));case"../ticket-fields/translations/locales/ka.json":return import("ticket-fields").then((function(e){return e.a4}));case"../ticket-fields/translations/locales/kk.json":return import("ticket-fields").then((function(e){return e.a5}));case"../ticket-fields/translations/locales/kl-dk.json":return import("ticket-fields").then((function(e){return e.a6}));case"../ticket-fields/translations/locales/ko.json":return import("ticket-fields").then((function(e){return e.a7}));case"../ticket-fields/translations/locales/ku.json":return import("ticket-fields").then((function(e){return e.a8}));case"../ticket-fields/translations/locales/lt.json":return import("ticket-fields").then((function(e){return e.a9}));case"../ticket-fields/translations/locales/lv.json":return import("ticket-fields").then((function(e){return e.aa}));case"../ticket-fields/translations/locales/mk.json":return import("ticket-fields").then((function(e){return e.ab}));case"../ticket-fields/translations/locales/mn.json":return import("ticket-fields").then((function(e){return e.ac}));case"../ticket-fields/translations/locales/ms.json":return import("ticket-fields").then((function(e){return e.ad}));case"../ticket-fields/translations/locales/mt.json":return import("ticket-fields").then((function(e){return e.ae}));case"../ticket-fields/translations/locales/my.json":return import("ticket-fields").then((function(e){return e.af}));case"../ticket-fields/translations/locales/nl-be.json":return import("ticket-fields").then((function(e){return e.ag}));case"../ticket-fields/translations/locales/nl.json":return import("ticket-fields").then((function(e){return e.ah}));case"../ticket-fields/translations/locales/no.json":return import("ticket-fields").then((function(e){return e.ai}));case"../ticket-fields/translations/locales/pl.json":return import("ticket-fields").then((function(e){return e.aj}));case"../ticket-fields/translations/locales/pt-br.json":return import("ticket-fields").then((function(e){return e.ak}));case"../ticket-fields/translations/locales/pt.json":return import("ticket-fields").then((function(e){return e.al}));case"../ticket-fields/translations/locales/ro.json":return import("ticket-fields").then((function(e){return e.am}));case"../ticket-fields/translations/locales/ru.json":return import("ticket-fields").then((function(e){return e.an}));case"../ticket-fields/translations/locales/sk.json":return import("ticket-fields").then((function(e){return e.ao}));case"../ticket-fields/translations/locales/sl.json":return import("ticket-fields").then((function(e){return e.ap}));case"../ticket-fields/translations/locales/sq.json":return import("ticket-fields").then((function(e){return e.aq}));case"../ticket-fields/translations/locales/sr-me.json":return import("ticket-fields").then((function(e){return e.ar}));case"../ticket-fields/translations/locales/sr.json":return import("ticket-fields").then((function(e){return e.as}));case"../ticket-fields/translations/locales/sv.json":return import("ticket-fields").then((function(e){return e.at}));case"../ticket-fields/translations/locales/th.json":return import("ticket-fields").then((function(e){return e.au}));case"../ticket-fields/translations/locales/tr.json":return import("ticket-fields").then((function(e){return e.av}));case"../ticket-fields/translations/locales/uk.json":return import("ticket-fields").then((function(e){return e.aw}));case"../ticket-fields/translations/locales/ur.json":return import("ticket-fields").then((function(e){return e.ax}));case"../ticket-fields/translations/locales/uz.json":return import("ticket-fields").then((function(e){return e.ay}));case"../ticket-fields/translations/locales/vi.json":return import("ticket-fields").then((function(e){return e.az}));case"../ticket-fields/translations/locales/zh-cn.json":return import("ticket-fields").then((function(e){return e.aA}));case"../ticket-fields/translations/locales/zh-tw.json":return import("ticket-fields").then((function(e){return e.aB}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../ticket-fields/translations/locales/${a}.json`),()=>function(e){switch(e){case"../shared/translations/locales/af.json":return import("shared").then((function(e){return e.ak}));case"../shared/translations/locales/ar-x-pseudo.json":return import("shared").then((function(e){return e.al}));case"../shared/translations/locales/ar.json":return import("shared").then((function(e){return e.am}));case"../shared/translations/locales/az.json":return import("shared").then((function(e){return e.an}));case"../shared/translations/locales/be.json":return import("shared").then((function(e){return e.ao}));case"../shared/translations/locales/bg.json":return import("shared").then((function(e){return e.ap}));case"../shared/translations/locales/bn.json":return import("shared").then((function(e){return e.aq}));case"../shared/translations/locales/bs.json":return import("shared").then((function(e){return e.ar}));case"../shared/translations/locales/ca.json":return import("shared").then((function(e){return e.as}));case"../shared/translations/locales/cs.json":return import("shared").then((function(e){return e.at}));case"../shared/translations/locales/cy.json":return import("shared").then((function(e){return e.au}));case"../shared/translations/locales/da.json":return import("shared").then((function(e){return e.av}));case"../shared/translations/locales/de-de.json":return import("shared").then((function(e){return e.aw}));case"../shared/translations/locales/de-x-informal.json":return import("shared").then((function(e){return e.ax}));case"../shared/translations/locales/de.json":return import("shared").then((function(e){return e.ay}));case"../shared/translations/locales/el.json":return import("shared").then((function(e){return e.az}));case"../shared/translations/locales/en-001.json":return import("shared").then((function(e){return e.aA}));case"../shared/translations/locales/en-150.json":return import("shared").then((function(e){return e.aB}));case"../shared/translations/locales/en-au.json":return import("shared").then((function(e){return e.aC}));case"../shared/translations/locales/en-ca.json":return import("shared").then((function(e){return e.aD}));case"../shared/translations/locales/en-gb.json":return import("shared").then((function(e){return e.aE}));case"../shared/translations/locales/en-my.json":return import("shared").then((function(e){return e.aF}));case"../shared/translations/locales/en-ph.json":return import("shared").then((function(e){return e.aG}));case"../shared/translations/locales/en-se.json":return import("shared").then((function(e){return e.aH}));case"../shared/translations/locales/en-us.json":return import("shared").then((function(e){return e.aI}));case"../shared/translations/locales/en-x-dev.json":return import("shared").then((function(e){return e.aJ}));case"../shared/translations/locales/en-x-keys.json":return import("shared").then((function(e){return e.aK}));case"../shared/translations/locales/en-x-obsolete.json":return import("shared").then((function(e){return e.aL}));case"../shared/translations/locales/en-x-pseudo.json":return import("shared").then((function(e){return e.aM}));case"../shared/translations/locales/en-x-test.json":return import("shared").then((function(e){return e.aN}));case"../shared/translations/locales/es-419.json":return import("shared").then((function(e){return e.aO}));case"../shared/translations/locales/es-es.json":return import("shared").then((function(e){return e.aP}));case"../shared/translations/locales/es.json":return import("shared").then((function(e){return e.aQ}));case"../shared/translations/locales/et.json":return import("shared").then((function(e){return e.aR}));case"../shared/translations/locales/eu.json":return import("shared").then((function(e){return e.aS}));case"../shared/translations/locales/fa-af.json":return import("shared").then((function(e){return e.aT}));case"../shared/translations/locales/fa.json":return import("shared").then((function(e){return e.aU}));case"../shared/translations/locales/fi.json":return import("shared").then((function(e){return e.aV}));case"../shared/translations/locales/fil.json":return import("shared").then((function(e){return e.aW}));case"../shared/translations/locales/fo.json":return import("shared").then((function(e){return e.aX}));case"../shared/translations/locales/fr-ca.json":return import("shared").then((function(e){return e.aY}));case"../shared/translations/locales/fr.json":return import("shared").then((function(e){return e.aZ}));case"../shared/translations/locales/ga.json":return import("shared").then((function(e){return e.a_}));case"../shared/translations/locales/he.json":return import("shared").then((function(e){return e.a$}));case"../shared/translations/locales/hi.json":return import("shared").then((function(e){return e.b0}));case"../shared/translations/locales/hr.json":return import("shared").then((function(e){return e.b1}));case"../shared/translations/locales/hu.json":return import("shared").then((function(e){return e.b2}));case"../shared/translations/locales/hy.json":return import("shared").then((function(e){return e.b3}));case"../shared/translations/locales/id.json":return import("shared").then((function(e){return e.b4}));case"../shared/translations/locales/is.json":return import("shared").then((function(e){return e.b5}));case"../shared/translations/locales/it-ch.json":return import("shared").then((function(e){return e.b6}));case"../shared/translations/locales/it.json":return import("shared").then((function(e){return e.b7}));case"../shared/translations/locales/ja.json":return import("shared").then((function(e){return e.b8}));case"../shared/translations/locales/ka.json":return import("shared").then((function(e){return e.b9}));case"../shared/translations/locales/kk.json":return import("shared").then((function(e){return e.ba}));case"../shared/translations/locales/kl-dk.json":return import("shared").then((function(e){return e.bb}));case"../shared/translations/locales/ko.json":return import("shared").then((function(e){return e.bc}));case"../shared/translations/locales/ku.json":return import("shared").then((function(e){return e.bd}));case"../shared/translations/locales/lt.json":return import("shared").then((function(e){return e.be}));case"../shared/translations/locales/lv.json":return import("shared").then((function(e){return e.bf}));case"../shared/translations/locales/mk.json":return import("shared").then((function(e){return e.bg}));case"../shared/translations/locales/mn.json":return import("shared").then((function(e){return e.bh}));case"../shared/translations/locales/ms.json":return import("shared").then((function(e){return e.bi}));case"../shared/translations/locales/mt.json":return import("shared").then((function(e){return e.bj}));case"../shared/translations/locales/my.json":return import("shared").then((function(e){return e.bk}));case"../shared/translations/locales/nl-be.json":return import("shared").then((function(e){return e.bl}));case"../shared/translations/locales/nl.json":return import("shared").then((function(e){return e.bm}));case"../shared/translations/locales/no.json":return import("shared").then((function(e){return e.bn}));case"../shared/translations/locales/pl.json":return import("shared").then((function(e){return e.bo}));case"../shared/translations/locales/pt-br.json":return import("shared").then((function(e){return e.bp}));case"../shared/translations/locales/pt.json":return import("shared").then((function(e){return e.bq}));case"../shared/translations/locales/ro.json":return import("shared").then((function(e){return e.br}));case"../shared/translations/locales/ru.json":return import("shared").then((function(e){return e.bs}));case"../shared/translations/locales/sk.json":return import("shared").then((function(e){return e.bt}));case"../shared/translations/locales/sl.json":return import("shared").then((function(e){return e.bu}));case"../shared/translations/locales/sq.json":return import("shared").then((function(e){return e.bv}));case"../shared/translations/locales/sr-me.json":return import("shared").then((function(e){return e.bw}));case"../shared/translations/locales/sr.json":return import("shared").then((function(e){return e.bx}));case"../shared/translations/locales/sv.json":return import("shared").then((function(e){return e.by}));case"../shared/translations/locales/th.json":return import("shared").then((function(e){return e.bz}));case"../shared/translations/locales/tr.json":return import("shared").then((function(e){return e.bA}));case"../shared/translations/locales/uk.json":return import("shared").then((function(e){return e.bB}));case"../shared/translations/locales/ur.json":return import("shared").then((function(e){return e.bC}));case"../shared/translations/locales/uz.json":return import("shared").then((function(e){return e.bD}));case"../shared/translations/locales/vi.json":return import("shared").then((function(e){return e.bE}));case"../shared/translations/locales/zh-cn.json":return import("shared").then((function(e){return e.bF}));case"../shared/translations/locales/zh-tw.json":return import("shared").then((function(e){return e.bG}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../shared/translations/locales/${a}.json`)]),p.render(t.jsx(k,{theme:g(n),children:t.jsx(v,{helpCenterPath:r,children:t.jsx(oe,{...s})})}),e)}export{ie as renderServiceCatalogItem,H as renderServiceCatalogList};
