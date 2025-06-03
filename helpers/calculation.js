const { estimateConstants, interiorItemsConstants, interiorItemsToBePainted, interiorConditions, interiorDetails, exteriorItemsConstants, exteriorConditions, exteriorDetails, exteriorItemsToBePainted, cabinetConditions, cabinetDetails, interiorGallonsConstants, exteriorGallonsConstants, cabinetsGallonsConstants } = require('./constants')
const { colas } = require('./colas')
const { stateColas } = require('./stateColas')
const { paintBrands } = require('./constants')
const OpenAI = require("openai");
const zipcodes = require('zipcodes')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // It's best to store your API key in an environment variable
})

const COLAS_OFFSET = 1.4

function parseNumber(value) {
  return parseFloat(value.replace(/,/g, ''));
}

exports.calculateInteriorEstimate = async ( estimate ) => {

  if(!estimate.interiorSquareFeet) return 0

  let colaMultiplier  = 1
  let multiplier      = estimateConstants.interiorLaborRate
  
  if(estimate.clientZipCode){

    let lookupZip = zipcodes.lookup(estimate.clientZipCode)

    if(lookupZip){

      let found   = stateColas.find(( item ) => item.state == lookupZip.state )

      if(found) colaMultiplier = found.multiplier

    }

    console.log('INTERIOR COLA', colaMultiplier)
    
  }


  let total           = estimate.interiorSquareFeet * multiplier * colaMultiplier

  
  let interiorItems   = []
  
  estimate.interiorItems.forEach((item) => interiorItems.push(item.type))
  let interiorItemsNotSelected = interiorItemsToBePainted.filter((item) => !interiorItems.includes(item))

  let interiorItemConstant = 1

  interiorItemsNotSelected.forEach((item) => {
    
    let found                         = interiorItemsConstants.find((interior) => interior.type == item )
    interiorItemConstant             -= found.multiplier
    
  })


  total               = total *  interiorItemConstant


  let conditionDetailMultiplier = 0

  if(interiorConditions.find((item) => item.type == estimate.interiorCondition)) conditionDetailMultiplier += interiorConditions.find((item) => item.type == estimate.interiorCondition).multiplier

  if(interiorDetails.find((item) => item.type == estimate.interiorDetail)) conditionDetailMultiplier += interiorDetails.find((item) => item.type == estimate.interiorDetail).multiplier


  total = total * (1 + conditionDetailMultiplier)

  
  if (estimate.interiorIndividualItems.length > 0) {
    estimate.interiorIndividualItems.forEach((extra) => {
      if (extra.price) {
        // Extract the number portion of the price
        const price = extra.price.includes('$') 
          ? extra.price.split('$')[1] 
          : extra.price;
        
        // Parse the number if it's a valid string
        if (price) {
          total += parseNumber(price);
        }
      }
    });
  }
  
  if(estimate.paintQuality.toLowerCase() == 'standard'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).standardInterior)
    
    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).standardInterior / 100
    
  } 

  if(estimate.paintQuality.toLowerCase() == 'premium'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).premiumInterior)

    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).premiumInterior / 100
    
  }

  return total.toFixed(2)
  
}

