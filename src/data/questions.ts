import type { Question } from '../lib/types'

/**
 * Original items written for this project. The VARK model (Fleming) is used as
 * the conceptual framework only; the official VARK Questionnaire wording is
 * copyrighted and is not reproduced here.
 *
 * Scenarios are workplace-flavoured because the audience is corporate L&D.
 */
export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'บริษัทเพิ่งเปลี่ยนมาใช้ระบบใหม่ คุณจะเรียนรู้วิธีใช้อย่างไร',
    options: [
      { modality: 'V', text: 'ดูผังหน้าจอและไอคอนที่สรุปขั้นตอนไว้' },
      { modality: 'A', text: 'ให้เพื่อนร่วมงานที่ใช้เป็นแล้วอธิบายให้ฟัง' },
      { modality: 'R', text: 'อ่านคู่มือการใช้งานทีละหัวข้อ' },
      { modality: 'K', text: 'กดลองใช้จริงในระบบทดสอบไปเรื่อย ๆ' },
    ],
  },
  {
    id: 2,
    prompt: 'คุณต้องสอนงานพนักงานใหม่ในทีม',
    options: [
      { modality: 'V', text: 'วาดผังขั้นตอนงานให้ดู' },
      { modality: 'A', text: 'นั่งคุยอธิบายให้ฟังและตอบคำถามไปด้วย' },
      { modality: 'R', text: 'ส่งเอกสารขั้นตอนการทำงานให้อ่านก่อน' },
      { modality: 'K', text: 'ให้ลงมือทำงานจริงโดยมีคุณดูอยู่ข้าง ๆ' },
    ],
  },
  {
    id: 3,
    prompt: 'ต้องไปประชุมที่ตึกที่ไม่เคยไปมาก่อน',
    options: [
      { modality: 'V', text: 'ดูแผนที่และผังตึกล่วงหน้า' },
      { modality: 'A', text: 'โทรถามเจ้าหน้าที่ว่าไปทางไหน' },
      { modality: 'R', text: 'อ่านรายละเอียดที่อยู่และคำอธิบายเส้นทางที่ส่งมา' },
      { modality: 'K', text: 'ไปถึงก่อนเวลาแล้วเดินหาเอง' },
    ],
  },
  {
    id: 4,
    prompt: 'เลือกคอร์สอบรมให้ตัวเอง คุณดูอะไรเป็นหลัก',
    options: [
      { modality: 'V', text: 'ภาพรวมหลักสูตรที่ทำเป็นแผนภาพหรืออินโฟกราฟิก' },
      { modality: 'A', text: 'รีวิวจากคนที่เคยเรียนมาแล้ว' },
      { modality: 'R', text: 'รายละเอียดเนื้อหาและวัตถุประสงค์ที่เขียนไว้ทั้งหมด' },
      { modality: 'K', text: 'จำนวนชั่วโมงที่ได้ลงมือทำจริง' },
    ],
  },
  {
    id: 5,
    prompt: 'ฝ่ายบุคคลประกาศนโยบายใหม่',
    options: [
      { modality: 'V', text: 'ดูตารางเปรียบเทียบของเดิมกับของใหม่' },
      { modality: 'A', text: 'เข้าฟังเซสชันชี้แจงและถามคำถามในที่ประชุม' },
      { modality: 'R', text: 'อ่านเอกสารนโยบายฉบับเต็ม' },
      { modality: 'K', text: 'ดูตัวอย่างเคสจริงว่าถ้าเจอสถานการณ์นี้ต้องทำอย่างไร' },
    ],
  },
  {
    id: 6,
    prompt: 'คุณต้องนำเสนอผลงานไตรมาสให้ทีมฟัง',
    options: [
      { modality: 'V', text: 'ทำสไลด์ที่เน้นกราฟและแผนภาพ' },
      { modality: 'A', text: 'เล่าให้ฟังเป็นหลัก ใช้สไลด์น้อย' },
      { modality: 'R', text: 'แจกเอกสารสรุปเป็นข้อ ๆ ให้อ่านตาม' },
      { modality: 'K', text: 'ยกเคสงานจริงที่เพิ่งทำมาเป็นตัวอย่างประกอบ' },
    ],
  },
  {
    id: 7,
    prompt: 'มีอุปกรณ์ใหม่เข้ามาที่ออฟฟิศ',
    options: [
      { modality: 'V', text: 'ดูรูปประกอบขั้นตอนการติดตั้ง' },
      { modality: 'A', text: 'ให้ช่างหรือคนที่เคยใช้อธิบายวิธีใช้' },
      { modality: 'R', text: 'อ่านคู่มือที่แนบมาในกล่อง' },
      { modality: 'K', text: 'ลองประกอบและกดปุ่มดูเอง' },
    ],
  },
  {
    id: 8,
    prompt: 'คุณจำข้อมูลลูกค้ารายสำคัญได้จากอะไร',
    options: [
      { modality: 'V', text: 'ภาพโปรไฟล์หรือผังโครงสร้างองค์กรของเขา' },
      { modality: 'A', text: 'บทสนทนาที่คุยกันครั้งล่าสุด' },
      { modality: 'R', text: 'โน้ตที่จดไว้ตอนประชุม' },
      { modality: 'K', text: 'งานที่เคยทำร่วมกันมา' },
    ],
  },
  {
    id: 9,
    prompt: 'คุณอยากได้ feedback งานที่ส่งไปในรูปแบบไหน',
    options: [
      { modality: 'V', text: 'มาร์กจุดที่ต้องแก้ลงบนไฟล์ให้เห็นชัด' },
      { modality: 'A', text: 'นัดคุยแล้วบอกด้วยปากเปล่า' },
      { modality: 'R', text: 'เขียนคอมเมนต์เป็นข้อความกลับมา' },
      { modality: 'K', text: 'ยกตัวอย่างงานที่ดีกว่ามาเทียบให้ดู' },
    ],
  },
  {
    id: 10,
    prompt: 'เตรียมสอบใบรับรองวิชาชีพ',
    options: [
      { modality: 'V', text: 'ทำ mind map สรุปเนื้อหาทั้งหมด' },
      { modality: 'A', text: 'อ่านออกเสียงหรืออธิบายเนื้อหาให้คนอื่นฟัง' },
      { modality: 'R', text: 'อ่านหนังสือแล้วจดสรุปเป็นข้อ ๆ' },
      { modality: 'K', text: 'ทำข้อสอบเก่าและแล็บจนคล่อง' },
    ],
  },
  {
    id: 11,
    prompt: 'ต้องอธิบายขั้นตอนที่ซับซ้อนให้ลูกค้าเข้าใจ',
    options: [
      { modality: 'V', text: 'วาดผังขั้นตอนให้ดู' },
      { modality: 'A', text: 'อธิบายด้วยการพูดทีละขั้น' },
      { modality: 'R', text: 'ส่งเอกสารขั้นตอนให้อ่าน' },
      { modality: 'K', text: 'พาทำไปพร้อมกันทีละขั้น' },
    ],
  },
  {
    id: 12,
    prompt: 'workshop แบบไหนที่คุณได้ประโยชน์มากที่สุด',
    options: [
      { modality: 'V', text: 'วิทยากรใช้ภาพและแผนภาพประกอบเยอะ' },
      { modality: 'A', text: 'มีวงแลกเปลี่ยนความเห็นและถามตอบ' },
      { modality: 'R', text: 'มีเอกสารประกอบละเอียดให้กลับไปอ่านต่อ' },
      { modality: 'K', text: 'ได้ลงมือทำกิจกรรมจริงเกือบทั้งวัน' },
    ],
  },
  {
    id: 13,
    prompt: 'ผ่านไปหนึ่งเดือนหลังอบรม อะไรที่คุณยังจำได้',
    options: [
      { modality: 'V', text: 'ภาพหรือสไลด์สรุปที่ยังนึกออก' },
      { modality: 'A', text: 'คำพูดและเรื่องเล่าของวิทยากร' },
      { modality: 'R', text: 'โน้ตที่จดไว้แล้วกลับมาอ่าน' },
      { modality: 'K', text: 'กิจกรรมที่ได้ลงมือทำในห้อง' },
    ],
  },
  {
    id: 14,
    prompt: 'เจอปัญหาเฉพาะหน้าระหว่างทำงาน',
    options: [
      { modality: 'V', text: 'เปิดผังงานดูว่าติดขัดตรงจุดไหน' },
      { modality: 'A', text: 'โทรหาคนที่น่าจะรู้คำตอบ' },
      { modality: 'R', text: 'ค้นคู่มือ เอกสาร หรืออีเมลเก่า' },
      { modality: 'K', text: 'ลองแก้ดูก่อนแล้วดูผลที่ได้' },
    ],
  },
  {
    id: 15,
    prompt: 'ทีมต้องตัดสินใจเรื่องสำคัญ คุณเตรียมตัวอย่างไร',
    options: [
      { modality: 'V', text: 'ทำแผนภาพเปรียบเทียบทางเลือกแต่ละแบบ' },
      { modality: 'A', text: 'คุยกับแต่ละคนเพื่อฟังความเห็นก่อน' },
      { modality: 'R', text: 'เขียนสรุปข้อดีข้อเสียเป็นเอกสาร' },
      { modality: 'K', text: 'ลองทำ pilot เล็ก ๆ ดูผลก่อนตัดสินใจ' },
    ],
  },
  {
    id: 16,
    prompt: 'อยากพัฒนาทักษะใหม่เพื่อเติบโตในตำแหน่งที่สูงขึ้น',
    options: [
      { modality: 'V', text: 'ดูคลิปหรือภาพสาธิตจากคนที่ทำได้ดี' },
      { modality: 'A', text: 'หา mentor ไว้คุยเป็นประจำ' },
      { modality: 'R', text: 'อ่านหนังสือและบทความในสายงานนั้น' },
      { modality: 'K', text: 'รับงานจริงที่ท้าทายกว่าเดิมมาลองทำ' },
    ],
  },
]

/**
 * Options are stored V, A, R, K but must not always be displayed in that order,
 * or the pattern becomes guessable. Rotation is deterministic so a given
 * question always looks the same across reloads and across respondents.
 */
export function displayOrder(questionId: number, optionCount: number): number[] {
  const shift = questionId % optionCount
  return Array.from({ length: optionCount }, (_, i) => (i + shift) % optionCount)
}
