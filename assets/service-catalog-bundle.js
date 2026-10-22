import{r as e,p as t,as as n,s,x as a,N as r,j as o,at as i,au as l,G as c,u,av as d,aw as h,w as m,O as p,b as g,c as f,ax as j,S as b,X as v,ao as x,A as y,aj as w,ai as _,am as k,ak as $,ay as C,az as S,a0 as q,H as L,n as E,Z as I,_ as T,a1 as A,a2 as R,aq as z,f as F,a3 as P,aA as U,aB as N,ab as M,aC as O,aD as H,aE as D,i as V,aF as B,F as G,M as J,a4 as K,Q as W,aG as Z,e as X,ap as Q,aH as Y}from"shared";import{g as ee,a as te,u as ne,A as se,R as ae,t as re}from"ticket-fields";const oe=(t,n)=>({fetchAssets:e.useCallback((async()=>{if(!t)return;const e=await fetch(`/api/v2/custom_objects/standard::service_catalog_asset_option/records/${t}`);if(!e.ok)throw new Error("Error fetching asset data");const n=await e.json();if(!n?.custom_object_record)throw new Error("Missing custom_object_record in asset response");const{name:s,custom_object_fields:a}=n.custom_object_record,r=a??{};return{assetIds:r["standard::asset_filter_ids"],assetDescription:r["standard::description"],assetName:s,isRequired:r["standard::is_required"]}}),[t]),fetchAssetTypes:e.useCallback((async()=>{if(!n)return;const e=await fetch(`/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/${n}`);if(!e.ok)throw new Error("Error fetching asset type data");const t=await e.json();if(!t?.custom_object_record)throw new Error("Missing custom_object_record in asset type response");const{name:s,custom_object_fields:a}=t.custom_object_record,r=a??{};return{assetTypeIds:r["standard::asset_type_ids"],isHiddenAssetsType:!!r["standard::is_hidden"],assetTypeDescription:r["standard::description"],assetTypeName:s,isRequired:r["standard::is_required"]}}),[n])});function ie(e){return t.sanitize(e,{ADD_ATTR:["target"]})}function le(e){if(!e)return"";return(new DOMParser).parseFromString(e,"text/html").body.textContent??""}const ce="attachments",ue="zen:custom_object:standard::itam_asset_type",de="zen:custom_object:standard::itam_asset",he="is-service-catalog-preview",me="preview",pe="true",ge="tf_",fe=2048,je=["true","false"],be=["pre","strong","b","p","blockquote","ul","ol","li","h2","h3","h4","i","em","br"],ve={priority:["priority","basic_priority"],type:["tickettype"]},xe=/^\d{4}-\d{2}-\d{2}$/,ye=/^[0-9A-HJKMNP-TV-Z]{26}$/i;function we(e,t){const n=e.trim();if(""!==n&&!Number.isNaN(Number(n))){const e=Number(n);return t.find((t=>t.id===e))}const s=ve[n];if(s)return t.find((e=>s.includes(e.type)))}function _e(e,n){const s=t.sanitize(n,{ALLOWED_TAGS:be});switch(e.type){case"partialcreditcard":{const e=s.replace(/\D/g,"");return e?e.slice(-4):void 0}case"multiselect":return s.split(",").filter((t=>e.options.some((e=>e.value===t))));case"checkbox":if(!je.includes(s))return;return"true"===s;case"date":return function(e){if(!xe.test(e))return!1;const t=new Date(e),[n,s,a]=e.split("-").map(Number);return t.getUTCFullYear()===n&&t.getUTCMonth()+1===s&&t.getUTCDate()===a}(s)?s:void 0;case"lookup":if(function(e){return e.relationship_target_type===de||e.relationship_target_type===ue}(e))return;if(!ye.test(s))return;return s;default:return s}}function ke(){return e.useMemo((()=>"undefined"==typeof window?new Map:function(e,t=e.length){const n=new Map;if(t>fe)return n;const s=new URLSearchParams(e);for(const[e,t]of s){if(!e.startsWith(ge))continue;const s=e.substring(ge.length);0!==s.length&&n.set(s,t)}return n}(window.location.search,window.location.href.length)),[])}const $e=(e,t)=>{let n=[];if(e?.assetTypeIds){const t=e.assetTypeIds;Array.isArray(t)?n=t.map(String):"string"==typeof t&&(n=t.split(",")),n=n.map((e=>e.trim())).filter(Boolean)}let s=[];if(t?.assetIds){const e=t.assetIds;"string"==typeof e?s=e.split(","):Array.isArray(e)&&(s=e.map(String)),s=s.map((e=>e.trim())).filter(Boolean)}const a=!!e?.isHiddenAssetsType;return{assetTypeIds:n,assetIds:s,isAssetTypeHidden:a,assetTypeHiddenValue:a&&n[0]?n[0]:"",assetTypeLabel:e?.assetTypeName,assetTypeDescription:e?.assetTypeDescription,assetTypeIsRequired:e?.isRequired||!1,assetLabel:t?.assetName,assetDescription:t?.assetDescription,assetIsRequired:t?.isRequired||!1}},Ce=e=>"tagger"===e.type?e.custom_field_options.find((e=>e.default))?.value??null:null,Se=["standard::service_catalog_item","standard::service_catalog_category"],qe=(e,t)=>e.map((e=>"zen:custom_object:standard::itam_asset_type"===e.relationship_target_type?{...e,label:t.assetTypeLabel||e.label,description:ie(t.assetTypeDescription||e.description),required:t.assetTypeIsRequired||e.required}:"zen:custom_object:standard::itam_asset"===e.relationship_target_type?{...e,label:t.assetLabel||e.label,description:ie(t.assetDescription||e.description),required:t.assetIsRequired||e.required}:e)),Le=async(e,t)=>{const[s,a]=await Promise.all([fetch(`/api/v2/ticket_forms/${e}`),fetch(`/api/v2/ticket_fields?locale=${t}`)]);if(!s.ok)throw new Error("Error fetching form data");if(!a.ok)throw new Error("Error fetching fields data");const r=await s.json(),o=await a.json();if(!r.ticket_form.active)throw new Error("Associated ticket form is not active");const i=r.ticket_form,l=i.ticket_field_ids,c=i.end_user_conditions||[],u=o.ticket_fields;let d=null,h=null;const m=l.map((e=>{const t=u.find((t=>t.id===e));return t&&"subject"!==t.type&&"description"!==t.type&&t.active&&t.editable_in_portal?"lookup"===t.type&&(e=>{const t=te(e.relationship_target_type);return Se.includes(t)})(t)?("standard::service_catalog_item"===te(t.relationship_target_type)?d=t:(e=>"standard::service_catalog_category"===te(e.relationship_target_type))(t)&&(h=t),null):(e=>{const{id:t,type:s,description:a,title_in_portal:r,custom_field_options:o,required_in_portal:i,relationship_target_type:l,relationship_filter:c}=e;return{id:t,type:s,name:`custom_fields_${t}`,description:ie(n(a)),label:r,options:o,required:i,relationship_target_type:l,relationship_filter:c,error:null,value:Ce(e)}})(t):null})).filter(Boolean);if(!d)throw new Error("Associated lookup field not found");return{requestFields:m,associatedLookupField:d,categoryLookupField:h,endUserConditions:c}};function Ee(t,n){const[s,a]=e.useState([]),[r,o]=e.useState([]),[i,l]=e.useState(),[c,u]=e.useState(null),[d,h]=e.useState(null),[m,p]=e.useState(!1),[g,f]=e.useState({assetTypeIds:[],assetIds:[],isAssetTypeHidden:!1,assetTypeHiddenValue:"",assetTypeIsRequired:!1,assetIsRequired:!1}),j=t?.custom_object_fields?.["standard::asset_option"],b=t?.custom_object_fields?.["standard::asset_type_option"],{fetchAssets:v,fetchAssetTypes:x}=oe(j??"",b??""),y=ke();e.useEffect((()=>{if(!t?.form_id)return;let e=!0;return(async()=>{p(!0),h(null);try{const[s,r,i]=await Promise.all([Le(t.form_id,n),x(),v()]);if(!e)return;const{requestFields:c,associatedLookupField:d,categoryLookupField:h,endUserConditions:m}=s,p=$e(r,i);f(p),l(d),u(h),o(m);const g=function(e,t){if(0===t.size)return e;const n=new Set;let s=e;for(const[e,a]of t){const t=we(e,s);if(!t||n.has(t.id))continue;const r=_e(t,a);void 0!==r&&(n.add(t.id),s=s.map((e=>e.id===t.id?{...e,value:r}:e)))}return s}(qe(c,p),y);a(g)}catch(t){e&&h(t)}finally{e&&p(!1)}})(),()=>{e=!1}}),[n,t?.form_id,v,x,y]);const w=e.useCallback(((e,t)=>{const n=s.map((n=>n.name===e.name?{...n,value:t,error:null}:n));a(n)}),[s]);return{requestFields:ee(s,r),associatedLookupField:i,categoryLookupField:c,error:d,setRequestFields:a,handleChange:w,isRequestFieldsLoading:m,assetTypeHiddenValue:g.assetTypeHiddenValue,isAssetTypeHidden:g.isAssetTypeHidden,assetTypeIds:g.assetTypeIds,assetIds:g.assetIds}}const Ie=s(r)`
  background-color: ${({theme:e})=>a({theme:e,hue:"grey",shade:100})};
  width: ${e=>"large"===e.size?72:40}px !important;
  height: ${e=>"large"===e.size?72:40}px !important;

  && > svg {
    width: ${e=>"large"===e.size?28:16}px;
    height: ${e=>"large"===e.size?28:16}px;
    color: ${({theme:e})=>a({theme:e,hue:"grey",shade:600})};
  }
`,Te=({size:e,url:t})=>o.jsx(Ie,{size:e,isSystem:!0,children:t?o.jsx("img",{src:t,alt:""}):o.jsx(i,{"aria-hidden":"true"})}),Ae=s.div`
  border-bottom: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  padding-bottom: ${e=>e.theme.space.lg};
  margin-inline-end: ${e=>e.theme.space.xl};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`,Re=s(l)`
  font-weight: ${e=>e.theme.fontWeights.semibold};
  margin-bottom: 0;
  overflow-wrap: break-word;
  max-width: 100%;
`,ze=s.div`
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
`,Fe=s(c)`
  margin-top: ${e=>e.theme.space.sm};
  font-size: ${e=>e.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`,Pe=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,Ue=({title:n,description:s,thumbnailUrl:a})=>{const[r,i]=e.useState(!0),[l,m]=e.useState(!1),{t:p}=u(),g=e.useRef(null),f=e.useMemo((()=>{return e=s??"",t.sanitize(e,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling","target","title"]});var e}),[s]);e.useEffect((()=>{const e=g.current;if(e){requestAnimationFrame((()=>{const t=e.getBoundingClientRect().height,n=e.scrollHeight-t>1;m(n),n||i(!1)}))}}),[f]);return o.jsxs(Ae,{children:[o.jsxs(Pe,{children:[o.jsx(Te,{size:"large",url:a}),o.jsx(Re,{tag:"h1",children:n})]}),f&&o.jsx(ze,{ref:g,className:"service-catalog-description",isCollapsed:r,dangerouslySetInnerHTML:{__html:f}}),l&&o.jsxs(Fe,{isLink:!0,onClick:()=>{i(!r)},children:[r?p("service-catalog.item.read-more","Read more"):p("service-catalog.item.read-less","Read less"),o.jsx(c.EndIcon,{children:r?o.jsx(h,{}):o.jsx(d,{})})]})]})},Ne=s(m.Header)`
  color: ${({theme:e})=>a({theme:e,hue:"successHue",shade:700})};
`,Me=s.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
`,Oe=s(m.Body)`
  padding-bottom: 48px;
`,He=s(p)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
`,De=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
`,Ve=s.div`
  display: flex;
  gap: ${e=>e.theme.space.xs};
`,Be=s.div`
  display: flex;
  flex-direction: column;
`,Ge=s(m.Footer)`
  padding: 32px 40px;
  border-top: 1px solid rgb(232, 234, 236);
`,Je=({onCancel:t,onCreate:n,selectedUser:s,setSelectedUser:a})=>{const{t:r}=u(),[i,l]=e.useState(!1),d=e.useRef(null),[h,v]=e.useState(s?.name??""),[x,y]=e.useState(!1),w=e.useRef(!1),{options:_,isLoadingOptions:k,searchUsers:$,clearOptions:C}=ne(s,(()=>{w.current=!1})),S=(e,t)=>{if(!t.trim())return e;const n=e.toLowerCase().indexOf(t.toLowerCase());if(-1===n)return e;const s=e.slice(0,n),a=e.slice(n,n+t.length),r=e.slice(n+t.length);return o.jsxs(o.Fragment,{children:[s,o.jsx("strong",{children:a}),r]})},q={id:"loading",name:r("service-catalog.change-user-modal.loading-users","Loading users..."),email:""},L={id:"no-results",name:r("service-catalog.change-user-modal.no-matches-found","Type to search"),email:""},E=e.useCallback((({type:e,inputValue:t,selectionValue:n})=>{if(void 0!==n){const e=_.find((e=>e.id===n));e&&"loading"!==e.id&&"no-results"!==e.id&&(a(e),v(e.name),l(!1),w.current=!1)}"input:change"===e&&void 0!==t&&(v(t),w.current=!0,t.trim().length>=3?$(t.trim()):(C(),a(null),w.current=!1))}),[_,$,C,a]),I=e.useCallback((()=>{if(!h.trim())return void(s&&(a(null),l(!1)));if(s&&(s.name.toLowerCase()===h.toLowerCase()||s.email.toLowerCase()===h.toLowerCase()))return;const e=_.find((e=>e.name.toLowerCase()===h.toLowerCase()));e&&(a(e),v(e.name),l(!1))}),[h,_,s]),T=e.useCallback((()=>{w.current||I()}),[I]),A=e.useCallback((e=>{"Enter"!==e.key||w.current||k||I()}),[k,I]),R=k?[q]:0===_.length?[L]:_;return o.jsxs(o.Fragment,{children:[o.jsx(Ne,{tag:"h2",children:r("service-catalog.change-user-modal.requester-title","Change requester")}),o.jsx(Oe,{children:o.jsx(Me,{children:o.jsx(o.Fragment,{children:o.jsxs(g,{children:[o.jsx(g.Label,{children:r("service-catalog.change-user-modal.select-requester-label","Select requester* (required)")}),o.jsx(f,{ref:d,inputValue:h,selectionValue:s?.id,onChange:E,validation:i?"error":void 0,"data-test-id":"user-autocomplete-input",isAutocomplete:!0,placeholder:r("service-catalog.change-user-modal.requester-search-placeholder","Search requesters..."),renderValue:()=>s?.name||"",inputProps:{onBlur:T,onKeyDown:A},children:R.length>0?R.map((e=>o.jsx(He,{value:e.id,label:e.name,isDisabled:"loading"===e.id||"no-results"===e.id,children:e.email?o.jsxs(Ve,{children:[o.jsx(j,{}),o.jsxs(Be,{children:[o.jsx("span",{children:S(e.name,h)}),o.jsx(p.Meta,{children:o.jsx(b,{hue:"grey",children:e.email})})]})]}):o.jsx(De,{children:o.jsx("span",{children:e.name})})},e.id))):null}),i&&o.jsx(g.Message,{validation:"error",validationLabel:r("service-catalog.validation.error.aria.label","Error"),children:r("service-catalog.change-user-modal.requester-required","Select a requester")})]})})})}),o.jsxs(Ge,{children:[o.jsx(m.FooterItem,{children:o.jsx(c,{onClick:t,isBasic:!0,"data-test-id":"cancel-button",children:r("service-catalog.change-user-modal.cancel","Cancel")})}),o.jsx(m.FooterItem,{children:o.jsx(c,{isPrimary:!0,onClick:async()=>{if(s){y(!0);try{await n(s.name,s.id)}catch(e){console.error("Error changing user:",e)}finally{y(!1)}}else l(!0)},disabled:x||!s,"data-test-id":"change-user-button",children:r("service-catalog.change-user-modal.change-user","Save")})})]})]})},Ke=({onClose:e,onCreate:t,selectedUser:n,setSelectedUser:s})=>{const{t:a}=u();return o.jsxs(m,{onClose:e,focusOnMount:!1,children:[o.jsx(Je,{onCancel:e,onCreate:async(e,n)=>{await t(e,n)},selectedUser:n,setSelectedUser:s}),o.jsx(v,{"aria-label":a("service-catalog.change-user-modal.close","Close dialog")})]})},We=s.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${e=>e.theme.space.md};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    flex-direction: column;
  }
`,Ze=s.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  margin-inline-end: ${e=>e.theme.space.xl};

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`,Xe=s.div`
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
`,Qe=s.div`
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
`,et=s(x)`
  width: 100%;
  height: 48px;
  display: block;
`,tt=s.div`
  margin-bottom: 16px;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: ${e=>e.theme.space.xxs};
`,nt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,st=s.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,at=e=>e.relationship_target_type===de,rt=e=>e.relationship_target_type===ue;function ot({requestFields:t,serviceCatalogItem:n,baseLocale:s,hasAtMentions:a,userRole:r,userId:i,requestOnBehalfEnabled:l,userName:d,selectedUser:h,setSelectedUser:m,brandId:g,defaultOrganizationId:f,handleChange:j,onSubmit:v,attachmentsOption:x,attachmentsRequiredError:w,setAttachmentsRequiredError:_,isRequestFieldsLoading:k,isLoadingAttachmentsOption:$,assetTypeError:C,assetError:S,assetTypeHiddenValue:q,isAssetTypeHidden:L,assetTypeIds:E,assetIds:I,onAttachmentUploadingChange:T,isFormInitializing:A,isPreviewMode:R=!1}){const{t:z}=u(),[F,P]=e.useState(!1),[U,N]=e.useState(d),M=()=>{P(!1)},O=async(e,t)=>{if(!Array.isArray(e)||0===e.length)return[];const n=e.map((e=>{const t={name:e.name,value:e.id,serialNumber:e.custom_object_fields["standard::serial_number"]};if("standard::itam_asset"===e.custom_object_key){const n=e.custom_object_fields??{};return{...t,item_asset_type_id:n["standard::asset_type"]??""}}return{...t,item_asset_type_id:""}}));if(rt(t))return L?[]:E?.length?n.filter((e=>E.includes(e.value))):[];if(at(t)){let e=n;return I?.length&&(e=e.filter((e=>I.includes(e.item_asset_type_id??"")))),e}return n.map((({name:e,value:t,serialNumber:n})=>({name:e,value:t,serialNumber:n})))},H=e=>e.serialNumber?o.jsxs(o.Fragment,{children:[e.name,o.jsx(p.Meta,{children:o.jsx(b,{hue:"grey",children:z("service-catalog.item.serial-number-label","SN: {{serialNumber}}",{serialNumber:e.serialNumber})})})]}):e.name,D=e.useCallback((e=>{_(null),T(e)}),[_,T]);return o.jsxs(o.Fragment,{children:[o.jsxs(We,{onSubmit:v,noValidate:!0,children:[o.jsxs(Ye,{children:[o.jsx(Ue,{title:n.name,description:n.description,thumbnailUrl:n.thumbnail_url}),o.jsx(Ze,{children:(()=>{if(k||$)return null;const n=x?.custom_object_fields?.["standard::position_in_portal"],l=x?o.jsx(se,{field:{name:ce,label:z("service-catalog.item.attachments-label","Upload a file"),description:x.custom_object_fields["standard::description"]??"",error:w,attachments:[],isRequired:x.custom_object_fields["standard::is_required"]??!1},baseLocale:s,onUploadingChange:D},"attachments"):null,c=[];return t.forEach(((u,d)=>{if(l&&"number"==typeof n&&d===n&&c.push(l),rt(u)&&L)return void c.push(o.jsxs(e.Fragment,{children:[o.jsx("input",{type:"hidden",name:u.name,value:q}),o.jsx("input",{type:"hidden",name:"isAssetTypeHidden",value:"true"})]},u.id));const h={...u,error:at(u)?S||u.error:rt(u)&&C||u.error};c.push(o.jsx(ae,{field:h,baseLocale:s,hasAtMentions:a,userRole:r,userId:i,brandId:g,defaultOrganizationId:f,handleChange:j,visibleFields:t,buildLookupFieldOptions:O,renderLookupFieldOption:H},u.id))})),l&&"number"==typeof n&&n>=t.length&&c.push(l),c})()})]}),o.jsx(Qe,{children:o.jsxs(Xe,{children:[o.jsxs(nt,{children:[o.jsxs(tt,{children:[o.jsx(b,{isBold:!0,children:z("service-catalog.item.requester","Requester")}),o.jsx(st,{children:U})]}),l&&o.jsx(o.Fragment,{children:o.jsx(y,{isUnderlined:!1,onClick:()=>{P(!0)},children:z("service-catalog.item.change-user-requesting-on-behalf","Change")})})]}),A?o.jsx(et,{}):o.jsx(c,{isPrimary:!0,size:"large",isStretched:!0,type:"submit",disabled:R,title:R?z("service-catalog.item.preview-mode.submit-disabled-tooltip","Submitting requests is disabled while previewing a draft"):void 0,children:z("service-catalog.item.submit-button","Submit request")})]})})]}),F&&o.jsx(Ke,{onClose:M,onCreate:async e=>{N(e),M()},setSelectedUser:m,selectedUser:h})]})}const it=s(w)`
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
`,lt=s(_)`
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
`;function ct({categories:e,selectedCategoryId:t,onCategoryChange:n}){const{t:s}=u();return e.length<2?null:o.jsx(it,{button:e=>o.jsxs(c,{...e,isBasic:!0,children:[s("service-catalog.item.change-category","Change category"),o.jsx(c.EndIcon,{children:o.jsx(k,{})})]}),onChange:({value:e})=>{e&&n(e)},children:o.jsx($,{type:"radio",children:e.map((e=>o.jsxs(lt,{value:e.id,isSelected:e.id===t,children:[e.name,e.path?.length>0&&o.jsx(_.Meta,{children:e.path.join(" > ")})]},e.id)))})})}const ut=s(C)`
  background: ${({theme:e})=>a({theme:e,hue:"blue",shade:200})};
  border-bottom: 1px solid
    ${({theme:e})=>a({theme:e,hue:"blue",shade:300})};
  color: ${({theme:e})=>a({theme:e,hue:"blue",shade:700})};
  box-shadow: none;

  svg {
    color: ${({theme:e})=>a({theme:e,hue:"blue",shade:600})};
  }
`,dt=s(C.Title)`
  color: ${({theme:e})=>a({theme:e,hue:"blue",shade:800})};
`;function ht(){const{t:t}=u(),[n,s]=e.useState(null),a=e.useRef("");return e.useEffect((()=>{const e=document.createElement("div");return e.setAttribute("data-preview-mode-banner-host","true"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.right="0",e.style.zIndex=String(S),a.current=document.body.style.paddingTop,document.body.prepend(e),s(e),()=>{e.remove(),document.body.style.paddingTop=a.current,s(null)}}),[]),e.useEffect((()=>{if(!n)return;let e="",t=null;const s=()=>{t=null;const s=`${n.offsetHeight}px`;s!==e&&(document.body.style.paddingTop=s,e=s)},r=()=>{null===t&&(t=window.requestAnimationFrame(s))};let o;return s(),"undefined"!=typeof ResizeObserver&&(o=new ResizeObserver(r),o.observe(n)),window.addEventListener("resize",r),()=>{null!==t&&window.cancelAnimationFrame(t),o?.disconnect(),window.removeEventListener("resize",r),document.body.style.paddingTop=a.current}}),[n]),n?q.createPortal(o.jsx("div",{"data-testid":"preview-mode-banner",children:o.jsx(ut,{type:"info",children:o.jsxs(C.Content,{children:[o.jsx(dt,{children:t("service-catalog.item.preview-mode.title","Preview mode")}),t("service-catalog.item.preview-mode.message","If you navigate away from this page or click on anything outside of this preview, you'll exit the preview mode.")]})})}),n):null}const mt=async()=>{try{const e=await fetch("/api/v2/users/me.json");if(!e.ok)throw new Error("Error fetching current user data");return await e.json()}catch(e){throw new Error("Error fetching current user data")}},pt=(e,t,n)=>{const s=document.createElement("a");if(s.setAttribute("href",`${window.location.origin}${t}/services/${e.id}`),s.setAttribute("style","text-decoration: underline"),s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"),s.textContent=e.name,!n)return s.outerHTML;const a=document.createElement("p");a.setAttribute("style","margin:0;padding:0"),a.textContent=n.submitterLabel;const r=document.createElement("p");return r.setAttribute("style","margin:0;padding:0"),r.textContent=n.requesterLabel,`${s.outerHTML}${a.outerHTML}${r.outerHTML}`};function gt(e){return e.relationship_target_type===ue}function ft(e){return e.relationship_target_type===de}function jt(e){const{value:t}=e;return Array.isArray(t)?t.length>0:null!=t&&""!==t}const bt=s.div`
  display: flex;
  flex-direction: column;
`,vt=s(y)`
  text-decoration: underline;
  display: block;
  margin-top: ${e=>e.theme.space.xxs}px;
`,xt=e=>e.relationship_target_type===ue,yt=e=>e.relationship_target_type===de;function wt({serviceCatalogItemId:t,baseLocale:n,hasAtMentions:s,userRole:a,organizations:r,userId:i,brandId:l,userName:c,helpCenterPath:d}){const{serviceCatalogItem:h,errorFetchingItem:m}=function(t){const[n,s]=e.useState(),[a,r]=e.useState(null);return e.useEffect((()=>{(async()=>{try{const e=await fetch(`/api/v2/help_center/service_catalog/items/${t}`);if(!e.ok)throw new Error("Error fetching service catalog item");{const t=await e.json();s(t.service_catalog_item)}}catch(e){r(e)}})()}),[t]),{serviceCatalogItem:n,errorFetchingItem:a}}(t),{requestFields:p,associatedLookupField:g,categoryLookupField:f,error:j,setRequestFields:b,handleChange:v,isRequestFieldsLoading:x,assetTypeHiddenValue:y,isAssetTypeHidden:w,assetTypeIds:_,assetIds:k}=Ee(h,n),{t:$}=u(),[C,S]=e.useState(null),[I,T]=e.useState(null);e.useEffect((()=>{if(!h?.categories?.length)return;const e=new URLSearchParams(window.location.search).get("category_id"),t=h.categories.find((t=>t.id===e));S(t?t.id:h.categories[0]?.id??null)}),[h]);const A=e.useCallback((e=>{S(e);const t=new URLSearchParams(window.location.search);t.set("category_id",e),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}),[]),R=h?.custom_object_fields?.["standard::attachment_option"],z=h?.is_request_on_behalf,{attachmentsOption:F,errorAttachmentsOption:P,isLoadingAttachmentsOption:U}=function(t){const[n,s]=e.useState(),[a,r]=e.useState(!1),[o,i]=e.useState(null);return e.useEffect((()=>{if(!t)return s(void 0),i(null),void r(!1);(async()=>{i(null),r(!1);try{const e=await fetch(`/api/v2/custom_objects/standard::service_catalog_attachment_option/records/${t}`);if(!e.ok)throw new Error("Error fetching service catalog item");{const t=await e.json();s(t.custom_object_record)}}catch(e){i(e)}finally{r(!1)}})()}),[t]),{attachmentsOption:n,errorAttachmentsOption:o,isLoadingAttachmentsOption:a}}(R),{validate:N}=function(t){const{t:n}=u();return{validate:e.useCallback(((e,s)=>{const a={attachments:null,assetType:null,asset:null,fields:{}};t&&t.custom_object_fields["standard::is_required"]&&0===s.length&&(a.attachments=n("service-catalog.attachments-required-error","Upload a file to continue."));for(const t of e)t.required&&!jt(t)&&(gt(t)?a.assetType=n("service-catalog.asset-type-required-error","Select an asset type"):ft(t)?a.asset=n("service-catalog.asset-required-error","Select an asset"):a.fields[t.id]=n("service-catalog.field-required-error","This field is required"));return{hasError:Boolean(a.attachments||a.assetType||a.asset||Object.keys(a.fields).length>0),errors:a}}),[t,n])}}(F),[M,O]=e.useState(null),[H,D]=e.useState(null),[V,B]=e.useState(null),[G,J]=e.useState(!1),[K,W]=e.useState(!1);e.useEffect((()=>{const e=e=>{e.persisted&&J(!1)};return window.addEventListener("pageshow",e),()=>window.removeEventListener("pageshow",e)}),[]);const Z=!h||x||U||!(!((h?.categories?.length??0)>0)||!!C),X="undefined"!=typeof window&&new URLSearchParams(window.location.search).get(me)===pe,Q=h?null===h.published_at:X;e.useEffect((()=>{if("undefined"!=typeof document&&Q)return document.documentElement.classList.add(he),()=>{document.documentElement.classList.remove(he)}}),[Q]),e.useEffect((()=>{if("undefined"==typeof window||!h)return;const e=new URL(window.location.href),t=null===h.published_at,n=e.searchParams.get(me)===pe;t&&!n?(e.searchParams.set(me,pe),window.history.replaceState(null,"",e.toString())):!t&&n&&(e.searchParams.delete(me),window.history.replaceState(null,"",e.toString()))}),[h]);const Y=!(Q||Z||G||K||!h||!g);if(j)throw j;if(m)throw m;if(P)throw P;function ee(e){E({type:"error",title:$("service-catalog.item.service-request-error-title","Service couldn't be submitted"),message:e??$("service-catalog.item.service-request-error-message","Give it a moment and try it again")})}async function te(e){if(422===e?.status)try{await async function(e){const t=await e.json(),n=t?.details?.base??[];n.filter((e=>null!=e.field_id&&!p.some((t=>t.id===e.field_id)))).length>0?ee(o.jsxs(o.Fragment,{children:[$("service-catalog.item.service-request-refresh-message","Refresh the page and try again in a few seconds.")," ",o.jsx(vt,{href:`${d}/services/${h.id}`,children:$("service-catalog.item.service-request-refresh-link-text","Refresh the page")})]})):n.length>0&&ee($("service-catalog.item.service-request-form-errors-message","Check the form for errors and try again.")),b((e=>e.map((e=>{const t=n.find((t=>t.field_id===e.id));return{...e,error:t?.description||null}}))))}(e)}catch{ee()}else ee()}const ne=r.length>0&&r[0]?.id?r[0]?.id?.toString():null,[se,ae]=e.useState(null);return e.useEffect((()=>{ae(document.getElementById("category-selector"))}),[]),o.jsxs(bt,{children:[Q&&o.jsx(ht,{}),se&&h&&C&&h.categories.length>0&&q.createPortal(o.jsx(ct,{categories:h.categories,selectedCategoryId:C,onCategoryChange:A}),se),h&&o.jsx(ot,{requestFields:p,isRequestFieldsLoading:x,isLoadingAttachmentsOption:U,serviceCatalogItem:h,baseLocale:n,hasAtMentions:s,userRole:a,userId:i,requestOnBehalfEnabled:z,userName:c,selectedUser:I,setSelectedUser:T,brandId:l,defaultOrganizationId:ne,handleChange:(e,t)=>{xt(e)&&t?D(null):yt(e)&&t&&B(null),v(e,t)},onSubmit:async e=>{if(e.preventDefault(),Q)return;if(!Y)return void ee();const t=e.currentTarget,n=new FormData(t),s="true"===n.get("isAssetTypeHidden"),a=function(e){return e.getAll(ce).filter((e=>"string"==typeof e)).map((e=>JSON.parse(e)))}(n),r=p.map((e=>xt(e)&&s?{...e,value:n.get(e.name)}:e));if(!function(e,t){const{hasError:n,errors:s}=N(e,t);return O(s.attachments),D(s.assetType),B(s.asset),b((e=>e.map((e=>({...e,error:s.fields[e.id]??null}))))),n}(r,a)&&h&&g){J(!0);try{const e=null!=I&&Number(I.id)!==i,t=e?Number(I.id):null,n=e&&I?{submitterLabel:$("service-catalog.item.submitter-label","Submitter: {{name}}",{name:c}),requesterLabel:$("service-catalog.item.requester-label","Requester: {{name}}",{name:I.name})}:null,s=await async function(e,t,n,s,a,r,o,i,l){try{const c=await mt(),u=s.map((e=>e.id)),d=t.map((e=>({id:e.id,value:e.value}))),h=[{id:n.id,value:e.id}];r&&o&&h.push({id:r.id,value:o});const m=c.user.id,p=null!=i&&i!==m;return await fetch("/hc/api/v2/service_catalog/requests",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":c.user.authenticity_token},body:JSON.stringify({request:{item_id:e.id,subject:`${e.name}`,comment:{html_body:pt(e,a,l),uploads:u},custom_fields:[...d,...h],...p?{requester_id:i,collaborators:[m]}:{}}})})}catch(e){return void console.error("Error submitting service request:",e)}}(h,r,g,a,d,f,C,t,n);if(s?.ok){L({type:"success",message:$("service-catalog.item.service-request-submitted","Service request submitted")});const e=await s.json();return void(window.location.href=`${d}/requests/${e.request.id}`)}await te(s)}catch{}J(!1)}},attachmentsOption:F,attachmentsRequiredError:M,setAttachmentsRequiredError:O,assetTypeError:H,assetError:V,assetTypeHiddenValue:y,isAssetTypeHidden:w,assetTypeIds:_,assetIds:k,onAttachmentUploadingChange:W,isFormInitializing:Z,isPreviewMode:Q})]})}async function _t(e,t,n){const{baseLocale:s,locale:a,helpCenterPath:r}=n;I(s),await T(a,s,[F("service-catalog",(e=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-ar.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es-cl.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/es-mx.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/es-pe.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/fr-dz.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/fr-mu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/gl.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/km.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/ky.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/ne.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/oc-es.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/oc.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/ro-md.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/si.json":return import("service-catalog-translations").then((function(e){return e.aw}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.ax}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ay}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.az}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.aA}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.aB}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.aC}));case"./translations/locales/sw-ke.json":return import("service-catalog-translations").then((function(e){return e.aD}));case"./translations/locales/ta.json":return import("service-catalog-translations").then((function(e){return e.aE}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.aF}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aG}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.aH}));case"./translations/locales/ur-pk.json":return import("service-catalog-translations").then((function(e){return e.aI}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.aJ}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.aK}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.aL}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.aM}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aN}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${e}.json`))),re,P]),q.render(o.jsx(A,{theme:R(t),children:o.jsx(z,{helpCenterPath:r,children:o.jsx(wt,{...n})})}),e)}const kt="all-categories-virtual-id",$t="uncategorized-virtual-id",Ct=s.div`
  width: 100%;
`,St=s.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${e=>20*Math.min(e.$nestingLevel,6)+"px"};
`,qt=s.div`
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
`,Lt=s.button`
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
`,Et=s.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 8px;
`,It=s.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Tt=s.span`
  flex-shrink: 0;
  color: ${({theme:e})=>a({theme:e,hue:"grey",shade:600})};
`,At=({category:e,nestingLevel:t,expandedCategories:n,onToggleExpand:s,selectedCategoryId:a,onSelect:r})=>{const i=(e.children?.length??0)>0,l=n.has(e.id),c=e.id===kt,d=e.id===$t,h=a===e.id,{t:m}=u(),p=c?m("service-catalog-sidebar.all-services","All services"):d?m("service-catalog-sidebar.uncategorized","Uncategorized"):e.name;return o.jsxs(o.Fragment,{children:[o.jsx(Ct,{children:o.jsx(qt,{$active:h,$nestingLevel:t,$hasChildren:i,onClick:()=>r(e.id),tabIndex:0,role:"button",onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),r(e.id))},"data-test-id":c?"sidebar-all-services":`sidebar-category-${e.id}`,children:o.jsxs(St,{$nestingLevel:i?t:0,children:[i&&o.jsx(Lt,{onClick:t=>{t.stopPropagation(),s(e.id)},"aria-label":l?m("service-catalog-sidebar.collapse-category","Collapse category"):m("service-catalog-sidebar.expand-category","Expand category"),type:"button",children:l?o.jsx(U,{}):o.jsx(N,{})}),o.jsxs(Et,{children:[o.jsx(It,{children:p}),"number"==typeof e.items_count&&o.jsx(Tt,{children:e.items_count})]})]})})}),i&&l&&o.jsx(o.Fragment,{children:e.children?.map((e=>o.jsx(At,{category:e,nestingLevel:t+1,selectedCategoryId:a,onSelect:r,expandedCategories:n,onToggleExpand:s},e.id)))})]})};function Rt(e,t){for(const n of e){if(n.id===t)return n;if(n.children?.length){const e=Rt(n.children,t);if(e)return e}}return null}function zt(e,t){for(const n of e){if(n.id===t)return[];if(n.children?.length){const e=zt(n.children,t);if(null!==e)return[n.id,...e]}}return null}const Ft=s.div`
  width: ${250}px;
`,Pt=({categories:t,selectedCategoryId:n,onSelect:s})=>{const[a,r]=e.useState(new Set),i=e.useCallback((e=>{r((t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}))}),[]),l=e.useCallback((e=>{const n=new URLSearchParams(window.location.search);n.set("category_id",e),window.history.pushState({},"",`${window.location.pathname}?${n.toString()}`);const a=zt(t,e);a?.length&&r((e=>{const t=new Set(e);for(const e of a)t.add(e);return t})),s(e)}),[t,s]);return e.useEffect((()=>{if(n){const e=zt(t,n);return void(e?.length&&r((t=>{const n=new Set(t);for(const t of e)n.add(t);return n})))}const e=t[0];e&&s(e.id)}),[t,n,s]),o.jsx(Ft,{children:o.jsx("div",{children:t.map((e=>o.jsx(At,{category:e,nestingLevel:0,selectedCategoryId:n,onSelect:l,expandedCategories:a,onToggleExpand:i},e.id)))})})},Ut=s.div`
  height: 100%;
`,Nt=s.a`
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
`,Mt=s.div`
  font-size: ${e=>e.theme.fontSizes.md};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`,Ot=s.div`
  font-size: ${e=>e.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`,Ht=s.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${e=>e.theme.space.xxs};
  color: ${({theme:e})=>a({theme:e,variable:"foreground.default"})};
  margin-top: ${e=>e.theme.space.sm};
