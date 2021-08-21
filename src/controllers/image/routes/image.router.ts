import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../../../util/util';

const router: Router = Router();

// /filteredimage routes
router.get('/', async ( req: Request, res: Response ) => {
  const { image_url } = req.query;
  // 1. validate the image_url query
  if (!image_url) {
    return res.status(400).send({ message: 'Image url is required' });
  }
  // 2. call filterImageFromURL(image_url) to filter the image
  const filteredImagePath = await filterImageFromURL(image_url);
  // 3. send the resulting file in the response
  // 4. deletes any files on the server on finish of the response
  res.
    status(200).
    sendFile(
      filteredImagePath,
      async() => await deleteLocalFiles([filteredImagePath])
    );
});

export const ImageRouter: Router = router;
