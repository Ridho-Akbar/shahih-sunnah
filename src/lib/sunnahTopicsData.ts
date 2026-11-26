export interface SunnahTopicEntry {
  id: string;
  order: number;
  categoryLabelId: string;
  categoryLabelEn: string;
  titleId: string;
  titleEn: string;
  arabicText?: string;
  latinText?: string;
  explanationId: string;
  explanationEn: string;
  dalilSource: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn?: string;
  tafsir: string;
  tafsirEn?: string;
}

// ==========================================
// 1. TATA CARA WUDHU SESUAI SUNNAH
// ==========================================
export const WUDHU_STEPS: SunnahTopicEntry[] = [
  {
    id: 'wudhu-1',
    order: 1,
    categoryLabelId: 'Langkah 1',
    categoryLabelEn: 'Step 1',
    titleId: 'Niat dalam Hati & Membaca Bismillah',
    titleEn: 'Intention in Heart & Saying Bismillah',
    arabicText: 'بِسْمِ اللّٰهِ',
    latinText: 'Bismillāh',
    explanationId:
      'Berniat di dalam hati untuk menghilangkan hadas dan bersuci karena Allah Taala (tanpa melafazkan niat dengan suara keras), lalu membaca "Bismillah" sebelum membasuh kedua telapak tangan.',
    explanationEn:
      'Hold the intention silently in the heart to purify oneself for Allah, then recite "Bismillah" before washing the hands.',
    dalilSource: 'Shahih Al-Bukhari no. 1 & Sunan Abu Dawud no. 101',
    dalilStatus: 'Shahih (Hasan-Shahih oleh Al-Albani)',
    dalilText:
      'Rasulullah ﷺ bersabda: "Setiap amal tergantung pada niatnya." (HR. Bukhari no. 1) dan sabdanya: "Tidak sempurna wudhu orang yang tidak menyebut nama Allah (mengucapkan Bismillah)." (HR. Abu Dawud no. 101, At-Tirmidzi no. 25).',
    dalilTextEn:
      'The Messenger of Allah ﷺ said: "Actions are judged by intentions." (Al-Bukhari no. 1) and: "There is no complete ablution for one who does not mention the name of Allah (Bismillah) over it." (Abu Dawud no. 101, At-Tirmidhi no. 25).',
    tafsir:
      'Para ulama seperti Imam Ahmad dan Ibnu Baz menganjurkan mengucapkan "Bismillah" secara wajib apabila ingat, dan cukup berniat di dalam hati karena niat adalah amalan hati.',
    tafsirEn:
      'Scholars such as Imam Ahmad and Shaykh Ibn Baz affirm that saying "Bismillah" is required when remembered, while intention resides silently in the heart without verbalizing formulas.',
  },
  {
    id: 'wudhu-2',
    order: 2,
    categoryLabelId: 'Langkah 2',
    categoryLabelEn: 'Step 2',
    titleId: 'Membasuh Kedua Telapak Tangan 3 Kali & Menyela Jari',
    titleEn: 'Wash Both Palms 3 Times & Interlace Fingers',
    explanationId:
      'Membasuh kedua telapak tangan hingga pergelangan sebanyak tiga kali, dimulai dari bagian kanan dan menyela-nyela jari agar air merata.',
    explanationEn:
      'Wash both hands up to the wrists three times, starting with the right hand and interlacing the fingers.',
    dalilSource: 'Shahih Al-Bukhari no. 159 & Shahih Muslim no. 226',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Utsman bin Affan radhiyallahu anhu meminta air wudhu lalu membasuh kedua telapak tangannya tiga kali, kemudian bersabda: "Aku melihat Rasulullah ﷺ berwudhu seperti wudhuku ini."',
    dalilTextEn:
      'Uthman ibn Affan (may Allah be pleased with him) called for ablution water, washed both hands three times, and then said: "I saw the Messenger of Allah ﷺ perform ablution just like this ablution of mine." (Al-Bukhari no. 159 & Muslim no. 226).',
    tafsir:
      'Membasuh telapak tangan di awal wudhu disunnahkan agar tangan bersih sebelum mengambil air untuk berkumur dan membasuh wajah, dan diwajibkan setelah bangun dari tidur malam (HR. Bukhari 162 & Muslim 278).',
    tafsirEn:
      'Washing the palms at the start ensures cleanliness before scooping water for the mouth and face, and is obligatory upon waking from night sleep before dipping hands into a vessel (Al-Bukhari 162 & Muslim 278).',
  },
  {
    id: 'wudhu-3',
    order: 3,
    categoryLabelId: 'Langkah 3',
    categoryLabelEn: 'Step 3',
    titleId: 'Berkumur (Madhmadhah) & Menghirup Air ke Hidung (Istinsyaq) 3 Kali',
    titleEn: 'Rinse Mouth & Sniff Water Into Nose 3 Times',
    explanationId:
      'Mengambil air dengan telapak tangan kanan dalam satu cidukan untuk berkumur sekaligus menghirup sebagian air ke hidung, lalu mengembuskannya (istintsar) dengan tangan kiri. Diulang tiga kali (tidak berlebihan saat berpuasa).',
    explanationEn:
      'Use the right palm to rinse the mouth and sniff water into the nostrils simultaneously, then blow it out gently using the left hand, repeated three times (avoid deep sniffing when fasting).',
    dalilSource: 'Shahih Al-Bukhari no. 191 & Shahih Muslim no. 235',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Dari Abdullah bin Zaid radhiyallahu anhu tentang sifat wudhu Nabi ﷺ: "Beliau berkumur dan menghirup air ke hidung dari satu telapak tangan; beliau melakukannya tiga kali."',
    dalilTextEn:
      'Abdullah ibn Zayd (may Allah be pleased with him) narrated regarding the ablution of the Prophet ﷺ: "He rinsed his mouth and sniffed water into his nose from a single scoop of one palm, doing this three times." (Al-Bukhari no. 191 & Muslim no. 235).',
    tafsir:
      'Rasulullah ﷺ bersabda kepada Laqith bin Shabirah: "Bersungguh-sungguhlah dalam istinsyaq kecuali jika engkau sedang berpuasa." (HR. Abu Dawud no. 142 · Shahih).',
    tafsirEn:
      'The Messenger of Allah ﷺ instructed Laqit ibn Sabirah: "Sniff water thoroughly into your nostrils unless you are fasting." (Abu Dawud no. 142 · Authentic).',
  },
  {
    id: 'wudhu-4',
    order: 4,
    categoryLabelId: 'Langkah 4',
    categoryLabelEn: 'Step 4',
    titleId: 'Membasuh Seluruh Wajah 3 Kali (Rukun Wudhu)',
    titleEn: 'Wash the Entire Face 3 Times (Pillar)',
    explanationId:
      'Membasuh seluruh wajah secara merata dari batas tumbuhnya rambut kepala di dahi hingga ke bawah dagu, dan dari telinga kanan hingga telinga kiri sebanyak tiga kali, serta menyela jenggot yang tebal.',
    explanationEn:
      'Wash the whole face evenly from the hairline at the forehead down to the chin and from ear to ear three times, combing wet fingers through a thick beard.',
    dalilSource: 'QS. Al-Ma’idah ayat 6 & Shahih Al-Bukhari no. 159',
    dalilStatus: 'Al-Quran & Hadis Shahih',
    dalilText:
      'Allah Taala berfirman secara lengkap mengenai tata cara bersuci: "Wahai orang-orang yang beriman, apabila kamu hendak mendirikan sholat, maka basuhlah wajahmu dan kedua tanganmu hingga kedua siku, usaplah kepalamu, serta basuhlah kedua kakimu hingga kedua mata kaki. Dan apabila kamu berjunub maka mandilah; dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan lalu kamu tidak memperoleh air, maka bertayamumlah dengan debu yang suci; usapkan ke wajahmu dan tanganmu darinya. Allah tidak hendak menyulitkan kamu, tetapi Dia hendak menyucikanmu dan menyempurnakan nikmat-Nya bagimu agar kamu bersyukur." (QS. Al-Ma’idah: 6).',
    dalilTextEn:
      'Allah the Exalted commands regarding purification: "O you who believe, when you rise for prayer, wash your faces and your forearms to the elbows, wipe over your heads, and wash your feet to the ankles. And if you are in major ritual impurity, then purify yourselves. And if you are ill or on a journey or come from relieving yourselves or have touched women and find no water, then seek clean earth and wipe over your faces and hands with it. Allah does not intend to make difficulty for you, but He intends to purify you and complete His favor upon you that you may be grateful." (Quran 5:6).',
    tafsir:
      'Membasuh wajah minimal satu kali adalah rukun wajib, sedangkan tiga kali adalah kesempurnaan sunnah dan tidak boleh lebih dari tiga kali (HR. Abu Dawud no. 135 · Hasan Shahih).',
    tafsirEn:
      'Washing the face at least once is an obligatory pillar, while washing three times is the complete Sunnah without exceeding three washes (Abu Dawud no. 135).',
  },
  {
    id: 'wudhu-5',
    order: 5,
    categoryLabelId: 'Langkah 5',
    categoryLabelEn: 'Step 5',
    titleId: 'Membasuh Kedua Tangan Hingga Siku 3 Kali (Rukun Wudhu)',
    titleEn: 'Wash Both Arms Including Elbows 3 Times (Pillar)',
    explanationId:
      'Membasuh tangan kanan dari ujung jari hingga melewati siku secara merata sebanyak tiga kali, kemudian melakukan hal yang sama pada tangan kiri tiga kali.',
    explanationEn:
      'Wash the right arm from fingertips up past the elbow evenly three times, followed by the left arm three times.',
    dalilSource: 'QS. Al-Ma’idah ayat 6 & Shahih Muslim no. 246',
    dalilStatus: 'Al-Quran & Hadis Shahih',
    dalilText:
      'Allah Taala berfirman dalam lanjutan perintah wudhu: "Wahai orang-orang yang beriman, apabila kamu hendak mendirikan sholat, maka basuhlah wajahmu dan kedua tanganmu hingga kedua siku, usaplah kepalamu, serta basuhlah kedua kakimu hingga kedua mata kaki." (QS. Al-Ma’idah: 6). Dan Abu Hurairah menyaksikan Nabi ﷺ membasuh tangan kanan dan kiri hingga melewati siku menuju lengan atas. (HR. Muslim no. 246).',
    dalilTextEn:
      'Allah commands in Surah Al-Ma’idah (5:6): "...wash your faces and your forearms up to the elbows, wipe your heads, and wash your feet up to the ankles." Abu Hurairah also observed the Prophet ﷺ washing his right and left arms well past the elbows onto the upper arms (Muslim no. 246).',
    tafsir:
      'Siku wajib ikut terbasuh agar yakin seluruh batas fardhu terpenuhi. Pastikan tidak ada penghalang kedap air di kuku atau kulit.',
    tafsirEn:
      'Both elbows must be thoroughly washed to guarantee the obligatory boundary is fulfilled, ensuring no waterproof barrier covers the nails or skin.',
  },
  {
    id: 'wudhu-6',
    order: 6,
    categoryLabelId: 'Langkah 6',
    categoryLabelEn: 'Step 6',
    titleId: 'Mengusap Kepala & Kedua Telinga 1 Kali (Rukun Wudhu)',
    titleEn: 'Wipe the Head & Both Ears Once (Pillar)',
    explanationId:
      'Mengusap seluruh kepala dengan kedua telapak tangan yang basah mulai dari bagian depan rambut ditarik ke belakang hingga tengkuk, lalu dikembalikan lagi ke depan (1 kali), langsung dilanjutkan mengusap bagian dalam telinga dengan telunjuk dan bagian luar dengan ibu jari menggunakan sisa air yang sama.',
    explanationEn:
      'Wipe the entire head with wet palms from the front hairline to the nape of the neck and back to the front once, then wipe inside the ears with index fingers and behind them with thumbs using the remaining moisture.',
    dalilSource: 'Shahih Al-Bukhari no. 185 & Shahih Muslim no. 235; Sunan Abu Dawud no. 135',
    dalilStatus: "Muttafaqun 'Alaih & Shahih",
    dalilText:
      'Abdullah bin Zaid menceritakan sifat usapan kepala Nabi ﷺ: "Beliau mengusap kepalanya dengan kedua tangannya maju dan mundur; beliau memulai dari bagian depan kepalanya lalu menjalankannya ke tengkuk, kemudian mengembalikannya ke tempat semula."',
    dalilTextEn:
      'Abdullah ibn Zayd described how the Prophet ﷺ wiped his head: "He wiped his head with both hands moving back and forth, starting from the front of his head, moving to the nape of his neck, and returning them back to where he began." (Al-Bukhari no. 185 & Muslim no. 235).',
    tafsir:
      'Kepala dan telinga cukup diusap satu kali dengan air baru (bukan sisa basuhan lengan) dan tidak dianjurkan mengulang usapan kepala tiga kali dalam riwayat yang paling kuat.',
    tafsirEn:
      'The head and ears are wiped once with fresh wetness (not leftover water from the arms), as authentic narrations indicate wiping the head a single time.',
  },
  {
    id: 'wudhu-7',
    order: 7,
    categoryLabelId: 'Langkah 7',
    categoryLabelEn: 'Step 7',
    titleId: 'Membasuh Kedua Kaki Hingga Mata Kaki 3 Kali (Rukun Wudhu)',
    titleEn: 'Wash Both Feet Including Ankles 3 Times (Pillar)',
    explanationId:
      'Membasuh kaki kanan hingga melewati kedua mata kaki sambil menyela jari-jari kaki dengan jari kelingking sebanyak tiga kali, lalu membasuh kaki kiri tiga kali. Pastikan tumit tidak luput dari air.',
    explanationEn:
      'Wash the right foot up past both ankles while interlacing toes with the pinky finger three times, then the left foot three times, ensuring the heels are completely wet.',
    dalilSource: 'Shahih Al-Bukhari no. 163 & Shahih Muslim no. 241',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Nabi ﷺ melihat tumit beberapa sahabat yang belum terkena air wudhu lalu bersabda dengan keras: "Celakalah tumit-tumit (yang tidak basah) dari siksa api neraka!"',
    dalilTextEn:
      'Seeing some Companions whose heels had remained dry during ablution, the Prophet ﷺ warned emphatically: "Woe to the heels (that are not thoroughly washed) from the Hellfire!" (Al-Bukhari no. 163 & Muslim no. 241).',
    tafsir:
      'Tumit dan sela-sela jari sering terlewat saat tergesa-gesa. Tartib (berurutan dari wajah -> tangan -> kepala -> kaki) serta Muwalah (bersambung tanpa jeda lama hingga kering) termasuk rukun sahnya wudhu.',
    tafsirEn:
      'Heels and spaces between the toes are easily missed when rushing. Observing proper sequence (Tartib) and continuity (Muwalah) without long gaps is an essential requirement for valid wudhu.',
  },
  {
    id: 'wudhu-8',
    order: 8,
    categoryLabelId: 'Langkah 8 (Penutup)',
    categoryLabelEn: 'Step 8 (Closing)',
    titleId: 'Membaca Doa Setelah Wudhu',
    titleEn: 'Reciting Supplication After Wudhu',
    arabicText:
      'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ',
    latinText:
      "Asyhadu allā ilāha illallāhu waḥdahū lā syarīka lah, wa asyhadu anna Muḥammadan 'abduhū wa rasūluh. Allāhummaj'alnī minat-tawwābīna waj'alnī minal-mutaṭahhirīn.",
    explanationId:
      'Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang menyucikan diri.',
    explanationEn:
      'I bear witness that none has the right to be worshipped except Allah alone without partner, and Muhammad is His servant and Messenger. O Allah, make me among the repentant and those who purify themselves.',
    dalilSource: 'Shahih Muslim no. 234 & Jami’ At-Tirmidzi no. 55',
    dalilStatus: 'Shahih',
    dalilText:
      'Nabi ﷺ bersabda: "Tidaklah salah seorang di antara kalian berwudhu lalu menyempurnakan wudhunya, kemudian mengucapkan: Asyhadu alla ilaha illallahu wahdahu la syarika lahu wa asyhadu anna Muhammadan abduhu wa rasuluh, melainkan dibukakan baginya delapan pintu surga; ia dipersilakan masuk melalui pintu mana saja yang ia kehendaki." (HR. Muslim no. 234).',
    dalilTextEn:
      'The Prophet ﷺ said: "None of you performs ablution thoroughly and then says: Ashhadu alla ilaha illallahu wahdahu la syarika lahu wa asyhadu anna Muhammadan abduhu wa rasuluh, except that all eight gates of Paradise are opened for him to enter by whichever he wills." (Muslim no. 234).',
    tafsir:
      'Adapun riwayat At-Tirmidzi no. 55 (dishahihkan Syaikh Al-Albani) menambahkan lafaz doa setelah syahadat tersebut: "Allahummaj’alni minat-tawwabina waj’alni minal-mutathahhirin" (Ya Allah, jadikanlah aku termasuk golongan orang-orang yang bertaubat dan golongan orang-orang yang menyucikan diri).',
    tafsirEn:
      'At-Tirmidhi (no. 55, authenticated by Shaykh Al-Albani) adds the supplication following the testimony: "O Allah, make me among those who constantly repent and those who purify themselves."',
  },
];

