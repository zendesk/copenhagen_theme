import{t as e,r as t,au as n,s,g as a,R as r,j as o,av as i,aw as l,J as c,u,ax as d,ay as h,z as m,O as p,b as g,c as f,az as j,S as b,Z as v,aq as x,A as y,al as w,ak as _,ao as k,am as $,aA as C,aB as S,a2 as q,L,n as E,a0 as I,a1 as T,a3 as z,a4 as R,as as A,f as F,a5 as P,aC as U,aD as N,ad as M,aE as H,aF as O,aG as D,i as V,l as B,F as G,M as J,a6 as K,U as W,aH as Z,e as X,ar as Y,aI as Q}from"shared";import{g as ee,a as te,u as ne,A as se,R as ae,t as re}from"ticket-fields";const oe="attachments",ie="zen:custom_object:standard::itam_asset_type",le="zen:custom_object:standard::itam_asset",ce="is-service-catalog-preview",ue="preview",de="true",he="tf_",me=2048,pe=["true","false"],ge=["pre","strong","b","p","blockquote","ul","ol","li","h2","h3","h4","i","em","br"],fe={priority:["priority","basic_priority"],type:["tickettype"]};function je(t){return e.sanitize(t,{ADD_ATTR:["target"]})}function be(e){if(!e)return"";return(new DOMParser).parseFromString(e,"text/html").body.textContent??""}const ve=/^\d{4}-\d{2}-\d{2}$/,xe=/^[0-9A-HJKMNP-TV-Z]{26}$/i;function ye(e,t){const n=e.trim();if(""!==n&&!Number.isNaN(Number(n))){const e=Number(n);return t.find((t=>t.id===e))}const s=fe[n];if(s)return t.find((e=>s.includes(e.type)))}function we(t,n){const s=e.sanitize(n,{ALLOWED_TAGS:ge});switch(t.type){case"partialcreditcard":{const e=s.replace(/\D/g,"");return e?e.slice(-4):void 0}case"multiselect":return s.split(",").filter((e=>t.options.some((t=>t.value===e))));case"checkbox":if(!pe.includes(s))return;return"true"===s;case"date":return function(e){if(!ve.test(e))return!1;const t=new Date(e),[n,s,a]=e.split("-").map(Number);return t.getUTCFullYear()===n&&t.getUTCMonth()+1===s&&t.getUTCDate()===a}(s)?s:void 0;case"lookup":if(function(e){return e.relationship_target_type===le||e.relationship_target_type===ie}(t))return;if(!xe.test(s))return;return s;default:return s}}function _e(){return t.useMemo((()=>"undefined"==typeof window?new Map:function(e,t=e.length){const n=new Map;if(t>me)return n;const s=new URLSearchParams(e);for(const[e,t]of s){if(!e.startsWith(he))continue;const s=e.substring(he.length);0!==s.length&&n.set(s,t)}return n}(window.location.search,window.location.href.length)),[])}const ke=(e,t)=>{const n=e?.is_hidden??!1,s=e?.asset_type_ids??[];return{assetTypeIds:s,assetIds:t?.asset_filter_ids??[],isAssetTypeHidden:n,assetTypeHiddenValue:n&&s[0]?s[0]:"",assetTypeLabel:e?.name,assetTypeDescription:e?.description,assetTypeIsRequired:e?.is_required||!1,assetLabel:t?.name,assetDescription:t?.description,assetIsRequired:t?.is_required||!1}},$e=e=>"tagger"===e.type?e.custom_field_options.find((e=>e.default))?.value??null:null,Ce=["standard::service_catalog_item","standard::service_catalog_category"],Se=(e,t)=>e.map((e=>e.relationship_target_type===ie?{...e,label:t.assetTypeLabel||e.label,description:je(t.assetTypeDescription||e.description),required:t.assetTypeIsRequired||e.required}:e.relationship_target_type===le?{...e,label:t.assetLabel||e.label,description:je(t.assetDescription||e.description),required:t.assetIsRequired||e.required}:e)),qe=async(e,t)=>{const[s,a]=await Promise.all([fetch(`/api/v2/ticket_forms/${e}`),fetch(`/api/v2/ticket_fields?locale=${t}`)]);if(!s.ok)throw new Error("Error fetching form data");if(!a.ok)throw new Error("Error fetching fields data");const r=await s.json(),o=await a.json();if(!r.ticket_form.active)throw new Error("Associated ticket form is not active");const i=r.ticket_form,l=i.ticket_field_ids,c=i.end_user_conditions||[],u=o.ticket_fields;let d=null,h=null;const m=l.map((e=>{const t=u.find((t=>t.id===e));return t&&"subject"!==t.type&&"description"!==t.type&&t.active&&t.editable_in_portal?"lookup"===t.type&&(e=>{const t=te(e.relationship_target_type);return Ce.includes(t)})(t)?("standard::service_catalog_item"===te(t.relationship_target_type)?d=t:(e=>"standard::service_catalog_category"===te(e.relationship_target_type))(t)&&(h=t),null):(e=>{const{id:t,type:s,description:a,title_in_portal:r,custom_field_options:o,required_in_portal:i,relationship_target_type:l,relationship_filter:c}=e;return{id:t,type:s,name:`custom_fields_${t}`,description:je(n(a)),label:r,options:o,required:i,relationship_target_type:l,relationship_filter:c,error:null,value:$e(e)}})(t):null})).filter(Boolean);if(!d)throw new Error("Associated lookup field not found");return{requestFields:m,associatedLookupField:d,categoryLookupField:h,endUserConditions:c}};function Le(e,n){const[s,a]=t.useState([]),[r,o]=t.useState([]),[i,l]=t.useState(),[c,u]=t.useState(null),[d,h]=t.useState(null),[m,p]=t.useState(!1),g=t.useMemo((()=>ke(e?.asset_type_option,e?.asset_option)),[e]),f=_e();t.useEffect((()=>{if(!e?.form_id)return;let t=!0;return(async()=>{p(!0),h(null);try{const s=await qe(e.form_id,n);if(!t)return;const{requestFields:r,associatedLookupField:i,categoryLookupField:c,endUserConditions:d}=s;l(i),u(c),o(d);const h=function(e,t){if(0===t.size)return e;const n=new Set;let s=e;for(const[e,a]of t){const t=ye(e,s);if(!t||n.has(t.id))continue;const r=we(t,a);void 0!==r&&(n.add(t.id),s=s.map((e=>e.id===t.id?{...e,value:r}:e)))}return s}(Se(r,g),f);a(h)}catch(e){t&&h(e)}finally{t&&p(!1)}})(),()=>{t=!1}}),[n,e?.form_id,g,f]);const j=t.useCallback(((e,t)=>{const n=s.map((n=>n.name===e.name?{...n,value:t,error:null}:n));a(n)}),[s]);return{requestFields:ee(s,r),associatedLookupField:i,categoryLookupField:c,error:d,setRequestFields:a,handleChange:j,isRequestFieldsLoading:m,assetTypeHiddenValue:g.assetTypeHiddenValue,isAssetTypeHidden:g.isAssetTypeHidden,assetTypeIds:g.assetTypeIds,assetIds:g.assetIds}}const Ee=s(r)`
  background-color: ${({theme:e})=>a({theme:e,hue:"grey",shade:100})};
  width: ${e=>"large"===e.size?72:40}px !important;
  height: ${e=>"large"===e.size?72:40}px !important;

  && > svg {
    width: ${e=>"large"===e.size?28:16}px;
    height: ${e=>"large"===e.size?28:16}px;
    color: ${({theme:e})=>a({theme:e,hue:"grey",shade:600})};
  }
`,Ie=({size:e,url:t})=>o.jsx(Ee,{size:e,isSystem:!0,children:t?o.jsx("img",{src:t,alt:""}):o.jsx(i,{"aria-hidden":"true"})}),Te=s.div`
  border-bottom: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  padding-bottom: ${e=>e.theme.space.lg};
  margin-inline-end: ${e=>e.theme.space.xl};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`,ze=s(l)`
  font-weight: ${e=>e.theme.fontWeights.semibold};
  margin-bottom: 0;
  overflow-wrap: break-word;
  max-width: 100%;
`,Re=s.div`
  font-size: ${e=>e.theme.fontSizes.md};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${e=>e.isCollapsed?3:"none"};
  overflow: hidden;
  margin-top: ${e=>e.theme.space.md};
  padding-inline-end: ${e=>e.theme.space.xl};
  overflow-wrap: break-word;

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    padding-inline-end: 0;
  }
`,Ae=s(c)`
  margin-top: ${e=>e.theme.space.sm};
  font-size: ${e=>e.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`,Fe=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,Pe=({title:n,description:s,thumbnailUrl:a})=>{const[r,i]=t.useState(!0),[l,m]=t.useState(!1),{t:p}=u(),g=t.useRef(null),f=t.useMemo((()=>{return t=s??"",e.sanitize(t,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling","target","title"]});var t}),[s]);t.useEffect((()=>{const e=g.current;if(e){requestAnimationFrame((()=>{const t=e.getBoundingClientRect().height,n=e.scrollHeight-t>1;m(n),n||i(!1)}))}}),[f]);return o.jsxs(Te,{children:[o.jsxs(Fe,{children:[o.jsx(Ie,{size:"large",url:a}),o.jsx(ze,{tag:"h1",children:n})]}),f&&o.jsx(Re,{ref:g,className:"service-catalog-description",isCollapsed:r,dangerouslySetInnerHTML:{__html:f}}),l&&o.jsxs(Ae,{isLink:!0,onClick:()=>{i(!r)},children:[r?p("service-catalog.item.read-more","Read more"):p("service-catalog.item.read-less","Read less"),o.jsx(c.EndIcon,{children:r?o.jsx(h,{}):o.jsx(d,{})})]})]})},Ue=s(m.Header)`
  color: ${({theme:e})=>a({theme:e,hue:"successHue",shade:700})};
`,Ne=s.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
`,Me=s(m.Body)`
  padding-bottom: 48px;
`,He=s(p)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
`,Oe=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
`,De=s.div`
  display: flex;
  gap: ${e=>e.theme.space.xs};
`,Ve=s.div`
  display: flex;
  flex-direction: column;
`,Be=s(m.Footer)`
  padding: 32px 40px;
  border-top: 1px solid rgb(232, 234, 236);
`,Ge=({onCancel:e,onCreate:n,selectedUser:s,setSelectedUser:a})=>{const{t:r}=u(),[i,l]=t.useState(!1),d=t.useRef(null),[h,v]=t.useState(s),[x,y]=t.useState(s?.name??""),[w,_]=t.useState(!1),k=t.useRef(!1),{options:$,isLoadingOptions:C,searchUsers:S,clearOptions:q}=ne(h,(()=>{k.current=!1})),L=(e,t)=>{if(!t.trim())return e;const n=e.toLowerCase().indexOf(t.toLowerCase());if(-1===n)return e;const s=e.slice(0,n),a=e.slice(n,n+t.length),r=e.slice(n+t.length);return o.jsxs(o.Fragment,{children:[s,o.jsx("strong",{children:a}),r]})},E={id:"loading",name:r("service-catalog.change-user-modal.loading-users","Loading users..."),email:""},I={id:"no-results",name:r("service-catalog.change-user-modal.no-matches-found","Type to search"),email:""},T=t.useCallback((({type:e,inputValue:t,selectionValue:n})=>{if(void 0!==n){const e=$.find((e=>e.id===n));e&&"loading"!==e.id&&"no-results"!==e.id&&(v(e),y(e.name),l(!1),k.current=!1)}"input:change"===e&&void 0!==t&&(y(t),k.current=!0,t.trim().length>=3?S(t.trim()):(q(),v(null),k.current=!1))}),[$,S,q]),z=t.useCallback((()=>{if(!x.trim())return void(h&&(v(null),l(!1)));if(h&&(h.name.toLowerCase()===x.toLowerCase()||h.email.toLowerCase()===x.toLowerCase()))return;const e=$.find((e=>e.name.toLowerCase()===x.toLowerCase()));e&&(v(e),y(e.name),l(!1))}),[x,$,h]),R=t.useCallback((()=>{k.current||z()}),[z]),A=t.useCallback((e=>{"Enter"!==e.key||k.current||C||z()}),[C,z]),F=C?[E]:0===$.length?[I]:$;return o.jsxs(o.Fragment,{children:[o.jsx(Ue,{tag:"h2",children:r("service-catalog.change-user-modal.requester-title","Change requester")}),o.jsx(Me,{children:o.jsx(Ne,{children:o.jsx(o.Fragment,{children:o.jsxs(g,{children:[o.jsx(g.Label,{children:r("service-catalog.change-user-modal.select-requester-label","Select requester* (required)")}),o.jsx(f,{ref:d,inputValue:x,selectionValue:h?.id,onChange:T,validation:i?"error":void 0,"data-test-id":"user-autocomplete-input",isAutocomplete:!0,placeholder:r("service-catalog.change-user-modal.requester-search-placeholder","Search requesters..."),renderValue:()=>h?.name||"",inputProps:{onBlur:R,onKeyDown:A},children:F.length>0?F.map((e=>o.jsx(He,{value:e.id,label:e.name,isDisabled:"loading"===e.id||"no-results"===e.id,children:e.email?o.jsxs(De,{children:[o.jsx(j,{}),o.jsxs(Ve,{children:[o.jsx("span",{children:L(e.name,x)}),o.jsx(p.Meta,{children:o.jsx(b,{hue:"grey",children:e.email})})]})]}):o.jsx(Oe,{children:o.jsx("span",{children:e.name})})},e.id))):null}),i&&o.jsx(g.Message,{validation:"error",validationLabel:r("service-catalog.validation.error.aria.label","Error"),children:r("service-catalog.change-user-modal.requester-required","Select a requester")})]})})})}),o.jsxs(Be,{children:[o.jsx(m.FooterItem,{children:o.jsx(c,{onClick:e,isBasic:!0,"data-test-id":"cancel-button",children:r("service-catalog.change-user-modal.cancel","Cancel")})}),o.jsx(m.FooterItem,{children:o.jsx(c,{isPrimary:!0,onClick:async()=>{if(h){_(!0);try{await n(h.name,h.id),a(h)}catch(e){console.error("Error changing user:",e)}finally{_(!1)}}else l(!0)},disabled:w||!h,"data-test-id":"change-user-button",children:r("service-catalog.change-user-modal.change-user","Save")})})]})]})},Je=({onClose:e,onCreate:t,selectedUser:n,setSelectedUser:s})=>{const{t:a}=u();return o.jsxs(m,{onClose:e,focusOnMount:!1,children:[o.jsx(Ge,{onCancel:e,onCreate:async(e,n)=>{await t(e,n)},selectedUser:n,setSelectedUser:s}),o.jsx(v,{"aria-label":a("service-catalog.change-user-modal.close","Close dialog")})]})},Ke=s.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${e=>e.theme.space.md};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    flex-direction: column;
  }
`,We=s.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  margin-inline-end: ${e=>e.theme.space.xl};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`,Ze=s.div`
  flex: 1;
  padding: ${e=>e.theme.space.lg};
  border: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  height: fit-content;
  max-width: 360px;

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${({theme:e})=>a({theme:e,variable:"background.default"})};
    padding: ${e=>e.theme.space.lg};
    border: none;
    border-top: ${e=>e.theme.borders.sm}
      ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
    width: 100vw;
    margin-inline-start: 0;
  }
`,Xe=s.div`
  flex: 1;
  margin-inline-start: ${e=>e.theme.space.xl};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-inline-start: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`,Ye=s.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.lg};
  margin-inline-end: ${e=>e.theme.space.xl};
  min-width: 0;

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`,Qe=s(x)`
  width: 100%;
  height: 48px;
  display: block;
`,et=s.div`
  margin-bottom: 16px;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: ${e=>e.theme.space.xxs};
`,tt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,nt=s.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,st=e=>e.relationship_target_type===le,at=e=>e.relationship_target_type===ie;function rt({requestFields:e,serviceCatalogItem:n,baseLocale:s,locale:a,hasAtMentions:r,userRole:i,requesterId:l,requestOnBehalfEnabled:d,userName:h,selectedUser:m,setSelectedUser:g,brandId:f,defaultOrganizationId:j,handleChange:v,onSubmit:x,attachmentsOption:w,attachmentsRequiredError:_,setAttachmentsRequiredError:k,isRequestFieldsLoading:$,assetTypeError:C,assetError:S,assetTypeHiddenValue:q,isAssetTypeHidden:L,assetTypeIds:E,assetIds:I,onAttachmentUploadingChange:T,isFormInitializing:z,isPreviewMode:R=!1}){const{t:A}=u(),[F,P]=t.useState(!1),[U,N]=t.useState(h),M=()=>{P(!1)},H=async(e,t)=>{if(!Array.isArray(e)||0===e.length)return[];const n=e.map((e=>{const t={name:e.name,value:e.id,serialNumber:e.custom_object_fields["standard::serial_number"]};if("standard::itam_asset"===e.custom_object_key){const n=e.custom_object_fields??{};return{...t,item_asset_type_id:n["standard::asset_type"]??""}}return{...t,item_asset_type_id:""}}));if(at(t))return L?[]:E?.length?n.filter((e=>E.includes(e.value))):[];if(st(t)){let e=n;return I?.length&&(e=e.filter((e=>I.includes(e.item_asset_type_id??"")))),e}return n.map((({name:e,value:t,serialNumber:n})=>({name:e,value:t,serialNumber:n})))},O=e=>e.serialNumber?o.jsxs(o.Fragment,{children:[e.name,o.jsx(p.Meta,{children:o.jsx(b,{hue:"grey",children:A("service-catalog.item.serial-number-label","SN: {{serialNumber}}",{serialNumber:e.serialNumber})})})]}):e.name,D=t.useCallback((e=>{k(null),T(e)}),[k,T]);return o.jsxs(o.Fragment,{children:[o.jsxs(Ke,{onSubmit:x,noValidate:!0,children:[o.jsxs(Ye,{children:[o.jsx(Pe,{title:n.name,description:n.description,thumbnailUrl:n.thumbnail_url}),o.jsx(We,{children:(()=>{if($)return null;const n=w?.position_in_portal??e.length,c=w?o.jsx(se,{field:{name:oe,label:A("service-catalog.item.attachments-label","Upload a file"),description:w.description,error:_,attachments:[],isRequired:w.is_required},baseLocale:s,onUploadingChange:D},"attachments"):null,u=[];return e.forEach(((d,h)=>{if(c&&"number"==typeof n&&h===n&&u.push(c),at(d)&&L)return void u.push(o.jsxs(t.Fragment,{children:[o.jsx("input",{type:"hidden",name:d.name,value:q}),o.jsx("input",{type:"hidden",name:"isAssetTypeHidden",value:"true"})]},d.id));const m={...d,error:st(d)?S||d.error:at(d)&&C||d.error};u.push(o.jsx(ae,{field:m,baseLocale:s,locale:a,hasAtMentions:r,userRole:i,userId:l,brandId:f,defaultOrganizationId:j,handleChange:v,visibleFields:e,buildLookupFieldOptions:H,renderLookupFieldOption:O},d.id))})),c&&"number"==typeof n&&n>=e.length&&u.push(c),u})()})]}),o.jsx(Xe,{children:o.jsxs(Ze,{children:[o.jsxs(tt,{children:[o.jsxs(et,{children:[o.jsx(b,{isBold:!0,children:A("service-catalog.item.requester","Requester")}),o.jsx(nt,{children:U})]}),d&&o.jsx(o.Fragment,{children:o.jsx(y,{isUnderlined:!1,onClick:()=>{P(!0)},children:A("service-catalog.item.change-user-requesting-on-behalf","Change")})})]}),z?o.jsx(Qe,{}):o.jsx(c,{isPrimary:!0,size:"large",isStretched:!0,type:"submit",disabled:R,title:R?A("service-catalog.item.preview-mode.submit-disabled-tooltip","Submitting requests is disabled while previewing a draft"):void 0,children:A("service-catalog.item.submit-button","Submit request")})]})})]}),F&&o.jsx(Je,{onClose:M,onCreate:async e=>{N(e),M()},setSelectedUser:g,selectedUser:m})]})}const ot=s(w)`
  max-width: min(420px, calc(100vw - 32px));

  [data-garden-id="dropdowns.menu.item.content"] {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }
`,it=s(_)`
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
`;function lt({categories:e,selectedCategoryId:t,onCategoryChange:n}){const{t:s}=u();return e.length<2?null:o.jsx(ot,{button:e=>o.jsxs(c,{...e,isBasic:!0,children:[s("service-catalog.item.change-category","Change category"),o.jsx(c.EndIcon,{children:o.jsx(k,{})})]}),onChange:({value:e})=>{e&&n(e)},children:o.jsx($,{type:"radio",children:e.map((e=>o.jsxs(it,{value:e.id,isSelected:e.id===t,children:[e.name,e.path?.length>0&&o.jsx(_.Meta,{children:e.path.join(" > ")})]},e.id)))})})}const ct=s(C)`
  background: ${({theme:e})=>a({theme:e,hue:"blue",shade:200})};
  border-bottom: 1px solid
    ${({theme:e})=>a({theme:e,hue:"blue",shade:300})};
  color: ${({theme:e})=>a({theme:e,hue:"blue",shade:700})};
  box-shadow: none;

  svg {
    color: ${({theme:e})=>a({theme:e,hue:"blue",shade:600})};
  }
`,ut=s(C.Title)`
  color: ${({theme:e})=>a({theme:e,hue:"blue",shade:800})};
`;function dt(){const{t:e}=u(),[n,s]=t.useState(null),a=t.useRef("");return t.useEffect((()=>{const e=document.createElement("div");return e.setAttribute("data-preview-mode-banner-host","true"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.right="0",e.style.zIndex=String(S),a.current=document.body.style.paddingTop,document.body.prepend(e),s(e),()=>{e.remove(),document.body.style.paddingTop=a.current,s(null)}}),[]),t.useEffect((()=>{if(!n)return;let e="",t=null;const s=()=>{t=null;const s=`${n.offsetHeight}px`;s!==e&&(document.body.style.paddingTop=s,e=s)},r=()=>{null===t&&(t=window.requestAnimationFrame(s))};let o;return s(),"undefined"!=typeof ResizeObserver&&(o=new ResizeObserver(r),o.observe(n)),window.addEventListener("resize",r),()=>{null!==t&&window.cancelAnimationFrame(t),o?.disconnect(),window.removeEventListener("resize",r),document.body.style.paddingTop=a.current}}),[n]),n?q.createPortal(o.jsx("div",{"data-testid":"preview-mode-banner",children:o.jsx(ct,{type:"info",children:o.jsxs(C.Content,{children:[o.jsx(ut,{children:e("service-catalog.item.preview-mode.title","Preview mode")}),e("service-catalog.item.preview-mode.message","If you navigate away from this page or click on anything outside of this preview, you'll exit the preview mode.")]})})}),n):null}const ht=e=>Array.isArray(e)?e.map(String).map((e=>e.trim())).filter(Boolean):[],mt=e=>!0===e||1===e||"1"===e,pt=e=>{if(null==e||""===e)return null;const t=Number(e);return Number.isNaN(t)?null:t},gt=e=>{if(e)return{id:String(e.id),name:String(e.name??""),description:e.description??"",asset_filter_ids:ht(e.asset_filter_ids),is_required:mt(e.is_required)}},ft=e=>{if(e)return{id:String(e.id),name:String(e.name??""),description:e.description??"",asset_type_ids:ht(e.asset_type_ids),is_required:mt(e.is_required),is_hidden:mt(e.is_hidden)}},jt=e=>{if(e)return{id:String(e.id),name:String(e.name??""),description:e.description??"",is_required:mt(e.is_required),position_in_portal:pt(e.position_in_portal)}},bt=e=>({id:String(e.id),name:String(e.name??""),description:e.description??null,form_id:String(e.form_id??""),thumbnail_url:e.thumbnail_url??null,categories:e.categories??[],is_request_on_behalf:e.is_request_on_behalf??!1,published_at:e.published_at??null,asset_option:gt(e.asset_option),asset_type_option:ft(e.asset_type_option),attachment_option:jt(e.attachment_option)});const vt=async()=>{try{const e=await fetch("/api/v2/users/me.json");if(!e.ok)throw new Error("Error fetching current user data");return await e.json()}catch(e){throw new Error("Error fetching current user data")}},xt=(e,t,n)=>{const s=document.createElement("a");if(s.setAttribute("href",`${window.location.origin}${t}/services/${e.id}`),s.setAttribute("style","text-decoration: underline"),s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"),s.textContent=e.name,!n)return s.outerHTML;const a=document.createElement("p");a.setAttribute("style","margin:0;padding:0"),a.textContent=n.submitterLabel;const r=document.createElement("p");return r.setAttribute("style","margin:0;padding:0"),r.textContent=n.requesterLabel,`${s.outerHTML}${a.outerHTML}${r.outerHTML}`};function yt(e){return e.relationship_target_type===ie}function wt(e){return e.relationship_target_type===le}function _t(e){const{value:t}=e;return Array.isArray(t)?t.length>0:null!=t&&""!==t}const kt=s.div`
  display: flex;
  flex-direction: column;
`,$t=s(y)`
  text-decoration: underline;
  display: block;
  margin-top: ${e=>e.theme.space.xxs}px;
`,Ct=e=>e.relationship_target_type===ie,St=e=>e.relationship_target_type===le;function qt({serviceCatalogItemId:e,baseLocale:n,locale:s,hasAtMentions:a,userRole:r,organizations:i,userId:l,brandId:c,userName:d,helpCenterPath:h}){const{serviceCatalogItem:m,errorFetchingItem:p}=function(e){const[n,s]=t.useState(),[a,r]=t.useState(null);return t.useEffect((()=>{(async()=>{try{const t=await fetch(`/api/v2/help_center/service_catalog/items/${e}`);if(!t.ok)throw new Error("Error fetching service catalog item");{const e=await t.json();s(bt(e.service_catalog_item))}}catch(e){r(e)}})()}),[e]),{serviceCatalogItem:n,errorFetchingItem:a}}(e),{requestFields:g,associatedLookupField:f,categoryLookupField:j,error:b,setRequestFields:v,handleChange:x,isRequestFieldsLoading:y,assetTypeHiddenValue:w,isAssetTypeHidden:_,assetTypeIds:k,assetIds:$}=Le(m,n),{t:C}=u(),[S,I]=t.useState(null),[T,z]=t.useState(null);t.useEffect((()=>{if(!m?.categories?.length)return;const e=new URLSearchParams(window.location.search).get("category_id"),t=m.categories.find((t=>t.id===e));I(t?t.id:m.categories[0]?.id??null)}),[m]);const R=t.useCallback((e=>{I(e);const t=new URLSearchParams(window.location.search);t.set("category_id",e),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}),[]),A=m?.attachment_option,F=m?.is_request_on_behalf,P=T?Number(T.id):l,{validate:U}=function(e){const{t:n}=u();return{validate:t.useCallback(((t,s)=>{const a={attachments:null,assetType:null,asset:null,fields:{}};e?.is_required&&0===s.length&&(a.attachments=n("service-catalog.attachments-required-error","Upload a file to continue."));for(const e of t)e.required&&!_t(e)&&(yt(e)?a.assetType=n("service-catalog.asset-type-required-error","Select an asset type"):wt(e)?a.asset=n("service-catalog.asset-required-error","Select an asset"):a.fields[e.id]=n("service-catalog.field-required-error","This field is required"));return{hasError:Boolean(a.attachments||a.assetType||a.asset||Object.keys(a.fields).length>0),errors:a}}),[e,n])}}(A),[N,M]=t.useState(null),[H,O]=t.useState(null),[D,V]=t.useState(null),[B,G]=t.useState(!1),[J,K]=t.useState(!1);t.useEffect((()=>{const e=e=>{e.persisted&&G(!1)};return window.addEventListener("pageshow",e),()=>window.removeEventListener("pageshow",e)}),[]);const W=!m||y||!(!((m?.categories?.length??0)>0)||!!S),Z="undefined"!=typeof window&&new URLSearchParams(window.location.search).get(ue)===de,X=m?null===m.published_at:Z;t.useEffect((()=>{if("undefined"!=typeof document&&X)return document.documentElement.classList.add(ce),()=>{document.documentElement.classList.remove(ce)}}),[X]),t.useEffect((()=>{if("undefined"==typeof window||!m)return;const e=new URL(window.location.href),t=null===m.published_at,n=e.searchParams.get(ue)===de;t&&!n?(e.searchParams.set(ue,de),window.history.replaceState(null,"",e.toString())):!t&&n&&(e.searchParams.delete(ue),window.history.replaceState(null,"",e.toString()))}),[m]);const Y=!(X||W||B||J||!m||!f);if(b)throw b;if(p)throw p;function Q(e){E({type:"error",title:C("service-catalog.item.service-request-error-title","Service couldn't be submitted"),message:e??C("service-catalog.item.service-request-error-message","Give it a moment and try it again")})}async function ee(e){if(422===e?.status)try{await async function(e){const t=await e.json(),n=t?.details?.base??[];n.filter((e=>null!=e.field_id&&!g.some((t=>t.id===e.field_id)))).length>0?Q(o.jsxs(o.Fragment,{children:[C("service-catalog.item.service-request-refresh-message","Refresh the page and try again in a few seconds.")," ",o.jsx($t,{href:`${h}/services/${m.id}`,children:C("service-catalog.item.service-request-refresh-link-text","Refresh the page")})]})):n.length>0&&Q(C("service-catalog.item.service-request-form-errors-message","Check the form for errors and try again.")),v((e=>e.map((e=>{const t=n.find((t=>t.field_id===e.id));return{...e,error:t?.description||null}}))))}(e)}catch{Q()}else Q()}const te=i.length>0&&i[0]?.id?i[0]?.id?.toString():null,[ne,se]=t.useState(null);return t.useEffect((()=>{se(document.getElementById("category-selector"))}),[]),o.jsxs(kt,{children:[X&&o.jsx(dt,{}),ne&&m&&S&&m.categories.length>0&&q.createPortal(o.jsx(lt,{categories:m.categories,selectedCategoryId:S,onCategoryChange:R}),ne),m&&o.jsx(rt,{requestFields:g,isRequestFieldsLoading:y,serviceCatalogItem:m,baseLocale:n,locale:s,hasAtMentions:a,userRole:r,requesterId:P,requestOnBehalfEnabled:F,userName:d,selectedUser:T,setSelectedUser:z,brandId:c,defaultOrganizationId:te,handleChange:(e,t)=>{Ct(e)&&t?O(null):St(e)&&t&&V(null),x(e,t)},onSubmit:async e=>{if(e.preventDefault(),X)return;if(!Y)return void Q();const t=e.currentTarget,n=new FormData(t),s="true"===n.get("isAssetTypeHidden"),a=function(e){return e.getAll(oe).filter((e=>"string"==typeof e)).map((e=>JSON.parse(e)))}(n),r=g.map((e=>Ct(e)&&s?{...e,value:n.get(e.name)}:e));if(!function(e,t){const{hasError:n,errors:s}=U(e,t);return M(s.attachments),O(s.assetType),V(s.asset),v((e=>e.map((e=>({...e,error:s.fields[e.id]??null}))))),n}(r,a)&&m&&f){G(!0);try{const e=null!=T&&Number(T.id)!==l,t=e?Number(T.id):null,n=e&&T?{submitterLabel:C("service-catalog.item.submitter-label","Submitter: {{name}}",{name:d}),requesterLabel:C("service-catalog.item.requester-label","Requester: {{name}}",{name:T.name})}:null,s=await async function(e,t,n,s,a,r,o,i,l){try{const c=await vt(),u=s.map((e=>e.id)),d=t.map((e=>({id:e.id,value:e.value}))),h=[{id:n.id,value:e.id}];r&&o&&h.push({id:r.id,value:o});const m=c.user.id,p=null!=i&&i!==m;return await fetch("/hc/api/v2/service_catalog/requests",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":c.user.authenticity_token},body:JSON.stringify({request:{item_id:e.id,subject:`${e.name}`,comment:{html_body:xt(e,a,l),uploads:u},custom_fields:[...d,...h],...p?{requester_id:i,collaborators:[m]}:{}}})})}catch(e){return void console.error("Error submitting service request:",e)}}(m,r,f,a,h,j,S,t,n);if(s?.ok){L({type:"success",message:C("service-catalog.item.service-request-submitted","Service request submitted")});const e=await s.json();return void(window.location.href=`${h}/requests/${e.request.id}`)}await ee(s)}catch{}G(!1)}},attachmentsOption:A,attachmentsRequiredError:N,setAttachmentsRequiredError:M,assetTypeError:H,assetError:D,assetTypeHiddenValue:w,isAssetTypeHidden:_,assetTypeIds:k,assetIds:$,onAttachmentUploadingChange:K,isFormInitializing:W,isPreviewMode:X})]})}async function Lt(e,t,n){const{baseLocale:s,locale:a,helpCenterPath:r}=n;I(s),await T(a,s,[F("service-catalog",(e=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-ar.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es-cl.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/es-mx.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/es-pe.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/fr-dz.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/fr-mu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/gl.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/km.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/ky.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/ne.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/oc-es.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/oc.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/ro-md.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/si.json":return import("service-catalog-translations").then((function(e){return e.aw}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.ax}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ay}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.az}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.aA}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.aB}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.aC}));case"./translations/locales/sw-ke.json":return import("service-catalog-translations").then((function(e){return e.aD}));case"./translations/locales/ta.json":return import("service-catalog-translations").then((function(e){return e.aE}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.aF}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aG}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.aH}));case"./translations/locales/ur-pk.json":return import("service-catalog-translations").then((function(e){return e.aI}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.aJ}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.aK}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.aL}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.aM}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aN}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${e}.json`))),re,P]),q.render(o.jsx(z,{theme:R(t),children:o.jsx(A,{helpCenterPath:r,children:o.jsx(qt,{...n})})}),e)}const Et="all-categories-virtual-id",It="uncategorized-virtual-id";function Tt(e){return"all_services"===e.built_in||e.id===Et}function zt(e){return"uncategorized"===e.built_in||e.id===It}function Rt(e,t){for(const n of e){if(n.id===t)return n;if(n.children?.length){const e=Rt(n.children,t);if(e)return e}}return null}function At(e,t){for(const n of e){if(n.id===t)return[];if(n.children?.length){const e=At(n.children,t);if(null!==e)return[n.id,...e]}}return null}const Ft=s.div`
  width: 100%;
`,Pt=s.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${e=>20*Math.min(e.$nestingLevel,6)+"px"};
`,Ut=s.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-right: 12px;
  padding-left: ${e=>{const t=32+20*Math.min(e.$nestingLevel,6);return e.$hasChildren?"12px":`${t}px`}};
  cursor: pointer;
  background-color: ${e=>e.$active?`${a({theme:e.theme,hue:"blue",shade:600})}33`:"transparent"};
  border-radius: 4px;

  &:hover {
    background-color: ${e=>e.$active?`${a({theme:e.theme,hue:"blue",shade:600})}47`:`${a({theme:e.theme,hue:"blue",shade:600})}14`};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px
      ${e=>a({theme:e.theme,hue:"blue",shade:600})};
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px
      ${e=>a({theme:e.theme,hue:"blue",shade:600})};
  }
`,Nt=s.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  color: ${({theme:e})=>a({theme:e,hue:"grey",shade:600})};
  flex-shrink: 0;

  &:hover {
    color: ${({theme:e})=>a({theme:e,hue:"grey",shade:800})};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`,Mt=s.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 8px;
`,Ht=s.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ot=s.span`
  flex-shrink: 0;
  color: ${({theme:e})=>a({theme:e,hue:"grey",shade:600})};
`,Dt=({category:e,nestingLevel:t,expandedCategories:n,onToggleExpand:s,selectedCategoryId:a,onSelect:r})=>{const i=(e.children?.length??0)>0,l=n.has(e.id),c=Tt(e),d=zt(e),h=a===e.id,{t:m}=u(),p=c?m("service-catalog-sidebar.all-services","All services"):d?m("service-catalog-sidebar.uncategorized","Uncategorized"):e.name;return o.jsxs(o.Fragment,{children:[o.jsx(Ft,{children:o.jsx(Ut,{$active:h,$nestingLevel:t,$hasChildren:i,onClick:()=>r(e.id),tabIndex:0,role:"button",onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),r(e.id))},"data-test-id":c?"sidebar-all-services":`sidebar-category-${e.id}`,children:o.jsxs(Pt,{$nestingLevel:i?t:0,children:[i&&o.jsx(Nt,{onClick:t=>{t.stopPropagation(),s(e.id)},"aria-label":l?m("service-catalog-sidebar.collapse-category","Collapse category"):m("service-catalog-sidebar.expand-category","Expand category"),type:"button",children:l?o.jsx(U,{}):o.jsx(N,{})}),o.jsxs(Mt,{children:[o.jsx(Ht,{children:p}),"number"==typeof e.items_count&&o.jsx(Ot,{children:e.items_count})]})]})})}),i&&l&&o.jsx(o.Fragment,{children:e.children?.map((e=>o.jsx(Dt,{category:e,nestingLevel:t+1,selectedCategoryId:a,onSelect:r,expandedCategories:n,onToggleExpand:s},e.id)))})]})},Vt=s.div`
  width: ${250}px;
`,Bt=({categories:e,selectedCategoryId:n,onSelect:s})=>{const[a,r]=t.useState(new Set),i=t.useCallback((e=>{r((t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}))}),[]),l=t.useCallback((t=>{const n=new URLSearchParams(window.location.search);n.set("category_id",t),window.history.pushState({},"",`${window.location.pathname}?${n.toString()}`);const a=At(e,t);a?.length&&r((e=>{const t=new Set(e);for(const e of a)t.add(e);return t})),s(t)}),[e,s]);return t.useEffect((()=>{if(n){const t=At(e,n);return void(t?.length&&r((e=>{const n=new Set(e);for(const e of t)n.add(e);return n})))}const t=e[0];t&&s(t.id)}),[e,n,s]),o.jsx(Vt,{children:o.jsx("div",{children:e.map((e=>o.jsx(Dt,{category:e,nestingLevel:0,selectedCategoryId:n,onSelect:l,expandedCategories:a,onToggleExpand:i},e.id)))})})},Gt=s.div`
  height: 100%;
`,Jt=s.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${e=>e.theme.borderRadii.md};
  padding: ${e=>e.theme.space.md};
  border: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  color: ${({theme:e})=>a({theme:e,variable:"foreground.default"})};

  &:hover {
    border-color: ${e=>e.theme.colors.primaryHue};
  }

  &:hover,
  &:visited {
    text-decoration: none;
  }
