!function(){var t,e=document.querySelector("body"),n=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),c=function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))},r=function(){console.log(c()),e.style.backgroundColor=c()};n.addEventListener("click",(function(){n.disabled=!0,t=setInterval(r,1e3)})),o.addEventListener("click",(function(){n.disabled=!1,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.5c0a2862.js.map
