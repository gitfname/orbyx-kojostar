import{r as e,j as t}from"./index-d8fa4cee.js";import{c as a}from"./checkAuth-4f350946.js";import{w as s,d as r}from"./App-8c327c57.js";async function i(){await a()||s.navigate(r.pages.home)}function n(){return e.useEffect(()=>{i()},[]),t.jsx("div",{className:"w-full max-lg:h-full h-screen overflow-y-auto",children:t.jsxs("div",{className:"w-full h-min py-8 px-4",children:[t.jsx("p",{className:"text-lg text-slate-800 font-[vazirMedium]",children:"پیشنهاد اضافه کردن مکان"}),t.jsx("textarea",{rows:8,className:"primary-text-input mt-14",placeholder:"اطلاعاتی درمورد مکان مورد نظر خود به ما بدهید"}),t.jsx("p",{className:"text-slate-900 text-xs font-[vazirMedium] mt-8",children:"درصور تمایل میتوانید شماره تماس خودرا وارد کنید"}),t.jsx("input",{type:"text",maxLength:11,className:"primary-text-input mt-4",placeholder:"تلفن"}),t.jsx("button",{className:"primary-btn mt-12 max-w-xs mx-auto block",children:"ثبت"})]})})}export{n as default};