// ==========================================
// 2. JALUR MAHRAM (KATEGORI + CHECKER)
// ==========================================
export const MAHRAM_ENTRIES: SunnahTopicEntry[] = [
  {
    id: 'mahram-nasab',
    order: 1,
    categoryLabelId: 'Mahram Mu’abbad · Jalur Nasab (7 Golongan)',
    categoryLabelEn: 'Permanent Mahram · Bloodline (7 Categories)',
    titleId: 'Mahram Karena Hubungan Darah / Keturunan (Nasab)',
    titleEn: 'Mahram by Bloodline / Lineage (Nasab)',
    explanationId:
      'Terdiri dari 7 kelompok utama yang haram dinikahi selamanya, boleh bersalaman, dan boleh menemani safar: (1) Ibu, nenek dari ayah/ibu terus ke atas; (2) Anak perempuan, cucu perempuan terus ke bawah; (3) Saudari kandung, seayah, maupun seibu; (4) Bibi dari pihak ayah (‘ammah); (5) Bibi dari pihak ibu (khalah); (6) Keponakan perempuan dari saudara laki-laki; (7) Keponakan perempuan dari saudari.',
    explanationEn:
      'Includes 7 blood relatives permanently prohibited for marriage: (1) Mother & grandmothers; (2) Daughters & granddaughters; (3) Full, paternal, or maternal sisters; (4) Paternal aunts; (5) Maternal aunts; (6) Nieces through brothers; (7) Nieces through sisters.',
    dalilSource: 'QS. An-Nisa ayat 23',
    dalilStatus: 'Al-Quran (Nash Qath’i)',
    dalilText:
      'Allah Taala berfirman merinci seluruh wanita yang haram dinikahi: "Diharamkan atas kamu menikahi ibu-ibumu, anak-anak perempuanmu, saudara-saudara perempuanmu, bibi-bibimu dari pihak ayah, bibi-bibimu dari pihak ibu, anak-anak perempuan dari saudara laki-lakimu, anak-anak perempuan dari saudara perempuanmu, ibu-ibu yang pernah menyusuimu, saudara-saudara perempuan sepersusuan, ibu-ibu dari istrimu (mertua), anak-anak tiri perempuan yang berada dalam pemeliharaanmu dari istri yang telah engkau gauli — namun jika engkau belum menggauli ibunya maka tiada dosa atasmu — serta istri-istri dari anak kandungmu (menantu); dan diharamkan pula menghimpunkan dua perempuan bersaudara dalam pernikahan kecuali apa yang telah berlalu di masa lampau. Sesungguhnya Allah Maha Pengampun lagi Maha Penyayang." (QS. An-Nisa: 23).',
    dalilTextEn:
      'Allah the Exalted specifies all women permanently prohibited in marriage: "Prohibited to you are your mothers, your daughters, your sisters, your father’s sisters, your mother’s sisters, your brother’s daughters, your sister’s daughters, your milk mothers who nursed you, your sisters through nursing, your wives’ mothers, and your step-daughters under your guardianship born of your wives unto whom you have gone in—but if you have not gone in unto them, there is no sin upon you—and the wives of your sons who are from your loins, and that you take two sisters simultaneously, except for what has already occurred. Indeed, Allah is ever Forgiving and Merciful." (Quran 4:23).',
    tafsir:
      'Perhatian penting: Sepupu (anak paman atau anak bibi) BUKAN mahram nasab, sehingga wajib menjaga hijab, tidak bersalaman, dan sah dinikahi dalam syariat.',
    tafsirEn:
      'Crucial note: First cousins (children of aunts or uncles) are NOT bloodline mahrams; thus hijab rules and limits on handshakes apply, and marriage between them is permissible.',
  },
  {
    id: 'mahram-radhaah',
    order: 2,
    categoryLabelId: 'Mahram Mu’abbad · Persusuan',
    categoryLabelEn: 'Permanent Mahram · Milk Kinship',
    titleId: 'Mahram Karena Persusuan (Radha’ah)',
    titleEn: 'Mahram by Breastfeeding (Radha’ah)',
    explanationId:
      'Persusuan menjadikan seorang wanita sebagai ibu susu beserta seluruh jalur keturunan dan saudaranya berstatus mahram, dengan syarat: (1) Susuan terjadi minimal 5 kali susuan terpisah yang mengenyangkan, dan (2) Terjadi ketika bayi berusia di bawah 2 tahun qamariyah (sebelum disapih).',
    explanationEn:
      'Breastfeeding creates permanent mahram kinship mirroring bloodline when two conditions are met: (1) At least five distinct, filling feedings, and (2) The child is under two lunar years old.',
    dalilSource: 'Shahih Al-Bukhari no. 2645 & Shahih Muslim no. 1447, 1452',
    dalilStatus: 'Shahih (Muttafaqun ’Alaih)',
    dalilText:
      'Nabi ﷺ bersabda: “Menjadi mahram karena persusuan apa-apa yang menjadi mahram karena hubungan nasab (kelahiran).” (HR. Bukhari no. 2645 & Muslim no. 1447). Dari Aisyah radhiyallahu anha tentang 5 kali susuan yang jelas dalam HR. Muslim no. 1452.',
    dalilTextEn:
      'The Prophet ﷺ stated: "Breastfeeding establishes the exact same mahram prohibitions as blood birth." (Al-Bukhari no. 2645 & Muslim no. 1447). And Aishah (may Allah be pleased with her) clarified the threshold of five distinct known feedings in Sahih Muslim no. 1452.',
    tafsir:
      'Anak susu hanya menjadi mahram bagi ibu susu, suami ibu susu (ayah susu), anak-anak mereka, serta saudara dan keponakan ibu/ayah susu. Saudara kandung si anak susu yang tidak ikut menyusu TIDAK ikut menjadi mahram bagi keluarga ibu susu.',
    tafsirEn:
      'Milk kinship links the nursed child to the milk mother, her husband, and her relatives, whereas the child’s biological siblings who were not nursed by her do NOT become mahram to her family.',
  },
  {
    id: 'mahram-mushaharah',
    order: 3,
    categoryLabelId: 'Mahram Mu’abbad · Pernikahan (Mushaharah)',
    categoryLabelEn: 'Permanent Mahram · Marriage Ties',
    titleId: 'Mahram Karena Pernikahan (Mushaharah — 4 Golongan)',
    titleEn: 'Mahram by Marriage (Mushaharah — 4 Categories)',
    explanationId:
      'Meliputi 4 golongan yang menjadi mahram permanen akibat ikatan pernikahan sah: (1) Mertua (ibu/ayah dari pasangan — langsung menjadi mahram begitu akad nikah sah); (2) Menantu (pasangan dari anak — langsung menjadi mahram begitu anak menikah sah); (3) Ibu tiri / Ayah tiri (pasangan dari orang tua — langsung menjadi mahram setelah akad orang tua); (4) Anak tiri (rabibah — baru menjadi mahram permanen apabila telah terjadi hubungan suami-istri/dukhul dengan ibunya).',
    explanationEn:
      'Four permanent in-law categories: (1) Parents-in-law (immediately upon marriage contract); (2) Sons/daughters-in-law; (3) Stepparents; (4) Stepdaughters/stepsons (permanent upon consummation of the marriage with their parent).',
    dalilSource: 'QS. An-Nisa ayat 22–23',
    dalilStatus: 'Al-Quran (Nash Qath’i)',
    dalilText:
      'Allah Taala berfirman dalam QS. An-Nisa ayat 22–23: "Janganlah kamu menikahi wanita-wanita yang telah dinikahi ayahmu kecuali yang telah berlalu pada masa jahiliyah; sungguh perbuatan itu amat keji, dibenci Allah, dan seburuk-buruk jalan. Dan diharamkan pula atas kamu menikahi ibu-ibu dari istrimu (mertua), anak-anak tiri perempuan dalam pemeliharaanmu dari istri yang sudah engkau campuri — apabila belum bercampur dengan ibunya maka tidak berdosa menikahinya — serta istri-istri dari anak kandungmu sendiri (menantu)." (QS. An-Nisa: 22–23).',
    dalilTextEn:
      'Allah states in Surah An-Nisa (4:22–23): "Do not marry women whom your fathers married, except what has already passed; indeed it was an immorality, hateful, and an evil way. And prohibited to you are your wives’ mothers, your step-daughters under your care born of wives with whom you have consummated marriage—though if you have not consummated with their mother there is no blame—and the wives of your biological sons."',
    tafsir:
      'Meskipun terjadi perceraian atau pasangan wafat, status mahram mertua, menantu, ibu/ayah tiri, dan anak tiri (setelah dukhul) tetap berlaku selamanya.',
    tafsirEn:
      'Even after divorce or a spouse’s passing, the mahram status of parents-in-law, children-in-law, stepparents, and stepchildren (after consummation) remains permanently binding.',
  },
  {
    id: 'mahram-muaqqat',
    order: 4,
    categoryLabelId: 'Mahram Mu’aqqat & Non-Mahram (Sering Keliru)',
    categoryLabelEn: 'Temporary Prohibition & Non-Mahram',
    titleId: 'Ipar, Sepupu, Pasangan Paman/Bibi, dan Anak Angkat Bukanlah Mahram',
    titleEn: 'In-Laws (Siblings-in-Law), Cousins & Adopted Children Are Non-Mahram',
    explanationId:
      'Banyak kesalahpahaman di masyarakat terkait hubungan berikut: (1) Saudara/Saudari Ipar: haram dinikahi SEMENTARA (mu’aqqat) selama masih menikah dengan saudara/saudarinya, namun statusnya BUKAN mahram — wajib berhijab dan dilarang berkhalwat; (2) Sepupu (anak paman/bibi): BUKAN mahram; (3) Istri Paman / Suami Bibi: BUKAN mahram; (4) Anak Angkat (tabanni): BUKAN mahram kecuali disusui secara syar’i saat masih bayi.',
    explanationEn:
      'Common misconceptions clarified: Siblings-in-law are only temporarily prohibited in marriage (cannot be married simultaneously), yet remain non-mahram regarding hijab and seclusion. Cousins, spouses of aunts/uncles, and adopted children (unless breastfed in infancy) are all non-mahram.',
    dalilSource: 'Shahih Al-Bukhari no. 5232 & Shahih Muslim no. 2172; QS. Al-Ahzab ayat 4–5',
    dalilStatus: 'Shahih & Al-Quran',
    dalilText:
      'Rasulullah ﷺ bersabda: “Jauhilah oleh kalian masuk menemui para wanita.” Seorang sahabat Anshar bertanya: “Bagaimana dengan ipar (al-hamwu)?” Beliau menjawab: “Ipar itu adalah kebinasaan (kematian)!” (HR. Bukhari no. 5232 & Muslim no. 2172).',
    dalilTextEn:
      'The Messenger of Allah ﷺ warned: "Beware of entering upon women." A man from the Ansar asked: "What about the in-law (al-hamwu, spouse’s brother)?" He replied: "The in-law is death!" (Al-Bukhari no. 5232 & Muslim no. 2172).',
    tafsir:
      'Sabda Nabi ﷺ "Ipar adalah maut" bermakna fitnah dan bahaya berkhalwat dengan saudara/saudari ipar jauh lebih rawan karena sering dianggap seperti keluarga sendiri, padahal hukumnya tetap ajnabi (bukan mahram).',
    tafsirEn:
      'The Prophet’s description "The in-law is death" warns that seclusion with siblings-in-law poses a greater temptation precisely because families often treat them casually despite their legally non-mahram status.',
  },
];

