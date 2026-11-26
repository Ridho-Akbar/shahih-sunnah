import type {
  BlogPost,
  Category,
  Hadith,
  ScholarFigure,
  SunnahGuideItem,
  Zikir,
} from '../lib/validations/content.ts';

const nowIso = new Date('2026-11-22T06:00:00.000Z').toISOString();

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Perlindungan & Tauhid', nameEn: 'Protection & Tauhid', slug: 'perlindungan-tauhid', createdAt: nowIso },
  { id: 2, name: 'Syukur & Tawakal', nameEn: 'Gratitude & Reliance', slug: 'syukur-tawakal', createdAt: nowIso },
  { id: 3, name: 'Akidah & Niat', nameEn: 'Creed & Intention', slug: 'akidah-niat', createdAt: nowIso },
  { id: 4, name: 'Ibadah & Zikir', nameEn: 'Worship & Dhikr', slug: 'ibadah-zikir', createdAt: nowIso },
  { id: 5, name: 'Akhlak & Adab', nameEn: 'Character & Etiquette', slug: 'akhlak-adab', createdAt: nowIso },
];

export const INITIAL_ZIKRS: Zikir[] = [
  {
    id: 1,
    categoryId: 1,
    title: 'Ayat Kursi (Perlindungan Pagi)',
    titleEn: 'Ayat al-Kursi (Morning Protection)',
    arabicText:
      'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
    latinText:
      "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhū sinatuw wa lā naum, lahū mā fis-samāwāti wa mā fil-arḍ, man żallażī yasyfa'u 'indahū illā bi'iżnih, ya'lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai'im min 'ilmihī illā bimā syā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa huwal-'aliyyul-'aẓīm.",
    translation:
      'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar.',
    translationEn:
      'Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    reference: 'QS. Al-Baqarah: 255 · HR. Al-Hakim (1/562)',
    dalilSource: 'QS. Al-Baqarah: 255 & HR. An-Nasai dalam As-Sunan Al-Kubra no. 9928 / Al-Hakim 1/562',
    dalilStatus: 'Al-Quran Al-Karim · Hadis Dishahihkan Al-Albani',
    dalilText:
      'Dari Ubay bin Ka’ab radhiyallahu anhu, ia berkata bahwa jin berkata kepadanya: "Siapa yang membacanya (Ayat Kursi) pada waktu pagi, ia dilindungi dari kami hingga petang; dan siapa yang membacanya pada waktu petang, ia dilindungi dari kami hingga pagi." Kemudian Ubay datang kepada Nabi ﷺ dan menceritakan hal itu, lalu Nabi ﷺ bersabda: "Makhluk buruk itu berkata benar." (HR. An-Nasai dalam Al-Kubra 6/239, Ath-Thabarani, Al-Hakim 1/562; dishahihkan Al-Albani dalam Shahih At-Targhib no. 662).',
    dalilTextEn:
      'Ubayy ibn Ka’b narrated that a jinn told him: "Whoever recites Ayat al-Kursi in the morning is protected from us until evening, and whoever recites it in the evening is protected until morning." When Ubayy told the Prophet ﷺ, he replied: "The wicked one spoke the truth." (An-Nasa’i, Al-Hakim 1/562; authenticated by Al-Albani).',
    tafsir:
      'Imam Ibnu Katsir rahimahullah menjelaskan bahwa Ayat Kursi adalah ayat paling agung dalam Al-Quran karena menghimpun sepuluh kalimat tauhid yang menetapkan kesempurnaan hidup Allah (Al-Hayyu), kesempurnaan pengurusan-Nya atas seluruh makhluk (Al-Qayyum), keluasan ilmu-Nya, dan kebesaran Kursi-Nya. Syaikh Abdurrahman As-Sa’di rahimahullah menambahkan bahwa membaca dan menghayati ayat ini menanamkan ketergantungan total hati kepada Allah semata sehingga hati merasa aman dari gangguan makhluk.',
    tafsirEn:
      'Imam Ibn Kathir explains that Ayat al-Kursi is the greatest verse in the Quran because it unites ten declarations of pure monotheism affirming Allah’s eternal life, complete governance, boundless knowledge, and majesty—instilling serenity and complete reliance upon Him.',
    repeatCount: 1,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Sayyidul Istighfar (Pagi)',
    titleEn: 'Sayyidul Istighfar (Morning)',
    arabicText:
      'اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latinText:
      "Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa ana 'abduka, wa ana 'alā 'ahdika wa wa'dika mastaṭa'tu, a'ūżu bika min syarri mā ṣana'tu, abū'u laka bini'matika 'alayya, wa abū'u biżanbī fagfir lī fa'innahū lā yagfiruż-żunūba illā anta.",
    translation:
      'Ya Allah, Engkau adalah Rabbku, tidak ada sesembahan yang berhak disembah selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku menetapi perjanjian-Mu dan janji-Mu sesuai kemampuanku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tidak ada yang mengampuni dosa-dosa selain Engkau.',
    translationEn:
      'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
    reference: 'HR. Bukhari no. 6306',
    dalilSource: 'Shahih Al-Bukhari no. 6306 (Kitab Ad-Da’awat)',
    dalilStatus: 'Shahih (Muttafaq alaih pada pokoknya / Bukhari)',
    dalilText:
      'Dari Syaddad bin Aus radhiyallahu anhu, Nabi ﷺ bersabda bahwa penghulu istighfar ialah ucapan seorang hamba: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana ala ahdika wa wa’dika mastatha’tu, a’udzu bika min syarri ma shana’tu, abu’u laka bini’matika alayya, wa abu’u bidzanbi faghfir li fa innahu la yaghfirudz-dzunuba illa anta." Siapa yang membacanya di siang hari dengan penuh keyakinan lalu wafat sebelum sore hari, ia termasuk penghuni surga.',
    dalilTextEn:
      'Shaddad ibn Aws narrated that the Prophet ﷺ taught Sayyidul Istighfar (the Master Supplication for Forgiveness) and said: "Whoever recites it during the day with firm conviction and dies before evening enters Paradise; and whoever recites it at night with firm conviction and dies before morning enters Paradise." (Al-Bukhari no. 6306).',
    tafsir:
      'Al-Hafizh Ibnu Hajar Al-Asqalani dalam Fathul Bari menjelaskan bahwa doa ini disebut Sayyidul Istighfar (penghulu permohonan ampun) karena menghimpun seluruh adab penghambaan: pengakuan tauhid rububiyah dan uluhiyah, pengakuan keterbatasan amal ("sesuai kemampuanku"), syukur atas nikmat Allah, serta pengakuan tulus atas dosa sebelum memohon ampunan.',
    tafsirEn:
      'Ibn Hajar Al-Asqalani notes in Fathul Bari that it is called the Master of Istighfar because it combines servitude’s core pillars: affirming Allah’s Lordship and sole right to worship, acknowledging human limitation, gratitude for blessings, and honest confession of sin.',
    repeatCount: 1,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 3,
    categoryId: 2,
    title: 'Zikir Memasuki Waktu Pagi',
    titleEn: 'Supplication Upon Entering Morning',
    arabicText:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ، وَالْحَمْدُ لِلّٰهِ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
    latinText:
      "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli syai'in qadīr. Rabbi as'aluka khaira mā fī hāżal-yaumi wa khaira mā ba'dah, wa a'ūżu bika min syarri mā fī hāżal-yaumi wa syarri mā ba'dah.",
    translation:
      'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan bagi-Nya pujian, dan Dia Mahakuasa atas segala sesuatu. Wahai Rabbku, aku memohon kepada-Mu kebaikan hari ini dan kebaikan sesudahnya, serta aku berlindung kepada-Mu dari keburukan hari ini dan keburukan sesudahnya.',
    translationEn:
      'We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise, and He is Omnipotent over all things. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it.',
    reference: 'HR. Muslim no. 2723',
    dalilSource: 'Shahih Muslim no. 2723 (Kitab Adz-Dzikr wad-Du’a)',
    dalilStatus: 'Shahih',
    dalilText:
      'Abdullah bin Mas’ud radhiyallahu anhu menuturkan bahwa apabila memasuki waktu pagi, Nabi ﷺ membaca secara utuh: "Ashbahna wa ashbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la syarika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli syai’in qadir. Rabbi as’aluka khaira ma fi hadzal-yaumi wa khaira ma ba’dahu, wa a’udzu bika min syarri ma fi hadzal-yaumi wa syarri ma ba’dahu, rabbi a’udzu bika minal-kasali wa su’il-kibar, rabbi a’udzu bika min adzabin fin-nari wa adzabin fil-qabr." (HR. Muslim no. 2723).',
    dalilTextEn:
      'Abdullah ibn Mas’ud reported that whenever morning arrived, the Prophet ﷺ would recite this complete supplication asking Allah for the goodness of the day ahead and seeking refuge from laziness, decrepit old age, and torment of the Fire and grave (Muslim no. 2723).',
    tafsir:
      'Imam An-Nawawi dalam Syarah Shahih Muslim menerangkan bahwa memulai pagi dengan kalimat "Al-Mulku Lillah" menanamkan kesadaran bahwa seluruh alam beserta waktu yang akan dilalui berada dalam kekuasaan dan pengaturan Allah, sehingga seorang hamba tidak bersandar pada kekuatannya sendiri.',
    tafsirEn:
      'Imam An-Nawawi explains that beginning the day by affirming all sovereignty belongs to Allah instills awareness that every moment unfolds under His dominion rather than our own strength.',
    repeatCount: 1,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 4,
    categoryId: 1,
    title: 'Perlindungan dari Segala Mudarat (Pagi)',
    titleEn: 'Protection From All Harm (Morning)',
    arabicText:
      'بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',
    latinText:
      "Bismillāhillażī lā yaḍurru ma'asmihī syai'un fil-arḍi wa lā fis-samā'i wa huwas-samī'ul-'alīm.",
    translation:
      'Dengan nama Allah yang tidak akan membahayakan bersama nama-Nya sesuatu pun di bumi maupun di langit, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    translationEn:
      'In the name of Allah with whose name nothing can cause harm on earth nor in heaven, and He is the All-Hearing, the All-Knowing.',
    reference: 'HR. Abu Dawud no. 5088 & Tirmidzi no. 3388',
    dalilSource: 'Sunan Abu Dawud no. 5088, Jami’ At-Tirmidzi no. 3388, Ibnu Majah no. 3869',
    dalilStatus: 'Hasan Shahih (Dishahihkan Al-Albani)',
    dalilText:
      'Utsman bin Affan radhiyallahu anhu berkata, Rasulullah ﷺ bersabda: "Tidaklah seorang hamba mengucapkan pada pagi setiap hari dan petang setiap malam: Bismillahilladzi la yadhurru ma’asmihi syai’un fil ardhi wa la fis sama’i wa huwas sami’ul alim sebanyak tiga kali, melainkan tidak akan ada sesuatu pun yang membahayakannya."',
    dalilTextEn:
      'Uthman ibn Affan narrated that the Messenger of Allah ﷺ said: "No servant says three times in the morning of every day and evening of every night: Bismillahilladzi la yadhurru ma’asmihi syai’un fil ardhi wa la fis sama’i wa huwas sami’ul alim, except that nothing will harm him." (Abu Dawud no. 5088 & At-Tirmidhi no. 3388).',
    tafsir:
      'Para ulama menjelaskan bahwa siapa pun yang berlindung dengan menyebut nama Allah dengan keyakinan penuh, maka Allah menjaga dirinya baik dari bahaya yang datang dari bumi (musibah, hewan berbisa, kejahatan manusia) maupun dari langit.',
    tafsirEn:
      'Scholars explain that seeking refuge in Allah’s Names with firm conviction protects the believer from both earthly calamities and heavenly afflictions.',
    repeatCount: 3,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 5,
    categoryId: 2,
    title: 'Ridha kepada Allah, Islam, dan Rasul-Nya (Pagi)',
    titleEn: 'Contentment With Allah, Islam & His Messenger (Morning)',
    arabicText:
      'رَضِيْتُ بِاللّٰهِ رَبًّا، وَبِالْإِسْلَامِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latinText: "Raḍītu billāhi rabbā, wa bil-islāmi dīnā, wa bimuḥammadin ṣallallāhu 'alaihi wa sallama nabiyyā.",
    translation:
      'Aku ridha Allah sebagai Rabbku, Islam sebagai agamaku, dan Nabi Muhammad shallallahu alaihi wa sallam sebagai nabiku.',
    translationEn:
      'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.',
    reference: 'HR. Abu Dawud no. 5072 & Ahmad 4/337',
    dalilSource: 'Musnad Ahmad 4/337, Sunan Abu Dawud no. 5072, An-Nasai dalam Al-Kubra no. 9831',
    dalilStatus: 'Hasan (Dinilai Hasan oleh Ibnu Baz & Al-Arna’uth)',
    dalilText:
      'Dari Al-Munaydzir sahabat Nabi ﷺ, Rasulullah ﷺ bersabda: "Barang siapa mengucapkan ketika masuk waktu pagi: Radhitu billahi rabba, wa bil islami dina, wa bi Muhammadin nabiyya, maka aku penjaminnya akan memegang tangannya hingga memasukkannya ke dalam surga." Dalam riwayat Tsauban di Ahmad dan Abu Dawud dibaca 3 kali pagi dan petang.',
    dalilTextEn:
      'The Messenger of Allah ﷺ promised that whoever says three times in the morning and evening that they are pleased with Allah as Lord, Islam as religion, and Muhammad ﷺ as Prophet will attain Allah’s pleasure on the Day of Resurrection (Ahmad 4/337, Abu Dawud no. 5072).',
    tafsir:
      'Kalimat ini merupakan ikrar tiga pokok landasan iman seorang mukmin (mengenal Allah, mengenal agama Islam, dan mengenal Nabi Muhammad ﷺ). Mengucapkannya setiap pagi memperbarui kerelaan hati menerima seluruh syariat Islam.',
    tafsirEn:
      'This pledge renews the three core foundations of faith: knowing Allah, embracing Islam with contentment, and following Prophet Muhammad ﷺ.',
    repeatCount: 3,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 6,
    categoryId: 2,
    title: 'Tasbih dan Tahmid Harian (Pagi)',
    titleEn: 'Daily Tasbih and Tahmid (Morning)',
    arabicText: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ',
    latinText: 'Subḥānallāhi wa biḥamdih.',
    translation: 'Mahasuci Allah dan segala puji hanya bagi-Nya.',
    translationEn: 'Glory be to Allah and all praise is due to Him.',
    reference: 'HR. Muslim no. 2692',
    dalilSource: 'Shahih Muslim no. 2692',
    dalilStatus: 'Shahih',
    dalilText:
      'Dari Abu Hurairah radhiyallahu anhu, Rasulullah ﷺ bersabda: "Barang siapa mengucapkan di waktu pagi dan di waktu petang: Subhanallahi wa bihamdihi seratus kali, maka tidak ada seorang pun pada hari kiamat yang membawa amalan lebih utama dari apa yang ia bawa, kecuali orang yang mengucapkan seperti itu atau melebihinya."',
    dalilTextEn:
      'Abu Hurairah narrated that the Prophet ﷺ said: "Whoever says Subhanallahi wa bihamdihi one hundred times in the morning and evening, none will bring anything better on the Day of Resurrection except someone who said the same or more." (Muslim no. 2692).',
    tafsir:
      'Menggabungkan tasbih (menyucikan Allah dari segala kekurangan) dan tahmid (menetapkan seluruh pujian dan kesempurnaan bagi Allah) dengan jumlah 100 kali merupakan amalan ringan namun berpahala besar.',
    tafsirEn:
      'Combining Tasbih (declaring Allah free of any imperfection) and Tahmid (affirming all praise belongs to Him) a hundred times is light on the tongue yet immense in reward.',
    repeatCount: 100,
    timeOfDay: 'pagi',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 7,
    categoryId: 1,
    title: 'Ayat Kursi (Perlindungan Petang)',
    titleEn: 'Ayat al-Kursi (Evening Protection)',
    arabicText:
      'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
    latinText:
      "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhū sinatuw wa lā naum, lahū mā fis-samāwāti wa mā fil-arḍ, man żallażī yasyfa'u 'indahū illā bi'iżnih, ya'lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai'im min 'ilmihī illā bimā syā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa huwal-'aliyyul-'aẓīm.",
    translation:
      'Allah, tiada sesembahan yang berhak disembah selain Dia, Yang Mahahidup dan terus-menerus mengurus seluruh makhluk-Nya; tidak pernah mengantuk dan tidak pula tidur. Milik-Nya segala apa yang berada di langit maupun di bumi. Tiada seorang pun mampu memberi syafaat di sisi-Nya kecuali dengan izin-Nya. Dia mengetahui segala yang ada di hadapan mereka dan di belakang mereka, sementara mereka tidak mengetahui sedikit pun dari ilmu-Nya melainkan sebatas yang Dia kehendaki. Kursi-Nya terbentang meliputi seluruh langit dan bumi, tidak terasa berat bagi-Nya memelihara keduanya, dan Dia Mahatinggi lagi Mahaagung.',
    translationEn:
      'Allah — none has the right to be worshipped except Him, the Ever-Living, the Sustainer of all creation. Neither drowsiness nor sleep overtakes Him. Everything in the heavens and on earth belongs to Him. None can intercede with Him unless He grants permission. He knows everything ahead of them and behind them, while they grasp none of His knowledge except what He wills. His Kursi encompasses the heavens and the earth, preserving both never tires Him, and He is the Most High, the Supreme.',
    reference: 'QS. Al-Baqarah: 255 · HR. Al-Hakim (1/562)',
    dalilSource: 'QS. Al-Baqarah: 255 & HR. Al-Hakim 1/562',
    dalilStatus: 'Al-Quran Al-Karim · Hadis Dishahihkan Al-Albani',
    dalilText:
      'Rasulullah ﷺ membenarkan keterangan bahwa siapa yang membaca Ayat Kursi ketika memasuki waktu petang, maka Allah menjaganya dari gangguan setan hingga memasuki waktu pagi.',
    dalilTextEn:
      'The Prophet ﷺ confirmed that whoever recites Ayat al-Kursi when evening enters is guarded by Allah against harm from devils until morning breaks (An-Nasa’i, Al-Hakim 1/562).',
    tafsir:
      'Ayat Kursi di waktu petang menjadi penjagaan spiritual selama malam hari, karena pada malam hari keburukan dan gangguan setan lebih banyak menyebar.',
    tafsirEn:
      'Reciting Ayat al-Kursi in the evening serves as spiritual fortification throughout the night.',
    repeatCount: 1,
    timeOfDay: 'petang',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 8,
    categoryId: 2,
    title: 'Zikir Memasuki Waktu Petang',
    titleEn: 'Supplication Upon Entering Evening',
    arabicText:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ، وَالْحَمْدُ لِلّٰهِ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا',
    latinText:
      "Amsainā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli syai'in qadīr. Rabbi as'aluka khaira mā fī hāżihil-lailati wa khaira mā ba'dahā, wa a'ūżu bika min syarri mā fī hāżihil-lailati wa syarri mā ba'dahā.",
    translation:
      'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan bagi-Nya pujian, dan Dia Mahakuasa atas segala sesuatu. Wahai Rabbku, aku memohon kepada-Mu kebaikan malam ini dan kebaikan sesudahnya, serta aku berlindung kepada-Mu dari keburukan malam ini dan keburukan sesudahnya.',
    translationEn:
      'We have entered the evening and all sovereignty belongs to Allah; all praise is for Allah. None deserves worship except Allah alone without any partner; to Him belong sovereignty and all praise, and He has power over every single thing. My Lord, I ask You for the goodness within this night and the goodness following it, and I seek Your protection from the evil within this night and the evil following it.',
    reference: 'HR. Muslim no. 2723',
    dalilSource: 'Shahih Muslim no. 2723',
    dalilStatus: 'Shahih',
    dalilText:
      'Abdullah bin Mas’ud radhiyallahu anhu meriwayatkan bahwa setiap kali memasuki sore hari, Nabi ﷺ membaca: "Amsaina wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la syarika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli syai’in qadir. Rabbi as’aluka khaira ma fi hadzihil-lailati wa khaira ma ba’daha, wa a’udzu bika min syarri ma fi hadzihil-lailati wa syarri ma ba’daha, rabbi a’udzu bika minal-kasali wa su’il-kibar, rabbi a’udzu bika min adzabin fin-nari wa adzabin fil-qabr." (HR. Muslim no. 2723).',
    dalilTextEn:
      'Abdullah ibn Mas’ud narrated that every evening the Prophet ﷺ would recite this complete evening remembrance praising Allah’s sole sovereignty and asking for the goodness of the night and safety from evil (Muslim no. 2723).',
    tafsir:
      'Sebagaimana di waktu pagi, pergantian menuju malam diiringi dengan pengakuan tauhid serta permohonan kebaikan malam (ketenangan, ibadah malam, perlindungan dari gangguan malam).',
    tafsirEn:
      'Just like the morning transition, entering evening begins by affirming Allah’s sovereignty and seeking peace and protection through the night.',
    repeatCount: 1,
    timeOfDay: 'petang',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 9,
    categoryId: 1,
    title: 'Sayyidul Istighfar (Petang)',
    titleEn: 'Sayyidul Istighfar (Evening)',
    arabicText:
      'اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latinText:
      "Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa ana 'abduka, wa ana 'alā 'ahdika wa wa'dika mastaṭa'tu, a'ūżu bika min syarri mā ṣana'tu, abū'u laka bini'matika 'alayya, wa abū'u biżanbī fagfir lī fa'innahū lā yagfiruż-żunūba illā anta.",
    translation:
      'Ya Allah, Engkau adalah Rabbku, tidak ada sesembahan yang berhak disembah selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku menetapi perjanjian-Mu dan janji-Mu sesuai kemampuanku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tidak ada yang mengampuni dosa-dosa selain Engkau.',
    translationEn:
      'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I uphold Your covenant and promise as best as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me and confess my sins, so forgive me, for surely none forgives sins except You.',
    reference: 'HR. Bukhari no. 6306',
    dalilSource: 'Shahih Al-Bukhari no. 6306',
    dalilStatus: 'Shahih',
    dalilText:
      'Rasulullah ﷺ bersabda: "Barang siapa mengucapkannya pada waktu malam dengan penuh keyakinan, lalu ia meninggal sebelum pagi hari, maka ia termasuk penghuni surga." (HR. Bukhari no. 6306).',
    dalilTextEn:
      'The Prophet ﷺ said: "Whoever recites it at night with firm conviction and dies before morning breaks is among the people of Paradise." (Al-Bukhari no. 6306).',
    tafsir:
      'Menutup aktivitas harian dengan istighfar agung ini membersihkan catatan amal seharian dan menenangkan jiwa sebelum tidur.',
    tafsirEn:
      'Closing the day with this master supplication for forgiveness purifies one’s record and brings peace before sleep.',
    repeatCount: 1,
    timeOfDay: 'petang',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 10,
    categoryId: 1,
    title: 'Perlindungan Malam dari Kejahatan Makhluk',
    titleEn: 'Evening Refuge From Evil of Creation',
    arabicText: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latinText: "A'ūżu bikalimātillāhit-tāmmāti min syarri mā khalaq.",
    translation:
      'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa saja yang Dia ciptakan.',
    translationEn: 'I seek refuge in the perfect words of Allah from the evil of whatever He has created.',
    reference: 'HR. Muslim no. 2708',
    dalilSource: 'Shahih Muslim no. 2709 & Sunan At-Tirmidzi no. 3604',
    dalilStatus: 'Shahih',
    dalilText:
      'Dari Abu Hurairah radhiyallahu anhu, seorang lelaki datang kepada Nabi ﷺ mengeluhkan sengatan kalajengking semalam. Maka Nabi ﷺ bersabda: "Seandainya engkau membaca di waktu petang: A’udzu bikalimatillahit-tammati min syarri ma khalaq, niscaya tidak akan membahayakanmu." (HR. Muslim no. 2709).',
    dalilTextEn:
      'Abu Hurairah narrated that a man came to the Prophet ﷺ complaining of a scorpion sting the night before. The Prophet ﷺ said: "Had you recited in the evening: A’udhu bikalimatillahit-tammati min syarri ma khalaq, it would not have harmed you." (Muslim no. 2709).',
    tafsir:
      'Kalimat Allah yang sempurna mencakup kalam syar’i (Al-Quran) dan kalam kauni (ketetapan Allah yang pasti terjadi). Berlindung dengannya adalah bagian dari tauhid karena hanya Allah yang mampu menolak bahaya.',
    tafsirEn:
      'Allah’s perfect words encompass both His revealed revelation and His cosmic decrees; seeking protection through them is pure monotheism.',
    repeatCount: 3,
    timeOfDay: 'petang',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 11,
    categoryId: 2,
    title: 'Doa Memohon Keselamatan Dunia dan Akhirat (Petang)',
    titleEn: 'Seeking Well-Being in This World & Hereafter (Evening)',
    arabicText:
      'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ',
    latinText:
      "Allāhumma innī as'alukal-'afwa wal-'āfiyata fid-dunyā wal-ākhirah, allāhumma innī as'alukal-'afwa wal-'āfiyata fī dīnī wa dunyāya wa ahlī wa mālī.",
    translation:
      'Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku.',
    translationEn:
      'O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth.',
    reference: 'HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871',
    dalilSource: 'Sunan Abu Dawud no. 5074, Sunan Ibnu Majah no. 3871',
    dalilStatus: 'Shahih (Dishahihkan Al-Hakim & Al-Albani)',
    dalilText:
      'Ibnu Umar radhiyallahu anhuma menuturkan bahwa Rasulullah ﷺ tidak pernah meninggalkan doa keselamatan berikut ketika petang dan pagi: "Allahumma inni as’alukal-afwa wal-afiyata fid-dunya wal-akhirah, Allahumma inni as’alukal-afwa wal-afiyata fi dini wa dunyaya wa ahli wa mali, Allahummastur aurati wa amin rau’ati, Allahummahfazhni min baini yadayya wa min khalfi wa an yamini wa an syimali wa min fauqi, wa a’udzu bi’azhamatika an ughtala min tahti." (HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871).',
    dalilTextEn:
      'Ibn Umar narrated that the Messenger of Allah ﷺ never abandoned this comprehensive supplication morning and evening, asking Allah for pardon, security in faith, family, and wealth, concealing shortcomings, calming fears, and guarding from every direction (Abu Dawud no. 5074 & Ibn Majah no. 3871).',
    tafsir:
      'Al-‘Afwu berarti penghapusan dosa, sedangkan Al-‘Afiyah berarti perlindungan menyeluruh dari penyakit hati (syubhat dan syahwat) maupun ujian fisik serta keburukan keluarga dan harta.',
    tafsirEn:
      'Al-‘Afw denotes complete erasure of sins, while Al-‘Afiyah signifies total protection from spiritual doubts, desires, physical harm, and trials affecting family or livelihood.',
    repeatCount: 1,
    timeOfDay: 'petang',
    isPublished: true,
    createdAt: nowIso,
  },
  // Zikir Setelah Sholat
  {
    id: 12,
    categoryId: 4,
    title: 'Istighfar & Pembuka Zikir Setelah Salam',
    titleEn: 'Istighfar & Opening Dhikr After Prayer',
    arabicText:
      'أَسْتَغْفِرُ اللّٰهَ (٣×) اَللّٰهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latinText:
      'Astaghfirullāh (3x). Allāhumma antas-salām, wa minkas-salām, tabārakta yā żal-jalāli wal-ikrām.',
    translation:
      'Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Mahasejahtera, dan dari-Mu datang kesejahteraan. Mahaberkah Engkau, wahai Pemilik keagungan dan kemuliaan.',
    translationEn:
      'I seek forgiveness from Allah (3x). O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.',
    reference: 'HR. Muslim no. 591',
    dalilSource: 'Shahih Muslim no. 591',
    dalilStatus: 'Shahih',
    dalilText:
      'Tsauban radhiyallahu anhu berkata: "Adalah Rasulullah ﷺ apabila selesai dari sholatnya, beliau beristighfar tiga kali lalu membaca: Allahumma antas-salam wa minkas-salam, tabarakta ya dzal jalali wal ikram."',
    dalilTextEn:
      'Thawban narrated: "Whenever the Messenger of Allah ﷺ finished his prayer, he would seek forgiveness three times and say: O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor." (Muslim no. 591).',
    tafsir:
      'Para ulama menjelaskan hikmah istighfar segera setelah sholat adalah menutupi kekurangan kekhusyukan yang mungkin terjadi di dalam sholat, agar ibadah diterima secara sempurna.',
    tafsirEn:
      'Scholars note that seeking forgiveness immediately after prayer covers any shortcomings in focus or humility during prayer so that the worship is accepted completely.',
    repeatCount: 1,
    timeOfDay: 'setelah-sholat',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 13,
    categoryId: 4,
    title: 'Tasbih, Tahmid, dan Takbir Setelah Sholat',
    titleEn: 'Tasbih, Tahmid & Takbir After Prayer',
    arabicText: 'سُبْحَانَ اللّٰهِ، اَلْحَمْدُ لِلّٰهِ، اَللّٰهُ أَكْبَرُ',
    latinText: 'Subḥānallāh (33x), Alḥamdulillāh (33x), Allāhu akbar (33x).',
    translation:
      'Mahasuci Allah (33x), segala puji bagi Allah (33x), Allah Mahabesar (33x), lalu digenapkan keseratusnya dengan membaca La ilaha illallahu wahdahu la syarikalah.',
    translationEn:
      'Glory be to Allah (33x), all praise is for Allah (33x), Allah is the Greatest (33x), completed to one hundred with Tahlil.',
    reference: 'HR. Muslim no. 597',
    dalilSource: 'Shahih Muslim no. 597',
    dalilStatus: 'Shahih',
    dalilText:
      'Dari Abu Hurairah radhiyallahu anhu, Rasulullah ﷺ bersabda: "Barang siapa bertasbih kepada Allah setelah setiap sholat sebanyak 33 kali, bertahmid 33 kali, dan bertakbir 33 kali — jumlahnya 99 — lalu menggenapkan seratus dengan: La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu wa huwa ala kulli syai’in qadir, maka diampuni kesalahannya meskipun sebanyak buih di lautan."',
    dalilTextEn:
      'Abu Hurairah reported that the Messenger of Allah ﷺ said: "Whoever glorifies Allah after every obligatory prayer 33 times, praises Allah 33 times, and magnifies Allah 33 times—totaling 99—and completes one hundred with: La ilaha illallahu wahdahu la syarika lah..., will have his sins forgiven even if they are like the foam of the sea." (Muslim no. 597).',
    tafsir:
      'Imam An-Nawawi menjelaskan bahwa pengulangan 33 kali tiap kalimat merupakan batas syariat (tauqifiyah) yang dijanjikan ampunan dosa kecil meskipun sangat banyak.',
    tafsirEn:
      'Imam An-Nawawi explains that repeating each phrase 33 times is a divinely prescribed count carrying the promise of complete forgiveness of minor sins.',
    repeatCount: 33,
    timeOfDay: 'setelah-sholat',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 14,
    categoryId: 4,
    title: 'Penggenap Zikir Setelah Sholat & Tahlil',
    titleEn: 'Completion Tahlil After Obligatory Prayer',
    arabicText:
      'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ، اَللّٰهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    latinText:
      "Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli syai'in qadīr. Allāhumma lā māni'a limā a'ṭaita, wa lā mu'ṭiya limā mana'ta, wa lā yanfa'u żal-jaddi minkal-jadd.",
    translation:
      'Tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian, dan Dia Mahakuasa atas segala sesuatu. Ya Allah, tiada yang dapat menghalangi apa yang Engkau berikan, tiada yang dapat memberi apa yang Engkau tahan, dan kekayaan tidak bermanfaat bagi pemiliknya di hadapan siksa-Mu.',
    translationEn:
      'None has the right to be worshipped except Allah alone, without partner. To Him belongs sovereignty and praise, and He is over all things omnipotent. O Allah, none can withhold what You give, and none can give what You withhold.',
    reference: 'HR. Bukhari no. 844 & Muslim no. 593',
    dalilSource: 'Shahih Al-Bukhari no. 844 & Shahih Muslim no. 593',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Al-Mughirah bin Syu’bah radhiyallahu anhu menulis kepada Mu’awiyah bahwa setiap kali selesai mengucapkan salam pada sholat fardhu, Rasulullah ﷺ membaca: "La ilaha illallahu wahdahu la syarika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli syai’in qadir, Allahumma la mani’a lima a’thaita wa la mu’thiya lima mana’ta wa la yanfa’u dzal-jaddi minkal-jadd." (HR. Bukhari no. 844 & Muslim no. 593).',
    dalilTextEn:
      'Al-Mughirah ibn Shu’bah wrote to Mu’awiyah that whenever the Prophet ﷺ finished an obligatory prayer with salam, he would recite this declaration affirming that none can withhold what Allah grants nor save anyone by worldly status before Him (Al-Bukhari no. 844 & Muslim no. 593).',
    tafsir:
      'Ibnu Hajar menjelaskan kata "Al-Jadd" berarti kekayaan, kedudukan, dan nasib duniawi — semuanya tidak dapat menyelamatkan seseorang dari ketetapan Allah kecuali amal shalih.',
    tafsirEn:
      'Ibn Hajar clarifies that "Al-Jadd" refers to worldly wealth, rank, and fortune—none of which avail a person before Allah except sincere faith and righteous deeds.',
    repeatCount: 1,
    timeOfDay: 'setelah-sholat',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 15,
    categoryId: 1,
    title: 'Ayat Kursi Setelah Sholat Fardhu',
    titleEn: 'Ayat al-Kursi After Obligatory Prayer',
    arabicText:
      'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
    latinText:
      "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhū sinatuw wa lā naum, lahū mā fis-samāwāti wa mā fil-arḍ, man żallażī yasyfa'u 'indahū illā bi'iżnih, ya'lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai'im min 'ilmihī illā bimā syā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa huwal-'aliyyul-'aẓīm.",
    translation:
      'Allah, tiada sesembahan yang berhak disembah selain Dia, Yang Mahahidup dan terus-menerus mengurus seluruh makhluk-Nya; tidak mengantuk dan tidak pula tidur. Milik-Nya segala apa yang ada di langit maupun di bumi. Tiada siapa pun yang dapat memberi syafaat di sisi-Nya melainkan dengan izin-Nya. Dia mengetahui segala yang di hadapan dan di belakang mereka, sementara mereka tidak mengetahui sedikit pun ilmu-Nya selain yang Dia kehendaki. Kursi-Nya meliputi seluruh langit dan bumi, memelihara keduanya tiada berat bagi-Nya, dan Dia Mahatinggi lagi Mahaagung. (QS. Al-Baqarah: 255).',
    translationEn:
      'Allah — none has the right to be worshipped except Him, the Ever-Living, the Sustainer of all creation. Neither drowsiness nor sleep overtakes Him. All that is in the heavens and on earth belongs to Him. Who can intercede with Him except by His permission? He knows what lies before them and behind them, and they encompass nothing of His knowledge except what He wills. His Kursi spans the heavens and the earth, and guarding both never wearies Him; He is the Most High, the Supreme. (Quran 2:255).',
    reference: 'HR. An-Nasai dalam As-Sunan Al-Kubra no. 9928',
    dalilSource: 'As-Sunan Al-Kubra karya An-Nasai no. 9928 & Ath-Thabarani',
    dalilStatus: 'Shahih (Dishahihkan Ibnul Qayyim, Ibnu Abdil Hadi & Al-Albani)',
    dalilText:
      'Dari Abu Umamah radhiyallahu anhu, Rasulullah ﷺ bersabda: "Barang siapa membaca Ayat Kursi setiap selesai sholat wajib, maka tidak ada yang menghalanginya masuk surga melainkan kematian."',
    dalilTextEn:
      'Abu Umamah narrated that the Messenger of Allah ﷺ said: "Whoever recites Ayat al-Kursi immediately after every obligatory prayer, nothing stands between him and entering Paradise except death." (An-Nasa’i in As-Sunan Al-Kubra no. 9928).',
    tafsir:
      'Imam Ibnul Qayyim dalam Zadul Ma’ad menyebutkan bahwa mengamalkan Ayat Kursi setiap selesai sholat lima waktu merupakan sebab kokohnya tauhid seorang muslim hingga akhir hayatnya.',
    tafsirEn:
      'Ibn al-Qayyim mentions in Zad al-Ma’ad that reciting Ayat al-Kursi after every five daily prayers anchors pure monotheism in the heart until death.',
    repeatCount: 1,
    timeOfDay: 'setelah-sholat',
    isPublished: true,
    createdAt: nowIso,
  },
  // Zikir Umum (Tidak Terikat Waktu & Tanpa Batasan)
  {
    id: 16,
    categoryId: 4,
    title: 'Dua Kalimat Berat di Timbangan (Tanpa Batasan)',
    titleEn: 'Two Light Words Heavy on the Scale (Unlimited)',
    arabicText: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ، سُبْحَانَ اللّٰهِ الْعَظِيْمِ',
    latinText: 'Subḥānallāhi wa biḥamdih, subḥānallāhil-‘aẓīm.',
    translation: 'Mahasuci Allah dan segala puji bagi-Nya, Mahasuci Allah Yang Mahaagung.',
    translationEn: 'Glory be to Allah and praise Him; glory be to Allah the Almighty.',
    reference: 'HR. Bukhari no. 6406 & Muslim no. 2694',
    dalilSource: 'Shahih Al-Bukhari no. 6406 & Shahih Muslim no. 2694',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Abu Hurairah radhiyallahu anhu berkata, Rasulullah ﷺ bersabda: "Ada dua kalimat yang ringan di lisan, berat di timbangan amal, dan dicintai oleh Ar-Rahman: Subhanallahi wa bihamdihi, Subhanallahil Adzim."',
    dalilTextEn:
      'Abu Hurairah narrated that the Messenger of Allah ﷺ said: "Two phrases are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: Subhanallahi wa bihamdihi, Subhanallahil Adzim." (Al-Bukhari no. 6406 & Muslim no. 2694).',
    tafsir:
      'Hadis ini menjadi penutup kitab Shahih Al-Bukhari. Para pensyarah hadis menerangkan bahwa kedua kalimat ini adalah zikir mutlak yang boleh diperbanyak di setiap waktu dan keadaan tanpa batasan bilangan.',
    tafsirEn:
      'This narration concludes Sahih Al-Bukhari; scholars clarify these two phrases are unrestricted remembrances that can be repeated abundantly at any time.',
    repeatCount: 0,
    timeOfDay: 'umum',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 17,
    categoryId: 4,
    title: 'Al-Baqiyatus Shalihat — Empat Kalimat Mulia (Tanpa Batasan)',
    titleEn: 'Four Most Beloved Words to Allah (Unlimited)',
    arabicText: 'سُبْحَانَ اللّٰهِ، وَالْحَمْدُ لِلّٰهِ، وَلَا إِلٰهَ إِلَّا اللّٰهُ، وَاللّٰهُ أَكْبَرُ',
    latinText: 'Subḥānallāh, wal-ḥamdu lillāh, wa lā ilāha illallāh, wallāhu akbar.',
    translation:
      'Mahasuci Allah, segala puji bagi Allah, tiada sesembahan yang berhak disembah selain Allah, dan Allah Mahabesar.',
    translationEn:
      'Glory be to Allah, all praise is for Allah, there is no deity worthy of worship except Allah, and Allah is the Greatest.',
    reference: 'HR. Muslim no. 2137 & no. 2695',
    dalilSource: 'Shahih Muslim no. 2137 & no. 2695',
    dalilStatus: 'Shahih',
    dalilText:
      'Samurah bin Jundub radhiyallahu anhu meriwayatkan bahwa Rasulullah ﷺ bersabda: "Perkataan yang paling dicintai Allah ada empat: Subhanallah, Alhamdulillah, La ilaha illallah, dan Allahu Akbar. Tidak membahayakanmu dari mana pun engkau memulainya." Dalam Muslim no. 2695 beliau bersabda: "Mengucapkannya lebih aku cintai daripada segala sesuatu yang disinari matahari."',
    dalilTextEn:
      'Samurah ibn Jundub narrated that the Prophet ﷺ said: "The most beloved words to Allah are four: Subhanallah, Alhamdulillah, La ilaha illallah, and Allahu Akbar. It does not harm you whichever you begin with." (Muslim no. 2137 & no. 2695).',
    tafsir:
      'Empat kalimat ini disebut Al-Baqiyatus Shalihat (amal-amal saleh yang kekal pahalanya) yang mencakup penyucian Allah, syukur, tauhid, dan pengagungan-Nya.',
    tafsirEn:
      'These four phrases are enduring righteous deeds (Al-Baqiyat as-Salihat) uniting glorification, gratitude, monotheism, and magnification of Allah.',
    repeatCount: 0,
    timeOfDay: 'umum',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 18,
    categoryId: 2,
    title: 'Perbendaharaan Surga — Hauqalah (Tanpa Batasan)',
    titleEn: 'Treasure of Paradise — Hauqalah (Unlimited)',
    arabicText: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latinText: 'Lā ḥaula wa lā quwwata illā billāh.',
    translation: 'Tiada daya dan tiada kekuatan melainkan dengan pertolongan Allah.',
    translationEn: 'There is no power nor strength except through Allah.',
    reference: 'HR. Bukhari no. 4205 & Muslim no. 2704',
    dalilSource: 'Shahih Al-Bukhari no. 4205 & Shahih Muslim no. 2704',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Abu Musa Al-Asy’ari radhiyallahu anhu berkata, Nabi ﷺ bersabda kepadaku: "Wahai Abdullah bin Qais, maukah engkau aku tunjukkan satu kalimat dari perbendaharaan surga?" Aku menjawab: "Tentu, wahai Rasulullah." Beliau bersabda: "Ucapkanlah: La hawla wa la quwwata illa billah."',
    dalilTextEn:
      'Abu Musa al-Ash’ari narrated that the Prophet ﷺ asked him: "Shall I not direct you to a treasure from the treasures of Paradise?" He said: "Yes, O Messenger of Allah." He said: "Say: La hawla wa la quwwata illa billah." (Al-Bukhari no. 4205 & Muslim no. 2704).',
    tafsir:
      'Syaikhul Islam Ibnu Taimiyah menjelaskan bahwa kalimat ini adalah kalimat penyerahan diri dan permohonan pertolongan (isti’anah) dalam ketaatan: tidak ada daya berpindah dari kemaksiatan dan tidak ada kekuatan menjalankan ketaatan kecuali dengan taufik Allah.',
    tafsirEn:
      'Ibn Taymiyyah clarifies that this is a statement of seeking Allah’s aid: a servant has no capacity to turn away from sin nor strength to perform obedience except by Allah’s enabling grace.',
    repeatCount: 0,
    timeOfDay: 'umum',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 19,
    categoryId: 4,
    title: 'Shalawat kepada Nabi Muhammad ﷺ (Tanpa Batasan)',
    titleEn: 'Sending Blessings Upon Prophet Muhammad ﷺ (Unlimited)',
    arabicText: 'اَللّٰهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    latinText: "Allāhumma ṣalli wa sallim 'alā nabiyyinā Muḥammad.",
    translation: 'Ya Allah, limpahkanlah shalawat dan salam kepada Nabi kami Muhammad.',
    translationEn: 'O Allah, send prayers and peace upon our Prophet Muhammad.',
    reference: 'QS. Al-Ahzab: 56 · HR. Muslim no. 408',
    dalilSource: 'QS. Al-Ahzab: 56 & Shahih Muslim no. 408',
    dalilStatus: 'Al-Quran Al-Karim · Hadis Shahih',
    dalilText:
      'Allah berfirman: "Sesungguhnya Allah dan malaikat-malaikat-Nya bershalawat untuk Nabi. Wahai orang-orang yang beriman, bershalawatlah kamu untuk Nabi dan ucapkanlah salam penghormatan kepadanya." Dan dalam HR. Muslim no. 408: "Barang siapa bershalawat kepadaku satu kali, Allah bershalawat kepadanya sepuluh kali."',
    dalilTextEn:
      'Allah says: "Indeed, Allah confers blessing upon the Prophet, and His angels invoke peace upon him. O believers, invoke blessings and peace upon him." And in Muslim no. 408: "Whoever sends blessings upon me once, Allah sends blessings upon him tenfold."',
    tafsir:
      'Ibnu Katsir mengutip Abul Aliyah bahwa shalawat Allah kepada Nabi-Nya adalah pujian-Nya di hadapan para malaikat, sedangkan shalawat kita adalah doa agar Allah memuliakan dan meninggikan kedudukan beliau ﷺ.',
    tafsirEn:
      'Ibn Kathir quotes Abul-Aliyah that Allah’s blessings upon the Prophet mean His praise of him among the angels, while believers’ salawat is a supplication honoring him.',
    repeatCount: 0,
    timeOfDay: 'umum',
    isPublished: true,
    createdAt: nowIso,
  },
  // Zikir & Doa Khusus
  {
    id: 20,
    categoryId: 1,
    title: 'Doa Sebelum Tidur',
    titleEn: 'Supplication Before Sleeping',
    arabicText: 'بِاسْمِكَ اللّٰهُمَّ أَمُوْتُ وَأَحْيَا',
    latinText: 'Bismikallāhumma amūtu wa aḥyā.',
    translation: 'Dengan nama-Mu ya Allah aku mati (tidur) dan aku hidup (bangun).',
    translationEn: 'In Your name, O Allah, I die and I live.',
    reference: 'HR. Bukhari no. 6324',
    dalilSource: 'Shahih Al-Bukhari no. 6324',
    dalilStatus: 'Shahih',
    dalilText:
      'Hudzaifah bin Al-Yaman radhiyallahu anhu berkata: "Apabila Nabi ﷺ hendak tidur pada malam hari, beliau meletakkan tangannya di bawah pipinya kemudian berdoa: Bismika Allahumma amutu wa ahya."',
    dalilTextEn:
      'Hudhayfah ibn al-Yaman narrated: "Whenever the Prophet ﷺ went to bed at night, he would place his hand under his cheek and supplicate: Bismika Allahumma amutu wa ahya." (Al-Bukhari no. 6324).',
    tafsir:
      'Tidur adalah saudara kematian (wafat kecil) sebagaimana dalam QS. Az-Zumar: 42. Doa ini melatih jiwa untuk berserah diri kepada Allah saat ruh diistirahatkan sementara.',
    tafsirEn:
      'Sleep is the sister of death (minor passing); this supplication trains the heart to entrust its soul entirely to Allah each night.',
    repeatCount: 1,
    timeOfDay: 'khusus',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 21,
    categoryId: 2,
    title: 'Doa Bangun Tidur',
    titleEn: 'Supplication Upon Waking Up',
    arabicText: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latinText: 'Alḥamdulillāhillażī aḥyānā ba‘da mā amātanā wa ilaihin-nusyūr.',
    translation:
      'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (menidurkan kami), dan hanya kepada-Nya kami dikembalikan.',
    translationEn:
      'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    reference: 'HR. Bukhari no. 6312',
    dalilSource: 'Shahih Al-Bukhari no. 6312',
    dalilStatus: 'Shahih',
    dalilText:
      'Hudzaifah radhiyallahu anhu meriwayatkan bahwa apabila Nabi ﷺ bangun dari tidur beliau mengucapkan: "Alhamdulillahilladzi ahyana ba’da ma amatana wa ilaihin-nusyur."',
    dalilTextEn:
      'Hudhayfah narrated that upon waking from sleep, the Prophet ﷺ would say: "Alhamdulillahilladzi ahyana ba’da ma amatana wa ilaihin-nushur." (Al-Bukhari no. 6312).',
    tafsir:
      'Mengajarkan seorang muslim untuk mengawali kesadarannya dengan bersyukur atas nikmat kehidupan baru setiap pagi dan mengingat hari kebangkitan.',
    tafsirEn:
      'Teaches believers to begin consciousness with gratitude for renewed life and mindfulness of the final Resurrection.',
    repeatCount: 1,
    timeOfDay: 'khusus',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 22,
    categoryId: 1,
    title: 'Doa Keluar Rumah',
    titleEn: 'Supplication When Leaving Home',
    arabicText: 'بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latinText: 'Bismillāhi tawakkaltu ‘alallāh, lā ḥaula wa lā quwwata illā billāh.',
    translation:
      'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.',
    translationEn:
      'In the name of Allah, I place my trust in Allah; there is no power and no strength except with Allah.',
    reference: 'HR. Abu Dawud no. 5095 & Tirmidzi no. 3426',
    dalilSource: 'Sunan Abu Dawud no. 5095 & Jami’ At-Tirmidzi no. 3426',
    dalilStatus: 'Shahih (Dishahihkan At-Tirmidzi & Al-Albani)',
    dalilText:
      'Anas bin Malik radhiyallahu anhu berkata, Rasulullah ﷺ bersabda: "Jika seseorang keluar dari rumahnya lalu membaca Bismillahi tawakkaltu alallah, la hawla wa la quwwata illa billah, dikatakan kepadanya: Engkau telah diberi petunjuk, dicukupkan, dan dilindungi, serta setan menjauh darinya."',
    dalilTextEn:
      'Anas ibn Malik narrated that the Messenger of Allah ﷺ said: "Whoever says upon leaving his home: Bismillahi tawakkaltu alallah, la hawla wa la quwwata illa billah, it is said to him: You have been guided, sufficed, and protected, and the devil steps aside from him." (Abu Dawud no. 5095 & At-Tirmidhi no. 3426).',
    tafsir:
      'Doa singkat yang menjamin tiga penjagaan utama saat beraktivitas di luar rumah: petunjuk menuju kebaikan, kecukupan rezeki dan urusan, serta perlindungan dari mara bahaya.',
    tafsirEn:
      'A concise daily shield guaranteeing divine guidance, sufficiency in one’s affairs, and protection from harm whenever stepping out.',
    repeatCount: 1,
    timeOfDay: 'khusus',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 23,
    categoryId: 5,
    title: 'Doa Menghilangkan Kegelisahan dan Kesedihan',
    titleEn: 'Supplication for Relief From Anxiety & Grief',
    arabicText:
      'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    latinText:
      "Allāhumma innī a'ūżu bika minal-hammi wal-ḥazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa ḍala'id-daini wa ghalabatir-rijāl.",
    translation:
      'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rasa gelisah dan kesedihan, dari kelemahan dan kemalasan, dari sifat kikir dan pengecut, serta dari lilitan utang dan penindasan orang lain.',
    translationEn:
      'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by men.',
    reference: 'HR. Bukhari no. 6369',
    dalilSource: 'Shahih Al-Bukhari no. 6369',
    dalilStatus: 'Shahih',
    dalilText:
      'Anas bin Malik radhiyallahu anhu menuturkan bahwa beliau sangat sering mendengar Rasulullah ﷺ memanjatkan doa perlindungan secara lengkap: "Allahumma inni a’udzu bika minal-hammi wal-hazan, wal-ajzi wal-kasal, wal-bukhli wal-jubn, wa dhala’id-daini wa ghalabatir-rijal." (HR. Bukhari no. 6369).',
    dalilTextEn:
      'Anas ibn Malik reported that he frequently heard the Prophet ﷺ supplicate for refuge from eight burdens: future anxiety, past sorrow, incapacity, laziness, stinginess, cowardice, crushing debt, and oppression by people (Al-Bukhari no. 6369).',
    tafsir:
      'Ibnu Hajar menjelaskan perbedaan "Al-Hamm" (kecemasan akan masa depan) dan "Al-Hazan" (kesedihan atas masa lalu). Doa ini meminta perlindungan dari delapan perusak ketenangan jiwa dan produktivitas seorang mukmin.',
    tafsirEn:
      'Ibn Hajar explains that "Al-Hamm" is anxiety over the future while "Al-Hazan" is grief over the past; seeking refuge from all eight preserves mental peace and productive devotion.',
    repeatCount: 1,
    timeOfDay: 'khusus',
    isPublished: true,
    createdAt: nowIso,
  },
];