exports.calculateExteriorEstimate = async ( estimate ) => {

  if(!estimate.exteriorSquareFeet) return 0


  let colaMultiplier  = 1
  let multiplier      = estimateConstants.exteriorLaborRate

  if(estimate.clientZipCode){

    let lookupZip = zipcodes.lookup(estimate.clientZipCode)

    // let message = `What is the cost per living index for the zip code ${estimate.clientZipCode}, in ${lookupZip ? lookupZip.state : 'the US'}. Provide the index number in quotes to parse in the backend of my node js app`

    // const chatCompletion = await client.chat.completions.create({
    //   messages: [{ role: 'user', content: message }],
    //   model: 'gpt-3.5-turbo',
    // })

    // if(chatCompletion.choices){
      
    //   const costOfLivingText  = chatCompletion.choices[0].message.content.trim()
      
    //   const indexMatch        = costOfLivingText.match(/"(\d+(\.\d+)?)"/)

    //   colaMultiplier          = parseFloat(indexMatch[1]) / 100
      
    // } 

    if(lookupZip){

      let found   = stateColas.find(( item ) => item.state == lookupZip.state )

      if(found) colaMultiplier = found.multiplier

    }
    
  }

  console.log('EXTERIOR COLA', colaMultiplier)


  let total           = estimate.exteriorSquareFeet * multiplier * colaMultiplier
  

  let exteriorItems   = []
  
  estimate.exteriorItems.forEach((item) => exteriorItems.push(item.type))
  let exteriorItemsNotSelected = exteriorItemsToBePainted.filter((item) => !exteriorItems.includes(item))

  let exteriorItemConstant = 1

  exteriorItemsNotSelected.forEach((item) => {

    let found                  = exteriorItemsConstants.find((exterior) => exterior.type == item )
    
    exteriorItemConstant      -= found.multiplier
    
  })
  

  total               = total *  exteriorItemConstant


  let conditionDetailMultiplier = 0
  
  if(exteriorConditions.find((item) => item.type == estimate.exteriorCondition)) conditionDetailMultiplier += exteriorConditions.find((item) => item.type == estimate.exteriorCondition).multiplier

  if(exteriorDetails.find((item) => item.type == estimate.exteriorDetail)) conditionDetailMultiplier += exteriorDetails.find((item) => item.type == estimate.exteriorDetail).multiplier

  total = total * (1 + conditionDetailMultiplier)
  
  if (estimate.exteriorIndividualItems.length > 0) {
    estimate.exteriorIndividualItems.forEach((extra) => {
      if (extra.price) {
        // Extract the number portion of the price
        const price = extra.price.includes('$') 
          ? extra.price.split('$')[1] 
          : extra.price;
  
        // Parse the number if it's a valid string
        if (price) {
          total += parseNumber(price);
        }
      }
    });
  }

  if(estimate.paintQuality.toLowerCase() == 'standard'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).standardExterior)
    
    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).standardExterior / 100
    
  } 
  
  if(estimate.paintQuality.toLowerCase() == 'premium'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).premiumExterior)
    
    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).premiumExterior / 100
    
  }
  
  return total.toFixed(2)
  
}

exports.calculateCabinetsEstimate = async ( estimate ) => {

  if(!estimate.doorsAndDrawers) return 0

  let colaMultiplier      = 1
  let multiplier          = estimateConstants.cabinetLaborRate

  if(estimate.clientZipCode){

    let lookupZip = zipcodes.lookup(estimate.clientZipCode)

    // let message = `What is the cost per living index for the zip code ${estimate.clientZipCode}, in ${lookupZip ? lookupZip.state : 'the US'}. Provide the index number in quotes to parse in the backend of my node js app`

    // const chatCompletion = await client.chat.completions.create({
    //   messages: [{ role: 'user', content: message }],
    //   model: 'gpt-3.5-turbo',
    // })

    // if(chatCompletion.choices){

    //   console.log('CABINETS', chatCompletion.choices)
      
    //   const costOfLivingText  = chatCompletion.choices[0].message.content.trim()
      
    //   const indexMatch        = costOfLivingText.match(/"(\d+(\.\d+)?)"/)

    //   colaMultiplier          = parseFloat(indexMatch[1]) / 100
      
    // } 

    if(lookupZip){

      let found   = stateColas.find(( item ) => item.state == lookupZip.state )

      if(found) colaMultiplier = found.multiplier

    }
    
  }

  console.log('CABINET COLA', colaMultiplier)
  
  let total                   = estimate.doorsAndDrawers * multiplier * colaMultiplier


  let insideCabinetConstant   = 1
  
  if(estimate.insideCabinet){
    insideCabinetConstant     = insideCabinetConstant + estimateConstants.paintingInsideRate
  }


  total                       = total *  insideCabinetConstant

  
  let conditionDetailMultiplier = 0


  if(cabinetConditions.find((item) => item.type == estimate.cabinetCondition)) conditionDetailMultiplier += cabinetConditions.find((item) => item.type == estimate.cabinetCondition).multiplier

  if(cabinetDetails.find((item) => item.type == estimate.cabinetDetail)) conditionDetailMultiplier += cabinetDetails.find((item) => item.type == estimate.cabinetDetail).multiplier
  
  total = total * (1 + conditionDetailMultiplier)

  if(estimate.paintQuality.toLowerCase() == 'standard'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).standardCabinets)
    
    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).standardCabinets / 100
    
  } 
  
  if(estimate.paintQuality.toLowerCase() == 'premium'){

    console.log('INTERIOR PAINT COLA', paintBrands.find((item) => item.type == estimate.paintBrand).premiumCabinets)
    
    if(paintBrands.find((item) => item.type == estimate.paintBrand)) total *= paintBrands.find((item) => item.type == estimate.paintBrand).premiumCabinets / 100
    
  }

  return total.toFixed(2)
  
}

