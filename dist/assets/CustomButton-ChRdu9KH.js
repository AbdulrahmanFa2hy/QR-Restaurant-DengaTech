import{j as r}from"./index-CbhHraWw.js";const p=({children:e,onClick:t,type:s="button",disabled:d=!1,loading:o=!1,loadingText:a="جاري التحميل...",variant:l="primary",size:n="md",className:i="",...b})=>{const h=`
    font-semibold rounded-xl transition-all duration-300 border
    transform hover:scale-[1.02] sm:hover:scale-105 group/btn
    disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:transform-none
    flex items-center justify-center space-x-2
  `,c={primary:`
      bg-gradient-to-r from-firstColor-100 to-secondColor-200
      hover:from-firstColor-200 hover:to-secondColor-300
      text-firstColor-800
      border-firstColor-400 hover:border-firstColor-600
      hover:shadow-lg
    `,secondary:`
      bg-thirdColor-50 hover:bg-firstColor-100
      text-thirdColor-800 hover:text-firstColor-800
      border-thirdColor-200 hover:border-firstColor-400
    `,danger:`
      bg-red-500 hover:bg-red-600
      text-white
      border-red-500 hover:border-red-600
      hover:shadow-lg
    `,ghost:`
      bg-transparent hover:bg-thirdColor-50
      text-thirdColor-600 hover:text-thirdColor-800
      border-transparent hover:border-thirdColor-200
    `},C={sm:"py-2 px-4 text-sm",md:"py-3 px-6 text-base",lg:"py-4 px-8 text-lg"},m=`
    ${h}
    ${c[l]}
    ${C[n]}
    ${i}
  `.trim().replace(/\s+/g," ");return r.jsx("button",{type:s,onClick:t,disabled:d||o,className:m,...b,children:o?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"}),r.jsx("span",{children:a})]}):e})};export{p as C};
