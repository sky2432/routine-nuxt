export interface routineType {
  id: number
  name: string
  user_id: number
  total_days: number
  continuous_days: number
  highest_continuous_days: number
  recovery_count: number
  total_rank: rank
  highest_continuous_rank: rank
  recovery_rank: rank
  today_record: record | null
  created_at: string
  updated_at: string
  records: record[]
}

interface rank {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface record {
  id: number
  routine_id: number
  created_at: string
  updated_at: string
}

export interface rankUpData {
  name: string
  rank_name: string
}

export interface VCalendar extends Vue {
  prev(): void
  next(): void
}
