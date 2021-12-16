import { RANK_COLORS } from '@/config/const'

export function $$returnColor(rank: string): string {
  if (rank === 'E') return  RANK_COLORS.E
  if (rank === 'D') return RANK_COLORS.D
  if (rank === 'C') return RANK_COLORS.C
  if (rank === 'B') return RANK_COLORS.B
  if (rank === 'A') return RANK_COLORS.A
  if (rank === 'S') return RANK_COLORS.S
  if (rank === 'SS') return RANK_COLORS.SS
  return RANK_COLORS.F
}



