import{j as s}from"./index-CbhHraWw.js";const h=({label:t,type:l="text",name:a,value:n,onChange:i,placeholder:d,required:r=!1,disabled:c=!1,error:e,icon:o,className:x="",...m})=>{const u=`
    w-full px-3 py-2 border border-thirdColor-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-firstColor-400 
    bg-thirdColor-50 text-thirdColor-800
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
   ${e?"border-red-300 focus:ring-red-200":""} ${x}`;return s.jsxs("div",{className:"space-y-1",children:[t&&s.jsxs("label",{className:"block text-sm font-medium text-thirdColor-800",children:[t,r&&s.jsx("span",{className:"text-red-500 mr-1",children:"*"})]}),s.jsxs("div",{className:"relative",children:[o&&s.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:s.jsx(o,{className:"h-4 w-4 text-thirdColor-600"})}),s.jsx("input",{type:l,name:a,value:n,onChange:i,placeholder:d,required:r,disabled:c,className:u,...m})]}),e&&s.jsx("p",{className:"text-sm text-red-600 mt-1",children:e})]})};export{h as C};
