import type { NextFunction, Request, Response } from 'express'

/**
 * AsyncHandler - 异步错误处理包装器
 *
 * 用于包装 Express 的异步路由处理器，自动捕获异步错误并传递给错误处理中间件
 * 避免在每个异步函数中都写 try-catch 块
 *
 * @param fn - 异步函数，接收 Request, Response, NextFunction 参数
 * @returns 包装后的函数，会自动捕获异步错误
 *
 * @example
 * // 不使用 asyncHandler 的写法
 * export const getUser = async (req: Request, res: Response, next: NextFunction) => {
 *   try {
 *     const user = await User.findById(req.params.id);
 *     res.json({ success: true, data: user });
 *   } catch (error) {
 *     next(error); // 需要手动传递错误
 *   }
 * };
 *
 * @example
 * // 使用 asyncHandler 的写法
 * export const getUser = asyncHandler(async (req: Request, res: Response) => {
 *   const user = await User.findById(req.params.id);
 *   res.json({ success: true, data: user });
 *   // 不需要 try-catch，错误会自动传递
 * });
 */
function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  // 返回包装后的函数
  return (req: Request, res: Response, next: NextFunction) => {
    // 执行异步函数，并捕获错误
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * 高级版本：支持更多参数的异步处理器
 * 适用于需要处理更多参数的场景（如 multer 中间件）
 *
 * @param fn - 异步函数，可以接收任意数量的参数
 * @returns 包装后的函数
 *
 * @example
 * export const uploadFile = asyncHandler(async (req: Request, res: Response, next: NextFunction, file: File) => {
 *   // 处理文件上传
 * });
 */
export function asyncHandlerAdvanced(fn: (...args: any[]) => Promise<any>) {
  return (...args: any[]) => {
    Promise.resolve(fn(...args)).catch(args.at(-1))
  }
}

// 导出默认和命名导出
export default asyncHandler
