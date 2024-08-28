import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Pagination from "@mui/material/Pagination"; // pagination

import { useEffect, useState } from "react";
import { CategoryModal } from "@components";
import { categories } from "@service";

const Index = () => {
    const [datas, setDatas] = useState([])
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const [params, setParams] = useState({    //params
        page: 1,
        limit: 5,
    });
    const [count, setCount] = useState(); //count

    const openModal = (item) => {
        console.log(item);
        setData(item);
        setOpen(true);
      };

    const changePage = (event, value) => {
        // params
        console.log(value);
        setParams((prevParams) => ({
          ...prevParams,
          page: value,
        }));
    };

    const getData = async()=>{
        const response = await categories.get(params)
        if (response.status === 200) {
            setDatas(response?.data?.categories)
        } 

        let a = Math.ceil(response.data.total_count / params.limit);
        setCount(a);
    }
    useEffect(()=>{
        getData();
    },[params])
    console.log(datas);

    const deleteData =async(id)=>{
        const res = await categories.delete(id)
        if (res.status === 200) {
            window.location.reload();
        }
        console.log(id);
    };

  return (
    <div className="w-full pb-[50px] bg-sky-100 ">
      <div className="f-full py-[30px] bg-sky-200 px-[100px]">
        <h1 className="text-[25px] font-semibold text-[darkblue]">
          Category Section
        </h1>
      </div>
      <div className="f-full p-[30px] flex justify-end px-[100px]">
        <button
          className="py-[5px] px-[20px] font-semibold rounded-[5px] bg-[darkblue] text-[white]"
          onClick={() => setOpen(true)}
        >
          add category
        </button>
      </div>
      <CategoryModal open={open} toggle={() => setOpen(false)} data={data} />
      <div className="w-full px-[100px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-slate-200">
                <TableCell align="center">
                  <h1 className="font-bold text-[20px]">T/r</h1>
                </TableCell>
                <TableCell align="center">
                  <h1 className="font-bold text-[20px]">Category name</h1>
                </TableCell>
                <TableCell align="center">
                  <h1 className="font-bold text-[20px]">Action</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.category_name}</TableCell>
                  <TableCell align="center">
                    <span className="flex gap-2 justify-center">
                      <button
                        onClick={() => openModal(item)}
                        className="text-[blue] bg-slate-300 p-2 rounded-[30px]"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => deleteData(item.category_id)}
                        className="text-red-600 bg-red-100 p-2 rounded-[30px]"
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
  )
}

export default Index
