// DRAFT terms of purchase. Placeholders in [brackets] must be filled in, and the whole
// text reviewed by the client's lawyer or accountant before it is published as final.
// Set `isDraft` to false once approved (removes the draft notice on the page).
import type { Locale } from "@/i18n/config";

export const isDraft = true;
export const lastUpdated = "2026-11-24";

type Section = { title: string; paragraphs: string[] };

const en: Section[] = [
  {
    title: "1. About us",
    paragraphs: [
      "These terms apply to purchases of products and services from [COMPANY LEGAL NAME], trading as Quality Pool & Spa, with tax number (NIF/CIF) [NUMBER], registered address [ADDRESS], Spain. Email: info@qualitypoolspa.es. Phone: [PHONE].",
      "By placing an order with us you accept these terms. If a written quote or order confirmation says something different, the quote or order confirmation applies.",
    ],
  },
  {
    title: "2. Quotes and orders",
    paragraphs: [
      "Our website presents products and information only. It is not a web shop, and the information on it is not a binding offer. Product images, dimensions and specifications come from the manufacturers and may change without notice.",
      "Prices are given in a written quote. A quote is valid for [30] days unless it states otherwise. A purchase agreement is formed when you accept the quote in writing and we confirm the order in writing.",
    ],
  },
  {
    title: "3. Prices and payment",
    paragraphs: [
      "Prices are in euros. The quote states whether VAT (IVA) is included. Delivery, installation, groundwork, electrical work and permits are only included when the quote says so.",
      "Unless agreed otherwise, a deposit of [X] % is paid when the order is confirmed, and the balance is paid [before delivery / on completion of installation]. Payment is made by [bank transfer / card / other]. Ownership of the goods passes to you when they are paid in full.",
    ],
  },
  {
    title: "4. Delivery",
    paragraphs: [
      "Delivery times in quotes and order confirmations are estimates and depend on the manufacturer. We will tell you as soon as possible if a delivery is delayed.",
      "You must make sure there is safe access for delivery vehicles and, where needed, lifting equipment, and that the delivery address and any access restrictions are correct. Extra costs caused by insufficient access or incorrect information may be charged.",
      "Please check the goods on delivery and note any visible damage on the delivery note, and tell us within [48 hours].",
    ],
  },
  {
    title: "5. Installation and site preparation",
    paragraphs: [
      "When installation is included, we or our installation partners carry out the work described in the quote. Unless the quote says otherwise, you are responsible for any building or planning permits, a suitable and level base, the electrical supply to the installation point, and access to the site.",
      "If the site conditions differ from what was agreed or assumed in the quote, we will agree any changes and extra costs with you before continuing.",
    ],
  },
  {
    title: "6. Right of withdrawal",
    paragraphs: [
      "If you are a consumer and the contract was concluded at a distance or off our business premises, you may withdraw from it within 14 calendar days without giving a reason. The period starts on the day you receive the goods, or for service contracts, on the day the contract is concluded. To withdraw, send us a clear statement by email or letter before the period ends.",
      "The right of withdrawal does not apply to goods made to your specifications or clearly personalised, such as made-to-measure liners, pools built to your dimensions or custom orders, nor to services that have been fully performed with your prior agreement. If you ask us to start a service within the withdrawal period, you pay for the part already performed.",
      "If you withdraw, we refund all payments received, including standard delivery costs, within 14 days of receiving your notice. We may wait to refund until the goods are returned. You pay the direct cost of returning the goods unless we agree otherwise.",
    ],
  },
  {
    title: "7. Guarantee and warranty",
    paragraphs: [
      "As a consumer you have the legal guarantee of conformity under Spanish consumer law (currently three years for new goods from delivery). If a product does not conform to the contract, we will repair or replace it or, where that is not possible, reduce the price or refund it, as the law provides.",
      "In addition, many products come with the manufacturer's own warranty, as stated on the product page or in the documentation. Manufacturer warranties do not limit your legal rights.",
      "The guarantee does not cover damage caused by incorrect installation by others, misuse, lack of maintenance, unsuitable water chemistry, frost, or normal wear and tear.",
    ],
  },
  {
    title: "8. Complaints",
    paragraphs: [
      "If something is wrong, contact us at info@qualitypoolspa.es and describe the problem, ideally with photos and your order number. We aim to reply within [5] working days. Complaint forms (hojas de reclamaciones) are available on request.",
    ],
  },
  {
    title: "9. Liability",
    paragraphs: [
      "We are not liable for indirect losses or for delays caused by circumstances beyond our reasonable control, such as manufacturer delays, extreme weather or transport disruption. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    title: "10. Personal data",
    paragraphs: [
      "We use the personal data you give us (such as your name, contact details and address) to handle your enquiries, quotes, orders and deliveries, in line with the GDPR and Spanish data protection law. We do not sell your data. You can ask to see, correct or delete your data at any time by contacting us. [Link to the privacy policy.]",
    ],
  },
  {
    title: "11. Applicable law and disputes",
    paragraphs: [
      "These terms are governed by Spanish law. We will always try to resolve disagreements directly with you. If you are a consumer, you may also contact your local consumer office (Oficina Municipal de Información al Consumidor) or the consumer arbitration system, and you keep the right to bring a claim before the courts of your place of residence.",
    ],
  },
];

// Spanish and Swedish versions. Like the English one, a draft for the client's
// lawyer to review; the Spanish text is the one that matters legally in Spain.
const es: Section[] = [
  {
    title: "1. Quiénes somos",
    paragraphs: [
      "Estas condiciones se aplican a la compra de productos y servicios de [RAZÓN SOCIAL], que opera como Quality Pool & Spa, con NIF/CIF [NÚMERO] y domicilio social en [DIRECCIÓN], España. Correo electrónico: info@qualitypoolspa.es. Teléfono: [TELÉFONO].",
      "Al realizar un pedido aceptas estas condiciones. Si un presupuesto o una confirmación de pedido por escrito dice algo distinto, prevalece el presupuesto o la confirmación de pedido.",
    ],
  },
  {
    title: "2. Presupuestos y pedidos",
    paragraphs: [
      "Nuestra web solo presenta productos e información. No es una tienda online y su contenido no constituye una oferta vinculante. Las imágenes, medidas y especificaciones de los productos proceden de los fabricantes y pueden cambiar sin previo aviso.",
      "Los precios se indican en un presupuesto por escrito. Un presupuesto es válido durante [30] días salvo que indique otra cosa. El contrato de compraventa se forma cuando aceptas el presupuesto por escrito y nosotros confirmamos el pedido por escrito.",
    ],
  },
  {
    title: "3. Precios y pago",
    paragraphs: [
      "Los precios se expresan en euros. El presupuesto indica si el IVA está incluido. La entrega, la instalación, la obra previa, los trabajos eléctricos y los permisos solo están incluidos cuando el presupuesto así lo indica.",
      "Salvo acuerdo en contrario, se abona un anticipo del [X] % al confirmar el pedido y el resto [antes de la entrega / al finalizar la instalación]. El pago se realiza mediante [transferencia bancaria / tarjeta / otro]. La propiedad de los bienes se te transmite cuando están pagados en su totalidad.",
    ],
  },
  {
    title: "4. Entrega",
    paragraphs: [
      "Los plazos de entrega indicados en presupuestos y confirmaciones de pedido son estimados y dependen del fabricante. Te avisaremos lo antes posible si una entrega se retrasa.",
      "Debes garantizar un acceso seguro para los vehículos de reparto y, cuando sea necesario, para equipos de elevación, y que la dirección de entrega y cualquier restricción de acceso sean correctas. Los costes adicionales causados por un acceso insuficiente o por información incorrecta podrán ser facturados.",
      "Revisa la mercancía en el momento de la entrega, anota cualquier daño visible en el albarán y comunícanoslo en un plazo de [48 horas].",
    ],
  },
  {
    title: "5. Instalación y preparación del terreno",
    paragraphs: [
      "Cuando la instalación está incluida, nosotros o nuestros instaladores colaboradores realizamos los trabajos descritos en el presupuesto. Salvo que el presupuesto indique otra cosa, eres responsable de las licencias de obra o urbanísticas, de una base adecuada y nivelada, del suministro eléctrico hasta el punto de instalación y del acceso al lugar.",
      "Si las condiciones del lugar difieren de lo acordado o previsto en el presupuesto, acordaremos contigo cualquier cambio y coste adicional antes de continuar.",
    ],
  },
  {
    title: "6. Derecho de desistimiento",
    paragraphs: [
      "Si eres consumidor y el contrato se celebró a distancia o fuera de nuestro establecimiento, puedes desistir de él en un plazo de 14 días naturales sin indicar el motivo. El plazo empieza el día en que recibes los bienes o, en contratos de servicios, el día en que se celebra el contrato. Para desistir, envíanos una declaración clara por correo electrónico o por carta antes de que finalice el plazo.",
      "El derecho de desistimiento no se aplica a bienes confeccionados conforme a tus especificaciones o claramente personalizados, como liners a medida, piscinas fabricadas con tus dimensiones o pedidos especiales, ni a servicios que se hayan prestado por completo con tu consentimiento previo. Si nos pides que empecemos un servicio durante el plazo de desistimiento, pagarás la parte ya prestada.",
      "Si desistes, te reembolsaremos todos los pagos recibidos, incluidos los gastos de entrega estándar, en un plazo de 14 días desde que recibamos tu comunicación. Podremos retener el reembolso hasta haber recibido los bienes. Tú asumes el coste directo de la devolución salvo que acordemos otra cosa.",
    ],
  },
  {
    title: "7. Garantía",
    paragraphs: [
      "Como consumidor tienes la garantía legal de conformidad prevista en la normativa española de consumo (actualmente tres años desde la entrega para bienes nuevos). Si un producto no es conforme con el contrato, lo repararemos o sustituiremos o, si no es posible, rebajaremos el precio o lo reembolsaremos, según establece la ley.",
      "Además, muchos productos cuentan con la garantía comercial del fabricante, tal como se indica en la página del producto o en la documentación. Las garantías del fabricante no limitan tus derechos legales.",
      "La garantía no cubre daños causados por una instalación incorrecta realizada por terceros, un uso indebido, la falta de mantenimiento, un tratamiento del agua inadecuado, las heladas o el desgaste normal.",
    ],
  },
  {
    title: "8. Reclamaciones",
    paragraphs: [
      "Si algo no está bien, escríbenos a info@qualitypoolspa.es y describe el problema, a ser posible con fotos y tu número de pedido. Procuramos responder en un plazo de [5] días laborables. Tenemos hojas de reclamaciones a disposición de quien las solicite.",
    ],
  },
  {
    title: "9. Responsabilidad",
    paragraphs: [
      "No somos responsables de pérdidas indirectas ni de retrasos causados por circunstancias ajenas a nuestro control razonable, como retrasos del fabricante, condiciones meteorológicas extremas o incidencias en el transporte. Nada de lo dispuesto en estas condiciones limita la responsabilidad que no pueda limitarse por ley.",
    ],
  },
  {
    title: "10. Datos personales",
    paragraphs: [
      "Utilizamos los datos personales que nos facilitas (como tu nombre, datos de contacto y dirección) para gestionar tus consultas, presupuestos, pedidos y entregas, de acuerdo con el RGPD y la normativa española de protección de datos. No vendemos tus datos. Puedes solicitar en cualquier momento el acceso, la rectificación o la supresión de tus datos contactando con nosotros. [Enlace a la política de privacidad.]",
    ],
  },
  {
    title: "11. Ley aplicable y conflictos",
    paragraphs: [
      "Estas condiciones se rigen por la ley española. Siempre intentaremos resolver cualquier desacuerdo directamente contigo. Si eres consumidor, también puedes dirigirte a la Oficina Municipal de Información al Consumidor (OMIC) de tu localidad o al sistema arbitral de consumo, y conservas el derecho a presentar una demanda ante los tribunales de tu lugar de residencia.",
    ],
  },
];

const sv: Section[] = [
  {
    title: "1. Om oss",
    paragraphs: [
      "Dessa villkor gäller köp av produkter och tjänster från [FÖRETAGETS JURIDISKA NAMN], som driver Quality Pool & Spa, med skattenummer (NIF/CIF) [NUMMER] och registrerad adress [ADRESS], Spanien. E-post: info@qualitypoolspa.es. Telefon: [TELEFON].",
      "När du lägger en beställning hos oss godkänner du dessa villkor. Om en skriftlig offert eller orderbekräftelse anger något annat gäller offerten eller orderbekräftelsen.",
    ],
  },
  {
    title: "2. Offerter och beställningar",
    paragraphs: [
      "Vår webbplats visar endast produkter och information. Den är ingen webbutik, och informationen på den är inget bindande erbjudande. Produktbilder, mått och specifikationer kommer från tillverkarna och kan ändras utan föregående meddelande.",
      "Priser anges i en skriftlig offert. En offert gäller i [30] dagar om inget annat anges. Ett köpeavtal ingås när du skriftligen accepterar offerten och vi skriftligen bekräftar beställningen.",
    ],
  },
  {
    title: "3. Priser och betalning",
    paragraphs: [
      "Priserna anges i euro. Av offerten framgår om moms (IVA) ingår. Leverans, installation, markarbete, elarbete och tillstånd ingår bara när offerten säger det.",
      "Om inget annat avtalats betalas en handpenning på [X] % när beställningen bekräftas, och resten betalas [före leverans / när installationen är klar]. Betalning sker via [banköverföring / kort / annat]. Äganderätten till varorna övergår till dig när de är fullt betalda.",
    ],
  },
  {
    title: "4. Leverans",
    paragraphs: [
      "Leveranstider i offerter och orderbekräftelser är uppskattningar och beror på tillverkaren. Vi meddelar dig så snart som möjligt om en leverans blir försenad.",
      "Du ansvarar för att det finns säker åtkomst för leveransfordon och vid behov lyftutrustning, och för att leveransadressen och eventuella begränsningar i åtkomsten är korrekta. Extra kostnader som uppstår på grund av otillräcklig åtkomst eller felaktiga uppgifter kan debiteras.",
      "Kontrollera varorna vid leverans, anteckna synliga skador på följesedeln och meddela oss inom [48 timmar].",
    ],
  },
  {
    title: "5. Installation och förberedelse av platsen",
    paragraphs: [
      "När installation ingår utför vi eller våra installationspartner det arbete som beskrivs i offerten. Om offerten inte säger annat ansvarar du för eventuella bygglov och tillstånd, ett lämpligt och plant underlag, elförsörjning fram till installationsplatsen och åtkomst till platsen.",
      "Om förhållandena på platsen skiljer sig från vad som avtalats eller förutsatts i offerten kommer vi överens med dig om eventuella ändringar och extra kostnader innan arbetet fortsätter.",
    ],
  },
  {
    title: "6. Ångerrätt",
    paragraphs: [
      "Om du är konsument och avtalet ingicks på distans eller utanför våra affärslokaler kan du frånträda det inom 14 kalenderdagar utan att ange skäl. Ångerfristen börjar den dag du tar emot varorna, eller för tjänsteavtal den dag avtalet ingås. För att ångra köpet skickar du ett tydligt meddelande till oss via e-post eller brev innan fristen gått ut.",
      "Ångerrätten gäller inte varor som tillverkats enligt dina specifikationer eller har en tydlig personlig prägel, som måttanpassade liners, pooler byggda efter dina mått eller specialbeställningar, och inte heller tjänster som fullgjorts helt med ditt förhandsgodkännande. Om du ber oss påbörja en tjänst under ångerfristen betalar du för den del som redan utförts.",
      "Om du ångrar köpet återbetalar vi alla mottagna betalningar, inklusive kostnaden för standardleverans, inom 14 dagar från att vi fått ditt meddelande. Vi kan vänta med återbetalningen tills varorna har kommit tillbaka. Du betalar den direkta kostnaden för att returnera varorna om vi inte kommer överens om något annat.",
    ],
  },
  {
    title: "7. Garanti och reklamationsrätt",
    paragraphs: [
      "Som konsument har du den lagstadgade garantin för avtalsenlighet enligt spansk konsumentlagstiftning (för närvarande tre år från leverans för nya varor). Om en produkt inte överensstämmer med avtalet reparerar eller byter vi den, eller, om det inte är möjligt, sänker vi priset eller återbetalar det, enligt vad lagen föreskriver.",
      "Dessutom har många produkter tillverkarens egen garanti, enligt vad som anges på produktsidan eller i dokumentationen. Tillverkarens garantier begränsar inte dina lagstadgade rättigheter.",
      "Garantin täcker inte skador som orsakats av felaktig installation utförd av andra, felaktig användning, bristande underhåll, olämplig vattenkemi, frost eller normalt slitage.",
    ],
  },
  {
    title: "8. Reklamationer",
    paragraphs: [
      "Om något är fel, kontakta oss på info@qualitypoolspa.es och beskriv problemet, gärna med foton och ditt ordernummer. Vi strävar efter att svara inom [5] arbetsdagar. Reklamationsblanketter (hojas de reclamaciones) finns att få på begäran.",
    ],
  },
  {
    title: "9. Ansvar",
    paragraphs: [
      "Vi ansvarar inte för indirekta förluster eller för förseningar som beror på omständigheter utanför vår rimliga kontroll, som förseningar hos tillverkaren, extremt väder eller störningar i transporter. Ingenting i dessa villkor begränsar ett ansvar som enligt lag inte kan begränsas.",
    ],
  },
  {
    title: "10. Personuppgifter",
    paragraphs: [
      "Vi använder de personuppgifter du lämnar till oss (som namn, kontaktuppgifter och adress) för att hantera dina förfrågningar, offerter, beställningar och leveranser, i enlighet med GDPR och spansk dataskyddslagstiftning. Vi säljer inte dina uppgifter. Du kan när som helst begära att få se, rätta eller radera dina uppgifter genom att kontakta oss. [Länk till integritetspolicyn.]",
    ],
  },
  {
    title: "11. Tillämplig lag och tvister",
    paragraphs: [
      "Dessa villkor regleras av spansk lag. Vi försöker alltid lösa oenigheter direkt med dig. Om du är konsument kan du också vända dig till den lokala konsumentupplysningen (Oficina Municipal de Información al Consumidor) eller till det spanska systemet för konsumentskiljeförfarande, och du behåller rätten att väcka talan vid domstolen på din hemort.",
    ],
  },
];

export const terms: Record<Locale, Section[] | undefined> = { en, es, sv, fr: undefined, de: undefined, ru: undefined };