export const INITIAL_HADITHS: Hadith[] = [
  {
    id: 1,
    categoryId: 3,
    title: 'Setiap Amal Tergantung pada Niatnya',
    titleEn: 'Actions Are Judged by Intentions',
    arabicText:
      'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    latinText:
      "Innamal-a'mālu bin-niyyāt, wa innamā likullimri'in mā nawā, faman kānat hijratuhū ilā dunyā yuṣībuhā au ilamra'atin yankiḥuhā fahijratuhū ilā mā hājara ilaih.",
    translation:
      'Sesungguhnya setiap amal perbuatan itu tergantung pada niatnya, dan setiap orang hanya akan mendapatkan sesuai dengan apa yang ia niatkan. Barang siapa hijrahnya karena dunia yang ingin ia raih atau karena seorang wanita yang ingin ia nikahi, maka hijrahnya itu sesuai dengan apa yang ia tuju.',
    translationEn:
      'Verily, actions are by intentions, and for every person is only what he intended. So whoever’s migration was for worldly gain or a woman to marry, his migration is for what he migrated for.',
    source: 'Shahih Al-Bukhari no. 1 & Shahih Muslim no. 1907',
    narrator: "Umar bin Al-Khaththab radhiyallahu 'anhu",
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Diriwayatkan secara shahih dari Amirul Mukminin Umar bin Al-Khaththab radhiyallahu anhu di atas mimbar Nabi ﷺ, dan ditempatkan Imam Al-Bukhari sebagai hadis pertama dalam kitab Shahih-nya.',
    dalilTextEn:
      'Narrated authentically from Amir al-Mu’minin Umar ibn al-Khattab upon the Prophet’s pulpit, placed by Imam Al-Bukhari as the opening narration of his Sahih.',
    tafsir:
      'Imam Asy-Syafi’i dan Imam Ahmad menyebutkan bahwa hadis ini mencakup sepertiga ilmu Islam. Dalam pemahaman salafush shalih, diterimanya sebuah ibadah mensyaratkan dua hal: keikhlasan niat karena Allah semata (hadis ini) dan kesesuaian tata cara dengan sunnah Nabi ﷺ.',
    tafsirEn:
      'Imam Ash-Shafi’i and Imam Ahmad remarked that this hadith encompasses one-third of Islamic knowledge: valid worship requires pure sincerity for Allah alone and strict conformity to the Prophetic Sunnah.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 2,
    categoryId: 4,
    title: 'Dua Kalimat yang Ringan di Lisan, Berat di Timbangan',
    titleEn: 'Two Words Light on the Tongue, Heavy on the Scale',
    arabicText:
      'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    latinText:
      'Kalimatāni khafīfatāni ‘alal-lisān, ṡaqīlatāni fil-mīzān, ḥabībatāni ilar-raḥmān: Subḥānallāhi wa biḥamdih, subḥānallāhil-‘aẓīm.',
    translation:
      'Ada dua kalimat yang ringan diucapkan di lisan, berat dalam timbangan amal, dan sangat dicintai oleh Ar-Rahman (Yang Maha Pengasih): Subhanallahi wa bihamdihi (Mahasuci Allah dan segala puji bagi-Nya) dan Subhanallahil Adzim (Mahasuci Allah Yang Mahaagung).',
    translationEn:
      'There are two phrases that are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: Subhanallahi wa bihamdihi, Subhanallahil Adzim.',
    source: 'Shahih Al-Bukhari no. 6406 & Shahih Muslim no. 2694',
    narrator: "Abu Hurairah radhiyallahu 'anhu",
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Dari Abu Hurairah radhiyallahu anhu secara marfu’ kepada Nabi ﷺ, diriwayatkan oleh Imam Al-Bukhari (no. 6406, 6682, 7563) dan Imam Muslim (no. 2694).',
    dalilTextEn:
      'Narrated with an elevated chain from Abu Hurairah to the Prophet ﷺ, recorded by Imam Al-Bukhari (nos. 6406, 6682, 7563) and Imam Muslim (no. 2694).',
    tafsir:
      'Ibnu Hajar Al-Asqalani menerangkan bahwa keutamaan besar ini menunjukkan betapa murahnya rahmat Allah: kalimat yang mudah diucapkan lisan menjadi sangat berat di timbangan amal (Mizan) pada hari kiamat apabila disertai kesadaran maknanya.',
    tafsirEn:
      'Ibn Hajar explains that this immense virtue highlights Allah’s boundless mercy: effortless phrases become extraordinarily weighty on the Day of Judgment when recited with sincere awareness.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 3,
    categoryId: 5,
    title: 'Ciri Kesempurnaan Islam Seseorang',
    titleEn: 'Sign of Excellence in One’s Islam',
    arabicText: 'مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ',
    latinText: "Min ḥusni islāmil-mar'i tarkuhū mā lā ya'nīh.",
    translation:
      'Di antara tanda baiknya keislaman seseorang adalah ia meninggalkan hal-hal yang tidak bermanfaat baginya.',
    translationEn: 'Part of the perfection of a person’s Islam is his leaving that which does not concern him.',
    source: 'Jami’ At-Tirmidzi no. 2317 & Sunan Ibnu Majah no. 3976',
    narrator: "Abu Hurairah radhiyallahu 'anhu",
    dalilStatus: 'Hasan Shahih (Dinilai Hasan oleh An-Nawawi, Shahih oleh Al-Albani)',
    dalilText:
      'Diriwayatkan oleh At-Tirmidzi no. 2317, Ibnu Majah no. 3976, dan Malik dalam Al-Muwaththa’ dari Ali bin Husain secara mursal serta dari Abu Hurairah secara maushul.',
    dalilTextEn:
      'Recorded by At-Tirmidhi (no. 2317), Ibn Majah (no. 3976), and Malik in Al-Muwatta; authenticated as Hasan by Imam An-Nawawi and Sahih by Shaykh Al-Albani.',
    tafsir:
      'Imam Ibnu Rajab Al-Hanbali dalam Jami’ul Ulum wal Hikam menjelaskan bahwa meninggalkan sesuatu yang tidak bermanfaat mencakup menjaga lisan dari ucapan sia-sia, menjaga pandangan, serta memfokuskan waktu pada perkara agama dan dunia yang maslahat.',
    tafsirEn:
      'Ibn Rajab explains in Jami’ al-Ulum wal-Hikam that leaving what does not concern a believer encompasses guarding speech, restraining the gaze, and investing time in beneficial worldly and spiritual duties.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 4,
    categoryId: 5,
    title: 'Menjaga Lisan dan Memuliakan Tetangga',
    titleEn: 'Guarding the Tongue & Honoring Neighbors',
    arabicText:
      'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
    latinText:
      "Man kāna yu'minu billāhi wal-yaumil-ākhiri falyaqul khairan au liyaṣmut, wa man kāna yu'minu billāhi wal-yaumil-ākhiri falyukrim jārah, wa man kāna yu'minu billāhi wal-yaumil-ākhiri falyukrim ḍaifah.",
    translation:
      'Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam. Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya. Dan barang siapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tamunya.',
    translationEn:
      'Whoever believes in Allah and the Last Day should speak good or remain silent. Whoever believes in Allah and the Last Day should honor his neighbor, and whoever believes in Allah and the Last Day should honor his guest.',
    source: 'Shahih Al-Bukhari no. 6018 & Shahih Muslim no. 47',
    narrator: "Abu Hurairah radhiyallahu 'anhu",
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Hadis muttafaqun alaih dari sahabat Abu Hurairah radhiyallahu anhu yang diriwayatkan Imam Al-Bukhari (no. 6018) dan Imam Muslim (no. 47).',
    dalilTextEn:
      'Agreed-upon authentic narration reported from Abu Hurairah by both Imam Al-Bukhari (no. 6018) and Imam Muslim (no. 47).',
    tafsir:
      'Imam An-Nawawi menjelaskan bahwa hadis ini menjadi kaidah emas etika komunikasi dan sosial dalam Islam: berbicara hanya ketika ada maslahat dan kebaikan, serta menebar keramahan kepada tetangga dan tamu sebagai buah nyata dari keimanan.',
    tafsirEn:
      'Imam An-Nawawi describes this narration as the golden principle of Islamic communication and social etiquette: speaking only with clear benefit and showing warmth to neighbors and guests as living proof of faith.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 5,
    categoryId: 4,
    title: 'Perumpamaan Orang yang Berzikir dan Tidak Berzikir',
    titleEn: 'Parable of One Who Remembers Allah',
    arabicText: 'مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُ رَبَّهُ مَثَلُ الْحَيِّ وَالْمَيِّتِ',
    latinText: 'Maṡalullażī yażkuru rabbahū wallażī lā yażkuru rabbahū maṡalul-ḥayyi wal-mayyit.',
    translation:
      'Perumpamaan orang yang senantiasa mengingat (berzikir kepada) Rabbnya dengan orang yang tidak mengingat Rabbnya adalah seperti orang yang hidup dan orang yang sudah mati.',
    translationEn:
      'The likeness of the one who remembers his Lord and the one who does not remember his Lord is that of the living and the dead.',
    source: 'Shahih Al-Bukhari no. 6407',
    narrator: "Abu Musa Al-Asy'ari radhiyallahu 'anhu",
    dalilStatus: 'Shahih (Shahih Bukhari & Muslim)',
    dalilText:
      'Diriwayatkan Imam Al-Bukhari no. 6407 dari Abu Musa Al-Asy’ari, dan juga Imam Muslim no. 779 dengan lafaz perumpamaan rumah yang disebut nama Allah di dalamnya.',
    dalilTextEn:
      'Recorded by Imam Al-Bukhari (no. 6407) from Abu Musa al-Ash’ari, and similarly by Imam Muslim (no. 779) regarding the likeness of a home in which Allah is remembered.',
    tafsir:
      'Syaikhul Islam Ibnu Taimiyah menegaskan: "Zikir bagi hati seperti air bagi ikan; bagaimana keadaan ikan apabila dikeluarkan dari air?" Hidup hakiki adalah hidupnya hati dengan zikir dan Al-Quran.',
    tafsirEn:
      'Ibn Taymiyyah famously stated: "Remembrance to the heart is like water to a fish—what happens to a fish removed from water?" True spiritual vitality stems from dhikr and the Quran.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 6,
    categoryId: 3,
    title: 'Allah Melihat Hati dan Amal Perbuatan',
    titleEn: 'Allah Looks at Your Hearts and Deeds',
    arabicText:
      'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
    latinText: "Innallāha lā yanẓuru ilā ṣuwarikum wa amwālikum, wa lākin yanẓuru ilā qulūbikum wa a'mālikum.",
    translation:
      'Sesungguhnya Allah tidak melihat kepada rupa dan harta kalian, tetapi Dia melihat kepada hati dan amal perbuatan kalian.',
    translationEn:
      'Verily, Allah does not look at your appearances or your wealth, rather He looks at your hearts and your deeds.',
    source: 'Shahih Muslim no. 2564',
    narrator: "Abu Hurairah radhiyallahu 'anhu",
    dalilStatus: 'Shahih',
    dalilText:
      'Diriwayatkan oleh Imam Muslim dalam Shahih-nya no. 2564 (Kitab Al-Birr wash-Shilah wal-Adab) dari Abu Hurairah radhiyallahu anhu.',
    dalilTextEn:
      'Recorded by Imam Muslim in his Sahih (no. 2564, Book of Righteousness and Manners) from Abu Hurairah.',
    tafsir:
      'Mengajarkan agar fokus perbaikan diri diarahkan pada kebersihan tauhid dalam hati serta keselarasan amal lahiriah dengan tuntunan Rasulullah ﷺ.',
    tafsirEn:
      'Teaches believers to direct self-purification toward sincere monotheism in the heart and aligning outward deeds with the authentic Sunnah.',
    isPublished: true,
    createdAt: nowIso,
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 1,
    categoryId: 3,
    title: 'Kembali kepada Al-Quran dan Hadis Shahih: Memahami Jalan Salafush Shalih',
    titleEn: 'Returning to Quran and Authentic Sunnah: Understanding the Path of the Salaf',
    slug: 'kembali-kepada-quran-dan-hadis-shahih',
    imageUrl: '/images/blog_quran_sunnah_1795410953177.jpg',
    excerpt:
      'Mengapa beragama dengan merujuk Al-Quran, hadis shahih, dan pemahaman para sahabat menjadi jalan paling tenang, jelas, dan menyatukan hati.',
    excerptEn:
      'Why grounding worship in the Quran, authentic Hadith, and the understanding of the earliest generations brings clarity and serenity.',
    content:
      'Setiap muslim tentu mendambakan ketenangan dalam beribadah: yakin bahwa doa yang dibaca, tata cara sholat yang dikerjakan, dan zikir yang dilantunkan benar-benar bersumber dari bimbingan Allah dan Rasul-Nya.\n\nDalam khazanah keilmuan Islam, berpegang kepada Al-Quran dan Sunnah yang shahih sesuai pemahaman generasi terbaik umat ini (para sahabat, tabi’in, dan tabi’ut tabi’in—yang disebut sebagai salafush shalih) bukanlah sebuah kelompok eksklusif atau label golongan. Ia adalah metode (manhaj) beragama yang murni: memeriksa dalil, memastikan kesahihan riwayat, serta memahami maksudnya sebagaimana dipahami oleh para sahabat yang menerima wahyu langsung dari Nabi ﷺ.\n\nAllah Taala berfirman dalam QS. An-Nisa ayat 59 agar apabila terjadi perselisihan pendapat, umat mengembalikannya kepada Allah (Al-Quran) dan Rasul-Nya (As-Sunnah). Imam Malik rahimahullah juga berpesan bahwa generasi akhir umat ini tidak akan menjadi baik kecuali dengan apa yang menjadikan generasi awalnya baik.\n\nKarena itu, seluruh amalan di website Shahih Sunnah menyertakan teks asli dalil, status kesahihan riwayat menurut para ulama ahli hadis, serta tafsir yang jernih—agar setiap pembaca dapat beribadah di atas ilmu dan keyakinan, bukan sekadar ikut-ikutan tanpa dasar.',
    contentEn:
      'Every Muslim desires certainty in worship: knowing that the prayers, supplications, and daily remembrances practiced are genuinely rooted in the guidance of Allah and His Messenger ﷺ.\n\nHolding onto the Quran and authentic Sunnah according to the understanding of the pious predecessors (the Companions and early scholars) is not a sectarian label, but a clear methodology: verifying the authenticity of every narration and understanding it as those who witnessed revelation understood it.\n\nIn Shahih Sunnah, every practice is accompanied by its primary Quranic or Hadith source, its grading status, and scholarly explanation so every reader can worship with clarity and peace of mind.',
    author: 'Tim Redaksi Shahih Sunnah',
    readingTimeMinutes: 5,
    views: 42,
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 2,
    categoryId: 4,
    title: 'Mengapa Zikir Pagi dan Petang Menjadi Benteng Seorang Mukmin?',
    titleEn: 'Why Morning and Evening Dhikr Is a Believer’s Fortress',
    slug: 'benteng-zikir-pagi-dan-petang',
    imageUrl: '/images/blog_zikir_fortress_1795410953451.jpg',
    excerpt:
      'Menelaah hikmah syariat dari pembiasaan zikir pagi dan petang sebagai penjagaan hati, ketenangan jiwa, serta bentuk tawakal sebelum dan sesudah beraktivitas.',
    excerptEn:
      'Exploring the wisdom behind morning and evening remembrances as spiritual protection and daily mindfulness.',
    content:
      'Di tengah hiruk-pikuk aktivitas harian yang sering kali menyita perhatian dan menguras energi batin, Islam menghadirkan rutinitas spiritual yang ringkas namun sarat makna: zikir pagi dan petang.\n\nAllah Taala berfirman dalam QS. Al-Ahzab ayat 41-42: "Wahai orang-orang yang beriman, berzikirlah (dengan menyebut nama) Allah, zikir yang sebanyak-banyaknya. Dan bertasbihlah kepada-Nya di waktu pagi dan petang." Ayat ini menegaskan bahwa pergantian dua poros waktu—awal siang dan awal malam—adalah momen utama untuk memperbarui ikatan hati dengan Sang Pencipta.\n\nSecara praktis, zikir pagi membekali seorang muslim dengan rasa aman (Ayat Kursi dan perlindungan dari mudarat), kerelaan terhadap ketetapan Allah (doa ridha), serta pengakuan tulus atas nikmat dan dosa (Sayyidul Istighfar). Sedangkan zikir petang menutup hari dengan muhasabah dan penyerahan diri sebelum malam tiba.',
    contentEn:
      'Amidst busy daily schedules, Islam offers a concise yet deeply grounding daily habit: morning and evening dhikr. Allah commands believers in Surah Al-Ahzab 33:41-42 to remember Him abundantly and glorify Him morning and evening.',
    author: 'Tim Redaksi Shahih Sunnah',
    readingTimeMinutes: 4,
    views: 28,
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 3,
    categoryId: 4,
    title: 'Menghidupkan Sepertiga Malam Terakhir dan Waktu Tahajud',
    titleEn: 'Reviving the Last Third of the Night & Tahajud Prayer',
    slug: 'keutamaan-sepertiga-malam-terakhir',
    imageUrl: '/images/blog_tahajud_night_1795410952978.jpg',
    excerpt:
      'Panduan ringkas memahami pembagian waktu malam dalam fikih Islam serta amalan sholat tahajud dan istighfar menjelang fajar.',
    excerptEn:
      'A concise guide to calculating the last third of the night and cultivating the habit of night prayer.',
    content:
      'Sepertiga malam terakhir memiliki kedudukan istimewa dalam tradisi ibadah kaum muslimin. Dalam hadis muttafaqun alaih riwayat Bukhari (no. 1145) dan Muslim (no. 758), Rasulullah ﷺ mengabarkan bahwa Rabb kita Tabaraka wa Taala turun ke langit dunia setiap malam ketika tersisa sepertiga malam terakhir seraya berfirman: "Siapa yang berdoa kepada-Ku, pasti Aku kabulkan; siapa yang meminta kepada-Ku, pasti Aku beri; siapa yang memohon ampun kepada-Ku, pasti Aku ampuni."\n\nUntuk mengetahui kapan sepertiga malam terakhir dimulai, para ulama menghitung durasi malam dari terbenamnya matahari (Maghrib) hingga terbit fajar shadiq (Subuh). Durasi tersebut dibagi tiga, sehingga dua pertiga bagian awal berlalu dan sepertiga bagian akhir itulah waktu utama tahajud dan sahur.',
    contentEn:
      'The last third of the night holds a special station in Islamic worship. In an agreed-upon narration (Bukhari 1145, Muslim 758), the Prophet ﷺ informed us that Allah descends to the lowest heaven during the final third of every night, answering those who supplicate and forgiving those who seek pardon.',
    author: 'Ustadz Ahmad Fauzan',
    readingTimeMinutes: 5,
    views: 19,
    isPublished: true,
    createdAt: nowIso,
  },
];

