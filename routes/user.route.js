const express = require('express')
const router = express.Router()
const { Upload, GetAll, GetDetailById, UpdateImage, DeleteImage } = require('../controller/user.controller')
const { Auth } = require('../middleware/middleware')

const multer = require("multer")();
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: example to create user
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
router.post('/users/', Auth, multer.single("images"), Upload)

/**
 * @swagger
 * /api/v1/users:
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
router.get('/users/', Auth, GetAll)

/**
 * @swagger
 * /api/v1/users/{id}:
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
router.get('/users/:id', Auth, GetDetailById)

/**
 * @swagger
 * /api/v1/users/{id}:
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
router.put('/users/:id', Auth, UpdateImage)

/**
 * @swagger
 * /api/v1/users/{id}:
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
router.delete('/users/:id', Auth, DeleteImage)


module.exports = router