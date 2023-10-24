const ProductsModel = require('../models/products')

async function get(req, res){
    const { id } = req.params

    let obj = id ? { _id: id} : null

    const products = await ProductsModel.find(obj)

    res.send(products)
}

async function post(req, res){
    const {
        name,
        brand,
        price,
    } = req.body    

    const product = new ProductsModel({
        name,
        brand,
        price,
    })

    product.save()

    res.send({
        message: 'success',
    })

}

async function put(req, res){
    const { id } = req.params

    /* const product = await ProductsModel.findOne({ _id: id })

    await product.updateOne(req.body)

    res.send({
        message: 'success',
        product,
    })*/

    //Outra maneira de realizar o update retornando a informação atualizada no res.send
/*1 - id do registro que queremos selecionar
2 - valor que queremos alterar
3 - se queremos que retorne o objeto novo, atualizado*/

const product = await ProductsModel.findOneAndUpdate({ _id: id }, req.body, { new: true})

res.send({
    message: 'success',
    product,
})

} 

async function remove(req, res){
    const { id } = req.params

    const remove = await ProductsModel.deleteOne({ _id: id })
    
    const message = remove.deletedCount == 1 ? 'success' : 'error'    

    res.send({
        message,
    })
}

module.exports = {
    get,
    post,
    put,
    remove,
}