export interface MahramRelationOption {
  id: string;
  labelId: string;
  labelEn: string;
  statusType: 'muabbad' | 'muaqqat' | 'non-mahram';
  statusLabelId: string;
  statusLabelEn: string;
  categoryId: string;
  categoryEn: string;
  rulingId: string;
  rulingEn: string;
  dalil: string;
}

export const MAHRAM_CHECKER_OPTIONS: MahramRelationOption[] = [
  {
    id: 'orang-tua',
    labelId: 'Ibu / Ayah Kandung & Nenek / Kakek',
    labelEn: 'Biological Mother / Father & Grandparents',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Permanen)',
    statusLabelEn: 'Permanent Mahram',
    categoryId: 'Jalur Nasab (Ushul)',
    categoryEn: 'Bloodline (Ancestors)',
    rulingId: 'Haram dinikahi selamanya, boleh bersalaman, wajib berbakti, dan boleh menemani safar.',
    rulingEn: 'Permanently prohibited in marriage; permissible to shake hands and travel together.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'saudara-kandung',
    labelId: 'Saudara/Saudari Kandung, Seayah, atau Seibu',
    labelEn: 'Full, Paternal, or Maternal Sibling',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Permanen)',
    statusLabelEn: 'Permanent Mahram',
    categoryId: 'Jalur Nasab',
    categoryEn: 'Bloodline',
    rulingId: 'Termasuk mahram permanen. Boleh menemani safar dan melihat aurat selain di antara pusar dan lutut dengan tetap menjaga adab.',
    rulingEn: 'Permanent mahram; allowed to accompany in travel and maintain normal family interaction.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'bibi-paman',
    labelId: 'Paman / Bibi Kandung (Saudara Ayah atau Ibu)',
    labelEn: 'Biological Uncle / Aunt (Parents’ Sibling)',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Permanen)',
    statusLabelEn: 'Permanent Mahram',
    categoryId: 'Jalur Nasab (‘Ammah / Khalah)',
    categoryEn: 'Bloodline (Paternal/Maternal)',
    rulingId: 'Paman dan bibi kandung (baik dari jalur ayah maupun ibu) adalah mahram permanen selamanya.',
    rulingEn: 'Both paternal and maternal aunts/uncles are permanent mahrams.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'keponakan',
    labelId: 'Keponakan (Anak dari Saudara/Saudari Kandung)',
    labelEn: 'Niece / Nephew (Child of Sibling)',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Permanen)',
    statusLabelEn: 'Permanent Mahram',
    categoryId: 'Jalur Nasab',
    categoryEn: 'Bloodline',
    rulingId: 'Anak dari saudara laki-laki maupun saudari perempuan berstatus mahram permanen bagi paman dan bibinya.',
    rulingEn: 'Children of full, paternal, or maternal siblings are permanent mahrams.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'mertua-menantu',
    labelId: 'Mertua atau Menantu',
    labelEn: 'Mother/Father-in-Law or Son/Daughter-in-Law',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Permanen)',
    statusLabelEn: 'Permanent Mahram',
    categoryId: 'Jalur Mushaharah (Pernikahan)',
    categoryEn: 'Marriage Ties (Mushaharah)',
    rulingId: 'Seketika akad nikah yang sah diucapkan, mertua dan menantu menjadi mahram permanen meskipun kelak terjadi perceraian.',
    rulingEn: 'Becomes a permanent mahram immediately upon a valid marriage contract, even if divorce later occurs.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'anak-tiri',
    labelId: 'Anak Tiri (Anak Bawaan Pasangan)',
    labelEn: 'Stepchild (Spouse’s Child from Prior Marriage)',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Setelah Dukhul)',
    statusLabelEn: 'Permanent Mahram (After Consummation)',
    categoryId: 'Jalur Mushaharah (Rabibah)',
    categoryEn: 'Marriage Ties',
    rulingId: 'Menjadi mahram permanen apabila telah terjadi dukhul (hubungan suami-istri) dengan ibu/ayah kandung anak tiri tersebut. Jika bercerai sebelum dukhul, status mahramnya tidak berlaku.',
    rulingEn: 'Becomes a permanent mahram once the marriage with the child’s parent has been consummated.',
    dalil: 'QS. An-Nisa: 23',
  },
  {
    id: 'ibu-susu',
    labelId: 'Ibu Susu / Saudara Sepersusuan (≥5x Susuan, Usia < 2 Thn)',
    labelEn: 'Milk Mother / Milk Sibling (≥5 Feedings, Age < 2)',
    statusType: 'muabbad',
    statusLabelId: 'Mahram Mu’abbad (Persusuan Sah)',
    statusLabelEn: 'Permanent Mahram (Valid Milk Kinship)',
    categoryId: 'Jalur Radha’ah',
    categoryEn: 'Milk Kinship',
    rulingId: 'Jika benar menyusu minimal 5 kali hingga kenyang saat berusia di bawah 2 tahun, berlaku hukum mahram sebagaimana nasab antara anak susu dan keluarga ibu susu.',
    rulingEn: 'Valid when ≥5 distinct feedings occurred before age 2; holds the same marriage/hijab status as bloodline.',
    dalil: 'HR. Al-Bukhari no. 2645 & Imam Muslim no. 1447, 1452',
  },
  {
    id: 'ipar',
    labelId: 'Saudara/Saudari Ipar (Saudara Pasangan atau Pasangan Saudara)',
    labelEn: 'Brother/Sister-in-Law (Spouse’s Sibling)',
    statusType: 'muaqqat',
    statusLabelId: 'Haram Dinikahi Sementara · BUKAN Mahram',
    statusLabelEn: 'Temporarily Prohibited · NOT Mahram',
    categoryId: 'Mahram Mu’aqqat (Ajnabi dalam Pergaulan)',
    categoryEn: 'Temporary Prohibition Only',
    rulingId: 'Hanya haram dimadu selama masih dalam ikatan pernikahan dengan saudaranya. Namun dalam hukum hijab, bersalaman, dan khalwat statusnya BUKAN MAHRAM (wajib menjaga aurat).',
    rulingEn: 'Only prohibited in simultaneous marriage; NOT a mahram regarding hijab, handshakes, or seclusion.',
    dalil: 'QS. An-Nisa: 23 & HR. Al-Bukhari no. 5232 · Imam Muslim no. 2172',
  },
  {
    id: 'sepupu',
    labelId: 'Sepupu (Anak dari Paman atau Bibi)',
    labelEn: 'First Cousin (Child of Uncle or Aunt)',
    statusType: 'non-mahram',
    statusLabelId: 'BUKAN Mahram (Ajnabi)',
    statusLabelEn: 'NOT a Mahram',
    categoryId: 'Keluarga Jauh (Halal Dinikahi)',
    categoryEn: 'Marriageable Relative',
    rulingId: 'Sepupu adalah bukan mahram sehingga wajib menutup aurat di hadapannya, tidak bersalaman, tidak berdua-duaan (khalwat), dan halal dinikahi.',
    rulingEn: 'First cousins are non-mahrams; hijab and boundaries apply, and marriage is permissible.',
    dalil: 'QS. Al-Ahzab: 50',
  },
  {
    id: 'pasangan-paman-bibi',
    labelId: 'Istri Paman (Bibi Menantu) atau Suami Bibi',
    labelEn: 'Uncle’s Wife or Aunt’s Husband',
    statusType: 'non-mahram',
    statusLabelId: 'BUKAN Mahram (Ajnabi)',
    statusLabelEn: 'NOT a Mahram',
    categoryId: 'Pasangan Kerabat',
    categoryEn: 'Relative’s Spouse',
    rulingId: 'Paman kandung adalah mahram, tetapi ISTRI paman bukanlah mahram bagi keponakan laki-laki; demikian pula suami bibi bukanlah mahram bagi keponakan perempuan.',
    rulingEn: 'While biological aunts/uncles are mahram, their spouses are NOT mahram.',
    dalil: 'QS. An-Nisa: 23–24',
  },
  {
    id: 'anak-angkat',
    labelId: 'Anak Angkat (Tanpa Hubungan Susuan Sebelum Usia 2 Tahun)',
    labelEn: 'Adopted Child (Without Infant Breastfeeding)',
    statusType: 'non-mahram',
    statusLabelId: 'BUKAN Mahram Setelah Baligh',
    statusLabelEn: 'NOT a Mahram After Puberty',
    categoryId: 'Tabanni / Asuh Sosial',
    categoryEn: 'Caregiving Only',
    rulingId: 'Anak angkat tetap dinasabkan kepada ayah kandungnya dan tidak menjadi mahram bagi orang tua angkat setelah baligh, kecuali jika disusui secara syar’i saat masih bayi (< 2 tahun).',
    rulingEn: 'Adopted children retain original lineage and are non-mahram after puberty unless validly breastfed in infancy.',
    dalil: 'QS. Al-Ahzab ayat 4–5 & 37',
  },
];

