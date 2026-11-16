/* 阅读器固定文案：界面与字体制作共用，册专属共读提示放在各册 book.json。 */
export const readerModes = [
  { id: 'web', label: '网页', hint: '一页一屏，会叫会回应', file: 'index.html' },
  { id: 'print', label: '打印版', hint: '整册 64 页摊平，直接送印厂', file: 'print.html' },
  { id: 'booklet', label: '骑马钉拼版', hint: 'A4 双面拼版，对折即成书', file: 'booklet.html' },
];

export const readerLabels = {
  chooseBook: '选一册',
  chooseMode: '看它的方式',
  adultHeading: '给大人的话',
  adultMore: '每册纸书 p61 有完整版。屏幕版一次别读太久，优先一起翻纸书。',
  adultDefault: '旁白念给孩子听，拟声词让孩子跟着说。',
  bookPrefix: '第 ',
  bookSuffix: ' 册',
};
