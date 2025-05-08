import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Input,
  Box,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddProductController from "../../Controller/ProductController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastService from "../../util/validationAlerts/toastService";

export default function ProductFormPopup({ open, onClose, type, productUid, setCount }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount_price: "",
    stock: "",
    unit: "kg",
    is_available: "false",
    status: "",
    image_file: null,
    image_preview: "",
  });
  const [loaderopen, setloaderOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleLoaderOpen = () => {
    setloaderOpen(true);
  };

  const handleLoaderClose = () => {
    setloaderOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image_file: file,
        image_preview: previewURL,
      }));
    }
  };

  const handleSubmit = async () => {
    handleLoaderOpen();

    if (
      formData.name ||
      formData.category ||
      formData.price ||
      formData.stock
    ) {
      if (!editMode) {
        try {
          let postData = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: formData.price,
            discount_price: formData.discount_price,
            stock: formData.stock,
            unit: formData.unit,
            is_available: formData.is_available,
            status: formData.status,
          };

          if (formData.image_file) {
            postData = {
              ...postData,
              image_file: formData.image_file,
            };
          }

          const postFormData = new FormData();
          Object.keys(postData).forEach((key) => {
            postFormData.append(key, postData[key]);
          });

          const response = await AddProductController.postAddProduct(postFormData);

          const parseData = JSON.parse(response);

          console.log(parseData, "productDataPost");

          if (parseData.status == "SUCCESS") {
            handleLoaderClose();

            ToastService.successmsg(parseData?.data?.message);

            onClose();
            setCount((prev) => prev + 1);
          } else {
            handleLoaderClose();
          }
        } catch (error) {
          handleLoaderClose();
          console.log("Error Fetching Region Data", error);
        }
      } else {
        try {
          let postData = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: formData.price,
            discount_price: formData.discount_price,
            stock: formData.stock,
            unit: formData.unit,
            is_available: formData.is_available,
            status: formData.status,
          };

          if (formData.image_file) {
            postData = {
              ...postData,
              image_file: formData.image_file,
            };
          }

          const postFormData = new FormData();
          Object.keys(postData).forEach((key) => {
            postFormData.append(key, postData[key]);
          });


          let product_uid = productUid;

          console.log(product_uid, "product_uid");

          const response = await AddProductController.editProductData(
            product_uid,
            postFormData
          );

          const parseData = JSON.parse(response);

          console.log(parseData, "productDataPut");

          if (parseData.status == "SUCCESS") {
            handleLoaderClose();

            ToastService.successmsg(parseData?.data?.message);
            setTimeout(() => {
              setEditMode(false);

              onClose();
            }, 3700);
          } else {
            handleLoaderClose();
          }
        } catch (error) {
          handleLoaderClose();
          console.log("Error Fetching Region Data", error);
        }
      }
    } else {
      ToastService.successmsg("Please Fill The Mandatory Data");
    }
  };

  const fetchTheEditProduct = async (uid) => {
    try {
      const productUid = uid;

      const response = await AddProductController.getViewAndEditProduct(
        productUid,
        ""
      );

      const parseData = JSON.parse(response);

      let productData = parseData?.data?.data;

      console.log(productData, "productDataEdit");

      if (parseData.status == "SUCCESS") {
        setFormData({
          name: productData?.name,
          description: productData?.description,
          category: productData?.category,
          price: productData?.price,
          discount_price: productData?.discount_price,
          stock: productData?.stock,
          unit: productData?.unit,
          is_available: productData?.is_available,
          status: productData?.status,
          image_file: null, // we don't re-upload existing image
          image_preview: productData?.base64Image,
        });
      }
    } catch (error) {
      console.log("Error Fetching Region Data", error);
    }
  };

  useEffect(() => {
    if (type === "EDIT_PRODUCT" && productUid) {
      setEditMode(true);
      fetchTheEditProduct(productUid);
    }
  }, [productUid]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Add / Edit Product</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Text Fields */}
            {[
              { name: "name", label: "Product Name" },
              { name: "description", label: "Description" },
              { name: "category", label: "Category" },
              { name: "price", label: "Price", type: "number" },
              {
                name: "discount_price",
                label: "Discount Price",
                type: "number",
              },
              { name: "stock", label: "Stock", type: "number" },
              { name: "unit", label: "Unit" },              
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  {field.label}
                </label>
                <TextField
                  fullWidth
                  size="small"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  type={field.type || "text"}
                />
              </Grid>
            ))}

            {/* Checkbox for is_available */}
<Grid item xs={12} sm={6} >
  <Box  mt={3.5}>
  <FormControlLabel
    control={
      <Checkbox
        checked={formData.is_available === "true"}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            is_available: e.target.checked ? "true" : "false",
          }))
        }
      />
    }
    label="Available"
  />
  </Box>
</Grid>

{/* Checkbox for status */}
<Grid item xs={12} sm={6}>
<Box  mt={3.5}>
  <FormControlLabel
    control={
      <Checkbox
        checked={formData.status === "Active"}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            status: e.target.checked ? "Active" : "Inactive",
          }))
        }
      />
    }
    label={`Status ${formData.status === "Active" ? "Active" : "Inactive"}`}
  />
  </Box>
</Grid>

           
          </Grid>
           {/* Image Upload */}
           <Box sx={{width:"50%"}} mt={1}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Upload Image
              </label>
              <Input
                type="file"
                onChange={handleImageChange}
                inputProps={{ accept: "image/*" }}
                fullWidth
              />
              {formData.image_preview && (
                <img
                  src={formData.image_preview}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    height: "180px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Box display={"flex"} justifyContent={"center"}>
        <ToastContainer style={{ width: "auto" }} />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
