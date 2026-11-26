export type KiatCategoryId =
  | 'firdaus'
  | 'neraka'
  | 'kubur'
  | 'tanpa-hisab'
  | 'husnul-khatimah';

export interface KiatPractice {
  id: string;
  titleId: string;
  titleEn: string;
  summaryId: string;
  summaryEn: string;
  arabicText?: string;
  latinText?: string;
  dalilSource: string;
  dalilStatus: string;
  dalilTextId: string;
  dalilTextEn: string;
  tafsirId: string;
  tafsirEn: string;
}

export interface KiatCategory {
  id: KiatCategoryId;
  labelId: string;
  labelEn: string;
  subtitleId: string;
  subtitleEn: string;
  practices: KiatPractice[];
}

export const KIAT_CATEGORIES: KiatCategory[] = [
  {
    id: 'firdaus',
    labelId: 'Surga Firdaus',
    labelEn: 'Paradise Al-Firdaus',
    subtitleId:
      'Amalan-amalan mulia yang mengantarkan hamba meraih derajat tertinggi di Surga Firdaus.',
    subtitleEn:
      'Noble deeds that elevate a servant to the highest rank of Paradise, Al-Firdaus.',
    practices: [
      {
        id: 'firdaus-1',
        titleId: 'Khusyu’ dalam Sholat & Menjaganya Tepat Waktu',
        titleEn: 'Humility (Khushu) in Prayer & Guarding Its Times',
        summaryId:
          'Allah mengawali sifat pewaris Surga Firdaus dengan orang-orang yang khusyu’ dalam sholatnya dan memelihara waktu-waktu sholat.',
        summaryEn:
          'Allah opens the traits of the inheritors of Al-Firdaus with believers who have khushu in prayer and strictly guard all prayers.',
        arabicText:
          'قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ ۝ وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ ۝ وَالَّذِينَ هُمْ لِلزَّكَاةِ فَاعِلُونَ ۝ وَالَّذِينَ هُمْ لِفُرُوجِهِمْ حَافِظُونَ ۝ إِلَّا عَلَىٰ أَزْوَاجِهِمْ أَوْ مَا مَلَكَتْ أَيْمَانُهُمْ فَإِنَّهُمْ غَيْرُ مَلُومِينَ ۝ فَمَنِ ابْتَغَىٰ وَرَاءَ ذَٰلِكَ فَأُولَٰئِكَ هُمُ الْعَادُونَ ۝ وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ ۝ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ ۝ أُولَٰئِكَ هُمُ الْوَارِثُونَ ۝ الَّذِينَ يَرِثُونَ الْفِرْدَوْسَ هُمْ فِيهَا خَالِدُونَ',
        latinText:
          "Qad aflaḥal-mu’minūn. Allażīna hum fī ṣalātihim khāsyi‘ūn. Wallażīna hum ‘anil-laghwi mu‘riḍūn. Wallażīna hum liz-zakāti fā‘ilūn. Wallażīna hum lifurūjihim ḥāfiẓūn. Illā ‘alā azwājihim au mā malakat aimānuhum fa innahum ghairu malūmīn. Famanibtaghā warā’a żālika fa ulā’ika humul-‘ādūn. Wallażīna hum li’amānātihim wa ‘ahdihim rā‘ūn. Wallażīna hum ‘alā ṣalawātihim yuḥāfiẓūn. Ulā’ika humul-wāriṡūn. Allażīna yariṡūnal-firdausa hum fīhā khālidūn.",
        dalilSource: 'QS. Al-Mu’minun: 1–11',
        dalilStatus: 'Al-Quran Al-Karim',
        dalilTextId:
          '“Sungguh telah beruntung orang-orang yang beriman; yaitu orang-orang yang khusyu’ di dalam sholat mereka; orang-orang yang berpaling dari perbuatan dan perkataan yang sia-sia; orang-orang yang menunaikan zakat; orang-orang yang menjaga kemaluan mereka kecuali terhadap pasangan halal atau hamba sahaya yang mereka miliki maka tiada celaan atas mereka, sedangkan siapa yang mencari selain itu maka merekalah orang-orang yang melampaui batas; orang-orang yang memelihara amanah dan janji mereka; serta orang-orang yang senantiasa menjaga sholat-sholat mereka tepat waktu. Mereka itulah para pewaris sejati, yang akan mewarisi Surga Firdaus dan mereka kekal di dalamnya.” (QS. Al-Mu’minun: 1–11)',
        dalilTextEn:
          '“Successful indeed are the believers: those who humble themselves in their prayers; who turn away from all idle talk; who faithfully pay zakat; who guard their chastity except with their spouses or lawful dependents for whom they incur no blame, whereas whoever seeks beyond that are transgressors; who uphold their trusts and covenants; and who strictly safeguard their five prayers. Those are the true inheritors who will inherit Paradise Al-Firdaus and abide therein forever.” (Quran 23:1–11)',
        tafsirId:
          'Menurut Ibnu Katsir dalam Tafsir Al-Qur’anul ‘Azhim, sifat pewaris Firdaus meliputi: sholat yang khusyu’, menjauhi perkataan sia-sia, menunaikan zakat, menjaga kemaluan, menepati amanah serta janji, dan memelihara sholat lima waktu.',
        tafsirEn:
          'Ibn Kathir notes that the inheritors of Al-Firdaus unite six pillars: khushu in prayer, turning away from vain talk, paying zakat, guarding chastity, fulfilling trusts and covenants, and preserving every obligatory prayer.',
      },
      {
        id: 'firdaus-2',
        titleId: 'Berdoa Meminta Surga Firdaus & Beriman Penuh kepada Allah',
        titleEn: 'Supplicating Directly for Al-Firdaus with Firm Faith',
        summaryId:
          'Rasulullah ﷺ memerintahkan umatnya apabila memohon surga kepada Allah agar meminta langsung Surga Firdaus yang paling tinggi.',
        summaryEn:
          'The Prophet ﷺ instructed believers that whenever they ask Allah for Paradise, they should ask specifically for Al-Firdaus.',
        arabicText:
          'فَإِذَا سَأَلْتُمُ اللَّهَ فَاسْأَلُوهُ الْفِرْدَوْسَ، فَإِنَّهُ أَوْسَطُ الْجَنَّةِ وَأَعْلَى الْجَنَّةِ، فَوْقَهُ عَرْشُ الرَّحْمَنِ',
        latinText:
          "Fa idza sa'altumullaha fas'aluhul-firdaus, fa innahu ausathul-jannati wa a'lal-jannati, fauqahu 'arsyur-Rahman.",
        dalilSource: 'HR. Al-Bukhari no. 2790 (dari Abu Hurairah)',
        dalilStatus: 'Shahih Muttafaq (Shahih Al-Bukhari)',
        dalilTextId:
          '“Apabila kalian memohon kepada Allah, maka mohonlah kepada-Nya Surga Firdaus, karena sesungguhnya ia adalah bagian surga yang paling tengah dan paling tinggi; di atasnya terdapat ‘Arsy Ar-Rahman dan darinya memancar sungai-sungai surga.” (HR. Al-Bukhari no. 2790)',
        dalilTextEn:
          '“When you ask Allah, ask Him for Al-Firdaus, for it is the middle and highest part of Paradise, above it is the Throne of the Most Merciful, and from it the rivers of Paradise gush forth.” (Al-Bukhari no. 2790)',
        tafsirId:
          'Hadis ini diriwayatkan oleh Al-Bukhari dari sahabat Abu Hurairah radhiyallahu ‘anhu tentang seratus derajat di surga; jarak antar dua derajat bagaikan jarak antara langit dan bumi. Ini mendidik mukmin agar memiliki cita-cita akhirat tertinggi disertai amal istiqamah.',
        tafsirEn:
          'Narrated by Al-Bukhari from Abu Hurairah concerning the hundred ranks of Paradise separated like heaven and earth, encouraging lofty spiritual aspiration paired with persistent righteousness.',
      },
      {
        id: 'firdaus-3',
        titleId: 'Beramal dengan Zikir Pagi Petang & Sholat Sunnah Rawatib',
        titleEn: 'Steadfastness in Morning & Evening Dhikr and Rawatib Prayers',
        summaryId:
          'Amalan yang dicintai Allah adalah amalan yang konsisten meskipun ringan, yang terus meninggikan derajat seorang hamba.',
        summaryEn:
          'The deeds most beloved to Allah are those done consistently, lifting a believer’s rank degree by degree.',
        dalilSource: 'HR. Imam Muslim no. 728 & Al-Bukhari no. 6464',
        dalilStatus: 'Shahih Muslim & Shahih Al-Bukhari',
        dalilTextId:
          '“Tidaklah seorang hamba muslim sholat karena Allah setiap hari dua belas rakaat sholat sunnah selain fardhu, melainkan Allah akan membangunkan baginya sebuah rumah di surga.” (HR. Imam Muslim no. 728 dari Ummu Habibah)',
        dalilTextEn:
          '“There is no Muslim servant who prays twelve voluntary rak’ahs for Allah each day apart from the obligatory prayers, except that Allah builds for him a house in Paradise.” (Muslim no. 728)',
        tafsirId:
          'Imam An-Nawawi menjelaskan 12 rakaat rawatib: 2 sebelum Subuh, 4 sebelum Zhuhur, 2 setelah Zhuhur, 2 setelah Maghrib, dan 2 setelah Isya. Ditambah ketekunan zikir pagi petang sebagai benteng hati.',
        tafsirEn:
          'Imam An-Nawawi details the twelve daily Sunnah rak’ahs alongside steadfast morning and evening dhikr as steady steps toward lofty ranks in Paradise.',
      },
    ],
  },
  {
    id: 'neraka',
    labelId: 'Selamat dari Neraka',
    labelEn: 'Saved from Hellfire',
    subtitleId:
      'Perisai syar’i yang melindungi seorang muslim dari sentuhan panasnya api neraka.',
    subtitleEn:
      'Authentic prophetic shields protecting a believer from the torment of the Fire.',
    practices: [
      {
        id: 'neraka-1',
        titleId: 'Memurnikan Kalimat Tauhid (La Ilaha Illallah)',
        titleEn: 'Pure Monotheism — Sincere Testimony of La Ilaha Illallah',
        summaryId:
          'Menjaga tauhid dan menjauhi segala bentuk syirik merupakan kunci utama diharamkannya seseorang atas neraka.',
        summaryEn:
          'Preserving pure monotheism and avoiding shirk is the foremost barrier against eternal Hellfire.',
        arabicText:
          'فَإِنَّ اللَّهَ قَدْ حَرَّمَ عَلَى النَّارِ مَنْ قَالَ لَا إِلَهَ إِلَّا اللَّهُ يَبْتَغِي بِذَلِكَ وَجْهَ اللَّهِ',
        latinText:
          "Fa innallaha qad harrama 'alan-nari man qala la ilaha illallahu yabtaghi bidzalika wajhallah.",
        dalilSource: 'HR. Al-Bukhari no. 425 & Imam Muslim no. 33 (dari Itban bin Malik)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          '“Sesungguhnya Allah mengharamkan neraka bagi orang yang mengucapkan La ilaha illallah dengan mengharapkan wajah Allah semata.” (HR. Al-Bukhari no. 425 & Imam Muslim no. 33)',
        dalilTextEn:
          '“Indeed Allah has forbidden the Fire for whoever says La ilaha illallah seeking thereby the Face of Allah.” (Al-Bukhari no. 425 & Muslim no. 33)',
        tafsirId:
          'Para ulama Salaf menegaskan kalimat La ilaha illallah bukan sekadar ucapan lisan, tetapi mengandung ilmu, yakin, ikhlas, jujur, cinta, tunduk, dan menerima konsekuensi penghambaan hanya kepada Allah.',
        tafsirEn:
          'Scholars of Ahlus Sunnah emphasize that this declaration requires sincerity, certainty, love, submission, and avoiding all forms of shirk.',
      },
      {
        id: 'neraka-2',
        titleId: 'Bersedekah Walau dengan Separuh Kurma & Bertutur Baik',
        titleEn: 'Charity Even with Half a Date & Kind Speech',
        summaryId:
          'Sedekah yang ikhlas menjadi penghalang langsung antara seorang hamba dengan siksa neraka.',
        summaryEn:
          'Sincere charity acts as an immediate shield between a servant and the Fire.',
        arabicText:
          'اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ، فَمَنْ لَمْ يَجِدْ فَبِكَلِمَةٍ طَيِّبَةٍ',
        latinText:
          "Ittaqun-nara walau bisyiqqi tamrah, faman lam yajid fabikalimatin thayyibah.",
        dalilSource: 'HR. Al-Bukhari no. 1417 & Imam Muslim no. 1016 (dari ‘Adi bin Hatim)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          '“Lindungilah diri kalian dari api neraka walaupun hanya dengan menyedekahkan separuh butir kurma; barang siapa tidak mendapatkannya maka dengan ucapan yang baik.” (HR. Al-Bukhari no. 1417 & Imam Muslim no. 1016)',
        dalilTextEn:
          '“Protect yourselves from the Fire even with half a date; and whoever cannot find even that, then with a good word.” (Al-Bukhari no. 1417 & Muslim no. 1016)',
        tafsirId:
          'Ibnu Hajar Al-Asqalani dalam Fathul Bari menerangkan bahwa tidak ada amal kebaikan yang boleh dianggap remeh selama dilandasi keikhlasan, bahkan sedekah kecil maupun tutur kata lembut kepada sesama muslim.',
        tafsirEn:
          'Ibn Hajar notes in Fathul Bari that no sincere act of goodness should ever be belittled, whether small charity or gentle, truthful speech.',
      },
      {
        id: 'neraka-3',
        titleId: 'Menangis karena Takut kepada Allah & Menjaga Sholat Subuh-Ashar',
        titleEn: 'Tears out of Reverence for Allah & Guarding Fajr and Asr',
        summaryId:
          'Dua mata yang tidak akan disentuh api neraka dan janji perlindungan bagi penjaga dua sholat dingin (Al-Bardain).',
        summaryEn:
          'Eyes untouched by the Fire and the prophetic promise for guarding Fajr and Asr prayers.',
        dalilSource: 'HR. At-Tirmidzi no. 1639 (Hasan) & Imam Muslim no. 634',
        dalilStatus: 'Shahih / Hasan Shahih',
        dalilTextId:
          '“Dua mata yang tidak akan disentuh api neraka: mata yang menangis karena takut kepada Allah, dan mata yang berjaga semalaman di jalan Allah.” (HR. At-Tirmidzi no. 1639 · Disahihkan Syaikh Al-Albani). Dan sabda Nabi ﷺ: “Tidak akan masuk neraka orang yang menjaga sholat sebelum terbit matahari (Subuh) dan sebelum terbenamnya (Ashar).” (HR. Imam Muslim no. 634)',
        dalilTextEn:
          '“Two eyes will never be touched by the Fire: an eye that weeps out of fear of Allah, and an eye that stays awake guarding in the path of Allah.” (At-Tirmidhi no. 1639). And: “None will enter the Fire who prays before sunrise (Fajr) and before sunset (Asr).” (Muslim no. 634)',
        tafsirId:
          'Menangis dalam kesendirian saat mengingat keagungan dan hisab Allah menunjukkan hidupnya iman, serta menjaga sholat Subuh dan Ashar tepat waktu melatih ketaatan di saat jiwa sedang lelah atau terlelap.',
        tafsirEn:
          'Weeping in private humility and diligently praying Fajr and Asr cultivate living faith and steadfast obedience.',
      },
    ],
  },
  {
    id: 'kubur',
    labelId: 'Terhindar Siksa Kubur',
    labelEn: 'Protected from Grave Torment',
    subtitleId:
      'Amalan pelindung agar alam barzakh menjadi taman surga yang tenang hingga hari kebangkitan.',
    subtitleEn:
      'Prophetic safeguards so the grave becomes a peaceful garden rather than a pit of punishment.',
    practices: [
      {
        id: 'kubur-1',
        titleId: 'Berlindung dari Azab Kubur pada Tasyahhud Akhir Sebelum Salam',
        titleEn: 'Seeking Refuge from Grave Torment in Final Tashahhud',
        summaryId:
          'Rasulullah ﷺ mewasiatkan doa empat perlindungan di penghujung setiap sholat sebelum salam.',
        summaryEn:
          'The Prophet ﷺ taught a specific fourfold refuge supplication before ending every prayer.',
        arabicText:
          'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
        latinText:
          "Allahumma inni a'udzu bika min 'adzabi jahannam, wa min 'adzabil-qabr, wa min fitnatil-mahya wal-mamat, wa min syarri fitnatil-masihid-dajjal.",
        dalilSource: 'HR. Imam Muslim no. 588 & Al-Bukhari no. 1377 (dari Abu Hurairah)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          '“Apabila salah seorang di antara kalian selesai dari tasyahhud akhir, hendaklah ia memohon perlindungan kepada Allah dari empat perkara: Ya Allah, aku berlindung kepada-Mu dari azab Jahannam, dari azab kubur, dari fitnah kehidupan dan kematian, serta dari keburukan fitnah Al-Masih Ad-Dajjal.” (HR. Imam Muslim no. 588)',
        dalilTextEn:
          '“When one of you finishes the final tashahhud, let him seek refuge in Allah from four things: the torment of Hell, the torment of the grave, the trials of life and death, and the evil trial of Al-Masih Ad-Dajjal.” (Muslim no. 588)',
        tafsirId:
          'Imam An-Nawawi dan Ibnu Hajar menyebutkan sebagian ulama salaf hingga menyuruh mengulang sholat apabila doa ini ditinggalkan, saking pentingnya perlindungan alam kubur.',
        tafsirEn:
          'Imam An-Nawawi highlights the immense emphasis placed on this supplication in every obligatory and voluntary prayer.',
      },
      {
        id: 'kubur-2',
        titleId: 'Membaca Surah Al-Mulk Setiap Malam',
        titleEn: 'Reciting Surah Al-Mulk Every Night',
        summaryId:
          'Surah ke-67 dalam Al-Quran yang menjadi pembela dan penahan azab kubur bagi pembacanya.',
        summaryEn:
          'Surah Al-Mulk (Tabarak) intercedes and defends its regular night reciter from the punishment of the grave.',
        dalilSource: 'HR. An-Nasa’i & At-Tirmidzi no. 2890 (dari Ibnu Mas’ud & Abu Hurairah)',
        dalilStatus: 'Hasan Shahih (Disahihkan Al-Hakim & Syaikh Al-Albani)',
        dalilTextId:
          '“Surah Tabarak (Al-Mulk) adalah Al-Mani’ah (penghalang) dari azab kubur.” (HR. Al-Hakim & An-Nasa’i dari Ibnu Mas’ud; dalam riwayat At-Tirmidzi no. 2890 disebutkan 30 ayat yang memberi syafaat hingga diampuni dosanya).',
        dalilTextEn:
          '“Surah Al-Mulk is the protector against the punishment of the grave.” (Al-Hakim & An-Nasa’i from Ibn Mas’ud; At-Tirmidhi no. 2890 notes its thirty verses intercede until forgiveness is granted).',
        tafsirId:
          'Para ulama menganjurkan membaca Surah Al-Mulk secara rutin setiap malam sebelum tidur sambil merenungi kekuasaan Allah atas hidup, mati, dan penciptaan tujuh langit.',
        tafsirEn:
          'Scholars encourage nightly recitation of Al-Mulk with reflection upon Allah’s sovereignty over life, death, and creation.',
      },
      {
        id: 'kubur-3',
        titleId: 'Menjaga Bersuci (Istibra’) dan Menjauhi Namimah (Adu Domba)',
        titleEn: 'Careful Purification After Relieving Oneself & Avoiding Tale-Bearing',
        summaryId:
          'Dua sebab terbanyak azab kubur yang diperingatkan Nabi ﷺ adalah kelalaian bersuci dari kencing dan menyebarkan namimah.',
        summaryEn:
          'Two frequent causes of grave punishment warned against by the Prophet ﷺ are carelessness with urine impurity and spreading gossip/malicious tale-bearing.',
        dalilSource: 'HR. Al-Bukhari no. 216 & Imam Muslim no. 292 (dari Ibnu Abbas)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          'Nabi ﷺ melewati dua kuburan lalu bersabda: “Keduanya sedang disiksa, dan tidaklah keduanya disiksa karena perkara besar (menurut anggapan manusia). Adapun salah satunya tidak membersihkan diri dari air kencingnya, dan yang lain berjalan kesana-kemari menyebarkan namimah (adu domba).” (HR. Al-Bukhari no. 216 & Imam Muslim no. 292)',
        dalilTextEn:
          'Passing two graves, the Prophet ﷺ said: “Both are being punished, yet not for something difficult to avoid: one did not guard himself from his urine, and the other walked about spreading malicious tale-bearing (namimah).” (Al-Bukhari no. 216 & Muslim no. 292)',
        tafsirId:
          'Hadis shahih ini mengajarkan ketelitian thaharah sebagai syarat sah sholat serta kehati-hatian menjaga lisan dan media sosial dari ghibah maupun adu domba.',
        tafsirEn:
          'This narration teaches meticulous attention to ritual purity and strict restraint of the tongue from backbiting and sowing discord.',
      },
    ],
  },
  {
    id: 'tanpa-hisab',
    labelId: 'Surga Tanpa Hisab',
    labelEn: 'Paradise Without Reckoning',
    subtitleId:
      'Sifat agung 70.000 umat Nabi ﷺ beserta kelipatannya yang masuk surga tanpa hisab dan tanpa azab.',
    subtitleEn:
      'The noble traits of those granted Allah’s mercy to enter Paradise without reckoning or punishment.',
    practices: [
      {
        id: 'hisab-1',
        titleId: 'Menyempurnakan Tawakkal Hanya Kepada Allah',
        titleEn: 'Complete Trust & Reliance (Tawakkul) Solely Upon Allah',
        summaryId:
          'Ciri inti golongan yang masuk surga tanpa hisab adalah ketergantungan hati yang mutlak kepada Allah semata.',
        summaryEn:
          'The defining inner state of those entering Paradise without reckoning is complete reliance upon their Lord alone.',
        arabicText:
          'هُمُ الَّذِينَ لَا يَسْتَرْقُونَ، وَلَا يَتَطَيَّرُونَ، وَلَا يَكْتَوُونَ، وَعَلَى رَبِّهِمْ يَتَوَكَّلُونَ',
        latinText:
          "Humul-ladzina la yastarqun, wa la yatathayyarun, wa la yaktawun, wa 'ala rabbihim yatawakkalun.",
        dalilSource: 'HR. Al-Bukhari no. 5752 & Imam Muslim no. 220 (dari Ibnu Abbas)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          'Rasulullah ﷺ bersabda tentang tujuh puluh ribu umat beliau yang masuk surga tanpa hisab dan tanpa azab: “Mereka adalah orang-orang yang tidak meminta diruqyah, tidak melakukan kay (pengobatan dengan besi panas), tidak bertathayyur (merasa sial dengan pertanda), dan hanya kepada Rabb mereka bertawakkal.” (HR. Al-Bukhari no. 5752 & Imam Muslim no. 220)',
        dalilTextEn:
          'Regarding the seventy thousand who enter Paradise without reckoning or punishment, the Prophet ﷺ said: “They are those who do not ask others for ruqyah, do not use cauterization (kay), do not believe in evil omens, and upon their Lord they rely completely.” (Al-Bukhari no. 5752 & Muslim no. 220)',
        tafsirId:
          'Imam Ibnu Hajar dan Syaikh Muhammad bin Abdul Wahhab menjelaskan maksud tidak meminta diruqyah adalah sempurnanya tawakkal dan meruqyah diri sendiri dengan Al-Quran serta zikir shahih, menjauhi segala tahayul/ramalan sial, dan menyerahkan kesembuhan mutlak kepada Allah.',
        tafsirEn:
          'Scholars clarify that this reflects perfected tawakkul: reciting authentic Quranic supplications oneself, rejecting all superstitions and omens, and placing ultimate dependence solely on Allah.',
      },
      {
        id: 'hisab-2',
        titleId: 'Bersabar Menahan Ujian & Mengakui Luasnya Rahmat Allah',
        titleEn: 'Patience in Trials & Seeking Allah’s Mercy Above Self-Reliance',
        summaryId:
          'Masuk surga bukan semata hitungan amal manusia, melainkan kemurahan rahmat Allah yang membalas iman dan sabar.',
        summaryEn:
          'Entering Paradise ultimately rests on Allah’s boundless mercy honoring sincere faith and patience.',
        dalilSource: 'HR. Al-Bukhari no. 5673 & Imam Muslim no. 2816 (dari Abu Hurairah)',
        dalilStatus: 'Shahih Muttafaq ‘Alaih',
        dalilTextId:
          '“Tidak ada seorang pun di antara kalian yang amalnya dapat memasukkannya ke surga.” Para sahabat bertanya, “Tidak juga engkau wahai Rasulullah?” Beliau menjawab, “Tidak juga aku, kecuali bila Allah melimpahkan rahmat dan karunia-Nya kepadaku.” (HR. Al-Bukhari no. 5673 & Imam Muslim no. 2816)',
        dalilTextEn:
          '“None of you will enter Paradise solely by his deeds.” They asked, “Not even you, O Messenger of Allah?” He replied, “Not even me, unless Allah covers me with His mercy and bounty.” (Al-Bukhari no. 5673 & Muslim no. 2816)',
        tafsirId:
          'Hadis ini meruntuhkan sifat ujub (bangga diri atas amal), sekaligus menumbuhkan harap (raja’) agar kita selalu memohon rahmat Allah melalui amal shalih yang ikhlas.',
        tafsirEn:
          'This narration extinguishes self-admiration over deeds while inspiring humble hope in Allah’s mercy through sincere worship.',
      },
    ],
  },
  {
    id: 'husnul-khatimah',
    labelId: 'Husnul Khatimah',
    labelEn: 'Husnul Khatimah',
    subtitleId:
      'Kiat penting agar akhir kehidupan ditutup dalam keimanan, ampunan, dan keridhaan Allah.',
    subtitleEn:
      'Essential prophetic keys to concluding life upon pure faith, forgiveness, and Allah’s pleasure.',
    practices: [
      {
        id: 'hk-1',
        titleId: 'Menjaga Amal Wajib Lalu Memperbanyak Amal Sunnah (Hadis Wali)',
        titleEn: 'Fulfilling Obligatory Duties Followed by Voluntary Worship',
        summaryId:
          'Cinta Allah diraih pertama kali dengan menegakkan kewajiban, lalu disempurnakan dengan ibadah sunnah secara kontinu.',
        summaryEn:
          'Allah’s love is earned foremost by fulfilling obligatory acts and then drawing nearer with voluntary devotion.',
        dalilSource: 'HR. Al-Bukhari no. 6502 (Hadis Qudsi dari Abu Hurairah)',
        dalilStatus: 'Shahih Al-Bukhari',
        dalilTextId:
          'Rasulullah ﷺ meriwayatkan firman Allah dalam Hadis Qudsi: “Siapa yang memusuhi wali-Ku maka Aku umumkan perang kepadanya. Tidaklah hamba-Ku mendekatkan diri kepada-Ku dengan suatu amalan yang lebih Aku cintai daripada perkara-perkara yang telah Aku wajibkan kepadanya; dan senantiasa hamba-Ku mendekatkan diri kepada-Ku dengan amalan-amalan sunnah hingga Aku mencintainya. Maka apabila Aku telah mencintainya, Aku menjadi pendengarannya yang dengannya ia mendengar, penglihatannya yang dengannya ia melihat, tangannya yang dengannya ia memegang, dan kakinya yang dengannya ia melangkah. Apabila ia memohon kepada-Ku niscaya Aku beri, dan apabila ia memohon perlindungan kepada-Ku niscaya Aku lindungi.” (HR. Al-Bukhari no. 6502)',
        dalilTextEn:
          'The Prophet ﷺ narrated that Allah declared: “Whoever shows hostility to a devoted friend of Mine, I declare war upon him. My servant draws near to Me with nothing more beloved to Me than the obligations I enjoined upon him, and my servant keeps drawing near to Me through voluntary acts until I love him. When I love him, I guide his hearing with which he listens, his sight with which he sees, his hand with which he strikes, and his foot with which he walks. Were he to ask of Me I would surely grant him, and were he to seek My refuge I would surely protect him.” (Al-Bukhari no. 6502)',
        tafsirId:
          'Ketika Allah mencintai seorang hamba, Allah bimbing pendengaran, penglihatan, langkah, dan akhir hayatnya di atas tauhid serta mengabulkan doanya.',
        tafsirEn:
          'When Allah loves a servant, He guides their senses, actions, and final moments upon faith.',
      },
      {
        id: 'hk-2',
        titleId: 'Memperbanyak Istighfar & Berbaik Sangka kepada Allah',
        titleEn: 'Abundant Istighfar & Good Expectation of Allah',
        summaryId:
          'Menjaga taubat setiap hari serta husnuzhan kepada rahmat dan ampunan Allah hingga akhir hayat.',
        summaryEn:
          'Maintaining daily repentance and trusting firmly in Allah’s forgiveness until the final breath.',
        dalilSource: 'HR. Imam Muslim no. 2877 (dari Jabir bin Abdullah)',
        dalilStatus: 'Shahih Muslim',
        dalilTextId:
          '“Janganlah salah seorang di antara kalian meninggal dunia melainkan ia dalam keadaan berbaik sangka kepada Allah ‘Azza wa Jalla.” (HR. Imam Muslim no. 2877)',
        dalilTextEn:
          '“Let none of you die except while having good expectation of Allah the Mighty and Majestic.” (Muslim no. 2877)',
        tafsirId:
          'Imam An-Nawawi menjelaskan di masa sehat kita menyeimbangkan rasa takut dan harap, sedangkan saat sakit atau menjelang wafat hendaklah menguatkan harap serta husnuzhan kepada ampunan Allah.',
        tafsirEn:
          'Imam An-Nawawi explains balancing fear and hope in times of health while strengthening hopeful trust in Allah’s mercy when facing illness or the end of life.',
      },
    ],
  },
];
