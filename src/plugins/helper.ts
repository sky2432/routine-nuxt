export function $_returnColor(rank: string): string {
  if (rank === 'E') return 'brown lighten-3'
  if (rank === 'D') return 'grey lighten-3'
  if (rank === 'C') return 'yellow lighten-2'
  if (rank === 'B') return 'cyan lighten-3'
  if (rank === 'A') return 'purple lighten-3'
  if (rank === 'S') return 'red lighten-1'
  if (rank === 'SS') return 'yellow accent-2'
  return 'grey lighten-1'
}



