import{j as s,r as d,J as m}from"./index-b0e24987.js";import{s as p,u as f,M as y,c as w,d as j,f as N,h as v,a as b,b as k,o as M,p as _,B as C,r as S,D as B,q as D}from"./App-1f28e85f.js";import{S as E}from"./ShowJobsInMap-0c19128c.js";async function L({category_id:n,city_ids:t,key:r}){return await p({type:4,city_id:t,category_id:n,key:r})}function z({children:n}){const{isOpen:t,onOpen:r,onClose:l}=f();return s.jsxs(s.Fragment,{children:[s.jsx("div",{onClick:r,children:n}),s.jsxs(y,{size:["sm","lg"],isOpen:t,onClose:l,children:[s.jsx(w,{}),s.jsxs(j,{children:[s.jsx(N,{left:"8px",right:"unset"}),s.jsxs(v,{pb:"12px",children:[s.jsxs("p",{className:"text-sm text-slate-800 font-[vazirMedium] mt-8 leading-6",children:["کاربر گرامی,",s.jsx("br",{}),"با نشان دادن اپلیکیشن کوجو برروی گوشی خود در هنگام خرید, می توانید از درصد تخفیف ذکر شده برای هریک از مشاغل این قسمت استفاده کنید.",s.jsx("br",{}),'همچنین درصورت مشاهده تخلف فروشنده, میتوانید از قسمت "گزارش ناهمخوانی اطلاعات" در صفحه همان کسب و کار, موارد را اطلاع دهید.']}),s.jsx("button",{onClick:l,className:"primary-btn block w-max mx-auto mt-7",children:"متوجه شدم"})]})]})]})]})}function F({className:n}){var u,g;const[t,r,l]=b(e=>[e.data.key,e.data.category_id,e.data.city_id]),{data:a,error:c,isLoading:o,mutate:x}=k("search/discounts",async()=>L({category_id:r,city_ids:l,key:t}),{shouldRetryOnError:!1}),[h,i]=d.useState(o);return d.useEffect(()=>{i(!0),x().then(()=>i(!1))},[t]),d.useEffect(()=>{i(!0),x().then(()=>i(!1))},[l,r]),o?s.jsx(M,{}):c?s.jsx("p",{children:"somehting went wrong"}):s.jsxs("div",{className:"w-full h-max",children:[s.jsxs("div",{className:"fixed z-30 bottom-4 left-4  flex items-center gap-x-3",children:[((u=a==null?void 0:a.data)==null?void 0:u.length)>0?s.jsx(E,{latlng:(g=a==null?void 0:a.data)==null?void 0:g.map(e=>({title:e==null?void 0:e.title,latlng:new _.LatLng(e==null?void 0:e.lat,e==null?void 0:e.lng)})),children:s.jsx("div",{className:`p-3 rounded-xl bg-blue-500\r
                shadow-md shadow-black/10 grid place-items-center cursor-pointer`,children:s.jsx(C,{className:"w-4 h-4 fill-gray-50"})})}):null,s.jsx("div",{className:`p-3 rounded-xl bg-blue-500\r
          shadow-md shadow-black/10 grid place-items-center cursor-pointer`,children:s.jsx(z,{children:s.jsx(S,{className:"w-4 scale-150 h-4 fill-gray-50"})})})]}),c?s.jsx("p",{children:"Something went wrong"}):s.jsx(B,{containerClassName:"grid grid-cols-1 md:grid-cols-2 gap-6",title:"",dataProvider:a==null?void 0:a.data,dataRenderer:e=>s.jsx(D,{title:e.title,category:e.category,address:e.address,city:e.city,discount:e.discount,id:e.id,image:e.image,lat:e.lat,lng:e.lng,rate:e.rate,rate_count:e.rate_count,link:m()+"/jobs/"+e.id},e.id),emptyFallback:s.jsxs("div",{className:"w-full p-10 grid place-items-center",children:[s.jsx("img",{alt:"no data",src:m()+"/images/noItem.png",className:"w-28 h-auto border border-purple-600 inline-block"}),s.jsx("p",{className:"text-sm text-slate-800 font-[vazirMedium] mt-3.5",children:"هیچ موردی وجود ندارد"})]}),loading:s.jsx("div",{className:"w-full h-72 grid place-items-center",children:s.jsxs("div",{className:`p-4 px-6 rounded-2xl flex flex-col items-center justify-center gap-y-5 bg-blue-500/80\r
            shadow-lg shadow-black/5`,children:[s.jsx("p",{className:"text-base text-slate-50 font-[vazir]",children:"درحال لود"}),s.jsx("div",{className:"w-10 h-10 border-t border-t-white rounded-full animate-spin"})]})}),isLoading:h})]})}export{F as default};
