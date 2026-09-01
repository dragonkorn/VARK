import type { Question } from '../lib/types'

/**
 * Original items written for this project. The VARK model (Fleming) is used as
 * the conceptual framework only; the official VARK Questionnaire wording is
 * copyrighted and is not reproduced here.
 *
 * Scenarios are everyday situations rather than workplace ones, so the
 * questionnaire reads the same whoever is taking it.
 */
export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'กำลังจะจัดทริปกับเพื่อน ๆ คุณจะขอความเห็นเรื่องแผนเดินทางอย่างไร',
    options: [
      { modality: 'V', text: 'เปิดแผนที่และรูปสถานที่ให้ดูประกอบ' },
      { modality: 'A', text: 'นั่งคุยอธิบายประเด็นสำคัญให้ฟัง' },
      { modality: 'R', text: 'พิมพ์แผนเป็นข้อ ๆ ส่งในแชตกลุ่ม' },
      { modality: 'K', text: 'พาไปดูสถานที่จริงหรือลองขับเส้นทางดูก่อน' },
    ],
  },
  {
    id: 2,
    prompt: 'ไม่แน่ใจว่า “กะเพรา” หรือ “กระเพรา” สะกดแบบไหน',
    options: [
      { modality: 'V', text: 'นึกภาพคำนั้นในใจแล้วเลือกคำที่ดูคุ้นตา' },
      { modality: 'A', text: 'ลองออกเสียงในใจแล้วเลือกคำที่ฟังดูถูก' },
      { modality: 'R', text: 'เปิดพจนานุกรมหรือค้นหาคำที่ถูกต้อง' },
      { modality: 'K', text: 'เขียนทั้งสองแบบลงกระดาษแล้วดูว่าแบบไหนเขียนลื่นมือ' },
    ],
  },
  {
    id: 3,
    prompt: 'อยากเริ่มเรียนภาษาใหม่',
    options: [
      { modality: 'V', text: 'ใช้บัตรคำที่มีรูปประกอบ' },
      { modality: 'A', text: 'ฟังบทสนทนาแล้วพูดตาม' },
      { modality: 'R', text: 'จดคำศัพท์และหลักไวยากรณ์เป็นลิสต์' },
      { modality: 'K', text: 'ไปใช้จริงกับเจ้าของภาษา' },
    ],
  },
  {
    id: 4,
    prompt: 'อยากทำอาหารมื้อพิเศษให้ครอบครัว',
    options: [
      { modality: 'V', text: 'เปิดสูตรที่มีรูปประกอบสวย ๆ เพื่อหาไอเดีย' },
      { modality: 'A', text: 'ถามเพื่อนหรือคนที่ทำเป็นเพื่อขอเคล็ดลับ' },
      { modality: 'R', text: 'อ่านสูตรที่เขียนขั้นตอนไว้ละเอียด' },
      { modality: 'K', text: 'ลงมือทำเมนูที่คุ้นมือทันทีโดยไม่ต้องดูสูตร' },
    ],
  },
  {
    id: 5,
    prompt: 'มีนักท่องเที่ยวอยากรู้ข้อมูลสวนสาธารณะแถวบ้านคุณ',
    options: [
      { modality: 'V', text: 'ให้ดูแผนที่ ภาพถ่าย หรือโบรชัวร์' },
      { modality: 'A', text: 'เล่าเรื่องราวของที่นั่นให้ฟัง' },
      { modality: 'R', text: 'แจกแผ่นพับที่มีข้อมูลอธิบายละเอียด' },
      { modality: 'K', text: 'พาเดินหรือขับรถพาไปดูของจริง' },
    ],
  },
  {
    id: 6,
    prompt: 'กำลังจะซื้อกล้องหรือสมาร์ตโฟนเครื่องใหม่ อะไรมีผลกับการตัดสินใจมากที่สุด',
    options: [
      { modality: 'V', text: 'รูปลักษณ์ของตัวเครื่องและภาพตัวอย่างที่ถ่ายออกมา' },
      { modality: 'A', text: 'พนักงานขายอธิบายและตอบคำถามที่สงสัย' },
      { modality: 'R', text: 'สเปกและรีวิวเปรียบเทียบที่เขียนไว้เป็นข้อ ๆ' },
      { modality: 'K', text: 'ได้หยิบจับ กดปุ่ม ลองใช้จริงที่ร้าน' },
    ],
  },
  {
    id: 7,
    prompt: 'ตอนหัดสิ่งใหม่ เช่น หัดขับรถหรือใช้แอปใหม่ คุณเรียนรู้ได้ดีที่สุดจาก',
    options: [
      { modality: 'V', text: 'แผนผัง แผนภูมิ หรือสัญลักษณ์ประกอบ' },
      { modality: 'A', text: 'ฟังคนอธิบายขั้นตอนและถามได้ระหว่างทาง' },
      { modality: 'R', text: 'อ่านคู่มือที่อธิบายเป็นตัวหนังสือละเอียด' },
      { modality: 'K', text: 'ได้ลองนั่งหลังพวงมาลัยหรือกดใช้จริงเลย' },
    ],
  },
  {
    id: 8,
    prompt: 'มีปัญหาที่หัวเข่า อยากให้หมออธิบายแบบไหน',
    options: [
      { modality: 'V', text: 'เปิดภาพหรือผลเอกซเรย์ให้ดู' },
      { modality: 'A', text: 'อธิบายอาการและผลกระทบให้ฟัง' },
      { modality: 'R', text: 'ให้แผ่นพับหรือลิงก์กลับไปอ่านต่อ' },
      { modality: 'K', text: 'ขยับขาให้ดูว่าติดตรงไหน หรือใช้หุ่นจำลองชี้จุด' },
    ],
  },
  {
    id: 9,
    prompt: 'อยากใช้โปรแกรมหรือแอปใหม่ให้เป็น',
    options: [
      { modality: 'V', text: 'ดูแผนภาพหรือผังการทำงานของระบบ' },
      { modality: 'A', text: 'โทรถามเพื่อนที่ใช้เป็น หรือให้คนรู้สอน' },
      { modality: 'R', text: 'อ่านคู่มือที่เขียนอธิบายขั้นตอน' },
      { modality: 'K', text: 'กดลองผิดลองถูกด้วยตัวเอง' },
    ],
  },
  {
    id: 10,
    prompt: 'พักโรงแรมแล้วต้องเดินทางไปที่ใกล้ ๆ อยากได้ข้อมูลแบบไหน',
    options: [
      { modality: 'V', text: 'แผนที่ที่แสดงเส้นทางชัดเจน' },
      { modality: 'A', text: 'ให้พนักงานโรงแรมบอกทางให้ฟัง' },
      { modality: 'R', text: 'คำบอกทางเป็นตัวหนังสือ เช่น เลี้ยวซ้ายตรงไป 50 เมตร' },
      { modality: 'K', text: 'ให้คนพาไป หรือเดินลองไปตามทิศเอง' },
    ],
  },
  {
    id: 11,
    prompt: 'นอกจากราคาแล้ว อะไรทำให้คุณเลือกซื้อนิยายสักเล่ม',
    options: [
      { modality: 'V', text: 'หน้าปกและภาพประกอบที่สะดุดตา' },
      { modality: 'A', text: 'เพื่อนเล่าให้ฟังหรือคนรอบตัวแนะนำมา' },
      { modality: 'R', text: 'คำโปรยและเนื้อหาตัวอย่างด้านในที่น่าติดตาม' },
      { modality: 'K', text: 'มีเรื่องจากประสบการณ์จริง ฉากแอ็กชัน หรือแบบฝึกหัดให้ทำ' },
    ],
  },
  {
    id: 12,
    prompt: 'เพิ่งซื้อชั้นวางของมา ต้องประกอบเอง',
    options: [
      { modality: 'V', text: 'ดูภาพวาดประกอบและผังชิ้นส่วน' },
      { modality: 'A', text: 'โทรถามเพื่อนที่เคยประกอบรุ่นนี้' },
      { modality: 'R', text: 'อ่านคู่มือที่บอกขั้นตอน 1, 2, 3' },
      { modality: 'K', text: 'ลงมือประกอบเลย ผิดตรงไหนค่อยแก้' },
    ],
  },
  {
    id: 13,
    prompt: 'คุณชอบผู้สอนแบบไหนมากที่สุด',
    options: [
      { modality: 'V', text: 'ใช้แผนภูมิ ภาพนิ่ง หรือกราฟิกประกอบ' },
      { modality: 'A', text: 'เน้นบรรยาย ชวนอภิปราย และเปิดให้ซักถาม' },
      { modality: 'R', text: 'แจกเอกสาร บทความ หรือลิสต์ให้อ่าน' },
      { modality: 'K', text: 'ให้ลงมือทำ มีเวิร์กช็อปหรือยกเคสจริง' },
    ],
  },
  {
    id: 14,
    prompt: 'ได้รับผลสะท้อนกลับหลังสอบหรือหลังประเมิน อยากได้แบบไหน',
    options: [
      { modality: 'V', text: 'กราฟเปรียบเทียบคะแนนและจุดเด่นจุดด้อย' },
      { modality: 'A', text: 'นั่งคุยกับผู้ประเมินโดยตรง' },
      { modality: 'R', text: 'คำอธิบายเป็นลายลักษณ์อักษรทีละประเด็น' },
      { modality: 'K', text: 'สาธิตให้ดูว่าผิดตรงไหนและควรแก้อย่างไร' },
    ],
  },
  {
    id: 15,
    prompt: 'สั่งอาหารในร้านที่ไม่คุ้นเคย',
    options: [
      { modality: 'V', text: 'ดูรูปในเมนู หรือแอบมองจานโต๊ะข้าง ๆ' },
      { modality: 'A', text: 'ฟังพนักงานแนะนำเมนูเด็ด' },
      { modality: 'R', text: 'อ่านคำอธิบายส่วนผสมและวิธีทำในเมนู' },
      { modality: 'K', text: 'สั่งเมนูที่เคยกินจากร้านอื่นมาก่อน' },
    ],
  },
  {
    id: 16,
    prompt: 'ต้องพูดในโอกาสสำคัญ คุณเตรียมตัวอย่างไร',
    options: [
      { modality: 'V', text: 'ทำ mind map หรือสไลด์ที่มีภาพและสัญลักษณ์เชื่อมกัน' },
      { modality: 'A', text: 'เขียนคีย์เวิร์ดสั้น ๆ แล้วซ้อมพูดออกเสียงซ้ำ ๆ' },
      { modality: 'R', text: 'เขียนร่างบทพูดคำต่อคำแล้วอ่านทบทวนหลายรอบ' },
      { modality: 'K', text: 'ซ้อมท่าทางและซ้อมใช้อุปกรณ์ประกอบจริง' },
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
