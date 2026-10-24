import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-much-yarn-for-amigurumi',
  title: 'Amigurumi Yarn Chart by Size',
  description:
    'Estimate amigurumi yarn from toy size and CYC weight. Planning tips, worked example, and free amigurumi and substitution calculators.',
  primaryKeyword: 'amigurumi yarn chart by size',
  datePublished: '2026-10-23',
  dateModified: '2026-10-24',
  relatedTools: ['yarn-amigurumi-calculator', 'yarn-substitution-calculator'],
  relatedGuides: [
    'yarn-substitution-basics',
    'how-much-yarn-for-a-sweater',
  ],
  faqs: [
    {
      q: 'How much yarn do I need for a small amigurumi?',
      a: 'Many small toys use only a fraction of a skein in the main color, but accents, stuffing coverage, and tight gauge add up. Estimate from finished height and yarn weight with the amigurumi yarn calculator (/tools/yarn-amigurumi-calculator/), then round up by color.',
    },
    {
      q: 'Why did I run out mid-toy on a “leftover” skein?',
      a: 'Dense single crochet in the round packs more yarn per inch than a flat scarf swatch suggests. Safety eyes, limbs worked separately, and embroidered details also consume length. Weigh leftover balls and plan by yards, not optimism.',
    },
    {
      q: 'Can I substitute sport for worsted in a toy pattern?',
      a: 'You can, but size and yardage change. Match Craft Yarn Council category when possible, adjust hook for a firm fabric, and recalculate length. See yarn substitution basics (/guides/yarn-substitution-basics/) and the yarn substitution calculator (/tools/yarn-substitution-calculator/).',
    },
    {
      q: 'Do I need the same amount of yarn for every color?',
      a: 'No. Main-body colors dominate; contrast muzzles, sweaters, and stripes may need only tens of yards. Buy full skeins when dye lots matter for future matching, or wind leftovers into labeled bobbins.',
    },
    {
      q: 'How is amigurumi yarn different from sweater yarn math?',
      a: 'Sweaters scale with circumference and length across large surfaces—see how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/). Amigurumi scales with a small 3D height and very dense stitches; leftover sweater yarn often becomes toys, but always re-estimate.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'A roughly 6-inch worsted amigurumi often needs on the order of about 100–200 yards of main-color yarn as a planning band—then divide by yards per skein and round up by color. Dense crochet fabric uses more length than scarf leftovers suggest. Use the amigurumi yarn calculator (/tools/yarn-amigurumi-calculator/) before you commit a partial ball.',
    },
    {
      type: 'p',
      content:
        'Amigurumi looks tiny on the hook and somehow empties a skein anyway. Tight single crochet, stuffed spheres, and separate limbs mean more yarn per cubic inch than open shawl fabric. Patterns that list “scrap amounts” still benefit from a height-and-weight estimate so you do not frog a head for want of twenty yards. This guide covers a practical planning method, color strategy, substitution cautions, and links to free calculators.',
    },
    {
      type: 'h2',
      content: 'Start with size, weight, and density',
    },
    {
      type: 'p',
      content:
        'Note the finished height (or the pattern’s stated size) and the yarn’s CYC category from the ball band—categories are summarized at /reference/yarn-weights/. Sport and DK toys use more yards for the same height than bulky squish toys; fingering micro-amigurumi can surprise you with how much length a detailed piece needs relative to its size.',
    },
    {
      type: 'p',
      content:
        'Amigurumi fabric is usually worked firmly so stuffing does not show. That density is why a “small ball” that finished a baby bootie cuff may not finish a round bear of similar weight category. Prefer yards (or meters) and grams over “I have half a skein left.”',
    },
    {
      type: 'h2',
      content: 'Planning approach',
    },
    {
      type: 'p',
      content:
        'Use a size-and-category estimate to get total yards for the main color, then add smaller budgets for contrasts. The amigurumi yarn calculator (/tools/yarn-amigurumi-calculator/) turns finished height and yarn weight into a planning length you can convert to skeins. Add a buffer for frogging, facial embroidery, and the one limb you redo.',
    },
    {
      type: 'table',
      content: {
        caption: 'Amigurumi yarn planning checklist',
        headers: ['Input', 'Why it matters', 'Tip'],
        rows: [
          ['Finished height', 'Scales yarn with toy size', 'Measure pattern photo goals'],
          ['CYC category', 'Thinner yarn → more yards', 'Read ball band + /reference/yarn-weights/'],
          ['Colors', 'Main vs accent put-ups', 'Budget accents separately'],
          ['Yards per skein', 'Converts estimate to balls', 'Never assume equal put-ups'],
          ['Hook / gauge', 'Firm fabric uses more yarn', 'Match pattern tension'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example: 6-inch worsted bear',
    },
    {
      type: 'p',
      content:
        'You want a roughly 6-inch seated bear in category-4 worsted. Run height and worsted weight through the amigurumi yarn calculator (/tools/yarn-amigurumi-calculator/) for a planning yardage, then suppose the tool (or your pattern) lands near a modest three-digit yard figure for the main color—divide by your skein’s yards. If the ball band says 220 yards and the estimate is 140 yards of brown, one skein covers the body with leftovers for a twin’s ear repairs; if your put-up is only 100 yards, buy two of the same dye lot.',
    },
    {
      type: 'p',
      content:
        'Cream muzzle and sweater stripes might need 20–40 yards each. Those often come from stash, but if you must buy a full skein for dye-lot matching on a gift pair, plan that purchase explicitly rather than hoping the big-box remnant bin matches later.',
    },
    {
      type: 'h2',
      content: 'Substitution and stash diving',
    },
    {
      type: 'p',
      content:
        'Stash yarn is amigurumi fuel, but category mismatches change both size and yardage. A pattern written for DK on a 2.75 mm hook will grow and soften if you force worsted without adjusting. Follow yarn substitution basics (/guides/yarn-substitution-basics/): match CYC category and total yards, then swatch a small sphere for density. The yarn substitution calculator (/tools/yarn-substitution-calculator/) converts put-ups when grams and yards differ between brands.',
    },
    {
      type: 'p',
      content:
        'Sweater leftovers are fair game—just do not reuse sweater skein counts as toy skein counts. Sweater math lives in how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/); toys need their own estimate.',
    },
    {
      type: 'h2',
      content: 'Safety and finishing yarn uses',
    },
    {
      type: 'p',
      content:
        'Embroidered mouths, whiskers, and cheek accents are small but real. Soft wire-free toys for babies should avoid hazardous embellishments; yarn-only faces still consume contrast lengths. Keep a dedicated scrap bag labeled by CYC category so the next tiny project does not raid a sweater skein for ten yards of black.',
    },
    {
      type: 'h2',
      content: 'Partial skeins and weighing as you go',
    },
    {
      type: 'p',
      content:
        'If you are mid-bear and nervous, weigh the remaining ball and the finished pieces on a kitchen scale. Grams used so far versus grams left gives a clearer “will this finish?” answer than eyeballing cake size—especially with dark colors. When the pattern lists only “small amount,” write your own yard notes after the first toy so the second in a matching set is easier to shop.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Assuming any leftover ball is “enough for a small toy”',
        'Counting skeins without reading yards per skein',
        'Changing yarn category without re-estimating size and length',
        'Forgetting separate limbs, ears, and tails in the mental total',
        'Buying accent colors in unmatched dye lots for a set of toys',
      ],
    },
    {
      type: 'h2',
      content: 'Limbs, panels, and sewn vs continuous pieces',
    },
    {
      type: 'p',
      content:
        'Toys built from many sewn panels (ears, arms, tails, sweaters) create more tails and join waste than a mostly continuous spiral body. If you frog often while shaping heads, that practice yarn is real consumption—beginners should buy an extra main-color skein for the first complex pattern. Safety-eye hardware and embroidery floss are separate from yarn totals but should sit on the same materials checklist so you do not finish a body without a face plan.',
    },
    {
      type: 'p',
      content:
        'Clothing for dolls and animals can use a different category than the body if you accept a texture change; keeping category consistent makes gauge between body and outfit more predictable. Soft chenille and “blanket yarn” plush toys work up quickly but hide stitch mistakes and can be harder to stuff firmly—test a small sphere before committing a whole skein to a large cuddler.',
    },
    {
      type: 'h2',
      content: 'Batch making for markets',
    },
    {
      type: 'p',
      content:
        'When making ten identical critters, weigh the first finished toy (yarn only, before or after stuffing—be consistent) and multiply. Add a percentage for tails and error rather than assuming perfect repeats. Keep notes of yards per colorway so restocks match. Dense amigurumi yarn use per area is closer to firm crochet fabric than to open scarves—see does crochet use more yarn than knitting (/guides/does-crochet-use-more-yarn-than-knitting/) for density intuition across crafts.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Set finished height and CYC weight, run the amigurumi yarn calculator (/tools/yarn-amigurumi-calculator/), split yards by color, and convert with ball-band lengths. Substituting? Use the yarn substitution calculator (/tools/yarn-substitution-calculator/) and yarn substitution basics (/guides/yarn-substitution-basics/).',
    },
  ],
  sources: [
    ["Craft Yarn Council — Standard Yarn Weight System", "https://www.craftyarncouncil.com/standards/yarn-weight-system"],
  ],
};

export default guide;
