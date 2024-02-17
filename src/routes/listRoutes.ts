import { Hono } from 'hono'
import { List } from "../models/listModel";
import { getShortRandomUniqueId } from "../utils";

const listRoute = new Hono();


listRoute.get('/', async (c) => {
   const lists = await List.find();

   return c.json({ list: lists });

});

listRoute.get('/:id', async (c) => {
   const { id } = c.req.param();

   try {
      const list = await List.findById(id);

      return c.json(list);
   } catch (error: any) {
      const errMessage = error.message;
      c.status(400);
      return c.json(
         errMessage
      );
   }
});


listRoute.post('/', async (c) => {
   const { name, items }: Partial<List> = await c.req.json();

   let res: List;
   try {
      res = await List.create({
         name,
         items,
         shareId: getShortRandomUniqueId()
      });

   } catch (error: any) {
      const errMessage = error.message
      c.status(400)
      return c.json(
         errMessage
      );
   }
   return c.json({
      message: "List created successfully",
      item: res
   })
});


listRoute.put('/:id', async (c) => {
   const { id } = c.req.param();
   const update: Partial<List> = await c.req.json();

   try {
      const list = await List.findByIdAndUpdate(id, update, { runValidators: true, includeResultMetadata: true });

      return c.json(list);
   } catch (error: any) {
      const errMessage = error.message
      c.status(400)
      return c.json(
         errMessage
      );
   }
});


listRoute.delete('/:id', async (c) => {
   const { id } = c.req.param();

   try {
      const list = await List.findByIdAndDelete(id);

      if (list === null) throw new Error('List not found');

      return c.json(list);
   } catch (error: any) {

      c.status(404);
      return c.text(error)
   }
})


export default listRoute;