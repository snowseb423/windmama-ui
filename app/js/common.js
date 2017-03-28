const windColor = [
  '#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF',
  '#FFFFFF','#DCFDFC','#A5FAF7','#9AFAF6','#67F7F1',
  '#51F9BD','#36FB7E','#2BFC64','#09FE15','#0AFE00',
  '#5BFA00','#60F900','#B2F500','#CAF300','#FFED01',
  '#FFD606','#FFAC10','#FF9615','#FF6221','#FF4F25',
  '#FF3033','#FF2950','#FF2368','#FF226A','#FF1890',
  '#FF13A7','#FF0EB8','#FF0ACA','#FF08D1','#FF06DD',
  '#FF05E3','#FF03ED','#FF02F4','#FF00FE','#EA0AFF',
  '#E90BFF','#CF17FF','#C01EFF','#B324FF','#AD27FF',
  '#9532FF','#8a32fd','#8B33FF','#8634FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF','#7E35FF',
  '#7E35FF','#7E35FF','#7E35FF','#7E35FF'
]; // 50 to 80 idem

function unitType(value) {
  return (Math.round(value/1.852) + ' nds');
}

export { windColor, unitType };
