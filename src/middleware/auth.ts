/* import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export function verifyToken(req: any, res: any, next: any) {
  const tokenFromHeader: string = req.header("Authorization");
  if (!tokenFromHeader)
    return res.status(401).send("Access denied. No token provided.");
  const token = tokenFromHeader.slice(7);
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
}
 */