// ==========================================
// 3. ILMU FARAID (WARISAN + PERCABANGAN KASUS)
// ==========================================
export const FARAID_DOCTRINE_TOPICS: SunnahTopicEntry[] = [
  {
    id: 'faraid-hak',
    order: 1,
    categoryLabelId: 'Prinsip Dasar Mawaris',
    categoryLabelEn: 'Foundational Rights',
    titleId: '4 Hak yang Harus Ditunaikan Sebelum Harta Waris Dibagi',
    titleEn: 'Four Obligations Before Distributing Inheritance',
    explanationId:
      'Harta peninggalan (tirkah) tidak langsung dibagikan sebelum diselesaikan secara berurutan: (1) Biaya pengurusan jenazah yang wajar; (2) Pelunasan seluruh utang mayit (utang kepada Allah seperti zakat/nadzar maupun utang kepada sesama manusia); (3) Pelaksanaan wasiat yang sah (maksimal 1/3 harta dan bukan untuk ahli waris); (4) Barulah sisa harta bersih dibagikan kepada ahli waris sesuai faraid.',
    explanationEn:
      'Before heirs inherit, the estate must settle: (1) Reasonable funeral expenses; (2) All outstanding debts; (3) Valid bequests (up to 1/3 to non-heirs); (4) The net remainder is divided per Quranic shares.',
    dalilSource: 'QS. An-Nisa ayat 11 & Shahih Al-Bukhari no. 2742',
    dalilStatus: 'Al-Quran & Hadis Shahih',
    dalilText:
      'Allah Taala menutup ketentuan bagian ahli waris dalam QS. An-Nisa ayat 11 dengan penegasan: "Seluruh pembagian tersebut dilaksanakan sesudah ditunaikan wasiat yang telah dibuat oleh pewaris atau sesudah dilunasi utang-utangnya. Mengenai kedua orang tuamu dan anak-anakmu, kamu tidak mengetahui siapa di antara mereka yang lebih dekat manfaatnya bagimu. Ini merupakan ketetapan wajib dari Allah; sungguh Allah Maha Mengetahui lagi Mahabijaksana." (QS. An-Nisa: 11). Nabi ﷺ juga bersabda kepada Sa’d bin Abi Waqqash tentang batas wasiat: "Maksimal sepertiga, dan sepertiga itu pun sudah banyak." (HR. Bukhari no. 2742 & Muslim no. 1628).',
    dalilTextEn:
      'Allah concludes the Quranic shares in Surah An-Nisa (4:11): "These distributions take effect after fulfilling any bequest left behind or settling debts. Regarding your parents and your children, you know not which of them are nearer to you in benefit. This is an obligation decreed by Allah; indeed Allah is All-Knowing and Wise." The Prophet ﷺ also told Sa’d ibn Abi Waqqas regarding bequests: "Up to one-third, and even one-third is large." (Al-Bukhari no. 2742 & Muslim no. 1628).',
    tafsir:
      'Para ulama sepakat bahwa utang wajib didahulukan sebelum wasiat, dan tidak boleh ada wasiat bagi ahli waris yang sudah mendapatkan bagian warisan (HR. Abu Dawud no. 2870 & At-Tirmidzi no. 2120 · Shahih).',
    tafsirEn:
      'Scholars agree that debts must be settled before bequests, and no bequest may be made in favor of an heir who already receives an allotted inheritance share (Abu Dawud no. 2870 & At-Tirmidhi no. 2120 · Authentic).',
  },
  {
    id: 'faraid-furudh',
    order: 2,
    categoryLabelId: 'Ashabul Furudh (Bagian Pasti)',
    categoryLabelEn: 'Fixed Quranic Shares',
    titleId: 'Enam Pecahan Pasti (Furudh Muqaddarah), ’Ashabah, ’Aul & Radd',
    titleEn: 'The Six Fixed Shares, ’Ashabah, ’Aul & Radd',
    explanationId:
      'Al-Quran menetapkan 6 bagian pasti: 1/2, 1/4, 1/8, 2/3, 1/3, dan 1/6. Setelah Ashabul Furudh menerima bagiannya, sisa harta diberikan kepada ’Ashabah (ahli waris penerima sisa, paling utama anak laki-laki). Apabila total pecahan melebihi 1 (misalnya 1/2 + 2/3 + 1/6 = 8/6), diberlakukan ’AUL (penyebut dinaikkan secara proporsional). Apabila ada sisa tanpa ’Ashabah, berlaku RADD kepada ahli waris nasab (selain suami/istri).',
    explanationEn:
      'Quranic fixed shares are 1/2, 1/4, 1/8, 2/3, 1/3, and 1/6. Remaining wealth goes to residual heirs (’Ashabah). If shares exceed 1, ’Aul scales proportions down fairly; if surplus remains without ’Ashabah, Radd returns the surplus to bloodline quota heirs.',
    dalilSource: 'QS. An-Nisa ayat 11, 12, 176 & Shahih Al-Bukhari no. 6732',
    dalilStatus: 'Al-Quran & Hadis Shahih',
    dalilText:
      'Rasulullah ﷺ bersabda: “Berikanlah bagian warisan (faraid) kepada yang berhak menerimanya; lalu apa yang tersisa diberikan kepada laki-laki yang paling dekat nasabnya (’Ashabah).” (HR. Bukhari no. 6732 & Muslim no. 1615).',
    dalilTextEn:
      'The Messenger of Allah ﷺ said: "Give the fixed inheritance shares (faraid) to those entitled to them; whatever remains goes to the nearest male blood relative (’Ashabah)." (Al-Bukhari no. 6732 & Muslim no. 1615).',
    tafsir:
      'Pembagian waris dihitung setelah memastikan tidak adanya penghalang waris (mawani’ al-irts): pembunuhan sengaja terhadap pewaris, perbedaan agama (muslim tidak mewarisi kafir dan sebaliknya — HR. Bukhari 6764), serta perbudakan.',
    tafsirEn:
      'Distribution proceeds only after ruling out inheritance impediments: intentional murder of the deceased, difference of religion (Al-Bukhari 6764), and slavery.',
  },
];

export interface FaraidInputState {
  estate: number;
  spouse: 'none' | 'husband' | 'wife';
  hasFather: boolean;
  hasMother: boolean;
  hasGrandfather: boolean;
  sons: number;
  daughters: number;
  fullBrothers: number;
  fullSisters: number;
  maternalSiblings: number;
}

export interface FaraidShareRow {
  heirId: string;
  labelId: string;
  labelEn: string;
  count: number;
  fractionLabel: string;
  percentage: number;
  amount: number;
  perPersonAmount: number;
  ruleId: string;
  ruleEn: string;
  dalil: string;
  isBlocked?: boolean;
}

export interface FaraidPresetCase {
  id: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  input: FaraidInputState;
}

export interface FaraidCalculationResult {
  rows: FaraidShareRow[];
  adjustmentMode: 'normal' | 'aul' | 'radd';
  totalRawPercent: number;
  noteId: string;
  noteEn: string;
}

export const FARAID_PRESET_CASES: FaraidPresetCase[] = [
  {
    id: 'inti',
    titleId: 'Kasus 1: Keluarga Inti Lengkap',
    titleEn: 'Case 1: Complete Nuclear Family',
    subtitleId: 'Istri + Ayah + Ibu + 1 Anak Lk + 1 Anak Pr',
    subtitleEn: 'Wife + Father + Mother + 1 Son + 1 Daughter',
    input: {
      estate: 240_000_000,
      spouse: 'wife',
      hasFather: true,
      hasMother: true,
      hasGrandfather: false,
      sons: 1,
      daughters: 1,
      fullBrothers: 0,
      fullSisters: 0,
      maternalSiblings: 0,
    },
  },
  {
    id: 'dua-putri',
    titleId: 'Kasus 2: Tanpa Anak Lk (Ashabah Saudara)',
    titleEn: 'Case 2: Daughters Only + Brother',
    subtitleId: 'Istri + 2 Anak Pr + 1 Saudara Kandung Lk',
    subtitleEn: 'Wife + 2 Daughters + 1 Full Brother',
    input: {
      estate: 240_000_000,
      spouse: 'wife',
      hasFather: false,
      hasMother: false,
      hasGrandfather: false,
      sons: 0,
      daughters: 2,
      fullBrothers: 1,
      fullSisters: 0,
      maternalSiblings: 0,
    },
  },
  {
    id: 'aul',
    titleId: 'Kasus 3: Percabangan ’Aul (Penyebut Naik)',
    titleEn: 'Case 3: ’Aul (Proportional Scaling)',
    subtitleId: 'Suami (1/2) + Ibu (1/6) + 2 Saudari Kandung (2/3)',
    subtitleEn: 'Husband (1/2) + Mother (1/6) + 2 Full Sisters (2/3)',
    input: {
      estate: 240_000_000,
      spouse: 'husband',
      hasFather: false,
      hasMother: true,
      hasGrandfather: false,
      sons: 0,
      daughters: 0,
      fullBrothers: 0,
      fullSisters: 2,
      maternalSiblings: 0,
    },
  },
  {
    id: 'kalalah',
    titleId: 'Kasus 4: Kalalah (Saudara Seibu)',
    titleEn: 'Case 4: Kalalah (Maternal Siblings)',
    subtitleId: 'Istri (1/4) + Ibu (1/6) + 2 Saudara Seibu (1/3)',
    subtitleEn: 'Wife (1/4) + Mother (1/6) + 2 Maternal Siblings (1/3)',
    input: {
      estate: 240_000_000,
      spouse: 'wife',
      hasFather: false,
      hasMother: true,
      hasGrandfather: false,
      sons: 0,
      daughters: 0,
      fullBrothers: 0,
      fullSisters: 0,
      maternalSiblings: 2,
    },
  },
  {
    id: 'hijab',
    titleId: 'Kasus 5: Percabangan Hijab (Terhalang)',
    titleEn: 'Case 5: Exclusion Rules (Hijab)',
    subtitleId: 'Ayah + Kakek + 1 Anak Lk + 2 Saudara Kandung',
    subtitleEn: 'Father + Grandfather + 1 Son + 2 Full Brothers',
    input: {
      estate: 240_000_000,
      spouse: 'none',
      hasFather: true,
      hasMother: false,
      hasGrandfather: true,
      sons: 1,
      daughters: 0,
      fullBrothers: 2,
      fullSisters: 0,
      maternalSiblings: 0,
    },
  },
  {
    id: 'radd',
    titleId: 'Kasus 6: Percabangan Radd (Pengembalian Sisa)',
    titleEn: 'Case 6: Radd (Surplus Return)',
    subtitleId: 'Ibu + 1 Anak Perempuan (tanpa ’Ashabah)',
    subtitleEn: 'Mother + 1 Daughter (no ’Ashabah)',
    input: {
      estate: 240_000_000,
      spouse: 'none',
      hasFather: false,
      hasMother: true,
      hasGrandfather: false,
      sons: 0,
      daughters: 1,
      fullBrothers: 0,
      fullSisters: 0,
      maternalSiblings: 0,
    },
  },
];

