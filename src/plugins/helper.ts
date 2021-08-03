export function $_returnColor(rank: string): string {
  if (rank === '初級') return 'blue-grey lighten-3'
  if (rank === '中級') return 'brown lighten-3'
  if (rank === '上級') return 'deep-orange lighten-3'
  if (rank === '聖級') return 'yellow lighten-3'
  if (rank === '王級') return 'indigo lighten-3'
  if (rank === '帝級') return 'deep-purple lighten-3'
  if (rank === '神級') return 'pink lighten-3'
  if (rank === '復活') return 'green lighten-3'
  if (rank === '不屈') return 'purple lighten-3'
  if (rank === '蘇生') return 'lime lighten-3'
  if (rank === '転生') return 'light-blue lighten-3'
  if (rank === '不死') return 'red lighten-3'
  return 'grey lighten-2'
}



