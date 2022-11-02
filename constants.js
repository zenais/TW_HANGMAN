const HANGMAN_PICS = [
  "+---+\n" +
    "|   |\n" +
    "    |\n" +
    "    |\n" +
    "    |\n" +
    "    |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    "      |\n" +
    "      |\n" +
    "      |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    "  |   |\n" +
    "      |\n" +
    "      |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|   |\n" +
    "      |\n" +
    "      |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    "      |\n" +
    "      |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    " /    |\n" +
    "      |\n" +
    "=========",
  "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    " / \\  |\n" +
    "      |\n" +
    "=========",
];
const HAPPY_HANGMAN_PIC = 
    "  +---+\n" +
    "      |\n" +
    "      |\n" +
    " \\O/  |\n" +
    "  |   |\n" +
    " / \\  |\n" +
    "=========";

const INTRO_SCREEN = 
"\tW)      ww         l)L                                          t)                     \n"+
"\tW)      ww          l)                                        t)tTTT                   \n"+
"\tW)  ww  ww e)EEEEE  l)   c)CCCC  o)OOO   m)MM MMM  e)EEEEE      t)    o)OOO            \n"+
"\tW)  ww  ww e)EEEE   l)  c)      o)   OO m)  MM  MM e)EEEE       t)   o)   OO           \n"+
"\tW)  ww  ww e)       l)  c)      o)   OO m)  MM  MM e)           t)   o)   OO           \n"+
"\t W)ww www   e)EEEE l)LL  c)CCCC  o)OOO  m)      MM  e)EEEE      t)T   o)OOO            \n"+
"\t                                                                                       \n"+
"                                                                                       \n"+
"H)    hh   A)aa   N)n   nn   G)gggg  M)mm mmm    A)aa   N)n   nn               1)!       0))))  \n"+
"H)    hh  A)  aa  N)nn  nn  G)      M)  mm  mm  A)  aa  N)nn  nn              1)!!      0)  ))) \n"+
"H)hhhhhh A)    aa N) nn nn G)  ggg  M)  mm  mm A)    aa N) nn nn    v)    VV    1)      0) ) )) \n"+
"H)    hh A)aaaaaa N)  nnnn G)    gg M)  mm  mm A)aaaaaa N)  nnnn     v)  VV     1)      0) ) )) \n"+
"H)    hh A)    aa N)   nnn  G)   gg M)      mm A)    aa N)   nnn      v)VV      1)   ** 0))  )) \n"+
"H)    hh A)    aa N)    nn   G)ggg  M)      mm A)    aa N)    nn       v)    1)!!!!! ##  0))))\n";

const WIN_SCREEN = 
"Y)    yy  O)oooo  U)    uu    W)      ww I)iiii N)n   nn     !)   !)   !)  \n"+
" Y)  yy  O)    oo U)    uu    W)      ww   I)   N)nn  nn    !)11 !)11 !)11 \n"+
"  Y)yy   O)    oo U)    uu    W)  ww  ww   I)   N) nn nn    !)11 !)11 !)11 \n"+
"   Y)    O)    oo U)    uu    W)  ww  ww   I)   N)  nnnn     !)   !)   !)  \n"+
"   Y)    O)    oo U)    uu    W)  ww  ww   I)   N)   nnn                   \n"+
"   Y)     O)oooo   U)uuuu      W)ww www  I)iiii N)    nn     !)   !)   !)  \n\n\n\n";

const LOSE_SCREEN =
"Y)    yy  O)oooo  U)    uu    L)        O)oooo   S)ssss  E)eeeeee     !)   !)   !)  \n"+
" Y)  yy  O)    oo U)    uu    L)       O)    oo S)    ss E)          !)11 !)11 !)11 \n"+
"  Y)yy   O)    oo U)    uu    L)       O)    oo  S)ss    E)eeeee     !)11 !)11 !)11 \n"+
"   Y)    O)    oo U)    uu    L)       O)    oo      S)  E)           !)   !)   !)  \n"+
"   Y)    O)    oo U)    uu    L)       O)    oo S)    ss E)                         \n"+
"   Y)     O)oooo   U)uuuu     L)llllll  O)oooo   S)ssss  E)eeeeee     !)   !)   !) \n\n\n\n";