`,Kt=s.div`
  font-size: ${e=>e.theme.fontSizes.md};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`,Wt=s.div`
  font-size: ${e=>e.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`,Zt=s.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${e=>e.theme.space.xxs};
  color: ${({theme:e})=>a({theme:e,variable:"foreground.default"})};
  margin-top: ${e=>e.theme.space.sm};
`,Xt=({serviceItem:e,helpCenterPath:n,selectedCategoryId:s})=>{const a=s?`${n}/services/${e.id}?category_id=${s}`:`${n}/services/${e.id}`,r=t.useMemo((()=>be(e.name||"")),[e.name]),i=t.useMemo((()=>be(e.description||"")),[e.description]);return o.jsx(Gt,{"data-testid":"service-catalog-list-item-container",children:o.jsxs(Jt,{href:a,children:[o.jsx(Ie,{size:"medium",url:e.thumbnail_url}),o.jsxs(Zt,{children:[o.jsx(Kt,{children:r}),o.jsx(Wt,{children:i})]})]})})},Yt=s.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  height: 100%;
  border-radius: ${e=>e.theme.borderRadii.md};
  padding: ${e=>e.theme.space.md};
  border: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
`,Qt=()=>o.jsx(Yt,{"aria-hidden":"true","data-testid":"service-catalog-list-item-skeleton",children:o.jsx(x,{width:"100%",height:"140px"})}),en=s(M)`
  padding: 0;
`,tn=s(M.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${e=>e.theme.space.md};
  }
`,nn=({count:e=8})=>{const t=Math.max(1,e);return o.jsx(en,{children:o.jsx(M.Row,{wrap:"wrap",children:Array.from({length:t},((e,t)=>o.jsx(tn,{xs:12,sm:6,md:4,lg:3,children:o.jsx(Qt,{})},t)))})})},sn=s.div`
  padding: ${e=>e.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,an=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${e=>e.theme.space.xxs};
`,rn=({helpCenterPath:e,searchInputValue:t})=>{const{t:n}=u();return o.jsxs(sn,{children:[o.jsxs(an,{children:[o.jsx(H,{children:n("service-catalog.empty-state.no-services","No services in sight")}),""===t?o.jsx(O,{children:n("service-catalog.empty-state.description","Once services are added to catalog, you'll find them here.")}):o.jsx(O,{children:n("service-catalog.empty-state.search-description","Enter your keywords in the search field.")})]}),""===t&&o.jsx(c,{isPrimary:!0,onClick:()=>{window.location.href=e},children:n("service-catalog.empty-state.go-to-homepage","Go to the homepage")})]})},on=s(D)`
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
`,ln=({onChange:e})=>{const{t:t}=u();return o.jsx(V,{content:t("service-catalog.clear-search","Clear search"),placement:"bottom",size:"small",children:o.jsx(on,{"aria-label":t("service-catalog.clear-search","Clear search"),size:"small",focusInset:!0,onClick:()=>e(""),children:o.jsx(B,{})})})},cn=s(G)`
  align-items: center;
  width: 320px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`,un=s(J)`
  padding-inline-end: ${e=>7*e.theme.space.base}px;
`,dn=({searchInputValue:e,isLoading:t,onChange:n})=>{const{t:s}=u();return o.jsxs(cn,{children:[o.jsx(cn.Label,{hidden:!0,children:s("service-catalog.search-services","Search for services")}),o.jsx(un,{start:o.jsx(K,{}),type:"search",autoComplete:"off",end:t&&e?o.jsx(W,{}):void 0,value:e,placeholder:s("service-catalog.search-services","Search for services"),onChange:e=>n(e.target.value)}),!t&&e&&o.jsx(ln,{onChange:n})]})},hn=16;const mn="name_asc",pn="sort",gn=new Set(["name_asc","name_desc","created_at_desc"]);function fn(e=window.location.search){const t=new URLSearchParams(e).get(pn);return function(e){return"string"==typeof e&&gn.has(e)}(t)?t:mn}function jn(e){switch(e){case"name_asc":return{sort_by:"name",sort_order:"asc"};case"name_desc":return{sort_by:"name",sort_order:"desc"};case"created_at_desc":return{sort_by:"created_at",sort_order:"desc"}}}const bn=s(c)`
  white-space: nowrap;
`;function vn({selectedOption:e,onChange:t}){const{t:n}=u(),s={name_asc:n("service-catalog.sort.name-asc","A-Z"),name_desc:n("service-catalog.sort.name-desc","Z-A"),created_at_desc:n("service-catalog.sort.newest","Newest")};return o.jsx(w,{button:t=>o.jsxs(bn,{...t,isBasic:!0,size:"small",children:[s[e],o.jsx(c.EndIcon,{children:o.jsx(k,{})})]}),onChange:({value:e})=>{e&&t(e)},children:o.jsxs($,{type:"radio","aria-label":n("service-catalog.sort.aria-label","Sort services"),children:[o.jsx(_,{value:"name_asc",isSelected:"name_asc"===e,children:s.name_asc}),o.jsx(_,{value:"name_desc",isSelected:"name_desc"===e,children:s.name_desc}),o.jsx(_,{value:"created_at_desc",isSelected:"created_at_desc"===e,children:s.created_at_desc})]})})}const xn=s(M.Col)`
  margin-bottom: ${e=>e.theme.space.md};
`,yn=s.div`
  gap: ${e=>6*e.theme.space.base+"px"};
  display: flex;
  flex-direction: column;
`,wn=s(M)`
  padding: 0;
`,_n=s(Z).attrs({tag:"h2",isBold:!0})`
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
`,kn=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
  flex-wrap: wrap;
`;function $n({helpCenterPath:e,selectedCategoryId:n,selectedCategoryName:s}){const[a,r]=t.useState(""),i=t.useRef(a);i.current=a;const[l,c]=t.useState(fn),d=t.useRef(l);d.current=l,t.useEffect((()=>{const e=()=>{const e=fn();e!==d.current&&c(e)};return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)}),[]);const{t:h}=u(),{serviceCatalogItems:m,meta:p,count:g,isLoading:f,errorFetchingItems:j,fetchServiceCatalogItems:b}=function(){const[e,n]=t.useState(null),[s,a]=t.useState(0),[r,o]=t.useState(!0),[i,l]=t.useState(null),[c,u]=t.useState([]),d=t.useCallback((async(e,t,s,r)=>{o(!0);const i=new URLSearchParams;if(i.set("page[size]",hn.toString()),t){const[e,n]=t.split("=");e&&n&&i.set(e,n)}e&&i.set("query",e),s&&i.set("category_id",String(s)),r&&(i.set("sort_by",r.sort_by),i.set("sort_order",r.sort_order));try{const e=await fetch(`/api/v2/help_center/service_catalog/items/search?${i.toString()}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();n(t.meta),u(t.service_catalog_items),a(t.count)}catch(e){l(e)}finally{o(!1)}}),[]);return{serviceCatalogItems:c,meta:e,count:s,isLoading:r,errorFetchingItems:i,fetchServiceCatalogItems:d}}();if(t.useEffect((()=>{j&&E({title:h("service-catalog.service-list-error-title","Services couldn't be loaded"),message:h("service-catalog.service-list-error-message","Give it a moment and try it again"),type:"error"})}),[j,h]),j)throw j;const v=t.useMemo((()=>X(((e,t,n,s)=>b(e,t,n,jn(s))),300)),[b]),x=function(e){return e?e===Et?null:e:null}(n),y=t.useRef(x),w=y.current!==x,_=t.useRef(0);f||(_.current=m.length);const k=w?void 0:_.current||void 0;t.useEffect((()=>{v.cancel(),y.current=x,b(i.current,null,x,jn(l))}),[b,x,l,v]),t.useEffect((()=>()=>v.cancel()),[v]);const $=s===Et?h("service-catalog-sidebar.all-services","All services"):s===It?h("service-catalog-sidebar.uncategorized","Uncategorized"):s;return o.jsxs(yn,{children:[$&&o.jsx(_n,{children:$}),o.jsx(dn,{searchInputValue:a,isLoading:f,onChange:e=>{r(e),v(e,null,x,l)}}),!w&&o.jsxs(kn,{children:[o.jsx("span",{children:h("service-catalog.service-count","{{count}} services",{"defaultValue.one":"{{count}} service",count:g})}),o.jsx(vn,{selectedOption:l,onChange:e=>{e!==l&&(!function(e){const t=new URLSearchParams(window.location.search);e===mn?t.delete(pn):t.set(pn,e);const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;window.history.pushState({},"",s)}(e),c(e))}})]}),f||w?o.jsx(nn,{count:k}):o.jsxs(o.Fragment,{children:[o.jsx(wn,{children:o.jsx(M.Row,{wrap:"wrap",children:m.map((t=>o.jsx(xn,{xs:12,sm:6,md:4,lg:3,children:o.jsx(Xt,{serviceItem:t,helpCenterPath:e,selectedCategoryId:x})},t.id)))})}),0===m.length&&o.jsx(rn,{helpCenterPath:e,searchInputValue:a}),p&&(p.before_cursor||p.after_cursor)&&o.jsxs(Y,{children:[o.jsx(Y.Previous,{onClick:()=>{p?.before_cursor&&b(a,"page[before]="+p.before_cursor,x,jn(l))},disabled:null===p.before_cursor,children:h("service-catalog.pagination.previous","Previous")}),o.jsx(Y.Next,{onClick:()=>{p?.after_cursor&&b(a,"page[after]="+p.after_cursor,x,jn(l))},disabled:null===p.after_cursor,children:h("service-catalog.pagination.next","Next")})]})]})]})}function Cn(){return new URLSearchParams(window.location.search).get("category_id")}const Sn=({helpCenterPath:e,categoryTree:n})=>{const s=n.length>0,[a,r]=t.useState(Cn);t.useEffect((()=>{const e=()=>{r(Cn())};return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)}),[]);const i=t.useMemo((()=>{if(!a||!s)return null;if(a===Et)return Et;if(a===It)return It;const e=Rt(n,a);return e?Tt(e)?Et:zt(e)?It:e.name:null}),[a,n,s]),l=t.useCallback((e=>{r(e)}),[]);return o.jsxs(o.Fragment,{children:[s&&o.jsx("aside",{className:"service-catalog-sidebar",children:o.jsx(Bt,{categories:(c=n,c.filter((e=>!zt(e)))),selectedCategoryId:a,onSelect:l})}),o.jsx("main",{className:"service-catalog-list",children:o.jsx($n,{helpCenterPath:e,selectedCategoryId:s?a:null,selectedCategoryName:i})})]});var c},qn=s.div`
  width: ${250}px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ln=s.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${e=>6*e.theme.space.base+"px"};
`,En=s(M)`
  padding: 0;
`,In=s(M.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${e=>e.theme.space.md};
  }
