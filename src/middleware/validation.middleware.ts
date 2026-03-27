import type { NextFunction, Request, Response } from 'express'
import type { ZodObject } from 'zod'
import { ZodError } from 'zod'

/**
 * 验证中间件 - 使用 Zod 验证请求数据
 */
export function validate(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    }
    catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        }))
        res.status(400).json({
          success: false,
          message: '验证失败',
          errors,
        })
      }
      else {
        next(error)
      }
    }
  }
}
