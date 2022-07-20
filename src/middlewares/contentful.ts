import { NextFunction, Request, Response } from 'express';

export const validateArticlePreview = (req: Request, res: Response, next: NextFunction) => {
  const rules = [
    {
      mustHave: req.body?.fields,
      message: 'Fields are required',
    },
    {
      mustHave: req.body?.fields?.articleId['en-US'],
      message: 'articleId is required',
    },
    {
      mustHave: req.body?.fields?.title['en-US'],
      message: 'title is required',
    },
    {
      mustHave: req.body?.fields?.description['en-US'],
      message: 'description is required',
    },
    {
      mustHave: req.body?.fields?.image['en-US']?.sys?.id,
      message: 'image id is required',
    },
  ];

  rules.forEach((rule) => {
    if (!rule.mustHave) {
      res.status(400).send({
        status: 400,
        message: rule.message,
      });
    }
  });

  next();
}
