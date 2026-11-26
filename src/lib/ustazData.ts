export interface UstazMotivation {
  id: string;
  ustazName: string;
  roleId: string;
  roleEn: string;
  quoteId: string;
  quoteEn: string;
  dalilNoteId: string;
  dalilNoteEn: string;
}

export const USTAZ_MOTIVATIONS: UstazMotivation[] = [
  {
    id: 'khalid-basalamah',
    ustazName: 'Ustadz Dr. Khalid Basalamah, M.A.',
    roleId: 'Da’i Ahlus Sunnah · Pengisi Kajian Shahih Al-Bukhari',
    roleEn: 'Contemporary Sunnah Teacher · Hadith Lecturer',
    quoteId:
      '“Setiap orang di surga memiliki derajat masing-masing; perbedaan satu derajat di surga saja bagaikan melihat bintang yang bersinar nun jauh di langit. Karena itu jangan remehkan keistiqamahan dalam zikir pagi dan petang—amalan ringan yang dijaga setiap hari bisa mengangkat derajat kita jauh lebih tinggi di surga.”',
    quoteEn:
      '“Every inhabitant of Paradise holds a distinct rank; the distance between one rank and the next is like gazing at a distant star across the horizon. Never underestimate steadfastness in morning and evening dhikr—consistent daily remembrance lifts our degree much higher in Paradise.”',
    dalilNoteId:
      'Pengingat tentang tingginya derajat surga dalam HR. Al-Bukhari no. 2790 & HR. Imam Muslim no. 2831 (dari Abu Sa’id Al-Khudri).',
    dalilNoteEn:
      'Reflection grounded in the ranks of Paradise (Al-Bukhari no. 2790 & Imam Muslim no. 2831).',
  },
  {
    id: 'abu-yahya-badrusalam',
    ustazName: 'Ustadz Abu Yahya Badrusalam, Lc.',
    roleId: 'Pengajar Ilmu Hadis & Usul Sunnah',
    roleEn: 'Hadith & Sunnah Methodology Teacher',
    quoteId:
      '“Ketenangan hati tidak datang dari banyaknya amalan tanpa tuntunan, melainkan dari mengikuti sunnah Rasulullah ﷺ dengan ilmu, keikhlasan, dan keistiqamahan walau dalam zikir singkat yang dibaca setiap pagi dan sore.”',
    quoteEn:
      '“Serenity of heart does not arise from invented practices, but from following the Prophet’s ﷺ Sunnah with sound knowledge, sincerity, and steady daily remembrance every morning and evening.”',
    dalilNoteId:
      'Merujuk prinsip keutamaan amal yang sahih dan berkesinambungan (HR. Al-Bukhari no. 6464 & Imam Muslim no. 783).',
    dalilNoteEn:
      'Reflecting the prophetic principle of authentic, consistent deeds (Al-Bukhari no. 6464 & Muslim no. 783).',
  },
  {
    id: 'syafiq-riza-basalamah',
    ustazName: 'Ustadz Dr. Syafiq Riza Basalamah, M.A.',
    roleId: 'Akademisi & Pendakwah Manhaj Salaf',
    roleEn: 'Islamic Scholar & Sunnah Educator',
    quoteId:
      '“Hati manusia bagaikan bumi yang kering; ia hanya akan hidup bila terus disiram dengan dzikrullah dan istighfar. Siapa yang rutin berzikir di awal pagi dan petang, Allah jaga langkahnya dari gelisah dan fitnah dunia.”',
    quoteEn:
      '“The human heart is like parched soil; it revives only when watered continuously with the remembrance of Allah and istighfar. Whoever guards morning and evening dhikr is shielded by Allah from restlessness.”',
    dalilNoteId:
      'Sejalan dengan QS. Ar-Ra’d: 28 tentang hati yang tenang dengan mengingat Allah & wasiat zikir pagi-petang.',
    dalilNoteEn:
      'In harmony with Quran 13:28 on hearts finding rest in the remembrance of Allah.',
  },
  {
    id: 'firanda-andirja',
    ustazName: 'Ustadz Dr. Firanda Andirja, M.A.',
    roleId: 'Pengajar Tafsir, Hadis & Akidah Ahlus Sunnah',
    roleEn: 'Teacher of Tafsir, Hadith & Creed',
    quoteId:
      '“Orang yang mengenal indahnya surga tidak akan menukar waktu fajar dan senjanya dengan kelalaian. Jadikan zikir, sholat sunnah, dan doa sebagai investasi abadi sebelum masa di dunia berakhir.”',
    quoteEn:
      '“One who truly appreciates the beauty of Paradise will never trade dawn and twilight hours for heedlessness. Make dhikr, voluntary prayer, and du’a your eternal investment before this life ends.”',
    dalilNoteId:
      'Berlandaskan motivasi berlomba dalam kebaikan (QS. Al-Hadid: 21) & HR. Imam Muslim tentang keutamaan majelis zikir.',
    dalilNoteEn:
      'Inspired by Quran 57:21 on racing toward forgiveness and Paradise.',
  },
];
