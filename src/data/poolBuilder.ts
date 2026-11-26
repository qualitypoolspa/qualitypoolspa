// Options for the Thermopool pool builder (/products/thermopool).
// TODO(client): confirm the four Thermopool sizes and which options apply.
import type { Localized } from "@/i18n/config";

export type Option = { id: string; label: Localized; note?: Localized };

/** The four sizes: length × width in metres (used for the drawing too). */
export const sizes: (Option & { length: number; width: number })[] = [
  { id: "3x6", length: 6, width: 3, label: { en: "3 × 6 m", de: "3 × 6 m", fr: "3 × 6 m", ru: "3 × 6 м" }, note: { en: "Compact", es: "Compacta", sv: "Kompakt", de: "Kompakt", fr: "Compacte", ru: "Компактный" } },
  { id: "3.5x7", length: 7, width: 3.5, label: { en: "3.5 × 7 m", es: "3,5 × 7 m", sv: "3,5 × 7 m", de: "3,5 × 7 m", fr: "3,5 × 7 m", ru: "3,5 × 7 м" }, note: { en: "Family", es: "Familiar", sv: "Familj", de: "Familie", fr: "Familiale", ru: "Семейный" } },
  { id: "4x8", length: 8, width: 4, label: { en: "4 × 8 m", de: "4 × 8 m", fr: "4 × 8 m", ru: "4 × 8 м" }, note: { en: "Classic", es: "Clásica", sv: "Klassisk", de: "Klassisch", fr: "Classique", ru: "Классический" } },
  { id: "5x10", length: 10, width: 5, label: { en: "5 × 10 m", de: "5 × 10 m", fr: "5 × 10 m", ru: "5 × 10 м" }, note: { en: "Large", es: "Grande", sv: "Stor", de: "Groß", fr: "Grande", ru: "Большой" } },
];

export const depths: Option[] = [
  { id: "1.2", label: { en: "1.2 m", es: "1,2 m", sv: "1,2 m", de: "1,2 m", fr: "1,2 m", ru: "1,2 м" }, note: { en: "Relaxing and playing", es: "Para relajarse y jugar", sv: "För avkoppling och lek", de: "Zum Entspannen und Spielen", fr: "Pour se détendre et jouer", ru: "Для отдыха и игр" } },
  { id: "1.4", label: { en: "1.4 m", es: "1,4 m", sv: "1,4 m", de: "1,4 m", fr: "1,4 m", ru: "1,4 м" }, note: { en: "Most popular", es: "La más popular", sv: "Populärast", de: "Am beliebtesten", fr: "La plus demandée", ru: "Самый популярный" } },
  { id: "1.5", label: { en: "1.5 m", es: "1,5 m", sv: "1,5 m", de: "1,5 m", fr: "1,5 m", ru: "1,5 м" }, note: { en: "For swimming", es: "Para nadar", sv: "För simning", de: "Zum Schwimmen", fr: "Pour nager", ru: "Для плавания" } },
  { id: "slope", label: { en: "Sloping floor", es: "Fondo inclinado", sv: "Sluttande botten", de: "Schräger Boden", fr: "Fond en pente", ru: "Наклонное дно" }, note: { en: "Shallow to deep end", es: "De poco a más profundo", sv: "Från grunt till djupt", de: "Von flach bis tief", fr: "Du petit au grand bain", ru: "От мелкой части к глубокой" } },
];

export const stairs: Option[] = [
  { id: "none", label: { en: "No stairs", es: "Sin escalera", sv: "Ingen trappa", de: "Keine Treppe", fr: "Sans escalier", ru: "Без лестницы" }, note: { en: "Ladder entry", es: "Acceso por escalerilla", sv: "Nedstigning med stege", de: "Einstieg über Leiter", fr: "Accès par échelle", ru: "Вход по лестнице-трапу" } },
  { id: "corner", label: { en: "Corner stairs", es: "Escalera en esquina", sv: "Hörntrappa", de: "Ecktreppe", fr: "Escalier d’angle", ru: "Угловая лестница" } },
  { id: "full-width", label: { en: "Full-width stairs", es: "Escalera de ancho completo", sv: "Trappa i full bredd", de: "Treppe über die ganze Breite", fr: "Escalier sur toute la largeur", ru: "Лестница на всю ширину" } },
  { id: "roman", label: { en: "Roman stairs", es: "Escalera romana", sv: "Romersk trappa", de: "Römische Treppe", fr: "Escalier roman", ru: "Римская лестница" }, note: { en: "Rounded, centred", es: "Redondeada, centrada", sv: "Rundad, centrerad", de: "Abgerundet, mittig", fr: "Arrondi, centré", ru: "Скруглённая, по центру" } },
];

