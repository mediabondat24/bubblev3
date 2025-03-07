(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) d(e);
  new MutationObserver(e => {
    for (const o of e) if (o.type === "childList") for (const c of o.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && d(c);
  }).observe(document, {childList: true, subtree: true});
  function n(e) {
    const o = {};
    return e.integrity && (o.integrity = e.integrity), e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? o.credentials = "include" : e.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function d(e) {
    if (e.ep) return;
    e.ep = true;
    const o = n(e);
    fetch(e.href, o);
  }
}());


const M = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202025%20Fonticons,%20Inc.--%3e%3cpath%20d='M47.6%20300.4L228.3%20469.1c7.5%207%2017.4%2010.9%2027.7%2010.9s20.2-3.9%2027.7-10.9L464.4%20300.4c30.4-28.3%2047.6-68%2047.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347%2036.5%20300.6%2051.4%20268%2084L256%2096%20244%2084c-32.6-32.6-79-47.5-124.6-39.9C50.5%2055.6%200%20115.2%200%20185.1v5.8c0%2041.5%2017.2%2081.2%2047.6%20109.5z'/%3e%3c/svg%3e", x = () => {
  const t = "0123456789ABCDEF";
  let i = "#";
  for (let n = 0; n < 6; n++) i += t[Math.floor(Math.random() * 16)];
  return i;
}, u = 5e3, a = {maxHeartHeight: 60, minHeartHeight: 50, animationDuration: 3e3, size: 40, spread: 100, heartPercentage: 75, randomColor: true, heartColor1: "#ff0000", heartColor2: "#00ff00", showProfilePictures: true, randomPosition: true};
(async t => {
  const {size: i, spread: n, minHeartHeight: d, animationDuration: e, heartPercentage: o, maxHeartHeight: c} = t, f = document.getElementById("app");
  if (!f) {
    console.error("App element not found");
    return;
  }
  const h = await fetch(M).then(s => s.text());
  if (!h) {
    console.error("Heart icon not found");
    return;
  }
  const m = {};


const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  window.onLikeReceived = s => {
    m[s.userId] || (m[s.userId] = {color: x(), location: Math.random() * window.innerWidth});
    const {color: y, location: P} = m[s.userId], p = [];

    for (let l = 0; l < s.likeCount; l++) {
        const w = !t.showProfilePictures || Math.random() > 1 - o / 100, 
              C = Math.random() > 0.5, 
              L = Math.random() > 0.5 ? t.heartColor1 : t.heartColor2, 
              v = Math.random() * n * (C ? -1 : 1), 
              I = -Math.max(d, Math.random() * c), 
              r = document.createElement("div");

        if (p.push(r), r.classList.add("container"), w) {
            r.classList.add("heart");
            r.style.setProperty("--color", t.randomColor ? y : L); // Menambahkan warna acak jika randomColor aktif
            r.insertAdjacentHTML("beforeend", h);
        } else {
            const g = document.createElement("img");
            g.src = s.profilePictureUrl;
            g.style.border = `2px solid ${x()}`; // Menambahkan border warna acak pada gambar
            r.appendChild(g);
        }

        r.style.setProperty("--size", `${i}px`);
        r.style.setProperty("--location", "280px");
        r.style.setProperty("--animation-delay", `${u / s.likeCount * l}ms`);
        r.style.setProperty("--animation-duration", `${e}ms`);
        r.style.setProperty("--target-x", `${v}px`);
        r.style.setProperty("--target-y", `${I}vh`);
         r.style.setProperty("z-index", "999");
        f.appendChild(r);
    }

    setTimeout(() => {
        p.forEach(l => l.remove());
    }, u * 2 + e);
};

})(a);
location.href.includes("localhost") && setInterval(() => {
  window.onLikeReceived({likeCount: 15, profilePictureUrl: "images/bubble.gif", userId: "123", uniqueId: "123", nickname: "Test"});
}, u);
window.addEventListener("message", t => {
  if (t.data && typeof t.data != "object") return;
  const {type: i, settings: n} = t.data;
  i === "onLikeReceived" ? window.onLikeReceived(t.data.payload) : i === "onSettings" && (a.randomColor = n.randomColor, a.heartColor1 = n.heartColor1, a.heartColor2 = n.heartColor2, a.showProfilePictures = n.showProfilePictures, a.randomPosition = n.randomPosition);
});
