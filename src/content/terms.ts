// DRAFT terms of purchase. Company details come from src/config/site.ts. The remaining
// placeholders in [brackets] (deposit, payment method, deadlines) must be filled in, and the whole
// text reviewed by the client's lawyer or accountant before it is published as final.
// Set `isDraft` to false once approved (removes the draft notice on the page).
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";

const { company } = site;

export const isDraft = true;
export const lastUpdated = "2026-11-24";

type Section = { title: string; paragraphs: string[] };

const en: Section[] = [
  {
    title: "1. About us",
    paragraphs: [
      `These terms apply to purchases of products and services from ${company.name}, trading as ${site.name}, with tax number (NIF) ${company.nif}, registered address ${company.address}, Spain. Email: ${site.email}. Phone: ${site.phoneDisplay}.`,
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

// Translated versions. Like the English one, a draft for the client's
// lawyer to review; the Spanish text is the one that matters legally in Spain.
const es: Section[] = [
  {
    title: "1. Quiénes somos",
    paragraphs: [
      `Estas condiciones se aplican a la compra de productos y servicios de ${company.name}, que opera como ${site.name}, con NIF ${company.nif} y domicilio social en ${company.address}, España. Correo electrónico: ${site.email}. Teléfono: ${site.phoneDisplay}.`,
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
      `Dessa villkor gäller köp av produkter och tjänster från ${company.name}, som driver ${site.name}, med skattenummer (NIF) ${company.nif} och registrerad adress ${company.address}, Spanien. E-post: ${site.email}. Telefon: ${site.phoneDisplay}.`,
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

const de: Section[] = [
  {
    title: "1. Über uns",
    paragraphs: [
      `Diese Bedingungen gelten für den Kauf von Produkten und Dienstleistungen von ${company.name}, tätig unter dem Namen ${site.name}, Steuernummer (NIF) ${company.nif}, eingetragener Sitz ${company.address}, Spanien. E-Mail: ${site.email}. Telefon: ${site.phoneDisplay}.`,
      "Mit Ihrer Bestellung akzeptieren Sie diese Bedingungen. Weicht ein schriftliches Angebot oder eine Auftragsbestätigung davon ab, gilt das Angebot bzw. die Auftragsbestätigung.",
    ],
  },
  {
    title: "2. Angebote und Bestellungen",
    paragraphs: [
      "Unsere Website stellt nur Produkte und Informationen dar. Sie ist kein Onlineshop, und ihre Inhalte sind kein verbindliches Angebot. Produktbilder, Maße und technische Daten stammen von den Herstellern und können sich ohne Vorankündigung ändern.",
      "Preise werden in einem schriftlichen Angebot genannt. Ein Angebot gilt [30] Tage, sofern nicht anders angegeben. Ein Kaufvertrag kommt zustande, wenn Sie das Angebot schriftlich annehmen und wir die Bestellung schriftlich bestätigen.",
    ],
  },
  {
    title: "3. Preise und Zahlung",
    paragraphs: [
      "Die Preise verstehen sich in Euro. Aus dem Angebot geht hervor, ob die Mehrwertsteuer (IVA) enthalten ist. Lieferung, Installation, Vorarbeiten, Elektroarbeiten und Genehmigungen sind nur enthalten, wenn das Angebot dies angibt.",
      "Sofern nicht anders vereinbart, ist bei Bestätigung der Bestellung eine Anzahlung von [X] % fällig, der Restbetrag [vor der Lieferung / nach Abschluss der Installation]. Die Zahlung erfolgt per [Banküberweisung / Karte / Sonstiges]. Das Eigentum an der Ware geht mit vollständiger Bezahlung auf Sie über.",
    ],
  },
  {
    title: "4. Lieferung",
    paragraphs: [
      "Lieferzeiten in Angeboten und Auftragsbestätigungen sind Schätzungen und hängen vom Hersteller ab. Verzögert sich eine Lieferung, informieren wir Sie so schnell wie möglich.",
      "Sie sorgen für eine sichere Zufahrt für Lieferfahrzeuge und, falls nötig, Hebegeräte sowie für eine korrekte Lieferadresse und Angaben zu etwaigen Zufahrtsbeschränkungen. Mehrkosten durch unzureichende Zufahrt oder falsche Angaben können berechnet werden.",
      "Bitte prüfen Sie die Ware bei der Lieferung, vermerken Sie sichtbare Schäden auf dem Lieferschein und teilen Sie uns diese innerhalb von [48 Stunden] mit.",
    ],
  },
  {
    title: "5. Installation und Vorbereitung des Standorts",
    paragraphs: [
      "Ist die Installation enthalten, führen wir oder unsere Installationspartner die im Angebot beschriebenen Arbeiten aus. Sofern das Angebot nichts anderes vorsieht, sind Sie für Bau- oder Planungsgenehmigungen, einen geeigneten und ebenen Untergrund, die Stromversorgung bis zum Installationsort und den Zugang zum Standort verantwortlich.",
      "Weichen die Verhältnisse vor Ort von dem ab, was im Angebot vereinbart oder angenommen wurde, stimmen wir etwaige Änderungen und Mehrkosten mit Ihnen ab, bevor wir fortfahren.",
    ],
  },
  {
    title: "6. Widerrufsrecht",
    paragraphs: [
      "Wenn Sie Verbraucher sind und der Vertrag im Fernabsatz oder außerhalb unserer Geschäftsräume geschlossen wurde, können Sie ihn innerhalb von 14 Kalendertagen ohne Angabe von Gründen widerrufen. Die Frist beginnt mit dem Tag, an dem Sie die Ware erhalten, bei Dienstleistungsverträgen mit dem Tag des Vertragsschlusses. Für den Widerruf senden Sie uns vor Fristablauf eine eindeutige Erklärung per E-Mail oder Brief.",
      "Das Widerrufsrecht gilt nicht für Waren, die nach Ihren Vorgaben angefertigt oder eindeutig personalisiert wurden, etwa maßgefertigte Folien, nach Ihren Maßen gebaute Pools oder Sonderbestellungen, und nicht für Dienstleistungen, die mit Ihrer vorherigen Zustimmung vollständig erbracht wurden. Bitten Sie uns, eine Dienstleistung während der Widerrufsfrist zu beginnen, zahlen Sie für den bereits erbrachten Teil.",
      "Bei einem Widerruf erstatten wir alle erhaltenen Zahlungen einschließlich der Standardlieferkosten innerhalb von 14 Tagen nach Eingang Ihrer Mitteilung. Wir können die Erstattung verweigern, bis wir die Ware zurückerhalten haben. Die unmittelbaren Kosten der Rücksendung tragen Sie, sofern nichts anderes vereinbart ist.",
    ],
  },
  {
    title: "7. Gewährleistung und Garantie",
    paragraphs: [
      "Als Verbraucher haben Sie die gesetzliche Gewährleistung für Vertragsmäßigkeit nach spanischem Verbraucherrecht (derzeit drei Jahre ab Lieferung bei Neuware). Entspricht ein Produkt nicht dem Vertrag, reparieren oder ersetzen wir es oder mindern, wenn das nicht möglich ist, den Preis bzw. erstatten ihn, wie gesetzlich vorgesehen.",
      "Viele Produkte haben zusätzlich eine eigene Herstellergarantie, wie auf der Produktseite oder in den Unterlagen angegeben. Herstellergarantien schränken Ihre gesetzlichen Rechte nicht ein.",
      "Die Gewährleistung umfasst keine Schäden durch fehlerhafte Installation durch Dritte, unsachgemäßen Gebrauch, mangelnde Wartung, ungeeignete Wasserchemie, Frost oder normale Abnutzung.",
    ],
  },
  {
    title: "8. Reklamationen",
    paragraphs: [
      `Wenn etwas nicht stimmt, schreiben Sie uns an ${site.email} und beschreiben Sie das Problem, am besten mit Fotos und Ihrer Bestellnummer. Wir bemühen uns, innerhalb von [5] Werktagen zu antworten. Beschwerdeformulare (hojas de reclamaciones) erhalten Sie auf Anfrage.`,
    ],
  },
  {
    title: "9. Haftung",
    paragraphs: [
      "Wir haften nicht für indirekte Schäden oder für Verzögerungen durch Umstände außerhalb unserer zumutbaren Kontrolle, etwa Verzögerungen beim Hersteller, extremes Wetter oder Transportstörungen. Nichts in diesen Bedingungen beschränkt eine Haftung, die gesetzlich nicht beschränkt werden kann.",
    ],
  },
  {
    title: "10. Personenbezogene Daten",
    paragraphs: [
      "Wir verwenden die personenbezogenen Daten, die Sie uns geben (etwa Name, Kontaktdaten und Adresse), um Ihre Anfragen, Angebote, Bestellungen und Lieferungen zu bearbeiten, gemäß der DSGVO und dem spanischen Datenschutzrecht. Wir verkaufen Ihre Daten nicht. Sie können jederzeit Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, indem Sie uns kontaktieren. [Link zur Datenschutzerklärung.]",
    ],
  },
  {
    title: "11. Anwendbares Recht und Streitigkeiten",
    paragraphs: [
      "Für diese Bedingungen gilt spanisches Recht. Wir versuchen stets, Meinungsverschiedenheiten direkt mit Ihnen zu lösen. Als Verbraucher können Sie sich außerdem an die örtliche Verbraucherberatungsstelle (Oficina Municipal de Información al Consumidor) oder an das spanische Verbraucherschiedssystem wenden und behalten das Recht, vor den Gerichten Ihres Wohnorts zu klagen.",
    ],
  },
];

const fr: Section[] = [
  {
    title: "1. Qui sommes-nous",
    paragraphs: [
      `Les présentes conditions s’appliquent aux achats de produits et de services auprès de ${company.name}, exerçant sous le nom ${site.name}, numéro fiscal (NIF) ${company.nif}, siège social ${company.address}, Espagne. E-mail : ${site.email}. Téléphone : ${site.phoneDisplay}.`,
      "En passant commande, vous acceptez les présentes conditions. Si un devis ou une confirmation de commande écrits prévoient autre chose, le devis ou la confirmation de commande prévalent.",
    ],
  },
  {
    title: "2. Devis et commandes",
    paragraphs: [
      "Notre site présente uniquement des produits et des informations. Ce n’est pas une boutique en ligne, et son contenu ne constitue pas une offre ferme. Les images, dimensions et caractéristiques des produits proviennent des fabricants et peuvent changer sans préavis.",
      "Les prix sont indiqués dans un devis écrit. Un devis est valable [30] jours sauf mention contraire. Le contrat de vente est conclu lorsque vous acceptez le devis par écrit et que nous confirmons la commande par écrit.",
    ],
  },
  {
    title: "3. Prix et paiement",
    paragraphs: [
      "Les prix sont exprimés en euros. Le devis précise si la TVA (IVA) est incluse. La livraison, l’installation, les travaux préparatoires, les travaux électriques et les autorisations ne sont inclus que si le devis le prévoit.",
      "Sauf accord contraire, un acompte de [X] % est versé à la confirmation de la commande et le solde [avant la livraison / à la fin de l’installation]. Le paiement s’effectue par [virement bancaire / carte / autre]. La propriété des marchandises vous est transférée lorsqu’elles sont intégralement payées.",
    ],
  },
  {
    title: "4. Livraison",
    paragraphs: [
      "Les délais de livraison indiqués dans les devis et confirmations de commande sont des estimations et dépendent du fabricant. Nous vous informerons dès que possible en cas de retard.",
      "Vous devez garantir un accès sûr pour les véhicules de livraison et, si nécessaire, pour le matériel de levage, ainsi que l’exactitude de l’adresse de livraison et des éventuelles restrictions d’accès. Les frais supplémentaires dus à un accès insuffisant ou à des informations erronées peuvent être facturés.",
      "Vérifiez la marchandise à la livraison, notez tout dommage visible sur le bon de livraison et signalez-le-nous dans un délai de [48 heures].",
    ],
  },
  {
    title: "5. Installation et préparation du site",
    paragraphs: [
      "Lorsque l’installation est incluse, nous ou nos partenaires installateurs réalisons les travaux décrits dans le devis. Sauf mention contraire du devis, vous êtes responsable des permis de construire ou autorisations d’urbanisme, d’une base adaptée et de niveau, de l’alimentation électrique jusqu’au point d’installation et de l’accès au site.",
      "Si les conditions sur place diffèrent de ce qui a été convenu ou supposé dans le devis, nous conviendrons avec vous des modifications et frais supplémentaires avant de poursuivre.",
    ],
  },
  {
    title: "6. Droit de rétractation",
    paragraphs: [
      "Si vous êtes un consommateur et que le contrat a été conclu à distance ou hors de nos locaux, vous pouvez vous rétracter dans un délai de 14 jours calendaires sans avoir à vous justifier. Le délai court à compter du jour où vous recevez les marchandises ou, pour les contrats de services, du jour de la conclusion du contrat. Pour vous rétracter, envoyez-nous une déclaration claire par e-mail ou par courrier avant l’expiration du délai.",
      "Le droit de rétractation ne s’applique pas aux biens confectionnés selon vos spécifications ou nettement personnalisés, comme les liners sur mesure, les piscines fabriquées à vos dimensions ou les commandes spéciales, ni aux services pleinement exécutés avec votre accord préalable. Si vous nous demandez de commencer un service pendant le délai de rétractation, vous payez la partie déjà exécutée.",
      "En cas de rétractation, nous remboursons tous les paiements reçus, y compris les frais de livraison standard, dans les 14 jours suivant la réception de votre notification. Nous pouvons différer le remboursement jusqu’à la récupération des marchandises. Le coût direct du renvoi est à votre charge, sauf accord contraire.",
    ],
  },
  {
    title: "7. Garanties",
    paragraphs: [
      "En tant que consommateur, vous bénéficiez de la garantie légale de conformité prévue par le droit espagnol de la consommation (actuellement trois ans à compter de la livraison pour les biens neufs). Si un produit n’est pas conforme au contrat, nous le réparons ou le remplaçons ou, si ce n’est pas possible, réduisons le prix ou le remboursons, conformément à la loi.",
      "En outre, de nombreux produits bénéficient de la garantie commerciale du fabricant, indiquée sur la page du produit ou dans la documentation. Les garanties du fabricant ne limitent pas vos droits légaux.",
      "La garantie ne couvre pas les dommages causés par une installation incorrecte réalisée par des tiers, une mauvaise utilisation, un défaut d’entretien, un traitement de l’eau inadapté, le gel ou l’usure normale.",
    ],
  },
  {
    title: "8. Réclamations",
    paragraphs: [
      `En cas de problème, écrivez-nous à ${site.email} en décrivant la situation, si possible avec des photos et votre numéro de commande. Nous nous efforçons de répondre sous [5] jours ouvrés. Des formulaires de réclamation (hojas de reclamaciones) sont disponibles sur demande.`,
    ],
  },
  {
    title: "9. Responsabilité",
    paragraphs: [
      "Nous ne sommes pas responsables des pertes indirectes ni des retards dus à des circonstances échappant à notre contrôle raisonnable, comme des retards du fabricant, des conditions météorologiques extrêmes ou des perturbations des transports. Aucune disposition des présentes conditions ne limite une responsabilité qui ne peut être limitée par la loi.",
    ],
  },
  {
    title: "10. Données personnelles",
    paragraphs: [
      "Nous utilisons les données personnelles que vous nous communiquez (nom, coordonnées, adresse) pour traiter vos demandes, devis, commandes et livraisons, conformément au RGPD et à la loi espagnole sur la protection des données. Nous ne vendons pas vos données. Vous pouvez à tout moment demander à y accéder, à les rectifier ou à les supprimer en nous contactant. [Lien vers la politique de confidentialité.]",
    ],
  },
  {
    title: "11. Droit applicable et litiges",
    paragraphs: [
      "Les présentes conditions sont régies par le droit espagnol. Nous chercherons toujours à résoudre les désaccords directement avec vous. Si vous êtes un consommateur, vous pouvez également vous adresser au bureau local d’information des consommateurs (Oficina Municipal de Información al Consumidor) ou au système espagnol d’arbitrage de la consommation, et vous conservez le droit de saisir les tribunaux de votre lieu de résidence.",
    ],
  },
];

const ru: Section[] = [
  {
    title: "1. О нас",
    paragraphs: [
      `Настоящие условия распространяются на покупку товаров и услуг у компании ${company.name}, работающей под названием ${site.name}, налоговый номер (NIF) ${company.nif}, юридический адрес: ${company.address}, Испания. Эл. почта: ${site.email}. Телефон: ${site.phoneDisplay}.`,
      "Оформляя заказ, вы принимаете настоящие условия. Если письменное предложение или подтверждение заказа предусматривает иное, действует предложение или подтверждение заказа.",
    ],
  },
  {
    title: "2. Предложения и заказы",
    paragraphs: [
      "Наш сайт только представляет товары и информацию. Это не интернет-магазин, и его содержание не является обязывающей офертой. Изображения, размеры и характеристики товаров предоставлены производителями и могут меняться без предупреждения.",
      "Цены указываются в письменном коммерческом предложении. Предложение действует [30] дней, если в нём не указано иное. Договор купли-продажи заключается, когда вы письменно принимаете предложение, а мы письменно подтверждаем заказ.",
    ],
  },
  {
    title: "3. Цены и оплата",
    paragraphs: [
      "Цены указаны в евро. В предложении указано, включён ли НДС (IVA). Доставка, установка, подготовительные и электромонтажные работы, а также разрешения включены, только если это указано в предложении.",
      "Если не согласовано иное, при подтверждении заказа вносится предоплата в размере [X] %, а остаток оплачивается [до доставки / после завершения установки]. Оплата производится [банковским переводом / картой / иным способом]. Право собственности на товар переходит к вам после его полной оплаты.",
    ],
  },
  {
    title: "4. Доставка",
    paragraphs: [
      "Сроки доставки в предложениях и подтверждениях заказа являются ориентировочными и зависят от производителя. Мы сообщим вам как можно скорее, если доставка задерживается.",
      "Вы обеспечиваете безопасный подъезд для транспорта доставки и, при необходимости, подъёмной техники, а также правильность адреса доставки и сведений об ограничениях доступа. Дополнительные расходы, вызванные недостаточным доступом или неверными сведениями, могут быть выставлены к оплате.",
      "Проверьте товар при получении, отметьте видимые повреждения в накладной и сообщите нам о них в течение [48 часов].",
    ],
  },
  {
    title: "5. Установка и подготовка площадки",
    paragraphs: [
      "Если установка включена, мы или наши партнёры-монтажники выполняем работы, описанные в предложении. Если в предложении не указано иное, вы отвечаете за разрешения на строительство или планировку, подходящее ровное основание, подвод электропитания к месту установки и доступ к площадке.",
      "Если условия на месте отличаются от согласованных или предполагавшихся в предложении, мы согласуем с вами изменения и дополнительные расходы, прежде чем продолжить.",
    ],
  },
  {
    title: "6. Право на отказ от договора",
    paragraphs: [
      "Если вы являетесь потребителем и договор был заключён дистанционно или вне наших помещений, вы можете отказаться от него в течение 14 календарных дней без объяснения причин. Срок начинается со дня получения товара, а для договоров на услуги — со дня заключения договора. Чтобы отказаться, направьте нам ясное заявление по эл. почте или письмом до истечения срока.",
      "Право на отказ не распространяется на товары, изготовленные по вашим требованиям или явно персонализированные, например лайнеры по индивидуальным размерам, бассейны, изготовленные по вашим размерам, или специальные заказы, а также на услуги, полностью оказанные с вашего предварительного согласия. Если вы просите начать оказание услуги в период отказа, вы оплачиваете уже выполненную часть.",
      "При отказе мы возвращаем все полученные платежи, включая стоимость стандартной доставки, в течение 14 дней с момента получения вашего уведомления. Мы можем удержать возврат до получения товара обратно. Прямые расходы на возврат товара несёте вы, если не договорено иное.",
    ],
  },
  {
    title: "7. Гарантия",
    paragraphs: [
      "Как потребитель вы имеете законную гарантию соответствия по испанскому законодательству о защите прав потребителей (в настоящее время — три года с момента доставки для новых товаров). Если товар не соответствует договору, мы отремонтируем или заменим его, а если это невозможно, снизим цену или вернём деньги в соответствии с законом.",
      "Кроме того, на многие товары распространяется гарантия производителя, указанная на странице товара или в документации. Гарантии производителя не ограничивают ваши законные права.",
      "Гарантия не распространяется на повреждения, вызванные неправильной установкой третьими лицами, ненадлежащим использованием, отсутствием обслуживания, неподходящим химическим составом воды, морозом или естественным износом.",
    ],
  },
  {
    title: "8. Претензии",
    paragraphs: [
      `Если что-то не так, напишите нам на ${site.email} и опишите проблему, по возможности приложив фото и номер заказа. Мы стараемся отвечать в течение [5] рабочих дней. Бланки жалоб (hojas de reclamaciones) предоставляются по запросу.`,
    ],
  },
  {
    title: "9. Ответственность",
    paragraphs: [
      "Мы не несём ответственности за косвенные убытки и задержки, вызванные обстоятельствами вне нашего разумного контроля, такими как задержки производителя, экстремальная погода или перебои в работе транспорта. Ничто в настоящих условиях не ограничивает ответственность, которая не может быть ограничена по закону.",
    ],
  },
  {
    title: "10. Персональные данные",
    paragraphs: [
      "Мы используем предоставленные вами персональные данные (например, имя, контактные данные и адрес) для обработки ваших запросов, предложений, заказов и доставок в соответствии с GDPR и испанским законодательством о защите данных. Мы не продаём ваши данные. Вы в любой момент можете запросить доступ к своим данным, их исправление или удаление, связавшись с нами. [Ссылка на политику конфиденциальности.]",
    ],
  },
  {
    title: "11. Применимое право и споры",
    paragraphs: [
      "Настоящие условия регулируются законодательством Испании. Мы всегда стараемся решать разногласия напрямую с вами. Если вы являетесь потребителем, вы также можете обратиться в местное бюро по защите прав потребителей (Oficina Municipal de Información al Consumidor) или в испанскую систему потребительского арбитража и сохраняете право обратиться в суд по месту своего жительства.",
    ],
  },
];

export const terms: Record<Locale, Section[] | undefined> = { en, es, sv, de, fr, ru };
