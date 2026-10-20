/** Auto-generated tool page content. */
export interface ToolPageContent {
slug: string; calc: string; h1: string; title: string; description: string; answer: string; form: string;
sections: [string, string][]; faqs: [string, string][]; sources: [string, string][];
}
export const TOOL_PAGES: ToolPageContent[] = [
  {
    slug: "yarn-blanket-calculator",
    calc: "yarn-blanket",
    h1: "Yarn Blanket Calculator: How Much Yarn for a Blanket?",
    title: "Yarn Blanket Calculator: How Much Yarn for a Blanket?",
    description: "Find how many yards and skeins you need for a knit or crochet blanket. Pick a baby, throw, twin or queen size and yarn weight for an instant yardage estimate.",
    answer: "A typical 50\u00d760 inch throw in medium (worsted / category 4) yarn needs about 1,100\u20131,400 yards (1,000\u20131,280 m) to knit, or roughly 25\u201330% more to crochet. Enter dimensions, yarn weight, and skein size below for a project-specific estimate with waste allowance.",
    form: `<div class="field"><label for="preset">Preset size</label><select id="preset" name="preset" data-preset><option value="">Custom</option><option value="30x36">Baby 30×36"</option><option value="50x60" selected>Throw 50×60"</option><option value="66x90">Twin 66×90"</option><option value="90x100">Queen 90×100"</option></select></div><div class="field"><label for="unit">Units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="width">Width</label><input id="width" name="width" type="number" inputmode="decimal" min="1" step="any" value="50" required /></div><div class="field"><label for="length">Length</label><input id="length" name="length" type="number" inputmode="decimal" min="1" step="any" value="60" required /></div><div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="method">Method</label><select id="method" name="method" ><option value="knit">Knitting</option><option value="crochet">Crochet</option></select></div><div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" step="any" value="200" required /></div><div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit" ><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" step="any" value="100" /></div>`,
    sections: [
      ["How this calculator works", "The tool multiplies blanket area by a yarn-density factor for your Craft Yarn Council weight and craft method, adds a 10% waste allowance, then divides by skein length for whole skeins. Optional grams use your skein weight or category midpoints from typical CYC-linked yardage ranges."],
      ["Formula and method", "Yards \u2248 width_in \u00d7 length_in \u00d7 density(weight, method) \u00d7 1.10. Densities are planning averages calibrated to common pattern yardages for throws. Crochet multiplies knit density by about 1.28. Cables and dense textures use more yarn than stockinette averages."],
      ["Worked example", "Throw 50\u00d760\", worsted (#4), knit, 200 yd/100 g skeins: area 3,000 in\u00b2. With density 0.55 and 10% waste \u2192 about 1,815 yd \u2192 buy 10 skeins. Switching to crochet increases yardage by roughly a quarter."],
      ["Tips for accurate buys", "Use the CYC number on the ball band. Weigh a washed gauge swatch and scale grams by area for lace or highly textured stitches. Calculate stripe colors by area share. Buy one extra skein from the same dye lot for large solids."],
      ["Common mistakes", "Mixing cm inputs with inch presets; ignoring that crochet uses more yarn; skipping waste so you run short; mixing dye lots; trusting a website estimate over a pattern\u2019s tested yardage when you follow that pattern."],
      ["Planning table and unit notes", "Use inches or centimeters consistently. Approximate planning ranges for knit blankets in worsted (#4): lovey 12×12\" ~80–120 yd; baby 30×36\" ~500–700 yd; throw 50×60\" ~1,100–1,800 yd; twin ~2,000–3,000 yd. Crochet: multiply by about 1.25–1.3. Convert yards to meters by multiplying by 0.9144; grams and ounces appear when you enter skein weight. These ranges support shopping—always verify with a swatch weight when stitch patterns are dense. For gradient cakes, compare total cake yardage to the calculator output before starting the border. If you change needle size after casting on, re-estimate because looser fabric consumes yarn differently per square inch."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How much yarn for a throw blanket?", "A 50\u00d760\" worsted knit throw often needs about 1,100\u20131,800 yards depending on stitch density\u2014commonly 6\u201310 skeins at 200 yards. Run your exact skein length through the calculator."],
      ["Does crochet use more yarn than knitting?", "Yes. For the same size and weight category, crochet typically needs about 25\u201330% more yarn."],
      ["Should I buy an extra skein?", "Yes for solid-color projects when dye lots matter."],
    ],
    sources: [["Craft Yarn Council — Standard Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"],["Craft Yarn Council — Standards overview","https://www.craftyarncouncil.com/standards"]],
  },
  {
    slug: "yarn-sweater-calculator",
    calc: "yarn-sweater",
    h1: "Yarn Sweater Calculator: How Much Yarn for a Sweater?",
    title: "Yarn Sweater Calculator: How Much Yarn by Size?",
    description: "Estimate yards and skeins for a knit or crochet sweater by chest size and Craft Yarn Council yarn weight. Free planning tool with inches or centimeters and skein math.",
    answer: "A medium adult sweater in worsted (category 4) yarn usually needs about 1,000\u20131,400 yards to knit, more for long sleeves, cables, or crochet. Pick a size and yarn weight below to estimate skeins from your ball-band yardage.",
    form: `<div class="field"><label for="size">Size</label><select id="size" name="size" ><option value="xs">XS</option><option value="s">S</option><option value="m" selected>M</option><option value="l">L</option><option value="xl">XL</option><option value="2xl">2XL</option></select></div><div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="method">Method</label><select id="method" name="method" ><option value="knit">Knitting</option><option value="crochet">Crochet</option></select></div><div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" step="any" value="200" required /></div><div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit" ><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" step="any" value="100" /></div>`,
    sections: [
      ["How sweater yarn estimates are built", "We approximate the sweater as a body rectangle (chest \u00d7 length) plus two sleeves, convert that surface to an equivalent area, then apply the density model with a 15% waste factor for seaming, ribbing, and swatches."],
      ["Formula", "Body area = chest \u00d7 length; sleeve area \u2248 2 \u00d7 (chest/4 + 2\") \u00d7 sleeve length; total yards = area \u00d7 density \u00d7 1.15. Size chart values are common adult finished measurements in inches."],
      ["Worked example", "Size M (40\" chest, 26\" length, 18\" sleeve), worsted knit, 200 yd skeins: expect on the order of 1,000+ yards and several skeins. Crochet or Aran cables push the count higher."],
      ["Tips", "Compare against your pattern\u2019s yardage first. For cropped or tunic lengths, start from the closest size and scale by length ratio."],
      ["Common mistakes", "Using fingering yardage charts with bulky yarn; forgetting sleeves; omitting ease; not swatching after substitution."],
      ["Size chart notes and ease", "Built-in sizes use common adult finished chest measurements from XS through 2XL. They are not body measurements; add or subtract ease in your pattern separately. Short sleeves reduce yardage roughly in proportion to sleeve length; cropped bodies scale with length. Colorwork and cables can add 10–25% yarn. When substituting fiber, remember that cotton sweaters often need more ease and may need extra yardage because cotton has less stretch recovery than wool. Keep dye-lot stickers until the sweater is finished and blocked."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How many skeins for a sweater?", "Worsted adult sweaters often need 5\u201310 skeins of 200 yd / 100 g, depending on size and stitch pattern."],
      ["What if my yarn is DK?", "Choose category 3. DK usually needs more yards than worsted for the same size."],
    ],
    sources: [["Craft Yarn Council — Standard Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"],["Craft Yarn Council — Body measurements & ease","https://www.craftyarncouncil.com/standards/body-sizing"]],
  },
  {
    slug: "yarn-hat-calculator",
    calc: "yarn-hat",
    h1: "Yarn Hat Calculator: How Much Yarn for a Hat?",
    title: "Yarn Hat Calculator: Yards & Skeins by Size",
    description: "Calculate yarn yards and skeins for knit or crochet hats from circumference, depth and CYC yarn weight. Free estimator for beanie and adult sizes in inches.",
    answer: "Most adult knit hats in worsted yarn use about 100\u2013180 yards (90\u2013165 m). Enter head circumference and hat depth below\u2014child sizes need less; slouchy or brioche hats need more.",
    form: `<div class="field"><label for="circumference">Circumference (inches)</label><input id="circumference" name="circumference" type="number" inputmode="decimal" min="1" step="any" value="22" required /></div><div class="field"><label for="depth">Depth (inches)</label><input id="depth" name="depth" type="number" inputmode="decimal" min="1" step="any" value="8" required /></div><div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="method">Method</label><select id="method" name="method" ><option value="knit">Knitting</option><option value="crochet">Crochet</option></select></div><div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" step="any" value="200" required /></div><div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit" ><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" step="any" value="100" /></div>`,
    sections: [
      ["Method", "We model the hat as a tapered cylinder: area \u2248 circumference \u00d7 depth \u00d7 0.85, then apply yarn density and 10% waste. Use finished hat circumference (often 1\u20132\" negative ease for knit ribbed hats)."],
      ["Worked example", "Adult 22\" \u00d7 8\" depth, worsted knit: expect roughly one 200 yd skein with leftover for a pom-pom."],
      ["Tips", "Measure above the ears. For double-brim hats, increase depth before calculating."],
      ["Common mistakes", "Skipping negative ease for stretchy knits; underestimating faux-fur pom yarn."],
      ["Sizing guidance", "Preemie hats may be 10–12\" around; baby 14–16\"; toddler 18–20\"; adult small 21\"; adult large 23\". Depth includes brim. For a folded brim, add the fold height to depth before estimating yarn. Slouch adds 1–3\" of depth and noticeable yardage. Fur pom-poms are usually purchased separately; yarn pom-poms may take 20–40 yards."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How much yarn for an adult hat?", "About 100\u2013180 yards of worsted for a classic beanie; bulky may need only 60\u2013100 yards."],
      ["Child hat yardage?", "Try 18\u201320\" circumference and 6\u20137\" depth for many toddlers."],
    ],
    sources: [["Craft Yarn Council — Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"],["Craft Yarn Council — Head circumference chart","https://www.craftyarncouncil.com/standards/head-circumference-chart"]],
  },
  {
    slug: "yarn-scarf-calculator",
    calc: "yarn-scarf",
    h1: "Yarn Scarf Calculator: How Much Yarn for a Scarf?",
    title: "Yarn Scarf Calculator: Width, Length & Yardage",
    description: "Estimate yarn yards and skeins for scarves and wraps by width, length, yarn weight and knit or crochet. Free calculator with yards, meters and optional grams.",
    answer: "A classic 8\u00d760 inch worsted knit scarf often needs about 350\u2013500 yards. Wider wraps and lace scarves vary widely\u2014enter your dimensions and skein details below.",
    form: `<div class="field"><label for="unit">Units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="width">Width</label><input id="width" name="width" type="number" inputmode="decimal" min="1" step="any" value="8" required /></div><div class="field"><label for="length">Length</label><input id="length" name="length" type="number" inputmode="decimal" min="1" step="any" value="60" required /></div><div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="method">Method</label><select id="method" name="method" ><option value="knit">Knitting</option><option value="crochet">Crochet</option></select></div><div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" step="any" value="200" required /></div><div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit" ><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" step="any" value="100" /></div>`,
    sections: [
      ["How it works", "Scarves use the rectangle yarn model with an 8% waste factor. Open lace uses less yarn than the average; dense rib uses more."],
      ["Worked example", "8\u00d760\" worsted knit scarf at 200 yd/skein: expect about 2\u20133 skeins. A 20\u00d770\" DK wrap can need 600\u2013900 yards."],
      ["Tips", "For cowls, use circumference \u00d7 height as width \u00d7 length. Fringe adds 10\u201320 yards typically."],
      ["Common mistakes", "Planning only one skein of gradient yarn for a long scarf."],
      ["Dimensions people actually make", "Narrow scarves of 6–7\" wear neatly under coats; 8–10\" is a common handmade default; shawls and wraps 18–30\" wide need substantially more yarn. Infinity scarves: treat the loop circumference as length. Blocking lace open increases area without using more yarn—estimate from pre-block dimensions for yardage, then block to shape."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How many balls for a scarf?", "Often 1\u20133 balls of 200 yd worsted for a narrow scarf."],
      ["Meters or yards?", "Select your skein unit to match the ball band."],
    ],
    sources: [["Craft Yarn Council — Standard Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"]],
  },
  {
    slug: "yarn-amigurumi-calculator",
    calc: "yarn-amigurumi",
    h1: "Amigurumi Yarn Calculator: Yarn for Soft Toys",
    title: "Amigurumi Yarn Calculator: Height to Yardage",
    description: "Estimate yarn for amigurumi from finished height and Craft Yarn Council yarn weight. Free planner for crochet toys in inches or centimeters with skein counts.",
    answer: "A 6 inch amigurumi in light (DK / category 3) cotton often needs about 50\u2013120 yards of main color, depending on girth and accessories. Enter height and yarn weight for a planning estimate.",
    form: `<div class="field"><label for="unit">Units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="height">Finished height</label><input id="height" name="height" type="number" inputmode="decimal" min="1" step="any" value="6" required /></div><div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3" selected>3 — Light / DK</option>
<option value="4">4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" step="any" value="150" required /></div><div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit" ><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" step="any" value="50" /></div>`,
    sections: [
      ["Method", "We approximate the toy as a sphere-like surface from height (radius \u2248 height/2.5), compute surface area, then apply crochet density and 15% waste."],
      ["Worked example", "6\" tall figure, DK yarn, 150 yd skeins: expect under one skein of main color for a simple shape."],
      ["Tips", "Tight gauge uses more yarn but hides stuffing. Weigh scraps from a similar finished toy when making a series."],
      ["Common mistakes", "Using blanket densities for tiny toys; forgetting contrast colors."],
      ["Safety and finishing notes", "Amigurumi estimates cover yarn only—not stuffing, eyes, or wire. For child gifts, use safety eyes installed before closing pieces, or embroider features. Split complementary colors as separate mini estimates. Polyester stuffing is common; wool stuffing changes the hand but not yarn math. Keep gauge tight enough that stuffing does not show."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How much yarn for amigurumi?", "Small 4\u20136\" toys often fit in 50\u2013150 yards of DK or worsted main color."],
      ["Best yarn weight?", "DK and worsted cotton or acrylic are common; categories 2\u20134 cover most patterns."],
    ],
    sources: [["Craft Yarn Council — Standard Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"],["Craft Yarn Council — Crochet standards","https://www.craftyarncouncil.com/standards"]],
  },
  {
    slug: "yarn-substitution-calculator",
    calc: "yarn-substitution",
    h1: "Yarn Substitution Calculator: Weight & Yardage Converter",
    title: "Yarn Substitution Calculator: CYC Weight Converter",
    description: "Convert yarn yardage between Craft Yarn Council weights and convert grams, ounces, yards and meters. Free substitution helper so you can swap skeins with confidence.",
    answer: "To substitute yarn, keep fabric weight similar: convert original yards into grams using the old weight\u2019s yards-per-100 g average, then back into yards for the new weight. Use the converter below for CYC categories 0\u20137 and unit changes.",
    form: `<div class="field"><label for="mode">Mode</label><select id="mode" name="mode" ><option value="substitute" selected>Substitute between weights</option><option value="convert">Convert g / oz / yd / m</option></select></div><div class="field"><label for="yards">Original yards (substitute mode)</label><input id="yards" name="yards" type="number" inputmode="decimal" min="0" step="any" value="400" required /></div><div class="field"><label for="fromWeight">From weight</label><select id="fromWeight" name="fromWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="toWeight">To weight</label><select id="toWeight" name="toWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3" selected>3 — Light / DK</option>
<option value="4">4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div><div class="field"><label for="value">Value (convert mode)</label><input id="value" name="value" type="number" inputmode="decimal" min="0" step="any" value="100" required /></div><div class="field"><label for="fromUnit">From unit</label><select id="fromUnit" name="fromUnit" ><option value="g">Grams</option><option value="oz">Ounces</option><option value="yd">Yards</option><option value="m">Meters</option></select></div><div class="field"><label for="yarnWeight">Weight for convert mode</label><select id="yarnWeight" name="yarnWeight" >
<option value="0">0 — Lace</option>
<option value="1">1 — Super Fine</option>
<option value="2">2 — Fine / Sport</option>
<option value="3">3 — Light / DK</option>
<option value="4" selected>4 — Medium / Worsted</option>
<option value="5">5 — Bulky</option>
<option value="6">6 — Super Bulky</option>
<option value="7">7 — Jumbo</option></select></div>`,
    sections: [
      ["How substitution works", "Midpoint yards-per-100 g for each CYC category come from typical ball-band ranges associated with the Craft Yarn Council weight system. Same grams \u2248 similar coverage; yardage changes with wraps-per-inch."],
      ["Worked example", "400 yd of worsted (#4) \u2192 DK (#3): DK has more yards per 100 g, so required yardage rises. Always swatch\u2014drape still differs."],
      ["Tips", "Match fiber content when possible. Check WPI if labels disagree. Needle or hook size usually changes with the new yarn."],
      ["Common mistakes", "Matching only skein count without yardage; skipping swatches."],
      ["Reading ball bands", "Look for the CYC yarn-weight icon (0–7), suggested needle/hook, and gauge. Wraps per inch (WPI) help when labels are missing: wrap yarn snugly around a ruler for one inch and count wraps. When substituting handspun, weigh the skein and measure length with a yarn meter or by skeining on a niddy-noddy of known circumference. Always knit a gauge swatch in the project stitch."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["Can I substitute DK for worsted?", "Sometimes, with more yardage and adjusted needle size. Swatch for gauge and hand."],
      ["How many grams in a skein?", "Read the band. This tool converts using category averages when you only know yards or grams."],
    ],
    sources: [["Craft Yarn Council — Standard Yarn Weight System","https://www.craftyarncouncil.com/standards/yarn-weight-system"],["Craft Yarn Council — Yarn standards FAQs","https://www.craftyarncouncil.com/standards/faqs"]],
  },
  {
    slug: "knitting-gauge-calculator",
    calc: "knitting-gauge",
    h1: "Knitting Gauge Calculator: Stitches Per Inch & Resize",
    title: "Knitting Gauge Calculator: Stitches Per Inch & Resize",
    description: "Free knitting gauge calculator: get stitches and rows per inch from your swatch, convert gauge to finished size, or resize a pattern to match your own gauge.",
    answer: "Gauge is stitches and rows in a measured swatch\u2014usually reported per 4 inches (10 cm). Measure a blocked swatch, enter stitch/row counts and dimensions, then convert to cast-on counts or resize a pattern so finished measurements stay correct.",
    form: `<div class="field"><label for="mode">Mode</label><select id="mode" name="mode" data-mode-select><option value="gauge" selected>Swatch → gauge</option><option value="size">Gauge → size</option><option value="resize">Resize pattern</option></select></div><div class="field" data-mode-show="gauge size resize"><label for="stitches">Stitches in swatch</label><input id="stitches" name="stitches" type="number" inputmode="decimal" min="1" step="any" value="20" required /></div><div class="field" data-mode-show="gauge size resize"><label for="rows">Rows in swatch</label><input id="rows" name="rows" type="number" inputmode="decimal" min="1" step="any" value="28" required /></div><div class="field" data-mode-show="gauge size resize"><label for="swatchWidth">Swatch width</label><input id="swatchWidth" name="swatchWidth" type="number" inputmode="decimal" min="0.1" step="any" value="4" required /></div><div class="field" data-mode-show="gauge size resize"><label for="swatchHeight">Swatch height</label><input id="swatchHeight" name="swatchHeight" type="number" inputmode="decimal" min="0.1" step="any" value="4" required /></div><div class="field" data-mode-show="gauge size resize"><label for="swatchUnit">Swatch units</label><select id="swatchUnit" name="swatchUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field" data-mode-show="size" hidden><label for="targetWidth">Target width</label><input id="targetWidth" name="targetWidth" type="number" inputmode="decimal" min="0" step="any" value="20" /></div><div class="field" data-mode-show="size" hidden><label for="targetLength">Target length</label><input id="targetLength" name="targetLength" type="number" inputmode="decimal" min="0" step="any" value="10" /></div><div class="field" data-mode-show="size" hidden><label for="targetUnit">Target units</label><select id="targetUnit" name="targetUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field" data-mode-show="resize" hidden><label for="patternStitches">Pattern stitches</label><input id="patternStitches" name="patternStitches" type="number" inputmode="decimal" min="0" step="any" value="100" /></div><div class="field" data-mode-show="resize" hidden><label for="patternRows">Pattern rows</label><input id="patternRows" name="patternRows" type="number" inputmode="decimal" min="0" step="any" value="120" /></div><div class="field" data-mode-show="resize" hidden><label for="patternSts4">Pattern sts per 4"</label><input id="patternSts4" name="patternSts4" type="number" inputmode="decimal" min="0" step="any" value="20" /></div><div class="field" data-mode-show="resize" hidden><label for="patternRows4">Pattern rows per 4"</label><input id="patternRows4" name="patternRows4" type="number" inputmode="decimal" min="0" step="any" value="28" /></div>`,
    sections: [
      ["Why gauge matters", "If you have more stitches per inch than the pattern, the same cast-on makes a narrower fabric. Resizing multiplies pattern stitches by (your sts per 4\") / (pattern sts per 4\")."],
      ["Formulas", "sts/in = swatch_stitches \u00f7 swatch_width_in; target stitches = round(target_width_in \u00d7 sts/in); resized stitches = round(pattern_stitches \u00d7 your_sts4 / pattern_sts4)."],
      ["Worked example", "20 stitches over 4\" \u2192 5 sts/in. For a 20\" width you cast on 100 stitches. If the pattern assumes 18 sts/4\" and you get 20, multiply stitch counts by 20/18."],
      ["Tips", "Wash and block the swatch as you will the garment. Measure center stitches, not edges."],
      ["Common mistakes", "Measuring a tiny swatch; counting the cast-on edge as a stitch row."],
      ["Blocking and measurement practice", "Swatch in the same stitch pattern as the project fabric (ribbing pulls in; cables draw width). Use the needles you plan to use. Count over 4\" with pins marking the edges of the counted stitches. If your row gauge differs, adjust length in pattern instructions rather than forcing needle changes that break stitch gauge. For circular projects, a flat swatch can still be indicative if tension matches."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Block swatches the way you will block the finished project."],
    ],
    faqs: [
      ["How do I measure knitting gauge?", "Knit a swatch at least 4\u20136\" wide, block it, then count stitches and rows over 4 inches in the center."],
      ["What if row gauge is off but stitch gauge matches?", "Adjust length by working fewer or more rows; stitch gauge controls width."],
    ],
    sources: [["Craft Yarn Council — Standards and guidelines","https://www.craftyarncouncil.com/standards"],["Craft Yarn Council — Yarn Weight System (gauge ranges)","https://www.craftyarncouncil.com/standards/yarn-weight-system"]],
  },
  {
    slug: "crochet-blanket-calculator",
    calc: "crochet-blanket",
    h1: "Crochet Blanket Starting Chain & Stitch Calculator",
    title: "Crochet Blanket Starting Chain & Stitch Calculator",
    description: "Calculate starting chain, stitches across and rows for a crochet blanket from your gauge and finished size. Free stitch planner—not a yarn yardage estimator.",
    answer: "Stitches across = blanket width \u00d7 (stitches in 4\" \u00f7 4). Rows = length \u00d7 (rows in 4\" \u00f7 4). Enter your gauge and target size to get starting chain (stitches + turning chain) and total stitch estimates.",
    form: `<div class="field"><label for="unit">Units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="width">Blanket width</label><input id="width" name="width" type="number" inputmode="decimal" min="1" step="any" value="36" required /></div><div class="field"><label for="length">Blanket length</label><input id="length" name="length" type="number" inputmode="decimal" min="1" step="any" value="40" required /></div><div class="field"><label for="stitchesPer4in">Stitches per 4 inches</label><input id="stitchesPer4in" name="stitchesPer4in" type="number" inputmode="decimal" min="1" step="any" value="12" required /></div><div class="field"><label for="rowsPer4in">Rows per 4 inches</label><input id="rowsPer4in" name="rowsPer4in" type="number" inputmode="decimal" min="1" step="any" value="14" required /></div><div class="field"><label for="turningChain">Turning chain stitches</label><input id="turningChain" name="turningChain" type="number" inputmode="decimal" min="0" step="any" value="1" required /></div>`,
    sections: [
      ["How it works", "After you swatch in your stitch pattern, measure stitches and rows per 4 inches. The calculator scales those rates to your blanket size."],
      ["Worked example", "36\u00d740\" blanket at 12 sts / 14 rows per 4\": 108 stitches across, starting chain 109, 140 rows."],
      ["Tips", "For granny squares, plan motif count instead of a single starting chain. Add border rows separately."],
      ["Common mistakes", "Using ball-band gauge instead of your stitch pattern; chaining too tightly."],
      ["Stitch patterns and borders", "Single crochet, half double, and granny-based patterns have different stitches-per-inch even at the same hook size. Always swatch the stitch you will use. Borders can add 1–4\" per side—either include them in the target size or add rows afterward. Join-as-you-go motifs need a motif count plan instead of one long foundation chain."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Double-check CYC category icons when substituting brands."],
    ],
    faqs: [
      ["How many chains for a crochet blanket?", "Chains \u2248 stitches across + turning chain. Get stitches across from width and gauge with this tool."],
      ["What size is a baby blanket?", "Common crochet baby blankets are about 30\u00d736\" to 36\u00d752\"."],
    ],
    sources: [["Craft Yarn Council — Standards and guidelines","https://www.craftyarncouncil.com/standards"],["Craft Yarn Council — Crochet abbreviations","https://www.craftyarncouncil.com/standards/crochet-abbreviations"]],
  },
  {
    slug: "increase-decrease-calculator",
    calc: "increase-decrease",
    h1: "Even Increase & Decrease Calculator for Knit & Crochet",
    title: "Even Increase Calculator: Space Inc/Dec Evenly",
    description: "Space knitting or crochet increases and decreases evenly across a row or round. Free calculator with clear instructions for flat rows and work in the round.",
    answer: "To shape evenly, place the same number of increases or decreases at nearly equal stitch intervals. Enter current stitches and how many changes you need\u2014the tool targets the new stitch count and drafts a spacing instruction for flat or in-the-round work.",
    form: `<div class="field"><label for="currentStitches">Current stitches</label><input id="currentStitches" name="currentStitches" type="number" inputmode="decimal" min="2" step="any" value="80" required /></div><div class="field"><label for="changeCount">Increases or decreases</label><input id="changeCount" name="changeCount" type="number" inputmode="decimal" min="1" step="any" value="8" required /></div><div class="field"><label for="mode">Mode</label><select id="mode" name="mode" ><option value="increase" selected>Increase</option><option value="decrease">Decrease</option></select></div><div class="field"><label for="inTheRound">Worked</label><select id="inTheRound" name="inTheRound" ><option value="yes" selected>In the round</option><option value="no">Flat (rows)</option></select></div>`,
    sections: [
      ["Method", "We distribute shaping points across the current stitch count using evenly spaced positions. Instructions use M1/KFB for increases and K2tog/SSK for decreases\u2014substitute crochet sc increases or sc2tog as needed."],
      ["Worked example", "80 stitches, increase 8 in the round \u2192 88 stitches with shaping about every 10 stitches."],
      ["Tips", "Keep selvage stitches outside the first and last decrease when working flat."],
      ["Common mistakes", "Decreasing more stitches than exist; stacking all increases in one spot."],
      ["Pattern-friendly placement", "Many garment patterns place shaping at markers every set number of stitches. Use this calculator’s spacing as a draft, then snap positions to landmarks (side seams, raglan lines, or yoke markers). When decreasing in pattern stitch, keep symmetry so motifs stay centered. Count after the shaping row to confirm you hit the target stitch count."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Block swatches the way you will block the finished project."],
      ["Crochet and lace equivalents", "For crochet, read “increase” as placing two stitches in one stitch (or your pattern’s preferred increase) and “decrease” as sc2tog, hdc2tog, or dc2tog as written. In lace knitting, prefer the pattern’s paired yarnover and decrease so the motif stitch count stays stable. If you are shaping a yoke, distribute increases between markers rather than across every stitch of a busy chart row. Re-count stitches after the shaping round before starting the next chart repeat."],
    ],
    faqs: [
      ["How do I increase evenly in knitting?", "Divide the round into equal sections and place one increase in each\u2014this calculator writes that spacing for you."],
      ["Does this work for crochet?", "Yes\u2014use the same spacing with crochet increase and decrease stitches."],
    ],
    sources: [["Craft Yarn Council — Knitting abbreviations","https://www.craftyarncouncil.com/standards/knitting-abbreviations"],["Craft Yarn Council — Crochet abbreviations","https://www.craftyarncouncil.com/standards/crochet-abbreviations"]],
  },
  {
    slug: "cast-on-calculator",
    calc: "cast-on",
    h1: "Cast-On Calculator: Stitches from Gauge & Width",
    title: "Cast-On Calculator: Stitches from Gauge & Width",
    description: "Calculate how many stitches to cast on from gauge, desired width, ease percentage and optional ribbing factor. Free knitting planner for hats, scarves and garments.",
    answer: "Cast-on stitches \u2248 desired width (with ease) \u00d7 stitches per inch. Enter stitches per 4 inches, target width, and ease\u2014the calculator rounds to a whole stitch count and can tighten counts for ribbing pull-in.",
    form: `<div class="field"><label for="unit">Width units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="width">Desired width</label><input id="width" name="width" type="number" inputmode="decimal" min="0.5" step="any" value="20" required /></div><div class="field"><label for="stitchesPer4in">Stitches per 4 inches</label><input id="stitchesPer4in" name="stitchesPer4in" type="number" inputmode="decimal" min="1" step="any" value="20" required /></div><div class="field"><label for="easePercent">Ease percent</label><input id="easePercent" name="easePercent" type="number" inputmode="decimal" min="0" step="any" value="0" required /></div><div class="field"><label for="ribbingFactor">Ribbing factor (1 = none)</label><input id="ribbingFactor" name="ribbingFactor" type="number" inputmode="decimal" min="0.5" step="any" value="1" required /></div>`,
    sections: [
      ["Formula", "stitches = round(width_in \u00d7 (1 + ease%/100) \u00d7 (stitchesPer4in / 4) \u00d7 ribbingFactor). A ribbing factor near 0.9 helps when casting on in rib that springs in."],
      ["Worked example", "20\" width, 20 sts/4\" (5 sts/in), 5% ease \u2192 21\" effective \u00d7 5 = 105 stitches."],
      ["Tips", "Round to your rib multiple. For hats, use negative ease (\u221210% to \u221215%)."],
      ["Common mistakes", "Using unblocked gauge; forgetting pattern multiples."],
      ["Multiples and edge stitches", "After calculating a raw cast-on, adjust up or down to the nearest pattern multiple (for example, a multiple of 4 + 2 for 2×2 rib). Add selvage stitches if your pattern’s gauge rectangle excludes them. Long-tail cast-on yarn length is roughly 1 inch per stitch for worsted—estimate separately from fabric yarn needs."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Block swatches the way you will block the finished project."],
      ["Choosing a cast-on method", "Long-tail cast-on is elastic and common for ribbed edges; cable cast-on is firmer for bags and structured hems; tubular cast-on blends into 1×1 rib. The stitch count from this calculator is independent of method, but long-tail requires estimating tail length separately—about three times the finished width for many worsted projects. If you use a needle one size larger for cast-on, your edge may flare; re-check width after a few rows."],
    ],
    faqs: [
      ["How many stitches to cast on for a hat?", "Use head circumference with negative ease and your stitch gauge."],
      ["What is ease?", "Ease is the difference between body and garment measurements."],
    ],
    sources: [["Craft Yarn Council — Standards and guidelines","https://www.craftyarncouncil.com/standards"],["Craft Yarn Council — Body measurements & ease","https://www.craftyarncouncil.com/standards/body-sizing"]],
  },
  {
    slug: "fabric-yardage-calculator",
    calc: "fabric-yardage",
    h1: "Fabric Yardage Calculator: Garments, Curtains & More",
    title: "Fabric Yardage Calculator: How Much Fabric to Buy?",
    description: "Estimate fabric yards or meters for garments, curtains, upholstery and tablecloths with waste and pattern repeat. Free sewing yardage planner with fabric width input.",
    answer: "Fabric needed depends on project type, finished dimensions, fabric width, fullness (curtains), and pattern repeat. Enter those values below to estimate yards and meters\u2014always confirm against pattern envelopes for garments.",
    form: `<div class="field"><label for="project">Project</label><select id="project" name="project" ><option value="garment">Garment</option><option value="curtains" selected>Curtains</option><option value="upholstery">Upholstery</option><option value="tablecloth">Tablecloth</option></select></div><div class="field"><label for="unit">Item units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="width">Finished width</label><input id="width" name="width" type="number" inputmode="decimal" min="1" step="any" value="60" required /></div><div class="field"><label for="length">Finished length / drop</label><input id="length" name="length" type="number" inputmode="decimal" min="1" step="any" value="84" required /></div><div class="field"><label for="fabricWidth">Fabric width</label><input id="fabricWidth" name="fabricWidth" type="number" inputmode="decimal" min="1" step="any" value="54" required /></div><div class="field"><label for="fabricWidthUnit">Fabric width units</label><select id="fabricWidthUnit" name="fabricWidthUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="patternRepeat">Pattern repeat length</label><input id="patternRepeat" name="patternRepeat" type="number" inputmode="decimal" min="0" step="any" value="0" /></div><div class="field"><label for="wastePercent">Waste percent</label><input id="wastePercent" name="wastePercent" type="number" inputmode="decimal" min="0" step="any" value="10" required /></div><div class="field"><label for="fullness">Curtain fullness (×)</label><input id="fullness" name="fullness" type="number" inputmode="decimal" min="0" step="any" value="2" required /></div><div class="field"><label for="garmentFactor">Garment length factor</label><input id="garmentFactor" name="garmentFactor" type="number" inputmode="decimal" min="0" step="any" value="1.5" required /></div>`,
    sections: [
      ["How estimates are calculated", "Curtains: panels = ceil(window width \u00d7 fullness \u00f7 fabric width); cut length \u2248 drop + 10\" hem/header, rounded up to pattern repeat, times panels. Upholstery and tablecloths add wrap or overhang. Garments use a planning factor\u2014not a nested pattern layout."],
      ["Worked example", "60\" window, 84\" drop, 2\u00d7 fullness, 54\" fabric: multiple panels and several yards before waste."],
      ["Tips", "Directional prints and nap may require one-way layouts. Pre-wash fabric that will be laundered."],
      ["Common mistakes", "Ignoring pattern repeats; forgetting curtain hem/header allowances."],
      ["Fabric width and nap", "Quilting cotton is often 42–44\" usable after selvages; apparel fabrics may be 45\" or 60\"; home-dec 54\". Nap, one-way prints, and matching plaids can require substantially more fabric than a plain layout. For garments, treat this tool as a sanity check beside the pattern envelope’s yardage table by size and view."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Pre-wash fabrics that will be laundered and re-measure after drying."],
    ],
    faqs: [
      ["How much fabric for curtains?", "Often about 2\u00d7 window width in total fabric width (fullness), times drop plus hem/header."],
      ["Yards to meters?", "Results show both. 1 yard = 0.9144 meters."],
    ],
    sources: [["Craft Yarn Council — Body measurements (garment sizing context)","https://www.craftyarncouncil.com/standards/body-sizing"]],
  },
  {
    slug: "quilt-size-calculator",
    calc: "quilt-size",
    h1: "Quilt Size Calculator: Blocks, Sashing & Borders",
    title: "Quilt Size Calculator: Blocks to Finished Dimensions",
    description: "Plan quilt dimensions from your block grid or fit blocks into a twin, queen or custom size. Free quilting calculator for blocks, sashing, borders and finished inches.",
    answer: "Finished quilt width = blocks across \u00d7 block size + sashing between blocks + borders on both sides. Use \u201cfrom blocks\u201d to size a top, or \u201cfit to target\u201d to see how many blocks fit a twin, queen, or custom quilt.",
    form: `<div class="field"><label for="mode">Mode</label><select id="mode" name="mode" ><option value="blocks" selected>From block grid</option><option value="fit">Fit blocks to target size</option></select></div><div class="field"><label for="blocksAcross">Blocks across</label><input id="blocksAcross" name="blocksAcross" type="number" inputmode="decimal" min="1" step="any" value="8" required /></div><div class="field"><label for="blocksDown">Blocks down</label><input id="blocksDown" name="blocksDown" type="number" inputmode="decimal" min="1" step="any" value="10" required /></div><div class="field"><label for="finishedBlockIn">Finished block (inches)</label><input id="finishedBlockIn" name="finishedBlockIn" type="number" inputmode="decimal" min="0.5" step="any" value="12" required /></div><div class="field"><label for="sashingIn">Sashing width (inches)</label><input id="sashingIn" name="sashingIn" type="number" inputmode="decimal" min="0" step="any" value="2" required /></div><div class="field"><label for="borderIn">Border width each side (inches)</label><input id="borderIn" name="borderIn" type="number" inputmode="decimal" min="0" step="any" value="4" required /></div><div class="field"><label for="targetWidth">Target width</label><input id="targetWidth" name="targetWidth" type="number" inputmode="decimal" min="1" step="any" value="80" required /></div><div class="field"><label for="targetLength">Target length</label><input id="targetLength" name="targetLength" type="number" inputmode="decimal" min="1" step="any" value="90" required /></div><div class="field"><label for="unit">Target units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div>`,
    sections: [
      ["Formulas", "width = blocksAcross\u00d7block + (blocksAcross\u22121)\u00d7sashing + 2\u00d7border (same for length). Fit mode floors how many block+sashing steps fit inside the target after borders."],
      ["Worked example", "8\u00d710 grid of 12\" blocks with 2\" sashing and 4\" borders produces a large top\u2014use the tool to tune block count before buying fabric."],
      ["Standard sizes", "Baby ~36\u00d752\", throw ~50\u00d765\", twin ~64\u00d786\", queen ~84\u00d792\", king ~100\u00d792\" on many quilt-shop charts. Mattress sizes differ; add drop for bedspreads."],
      ["Tips", "Finished block size is after seams. Measure a sample block before committing to yardage."],
      ["Common mistakes", "Mixing unfinished and finished block sizes; planning backing before final borders."],
      ["Mattress and drop planning", "US mattress sizes commonly include twin 38×75\", full 54×75\", queen 60×80\", king 76×80\", and California king 72×84\". For a pillow-tuck quilt, add length; for a draping coverlet, add drop on sides and foot. Compare your finished top to mattress + drop before cutting borders. Keep a notebook of block unfinished vs finished sizes for recurring patterns."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Confirm unfinished versus finished block sizes before cutting stacks of pieces."],
    ],
    faqs: [
      ["What size is a queen quilt?", "Many patterns use about 84\u00d792\" for a queen top; confirm mattress plus desired drop."],
      ["How many 12\" blocks for a twin?", "Often around 6\u00d78 to 7\u00d79 blocks depending on sashing and borders\u2014use fit mode."],
    ],
    sources: [["International Sleep Products Association (mattress industry)","https://www.sleepproducts.org/"],["Craft Yarn Council — Standards overview","https://www.craftyarncouncil.com/standards"]],
  },
  {
    slug: "quilt-backing-calculator",
    calc: "quilt-backing",
    h1: "Quilt Backing Calculator: Yardage & Panel Layout",
    title: "Quilt Backing Calculator: Fabric Yardage & Panels",
    description: "Calculate quilt backing fabric yardage, panel count and seam orientation for any quilt size. Free quilting tool for 42–108 inch wide fabric and overhang.",
    answer: "Backing should be larger than the quilt top\u2014commonly 3\u20134 inches extra on each side for longarming. This calculator adds overhang, chooses a horizontal or vertical seam to minimize fabric, and reports yards and meters.",
    form: `<div class="field"><label for="unit">Quilt units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="quiltWidth">Quilt width</label><input id="quiltWidth" name="quiltWidth" type="number" inputmode="decimal" min="1" step="any" value="80" required /></div><div class="field"><label for="quiltLength">Quilt length</label><input id="quiltLength" name="quiltLength" type="number" inputmode="decimal" min="1" step="any" value="90" required /></div><div class="field"><label for="fabricWidth">Fabric width</label><input id="fabricWidth" name="fabricWidth" type="number" inputmode="decimal" min="1" step="any" value="44" required /></div><div class="field"><label for="fabricWidthUnit">Fabric width units</label><select id="fabricWidthUnit" name="fabricWidthUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="overhangIn">Overhang each side (inches)</label><input id="overhangIn" name="overhangIn" type="number" inputmode="decimal" min="0" step="any" value="4" required /></div>`,
    sections: [
      ["Method", "Required backing width/length = quilt size + 2\u00d7overhang. We compare piecing panels across the width versus the length and pick the orientation that uses less fabric, adding a little length for seam allowances when panels > 1."],
      ["Worked example", "80\u00d790\" quilt, 4\" overhang, 44\" fabric: typically two panels and on the order of 5+ yards depending on seam direction."],
      ["Tips", "Wide-back fabrics (108\") often need no seam. Press backing seams open. Square up after piecing."],
      ["Common mistakes", "Buying exactly the top size with no overhang; forgetting selvage trim."],
      ["Piecing and pressing", "Remove selvages before joining panels. A ½\" seam is common for backing joins; press open to reduce bulk under quilting. Horizontal seams can be less visible on some beds; vertical seams may save fabric for certain dimensions—compare both with the calculator. Square the pieced backing before basting."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Confirm unfinished versus finished block sizes before cutting stacks of pieces."],
    ],
    faqs: [
      ["How much backing for a queen quilt?", "Often 8\u20139 yards of 44\" fabric pieced, or about 3 yards of 108\" wide back\u2014run your measurements here."],
      ["How much overhang do I need?", "Longarm quilters often ask for 4\" per side; domestic quilting may allow 2\u20133\"."],
    ],
    sources: [["International Sleep Products Association","https://www.sleepproducts.org/"],["National Museum of African American History — quilt layers overview","https://nmaahc.si.edu/explore/stories/evolution-expression"]],
  },
  {
    slug: "quilt-binding-calculator",
    calc: "quilt-binding",
    h1: "Quilt Binding Calculator: Strips & Fabric Yardage",
    title: "Quilt Binding Calculator: Strips, Joins & Yardage",
    description: "Find binding strip count and fabric yardage from quilt perimeter and strip width. Free double-fold binding planner for straight-grain and bias binding.",
    answer: "Binding length \u2248 quilt perimeter plus about 12 inches for joins and corners. Strips needed = ceil(that length \u00f7 usable fabric width). Enter quilt size and strip width (often 2.5\" for double-fold binding).",
    form: `<div class="field"><label for="unit">Quilt units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="quiltWidth">Quilt width</label><input id="quiltWidth" name="quiltWidth" type="number" inputmode="decimal" min="1" step="any" value="60" required /></div><div class="field"><label for="quiltLength">Quilt length</label><input id="quiltLength" name="quiltLength" type="number" inputmode="decimal" min="1" step="any" value="70" required /></div><div class="field"><label for="bindingWidthIn">Strip width (inches)</label><input id="bindingWidthIn" name="bindingWidthIn" type="number" inputmode="decimal" min="0.5" step="any" value="2.5" required /></div><div class="field"><label for="fabricWidth">Fabric width</label><input id="fabricWidth" name="fabricWidth" type="number" inputmode="decimal" min="1" step="any" value="42" required /></div><div class="field"><label for="fabricWidthUnit">Fabric width units</label><select id="fabricWidthUnit" name="fabricWidthUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div>`,
    sections: [
      ["Formula", "perimeter = 2\u00d7(width + length); strip_length = perimeter + join_waste; strips = ceil(strip_length / (fabric_width \u2212 2)); yards \u2248 (strips \u00d7 strip_width) / 36."],
      ["Worked example", "60\u00d770\" quilt \u2192 260\" perimeter + 12\" waste; on 42\" fabric you typically cut 7 strips of 2.5\" \u2192 about 0.5 yard."],
      ["Tips", "Join strips on the bias for less bulk. Cut bias binding for curved edges. Press in half lengthwise for double-fold binding."],
      ["Common mistakes", "Forgetting corner turn allowance; measuring only one side twice."],
      ["Attachment workflow", "After cutting and joining strips on a 45° angle, fold wrong sides together and press. Attach to the quilt front with a walking foot if possible, mitering corners, then hand- or machine-stitch the back. Scant differences in strip width change how filling the binding looks—test on a scrap sandwich."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Confirm unfinished versus finished block sizes before cutting stacks of pieces."],
    ],
    faqs: [
      ["How much fabric for quilt binding?", "Often 0.5\u20131 yard for throws; larger bed quilts may need more\u2014calculate from perimeter."],
      ["What strip width should I cut?", "2.5\" is common for double-fold binding on quilts with batting; some prefer 2.25\"."],
    ],
    sources: [["International Sleep Products Association (bedding size context)","https://www.sleepproducts.org/"]],
  },
  {
    slug: "hst-calculator",
    calc: "hst",
    h1: "HST Calculator: Half-Square Triangle Cutting Sizes",
    title: "HST Calculator: Half-Square Triangle Cutting Sizes",
    description: "Free half-square triangle calculator. Enter the finished HST size to get the square size to cut for 2-at-a-time, 4-at-a-time and 8-at-a-time methods and yield.",
    answer: "For classic 2-at-a-time HSTs, cut squares = finished HST size + 7/8 inch. Eight-at-a-time squares are about 2 \u00d7 finished + 1.75\". Enter your finished HST size and how many you need.",
    form: `<div class="field"><label for="finishedHstIn">Finished HST size (inches)</label><input id="finishedHstIn" name="finishedHstIn" type="number" inputmode="decimal" min="0.25" step="any" value="3" required /></div><div class="field"><label for="hstNeeded">HSTs needed</label><input id="hstNeeded" name="hstNeeded" type="number" inputmode="decimal" min="1" step="any" value="40" required /></div><div class="field"><label for="method">Method</label><select id="method" name="method" ><option value="two-at-a-time" selected>2 at a time</option><option value="four-at-a-time">4 at a time</option><option value="eight-at-a-time">8 at a time</option></select></div>`,
    sections: [
      ["Formulas", "2-at-a-time: square = finished + 0.875\". 4-at-a-time: square = finished + 1\". 8-at-a-time: square = 2\u00d7finished + 1.75\". Yield per fabric pair is 2, 4, or 8 HSTs respectively."],
      ["Worked example", "40 finished 3\" HSTs with 8-at-a-time: square 7.75\"; 5 pairs (10 squares) produce 40 HSTs."],
      ["Tips", "Trim HSTs to exact unfinished size (finished + 0.5\") after pressing. Starch helps bias edges."],
      ["Common mistakes", "Using unfinished size in a finished-size formula; skipping the trim step."],
      ["Trimming and pressing", "Press HSTs toward the darker fabric or open if bulk is an issue. Use a square ruler to trim to unfinished size (finished + ½\"). Chain-piecing speeds 2-at-a-time methods. When mixing methods in one quilt, keep unfinished sizes identical so blocks nest cleanly."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Confirm unfinished versus finished block sizes before cutting stacks of pieces."],
      ["Unfinished sizes and block math", "Quilters often talk about unfinished HST size, which is finished + ½\". If a block pattern says “make 3.5\" unfinished HSTs,” that is a 3\" finished triangle unit. Convert before using the finished-size formulas in this tool. When a block mixes HSTs with squares, keep all units on the same unfinished grid so seams nest. Label stacks by size when cutting multiple finishes in one sitting."],
    ],
    faqs: [
      ["What size squares for 3\" HSTs?", "3.875\" squares for 2-at-a-time; about 7.75\" for 8-at-a-time."],
      ["Which method should I use?", "2-at-a-time for a few HSTs; 8-at-a-time for scrap-busting large batches."],
    ],
    sources: [["Murray State University — Quilting arts basics (quilt layers)","https://digitalcommons.murraystate.edu/cgi/viewcontent.cgi?article=1483&context=bis437"]],
  },
  {
    slug: "cross-stitch-fabric-calculator",
    calc: "cross-stitch",
    h1: "Cross-Stitch Aida Calculator: Fabric Cut Size",
    title: "Cross-Stitch Aida Calculator: Count to Fabric Size",
    description: "Convert stitch counts and Aida count into design size and fabric cut size with margins. Free cross-stitch fabric calculator for 14, 16 and 18 count cloth.",
    answer: "Design size in inches = stitch count \u00f7 Aida count. Fabric to cut = design size + margin on each side. Enter stitches wide/high, count (11, 14, 16, 18\u2026), and margin below.",
    form: `<div class="field"><label for="stitchesWide">Stitches wide</label><input id="stitchesWide" name="stitchesWide" type="number" inputmode="decimal" min="1" step="any" value="140" required /></div><div class="field"><label for="stitchesHigh">Stitches high</label><input id="stitchesHigh" name="stitchesHigh" type="number" inputmode="decimal" min="1" step="any" value="180" required /></div><div class="field"><label for="aidaCount">Aida count (per inch)</label><input id="aidaCount" name="aidaCount" type="number" inputmode="decimal" min="1" step="any" value="14" required /></div><div class="field"><label for="margin">Margin each side</label><input id="margin" name="margin" type="number" inputmode="decimal" min="0" step="any" value="3" required /></div><div class="field"><label for="marginUnit">Margin units</label><select id="marginUnit" name="marginUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="stitchesPerSquare">Stitches per square (1=aida, 2=over-two)</label><input id="stitchesPerSquare" name="stitchesPerSquare" type="number" inputmode="decimal" min="1" step="any" value="1" required /></div><div class="field"><label for="maxWidth">Max design width (reference)</label><input id="maxWidth" name="maxWidth" type="number" inputmode="decimal" min="0" step="any" value="10" /></div><div class="field"><label for="maxUnit">Max width units</label><select id="maxUnit" name="maxUnit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div>`,
    sections: [
      ["Formulas", "design_in = stitches / (aida_count / stitches_per_square); fabric_in = design_in + 2\u00d7margin_in. Over-two on 28-count linen behaves like 14-count aida."],
      ["Worked example", "140\u00d7180 stitches on 14-count with 3\" margins \u2192 design 10\u00d712.86\", fabric about 16\u00d718.86\"."],
      ["Tips", "Allow extra margin for framing or Q-snaps. Wash dark fabrics first if bleeding is a risk."],
      ["Common mistakes", "Confusing cm Aida labels with per-inch counts; forgetting margins for finishing."],
      ["Evenweave and linen", "28-count linen stitched over two threads equals 14-count Aida for design size. 32-count over two equals 16-count. If a chart lists only stitch counts, this calculator is enough to buy fabric. Add more margin for ornate frames or scroll rods. Center the design by finding fabric midpoints before stitching."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Pre-wash fabrics that will be laundered and re-measure after drying."],
    ],
    faqs: [
      ["What size fabric for my pattern?", "Divide stitches by count, then add margins on all sides\u2014this tool does both."],
      ["14-count vs 16-count?", "Higher count makes a smaller design for the same stitch count."],
    ],
    sources: [["Craft Yarn Council — Standards overview","https://www.craftyarncouncil.com/standards"]],
  },
  {
    slug: "needle-hook-converter",
    calc: "needle-hook",
    h1: "Needle & Hook Size Converter: US, UK & Metric",
    title: "Needle & Hook Converter: US, UK & Millimeters",
    description: "Convert knitting needle and crochet hook sizes between US, UK and metric millimeters using Craft Yarn Council charts. Free converter for needles and hooks.",
    answer: "Knitting needles and crochet hooks are labeled differently in the US, UK, and metric systems. Enter a size in any system to see the Craft Yarn Council\u2013aligned equivalents in millimeters, US, and UK.",
    form: `<div class="field"><label for="kind">Tool</label><select id="kind" name="kind" ><option value="needle" selected>Knitting needle</option><option value="hook">Crochet hook</option></select></div><div class="field"><label for="system">You have</label><select id="system" name="system" ><option value="metric" selected>Metric (mm)</option><option value="us">US</option><option value="uk">UK</option></select></div><div class="field"><label for="value">Size value</label><input id="value" name="value" type="text" inputmode="text" value="5" required /></div>`,
    sections: [
      ["About the charts", "Values follow Craft Yarn Council knitting needle and crochet hook size charts. Some historical UK sizes do not map 1:1; we show the closest published row. Always verify against your tool\u2019s stamped metric size when precision matters."],
      ["Worked example", "US 8 knitting needle = 5.0 mm = UK 6. Crochet H-8 = 5.0 mm."],
      ["Tips", "Metric millimeters are the most reliable cross-brand label. Swap tools if your gauge is off before changing patterns."],
      ["Common mistakes", "Assuming US crochet letters match knitting US numbers; using lace hooks for jumbo yarn."],
      ["Gauge still rules", "Two US 8 needles from different brands can differ slightly; trust stamped millimeters when you have them. If your swatch is dense, go up a metric size; if loose, go down. Steel lace hooks and Tunisian hooks follow related but not identical naming—use metric when mixing tool types."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Prefer metric millimeters when mixing US and UK notions."],
      ["Project pairing tips", "Match needle or hook size to both yarn category and desired fabric: a DK yarn on 4 mm needles makes a different cloth than the same yarn on 3.5 mm. Use this converter when a pattern lists only US or only UK sizes, then confirm with a metric gauge swatch. Tunisian crochet hooks and double-pointed needles still follow millimeter sizing even when brand names differ. Store a small tape measure in your notions pouch to verify unmarked thrifted tools."],
    ],
    faqs: [
      ["What size is a US 8 needle in mm?", "5.0 mm (UK 6)."],
      ["What is an H crochet hook in mm?", "H-8 is 5.0 mm on the CYC chart."],
    ],
    sources: [["Craft Yarn Council — Hooks & needles size chart","https://www.craftyarncouncil.com/standards/hooks-and-needles"],["Craft Yarn Council — Steel crochet hook sizes","https://www.craftyarncouncil.com/standards/steel-crochet-hook-crochet-thread-sizes"]],
  },
  {
    slug: "seam-allowance-calculator",
    calc: "seam-allowance",
    h1: "Seam Allowance Calculator: Cut Size & Pattern Grade",
    title: "Seam Allowance Calculator: Cut Size & Grading",
    description: "Add seam allowances to finished measurements and grade between sizes. Free sewing helper for apparel seams, quilting quarter-inch seams and wearing ease.", 1/4\" quilting seams and wearing ease.",
    answer: "Cut size = finished measurement + seam allowance \u00d7 number of seam edges counted. Use the grading mode to step a measurement up or down by a constant grade between sizes, and ease mode to add wearing ease to a body measurement.",
    form: `<div class="field"><label for="mode">Mode</label><select id="mode" name="mode" ><option value="seam" selected>Add seam allowance</option><option value="grade">Grade between sizes</option><option value="ease">Add ease</option></select></div><div class="field"><label for="unit">Units</label><select id="unit" name="unit" ><option value="in">Inches</option><option value="cm">Centimeters</option></select></div><div class="field"><label for="finished">Finished measurement</label><input id="finished" name="finished" type="number" inputmode="decimal" min="0" step="any" value="20" required /></div><div class="field"><label for="seamAllowance">Seam allowance</label><input id="seamAllowance" name="seamAllowance" type="number" inputmode="decimal" min="0" step="any" value="0.625" required /></div><div class="field"><label for="seams">Seam edges to add</label><input id="seams" name="seams" type="number" inputmode="decimal" min="0" step="any" value="2" required /></div><div class="field"><label for="base">Base measurement (grade)</label><input id="base" name="base" type="number" inputmode="decimal" min="0" step="any" value="36" /></div><div class="field"><label for="fromSize">From size index</label><input id="fromSize" name="fromSize" type="number" inputmode="decimal" min="0" step="any" value="0" /></div><div class="field"><label for="toSize">To size index</label><input id="toSize" name="toSize" type="number" inputmode="decimal" min="0" step="any" value="2" /></div><div class="field"><label for="gradePerSize">Grade per size</label><input id="gradePerSize" name="gradePerSize" type="number" inputmode="decimal" min="0" step="any" value="1.5" /></div><div class="field"><label for="body">Body measurement (ease)</label><input id="body" name="body" type="number" inputmode="decimal" min="0" step="any" value="36" /></div><div class="field"><label for="ease">Ease to add</label><input id="ease" name="ease" type="number" inputmode="decimal" min="0" step="any" value="2" /></div>`,
    sections: [
      ["Seam allowance math", "If both sides of a seam get allowance, add SA twice (seams=2). US apparel often uses 5/8\" (0.625\"); quilting uses 1/4\"; some indie patterns use 3/8\" or 1 cm."],
      ["Grading", "graded = base + (toIndex \u2212 fromIndex) \u00d7 gradePerSize. Index sizes consecutively (0=XS \u2026). This is a linear helper, not a full multi-point grade rule set."],
      ["Worked example", "Finished 20\" width, 5/8\" SA on both side seams \u2192 cut 21.25\". Grading a 36\" bust from size 0 to 2 at 1.5\" per size \u2192 39\"."],
      ["Tips", "Check whether your pattern\u2019s stated measurement is finished garment or body. Quilting: keep a consistent scant 1/4\"."],
      ["Common mistakes", "Adding SA only once to a centered seam that needs both edges; confusing ease with SA."],
      ["Pattern drafting context", "This helper supports simple arithmetic for makers adjusting PDF patterns or drafting rectangles (bags, facings, quilt-to-garment hacks). Full apparel grading uses multiple grade points (bust, waist, hip, length) with different increments—apply this linear grade only where a single measurement steps evenly between sizes."],
      ["Limits, privacy, and how to use the results", "All math runs locally in your browser on this page—nothing you enter is uploaded to our servers. Treat outputs as planning aids: fibers, stitch patterns, personal tension, shrinkage, and finishing choices all move real-world usage. When a published pattern conflicts with this estimate, prefer the pattern’s tested yardage or cutting chart for that design. Switch freely between inches and centimeters, yards and meters, and grams and ounces to match your notions and ball bands. For teaching or guild demos, use the shareable results link in the tool output so everyone sees the same inputs. Print the results view when you shop, and keep a note of yarn weight category, dye lot, and hook or needle size beside the numbers. If you republish a worked example, credit FiberCalc and link back to this tool so makers can recalculate with their own skein sizes. Re-run the calculator whenever you change gauge, fabric width, block size, or seam allowance so shopping lists stay honest. Pre-wash fabrics that will be laundered and re-measure after drying."],
    ],
    faqs: [
      ["What is a standard sewing seam allowance?", "Many US garment patterns use 5/8 inch; always check your pattern sheet."],
      ["What seam allowance do quilters use?", "A scant 1/4 inch is standard for piecing."],
    ],
    sources: [["Craft Yarn Council — Body measurements & ease","https://www.craftyarncouncil.com/standards/body-sizing"]],
  },
];
export function getToolPage(slug: string) { return TOOL_PAGES.find((t) => t.slug === slug); }