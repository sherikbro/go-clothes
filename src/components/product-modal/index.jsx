import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { products } from '@service';

import TextField from '@mui/material/TextField';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });


  

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({open, toggle, data,categoriya}) {
    console.log(categoriya, "ltgorya");
    console.log(data, "data1");
    const[form,setForm] = React.useState({})
    const [category, setCategory] = React.useState(''); //select
    // const [value, setValue] = React.useState('male'); // radio
    const handleChange =(event)=>{
        const {value, name} =event.target
        setForm({...form, [name]:value})
        setCategory(event.target.value  ) // select value]

        // setValue(event.target.value); // select value
      }
      const handleSubmit =async(event)=>{
        event.preventDefault();
        const new_size = form.size.split(" ").filter(item=> item != " ")
        const new_color = form.color.split(" ").filter(item=> item != " ")
        // console.log(new_size, "new_size");
        // console.log(form, "form");
        // console.log(new_color, "new_color");
        let payload = {...form,
                        age_max: Number(form.age_max),
                        age_min: Number(form.age_min), 
                        count: Number(form.count), 
                        discount: Number(form.discount), 
                        cost: Number(form.cost),
                        size: new_size,
                        color: new_color
                    }
        const res = await products.create(payload)
        if (res.status === 201) {
            window.location.reload();
        }
    }


 
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form className='flex flex-col gap-3'  onSubmit={handleSubmit}>
            <span className='flex gap-2'>
                <TextField onChange={handleChange} type='number' name='age_max' id="outlined-basic" className='w-full' label="age_max" variant="outlined" />
                <TextField onChange={handleChange} type='number' name='age_min' id="outlined-basic" className='w-full' label="age_min" variant="outlined" />
            </span>
                <TextField onChange={handleChange} type='text' name='color' id="outlined-basic" className='w-full' label="color" variant="outlined" />
                <span className='flex gap-2'>
                <TextField onChange={handleChange} type='number' name='cost' id="outlined-basic" className='w-full' label="cost" variant="outlined" />
                <TextField onChange={handleChange} type='number' name='discount' id="outlined-basic" className='w-full' label="discount" variant="outlined" />
                </span>
                <Select
                  name='category_name'
                  value={category}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                 <MenuItem value="">
                    Select category
                </MenuItem>
                {
                    categoriya?.map((item, index)=>{
                        return  <MenuItem value={item?.category_name}>{item?.category_name}</MenuItem>
                    })
                }
                </Select>
                <TextField onChange={handleChange} type='text' name='made_in' id="outlined-basic" className='w-full' label="made_in" variant="outlined" />
                <TextField onChange={handleChange} type='number' name='count' id="outlined-basic" className='w-full' label="count" variant="outlined" />
                <TextField onChange={handleChange} type='text' name='for_gender' id="outlined-basic" className='w-full' label="gender" variant="outlined" />
                <TextField onChange={handleChange} type='text' name='product_name' id="outlined-basic" className='w-full' label="product-name" variant="outlined" />
                <TextField onChange={handleChange} type='text' name='size' id="outlined-basic" className='w-full' label="size" variant="outlined" />
                <TextField onChange={handleChange} type='text' name='description' id="outlined-basic" className='w-full' label="description" variant="outlined" />
                <Button variant="contained"  type='submit'>
                    {
                      "add product"
                    }
                </Button>

            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
