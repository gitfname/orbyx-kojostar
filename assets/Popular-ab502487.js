import{r as u,j as e,J as c}from"./index-b0e24987.js";import{s as p,a as x,b as m,o as h,p as f,B as y,D as j,q as w}from"./App-1f28e85f.js";import{S as b}from"./ShowJobsInMap-0c19128c.js";async function v({category_id:d=void 0,city_id:t=void 0,key:r=void 0}){return await p({type:1,key:r,category_id:d,city_id:t})}function k({className:d}){var n;const[t,r,l]=x(a=>[a.data.key,a.data.category_id,a.data.city_id]),{data:s,error:o,isLoading:i,mutate:g}=m("search/popular",async()=>v({category_id:r,city_id:l,key:t}),{shouldRetryOnError:!1,revalidateOnFocus:!1});return u.useEffect(()=>{g()},[t,l,r]),i?e.jsx(h,{}):e.jsxs("div",{className:"w-full h-max",children:[((n=s==null?void 0:s.data)==null?void 0:n.length)>0?e.jsx(b,{latlng:s.data.map(a=>({title:a.title,latlng:new f.LatLng(a.lat,a.lng)})),children:e.jsx("div",{className:`fixed z-30 bottom-4 left-4 p-3 rounded-xl bg-blue-500\r
      shadow-md shadow-black/10 grid place-items-center cursor-pointer`,children:e.jsx(y,{className:"w-4 h-4 fill-gray-50"})})}):null,o?e.jsx("p",{children:"Something went wrong"}):e.jsx(j,{containerClassName:"grid grid-cols-1 md:grid-cols-2 gap-6",title:"",dataProvider:s==null?void 0:s.data,dataRenderer:a=>e.jsx(w,{title:a.title,category:a.category,address:a.address,city:a.city,discount:a.discount,id:a.id,image:a.image,lat:a.lat,lng:a.lng,rate:a.rate,rate_count:a.rate_count,link:c()+"/jobs/"+a.id},a.id),emptyFallback:e.jsxs("div",{className:"w-full p-10 grid place-items-center",children:[e.jsx("img",{alt:"no data",src:c()+"/images/noItem.png",className:"w-28 h-auto border border-purple-600 inline-block"}),e.jsx("p",{className:"text-sm text-slate-800 font-[vazirMedium] mt-3.5",children:"هیچ موردی وجود ندارد"})]}),loading:e.jsx("div",{className:"w-full h-72 grid place-items-center",children:e.jsxs("div",{className:`p-4 px-6 rounded-2xl flex flex-col items-center justify-center gap-y-5 bg-blue-500/80\r
            shadow-lg shadow-black/5`,children:[e.jsx("p",{className:"text-base text-slate-50 font-[vazir]",children:"درحال لود"}),e.jsx("div",{className:"w-10 h-10 border-t border-t-white rounded-full animate-spin"})]})}),isLoading:i})]})}export{k as default};
