(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&f(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function f(e){if(e.ep)return;e.ep=!0;const c=s(e);fetch(e.href,c)}})();const a={name:"",hp:500,stamina:500,score:0,img:"",isAlive:!0},d=document.querySelector(".loading-screen"),i=document.querySelector(".selection-screen"),u=document.querySelector(".game-screen"),g=document.querySelector(".loading-screen__button"),_=document.querySelector(".selection-screen__button"),p=document.querySelector(".selection-screen__name-input-box"),n=document.querySelectorAll(".selection-screen__character-selection__character-img"),y=document.querySelector(".selection-screen__character-selection__left-arrow"),L=document.querySelector(".selection-screen__character-selection__right-arrow"),S=document.querySelector(".selection-screen__button"),m=document.querySelector(".character__info");if(!d||!i||!u||!g||!_||!p||!n||!y||!L||!S||!m)throw new Error("Issue with selectors");let o=0;const v=()=>{o=(o-1+n.length)%n.length,h()},w=()=>{o=(o+1)%n.length,h()},q=()=>{const r=n[o];a.img=r.src;const t=document.createElement("img");t.classList.add("character__info__img"),t.src=a.img,t.alt="Character image",m.appendChild(t);const s=document.createElement("h1");s.classList.add("character__info__name"),s.textContent=a.name,m.appendChild(s)},E=r=>{const t=r.target.value;a.name=t},h=()=>{n.forEach((r,t)=>{t===o?r.style.display="block":r.style.display="none"})};h();const I=()=>{d.classList.remove("show"),d.classList.add("hide"),i.classList.remove("hide"),i.classList.add("show")},b=()=>{i.classList.remove("show"),i.classList.add("hide"),u.classList.remove("hide"),u.classList.add("show")};g.addEventListener("click",I);_.addEventListener("click",b);p.addEventListener("change",E);S.addEventListener("click",q);y.addEventListener("click",v);L.addEventListener("click",w);