`,Tn=()=>o.jsxs(qn,{children:[o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"80%",height:"40px"}),o.jsx(x,{width:"80%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"})]}),zn=()=>o.jsxs(Ln,{children:[o.jsx(x,{width:"200px",height:"28px"}),o.jsx(x,{width:"320px",height:"40px"}),o.jsx(x,{width:"120px",height:"20px"}),o.jsx(En,{children:o.jsxs(M.Row,{wrap:"wrap",children:[o.jsx(In,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(In,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(In,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(In,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})})]})})]}),Rn=()=>o.jsxs(o.Fragment,{children:[o.jsx("aside",{className:"service-catalog-sidebar",children:o.jsx(Tn,{})}),o.jsx("main",{className:"service-catalog-list",children:o.jsx(zn,{})})]});async function An({publishedOnly:e}){try{const t=new URLSearchParams({published_only:String(e)}),n=await fetch(`/api/v2/help_center/service_catalog/categories?${t.toString()}`);if(n.ok){const e=await n.json();return Array.isArray(e.service_catalog_categories)?e.service_catalog_categories:[]}return[]}catch{return[]}}async function Fn(e,t,n,s,a){I(n);const r=R(t);q.render(o.jsx(z,{theme:r,children:o.jsx(Rn,{})}),e);const[,i]=await Promise.all([T(a,n,[F("service-catalog",(e=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-ar.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es-cl.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/es-mx.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/es-pe.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/fr-dz.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/fr-mu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/gl.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/km.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/ky.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/ne.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/oc-es.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/oc.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/ro-md.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/si.json":return import("service-catalog-translations").then((function(e){return e.aw}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.ax}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ay}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.az}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.aA}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.aB}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.aC}));case"./translations/locales/sw-ke.json":return import("service-catalog-translations").then((function(e){return e.aD}));case"./translations/locales/ta.json":return import("service-catalog-translations").then((function(e){return e.aE}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.aF}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aG}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.aH}));case"./translations/locales/ur-pk.json":return import("service-catalog-translations").then((function(e){return e.aI}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.aJ}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.aK}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.aL}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.aM}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aN}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${e}.json`))),re,P]),An({publishedOnly:!("undefined"!=typeof window&&new URLSearchParams(window.location.search).get(ue)===de)})]);q.render(o.jsx(z,{theme:r,children:o.jsx(A,{helpCenterPath:s,fallback:o.jsx("main",{className:"service-catalog-list",children:o.jsx(Q,{helpCenterPath:s})}),children:o.jsx(Sn,{helpCenterPath:s,categoryTree:i})})}),e)}export{Lt as renderServiceCatalogItem,Fn as renderServiceCatalogPage};