interface WorkingShare {
  heirId: string;
  labelId: string;
  labelEn: string;
  count: number;
  baseWeight: number; // fraction out of 1 before Aul/Radd
  fractionLabel: string;
  ruleId: string;
  ruleEn: string;
  dalil: string;
  eligibleForRadd: boolean;
}

export function calculateFaraidDistribution(input: FaraidInputState): FaraidCalculationResult {
  const estate = Math.max(0, Number.isFinite(input.estate) ? input.estate : 0);
  const hasDescendant = input.sons > 0 || input.daughters > 0;
  const hasMaleDescendant = input.sons > 0;
  const totalSiblings = input.fullBrothers + input.fullSisters + input.maternalSiblings;

  const activeShares: WorkingShare[] = [];
  const blockedRows: FaraidShareRow[] = [];

  // 1. Spouse (Suami atau Istri) — never eligible for Radd
  if (input.spouse === 'husband') {
    const share = hasDescendant ? 1 / 4 : 1 / 2;
    activeShares.push({
      heirId: 'husband',
      labelId: 'Suami',
      labelEn: 'Husband',
      count: 1,
      baseWeight: share,
      fractionLabel: hasDescendant ? '1/4' : '1/2',
      ruleId: hasDescendant
        ? 'Mendapat 1/4 karena ada keturunan (anak).'
        : 'Mendapat 1/2 karena tidak ada keturunan (anak).',
      ruleEn: hasDescendant
        ? 'Receives 1/4 due to presence of children.'
        : 'Receives 1/2 because there are no children.',
      dalil: 'QS. An-Nisa: 12',
      eligibleForRadd: false,
    });
  } else if (input.spouse === 'wife') {
    const share = hasDescendant ? 1 / 8 : 1 / 4;
    activeShares.push({
      heirId: 'wife',
      labelId: 'Istri',
      labelEn: 'Wife',
      count: 1,
      baseWeight: share,
      fractionLabel: hasDescendant ? '1/8' : '1/4',
      ruleId: hasDescendant
        ? 'Mendapat 1/8 karena ada keturunan (anak).'
        : 'Mendapat 1/4 karena tidak ada keturunan (anak).',
      ruleEn: hasDescendant
        ? 'Receives 1/8 due to presence of children.'
        : 'Receives 1/4 because there are no children.',
      dalil: 'QS. An-Nisa: 12',
      eligibleForRadd: false,
    });
  }

  // 2. Mother (Ibu)
  if (input.hasMother) {
    const oneSixthCondition = hasDescendant || totalSiblings >= 2;
    const share = oneSixthCondition ? 1 / 6 : 1 / 3;
    activeShares.push({
      heirId: 'mother',
      labelId: 'Ibu',
      labelEn: 'Mother',
      count: 1,
      baseWeight: share,
      fractionLabel: oneSixthCondition ? '1/6' : '1/3',
      ruleId: hasDescendant
        ? 'Mendapat 1/6 karena pewaris memiliki anak.'
        : totalSiblings >= 2
        ? 'Mendapat 1/6 karena terdapat 2 saudara atau lebih.'
        : 'Mendapat 1/3 karena tidak ada anak dan saudara < 2.',
      ruleEn: oneSixthCondition
        ? 'Receives 1/6 due to children or ≥2 siblings.'
        : 'Receives 1/3 with no children and <2 siblings.',
      dalil: 'QS. An-Nisa: 11',
      eligibleForRadd: true,
    });
  }

  // 3. Father (Ayah) & Grandfather (Kakek)
  let fatherAsabahEligible = false;
  let grandfatherAsabahEligible = false;

  if (input.hasFather) {
    if (hasMaleDescendant) {
      activeShares.push({
        heirId: 'father',
        labelId: 'Ayah',
        labelEn: 'Father',
        count: 1,
        baseWeight: 1 / 6,
        fractionLabel: '1/6',
        ruleId: 'Mendapat 1/6 pasti karena ada anak laki-laki.',
        ruleEn: 'Receives fixed 1/6 because a son is present.',
        dalil: 'QS. An-Nisa: 11',
        eligibleForRadd: false,
      });
    } else if (input.daughters > 0) {
      activeShares.push({
        heirId: 'father',
        labelId: 'Ayah (1/6 + Sisa ’Ashabah)',
        labelEn: 'Father (1/6 + Residual)',
        count: 1,
        baseWeight: 1 / 6,
        fractionLabel: '1/6 + Sisa',
        ruleId: 'Mendapat 1/6 pasti plus sisa harta (’Ashabah) jika masih tersisa.',
        ruleEn: 'Receives fixed 1/6 plus any residual ’Ashabah.',
        dalil: 'QS. An-Nisa: 11 & HR. Bukhari 6732',
        eligibleForRadd: false,
      });
      fatherAsabahEligible = true;
    } else {
      fatherAsabahEligible = true;
    }

    if (input.hasGrandfather) {
      blockedRows.push({
        heirId: 'grandfather',
        labelId: 'Kakek (Ayah dari Ayah)',
        labelEn: 'Paternal Grandfather',
        count: 1,
        fractionLabel: 'Mahjub (0)',
        percentage: 0,
        amount: 0,
        perPersonAmount: 0,
        ruleId: 'Terhijab penuh (Mahjub) karena Ayah kandung masih hidup.',
        ruleEn: 'Fully excluded because the biological Father is alive.',
        dalil: 'Kaidah Hijab Faraid (Ijma’)',
        isBlocked: true,
      });
    }
  } else if (input.hasGrandfather) {
    if (hasMaleDescendant) {
      activeShares.push({
        heirId: 'grandfather',
        labelId: 'Kakek',
        labelEn: 'Paternal Grandfather',
        count: 1,
        baseWeight: 1 / 6,
        fractionLabel: '1/6',
        ruleId: 'Menggantikan posisi ayah mendapat 1/6 karena ada anak laki-laki.',
        ruleEn: 'Steps into Father’s position with fixed 1/6 due to a son.',
        dalil: 'Atsar Abu Bakar Ash-Shiddiq & Ijma’',
        eligibleForRadd: false,
      });
    } else if (input.daughters > 0) {
      activeShares.push({
        heirId: 'grandfather',
        labelId: 'Kakek (1/6 + Sisa ’Ashabah)',
        labelEn: 'Grandfather (1/6 + Residual)',
        count: 1,
        baseWeight: 1 / 6,
        fractionLabel: '1/6 + Sisa',
        ruleId: 'Mendapat 1/6 pasti ditambah sisa sebagai ’Ashabah (dengan asumsi meniadakan saudara dalam mazhab Hanafi/Abu Bakar).',
        ruleEn: 'Receives fixed 1/6 plus residual ’Ashabah.',
        dalil: 'QS. An-Nisa: 11 & HR. Bukhari 6732',
        eligibleForRadd: false,
      });
      grandfatherAsabahEligible = true;
    } else {
      grandfatherAsabahEligible = true;
    }
  }

  // 4. Daughters when no Sons
  if (!hasMaleDescendant && input.daughters > 0) {
    const share = input.daughters === 1 ? 1 / 2 : 2 / 3;
    activeShares.push({
      heirId: 'daughters',
      labelId: input.daughters === 1 ? '1 Anak Perempuan' : `${input.daughters} Anak Perempuan`,
      labelEn: input.daughters === 1 ? '1 Daughter' : `${input.daughters} Daughters`,
      count: input.daughters,
      baseWeight: share,
      fractionLabel: input.daughters === 1 ? '1/2' : '2/3 (dibagi rata)',
      ruleId:
        input.daughters === 1
          ? 'Anak perempuan tunggal tanpa anak laki-laki mendapat 1/2.'
          : 'Dua anak perempuan atau lebih tanpa anak laki-laki mendapat 2/3 dibagi rata.',
      ruleEn:
        input.daughters === 1
          ? 'Single daughter without sons receives 1/2.'
          : 'Two or more daughters without sons share 2/3 equally.',
      dalil: 'QS. An-Nisa: 11',
      eligibleForRadd: true,
    });
  }

  // 5. Maternal Siblings (Saudara/Saudari Seibu) — blocked by any descendant OR father/grandfather
  if (input.maternalSiblings > 0) {
    if (hasDescendant || input.hasFather || input.hasGrandfather) {
      blockedRows.push({
        heirId: 'maternal-siblings',
        labelId: `${input.maternalSiblings} Saudara Seibu`,
        labelEn: `${input.maternalSiblings} Maternal Sibling(s)`,
        count: input.maternalSiblings,
        fractionLabel: 'Mahjub (0)',
        percentage: 0,
        amount: 0,
        perPersonAmount: 0,
        ruleId: 'Terhijab penuh karena terdapat anak/keturunan atau ayah/kakek (bukan kondisi Kalalah).',
        ruleEn: 'Excluded because descendants or father/grandfather are present.',
        dalil: 'QS. An-Nisa: 12',
        isBlocked: true,
      });
    } else {
      const share = input.maternalSiblings === 1 ? 1 / 6 : 1 / 3;
      activeShares.push({
        heirId: 'maternal-siblings',
        labelId: `${input.maternalSiblings} Saudara Seibu`,
        labelEn: `${input.maternalSiblings} Maternal Sibling(s)`,
        count: input.maternalSiblings,
        baseWeight: share,
        fractionLabel: input.maternalSiblings === 1 ? '1/6' : '1/3 (dibagi rata)',
        ruleId:
          input.maternalSiblings === 1
            ? 'Kalalah: 1 saudara seibu mendapat 1/6.'
            : 'Kalalah: 2 saudara seibu atau lebih berserikat atas 1/3 (bagian laki-laki & perempuan sama).',
        ruleEn:
          input.maternalSiblings === 1
            ? 'Kalalah: single maternal sibling gets 1/6.'
            : 'Kalalah: ≥2 maternal siblings share 1/3 equally.',
        dalil: 'QS. An-Nisa: 12',
        eligibleForRadd: true,
      });
    }
  }

  // 6. Full Siblings (Saudara/Saudari Kandung) — blocked by Son OR Father (or Grandfather per jumhur Hanafi/Abu Bakar)
  let fullSiblingsAsabah = false;
  if (input.fullBrothers > 0 || input.fullSisters > 0) {
    if (hasMaleDescendant || input.hasFather || input.hasGrandfather) {
      blockedRows.push({
        heirId: 'full-siblings',
        labelId: `Saudara Kandung (${input.fullBrothers} Lk, ${input.fullSisters} Pr)`,
        labelEn: `Full Siblings (${input.fullBrothers} M, ${input.fullSisters} F)`,
        count: input.fullBrothers + input.fullSisters,
        fractionLabel: 'Mahjub (0)',
        percentage: 0,
        amount: 0,
        perPersonAmount: 0,
        ruleId: hasMaleDescendant
          ? 'Terhijab penuh oleh keberadaan Anak Laki-laki.'
          : input.hasFather
          ? 'Terhijab penuh oleh keberadaan Ayah.'
          : 'Terhijab oleh Kakek (pendapat Abu Bakar Ash-Shiddiq & Imam Abu Hanifah).',
        ruleEn: 'Fully excluded by Son, Father, or Grandfather.',
        dalil: 'QS. An-Nisa: 176 & Ijma’ Faraid',
        isBlocked: true,
      });
    } else if (input.fullBrothers > 0) {
      fullSiblingsAsabah = true;
    } else if (input.fullSisters > 0) {
      if (input.daughters > 0) {
        // Ashabah Ma'al Ghair with daughters!
        fullSiblingsAsabah = true;
      } else {
        const share = input.fullSisters === 1 ? 1 / 2 : 2 / 3;
        activeShares.push({
          heirId: 'full-sisters',
          labelId: `${input.fullSisters} Saudari Kandung`,
          labelEn: `${input.fullSisters} Full Sister(s)`,
          count: input.fullSisters,
          baseWeight: share,
          fractionLabel: input.fullSisters === 1 ? '1/2' : '2/3 (dibagi rata)',
          ruleId:
            input.fullSisters === 1
              ? 'Kalalah: 1 saudari kandung mendapat 1/2.'
              : 'Kalalah: ≥2 saudari kandung mendapat 2/3 dibagi rata.',
          ruleEn:
            input.fullSisters === 1
              ? 'Kalalah: 1 full sister receives 1/2.'
              : 'Kalalah: ≥2 full sisters share 2/3.',
          dalil: 'QS. An-Nisa: 176',
          eligibleForRadd: true,
        });
      }
    }
  }

  // Sum fixed weights
  const sumFixed = activeShares.reduce((acc, s) => acc + s.baseWeight, 0);
  const totalRawPercent = Math.round(sumFixed * 1000) / 10;

  // Determine Ashabah availability when sumFixed < 1
  const hasAsabahReceiver =
    hasMaleDescendant || fatherAsabahEligible || grandfatherAsabahEligible || fullSiblingsAsabah;

  const finalRows: FaraidShareRow[] = [];
  let adjustmentMode: 'normal' | 'aul' | 'radd' = 'normal';
  let noteId = 'Semua harta terbagi habis sesuai porsi Ashabul Furudh dan ’Ashabah (kondisi ’Adilah).';
  let noteEn = 'All wealth is distributed evenly among fixed-share and residual heirs.';

  const eps = 1e-6;

  if (sumFixed > 1 + eps) {
    // 'AUL! Proportionally scale down every Ashabul Furudh share so total = 1
    adjustmentMode = 'aul';
    noteId = `Terjadi ’AUL: jumlah pembilang melebihi 100% (${totalRawPercent}%), sehingga seluruh bagian diturunkan secara proporsional agar adil hingga 100%.`;
    noteEn = `’AUL triggered: total fixed fractions reached ${totalRawPercent}%, scaled down proportionally to 100%.`;

    for (const s of activeShares) {
      const pct = (s.baseWeight / sumFixed) * 100;
      const amt = estate * (s.baseWeight / sumFixed);
      finalRows.push({
        heirId: s.heirId,
        labelId: s.labelId,
        labelEn: s.labelEn,
        count: s.count,
        fractionLabel: `${s.fractionLabel} (’Aul)`,
        percentage: pct,
        amount: amt,
        perPersonAmount: s.count > 0 ? amt / s.count : amt,
        ruleId: s.ruleId,
        ruleEn: s.ruleEn,
        dalil: s.dalil,
      });
    }
  } else {
    const remainder = Math.max(0, 1 - sumFixed);

    if (remainder > eps && hasAsabahReceiver) {
      // Distribute fixed shares + remainder to Ashabah in priority order
      for (const s of activeShares) {
        finalRows.push({
          heirId: s.heirId,
          labelId: s.labelId,
          labelEn: s.labelEn,
          count: s.count,
          fractionLabel: s.fractionLabel,
          percentage: s.baseWeight * 100,
          amount: estate * s.baseWeight,
          perPersonAmount: s.count > 0 ? (estate * s.baseWeight) / s.count : estate * s.baseWeight,
          ruleId: s.ruleId,
          ruleEn: s.ruleEn,
          dalil: s.dalil,
        });
      }

      if (hasMaleDescendant) {
        const totalUnits = input.sons * 2 + input.daughters * 1;
        if (input.sons > 0) {
          const sonsShare = remainder * ((input.sons * 2) / totalUnits);
          finalRows.push({
            heirId: 'sons',
            labelId: `${input.sons} Anak Laki-laki`,
            labelEn: `${input.sons} Son(s)`,
            count: input.sons,
            fractionLabel: input.daughters > 0 ? '’Ashabah (2:1)' : '’Ashabah (Sisa)',
            percentage: sonsShare * 100,
            amount: estate * sonsShare,
            perPersonAmount: (estate * sonsShare) / input.sons,
            ruleId:
              input.daughters > 0
                ? 'Menarik anak perempuan menjadi ’Ashabah bil Ghair dengan rasio 2 bagian laki-laki : 1 bagian perempuan.'
                : 'Mengambil seluruh sisa harta sebagai ’Ashabah bin Nafsi.',
            ruleEn:
              input.daughters > 0
                ? 'Shares remainder with daughters at a 2:1 male-to-female ratio.'
                : 'Receives the entire remaining estate as primary ’Ashabah.',
            dalil: 'QS. An-Nisa: 11',
          });
        }
        if (input.daughters > 0) {
          const daughtersShare = remainder * ((input.daughters * 1) / totalUnits);
          finalRows.push({
            heirId: 'daughters-asabah',
            labelId: `${input.daughters} Anak Perempuan`,
            labelEn: `${input.daughters} Daughter(s)`,
            count: input.daughters,
            fractionLabel: '’Ashabah (2:1)',
            percentage: daughtersShare * 100,
            amount: estate * daughtersShare,
            perPersonAmount: (estate * daughtersShare) / input.daughters,
            ruleId: 'Bersama anak laki-laki menerima sisa dengan perbandingan 1 bagian dibanding 2 bagian saudara laki-lakinya.',
            ruleEn: 'Shares remaining estate alongside sons at 1:2 ratio.',
            dalil: 'QS. An-Nisa: 11',
          });
        }
      } else if (fatherAsabahEligible) {
        const existingFather = finalRows.find((r) => r.heirId === 'father');
        if (existingFather) {
          existingFather.percentage += remainder * 100;
          existingFather.amount += estate * remainder;
          existingFather.perPersonAmount = existingFather.amount;
        } else {
          finalRows.push({
            heirId: 'father',
            labelId: 'Ayah',
            labelEn: 'Father',
            count: 1,
            fractionLabel: '’Ashabah (Sisa)',
            percentage: remainder * 100,
            amount: estate * remainder,
            perPersonAmount: estate * remainder,
            ruleId: 'Mengambil seluruh sisa harta sebagai ’Ashabah karena tidak ada anak.',
            ruleEn: 'Receives entire remainder as ’Ashabah since there are no children.',
            dalil: 'HR. Al-Bukhari no. 6732',
          });
        }
      } else if (grandfatherAsabahEligible) {
        const existingGrandfather = finalRows.find((r) => r.heirId === 'grandfather');
        if (existingGrandfather) {
          existingGrandfather.percentage += remainder * 100;
          existingGrandfather.amount += estate * remainder;
          existingGrandfather.perPersonAmount = existingGrandfather.amount;
        } else {
          finalRows.push({
            heirId: 'grandfather',
            labelId: 'Kakek',
            labelEn: 'Paternal Grandfather',
            count: 1,
            fractionLabel: '’Ashabah (Sisa)',
            percentage: remainder * 100,
            amount: estate * remainder,
            perPersonAmount: estate * remainder,
            ruleId: 'Mengambil seluruh sisa harta sebagai ’Ashabah pengganti ayah.',
            ruleEn: 'Receives entire remainder as ’Ashabah in father’s absence.',
            dalil: 'HR. Al-Bukhari no. 6732',
          });
        }
      } else if (fullSiblingsAsabah) {
        if (input.fullBrothers > 0) {
          const totalUnits = input.fullBrothers * 2 + input.fullSisters * 1;
          const broShare = remainder * ((input.fullBrothers * 2) / totalUnits);
          finalRows.push({
            heirId: 'full-brothers',
            labelId: `${input.fullBrothers} Saudara Kandung Lk`,
            labelEn: `${input.fullBrothers} Full Brother(s)`,
            count: input.fullBrothers,
            fractionLabel: input.fullSisters > 0 ? '’Ashabah (2:1)' : '’Ashabah (Sisa)',
            percentage: broShare * 100,
            amount: estate * broShare,
            perPersonAmount: (estate * broShare) / input.fullBrothers,
            ruleId: 'Tidak ada anak laki-laki maupun ayah/kakek; saudara kandung laki-laki mengambil sisa harta.',
            ruleEn: 'In absence of sons, father, or grandfather, full brothers inherit the remainder.',
            dalil: 'QS. An-Nisa: 176 & HR. Bukhari 6732',
          });
          if (input.fullSisters > 0) {
            const sisShare = remainder * ((input.fullSisters * 1) / totalUnits);
            finalRows.push({
              heirId: 'full-sisters-asabah',
              labelId: `${input.fullSisters} Saudari Kandung`,
              labelEn: `${input.fullSisters} Full Sister(s)`,
              count: input.fullSisters,
              fractionLabel: '’Ashabah (2:1)',
              percentage: sisShare * 100,
              amount: estate * sisShare,
              perPersonAmount: (estate * sisShare) / input.fullSisters,
              ruleId: 'Menjadi ’Ashabah bil Ghair bersama saudara kandung laki-laki dengan rasio 1:2.',
              ruleEn: 'Inherits alongside full brothers at a 1:2 ratio.',
              dalil: 'QS. An-Nisa: 176',
            });
          }
        } else if (input.fullSisters > 0 && input.daughters > 0) {
          finalRows.push({
            heirId: 'full-sisters-maal',
            labelId: `${input.fullSisters} Saudari Kandung`,
            labelEn: `${input.fullSisters} Full Sister(s)`,
            count: input.fullSisters,
            fractionLabel: '’Ashabah Ma’al Ghair',
            percentage: remainder * 100,
            amount: estate * remainder,
            perPersonAmount: (estate * remainder) / input.fullSisters,
            ruleId: 'Kaidah "Jadikanlah saudari bersama anak perempuan sebagai ’Ashabah": mengambil seluruh sisa setelah bagian anak perempuan.',
            ruleEn: 'Full sisters become residual heirs alongside daughters (’Ashabah Ma’al Ghair).',
            dalil: 'HR. Al-Bukhari no. 6736 (Keputusan Ibnu Mas’ud)',
          });
        }
      }
    } else if (remainder > eps && !hasAsabahReceiver) {
      // Check Radd! Eligible bloodline Ashabul Furudh get proportional return of remainder
      const raddPoolWeight = activeShares
        .filter((s) => s.eligibleForRadd)
        .reduce((acc, s) => acc + s.baseWeight, 0);

      if (raddPoolWeight > eps) {
        adjustmentMode = 'radd';
        noteId =
          'Terjadi RADD: terdapat sisa harta tanpa ’Ashabah, sehingga sisa tersebut dikembalikan secara proporsional kepada ahli waris nasab (selain suami/istri).';
        noteEn =
          'RADD applied: surplus wealth without residual heirs is proportionally returned to eligible bloodline quota heirs (excluding spouse).';

        const spouseWeight = activeShares
          .filter((s) => !s.eligibleForRadd)
          .reduce((acc, s) => acc + s.baseWeight, 0);
        const remainingForRaddPool = Math.max(0, 1 - spouseWeight);

        for (const s of activeShares) {
          const finalShare = s.eligibleForRadd
            ? remainingForRaddPool * (s.baseWeight / raddPoolWeight)
            : s.baseWeight;
          finalRows.push({
            heirId: s.heirId,
            labelId: s.labelId,
            labelEn: s.labelEn,
            count: s.count,
            fractionLabel: s.eligibleForRadd ? `${s.fractionLabel} + Radd` : s.fractionLabel,
            percentage: finalShare * 100,
            amount: estate * finalShare,
            perPersonAmount: s.count > 0 ? (estate * finalShare) / s.count : estate * finalShare,
            ruleId: s.ruleId,
            ruleEn: s.ruleEn,
            dalil: s.dalil,
          });
        }
      } else {
        // Only spouse exists without any bloodline heirs or Ashabah
        noteId =
          'Hanya terdapat Suami/Istri tanpa ahli waris nasab lain. Menurut jumhur, pasangan mendapat bagian pastinya dan sisa diserahkan ke Baitul Mal (atau diradd menurut pendapat sebagian ulama muta’akhirin).';
        noteEn =
          'Only a spouse is present without bloodline heirs. The spouse takes the fixed Quranic share and the surplus passes to the public treasury (Bayt al-Mal).';
        for (const s of activeShares) {
          finalRows.push({
            heirId: s.heirId,
            labelId: s.labelId,
            labelEn: s.labelEn,
            count: s.count,
            fractionLabel: s.fractionLabel,
            percentage: s.baseWeight * 100,
            amount: estate * s.baseWeight,
            perPersonAmount: estate * s.baseWeight,
            ruleId: s.ruleId,
            ruleEn: s.ruleEn,
            dalil: s.dalil,
          });
        }
      }
    } else {
      // Exact 100% match ('Adilah)
      for (const s of activeShares) {
        finalRows.push({
          heirId: s.heirId,
          labelId: s.labelId,
          labelEn: s.labelEn,
          count: s.count,
          fractionLabel: s.fractionLabel,
          percentage: s.baseWeight * 100,
          amount: estate * s.baseWeight,
          perPersonAmount: s.count > 0 ? (estate * s.baseWeight) / s.count : estate * s.baseWeight,
          ruleId: s.ruleId,
          ruleEn: s.ruleEn,
          dalil: s.dalil,
        });
      }
    }
  }

  return {
    rows: [...finalRows, ...blockedRows],
    adjustmentMode,
    totalRawPercent,
    noteId,
    noteEn,
  };
}

