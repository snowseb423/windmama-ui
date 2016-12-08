
const windColor = [
  '#10FF4E','#0CFF4A','#0CFF4A','#0BE816','#0BE816',
  '#38FF07','#38FF07','#6DE805','#6DE805','#B8FF08',
  '#B8FF08','#D0FF05','#D0FF05','#E8E305','#E8E305',
  '#FFE700','#FFE700','#E8C101','#E8C101','#FFC101',
  '#FFC101','#FFB105','#FFB105','#EDA505','#EDA505',
  '#E89005','#E89005','#FF8400','#FF8400','#FF010A',
  '#FF010A','#E00109','#E00109','#FF006D','#FF006D',
  '#E80064','#E80064','#0C2FFF','#0C2FFF','#0008E8',
  '#0008E8','#0008E8','#0008E8','#0008E8','#0008E8',
  '#0008E8','#0008E8','#0008E8','#0008E8','#0008E8'
];


function unitType(value) {
  return (Math.round(value/1.852) + ' nds');
}

export { windColor, unitType };
