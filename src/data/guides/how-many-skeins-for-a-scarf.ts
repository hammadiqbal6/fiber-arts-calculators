import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-many-skeins-for-a-scarf',
  title: 'How Many Skeins for a Scarf?',
  description:
    'Estimate scarf skeins from length, width, yarn weight, and yards per ball. Worked example plus free scarf and substitution calculators.',
  primaryKeyword: 'how many skeins for a scarf',
  datePublished: '2026-10-23',
  dateModified: '2026-10-23',
  relatedTools: ['yarn-scarf-calculator', 'yarn-substitution-calculator'],
  relatedGuides: [
    'yarn-substitution-basics',
    'how-much-yarn-for-a-blanket',
    'does-crochet-use-more-yarn-than-knitting',
  ],
  faqs: [
    {
      q: 'How many skeins do I need for a simple adult scarf?',
      a: 'Many worsted knit scarves use roughly 300–600 yards depending on width and length—often two to three 200-yard skeins as a planning rule of thumb. Always divide your estimated yards by yards per skein and round up.',
    },
    {
      q: 'Does a wider scarf need proportionally more yarn?',
      a: 'Yes. Yardage scales roughly with area (width × length) for the same stitch and yarn. Doubling width roughly doubles yarn if length and gauge stay the same.',
    },
    {
      q: 'What if my skeins have different yardage than the pattern?',
      a: 'Convert the pattern’s total yards to your put-up. Use the yarn substitution calculator (/tools/yarn-substitution-calculator/) and yarn substitution basics (/guides/yarn-substitution-basics/).',
    },
    {
      q: 'Do crochet scarves use more yarn?',
      a: 'Often yes for a similar finished size, because crochet fabric is typically denser. See does crochet use more yarn than knitting (/guides/does-crochet-use-more-yarn-than-knitting/).',
    },
    {
      q: 'Should fringe be included in the skein count?',
      a: 'Yes. Fringe, tassels, and pompoms can consume a surprising amount—budget extra length or a dedicated leftover skein.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Scarf skeins = estimated total yards ÷ yards per skein, rounded up. Area (width × length), Craft Yarn Council yarn weight, and knit vs crochet density drive the yardage. Use the yarn scarf calculator (/tools/yarn-scarf-calculator/) instead of guessing from ball counts alone, then add fringe.',
    },
    {
      type: 'p',
      content:
        'Scarves look like simple rectangles, which makes yarn math friendlier than sweaters—but short put-ups, dense stitches, and fringe still empty skeins faster than expected. This guide shows how to turn dimensions into a skein count, when substitution changes the answer, and how to avoid the classic “one skein short of fringe” problem. Along the way you will see why yards-first shopping beats ball-count habits for every Craft Yarn Council weight category from lace-weight fingering through super bulky.',
    },
    {
      type: 'h2',
      content: 'Decide finished size and fabric',
    },
    {
      type: 'p',
      content:
        'Pick a finished width and length. Adult scarves often land somewhere around 6–10 inches wide and 60–70 inches long, but infinity cowls, skinny fashion scarves, and oversized wraps differ widely—measure a scarf you like when possible. Note whether you knit or crochet, and which CYC weight category the yarn uses (see /reference/yarn-weights/).',
    },
    {
      type: 'p',
      content:
        'Lace and openwork use less yarn per square inch than dense moss stitch or tapestry crochet. If the pattern is textured, prefer a swatch weight estimate over a stockinette-only rule of thumb.',
    },
    {
      type: 'h2',
      content: 'Yards first, skeins second',
    },
    {
      type: 'p',
      content:
        'Estimate total yards for the rectangle, add fringe, then divide by the length printed on your ball band. Two brands both labeled “worsted” may put 150 yards in one skein and 220 in another—ball counts are not interchangeable. The yarn scarf calculator (/tools/yarn-scarf-calculator/) applies size and weight planning so you can compare skein counts before you buy.',
    },
    {
      type: 'table',
      content: {
        caption: 'Illustrative scarf planning bands (knit, approximate)',
        headers: ['Style', 'Approx. size', 'Worsted yards (ballpark)', '200-yd skeins (approx.)'],
        rows: [
          ['Skinny accent', '~5×60"', '200–350', '1–2'],
          ['Classic adult', '~8×65"', '350–550', '2–3'],
          ['Wide wrap-ish', '~12×70"', '550–900', '3–5'],
          ['Crochet dense', 'same as classic', 'often +25–30%', 'add a skein'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'These bands are planning estimates for relatively plain knit fabric—not universal standards. Move toward bulky categories and yards usually drop; move toward DK or fingering and yards rise for the same area.',
    },
    {
      type: 'h2',
      content: 'Worked example: 8×65" worsted knit scarf',
    },
    {
      type: 'p',
      content:
        'You want an 8×65 inch knit scarf in category-4 worsted. Using a mid planning figure near 450 yards for a classic width, and skeins labeled 180 yards each: 450 ÷ 180 = 2.5 → buy three skeins. Add 40 yards of fringe and you still fit in three if you are careful; add heavy fringe or a contrasting edge and a fourth skein of accent color may be wiser.',
    },
    {
      type: 'p',
      content:
        'Weigh a 4×4 inch blocked swatch, scale to 8×65 (area 520 in² vs 16 in² → multiply swatch yarn length by 520/16), then add fringe. That method catches dense stitch patterns that charts under-guess.',
    },
    {
      type: 'h2',
      content: 'Substitution and leftover skeins',
    },
    {
      type: 'p',
      content:
        'Substituting stash yarn? Match CYC category and total yards, then swatch for drape. The yarn substitution calculator (/tools/yarn-substitution-calculator/) and yarn substitution basics (/guides/yarn-substitution-basics/) keep put-ups honest. Leftover sweater yarn often becomes a scarf—recalculate rather than assuming “one leftover skein is enough.”',
    },
    {
      type: 'h2',
      content: 'Infinity cowls and short loops',
    },
    {
      type: 'p',
      content:
        'A cowl that loops once or twice may use less length than a classic 65-inch scarf but more width, so area—not “it looks small”—still drives yarn. Measure the loop circumference you want, decide height, and run the same yards-then-skeins math. Moebius and double-thick cowls effectively double fabric for the visible height; budget accordingly or weigh a swatch before casting on the full circumference. Striped scarves need dye-lot planning per color even when the total yardage fits in “two skeins” of mixed leftovers. If you lengthen a scarf after the first skein, re-run the yard estimate before winding the next ball so stripes and fringe still fit the put-up. Leftovers become fringe, flowers, or a matching charm.',
    },
    {
      type: 'h2',
      content: 'Stitch patterns, stripes, and reversible fabric',
    },
    {
      type: 'p',
      content:
        'Reversible ribs, brioche, and dense seed stitch raise yarn use compared with stockinette or plain garter of the same outline. Lace scarves may use less yarn but still need accurate skein math so fringe does not steal the last yards of the body. Beads, applied borders, and crochet edgings should be budgeted as separate line items when they use a different yarn.',
    },
    {
      type: 'p',
      content:
        'Striped scarves should include cut-end waste or carry-up floats in the total. Changing color every two rows with cut ends uses more yarn than carrying unused colors up the side on a narrow scarf, but carrying creates floats you must manage. Pick a method and add a buffer of the dominant color when stripe widths are irregular or you freestyle the sequence.',
    },
    {
      type: 'p',
      content:
        'Short fashion scarves in bulky yarn may finish with one skein, but only if the band’s yardage is long enough. Always divide estimated yards by the number printed on your ball, not by a memory of “bulky equals one skein.” Novelty eyelash or ribbon yarns can look full while containing modest length—read the band twice before leaving the shop.',
    },
    {
      type: 'h2',
      content: 'Gift planning and dye lots',
    },
    {
      type: 'p',
      content:
        'For gifts, buy enough of one dye lot to finish body and fringe together. A mismatched fringe skein is especially obvious on solid scarves. If you are stitching several scarves from one cake yarn, weigh the cake before and after the first scarf to predict how many siblings remain—visual cake size is a poor meter. Store leftover yardage notes with the gift record so a matching hat or mittens can reuse the same colorway later without guesswork.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Buying “two skeins” without reading yards per skein',
        'Forgetting fringe, tassels, or picot edges',
        'Using a knit estimate for a dense crochet stitch',
        'Changing width mid-project without re-estimating yarn',
        'Mixing dye lots on a long solid scarf',
      ],
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Set width and length, run the yarn scarf calculator (/tools/yarn-scarf-calculator/), convert yards to your skein’s put-up, and buy one extra when dye lots are scarce or fringe is lavish. For craft comparisons on denser fabric, see does crochet use more yarn than knitting (/guides/does-crochet-use-more-yarn-than-knitting/). If you swap yarn brands, confirm put-ups with the yarn substitution calculator (/tools/yarn-substitution-calculator/) before you leave the shop with “enough” balls that are secretly shorter.',
    },
  ],
};

export default guide;
