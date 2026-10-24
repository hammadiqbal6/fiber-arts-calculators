import type { Guide } from './types';

export const guide: Guide = {
  slug: 'what-size-aida-for-cross-stitch',
  title: 'What Size Aida for Cross Stitch?',
  description:
    'Choose Aida count and cut size from stitch width and height. Margin tips, worked example, and a free cross-stitch fabric calculator.',
  primaryKeyword: 'what size aida for cross stitch pattern',
  datePublished: '2026-10-23',
  dateModified: '2026-10-24',
  relatedTools: ['cross-stitch-fabric-calculator', 'fabric-yardage-calculator'],
  relatedGuides: [
    'how-many-yards-of-fabric',
    'crochet-hook-size-conversion-chart',
  ],
  faqs: [
    {
      q: 'What size Aida do I need for my pattern?',
      a: 'Divide the pattern’s stitch width and height by the Aida count (stitches per inch) to get design size in inches, then add margins on every side for finishing. The cross-stitch fabric calculator (/tools/cross-stitch-fabric-calculator/) does the cut size for you.',
    },
    {
      q: 'Is 14-count Aida always the default?',
      a: 'Fourteen-count is a very common beginner and chart default, but 11, 16, 18, and other counts change the finished size of the same stitch chart. Higher count = smaller design for the same stitch grid.',
    },
    {
      q: 'How much margin should I leave around the design?',
      a: 'Many stitchers plan about 2–3 inches of fabric beyond the design on each side as a finishing rule of thumb (more for large framing or q-snaps). Confirm against your frame or hoop plan.',
    },
    {
      q: 'Can I use evenweave or linen instead of Aida?',
      a: 'Yes, if you understand threads-per-inch and whether you stitch over one or two threads. Convert carefully so the stitch count still matches the chart; swatch if you are new to the fabric.',
    },
    {
      q: 'Does buying Aida by the yard use the same math as dress fabric?',
      a: 'Cut size for one project is stitch-grid math. Buying continuous yardage for multiple pieces is closer to general fabric shopping—see how many yards of fabric (/guides/how-many-yards-of-fabric/) and the fabric yardage calculator (/tools/fabric-yardage-calculator/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Finished design inches = stitch count ÷ Aida count (for example, 120 stitches ÷ 14-count ≈ 8.6 inches wide)—then add margins on all sides for the fabric cut. Higher counts shrink the same chart; lower counts enlarge it. Use the cross-stitch fabric calculator (/tools/cross-stitch-fabric-calculator/).',
    },
    {
      type: 'p',
      content:
        'Cross-stitch charts are grids of stitches, not inches. The same 140 × 100 stitch motif becomes a coaster on 18-count and a small pillow center on 11-count. Choosing Aida size means picking a count that fits your display plan, then cutting fabric large enough for margins, hoop bite, and finishing. This guide walks through the count math, common counts, a worked example, and when yardage shopping (not just a fat-quarter-sized cut) enters the picture.',
    },
    {
      type: 'h2',
      content: 'Aida count is stitches per inch',
    },
    {
      type: 'p',
      content:
        'Aida cloth is labeled by count: 14-count Aida has 14 squares (stitches) per inch when you work one stitch per square. Design width in inches = pattern stitches wide ÷ count. Design height in inches = pattern stitches high ÷ count. That is the embroidered image size before borders or framing mats.',
    },
    {
      type: 'p',
      content:
        'If a chart lists only centimeters, convert consistently (inches × 2.54 ≈ cm) or work entirely in metric with stitches per centimeter—do not mix units mid-formula. Soften hard edges in your notes: blocked or washed pieces can shift slightly, so leave generous margins.',
    },
    {
      type: 'h2',
      content: 'Common counts and what they feel like',
    },
    {
      type: 'table',
      content: {
        caption: 'Common Aida counts (planning orientation)',
        headers: ['Count', 'Stitches per inch', 'Same 140-st wide chart', 'Typical use notes'],
        rows: [
          ['11-count', '11', '~12.7″', 'Larger stitches, bold, beginner-friendly'],
          ['14-count', '14', '10″', 'Very common chart default'],
          ['16-count', '16', '~8.8″', 'Finer look, still widely available'],
          ['18-count', '18', '~7.8″', 'Smaller design, more detail density'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'These inch sizes are pure division—no seam allowance, no mat overlap. Always add finishing margin before you buy or cut. Specialty counts exist; the same formula applies as long as you know stitches per inch for how you will stitch.',
    },
    {
      type: 'h2',
      content: 'From design size to fabric cut',
    },
    {
      type: 'p',
      content:
        'Cut width ≈ design width + left margin + right margin. Cut height ≈ design height + top margin + bottom margin. A frequent planning rule of thumb is about 2–3 inches of extra fabric on each side so you can hoop comfortably and still have fabric for framing, binding, or pillow finishing. Large scroll frames or aggressive finishing may need more; tiny ornaments may need less but still should not be cut to the stitch line.',
    },
    {
      type: 'p',
      content:
        'Enter stitch width, stitch height, count, and margin into the cross-stitch fabric calculator (/tools/cross-stitch-fabric-calculator/) to get cut dimensions without hand arithmetic errors—especially useful when comparing 14-count vs 16-count for the same chart before ordering.',
    },
    {
      type: 'h2',
      content: 'Worked example: 120 × 160 stitches on 14-count',
    },
    {
      type: 'p',
      content:
        'Design width = 120 ÷ 14 ≈ 8.6 inches. Design height = 160 ÷ 14 ≈ 11.4 inches. With a 3-inch margin on each side, cut width ≈ 8.6 + 6 = 14.6 inches and cut height ≈ 11.4 + 6 = 17.4 inches. Round up when buying pre-cut pieces (for example, a 15×18 inch cut) so you are not short after squaring the grain.',
    },
    {
      type: 'p',
      content:
        'On 18-count, the same chart becomes about 6.7 × 8.9 inches before margins—noticeably smaller on the wall. Choose count for the finished look you want, not only for what is in the stash bin.',
    },
    {
      type: 'h2',
      content: 'Evenweave, linen, and over-two stitching',
    },
    {
      type: 'p',
      content:
        'Evenweave and linen are often described by threads per inch. If you stitch over two threads, effective stitches per inch is roughly half the thread count (for example, 28-count linen over two ≈ 14 stitches per inch—similar ballpark to 14-count Aida). Confirm your pattern’s fabric recommendation; switching fabrics without adjusting count math is a classic way to mis-size a gift.',
    },
    {
      type: 'h2',
      content: 'Buying cuts vs buying yardage',
    },
    {
      type: 'p',
      content:
        'One project usually needs a rectangle cut to the formula above. If you are stocking Aida for a club, teaching kit, or several ornaments from one bolt, you are back in fabric-yardage territory: how many rectangles fit across the bolt width, how much length that consumes, and whether dye lots match. Pair this guide with how many yards of fabric (/guides/how-many-yards-of-fabric/) and the fabric yardage calculator (/tools/fabric-yardage-calculator/) for multi-piece shopping.',
    },
    {
      type: 'p',
      content:
        'Tool size analogies from yarn crafts do not transfer—Aida count is not a crochet hook letter. If you also crochet, keep hook conversions on their own page: crochet hook size conversion chart (/guides/crochet-hook-size-conversion-chart/).',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Buying fabric to the design size with zero margin',
        'Assuming every chart is drafted for 14-count',
        'Mixing cm and inches in the same division',
        'Switching to linen over-two without recalculating effective count',
        'Centering by eye on a too-small cut and running out of edge fabric',
      ],
    },
    {
      type: 'h2',
      content: 'Hoops, Q-snaps, and scroll frames',
    },
    {
      type: 'p',
      content:
        'Fabric cut size must clear your stitching frame, not only the design. A tight hoop on undersized fabric distorts stitches near the edge; scroll frames need extra length on the axis that rolls. If you use gridding, allow room for basting lines outside the motif. Center the design on the cut rectangle before the first stitch so you do not discover a short margin after 5,000 stitches.',
    },
    {
      type: 'p',
      content:
        'Dark Aida can show white underlayer differently than white Aida shows dark; coverage expectations change with count and strand number. Stitch a tiny corner test when switching counts with the same floss brand. Specialty fabrics (opalescent, dyed, aida with glitter) still use the same stitches-per-inch math—count is count—but fray behavior may encourage slightly larger margins.',
    },
    {
      type: 'h2',
      content: 'Framing and finishing allowances',
    },
    {
      type: 'p',
      content:
        'Framers often want several inches beyond the mat opening to wrap foam board. Ornaments and round-framed minis may need less absolute margin but still require handling room for basting and trimming. When finishing as a pillow, add seam allowance and stuffing loft to the fabric plan—design inches alone are not pillow cut inches. Soft furnishings blur into general sewing yardage; see how many yards of fabric (/guides/how-many-yards-of-fabric/) for bolt math.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Read stitch width and height from the chart, pick a count that yields the display size you want, add margins, and confirm cut size with the cross-stitch fabric calculator (/tools/cross-stitch-fabric-calculator/). For bolt purchases across many pieces, continue with how many yards of fabric (/guides/how-many-yards-of-fabric/).',
    },
  ],
  sources: [
    ["Craft Yarn Council — Standards overview", "https://www.craftyarncouncil.com/standards"],
  ],
};

export default guide;
