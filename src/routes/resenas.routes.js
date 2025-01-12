import {Router} from 'express'
import {
    crearResena, actualizarResena, eliminarResena, obtenerResenas, obtenerResenaPorId
} from '../controllers/resenas.controller.js'

const router = Router()

router.get('/', obtenerResenas)
router.get('/:id', obtenerResenaPorId)
router.post('/', crearResena)
router.put('/:id', actualizarResena)
router.delete('/:id', eliminarResena)

export default router