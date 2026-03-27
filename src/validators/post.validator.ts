import {z} from 'zod';

//创建文章验证
export const createPostSchema = z.object({
   body:z.object({
     title:z.string().min(1).max(100),
     content: z.string().min(1, '内容不能为空'),
     excerpt: z.string().max(200, '摘要最多 200 字符').optional(),
     category: z.string().optional(),
     tags: z.array(z.string()).optional(),
     coverImage: z.string().url('必须是有效的 URL').optional(),

     //默认值修饰符,当输入数据中缺失该字段（即 undefined）或显式传入 undefined 时
     // ，Zod 会自动将该字段的值替换为 false
     isPublished: z.boolean().optional().default(false),
   })
})

//更新文章验证
export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).optional(),
    excerpt: z.string().max(200).optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    isPublished: z.boolean().optional(),
  }),
});

// 文章 ID 参数验证
export const postIdParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, '无效的文章 ID 格式'),
  }),
});


// 文章查询参数验证
export const postQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    category: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().optional(),
    status: z.enum(['draft', 'published']).optional(),
    search: z.string().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'viewCount']).default('createdAt'),

    //索引目标, 升序或降序
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];
export type PostQueryParams = z.infer<typeof postQuerySchema>['query'];