const z = require('node:zod')
const { object } = require('zod')

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().int().positive(),
    imageUrl: z.string().url({
        message: 'La imagen debe ser valida'
    }),
    type: z.array(
        z.enum(['camiseta', 'pantalon', 'blusa'])
    ),
    
})

const validateProduct = (object)=>{
    return  productSchema.safeParse(object)
}

module.exports = {
    validateProduct
}