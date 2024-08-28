import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Pagination from '@mui/material/Pagination';               // pagination

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useEffect, useState } from "react";
import { ProductsModal } from "@components";
import { products,categories } from "@service";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [open, setOpen] = useState(false);
  
  const [count, setCount] = useState()    //count

  const navigate = useNavigate()
  
  
  const [categoriya,setCategoriya] = useState([])
  const [datas, setDatas] = useState([]);
  
  const [params, setParams] = useState({      //params
    page: 1,
    limit: 5,
    name: ''
  });
  
  
  const changePage = (event,value)=>{   // params
    console.log(value)
    setParams(prevParams => ({
      ...prevParams,
      page: value
    }))
  }
  
  const handleChange =(event)=>{
    console.log(event.target.value)
    setParams(prevParams =>({
      ...prevParams,
      name: event.target.value
    }))
  }
  
  const movePage = (id) => {    //movePage
    navigate(`/dashboard/products/${id}`)
  };

  const getData = async () => {
    const response = await products.get(params);
    if (response.status == 200) {
      setDatas(response?.data?.products);
    }
    let a = Math.ceil(response.data.total_count / params.limit)
    setCount(a)
  }
  useEffect(() => {
    getData();
  }, [params]);

  const deleteData = async (id) => {
    const res = await products.delete(id);
    if (res.status === 200) {
        window.location.reload();
    }
  };
  
  

  const openModal =async()=>{
    setOpen(true)

    const response = await categories.get({page:1 ,limit:10});
    if (response.status === 200) {
      setCategoriya(response?.data?.categories)
      console.log(categoriya, "kategoriyaaa");
    }
}

  return (
    <div className="w-full h-[100vh] bg-sky-100 ">
    <div className="f-full py-[30px] bg-sky-200 px-[20px]">
        <h1 className="text-[25px] font-semibold text-[darkblue]">
            Products Section
        </h1>
        <input type="text" onChange={handleChange} placeholder="search..." className="p-[10px] outline-none w-[240px]"/>
    </div>
    <div className="f-full p-[30px] flex justify-end px-[20px]">
      <button
        className="py-[5px] px-[20px] font-semibold rounded-[5px] bg-[darkblue] text-[white]"
        onClick={openModal}
      >
        add product
      </button>    
    </div>
      <ProductsModal open={open} categoriya={categoriya} toggle={() => setOpen(false)} data={data}/>
      <div className="w-full px-[20px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-slate-200">
                <TableCell align="center"><h1 className="font-bold text-[17px]">T/r</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[17px]">Product-name</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[17px]">Color</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[17px]">Size</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[17px]">Count</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[17px]">Cost</h1></TableCell>
                <TableCell align="center"><h1 className="font-bold text-[20px]">Action</h1></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.product_name}</TableCell>
                  <TableCell align="center">{item.color}</TableCell>
                  <TableCell align="center">{item.size}</TableCell>
                  <TableCell align="center">{item.count}</TableCell>
                  <TableCell align="center">{item.cost}sum</TableCell>
                  <TableCell align="center">
                    <span className="flex gap-2 justify-center">
                      <button
                        onClick={() => movePage(item.product_id)}
                        className="text-[blue] bg-slate-300 p-1 rounded-[30px]"
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        onClick={() => deleteData(item.product_id)}
                        className="text-red-600 bg-red-100 p-1 rounded-[30px]"
                      >
                        <DeleteForeverIcon />
                      </button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="w-full flex justify-center py-[20px]">
        <Pagination count={count} page={params.page} onChange={changePage} />
      </div>
    </div>
  );
};

export default Index;
