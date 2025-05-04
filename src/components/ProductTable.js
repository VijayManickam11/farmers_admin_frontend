import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddProductController from '../Controller/ProductController';
import { useEffect , useState} from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductFormPopup from '../pages/ProductModel/CreateProduct';
import ModalPopup from './Popup/conformPopup';
import ToastService from '../util/validationAlerts/toastService';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));








export default function ProductTable() {

    const navigate = useNavigate();

    const [geTheListingData, setGeTheListingData] = useState([])

    const [productUidDelete, setProductUidDelete] = useState("");

    const [modalPopup, setModalPopup] = useState({ open: false, type: "" })

    const [open, setOpen] = useState(false);

    const [productUid, setProductUid] = useState("");

    const getTheProductDataList = async () => {

        try {
           
            const response = await AddProductController.getProductListData();
           
            const parseData = JSON.parse(response);

            let productData = parseData?.data?.data;
            
            console.log(productData,"productData")
      
            if (parseData.status == "SUCCESS") {

                setGeTheListingData(productData)
              
            }
          } catch (error) {
            console.log("Error Fetching Region Data", error);
          }
    
    }

    useEffect(() => {
        getTheProductDataList();
      }, []);

  const handleDelete =  async(productUid) => {
    try {
        let uid = productUid;
        console.log(uid,"productUidDelete")
        let data = {
            is_active: true,
            is_deleted: false,
        }
        const res = await AddProductController.deleteProductList(uid, data);
        const jsonData = JSON.parse(res);
        console.log(jsonData,"jsonData")
        if (jsonData.status === "SUCCESS") {
          const datas = jsonData?.data;
          if (datas && datas.type === "success") {
            ToastService.successmsg(datas.message);
            getTheProductDataList();            
            setTimeout(() => {
              navigate("/products");
            }, 3700);
          } else if (datas.type === "error") {
            console.error("Failed to delete user", jsonData);
            ToastService.errormsg(
              jsonData?.error?.message || "Failed to delete product"
            );
          }
        } else if (jsonData.status === "FAILED") {
          console.error("Failed to delete user", jsonData);
          ToastService.errormsg(
            jsonData?.error?.message || "Failed to delete product"
          );
        }
      } catch (error) {
        console.error("Error deleting product", error);
        ToastService.errormsg("Error deleting product");
      } 

  }    

  const handleEdit =  (value) => {
    setProductUid(value?.product_uid)
    setOpen(true);
  } 
  const deleteForm = (id) => {
    setProductUidDelete(id);
    setModalPopup({
      open: true,
      type: "DELETE",
      modalData: "DELETE_POPUP",
    });
  };
  
  const confirmModal = () => {
    if (modalPopup.type == "CANCEL") {
      setOpen(false)
    } else if (modalPopup.type == "DELETE") {       
      handleDelete(productUidDelete);
    }
    setModalPopup({ open: false, type: "", modalData: {} });
  };

  const cancelModal = () => {
    setModalPopup({ open: false, type: "", modalData: {} });
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product name</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Discount Price</StyledTableCell>
            <StyledTableCell align="left">Stock</StyledTableCell>
            <StyledTableCell align="left">Unit</StyledTableCell>
            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="left">Available</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {geTheListingData.map((value,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {value.name}
              </StyledTableCell>
              <StyledTableCell align="left">{value.description}</StyledTableCell>
              <StyledTableCell align="left">{value.category}</StyledTableCell>
              <StyledTableCell align="left">{value.price}</StyledTableCell>
              <StyledTableCell align="left">{value.discount_price}</StyledTableCell>
              <StyledTableCell align="left">{value.stock}</StyledTableCell>
              <StyledTableCell align="left">{value.unit}</StyledTableCell>
              <StyledTableCell align="left">{"Img"}</StyledTableCell>
              <StyledTableCell align="left">{value.is_available == true ? "Yes" : "No"}</StyledTableCell>
              <StyledTableCell align="left">{value.status}</StyledTableCell>
              <StyledTableCell align="left">
        <IconButton color="primary" 
        onClick={() => handleEdit(value)}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="error" 
        onClick={() => deleteForm(value.product_uid)}
        >
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ProductFormPopup
            open={open}
            onClose={() => setOpen(false)}
            type="EDIT_PRODUCT"
            productUid={productUid}
           
          />
          {modalPopup.open && (
        <ModalPopup
          confirmModal={confirmModal}
          cancelModal={cancelModal}
          modalData={modalPopup}
        />
      )}
          </>
  );
}
