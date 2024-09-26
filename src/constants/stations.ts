// https://www.bts.co.th/eng/library/system-structuer.html
// data as of 2023

import { Line } from "@/types/dto"

const stations: Line[] = [
    {
      id: 'airport-rail-link',
      name: {
        en: 'Airport Rail Link',
        th: 'สายท่าอากาศยาน',
      },
      color: '#89171F',
      stations: [
        {
          id: 'N2',
          alias: 'A8',
          name: {
            en: 'Phaya Thai',
            th: 'พญาไท',
          },
        },
        {
          id: 'A7',
          name: {
            en: 'Ratchaprarop',
            th: 'ราชปรารภ',
          },
        },
        {
          id: 'A6',
          name: {
            en: 'Makkasan',
            th: 'มักกะสัน',
          },
        },
        {
          id: 'A5',
          name: {
            en: 'Ramkhamhaeng',
            th: 'รามคำแหง',
          },
        },
        {
          id: 'A4',
          name: {
            en: 'Hua Mak',
            th: 'หัวหมาก',
          },
        },
        {
          id: 'A3',
          name: {
            en: 'Ban Thap Chang',
            th: 'บ้านทับช้าง',
          },
        },
        {
          id: 'A2',
          name: {
            en: 'Lad Krabang',
            th: 'ลาดกระบัง',
          },
        },
        {
          id: 'A1',
          name: {
            en: 'Suvarnabhumi Airport',
            th: 'ท่าอากาศยานสุวรรณภูมิ',
          },
        },
      ],
    },
    {
      id: 'sukhumvit-line',
      name: {
        en: 'Sukhumvit Line',
        th: 'สายสุขุมวิท',
      },
      color: '#6EC145',
      stations: [
        {
          id: 'N8',
          name: {
            en: 'Mo Chit / Chatuchak Park',
            th: 'หมอชิต / สวนจตุจักร',
          },
        },
        {
          id: 'N7',
          name: {
            en: 'Saphan Kwai',
            th: 'สะพานควาย',
          },
        },
        {
          id: 'N6',
          unavailable: true,
          name: {
            en: 'Sena Ruam',
            th: 'เสนาร่วม',
          },
        },
        {
          id: 'N5',
          name: {
            en: 'Ari',
            th: 'อารีย์',
          },
        },
        {
          id: 'N4',
          name: {
            en: 'Sanam Pao',
            th: 'สนามเป้า',
          },
        },
        {
          id: 'N3',
          name: {
            en: 'Victory Monument',
            th: 'อนุสาวรีย์ชัยสมรภูมิ',
          },
        },
        {
          id: 'N2',
          name: {
            en: 'Phaya Thai',
            th: 'พญาไท',
          },
        },
        {
          id: 'N1',
          name: {
            en: 'Ratchathewi',
            th: 'ราชเทวี',
          },
        },
        {
          id: 'CEN',
          name: {
            en: 'Siam',
            th: 'สยาม',
          },
        },
        {
          id: 'E1',
          name: {
            en: 'Chit Lom',
            th: 'ชิดลม',
          },
        },
        {
          id: 'E2',
          name: {
            en: 'Ploen Chit',
            th: 'เพลินจิต',
          },
        },
        {
          id: 'E3',
          name: {
            en: 'Nana',
            th: 'นานา',
          },
        },
        {
          id: 'E4',
          name: {
            en: 'Asok (M)',
            th: 'อโศก (M)',
          },
        },
        {
          id: 'E5',
          name: {
            en: 'Phrom Phong',
            th: 'พร้อมพงษ์',
          },
        },
        {
          id: 'E6',
          name: {
            en: 'Thong Lo',
            th: 'ทองหล่อ',
          },
        },
        {
          id: 'E7',
          name: {
            en: 'Ekkamai',
            th: 'เอกมัย',
          },
        },
        {
          id: 'E8',
          name: {
            en: 'Phra Khanong',
            th: 'พระโขนง',
          },
        },
        {
          id: 'E9',
          name: {
            en: 'On Nut',
            th: 'อ่อนนุช',
          },
        },
        {
          id: 'E10',
          name: {
            en: 'Bang Chak',
            th: 'บางจาก',
          },
        },
        {
          id: 'E11',
          name: {
            en: 'Punnawithi',
            th: 'ปุณณวิถี',
          },
        },
        {
          id: 'E12',
          name: {
            en: 'Udom Suk',
            th: 'อุดมสุข',
          },
        },
        {
          id: 'E13',
          name: {
            en: 'Bang Na',
            th: 'บางนา',
          },
        },
        {
          id: 'E14',
          name: {
            en: 'Bearing',
            th: 'แบริ่ง',
          },
        },
      ],
    },
    {
      id: 'silom-line',
      name: {
        en: 'Silom Line',
        th: 'สายสีลม',
      },
      color: '#0E9B4D',
      stations: [
        {
          id: 'W1',
          name: {
            en: 'National Stadium',
            th: 'สนามกีฬาแห่งชาติ',
          },
        },
        {
          id: 'CEN',
          name: {
            en: 'Siam',
            th: 'สยาม',
          },
        },
        {
          id: 'S1',
          name: {
            en: 'Ratchadamri',
            th: 'ราชดำริ',
          },
        },
        {
          id: 'S2',
          name: {
            en: 'Sala Daeng',
            th: 'ศาลาแดง',
          },
        },
        {
          id: 'S3',
          name: {
            en: 'Chong Nonsi',
            th: 'ช่องนนทรี',
          },
        },
        {
          id: 'S4',
          name: {
            en: 'Saint Louis',
            th: 'เซนต์หลุยส์',
          },
        },
        {
          id: 'S5',
          name: {
            en: 'Surasak',
            th: 'สุรศักดิ์',
          },
        },
        {
          id: 'S6',
          name: {
            en: 'Saphan Taksin',
            th: 'สะพานตากสิน',
          },
        },
        {
          id: 'S7',
          name: {
            en: 'Krung Thon Buri',
            th: 'กรุงธนบุรี',
          },
        },
        {
          id: 'S8',
          name: {
            en: 'Wongwian Yai',
            th: 'วงเวียนใหญ่',
          },
        },
        {
          id: 'S9',
          name: {
            en: 'Pho Nimit',
            th: 'พระนครศรีอยุธยา',
          },
        },
        {
          id: 'S10',
          name: {
            en: 'Talat Phlu',
            th: 'ตลาดพลู',
          },
        },
        {
          id: 'S11',
          name: {
            en: 'Wutthakat',
            th: 'วุฒากาศ',
          },
        },
        {
          id: 'S12',
          name: {
            en: 'Bang Wa',
            th: 'บางหว้า',
          },
        },
      ],
    },
  ]
  
  export default stations