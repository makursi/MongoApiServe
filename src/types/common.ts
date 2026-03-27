// 通用API响应结构

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

// 错误结构
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}

// 分页参数
export interface PaginationParams {
  page: number
  limit: number
}

// 分页结果
export interface PaginatedResult<T> {
  items: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

// 排序参数
export interface SortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
