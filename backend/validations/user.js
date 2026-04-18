const z = require("zod");

const userSchema = z.object({ 
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 4 caracteres")
});

module.exports = userSchema;