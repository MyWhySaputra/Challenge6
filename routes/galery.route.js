const express = require('express')
const router = express.Router()
const { Upload, GetAll, GetDetailById, UpdateImage, DeleteImage } = require('../controller/galery.controller')
const { Auth } = require('../middleware/middleware')

const multer = require("multer")();
/**
 * @swagger
 * /api/v1/galery:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Upload image
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                images:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/galery/', Auth, multer.single("images"), Upload)

/**
 * @swagger
 * /api/v1/galery:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get all images
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: The title of image
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: false
 *         description: The description of image
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/galery/', Auth, GetAll)

/**
 * @swagger
 * /api/v1/galery/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get one images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of Image
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/galery/:id', Auth, GetDetailById)

/**
 * @swagger
 * /api/v1/galery/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of Image
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.put('/galery/:id', Auth, UpdateImage)

/**
 * @swagger
 * /api/v1/galery/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Delete one images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of Image
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete('/galery/:id', Auth, DeleteImage)


module.exports = router