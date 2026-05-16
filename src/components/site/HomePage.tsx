import { useEffect, useRef, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";
import { fetchHomePage, pickLocalized } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { Header } from "./Header";
import logo from "@/assets/brand-logo.png";
import unicorn from "@/assets/toy-unicorn.png";
import stitch from "@/assets/toy-stitch.png";
import sheep from "@/assets/toy-sheep.png";
import bunnyPurple from "@/assets/toy-bunny-purple.png";
import puppy from "@/assets/toy-puppy.png";
import bunnyPair from "@/assets/toy-bunny-pair.png";
import cutoutLogoRound from "@/assets/cutouts/logo_round.png";
import {
  Sparkles,
  Heart,
  Gift,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/share/1CqQdMFbur/";
const PHONE_DISPLAY = "+48 733 314 734";
const PHONE_HREF = "tel:+48733314734";
const TELEGRAM_URL = "tg://resolve?phone=48733314734";

const products = [
  {
    img: bunnyPurple,
    name: {
      pl: "Lila - kroliczek baletnica",
      en: "Lila - ballerina bunny",
      ua: "Ліла - зайка-балерина",
    },
    tag: { pl: "Bunny Collection", en: "Bunny Collection", ua: "Колекція зайчиків" },
  },
  {
    img: unicorn,
    name: {
      pl: "Rosie - rainbow unicorn",
      en: "Rosie - rainbow unicorn",
      ua: "Розі - веселковий єдиноріг",
    },
    tag: { pl: "Nursery Toys", en: "Nursery Toys", ua: "Іграшки для дитячої" },
  },
  {
    img: stitch,
    name: { pl: "Bluey - kroliczek aloha", en: "Bluey - aloha bunny", ua: "Блуї - зайчик алоха" },
    tag: { pl: "Seasonal", en: "Seasonal", ua: "Сезонні" },
  },
  {
    img: sheep,
    name: { pl: "Mila - meadow sheep", en: "Mila - meadow sheep", ua: "Міла - лугова овечка" },
    tag: { pl: "Gift Toys", en: "Gift Toys", ua: "Подарункові" },
  },
  {
    img: puppy,
    name: { pl: "Coco - szczeniaczek mocha", en: "Coco - mocha puppy", ua: "Коко - щеня мокка" },
    tag: { pl: "Bears & Friends", en: "Bears & Friends", ua: "Ведмедики та друзі" },
  },
  {
    img: bunnyPair,
    name: {
      pl: "Lily & Theo - sweethearts",
      en: "Lily & Theo - sweethearts",
      ua: "Лілі та Тео - закохані",
    },
    tag: { pl: "Personalized", en: "Personalized", ua: "Персоналізовані" },
  },
];

type HomePageContent = Awaited<ReturnType<typeof fetchHomePage>>;

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export function HomePage({ lang, content }: { lang: Lang; content?: HomePageContent | null }) {
  const t = dict[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const lookbookFromSanity =
    content?.lookbook?.filter((i) => i.active !== false && i.image) ?? null;
  const lookbook = lookbookFromSanity?.length ? lookbookFromSanity : null;
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const activeProductLocal = products[activeProductIndex];
  const activeProductSanity = lookbook ? lookbook[activeProductIndex] : null;

  const showPreviousProduct = () => {
    const length = lookbook ? lookbook.length : products.length;
    setActiveProductIndex((current) => (current === 0 ? length - 1 : current - 1));
  };

  const showNextProduct = () => {
    const length = lookbook ? lookbook.length : products.length;
    setActiveProductIndex((current) => (current === length - 1 ? 0 : current + 1));
  };

  useScrollReveal();

  useEffect(() => {
    const hero = heroRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || prefersReducedMotion) {
      return;
    }

    let frameId: number;
    const handlePointerMove = (event: PointerEvent) => {
      // Throttle updates to requestAnimationFrame for better performance
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        hero.style.setProperty("--hero-x", x.toFixed(3));
        hero.style.setProperty("--hero-y", y.toFixed(3));
      });
    };

    const resetPointer = () => {
      cancelAnimationFrame(frameId);
      hero.style.setProperty("--hero-x", "0");
      hero.style.setProperty("--hero-y", "0");
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      cancelAnimationFrame(frameId);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header lang={lang} />

      <section ref={heroRef} className="hero-motion relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-blush opacity-70" />
        <div className="ambient-thread ambient-thread-a" />
        <div className="ambient-thread ambient-thread-b" />
        <div className="absolute -top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-accent/35 blur-3xl animate-blob-pop md:h-[32rem] md:w-[32rem] md:bg-accent/50" />
        <div
          className="absolute -bottom-28 -right-16 h-[26rem] w-[26rem] rounded-full bg-blush/40 blur-3xl animate-blob-pop md:-bottom-40 md:-right-24 md:h-[38rem] md:w-[38rem] md:bg-blush/55"
          style={{ animationDelay: "1.4s" }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-multiply animate-glow-shift md:opacity-60">
          <div className="absolute left-[16%] top-[26%] h-20 w-20 rounded-full bg-cream/70 blur-2xl md:h-36 md:w-36" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-8 sm:px-6 sm:pt-14 md:grid-cols-2 md:gap-12 md:pb-24 md:pt-16">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t.hero.eyebrow}
            </div>
            <h1 className="mt-5 text-balance font-display text-[2.7rem] leading-[1.02] sm:text-5xl md:mt-6 md:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-6">
              {t.hero.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <a
                href="#collection"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-cozy transition-[transform,box-shadow] duration-300 motion-safe-transition hover:-translate-y-0.5 hover:shadow-petal sm:w-auto sm:px-7 sm:py-4"
              >
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#custom"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-secondary sm:w-auto sm:px-7 sm:py-4"
              >
                {t.hero.cta2}
              </a>
            </div>

            <div className="mt-7 grid gap-3 text-xs text-muted-foreground sm:mt-12 sm:flex sm:flex-wrap sm:gap-6 sm:text-sm">
              <span className="badge-float flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" /> {t.badges.hand}
              </span>
              <span
                className="badge-float flex items-center gap-2"
                style={{ animationDelay: "0.25s" }}
              >
                <ShieldCheck className="h-4 w-4 text-primary" /> {t.badges.safe}
              </span>
              <span
                className="badge-float flex items-center gap-2"
                style={{ animationDelay: "0.5s" }}
              >
                <Gift className="h-4 w-4 text-primary" /> {t.badges.gift}
              </span>
            </div>
          </div>

          <div className="hero-visual relative animate-fade-up-delayed">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-soft opacity-70 blur-2xl animate-glow-shift md:-inset-5 md:rounded-[2.5rem] md:opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-petal grain md:rounded-[2.5rem]">
              <img
                src={bunnyPair}
                alt="OksiToys handmade amigurumi bunny pair"
                className="h-[20rem] w-full object-cover sm:h-[30rem] md:h-[40rem]"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <img
              src={cutoutLogoRound}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-5 -top-6 w-20 rotate-[-10deg] opacity-90 drop-shadow-[0_22px_36px_rgba(0,0,0,0.18)] animate-orbit-soft sm:w-24 md:-left-8 md:-top-8 md:w-28"
            />
          </div>
        </div>
      </section>

      <section id="collection" className="relative overflow-x-hidden py-10 sm:py-20 md:py-28">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-full max-w-[36rem] -translate-x-1/2 rounded-full bg-gradient-soft opacity-40 blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-14 sm:gap-6"
            data-reveal
          >
            <div>
              <div className="mb-2 flex items-center gap-3 sm:mb-3">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Lookbook</p>
                <div className="pointer-events-none flex items-center gap-2 opacity-80">
                  <img
                    src={cutoutLogoRound}
                    alt=""
                    aria-hidden
                    className="h-7 w-7 rotate-[-8deg] animate-micro-pop drop-shadow-[0_10px_18px_rgba(0,0,0,0.14)]"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
              <h2 className="max-w-xl text-balance font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
                {pickLocalized(content?.copy?.featuredTitle, lang) ?? t.featured.title}
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground sm:mt-3 sm:text-base">
                {pickLocalized(content?.copy?.featuredSub, lang) ?? t.featured.sub}
              </p>
            </div>
            <div className="divider-stitch hidden flex-1 md:block" />
          </div>

          <div className="md:hidden" data-reveal>
            <div className="mobile-lookbook overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/80 p-3 shadow-soft backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.2rem] bg-secondary">
                <img
                  key={lookbook ? activeProductSanity?._key : activeProductLocal.img}
                  src={
                    lookbook && activeProductSanity?.image
                      ? urlForImage(activeProductSanity.image)
                          .width(1200)
                          .height(800)
                          .fit("crop")
                          .url()
                      : activeProductLocal.img
                  }
                  alt={
                    lookbook && activeProductSanity
                      ? (pickLocalized(activeProductSanity.name, lang) ?? "OksiToys lookbook item")
                      : activeProductLocal.name[lang]
                  }
                  className="mobile-lookbook-image h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/70 backdrop-blur">
                  {lookbook && activeProductSanity
                    ? (pickLocalized(activeProductSanity.tag, lang) ?? "")
                    : activeProductLocal.tag[lang]}
                </span>

                <button
                  type="button"
                  aria-label="Previous toy"
                  onClick={showPreviousProduct}
                  className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/85 text-foreground shadow-soft backdrop-blur transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-secondary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next toy"
                  onClick={showNextProduct}
                  className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/85 text-foreground shadow-soft backdrop-blur transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-secondary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-end justify-between gap-4 px-1 pt-4">
                <div>
                  <h3 className="font-display text-2xl leading-tight">
                    {lookbook && activeProductSanity
                      ? (pickLocalized(activeProductSanity.name, lang) ?? "")
                      : activeProductLocal.name[lang]}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">Handmade · OksiToys</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary">
                  {String(activeProductIndex + 1).padStart(2, "0")} /{" "}
                  {String((lookbook ? lookbook.length : products.length) || 0).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2">
                {(lookbook ?? products).map((product: any, i: number) => (
                  <button
                    key={lookbook ? product._key : product.img}
                    type="button"
                    aria-label={`Show toy ${i + 1}`}
                    aria-pressed={i === activeProductIndex}
                    onClick={() => setActiveProductIndex(i)}
                    className={
                      "aspect-square overflow-hidden rounded-xl border transition-[transform,border-color,opacity] duration-300 " +
                      (i === activeProductIndex
                        ? "border-primary opacity-100 shadow-soft"
                        : "border-transparent opacity-55")
                    }
                  >
                    <img
                      src={
                        lookbook && product.image
                          ? urlForImage(product.image).width(300).height(300).fit("crop").url()
                          : product.img
                      }
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden gap-5 sm:grid-cols-2 sm:gap-7 md:grid lg:grid-cols-3 lg:gap-8">
            {products.map((p, i) => (
              <article
                key={i}
                className="group cursor-pointer"
                data-reveal
                style={{ transitionDelay: `${Math.min(i * 70, 350)}ms` }}
              >
                <div className="toy-card relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-cozy md:hover:-translate-y-2 shimmer-on-hover">
                  <img
                    src={p.img}
                    alt={p.name[lang]}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/70 backdrop-blur sm:left-4 sm:top-4">
                    {p.tag[lang]}
                  </span>
                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 font-display text-xl sm:mt-5 sm:text-2xl">{p.name[lang]}</h3>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
                  <span>Handmade · OksiToys</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="relative overflow-hidden py-12 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-soft opacity-60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          <div className="relative" data-reveal>
            <div className="overflow-hidden rounded-[1.6rem] shadow-petal grain sm:rounded-[2rem]">
              <img
                src={unicorn}
                alt="Crochet artisan story"
                className="story-image h-72 w-full object-cover sm:h-[28rem] md:h-[32rem]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="logo-medallion absolute -bottom-8 -right-8 hidden h-40 w-40 rounded-full bg-card p-2 shadow-cozy md:block">
              <img
                src={logo}
                alt="OksiToys logo"
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div data-reveal style={{ transitionDelay: "120ms" }}>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
              {t.story.eyebrow}
            </p>
            <h2 className="text-balance font-display text-3xl sm:text-4xl md:text-5xl">
              {t.story.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              {t.story.body}
            </p>
            <a
              href="#custom"
              className="group mt-7 inline-flex items-center gap-2 font-medium text-primary sm:mt-8"
            >
              {t.story.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2
            className="mx-auto max-w-2xl text-balance text-center font-display text-3xl sm:text-4xl md:text-5xl"
            data-reveal
          >
            {t.safety.title}
          </h2>
          <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
            {t.safety.items.map((it, i) => (
              <div
                key={i}
                className="info-card rounded-3xl border border-border/70 bg-card p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-cozy sm:p-7 md:p-8"
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary sm:mb-6 sm:h-12 sm:w-12">
                  {i === 0 ? (
                    <Heart className="h-5 w-5 text-primary" />
                  ) : i === 1 ? (
                    <Sparkles className="h-5 w-5 text-primary" />
                  ) : (
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h3 className="font-display text-xl sm:text-2xl">{it.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {it.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="custom" className="relative overflow-hidden py-12 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-blush opacity-80" />
        <img
          src={cutoutLogoRound}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 hidden w-16 -translate-x-1/2 rotate-[-10deg] opacity-55 md:block animate-orbit-soft drop-shadow-[0_18px_30px_rgba(0,0,0,0.14)]"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div data-reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
              {t.custom.eyebrow}
            </p>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl sm:text-4xl md:text-6xl">
              {pickLocalized(content?.copy?.customTitle, lang) ?? t.custom.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
              {pickLocalized(content?.copy?.customBody, lang) ?? t.custom.body}
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-3 sm:gap-4 md:mt-14 md:grid-cols-6">
            {(content?.customGallery?.length
              ? content.customGallery
              : [bunnyPurple, unicorn, stitch, sheep, puppy, bunnyPair]
            ).map((src: any, i: number) => (
              <div
                key={i}
                className="custom-tile aspect-square overflow-hidden rounded-[1.1rem] shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-cozy shimmer-on-hover sm:rounded-2xl"
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <img
                  src={
                    typeof src === "string"
                      ? src
                      : urlForImage(src).width(600).height(600).fit("crop").url()
                  }
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-cozy transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-petal sm:mt-12 sm:px-8 sm:py-4"
            data-reveal
          >
            {t.custom.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <section id="reviews" className="py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2
            className="mx-auto max-w-2xl text-balance text-center font-display text-3xl sm:text-4xl md:text-5xl"
            data-reveal
          >
            {pickLocalized(content?.copy?.reviewsTitle, lang) ?? t.reviews.title}
          </h2>
          <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
            {(content?.reviews?.filter((r) => r.active !== false) ?? t.reviews.list).map(
              (r: any, i: number) => (
                <figure
                  key={r._key ?? i}
                  className="review-card rounded-3xl border border-border/70 bg-card p-5 shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-cozy sm:p-7 md:p-8"
                  data-reveal
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="mb-4 flex gap-1 text-primary" aria-label="5 stars">
                    {"★★★★★".split("").map((s, j) => (
                      <span key={j} className="star-pop" style={{ animationDelay: `${j * 80}ms` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-balance font-display text-lg leading-snug sm:text-xl">
                    "{pickLocalized(r.quote, lang) ?? r.q}"
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    - {r.author ?? r.a}
                  </figcaption>
                </figure>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6" data-reveal>
          <h2 className="text-balance font-display text-4xl sm:text-5xl md:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
            {t.cta.sub}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-primary">{t.cta.delivery}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-secondary sm:w-auto sm:px-6 sm:py-3.5"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-secondary sm:w-auto sm:px-6 sm:py-3.5"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={TELEGRAM_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-secondary sm:w-auto sm:px-6 sm:py-3.5"
            >
              <Send className="h-4 w-4" /> Telegram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-cozy transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-petal sm:w-auto sm:px-6 sm:py-3.5"
            >
              <MessageCircle className="h-4 w-4" /> {t.cta.btn}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-card/40 py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl items-start gap-7 px-4 text-center sm:px-6 md:grid-cols-3 md:gap-10 md:text-left">
          <div>
            <div className="font-display text-2xl">
              <span className="text-primary">Oksi</span>Toys{" "}
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                Amigurumi
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xs text-sm text-muted-foreground md:mx-0">
              {t.footer.tag}
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#collection" className="block hover:text-primary">
              {t.nav.collection}
            </a>
            <a href="#story" className="block hover:text-primary">
              {t.nav.story}
            </a>
            <a href="#custom" className="block hover:text-primary">
              {t.nav.custom}
            </a>
            <a href="#reviews" className="block hover:text-primary">
              {t.nav.reviews}
            </a>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            © {new Date().getFullYear()} OksiToys Amigurumi. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