exports.totalEstimate = (estimate) => {

  let total = 0

  if(!+estimate.interiorEstimate && !+estimate.cabinetEstimate && !+estimate.exteriorEstimate) return '0'

  total = +estimate.interiorEstimate + +estimate.cabinetEstimate + +estimate.exteriorEstimate

  return total.toFixed(2)
  
}

function parseNumber(value) {
  return parseFloat(value.replace(/,/g, ''));
}


exports.totalEstimateAdjusted = (estimate) => {

  let total = 0

  total = parseNumber(estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted) +
  parseNumber(estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted) +
  parseNumber(estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted)

  return total.toFixed(2)
  
}

exports.totalEstimateAdjustedNewEstimate = (estimate) => {

  let total = 0

  total = +estimate.interiorAdjusted.replace('$', '') + +estimate.cabinetAdjusted.replace('$', '') + +estimate.exteriorAdjusted.replace('$', '')

  return total.toFixed(2)
  
}

exports.calculateInteriorGallonsCost = (estimate) => {
  
  let total                       = new Object()
  total.gallons                   = 0
  total.gallonsCost               = 0
  total.gallonsRequired           = []

  if(!estimate.interiorSquareFeet){
    return total
  }

  if(estimate.interiorItems.length == 0){
    return total
  }
  
  estimate.interiorItems.forEach((item) => {

    const factor          = interiorGallonsConstants.find( (index) => item.type == index.type)

    let required            = new Object()
    required.type           = item.type
    required.gallons        = factor.type == 'stair_railing_spindles' ? 1 : (+estimate.interiorSquareFeet * +factor.multiplier)
    total.gallonsRequired.push(required)

    total.gallons           += item.type == 'stair_railing_spindles' ? 1 : (+estimate.interiorSquareFeet * +factor.multiplier)
    
  })

  total.gallonsCost          = +interiorGallonsConstants.find( (index) => index.type == 'costMultiplier').multiplier * total.gallons

  
  return total
  
}

exports.calculateExteriorGallonsCost = (estimate) => {
  
  let total                       = new Object()
  total.gallons                   = 0
  total.gallonsCost               = 0
  total.gallonsRequired           = []

  if(!estimate.exteriorSquareFeet){
    return total
  }

  if(estimate.exteriorItems.length == 0){
    return total
  }
  
  estimate.exteriorItems.forEach((item) => {

    const factor          = exteriorGallonsConstants.find( (index) => item.type == index.type)

    let required            = new Object()
    required.type           = item.type
    required.gallons        = (+estimate.exteriorSquareFeet * +factor.multiplier)
    total.gallonsRequired.push(required)

    total.gallons           += (+estimate.exteriorSquareFeet * +factor.multiplier)
    
  })

  total.gallonsCost          = +exteriorGallonsConstants.find( (index) => index.type == 'costMultiplier').multiplier * total.gallons
  
  return total
  
}

exports.calculateCabinetsGallonsCost = (estimate) => {
  
  let total                       = new Object()
  total.gallons                   = 0
  total.gallonsCost               = 0

  if(!estimate.doorsAndDrawers){
    return total
  }

  total.gallons                   = +estimate.doorsAndDrawers * +cabinetsGallonsConstants.find( (index) => index.type == 'cabinets').multiplier

  if(estimate.insideCabinet){
    total.gallons += +estimate.doorsAndDrawers * +cabinetsGallonsConstants.find( (index) => index.type == 'cabinets').multiplier
  }

  total.gallonsCost               = +cabinetsGallonsConstants.find( (index) => index.type == 'costMultiplier').multiplier * total.gallons
  
  return total
  
}