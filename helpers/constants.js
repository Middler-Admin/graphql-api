exports.estimateConstants = {
  interiorLaborRate: 4.412,
  colaOffset: 1.4,
  exteriorLaborRate: 3.036,
  cabinetLaborRate: 34.099,
  paintingInsideRate: .13,
}

exports.interiorItemsConstants = [
  {
    type: 'walls',
    multiplier: .34
  },
  {
    type: 'ceilings',
    multiplier: .07
  },
  {
    type: 'crown_molding',
    multiplier: .07
  },
  {
    type: 'interior_doors',
    multiplier: .06
  },
  {
    type: 'baseboards_and_trim',
    multiplier: .07
  },
  {
    type: 'windows_patio_doors',
    multiplier: .06
  },
  {
    type: 'stair_railing_spindles',
    multiplier: .05
  }
]

exports.interiorItemsToBePainted = [
  'walls',
  'ceilings',
  'crown_molding',
  'interior_doors',
  'baseboards_and_trim',
  'windows_patio_doors',
  'stair_railing_spindles'
]

exports.interiorConditions = [
  {
    type: 'fair',
    multiplier: .11
  },
  {
    type: 'good',
    multiplier: .06
  }
]

exports.interiorDetails = [
  {
    type: 'some_detail',
    multiplier: .11
  },
  {
    type: 'very_detailed',
    multiplier: .21
  }
]

exports.exteriorItemsConstants = [
  {
    type: 'walls',
    multiplier: .63
  },
  {
    type: 'trims',
    multiplier: .09
  },
  {
    type: 'garage_doors',
    multiplier: .07
  },
  {
    type: 'windows_patio_doors',
    multiplier: .13
  },
  {
    type: 'gutters_downspouts',
    multiplier: .08
  }
]

exports.exteriorItemsToBePainted = [
  'walls',
  'trims',
  'garage_doors',
  'windows_patio_doors',
  'gutters_downspouts'
]

exports.exteriorConditions = [
  {
    type: 'fair',
    multiplier: .11
  },
  {
    type: 'good',
    multiplier: .06
  }
]

exports.exteriorDetails = [
  {
    type: 'some_detail',
    multiplier: .11
  },
  {
    type: 'very_detailed',
    multiplier: .21
  }
]

exports.cabinetConditions = [
  {
    type: 'fair',
    multiplier: .11
  },
  {
    type: 'good',
    multiplier: .06
  }
]

exports.cabinetDetails = [
  {
    type: 'some_detail',
    multiplier: .09
  },
  {
    type: 'very_detailed',
    multiplier: .17
  }
]

exports.interiorGallonsConstants = [
  {
    type: 'costMultiplier',
    multiplier: '91.50'
  },
  {
    type: 'walls',
    multiplier: '.01150625'
  },
  {
    type: 'ceilings',
    multiplier: '.00875'
  },
  {
    type: 'crown_molding',
    multiplier: '.001295'
  },
  {
    type: 'interior_doors',
    multiplier: '.001290625'
  },
  {
    type: 'baseboards_and_trim',
    multiplier: '.0012075'
  },
  {
    type: 'windows_patio_doors',
    multiplier: '.001203125'
  },
  {
    type: 'stair_railing_spindles',
    multiplier: '1'
  }
]

exports.exteriorGallonsConstants = [
  {
    type: 'costMultiplier',
    multiplier: '106.66'
  },
  {
    type: 'walls',
    multiplier: '.01094'
  },
  {
    type: 'trims',
    multiplier: '.00280'
  },
  {
    type: 'garage_doors',
    multiplier: '.0006528'
  },
  {
    type: 'windows_patio_doors',
    multiplier: '.0024063'
  },
  {
    type: 'gutters_downspouts',
    multiplier: '.0033250'
  }
]

exports.cabinetsGallonsConstants = [
  {
    type: 'costMultiplier',
    multiplier: '109.49'
  },
  {
    type: 'cabinets',
    multiplier: '.0119'
  }
]

exports.paintBrands = [
  {
    type: "sherwin_williams",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
  {
    type: "behr",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
  {
    type: "benjamin_moore",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
  {
    type: "dunn_edwards",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
  {
    type: "ppg",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
  {
    type: "valspar",
    standardInterior: 81.99,
    standardExterior: 88.49,
    standardCabinets: 93.49,
    premiumInterior: 81.99,
    premiumExterior: 88.49,
    premiumCabinets: 93.49,
  },
];

// exports.paintBrands = [
//   {
//     type: "sherwin_williams",
//     standardInterior: 81.99,
//     standardExterior: 88.49,
//     standardCabinets: 93.49,
//     premiumInterior: 98.99,
//     premiumExterior: 108.99,
//     premiumCabinets: 122.49,
//   },
//   {
//     type: "behr",
//     standardInterior: 30.98,
//     standardExterior: 43.98,
//     standardCabinets: 46.98,
//     premiumInterior: 59.98,
//     premiumExterior: 75.98,
//     premiumCabinets: 52.98,
//   },
//   {
//     type: "benjamin_moore",
//     standardInterior: 81.99,
//     standardExterior: 61.99,
//     standardCabinets: 81.99,
//     premiumInterior: 98.99,
//     premiumExterior: 82.99,
//     premiumCabinets: 82.99,
//   },
//   {
//     type: "dunn_edwards",
//     standardInterior: 62.5,
//     standardExterior: 60.5,
//     standardCabinets: 72.5,
//     premiumInterior: 89,
//     premiumExterior: 80.5,
//     premiumCabinets: 72.5,
//   },
//   {
//     type: "ppg",
//     standardInterior: 27.98,
//     standardExterior: 31.98,
//     standardCabinets: 56.98,
//     premiumInterior: 56.98,
//     premiumExterior: 56.98,
//     premiumCabinets: 56.98,
//   },
//   {
//     type: "valspar",
//     standardInterior: 35.99,
//     standardExterior: 38.98,
//     standardCabinets: 56.98,
//     premiumInterior: 55.99,
//     premiumExterior: 67.98,
//     premiumCabinets: 56.98,
//   },
// ];
