const exampleContent = {
  "name": "Niklas Impiö",
  "address": "Valtakatu 20 As 7",
  "zipAndCity": "90500 Oulu",
  "phone": "+358408278002",
  "email": "niklas.impio@hotmail.com",
  "profile": [
    "24-vuotias.",
    "Kotoisin Ranualta.",
    "Tietotekniikan kandidaatti.",
    "Nopea ja kiinnostunut oppimaan uusia taitoja.",
    "Oma-aloitteinen ongelmanratkaisija.",
    "Tunnollinen ja tehokas.",
    "Pystyn työskentelemään osana tiimiä tai itsenäisesti.",
    "Harrastuksia: tennis, lenkkeily ja jääkiekko.",
    "Kiinnostuksia: tekniikka, urheilu ja uuden oppiminen."
  ],
  "skills": [
    "Hyvät kirjalliset ja suulliset  kommunikointi taidot suomeksi ja englanniksi.",
    "Ruotsin kielen perusteet.",
    "Tehokas tiedon hakeminen ja soveltaminen.",
    "Kyky jakaa suuria kokonaisuuksia yksinkertaisiin osiin.",
    "Vahvat loogiset taidot.",
    "Dokumentoinnin ja versionhallinnan perusteet.",
    "Käyttöliittymäsuunnittelun ja käytettävyyden perusteet."
  ],
  "education": [
    {
      "name": "Rovaniemi Lyseonpuiston Lukio",
      "degree": "Ylioppilas",
      "graduation": "05/2013"
    },
    {
      "name": "Oulun Yliopisto",
      "degree": "Tietotekniikan kandidaatti",
      "graduation": "07/2019",
      "link": "http://jultika.oulu.fi/Record/nbnfioulu-201906212617"
    }
  ],
  "jobHistory": [
    {
      "employer": "Keskusgrilli Sarajärvi Ky",
      "jobTitle": "Myyjä",
      "duration": "Kesätyö kahtena kesänä."
    },
    {
      "employer": "Kuha Mauri Tmi",
      "jobTitle": "Maatalous apulainen",
      "duration": "Kesätyö yhtenä kesänä"
    }
  ]
}


const initialComments = [
  {
    content: "Example comment."
  },
  {
    content: "Example comment number 2."
  },

]

const testComments = [
  {
    content: "ääkkösiä"
  },
  {
    content: "too long"
  },
  {
    content: "CaSe ReMaInS"
  },
  {
    content: "supports \n line \n breaks."
  }
]

module.exports = {exampleContent, initialComments, testComments}