import normalize from 'react-native-normalize';

export let n = val => {
  return normalize(val);
};

// value for dropdown on screen MainInformation

let dataLocalisation = {
  province: [
    {value: 'KASAI CENTRAL'},
    {value: 'ITURI'},
    {value: 'NORD-KIVU'},
    {value: 'KASAI'},
  ],
  territory: [
    {value: 'KAZUMBA'},
    {value: 'DJUGU'},
    {value: 'MASISI'},
    {value: 'KAMONIA'},
    {value: 'KAMWESHA'},
  ],
  healtharea: [
    {value: 'KALOMBA'},
    {value: 'LITA'},
    {value: 'MWESO-TERRITOIRE'},
    {value: 'DRODRO'},
    {value: 'KAMWESHA'},
    {value: 'KALONDA OUEST'},
  ],
  healthzone: [
    {value: 'BUSHANGA'},
    {value: 'BLUKWA ETAT'},
    {value: 'BLUKWA MBI'},
    {value: 'DRODRO'},
    {value: 'KALENDENDE'},
    {value: 'KALEMBE'},
    {value: 'INGA'},
    {value: 'KAMBA NKUVU'},
    {value: 'KAKUMBA'},
    {value: 'KATOKA'},
    {value: 'KABAMBAYI'},
    {value: 'KATALUSHI'},
    {value: 'KPALO'},
    {value: 'KPARNGANZA'},
    {value: 'KAKUNGULA'},
    {value: 'LOGA'},
    {value: 'LOGO/TAKPA'},
    {value: 'MULAMBA TSHIONZA'},
    {value: 'MBAU'},
    {value: 'MAKUMBI'},
    {value: 'sUCHA'},
    {value: 'SALIBOKO'},
    {value: 'TSHINDEMBA'},
    {value: 'TSHIMBINDA 1'},
    {value: 'TSHIMBINDA 2'},
  ],
  group: [
    {value: 'BAKUA TSHIPANGA'},
    {value: 'BENA KABANDA'},
    {value: 'BAKUA MFUNYA'},
    {value: 'BENA TSHANGA'},
    {value: 'BENA TSHIPANGA'},
    {value: 'BASHALI MOKOTO'},
    {value: 'BAKUA-LUBALA'},
    {value: 'BENAKUBA'},
    {value: 'BUKU'},
    {value: 'BA-BUSONGO'},
    {value: 'BAKABALA'},
    {value: 'BAKUMBA'},
    {value: 'BAKUANJIBA'},
    {value: 'BAKUATSHENZE'},
    {value: 'DIROKPA'},
    {value: 'KABUMBA'},
    {value: 'KAKUANJIBA'},
    {value: 'KATSHIABALA'},
    {value: 'KABUANGA TSHISENGE'},
    {value: 'LOGA'},
    {value: 'LOSSANDREMA'},
    {value: 'MATADI BABUSONGO'},
    {value: 'MUTONDO'},
    {value: 'MFUAMBA'},
    {value: 'PIMBO'},
    {value: 'SALIBOKO'},
    {value: 'TSHITADI'},
    {value: 'TSHINVUNGU'},
    {value: 'TSHISANGA MPATA'},
    {value: 'TSHIASANGOMBE'},
  ],
  chieftaincy: [
    {value: 'BASHALI'},
    {value: 'BAHEMA NORD'},
    {value: 'KAKUNGULA'},
    {value: 'KAKOBA'},
    {value: 'KATSHIABALA'},
    {value: 'KASAI KABAMBAYI'},
    {value: 'LONSA'},
    {value: 'MFUAMBA'},
    {value: 'MBUNKU'},
    {value: 'MUTONDO'},
    {value: 'MATADI'},
    {value: 'MWAZEMBA'},
    {value: ' MUTETELA'},
    {value: 'NDAMBI KAWAYA'},
    {value: 'TSHIKAPA'},
    {value: 'TSHITADI'},
    {value: 'TSHIASANGOMBE'},
    {value: 'WALENDU/TATSI'},
  ],
  village: [
    {value: 'BUSHANGA 2'},
    {value: 'BUSHANGA 1'},
    {value: 'BUNA'},
    {value: 'CHUSSA'},
    {value: 'CHUMBU'},
    {value: 'DRODRO'},
    {value: 'DZATHI'},
    {value: 'SESSETI'},
    {value: 'JISSA'},
    {value: 'Kangulube'},
    {value: 'Kabuanga Tshinsenge'},
    {value: 'Katalushi'},
    {value: 'KALEMO'},
    {value: 'KALEMBE'},
    {value: 'KASHANJE'},
    {value: 'KPALUBA'},
    {value: 'KPABU'},
    {value: 'KAKUNGULA'},
    {value: 'KALENDENDE'},
    {value: 'LOGA'},
    {value: 'LOGO'},
    {value: 'LOVI'},
    {value: 'LITHO'},
    {value: 'Lukombo'},
    {value: 'Mulamba Tshionza'},
    {value: 'MUENDELE'},
    {value: 'Mbuyi Tshiala'},
    {value: 'Mole'},
    {value: 'Mwanza Mukala'},
    {value: 'Ntumba Nsumbula'},
    {value: 'RUGARAMA'},
    {value: 'TCHAU'},
    {value: 'Tshindemba'},
    {value: 'TCHE'},
    {value: 'TSORO/GUKPA'},
  ],
};

export default localisationTab = {
  province: [],
  territory: [],
  healtharea: [],
  healthzone: [],
  group: [],
  chieftaincy: [],
  village: [],
};

//fonction a reecrire
dataLocalisation.province.forEach(item => {
  localisationTab.province
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.territory.forEach(item => {
  localisationTab.territory
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.healtharea.forEach(item => {
  localisationTab.healtharea
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.healthzone.forEach(item => {
  localisationTab.healthzone
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.group.forEach(item => {
  localisationTab.group
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.chieftaincy.forEach(item => {
  localisationTab.chieftaincy
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
dataLocalisation.village.forEach(item => {
  localisationTab.village
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
    .push({value: item.value.toLowerCase().trim()});
});