export const INITIAL_SUNNAH_GUIDES: SunnahGuideItem[] = [
  // Tata Cara Sholat Sesuai Sunnah
  {
    id: 1,
    guideType: 'sholat',
    stepOrder: 1,
    title: 'Berdiri Menghadap Kiblat & Niat dalam Hati, lalu Takbiratul Ihram',
    titleEn: 'Stand Facing Qibla, Intention in Heart & Takbiratul Ihram',
    arabicText: 'اَللّٰهُ أَكْبَرُ',
    latinText: 'Allāhu akbar',
    translation:
      'Berdiri tegak menghadap kiblat bagi yang mampu, berniat di dalam hati (tanpa melafazkan niat), lalu mengangkat kedua tangan sejajar bahu atau daun telinga seraya mengucapkan "Allahu Akbar", kemudian meletakkan tangan kanan di atas punggung tangan kiri di dada.',
    translationEn:
      'Stand upright facing the Qibla if able, hold the intention silently in the heart, raise both hands to shoulder or earlobe level saying "Allahu Akbar", then place the right hand over the left on the chest.',
    dalilSource: 'Shahih Al-Bukhari no. 735, 740, 757 & Shahih Muslim no. 390',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Nabi ﷺ bersabda kepada orang yang buruk sholatnya: "Apabila engkau hendak sholat, sempurnakanlah wudhu, lalu menghadaplah ke kiblat, kemudian bertakbirlah." (HR. Bukhari no. 6251 & Muslim no. 397).',
    dalilTextEn:
      'The Prophet ﷺ taught the man who prayed poorly: "When you stand for prayer, perform ablution properly, face the Qibla, and say Allahu Akbar." (Al-Bukhari no. 6251 & Muslim no. 397).',
    tafsir:
      'Syaikh Muhammad Nashiruddin Al-Albani dalam Sifat Sholat Nabi ﷺ menjelaskan bahwa niat tempatnya di hati dan tidak ada riwayat dari Nabi ﷺ maupun para sahabat yang melafazkan niat secara lisan sebelum takbir.',
    tafsirEn:
      'Shaykh Muhammad Nasiruddin Al-Albani clarifies in Sifat Salat An-Nabi ﷺ that intention resides strictly in the heart, with no authentic report of verbalizing intention formulas before Takbir.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 2,
    guideType: 'sholat',
    stepOrder: 2,
    title: 'Membaca Doa Iftitah (Pembukaan Sholat)',
    titleEn: 'Reciting the Opening Supplication (Du’a al-Istiftah)',
    arabicText:
      'اَللّٰهُمَّ بَاعِدْ بَيْنِيْ وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اَللّٰهُمَّ نَقِّنِيْ مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اَللّٰهُمَّ اغْسِلْنِيْ مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ',
    latinText:
      'Allāhumma bā‘id bainī wa baina khaṭāyāya kamā bā‘adta bainal-masyriqi wal-maghrib, allāhumma naqqinī min khaṭāyāya kamā yunaqqaṡ-ṡaubul-abyaḍu minad-danas, allāhummagsilnī min khaṭāyāya biṡ-ṡalji wal-mā’i wal-barad.',
    translation:
      'Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan sebagaimana kain putih dibersihkan dari kotoran. Ya Allah, cucilah kesalahanku dengan salju, air, dan embun.',
    translationEn:
      'O Allah, distance me from my sins just as You have distanced the East from the West. O Allah, purify me of my sins as a white garment is purified from dirt. O Allah, wash away my sins with snow, water, and hail.',
    dalilSource: 'Shahih Al-Bukhari no. 744 & Shahih Muslim no. 598',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Abu Hurairah radhiyallahu anhu bertanya tentang apa yang dibaca Nabi ﷺ ketika diam sejenak antara takbir dan bacaan Al-Fatihah, maka Nabi ﷺ menyebutkan doa ini. (HR. Bukhari no. 744 & Muslim no. 598).',
    dalilTextEn:
      'Abu Hurairah asked what the Prophet ﷺ recited during the brief pause between Takbir and Al-Fatihah, and the Prophet ﷺ taught this opening supplication (Al-Bukhari no. 744 & Muslim no. 598).',
    tafsir:
      'Doa iftitah dibaca secara sirr (pelan) pada rakaat pertama sebelum ta’awudz dan Al-Fatihah. Boleh juga membaca doa iftitah shahih lainnya, yaitu: "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta’ala jadduka, wa la ilaha ghairuka" (Mahasuci Engkau ya Allah dan segala puji bagi-Mu, Mahaberkah nama-Mu, Mahatinggi keagungan-Mu, dan tiada sesembahan yang berhak disembah selain Engkau — HR. Abu Dawud no. 775 & At-Tirmidzi no. 243 · Shahih).',
    tafsirEn:
      'The opening supplication is recited quietly in the first rak’ah before Al-Fatihah. Another authentic option is "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta’ala jadduka, wa la ilaha ghairuka" (Abu Dawud no. 775 & At-Tirmidhi no. 243).',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 3,
    guideType: 'sholat',
    stepOrder: 3,
    title: 'Ta’awudz, Membaca Al-Fatihah dengan Tuma’ninah, dan Surat Pendek',
    titleEn: 'Seeking Refuge, Reciting Al-Fatihah & Short Surah',
    arabicText: 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ',
    latinText: "A'ūżu billāhi minasy-syaiṭānir-rajīm.",
    translation:
      'Membaca ta’awudz secara pelan, dilanjutkan Basmalah dan Surat Al-Fatihah ayat demi ayat dengan tenang, mengucapkan "Amin" setelah selesai, lalu membaca surat atau ayat Al-Quran pada rakaat pertama dan kedua.',
    translationEn:
      'Recite seeking refuge silently, followed by Bismillah and Surah Al-Fatihah verse by verse calmly, saying "Ameen", then recite another passage from the Quran in the first two rak’ahs.',
    dalilSource: 'Shahih Al-Bukhari no. 756 & Shahih Muslim no. 394',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Rasulullah ﷺ bersabda: "Tidak ada sholat (tidak sah sholat) bagi orang yang tidak membaca Fatihatul Kitab (Al-Fatihah)." (HR. Bukhari no. 756 & Muslim no. 394).',
    dalilTextEn:
      'The Messenger of Allah ﷺ said: "There is no valid prayer for one who does not recite the Opening of the Book (Al-Fatihah)." (Al-Bukhari no. 756 & Muslim no. 394).',
    tafsir:
      'Al-Fatihah adalah rukun sholat di setiap rakaat. Membacanya dengan berhenti di setiap akhir ayat (waqaf) merupakan sunnah sebagaimana diriwayatkan oleh Ummu Salamah radhiyallahu anha.',
    tafsirEn:
      'Al-Fatihah is an essential pillar in every rak’ah; pausing calmly at the end of each verse follows the authentic Sunnah narrated by Umm Salamah.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 4,
    guideType: 'sholat',
    stepOrder: 4,
    title: 'Ruku’ dengan Punggung Lurus & Tuma’ninah',
    titleEn: 'Bowing (Ruku’) With Straight Back & Tranquility',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيْمِ',
    latinText: 'Subḥāna rabbiyal-‘aẓīm (3x)',
    translation:
      'Mengangkat kedua tangan seraya bertakbir, lalu membungkuk dengan meletakkan telapak tangan menggenggam kedua lutut, meluruskan punggung sejajar dengan kepala secara tenang (tuma’ninah), dan membaca "Subhana rabbiyal adzim" tiga kali atau lebih.',
    translationEn:
      'Raise both hands saying Allahu Akbar, bow with hands firmly gripping the knees and the back level with the head calmly, reciting "Subhana rabbiyal adzim" three times or more.',
    dalilSource: 'Shahih Muslim no. 772, Abu Dawud no. 870, Bukhari no. 792',
    dalilStatus: 'Shahih',
    dalilText:
      'Hudzaifah radhiyallahu anhu mendengar Nabi ﷺ membaca dalam ruku’-nya: "Subhana rabbiyal adzim." (HR. Muslim no. 772). Dan dalam riwayat Bukhari no. 757: "Kemudian ruku’lah hingga engkau tenang (tuma’ninah) dalam ruku’mu."',
    dalilTextEn:
      'Hudhayfah heard the Prophet ﷺ recite in his bowing: "Subhana rabbiyal azim" (Muslim no. 772). And Al-Bukhari (no. 757) records: "Then bow until you feel settled and tranquil in your bowing."',
    tafsir:
      'Tuma’ninah (tenang sejenak hingga seluruh persendian kembali pada tempatnya) adalah rukun sholat. Dilarang tergesa-gesa mematuk seperti burung gagak.',
    tafsirEn:
      'Tuma’ninah (settling calmly until every joint returns to rest) is a mandatory pillar of prayer; rushing like a pecking bird invalidates tranquility.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 5,
    guideType: 'sholat',
    stepOrder: 5,
    title: 'I’tidal (Bangkit dari Ruku’ dengan Tenang)',
    titleEn: 'Rising From Ruku’ (I’tidal)',
    arabicText: 'سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ — رَبَّنَا وَلَكَ الْحَمْدُ',
    latinText: 'Sami‘allāhu liman ḥamidah — Rabbanā wa lakal-ḥamd.',
    translation:
      'Bangkit tegak dari ruku’ sambil mengangkat kedua tangan seraya membaca "Sami’allahu liman hamidah" (bagi imam dan munfarid), lalu ketika tegak sempurna membaca "Rabbana wa lakal hamd" (atau "Rabbana lakal hamdu hamdan katsiran thayyiban mubarakan fih").',
    translationEn:
      'Rise upright raising both hands while saying "Sami’allahu liman hamidah", and once fully upright say "Rabbana wa lakal hamd".',
    dalilSource: 'Shahih Al-Bukhari no. 789 & 799',
    dalilStatus: 'Shahih',
    dalilText:
      'Nabi ﷺ bersabda: "Apabila imam mengucapkan Sami’allahu liman hamidah, maka ucapkanlah: Allahumma rabbana lakal hamdu; karena siapa yang ucapannya bertepatan dengan ucapan malaikat, diampuni dosanya yang telah lalu." (HR. Bukhari no. 796).',
    dalilTextEn:
      'The Prophet ﷺ said: "When the imam says Sami’allahu liman hamidah, say Allahumma rabbana lakal hamd, for whoever’s utterance coincides with the angels will have his past sins forgiven." (Al-Bukhari no. 796).',
    tafsir:
      'Posisi berdiri tegak setelah ruku’ ini wajib disertai tuma’ninah sebelum turun untuk sujud.',
    tafsirEn:
      'Standing completely upright with stillness after bowing is obligatory before descending into prostration.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 6,
    guideType: 'sholat',
    stepOrder: 6,
    title: 'Sujud di Atas Tujuh Anggota Tubuh',
    titleEn: 'Prostration (Sujud) on Seven Limbs',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    latinText: 'Subḥāna rabbiyal-a‘lā (3x)',
    translation:
      'Bertakbir tanpa mengangkat tangan lalu turun sujud dengan menempelkan tujuh anggota tubuh: dahi beserta hidung, kedua telapak tangan, kedua lutut, dan kedua ujung jari kaki yang menghadap kiblat. Lengan dijauhkan dari lambung dan tidak menempel lantai. Membaca "Subhana rabbiyal a’la".',
    translationEn:
      'Prostrate with seven parts touching the ground: forehead with nose, both palms, both knees, and the toes of both feet facing Qibla. Keep forearms lifted off the ground and recite "Subhana rabbiyal a’la".',
    dalilSource: 'Shahih Al-Bukhari no. 812 & Shahih Muslim no. 490',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Ibnu Abbas radhiyallahu anhuma meriwayatkan bahwa Nabi ﷺ bersabda: "Aku diperintahkan untuk sujud di atas tujuh tulang: dahi — beliau menunjuk ke hidungnya — kedua tangan, kedua lutut, dan ujung-ujung kedua kaki." (HR. Bukhari no. 812 & Muslim no. 490).',
    dalilTextEn:
      'Ibn Abbas narrated that the Prophet ﷺ said: "I have been commanded to prostrate on seven bones: the forehead—pointing to his nose—both hands, both knees, and the tips of both feet." (Al-Bukhari no. 812 & Muslim no. 490).',
    tafsir:
      'Sujud adalah keadaan terdekat seorang hamba dengan Rabbnya (HR. Muslim no. 482). Oleh sebab itu dianjurkan memperbanyak doa di dalam sujud setelah membaca tasbih.',
    tafsirEn:
      'Prostration is when a servant is closest to his Lord (Muslim no. 482), so multiplying personal supplications in sujud after glorifying Allah is strongly encouraged.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 7,
    guideType: 'sholat',
    stepOrder: 7,
    title: 'Duduk di Antara Dua Sujud',
    titleEn: 'Sitting Between Two Prostrations',
    arabicText: 'رَبِّ اغْفِرْ لِيْ، رَبِّ اغْفِرْ لِيْ',
    latinText: 'Rabbighfir lī, rabbighfir lī.',
    translation:
      'Bangkit dari sujud pertama seraya bertakbir, duduk iftirasy (menduduki telapak kaki kiri dan menegakkan kaki kanan), meletakkan tangan di atas paha/lutut, lalu berdoa "Rabbighfir li, rabbighfir li" dengan tenang sebelum sujud kedua.',
    translationEn:
      'Rise from the first prostration saying Allahu Akbar, sit in iftirasy posture calmly, and recite "Rabbighfir li, rabbighfir li" before the second prostration.',
    dalilSource: 'Sunan Abu Dawud no. 874 & Sunan Ibnu Majah no. 897',
    dalilStatus: 'Shahih (Dishahihkan Al-Albani)',
    dalilText:
      'Hudzaifah radhiyallahu anhu meriwayatkan bahwa Nabi ﷺ membaca di antara dua sujud: "Rabbighfir li, rabbighfir li." (HR. An-Nasai no. 1145 & Ibnu Majah no. 897).',
    dalilTextEn:
      'Hudhayfah narrated that between the two prostrations the Prophet ﷺ would recite: "Rabbighfir li, rabbighfir li (My Lord, forgive me)." (An-Nasa’i no. 1145 & Ibn Majah no. 897).',
    tafsir:
      'Juga terdapat riwayat doa lengkap dari Ibnu Abbas radhiyallahu anhuma: "Allahummaghfir li warhamni wajburni wahdini warzuqni" (HR. Abu Dawud no. 850, Tirmidzi no. 284).',
    tafsirEn:
      'Another authentic supplication narrated by Ibn Abbas is: "O Allah, forgive me, have mercy on me, mend me, guide me, and provide for me" (Abu Dawud no. 850, At-Tirmidhi no. 284).',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 8,
    guideType: 'sholat',
    stepOrder: 8,
    title: 'Tasyahud, Shalawat Nabi ﷺ, Doa Perlindungan & Salam',
    titleEn: 'Tashahhud, Salawat, Refuge Prayer & Salam',
    arabicText:
      'اَلتَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِيْنَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ',
    latinText:
      "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt, as-salāmu 'alaika ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh, as-salāmu 'alainā wa 'alā 'ibādillāhiṣ-ṣāliḥīn, asyhadu allā ilāha illallāhu wa asyhadu anna Muḥammadan 'abduhū wa rasūluh.",
    translation:
      'Membaca Tasyahud, dilanjutkan Shalawat Ibrahimiyah, lalu pada tasyahud akhir berlindung kepada Allah dari empat perkara (azab jahannam, azab kubur, fitnah hidup/mati, dan fitnah Dajjal) sebelum menolehkan wajah ke kanan dan ke kiri seraya mengucapkan "Assalamu’alaikum wa rahmatullah".',
    translationEn:
      'Recite the Tashahhud followed by Salawat Ibrahimiyah, seek refuge from the four trials before ending the prayer with Salam to the right and left.',
    dalilSource: 'Shahih Al-Bukhari no. 831, 3370 & Shahih Muslim no. 402, 588',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Rasulullah ﷺ mengajarkan bacaan tasyahud kepada Ibnu Mas’ud (HR. Bukhari no. 831), mengajarkan shalawat Ibrahimiyah (HR. Bukhari no. 3370), dan memerintahkan berlindung dari empat perkara sebelum salam (HR. Muslim no. 588).',
    dalilTextEn:
      'The Messenger of Allah ﷺ taught the Tashahhud to Ibn Mas’ud (Al-Bukhari no. 831), taught the Salawat Ibrahimiyah (Al-Bukhari no. 3370), and commanded seeking refuge from four trials before closing with Salam (Muslim no. 588).',
    tafsir:
      'Pada tasyahud awal duduk iftirasy dan pada tasyahud akhir (untuk sholat 3 atau 4 rakaat) duduk tawarruk, dengan mengarahkan jari telunjuk kanan ke kiblat selama berdoa.',
    tafsirEn:
      'Sit in iftirasy posture for the first tashahhud and tawarruk posture for the final tashahhud of three- or four-rak’ah prayers, pointing the right index finger toward Qibla while supplicating.',
    isPublished: true,
    createdAt: nowIso,
  },

  // Kebiasaan-Kebiasaan Sesuai Sunnah
  {
    id: 9,
    guideType: 'kebiasaan',
    stepOrder: 1,
    title: 'Bersiwak / Menjaga Kebersihan Mulut Ketika Bangun & Hendak Sholat',
    titleEn: 'Using Siwak / Oral Hygiene Upon Waking & Before Prayer',
    arabicText: 'لَوْلَا أَنْ أَشُقَّ عَلَى أُمَّتِيْ لَأَمَرْتُهُمْ بِالسِّوَاكِ عِنْدَ كُلِّ صَلَاةٍ',
    latinText: "Laulā an asyuqqa 'alā ummatī la'amartuhum bis-siwāki 'inda kulli ṣalāh.",
    translation:
      'Membiasakan membersihkan mulut dengan siwak atau sikat gigi sebelum berwudhu dan sholat, serta ketika bangun dari tidur malam.',
    translationEn:
      'Regularly cleaning the mouth with siwak (or toothbrush) before ablution and prayer, as well as upon waking.',
    dalilSource: 'Shahih Al-Bukhari no. 887 & Shahih Muslim no. 252',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Rasulullah ﷺ bersabda: "Seandainya tidak memberatkan umatku, niscaya aku perintahkan mereka untuk bersiwak setiap kali hendak sholat." (HR. Bukhari no. 887 & Muslim no. 252).',
    dalilTextEn:
      'The Prophet ﷺ said: "Were it not to be a hardship on my community, I would have ordered them to use the siwak before every prayer." (Al-Bukhari no. 887 & Muslim no. 252).',
    tafsir:
      'Imam An-Nawawi menjelaskan bahwa sunnah bersiwak sangat dianjurkan dalam lima keadaan utama: sebelum sholat, saat wudhu, saat membaca Al-Quran, saat bangun tidur, dan ketika bau mulut berubah.',
    tafsirEn:
      'Imam An-Nawawi emphasizes using siwak especially before prayer, during ablution, before Quran recitation, upon waking, and whenever mouth odor changes.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 10,
    guideType: 'kebiasaan',
    stepOrder: 2,
    title: 'Menjaga Sholat Sunnah Rawatib (12 Rakaat Sehari Semalam)',
    titleEn: 'Maintaining the 12 Daily Sunnah Rawatib Rak’ahs',
    arabicText: 'مَنْ صَلَّى ثِنْتَيْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ',
    latinText: 'Man ṣallā ṡintai ‘asyrata rak‘atan fī yaumin wa lailatin buniya lahū bihinna baitun fil-jannah.',
    translation:
      'Menjaga 12 rakaat sholat sunnah rawatib: 4 rakaat sebelum Dzuhur, 2 rakaat setelah Dzuhur, 2 rakaat setelah Maghrib, 2 rakaat setelah Isya, dan 2 rakaat sebelum Subuh.',
    translationEn:
      'Maintaining 12 voluntary rak’ahs daily: 4 before Dhuhr, 2 after Dhuhr, 2 after Maghrib, 2 after Isha, and 2 before Fajr.',
    dalilSource: 'Shahih Muslim no. 728 & Jami’ At-Tirmidzi no. 415',
    dalilStatus: 'Shahih',
    dalilText:
      'Ummu Habibah radhiyallahu anha meriwayatkan sabda Nabi ﷺ: "Barang siapa mengerjakan sholat sunnah 12 rakaat dalam sehari semalam, niscaya dibangunkan baginya sebuah rumah di surga." (HR. Muslim no. 728).',
    dalilTextEn:
      'Umm Habibah narrated that the Messenger of Allah ﷺ said: "Whoever prays twelve voluntary rak’ahs in a day and night will have a house built for him in Paradise." (Muslim no. 728).',
    tafsir:
      'Sholat sunnah rawatib juga berfungsi sebagai penyempurna apabila ada kekurangan kekhusyukan dalam sholat fardhu pada hari kiamat.',
    tafsirEn:
      'Rawatib voluntary prayers also make up for any deficiencies in focus or humility during obligatory prayers on the Day of Judgment.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 11,
    guideType: 'kebiasaan',
    stepOrder: 3,
    title: 'Sholat Dhuha Sebagai Sedekah Seluruh Persendian',
    titleEn: 'Dhuha Prayer as Charity for Every Joint',
    arabicText: 'وَيُجْزِئُ مِنْ ذٰلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى',
    latinText: "Wa yujzi'u min żālika rak'atāni yarka'uhumā minaḍ-ḍuḥā.",
    translation:
      'Mengerjakan sholat Dhuha minimal 2 rakaat pada pagi hari (sekitar 15 menit setelah matahari terbit hingga menjelang Dzuhur).',
    translationEn:
      'Performing at least 2 rak’ahs of Dhuha prayer in the morning (starting ~15 minutes after sunrise until shortly before Dhuhr).',
    dalilSource: 'Shahih Muslim no. 720',
    dalilStatus: 'Shahih',
    dalilText:
      'Abu Dzar radhiyallahu anhu meriwayatkan sabda Nabi ﷺ: "Setiap pagi, pada setiap persendian salah seorang dari kalian terdapat kewajiban sedekah: maka setiap bacaan tasbih adalah sedekah, setiap bacaan tahmid adalah sedekah, setiap bacaan tahlil adalah sedekah, setiap bacaan takbir adalah sedekah, memerintahkan kebaikan adalah sedekah, mencegah kemungkaran adalah sedekah; dan semua itu cukup tercukupi dengan dua rakaat sholat yang dikerjakan pada waktu Dhuha." (HR. Muslim no. 720).',
    dalilTextEn:
      'Abu Dharr reported that the Prophet ﷺ said: "In the morning, charity is due from every joint of your body: every Tasbih, Tahmid, Tahlil, Takbir, enjoining good, and forbidding evil is charity—and two rak’ahs of Dhuha prayer suffice for all of it." (Muslim no. 720).',
    tafsir:
      'Menjadi syukur nyata seorang hamba atas nikmat kesehatan 360 persendian tubuh setiap pagi.',
    tafsirEn:
      'Serves as daily practical gratitude for the blessing of all 360 joints of the human body functioning in health.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 12,
    guideType: 'kebiasaan',
    stepOrder: 4,
    title: 'Makan & Minum dengan Tangan Kanan Serta Membaca Bismillah',
    titleEn: 'Eating & Drinking With the Right Hand After Saying Bismillah',
    arabicText: 'يَا غُلَامُ، سَمِّ اللّٰهَ، وَكُلْ بِيَمِيْنِكَ، وَكُلْ مِمَّا يَلِيْكَ',
    latinText: 'Yā gulām, sammillāh, wa kul biyamīnik, wa kul mimmā yalīk.',
    translation:
      'Mengawali makan dan minum dengan membaca "Bismillah", menggunakan tangan kanan, duduk saat minum (kecuali ada udzur), dan menutupnya dengan "Alhamdulillah".',
    translationEn:
      'Begin eating and drinking by saying "Bismillah", use the right hand, sit while drinking when able, and conclude with "Alhamdulillah".',
    dalilSource: 'Shahih Al-Bukhari no. 5376 & Shahih Muslim no. 2022',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Umar bin Abi Salamah radhiyallahu anhu berkata, Rasulullah ﷺ bersabda kepadaku: "Wahai anakku, sebutlah nama Allah (Bismillah), makanlah dengan tangan kananmu, dan makanlah apa yang ada di dekatmu." (HR. Bukhari no. 5376 & Muslim no. 2022).',
    dalilTextEn:
      'Umar ibn Abi Salamah narrated that the Messenger of Allah ﷺ instructed him: "O young boy, mention the name of Allah (Bismillah), eat with your right hand, and eat from what is directly in front of you." (Al-Bukhari no. 5376 & Muslim no. 2022).',
    tafsir:
      'Mengajarkan keberkahan dalam rezeki serta membedakan adab seorang mukmin dari kebiasaan setan yang makan dengan tangan kiri.',
    tafsirEn:
      'Brings blessing into daily sustenance and distinguishes prophetic etiquette from eating with the left hand.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 13,
    guideType: 'kebiasaan',
    stepOrder: 5,
    title: 'Berwudhu & Berbaring Miring ke Kanan Sebelum Tidur',
    titleEn: 'Performing Wudhu & Sleeping on the Right Side',
    arabicText: 'إِذَا أَتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوْءَكَ لِلصَّلَاةِ، ثُمَّ اضْطَجِعْ عَلَى شِقِّكَ الْأَيْمَنِ',
    latinText: "Iżā ataita maḍja'aka fatawaḍḍa' wuḍū'aka liṣ-ṣalāh, ṡummaḍṭaji' 'alā syiqqikal-aiman.",
    translation:
      'Berwudhu terlebih dahulu sebelum tidur, membersihkan tempat tidur, berbaring miring ke sisi kanan, lalu membaca Ayat Kursi, Al-Ikhlas, Al-Falaq, An-Nas, dan doa sebelum tidur.',
    translationEn:
      'Perform ablution before sleep, dust off the bed, lie on the right side, and recite Ayat al-Kursi, the three Quls, and the bedtime supplication.',
    dalilSource: 'Shahih Al-Bukhari no. 247 & Shahih Muslim no. 2710',
    dalilStatus: "Muttafaqun 'Alaih (Shahih Bukhari & Muslim)",
    dalilText:
      'Al-Bara’ bin Azib radhiyallahu anhu meriwayatkan sabda Nabi ﷺ: "Apabila engkau hendak mendatangi tempat tidurmu, berwudhulah sebagaimana wudhumu untuk sholat, kemudian berbaringlah di atas sisi kananmu, lalu ucapkanlah: Allahumma aslamtu nafsi ilaika, wa wajjahtu wajhi ilaika, wa fawwadhtu amri ilaika, wa alja’tu zhahri ilaika, raghbatan wa rahbatan ilaika, la malja’a wa la manja minka illa ilaika, amantu bikitabikalladzi anzalta wa binabiyyikalladzi arsalta. Apabila engkau meninggal pada malam itu, engkau meninggal di atas fitrah; dan jadikanlah doa ini sebagai ucapan terakhirmu." (HR. Bukhari no. 247 & Muslim no. 2710).',
    dalilTextEn:
      'Al-Bara ibn Azib reported that the Prophet ﷺ said: "When you go to your bed, perform ablution as for prayer, then lie down on your right side and recite: O Allah, I submit myself to You..." Whoever passes away that night dies upon the natural upright faith (fitrah) (Al-Bukhari no. 247 & Muslim no. 2710).',
    tafsir:
      'Ibnu Hajar menyebutkan bahwa tidur dalam keadaan suci berwudhu menjadikan ruh berada dalam penjagaan malaikat dan bila wafat dalam tidur, ia wafat di atas fitrah.',
    tafsirEn:
      'Ibn Hajar explains that sleeping in a state of ablution keeps the soul under angelic protection and ensures that if one passes away during sleep, one dies upon fitrah.',
    isPublished: true,
    createdAt: nowIso,
  },
];

