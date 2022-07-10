import { NextFunction, Request, Response } from 'express';

export const validateArticlePreview = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  const fields = req.body?.fields;

  if (!fields) {
    res.status(400).send({
      status: 400,
      message: 'Fields are required'
    });
  }

  // validate articleId
  if (!fields?.articleId['en-US']) {
    res.status(400).send({
      status: 400,
      message: 'articleId is required'
    });
  }

  // validate title
  if (!fields?.title['en-US']) {
    res.status(400).send({
      status: 400,
      message: 'title is required'
    });
  }

  // validate description
  if (!fields?.description['en-US']) {
    res.status(400).send({
      status: 400,
      message: 'description is required'
    });
  }

  //validate image
  if (!fields?.image['en-US']?.sys.id) {
    res.status(400).send({
      status: 400,
      message: 'image id is required'
    });
  }

  next();
}
