const { z } = require("zod");

const memberSchema = z.object({
  number: z.coerce.number().int().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string().min(1)
});

module.exports = memberSchema;