// ==========================================
// 4. AKIDAH AHLUS SUNNAH WAL JAMA'AH
// ==========================================
export const AKIDAH_TOPICS: SunnahTopicEntry[] = [
  {
    id: 'akidah-1',
    order: 1,
    categoryLabelId: 'Fondasi Akidah · Hadis Jibril',
    categoryLabelEn: 'Creed Foundation · Hadith of Jibril',
    titleId: 'Enam Rukun Iman Sebagai Pilar Akidah Seorang Mukmin',
    titleEn: 'The Six Pillars of Iman in Ahlus Sunnah Creed',
    arabicText:
      'أَنْ تُؤْمِنَ بِاللّٰهِ، وَمَلَائِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الْآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
    latinText:
      "An tu'mina billāhi, wa malā'ikatihī, wa kutubihī, wa rusulihī, wal-yaumil-ākhiri, wa tu'mina bil-qadari khairihī wa syarrih.",
    explanationId:
      'Iman mencakup pembenaran hati, ikrar lisan, dan amal perbuatan anggota badan; ia dapat bertambah dengan ketaatan dan berkurang karena kemaksiatan. Rukunnya ada enam: iman kepada Allah, para malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir (termasuk nikmat dan azab kubur, hisab, mizan, shirath, surga dan neraka), serta takdir baik maupun buruk.',
    explanationEn:
      'Iman comprises belief in the heart, affirmation on the tongue, and action with the limbs—increasing with obedience and decreasing with sin. Its six pillars are belief in Allah, His angels, revealed books, messengers, the Last Day, and Divine Decree.',
    dalilSource: 'Shahih Muslim no. 8 (Hadis Jibril) & QS. Al-Baqarah ayat 285',
    dalilStatus: 'Shahih & Al-Quran',
    dalilText:
      'Ketika Jibril alaihissalam bertanya kepada Nabi ﷺ: “Beritahukan kepadaku tentang iman!” Beliau menjawab: “Engkau beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman kepada takdir yang baik maupun yang buruk.”',
    dalilTextEn:
      'When Jibril (peace be upon him) asked the Prophet ﷺ: "Tell me about Iman!" He replied: "It is to believe in Allah, His angels, His revealed books, His messengers, the Last Day, and to believe in Divine Decree—both its good and its evil." (Muslim no. 8).',
    tafsir:
      'Imam An-Nawawi menjelaskan bahwa Hadis Jibril merupakan induk ilmu Islam karena menghimpun tiga tingkatan agama: Islam (amal lahir), Iman (akidah batin), dan Ihsan (muqarabah kepada Allah).',
    tafsirEn:
      'Imam An-Nawawi notes that the Hadith of Jibril is the foundational mother of Islamic sciences because it brings together all three dimensions of religion: outward Islam, inward Iman, and spiritual excellence (Ihsan).',
  },
  {
    id: 'akidah-2',
    order: 2,
    categoryLabelId: 'Manhaj Talaqqi · Sumber Kebenaran',
    categoryLabelEn: 'Methodology of Belief',
    titleId: 'Beragama di Atas Wahyu dan Pemahaman Salafush Shalih',
    titleEn: 'Grounding Creed in Revelation & Understanding of the Salaf',
    explanationId:
      'Akidah bukan hasil filsafat atau dugaan akal semata, melainkan berita wahyu dari Allah dan Rasul-Nya (tauqifiyah). Para sahabat Nabi ﷺ adalah generasi yang menyaksikan turunnya wahyu dan mendapat persaksian ridha langsung dari Allah, sehingga memahami Al-Quran dan Sunnah sebagaimana pemahaman mereka adalah jalan keselamatan dari perpecahan.',
    explanationEn:
      'Islamic creed is purely derived from divine revelation rather than speculative philosophy. Following the Companions’ understanding of the Quran and authentic Sunnah protects believers from distortion and division.',
    dalilSource: 'QS. At-Taubah ayat 100 & Shahih Al-Bukhari no. 2652 · Shahih Muslim no. 2533',
    dalilStatus: 'Al-Quran & Muttafaqun ’Alaih',
    dalilText:
      'Allah berfirman: "Orang-orang terdahulu lagi mula-mula masuk Islam dari golongan Muhajirin dan Anshar serta orang-orang yang mengikuti jejak mereka dengan baik, Allah ridha kepada mereka dan mereka pun ridha kepada-Nya; Allah telah menyediakan bagi mereka surga-surga yang mengalir sungai-sungai di bawahnya, mereka kekal di dalamnya selama-lamanya; itulah kemenangan yang agung." (QS. At-Taubah: 100). Nabi ﷺ bersabda: "Sebaik-baik manusia adalah generasiku (para sahabat), kemudian generasi sesudah mereka (tabi’in), lalu generasi sesudah mereka (tabi’ut tabi’in)." (HR. Bukhari no. 2652 & Muslim no. 2533).',
    dalilTextEn:
      'Allah declares: "And the first forerunners among the Muhajirin and the Ansar and those who followed them with goodness—Allah is pleased with them and they are pleased with Him, and He has prepared for them gardens beneath which rivers flow, wherein they will abide forever." (Quran 9:100). And the Prophet ﷺ said: "The best of people are my generation, then those who follow them, then those who follow them." (Al-Bukhari no. 2652 & Muslim no. 2533).',
    tafsir:
      'Mengikuti manhaj salaf berarti mencintai seluruh sahabat Nabi ﷺ, menahan lisan dari perselisihan yang terjadi di antara mereka, dan mendahulukan nash Al-Quran serta Hadis Shahih di atas pendapat siapa pun.',
    tafsirEn:
      'Following the methodology of the Salaf means honoring all Companions, refraining from judging disputes between them, and placing clear Quranic and authentic Prophetic texts above any human opinion.',
  },
  {
    id: 'akidah-3',
    order: 3,
    categoryLabelId: 'Prinsip Sifat Allah',
    categoryLabelEn: 'Principles of Divine Attributes',
    titleId: 'Kaidah Menetapkan Nama dan Sifat Allah Tanpa Menyerupakan Makhluk',
    titleEn: 'Affirming Divine Attributes Without Resemblance or Denial',
    arabicText: 'لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ',
    latinText: 'Laisa kamiṡlihī syai’un wa huwas-samī‘ul-baṣīr.',
    explanationId:
      'Ahlus Sunnah menetapkan seluruh nama dan sifat yang telah Allah tetapkan bagi diri-Nya atau ditetapkan oleh Rasulullah ﷺ dalam hadis shahih sesuai makna zhahir yang layak bagi keagungan-Nya — tanpa tahrif (mengubah makna), tanpa ta’thil (menolak/mengingkari), tanpa takyif (menanyakan bagaimana bentuk hakikatnya), dan tanpa tamtsil (menyerupakan Allah dengan makhluk).',
    explanationEn:
      'Ahlus Sunnah affirm every name and attribute Allah revealed about Himself without distortion (tahrif), denial (ta’til), asking "how" (takyif), or likening Allah to creation (tamthil).',
    dalilSource: 'QS. Asy-Syura ayat 11 & Al-Aqidah Al-Wasithiyyah',
    dalilStatus: 'Al-Quran',
    dalilText:
      '“Tidak ada sesuatu pun yang serupa dengan Dia, dan Dia-lah Yang Maha Mendengar lagi Maha Melihat.” (QS. Asy-Syura: 11).',
    dalilTextEn:
      '"There is nothing whatsoever like unto Him, and He is the All-Hearing, the All-Seeing." (Quran 42:11).',
    tafsir:
      'Imam Malik rahimahullah ketika ditanya tentang bersemayamnya Allah di atas ‘Arsy (QS. Thaha: 5) menjawab dengan kaidah abadi: “Istiwa’ itu maklum (diketahui maknanya), kaifiyat-nya majhul (tidak diketahui hakikat caranya), mengimaninya adalah wajib, dan menanyakan ‘bagaimana’-nya adalah bid’ah.”',
    tafsirEn:
      'When asked about Allah rising above the Throne (Quran 20:5), Imam Malik gave the timeless rule: "Its meaning is known, its exact manner is unknown, believing in it is obligatory, and asking how it occurs is an innovation."',
  },
  {
    id: 'akidah-4',
    order: 4,
    categoryLabelId: 'Alam Kubur & Akhirat',
    categoryLabelEn: 'Grave & Hereafter',
    titleId: 'Iman kepada Nikmat & Azab Kubur serta Keadilan Hari Akhir',
    titleEn: 'Belief in Trials of the Grave & Final Judgment',
    explanationId:
      'Termasuk pokok akidah yang disepakati ulama Ahlus Sunnah adalah meyakini pertanyaan dua malaikat (Munkar dan Nakir) di alam barzakh, adanya nikmat kubur bagi mukmin dan azab kubur bagi orang kafir serta sebagian pelaku maksiat, kebangkitan jasad dan ruh, telaga Nabi ﷺ (Al-Kautsar), timbangan amal (Mizan), jembatan Shirath di atas neraka Jahannam, syafaat Rasulullah ﷺ bagi ahli tauhid, serta kekekalan surga dan neraka.',
    explanationEn:
      'Core creed affirms questioning in the grave, bliss or punishment in the barzakh, physical resurrection, the Prophet’s Fountain, the Scale of Deeds, the Sirat bridge, Prophetic intercession for monotheists, and eternal Paradise and Hellfire.',
    dalilSource: 'Shahih Al-Bukhari no. 1374 & Shahih Muslim no. 2867, 2870',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Nabi ﷺ selalu memohon perlindungan dalam tasyahud akhir sholat: “Ya Allah, aku berlindung kepada-Mu dari azab Jahannam, dari azab kubur, dari fitnah kehidupan dan kematian, serta dari keburukan fitnah Al-Masih Dajjal.” (HR. Muslim no. 588).',
    dalilTextEn:
      'The Prophet ﷺ consistently sought refuge in his final tashahhud: "O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil trial of the False Messiah." (Muslim no. 588).',
    tafsir:
      'Meyakini alam kubur dan hari pembalasan secara mendalam melahirkan kontrol diri (muraqabah) yang kuat serta menjadikan seorang mukmin bersegera menyiapkan bekal amal shalih.',
    tafsirEn:
      'Deep conviction in the barzakh and Day of Recompense nurtures constant mindfulness of Allah (muraqabah) and urgency in preparing righteous deeds.',
  },
];

