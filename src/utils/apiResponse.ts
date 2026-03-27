import { Response } from 'express';

/**
 * ApiResponse - API 响应工具类
 * 
 * 用于统一 API 响应格式，提供便捷的响应方法
 * 所有 API 响应都应该使用这个类来保持格式一致性
 * 
 * 标准响应格式：
 * {
 *   success: boolean,      // 请求是否成功
 *   message?: string,      // 响应消息
 *   data?: T,             // 响应数据
 *   error?: {             // 错误信息（可选）
 *     code: string,
 *     message: string,
 *     details?: any
 *   },
 *   meta?: {              // 元数据（可选）
 *     timestamp: string,
 *     path: string,
 *     version: string
 *   }
 * }
 */

/**
 * 成功响应接口
 */
interface SuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: {
    timestamp: string;
    path?: string;
    version?: string;
  };
}

/**
 * 错误响应接口
 */
interface ErrorResponse {
  success: false;
  message: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    path?: string;
  };
}

/**
 * API 响应工具类
 */
export class ApiResponse {
  /**
   * 发送成功响应（200 OK）
   * 
   * @param res - Express Response 对象
   * @param data - 响应数据
   * @param message - 成功消息（可选）
   * 
   * @example
   * // 返回用户数据
   * ApiResponse.success(res, { id: 1, name: '张三' }, '获取成功');
   * 
   * @example
   * // 返回用户列表
   * ApiResponse.success(res, users);
   */
  static success<T>(
    res: Response,
    data: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    return res.status(200).json({
      success: true,
      message: message || '操作成功',
      data,
      meta: {
        timestamp: new Date().toISOString(),
        path: res.req.path,
      },
    });
  }

  /**
   * 发送创建成功响应（201 Created）
   * 
   * @param res - Express Response 对象
   * @param data - 响应数据
   * @param message - 成功消息（可选）
   * 
   * @example
   * // 创建用户成功
   * ApiResponse.created(res, { id: 1, name: '张三' }, '创建成功');
   */
  static created<T>(
    res: Response,
    data: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    return res.status(201).json({
      success: true,
      message: message || '创建成功',
      data,
      meta: {
        timestamp: new Date().toISOString(),
        path: res.req.path,
      },
    });
  }

  /**
   * 发送删除成功响应（204 No Content）
   * 
   * @param res - Express Response 对象
   * @param message - 成功消息（可选）
   * 
   * @example
   * // 删除用户成功
   * ApiResponse.noContent(res, '删除成功');
   */
  static noContent(res: Response, message?: string): Response<void> {
    return res.status(204).send();
  }

  /**
   * 发送错误响应
   * 
   * @param res - Express Response 对象
   * @param statusCode - HTTP 状态码
   * @param message - 错误消息
   * @param code - 错误代码（可选）
   * 
   * @example
   * // 发送 400 错误
   * ApiResponse.error(res, 400, '参数错误', 'BAD_REQUEST');
   * 
   * @example
   * // 发送 404 错误
   * ApiResponse.error(res, 404, '资源不存在');
   */
  static error(
    res: Response,
    statusCode: number,
    message: string,
    code?: string
  ): Response<ErrorResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error: {
        code: code || 'ERROR',
        message,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: res.req.path,
      },
    });
  }

  /**
   * 发送 400 Bad Request 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.badRequest(res, '参数错误');
   */
  static badRequest(res: Response, message: string): Response<ErrorResponse> {
    return this.error(res, 400, message, 'BAD_REQUEST');
  }

  /**
   * 发送 401 Unauthorized 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.unauthorized(res, '未授权访问');
   */
  static unauthorized(res: Response, message?: string): Response<ErrorResponse> {
    return this.error(res, 401, message || '未授权访问', 'UNAUTHORIZED');
  }

  /**
   * 发送 403 Forbidden 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.forbidden(res, '权限不足');
   */
  static forbidden(res: Response, message?: string): Response<ErrorResponse> {
    return this.error(res, 403, message || '权限不足', 'FORBIDDEN');
  }

  /**
   * 发送 404 Not Found 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.notFound(res, '资源不存在');
   */
  static notFound(res: Response, message?: string): Response<ErrorResponse> {
    return this.error(res, 404, message || '资源不存在', 'NOT_FOUND');
  }

  /**
   * 发送 409 Conflict 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.conflict(res, '资源已存在');
   */
  static conflict(res: Response, message: string): Response<ErrorResponse> {
    return this.error(res, 409, message, 'CONFLICT');
  }

  /**
   * 发送 500 Internal Server Error 错误
   * 
   * @param res - Express Response 对象
   * @param message - 错误消息
   * 
   * @example
   * ApiResponse.internal(res, '服务器内部错误');
   */
  static internal(res: Response, message?: string): Response<ErrorResponse> {
    return this.error(res, 500, message || '服务器内部错误', 'INTERNAL_ERROR');
  }

  /**
   * 发送分页数据响应
   * 
   * @param res - Express Response 对象
   * @param data - 数据列表
   * @param pagination - 分页信息
   * @param message - 成功消息（可选）
   * 
   * @example
   * // 返回用户列表和分页信息
   * ApiResponse.paginated(res, users, {
   *   page: 1,
   *   limit: 10,
   *   total: 100,
   *   totalPages: 10
   * });
   */
  static paginated<T>(
    res: Response,
    data: T[],
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    message?: string
  ): Response<SuccessResponse<{ items: T[]; pagination: any }>> {
    return res.status(200).json({
      success: true,
      message: message || '获取成功',
      data: {
        items: data,
        pagination,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: res.req.path,
      },
    });
  }
}

export default ApiResponse;