/** Liner colours (Alkorplan 2010 plain and 3010 mosaic). `hex` is for the colour swatch. */
export const finishes: (Option & { hex: string })[] = [
  { id: "white", label: { en: "White", es: "Blanco", sv: "Vit", de: "Weiß", fr: "Blanc", ru: "Белый" }, hex: "#eef3f4" },
  { id: "sand", label: { en: "Beige / sand", es: "Beige / arena", sv: "Beige / sand", de: "Beige / Sand", fr: "Beige / sable", ru: "Бежевый / песочный" }, hex: "#e5d8bd" },
  { id: "light-blue", label: { en: "Light blue", es: "Azul claro", sv: "Ljusblå", de: "Hellblau", fr: "Bleu clair", ru: "Голубой" }, hex: "#9fd6ec" },
  { id: "blue", label: { en: "Blue", es: "Azul", sv: "Blå", de: "Blau", fr: "Bleu", ru: "Синий" }, hex: "#3e8fd6" },
  { id: "turquoise", label: { en: "Turquoise", es: "Turquesa", sv: "Turkos", de: "Türkis", fr: "Turquoise", ru: "Бирюзовый" }, hex: "#22aeb8" },
  { id: "grey", label: { en: "Grey", es: "Gris", sv: "Grå", de: "Grau", fr: "Gris", ru: "Серый" }, hex: "#a8b0b4" },
  { id: "dark-grey", label: { en: "Dark grey", es: "Gris oscuro", sv: "Mörkgrå", de: "Dunkelgrau", fr: "Gris foncé", ru: "Тёмно-серый" }, hex: "#4c555b" },
  { id: "mosaic", label: { en: "Mosaic (blue, grey or sand)", es: "Mosaico (azul, gris o arena)", sv: "Mosaik (blå, grå eller sand)", de: "Mosaik (Blau, Grau oder Sand)", fr: "Mosaïque (bleu, gris ou sable)", ru: "Мозаика (синяя, серая или песочная)" }, hex: "#5aa7c4" },
];

export const extras: Option[] = [
  { id: "slatted-cover", label: { en: "Automatic slatted cover", es: "Cubierta automática de lamas", sv: "Automatiskt lamellskydd", de: "Automatische Lamellenabdeckung", fr: "Volet automatique à lames", ru: "Автоматическое ламельное покрытие" } },
  { id: "bubble-cover", label: { en: "Solar bubble cover", es: "Manta solar de burbujas", sv: "Solskydd med bubblor", de: "Solar-Luftpolsterfolie", fr: "Bâche solaire à bulles", ru: "Солнечный пузырьковый тент" } },
  { id: "heat-pump", label: { en: "Heat pump", es: "Bomba de calor", sv: "Värmepump", de: "Wärmepumpe", fr: "Pompe à chaleur", ru: "Тепловой насос" } },
  { id: "lighting", label: { en: "LED lighting", es: "Iluminación LED", sv: "LED-belysning", de: "LED-Beleuchtung", fr: "Éclairage LED", ru: "Светодиодное освещение" } },
  { id: "robot", label: { en: "Robotic cleaner", es: "Robot limpiafondos", sv: "Poolrobot", de: "Poolroboter", fr: "Robot nettoyeur", ru: "Робот-пылесос" } },
  { id: "ladder", label: { en: "Ladder and handrails", es: "Escalera y pasamanos", sv: "Stege och ledstänger", de: "Leiter und Handläufe", fr: "Échelle et mains courantes", ru: "Лестница и поручни" } },
  { id: "shower", label: { en: "Solar shower", es: "Ducha solar", sv: "Soldusch", de: "Solardusche", fr: "Douche solaire", ru: "Солнечный душ" } },
  { id: "salt", label: { en: "Salt chlorination", es: "Cloración salina", sv: "Saltklorering", de: "Salzchlorierung", fr: "Électrolyse au sel", ru: "Солевое хлорирование" } },
];

export const locations: Option[] = [
  { id: "marbella", label: { en: "Marbella", de: "Marbella", fr: "Marbella", ru: "Марбелья" } },
  { id: "costa-del-sol", label: { en: "Elsewhere on the Costa del Sol", es: "Otro lugar de la Costa del Sol", sv: "Annan plats på Costa del Sol", de: "Anderswo an der Costa del Sol", fr: "Ailleurs sur la Costa del Sol", ru: "Другое место на Коста-дель-Соль" } },
  { id: "mallorca", label: { en: "Mallorca", de: "Mallorca", fr: "Majorque", ru: "Майорка" } },
  { id: "other", label: { en: "Other", es: "Otro", sv: "Annat", de: "Andere", fr: "Autre", ru: "Другое" } },
];

export const timeframes: Option[] = [
  { id: "asap", label: { en: "As soon as possible", es: "Lo antes posible", sv: "Så snart som möjligt", de: "So bald wie möglich", fr: "Dès que possible", ru: "Как можно скорее" } },
  { id: "3-months", label: { en: "Within 3 months", es: "En los próximos 3 meses", sv: "Inom 3 månader", de: "Innerhalb von 3 Monaten", fr: "D’ici 3 mois", ru: "В течение 3 месяцев" } },
  { id: "6-months", label: { en: "Within 6 months", es: "En los próximos 6 meses", sv: "Inom 6 månader", de: "Innerhalb von 6 Monaten", fr: "D’ici 6 mois", ru: "В течение 6 месяцев" } },
  { id: "exploring", label: { en: "Just exploring", es: "Solo estoy mirando", sv: "Jag undersöker bara", de: "Ich informiere mich nur", fr: "Je me renseigne simplement", ru: "Пока просто изучаю" } },
];
