export function $_returnColor(rank: string): string {
  if (rank === 'E') return 'brown lighten-3'
  if (rank === 'D') return 'deep-purple lighten-3'
  if (rank === 'C') return 'teal lighten-3'
  if (rank === 'B') return 'light-green lighten-3'
  if (rank === 'A') return 'pink lighten-3'
  if (rank === 'S') return 'light-blue lighten-3'
  if (rank === 'SS') return 'yellow lighten-2'
  return 'blue-grey lighten-4'
}



