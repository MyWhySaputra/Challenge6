const { ResponseTemplate } = require('../helper/template.helper')
const imagekit = require('../lib/imagekit');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function Upload(req, res) {
    const stringFile = req.file.buffer.toString("base64")

    const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
    });

    const { title, description } = req.body

    const payload = {
        user_id: req.user.id,
        title,
        description,
        url: uploadFile.url
    }

    try {
        
        await prisma.images.create({
            data: payload
        });

        const imagesView = await prisma.images.findUnique({
            where: {
                user_id: payload.user_id
            },
            select: {
                title: true,
                description: true,
                url: true
            },
        });

        let resp = ResponseTemplate(imagesView, 'success', null, 200)
        res.status(200).json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return

    }
}

async function GetAll(req, res) {

    const { title, description, page = 1, limit = 10 } = req.query

    const user_id = req.user.id

    const payload = {}
    
    if (user_id) payload.user_id = user_id
    if (title) payload.title = title
    if (description) payload.description = description

    try {
        const skip = ( page - 1 ) * limit

        //informasi total data keseluruhan 
        const resultCount = await prisma.images.count() // integer jumlah total data image

        //generated total page
        const totalPage = Math.ceil( resultCount / limit)

        const images = await prisma.images.findMany({
            //take : 10,
            take : parseInt(limit),
            //skip : 10
            skip:skip,
            where: payload,
            select: {
                id: true,
                title: true,
                description: true,
                url: true
            },
        });
        
        const pagination = {
            current_page: page - 0, // ini - 0 merubah menjadi integer
            total_page : totalPage,
            total_data: resultCount,
            data: images
        }
        const cekImage = (objectName) => {
            return Object.keys(objectName).length === 0
        }
        
        if (cekImage(images) === true) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.status(404).json(resp)
            return
        }

        let resp = ResponseTemplate(pagination, 'success', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

async function GetDetailById(req, res) {

    const { id } = req.params

    const user_id = req.user.id

    try {
        const images = await prisma.images.findUnique({
            where: {
                id: Number(id),
                user_id: user_id
            },
            select: {
                id: true,
                title: true,
                description: true,
                url: true
            }
        })

        if (images === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.status(404).json(resp)
            return
        }

        let resp = ResponseTemplate(images, 'success', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

async function UpdateImage(req, res) {

    const { title, description } = req.body
    const { id } = req.params

    const payload = {}

    if (!title && !description) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.status(400).json(resp)
        return
    }

    if (title) payload.title = title
    if (description) payload.description = description

    try {
        const images = await prisma.images.update({
            where: {
                id: Number(id)
            },
            data: payload,
            select: {
                id: true,
                title: true,
                description: true,
                url: true
            }
        })

        let resp = ResponseTemplate(images, 'success', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

async function DeleteImage(req, res) {

    const { id } = req.params

    try {

        const checkImage = await prisma.images.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (checkImage === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.status(404).json(resp)
            return
        }

        await prisma.images.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'data deleted', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}


module.exports = {
    Upload,
    GetAll,
    GetDetailById,
    UpdateImage,
    DeleteImage
}