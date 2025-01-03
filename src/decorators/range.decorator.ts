import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Range = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const range = request.query.range

    if (range === 'all') {
      return { skip: 0, take: undefined }
    }

    const pageNumber = parseInt(request.query['page-number']) || 1
    const pageSize = parseInt(request.query['page-size']) || 10

    return {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    }
  },
)
