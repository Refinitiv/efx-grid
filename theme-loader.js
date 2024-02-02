var o=document.documentElement.getAttribute("prefers-color-scheme"),t={halo:{light:()=>"./resources/elf-halo-light.js",dark:()=>"./resources/elf-halo-dark.js"}},a=()=>{let e=document.createElement("style");e.innerHTML=`
    :root {
      height: auto;
      min-height: 80px;
      font-size: calc(.625em / 10);
    }
  `,document.head.appendChild(e)},n=async()=>{o==="light"?await import(t.halo.light()):await import(t.halo.dark())};a();export{n as halo,o as themeVariant};