// TODO: Fill this list with values about a certain topic
// you are passionate about: e.g. famous scientists, chess players, ...
const WORDS_TO_GUESS = [
"Allentsteig",
"Altheim",
"Althofen",
"Amstetten",
"Ansfelden",
"Attnang-Puchheim",
"Bad Aussee",
"Bad Hall",
"Bad Ischl",
"Bad Leonfelden",
"Bad Radkersburg",
"Bad St. Leonhard im Lavanttal",
"Bad Voeslau",
"Baden",
"Baernbach",
"Berndorf",
"Bischofshofen",
"Bleiburg",
"Bludenz",
"Braunau am Inn",
"Bregenz",
"Bruck an der Leitha",
"Bruck an der Mur",
"Deutsch-Wagram",
"Deutschlandsberg",
"Dornbirn",
"Drosendorf-Zissersdorf",
"Duernstein",
"Ebenfurth",
"Ebreichsdorf",
"Eferding",
"Eggenburg",
"Eisenerz",
"Eisenstadt",
"Enns",
"Fehring",
"Feldbach",
"Feldkirch",
"Feldkirchen in Kaernten",
"Ferlach",
"Fischamend",
"Frauenkirchen",
"Freistadt",
"Friedberg",
"Friesach",
"Frohnleiten",
"Fuerstenfeld",
"Gallneukirchen",
"Gaenserndorf",
"Geras",
"Gerasdorf bei Wien",
"Gfoehl",
"Gleisdorf",
"Gloggnitz",
"Gmuend",
"Gmuend in Kaernten",
"Gmunden",
"Graz",
"Grein",
"Grieskirchen",
"Groß-Enzersdorf",
"Groß Gerungs",
"Groß-Siegharts",
"Guessing",
"Haag",
"Hainburg an der Donau",
"Hainfeld",
"Hall in Tirol",
"Hallein",
"Hardegg",
"Hartberg",
"Heidenreichstein",
"Hermagor-Pressegger See",
"Herzogenburg",
"Hohenems",
"Hollabrunn",
"Horn",
"Imst",
"Innsbruck",
"Jennersdorf",
"Judenburg",
"Kapfenberg",
"Kindberg",
"Kirchdorf an der Krems",
"Kirchschlag in der Buckligen Welt",
"Kitzbuehel",
"Klagenfurt am Woerthersee",
"Klosterneuburg",
"Knittelfeld",
"Koeflach",
"Korneuburg",
"Krems an der Donau",
"Kufstein",
"Laa an der Thaya",
"Laakirchen",
"Landeck",
"Langenlois",
"Leibnitz",
"Leoben",
"Leonding",
"Lienz",
"Liezen",
"Lilienfeld",
"Linz",
"Litschau",
"Maissau",
"Mank",
"Mannersdorf am Leithagebirge",
"Marchegg",
"Marchtrenk",
"Mariazell",
"Mattersburg",
"Mattighofen",
"Mautern an der Donau",
"Melk",
"Mittersill",
"Mistelbach",
"Moedling",
"Murau",
"Mureck",
"Muerzzuschlag",
"Neufeld an der Leitha",
"Neulengbach",
"Neumarkt am Wallersee",
"Neunkirchen",
"Neusiedl am See",
"Oberndorf bei Salzburg",
"Oberpullendorf",
"Oberwart",
"Oberwoelz",
"Perg",
"Peuerbach",
"Pinkafeld",
"Poechlarn",
"Poysdorf",
"Pregarten",
"Pressbaum",
"Pulkau",
"Purbach am Neusiedler See",
"Purkersdorf",
"Raabs an der Thaya",
"Radenthein",
"Radstadt",
"Rattenberg",
"Retz",
"Ried im Innkreis",
"Rohrbach-Berg",
"Rottenmann",
"Rust",
"Saalfelden am Steinernen Meer",
"Salzburg",
"Sankt Andrae",
"St. Johann im Pongau",
"St. Poelten",
"St. Valentin",
"Sankt Veit an der Glan",
"Schaerding",
"Scheibbs",
"Schladming",
"Schrattenthal",
"Schrems",
"Schwanenstadt",
"Schwaz",
"Schwechat",
"Seekirchen am Wallersee",
"Spielberg",
"Spittal an der Drau",
"Stadl-Paura",
"Stadtschlaining",
"Steyr",
"Steyregg",
"Stockerau",
"Strassburg",
"Ternitz",
"Traiskirchen",
"Traismauer",
"Traun",
"Trieben",
"Trofaiach",
"Tulln an der Donau",
"Villach",
"Vils",
"Voecklabruck",
"Voitsberg",
"Voelkermarkt",
"Waidhofen an der Thaya",
"Waidhofen an der Ybbs",
"Weitra",
"Weiz",
"Wels",
"Wien",
"Wiener Neustadt",
"Wieselburg",
"Wilhelmsburg",
"Wolfsberg",
"Wolkersdorf im Weinviertel",
"Woergl",
"Ybbs an der Donau",
"Zell am See",
"Zeltweg",
"Zistersdorf",
"Zwettl-Niederoesterreich"
];

module.exports = {
  HANGMAN_PICS: HANGMAN_PICS,
  WORDS_TO_GUESS: WORDS_TO_GUESS,
  HAPPY_HANGMAN_PIC: HAPPY_HANGMAN_PIC,
  WIN_SCREEN: WIN_SCREEN,
  LOSE_SCREEN: LOSE_SCREEN,
  INTRO_SCREEN: INTRO_SCREEN
};
