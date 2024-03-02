/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login via email and password
 *     description: Endpoint to authenticate user credentials and generate access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: Unauthorized - Invalid username or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Endpoint to verify OTP for user authentication
 *     tags: [Authentication]
 *     security:
 *       - Authorization: []  # Reference the security scheme defined in the components section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 description: OTP code sent to the user's email
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Unauthorized - Invalid OTP or email
 *       500:
 *         description: Internal server error
 *
 * components:
 *   securitySchemes:
 *     Authorization:   # Define the security scheme for Authorization token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /login/regenerate-otp:
 *   post:
 *     summary: Regenerate OTP
 *     description: Endpoint to regenerate OTP for user authentication
 *     tags: [Authentication]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address to resend OTP
 *     responses:
 *       200:
 *         description: OTP regenerated successfully and sent to the user's email
 *       401:
 *         description: Unauthorized - Invalid email address
 *       500:
 *         description: Internal server error
 *   components:
 *   securitySchemes:
 *     Authorization:   # Define the security scheme for Authorization token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
