import app from "./app";
import dotenv from "dotenv";
import connectDb from "./db/db";

dotenv.config({ path: "./.env" });

connectDb()
  .then()
  .catch((err) => {
    console.log("Error connection database", err);
    process.exit(1);
  });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