`,Dt=({serviceItem:t,helpCenterPath:n,selectedCategoryId:s})=>{const a=s?`${n}/services/${t.id}?category_id=${s}`:`${n}/services/${t.id}`,r=e.useMemo((()=>le(t.name||"")),[t.name]),i=e.useMemo((()=>le(t.description||"")),[t.description]);return o.jsx(Ut,{"data-testid":"service-catalog-list-item-container",children:o.jsxs(Nt,{href:a,children:[o.jsx(Te,{size:"medium",url:t.thumbnail_url}),o.jsxs(Ht,{children:[o.jsx(Mt,{children:r}),o.jsx(Ot,{children:i})]})]})})},Vt=s.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
  height: 100%;
  border-radius: ${e=>e.theme.borderRadii.md};
  padding: ${e=>e.theme.space.md};
  border: ${e=>e.theme.borders.sm}
    ${({theme:e})=>a({theme:e,hue:"grey",shade:300})};
`,Bt=()=>o.jsx(Vt,{"aria-hidden":"true","data-testid":"service-catalog-list-item-skeleton",children:o.jsx(x,{width:"100%",height:"140px"})}),Gt=s(M)`
  padding: 0;
`,Jt=s(M.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${e=>e.theme.space.md};
  }
`,Kt=({count:e=8})=>{const t=Math.max(1,e);return o.jsx(Gt,{children:o.jsx(M.Row,{wrap:"wrap",children:Array.from({length:t},((e,t)=>o.jsx(Jt,{xs:12,sm:6,md:4,lg:3,children:o.jsx(Bt,{})},t)))})})},Wt=s.div`
  padding: ${e=>e.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,Zt=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${e=>e.theme.space.xxs};
`,Xt=({helpCenterPath:e,searchInputValue:t})=>{const{t:n}=u();return o.jsxs(Wt,{children:[o.jsxs(Zt,{children:[o.jsx(O,{children:n("service-catalog.empty-state.no-services","No services in sight")}),""===t?o.jsx(H,{children:n("service-catalog.empty-state.description","Once services are added to catalog, you'll find them here.")}):o.jsx(H,{children:n("service-catalog.empty-state.search-description","Enter your keywords in the search field.")})]}),""===t&&o.jsx(c,{isPrimary:!0,onClick:()=>{window.location.href=e},children:n("service-catalog.empty-state.go-to-homepage","Go to the homepage")})]})},Qt=s(D)`
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
`,Yt=({onChange:e})=>{const{t:t}=u();return o.jsx(V,{content:t("service-catalog.clear-search","Clear search"),placement:"bottom",size:"small",children:o.jsx(Qt,{"aria-label":t("service-catalog.clear-search","Clear search"),size:"small",focusInset:!0,onClick:()=>e(""),children:o.jsx(B,{})})})},en=s(G)`
  align-items: center;
  width: 320px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`,tn=s(J)`
  padding-inline-end: ${e=>7*e.theme.space.base}px;
`,nn=({searchInputValue:e,isLoading:t,onChange:n})=>{const{t:s}=u();return o.jsxs(en,{children:[o.jsx(en.Label,{hidden:!0,children:s("service-catalog.search-services","Search for services")}),o.jsx(tn,{start:o.jsx(K,{}),type:"search",autoComplete:"off",end:t&&e?o.jsx(W,{}):void 0,value:e,placeholder:s("service-catalog.search-services","Search for services"),onChange:e=>n(e.target.value)}),!t&&e&&o.jsx(Yt,{onChange:n})]})},sn=16;const an="name_asc",rn="sort",on=new Set(["name_asc","name_desc","created_at_desc"]);function ln(e=window.location.search){const t=new URLSearchParams(e).get(rn);return function(e){return"string"==typeof e&&on.has(e)}(t)?t:an}function cn(e){switch(e){case"name_asc":return{sort_by:"name",sort_order:"asc"};case"name_desc":return{sort_by:"name",sort_order:"desc"};case"created_at_desc":return{sort_by:"created_at",sort_order:"desc"}}}const un=s(c)`
  white-space: nowrap;
`;function dn({selectedOption:e,onChange:t}){const{t:n}=u(),s={name_asc:n("service-catalog.sort.name-asc","A-Z"),name_desc:n("service-catalog.sort.name-desc","Z-A"),created_at_desc:n("service-catalog.sort.newest","Newest")};return o.jsx(w,{button:t=>o.jsxs(un,{...t,isBasic:!0,size:"small",children:[s[e],o.jsx(c.EndIcon,{children:o.jsx(k,{})})]}),onChange:({value:e})=>{e&&t(e)},children:o.jsxs($,{type:"radio","aria-label":n("service-catalog.sort.aria-label","Sort services"),children:[o.jsx(_,{value:"name_asc",isSelected:"name_asc"===e,children:s.name_asc}),o.jsx(_,{value:"name_desc",isSelected:"name_desc"===e,children:s.name_desc}),o.jsx(_,{value:"created_at_desc",isSelected:"created_at_desc"===e,children:s.created_at_desc})]})})}const hn=s(M.Col)`
  margin-bottom: ${e=>e.theme.space.md};
`,mn=s.div`
  gap: ${e=>6*e.theme.space.base+"px"};
  display: flex;
  flex-direction: column;
`,pn=s(M)`
  padding: 0;
`,gn=s(Z).attrs({tag:"h2",isBold:!0})`
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
`,fn=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
  flex-wrap: wrap;
`;function jn({helpCenterPath:t,selectedCategoryId:n,selectedCategoryName:s}){const[a,r]=e.useState(""),i=e.useRef(a);i.current=a;const[l,c]=e.useState(ln),d=e.useRef(l);d.current=l,e.useEffect((()=>{const e=()=>{const e=ln();e!==d.current&&c(e)};return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)}),[]);const{t:h}=u(),{serviceCatalogItems:m,meta:p,count:g,isLoading:f,errorFetchingItems:j,fetchServiceCatalogItems:b}=function(){const[t,n]=e.useState(null),[s,a]=e.useState(0),[r,o]=e.useState(!0),[i,l]=e.useState(null),[c,u]=e.useState([]),d=e.useCallback((async(e,t,s,r)=>{o(!0);const i=new URLSearchParams;if(i.set("page[size]",sn.toString()),t){const[e,n]=t.split("=");e&&n&&i.set(e,n)}e&&i.set("query",e),s&&i.set("category_id",String(s)),r&&(i.set("sort_by",r.sort_by),i.set("sort_order",r.sort_order));try{const e=await fetch(`/api/v2/help_center/service_catalog/items/search?${i.toString()}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();n(t.meta),u(t.service_catalog_items),a(t.count)}catch(e){l(e)}finally{o(!1)}}),[]);return{serviceCatalogItems:c,meta:t,count:s,isLoading:r,errorFetchingItems:i,fetchServiceCatalogItems:d}}();if(e.useEffect((()=>{j&&E({title:h("service-catalog.service-list-error-title","Services couldn't be loaded"),message:h("service-catalog.service-list-error-message","Give it a moment and try it again"),type:"error"})}),[j,h]),j)throw j;const v=e.useMemo((()=>X(((e,t,n,s)=>b(e,t,n,cn(s))),300)),[b]),x=function(e){return e?e===kt?null:e:null}(n),y=e.useRef(x),w=y.current!==x,_=e.useRef(0);f||(_.current=m.length);const k=w?void 0:_.current||void 0;e.useEffect((()=>{v.cancel(),y.current=x,b(i.current,null,x,cn(l))}),[b,x,l,v]),e.useEffect((()=>()=>v.cancel()),[v]);const $=s===kt?h("service-catalog-sidebar.all-services","All services"):s===$t?h("service-catalog-sidebar.uncategorized","Uncategorized"):s;return o.jsxs(mn,{children:[$&&o.jsx(gn,{children:$}),o.jsx(nn,{searchInputValue:a,isLoading:f,onChange:e=>{r(e),v(e,null,x,l)}}),!w&&o.jsxs(fn,{children:[o.jsx("span",{children:h("service-catalog.service-count","{{count}} services",{"defaultValue.one":"{{count}} service",count:g})}),o.jsx(dn,{selectedOption:l,onChange:e=>{e!==l&&(!function(e){const t=new URLSearchParams(window.location.search);e===an?t.delete(rn):t.set(rn,e);const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;window.history.pushState({},"",s)}(e),c(e))}})]}),f||w?o.jsx(Kt,{count:k}):o.jsxs(o.Fragment,{children:[o.jsx(pn,{children:o.jsx(M.Row,{wrap:"wrap",children:m.map((e=>o.jsx(hn,{xs:12,sm:6,md:4,lg:3,children:o.jsx(Dt,{serviceItem:e,helpCenterPath:t,selectedCategoryId:x})},e.id)))})}),0===m.length&&o.jsx(Xt,{helpCenterPath:t,searchInputValue:a}),p&&(p.before_cursor||p.after_cursor)&&o.jsxs(Q,{children:[o.jsx(Q.Previous,{onClick:()=>{p?.before_cursor&&b(a,"page[before]="+p.before_cursor,x,cn(l))},disabled:null===p.before_cursor,children:h("service-catalog.pagination.previous","Previous")}),o.jsx(Q.Next,{onClick:()=>{p?.after_cursor&&b(a,"page[after]="+p.after_cursor,x,cn(l))},disabled:null===p.after_cursor,children:h("service-catalog.pagination.next","Next")})]})]})]})}function bn(){return new URLSearchParams(window.location.search).get("category_id")}const vn=({helpCenterPath:t,categoryTree:n})=>{const s=n.length>0,[a,r]=e.useState(bn);e.useEffect((()=>{const e=()=>{r(bn())};return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)}),[]);const i=e.useMemo((()=>{if(!a||!s)return null;if(a===kt)return kt;if(a===$t)return $t;const e=Rt(n,a);return e?.name??null}),[a,n,s]),l=e.useCallback((e=>{r(e)}),[]);return o.jsxs(o.Fragment,{children:[s&&o.jsx("aside",{className:"service-catalog-sidebar",children:o.jsx(Pt,{categories:(c=n,c.filter((e=>e.id!==$t))),selectedCategoryId:a,onSelect:l})}),o.jsx("main",{className:"service-catalog-list",children:o.jsx(jn,{helpCenterPath:t,selectedCategoryId:s?a:null,selectedCategoryName:i})})]});var c},xn=s.div`
  width: ${250}px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,yn=s.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${e=>6*e.theme.space.base+"px"};
`,wn=s(M)`
  padding: 0;
`,_n=s(M.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${e=>e.theme.space.md};
  }
`,kn=()=>o.jsxs(xn,{children:[o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"}),o.jsx(x,{width:"80%",height:"40px"}),o.jsx(x,{width:"80%",height:"40px"}),o.jsx(x,{width:"100%",height:"40px"})]}),$n=()=>o.jsxs(yn,{children:[o.jsx(x,{width:"200px",height:"28px"}),o.jsx(x,{width:"320px",height:"40px"}),o.jsx(x,{width:"120px",height:"20px"}),o.jsx(wn,{children:o.jsxs(M.Row,{wrap:"wrap",children:[o.jsx(_n,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(_n,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(_n,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})}),o.jsx(_n,{xs:12,sm:6,md:4,lg:3,children:o.jsx(x,{width:"100%",height:"140px"})})]})})]}),Cn=()=>o.jsxs(o.Fragment,{children:[o.jsx("aside",{className:"service-catalog-sidebar",children:o.jsx(kn,{})}),o.jsx("main",{className:"service-catalog-list",children:o.jsx($n,{})})]});async function Sn({publishedOnly:e}){try{const t=new URLSearchParams({published_only:String(e)}),n=await fetch(`/api/v2/help_center/service_catalog/categories?${t.toString()}`);if(n.ok){const e=await n.json();return Array.isArray(e.service_catalog_categories)?e.service_catalog_categories:[]}return[]}catch{return[]}}async function qn(e,t,n,s,a){I(n);const r=R(t);q.render(o.jsx(A,{theme:r,children:o.jsx(Cn,{})}),e);const[,i]=await Promise.all([T(a,n,[F("service-catalog",(e=>function(e){switch(e){case"./translations/locales/af.json":return import("service-catalog-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("service-catalog-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("service-catalog-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("service-catalog-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("service-catalog-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("service-catalog-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("service-catalog-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("service-catalog-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("service-catalog-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("service-catalog-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("service-catalog-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("service-catalog-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("service-catalog-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("service-catalog-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("service-catalog-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("service-catalog-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("service-catalog-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("service-catalog-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("service-catalog-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("service-catalog-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("service-catalog-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("service-catalog-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("service-catalog-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("service-catalog-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("service-catalog-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("service-catalog-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("service-catalog-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("service-catalog-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("service-catalog-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("service-catalog-translations").then((function(e){return e.E}));case"./translations/locales/es-ar.json":return import("service-catalog-translations").then((function(e){return e.F}));case"./translations/locales/es-cl.json":return import("service-catalog-translations").then((function(e){return e.G}));case"./translations/locales/es-es.json":return import("service-catalog-translations").then((function(e){return e.H}));case"./translations/locales/es-mx.json":return import("service-catalog-translations").then((function(e){return e.I}));case"./translations/locales/es-pe.json":return import("service-catalog-translations").then((function(e){return e.J}));case"./translations/locales/es.json":return import("service-catalog-translations").then((function(e){return e.K}));case"./translations/locales/et.json":return import("service-catalog-translations").then((function(e){return e.L}));case"./translations/locales/eu.json":return import("service-catalog-translations").then((function(e){return e.M}));case"./translations/locales/fa-af.json":return import("service-catalog-translations").then((function(e){return e.N}));case"./translations/locales/fa.json":return import("service-catalog-translations").then((function(e){return e.O}));case"./translations/locales/fi.json":return import("service-catalog-translations").then((function(e){return e.P}));case"./translations/locales/fil.json":return import("service-catalog-translations").then((function(e){return e.Q}));case"./translations/locales/fo.json":return import("service-catalog-translations").then((function(e){return e.R}));case"./translations/locales/fr-ca.json":return import("service-catalog-translations").then((function(e){return e.S}));case"./translations/locales/fr-dz.json":return import("service-catalog-translations").then((function(e){return e.T}));case"./translations/locales/fr-mu.json":return import("service-catalog-translations").then((function(e){return e.U}));case"./translations/locales/fr.json":return import("service-catalog-translations").then((function(e){return e.V}));case"./translations/locales/ga.json":return import("service-catalog-translations").then((function(e){return e.W}));case"./translations/locales/gl.json":return import("service-catalog-translations").then((function(e){return e.X}));case"./translations/locales/he.json":return import("service-catalog-translations").then((function(e){return e.Y}));case"./translations/locales/hi.json":return import("service-catalog-translations").then((function(e){return e.Z}));case"./translations/locales/hr.json":return import("service-catalog-translations").then((function(e){return e._}));case"./translations/locales/hu.json":return import("service-catalog-translations").then((function(e){return e.$}));case"./translations/locales/hy.json":return import("service-catalog-translations").then((function(e){return e.a0}));case"./translations/locales/id.json":return import("service-catalog-translations").then((function(e){return e.a1}));case"./translations/locales/is.json":return import("service-catalog-translations").then((function(e){return e.a2}));case"./translations/locales/it-ch.json":return import("service-catalog-translations").then((function(e){return e.a3}));case"./translations/locales/it.json":return import("service-catalog-translations").then((function(e){return e.a4}));case"./translations/locales/ja.json":return import("service-catalog-translations").then((function(e){return e.a5}));case"./translations/locales/ka.json":return import("service-catalog-translations").then((function(e){return e.a6}));case"./translations/locales/kk.json":return import("service-catalog-translations").then((function(e){return e.a7}));case"./translations/locales/kl-dk.json":return import("service-catalog-translations").then((function(e){return e.a8}));case"./translations/locales/km.json":return import("service-catalog-translations").then((function(e){return e.a9}));case"./translations/locales/ko.json":return import("service-catalog-translations").then((function(e){return e.aa}));case"./translations/locales/ku.json":return import("service-catalog-translations").then((function(e){return e.ab}));case"./translations/locales/ky.json":return import("service-catalog-translations").then((function(e){return e.ac}));case"./translations/locales/lt.json":return import("service-catalog-translations").then((function(e){return e.ad}));case"./translations/locales/lv.json":return import("service-catalog-translations").then((function(e){return e.ae}));case"./translations/locales/mk.json":return import("service-catalog-translations").then((function(e){return e.af}));case"./translations/locales/mn.json":return import("service-catalog-translations").then((function(e){return e.ag}));case"./translations/locales/ms.json":return import("service-catalog-translations").then((function(e){return e.ah}));case"./translations/locales/mt.json":return import("service-catalog-translations").then((function(e){return e.ai}));case"./translations/locales/my.json":return import("service-catalog-translations").then((function(e){return e.aj}));case"./translations/locales/ne.json":return import("service-catalog-translations").then((function(e){return e.ak}));case"./translations/locales/nl-be.json":return import("service-catalog-translations").then((function(e){return e.al}));case"./translations/locales/nl.json":return import("service-catalog-translations").then((function(e){return e.am}));case"./translations/locales/no.json":return import("service-catalog-translations").then((function(e){return e.an}));case"./translations/locales/oc-es.json":return import("service-catalog-translations").then((function(e){return e.ao}));case"./translations/locales/oc.json":return import("service-catalog-translations").then((function(e){return e.ap}));case"./translations/locales/pl.json":return import("service-catalog-translations").then((function(e){return e.aq}));case"./translations/locales/pt-br.json":return import("service-catalog-translations").then((function(e){return e.ar}));case"./translations/locales/pt.json":return import("service-catalog-translations").then((function(e){return e.as}));case"./translations/locales/ro-md.json":return import("service-catalog-translations").then((function(e){return e.at}));case"./translations/locales/ro.json":return import("service-catalog-translations").then((function(e){return e.au}));case"./translations/locales/ru.json":return import("service-catalog-translations").then((function(e){return e.av}));case"./translations/locales/si.json":return import("service-catalog-translations").then((function(e){return e.aw}));case"./translations/locales/sk.json":return import("service-catalog-translations").then((function(e){return e.ax}));case"./translations/locales/sl.json":return import("service-catalog-translations").then((function(e){return e.ay}));case"./translations/locales/sq.json":return import("service-catalog-translations").then((function(e){return e.az}));case"./translations/locales/sr-me.json":return import("service-catalog-translations").then((function(e){return e.aA}));case"./translations/locales/sr.json":return import("service-catalog-translations").then((function(e){return e.aB}));case"./translations/locales/sv.json":return import("service-catalog-translations").then((function(e){return e.aC}));case"./translations/locales/sw-ke.json":return import("service-catalog-translations").then((function(e){return e.aD}));case"./translations/locales/ta.json":return import("service-catalog-translations").then((function(e){return e.aE}));case"./translations/locales/th.json":return import("service-catalog-translations").then((function(e){return e.aF}));case"./translations/locales/tr.json":return import("service-catalog-translations").then((function(e){return e.aG}));case"./translations/locales/uk.json":return import("service-catalog-translations").then((function(e){return e.aH}));case"./translations/locales/ur-pk.json":return import("service-catalog-translations").then((function(e){return e.aI}));case"./translations/locales/ur.json":return import("service-catalog-translations").then((function(e){return e.aJ}));case"./translations/locales/uz.json":return import("service-catalog-translations").then((function(e){return e.aK}));case"./translations/locales/vi.json":return import("service-catalog-translations").then((function(e){return e.aL}));case"./translations/locales/zh-cn.json":return import("service-catalog-translations").then((function(e){return e.aM}));case"./translations/locales/zh-tw.json":return import("service-catalog-translations").then((function(e){return e.aN}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${e}.json`))),re,P]),Sn({publishedOnly:!("undefined"!=typeof window&&new URLSearchParams(window.location.search).get(me)===pe)})]);q.render(o.jsx(A,{theme:r,children:o.jsx(z,{helpCenterPath:s,fallback:o.jsx("main",{className:"service-catalog-list",children:o.jsx(Y,{helpCenterPath:s})}),children:o.jsx(vn,{helpCenterPath:s,categoryTree:i})})}),e)}export{_t as renderServiceCatalogItem,qn as renderServiceCatalogPage};
