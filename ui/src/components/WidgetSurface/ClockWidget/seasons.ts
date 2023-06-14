const seasons = [
  {
    name: {
      jp: "立春 Risshun",
      en: "(Beginning of spring)",
    },
    seasons: [
      {
        dates: "February 4–8",
        name: {
          jp: "東風解凍 Harukaze kōri o toku",
          en: "East wind melts the ice",
        },
        startDate: "February 4",
        endDate: "February 8",
      },
      {
        dates: "February 9–13",
        name: {
          jp: "黄鶯睍睆 Kōō kenkan su",
          en: "Bush warblers start singing in the mountains",
        },
        startDate: "February 9",
        endDate: "February 13",
      },
      {
        dates: "February 14–18",
        name: {
          jp: "魚上氷 Uo kōri o izuru",
          en: "Fish emerge from the ice",
        },
        startDate: "February 14",
        endDate: "February 18",
      },
    ],
    startDate: "February 4",
    endDate: "February 18",
  },
  {
    name: {
      jp: "雨水 Usui",
      en: " (Rainwater)",
    },
    seasons: [
      {
        dates: "February 19–23",
        name: {
          jp: "土脉潤起 Tsuchi no shō uruoi okoru",
          en: "Rain moistens the soil",
        },
        startDate: "February 19",
        endDate: "February 23",
      },
      {
        dates: "February 24–28",
        name: {
          jp: "霞始靆 Kasumi hajimete tanabiku",
          en: "Mist starts to linger",
        },
        startDate: "February 24",
        endDate: "February 28",
      },
      {
        dates: "March 1–5",
        name: {
          jp: "草木萌動 Sōmoku mebae izuru",
          en: "Grass sprouts, trees bud",
        },
        startDate: "March 1",
        endDate: "March 5",
      },
    ],
    startDate: "February 19",
    endDate: "March 5",
  },
  {
    name: {
      jp: "啓蟄 Keichitsu",
      en: " (Insects awaken)",
    },
    seasons: [
      {
        dates: "March 6–10",
        name: {
          jp: "蟄虫啓戸 Sugomori mushito o hiraku",
          en: "Hibernating insects surface",
        },
        startDate: "March 6",
        endDate: "March 10",
      },
      {
        dates: "March 11–15",
        name: {
          jp: "桃始笑 Momo hajimete saku",
          en: "First peach blossoms",
        },
        startDate: "March 11",
        endDate: "March 15",
      },
      {
        dates: "March 16–20",
        name: {
          jp: "菜虫化蝶 Namushi chō to naru",
          en: "Caterpillars become butterflies",
        },
        startDate: "March 16",
        endDate: "March 20",
      },
    ],
    startDate: "March 6",
    endDate: "March 20",
  },
  {
    name: {
      jp: "春分 Shunbun",
      en: " (Spring equinox)",
    },
    seasons: [
      {
        dates: "March 21–25",
        name: {
          jp: "雀始巣 Suzume hajimete sukū",
          en: "Sparrows start to nest",
        },
        startDate: "March 21",
        endDate: "March 25",
      },
      {
        dates: "March 26–30",
        name: {
          jp: "櫻始開 Sakura hajimete saku",
          en: "First cherry blossoms",
        },
        startDate: "March 26",
        endDate: "March 30",
      },
      {
        dates: "March 31–April 4",
        name: {
          jp: "雷乃発声 Kaminari sunawachi koe o hassu",
          en: "Distant thunder",
        },
        startDate: "March 31",
        endDate: "April 4",
      },
    ],
    startDate: "March 21",
    endDate: "April 4",
  },
  {
    name: {
      jp: "清明 Seimei",
      en: " (Pure and clear)",
    },
    seasons: [
      {
        dates: "April 5–9",
        name: {
          jp: "玄鳥至 Tsubame kitaru",
          en: "Swallows return",
        },
        startDate: "April 5",
        endDate: "April 9",
      },
      {
        dates: "April 10–14",
        name: {
          jp: "鴻雁北 Kōgan kaeru",
          en: "Wild geese fly north",
        },
        startDate: "April 10",
        endDate: "April 14",
      },
      {
        dates: "April 15–19",
        name: {
          jp: "虹始見 Niji hajimete arawaru",
          en: "First rainbows",
        },
        startDate: "April 15",
        endDate: "April 19",
      },
    ],
    startDate: "April 5",
    endDate: "April 19",
  },
  {
    name: {
      jp: "穀雨 Kokuu",
      en: " (Grain rains)",
    },
    seasons: [
      {
        dates: "April 20–24",
        name: {
          jp: "葭始生 Ashi hajimete shōzu",
          en: "First reeds sprout",
        },
        startDate: "April 20",
        endDate: "April 24",
      },
      {
        dates: "April 25–29",
        name: {
          jp: "霜止出苗 Shimo yamite nae izuru",
          en: "Last frost, rice seedlings grow",
        },
        startDate: "April 25",
        endDate: "April 29",
      },
      {
        dates: "April 30–May 4",
        name: {
          jp: "牡丹華 Botan hana saku",
          en: "Peonies bloom",
        },
        startDate: "April 30",
        endDate: "May 4",
      },
    ],
    startDate: "April 20",
    endDate: "May 4",
  },
  {
    name: {
      jp: "立夏 Rikka",
      en: " (Beginning of summer)",
    },
    seasons: [
      {
        dates: "May 5–9",
        name: {
          jp: "蛙始鳴 Kawazu hajimete naku",
          en: "Frogs start singing",
        },
        startDate: "May 5",
        endDate: "May 9",
      },
      {
        dates: "May 10–14",
        name: {
          jp: "蚯蚓出 Mimizu izuru",
          en: "Worms surface",
        },
        startDate: "May 10",
        endDate: "May 14",
      },
      {
        dates: "May 15–20",
        name: {
          jp: "竹笋生 Takenoko shōzu",
          en: "Bamboo shoots sprout",
        },
        startDate: "May 15",
        endDate: "May 20",
      },
    ],
    startDate: "May 5",
    endDate: "May 20",
  },
  {
    name: {
      jp: "小満 Shōman",
      en: " (Lesser ripening)",
    },
    seasons: [
      {
        dates: "May 21–25",
        name: {
          jp: "蚕起食桑 Kaiko okite kuwa o hamu",
          en: "Silkworms start feasting on mulberry leaves",
        },
        startDate: "May 21",
        endDate: "May 25",
      },
      {
        dates: "May 26–30",
        name: {
          jp: "紅花栄 Benibana sakau",
          en: "Safflowers bloom",
        },
        startDate: "May 26",
        endDate: "May 30",
      },
      {
        dates: "May 31–June 5",
        name: {
          jp: "麦秋至 Mugi no toki itaru",
          en: "Wheat ripens and is harvested",
        },
        startDate: "May 31",
        endDate: "June 5",
      },
    ],
    startDate: "May 21",
    endDate: "June 5",
  },
  {
    name: {
      jp: "芒種 Bōshu",
      en: " (Grain beards and seeds)",
    },
    seasons: [
      {
        dates: "June 6–10",
        name: {
          jp: "蟷螂生 Kamakiri shōzu",
          en: "Praying mantises hatch",
        },
        startDate: "June 6",
        endDate: "June 10",
      },
      {
        dates: "June 11–15",
        name: {
          jp: "腐草為螢 Kusaretaru kusa hotaru to naru",
          en: "Rotten grass becomes fireflies",
        },
        startDate: "June 11",
        endDate: "June 15",
      },
      {
        dates: "June 16–20",
        name: {
          jp: "梅子黄 Ume no mi kibamu",
          en: "Plums turn yellow",
        },
        startDate: "June 16",
        endDate: "June 20",
      },
    ],
    startDate: "June 6",
    endDate: "June 20",
  },
  {
    name: {
      jp: "夏至 Geshi",
      en: " (Summer solstice)",
    },
    seasons: [
      {
        dates: "June 21–26",
        name: {
          jp: "乃東枯 Natsukarekusa karuru",
          en: "Self-heal withers",
        },
        startDate: "June 21",
        endDate: "June 26",
      },
      {
        dates: "June 27–July 1",
        name: {
          jp: "菖蒲華 Ayame hana saku",
          en: "Irises bloom",
        },
        startDate: "June 27",
        endDate: "July 1",
      },
      {
        dates: "July 2–6",
        name: {
          jp: "半夏生 Hange shōzu",
          en: "Crow-dipper sprouts",
        },
        startDate: "July 2",
        endDate: "July 6",
      },
    ],
    startDate: "June 21",
    endDate: "July 6",
  },
  {
    name: {
      jp: "小暑 Shōsho",
      en: " (Lesser heat)",
    },
    seasons: [
      {
        dates: "July 7–11",
        name: {
          jp: "温風至 Atsukaze itaru",
          en: "Warm winds blow",
        },
        startDate: "July 7",
        endDate: "July 11",
      },
      {
        dates: "July 12–16",
        name: {
          jp: "蓮始開 Hasu hajimete hiraku",
          en: "First lotus blossoms",
        },
        startDate: "July 12",
        endDate: "July 16",
      },
      {
        dates: "July 17–22",
        name: {
          jp: "鷹乃学習 Taka sunawachi waza o narau",
          en: "Hawks learn to fly",
        },
        startDate: "July 17",
        endDate: "July 22",
      },
    ],
    startDate: "July 7",
    endDate: "July 22",
  },
  {
    name: {
      jp: "大暑 Taisho",
      en: " (Greater heat)",
    },
    seasons: [
      {
        dates: "July 23–28",
        name: {
          jp: "桐始結花 Kiri hajimete hana o musubu",
          en: "Paulownia trees produce seeds",
        },
        startDate: "July 23",
        endDate: "July 28",
      },
      {
        dates: "July 29–August 2",
        name: {
          jp: "土潤溽暑 Tsuchi uruōte mushi atsushi",
          en: "Earth is damp, air is humid",
        },
        startDate: "July 29",
        endDate: "August 2",
      },
      {
        dates: "August 3–7",
        name: {
          jp: "大雨時行 Taiu tokidoki furu",
          en: "Great rains sometimes fall",
        },
        startDate: "August 3",
        endDate: "August 7",
      },
    ],
    startDate: "July 23",
    endDate: "August 7",
  },
  {
    name: {
      jp: "立秋 Risshū",
      en: " (Beginning of autumn)",
    },
    seasons: [
      {
        dates: "August 8–12",
        name: {
          jp: "涼風至 Suzukaze itaru",
          en: "Cool winds blow",
        },
        startDate: "August 8",
        endDate: "August 12",
      },
      {
        dates: "August 13–17",
        name: {
          jp: "寒蝉鳴 Higurashi naku",
          en: "Evening cicadas sing",
        },
        startDate: "August 13",
        endDate: "August 17",
      },
      {
        dates: "August 18–22",
        name: {
          jp: "蒙霧升降 Fukaki kiri matō",
          en: "Thick fog descends",
        },
        startDate: "August 18",
        endDate: "August 22",
      },
    ],
    startDate: "August 8",
    endDate: "August 22",
  },
  {
    name: {
      jp: "処暑 Shosho",
      en: " (Manageable heat)",
    },
    seasons: [
      {
        dates: "August 23–27",
        name: {
          jp: "綿柎開 Wata no hana shibe hiraku",
          en: "Cotton flowers bloom",
        },
        startDate: "August 23",
        endDate: "August 27",
      },
      {
        dates: "August 28–September 1",
        name: {
          jp: "天地始粛 Tenchi hajimete samushi",
          en: "Heat starts to die down",
        },
        startDate: "August 28",
        endDate: "September 1",
      },
      {
        dates: "September 2–7",
        name: {
          jp: "禾乃登 Kokumono sunawachi minoru",
          en: "Rice ripens",
        },
        startDate: "September 2",
        endDate: "September 7",
      },
    ],
    startDate: "August 23",
    endDate: "September 7",
  },
  {
    name: {
      jp: "白露 Hakuro",
      en: " (White dew)",
    },
    seasons: [
      {
        dates: "September 8–12",
        name: {
          jp: "草露白 Kusa no tsuyu shiroshi",
          en: "Dew glistens white on grass",
        },
        startDate: "September 8",
        endDate: "September 12",
      },
      {
        dates: "September 13–17",
        name: {
          jp: "鶺鴒鳴 Sekirei naku",
          en: "Wagtails sing",
        },
        startDate: "September 13",
        endDate: "September 17",
      },
      {
        dates: "September 18–22",
        name: {
          jp: "玄鳥去 Tsubame saru",
          en: "Swallows leave",
        },
        startDate: "September 18",
        endDate: "September 22",
      },
    ],
    startDate: "September 8",
    endDate: "September 22",
  },
  {
    name: {
      jp: "秋分 Shūbun",
      en: " (Autumn equinox)",
    },
    seasons: [
      {
        dates: "September 23–27",
        name: {
          jp: "雷乃収声 Kaminari sunawachi koe o osamu",
          en: "Thunder ceases",
        },
        startDate: "September 23",
        endDate: "September 27",
      },
      {
        dates: "September 28–October 2",
        name: {
          jp: "蟄虫坏戸 Mushi kakurete to o fusagu",
          en: "Insects hole up underground",
        },
        startDate: "September 28",
        endDate: "October 2",
      },
      {
        dates: "October 3–7",
        name: {
          jp: "水始涸 Mizu hajimete karuru",
          en: "Farmers drain fields",
        },
        startDate: "October 3",
        endDate: "October 7",
      },
    ],
    startDate: "September 23",
    endDate: "October 7",
  },
  {
    name: {
      jp: "寒露 Kanro",
      en: " (Cold dew)",
    },
    seasons: [
      {
        dates: "October 8–12",
        name: {
          jp: "鴻雁来 Kōgan kitaru",
          en: "Wild geese return",
        },
        startDate: "October 8",
        endDate: "October 12",
      },
      {
        dates: "October 13–17",
        name: {
          jp: "菊花開 Kiku no hana hiraku",
          en: "Chrysanthemums bloom",
        },
        startDate: "October 13",
        endDate: "October 17",
      },
      {
        dates: "October 18–22",
        name: {
          jp: "蟋蟀在戸 Kirigirisu to ni ari",
          en: "Crickets chirp around the door",
        },
        startDate: "October 18",
        endDate: "October 22",
      },
    ],
    startDate: "October 8",
    endDate: "October 22",
  },
  {
    name: {
      jp: "霜降 Sōkō",
      en: " (Frost falls)",
    },
    seasons: [
      {
        dates: "October 23–27",
        name: {
          jp: "霜始降 Shimo hajimete furu",
          en: "First frost",
        },
        startDate: "October 23",
        endDate: "October 27",
      },
      {
        dates: "October 28–November 1",
        name: {
          jp: "霎時施 Kosame tokidoki furu",
          en: "Light rains sometimes fall",
        },
        startDate: "October 28",
        endDate: "November 1",
      },
      {
        dates: "November 2–6",
        name: {
          jp: "楓蔦黄 Momiji tsuta kibamu",
          en: "Maple leaves and ivy turn yellow",
        },
        startDate: "November 2",
        endDate: "November 6",
      },
    ],
    startDate: "October 23",
    endDate: "November 6",
  },
  {
    name: {
      jp: "立冬 Rittō",
      en: " (Beginning of winter)",
    },
    seasons: [
      {
        dates: "November 7–11",
        name: {
          jp: "山茶始開 Tsubaki hajimete hiraku",
          en: "Camellias bloom",
        },
        startDate: "November 7",
        endDate: "November 11",
      },
      {
        dates: "November 12–16",
        name: {
          jp: "地始凍 Chi hajimete kōru",
          en: "Land starts to freeze",
        },
        startDate: "November 12",
        endDate: "November 16",
      },
      {
        dates: "November 17–21",
        name: {
          jp: "金盞香 Kinsenka saku",
          en: "Daffodils bloom",
        },
        startDate: "November 17",
        endDate: "November 21",
      },
    ],
    startDate: "November 7",
    endDate: "November 21",
  },
  {
    name: {
      jp: "小雪 Shōsetsu",
      en: " (Lesser snow)",
    },
    seasons: [
      {
        dates: "November 22–26",
        name: {
          jp: "虹蔵不見 Niji kakurete miezu",
          en: "Rainbows hide",
        },
        startDate: "November 22",
        endDate: "November 26",
      },
      {
        dates: "November 27–December 1",
        name: {
          jp: "朔風払葉 Kitakaze konoha o harau",
          en: "North wind blows the leaves from the trees",
        },
        startDate: "November 27",
        endDate: "December 1",
      },
      {
        dates: "December 2–6",
        name: {
          jp: "橘始黄 Tachibana hajimete kibamu",
          en: "Tachibana citrus tree leaves start to turn yellow",
        },
        startDate: "December 2",
        endDate: "December 6",
      },
    ],
    startDate: "November 22",
    endDate: "December 6",
  },
  {
    name: {
      jp: "大雪 Taisetsu",
      en: " (Greater snow)",
    },
    seasons: [
      {
        dates: "December 7–11",
        name: {
          jp: "閉塞成冬 Sora samuku fuyu to naru",
          en: "Cold sets in, winter begins",
        },
        startDate: "December 7",
        endDate: "December 11",
      },
      {
        dates: "December 12–16",
        name: {
          jp: "熊蟄穴 Kuma ana ni komoru",
          en: "Bears start hibernating in their dens",
        },
        startDate: "December 12",
        endDate: "December 16",
      },
      {
        dates: "December 17–21",
        name: {
          jp: "鱖魚群 Sake no uo muragaru",
          en: "Salmon gather and swim upstream",
        },
        startDate: "December 17",
        endDate: "December 21",
      },
    ],
    startDate: "December 7",
    endDate: "December 21",
  },
  {
    name: {
      jp: "冬至 Tōji",
      en: " (Winter solstice)",
    },
    seasons: [
      {
        dates: "December 22–26",
        name: {
          jp: "乃東生 Natsukarekusa shōzu",
          en: "Self-heal sprouts",
        },
        startDate: "December 22",
        endDate: "December 26",
      },
      {
        dates: "December 27–31",
        name: {
          jp: "麋角解 Sawashika no tsuno otsuru",
          en: "Deer shed antlers",
        },
        startDate: "December 27",
        endDate: "December 31",
      },
      {
        dates: "January 1–4",
        name: {
          jp: "雪下出麦 Yuki watarite mugi nobiru",
          en: "Wheat sprouts under snow",
        },
        startDate: "January 1",
        endDate: "January 4",
      },
    ],
    startDate: "December 22",
    endDate: "January 4",
  },
  {
    name: {
      jp: "小寒 Shōkan",
      en: " (Lesser cold)",
    },
    seasons: [
      {
        dates: "January 5–9",
        name: {
          jp: "芹乃栄 Seri sunawachi sakau",
          en: "Parsley flourishes",
        },
        startDate: "January 5",
        endDate: "January 9",
      },
      {
        dates: "January 10–14",
        name: {
          jp: "水泉動 Shimizu atataka o fukumu",
          en: "Springs thaw",
        },
        startDate: "January 10",
        endDate: "January 14",
      },
      {
        dates: "January 15–19",
        name: {
          jp: "雉始雊 Kiji hajimete naku",
          en: "Pheasants start to call",
        },
        startDate: "January 15",
        endDate: "January 19",
      },
    ],
    startDate: "January 5",
    endDate: "January 19",
  },
  {
    name: {
      jp: "大寒 Daikan",
      en: " (Greater cold)",
    },
    seasons: [
      {
        dates: "January 20–24",
        name: {
          jp: "款冬華 Fuki no hana saku",
          en: "Butterburs bud",
        },
        startDate: "January 20",
        endDate: "January 24",
      },
      {
        dates: "January 25–29",
        name: {
          jp: "水沢腹堅 Sawamizu kōri tsumeru",
          en: "Ice thickens on streams",
        },
        startDate: "January 25",
        endDate: "January 29",
      },
      {
        dates: "January 30–February 3",
        name: {
          jp: "鶏始乳 Niwatori hajimete toya ni tsuku",
          en: "Hens start laying eggs",
        },
        startDate: "January 30",
        endDate: "February 3",
      },
    ],
    startDate: "January 20",
    endDate: "February 3",
  },
];

export default seasons;
