export default async (req, res) => {
    const data = await $fetch('https://restcountries.com/v2/all?fields=name,capital,region,population,nativeName,subRegion,topLevelDomain,currencies,languages,borders,flags,continent')

// add later
// ?fields=name,capital,region,population,nativeName,subRegion,topLevelDomain,currencies,languages,borders,flags,continent
    return data
  }