import{r as a,q as p,j as e,B as r}from"./index-BNbvoI4x.js";import{M as h}from"./index.esm-CIEaHNIa.js";import{C as f}from"./index-C9_pT9-z.js";import{M as u}from"./index-BOPkpoV3.js";import{g as j,d as y}from"./Api-Da68FMlE.js";import{B as l}from"./button-CpUg40Ua.js";import"./iconBase-BrTl3Xj6.js";import"./DefaultLayout-BF6jDZKj.js";import"./index.es-Ct8Zgbwz.js";import"./cil-user-Dlmw-Gem.js";const _=()=>{const[s,o]=a.useState([]),c=p(),d=async()=>{try{const t=await j("page");o(t==null?void 0:t.data)}catch{r.error("Failed to fetch Website")}};a.useEffect(()=>{d()},[]);const n=t=>{c(`/edit/${t._id}`)},m=async t=>{if(window.confirm("Are you sure you want to delete this Website?"))try{await y(`page/${t}`),r.success("Website deleted successfully"),o(s.filter(i=>(i==null?void 0:i._id)!==t))}catch{r.error("Failed to delete Website")}},x=a.useMemo(()=>[{accessorKey:"id",header:"ID",size:150},{accessorKey:"page_name",header:"Page Name",size:500},{accessorKey:"actions",header:"Actions",size:150,Cell:({row:t})=>e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx(l,{onClick:()=>n(t.original),children:e.jsx(f,{className:"text-lg text-blue-500"})}),e.jsx(l,{onClick:()=>m(t.original._id),children:e.jsx(u,{className:"text-lg text-red-500"})})]})}],[s]);return e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("p",{className:"font-semibold text-[24px] text-gray-500",children:"Website"}),e.jsxs("p",{children:["Total Category: ",e.jsx("span",{children:s==null?void 0:s.length})]})]}),e.jsx("div",{children:e.jsx("div",{className:"flex justify-start my-[30px]",children:e.jsx(l,{type:"primary",onClick:()=>c("/add"),children:"Add Website"})})}),e.jsx(h,{columns:x,data:s})]})};export{_ as default};