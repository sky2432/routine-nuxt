import { RANK_COLOR } from '../config/const'

export function $_returnColor(rank: string): string {
  if (rank === 'E') return  RANK_COLOR.E
  if (rank === 'D') return RANK_COLOR.D
  if (rank === 'C') return RANK_COLOR.C
  if (rank === 'B') return RANK_COLOR.B
  if (rank === 'A') return RANK_COLOR.A
  if (rank === 'S') return RANK_COLOR.S
  if (rank === 'SS') return RANK_COLOR.SS
  return RANK_COLOR.F
}