export const INITIAL_FIGURES: ScholarFigure[] = [
  {
    id: 1,
    name: 'Abu Hurairah',
    fullName: 'Abdurrahman bin Shakhr Ad-Dausi (Kunyah: Abu Hurairah)',
    nasab: 'Abdurrahman bin Shakhr bin ‘Amir bin Dzi Asy-Syara bin Tharif bin ‘Itab bin Abi Sha’b bin Munabbih bin Sa’d bin Tsa’labah bin Sulaim bin Fahm bin Ghanam bin Daus Ad-Dausi Al-Yamani.',
    role: 'Sahabat Nabi ﷺ · Al-Muktsirun fi Ar-Riwayah (Sahabat Paling Banyak Meriwayatkan Hadis)',
    tabaqah: 'Sahabat (Masuk Islam tahun 7 H / Khaibar)',
    birthDeath: 'Lahir ~19 SH – Wafat 57 H / 678 M di Madinah',
    jarhWaTadil: 'Shahabi Jalil — Seluruh Sahabat Nabi ﷺ adalah ‘Udul (terpercaya & adil) berdasarkan ketetapan Al-Quran, As-Sunnah, dan ijma’ Ahlus Sunnah wal Jama’ah. Beliau didoakan langsung oleh Nabi ﷺ agar hafalannya tidak pernah lupa.',
    teachersAndStudents: 'Guru utama: Rasulullah ﷺ, Abu Bakar, Umar, Ubay bin Ka’ab. Murid terkenal: Sa’id bin Al-Musayyab, Urwah bin Az-Zubair, Abu Salamah bin Abdirrahman, Ibnu Abbas, Ibnu Umar (~800 perawi).',
    majorWorks: 'Meriwayatkan sekitar 5.374 hadis yang termaktub dalam Shahih Al-Bukhari, Shahih Muslim, dan Kutubus Sittah (termasuk Shahifah Hammam bin Munabbih).',
    biography: 'Pemuka Ahli Shuffah yang mendedikasikan hidupnya untuk menyertai majelis Rasulullah ﷺ demi menghafal hadis. Doa keberkahan hafalan dari Nabi ﷺ menjadikan beliau penjaga sunnah paling produktif di kalangan Sahabat.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 2,
    name: 'Umar bin Al-Khaththab',
    fullName: 'Amirul Mukminin Abu Hafsh Umar bin Al-Khaththab Al-Faruq',
    nasab: 'Umar bin Al-Khaththab bin Nufail bin Abdul ‘Uzza bin Riyah bin Abdullah bin Qurth bin Razah bin ‘Adi bin Ka’ab bin Lu’ay Al-Qurasyi Al-‘Adawi (bertemu nasab dengan Nabi ﷺ pada Ka’ab bin Lu’ay).',
    role: 'Sahabat Nabi ﷺ · Khalifah Rasyidah Kedua · Al-Faruq',
    tabaqah: 'Sahabat Senior (As-Sabiqunal Awwalun, Ahli Badar)',
    birthDeath: 'Lahir ~40 SH – Wafat syahid 23 H / 644 M di Madinah',
    jarhWaTadil: 'Shahabi Jalil · Dijamin masuk surga oleh Rasulullah ﷺ dan diperintahkan untuk diikuti sunnahnya bersama Khulafaur Rasyidin.',
    teachersAndStudents: 'Meriwayatkan langsung dari Nabi ﷺ. Murid: Abdullah bin Umar, Ali bin Abi Thalib, Ibnu Abbas, Abu Hurairah, Anas bin Malik, Alqamah bin Qais.',
    majorWorks: 'Meriwayatkan sekitar 537 hadis termasuk hadis agung "Innamal A’malu bin-Niyyat" (Hadis pertama Shahih Al-Bukhari) dan Hadis Jibril tentang Islam, Iman, dan Ihsan.',
    biography: 'Dikenal sangat teliti dan berhati-hati dalam menerima periwayatan hadis demi menjaga kemurnian sunnah serta menegakkan prinsip musyawarah dan keadilan Islam.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 3,
    name: 'Utsman bin Affan',
    fullName: 'Amirul Mukminin Abu Abdillah Utsman bin Affan Dzun Nurain',
    nasab: 'Utsman bin Affan bin Abil ‘Ash bin Umayyah bin Abd Syams bin Abdu Manaf bin Qushai bin Kilab Al-Qurasyi Al-Umawi (bertemu nasab dengan Nabi ﷺ pada Abdu Manaf).',
    role: 'Sahabat Nabi ﷺ · Khalifah Rasyidah Ketiga · Penulis Wahyu',
    tabaqah: 'Sahabat Senior (As-Sabiqunal Awwalun)',
    birthDeath: 'Lahir ~47 SH – Wafat syahid 35 H / 656 M di Madinah',
    jarhWaTadil: 'Shahabi Jalil · Termasuk sepuluh sahabat yang dijamin masuk surga dan dijuluki Dzun Nurain karena menikahi dua putri Rasulullah ﷺ.',
    teachersAndStudents: 'Meriwayatkan langsung dari Nabi ﷺ. Murid: Aban bin Utsman, Sa’id bin Al-Musayyab, Humran bin Aban (maulanya), Alqamah bin Waqqash.',
    majorWorks: 'Meriwayatkan sekitar 146 hadis (antara lain tata cara wudhu Nabi ﷺ dan keutamaan belajar Al-Quran) serta memprakarsai kodifikasi Mushaf Utsmani.',
    biography: 'Khalifah yang dikenal sangat pemalu, dermawan, ahli ibadah malam, dan berjasa menyatukan umat Islam di atas satu bacaan mushaf Al-Quran.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 4,
    name: 'Anas bin Malik',
    fullName: 'Abu Hamzah Anas bin Malik Al-Anshari (Khadim Rasulullah ﷺ)',
    nasab: 'Anas bin Malik bin An-Nadhr bin Dhamdham bin Zaid bin Haram bin Jundab bin ‘Amir bin Ghanam bin ‘Adi bin An-Najjar Al-Anshari Al-Khazraji.',
    role: 'Sahabat Nabi ﷺ · Pelayan Rasulullah ﷺ Selama 10 Tahun · Al-Muktsirun',
    tabaqah: 'Sahabat (Dari kalangan Anshar Bani Najjar)',
    birthDeath: 'Lahir 10 SH – Wafat 93 H / 712 M di Bashrah',
    jarhWaTadil: 'Shahabi Jalil · Didoakan langsung oleh Nabi ﷺ keberkahan harta, keturunan, umur panjang, dan ampunan.',
    teachersAndStudents: 'Guru: Rasulullah ﷺ, Abu Bakar, Umar, Utsman, Mu’adz bin Jabal. Murid: Az-Zuhri, Qatadah, Tsabit Al-Bunani, Hasan Al-Bashri, Muhammad bin Sirin.',
    majorWorks: 'Meriwayatkan sekitar 2.286 hadis (terbanyak ketiga di kalangan Sahabat), memuat banyak detail akhlak, sholat, doa, dan muamalah Nabi ﷺ.',
    biography: 'Diserahkan ibunya Ummu Sulaim untuk melayani Nabi ﷺ sejak usia 10 tahun saat hijrah ke Madinah hingga wafatnya Nabi ﷺ, sehingga mengetahui keseharian beliau lahir maupun batin.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 5,
    name: 'Hudzaifah bin Al-Yaman',
    fullName: 'Abu Abdillah Hudzaifah bin Al-Yaman (Hisil bin Jabir) Al-‘Absi',
    nasab: 'Hudzaifah bin Hisil (digelari Al-Yaman) bin Jabir bin ‘Amr bin Rabi’ah bin Jarwah bin Al-Harits bin Qathi’ah bin ‘Abs Al-Ghathafani, bersekutu dengan Bani Abdul Asyhal Anshar.',
    role: 'Sahabat Nabi ﷺ · Shahibus Sirri (Pemegang Rahasia Nabi ﷺ)',
    tabaqah: 'Sahabat (Ahli Uhud dan peperangan setelahnya)',
    birthDeath: 'Wafat 36 H / 656 M di Al-Mada’in',
    jarhWaTadil: 'Shahabi Jalil · Dipercaya Rasulullah ﷺ memegang daftar nama kaum munafik dan hadis-hadis fitnah akhir zaman.',
    teachersAndStudents: 'Guru: Rasulullah ﷺ, Umar bin Al-Khaththab. Murid: Rib’i bin Hirasy, Shilah bin Zufar, Abu Wa’il Syaqiq bin Salamah, Zaid bin Wahb.',
    majorWorks: 'Meriwayatkan sekitar 225 hadis, termasuk zikir tidur/bangun tidur, sifat sholat malam Nabi ﷺ, dan hadis-hadis fitnah.',
    biography: 'Sahabat yang paling tekun bertanya kepada Nabi ﷺ mengenai keburukan agar tidak terjerumus ke dalamnya, serta menjadi rujukan utama dalam fiqih kehati-hatian.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 6,
    name: 'Ibnu Mas’ud',
    fullName: 'Abu Abdirrahman Abdullah bin Mas’ud Al-Hudzali',
    nasab: 'Abdullah bin Mas’ud bin Ghafil bin Habib bin Syamkh bin Far bin Makhzum bin Shahilah bin Kahil bin Al-Harits bin Tamim bin Sa’d bin Hudzail Al-Hudzali.',
    role: 'Sahabat Nabi ﷺ · Faqihul Ummah · Imam Ahli Qira’at',
    tabaqah: 'Sahabat Senior (As-Sabiqunal Awwalun, masuk Islam ke-6)',
    birthDeath: 'Wafat 32 H / 653 M di Madinah',
    jarhWaTadil: 'Shahabi Jalil · Nabi ﷺ memuji bacaan Al-Qurannya dan bersabda agar umat berpegang pada pengajaran Al-Quran darinya.',
    teachersAndStudents: 'Guru: Rasulullah ﷺ. Murid: Alqamah bin Qais, Al-Aswad bin Yazid, Masruq bin Al-Ajda’, Abu Wa’il (cikal bakal madrasah hadis dan fiqih Kufah).',
    majorWorks: 'Meriwayatkan sekitar 848 hadis, antara lain tasyahud dalam sholat, zikir memasuki pagi/petang, dan prinsip mengikuti sunnah di atas bid’ah.',
    biography: 'Salah seorang sahabat terdekat yang mengurus sandal, siwak, dan air wudhu Nabi ﷺ serta menjadi guru utama generasi Tabi’in di Kufah.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 7,
    name: 'Al-Bukhari',
    fullName: 'Al-Imam Abu Abdillah Muhammad bin Isma’il Al-Bukhari',
    nasab: 'Muhammad bin Isma’il bin Ibrahim bin Al-Mughirah bin Bardizbah Al-Ju’fi Al-Bukhari (maula Al-Yaman Al-Ju’fi).',
    role: 'Imam Ahlul Hadits · Amirul Mukminin fil Hadits · Penyusun Al-Jami’ Ash-Shahih',
    tabaqah: 'Tabi’ul Atba’ / Abad ke-3 H',
    birthDeath: '194 H – 256 H (810 M – 870 M)',
    jarhWaTadil: 'Imam Hujjah, Hafizh Mutqin — Disepakati seluruh ulama Islam sebagai puncak ketelitian dalam syarat kesahihan sanad (syarat liqa’ / pertemuan langsung antara guru dan murid).',
    teachersAndStudents: 'Guru: Ali bin Al-Madini, Ahmad bin Hanbal, Yahya bin Ma’in, Ishaq bin Rahawaih, Al-Humaidi. Murid: Imam Muslim, At-Tirmidzi, An-Nasai, Ibnu Khuzaimah, Al-Firabri.',
    majorWorks: 'Al-Jami’ Ash-Shahih (Shahih Al-Bukhari — kitab paling shahih setelah Al-Quran), Al-Adab Al-Mufrad, At-Tarikh Al-Kabir, Khalq Af’al Al-‘Ibad.',
    biography: 'Lahir di Bukhara, hafal hadis sejak kecil, dan melakukan perjalanan ilmu selama belasan tahun ke Hijaz, Syam, Mesir, dan Irak untuk menyaring hadis shahih dari 600.000 riwayat.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 8,
    name: 'Imam Muslim',
    fullName: 'Al-Imam Abul Husain Muslim bin Al-Hajjaj Al-Qusyairi An-Naisaburi',
    nasab: 'Muslim bin Al-Hajjaj bin Muslim bin Ward bin Kausyaz Al-Qusyairi An-Naisaburi.',
    role: 'Imam Ahlul Hadits · Penyusun Shahih Muslim',
    tabaqah: 'Abad ke-3 H (Murid langsung Imam Al-Bukhari)',
    birthDeath: '204 H – 261 H (820 M – 875 M)',
    jarhWaTadil: 'Imam Hafizh Tsiqah Tsabt — Kitab Shahih-nya menempati posisi kedua paling otentik setelah Shahih Al-Bukhari menurut ijma’ ulama hadis.',
    teachersAndStudents: 'Guru: Imam Al-Bukhari, Ahmad bin Hanbal, Yahya bin Yahya At-Tamimi, Qutaibah bin Sa’id. Murid: At-Tirmidzi, Ibnu Abi Hatim, Ibnu Khuzaimah.',
    majorWorks: 'Al-Musnad Ash-Shahih (Shahih Muslim), Al-Kuna wal Asma’, At-Tamyiz, Ath-Thabaqat.',
    biography: 'Dikenal sangat rapi menyusun seluruh jalur sanad dan variasi lafaz satu hadis dalam satu bab sehingga memudahkan ulama meneliti keutuhan matan.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 9,
    name: 'Imam An-Nawawi',
    fullName: 'Al-Imam Muhyiddin Abu Zakariya Yahya bin Syaraf An-Nawawi',
    nasab: 'Yahya bin Syaraf bin Murri bin Hasan bin Husain bin Muhammad bin Jum’ah bin Hizam Al-Hizami An-Nawawi Ad-Dimasyqi.',
    role: 'Muhaddits, Faqih & Pensyarah Shahih Muslim',
    tabaqah: 'Ulama Abad ke-7 H (Wafat usia 45 tahun dengan karya melimpah)',
    birthDeath: '631 H – 676 H (1233 M – 1277 M)',
    jarhWaTadil: 'Al-Hafizh Al-Faqih — Rujukan terpercaya dalam syarah hadis, takhrij ringkas, dan adab penuntut ilmu.',
    teachersAndStudents: 'Guru: Al-Kamal Ishaq Al-Maghribi, Ibnu Abdud Daim Al-Maqdisi. Murid: Al-Mizzi (penyusun Tahdzibul Kamal), Ibnul ‘Aththar.',
    majorWorks: 'Al-Minhaj Syarh Shahih Muslim, Riyadhus Shalihin, Al-Arba’in An-Nawawiyah, Al-Adzkar, At-Tibyan fi Adab Hamalatil Quran.',
    biography: 'Menghabiskan seluruh waktunya di Damaskus untuk belajar, mengajar, menulis, dan wara’. Kitab-kitab beliau menjadi kurikulum dasar kaum muslimin di seluruh dunia.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 10,
    name: 'Ibnu Hajar Al-Asqalani',
    fullName: 'Al-Hafizh Syihabuddin Abul Fadhl Ahmad bin Ali bin Hajar Al-Asqalani',
    nasab: 'Ahmad bin Ali bin Muhammad bin Muhammad bin Ali bin Mahmud bin Ahmad bin Hajar Al-Kinani Al-Asqalani Al-Mishri.',
    role: 'Amirul Mukminin fil Hadits pada masanya · Penulis Fathul Bari',
    tabaqah: 'Ulama Abad ke-8–9 H',
    birthDeath: '773 H – 852 H (1372 M – 1449 M)',
    jarhWaTadil: 'Hafizhul Islam wa Imamul Muhadditsin — Penilaian beliau dalam ilmu Rijal (Taqribut Tahdzib) dan Fathul Bari menjadi standar emas ulama hadis muta’akhkhirin.',
    teachersAndStudents: 'Guru: Zainuddin Al-‘Iraqi, Nuruddin Al-Haitsami, Al-Bulqini. Murid: As-Sakhawi, Zakariya Al-Anshari, As-Suyuthi (secara ijazah).',
    majorWorks: 'Fathul Bari Syarh Shahih Al-Bukhari, Bulughul Maram, Nukhbatul Fikar, Al-Ishabah fi Tamyizish Shahabah, Tahdzibut Tahdzib, Taqribut Tahdzib.',
    biography: 'Menulis syarah terbaik Shahih Al-Bukhari (Fathul Bari) selama sekitar 25 tahun dengan ketelitian luar biasa terhadap sanad, bahasa, dan fiqih hadis.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 11,
    name: 'Ibnu Katsir',
    fullName: 'Al-Hafizh ‘Imaduddin Abul Fida’ Isma’il bin Umar bin Katsir',
    nasab: 'Isma’il bin Umar bin Katsir bin Dhau’ bin Dzar’ Al-Qurasyi Al-Bashrawi Ad-Dimasyqi.',
    role: 'Mufassir, Muhaddits & Sejarawan Islam',
    tabaqah: 'Ulama Abad ke-8 H (Murid utama Ibnu Taimiyah & Al-Mizzi)',
    birthDeath: '701 H – 774 H (1301 M – 1373 M)',
    jarhWaTadil: 'Hafizh Mufassir Muhaqqiq — Sangat ketat menyaring riwayat israiliyat dan menafsirkan Al-Quran dengan Al-Quran serta hadis shahih.',
    teachersAndStudents: 'Guru: Jamaluddin Al-Mizzi (mertuanya), Syaikhul Islam Ibnu Taimiyah, Adz-Dzahabi. Murid: Ibnu Hajji, Ibnu Abil ‘Izz Al-Hanafi.',
    majorWorks: 'Tafsir Al-Qur’anil ‘Azhim (Tafsir Ibnu Katsir), Al-Bidayah wan Nihayah, Ikhtishar ‘Ulumil Hadits (Al-Ba’itsul Hatsits).',
    biography: 'Tafsir beliau dipuji para ulama sebagai kitab tafsir bil ma’tsur (berdasarkan riwayat shahih) paling lurus dan bermanfaat bagi umat.',
    isPublished: true,
    createdAt: nowIso,
  },
  {
    id: 12,
    name: 'Al-Albani',
    fullName: 'Asy-Syaikh Muhammad Nashiruddin Al-Albani',
    nasab: 'Muhammad Nashiruddin bin Nuh Najati bin Adam Al-Asykudari Al-Albani.',
    role: 'Muhaddits & Muhaqqiq Hadis Abad ke-14/15 H',
    tabaqah: 'Ulama Kontemporer (Wafat 1420 H / 1999 M)',
    birthDeath: '1332 H – 1420 H (1914 M – 1999 M)',
    jarhWaTadil: 'Ahli Takhrij Hadis terkemuka abad ini yang mendedikasikan puluhan tahun meneliti manuskrip kitab-kitab Sunan di Perpustakaan Azh-Zhahiriyah Damaskus.',
    teachersAndStudents: 'Guru: Syaikh Raghib Ath-Thabbakh (ijazah hadis). Murid: Syaikh Muqbil bin Hadi, Syaikh Ali Hasan Al-Halabi, Syaikh Masyhur Hasan Salman.',
    majorWorks: 'Silsilah Al-Ahadits Ash-Shahihah, Silsilah Al-Ahadits Adh-Dha’ifah, Irwa’ul Ghalil, Shahihul Jami’, Shifat Shalat An-Nabi ﷺ.',
    biography: 'Menghidupkan kembali gerakan takhrij dan pemilahan antara hadis shahih dan dha’if di tengah masyarakat umum secara sistematis dan mudah diakses.',
    isPublished: true,
    createdAt: nowIso,
  },
];
