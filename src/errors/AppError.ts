/**
 * AppError - 自定义应用错误类
 * 
 * 用于统一处理应用程序中的各种错误
 * 继承自 Error 类，添加了状态码和错误代码
 */
class AppError extends Error {
  /**
   * HTTP 状态码
   * 例如：400, 401, 403, 404, 500 等
   */
  public statusCode: number;

  /**
   * 错误代码
   * 用于前端识别错误类型
   * 例如：VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED 等
   */
  public code: string;

  /**
   * 错误是否是业务逻辑错误（非系统错误）
   */
  public isOperational: boolean;

  /**
   * 错误发生的时间
   */
  public timestamp: string;

  /**
   * 创建 AppError 实例
   * 
   * @param message - 错误消息
   * @param statusCode - HTTP 状态码（默认 500）
   * @param code - 错误代码（默认 'INTERNAL_ERROR'）
   * @param isOperational - 是否是业务逻辑错误（默认 true）
   * 
   * @example
   * // 创建一个 404 错误
   * const error = new AppError('资源不存在', 404, 'NOT_FOUND');
   * 
   * @example
   * // 创建一个验证错误
   * const error = new AppError('邮箱格式不正确', 400, 'VALIDATION_ERROR');
   */
  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    // 调用父类构造函数
    super(message);

    // 设置错误信息
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    // 捕获错误堆栈
    Error.captureStackTrace(this, this.constructor);

    // 设置错误名称
    this.name = 'AppError';
  }

  /**
   * 将错误转换为 JSON 格式
   * 用于 API 响应
   * 
   * @returns 包含错误信息的对象
   * 
   * @example
   * const error = new AppError('资源不存在', 404);
   * console.log(error.toJSON());
   * // 输出：
   * // {
   * //   success: false,
   * //   message: '资源不存在',
   * //   code: 'NOT_FOUND',
   * //   statusCode: 404,
   * //   timestamp: '2024-01-01T00:00:00.000Z'
   * // }
   */
  toJSON() {
    return {
      success: false,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }

  /**
   * 创建 400 Bad Request 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.badRequest('参数错误');
   */
  static badRequest(message: string): AppError {
    return new AppError(message, 400, 'BAD_REQUEST');
  }

  /**
   * 创建 401 Unauthorized 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.unauthorized('未授权访问');
   */
  static unauthorized(message: string = '未授权访问'): AppError {
    return new AppError(message, 401, 'UNAUTHORIZED');
  }

  /**
   * 创建 403 Forbidden 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.forbidden('权限不足');
   */
  static forbidden(message: string = '权限不足'): AppError {
    return new AppError(message, 403, 'FORBIDDEN');
  }

  /**
   * 创建 404 Not Found 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.notFound('资源不存在');
   */
  static notFound(message: string = '资源不存在'): AppError {
    return new AppError(message, 404, 'NOT_FOUND');
  }

  /**
   * 创建 409 Conflict 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.conflict('资源已存在');
   */
  static conflict(message: string): AppError {
    return new AppError(message, 409, 'CONFLICT');
  }

  /**
   * 创建 422 Unprocessable Entity 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.unprocessableEntity('数据验证失败');
   */
  static unprocessableEntity(message: string): AppError {
    return new AppError(message, 422, 'UNPROCESSABLE_ENTITY');
  }

  /**
   * 创建 500 Internal Server Error 错误
   * 
   * @param message - 错误消息
   * @returns AppError 实例
   * 
   * @example
   * throw AppError.internal('服务器内部错误');
   */
  static internal(message: string = '服务器内部错误'): AppError {
    return new AppError(message, 500, 'INTERNAL_ERROR', false);
  }
}

// 导出 AppError 类
export default AppError;
