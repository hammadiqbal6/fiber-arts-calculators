module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx serve dist -l 4173',
      startServerReadyPattern: 'Accepting connections',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/knitting-crochet/',
        'http://localhost:4173/tools/yarn-blanket-calculator/',
        'http://localhost:4173/tools/quilt-backing-calculator/',
        'http://localhost:4173/tools/knitting-gauge-calculator/',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        formFactor: 'mobile',
        throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
        screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['warn', { maxNumericValue: 150 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
