import { Router } from "express";
import { getAllProducts, getAllProductsAdmin, getProductById, createProduct, removeProduct, activeProduct, modifyProduct} from "../controllers/product.controllers.js";
const router = Router();

router.get("/api/productos", getAllProducts);

router.get("/api/productos/mostrar-admin", getAllProductsAdmin);

router.get("/:id",validarId, getProductById);

router.post("/",validarCampos, createProduct);

router.put("/buscar-eliminar/:id",validarId, removeProduct);

router.put("/activar-productos", activeProduct);

router.put("/modificar-producto",validarCampos, modifyProduct);

export default router;