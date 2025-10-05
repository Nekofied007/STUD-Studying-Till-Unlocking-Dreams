// @ts-ignore - animejs has no types
let animeCache: any | null = null;
async function getAnime() {
  if (animeCache) return animeCache;
  const mod: any = await import("animejs");
  animeCache = mod?.default ?? mod?.anime ?? mod;
  return animeCache;
}

export async function revealByLines(el: HTMLElement, delay = 0) {
  const text = el.innerHTML;
  const lines = text
    .split("<br>")
    .map(
      (line) =>
        `<span class=\"block overflow-hidden\"><span class=\"inline-block will-change-transform translate-y-8 opacity-0\">${line}</span></span>`,
    )
    .join("");
  el.innerHTML = lines;
  const targets = el.querySelectorAll("span > span");
  const anime = await getAnime();
  anime({
    targets,
    translateY: [32, 0],
    opacity: [0, 1],
    easing: "easeOutQuad",
    delay: anime.stagger(80, { start: delay }),
    duration: 700,
  });
}

export async function revealByChars(el: HTMLElement, delay = 0) {
  const text = el.textContent ?? "";
  const chars = Array.from(text)
    .map(
      (c) =>
        `<span class=\"inline-block will-change-transform translate-y-4 opacity-0\">${c === " " ? "&nbsp;" : c}</span>`,
    )
    .join("");
  el.innerHTML = chars;
  const targets = el.querySelectorAll("span");
  const anime = await getAnime();
  anime({
    targets,
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutQuad",
    delay: anime.stagger(18, { start: delay }),
    duration: 500,
  });
}
