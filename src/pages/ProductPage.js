// pages/ProductPage.js
import { Box, Button } from '@mui/material';
import ProductTable from '../components/ProductTable';
import ProductFormPopup from './ProductModel/CreateProduct';
import { useState } from 'react';

export default function ProductPage() {

    const [open, setOpen] = useState(false);

  
  return (
    <div style={{ padding: '20px' }}>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>

    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <h2>Product List</h2>
    </Box>

    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <Button variant="contained" onClick={() => setOpen(true)}>Add Product</Button>
    </Box>
      
      
      </Box>
      <ProductTable />
      <ProductFormPopup
        open={open}
        onClose={() => setOpen(false)}
        type="ADD_PRODUCT"
       
      />
    </div>
  );
}
