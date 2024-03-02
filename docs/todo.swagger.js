/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: APIs for managing user todos
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get user todo by ID
 *     description: Retrieve a specific user todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user todo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo for the authenticated user
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     description: Update a todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TodoInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the todo
 *         description:
 *           type: string
 *           description: Description of the todo
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: Priority of the todo
 *         dueDateTime:
 *           type: string
 *           format: date-time
 *           description: Due date and time of the todo
 */
