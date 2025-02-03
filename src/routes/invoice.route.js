import { Router } from 'express';
import { InvoiceController } from '../controller/invoice.controller.js';

const router = Router();

router.post('/invoiceCreate', InvoiceController.createInvoice);
router.get('/invoice/:id', InvoiceController.getInvoice);
router.get('/invoices', InvoiceController.listInvoices);
router.delete('/invoiceDelete/:id', InvoiceController.deleteInvoice);

export default router;