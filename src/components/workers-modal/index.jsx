import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';

// import AddIcon from '@mui/icons-material/Add';
import { categories } from '@service';

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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({open, toggle, data}) {
    console.log(data, "data");
    const[form,setForm] = React.useState({})
    const handleChange =(event)=>{
        const {value, name} =event.target
        setForm({...form, [name]:value})
    }
    const handleSubmit =async(event)=>{
        event.preventDefault();
        console.log(form, "form");
        if (data.id) {
            let payload = {
                category_id: data.id,
                category_name: form.first_name
            }
            const res = await categories.update(payload)
            if (res.status === 200) {
                window.location.reload();
            }
        }else{
            const res = await categories.create(form)
            if (res.status === 201) {
                window.location.reload();
            }
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
                <TextField onChange={handleChange} defaultValue={data.first_name} type='text' name='first_name' id="outlined-basic" className='w-full' label="category-name" variant="outlined" />
                <Button variant="contained"  type='submit'>
                    {
                        data.id ? "edit" : "add workers"
                    }
                </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
