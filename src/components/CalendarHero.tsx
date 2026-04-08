interface CalendarHeroProps {
  month: string;
  monthIndex: number;
  year: number;
}

const WIKI_WIDTH = 2000;
const wikiFile = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${WIKI_WIDTH}`;

const MONTH_HERO_IMAGES: string[] = [
  // Jan – Dec (online, Hindu-festival themed; high-quality 2000px-wide images via Wikimedia)
  wikiFile("A_night_lit_up_on_Makar_Sankranti_Uttarayana_Festival_with_Kites_and_Lights_India.jpg"), // Jan: Makar Sankranti (kites)
  wikiFile("Lankeshwar_Temple_Shiva_Linga.jpg"), // Feb: Maha Shivaratri (Shiva linga)
  wikiFile("Holi_Colours_on_hand.jpg"), // Mar: Holi (colors)
  wikiFile("Ram_Navami.jpg"), // Apr: Ram Navami
  wikiFile("Rangoli_on_Ram_Navami_in_Tulshibaug_Ram_Temple%2C_Pune.jpg"), // May: festive rangoli
  wikiFile("Chariot_of_Lord_Jagganath.JPG"), // Jun: Jagannath Rath Yatra
  wikiFile("Rath_yatra.jpg"), // Jul: Rath Yatra
  wikiFile("Rakhi_tied_on_brother%27s_hand.jpg"), // Aug: Raksha Bandhan
  wikiFile("Idol_of_Lord_Ganesha_worshipped_on_the_occasion_of_Ganesh_Chaturthi.jpg"), // Sep: Ganesh Chaturthi
  wikiFile("Durga_idol_in_Durga_Puja.jpg"), // Oct: Navratri / Durga Puja
  wikiFile("Diwali_Diyas_Lamps.jpg"), // Nov: Diwali
  wikiFile("Diwali_diya.jpg"), // Dec: festive lights
];

const CalendarHero = ({ month, monthIndex, year }: CalendarHeroProps) => {
  const heroImage = MONTH_HERO_IMAGES[monthIndex] ?? MONTH_HERO_IMAGES[0];
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/11" }}
    >
      {/* Hero image */}
      <img
        src={heroImage}
        alt={`${month} ${year}`}
        className="w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.dataset.fallbackApplied) {
            img.dataset.fallbackApplied = "true";
            img.src = "/placeholder.svg";
          }
        }}
        width={1024}
        height={680}
      />

      {/* Blue diagonal wave overlay */}
      <div className="absolute inset-0 hero-wave opacity-90" />

      {/* Year + Month on the blue section */}
      <div className="absolute bottom-2 right-3 sm:bottom-5 sm:right-6 text-right z-10">
        <p className="font-mono text-xl sm:text-3xl md:text-4xl font-semibold text-primary-foreground leading-none tracking-tight">
          {year}
        </p>
        <p className="font-display text-lg sm:text-2xl md:text-3xl font-black text-primary-foreground uppercase tracking-wide leading-tight mt-0.5">
          {month}
        </p>
      </div>
    </div>
  );
};

export default CalendarHero;