// ==========================================
// 5. TAUHID (TIGA PILAR & KEUTAMAANNYA)
// ==========================================
export const TAUHID_TOPICS: SunnahTopicEntry[] = [
  {
    id: 'tauhid-1',
    order: 1,
    categoryLabelId: 'Pilar Pertama · Tauhid Rububiyah',
    categoryLabelEn: 'First Pillar · Lordship (Rububiyah)',
    titleId: 'Mengesakan Allah Sebagai Satu-Satunya Pencipta, Pemilik & Pengatur Alam',
    titleEn: 'Affirming Allah Alone as Creator, Sovereign & Sustainer',
    explanationId:
      'Tauhid Rububiyah berarti meyakini sepenuhnya bahwa hanya Allah Taala satu-satunya yang mencipta, memberi rezeki, menghidupkan, mematikan, dan mengatur seluruh urusan alam semesta tanpa sekutu. Namun mengakui Rububiyah saja belum cukup menjadikan seseorang muslim sejati sebelum diikuti dengan mengesakan Allah dalam ibadah (Uluhiyah).',
    explanationEn:
      'Tauhid ar-Rububiyah affirms that Allah alone creates, provides, gives life and death, and governs the universe. Yet acknowledging Lordship alone is incomplete unless paired with worshipping Him alone.',
    dalilSource: 'QS. Az-Zumar ayat 62 & QS. Yunus ayat 31',
    dalilStatus: 'Al-Quran',
    dalilText:
      '“Allah menciptakan segala sesuatu dan Dia memelihara segala sesuatu.” (QS. Az-Zumar: 62). Dan dalam QS. Yunus: 31 Allah menjelaskan bahwa kaum musyrikin dahulu pun mengakui bahwa Allah yang memberi rezeki serta mengatur alam semesta, namun mereka tetap menyekutukan-Nya dalam berdoa dan beribadah.',
    dalilTextEn:
      '"Allah is the Creator of all things, and He is, over all things, Disposer of affairs." (Quran 39:62). And in Surah Yunus (10:31), Allah points out that even the ancient polytheists acknowledged Allah as Provider and Sustainer yet wrongly associated partners with Him in worship.',
    tafsir:
      'Pemahaman Tauhid Rububiyah melahirkan ketawakalan total, sebab tidak ada satu daun pun yang gugur maupun manfaat dan mudarat yang terjadi kecuali dengan izin Allah Taala.',
    tafsirEn:
      'True realization of Lordship produces complete reliance on Allah, knowing that not a single leaf falls and no benefit or harm touches anyone except by His permission.',
  },
  {
    id: 'tauhid-2',
    order: 2,
    categoryLabelId: 'Pilar Kedua · Tauhid Uluhiyah (Inti Dakwah Para Rasul)',
    categoryLabelEn: 'Second Pillar · Worship (Uluhiyah)',
    titleId: 'Memurnikan Seluruh Ibadah Hanya untuk Allah Semata',
    titleEn: 'Devoting All Acts of Worship Exclusively to Allah',
    arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    latinText: 'Iyyāka na‘budu wa iyyāka nasta‘īn.',
    explanationId:
      'Tauhid Uluhiyah (Tauhid Ibadah) adalah inti dakwah seluruh Nabi dan Rasul: mengesakan Allah dalam segala bentuk penghambaan—seperti sholat, doa, istighatsah (memohon pertolongan dalam hal ghaib), penyembelihan hewan kurban, nadzar, rasa cinta tertinggi, takut, harap, dan tawakal. Memalingkan satu saja dari ibadah ini kepada selain Allah (kuburan, jimat, dukun, atau makhluk lain) adalah kesyirikan besar yang membatalkan tauhid.',
    explanationEn:
      'Tauhid al-Uluhiyah is the core mission of all Prophets: dedicating prayer, supplication, sacrifice, vows, ultimate fear, hope, and reliance exclusively to Allah. Directing any act of worship to other than Allah constitutes major shirk.',
    dalilSource: 'QS. Al-Fatihah ayat 5 & QS. An-Nahl ayat 36',
    dalilStatus: 'Al-Quran',
    dalilText:
      '“Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.” (QS. Al-Fatihah: 5). “Dan sungguh Kami telah mengutus rasul pada tiap-tiap umat (untuk menyerukan): Sembahlah Allah saja, dan jauhilah thaghut.” (QS. An-Nahl: 36).',
    dalilTextEn:
      '"You alone we worship, and You alone we ask for help." (Quran 1:5). "And We certainly sent into every nation a messenger, saying: Worship Allah alone and avoid false deities (taghut)." (Quran 16:36).',
    tafsir:
      'Imam Ibnu Katsir menafsirkan QS. Al-Fatihah ayat 5 bahwa didahulukannya kata "Iyyaka" (Hanya kepada-Mu) berfungsi membatasi ibadah hanya untuk Allah semata serta membuang seluruh bentuk kemusyrikan.',
    tafsirEn:
      'Ibn Kathir notes that placing "You alone" (Iyyaka) at the beginning of the sentence in Al-Fatihah 1:5 grammatically restricts all worship exclusively to Allah and negates every partner.',
  },
  {
    id: 'tauhid-3',
    order: 3,
    categoryLabelId: 'Pilar Ketiga · Tauhid Asma wa Sifat',
    categoryLabelEn: 'Third Pillar · Names & Attributes',
    titleId: 'Mengimani Nama-Nama Indah (Al-Asma’ Al-Husna) dan Sifat Kesempurnaan Allah',
    titleEn: 'Believing in Allah’s Beautiful Names & Perfect Attributes',
    explanationId:
      'Mengesakan Allah dalam nama-nama-Nya yang Mahaindah dan sifat-sifat-Nya yang Mahatinggi sebagaimana termaktub dalam Al-Quran dan Hadis Shahih, serta berdoa kepada Allah dengan menyebut nama-nama tersebut (seperti Ya Rahman, Ya Ghaffar, Ya Hayyu Ya Qayyum) sembari meneladani pengaruh kebaikannya dalam akhlak.',
    explanationEn:
      'Affirming Allah’s Most Beautiful Names and Lofty Attributes as established in the Quran and authentic Sunnah, calling upon Him by them in supplication.',
    dalilSource: 'QS. Al-A’raf ayat 180 & Shahih Al-Bukhari no. 2736',
    dalilStatus: 'Al-Quran & Hadis Shahih',
    dalilText:
      'Allah Taala berfirman: "Hanya milik Allah nama-nama yang paling indah (Al-Asma’ Al-Husna), maka berdoalah kepada-Nya dengan menyebut nama-nama itu, dan tinggalkanlah orang-orang yang menyimpang dari kebenaran dalam memahami nama-nama-Nya; kelak mereka akan mendapat balasan atas apa yang telah mereka kerjakan." (QS. Al-A’raf: 180). Rasulullah ﷺ bersabda: "Sesungguhnya Allah memiliki sembilan puluh sembilan nama, seratus kurang satu; barang siapa menghafal, memahami, dan beribadah dengan konsekuensinya, niscaya ia masuk surga." (HR. Bukhari no. 2736 & Muslim no. 2677).',
    dalilTextEn:
      'Allah says: "To Allah belong the Most Beautiful Names, so invoke Him by them and leave those who deviate concerning His names; they will be recompensed for what they have been doing." (Quran 7:180). And the Prophet ﷺ said: "Allah has ninety-nine names, one hundred minus one; whoever enumerates and lives by them enters Paradise." (Al-Bukhari no. 2736 & Muslim no. 2677).',
    tafsir:
      'Imam Ibnul Qayyim menerangkan bahwa semakin mengenal nama dan sifat Allah dengan benar, semakin tinggi pula rasa cinta, khasyah (takut yang agung), dan ketenangan hati seorang hamba.',
    tafsirEn:
      'Ibn al-Qayyim explains that the deeper a servant truly knows Allah’s Names and Attributes, the stronger their love, reverent awe, and tranquility become.',
  },
  {
    id: 'tauhid-4',
    order: 4,
    categoryLabelId: 'Keutamaan Tauhid & Bahaya Syirik',
    categoryLabelEn: 'Virtues of Tauhid & Danger of Shirk',
    titleId: 'Hak Allah Atas Hamba-Nya & Dosa Syirik yang Wajib Dijauhi',
    titleEn: 'Allah’s Right Over Servants & Guarding Against Shirk',
    explanationId:
      'Keutamaan tauhid sangat agung: ia menjadi sebab terampuninya dosa, rasa aman di dunia dan akhirat, serta kunci utama masuk surga dengan rahmat Allah. Sebaliknya, syirik adalah kezaliman terbesar dan satu-satunya dosa yang tidak diampuni apabila pelakunya wafat sebelum bertaubat. Kita pun wajib mewaspadai syirik kecil seperti riya’ (beribadah agar dipuji manusia) dan bersumpah dengan nama selain Allah.',
    explanationEn:
      'Pure Tauhid brings forgiveness, ultimate security, and entry into Paradise, whereas major shirk is unforgivable if one dies without repentance. Believers must also guard against minor shirk such as showing off (riya’).',
    dalilSource: 'Shahih Al-Bukhari no. 2856 · Shahih Muslim no. 30 & QS. An-Nisa ayat 48',
    dalilStatus: "Al-Quran & Muttafaqun 'Alaih",
    dalilText:
      'Nabi ﷺ bersabda kepada Mu’adz bin Jabal radhiyallahu anhu: “Hak Allah atas para hamba adalah mereka menyembah-Nya dan tidak menyekutukan-Nya dengan sesuatu pun; sedangkan hak hamba atas Allah adalah Dia tidak akan mengazab siapa yang tidak menyekutukan-Nya.” (HR. Bukhari 2856 & Muslim 30). Allah berfirman: “Sesungguhnya Allah tidak akan mengampuni dosa syirik, dan Dia mengampuni dosa selain itu bagi siapa yang dikehendaki-Nya.” (QS. An-Nisa: 48).',
    dalilTextEn:
      'The Prophet ﷺ asked Mu’adh ibn Jabal: "Allah’s right upon His servants is that they worship Him alone and associate nothing with Him; and the servants’ right upon Allah is that He will not punish anyone who associates nothing with Him." (Al-Bukhari 2856 & Muslim 30). And Allah says: "Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills." (Quran 4:48).',
    tafsir:
      'Karena besarnya bahaya syirik, Nabi Ibrahim alaihissalam saja berdoa agar diri dan keturunannya dijauhkan dari penyembahan berhala (QS. Ibrahim: 35), dan Nabi ﷺ mengajarkan doa perlindungan dari syirik setiap pagi dan petang (HR. Ahmad no. 19606 · Shahih).',
    tafsirEn:
      'Because of shirk’s severity, even Prophet Ibrahim prayed to be kept away from idol worship (Quran 14:35), and Prophet Muhammad ﷺ taught daily supplications seeking refuge from both visible and hidden shirk (Ahmad no. 19606).',
  },
];
